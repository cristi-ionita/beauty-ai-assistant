import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Examples from "@/components/landing/Examples";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <Examples />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}