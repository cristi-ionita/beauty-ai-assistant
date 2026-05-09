export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Built for owners who need consistent content
        </h2>

        <p className="mt-4 text-zinc-400">
          Create better marketing posts without hiring a full marketing team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
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
        ].map((item) => (
          <div
            key={item.name}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"
          >
            <p className="leading-8 text-zinc-300">
              “{item.quote}”
            </p>

            <p className="mt-6 text-sm font-semibold text-pink-300">
              — {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}