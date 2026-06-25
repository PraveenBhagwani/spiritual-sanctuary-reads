import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { authors } from "@/data/authors";
import { booksByAuthor } from "@/data/books";

export const Route = createFileRoute("/authors")({
  head: () => ({
    meta: [
      { title: "Authors — Dada Vaswani's Books" },
      { name: "description", content: "Browse the writers of the Sadhu Vaswani Mission — Dada J. P. Vaswani, Sadhu T. L. Vaswani and more." },
      { property: "og:title", content: "Authors" },
      { property: "og:url", content: "/authors" },
    ],
    links: [{ rel: "canonical", href: "/authors" }],
  }),
  component: Authors,
});

function Authors() {
  return (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-14 max-w-2xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Lives of the saints</div>
        <h1 className="font-serif text-4xl md:text-5xl">Our Authors</h1>
        <p className="mt-4 text-lg text-muted-foreground">Teachers, mystics, and gentle counsellors. Begin with the voice that speaks to yours.</p>
      </div>
      <div className="divide-y divide-border border-y border-border">
        {authors.map((a) => {
          const count = booksByAuthor(a.slug).length;
          return (
            <Link key={a.slug} to="/authors/$slug" params={{ slug: a.slug }} className="block group py-10 grid md:grid-cols-[auto,1fr,auto] gap-8 items-center hover:bg-cream/40 -mx-4 px-4 transition-colors">
              <div className="h-24 w-24 rounded-full border-2 border-emerald-deep/20 flex items-center justify-center" style={{ background: a.accent + "1a" }}>
                <span className="font-serif text-3xl" style={{ color: a.accent }}>{a.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</span>
              </div>
              <div>
                <div className="font-serif text-2xl md:text-3xl group-hover:text-emerald-deep transition-colors">{a.name}</div>
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2">{a.title}{a.era && ` · ${a.era}`}</div>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl line-clamp-2">{a.bio}</p>
              </div>
              <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-emerald-deep">{count} titles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
