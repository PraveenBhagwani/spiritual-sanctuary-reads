import type { Author } from "./types";

export const authors: Author[] = [
  {
    slug: "dada-j-p-vaswani",
    name: "Dada J. P. Vaswani",
    title: "Spiritual Leader, Sadhu Vaswani Mission",
    era: "1918 — 2018",
    accent: "#0F3D2E",
    bio: "Revered spiritual teacher, philosopher and humanitarian. For seven decades, Dada J. P. Vaswani offered seekers everywhere a path of love, service and reverence for all life. He is the author of over 150 books translated into many languages.",
  },
  {
    slug: "sadhu-vaswani",
    name: "Sadhu T. L. Vaswani",
    title: "Founder, Sadhu Vaswani Mission",
    era: "1879 — 1966",
    accent: "#B8893A",
    bio: "Poet, mystic and educator who founded the Sadhu Vaswani Mission to spread the message of unity, compassion and the dignity of every soul. His writings continue to illuminate the seeker's path.",
  },
  {
    slug: "krishna-kumari",
    name: "Krishna Kumari",
    title: "Author & Educator",
    accent: "#3C5A47",
    bio: "Devoted student of the Vaswani lineage who translates timeless teachings into practical guidance for daily life.",
  },
  {
    slug: "j-p-vaswani-letters",
    name: "Letters of Dada",
    title: "Curated correspondence",
    accent: "#7A5A2E",
    bio: "A collection of letters Dada wrote to seekers around the world — now compiled as books that read like personal counsel.",
  },
];

export const authorBySlug = (slug: string) => authors.find((a) => a.slug === slug);
