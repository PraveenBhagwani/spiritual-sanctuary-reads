import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

const COL_SHOP = [
  { to: "/books", label: "Physical Books" },
  { to: "/ebooks", label: "eBooks" },
  { to: "/journals", label: "Monthly Journals" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/authors", label: "Authors" },
  { to: "/categories", label: "Categories" },
];
const COL_READ = [
  { to: "/thoughts", label: "Daily Thoughts" },
  { to: "/about", label: "About the Mission" },
  { to: "/mission", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
];
const COL_HELP = [
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/store-locator", label: "Visit Pune Store" },
  { to: "/account/orders", label: "Track Order" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-emerald-deep text-ivory">
      <div className="container-prose py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full border border-ivory/30 flex items-center justify-center">
              <span className="font-serif text-ivory text-xl leading-none">V</span>
            </div>
            <div>
              <div className="font-serif text-xl">Dada Vaswani's Books</div>
              <div className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/60">Sadhu Vaswani Mission</div>
            </div>
          </div>
          <p className="text-sm text-ivory/75 leading-relaxed">
            Books, journals and reflections from the Sadhu Vaswani Mission — published in service of seekers everywhere.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://facebook.com" aria-label="Facebook" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Facebook className="h-4 w-4" /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Instagram className="h-4 w-4" /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <FooterCol title="Shop" items={COL_SHOP} />
        <FooterCol title="Read" items={COL_READ} />
        <FooterCol title="Help" items={COL_HELP} />
      </div>
      <div className="border-t border-ivory/15">
        <div className="container-prose py-6 flex flex-col md:flex-row gap-3 md:items-center justify-between text-[0.72rem] tracking-[0.18em] uppercase text-ivory/60">
          <div>© {new Date().getFullYear()} Sadhu Vaswani Mission · All rights reserved</div>
          <div className="flex gap-5">
            <span>India · United States</span>
            <span>English · हिन्दी · سنڌي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-serif text-base text-ivory mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-sm text-ivory/70 hover:text-ivory transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
