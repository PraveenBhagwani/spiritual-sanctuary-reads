import type { Book } from "@/data/types";
import { authorBySlug } from "@/data/authors";

interface Props { book: Book; size?: "sm" | "md" | "lg"; className?: string }

/**
 * Typographic book cover. Renders a serif title on a colored cloth-like
 * panel with a gold rule and the author's name below — used when we have
 * no real cover image, which is most of the catalog.
 */
export function BookCover({ book, size = "md", className = "" }: Props) {
  const author = authorBySlug(book.authorSlug);
  const dims = size === "lg" ? "w-full aspect-[2/3]" : size === "sm" ? "w-full aspect-[2/3]" : "w-full aspect-[2/3]";
  const bg = book.accent || "#0F3D2E";
  const title = book.title;
  // Scale font size with title length
  const len = title.length;
  const titleClass = len > 40 ? "text-[clamp(0.95rem,2.2vw,1.4rem)]" : len > 24 ? "text-[clamp(1.05rem,2.6vw,1.7rem)]" : "text-[clamp(1.2rem,3vw,2rem)]";

  return (
    <div
      className={`relative overflow-hidden rounded-[2px] book-shadow ${dims} ${className}`}
      style={{ background: bg }}
      aria-label={`${book.title} cover`}
    >
      {/* Cloth texture using layered gradients */}
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)", backgroundSize: "3px 3px, 5px 5px", backgroundPosition: "0 0, 1px 2px" }}
      />
      {/* Inner frame */}
      <div className="absolute inset-3 sm:inset-4 border border-white/25 rounded-[1px]" />
      <div className="absolute inset-4 sm:inset-5 flex flex-col items-center justify-between p-3 sm:p-4 text-center text-[var(--ivory)]">
        <div className="font-serif italic text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase opacity-80">
          Sadhu Vaswani
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h3 className={`font-serif leading-[1.05] font-medium ${titleClass}`} style={{ color: "var(--ivory)" }}>
            {title}
          </h3>
        </div>
        <div className="space-y-2">
          <span className="block mx-auto h-px w-8" style={{ background: "var(--gold-soft)" }} />
          <div className="font-sans text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase opacity-90">
            {author?.name ?? "Anonymous"}
          </div>
        </div>
      </div>
      {/* Spine highlight */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/15 to-transparent" />
    </div>
  );
}
