import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { getSiteUrl } from "@/config/site";
import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { ui } from "@/i18n/ui";
import "../globals.css";

export async function generateMetadata(props: LocalePageProps): Promise<Metadata> {
    const { t } = await getPageContext(props);
    const base = getSiteUrl();
    const title = "Lumynery Design House";
    const description =
        t("Individuelle Papeterie, Markenidentitäten und digitale Lösungen mit Liebe zum Detail.");
    const image = new URL("/og.png", base).href;

    return {
        metadataBase: base,
        title: { default: title, template: "%s | Lumynery" },
        description,
        openGraph: {
            title,
            description,
            type: "website",
            images: [{ url: image, width: 1730, height: 909, alt: "Lumynery – Creating Meaningful Experiences" }],
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

export default async function RootLayout({ children, params }: LocalePageProps & { children: React.ReactNode }) {
    const { locale } = await getPageContext({ params });
    const copy = ui[locale];
    return (
        <html lang={locale}>
            <body>
                <Navbar locale={locale} t={copy.nav} />
                <main>{children}</main>
                <Footer locale={locale} t={copy.footer} privacySettings={copy.analytics.settings} />
                <AnalyticsConsent t={copy.analytics} />
            </body>
        </html>
    );
}
