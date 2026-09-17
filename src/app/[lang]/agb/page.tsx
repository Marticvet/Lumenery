import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export default async function TermsPage(props: LocalePageProps) {
    const { t } = await getPageContext(props);

    return (
        <article className="legal-page legal-page--terms inner-page page-shell">
            <p>{t("Lumynery")}</p>
            <p>{t("Stand: August 2026")}</p>
            <h1 className="sr-only">{t("Allgemeine Geschäftsbedingungen")}</h1>
            <section>
                <h2>{t("1. Geltungsbereich")}</h2>
                <p>{t("Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Lumynery (nachfolgend „Anbieter“) und seinen Kunden über die Erbringung von Design-, Webdesign-, Branding-, Druck- und Kreativdienstleistungen sowie den Verkauf individuell angefertigter Produkte.")}</p>
                <p>{t("Mit der Beauftragung erkennt der Kunde diese AGB an.")}</p>
            </section>
            <section>
                <h2>{t("2. Leistungen")}</h2>
                <p>{t("Lumynery bietet insbesondere folgende Leistungen an:")}</p>
                <ul>
                    <li>{t("Webdesign")}</li><li>{t("Logo-Design")}</li><li>{t("Corporate Design")}</li><li>{t("Visitenkarten")}</li><li>{t("Flyer")}</li><li>{t("Speisekarten")}</li><li>{t("Social-Media-Design")}</li><li>{t("Werbegrafiken")}</li><li>{t("Hochzeits- und Eventpapeterie")}</li><li>{t("Geschenksets")}</li><li>{t("Individuelle Designlösungen")}</li>
                </ul>
                <p>{t("Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot.")}</p>
            </section>
            <section>
                <h2>{t("3. Vertragsschluss")}</h2>
                <p>{t("Ein Vertrag kommt zustande, sobald ein Angebot schriftlich oder elektronisch angenommen wird, der Auftrag schriftlich bestätigt wird oder Lumynery mit der Bearbeitung des Auftrags beginnt.")}</p>
            </section>
            <section>
                <h2>{t("4. Projektbeginn, Stornierung und Aufwandsentschädigung")}</h2>
                <p>{t("Mit der Bearbeitung individuell angefertigter Produkte oder Dienstleistungen beginnt Lumynery nach Auftragserteilung.")}</p>
                <p>{t("Wird ein bereits begonnenes Projekt vom Kunden storniert oder nicht weitergeführt und die bis dahin erbrachte Leistung nicht bezahlt, behält sich Lumynery vor, eine Aufwandsentschädigung in Höhe von 30,00 € zu berechnen, sofern die Stornierung mehr als 72 Stunden nach Projektbeginn erfolgt.")}</p>
                <p>{t("Diese Regelung gilt ausschließlich für individuell angefertigte Leistungen mit größerem Arbeitsaufwand, insbesondere Webdesign, Flyer, Werbeanzeigen für Social Media, Branding-Projekte, Geschenksets oder personalisierte Produkte ab einem Warenwert von 30 € sowie sonstige individuell angefertigte Designleistungen.")}</p>
                <p>{t("Hat Lumynery bis zum Zeitpunkt der Stornierung bereits einen höheren Arbeitsaufwand erbracht, kann anstelle der pauschalen Aufwandsentschädigung die Vergütung des tatsächlich entstandenen Aufwands verlangt werden, soweit dies gesetzlich zulässig ist.")}</p>
            </section>
            <section>
                <h2>{t("5. Preise")}</h2>
                <p>{t("Es gelten die im jeweiligen Angebot vereinbarten Preise.")}</p>
                <p>{t("Zusätzliche Leistungen oder nachträgliche Änderungswünsche, die nicht Bestandteil des ursprünglichen Angebots sind, werden gesondert berechnet.")}</p>
            </section>
            <section>
                <h2>{t("6. Zahlungsbedingungen")}</h2>
                <p>{t("Rechnungen mit einem Gesamtbetrag bis 150,00 € sind innerhalb von 48 Stunden nach Rechnungsstellung zu bezahlen, sofern nichts anderes vereinbart wurde.")}</p>
                <p>{t("Bei Rechnungen über 150,00 € gelten die im jeweiligen Angebot vereinbarten Zahlungsbedingungen.")}</p>
                <p>{t("Geht die Zahlung nicht fristgerecht ein, behält sich Lumynery das Recht vor, die Bearbeitung oder Produktion des Auftrags bis zum vollständigen Zahlungseingang auszusetzen. Dadurch entstehende Verzögerungen gehen nicht zulasten von Lumynery.")}</p>
            </section>
            <section>
                <h2>{t("7. Korrekturen")}</h2>
                <p>{t("Korrekturen sind grundsätzlich im vereinbarten Preis enthalten.")}</p>
                <p>{t("Ausgenommen hiervon sind umfangreiche Änderungswünsche, deren Bearbeitung einen zusätzlichen Arbeitsaufwand von mehr als zwei Stunden erfordert. In diesem Fall behält sich Lumynery vor, den Mehraufwand nach vorheriger Information des Kunden gesondert zu berechnen.")}</p>
            </section>
            <section>
                <h2>{t("8. Lieferzeiten")}</h2>
                <p>{t("Angegebene Liefertermine dienen als Orientierung und sind unverbindlich, sofern nicht ausdrücklich schriftlich etwas anderes vereinbart wurde.")}</p>
                <p>{t("Lieferverzögerungen aufgrund höherer Gewalt oder fehlender Mitwirkung des Kunden verlängern die Lieferzeit entsprechend.")}</p>
            </section>
            <section>
                <h2>{t("9. Urheber- und Nutzungsrechte")}</h2>
                <p>{t("Alle Entwürfe, Designs und Konzepte bleiben bis zur vollständigen Bezahlung Eigentum von Lumynery.")}</p>
                <p>{t("Nach vollständiger Zahlung erhält der Kunde die vereinbarten Nutzungsrechte im vereinbarten Umfang.")}</p>
                <p>{t("Eine Weitergabe, Veränderung oder Vervielfältigung der Designs ist ohne ausdrückliche Zustimmung von Lumynery nicht gestattet.")}</p>
            </section>
            <section>
                <h2>{t("10. Referenznutzung")}</h2>
                <p>{t("Lumynery ist berechtigt, abgeschlossene Projekte zu Werbezwecken auf der eigenen Website sowie auf Social-Media-Plattformen zu präsentieren, sofern der Kunde dem nicht ausdrücklich vor Projektbeginn widerspricht.")}</p>
            </section>
            <section>
                <h2>{t("11. Haftung")}</h2>
                <p>{t("Lumynery haftet ausschließlich für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden.")}</p>
                <p>{t("Für Inhalte, Bilder, Logos oder Texte, die vom Kunden bereitgestellt werden, übernimmt Lumynery keine Haftung. Der Kunde versichert, dass er über die erforderlichen Nutzungsrechte verfügt.")}</p>
            </section>
            <section>
                <h2>{t("12. Datenschutz")}</h2>
                <p>{t("Personenbezogene Daten werden ausschließlich im Rahmen der geltenden Datenschutzgesetze verarbeitet.")}</p>
                <p>{t("Weitere Informationen enthält die Datenschutzerklärung.")}</p>
            </section>
            <section>
                <h2>{t("13. Schlussbestimmungen")}</h2>
                <p>{t("Es gilt das Recht der Bundesrepublik Deutschland.")}</p>
                <p>{t("Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.")}</p>
            </section>
        </article>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/agb", "Allgemeine Geschäftsbedingungen", undefined);
}
