import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

import Image from "next/image";
import Link from "next/link";

export default async function CatalogPage(props: LocalePageProps) {
    const { locale, t, href } = await getPageContext(props);
    const products = [
        { image: "/lumynery/product-menu.jpg", name: t("Menü – individuell"), price: t("ab 6,99€ pro Stück"), href: href("/katalog/menuekarten") },
        { image: "/lumynery/product-invite.jpg", name: t("Einladungen"), price: t("3,50€ pro Stück"), href: href("/kontakt") },
        { image: "/lumynery/product-table.jpg", name: t("Tischdeko"), price: t("3,50€ pro Stück"), href: href("/kontakt") },
    ];
    const order = [
        ["✉", t("Anfrage senden"), t("Schreib uns deine Wünsche.")],
        ["▧", t("Design erhalten"), t("Wir erstellen dein individuelles Design.")],
        ["✎", t("Korrekturen"), t("Gemeinsam passen wir alles an.")],
        ["⬡", t("Produktion"), t("Dein Produkt wird mit Sorgfalt für dich gefertigt.")],
        ["▱", t("Versand/Abholung"), t("Deine Bestellung wird versendet oder kann abgeholt werden.")],
    ];

    return (
        <div className="catalog-page inner-page">
            <div className="shipping-strip">{t("Kostenloser Versand ab Bestellwert von 30€")}<span aria-hidden>▱</span></div>
            <section className={`catalog-hero${locale !== "de" ? " catalog-hero--translated" : ""}`}>
                <Image src={locale === "de" ? "/lumynery/catalog-hero.jpg" : "/lumynery/menu-detail.jpg"} alt={t("Lumynery Katalog")} fill priority sizes="100vw" />
                {locale !== "de" && <div className="catalog-hero__translation"><h2>{t("Katalog")}</h2><p>{t("Individuelle Papeterie. Für besondere Momente.")}</p></div>}
            </section>
            <p className="catalog-note">{t("Du kannst auch alle Produkte individuell gestalten oder uns kontaktieren – wir machen es komplett nach deinem Wunsch.")}</p>

            <section className="catalog-products page-shell section-pad" aria-labelledby="catalog-title">
                <h1 id="catalog-title" className="sr-only">{t("Lumynery Produktkatalog")}</h1>
                <nav className="category-nav" aria-label={t("Produktkategorien")}>
                    <a href="#products" className="active">{t("Alle Produkte")}</a>
                    <a href="#products">{t("Hochzeit")}</a>
                    <a href="#products">{t("Geburt + Taufe")}</a>
                    <a href="#products">{t("Einladungen")}</a>
                    <a href="#products">{t("Geschenksets")}</a>
                    <select aria-label={t("Produkte sortieren")} defaultValue="featured">
                        <option value="featured">{t("Sortieren nach")}</option>
                        <option value="price">{t("Preis")}</option>
                        <option value="name">{t("Name")}</option>
                    </select>
                </nav>
                <div id="products" className="product-grid">
                    {products.map((product) => (
                        <article className="product-card" key={product.name}>
                            <Image src={product.image} alt={product.name} width={232} height={182} />
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                            <Link href={product.href}>{t("Mehr erfahren →")}</Link>
                        </article>
                    ))}
                </div>
                <Link href={href("/kontakt")} className="button button--rose catalog-products__cta">{t("Zum Gesamtkatalog")}</Link>
            </section>

            <section className="order-flow page-shell section-pad" aria-labelledby="order-flow-title">
                <h2 id="order-flow-title" className="sr-only">{t("So funktioniert eine Bestellung")}</h2>
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
                    <p className="eyebrow">{t("Lumynery Design House")}</p>
                    <h2>{t("Design, das persönlich bleibt.")}</h2>
                    <p>
                        {t("Bei Lumynery entstehen individuelle Designs mit viel Liebe zum Detail. Ob Hochzeit, Unternehmen oder persönliche Geschenke – jedes Produkt wird speziell für unsere Kunden gestaltet.")}</p>
                </div>
                <Image src="/lumynery/studio.jpg" alt={t("Lumynery Designstudio")} width={414} height={250} />
            </section>
        </div>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/katalog", "Katalog", "Entdecke individuelle Papeterie und personalisierte Designs von Lumynery.");
}
