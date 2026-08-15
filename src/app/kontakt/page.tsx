import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Kontakt",
    description: "Nimm Kontakt mit Lumynery auf und erzähle uns von deinem Projekt.",
};

export default function ContactPage() {
    return (
        <div className="contact-page">
            <div className="contact-page__content page-shell">
                <ContactForm />
                <section className="contact-channels" aria-labelledby="contact-channels-title">
                    <h2 id="contact-channels-title">Oder kontaktiere uns über:</h2>
                    <a href="https://www.facebook.com/" className="contact-channel contact-channel--facebook">
                        <span>f</span>LUMYNERY.DESIGN
                    </a>
                    <a href="https://www.instagram.com/" className="contact-channel contact-channel--instagram">
                        <span>◎</span>LUMYNERY.DESIGN
                    </a>
                    <a href="mailto:hello@lumynery.de" className="contact-channel contact-channel--email">
                        <span>✉</span>EMAIL
                    </a>
                </section>
            </div>
        </div>
    );
}
