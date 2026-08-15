import Image from "next/image";
import Link from "next/link";

const services = [
    {
        image: "/lumynery/service-private.jpg",
        alt: "Personalisiertes Geschenkset",
        title: "Für besondere Momente",
        items: [
            "Hochzeitspapeterie",
            "Geburtstags- & Eventdesign",
            "Personalisierte Geschenke",
            "Dekoration & Gastgeschenke",
            "Individuelle Papeterie",
        ],
    },
    {
        image: "/lumynery/service-business.jpg",
        alt: "Lumynery Markenmaterialien",
        title: "Für Unternehmen",
        items: [
            "Logo Design",
            "Corporate Identity",
            "Branding",
            "Visitenkarten",
            "Flyer",
            "Broschüren",
            "Social Media Design",
            "Verpackungsdesign",
        ],
    },
    {
        image: "/lumynery/service-digital.jpg",
        alt: "Digitale Lumynery Lösung auf einem Laptop",
        title: "Digitale Lösungen",
        intro: "Nach individueller Beratung bieten wir gemeinsam mit unserem Entwicklungspartner:",
        items: [
            "Webdesign",
            "UX/UI Design",
            "Mobile App Design",
            "Website-Entwicklung",
            "Mobile Anwendungen",
            "Individuelle Softwarelösungen",
        ],
    },
];

const process = [
    ["Kennenlernen", "Wir lernen deine Idee, deine Ziele und deine Vision kennen."],
    ["Konzept", "Wir entwickeln ein individuelles Designkonzept."],
    ["Gestaltung", "Jedes Detail wird mit Präzision und Kreativität ausgearbeitet."],
    ["Umsetzung", "Wir begleiten dein Projekt bis zum fertigen Ergebnis."],
];

const reasons = [
    ["/lumynery/icon-personal.jpg", "Persönlich & individuell", "Wir nehmen uns Zeit für dich und dein Event. Jedes Design wird individuell nach deinen Wünschen gestaltet."],
    ["/lumynery/icon-heart-design.jpg", "Design mit Herz", "Ästhetik, Feingefühl und Liebe zum Detail – das ist unser Anspruch. Für Papeterie, die Emotionen weckt."],
    ["/lumynery/icon-quality.jpg", "Hochwertige Qualität", "Wir verwenden ausgewählte Materialien und legen höchsten Wert auf eine erstklassige Verarbeitung."],
    ["/lumynery/icon-all-in-one.jpg", "Alles aus einer Hand", "Von der ersten Idee bis zur finalen Umsetzung – wir begleiten dich durch den gesamten Prozess."],
    ["/lumynery/icon-reliable.jpg", "Zuverlässig & pünktlich", "Deine Zeit ist wertvoll. Wir arbeiten strukturiert, professionell und liefern termingerecht."],
    ["/lumynery/icon-moments.jpg", "Besondere Momente", "Wir gestalten Papeterie, die nicht nur zum Look deines Events passt, sondern deine Geschichte widerspiegelt."],
];

export default function Home() {
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
                        alt="Lumynery"
                        width={250}
                        height={300}
                        priority
                        className="hero__mark"
                    />
                    <h1 id="hero-title">LUMYNERY</h1>
                    <p>Creating meaningful experiences.</p>
                    <Link href="#ueber-uns" className="button button--light">
                        Mehr entdecken
                    </Link>
                    <div className="hero__socials" aria-label="Social Media">
                        <a href="https://www.facebook.com/" aria-label="Lumynery auf Facebook">f</a>
                        <a href="https://www.instagram.com/" aria-label="Lumynery auf Instagram">◎</a>
                    </div>
                </div>
            </section>

            <section id="ueber-uns" className="about-section page-shell section-pad">
                <div className="about-section__intro">
                    <div className="about-section__statement">
                        <p>Wo Kreativität auf Bedeutung trifft.</p>
                        <p>
                            LUMYNERY ist ein Design House für Menschen und Unternehmen, die Wert auf
                            Individualität, Qualität und zeitloses Design legen.
                        </p>
                        <p>
                            Wir gestalten nicht einfach Produkte – wir erschaffen Erlebnisse, die
                            Emotionen wecken, Geschichten erzählen und Marken stärken.
                        </p>
                    </div>
                    <div className="about-section__copy">
                        <h2>LUMYNERY</h2>
                        <h3>Creating Meaningful Experiences.</h3>
                        <p>
                            Wir gestalten einzigartige Erlebnisse durch Design. Von exklusiver
                            Papeterie und personalisierten Geschenken bis hin zu Markenidentitäten und
                            digitalen Lösungen – jedes Projekt wird individuell entwickelt und mit
                            Liebe zum Detail umgesetzt.
                        </p>
                        <div className="button-row">
                            <Link href="/kontakt" className="button button--rose">Projekt anfragen</Link>
                            <Link href="/katalog" className="button button--rose">Entdecken</Link>
                        </div>
                    </div>
                </div>
                <Image
                    src="/lumynery/about-scene.jpg"
                    alt="Lumynery Designatelier mit Blumen und Laptop"
                    width={1366}
                    height={370}
                    sizes="(max-width: 900px) 100vw, 1200px"
                    className="about-section__image"
                />
            </section>

            <section className="services-section page-shell section-pad" aria-labelledby="services-title">
                <h2 id="services-title" className="section-title section-title--left">Unsere Leistungen:</h2>
                <div className="service-grid">
                    {services.map((service) => (
                        <article className="service-card" key={service.title}>
                            <Image src={service.image} alt={service.alt} width={250} height={170} />
                            <h3>{service.title}</h3>
                            {service.intro && <p>{service.intro}</p>}
                            <ul>
                                {service.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                            <Link href="/leistungen" className="button button--rose">Mehr erfahren</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="process-section page-shell section-pad" aria-labelledby="process-title">
                <h2 id="process-title" className="section-title"><span>Unser Designprozess</span></h2>
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
                alt="Lumynery Designprozess mit Skizzen und handgefertigter Papeterie"
                width={1676}
                height={322}
                sizes="(max-width: 900px) 100vw, 1680px"
                className="process-banner page-shell"
            />

            <section className="story-section">
                <Image
                    src="/lumynery/story-complete.jpg"
                    alt="Warum Lumynery – individuelle Papeterie, die deine Geschichte erzählt"
                    width={1366}
                    height={380}
                    sizes="(max-width: 900px) 100vw, 1680px"
                />
                <div className="sr-only">
                    <p>Warum LUMYNERY?</p>
                    <h2>Weil jedes Detail<br /><em>deine Geschichte erzählt</em></h2>
                    <p>
                        Bei Lumynery Design House schaffen wir individuelle Papeterie, mehr als nur
                        schön – sie ist ein Gefühl, eine Erinnerung, ein Versprechen. Für besondere
                        Momente, die bleiben.
                    </p>
                </div>
            </section>

            <section className="reasons-section page-shell section-pad" aria-labelledby="reasons-title">
                <h2 id="reasons-title" className="section-title">
                    Darum entscheiden sich unsere Kunden<br />für LUMYNERY
                </h2>
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
                    <Image src="/lumynery/promise.jpg" alt="Individuelle Hochzeitskarte" width={300} height={180} />
                    <div>
                        <p className="eyebrow">Unser Versprechen</p>
                        <h3>Mehr als Design –<br />eine Erinnerung fürs Leben.</h3>
                        <p>
                            Wir glauben daran, dass die kleinen Details die größten Erinnerungen schaffen.
                            Deshalb ist es unser Ziel, Papeterie zu gestalten, die dich und deine Gäste berührt.
                        </p>
                    </div>
                </div>
            </section>

            <section className="inquiry-card page-shell">
                <h2>Wir freuen uns auf deine Anfrage</h2>
                <div>
                    <p>Jedes Projekt beginnt mit einer Idee – und wir freuen uns darauf, sie gemeinsam mit dir Wirklichkeit werden zu lassen.</p>
                    <p>Ob Hochzeit, Unternehmen oder ein ganz persönliches Design – wir begleiten dich von der ersten Inspiration bis zum fertigen Ergebnis.</p>
                </div>
                <p>Wir freuen uns darauf, dich kennenzulernen und etwas Einzigartiges für dich zu gestalten.</p>
                <Link href="/kontakt" className="button button--rose">Jetzt anfragen</Link>
            </section>
        </div>
    );
}
