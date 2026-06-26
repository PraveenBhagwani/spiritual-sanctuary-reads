import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { journals } from "@/data/journals";
import { useRegion } from "@/lib/region";

const PLANS = [
  { id: "monthly", name: "Monthly Reader", priceInr: 60, cadence: "/month", desc: "One digital issue, every month.", features: ["Digital monthly journal", "Read on any device", "Cancel anytime"] },
  { id: "annual", name: "Annual Print + Digital", priceInr: 720, cadence: "/year", desc: "12 print issues posted to your home, plus digital access.", features: ["12 print issues by post", "12 digital issues", "Subscriber-only thoughts", "Cancel anytime"], featured: true },
  { id: "gift", name: "Gift a Year", priceInr: 720, cadence: "/year", desc: "Send a year of reflections to someone you love.", features: ["12 print issues posted to the recipient", "Personalised first-issue note", "Sent in your name"] },
];

export const Route = createFileRoute("/journals/")({
  head: () => ({
    meta: [
      { title: "Monthly Journal & Subscriptions — Dada Vaswani's Books" },
      { name: "description", content: "The East and West monthly journal — a reflection, a meditation and a letter from the Mission, each month. Subscribe in print or digital." },
      { property: "og:title", content: "Monthly Journal & Subscriptions" },
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
        <h1 className="font-serif text-4xl md:text-5xl">Monthly Journal</h1>
        <p className="mt-4 text-lg text-muted-foreground">Each issue arrives like a letter: a single theme, a meditation to practice, and reflections to keep. Read individually or subscribe for the year.</p>
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

      {/* Subscription tiers (merged) */}
      <div id="subscribe" className="mt-24 md:mt-32 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow inline-flex items-center gap-3 mb-3"><span className="rule-gold" /> A year of quiet company</div>
          <h2 className="font-serif text-3xl md:text-4xl">Subscribe to the journal</h2>
          <p className="mt-4 text-base text-muted-foreground">Choose how the monthly journal arrives. Cancel any time, no questions asked.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.id} className={`relative rounded-2xl p-8 ${p.featured ? "bg-emerald-deep text-ivory shadow-lift" : "bg-card border border-border"}`}>
              {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[0.65rem] tracking-[0.22em] uppercase px-3 py-1 rounded-full">Most chosen</div>}
              <div className={`text-[0.7rem] tracking-[0.22em] uppercase ${p.featured ? "text-gold-soft" : "text-emerald-soft"} mb-3`}>{p.cadence === "/year" ? "Annual" : "Monthly"}</div>
              <h3 className="font-serif text-2xl">{p.name}</h3>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-4xl">₹{p.priceInr}</span>
                <span className={`text-sm ${p.featured ? "text-ivory/70" : "text-muted-foreground"}`}>{p.cadence}</span>
              </div>
              <p className={`mt-4 text-sm ${p.featured ? "text-ivory/80" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${p.featured ? "text-ivory/90" : "text-foreground"}`}>
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "text-gold-soft" : "text-emerald-soft"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/checkout" className={`mt-7 inline-flex w-full items-center justify-center px-6 py-3 rounded-full text-sm tracking-[0.18em] uppercase ${p.featured ? "bg-gold text-charcoal hover:bg-gold-soft" : "bg-emerald-deep text-ivory hover:bg-emerald-soft"} transition-all hover:-translate-y-0.5`}>
                Subscribe
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
