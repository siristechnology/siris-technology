# Siris Technology

The Siris Technology company site and launch page for Nepal Today on iOS. It is a static Astro site with no client-side framework or analytics script.

## Local development

Use Node 24 and pnpm 11:

```sh
nvm use
corepack enable
pnpm install
pnpm dev
```

Run the production build and focused site checks with:

```sh
pnpm test
```

## Netlify

Netlify builds the site with `pnpm build` and publishes `dist/`. The contact form uses Netlify Forms, so it needs no serverless function or browser-side JavaScript.

After the first deploy:

1. In Netlify, enable **Forms → Form detection** if it is not already enabled.
2. Submit one test message and confirm it appears under **Forms → contact**.
3. Under **Project configuration → Notifications → Emails and webhooks → Form submission notifications**, send verified `contact` submissions to `info@siristechnology.com`.
4. Verify the message, reply-to address, spam filtering, `/thanks/` redirect, and privacy-policy link on the production domain.

The form still links directly to `info@siristechnology.com` as an email fallback.
