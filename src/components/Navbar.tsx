"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
    { href: "/#ueber-uns", label: "Über uns" },
    { href: "/katalog", label: "Katalog" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateHeader = () => setIsScrolled(window.scrollY > 24);

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });

        return () => window.removeEventListener("scroll", updateHeader);
    }, []);

    return (
        <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
            <Link href="/" className="site-header__brand" aria-label="Lumynery Startseite">
                LUMYNERY
            </Link>
            <nav className="site-nav" aria-label="Hauptnavigation">
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
