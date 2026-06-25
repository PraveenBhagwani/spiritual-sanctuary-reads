import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "inspirational", name: "Inspirational", blurb: "Quiet courage for everyday living." },
  { slug: "vegetarianism", name: "Vegetarianism & Reverence for Life", blurb: "Compassion for every creature that breathes." },
  { slug: "prayer-meditation", name: "Prayer & Meditation", blurb: "Practices to still the mind and open the heart." },
  { slug: "youth", name: "For the Young", blurb: "Wisdom written for students and seekers under thirty." },
  { slug: "stories", name: "Stories & Parables", blurb: "Short tales that carry whole lifetimes of meaning." },
  { slug: "philosophy", name: "Philosophy & Vedanta", blurb: "Deep readings on the nature of self and Spirit." },
  { slug: "biography", name: "Lives of the Saints", blurb: "Biographies of those who walked the path before us." },
  { slug: "questions-answers", name: "Questions & Answers", blurb: "Dada's responses to seekers around the world." },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
