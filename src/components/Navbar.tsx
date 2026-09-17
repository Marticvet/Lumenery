"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { localePath, type Locale } from "@/i18n/config";
import type { UICopy } from "@/i18n/ui";

const links = [
    { href: "/#ueber-uns", label: "about" },
    { href: "/katalog", label: "catalog" },
    { href: "/leistungen", label: "services" },
    { href: "/kontakt", label: "contact" },
] as const;

export default function Navbar({ locale, t }: { locale: Locale; t: UICopy["nav"] }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateHeader = () => setIsScrolled(window.scrollY > 24);

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });

        return () => window.removeEventListener("scroll", updateHeader);
    }, []);

    return (
        <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
            <Link href={localePath(locale)} className="site-header__brand" aria-label={t.home}>
                LUMYNERY
            </Link>
            <nav className="site-nav" aria-label={t.label}>
                {links.map((link) => (
                    <Link key={link.href} href={localePath(locale, link.href)}>
                        {t[link.label]}
                    </Link>
                ))}
            </nav>
            <LanguageSelector locale={locale} label={t.language} />
        </header>
    );
}
