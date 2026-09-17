/* eslint-disable @typescript-eslint/no-require-imports */
// Test the real TypeScript modules with isolated, mocked external services.
// No SMTP messages or analytics requests leave this test process.
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const root = path.resolve(__dirname, "..");

function setEnvironment(t, values) {
    const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
    Object.assign(process.env, values);
    t.after(() => {
        for (const [key, value] of Object.entries(previous)) {
            if (value === undefined) delete process.env[key]; else process.env[key] = value;
        }
    });
}

function loader(mocks = {}) {
    const cache = new Map();
    function load(file) {
        const filename = path.resolve(root, file);
        if (cache.has(filename)) return cache.get(filename).exports;
        if (filename.endsWith(".json")) return JSON.parse(fs.readFileSync(filename, "utf8"));
        const loadedModule = { exports: {} };
        cache.set(filename, loadedModule);
        const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
            fileName: filename,
        }).outputText;
        const localRequire = (specifier) => {
            if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
            if (specifier === "server-only") return {};
            if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return require(specifier);
            const base = specifier.startsWith("@/") ? path.join(root, "src", specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
            return load([base, `${base}.ts`, `${base}.json`].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()));
        };
        new Function("require", "module", "exports", output)(localRequire, loadedModule, loadedModule.exports);
        return loadedModule.exports;
    }
    return load;
}

const submission = { kind: "project", locale: "en", data: { name: "Test Person", email: "visitor@example.test", message: "A wedding invitation, please.", address: "", phone: "", website: "" } };
const config = { host: "smtp.example.test", port: 465, secure: true, user: "hello@example.test", pass: "test-only", from: { name: "Lumynery", address: "hello@example.test" }, fromAddress: "hello@example.test", toAddress: "team@example.test" };

test("locale URLs, redirect safety and persisted selection", async () => {
    const load = loader();
    const { localePath, safeLocaleTarget } = load("src/i18n/config.ts");
    assert.equal(localePath("bg", "/#ueber-uns"), "/bg#ueber-uns");
    assert.equal(localePath("en", "/"), "/en");
    for (const target of ["//evil.test", "/de/kontakt", "/en/../../api/contact", "/en/%2e%2e/api/contact", "/en\\..\\api/contact"]) {
        assert.equal(safeLocaleTarget("en", target, "https://example.test"), null);
    }
    const { GET } = load("src/app/api/locale/route.ts");
    const response = GET(new NextRequest("https://example.test/api/locale?locale=bg&path=%2Fbg%2Fkatalog%3Fcategory%3Dall%23products"));
    assert.equal(response.headers.get("location"), "https://example.test/bg/katalog?category=all#products");
    assert.match(response.headers.get("set-cookie"), /lumynery-locale=bg/);
    assert.match(response.headers.get("set-cookie"), /HttpOnly/);
    assert.match(response.headers.get("set-cookie"), /Secure/);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const invalid = GET(new NextRequest("https://example.test/api/locale?locale=en&path=https://evil.test"));
    assert.equal(invalid.headers.get("location"), "https://example.test/de");
    assert.equal(invalid.headers.get("set-cookie"), null);
    const { proxy } = load("src/proxy.ts");
    assert.equal(proxy(new NextRequest("https://example.test/katalog?q=paper")).headers.get("location"), "https://example.test/de/katalog?q=paper");
    assert.equal(proxy(new NextRequest("https://example.test/kontakt", { headers: { cookie: "lumynery-locale=bg" } })).headers.get("location"), "https://example.test/bg/kontakt");
    assert.equal(proxy(new NextRequest("https://example.test/en/kontakt", { headers: { cookie: "lumynery-locale=bg" } })).headers.get("location"), null);
});

test("all translation entries and shared UI keys exist in English and Bulgarian", () => {
    const load = loader();
    const dictionary = load("src/i18n/translations.json");
    for (const [source, translations] of Object.entries(dictionary)) {
        assert.equal(translations.length, 2, source);
        for (const value of translations) assert.ok(typeof value === "string" && value.trim(), source);
    }
    const { ui } = load("src/i18n/ui.ts");
    const keys = (object, prefix = "") => Object.entries(object).flatMap(([key, value]) => typeof value === "object" ? keys(value, `${prefix}${key}.`) : `${prefix}${key}`);
    assert.deepEqual(keys(ui.de), keys(ui.en));
    assert.deepEqual(keys(ui.de), keys(ui.bg));
    function inspect(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const file = path.join(directory, entry.name);
            if (entry.isDirectory()) inspect(file);
            else if (/\.tsx?$/.test(file)) {
                const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
                function visit(node) {
                    if (ts.isCallExpression(node) && node.expression.getText(source) === "t" && ts.isStringLiteral(node.arguments[0])) {
                        assert.ok(dictionary[node.arguments[0].text], `${file}: ${node.arguments[0].text}`);
                    }
                    ts.forEachChild(node, visit);
                }
                visit(source);
            }
        }
    }
    inspect(path.join(root, "src/app/[lang]"));
});

test("submission validation trims input and rejects bad or oversized fields", () => {
    const { parseContactSubmission: parse } = loader()("src/lib/contact/submission.ts");
    for (const locale of ["de", "en", "bg"]) assert.equal(parse({ ...submission, locale }).status, "valid");
    assert.equal(parse({ ...submission, data: { ...submission.data, name: "  Test  " } }).submission.name, "Test");
    for (const body of [null, [], {}, { ...submission, locale: "fr" }, { ...submission, data: [] }]) assert.equal(parse(body).status, "invalid");
    for (const [field, value] of [["name", ""], ["name", "a\r\nBcc: x"], ["email", "bad"], ["message", "x".repeat(5001)], ["phone", 123]]) {
        const result = parse({ ...submission, data: { ...submission.data, [field]: value } });
        assert.equal(result.status, "invalid");
        assert.ok(result.fields.includes(field));
    }
    assert.equal(parse({ ...submission, data: { ...submission.data, website: "bot.example" } }).status, "honeypot");
});

test("SMTP config fails closed and always uses the authenticated mailbox as sender", (t) => {
    const vars = { SMTP_HOST: config.host, SMTP_PORT: "465", SMTP_SECURE: "true", SMTP_USER: config.user, SMTP_PASS: config.pass, MAIL_FROM_NAME: "Lumynery", MAIL_FROM_ADDRESS: config.fromAddress, MAIL_TO_ADDRESS: config.toAddress };
    setEnvironment(t, vars);
    let options;
    const mail = loader({ nodemailer: { createTransport: (value) => { options = value; return {}; } } })("src/lib/email/transporter.ts");
    const parsed = mail.getMailConfig();
    mail.createMailTransporter(parsed);
    assert.equal(options.auth.user, config.fromAddress);
    assert.equal(options.secure, true);
    process.env.MAIL_FROM_ADDRESS = "different@example.test";
    assert.throws(mail.getMailConfig, mail.MailConfigurationError);
    process.env.MAIL_FROM_ADDRESS = config.fromAddress;
    process.env.SMTP_HOST = "";
    assert.throws(mail.getMailConfig, mail.MailConfigurationError);
});

test("localized mail templates escape submitted HTML and share one reference", () => {
    const load = loader();
    const { createInquiryReference } = load("src/lib/email/reference.ts");
    const { createInternalNotification, createCustomerAcknowledgement } = load("src/lib/email/templates.ts");
    const reference = createInquiryReference(new Date("2026-09-16T12:00:00Z"));
    assert.match(reference, /^LUM-20260916-[A-F0-9]{8}$/);
    for (const locale of ["de", "en", "bg"]) {
        const data = { ...submission.data, kind: "project", locale, name: "<script>test</script>", message: '<img src="x">& test' };
        const internal = createInternalNotification(data, reference, config);
        const receipt = createCustomerAcknowledgement(data, reference, config);
        assert.equal(internal.replyTo, submission.data.email);
        assert.equal(receipt.replyTo, config.fromAddress);
        assert.equal(receipt.to, submission.data.email);
        for (const email of [internal, receipt]) {
            assert.ok(email.subject.includes(reference));
            assert.ok(email.text.includes(reference));
            assert.ok(email.html.includes(reference));
            assert.ok(!email.html.includes("<script>"));
            assert.equal(email.disableFileAccess, true);
            assert.equal(email.disableUrlAccess, true);
        }
        assert.match(receipt.html, new RegExp(`<html lang="${locale}">`));
        assert.ok(internal.html.includes("&lt;img"));
    }
});

function contactApi({ configurationFailure = false, failedDelivery = 0 } = {}) {
    const sent = [];
    class MailConfigurationError extends Error {}
    const load = loader({ "@/lib/email/transporter": {
        MailConfigurationError,
        getMailConfig: () => { if (configurationFailure) throw new MailConfigurationError(); return config; },
        createMailTransporter: () => ({ sendMail: async (mail) => { sent.push(mail); if (sent.length === failedDelivery) throw new Error("mock SMTP failure"); } }),
    } });
    const { POST } = load("src/app/api/contact/route.ts");
    return { sent, post: (body = submission, headers = {}) => POST(new Request("https://example.test/api/contact", { method: "POST", headers: { "content-type": "application/json", origin: "https://example.test", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) })) };
}

test("contact API rejects malformed, cross-origin and oversized requests without sending", async () => {
    const api = contactApi();
    assert.equal((await api.post(submission, { origin: "https://evil.test" })).status, 403);
    assert.equal((await api.post(submission, { "content-type": "text/plain" })).status, 415);
    assert.equal((await api.post("not-json")).status, 400);
    assert.equal((await api.post({})).status, 422);
    assert.equal((await api.post("x".repeat(50000))).status, 413);
    assert.equal((await api.post(submission, { "content-length": "50000" })).status, 413);
    assert.equal((await api.post({ ...submission, data: { ...submission.data, website: "spam" } })).status, 200);
    assert.equal(api.sent.length, 0);
});

test("contact API reports unavailable/failure and preserves a delivered enquiry if its receipt fails", async (t) => {
    t.mock.method(console, "error", () => {});
    assert.equal((await contactApi({ configurationFailure: true }).post()).status, 503);
    const failed = contactApi({ failedDelivery: 1 });
    assert.equal((await failed.post()).status, 502);
    assert.equal(failed.sent.length, 1);
    const receiptFailed = contactApi({ failedDelivery: 2 });
    const partial = await (await receiptFailed.post()).json();
    assert.equal(partial.success, true);
    assert.equal(partial.confirmationSent, false);
    const complete = contactApi();
    const response = await complete.post();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.confirmationSent, true);
    assert.equal(complete.sent.length, 2);
    for (const email of complete.sent) assert.ok(email.subject.includes(body.reference));
});

function analyticsMock(t, token = "test-only") {
    setEnvironment(t, { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: token });
    // Browser globals are installed only inside this test process.
    const previous = global.window;
    global.window = { navigator: { doNotTrack: "0" }, location: { href: "https://example.test/en" } };
    t.after(() => { if (previous === undefined) delete global.window; else global.window = previous; });
    const events = [];
    let optedOut = true;
    let recording = false;
    let options;
    let initializations = 0;
    const sdk = {
        init: (token, config) => { assert.equal(token, "test-only"); options = config; initializations++; },
        has_opted_out_capturing: () => optedOut,
        opt_in_capturing: () => { optedOut = false; },
        opt_out_capturing: () => { optedOut = true; },
        capture: (event, properties) => events.push({ event, properties }),
        startSessionRecording: () => { recording = true; },
        stopSessionRecording: () => { recording = false; },
    };
    const api = loader({ "posthog-js": sdk })("src/lib/analytics.ts");
    return { api, events, state: () => ({ initializations, optedOut, recording, options }) };
}

test("analytics never initializes without configuration, consent or when DNT is set", async (t) => {
    const mock = analyticsMock(t, "");
    await mock.api.enableAnalytics();
    assert.equal(mock.state().initializations, 0);
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN = "test-only";
    mock.api.captureContactEvent("contact_form_submitted", "en");
    assert.equal(mock.events.length, 0);
    window.navigator.doNotTrack = "1";
    await mock.api.enableAnalytics();
    assert.equal(mock.state().initializations, 0);
});

test("analytics masks forms, stops on revocation and resumes only after renewed consent", async (t) => {
    const mock = analyticsMock(t);
    await mock.api.enableAnalytics();
    assert.equal(mock.state().initializations, 1);
    assert.equal(mock.state().options.session_recording.maskAllInputs, true);
    assert.equal(mock.state().options.session_recording.blockSelector, "[data-analytics-block]");
    assert.equal(mock.state().options.api_host, "/lmx");
    mock.api.captureContactEvent("contact_form_succeeded", "bg");
    assert.deepEqual(mock.events.at(-1), { event: "contact_form_succeeded", properties: { locale: "bg" } });
    await mock.api.disableAnalytics();
    assert.equal(mock.state().recording, false);
    assert.equal(mock.state().optedOut, true);
    const count = mock.events.length;
    mock.api.captureContactEvent("contact_form_failed", "en");
    assert.equal(mock.events.length, count);
    await mock.api.enableAnalytics();
    assert.equal(mock.state().initializations, 1);
    assert.equal(mock.state().recording, true);
});

test("revoking consent during SDK import prevents initialization", async (t) => {
    const mock = analyticsMock(t);
    const enabling = mock.api.enableAnalytics();
    await mock.api.disableAnalytics();
    await enabling;
    assert.equal(mock.state().initializations, 0);
    assert.equal(mock.events.length, 0);
});
