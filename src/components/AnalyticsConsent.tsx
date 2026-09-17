"use client";

import { useEffect, useState } from "react";
import type { UICopy } from "@/i18n/ui";
import { analyticsConsentEvent, analyticsConsentStorageKey, disableAnalytics, enableAnalytics, isAnalyticsConfigured } from "@/lib/analytics";
type Choice = "granted" | "denied" | null;
const parseChoice = (value: string | null): Choice => value === "granted" || value === "denied" ? value : null;

export default function AnalyticsConsent({ t }: { t: UICopy["analytics"] }) {
    const [choice, setChoice] = useState<Choice>(null);
    const [ready, setReady] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const configured = isAnalyticsConfigured();
    useEffect(() => {
        if (!configured) return;
        let saved: Choice = null;
        try { saved = parseChoice(localStorage.getItem(analyticsConsentStorageKey)); } catch { /* The user can still choose for this visit. */ }
        const timer = window.setTimeout(() => { setChoice(saved); setReady(true); }, 0);
        if (saved === "granted") void enableAnalytics();
        const open = () => setSettingsOpen(true);
        const synchronize = (event: StorageEvent) => {
            if (event.key !== analyticsConsentStorageKey && event.key !== null) return;
            const next = parseChoice(event.newValue);
            setChoice(next);
            if (next === "granted") void enableAnalytics(); else void disableAnalytics();
        };
        window.addEventListener(analyticsConsentEvent, open);
        window.addEventListener("storage", synchronize);
        return () => { window.clearTimeout(timer); window.removeEventListener(analyticsConsentEvent, open); window.removeEventListener("storage", synchronize); };
    }, [configured]);

    if (!configured || !ready || (choice !== null && !settingsOpen)) return null;
    function choose(next: Exclude<Choice, null>) {
        try { localStorage.setItem(analyticsConsentStorageKey, next); } catch { /* Session-only choice. */ }
        setChoice(next);
        setSettingsOpen(false);
        if (next === "granted") void enableAnalytics(); else void disableAnalytics();
    }
    return <aside className="analytics-consent ph-no-capture" aria-labelledby="analytics-consent-title">
        <div><p className="eyebrow">{t.eyebrow}</p><h2 id="analytics-consent-title">{t.title}</h2><p>{t.description}</p></div>
        <div className="analytics-consent__actions">
            <button type="button" onClick={() => choose("denied")}>{t.decline}</button>
            <button type="button" onClick={() => choose("granted")}>{t.accept}</button>
        </div>
    </aside>;
}
