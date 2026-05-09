import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BusinessContent AI",
    template: "%s | BusinessContent AI",
  },

  description:
    "AI content generator for local businesses, creators, service providers and small brands. Generate social media posts, captions, hashtags, CTAs and AI marketing images in seconds.",

  keywords: [
    "AI content generator",
    "AI social media posts",
    "Instagram caption generator",
    "local business marketing",
    "small business marketing",
    "AI marketing tool",
    "social media AI tool",
    "restaurant marketing",
    "real estate content generator",
    "gym marketing",
    "business content generator",
    "AI captions",
  ],

  metadataBase: new URL(
    "https://beauty-ai-assistant-kappa.vercel.app"
  ),

  openGraph: {
    title: "BusinessContent AI",

    description:
      "Generate social media content and AI marketing images for local businesses in seconds.",

    url: "https://beauty-ai-assistant-kappa.vercel.app",

    siteName: "BusinessContent AI",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "BusinessContent AI",

    description:
      "AI marketing assistant for local businesses, creators and small brands.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
        <div className="relative min-h-screen">
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-3xl" />

            <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          {children}
        </div>

        <Toaster
          theme="dark"
          richColors
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "!border !border-zinc-800 !bg-zinc-900 !text-white",
            },
          }}
        />
      </body>
    </html>
  );
}