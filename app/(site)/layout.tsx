import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Image
        src="/images/ui/left.webp"
        alt=""
        aria-hidden="true"
        width={720}
        height={2912}
        loading="eager"
        className="pointer-events-none fixed top-0 left-[max(0px,calc(50%-46rem))] z-0 hidden h-auto w-64 opacity-50 xl:block"
      />
      <Image
        src="/images/ui/right.webp"
        alt=""
        aria-hidden="true"
        width={720}
        height={2912}
        loading="eager"
        className="pointer-events-none fixed top-0 right-[max(0px,calc(50%-46rem))] z-0 hidden h-auto w-64 opacity-50 xl:block"
      />
      <Image
        src="/images/ui/mobile-bg.webp"
        alt=""
        aria-hidden="true"
        width={1440}
        height={2912}
        loading="eager"
        className="pointer-events-none fixed top-[-12rem] left-1/2 z-0 h-auto w-[42rem] max-w-none -translate-x-1/2 opacity-15 sm:top-[-18rem] sm:w-[42rem] sm:opacity-10 xl:hidden"
      />
      <Header />
      <main className="relative z-10 flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
