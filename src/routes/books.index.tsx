import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/data/books";
import { BookListing } from "@/components/site/BookListing";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Books — Dada Vaswani's Books" },
      { name: "description", content: "Browse the full collection of physical books from the Sadhu Vaswani Mission — inspiration, philosophy, prayer and more." },
      { property: "og:title", content: "Books — Dada Vaswani's Books" },
      { property: "og:description", content: "The full collection of physical spiritual books from the Sadhu Vaswani Mission." },
      { property: "og:url", content: "/books" },
    ],
    links: [{ rel: "canonical", href: "/books" }],
  }),
  component: () => <BookListing books={books} format="physical" title="Physical Books" />,
});
