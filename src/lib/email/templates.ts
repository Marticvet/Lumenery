import "server-only";
import type { ContactSubmission } from "@/lib/contact/submission";
import type { MailConfig } from "./transporter";

const copy = {
    de: { subject: "Wir haben deine Anfrage erhalten", greeting: "Hallo", thanks: "Vielen Dank für deine Nachricht an Lumynery.", received: "Deine Anfrage ist bei uns angekommen. Wir melden uns so bald wie möglich bei dir.", reference: "Deine Referenznummer", keep: "Bitte bewahre diese Nummer für Rückfragen auf.", regards: "Herzliche Grüße", team: "Dein Lumynery Team" },
    en: { subject: "We've received your enquiry", greeting: "Hello", thanks: "Thank you for contacting Lumynery.", received: "We've received your enquiry and will get back to you as soon as possible.", reference: "Your reference number", keep: "Please keep this number for any follow-up.", regards: "Warm regards", team: "The Lumynery team" },
    bg: { subject: "Получихме твоето запитване", greeting: "Здравей", thanks: "Благодарим ти, че се свърза с Lumynery.", received: "Получихме запитването ти и ще се свържем с теб възможно най-скоро.", reference: "Твоят референтен номер", keep: "Моля, запази този номер за последваща кореспонденция.", regards: "С най-добри пожелания", team: "Екипът на Lumynery" },
};

export function escapeHtml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function shell(content: string, lang: string) {
    return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#eee8e2;font-family:Georgia,serif;color:#251d1b"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:auto;background:#fffdfb"><tr><td style="padding:28px 32px;background:#cda69e;font:24px Arial,sans-serif;letter-spacing:3px">LUMYNERY</td></tr><tr><td style="padding:32px;font-size:17px;line-height:1.6">${content}</td></tr></table></td></tr></table></body></html>`;
}

export function createInternalNotification(submission: ContactSubmission, reference: string, config: MailConfig) {
    const fields = [
        ["Reference", reference], ["Name", submission.name], ["Email", submission.email],
        ["Phone", submission.phone], ["Address", submission.address],
        ["Language", submission.locale.toUpperCase()], ["Message", submission.message],
    ].filter(([, value]) => value);
    return {
        from: config.from, to: config.toAddress, replyTo: submission.email,
        subject: `[NEW] [${reference}] Lumynery enquiry from ${submission.name}`,
        text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
        html: shell(`<h1 style="font-size:26px">New enquiry</h1>${fields.map(([label,value]) => `<p><strong>${label}</strong><br />${escapeHtml(value).replace(/\n/g,"<br />")}</p>`).join("")}`, "en"),
        disableFileAccess: true, disableUrlAccess: true,
    };
}

export function createCustomerAcknowledgement(submission: ContactSubmission, reference: string, config: MailConfig) {
    const t = copy[submission.locale];
    const greeting = `${t.greeting} ${submission.name.split(/\s+/)[0]},`;
    return {
        from: config.from, to: submission.email, replyTo: config.fromAddress,
        subject: `[${reference}] ${t.subject}`,
        text: [greeting, t.thanks, t.received, `${t.reference}: ${reference}`, t.keep, t.regards, t.team, config.fromAddress].join("\n\n"),
        html: shell(`<h1 style="font-size:26px">${escapeHtml(greeting)}</h1><p>${t.thanks}</p><p>${t.received}</p><p><strong>${t.reference}</strong></p><p style="padding:16px;background:#eee8e2;border-left:4px solid #cda69e;font-family:monospace">${escapeHtml(reference)}</p><p>${t.keep}</p><p>${t.regards}<br />${t.team}<br /><a href="mailto:${escapeHtml(config.fromAddress)}">${escapeHtml(config.fromAddress)}</a></p>`, submission.locale),
        disableFileAccess: true, disableUrlAccess: true,
    };
}
