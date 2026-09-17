import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { privacyCopy } from "@/i18n/privacy";
import { ui } from "@/i18n/ui";
import AnalyticsSettingsButton from "@/components/AnalyticsSettingsButton";

export default async function PrivacyPage(props: LocalePageProps) {
    const { locale, t } = await getPageContext(props);
    const copy = privacyCopy[locale];

    return (
        <article className="legal-page legal-page--privacy inner-page page-shell">
            <h1>{t("Datenschutz")}</h1>
            <section><h2>{copy.contactTitle}</h2><p>{copy.contact}</p></section>
            <section><h2>{copy.languageTitle}</h2><p>{copy.language}</p></section>
            <section><h2>{copy.analyticsTitle}</h2><p>{copy.analytics}</p></section>
            <section><h2>{copy.choiceTitle}</h2><p>{copy.choice}</p><AnalyticsSettingsButton label={ui[locale].analytics.settings} /></section>
        </article>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/datenschutz", "Datenschutz", undefined);
}
