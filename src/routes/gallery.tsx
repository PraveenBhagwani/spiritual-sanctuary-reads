import { createFileRoute } from "@tanstack/react-router";

const IMGS = [
  { color: "#0F3D2E", caption: "The Pune store, early morning." },
  { color: "#B8893A", caption: "The first edition of Begin The Day With God." },
  { color: "#3C5A47", caption: "A reader in the library." },
  { color: "#7A5A2E", caption: "Mission anniversary print run." },
  { color: "#1F3D5B", caption: "Letters from seekers, kept." },
  { color: "#7A2E2E", caption: "An afternoon at the shipping desk." },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Dada Vaswani's Books" },
      { name: "description", content: "A small visual diary of the Mission, the store and the books." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: () => (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-14 max-w-2xl">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Gallery</div>
        <h1 className="font-serif text-4xl md:text-5xl">A visual diary</h1>
        <p className="mt-4 text-lg text-muted-foreground">A few quiet photographs from the store, the press, and the everyday life of the Mission.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {IMGS.map((i, idx) => (
          <figure key={idx} className={`overflow-hidden rounded-lg book-shadow ${idx % 3 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-[4/3]"}`}>
            <div className="w-full h-full relative" style={{ background: i.color }}>
              <div className="absolute inset-6 border border-ivory/15" />
              <div className="absolute bottom-4 left-4 right-4 text-ivory/80 font-serif italic text-sm">{i.caption}</div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  ),
});
