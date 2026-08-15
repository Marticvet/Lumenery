"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
    const [sent, setSent] = useState(false);

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSent(true);
        event.currentTarget.reset();
    }

    return (
        <form className="contact-form" onSubmit={submitForm}>
            <h1>Kontaktformular</h1>
            <label>
                Dein Name
                <input name="name" autoComplete="name" required />
            </label>
            <label>
                Deine E-Mail
                <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
                Deine Adresse
                <textarea name="address" rows={2} autoComplete="street-address" />
            </label>
            <label>
                Deine Telefonnummer
                <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
                Dein Anliegen
                <textarea name="message" rows={4} required />
            </label>
            <button type="submit" className="button button--muted">Senden</button>
            <small>Deine Angaben werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.</small>
            {sent && <p className="contact-form__success" role="status">Danke! Deine Anfrage wurde vorbereitet.</p>}
        </form>
    );
}
