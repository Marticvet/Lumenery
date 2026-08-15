import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const title = "Menükarten – individuell gestaltet";
const description = "Individuelle Menükarten für Hochzeit, Taufe oder Feier – persönlich gestaltet und hochwertig gedruckt.";

export async function generateMetadata(): Promise<Metadata> {
    const requestHeaders = await headers();
    const host = requestHeaders.get("host") ?? "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const image = `${protocol}://${host}/lumynery/menu-hero.jpg`;

    return {
        title,
        description,
        openGraph: { title, description, type: "website", images: [{ url: image, width: 750, height: 495, alt: title }] },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

const features = ["Individuelles Design", "Hochwertiger Druck", "Persönliche Beratung", "Schnelle Bearbeitung"];
const inclusive = ["Persönliches Design", "Unbegrenzte kleine Änderungen", "Druckvorbereitung", "Hochwertige Druckqualität", "Persönliche Beratung"];
const orderSteps = ["Anfrage senden", "Wünsche besprechen", "Designentwurf erhalten", "Änderungen vornehmen", "Freigabe", "Produktion"];

export default function MenuCardsPage() {
    return (
        <div className="product-detail-page inner-page">
            <section className="product-detail-hero">
                <Image src="/lumynery/menu-hero.jpg" alt="Individuelle Lumynery Menükarte" width={750} height={495} priority />
                <div>
                    <h1>Menükarten –<br />individuell gestaltet</h1>
                    <p>Perfekt abgestimmt auf eure Hochzeit, Taufe oder Feier. Jede Karte wird nach euren Wünschen gestaltet.</p>
                    <p>ab 6,99 € pro Stück</p>
                    <Link href="/kontakt" className="button button--rose">Jetzt anfragen</Link>
                    <ul className="product-features">
                        {features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                    </ul>
                </div>
            </section>

            <div className="product-gallery" aria-label="Produktansichten">
                {[1, 2, 3, 4].map((item) => (
                    <Image key={item} src="/lumynery/menu-detail.jpg" alt={`Menükarte Detailansicht ${item}`} width={273} height={187} />
                ))}
            </div>

            <section className="product-inclusions page-shell section-pad">
                <div>
                    <h2>Individuell für eure Feier</h2>
                    <p>Unsere Menükarten werden komplett nach euren Vorstellungen gestaltet.</p>
                    <ul>
                        <li>Wunschfarben</li>
                        <li>Eigene Schriftarten</li>
                        <li>Eigenes Logo oder Monogramm</li>
                        <li>Gold-, Silber- oder Roségold-Look möglich</li>
                        <li>Passend zu euren Einladungen</li>
                    </ul>
                </div>
                <div className="included-card">
                    <h2>Das ist inklusive</h2>
                    <ul>{inclusive.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
            </section>

            <section className="format-section page-shell" aria-labelledby="format-title">
                <h2 id="format-title">Optionen</h2>
                <div>
                    <article><span>▯</span><p>DIN LANG</p></article>
                    <article><span>□</span><p>A6</p></article>
                    <article><span>◫</span><p>Klappkarte</p></article>
                    <article><span>✦</span><p>Sonderformat</p></article>
                </div>
                <p>Änderung der Formate auf Anfrage möglich</p>
            </section>

            <section className="product-order" aria-labelledby="product-order-title">
                <h2 id="product-order-title">So läuft die Bestellung ab</h2>
                <ol>
                    {orderSteps.map((step, index) => (
                        <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                    ))}
                </ol>
            </section>
            <section className="product-final-cta">
                <p>Gemeinsam gestalten wir eure perfekte Papeterie.</p>
                <Link href="/kontakt" className="button button--muted">Jetzt anfragen</Link>
            </section>
        </div>
    );
}
