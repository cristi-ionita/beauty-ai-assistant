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
    default: "Beauty AI",
    template: "%s | Beauty AI",
  },

  description:
    "AI content generator for salons, barbershops, nail studios, spas and beauty businesses. Generate captions, hashtags, CTAs and AI marketing images in seconds.",

  keywords: [
    "AI content generator",
    "beauty salon marketing",
    "Instagram caption generator",
    "AI social media posts",
    "beauty AI",
    "barbershop marketing",
    "nail salon marketing",
    "AI beauty content",
    "social media AI tool",
    "AI marketing for salons",
  ],

  metadataBase: new URL(
    "https://beauty-ai-assistant-kappa.vercel.app"
  ),

  openGraph: {
    title: "Beauty AI",
    description:
      "Generate beauty marketing content and AI social media images in seconds.",
    url: "https://beauty-ai-assistant-kappa.vercel.app",
    siteName: "Beauty AI",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Beauty AI",
    description:
      "AI marketing assistant for salons, barbershops and beauty businesses.",
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