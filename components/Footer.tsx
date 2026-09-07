import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/80">
      <Container>
        <div className="flex flex-col items-center justify-between gap-2 py-8 text-xs text-zinc-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
