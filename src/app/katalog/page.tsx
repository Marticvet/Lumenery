import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Katalog",
    description: "Entdecke individuelle Papeterie und personalisierte Designs von Lumynery.",
};

const products = [
    { image: "/lumynery/product-menu.jpg", name: "Menü – individuell", price: "ab 6,99€ pro Stück", href: "/katalog/menuekarten" },
    { image: "/lumynery/product-invite.jpg", name: "Einladungen", price: "3,50€ pro Stück", href: "/kontakt" },
    { image: "/lumynery/product-table.jpg", name: "Tischdeko", price: "3,50€ pro Stück", href: "/kontakt" },
];

const order = [
    ["✉", "Anfrage senden", "Schreib uns deine Wünsche."],
    ["▧", "Design erhalten", "Wir erstellen dein individuelles Design."],
    ["✎", "Korrekturen", "Gemeinsam passen wir alles an."],
    ["⬡", "Produktion", "Dein Produkt wird mit Sorgfalt für dich gefertigt."],
    ["▱", "Versand/Abholung", "Deine Bestellung wird versendet oder kann abgeholt werden."],
];

export default function CatalogPage() {
    return (
        <div className="catalog-page inner-page">
            <div className="shipping-strip">Kostenloser Versand ab Bestellwert von 30€　<span aria-hidden>▱</span></div>
            <section className="catalog-hero">
                <Image src="/lumynery/catalog-hero.jpg" alt="Lumynery Katalog" fill priority sizes="100vw" />
            </section>
            <p className="catalog-note">Du kannst auch alle Produkte individuell gestalten oder uns kontaktieren – wir machen es komplett nach deinem Wunsch.</p>

            <section className="catalog-products page-shell section-pad" aria-labelledby="catalog-title">
                <h1 id="catalog-title" className="sr-only">Lumynery Produktkatalog</h1>
                <nav className="category-nav" aria-label="Produktkategorien">
                    <a href="#products" className="active">Alle Produkte</a>
                    <a href="#products">Hochzeit</a>
                    <a href="#products">Geburt + Taufe</a>
                    <a href="#products">Einladungen</a>
                    <a href="#products">Geschenksets</a>
                    <select aria-label="Produkte sortieren" defaultValue="featured">
                        <option value="featured">Sortieren nach</option>
                        <option value="price">Preis</option>
                        <option value="name">Name</option>
                    </select>
                </nav>
                <div id="products" className="product-grid">
                    {products.map((product) => (
                        <article className="product-card" key={product.name}>
                            <Image src={product.image} alt={product.name} width={232} height={182} />
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                            <Link href={product.href}>Mehr erfahren →</Link>
                        </article>
                    ))}
                </div>
                <Link href="/kontakt" className="button button--rose catalog-products__cta">Zum Gesamtkatalog</Link>
            </section>

            <section className="order-flow page-shell section-pad" aria-labelledby="order-flow-title">
                <h2 id="order-flow-title" className="sr-only">So funktioniert eine Bestellung</h2>
                <ol>
                    {order.map(([icon, title, text], index) => (
                        <li key={title}>
                            <span className="order-flow__icon" aria-hidden>{icon}</span>
                            <h3>{index + 1}. {title}</h3>
                            <p>{text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="catalog-story">
                <div className="catalog-story__copy">
                    <p className="eyebrow">Lumynery Design House</p>
                    <h2>Design, das persönlich bleibt.</h2>
                    <p>
                        Bei Lumynery entstehen individuelle Designs mit viel Liebe zum Detail. Ob
                        Hochzeit, Unternehmen oder persönliche Geschenke – jedes Produkt wird speziell
                        für unsere Kunden gestaltet.
                    </p>
                </div>
                <Image src="/lumynery/studio.jpg" alt="Lumynery Designstudio" width={414} height={250} />
            </section>
        </div>
    );
}
