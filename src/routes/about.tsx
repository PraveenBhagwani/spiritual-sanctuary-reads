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
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />About</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">A small publisher in service of seekers.</h1>
        <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
          Dada Vaswani's Books is the publishing arm of the Sadhu Vaswani Mission, an international spiritual and humanitarian organisation founded in Pune in 1929. We publish, print and post the works of Dada J. P. Vaswani, Sadhu T. L. Vaswani and the wider lineage — in English, Hindi and Sindhi.
        </p>
      </section>
      <section className="bg-cream/50 border-y border-border/60">
        <div className="container-prose py-16 grid md:grid-cols-3 gap-10">
          {[
            { n: "150+", l: "Titles in print" },
            { n: "12", l: "Issues each year" },
            { n: "32", l: "Countries we post to" },
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
          <h2 className="font-serif text-3xl md:text-4xl">What we publish</h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Books on prayer and meditation, on reverence for life and the vegetarian table, on marriage and parenting, on the Gita and the saints. Books for children, for students, for grandparents. The monthly journal — the East and West Series — has appeared without break for decades.
          </p>
          <Link to="/mission" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase">Read our story</Link>
        </div>
      </section>
    </div>
  );
}
