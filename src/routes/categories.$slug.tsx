import { createFileRoute, notFound } from "@tanstack/react-router";
import { categoryBySlug } from "@/data/categories";
import { booksByCategory } from "@/data/books";
import { BookListing } from "@/components/site/BookListing";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const c = categoryBySlug(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Category"} — Dada Vaswani's Books` },
      { name: "description", content: loaderData?.blurb ?? "" },
      { property: "og:title", content: loaderData?.name ?? "" },
      { property: "og:description", content: loaderData?.blurb ?? "" },
      { property: "og:url", content: loaderData ? `/categories/${loaderData.slug}` : "/categories" },
    ],
    links: [{ rel: "canonical", href: loaderData ? `/categories/${loaderData.slug}` : "/categories" }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const c = Route.useLoaderData();
  return <BookListing books={booksByCategory(c.slug)} title={c.name} />;
}
