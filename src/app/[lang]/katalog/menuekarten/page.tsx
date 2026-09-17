import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

import Image from "next/image";
import Link from "next/link";

export default async function MenuCardsPage(props: LocalePageProps) {
    const { t, href } = await getPageContext(props);
    const features = [t("Individuelles Design"), t("Hochwertiger Druck"), t("Persönliche Beratung"), t("Schnelle Bearbeitung")];
    const inclusive = [t("Persönliches Design"), t("Unbegrenzte kleine Änderungen"), t("Druckvorbereitung"), t("Hochwertige Druckqualität"), t("Persönliche Beratung")];
    const orderSteps = [t("Anfrage senden"), t("Wünsche besprechen"), t("Designentwurf erhalten"), t("Änderungen vornehmen"), t("Freigabe"), t("Produktion")];

    return (
        <div className="product-detail-page inner-page">
            <section className="product-detail-hero">
                <Image src="/lumynery/menu-hero.jpg" alt={t("Individuelle Lumynery Menükarte")} width={750} height={495} priority />
                <div>
                    <h1>{t("Menükarten –")}<br />{t("individuell gestaltet")}</h1>
                    <p>{t("Perfekt abgestimmt auf eure Hochzeit, Taufe oder Feier. Jede Karte wird nach euren Wünschen gestaltet.")}</p>
                    <p>{t("ab 6,99 € pro Stück")}</p>
                    <Link href={href("/kontakt")} className="button button--rose">{t("Jetzt anfragen")}</Link>
                    <ul className="product-features">
                        {features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                    </ul>
                </div>
            </section>

            <div className="product-gallery" aria-label={t("Produktansichten")}>
                {[1, 2, 3, 4].map((item) => (
                    <Image key={item} src="/lumynery/menu-detail.jpg" alt={`${t("Menükarte Detailansicht")} ${item}`} width={273} height={187} />
                ))}
            </div>

            <section className="product-inclusions page-shell section-pad">
                <div>
                    <h2>{t("Individuell für eure Feier")}</h2>
                    <p>{t("Unsere Menükarten werden komplett nach euren Vorstellungen gestaltet.")}</p>
                    <ul>
                        <li>{t("Wunschfarben")}</li>
                        <li>{t("Eigene Schriftarten")}</li>
                        <li>{t("Eigenes Logo oder Monogramm")}</li>
                        <li>{t("Gold-, Silber- oder Roségold-Look möglich")}</li>
                        <li>{t("Passend zu euren Einladungen")}</li>
                    </ul>
                </div>
                <div className="included-card">
                    <h2>{t("Das ist inklusive")}</h2>
                    <ul>{inclusive.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
            </section>

            <section className="format-section page-shell" aria-labelledby="format-title">
                <h2 id="format-title">{t("Optionen")}</h2>
                <div>
                    <article><span>▯</span><p>{t("DIN LANG")}</p></article>
                    <article><span>□</span><p>{t("A6")}</p></article>
                    <article><span>◫</span><p>{t("Klappkarte")}</p></article>
                    <article><span>✦</span><p>{t("Sonderformat")}</p></article>
                </div>
                <p>{t("Änderung der Formate auf Anfrage möglich")}</p>
            </section>

            <section className="product-order" aria-labelledby="product-order-title">
                <h2 id="product-order-title">{t("So läuft die Bestellung ab")}</h2>
                <ol>
                    {orderSteps.map((step, index) => (
                        <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                    ))}
                </ol>
            </section>
            <section className="product-final-cta">
                <p>{t("Gemeinsam gestalten wir eure perfekte Papeterie.")}</p>
                <Link href={href("/kontakt")} className="button button--muted">{t("Jetzt anfragen")}</Link>
            </section>
        </div>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/katalog/menuekarten", "Menükarten – individuell gestaltet", "Individuelle Menükarten für Hochzeit, Taufe oder Feier – persönlich gestaltet und hochwertig gedruckt.", "/lumynery/menu-hero.jpg");
}
