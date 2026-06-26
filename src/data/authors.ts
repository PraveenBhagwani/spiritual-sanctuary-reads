import type { Author } from "./types";
import sadhuPortrait from "@/assets/sadhu-vaswani.png.asset.json";
import dadaPortrait from "@/assets/dada-jp-vaswani.png.asset.json";

export const authors: Author[] = [
  {
    slug: "sadhu-vaswani",
    name: "Sadhu T. L. Vaswani",
    title: "The Founder",
    era: "1879 — 1966",
    accent: "#B8893A",
    portrait: sadhuPortrait.url,
    bio: "Poet, mystic and educator, Sadhu T. L. Vaswani founded the Sadhu Vaswani Mission to share a message of unity, compassion and reverence for all life. His writings — gentle, luminous, fearless — continue to illuminate the seeker's path.",
  },
  {
    slug: "dada-j-p-vaswani",
    name: "Dada J. P. Vaswani",
    title: "The Present Head",
    era: "1918 — 2018",
    accent: "#0F3D2E",
    portrait: dadaPortrait.url,
    bio: "Revered spiritual teacher, philosopher and humanitarian, Dada J. P. Vaswani offered seekers everywhere a path of love, service and reverence for all life. He is the author of over 150 books translated into many languages.",
  },
];

export const authorBySlug = (slug: string) => authors.find((a) => a.slug === slug);
