# Security Policy

We take the security of Kirat Astro and its users' data seriously.

## Supported Versions

Kirat Astro is deployed as a single, continuously maintained application. Only the latest
version on the `main` branch (and the current production deployment) receives security updates.

| Version            | Supported          |
| ------------------ | ------------------ |
| `main` / latest    | :white_check_mark: |
| older commits/tags | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them privately using
[GitHub's private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
on this repository, or via a private message to the repository owner
[@yuadhistrahangsubba](https://github.com/yuadhistrahangsubba). Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce (or a proof-of-concept)
- Any relevant logs, screenshots, or affected endpoints

**What to expect:**

- An acknowledgement within a few business days.
- An assessment of the report and, if accepted, a fix timeline.
- Please give reasonable time to investigate and release a fix before any public disclosure.
  Credit is happily given once the issue is resolved, if you'd like.

## Good Practices for Operators

If you are self-hosting or deploying Kirat Astro:

- **Keep secrets out of version control.** `DATABASE_URL`, `DIRECT_URL`,
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` must be provided via environment variables — never
  hard-coded. `.env*` files are git-ignored.
- **Guard the service-role key.** `SUPABASE_SERVICE_ROLE_KEY` bypasses row-level security and
  must only ever be used server-side; never expose it to the client.
- **Rotate secrets** immediately if any are ever exposed, and use environment-scoped values in
  production.
- **Verify Stripe webhook signatures.** Always validate incoming webhooks against
  `STRIPE_WEBHOOK_SECRET` before acting on them.
- **Protect Supabase Auth sessions.** Never log, print, or expose session tokens or cookies.
- **Keep dependencies up to date** and review Dependabot / advisory alerts promptly.
