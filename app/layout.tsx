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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white">
        {children}

        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}