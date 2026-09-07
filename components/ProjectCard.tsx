import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/60"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium text-zinc-100 group-hover:text-white">
          {project.title}
        </h3>
        <span
          aria-hidden
          className="mt-0.5 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-400"
        >
          ↗
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-zinc-800 px-2.5 py-0.5 text-xs text-zinc-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </a>
  );
}
