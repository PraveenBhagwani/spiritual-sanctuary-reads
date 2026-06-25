import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, Download, Heart, ShoppingBag } from "lucide-react";
import { bookBySlug, books } from "@/data/books";
import { authorBySlug } from "@/data/authors";
import { BookCover } from "@/components/site/BookCover";
import { BookCard } from "@/components/site/BookCard";
import { useRegion } from "@/lib/region";
import { useCart } from "@/lib/cart";
import type { Language, Format } from "@/data/types";

const LANG: Record<Language, string> = { en: "English", hi: "Hindi", sd: "Sindhi" };

export const Route = createFileRoute("/ebooks/$slug")({
  loader: ({ params }) => {
    const book = bookBySlug(params.slug);
    if (!book || !book.formats.includes("ebook")) throw notFound();
    return book;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "eBook"} (eBook) — Dada Vaswani's Books` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:url", content: loaderData ? `/ebooks/${loaderData.slug}` : "/ebooks" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/ebooks/${loaderData.slug}` : "/ebooks" }],
  }),
  notFoundComponent: () => <div className="container-prose py-32 text-center"><h1 className="font-serif text-3xl">eBook not found</h1></div>,
  component: EbookDetail,
});

function EbookDetail() {
  const book = Route.useLoaderData();
  const author = authorBySlug(book.authorSlug);
  const { formatPrice } = useRegion();
  const { addToCart, toggleWishlist, inWishlist } = useCart();
  const related = books.filter((b) => b.slug !== book.slug && b.formats.includes("ebook")).slice(0, 4);
  const wished = inWishlist(book.slug);

  return (
    <div>
      <section className="container-prose py-14 md:py-20 grid lg:grid-cols-[1.1fr,1.4fr] gap-14">
        <div className="max-w-md mx-auto w-full">
          <BookCover book={book} size="lg" />
        </div>
        <div>
          <div className="text-[0.7rem] tracking-[0.22em] uppercase text-emerald-soft mb-2">eBook · Instant download</div>
          {author && <Link to="/authors/$slug" params={{ slug: author.slug }} className="text-sm text-muted-foreground hover:text-emerald-deep">{author.name}</Link>}
          <h1 className="font-serif text-4xl md:text-5xl mt-2 leading-[1.05]">{book.title}</h1>
          {book.subtitle && <p className="mt-3 font-serif italic text-xl text-muted-foreground">{book.subtitle}</p>}

          <div className="mt-7 font-serif text-4xl text-emerald-deep">{formatPrice(book.price)}</div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => addToCart(book.slug)} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <Link to="/checkout" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft">Buy now</Link>
            <button onClick={() => toggleWishlist(book.slug)} aria-label="Wishlist" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-border text-sm">
              <Heart className={`h-4 w-4 ${wished ? "fill-emerald-deep text-emerald-deep" : ""}`} />
            </button>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex gap-3 p-4 border border-border rounded-lg bg-card">
              <Download className="h-5 w-5 text-emerald-deep shrink-0" />
              <div><div className="font-serif text-sm">EPUB & PDF</div><div className="text-xs text-muted-foreground">Both formats included.</div></div>
            </div>
            <div className="flex gap-3 p-4 border border-border rounded-lg bg-card">
              <Check className="h-5 w-5 text-emerald-deep shrink-0" />
              <div><div className="font-serif text-sm">Instant access</div><div className="text-xs text-muted-foreground">Available in your account at checkout.</div></div>
            </div>
          </div>

          <p className="mt-10 font-serif text-xl leading-relaxed text-charcoal">{book.description}</p>
          <p className="mt-4 text-sm text-muted-foreground"><span className="font-medium text-foreground">Languages:</span> {book.languages.map((l: Language) => LANG[l]).join(", ")} · <span className="font-medium text-foreground">Pages:</span> {book.pages ?? "—"} · <span className="font-medium text-foreground">Formats:</span> {book.formats.map((f: Format) => f[0].toUpperCase() + f.slice(1)).join(", ")}</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream/50 border-t border-border/60">
          <div className="container-prose py-14 md:py-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-10">More eBooks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((b) => <BookCard key={b.slug} book={b} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
