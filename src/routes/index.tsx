import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Headphones, Mail, MapPin, Search } from "lucide-react";
import heroImg from "@/assets/hero-bookstore.jpg";
import thoughtsImg from "@/assets/thoughts-still.jpg";
import storeImg from "@/assets/store-pune.jpg";
import missionImg from "@/assets/mission-portrait.jpg";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { journals } from "@/data/journals";
import { thoughts } from "@/data/thoughts";
import { BookCard } from "@/components/site/BookCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dada Vaswani's Books · A curated spiritual bookstore" },
      { name: "description", content: "Books, eBooks, monthly journals and daily reflections from the Sadhu Vaswani Mission. Shipping across India and the United States." },
      { property: "og:title", content: "Dada Vaswani's Books — A curated spiritual bookstore" },
      { property: "og:description", content: "Books, eBooks, monthly journals and daily reflections from the Sadhu Vaswani Mission." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = books.filter((b) => b.featured).slice(0, 6);
  const latestJournal = journals[0];
  const latestThoughts = thoughts.slice(0, 3);
  const featuredAuthors = authors.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/85 via-emerald-deep/70 to-charcoal/60" />
        <div className="relative container-prose py-28 md:py-40 text-ivory">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 text-ivory/80">
              <span className="inline-block h-px w-10 bg-gold-soft" />
              <span className="text-[0.72rem] tracking-[0.28em] uppercase">Sadhu Vaswani Mission · Since 1929</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-ivory">
              A quiet bookstore<br/>for an unhurried life.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ivory/85 max-w-xl leading-relaxed font-light">
              Books, journals and reflections from Dada J. P. Vaswani and the saints of the Mission — chosen, kept and posted to your door, in India and the United States.
            </p>

            <form action="/search" className="mt-10 relative max-w-xl">
              <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/60" />
              <input
                name="q"
                type="search"
                placeholder="Search a title, author, or theme…"
                className="w-full rounded-full bg-ivory text-charcoal pl-12 pr-32 py-4 text-sm placeholder:text-charcoal/50 shadow-soft focus:outline-none"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-emerald-deep text-ivory text-xs tracking-[0.2em] uppercase">Search</button>
            </form>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/books" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft transition-colors">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/thoughts" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-ivory/40 text-ivory text-sm tracking-[0.18em] uppercase hover:bg-ivory/10">
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by format */}
      <section className="container-prose py-20 md:py-24">
        <SectionHeading eyebrow="Where will you begin" title="Shop by format" align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { to: "/books", label: "Physical Books", note: "Posted from Pune & New Jersey", icon: BookOpen },
            { to: "/ebooks", label: "eBooks", note: "EPUB & PDF, read anywhere", icon: Headphones },
            { to: "/journals", label: "Monthly Journals", note: "A reflection, each month", icon: Mail },
            { to: "/subscriptions", label: "Subscriptions", note: "A year of quiet company", icon: ArrowRight },
          ].map((f) => (
            <Link key={f.to} to={f.to} className="group border border-border rounded-xl bg-card p-7 lift hover:lift-hover hover:border-emerald-soft/40">
              <f.icon className="h-6 w-6 text-emerald-deep" strokeWidth={1.4} />
              <h3 className="font-serif text-xl mt-6">{f.label}</h3>
              <p className="text-xs tracking-wide text-muted-foreground mt-2">{f.note}</p>
              <div className="mt-6 flex items-center gap-2 text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep">
                Browse <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured books */}
      <section className="bg-cream/60 border-y border-border/60">
        <div className="container-prose py-20 md:py-28">
          <SectionHeading
            eyebrow="From the shelf"
            title="Featured this season"
            description="A small selection chosen by our librarians — the books seekers reach for again and again."
            action={<Link to="/books" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep hover:text-charcoal">View all <ArrowRight className="h-4 w-4" /></Link>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
            {featured.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading eyebrow="Find your path" title="Browse by category" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group p-6 border border-border bg-background rounded-lg hover:bg-emerald-deep hover:text-ivory transition-colors">
              <div className="text-[0.65rem] tracking-[0.28em] uppercase text-emerald-soft group-hover:text-gold-soft">Category</div>
              <h3 className="font-serif text-2xl mt-2">{c.name}</h3>
              <p className="text-sm mt-3 text-muted-foreground group-hover:text-ivory/70 leading-relaxed">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Authors */}
      <section className="bg-stone-warm/15 border-y border-border/60">
        <div className="container-prose py-20 md:py-28 grid lg:grid-cols-[1fr,2fr] gap-12">
          <SectionHeading eyebrow="Lives of the saints" title="Browse by author" description="Each writer in our catalog has spent a lifetime in the company of these questions. Begin with the voice that speaks to yours." />
          <div className="space-y-6">
            {featuredAuthors.map((a) => (
              <Link key={a.slug} to="/authors/$slug" params={{ slug: a.slug }} className="block group">
                <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-emerald-deep transition-colors">{a.name}</div>
                    <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2">{a.title}{a.era && ` · ${a.era}`}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-emerald-deep transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
            <Link to="/authors" className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep">All authors <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Journal highlight */}
      <section className="container-prose py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-emerald-deep relative book-shadow">
            <div className="absolute inset-6 border border-ivory/20 rounded-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory p-12 text-center">
              <div className="text-[0.7rem] tracking-[0.3em] uppercase text-gold-soft mb-4">Monthly Journal</div>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">{latestJournal.title}</h3>
              <span className="inline-block w-12 h-px bg-gold my-6" />
              <div className="font-serif italic text-xl">{latestJournal.month} {latestJournal.year}</div>
              <p className="mt-6 text-sm text-ivory/75 max-w-xs">{latestJournal.summary}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-3"><span className="rule-gold mr-3" />East and West Series</div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.05]">A reflection arrives each month, quietly.</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Our monthly journal carries a single, season-appropriate theme — a letter from the Mission, a meditation to practice, and a story to keep. Subscribe in print or read it digitally on your reader.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/journals/$slug" params={{ slug: latestJournal.slug }} className="px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Read this month</Link>
            <Link to="/subscriptions" className="px-6 py-3 rounded-full border border-emerald-deep text-emerald-deep text-sm tracking-[0.18em] uppercase hover:bg-emerald-deep hover:text-ivory transition-colors">Subscribe</Link>
          </div>
        </div>
      </section>

      {/* eBooks band */}
      <section className="bg-emerald-deep text-ivory">
        <div className="container-prose py-20 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 text-ivory/70"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Digital library</span></div>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">Carry the library with you.</h2>
            <p className="mt-5 text-ivory/75 text-lg leading-relaxed max-w-md">
              Over forty titles available as EPUB and PDF — instantly delivered to your account, readable on phone, tablet or e-reader.
            </p>
          </div>
          <div className="flex justify-end">
            <Link to="/ebooks" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase">Browse eBooks <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Thoughts editorial */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading
          eyebrow="Daily wisdom"
          title="Thoughts for the week"
          action={<Link to="/thoughts" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep">All thoughts <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-start">
          <div className="relative rounded-lg overflow-hidden">
            <img src={thoughtsImg} alt="An open book with a single jasmine flower" width={1400} height={1000} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8">
            {latestThoughts.map((t) => (
              <Link key={t.slug} to="/thoughts/$slug" params={{ slug: t.slug }} className="block group border-b border-border pb-7 last:border-0">
                <div className="text-[0.7rem] tracking-[0.22em] uppercase text-emerald-soft">{t.tag}</div>
                <h3 className="font-serif text-2xl md:text-3xl mt-2 group-hover:text-emerald-deep transition-colors">{t.title}</h3>
                <p className="mt-3 font-serif italic text-base text-muted-foreground leading-relaxed line-clamp-2">"{t.body}"</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Physical store */}
      <section className="bg-cream/50">
        <div className="container-prose py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden book-shadow">
            <img src={storeImg} alt="Sadhu Vaswani Mission bookstore in Pune" width={1600} height={1100} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="eyebrow mb-3 flex items-center gap-3"><span className="rule-gold" /> Pune · Near Railway Station</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">Visit our physical bookstore.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              A few minutes from Pune Railway Station, our store has welcomed seekers for decades. Browse the full catalog, ask for a recommendation, and leave with a book that found you.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="border border-border rounded-lg p-5 bg-background">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-emerald-soft mb-2">Address</div>
                <div className="font-serif text-base leading-snug">Sadhu Vaswani Mission, 10 Sadhu Vaswani Path, Pune 411001</div>
              </div>
              <div className="border border-border rounded-lg p-5 bg-background">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-emerald-soft mb-2">Hours</div>
                <div className="font-serif text-base leading-snug">Mon — Sat · 10:00 to 19:30<br/>Sunday · 11:00 to 18:00</div>
              </div>
            </div>
            <Link to="/store-locator" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">
              <MapPin className="h-4 w-4" /> Plan a visit
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading eyebrow="Readers' notes" title="From those who have read with us" align="center" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "I keep Begin The Day With God on my desk. It quietly rearranges my mornings.", n: "Anjali R., Mumbai" },
            { q: "Their packaging is careful, their notes are warm, and the books arrive like guests.", n: "David M., New Jersey" },
            { q: "A small bookstore that feels, somehow, very large on the inside.", n: "Meera S., Pune" },
          ].map((t) => (
            <figure key={t.n} className="border border-border rounded-lg p-7 bg-card">
              <blockquote className="font-serif italic text-lg leading-relaxed text-charcoal">"{t.q}"</blockquote>
              <figcaption className="mt-5 text-[0.72rem] tracking-[0.22em] uppercase text-muted-foreground">{t.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Mission story */}
      <section className="bg-emerald-deep text-ivory">
        <div className="container-prose py-20 md:py-28 grid lg:grid-cols-[1fr,1.2fr] gap-14 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img src={missionImg} alt="Reverent portrait" width={1200} height={1500} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4 text-ivory/70"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Our story</span></div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">A Mission of love, in print.</h2>
            <p className="mt-5 text-lg text-ivory/80 leading-relaxed max-w-xl">
              Since 1929, the Sadhu Vaswani Mission has carried the message of unity, compassion and reverence for all life into homes around the world. Every order from this bookstore quietly funds that work — schools, hospitals, kitchens, and the slow craft of publishing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/mission" className="px-6 py-3 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase">Read our story</Link>
              <Link to="/about" className="px-6 py-3 rounded-full border border-ivory/40 text-ivory text-sm tracking-[0.18em] uppercase hover:bg-ivory/10">About the Mission</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-prose py-20 md:py-24">
        <div className="border border-border rounded-2xl bg-card p-10 md:p-14 text-center">
          <div className="eyebrow mb-3 inline-flex items-center gap-3"><span className="rule-gold" /> A letter, occasionally</div>
          <h2 className="font-serif text-3xl md:text-4xl">New books, new thoughts, in your inbox.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">No promotions — only news of a new title, a new reflection, or an open day at the Pune store. Unsubscribe whenever you like.</p>
          <form className="mt-8 max-w-md mx-auto flex gap-3">
            <input type="email" required placeholder="you@quiet.morning" className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:border-emerald-soft" />
            <button className="px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
