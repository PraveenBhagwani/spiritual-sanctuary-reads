import { createFileRoute, Link } from "@tanstack/react-router";
import { thoughts } from "@/data/thoughts";
import { authorBySlug } from "@/data/authors";
import thoughtsImg from "@/assets/thoughts-still.jpg";

export const Route = createFileRoute("/thoughts")({
  head: () => ({
    meta: [
      { title: "Thoughts — Daily wisdom from the Mission" },
      { name: "description", content: "Daily reflections from Dada J. P. Vaswani and the saints of the Sadhu Vaswani Mission." },
      { property: "og:title", content: "Thoughts — Daily wisdom" },
      { property: "og:description", content: "Daily reflections from the Sadhu Vaswani Mission." },
      { property: "og:url", content: "/thoughts" },
    ],
    links: [{ rel: "canonical", href: "/thoughts" }],
  }),
  component: ThoughtsPage,
});

function ThoughtsPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <img src={thoughtsImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative container-prose py-20 md:py-28 text-center">
          <div className="eyebrow inline-flex items-center gap-3 mb-4"><span className="rule-gold" /> Daily wisdom</div>
          <h1 className="font-serif text-5xl md:text-6xl text-emerald-deep">Thoughts</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">A short reflection, kept short on purpose. Carry one with you today.</p>
        </div>
      </section>

      <section className="container-prose py-14 md:py-20">
        <div className="max-w-3xl mx-auto space-y-14">
          {thoughts.map((t) => {
            const a = t.authorSlug ? authorBySlug(t.authorSlug) : null;
            return (
              <article key={t.slug} className="border-b border-border pb-12 last:border-0">
                <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase text-emerald-soft mb-3">
                  <span>{new Date(t.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  {t.tag && <><span>·</span><span>{t.tag}</span></>}
                </div>
                <Link to="/thoughts/$slug" params={{ slug: t.slug }} className="block">
                  <h2 className="font-serif text-3xl md:text-4xl hover:text-emerald-deep transition-colors">{t.title}</h2>
                </Link>
                <p className="mt-5 font-serif italic text-xl leading-relaxed text-charcoal">"{t.body}"</p>
                {a && <div className="mt-5 text-sm text-muted-foreground">— {a.name}</div>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
