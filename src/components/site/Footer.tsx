import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone } from "lucide-react";
import gphLogo from "@/assets/gph-logo.png.asset.json";

const COL_SHOP = [
  { to: "/books", label: "Books" },
  { to: "/ebooks", label: "eBooks" },
  { to: "/journals", label: "Monthly Journals" },
  { to: "/authors", label: "Authors" },
  { to: "/categories", label: "Categories" },
  { to: "/thoughts", label: "Daily Thoughts" },
];
const COL_ABOUT = [
  { to: "/about", label: "Dada Vaswani's Books" },
  { to: "/mission", label: "Sadhu Vaswani Mission" },
  { to: "/about", label: "Gita Publishing House" },
  { to: "/authors/sadhu-vaswani", label: "Sadhu T. L. Vaswani" },
  { to: "/authors/dada-j-p-vaswani", label: "Dada J. P. Vaswani" },
];
const COL_HELP = [
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/store-locator", label: "Visit Our Bookstores" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-emerald-deep text-ivory">
      <div className="container-prose py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <img src={gphLogo.url} alt="Gita Publishing House" width={44} height={44} className="h-11 w-11 object-contain bg-ivory/95 rounded-md p-1" />
            <div>
              <div className="font-serif text-xl">Dada Vaswani's Books</div>
              <div className="text-[0.62rem] tracking-[0.22em] uppercase text-ivory/60">Published by Gita Publishing House</div>
            </div>
          </div>
          <p className="text-sm text-ivory/75 leading-relaxed">
            The official online bookstore of the Sadhu Vaswani Mission — books, journals and reflections from Sadhu T. L. Vaswani and Dada J. P. Vaswani, delivered across India.
          </p>
          <div className="mt-6 space-y-2 text-sm text-ivory/75">
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold-soft shrink-0" /><span>10, Sadhu Vaswani Road, Agarkar Nagar, Camp, Pune — 411001</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-soft" /><a href="tel:+912026111118" className="hover:text-ivory">020-26111118</a></div>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="https://facebook.com" aria-label="Facebook" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Facebook className="h-4 w-4" /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Instagram className="h-4 w-4" /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="h-9 w-9 rounded-full border border-ivory/25 inline-flex items-center justify-center hover:bg-ivory/10"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <FooterCol title="Shop" items={COL_SHOP} />
        <FooterCol title="About" items={COL_ABOUT} />
        <FooterCol title="Help" items={COL_HELP} />
      </div>
      <div className="border-t border-ivory/15">
        <div className="container-prose py-6 flex flex-col md:flex-row gap-3 md:items-center justify-between text-[0.72rem] tracking-[0.18em] uppercase text-ivory/60">
          <div>© {new Date().getFullYear()} Sadhu Vaswani Mission · All rights reserved</div>
          <div>Published by Gita Publishing House · Pune, India</div>
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
          <li key={i.to + i.label}>
            <Link to={i.to} className="text-sm text-ivory/70 hover:text-ivory transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
