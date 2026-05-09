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
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute right-[-10%] top-[25%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="absolute bottom-[-10%] left-[20%] h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section id="hero">
          <Hero />
        </section>

        <section
          id="examples"
          className="border-t border-zinc-900/80"
        >
          <Examples />
        </section>

        <section
          id="features"
          className="border-t border-zinc-900/80"
        >
          <Features />
        </section>

        <section
          id="testimonials"
          className="border-t border-zinc-900/80"
        >
          <Testimonials />
        </section>

        <section
          id="pricing"
          className="border-t border-zinc-900/80"
        >
          <Pricing />
        </section>

        <section
          id="faq"
          className="border-t border-zinc-900/80"
        >
          <FAQ />
        </section>

        <section className="border-t border-zinc-900/80">
          <CTA />
        </section>

        <Footer />
      </div>
    </main>
  );
}