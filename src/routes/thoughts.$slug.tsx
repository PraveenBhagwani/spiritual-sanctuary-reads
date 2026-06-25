import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { thoughtBySlug, thoughts } from "@/data/thoughts";
import { authorBySlug } from "@/data/authors";

export const Route = createFileRoute("/thoughts/$slug")({
  loader: ({ params }) => {
    const t = thoughtBySlug(params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title} — Thoughts` },
      { name: "description", content: loaderData?.body ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.body ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: loaderData ? `/thoughts/${loaderData.slug}` : "/thoughts" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/thoughts/${loaderData.slug}` : "/thoughts" }],
  }),
  component: ThoughtPage,
});

function ThoughtPage() {
  const t = Route.useLoaderData();
  const a = t.authorSlug ? authorBySlug(t.authorSlug) : null;
  const more = thoughts.filter((x) => x.slug !== t.slug).slice(0, 3);
  return (
    <div>
      <article className="container-prose max-w-3xl py-16 md:py-24 text-center">
        <div className="eyebrow inline-flex items-center gap-3 mb-4"><span className="rule-gold" /> {t.tag ?? "Reflection"}</div>
        <h1 className="font-serif text-4xl md:text-6xl text-emerald-deep leading-[1.05]">{t.title}</h1>
        <p className="mt-10 font-serif italic text-2xl md:text-3xl leading-relaxed text-charcoal">"{t.body}"</p>
        <div className="mt-10 text-xs tracking-[0.22em] uppercase text-muted-foreground">
          {a && <>{a.name} · </>}{new Date(t.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </article>
      <section className="bg-cream/50 border-t border-border/60">
        <div className="container-prose py-14">
          <h2 className="font-serif text-2xl mb-8 text-center">More thoughts to keep</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {more.map((m) => (
              <Link key={m.slug} to="/thoughts/$slug" params={{ slug: m.slug }} className="border border-border bg-background rounded-lg p-6 hover:border-emerald-soft">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-emerald-soft">{m.tag}</div>
                <div className="font-serif text-lg mt-2">{m.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
