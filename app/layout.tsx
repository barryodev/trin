import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

// This root layout intentionally stays minimal (just the HTML shell, font,
// and global styles). The public site's chrome — header, nav, footer, the
// max-w-3xl container — lives in app/(site)/layout.tsx instead, so that the
// Keystatic admin UI at /keystatic (which renders its own full-screen app)
// isn't wrapped in our site header/footer.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 font-sans text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
