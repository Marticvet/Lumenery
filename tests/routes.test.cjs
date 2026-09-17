/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { test } = require("node:test");

const origin = "http://localhost:3000";
const pages = ["", "/katalog", "/katalog/menuekarten", "/leistungen", "/kontakt", "/impressum", "/datenschutz", "/agb"];
for (const locale of ["de", "en", "bg"]) {
    for (const path of pages) {
        test(`${locale}${path || "/"} renders localized HTML, links and metadata`, async () => {
            const response = await fetch(`${origin}/${locale}${path}`);
            assert.equal(response.status, 200);
            const html = await response.text();
            assert.ok(html.includes(`<html lang="${locale}"`), "correct document language");
            assert.ok(!html.includes("Application error"), "no streaming render error");
            for (const lang of ["de", "en", "bg"]) assert.ok(html.includes(`hrefLang="${lang}"`), `${lang} alternate`);
            assert.ok(html.includes(`href="${origin}/${locale}${path}"`), "localized canonical URL");
            for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
                if (href.startsWith("/") && !href.startsWith("/api/")) assert.ok(href.startsWith(`/${locale}`), `unlocalized link: ${href}`);
            }
        });
    }
}

test("old URLs redirect with saved language and missing pages return 404", async () => {
    const response = await fetch(`${origin}/katalog`, { redirect: "manual", headers: { cookie: "lumynery-locale=bg" } });
    assert.equal(response.status, 307);
    assert.equal(new URL(response.headers.get("location"), origin).href, `${origin}/bg/katalog`);
    for (const locale of ["de", "en", "bg"]) assert.equal((await fetch(`${origin}/${locale}/missing-test-page`)).status, 404);
});
