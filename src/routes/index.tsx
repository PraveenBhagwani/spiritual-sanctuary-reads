import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Clock, Train } from "lucide-react";
import heroImg from "@/assets/hero-bookstore.jpg";
import thoughtsImg from "@/assets/thoughts-still.jpg";
import missionImg from "@/assets/mission-portrait.jpg";
import bookStall from "@/assets/book-stall.png.asset.json";
import gphLogo from "@/assets/gph-logo.png.asset.json";
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
      { title: "Dada Vaswani's Books · Official Bookstore of the Sadhu Vaswani Mission" },
      { name: "description", content: "Books, journals and reflections from Sadhu Vaswani and Dada J. P. Vaswani — officially published by Gita Publishing House and delivered across India." },
      { property: "og:title", content: "Dada Vaswani's Books — Official Bookstore of the Sadhu Vaswani Mission" },
      { property: "og:description", content: "Books, journals and reflections from Sadhu Vaswani and Dada J. P. Vaswani — published by Gita Publishing House." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const bestSellers = books.filter((b) => b.featured).slice(0, 6);
  const newArrivals = [...books]
    .sort((a, b) => (b.publishedYear ?? 0) - (a.publishedYear ?? 0))
    .slice(0, 6);
  const latestJournal = journals[0];
  const latestThoughts = thoughts.slice(0, 3);
  const eBookSamples = books.filter((b) => b.formats.includes("ebook")).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden animate-in fade-in duration-1000">
        <img src={heroImg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/85 via-emerald-deep/70 to-charcoal/60" />
        <div className="relative container-prose py-28 md:py-40 text-ivory">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3 text-ivory/85">
              <span className="inline-block h-px w-10 bg-gold-soft" />
              <span className="text-[0.72rem] tracking-[0.28em] uppercase">The Official Bookstore of the Sadhu Vaswani Mission</span>
            </div>
            <div className="text-[0.72rem] tracking-[0.28em] uppercase text-gold-soft mb-6 pl-[3.25rem]">
              Published by Gita Publishing House
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-ivory">
              A quiet bookstore<br/>for an unhurried life.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ivory/85 max-w-xl leading-relaxed font-light">
              Books, journals and reflections from Sadhu Vaswani and Dada J. P. Vaswani, officially published by Gita Publishing House and delivered across India.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/books" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft transition-all hover:-translate-y-0.5">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/thoughts" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-ivory/40 text-ivory text-sm tracking-[0.18em] uppercase hover:bg-ivory/10 transition-all">
                Today's Thought
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="container-prose py-20 md:py-24">
        <SectionHeading eyebrow="Find your path" title="Browse categories" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group p-6 border border-border bg-background rounded-lg lift hover:lift-hover hover:bg-emerald-deep hover:text-ivory transition-colors">
              <div className="text-[0.65rem] tracking-[0.28em] uppercase text-emerald-soft group-hover:text-gold-soft">Category</div>
              <h3 className="font-serif text-2xl mt-2">{c.name}</h3>
              <p className="text-sm mt-3 text-muted-foreground group-hover:text-ivory/70 leading-relaxed">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-cream/60 border-y border-border/60">
        <div className="container-prose py-20 md:py-28">
          <SectionHeading
            eyebrow="From the shelf"
            title="Best sellers"
            description="The books seekers return to, again and again."
            action={<Link to="/books" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep hover:text-charcoal">View all <ArrowRight className="h-4 w-4" /></Link>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
            {bestSellers.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading
          eyebrow="Newly on the shelf"
          title="New arrivals"
          action={<Link to="/books" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep">View all <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {newArrivals.map((b) => <BookCard key={b.slug} book={b} />)}
        </div>
      </section>

      {/* Monthly Journal */}
      <section className="bg-cream/50 border-y border-border/60">
        <div className="container-prose py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
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
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.05]">A reflection arrives each month.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Our monthly journal carries a single, season-appropriate theme — a letter from the Mission, a meditation to practice, and a story to keep. Read this month's issue or subscribe for the year.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/journals/$slug" params={{ slug: latestJournal.slug }} className="px-6 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft transition-all hover:-translate-y-0.5">Read this month</Link>
              <Link to="/journals" className="px-6 py-3 rounded-full border border-emerald-deep text-emerald-deep text-sm tracking-[0.18em] uppercase hover:bg-emerald-deep hover:text-ivory transition-colors">Subscribe</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading eyebrow="Lives of the saints" title="Featured authors" align="center" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mt-4">
          {authors.map((a) => (
            <div key={a.slug} className="border border-border rounded-2xl bg-card overflow-hidden lift hover:lift-hover">
              <div className="grid grid-cols-[auto,1fr] gap-6 p-6 md:p-8 items-start">
                {a.portrait && (
                  <img
                    src={a.portrait}
                    alt={a.name}
                    width={160}
                    height={200}
                    loading="lazy"
                    className="h-32 w-24 md:h-40 md:w-32 object-cover object-top rounded-md shadow-soft"
                  />
                )}
                <div>
                  <div className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">{a.title}</div>
                  <h3 className="font-serif text-2xl md:text-3xl mt-2 text-emerald-deep">{a.name}</h3>
                  {a.era && <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-1">{a.era}</div>}
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">{a.bio}</p>
                  <Link to="/authors/$slug" params={{ slug: a.slug }} className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-emerald-deep hover:text-charcoal transition-colors">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* eBooks band */}
      <section className="bg-emerald-deep text-ivory">
        <div className="container-prose py-20 md:py-24 grid lg:grid-cols-[1fr,1fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 text-ivory/70"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Digital library</span></div>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">Carry the library with you.</h2>
            <p className="mt-5 text-ivory/75 text-lg leading-relaxed max-w-md">
              Over forty titles available as EPUB — instantly delivered to your account, readable on phone, tablet or e-reader.
            </p>
            <Link to="/ebooks" className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft transition-all hover:-translate-y-0.5">Browse eBooks <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {eBookSamples.map((b) => (
              <Link key={b.slug} to="/ebooks/$slug" params={{ slug: b.slug }} className="block rounded-lg border border-ivory/15 bg-ivory/5 p-4 hover:bg-ivory/10 transition-colors">
                <div className="text-[0.62rem] tracking-[0.22em] uppercase text-gold-soft">EPUB</div>
                <div className="font-serif text-lg mt-2 leading-snug">{b.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Thought */}
      <section className="container-prose py-20 md:py-28">
        <SectionHeading
          eyebrow="Daily wisdom"
          title="Today's thought"
          action={<Link to="/thoughts" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-emerald-deep">All thoughts <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-start">
          <div className="relative rounded-lg overflow-hidden">
            <img src={thoughtsImg} alt="An open book with a single jasmine flower" width={1400} height={1000} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
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

      {/* Visit Our Bookstores */}
      <section className="bg-cream/60 border-y border-border/60">
        <div className="container-prose py-20 md:py-28">
          <SectionHeading eyebrow="Pune · India" title="Visit our bookstores" align="center" />
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 items-start">
            <div className="relative rounded-lg overflow-hidden book-shadow">
              <img src={bookStall.url} alt="Sadhu Vaswani Mission's Book Stall at Pune Railway Station" width={1400} height={1400} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
            </div>
            <div className="space-y-6">
              <div className="border border-border rounded-xl bg-background p-6 lift hover:lift-hover">
                <div className="eyebrow mb-2"><span className="rule-gold mr-3" />Main Bookstore</div>
                <h3 className="font-serif text-2xl">Mission Book Store</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-deep mt-0.5 shrink-0" />
                  10, Sadhu Vaswani Road, Agarkar Nagar, Camp, Pune — 411001
                </p>
                <a href="https://www.google.com/maps/search/?api=1&query=Sadhu+Vaswani+Mission+10+Sadhu+Vaswani+Road+Pune+411001" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-emerald-deep hover:text-charcoal">
                  Get directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="border border-border rounded-xl bg-background p-6 lift hover:lift-hover">
                <div className="eyebrow mb-2"><span className="rule-gold mr-3" />At the Station</div>
                <h3 className="font-serif text-2xl">Railway Book Stall</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                  <Train className="h-4 w-4 text-emerald-deep mt-0.5 shrink-0" />
                  Platform 1, Pune Railway Station, Agarkar Nagar, Pune — 411001
                </p>
                <a href="https://www.google.com/maps/search/?api=1&query=Pune+Railway+Station+Platform+1" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-emerald-deep hover:text-charcoal">
                  Get directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="border border-border rounded-xl bg-background p-6 text-sm text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-deep" /><a href="tel:+912026111118" className="font-serif text-base text-charcoal">020-26111118</a></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-emerald-deep" /><span>Mon — Sat · 9:30 AM to 6 PM</span></div>
                <div className="pl-6 text-xs">Sunday & Public Holidays · Closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Gita Publishing House */}
      <section className="container-prose py-20 md:py-28">
        <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img src={gphLogo.url} alt="Gita Publishing House" width={180} height={180} className="h-36 w-36 md:h-44 md:w-44 object-contain" />
          </div>
          <div>
            <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Our publisher</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">About Gita Publishing House</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Gita Publishing House is the official publishing house of the Sadhu Vaswani Mission. It publishes books, journals and spiritual literature, preserving and sharing the teachings of Sadhu Vaswani and Dada J. P. Vaswani.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Dada Vaswani's Books is the official online bookstore of the Mission, bringing together every title published by Gita Publishing House — offering readers direct access to authentic publications inspired by their teachings.
            </p>
          </div>
        </div>
      </section>

      {/* About Sadhu Vaswani Mission */}
      <section className="bg-emerald-deep text-ivory">
        <div className="container-prose py-20 md:py-28 grid lg:grid-cols-[1fr,1.2fr] gap-14 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img src={missionImg} alt="Reverent portrait" width={1200} height={1500} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4 text-ivory/70"><span className="inline-block h-px w-10 bg-gold-soft" /><span className="text-[0.72rem] tracking-[0.28em] uppercase">Our Mission</span></div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">About the Sadhu Vaswani Mission</h2>
            <p className="mt-5 text-lg text-ivory/80 leading-relaxed max-w-xl">
              The Sadhu Vaswani Mission is a spiritual and humanitarian organisation headquartered in Pune, dedicated to compassion, service, education and reverence for all life.
            </p>
            <p className="mt-4 text-base text-ivory/75 leading-relaxed max-w-xl">
              Every order from this bookstore quietly supports that work — schools, hospitals, kitchens, and the slow craft of publishing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/mission" className="px-6 py-3 rounded-full bg-gold text-charcoal text-sm tracking-[0.18em] uppercase hover:bg-gold-soft transition-all hover:-translate-y-0.5">Read our story</Link>
              <Link to="/about" className="px-6 py-3 rounded-full border border-ivory/40 text-ivory text-sm tracking-[0.18em] uppercase hover:bg-ivory/10 transition-colors">About the Mission</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
