import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { thoughts } from "@/data/thoughts";
import { BookCard } from "@/components/site/BookCard";

const schema = z.object({ q: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Search — Dada Vaswani's Books" }, { name: "robots", content: "noindex" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.toLowerCase().trim();
  const bookHits = term ? books.filter((b) => b.title.toLowerCase().includes(term) || b.description.toLowerCase().includes(term)) : [];
  const authorHits = term ? authors.filter((a) => a.name.toLowerCase().includes(term)) : [];
  const thoughtHits = term ? thoughts.filter((t) => t.title.toLowerCase().includes(term) || t.body.toLowerCase().includes(term)) : [];

  return (
    <div className="container-prose py-14 md:py-20">
      <form className="max-w-2xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Search</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">{term ? `Results for "${q}"` : "What are you looking for?"}</h1>
        <input
          name="q"
          defaultValue={q}
          type="search"
          placeholder="Title, author, theme…"
          className="w-full rounded-full border border-border bg-card px-6 py-4 text-base focus:outline-none focus:border-emerald-soft"
        />
      </form>

      {term && (
        <div className="mt-12 space-y-16">
          <section>
            <h2 className="font-serif text-2xl mb-6">Books · {bookHits.length}</h2>
            {bookHits.length === 0 ? <p className="text-muted-foreground text-sm">No books match.</p> : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">{bookHits.map((b) => <BookCard key={b.slug} book={b} />)}</div>
            )}
          </section>
          <section>
            <h2 className="font-serif text-2xl mb-6">Authors · {authorHits.length}</h2>
            {authorHits.length === 0 ? <p className="text-muted-foreground text-sm">No authors match.</p> : (
              <ul className="divide-y divide-border border-y border-border">
                {authorHits.map((a) => (
                  <li key={a.slug} className="py-5"><Link to="/authors/$slug" params={{ slug: a.slug }} className="font-serif text-xl hover:text-emerald-deep">{a.name}</Link><div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-1">{a.title}</div></li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-serif text-2xl mb-6">Thoughts · {thoughtHits.length}</h2>
            {thoughtHits.length === 0 ? <p className="text-muted-foreground text-sm">No reflections match.</p> : (
              <ul className="divide-y divide-border border-y border-border">
                {thoughtHits.map((t) => (
                  <li key={t.slug} className="py-5"><Link to="/thoughts/$slug" params={{ slug: t.slug }} className="font-serif text-xl hover:text-emerald-deep">{t.title}</Link><p className="text-sm text-muted-foreground italic mt-2 line-clamp-1">"{t.body}"</p></li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
