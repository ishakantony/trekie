import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@ishakantony",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">Menu</div>
            </header>
            {children}
            <footer className="mt-auto pb-4">
              <div className="container flex h-16 flex-wrap items-center justify-center md:flex-nowrap [&>*]:mr-4">
                <span className="flex basis-full items-center justify-center md:basis-auto">
                  Proudly built with <Icons.love className="mx-1" /> by{" "}
                </span>
                {siteConfig.authors.map((author) => (
                  <Link
                    className="flex items-center font-medium text-muted-foreground underline underline-offset-4"
                    key={author.name}
                    href={author.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icons.github height={15} width={15} className="mr-2" />{" "}
                    {author.name}
                  </Link>
                ))}
              </div>
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
