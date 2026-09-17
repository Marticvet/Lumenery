import { parseContactSubmission } from "@/lib/contact/submission";
import { createCustomerAcknowledgement, createInternalNotification } from "@/lib/email/templates";
import { createInquiryReference } from "@/lib/email/reference";
import { createMailTransporter, getMailConfig, MailConfigurationError } from "@/lib/email/transporter";

export const runtime = "nodejs";
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const maxBodyBytes = 48 * 1024;

export async function POST(request: Request) {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return json({ error: "invalid_origin" }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "invalid_request" }, 415);
    if (Number(request.headers.get("content-length")) > maxBodyBytes) return json({ error: "too_large" }, 413);
    let body: unknown;
    try {
        // Bound streamed requests too; content-length may be absent or inaccurate.
        const reader = request.body?.getReader();
        if (!reader) return json({ error: "invalid_request" }, 400);
        const chunks: Uint8Array[] = [];
        let size = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maxBodyBytes) { await reader.cancel(); return json({ error: "too_large" }, 413); }
            chunks.push(value);
        }
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
        return json({ error: "invalid_request" }, 400);
    }
    const result = parseContactSubmission(body);
    if (result.status === "invalid") return json({ error: "validation", fields: result.fields }, 422);
    const reference = createInquiryReference();
    if (result.status === "honeypot") return json({ success: true, reference, confirmationSent: false });

    let config: ReturnType<typeof getMailConfig>;
    let transporter: ReturnType<typeof createMailTransporter>;
    try {
        config = getMailConfig();
        transporter = createMailTransporter(config);
        await transporter.sendMail(createInternalNotification(result.submission, reference, config));
    } catch (error) {
        const configuration = error instanceof MailConfigurationError;
        console.error("Lumynery contact delivery failed.", { reference, category: configuration ? "configuration" : "smtp-delivery" });
        return json({ error: configuration ? "unavailable" : "delivery_failed" }, configuration ? 503 : 502);
    }
    // Once the enquiry reaches the team it is successful, even if the customer receipt fails.
    // This prevents encouraging the customer to resubmit an already delivered enquiry.
    let confirmationSent = true;
    try {
        await transporter.sendMail(createCustomerAcknowledgement(result.submission, reference, config));
    } catch {
        confirmationSent = false;
        console.error("Lumynery acknowledgement delivery failed.", { reference });
    }
    return json({ success: true, reference, confirmationSent });
}
