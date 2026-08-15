"use client";

import styles from "../scss/home/home.module.css";
import Image from "next/image";

const socials = {
    facebook: "https://www.facebook.com/your-page",
    instagram: "https://www.instagram.com/your-page",
};

export default function Home() {
    return (
        <div className={styles.homePage}>
            <div className={styles.landingView}>
                <Image
                    src="/homePageImage.jpeg"
                    alt="Lumynery Home Page Background"
                    fill
                    priority
                    className={styles.background}
                />

                <div className={styles.content}>
                    <Image
                        src="/lumynery-logo-vector-transparent.svg"
                        alt="Lumynery logo"
                        width={300}
                        height={160}
                        priority
                        className={styles.logo}
                    />

                    <h1>LUMYNERY</h1>

                    <p>CREATING MEANINGFUL EXPERIENCES.</p>

                    <button>More</button>

                    <div className={styles.socials}>
                        <a
                            href={`${socials.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8h3.4Z"
                                />
                            </svg>
                        </a>

                        <a
                            href={`${socials.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.75 6.25a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.about}>
                <div className={styles.topContainer}>
                    <div className={styles.leftSide}>
                        <h2>Wo Kreativität auf Bedeutung trifft.</h2>
                        <h2>
                            LUMYNERY ist ein Design House für Menschen und
                            Unternehmen, die Wert auf Individualität, Qualität
                            und zeitloses Design legen.
                        </h2>
                        <h2>
                            Wir gestalten nicht einfach Produkte – wir
                            erschaffen Erlebnisse, die Emotionen wecken,
                            Geschichten erzählen und Marken stärken
                        </h2>
                    </div>
                    <div className={styles.rightSide}>
                        <h1>LUMYNERY</h1>

                        <p>Creating Meaningful Experiences.</p>
                        <p>
                            Wir gestalten einzigartige Erlebnisse durch Design.
                            Von exklusiver Papeterie und personalisierten
                            Geschenken bis hin zu Markenidentitäten und
                            digitalen Lösungen – jedes Projekt wird individuell
                            entwickelt und mit Liebe zum Detail umgesetzt.
                        </p>

                        <div className={styles.buttonsContainer}>
                            <button>Projekt anfragen</button>
                            <button>Entdecken</button>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomContainer}>
                    <div className={styles.bottomContainerImageWrapper}>
                        <Image
                            src="/about-lumynery-homepage.jpeg"
                            alt="Lumynery logo"
                            width={300}
                            height={160}
                            priority
                            className={styles.logo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
