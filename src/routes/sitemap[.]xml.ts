import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { thoughts } from "@/data/thoughts";
import { journals } from "@/data/journals";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/books", "/ebooks", "/journals", "/subscriptions",
          "/authors", "/categories", "/thoughts",
          "/about", "/mission", "/gallery", "/faq", "/contact", "/store-locator",
        ];
        const entries = [
          ...staticPaths.map((p) => ({ path: p, changefreq: "weekly" as const, priority: p === "/" ? "1.0" : "0.8" })),
          ...books.map((b) => ({ path: `/books/${b.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...books.filter((b) => b.formats.includes("ebook")).map((b) => ({ path: `/ebooks/${b.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...authors.map((a) => ({ path: `/authors/${a.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...categories.map((c) => ({ path: `/categories/${c.slug}`, changefreq: "weekly" as const, priority: "0.6" })),
          ...thoughts.map((t) => ({ path: `/thoughts/${t.slug}`, changefreq: "monthly" as const, priority: "0.5" })),
          ...journals.map((j) => ({ path: `/journals/${j.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];

        const urls = entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
