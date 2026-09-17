import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { getContactEmail } from "@/config/site";

export default async function ImprintPage(props: LocalePageProps) {
    const { t } = await getPageContext(props);
    const email = getContactEmail();

    return (
        <article className="legal-page legal-page--imprint inner-page page-shell">
            <h1>{t("Impressum")}</h1>
            <section>
                <p>{t("Angaben gemäß § 5 DDG")}</p>
                <p>{t("Lumynery")}<br />{t("Inhaberin: Petya Mandzhukova")}<br />{t("Weidengraben 3")}<br />{t("63863 Eschau")}<br />{t("Deutschland")}{email && <><br />{t("E-Mail")}: <a href={`mailto:${email}`}>{email}</a></>}</p>
            </section>
            <section>
                <h2>{t("Umsatzsteuer")}</h2>
                <p>{t("Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.")}</p>
                <p>{t("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV")}<br />{t("Petya Mandzhukova")}<br />{t("Anschrift wie oben.")}</p>
            </section>
            <section>
                <h2>{t("EU-Streitschlichtung")}</h2>
                <p>{t("Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/")}</p>
                <p>{t("Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.")}</p>
            </section>
            <section>
                <h2>{t("Haftung für Inhalte")}</h2>
                <p>{t("Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.")}</p>
            </section>
            <section>
                <h2>{t("Haftung für Links")}</h2>
                <p>{t("Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss und übernehmen hierfür keine Gewähr.")}</p>
            </section>
            <section>
                <h2>{t("Urheberrecht")}</h2>
                <p>{t("Die auf dieser Website veröffentlichten Inhalte, Designs, Bilder und Grafiken unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der gesetzlichen Grenzen bedarf der vorherigen schriftlichen Zustimmung von Lumynery.")}</p>
            </section>
        </article>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/impressum", "Impressum", undefined);
}
