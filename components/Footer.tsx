import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 pb-8">
      <Container>
        <div className="flex flex-col items-center justify-center gap-2 border-t border-zinc-800/80 pt-8 text-center text-xs text-zinc-500">
          <p>All rights reserved. Mostly because nobody else wants them.</p>
          <p>
            Artwork By{" "}
            <a
              href="https://www.patreon.com/c/kimholm/about"
              className="text-white hover:text-zinc-200 transition-colors"
            >
              Kim Diaz Holm
            </a>{" "}
            (
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-200 transition-colors"
            >
              CC BY 4.0
            </a>
            ), Original Piece:{" "}
            <a
              href="https://denungeherrholm.smugmug.com/Posters/i-Mtpv56d/A"
              className="text-white hover:text-zinc-200 transition-colors"
            >
              Twisting Dreams
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
