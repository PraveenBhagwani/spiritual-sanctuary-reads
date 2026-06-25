import type { Thought } from "./types";

export const thoughts: Thought[] = [
  { slug: "the-language-of-silence", title: "The Language of Silence", date: "2025-06-22", authorSlug: "dada-j-p-vaswani", tag: "On prayer",
    body: "Silence is the first language of prayer. Before words come, before requests come, sit quietly. The Divine listens most attentively to the heart that has stopped speaking." },
  { slug: "to-serve-is-to-be-free", title: "To Serve is to be Free", date: "2025-06-19", authorSlug: "sadhu-vaswani", tag: "On service",
    body: "The one who serves another in love is the freest of all. For service unties the small knots of self." },
  { slug: "begin-where-you-are", title: "Begin Where You Are", date: "2025-06-15", authorSlug: "dada-j-p-vaswani", tag: "On practice",
    body: "Do not wait for the right hour, the right place, the right people. Begin where you are, with what you have, with whom you love." },
  { slug: "a-vegetarian-table", title: "A Vegetarian Table", date: "2025-06-11", authorSlug: "dada-j-p-vaswani", tag: "On reverence",
    body: "A vegetarian table is more than a diet. It is a quiet, daily acknowledgment that every creature has a right to its one short life." },
  { slug: "the-discipline-of-joy", title: "The Discipline of Joy", date: "2025-06-08", authorSlug: "dada-j-p-vaswani", tag: "On joy",
    body: "Joy is not the absence of difficulty. It is the discipline of choosing wonder again and again, even on tired afternoons." },
  { slug: "letters-from-pune", title: "Letters from Pune", date: "2025-06-04", authorSlug: "dada-j-p-vaswani", tag: "On home",
    body: "A small bookstore near a railway station has watched, for many decades, the quiet faces of seekers who come for a single book and leave with a lifetime's company." },
];

export const thoughtBySlug = (s: string) => thoughts.find((t) => t.slug === s);
