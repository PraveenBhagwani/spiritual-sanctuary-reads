import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { bookBySlug } from "@/data/books";
import { BookCard } from "@/components/site/BookCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — Dada Vaswani's Books" }, { name: "robots", content: "noindex" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const items = wishlist.map(bookBySlug).filter(Boolean);

  return (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-12">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Saved for later</div>
        <h1 className="font-serif text-4xl md:text-5xl">Wishlist</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-lg">
          <div className="font-serif text-2xl mb-2">Nothing saved yet.</div>
          <p className="text-muted-foreground text-sm mb-6">Tap the heart on any book to keep it here.</p>
          <Link to="/books" className="inline-flex px-6 py-3 rounded-full bg-emerald-deep text-ivory text-xs tracking-[0.18em] uppercase">Browse books</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {items.map((b) => <BookCard key={b!.slug} book={b!} />)}
        </div>
      )}
    </div>
  );
}
