import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Train } from "lucide-react";
import storeImg from "@/assets/store-pune.jpg";

export const Route = createFileRoute("/store-locator")({
  head: () => ({
    meta: [
      { title: "Visit our store — Pune, India" },
      { name: "description", content: "Visit the Sadhu Vaswani Mission bookstore near Pune Railway Station — address, hours, directions." },
      { property: "og:title", content: "Visit our store — Pune, India" },
      { property: "og:url", content: "/store-locator" },
    ],
    links: [{ rel: "canonical", href: "/store-locator" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BookStore",
        name: "Sadhu Vaswani Mission Bookstore",
        address: { "@type": "PostalAddress", streetAddress: "10 Sadhu Vaswani Path", addressLocality: "Pune", postalCode: "411001", addressCountry: "IN" },
        openingHours: ["Mo-Sa 10:00-19:30", "Su 11:00-18:00"],
      }),
    }],
  }),
  component: StorePage,
});

function StorePage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={storeImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-emerald-deep/55" />
        <div className="relative container-prose h-full flex items-end pb-14">
          <div className="text-ivory max-w-xl">
            <div className="flex items-center gap-3 text-ivory/80"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Pune · India</span></div>
            <h1 className="font-serif text-5xl md:text-6xl mt-4 leading-[1.05]">Visit our bookstore.</h1>
            <p className="mt-4 text-ivory/85 text-lg">Near Pune Railway Station — a short walk from the platforms, a long way from the rush.</p>
          </div>
        </div>
      </section>

      <section className="container-prose py-14 md:py-20 grid lg:grid-cols-3 gap-6">
        <Info icon={MapPin} title="Address" lines={["Sadhu Vaswani Mission", "10 Sadhu Vaswani Path", "Pune, Maharashtra 411001", "India"]} />
        <Info icon={Clock} title="Hours" lines={["Monday — Saturday · 10:00 to 19:30", "Sunday · 11:00 to 18:00", "Closed on public holidays"]} />
        <Info icon={Phone} title="Contact" lines={["+91 20 4040 4040", "books@svmission.org"]} />
      </section>

      <section className="container-prose pb-14 md:pb-20 grid lg:grid-cols-2 gap-10">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-cream relative">
          <iframe
            title="Sadhu Vaswani Mission, Pune"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.866%2C18.520%2C73.886%2C18.535&layer=mapnik&marker=18.5275%2C73.876"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
        <div>
          <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Getting here</div>
          <h2 className="font-serif text-3xl">Three minutes from the platform.</h2>
          <div className="mt-6 space-y-5 text-base">
            <div className="flex gap-3"><Train className="h-5 w-5 text-emerald-deep mt-0.5" /><div><div className="font-serif text-lg">By train</div><div className="text-muted-foreground">Pune Junction is a short walk away. Exit from Platform 1 and turn left.</div></div></div>
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-emerald-deep mt-0.5" /><div><div className="font-serif text-lg">By auto / cab</div><div className="text-muted-foreground">Ask for Sadhu Vaswani Mission. Most drivers know the way.</div></div></div>
          </div>
          <div className="mt-8 border border-border rounded-lg bg-card p-6">
            <div className="eyebrow mb-2">In-store pickup</div>
            <p className="text-sm text-muted-foreground">Order online and choose pickup at checkout — your books will be ready at the front desk on the same day.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: string[] }) {
  return (
    <div className="border border-border rounded-lg p-7 bg-card">
      <Icon className="h-5 w-5 text-emerald-deep" />
      <div className="font-serif text-xl mt-4">{title}</div>
      <div className="mt-3 text-sm text-muted-foreground space-y-1">
        {lines.map((l) => <div key={l}>{l}</div>)}
      </div>
    </div>
  );
}
