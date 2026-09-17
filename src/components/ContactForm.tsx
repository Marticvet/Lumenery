"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { UICopy } from "@/i18n/ui";
import { limits, parseContactSubmission, type ContactField } from "@/lib/contact/submission";
import { captureContactEvent } from "@/lib/analytics";

export default function ContactForm({ locale, t }: { locale: Locale; t: UICopy["form"] }) {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
    const [errorMessage, setErrorMessage] = useState("");
    const [receipt, setReceipt] = useState<{ reference: string; email: string; confirmationSent: boolean } | null>(null);
    const sending = useRef(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending.current) return;
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        const payload = { kind: "project", locale, data };
        const validation = parseContactSubmission(payload);
        setReceipt(null);
        setStatus("idle");
        if (validation.status === "invalid") {
            setErrors(Object.fromEntries(validation.fields.map((field) => [field, t.errors[field]])));
            form.querySelector<HTMLElement>(`[name="${validation.fields[0]}"]`)?.focus();
            return;
        }
        sending.current = true;
        setErrors({});
        setStatus("sending");
        captureContactEvent("contact_form_submitted", locale);
        try {
            const response = await fetch("/api/contact", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), signal: AbortSignal.timeout(65000),
            });
            const result = await response.json();
            if (!response.ok || result.success !== true || typeof result.reference !== "string") {
                setErrorMessage(response.status === 503 ? t.unavailable : t.error);
                setStatus("error");
                captureContactEvent("contact_form_failed", locale);
                return;
            }
            setReceipt({ reference: result.reference, email: String(data.email).trim(), confirmationSent: result.confirmationSent === true });
            form.reset();
            setStatus("success");
            captureContactEvent("contact_form_succeeded", locale);
        } catch {
            setErrorMessage(t.error);
            setStatus("error");
            captureContactEvent("contact_form_failed", locale);
        } finally {
            sending.current = false;
        }
    }

    function fieldProps(field: ContactField) {
        return { id: `contact-${field}`, name: field, maxLength: limits[field], "aria-invalid": Boolean(errors[field]), "aria-describedby": errors[field] ? `contact-${field}-error` : undefined };
    }
    function error(field: ContactField) {
        return errors[field] && <span className="contact-form__error" id={`contact-${field}-error`}>{errors[field]}</span>;
    }
    return (
        <form className="contact-form ph-no-capture ph-no-record" data-analytics-block onSubmit={submitForm} noValidate aria-busy={status === "sending"}>
            <h1>{t.title}</h1>
            <label htmlFor="contact-name">{t.name}<input {...fieldProps("name")} autoComplete="name" required />{error("name")}</label>
            <label htmlFor="contact-email">{t.email}<input {...fieldProps("email")} type="email" autoComplete="email" required />{error("email")}</label>
            <label htmlFor="contact-address">{t.address}<textarea {...fieldProps("address")} rows={2} autoComplete="street-address" />{error("address")}</label>
            <label htmlFor="contact-phone">{t.phone}<input {...fieldProps("phone")} type="tel" autoComplete="tel" />{error("phone")}</label>
            <label htmlFor="contact-message">{t.message}<textarea {...fieldProps("message")} rows={4} required />{error("message")}</label>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <button type="submit" className="button button--muted" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit}</button>
            <small>{t.notice} <Link href={localePath(locale, "/datenschutz")}>{t.privacy}</Link></small>
            {status === "success" && receipt && <div className="contact-form__success" role="status">
                <p>{t.success}</p>
                <p>{t.reference}: <strong>{receipt.reference}</strong></p>
                <p>{receipt.confirmationSent ? t.confirmation.replace("{email}", receipt.email) : t.confirmationPending}</p>
            </div>}
            {status === "error" && <p className="contact-form__error" role="alert">{errorMessage}</p>}
        </form>
    );
}
