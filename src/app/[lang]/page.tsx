import { getPageContext, type LocalePageProps } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import Image from "next/image";
import Link from "next/link";

export default async function Home(props: LocalePageProps) {
    const { locale, t, href } = await getPageContext(props);
    const services = [
        {
            image: "/lumynery/service-private.jpg",
            alt: t("Personalisiertes Geschenkset"),
            title: t("Für besondere Momente"),
            items: [
                t("Hochzeitspapeterie"),
                t("Geburtstags- & Eventdesign"),
                t("Personalisierte Geschenke"),
                t("Dekoration & Gastgeschenke"),
                t("Individuelle Papeterie"),
            ],
        },
        {
            image: "/lumynery/service-business.jpg",
            alt: t("Lumynery Markenmaterialien"),
            title: t("Für Unternehmen"),
            items: [
                t("Logo Design"),
                t("Corporate Identity"),
                t("Branding"),
                t("Visitenkarten"),
                t("Flyer"),
                t("Broschüren"),
                t("Social Media Design"),
                t("Verpackungsdesign"),
            ],
        },
        {
            image: "/lumynery/service-digital.jpg",
            alt: t("Digitale Lumynery Lösung auf einem Laptop"),
            title: t("Digitale Lösungen"),
            intro: t("Nach individueller Beratung bieten wir gemeinsam mit unserem Entwicklungspartner:"),
            items: [
                t("Webdesign"),
                t("UX/UI Design"),
                t("Mobile App Design"),
                t("Website-Entwicklung"),
                t("Mobile Anwendungen"),
                t("Individuelle Softwarelösungen"),
            ],
        },
    ];
    const process = [
        [t("Kennenlernen"), t("Wir lernen deine Idee, deine Ziele und deine Vision kennen.")],
        [t("Konzept"), t("Wir entwickeln ein individuelles Designkonzept.")],
        [t("Gestaltung"), t("Jedes Detail wird mit Präzision und Kreativität ausgearbeitet.")],
        [t("Umsetzung"), t("Wir begleiten dein Projekt bis zum fertigen Ergebnis.")],
    ];
    const reasons = [
        ["/lumynery/icon-personal.jpg", t("Persönlich & individuell"), t("Wir nehmen uns Zeit für dich und dein Event. Jedes Design wird individuell nach deinen Wünschen gestaltet.")],
        ["/lumynery/icon-heart-design.jpg", t("Design mit Herz"), t("Ästhetik, Feingefühl und Liebe zum Detail – das ist unser Anspruch. Für Papeterie, die Emotionen weckt.")],
        ["/lumynery/icon-quality.jpg", t("Hochwertige Qualität"), t("Wir verwenden ausgewählte Materialien und legen höchsten Wert auf eine erstklassige Verarbeitung.")],
        ["/lumynery/icon-all-in-one.jpg", t("Alles aus einer Hand"), t("Von der ersten Idee bis zur finalen Umsetzung – wir begleiten dich durch den gesamten Prozess.")],
        ["/lumynery/icon-reliable.jpg", t("Zuverlässig & pünktlich"), t("Deine Zeit ist wertvoll. Wir arbeiten strukturiert, professionell und liefern termingerecht.")],
        ["/lumynery/icon-moments.jpg", t("Besondere Momente"), t("Wir gestalten Papeterie, die nicht nur zum Look deines Events passt, sondern deine Geschichte widerspiegelt.")],
    ];

    return (
        <div className="home-page">
            <section className="hero" aria-labelledby="hero-title">
                <Image
                    src="/homePageImage.jpeg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="hero__background"
                />
                <div className="hero__veil" />
                <div className="hero__content">
                    <Image
                        src="/lumynery-logo-vector-transparent.svg"
                        alt={t("Lumynery")}
                        width={250}
                        height={300}
                        priority
                        className="hero__mark"
                    />
                    <h1 id="hero-title">{t("LUMYNERY")}</h1>
                    <p>{t("Creating meaningful experiences.")}</p>
                    <Link href="#ueber-uns" className="button button--light">
                        {t("Mehr entdecken")}</Link>
                    <div className="hero__socials" aria-label={t("Social Media")}>
                        <a href="https://www.facebook.com/" aria-label={t("Lumynery auf Facebook")}>{t("f")}</a>
                        <a href="https://www.instagram.com/" aria-label={t("Lumynery auf Instagram")}>◎</a>
                    </div>
                </div>
            </section>

            <section id="ueber-uns" className="about-section page-shell section-pad">
                <div className="about-section__intro">
                    <div className="about-section__statement">
                        <p>{t("Wo Kreativität auf Bedeutung trifft.")}</p>
                        <p>
                            {t("LUMYNERY ist ein Design House für Menschen und Unternehmen, die Wert auf Individualität, Qualität und zeitloses Design legen.")}</p>
                        <p>
                            {t("Wir gestalten nicht einfach Produkte – wir erschaffen Erlebnisse, die Emotionen wecken, Geschichten erzählen und Marken stärken.")}</p>
                    </div>
                    <div className="about-section__copy">
                        <h2>{t("LUMYNERY")}</h2>
                        <h3>{t("Creating Meaningful Experiences.")}</h3>
                        <p>
                            {t("Wir gestalten einzigartige Erlebnisse durch Design. Von exklusiver Papeterie und personalisierten Geschenken bis hin zu Markenidentitäten und digitalen Lösungen – jedes Projekt wird individuell entwickelt und mit Liebe zum Detail umgesetzt.")}</p>
                        <div className="button-row">
                            <Link href={href("/kontakt")} className="button button--rose">{t("Projekt anfragen")}</Link>
                            <Link href={href("/katalog")} className="button button--rose">{t("Entdecken")}</Link>
                        </div>
                    </div>
                </div>
                <Image
                    src="/lumynery/about-scene.jpg"
                    alt={t("Lumynery Designatelier mit Blumen und Laptop")}
                    width={1366}
                    height={370}
                    sizes="(max-width: 900px) 100vw, 1200px"
                    className="about-section__image"
                />
            </section>

            <section className="services-section page-shell section-pad" aria-labelledby="services-title">
                <h2 id="services-title" className="section-title section-title--left">{t("Unsere Leistungen:")}</h2>
                <div className="service-grid">
                    {services.map((service) => (
                        <article className="service-card" key={service.title}>
                            <Image src={service.image} alt={service.alt} width={250} height={170} />
                            <h3>{service.title}</h3>
                            {service.intro && <p>{service.intro}</p>}
                            <ul>
                                {service.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                            <Link href={href("/leistungen")} className="button button--rose">{t("Mehr erfahren")}</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="process-section page-shell section-pad" aria-labelledby="process-title">
                <h2 id="process-title" className="section-title"><span>{t("Unser Designprozess")}</span></h2>
                <ol className="process-list">
                    {process.map(([title, text], index) => (
                        <li key={title}>
                            <span className="process-list__number">{index + 1}</span>
                            <div><h3>{title}</h3><p>{text}</p></div>
                        </li>
                    ))}
                </ol>
            </section>

            <Image
                src="/lumynery/process-banner.jpg"
                alt={t("Lumynery Designprozess mit Skizzen und handgefertigter Papeterie")}
                width={1676}
                height={322}
                sizes="(max-width: 900px) 100vw, 1680px"
                className="process-banner page-shell"
            />

            <section className={`story-section${locale !== "de" ? " story-section--translated" : ""}`}>
                <Image
                    src={locale === "de" ? "/lumynery/story-complete.jpg" : "/lumynery/story-detail.jpg"}
                    alt={t("Warum Lumynery – individuelle Papeterie, die deine Geschichte erzählt")}
                    width={1366}
                    height={380}
                    sizes="(max-width: 900px) 100vw, 1680px"
                />
                <div className={locale === "de" ? "sr-only" : "story-section__translation"}>
                    <p>{t("Warum LUMYNERY?")}</p>
                    <h2>{t("Weil jedes Detail")}<br /><em>{t("deine Geschichte erzählt")}</em></h2>
                    <p>
                        {t("Bei Lumynery Design House schaffen wir individuelle Papeterie, mehr als nur schön – sie ist ein Gefühl, eine Erinnerung, ein Versprechen. Für besondere Momente, die bleiben.")}</p>
                </div>
            </section>

            <section className="reasons-section page-shell section-pad" aria-labelledby="reasons-title">
                <h2 id="reasons-title" className="section-title">
                    {t("Darum entscheiden sich unsere Kunden")}<br />{t("für LUMYNERY")}</h2>
                <div className="ornament" aria-hidden>──────── ♡ ────────</div>
                <div className="reasons-grid">
                    {reasons.map(([icon, title, text]) => (
                        <article key={title}>
                            <Image className="reason-icon" src={icon} alt="" width={100} height={90} />
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </article>
                    ))}
                </div>
                <div className="promise-card">
                    <Image src="/lumynery/promise.jpg" alt={t("Individuelle Hochzeitskarte")} width={300} height={180} />
                    <div>
                        <p className="eyebrow">{t("Unser Versprechen")}</p>
                        <h3>{t("Mehr als Design –")}<br />{t("eine Erinnerung fürs Leben.")}</h3>
                        <p>
                            {t("Wir glauben daran, dass die kleinen Details die größten Erinnerungen schaffen. Deshalb ist es unser Ziel, Papeterie zu gestalten, die dich und deine Gäste berührt.")}</p>
                    </div>
                </div>
            </section>

            <section className="inquiry-card page-shell">
                <h2>{t("Wir freuen uns auf deine Anfrage")}</h2>
                <div>
                    <p>{t("Jedes Projekt beginnt mit einer Idee – und wir freuen uns darauf, sie gemeinsam mit dir Wirklichkeit werden zu lassen.")}</p>
                    <p>{t("Ob Hochzeit, Unternehmen oder ein ganz persönliches Design – wir begleiten dich von der ersten Inspiration bis zum fertigen Ergebnis.")}</p>
                </div>
                <p>{t("Wir freuen uns darauf, dich kennenzulernen und etwas Einzigartiges für dich zu gestalten.")}</p>
                <Link href={href("/kontakt")} className="button button--rose">{t("Jetzt anfragen")}</Link>
            </section>
        </div>
    );
}

export async function generateMetadata(props: LocalePageProps) {
    return pageMetadata(props, "", "Lumynery Design House", undefined);
}
