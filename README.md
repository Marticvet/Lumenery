# Lumynery

Next.js website with German, English and Bulgarian content, SMTP enquiries and consent-based PostHog analytics. The form and tracking follow the Built Further workflow, with separate Lumynery branding, configuration and data.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. German is the default; the header language selector remembers the visitor's choice for one year and keeps the current page, query and anchor. All eight pages, navigation, form messages, metadata and customer acknowledgement emails support `/de`, `/en` and `/bg`. Existing unprefixed links redirect to the selected language. Product photographs retain their original printed designs.

The site runs without an email account or analytics token. Until SMTP is configured, submitting a valid enquiry returns an unavailable message; it does not claim the enquiry was sent. No analytics SDK is loaded and no consent banner appears until a project token is configured.

## Configuration when the domain and mailbox are ready

Use `.env.example` as the template for an ignored `.env.local` in development and set the same variables in the deployment environment. Never commit credentials or reuse Built Further's tracking token.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Final public origin, e.g. `https://your-domain.example`; used by canonical, language and social URLs. Defaults to localhost. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Provider's SMTP server; typically port 465 with `true`, or 587 with `false` and required STARTTLS. |
| `SMTP_USER`, `SMTP_PASS` | Lumynery mailbox address and SMTP password/app password. Server-only. |
| `MAIL_FROM_NAME` | Display name, defaults to Lumynery. |
| `MAIL_FROM_ADDRESS` | Must match the authenticated SMTP mailbox. Visitor addresses are Reply-To, never the sender. |
| `MAIL_TO_ADDRESS` | Inbox for enquiries; also the site's public contact email. |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Lumynery EU project token. Blank disables tracking. Public by design; not an admin/API secret. |
| `NEXT_PUBLIC_POSTHOG_UI_HOST` | Defaults to `https://eu.posthog.com`. The `/lmx` ingestion proxy in `next.config.ts` uses EU hosting. |

Restart development after changing variables. Public PostHog variables are baked into the browser bundle, so rebuild/redeploy when changing them. Use a Node-capable Next.js deployment, not a static export. If a non-EU PostHog project is chosen later, change the proxy destinations as well as the UI host.

Before launch, configure the mailbox/domain with the provider's SPF/DKIM/DMARC guidance, verify the public business/legal details, and test a real enquiry in each language. Add production rate limiting at the hosting layer for `/api/contact`. The app has validation, a honeypot, same-origin checks, request-size limits and SMTP timeouts; these do not replace infrastructure-level abuse controls.

## Contact workflow

`POST /api/contact` accepts `{ kind: "project", locale: "de" | "en" | "bg", data: { name, email, address, phone, message, website } }`.

1. Validate required name/email/message and lengths. Address and phone are optional; `website` is a hidden honeypot.
2. Generate a `LUM-YYYYMMDD-XXXXXXXX` reference and notify the team with Reply-To set to the visitor.
3. Send a branded acknowledgement in the visitor's language with the same reference.
4. Show the reference in the form. If only the acknowledgement fails, preserve the successful enquiry and explain that the receipt could not be sent, avoiding duplicates.

Responses distinguish invalid input (422), unavailable configuration (503) and delivery failure (502). Failures preserve the visitor's text. There is no enquiry database; enquiries go to the inbox. SMTP acceptance is checked; final inbox delivery depends on the email provider.

## Visitor analytics

PostHog includes page views/navigation, page leave, clicks, heatmaps, performance and session replay, plus `contact_form_submitted`, `contact_form_succeeded` and `contact_form_failed` conversion events. Conversion properties contain only the selected locale, not submitted details. Visitors are not explicitly identified by email or name.

Tracking starts only after consent, respects Do Not Track, masks inputs and excludes the entire contact form (including receipt text) from recordings and automatic event capture. Privacy choices can be reopened in the footer or privacy page, revoked, or granted again. Choices synchronize between tabs. Enable the desired replay/heatmap settings in the Lumynery PostHog project before production testing.

## Verification

```bash
pnpm test
pnpm lint
pnpm build
pnpm start
# In another terminal, with the local server running:
pnpm test:routes
```

Unit tests cover locale persistence/redirect safety, translations, validation, escaped/localized emails, matching references, SMTP failures/partial delivery, consent gating/revocation and import races. SMTP and PostHog are mocked: tests never send emails or analytics. Route smoke tests request all 24 localized page URLs and check language, metadata and localized internal links. Real inbox delivery and dashboard ingestion still need verification once credentials are provided.
