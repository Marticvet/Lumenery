import { randomBytes } from "node:crypto";

export function createInquiryReference(date = new Date()) {
    return `LUM-${date.toISOString().slice(0, 10).replaceAll("-", "")}-${randomBytes(4).toString("hex").toUpperCase()}`;
}
