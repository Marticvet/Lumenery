# Lumynery Content Studio

This is the private editor for the Lumynery catalog. It lives in the same repository as the website but can be hosted separately by Sanity.

## Connect the Sanity account

1. Create a Sanity project at `sanity.io/manage` with a public `production` dataset.
2. Copy `.env.example` to `.env.local` and add the project ID.
3. Authenticate with `pnpm studio:login`, or add an Editor token as `SANITY_AUTH_TOKEN` for unattended setup. Then run `pnpm studio:seed` once.
4. Run `pnpm studio:dev` to inspect the editor locally.
5. Run `pnpm studio:deploy` and choose the permanent Studio hostname.
6. Add the same project ID/dataset to the website environment using the variables in the root `.env.example`, then rebuild/redeploy the website.

Only invite the intended editor in Sanity project settings. Public visitors can read published catalog content, but they cannot access drafts or edit documents.

The seed command uploads the existing product images and creates the current three products. It uses stable document IDs, so rerunning it updates those starter records rather than duplicating them. Do not rerun it after the editor has changed those records unless you intend to restore the starter content.
