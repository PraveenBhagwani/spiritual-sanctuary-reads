export type Region = "IN" | "US";
export type Language = "en" | "hi" | "sd";
export type Format = "physical" | "ebook" | "journal" | "subscription";

export interface Price { inr: number; usd: number }

export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  era?: string;
  accent?: string; // hex for cover treatment
  portrait?: string; // image URL
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  authorSlug: string;
  categorySlugs: string[];
  formats: Format[];
  languages: Language[];
  price: Price;
  pages?: number;
  publishedYear?: number;
  inStock: boolean;
  featured?: boolean;
  description: string;
  forWhom: string;
  excerpt?: string;
  accent?: string; // hex for typographic cover
}

export interface Journal {
  slug: string;
  title: string;
  month: string;
  year: number;
  cover?: string;
  summary: string;
  price: Price;
  pages: number;
}

export interface Thought {
  slug: string;
  title: string;
  body: string;
  date: string; // ISO
  authorSlug?: string;
  tag?: string;
}

export interface FAQ {
  q: string;
  a: string;
  group: string;
}
