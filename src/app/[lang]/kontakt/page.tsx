import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

import { FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { ui } from "@/i18n/ui";
import ContactForm from "@/components/ContactForm";
import { getContactEmail } from "@/config/site";

type ContactPageProps = LocalePageProps & {searchParams: Promise<{product?: string | string[]; quantity?: string | string[]}>};

export default async function ContactPage(props: ContactPageProps) {
    const { locale, t } = await getPageContext(props);
    const search = await props.searchParams;
    const email = getContactEmail();
    const initialProduct = typeof search.product === "string" ? search.product.trim().slice(0, 200) : "";
    const requestedQuantity = typeof search.quantity === "string" && /^[1-9]\d{0,3}$/.test(search.quantity) ? search.quantity : "1";

    return (
        <div className="contact-page">
            <div className="contact-page__content page-shell">
                <ContactForm locale={locale} t={ui[locale].form} initialProduct={initialProduct} initialQuantity={requestedQuantity} />
                <section className="contact-channels" aria-labelledby="contact-channels-title">
                    <h2 id="contact-channels-title">{t("Oder kontaktiere uns über:")}</h2>
                    <a href="https://www.facebook.com/" className="contact-channel contact-channel--facebook">
                        <span aria-hidden><FaFacebookF /></span>{t("LUMYNERY.DESIGN")}</a>
                    <a href="https://www.instagram.com/" className="contact-channel contact-channel--instagram">
                        <span aria-hidden><FaInstagram /></span>{t("LUMYNERY.DESIGN")}</a>
                    {email && <a href={`mailto:${email}`} className="contact-channel contact-channel--email">
                        <span aria-hidden><FaEnvelope /></span>{t("EMAIL")}</a>}
                </section>
            </div>
        </div>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "/kontakt", "Kontakt", "Nimm Kontakt mit Lumynery auf und erzähle uns von deinem Projekt.");
}
