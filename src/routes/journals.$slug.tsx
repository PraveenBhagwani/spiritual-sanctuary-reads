import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { journalBySlug, journals } from "@/data/journals";
import { useRegion } from "@/lib/region";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/journals/$slug")({
  loader: ({ params }) => {
    const j = journalBySlug(params.slug);
    if (!j) throw notFound();
    return j;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title} · ${loaderData?.month} ${loaderData?.year}` },
      { name: "description", content: loaderData?.summary ?? "" },
      { property: "og:title", content: `${loaderData?.title} · ${loaderData?.month} ${loaderData?.year}` },
      { property: "og:description", content: loaderData?.summary ?? "" },
      { property: "og:url", content: loaderData ? `/journals/${loaderData.slug}` : "/journals" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/journals/${loaderData.slug}` : "/journals" }],
  }),
  component: JournalDetail,
});

function JournalDetail() {
  const j = Route.useLoaderData();
  const { formatPrice } = useRegion();
  const { addToCart } = useCart();
  const other = journals.filter((x) => x.slug !== j.slug).slice(0, 3);

  return (
    <div>
      <section className="container-prose py-14 md:py-20 grid lg:grid-cols-2 gap-14 items-start">
        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-emerald-deep relative book-shadow">
          <div className="absolute inset-6 border border-ivory/20 rounded-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory p-12 text-center">
            <div className="text-[0.7rem] tracking-[0.3em] uppercase text-gold-soft mb-4">Issue · {j.month} {j.year}</div>
            <h1 className="font-serif text-5xl leading-tight">{j.title}</h1>
            <span className="inline-block w-12 h-px bg-gold my-6" />
            <div className="font-serif italic text-lg text-ivory/85">A monthly journal of the Mission</div>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-3"><span className="rule-gold mr-3" />In this issue</div>
          <h2 className="font-serif text-3xl md:text-4xl">{j.month} {j.year}</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{j.summary}</p>
          <div className="mt-8 flex items-baseline gap-4">
            <div className="font-serif text-3xl text-emerald-deep">{formatPrice(j.price)}</div>
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">{j.pages} pages · print + digital</div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => addToCart(`journal-${j.slug}`)} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <Link to="/subscriptions" className="px-7 py-3.5 rounded-full border border-emerald-deep text-emerald-deep text-sm tracking-[0.18em] uppercase hover:bg-emerald-deep hover:text-ivory">Subscribe yearly</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream/50 border-t border-border/60">
        <div className="container-prose py-14">
          <h3 className="font-serif text-2xl mb-8">Previous issues</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {other.map((o) => (
              <Link key={o.slug} to="/journals/$slug" params={{ slug: o.slug }} className="border border-border rounded-lg p-6 bg-background hover:border-emerald-soft transition-colors">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-emerald-soft">{o.month} {o.year}</div>
                <div className="font-serif text-lg mt-2">{o.title}</div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{o.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
