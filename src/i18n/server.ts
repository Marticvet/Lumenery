import "server-only";
import { notFound } from "next/navigation";
import { hasLocale, localePath, type Locale } from "./config";
import translations from "./translations.json";

export type LocalePageProps = { params: Promise<{ lang: string }> };
export type Translate = (source: string) => string;

export function getTranslator(locale: Locale): Translate {
    return (source) => {
        if (locale === "de") return source;
        const value = (translations as Record<string, string[]>)[source];
        if (!value) throw new Error(`Missing ${locale} translation: ${source}`);
        return value[locale === "en" ? 0 : 1];
    };
}

export async function getPageContext({ params }: LocalePageProps) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    return { locale: lang, t: getTranslator(lang), href: (path: string) => localePath(lang, path) };
}
