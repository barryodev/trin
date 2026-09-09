# personal-site

A minimalist, dark-mode personal site built with Next.js (App Router) and
Tailwind CSS, with a git-backed blog powered by Keystatic.

- **Home** — intro, bio, social links.
- **Projects** — a simple grid of current projects.
- **Playlists** — curated Spotify playlists as responsive embeds.
- **Posts** — a blog whose content is edited through Keystatic's admin UI
  and stored as markdown files in this repo (or, in production, committed
  straight to GitHub).

## 1. Prerequisites

- Node.js 20+ and npm
- A GitHub account (only needed for the production Keystatic setup, see §5)
- A Vercel account, Hobby tier is enough

## 2. Create the project

The files in this delivery already form a complete project — if you're
starting from them, skip to **§3 Install dependencies**. If you'd rather
scaffold fresh and copy files in, this is the equivalent starting point:

```bash
npx create-next-app@latest personal-site \
  --typescript --tailwind --eslint --app --src-dir=false \
  --import-alias "@/*"
cd personal-site
```

## 3. Install dependencies

```bash
npm install

# Tailwind CSS v4 (CSS-first config, no tailwind.config.js needed)
npm install -D tailwindcss@4.3.3 @tailwindcss/postcss @tailwindcss/typography

# Keystatic — the CMS powering /posts
npm install @keystatic/core @keystatic/next
```

`package.json` in this project already pins these versions, so a plain
`npm install` picks them all up in one go — the separate commands above are
just for reference if you're adding them to an existing project.

## 4. Run it locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Keystatic admin UI: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

In development, `keystatic.config.tsx` uses **local storage** — the admin
UI reads and writes files directly under `content/posts/` on disk. No
auth, no environment variables required. Edit a post there, save, and the
markdown file in `content/posts/<slug>/index.mdoc` updates immediately.

Three sample posts are included under `content/posts/` so `/posts` isn't
empty on first run — edit or delete them from the admin UI.

## 5. Keystatic in production (GitHub storage)

On Vercel production deployments (`VERCEL_ENV=production`),
`keystatic.config.tsx` switches to **GitHub storage**: the admin UI reads
and writes posts by committing to a GitHub repo through the GitHub API,
instead of touching a local filesystem (which doesn't persist on
Vercel's serverless functions anyway). Local development and Vercel Preview
Deployments use local storage, so preview builds do not need Keystatic's
GitHub OAuth secrets.

To wire this up:

1. **Push this project to a GitHub repo.** That repo is what Keystatic
   will read from and commit to.
2. **Create a GitHub OAuth App** (not a GitHub App): GitHub →
   Settings → Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: your production URL, e.g. `https://your-site.vercel.app`
   - Authorization callback URL: `https://your-site.vercel.app/api/keystatic/github/oauth/callback`
   - Save the generated **Client ID** and **Client Secret**.
3. **Generate a session secret:**
   ```bash
   openssl rand -base64 32
   ```
4. **Set environment variables** in your Vercel project (Project →
   Settings → Environment Variables), matching `.env.example`:

   | Variable                         | Value                       |
   | -------------------------------- | --------------------------- |
   | `KEYSTATIC_GITHUB_OWNER`         | your GitHub username or org |
   | `KEYSTATIC_GITHUB_REPO`          | the repo name               |
   | `KEYSTATIC_GITHUB_CLIENT_ID`     | from step 2                 |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | from step 2                 |
   | `KEYSTATIC_SECRET`               | from step 3                 |

5. Redeploy. Visiting `/keystatic` in production will now prompt you to
   sign in with GitHub; edits made there are committed directly to the
   repo (which, combined with the `revalidate = 60` on the posts pages,
   means new posts show up within a minute without a manual redeploy).

If you'd rather not manage a GitHub OAuth App yourself, Keystatic also
offers a hosted "Keystatic Cloud" auth option — see the
[Keystatic docs](https://keystatic.com/docs/github-model) if you want to
go that route instead; it's a small config change in `keystatic.config.tsx`.

## 6. Deploy to Vercel (Hobby tier)

```bash
npm install -g vercel
vercel
```

or connect the GitHub repo directly in the Vercel dashboard (Import
Project). No special configuration is needed — this is a standard Next.js
app. Just make sure the five `KEYSTATIC_*` environment variables from §5
are set before your first production build, otherwise `/keystatic` and
`/api/keystatic/*` will throw on missing `KEYSTATIC_GITHUB_OWNER` /
`KEYSTATIC_GITHUB_REPO`.

The Hobby tier's serverless function limits are comfortably enough for
this site — the only routes that do real work at request time are the
Keystatic admin API routes and the (lightweight, cached) blog pages.

## 7. Customizing

| What                            | Where                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------- |
| Name, bio, social links, nav    | `lib/site-config.ts`                                                         |
| Projects list                   | `lib/projects.ts`                                                            |
| Playlists                       | `lib/playlists.ts` (paste the ID from a Spotify share link)                  |
| Blog schema (add/remove fields) | `keystatic.config.tsx`                                                       |
| Colors / theme                  | `app/globals.css` (`@theme` block) + Tailwind's `zinc` scale used throughout |
| Site chrome (header/footer)     | `components/Header.tsx`, `components/Footer.tsx`, `app/(site)/layout.tsx`    |

## 8. Project structure

```
personal-site/
├── app/
│   ├── layout.tsx                    # minimal root shell (html/body, font, globals.css)
│   ├── globals.css                   # Tailwind v4 import + dark theme tokens
│   ├── (site)/                       # route group: public pages get header/footer chrome
│   │   ├── layout.tsx                # Header + centered max-w-3xl container + Footer
│   │   ├── page.tsx                  # Homepage
│   │   ├── projects/page.tsx
│   │   ├── playlists/page.tsx
│   │   └── posts/
│   │       ├── page.tsx              # blog list (cards)
│   │       └── [slug]/page.tsx       # single post
│   ├── keystatic/[[...params]]/page.tsx   # Keystatic admin UI (no site chrome)
│   └── api/keystatic/[...params]/route.ts # Keystatic API route handler
├── components/
│   ├── Header.tsx, Footer.tsx, Container.tsx, NavLink.tsx
│   ├── SocialLinks.tsx, icons.tsx
│   ├── ProjectCard.tsx, PlaylistEmbed.tsx, PostCard.tsx
├── lib/
│   ├── site-config.ts, projects.ts, playlists.ts
│   ├── keystatic.ts                  # Keystatic reader (server-only)
│   ├── reading-time.ts, format-date.ts
├── content/posts/<slug>/index.mdoc   # blog post content (local storage mode)
├── public/images/posts/              # cover images uploaded via Keystatic
├── keystatic.config.tsx              # collections + storage (local ↔ github)
├── next.config.ts
├── postcss.config.mjs                # @tailwindcss/postcss
├── package.json
└── .env.example
```

## Notes

- The blog intentionally has no comment system, author avatars, tags, or
  categories — just post content and a date, per spec. Reading time is
  computed automatically from the post body; "author" is a single static
  name in `lib/site-config.ts` since this is a personal, single-author
  blog (make it a Keystatic field instead if that ever changes).
- Tailwind v4 doesn't require a `tailwind.config.ts` for a project this
  size — content is auto-detected and theme tokens live directly in
  `app/globals.css` via `@theme`. Add a config file only if you need
  something CSS-first config can't express (e.g. custom `content` globs
  for a monorepo).
