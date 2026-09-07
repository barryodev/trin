import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 21.5h8.9V8.98H.5V21.5ZM14.5 8.98h-8.5v12.52h8.5v-6.7c0-2.5 1.3-3.5 3-3.5s2.5 1 2.5 3.5v6.7h8V13.6c0-4.68-2.5-6.87-5.83-6.87-2.68 0-3.87 1.5-4.55 2.55h-.06V8.98h-3.06Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18.9 1.5h3.6l-7.87 9 9.26 12h-7.25l-5.68-7.43-6.5 7.43H.68l8.4-9.6L.23 1.5h7.43l5.14 6.79Zm-1.26 19h2L6.44 3.4h-2.1Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m3 6.5 9 6.25 9-6.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpotifyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 .5A11.5 11.5 0 1 0 23.5 12 11.5 11.5 0 0 0 12 .5Zm5.27 16.6a.72.72 0 0 1-.99.24c-2.7-1.65-6.11-2.02-10.12-1.11a.72.72 0 1 1-.32-1.4c4.38-1 8.14-.57 11.18 1.28a.72.72 0 0 1 .25.99Zm1.41-3.13a.9.9 0 0 1-1.24.3c-3.09-1.9-7.8-2.45-11.46-1.34a.9.9 0 1 1-.52-1.72c4.18-1.27 9.38-.65 12.92 1.52a.9.9 0 0 1 .3 1.24Zm.12-3.26C15.4 8.63 8.68 8.4 4.9 9.54a1.08 1.08 0 1 1-.63-2.07c4.34-1.32 11.76-1.06 16.4 1.65a1.08 1.08 0 0 1-1.1 1.86Z" />
    </svg>
  );
}

export const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: MailIcon,
  spotify: SpotifyIcon,
} as const;

export type IconName = keyof typeof icons;
