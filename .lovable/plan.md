# Premium Spiritual Bookstore Redesign

This is a large redesign. To ship something polished and not half-built, I'll do it in clear phases, each visible in the preview as it lands. Phase 1 gets your full visual identity and the most important pages live; subsequent phases layer on account/checkout/admin polish.

## Approach

- Frontend-only redesign on the existing TanStack Start stack.
- All content (books, authors, journals, thoughts, mission, FAQ, store info) modeled as typed mock data in `src/data/` using adapter-shaped interfaces, so swapping to your real backend later is a single file change per resource.
- No backend changes. Google Login + AI chatbot deferred to Phase 3 (require Lovable Cloud + AI Gateway — I'll enable when we reach them).

## Visual System (Phase 1)

- **Palette**: ivory `#FAF6EE` bg, deep emerald `#0F3D2E` primary, muted gold `#B8893A` accent, charcoal `#1F1B16` text, sand/stone neutrals.
- **Typography**: Cormorant Garamond (display serif) + Inter (body), italic serif for reflections. Loaded via `<link>` in `__root.tsx`.
- **Tokens** in `src/styles.css` via `@theme` + shadcn variable mapping. Custom button variants (`hero`, `gold`, `ghostSerif`), card variants for books.
- Soft shadows, generous whitespace, large editorial imagery, subtle hover lift, fade-in on scroll.

## Information Architecture (routes)

```
/                           Home
/books                      Physical books listing (filters: category, author, language, price)
/books/$slug                Book detail
/ebooks                     eBooks listing
/ebooks/$slug               eBook detail
/journals                   Monthly journals
/journals/$slug             Journal detail
/subscriptions              Subscription plans
/authors                    Author index
/authors/$slug              Author profile + works
/categories                 Category index
/categories/$slug           Category listing
/thoughts                   Daily wisdom / reflections feed
/thoughts/$slug             Single reflection
/about                      About Sadhu Vaswani Mission
/mission                    Mission & story
/gallery                    Photo gallery
/faq                        FAQ
/contact                    Contact
/store-locator              Pune bookstore
/search                     Search results
/wishlist                   Wishlist
/cart                       Cart
/checkout                   Checkout flow
/account                    Account overview
/account/orders             Order history
/auth                       Login / Register (Google)
/sitemap.xml, robots.txt    SEO
```

Region (India/USA) + language switch live in the header, persisted in `localStorage` via a small context. Region affects currency display and shipping copy.

## Phased Build

**Phase 1 — Identity + Home + Browsing (this turn)**
- Design system, fonts, tokens, shadcn variants
- Header (logo, nav, region/language switch, search, cart, wishlist, account)
- Footer (mission, regions, languages, social, useful pages)
- Home with all 13 sections you listed
- Books / eBooks / Journals listing pages with full filter sidebar
- Book/eBook/Journal detail pages (shared `ProductDetail` with format-specific blocks)
- Authors index + author profile
- Categories index + category listing
- Thoughts feed + single reflection
- About, Mission, FAQ, Contact, Store Locator, Gallery
- Cart, Wishlist (local state, ready to wire to backend)
- 404, sitemap.xml, robots.txt, per-route SEO meta + JSON-LD for Book/Organization

**Phase 2 — Commerce flow**
- Checkout (address, shipping per region, payment placeholder)
- Account + orders pages with mock data
- Search results page with combined book/author/thought results
- Subscriptions detail + plan picker

**Phase 3 — Auth + AI (requires Lovable Cloud)**
- Google login via Lovable Cloud
- Small floating AI assistant (Lovable AI Gateway, `google/gemini-2.5-flash`) — book recommendations, FAQ, format guidance. Collapsed pill bottom-right, expands to a calm panel, no auto-popups.

## Technical notes

- All product/author/thought data in `src/data/*.ts` with `Book`, `Author`, `Thought`, `Journal`, `Category` interfaces matching plausible API shapes.
- Region context: `{ region: 'IN' | 'US', currency: 'INR' | 'USD', setRegion }`. Prices stored as `{ inr, usd }` on each product.
- Language context: stub with `en | hi | sd` (English/Hindi/Sindhi — common for this mission); content stays English for now with switch UI ready.
- Images: a few hero/atmosphere images generated with imagegen; book covers use elegant typographic placeholders (serif title on emerald/sand) so we don't fabricate covers for real titles.
- Motion: Tailwind transitions + `tw-animate-css` already installed; no heavy libs in Phase 1.

## What I need from you before Phase 3
- Confirm enabling **Lovable Cloud** when we reach auth + chatbot (free tier is fine for now).
- Any real book titles/authors/cover images you want seeded — otherwise I'll use representative Dada Vaswani titles from the reference site.

Ready to start Phase 1 on approval.
