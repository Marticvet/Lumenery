import Link from "next/link";

const links = [
    { href: "/#ueber-uns", label: "Über uns" },
    { href: "/katalog", label: "Katalog" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
    return (
        <header className="site-header">
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
