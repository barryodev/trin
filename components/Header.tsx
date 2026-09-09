import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/Container";
import { NavLink } from "@/components/NavLink";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-100">
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-6">
            {siteConfig.nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
