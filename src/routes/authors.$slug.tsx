import { createFileRoute, notFound } from "@tanstack/react-router";
import { authorBySlug } from "@/data/authors";
import { booksByAuthor } from "@/data/books";
import { BookCard } from "@/components/site/BookCard";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const a = authorBySlug(params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Author"} — Dada Vaswani's Books` },
      { name: "description", content: loaderData?.bio ?? "" },
      { property: "og:title", content: loaderData?.name ?? "" },
      { property: "og:description", content: loaderData?.bio ?? "" },
      { property: "og:url", content: loaderData ? `/authors/${loaderData.slug}` : "/authors" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/authors/${loaderData.slug}` : "/authors" }],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const a = Route.useLoaderData();
  const titles = booksByAuthor(a.slug);
  return (
    <div>
      <section className="bg-cream/40 border-b border-border/60">
        <div className="container-prose py-14 md:py-20 grid md:grid-cols-[auto,1fr] gap-10 items-center">
          <div className="h-40 w-40 rounded-full border-2 flex items-center justify-center mx-auto md:mx-0" style={{ borderColor: a.accent + "55", background: (a.accent ?? "#0F3D2E") + "14" }}>
            <span className="font-serif text-5xl" style={{ color: a.accent }}>{a.name.split(" ").map((s: string) => s[0]).slice(0, 2).join("")}</span>
          </div>
          <div>
            <div className="eyebrow"><span className="rule-gold mr-3" />Author</div>
            <h1 className="font-serif text-4xl md:text-5xl mt-3">{a.name}</h1>
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2">{a.title}{a.era && ` · ${a.era}`}</div>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">{a.bio}</p>
          </div>
        </div>
      </section>
      <section className="container-prose py-14 md:py-20">
        <h2 className="font-serif text-3xl mb-10">Books by {a.name}</h2>
        {titles.length === 0 ? (
          <p className="text-muted-foreground">More titles coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {titles.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        )}
      </section>
    </div>
  );
}
