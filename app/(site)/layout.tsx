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
        src="/images/ui/twisted-dreams-left-banner.webp"
        alt=""
        aria-hidden="true"
        width={682}
        height={2047}
        priority
        className="pointer-events-none fixed top-0 left-[calc(50%-45.75rem)] z-0 hidden h-auto w-[21rem] min-[1150px]:block"
      />
      <Image
        src="/images/ui/twisted-dreams-right-banner.webp"
        alt=""
        aria-hidden="true"
        width={683}
        height={2047}
        priority
        className="pointer-events-none fixed top-0 right-[calc(50%-45.75rem)] z-0 hidden h-auto w-[21rem] min-[1150px]:block"
      />
      <Image
        src="/images/ui/twistingdreams-mobile.webp"
        alt=""
        aria-hidden="true"
        width={1365}
        height={2047}
        priority
        className="pointer-events-none fixed top-0 left-1/2 z-0 h-auto w-full max-w-[1150px] -translate-x-1/2 opacity-[55%] min-[1150px]:hidden"
      />
      <Header />
      <main className="relative z-10 flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
