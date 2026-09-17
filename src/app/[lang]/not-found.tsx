"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, hasLocale, localePath } from "@/i18n/config";
import { ui } from "@/i18n/ui";

export default function NotFound() {
    const segment = usePathname().split("/")[1];
    const locale = hasLocale(segment) ? segment : defaultLocale;
    const t = ui[locale].notFound;
    return <section className="legal-page inner-page page-shell not-found"><h1>{t.title}</h1><p>{t.text}</p><Link className="button button--rose" href={localePath(locale)}>{t.action}</Link></section>;
}
