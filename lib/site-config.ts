export const siteConfig = {
  name: "@barryodev",
  title: "barryodev - blog",
  description:
    "Personal site, project log, and dev blog for Barry — software developer.",
  url: "https://example.com",
  bio: "I'm a software developer who likes small, focused tools, clean interfaces, and the occasional deep rabbit hole into things nobody asked me to build. This site is where I keep my projects, notes, and the playlists that get me through them.",
  author: "barryodev",
  nav: [
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
    { href: "/playlists", label: "Playlists" },
  ],
  // Add social links back here later, e.g. { label: "GitHub", href: "...", icon: "github" }
  social: [],
} as const;
