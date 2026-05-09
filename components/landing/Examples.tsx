export default function Examples() {
  return (
    <section id="examples" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Example AI-generated content
        </h2>

        <p className="mt-4 text-zinc-400">
          High-quality marketing content for different industries generated in
          seconds.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Restaurant",
            text: "Fresh ingredients, warm atmosphere and your next favorite dinner spot. Book your table this weekend before the best times are gone.",
            tags: "#restaurant #localfood #dinnerplans",
          },
          {
            title: "Gym",
            text: "Your strongest month starts with one session. Join today and get a personalized training plan built around your goals.",
            tags: "#fitness #gymmotivation #healthylifestyle",
          },
          {
            title: "Real Estate Agent",
            text: "Thinking about selling this season? Get a clear home value estimate and a simple plan to attract serious buyers.",
            tags: "#realestate #homevalue #propertymarket",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"
          >
            <h3 className="mb-4 text-xl font-semibold text-pink-300">
              {item.title}
            </h3>

            <p className="leading-8 text-zinc-300">{item.text}</p>

            <p className="mt-5 text-pink-400">{item.tags}</p>
          </div>
        ))}
      </div>
    </section>
  );
}