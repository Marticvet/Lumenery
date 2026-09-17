"use client";
import { analyticsConsentEvent, isAnalyticsConfigured } from "@/lib/analytics";

export default function AnalyticsSettingsButton({ label }: { label: string }) {
    if (!isAnalyticsConfigured()) return null;
    return <button type="button" className="analytics-settings" onClick={() => window.dispatchEvent(new Event(analyticsConsentEvent))}>{label}</button>;
}
