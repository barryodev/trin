# Setup

This project is a Next.js App Router site with Tailwind CSS, Keystatic, Vitest, Playwright, and GitHub Actions CI.

## Prerequisites

- Node.js 22 and npm
- A GitHub account for production Keystatic editing
- A Vercel account

## Install

```bash
npm install
```

## Local Development

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Keystatic admin UI: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

In local development, Keystatic uses local storage. The admin UI writes markdown directly under `content/posts/`, so no GitHub auth or environment variables are required.

## Testing

```bash
npm run lint
npm run test:ci
npm run build
npm run test:e2e
npm run format:check
```

Playwright runs against a built app. Its config supplies dummy Keystatic credentials and opts into GitHub storage for the smoke test server.

## Keystatic Production Setup

On Vercel production deployments (`VERCEL_ENV=production`), Keystatic uses GitHub storage. Local development and Vercel Preview deployments use local storage, so preview builds do not need Keystatic OAuth secrets.

Create a GitHub OAuth App with:

- Homepage URL: `https://www.barryodev.io`
- Authorization callback URL: `https://www.barryodev.io/api/keystatic/github/oauth/callback`

Set these variables in Vercel Production:

| Variable                             | Value                      |
| ------------------------------------ | -------------------------- |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` | GitHub username or org     |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`  | GitHub repo name           |
| `KEYSTATIC_GITHUB_CLIENT_ID`         | GitHub OAuth App client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET`     | GitHub OAuth App secret    |
| `KEYSTATIC_SECRET`                   | Random session secret      |

Generate `KEYSTATIC_SECRET` with:

```bash
openssl rand -base64 32
```

## Deployment

Vercel builds the site with:

```bash
npm run build
```

Feature branches create Vercel Preview deployments. Merging to `main` creates the production deployment.

## Git Workflow

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/some-change

npm run dev
npm run lint
npm run test:ci
npm run build
npm run test:e2e
npm run format:check

git push -u origin feature/some-change
```

Open a pull request, review the Vercel preview, wait for GitHub Actions, then merge.

## Technical Debt

- Keystatic production auth currently uses a GitHub OAuth App plus a narrow redirect wrapper in `app/api/keystatic/[...params]/route.ts` to request `scope=public_repo`. This works, but Keystatic's current docs prefer the GitHub App setup. Migrate to the documented GitHub App flow later and remove the redirect wrapper after verifying writes.
- Add proper access protection in front of `/keystatic` so unauthenticated visitors cannot load the admin UI in production.
