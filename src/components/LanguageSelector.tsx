"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { locales, localePath, type Locale } from "@/i18n/config";

const names = { de: "Deutsch", en: "English", bg: "Български" };

export default function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
    const pathname = usePathname();
    const details = useRef<HTMLDetailsElement>(null);
    const path = pathname.replace(/^\/(de|en|bg)(?=\/|$)/, "");

    useEffect(() => {
        const close = (event: PointerEvent | KeyboardEvent) => {
            if (event instanceof KeyboardEvent ? event.key === "Escape" : event.target instanceof Node && !details.current?.contains(event.target)) details.current?.removeAttribute("open");
        };
        document.addEventListener("pointerdown", close);
        document.addEventListener("keydown", close);
        return () => {
            document.removeEventListener("pointerdown", close);
            document.removeEventListener("keydown", close);
        };
    }, []);

    return (
        <details className="language-selector" ref={details}>
            <summary aria-label={`${label}: ${names[locale]}`}>{locale.toUpperCase()} <span aria-hidden>⌄</span></summary>
            <div className="language-selector__options">
                {locales.map((option) => (
                    <a key={option} href={`/api/locale?locale=${option}&path=${encodeURIComponent(localePath(option, path))}`}
                        lang={option} aria-current={option === locale ? "true" : undefined}
                        onClick={(event) => {
                            // Keep the current section and query while doing a full navigation so the cookie is saved.
                            event.currentTarget.href = `/api/locale?locale=${option}&path=${encodeURIComponent(localePath(option, path) + window.location.search + window.location.hash)}`;
                            details.current?.removeAttribute("open");
                        }}>
                        {names[option]} {option === locale && <span aria-hidden>✓</span>}
                    </a>
                ))}
            </div>
        </details>
    );
}
