import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Train, ArrowRight } from "lucide-react";
import bookStall from "@/assets/book-stall.png.asset.json";

const STORES = [
  {
    id: "main",
    name: "Mission Book Store",
    eyebrow: "Main Bookstore",
    address: ["10, Sadhu Vaswani Road", "Agarkar Nagar, Camp", "Pune — 411001"],
    mapsQuery: "Sadhu Vaswani Mission, 10 Sadhu Vaswani Road, Agarkar Nagar, Camp, Pune 411001",
    icon: MapPin,
  },
  {
    id: "stall",
    name: "Railway Book Stall",
    eyebrow: "At Pune Railway Station",
    address: ["Platform 1, Pune Railway Station", "Agarkar Nagar", "Pune — 411001"],
    mapsQuery: "Pune Railway Station Platform 1, Agarkar Nagar, Pune 411001",
    icon: Train,
  },
];

export const Route = createFileRoute("/store-locator")({
  head: () => ({
    meta: [
      { title: "Visit Our Bookstores — Pune, India" },
      { name: "description", content: "Visit the Sadhu Vaswani Mission's two bookstores in Pune — the Main Mission Book Store and the Railway Book Stall at Pune Railway Station." },
      { property: "og:title", content: "Visit Our Bookstores — Pune, India" },
      { property: "og:url", content: "/store-locator" },
    ],
    links: [{ rel: "canonical", href: "/store-locator" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BookStore",
        name: "Sadhu Vaswani Mission Book Store",
        address: { "@type": "PostalAddress", streetAddress: "10 Sadhu Vaswani Road, Agarkar Nagar, Camp", addressLocality: "Pune", postalCode: "411001", addressCountry: "IN" },
        telephone: "+91-20-26111118",
        openingHours: ["Mo-Sa 09:30-18:00"],
      }),
    }],
  }),
  component: StorePage,
});

function StorePage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={bookStall.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-emerald-deep/60" />
        <div className="relative container-prose h-full flex items-end pb-14">
          <div className="text-ivory max-w-xl">
            <div className="flex items-center gap-3 text-ivory/80"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Pune · India</span></div>
            <h1 className="font-serif text-5xl md:text-6xl mt-4 leading-[1.05]">Visit our bookstores.</h1>
            <p className="mt-4 text-ivory/85 text-lg">Two locations in Pune — our main store at the Mission, and a book stall on Platform 1 of Pune Railway Station.</p>
          </div>
        </div>
      </section>

      <section className="container-prose py-14 md:py-20 grid md:grid-cols-2 gap-6">
        {STORES.map((s) => (
          <div key={s.id} className="border border-border rounded-2xl bg-card p-7 lift hover:lift-hover">
            <div className="eyebrow mb-2"><span className="rule-gold mr-3" />{s.eyebrow}</div>
            <h2 className="font-serif text-3xl">{s.name}</h2>
            <div className="mt-5 flex items-start gap-3 text-muted-foreground">
              <s.icon className="h-5 w-5 text-emerald-deep mt-0.5 shrink-0" />
              <div className="text-base leading-relaxed">
                {s.address.map((line) => <div key={line}>{line}</div>)}
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-deep text-ivory text-xs tracking-[0.22em] uppercase hover:bg-emerald-soft transition-all hover:-translate-y-0.5"
            >
              Get directions <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </section>

      <section className="container-prose pb-14 md:pb-20 grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-2xl bg-card p-7">
          <Phone className="h-5 w-5 text-emerald-deep" />
          <div className="font-serif text-xl mt-3">Contact</div>
          <a href="tel:+912026111118" className="mt-3 inline-block font-serif text-2xl text-charcoal hover:text-emerald-deep">020-26111118</a>
        </div>
        <div className="border border-border rounded-2xl bg-card p-7">
          <Clock className="h-5 w-5 text-emerald-deep" />
          <div className="font-serif text-xl mt-3">Hours</div>
          <div className="mt-3 text-base text-muted-foreground space-y-1">
            <div>Monday — Saturday · 9:30 AM to 6:00 PM</div>
            <div>Sunday & Public Holidays · Closed</div>
          </div>
        </div>
      </section>
    </div>
  );
}
