import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaRegHeart, FaRegStar, FaRegUser } from "react-icons/fa6";
import { localePath, type Locale } from "@/i18n/config";
import type { UICopy } from "@/i18n/ui";
import AnalyticsSettingsButton from "./AnalyticsSettingsButton";

const values = [
    { icon: FaRegHeart, title: "love", text: "designs" },
    { icon: FaLeaf, title: "sustainable", text: "materials" },
    { icon: FaRegUser, title: "personal", text: "here" },
    { icon: FaRegStar, title: "people", text: "countries" },
] as const;

export default function Footer({ locale, t, privacySettings }: { locale: Locale; t: UICopy["footer"]; privacySettings: string }) {
    return (
        <footer className="site-footer">
            <div className="site-footer__values page-shell">
                <Link href={localePath(locale)} className="site-footer__logo" aria-label="Lumynery">
                    <Image
                        src="/lumynery-logo-vector-transparent.svg"
                        alt=""
                        width={115}
                        height={150}
                    />
                    <span>LUMYNERY</span>
                </Link>
                {values.map((value) => {
                    const Icon = value.icon;

                    return (
                        <div className="site-footer__value" key={value.title}>
                            <span aria-hidden><Icon /></span>
                            <p>{t[value.title]}</p>
                            <small>{t[value.text]}</small>
                        </div>
                    );
                })}
            </div>
            <div className="site-footer__bottom">
                <p>© LUMYNERY {new Date().getFullYear()} · {t.rights}</p>
                <nav aria-label={t.legal}>
                    <Link href={localePath(locale, "/impressum")}>{t.imprint}</Link>
                    <Link href={localePath(locale, "/datenschutz")}>{t.privacy}</Link>
                    <Link href={localePath(locale, "/agb")}>{t.terms}</Link>
                    <AnalyticsSettingsButton label={privacySettings} />
                </nav>
                <p className="site-footer__credit">
                    Design by LUMYNERY<br />Developed by BUILT FURTHER
                </p>
            </div>
        </footer>
    );
}
