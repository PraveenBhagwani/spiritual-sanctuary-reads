import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, Download, Heart, MapPin, ShoppingBag, Truck } from "lucide-react";
import { bookBySlug, books } from "@/data/books";
import { authorBySlug } from "@/data/authors";
import { categoryBySlug } from "@/data/categories";
import { BookCover } from "@/components/site/BookCover";
import { BookCard } from "@/components/site/BookCard";
import { useRegion } from "@/lib/region";
import { useCart } from "@/lib/cart";

import type { Format, Language } from "@/data/types";

const LANG: Record<Language, string> = { en: "English", hi: "Hindi", sd: "Sindhi" };

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = bookBySlug(params.slug);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Book"} — Dada Vaswani's Books` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "book" },
      { property: "og:url", content: loaderData ? `/books/${loaderData.slug}` : "/books" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/books/${loaderData.slug}` : "/books" }],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Book",
        name: loaderData.title,
        author: { "@type": "Person", name: authorBySlug(loaderData.authorSlug)?.name },
        description: loaderData.description,
        numberOfPages: loaderData.pages,
        inLanguage: loaderData.languages,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: loaderData.price.inr,
          availability: loaderData.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      }),
    }] : [],
  }),
  notFoundComponent: () => <div className="container-prose py-32 text-center"><h1 className="font-serif text-3xl">Book not found</h1></div>,
  component: BookDetail,
});

function BookDetail() {
  const book = Route.useLoaderData();
  const author = authorBySlug(book.authorSlug);
  const { formatPrice } = useRegion();
  const { addToCart, toggleWishlist, inWishlist } = useCart();
  const related = books.filter((b) => b.slug !== book.slug && b.categorySlugs.some((c) => book.categorySlugs.includes(c))).slice(0, 4);
  const wished = inWishlist(book.slug);

  return (
    <div>
      <div className="bg-cream/40 border-b border-border/60">
        <div className="container-prose py-4 text-xs tracking-[0.18em] uppercase text-muted-foreground flex gap-2 items-center">
          <Link to="/" className="hover:text-foreground">Home</Link><span>·</span>
          <Link to="/books" className="hover:text-foreground">Books</Link><span>·</span>
          <span className="text-foreground/80 normal-case tracking-normal font-serif">{book.title}</span>
        </div>
      </div>

      <section className="container-prose py-14 md:py-20 grid lg:grid-cols-[1.1fr,1.4fr] gap-14">
        <div className="max-w-md mx-auto w-full">
          <BookCover book={book} size="lg" />
        </div>

        <div>
          {author && <Link to="/authors/$slug" params={{ slug: author.slug }} className="text-xs tracking-[0.22em] uppercase text-emerald-soft hover:text-emerald-deep">{author.name}</Link>}
          <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">{book.title}</h1>
          {book.subtitle && <p className="mt-3 font-serif italic text-xl text-muted-foreground">{book.subtitle}</p>}

          <div className="mt-7 flex items-baseline gap-4">
            <div className="font-serif text-4xl text-emerald-deep">{formatPrice(book.price)}</div>
            <div className={`text-xs tracking-[0.18em] uppercase ${book.inStock ? "text-emerald-soft" : "text-destructive"}`}>{book.inStock ? "In stock" : "Out of stock"}</div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden text-sm">
            <Meta label="Formats" value={book.formats.map((f: Format) => f[0].toUpperCase() + f.slice(1)).join(", ")} />
            <Meta label="Languages" value={book.languages.map((l: Language) => LANG[l]).join(", ")} />
            <Meta label="Pages" value={book.pages ? `${book.pages}` : "—"} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button disabled={!book.inStock} onClick={() => addToCart(book.slug)} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft disabled:opacity-40 disabled:cursor-not-allowed">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <Link to="/checkout" className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft ${!book.inStock ? "pointer-events-none opacity-40" : ""}`}>
              Buy now
            </Link>
            <button onClick={() => toggleWishlist(book.slug)} aria-label="Wishlist" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-border text-sm">
              <Heart className={`h-4 w-4 ${wished ? "fill-emerald-deep text-emerald-deep" : ""}`} />
            </button>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-3 text-sm">
            <Trust icon={Truck} title="Shipped from Pune & New Jersey" body="3–7 days within India · 5–10 across the USA." />
            <Trust icon={Check} title="Carefully packaged" body="Every book wrapped to arrive as it left." />
            {book.formats.includes("ebook") && <Trust icon={Download} title="Instant download" body="EPUB and PDF in your account at checkout." />}
            <Trust icon={MapPin} title="Or visit our Pune store" body="Browse and buy near Pune Railway Station." />
          </div>
        </div>
      </section>

      <section className="container-prose py-14 grid lg:grid-cols-[2fr,1fr] gap-14">
        <div className="prose max-w-none">
          <div className="eyebrow"><span className="rule-gold mr-3" />About the book</div>
          <p className="font-serif text-xl md:text-2xl leading-relaxed mt-3 text-charcoal">{book.description}</p>
          {book.excerpt && (
            <blockquote className="mt-10 border-l-2 border-gold pl-6 py-2 font-serif italic text-2xl text-emerald-deep">
              "{book.excerpt}"
            </blockquote>
          )}
        </div>
        <aside className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="eyebrow mb-2">Who this book is for</div>
            <p className="text-sm leading-relaxed">{book.forWhom}</p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="eyebrow mb-3">Categories</div>
            <div className="flex flex-wrap gap-2">
              {book.categorySlugs.map((c: string) => {
                const cat = categoryBySlug(c);
                return cat ? (
                  <Link key={c} to="/categories/$slug" params={{ slug: c }} className="text-xs px-3 py-1 rounded-full border border-border hover:border-emerald-soft">{cat.name}</Link>
                ) : null;
              })}
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-cream/50 border-t border-border/60">
          <div className="container-prose py-14 md:py-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-10">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((b) => <BookCard key={b.slug} book={b} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-base text-foreground">{value}</div>
    </div>
  );
}

function Trust({ icon: Icon, title, body }: { icon: typeof Truck; title: string; body: string }) {
  return (
    <div className="flex gap-3 p-4 border border-border rounded-lg bg-card">
      <Icon className="h-5 w-5 text-emerald-deep shrink-0" strokeWidth={1.5} />
      <div>
        <div className="font-serif text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}
