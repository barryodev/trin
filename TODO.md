# TODO

Running list of technical debt and follow-up work for this site. Items here were
identified during earlier development and deliberately deferred.

## Technical Debt

### Migrate Keystatic production auth to a GitHub App

Production Keystatic currently uses a GitHub **OAuth App** plus a custom redirect
wrapper in `app/api/keystatic/[...params]/route.ts` that injects
`scope=public_repo` into the authorize URL. It works, but it is custom glue
around Keystatic's own handler and could break when Keystatic or GitHub changes
their auth flow.

Keystatic's current docs prefer the GitHub App setup. Migrate to that flow,
verify writes from `https://www.barryodev.io/keystatic`, then delete the redirect
wrapper.

### Protect the `/keystatic` admin route in production

Anyone can currently load the admin UI in production and attempt GitHub sign-in.
Writes are rejected because only repo collaborators can commit (GitHub's
`viewerPermission` check), so this is not an active security hole — but the UI
should not be publicly reachable.

Options: middleware that checks the signed-in GitHub username, or Vercel
Deployment Protection scoped to that path.

### No e2e coverage of the Keystatic write path

Every Playwright test exercises read paths only (render pages, check content).
Nothing in CI drives "sign in, edit a post, save, commit". This gap is why the
`NEXT_PUBLIC_KEYSTATIC_STORAGE` client/server mismatch bug reached production
undetected.

A full write test needs real GitHub credentials and would commit to the repo, so
it is not a straightforward addition. A cheaper middle ground would be asserting
that the admin UI boots against the expected storage mode without 404ing on
`/api/keystatic/tree`.

### Playwright can reuse a running dev server locally

`playwright.config.ts` sets `reuseExistingServer: !process.env.CI`. If
`npm run dev` is already running, `npm run test:e2e` tests dev-mode behavior
rather than the production build. CI is unaffected (the flag is `false` there),
but this weakens the local smoke test and is a likely culprit for any future
"passes locally, fails on preview" issue.

## Operational

### Enable branch protection on `main`

GitHub Actions runs on pull requests, but until `main` requires the CI check and
the Vercel preview check to pass before merge, CI is advisory rather than a gate.

## Features

### Social links

`siteConfig.social` is intentionally an empty array. The `SocialLinks` component
and icon set already support entries — add links here if and when wanted.

### RSS feed

`app/sitemap.ts` and `app/robots.ts` exist, but there is no feed. An RSS/Atom
route for `content/posts` is a natural addition once there is a steadier
publishing cadence.
