import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Dada Vaswani's Books" },
      { name: "description", content: "Answers to common questions about orders, shipping, eBooks, subscriptions and the Sadhu Vaswani Mission bookstore." },
      { property: "og:title", content: "FAQ — Dada Vaswani's Books" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group)));
  return (
    <div className="container-prose py-14 md:py-20 max-w-3xl">
      <div className="mb-12">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Help</div>
        <h1 className="font-serif text-4xl md:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">If you can't find what you need here, write to us at <a href="mailto:books@svmission.org" className="text-emerald-deep underline-offset-4 hover:underline">books@svmission.org</a>.</p>
      </div>
      <div className="space-y-12">
        {groups.map((g) => (
          <div key={g}>
            <h2 className="font-serif text-2xl text-emerald-deep mb-5">{g}</h2>
            <div className="border-y border-border divide-y divide-border">
              {faqs.filter((f) => f.group === g).map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)} className="group py-5">
      <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
        <span className="font-serif text-lg">{q}</span>
        <ChevronDown className={`h-4 w-4 text-emerald-deep transition-transform ${open ? "rotate-180" : ""}`} />
      </summary>
      <p className="mt-4 text-muted-foreground leading-relaxed">{a}</p>
    </details>
  );
}
