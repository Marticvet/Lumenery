import type { Locale } from "./config";

export const ui = {
    de: {
        nav: { about: "Über uns", catalog: "Katalog", services: "Leistungen", contact: "Kontakt", label: "Hauptnavigation", home: "Lumynery Startseite", language: "Sprache wählen" },
        footer: { love: "Mit Liebe zum Detail", designs: "Für einzigartige Designs", sustainable: "Nachhaltig gedacht", materials: "Bewusste Materialauswahl", personal: "Persönliche Begleitung", here: "Wir sind für dich da", people: "Für besondere Menschen", countries: "In Deutschland & Bulgarien", rights: "Alle Rechte vorbehalten.", legal: "Rechtliches", imprint: "Impressum", privacy: "Datenschutz", terms: "AGB" },
        form: {
            title: "Kontaktformular", name: "Dein Name", email: "Deine E-Mail", address: "Deine Adresse (optional)", phone: "Deine Telefonnummer (optional)", message: "Dein Anliegen", submit: "Senden", sending: "Wird gesendet …",
            notice: "Deine Angaben werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.", privacy: "Informationen zum Datenschutz",
            success: "Danke! Deine Anfrage ist bei uns eingegangen.", reference: "Deine Referenznummer", confirmation: "Wir haben eine Bestätigung an {email} gesendet.", confirmationPending: "Deine Anfrage ist angekommen. Die Bestätigungs-E-Mail konnte jedoch nicht gesendet werden. Bitte bewahre deine Referenznummer auf.",
            error: "Deine Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.", unavailable: "Das Kontaktformular ist momentan nicht verfügbar. Bitte versuche es später erneut.",
            errors: { name: "Bitte gib deinen Namen ein (maximal 140 Zeichen).", email: "Bitte gib eine gültige E-Mail-Adresse ein.", address: "Bitte kürze die Adresse auf maximal 500 Zeichen.", phone: "Bitte prüfe deine Telefonnummer (maximal 60 Zeichen).", message: "Bitte beschreibe dein Anliegen (maximal 5.000 Zeichen)." },
        },
        analytics: { eyebrow: "Deine Privatsphäre", title: "Hilf uns, Lumynery zu verbessern", description: "Mit deiner Erlaubnis nutzen wir PostHog, um Seitenaufrufe, Besuchsdauer und Klicks auszuwerten. Heatmaps und Sitzungsaufzeichnungen helfen uns, die Bedienung zu verbessern. Formulareingaben werden maskiert und der Kontaktbereich von Aufzeichnungen ausgeschlossen.", accept: "Analyse erlauben", decline: "Ablehnen", settings: "Datenschutzeinstellungen" },
        notFound: { title: "Seite nicht gefunden", text: "Diese Seite ist leider nicht verfügbar.", action: "Zur Startseite" },
    },
    en: {
        nav: { about: "About us", catalog: "Catalog", services: "Services", contact: "Contact", label: "Main navigation", home: "Lumynery home", language: "Choose language" },
        footer: { love: "Made with care", designs: "For one-of-a-kind designs", sustainable: "Thoughtfully sustainable", materials: "Carefully chosen materials", personal: "Personal guidance", here: "We're here for you", people: "For special people", countries: "In Germany & Bulgaria", rights: "All rights reserved.", legal: "Legal information", imprint: "Legal notice", privacy: "Privacy", terms: "Terms & conditions" },
        form: {
            title: "Contact form", name: "Your name", email: "Your email", address: "Your address (optional)", phone: "Your phone number (optional)", message: "Your enquiry", submit: "Send enquiry", sending: "Sending …",
            notice: "Your details are used only to respond to your enquiry.", privacy: "Privacy information",
            success: "Thank you! We've received your enquiry.", reference: "Your reference number", confirmation: "We've sent a confirmation to {email}.", confirmationPending: "Your enquiry has arrived, but we couldn't send the confirmation email. Please keep your reference number.",
            error: "We couldn't send your enquiry. Please try again.", unavailable: "The contact form is currently unavailable. Please try again later.",
            errors: { name: "Please enter your name (up to 140 characters).", email: "Please enter a valid email address.", address: "Please keep the address within 500 characters.", phone: "Please check your phone number (up to 60 characters).", message: "Please describe your enquiry (up to 5,000 characters)." },
        },
        analytics: { eyebrow: "Your privacy", title: "Help us improve Lumynery", description: "With your permission, we use PostHog to understand page visits, time spent and clicks. Heatmaps and session recordings help us improve usability. Form inputs are masked and the contact area is excluded from recordings.", accept: "Allow analytics", decline: "Decline", settings: "Privacy choices" },
        notFound: { title: "Page not found", text: "This page is not available.", action: "Go to homepage" },
    },
    bg: {
        nav: { about: "За нас", catalog: "Каталог", services: "Услуги", contact: "Контакт", label: "Основна навигация", home: "Lumynery — начало", language: "Избор на език" },
        footer: { love: "С любов към детайла", designs: "За неповторими дизайни", sustainable: "С мисъл за природата", materials: "Внимателно подбрани материали", personal: "Лично отношение", here: "Ние сме до теб", people: "За специални хора", countries: "В Германия и България", rights: "Всички права запазени.", legal: "Правна информация", imprint: "Данни за доставчика", privacy: "Поверителност", terms: "Общи условия" },
        form: {
            title: "Форма за контакт", name: "Твоето име", email: "Твоят имейл", address: "Твоят адрес (незадължително)", phone: "Твоят телефон (незадължително)", message: "Твоето запитване", submit: "Изпрати запитване", sending: "Изпращане …",
            notice: "Данните ти се използват единствено за обработване на запитването.", privacy: "Информация за поверителността",
            success: "Благодарим! Получихме твоето запитване.", reference: "Твоят референтен номер", confirmation: "Изпратихме потвърждение на {email}.", confirmationPending: "Получихме запитването, но не успяхме да изпратим имейла за потвърждение. Моля, запази референтния номер.",
            error: "Не успяхме да изпратим запитването. Моля, опитай отново.", unavailable: "Формата за контакт временно не е достъпна. Моля, опитай по-късно.",
            errors: { name: "Моля, въведи името си (до 140 знака).", email: "Моля, въведи валиден имейл адрес.", address: "Моля, съкрати адреса до 500 знака.", phone: "Моля, провери телефонния номер (до 60 знака).", message: "Моля, опиши запитването си (до 5 000 знака)." },
        },
        analytics: { eyebrow: "Твоята поверителност", title: "Помогни ни да подобрим Lumynery", description: "С твое съгласие използваме PostHog за анализ на посещенията, времето на страниците и кликванията. Топлинни карти и записи на сесии ни помагат да подобрим сайта. Въведените данни са скрити, а зоната за контакт е изключена от записите.", accept: "Разрешавам анализа", decline: "Отказвам", settings: "Настройки за поверителност" },
        notFound: { title: "Страницата не е намерена", text: "Тази страница не е достъпна.", action: "Към началната страница" },
    },
} satisfies Record<Locale, unknown>;

export type UICopy = (typeof ui)[Locale];
