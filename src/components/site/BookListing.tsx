import { useMemo, useState } from "react";
import type { Book, Format, Language } from "@/data/types";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";
import { BookCard } from "./BookCard";
import { useRegion } from "@/lib/region";

const LANG_LABEL: Record<Language, string> = { en: "English", hi: "Hindi", sd: "Sindhi" };

interface Props {
  books: Book[];
  format?: Format; // pre-filter
  title: string;
}

export function BookListing({ books, format, title }: Props) {
  const base = format ? books.filter((b) => b.formats.includes(format)) : books;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [auth, setAuth] = useState<string | null>(null);
  const [lang, setLang] = useState<Language | null>(null);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "az">("featured");
  const { region } = useRegion();

  const filtered = useMemo(() => {
    let list = base;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
    }
    if (cat) list = list.filter((b) => b.categorySlugs.includes(cat));
    if (auth) list = list.filter((b) => b.authorSlug === auth);
    if (lang) list = list.filter((b) => b.languages.includes(lang));
    const sorted = [...list];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "price-asc") sorted.sort((a, b) => (region === "IN" ? a.price.inr - b.price.inr : a.price.usd - b.price.usd));
    if (sort === "price-desc") sorted.sort((a, b) => (region === "IN" ? b.price.inr - a.price.inr : b.price.usd - a.price.usd));
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [base, search, cat, auth, lang, sort, region]);

  const reset = () => { setSearch(""); setCat(null); setAuth(null); setLang(null); setSort("featured"); };
  const hasFilters = !!(search || cat || auth || lang);

  return (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-12">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />The Collection</div>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground">{title}</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">{filtered.length} of {base.length} titles · curated by the Mission's editors.</p>
      </div>

      <div className="grid lg:grid-cols-[260px,1fr] gap-12">
        <aside className="space-y-7">
          <Field label="Search">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, theme…"
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:border-emerald-soft"
            />
          </Field>
          <Field label="Category">
            <ChipList
              items={categories.map((c) => ({ value: c.slug, label: c.name }))}
              value={cat}
              onChange={setCat}
            />
          </Field>
          <Field label="Author">
            <ChipList items={authors.map((a) => ({ value: a.slug, label: a.name }))} value={auth} onChange={setAuth} />
          </Field>
          <Field label="Language">
            <ChipList
              items={(["en", "hi", "sd"] as Language[]).map((l) => ({ value: l, label: LANG_LABEL[l] }))}
              value={lang}
              onChange={(v) => setLang(v as Language | null)}
            />
          </Field>
          {hasFilters && (
            <button onClick={reset} className="text-xs tracking-[0.18em] uppercase text-emerald-deep underline-offset-4 hover:underline">Clear filters</button>
          )}
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-border">
            <div className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "title" : "titles"}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm focus:outline-none">
                <option value="featured">Featured</option>
                <option value="az">A — Z</option>
                <option value="price-asc">Price · Low to high</option>
                <option value="price-desc">Price · High to low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-lg">
              <div className="font-serif text-2xl mb-2">No books match this view</div>
              <p className="text-muted-foreground text-sm mb-6">Try clearing a filter, or browse our authors.</p>
              <button onClick={reset} className="px-5 py-2 rounded-full bg-emerald-deep text-ivory text-xs tracking-[0.18em] uppercase">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((b) => <BookCard key={b.slug} book={b} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep mb-3">{label}</div>
      {children}
    </div>
  );
}

function ChipList({ items, value, onChange }: { items: { value: string; label: string }[]; value: string | null; onChange: (v: string | null) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => {
        const active = value === i.value;
        return (
          <button
            key={i.value}
            type="button"
            onClick={() => onChange(active ? null : i.value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${active ? "bg-emerald-deep text-ivory border-emerald-deep" : "border-border hover:border-emerald-soft text-charcoal"}`}
          >
            {i.label}
          </button>
        );
      })}
    </div>
  );
}
