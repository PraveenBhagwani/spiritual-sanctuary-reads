import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useRegion, LANGUAGE_OPTIONS } from "@/lib/region";
import { useCart } from "@/lib/cart";

const NAV: { label: string; to: string }[] = [
  { label: "Books", to: "/books" },
  { label: "eBooks", to: "/ebooks" },
  { label: "Journals", to: "/journals" },
  { label: "Subscriptions", to: "/subscriptions" },
  { label: "Authors", to: "/authors" },
  { label: "Categories", to: "/categories" },
  { label: "Thoughts", to: "/thoughts" },
];

export function Header() {
  const { region, setRegion, language, setLanguage } = useRegion();
  const { cartCount, wishlistCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
      {/* Utility bar */}
      <div className="hidden md:block bg-emerald-deep text-ivory/90 text-[0.72rem] tracking-[0.18em] uppercase">
        <div className="container-prose flex items-center justify-between py-2">
          <span className="font-serif italic normal-case tracking-normal text-sm text-ivory/80">
            "Begin the day with God. The day will follow your beginning."
          </span>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <button onClick={() => setRegion("IN")} className={`px-2 py-0.5 rounded ${region === "IN" ? "bg-ivory/15 text-ivory" : "hover:text-ivory"}`}>India</button>
              <span className="opacity-40">/</span>
              <button onClick={() => setRegion("US")} className={`px-2 py-0.5 rounded ${region === "US" ? "bg-ivory/15 text-ivory" : "hover:text-ivory"}`}>USA</button>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              className="bg-transparent text-ivory/90 tracking-[0.18em] uppercase text-[0.72rem] border border-ivory/20 rounded px-2 py-0.5 focus:outline-none"
              aria-label="Language"
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.code} value={l.code} className="text-charcoal">{l.label}</option>
              ))}
            </select>
            <Link to="/store-locator" className="hover:text-ivory">Visit Pune Store</Link>
          </div>
        </div>
      </div>

      <div className="container-prose flex items-center gap-6 py-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-full bg-emerald-deep flex items-center justify-center">
            <span className="font-serif text-ivory text-xl leading-none">V</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl text-emerald-deep">Dada Vaswani's Books</div>
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">Sadhu Vaswani Mission</div>
          </div>
        </Link>

        <form onSubmit={onSearch} className="hidden lg:flex flex-1 max-w-md mx-auto relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search books, authors, thoughts…"
            className="w-full rounded-full border border-border bg-card pl-11 pr-5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-emerald-soft focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
          <Link to="/account" aria-label="Account" className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream"><User className="h-4 w-4" /></Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream">
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-gold text-[10px] font-semibold text-charcoal flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-emerald-deep text-[10px] font-semibold text-ivory flex items-center justify-center">{cartCount}</span>}
          </Link>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="hidden lg:block border-t border-border/50">
        <div className="container-prose flex items-center justify-center gap-8 py-3">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.78rem] tracking-[0.22em] uppercase text-charcoal/80 hover:text-emerald-deep transition-colors"
              activeProps={{ className: "text-emerald-deep" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-lift p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-xl text-emerald-deep">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-cream"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={(e) => { onSearch(e); setOpen(false); }} className="relative mb-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search…" className="w-full rounded-full border border-border bg-card pl-11 pr-5 py-2.5 text-sm focus:outline-none focus:border-emerald-soft" />
            </form>
            <div className="flex flex-col">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-serif text-2xl py-3 border-b border-border/60 hover:text-emerald-deep">{n.label}</Link>
              ))}
              <Link to="/about" onClick={() => setOpen(false)} className="font-serif text-2xl py-3 border-b border-border/60 hover:text-emerald-deep">About</Link>
              <Link to="/store-locator" onClick={() => setOpen(false)} className="font-serif text-2xl py-3 border-b border-border/60 hover:text-emerald-deep">Visit Pune Store</Link>
              <Link to="/faq" onClick={() => setOpen(false)} className="font-serif text-2xl py-3 hover:text-emerald-deep">FAQ</Link>
            </div>
            <div className="mt-6 pt-6 border-t border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">Region
                <button onClick={() => setRegion("IN")} className={`ml-auto px-3 py-1 rounded-full text-xs ${region === "IN" ? "bg-emerald-deep text-ivory" : "border border-border"}`}>India</button>
                <button onClick={() => setRegion("US")} className={`px-3 py-1 rounded-full text-xs ${region === "US" ? "bg-emerald-deep text-ivory" : "border border-border"}`}>USA</button>
              </div>
              <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">Language
                <select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)} className="ml-auto bg-card border border-border rounded-full px-3 py-1 text-xs">
                  {LANGUAGE_OPTIONS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
