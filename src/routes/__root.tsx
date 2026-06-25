import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { RegionProvider } from "@/lib/region";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-prose flex items-center justify-center py-32 text-center">
        <div className="max-w-md">
          <div className="eyebrow mb-3"><span className="rule-gold" /> Page not found</div>
          <h1 className="font-serif text-6xl text-emerald-deep mb-3">404</h1>
          <p className="text-muted-foreground mb-8">The page you are looking for has moved, or never quite existed.</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-emerald-deep text-ivory rounded-full text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft transition-colors">
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-emerald-deep">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something went wrong on our end. You can try again or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-5 py-2.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase">Try again</button>
          <a href="/" className="px-5 py-2.5 rounded-full border border-border text-sm tracking-[0.18em] uppercase">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dada Vaswani's Books · Sadhu Vaswani Mission" },
      { name: "description", content: "A curated online bookstore of spiritual books, eBooks, monthly journals and reflections from the Sadhu Vaswani Mission. Shipping across India and the United States." },
      { name: "theme-color", content: "#0F3D2E" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Dada Vaswani's Books" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Sadhu Vaswani Mission — Dada Vaswani's Books",
          url: "/",
          description: "Spiritual bookstore of the Sadhu Vaswani Mission.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </RegionProvider>
    </QueryClientProvider>
  );
}
