import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutz" };

export default function PrivacyPage() {
    return (
        <article className="legal-page legal-page--privacy inner-page page-shell">
            <h1>Datenschutz</h1>
        </article>
    );
}
