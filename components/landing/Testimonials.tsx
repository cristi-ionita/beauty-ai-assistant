const testimonials = [
  {
    quote:
      "This saves us hours every week. We can create promo posts in minutes instead of staring at a blank screen.",
    name: "Local Business Owner",
  },
  {
    quote:
      "The outputs feel specific to our business instead of generic AI text. It helps us stay active online.",
    name: "Restaurant Manager",
  },
  {
    quote:
      "I use it for offers, booking reminders, service announcements and seasonal campaigns.",
    name: "Service Business Founder",
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            Testimonials
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Built for owners who need consistent content
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Create better marketing posts without hiring a full marketing team.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl transition hover:-translate-y-1 hover:border-pink-500/30 sm:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl text-pink-300">
                  “
                </div>

                <p className="text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  {item.quote}
                </p>

                <p className="mt-6 text-sm font-bold text-pink-300">
                  — {item.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}