import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";
import { defaultLocale, locales, localePath } from "./config";
import { getPageContext, type LocalePageProps } from "./server";

export async function pageMetadata(props: LocalePageProps, path: string, title: string, description?: string, image = "/og.png"): Promise<Metadata> {
    const { locale, t } = await getPageContext(props);
    const localizedTitle = t(title);
    const localizedDescription = t(description || "Individuelle Papeterie, Markenidentitäten und digitale Lösungen mit Liebe zum Detail.");
    const imageUrl = new URL(image, getSiteUrl()).href;
    return {
        title: localizedTitle,
        description: localizedDescription,
        alternates: {
            canonical: localePath(locale, path),
            languages: { ...Object.fromEntries(locales.map((lang) => [lang, localePath(lang, path)])), "x-default": localePath(defaultLocale, path) },
        },
        openGraph: { title: localizedTitle, description: localizedDescription, type: "website", locale, url: localePath(locale, path), images: [{ url: imageUrl, alt: localizedTitle }] },
        twitter: { card: "summary_large_image", title: localizedTitle, description: localizedDescription, images: [imageUrl] },
    };
}
