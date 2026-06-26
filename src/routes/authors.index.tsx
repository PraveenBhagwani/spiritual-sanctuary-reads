import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { authors } from "@/data/authors";
import { booksByAuthor } from "@/data/books";

export const Route = createFileRoute("/authors/")({
  head: () => ({
    meta: [
      { title: "Authors — Dada Vaswani's Books" },
      { name: "description", content: "The two voices at the heart of the Sadhu Vaswani Mission — Sadhu T. L. Vaswani, the Founder, and Dada J. P. Vaswani, the Present Head." },
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
        <p className="mt-4 text-lg text-muted-foreground">The two voices at the heart of the Mission — the Founder and the Present Head.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {authors.map((a) => {
          const count = booksByAuthor(a.slug).length;
          return (
            <Link key={a.slug} to="/authors/$slug" params={{ slug: a.slug }} className="group block border border-border rounded-2xl bg-card overflow-hidden lift hover:lift-hover">
              <div className="grid grid-cols-[auto,1fr] gap-6 p-7 items-start">
                {a.portrait ? (
                  <img src={a.portrait} alt={a.name} width={160} height={200} className="h-40 w-32 object-cover object-top rounded-md shadow-soft" />
                ) : (
                  <div className="h-40 w-32 rounded-md flex items-center justify-center" style={{ background: (a.accent ?? "#0F3D2E") + "1a" }}>
                    <span className="font-serif text-4xl" style={{ color: a.accent }}>{a.name.split(" ").map((s: string) => s[0]).slice(0, 2).join("")}</span>
                  </div>
                )}
                <div>
                  <div className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">{a.title}</div>
                  <div className="font-serif text-2xl md:text-3xl mt-2 group-hover:text-emerald-deep transition-colors">{a.name}</div>
                  {a.era && <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-1">{a.era}</div>}
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">{a.bio}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-emerald-deep">{count} {count === 1 ? "title" : "titles"} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
