import type { Project } from "@/lib/projects";
import { GithubIcon } from "@/components/icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/60">
      <h3 className="font-medium text-zinc-100">{project.title}</h3>
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
      <div className="mt-4 flex items-center gap-4 text-sm">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100"
        >
          <GithubIcon width={16} height={16} />
          Source
        </a>
        {project.demoHref && (
          <a
            href={project.demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100"
          >
            Live demo
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
