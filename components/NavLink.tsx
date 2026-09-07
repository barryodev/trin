"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive
          ? "text-zinc-100 underline underline-offset-8 decoration-zinc-100"
          : "text-zinc-400 hover:text-zinc-100"
      }`}
    >
      {label}
    </Link>
  );
}
