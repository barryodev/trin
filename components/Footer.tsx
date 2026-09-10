import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 pb-8">
      <Container>
        <div className="flex items-center justify-center border-t border-zinc-800/80 pt-8 text-xs text-zinc-500">
          <p>All rights reserved. Mostly because nobody else wants them.</p>
        </div>
      </Container>
    </footer>
  );
}
