import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function ImprintPage() {
    return (
        <article className="legal-page legal-page--imprint inner-page page-shell">
            <h1>Impressum</h1>
            <section>
                <p>Angaben gemäß § 5 DDG</p>
                <p>Lumynery<br />Inhaberin: Petya Mandzhukova<br />Weidengraben 3<br />63863 Eschau<br />Deutschland<br />E-Mail: hello@lumynery.de</p>
            </section>
            <section>
                <h2>Umsatzsteuer</h2>
                <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.</p>
                <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV<br />Petya Mandzhukova<br />Anschrift wie oben.</p>
            </section>
            <section>
                <h2>EU-Streitschlichtung</h2>
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/</p>
                <p>Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </section>
            <section>
                <h2>Haftung für Inhalte</h2>
                <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.</p>
            </section>
            <section>
                <h2>Haftung für Links</h2>
                <p>Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss und übernehmen hierfür keine Gewähr.</p>
            </section>
            <section>
                <h2>Urheberrecht</h2>
                <p>Die auf dieser Website veröffentlichten Inhalte, Designs, Bilder und Grafiken unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der gesetzlichen Grenzen bedarf der vorherigen schriftlichen Zustimmung von Lumynery.</p>
            </section>
        </article>
    );
}
