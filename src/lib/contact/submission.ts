import { hasLocale, type Locale } from "@/i18n/config";

export const limits = { name: 140, email: 254, address: 500, phone: 60, message: 5000 } as const;
export type ContactField = keyof typeof limits;
export type ContactSubmission = { kind: "project"; locale: Locale } & Record<ContactField, string>;
type Result = { status: "valid"; submission: ContactSubmission } | { status: "honeypot" } | { status: "invalid"; fields: ContactField[] };

export function parseContactSubmission(body: unknown): Result {
    if (!body || typeof body !== "object" || Array.isArray(body)) return { status: "invalid", fields: [] };
    const request = body as Record<string, unknown>;
    if (request.kind !== "project" || typeof request.locale !== "string" || !hasLocale(request.locale) || !request.data || typeof request.data !== "object" || Array.isArray(request.data)) return { status: "invalid", fields: [] };
    const data = request.data as Record<string, unknown>;
    if (typeof data.website === "string" && data.website.trim()) return { status: "honeypot" };
    const fields: ContactField[] = [];
    const values = {} as Record<ContactField, string>;
    for (const field of Object.keys(limits) as ContactField[]) {
        const raw = data[field] ?? "";
        const value = typeof raw === "string" ? raw.trim() : "";
        values[field] = value;
        if (typeof raw !== "string" || value.length > limits[field] || (field !== "message" && field !== "address" && /[\r\n]/.test(value)) || /\0/.test(value)) fields.push(field);
    }
    for (const field of ["name", "email", "message"] as const) if (!values[field]) fields.push(field);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) fields.push("email");
    return fields.length ? { status: "invalid", fields: [...new Set(fields)] } : { status: "valid", submission: { kind: "project", locale: request.locale, ...values } };
}
