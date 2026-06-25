import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { journals } from "@/data/journals";
import { useRegion } from "@/lib/region";

export const Route = createFileRoute("/journals/")({
  head: () => ({
    meta: [
      { title: "Monthly Journals — Dada Vaswani's Books" },
      { name: "description", content: "The East and West monthly journal — a reflection, a meditation and a letter from the Mission, each month." },
      { property: "og:title", content: "Monthly Journals" },
      { property: "og:description", content: "A reflection, a meditation and a letter from the Mission, each month." },
      { property: "og:url", content: "/journals" },
    ],
    links: [{ rel: "canonical", href: "/journals" }],
  }),
  component: JournalsPage,
});

function JournalsPage() {
  const { formatPrice } = useRegion();
  return (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-14 max-w-2xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />East and West Series</div>
        <h1 className="font-serif text-4xl md:text-5xl">Monthly Journals</h1>
        <p className="mt-4 text-lg text-muted-foreground">Each issue arrives like a letter: a single theme, a meditation to practice, and reflections to keep. Subscribe in print or read digitally.</p>
        <Link to="/subscriptions" className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep">Subscribe to the series <ArrowRight className="h-4 w-4" /></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {journals.map((j) => (
          <Link key={j.slug} to="/journals/$slug" params={{ slug: j.slug }} className="group lift hover:lift-hover">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-emerald-deep relative book-shadow">
              <div className="absolute inset-5 border border-ivory/20 rounded-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory p-8 text-center">
                <div className="text-[0.65rem] tracking-[0.3em] uppercase text-gold-soft mb-3">Issue · {j.month} {j.year}</div>
                <h3 className="font-serif text-3xl leading-tight">{j.title}</h3>
                <span className="inline-block w-10 h-px bg-gold my-5" />
                <p className="text-sm text-ivory/75">{j.pages} pages</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-serif text-lg">{j.month} {j.year}</div>
              <div className="font-serif text-emerald-deep">{formatPrice(j.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
