import "server-only";

export function getSiteUrl() {
    const configured = process.env.SITE_URL?.trim();
    if (!configured) return new URL("http://localhost:3000");
    const url = new URL(configured);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("SITE_URL must be an HTTP(S) origin.");
    return new URL(url.origin);
}

export function getContactEmail() {
    return process.env.MAIL_TO_ADDRESS?.trim() || "";
}
