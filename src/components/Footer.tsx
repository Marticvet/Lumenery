import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaRegHeart, FaRegStar, FaRegUser } from "react-icons/fa6";

const values = [
    { icon: FaRegHeart, title: "Mit Liebe zum Detail", text: "Für einzigartige Designs" },
    { icon: FaLeaf, title: "Nachhaltig gedacht", text: "Bewusste Materialauswahl" },
    { icon: FaRegUser, title: "Persönliche Begleitung", text: "Wir sind für dich da" },
    { icon: FaRegStar, title: "Für besondere Menschen", text: "In Deutschland & Bulgarien" },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__values page-shell">
                <Link href="/" className="site-footer__logo" aria-label="Lumynery Startseite">
                    <Image
                        src="/lumynery-logo-vector-transparent.svg"
                        alt=""
                        width={115}
                        height={150}
                    />
                    <span>LUMYNERY</span>
                </Link>
                {values.map((value) => {
                    const Icon = value.icon;

                    return (
                        <div className="site-footer__value" key={value.title}>
                            <span aria-hidden><Icon /></span>
                            <p>{value.title}</p>
                            <small>{value.text}</small>
                        </div>
                    );
                })}
            </div>
            <div className="site-footer__bottom">
                <p>© LUMYNERY 2026 · Alle Rechte vorbehalten.</p>
                <nav aria-label="Rechtliches">
                    <Link href="/impressum">Impressum</Link>
                    <Link href="/datenschutz">Datenschutz</Link>
                    <Link href="/agb">AGB</Link>
                </nav>
                <p className="site-footer__credit">
                    Design by LUMYNERY<br />Developed by BUILT FURTHER
                </p>
            </div>
        </footer>
    );
}
