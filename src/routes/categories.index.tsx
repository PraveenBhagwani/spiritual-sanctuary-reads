import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { booksByCategory } from "@/data/books";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Categories — Dada Vaswani's Books" },
      { name: "description", content: "Browse spiritual books by category — inspirational, philosophy, prayer & meditation, vegetarianism, stories and more." },
      { property: "og:title", content: "Categories" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: () => (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-14 max-w-2xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Find your path</div>
        <h1 className="font-serif text-4xl md:text-5xl">Browse by Category</h1>
        <p className="mt-4 text-lg text-muted-foreground">Eight quiet rooms in the same library. Choose where to begin.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => {
          const n = booksByCategory(c.slug).length;
          return (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group p-8 border border-border bg-card rounded-lg hover:bg-emerald-deep hover:text-ivory transition-colors lift hover:lift-hover">
              <div className="text-[0.65rem] tracking-[0.28em] uppercase text-emerald-soft group-hover:text-gold-soft">{n} titles</div>
              <h3 className="font-serif text-2xl mt-2">{c.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground group-hover:text-ivory/75 leading-relaxed">{c.blurb}</p>
            </Link>
          );
        })}
      </div>
    </div>
  ),
});
