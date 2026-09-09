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
        className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden h-full w-40 object-cover object-right opacity-60 lg:block"
      />
      <Image
        src="/images/ui/right.webp"
        alt=""
        aria-hidden="true"
        width={720}
        height={2912}
        loading="eager"
        className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden h-full w-40 object-cover object-left opacity-60 lg:block"
      />
      <Header />
      <main className="relative z-10 flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
