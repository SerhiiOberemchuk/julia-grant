import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s · ${site.brand.name}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: site.url,
    siteName: site.brand.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="uk"
      className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
