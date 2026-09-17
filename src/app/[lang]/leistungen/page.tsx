import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

import Image from "next/image";
import Link from "next/link";

export default async function ServicesPage(props: LocalePageProps) {
    const { t, href } = await getPageContext(props);
    const offers = [
        ["▣", t("Webdesign"), t("Moderne, responsive Webseiten, die deine Marke perfekt präsentieren und deine Kunden überzeugen.")],
        ["▯", t("Mobile Apps"), t("Individuelle Apps für iOS & Android – benutzerfreundlich, funktional und auf dein Business abgestimmt.")],
        ["▤", t("Visitenkarten"), t("Ein kleiner erster Eindruck, der im Gedächtnis bleibt – hochwertig und professionell gestaltet.")],
        ["▧", t("Flyer"), t("Kreative Flyer, die informieren, überzeugen und deine Botschaft eindrucksvoll transportieren.")],
    ];
    const steps = [
        ["✉", t("Beratung"), t("Wir hören zu und verstehen deine Wünsche.")],
        ["✎", t("Konzept"), t("Wir entwickeln ein individuelles Konzept.")],
        ["▧", t("Design"), t("Wir gestalten dein Design mit Liebe zum Detail.")],
        ["⬡", t("Produktion"), t("Wir setzen alles um und bringen dein Projekt online.")],
        ["♜", t("Erfolg"), t("Du überzeugst deine Kunden und erreichst deine Ziele.")],
    ];

    return (
        <div className="business-page inner-page">
            <section className="business-intro">
                <div>
                    <p className="eyebrow">{t("Lumynery")}</p>
                    <h1>{t("Designlösungen für Unternehmen,")}<br />{t("die Eindruck hinterlassen.")}</h1>
                    <p>{t("Professionelle Webseiten, mobile Anwendungen, Visitenkarten und Flyer – individuell gestaltet für deinen Erfolg.")}</p>
                    <Link href={href("/kontakt")} className="button button--rose">{t("Angebot anfordern →")}</Link>
                    <small>{t("✓ Persönliche Beratung & maßgeschneiderte Lösung")}</small>
                </div>
                <Image src="/lumynery/business-hero.jpg" alt={t("Lumynery Website auf Laptop und Smartphone")} width={528} height={350} priority />
            </section>

            <section className="business-offers page-shell section-pad" aria-labelledby="business-offers-title">
                <p className="eyebrow">{t("Unsere Leistungen")}</p>
                <h2 id="business-offers-title" className="section-title">{t("Alles aus einer Hand für deinen professionellen Auftritt.")}</h2>
                <div className="business-offers__grid">
                    {offers.map(([icon, title, text]) => (
                        <article key={title}>
                            <span aria-hidden>{icon}</span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="business-why">
                <div>
                    <p className="eyebrow">{t("Warum Lumynery?")}</p>
                    <h2>{t("Dein Erfolg ist unser Ziel!")}</h2>
                    <p>{t("Wir kombinieren Kreativität, Strategie und Design, um Lösungen zu schaffen, die nicht nur gut aussehen, sondern auch Ergebnisse liefern.")}</p>
                    <ul>
                        <li>{t("Individuelle Designs – keine Vorlagen")}</li>
                        <li>{t("Persönliche Beratung & enge Zusammenarbeit")}</li>
                        <li>{t("Hochwertige Qualität & Liebe zum Detail")}</li>
                        <li>{t("Termingerecht & zuverlässig")}</li>
                    </ul>
                    <Link href={href("/kontakt")} className="button button--rose">{t("Jetzt Projekt starten →")}</Link>
                </div>
                <Image src="/lumynery/business-brand.jpg" alt={t("Lumynery Brandingmaterialien")} width={574} height={383} />
            </section>

            <section className="business-process page-shell section-pad" aria-labelledby="business-process-title">
                <p>{t("So arbeiten wir")}</p>
                <h2 id="business-process-title">{t("Dein Projekt in besten Händen.")}</h2>
                <ol>
                    {steps.map(([icon, title, text], index) => (
                        <li key={title}>
                            <span aria-hidden>{icon}</span>
                            <h3>{index + 1}. {title}</h3>
                            <p>{text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="business-cta">
                <Image src="/lumynery/business-cta.jpg" alt={t("Bereit für dein nächstes Projekt?")} width={1028} height={383} />
                <div>
                    <h2>{t("Deine Vorteile")}</h2>
                    <ul>
                        <li>{t("Kostenlose Erstberatung")}</li>
                        <li>{t("Unverbindliches Angebot")}</li>
                        <li>{t("Schnelle Antwort garantiert")}</li>
                    </ul>
                    <Link href={href("/kontakt")} className="button button--rose">{t("Projekt anfragen")}</Link>
                </div>
            </section>
        </div>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/leistungen", "Leistungen für Unternehmen", "Websites, Apps, Visitenkarten und Flyer – individuell gestaltet für deinen Erfolg.");
}
