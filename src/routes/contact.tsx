import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dada Vaswani's Books" },
      { name: "description", content: "Get in touch with the Sadhu Vaswani Mission bookstore — orders, returns, the Pune store and the wider Mission." },
      { property: "og:title", content: "Contact — Dada Vaswani's Books" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="container-prose py-14 md:py-20 grid lg:grid-cols-[1fr,1.3fr] gap-14">
      <aside>
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Get in touch</div>
        <h1 className="font-serif text-4xl md:text-5xl">We'd love to hear from you.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">Questions about an order, a book recommendation, or a visit to the Pune store — write to us and we'll reply within two working days.</p>
        <div className="mt-10 space-y-5 text-sm">
          <div className="flex gap-3"><MapPin className="h-5 w-5 text-emerald-deep mt-0.5" /><div><div className="font-serif text-base">Visit</div><div className="text-muted-foreground">10, Sadhu Vaswani Road, Agarkar Nagar, Camp, Pune — 411001</div></div></div>
          <div className="flex gap-3"><Mail className="h-5 w-5 text-emerald-deep mt-0.5" /><div><div className="font-serif text-base">Write</div><a href="mailto:books@svmission.org" className="text-muted-foreground hover:text-emerald-deep">books@svmission.org</a></div></div>
          <div className="flex gap-3"><Phone className="h-5 w-5 text-emerald-deep mt-0.5" /><div><div className="font-serif text-base">Call</div><a href="tel:+912026111118" className="text-muted-foreground hover:text-emerald-deep">020-26111118</a><div className="text-xs text-muted-foreground mt-1">Mon — Sat · 9:30 AM to 6 PM</div></div></div>
        </div>
      </aside>
      <form className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your name"><input required type="text" className="form-input" /></Field>
          <Field label="Email"><input required type="email" className="form-input" /></Field>
        </div>
        <Field label="Subject"><input type="text" className="form-input" /></Field>
        <Field label="Message"><textarea required rows={6} className="form-input resize-none" /></Field>
        <button type="submit" className="w-full px-7 py-3.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Send message</button>
        <style>{`.form-input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:.5rem;padding:.7rem 1rem;font-size:.95rem;outline:none;}.form-input:focus{border-color:var(--emerald-soft)}`}</style>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep mb-2">{label}</span>
      {children}
    </label>
  );
}
