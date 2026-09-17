import type { PostHog } from "posthog-js";
import type { Locale } from "@/i18n/config";

export const analyticsConsentStorageKey = "lumynery-analytics-consent";
export const analyticsConsentEvent = "lumynery:open-analytics-consent";
let clientPromise: Promise<PostHog> | undefined;
let client: PostHog | undefined;
let initialized = false;
let consentGranted = false;

export function isAnalyticsConfigured() {
    return Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);
}

export async function enableAnalytics() {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    if (!token || typeof window === "undefined" || window.navigator.doNotTrack === "1") return;
    consentGranted = true;
    try {
        clientPromise ??= import("posthog-js").then(({ default: posthog }) => posthog);
        client = await clientPromise;
        // A visitor may revoke consent while the SDK is downloading.
        if (!consentGranted) return;
        if (!initialized) {
            client.init(token, {
                api_host: "/lmx",
                ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://eu.posthog.com",
                defaults: "2026-05-30",
                autocapture: { dom_event_allowlist: ["click", "submit"], element_allowlist: ["a", "button", "form"] },
                capture_pageview: "history_change",
                capture_pageleave: "if_capture_pageview",
                capture_dead_clicks: true,
                capture_heatmaps: true,
                capture_performance: true,
                disable_session_recording: false,
                enable_recording_console_log: false,
                person_profiles: "identified_only",
                respect_dnt: true,
                opt_out_capturing_by_default: true,
                opt_out_persistence_by_default: true,
                session_recording: { maskAllInputs: true, blockSelector: "[data-analytics-block]", collectFonts: false, recordCrossOriginIframes: false },
            });
            initialized = true;
        }
        if (client.has_opted_out_capturing()) {
            client.opt_in_capturing({ captureEventName: "analytics_consent_granted" });
            client.capture("$pageview", { $current_url: window.location.href });
        }
        // A previous revocation explicitly disabled recording in the SDK config.
        client.startSessionRecording();
    } catch {
        clientPromise = undefined;
        // Analytics must never interfere with navigation or enquiries.
    }
}

export async function disableAnalytics() {
    consentGranted = false;
    if (!clientPromise) return;
    try {
        const posthog = await clientPromise;
        if (!consentGranted && initialized) {
            posthog.stopSessionRecording();
            posthog.opt_out_capturing();
        }
    } catch { /* No SDK was initialized. */ }
}

export function captureContactEvent(event: "contact_form_submitted" | "contact_form_succeeded" | "contact_form_failed", locale: Locale) {
    if (consentGranted && initialized && client && !client.has_opted_out_capturing()) client.capture(event, { locale });
}
