export const locales = ["de", "en", "bg"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const localeCookie = "lumynery-locale";

export function hasLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
    const suffix = path === "/" ? "" : path.startsWith("/#") ? path.slice(1) : path;
    return `/${locale}${suffix}`;
}

// Only allow a local path belonging to the selected locale (including after URL normalization).
export function safeLocaleTarget(locale: Locale, path: string, origin: string) {
    if (!path.startsWith(`/${locale}/`) && path !== `/${locale}` && !path.startsWith(`/${locale}?`) && !path.startsWith(`/${locale}#`)) return null;
    const url = new URL(path, origin);
    if (url.origin !== origin || !(url.pathname === `/${locale}` || url.pathname.startsWith(`/${locale}/`))) return null;
    return url;
}
