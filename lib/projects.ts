export type Project = {
  title: string;
  description: string;
  href: string;
  demoHref?: string;
  tags?: string[];
};

// Edit this list to reflect your own projects — no CMS needed for these,
// they change rarely enough that a plain data file is simpler than wiring
// up another Keystatic collection.
export const projects: Project[] = [
  {
    title: "Trin",
    description: "The site you're looking at right now.",
    href: "https://github.com/barryodev/trin",
    demoHref: "https://www.barryodev.io",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Panacea",
    description: "The most over the top helloworld I could imagine",
    href: "https://github.com/barryodev/panacea",
    demoHref: "https://panacea.barryodev.io",
    tags: ["Next.js", "TypeScript"],
  },
];
