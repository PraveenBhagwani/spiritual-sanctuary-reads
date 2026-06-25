import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useRegion } from "@/lib/region";

const PLANS = [
  { id: "monthly", name: "Monthly Reader", priceInr: 60, priceUsd: 5, cadence: "/month", desc: "One digital issue, every month.", features: ["Digital monthly journal", "Read on any device", "Cancel anytime"] },
  { id: "annual", name: "Annual Print + Digital", priceInr: 720, priceUsd: 48, cadence: "/year", desc: "12 print issues posted to your home, plus digital access.", features: ["12 print issues by post", "12 digital issues", "Exclusive subscriber thoughts", "Cancel anytime"], featured: true },
  { id: "gift", name: "Gift a Year", priceInr: 720, priceUsd: 48, cadence: "/year", desc: "Send a year of reflections to someone you love.", features: ["12 print issues posted to the recipient", "Personalised first-issue note", "Sent in your name"] },
];

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Dada Vaswani's Books" },
      { name: "description", content: "Subscribe to the East and West monthly journal — in print, digital, or as a gift." },
      { property: "og:title", content: "Subscriptions" },
      { property: "og:url", content: "/subscriptions" },
    ],
    links: [{ rel: "canonical", href: "/subscriptions" }],
  }),
  component: Subs,
});

function Subs() {
  const { region } = useRegion();
  return (
    <div className="container-prose py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="eyebrow inline-flex items-center gap-3 mb-3"><span className="rule-gold" /> A year of quiet company</div>
        <h1 className="font-serif text-4xl md:text-5xl">Subscriptions</h1>
        <p className="mt-4 text-lg text-muted-foreground">Choose how the monthly journal arrives. Cancel any time, no questions asked.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((p) => (
          <div key={p.id} className={`relative rounded-2xl p-8 ${p.featured ? "bg-emerald-deep text-ivory shadow-lift" : "bg-card border border-border"}`}>
            {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[0.65rem] tracking-[0.22em] uppercase px-3 py-1 rounded-full">Most chosen</div>}
            <div className={`text-[0.7rem] tracking-[0.22em] uppercase ${p.featured ? "text-gold-soft" : "text-emerald-soft"} mb-3`}>{p.cadence === "/year" ? "Annual" : "Monthly"}</div>
            <h3 className="font-serif text-2xl">{p.name}</h3>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-serif text-4xl">{region === "IN" ? `₹${p.priceInr}` : `$${p.priceUsd}`}</span>
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
            <Link to="/checkout" className={`mt-7 inline-flex w-full items-center justify-center px-6 py-3 rounded-full text-sm tracking-[0.18em] uppercase ${p.featured ? "bg-gold text-charcoal hover:bg-gold-soft" : "bg-emerald-deep text-ivory hover:bg-emerald-soft"}`}>
              Subscribe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
