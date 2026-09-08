export type Project = {
  title: string;
  description: string;
  href: string;
  tags?: string[];
};

// Edit this list to reflect your own projects — no CMS needed for these,
// they change rarely enough that a plain data file is simpler than wiring
// up another Keystatic collection.
export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short, concrete description of what this project does and why you built it — one or two sentences is plenty.",
    href: "https://github.com/yourusername/project-one",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Project Two",
    description:
      "Another project. Keep the description focused on the problem it solves rather than the tech stack.",
    href: "https://github.com/yourusername/project-two",
    tags: ["Node.js", "PostgreSQL"],
  },
  {
    title: "Project Three",
    description: "A third example entry — swap these out for your real, current work.",
    href: "https://github.com/yourusername/project-three",
    tags: ["React", "Tailwind CSS"],
  },
];
