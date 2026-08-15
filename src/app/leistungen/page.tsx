import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Leistungen für Unternehmen",
    description: "Websites, Apps, Visitenkarten und Flyer – individuell gestaltet für deinen Erfolg.",
};

const offers = [
    ["▣", "Webdesign", "Moderne, responsive Webseiten, die deine Marke perfekt präsentieren und deine Kunden überzeugen."],
    ["▯", "Mobile Apps", "Individuelle Apps für iOS & Android – benutzerfreundlich, funktional und auf dein Business abgestimmt."],
    ["▤", "Visitenkarten", "Ein kleiner erster Eindruck, der im Gedächtnis bleibt – hochwertig und professionell gestaltet."],
    ["▧", "Flyer", "Kreative Flyer, die informieren, überzeugen und deine Botschaft eindrucksvoll transportieren."],
];

const steps = [
    ["✉", "Beratung", "Wir hören zu und verstehen deine Wünsche."],
    ["✎", "Konzept", "Wir entwickeln ein individuelles Konzept."],
    ["▧", "Design", "Wir gestalten dein Design mit Liebe zum Detail."],
    ["⬡", "Produktion", "Wir setzen alles um und bringen dein Projekt online."],
    ["♜", "Erfolg", "Du überzeugst deine Kunden und erreichst deine Ziele."],
];

export default function ServicesPage() {
    return (
        <div className="business-page inner-page">
            <section className="business-intro">
                <div>
                    <p className="eyebrow">Lumynery</p>
                    <h1>Designlösungen für Unternehmen,<br />die Eindruck hinterlassen.</h1>
                    <p>Professionelle Webseiten, mobile Anwendungen, Visitenkarten und Flyer – individuell gestaltet für deinen Erfolg.</p>
                    <Link href="/kontakt" className="button button--rose">Angebot anfordern →</Link>
                    <small>✓ Persönliche Beratung & maßgeschneiderte Lösung</small>
                </div>
                <Image src="/lumynery/business-hero.jpg" alt="Lumynery Website auf Laptop und Smartphone" width={528} height={350} priority />
            </section>

            <section className="business-offers page-shell section-pad" aria-labelledby="business-offers-title">
                <p className="eyebrow">Unsere Leistungen</p>
                <h2 id="business-offers-title" className="section-title">Alles aus einer Hand für deinen professionellen Auftritt.</h2>
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
                    <p className="eyebrow">Warum Lumynery?</p>
                    <h2>Dein Erfolg ist unser Ziel!</h2>
                    <p>Wir kombinieren Kreativität, Strategie und Design, um Lösungen zu schaffen, die nicht nur gut aussehen, sondern auch Ergebnisse liefern.</p>
                    <ul>
                        <li>Individuelle Designs – keine Vorlagen</li>
                        <li>Persönliche Beratung & enge Zusammenarbeit</li>
                        <li>Hochwertige Qualität & Liebe zum Detail</li>
                        <li>Termingerecht & zuverlässig</li>
                    </ul>
                    <Link href="/kontakt" className="button button--rose">Jetzt Projekt starten →</Link>
                </div>
                <Image src="/lumynery/business-brand.jpg" alt="Lumynery Brandingmaterialien" width={574} height={383} />
            </section>

            <section className="business-process page-shell section-pad" aria-labelledby="business-process-title">
                <p>So arbeiten wir</p>
                <h2 id="business-process-title">Dein Projekt in besten Händen.</h2>
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
                <Image src="/lumynery/business-cta.jpg" alt="Bereit für dein nächstes Projekt?" width={1028} height={383} />
                <div>
                    <h2>Deine Vorteile</h2>
                    <ul>
                        <li>Kostenlose Erstberatung</li>
                        <li>Unverbindliches Angebot</li>
                        <li>Schnelle Antwort garantiert</li>
                    </ul>
                    <Link href="/kontakt" className="button button--rose">Projekt anfragen</Link>
                </div>
            </section>
        </div>
    );
}
