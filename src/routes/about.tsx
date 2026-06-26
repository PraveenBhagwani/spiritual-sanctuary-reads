import { createFileRoute, Link } from "@tanstack/react-router";
import missionImg from "@/assets/mission-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dada Vaswani's Books" },
      { name: "description", content: "About the Sadhu Vaswani Mission's bookstore — a non-profit publisher of spiritual literature, serving seekers since 1929." },
      { property: "og:title", content: "About — Dada Vaswani's Books" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="container-prose py-16 md:py-24 max-w-3xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />About Dada Vaswani's Books</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">The official bookstore of the Mission.</h1>
        <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
          Dada Vaswani's Books is the official online bookstore of the Sadhu Vaswani Mission, bringing together books, journals and spiritual literature published by Gita Publishing House. It offers readers direct access to authentic publications inspired by the teachings of Sadhu Vaswani and Dada J. P. Vaswani.
        </p>
      </section>

      <section className="bg-cream/50 border-y border-border/60">
        <div className="container-prose py-16 grid md:grid-cols-3 gap-10">
          {[
            { n: "150+", l: "Titles in print" },
            { n: "12", l: "Journal issues each year" },
            { n: "1929", l: "Mission founded" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-serif text-5xl text-emerald-deep">{s.n}</div>
              <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-16 grid lg:grid-cols-[1fr,1.2fr] gap-14 items-center">
        <div className="aspect-[4/5] rounded-lg overflow-hidden">
          <img src={missionImg} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">Gita Publishing House</h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Gita Publishing House is the official publishing house of the Sadhu Vaswani Mission. It publishes books, journals and spiritual literature, preserving and sharing the teachings of Sadhu Vaswani and Dada J. P. Vaswani.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Books on prayer and meditation, on reverence for life and the vegetarian table, on marriage and parenting, on the Gita and the saints. The monthly journal — the East and West Series — has appeared without break for decades.
          </p>
          <Link to="/mission" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft transition-colors">Read our story</Link>
        </div>
      </section>
    </div>
  );
}
