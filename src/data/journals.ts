import type { Journal } from "./types";

export const journals: Journal[] = [
  { slug: "east-and-west-2025-11", title: "East and West Series", month: "November", year: 2025, summary: "This month: silence as the first language of prayer; a letter on patience; new reflections from the Mission.", price: { inr: 60, usd: 3 }, pages: 56 },
  { slug: "east-and-west-2025-10", title: "East and West Series", month: "October", year: 2025, summary: "Reverence for life — and how a vegetarian table becomes an everyday altar.", price: { inr: 60, usd: 3 }, pages: 52 },
  { slug: "east-and-west-2025-09", title: "East and West Series", month: "September", year: 2025, summary: "On the discipline of joy. With a guided meditation and the month's selected letters.", price: { inr: 60, usd: 3 }, pages: 54 },
  { slug: "east-and-west-2025-08", title: "East and West Series", month: "August", year: 2025, summary: "What the saints did differently — and what we may quietly borrow.", price: { inr: 60, usd: 3 }, pages: 60 },
];

export const journalBySlug = (s: string) => journals.find((j) => j.slug === s);
