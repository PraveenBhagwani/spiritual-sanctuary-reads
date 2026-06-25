import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Book } from "@/data/types";
import { authorBySlug } from "@/data/authors";
import { useRegion } from "@/lib/region";
import { useCart } from "@/lib/cart";
import { BookCover } from "./BookCover";

export function BookCard({ book }: { book: Book }) {
  const { formatPrice } = useRegion();
  const { toggleWishlist, inWishlist } = useCart();
  const author = authorBySlug(book.authorSlug);
  const wished = inWishlist(book.slug);

  return (
    <div className="group flex flex-col gap-4">
      <Link
        to="/books/$slug"
        params={{ slug: book.slug }}
        className="relative block lift hover:lift-hover"
      >
        <BookCover book={book} />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleWishlist(book.slug); }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur text-foreground shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current text-emerald-deep" : ""}`} />
        </button>
      </Link>
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <Link to="/books/$slug" params={{ slug: book.slug }} className="font-serif text-lg leading-tight hover:text-emerald-deep transition-colors">
            {book.title}
          </Link>
          <span className="font-serif text-base text-emerald-deep">{formatPrice(book.price)}</span>
        </div>
        {author && (
          <Link to="/authors/$slug" params={{ slug: author.slug }} className="block text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            {author.name}
          </Link>
        )}
      </div>
    </div>
  );
}
