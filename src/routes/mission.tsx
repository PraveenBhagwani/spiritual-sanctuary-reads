import { createFileRoute, Link } from "@tanstack/react-router";

const CHAPTERS = [
  { year: "1879", title: "A poet is born", body: "Sadhu T. L. Vaswani is born in Hyderabad-Sind. From his earliest days, he is drawn to silence, study, and song." },
  { year: "1929", title: "The Mission begins", body: "Sadhu Vaswani founds the Sakhi Satsang in Hyderabad-Sind, devoted to the dignity of the soul and the education of girls." },
  { year: "1949", title: "A new home in Pune", body: "After Partition, the Mission settles in Pune, India. A school is opened. A small kitchen. A clinic. And — quietly — a bookstore." },
  { year: "1966", title: "The work continues", body: "On Sadhu Vaswani's passing, Dada J. P. Vaswani assumes leadership, carrying the message of love, service and reverence for life across continents." },
  { year: "2018", title: "A lifetime of teaching", body: "Dada J. P. Vaswani's passing at one hundred years closes a remarkable chapter. The books, the journals and the work remain — daily company for seekers everywhere." },
  { year: "Today", title: "The bookstore", body: "From a small shop near Pune Railway Station — and now from this quiet website — we continue to publish, print and post the Mission's books to readers in India, the United States and beyond." },
];

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Story — Sadhu Vaswani Mission" },
      { name: "description", content: "The story of the Sadhu Vaswani Mission, from Hyderabad-Sind in 1929 to today's bookstore near Pune Railway Station." },
      { property: "og:title", content: "Our Story — Sadhu Vaswani Mission" },
      { property: "og:url", content: "/mission" },
    ],
    links: [{ rel: "canonical", href: "/mission" }],
  }),
  component: () => (
    <div>
      <section className="container-prose py-16 md:py-24 max-w-3xl text-center">
        <div className="eyebrow inline-flex items-center gap-3 mb-3"><span className="rule-gold" /> Our story</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">A century of love, in print.</h1>
        <p className="mt-6 text-lg text-muted-foreground">From Sind to Pune to your bookshelf — the quiet arc of a Mission that has lived long enough to be unhurried.</p>
      </section>
      <section className="container-prose py-10 max-w-3xl">
        <ol className="relative border-l border-border ml-3">
          {CHAPTERS.map((c) => (
            <li key={c.year} className="mb-14 ml-8">
              <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-deep ring-4 ring-background" />
              <div className="text-[0.7rem] tracking-[0.22em] uppercase text-emerald-soft">{c.year}</div>
              <h3 className="font-serif text-2xl mt-1">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ol>
        <div className="text-center mt-10">
          <Link to="/books" className="inline-flex px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase">Explore the books</Link>
        </div>
      </section>
    </div>
  ),
});
