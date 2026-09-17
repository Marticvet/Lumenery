import "server-only";
import nodemailer from "nodemailer";

export class MailConfigurationError extends Error {}
export type MailConfig = { host: string; port: number; secure: boolean; user: string; pass: string; from: { name: string; address: string }; fromAddress: string; toAddress: string };
function required(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new MailConfigurationError(`${name} is required.`);
    return value;
}
export function getMailConfig(): MailConfig {
    const host = required("SMTP_HOST");
    const port = Number(required("SMTP_PORT"));
    const secure = required("SMTP_SECURE");
    const user = required("SMTP_USER");
    const pass = required("SMTP_PASS");
    const name = process.env.MAIL_FROM_NAME?.trim() || "Lumynery";
    const fromAddress = required("MAIL_FROM_ADDRESS");
    const toAddress = required("MAIL_TO_ADDRESS");
    if (!Number.isInteger(port) || port < 1 || port > 65535 || !["true", "false"].includes(secure)) throw new MailConfigurationError("Invalid SMTP port or TLS setting.");
    for (const address of [user, fromAddress, toAddress]) {
        if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address)) throw new MailConfigurationError("Invalid mail address.");
    }
    if (/[\r\n]/.test(name) || fromAddress.toLowerCase() !== user.toLowerCase()) throw new MailConfigurationError("Sender must match the authenticated SMTP mailbox.");
    return { host, port, secure: secure === "true", user, pass, from: { name, address: fromAddress }, fromAddress, toAddress };
}
export function createMailTransporter(config: MailConfig) {
    return nodemailer.createTransport({
        host: config.host, port: config.port, secure: config.secure,
        requireTLS: !config.secure,
        auth: { user: config.user, pass: config.pass },
        connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    });
}
