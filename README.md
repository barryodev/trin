# barryodev.io

A personal site, project log, and general catch all of things I want to share. Built with Next.js App Router, Tailwind CSS, and Keystatic.

## What Is Here

- **Home**: a short intro and recent writing.
- **Posts**: markdown-backed writing edited through Keystatic.
- **Projects**: a small curated list of current and past work.
- **Playlists**: Spotify embeds for working sessions.

## How It Is Built

Content lives in the repo, under `content/posts/`, with cover images in `public/images/posts/`. In local development, Keystatic writes directly to those files. In production, Keystatic writes through GitHub so published edits become commits.

The public site routes live under `app/(site)`, while the Keystatic admin UI lives at `app/keystatic` so it is not wrapped in the public site chrome.

## Project Map

| Area                 | Path                       |
| -------------------- | -------------------------- |
| Public routes        | `app/(site)`               |
| Keystatic admin UI   | `app/keystatic`            |
| Keystatic API        | `app/api/keystatic`        |
| Shared components    | `components`               |
| Site/content helpers | `lib`                      |
| Blog content         | `content/posts`            |
| Tests                | `tests`                    |
| CI                   | `.github/workflows/ci.yml` |

## Setup And Operations

Local setup, testing, deployment, Keystatic production configuration, and current technical debt are documented in [SETUP.md](SETUP.md).
