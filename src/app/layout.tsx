import { GeistMono } from "geist/font/mono";
import { PT_Sans, PT_Serif } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import site from "./site.json";
import "./globals.css";

const ptSans = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  display: "swap",
});

// Site metadata lives in site.json so Studio can update it without touching
// this file. The favicon and social image are separate files Next.js resolves
// by convention (icon.*, opengraph-image.*), so they need no code here.
export const metadata: Metadata = {
  // Absolute base for og:image; social crawlers reject relative URLs. Empty
  // until the project is published, which Next.js treats as "no base".
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: site.title,
    template: `%s | ${site.shortTitle}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#171310" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable,
          ptSerif.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
