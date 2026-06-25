import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/data/books";
import { BookListing } from "@/components/site/BookListing";

export const Route = createFileRoute("/ebooks")({
  head: () => ({
    meta: [
      { title: "eBooks — Dada Vaswani's Books" },
      { name: "description", content: "Spiritual eBooks in EPUB and PDF — delivered instantly to your account." },
      { property: "og:title", content: "eBooks — Dada Vaswani's Books" },
      { property: "og:description", content: "Spiritual eBooks in EPUB and PDF — delivered instantly." },
      { property: "og:url", content: "/ebooks" },
    ],
    links: [{ rel: "canonical", href: "/ebooks" }],
  }),
  component: () => <BookListing books={books} format="ebook" title="eBooks" />,
});
