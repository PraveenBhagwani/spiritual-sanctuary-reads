import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRegion } from "@/lib/region";
import { bookBySlug } from "@/data/books";
import { BookCover } from "@/components/site/BookCover";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your Cart — Dada Vaswani's Books" }, { name: "robots", content: "noindex" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart } = useCart();
  const { formatPrice, region } = useRegion();

  const items = cart.map((i) => {
    const b = bookBySlug(i.slug.replace(/^journal-/, ""));
    return { qty: i.qty, slug: i.slug, book: b };
  }).filter((i) => i.book);

  const subtotal = items.reduce((sum, i) => sum + (region === "IN" ? i.book!.price.inr : i.book!.price.usd) * i.qty, 0);

  return (
    <div className="container-prose py-14 md:py-20">
      <div className="mb-12">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Your basket</div>
        <h1 className="font-serif text-4xl md:text-5xl">Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-lg">
          <div className="font-serif text-2xl mb-2">Your cart is quiet.</div>
          <p className="text-muted-foreground text-sm mb-6">Begin a journey with a single book.</p>
          <Link to="/books" className="inline-flex px-6 py-3 rounded-full bg-emerald-deep text-ivory text-xs tracking-[0.18em] uppercase">Browse books</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr,360px] gap-12">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((i) => (
              <li key={i.slug} className="py-6 grid grid-cols-[80px,1fr,auto] gap-5 items-center">
                <div className="w-20"><BookCover book={i.book!} /></div>
                <div>
                  <Link to="/books/$slug" params={{ slug: i.book!.slug }} className="font-serif text-lg hover:text-emerald-deep">{i.book!.title}</Link>
                  <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-1">{formatPrice(i.book!.price)}</div>
                  <div className="mt-3 inline-flex items-center border border-border rounded-full">
                    <button aria-label="Decrease" onClick={() => updateQty(i.slug, i.qty - 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-cream rounded-full"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button aria-label="Increase" onClick={() => updateQty(i.slug, i.qty + 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-cream rounded-full"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-lg">{region === "IN" ? `₹${(i.book!.price.inr * i.qty).toLocaleString("en-IN")}` : `$${i.book!.price.usd * i.qty}`}</div>
                  <button onClick={() => removeFromCart(i.slug)} className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-destructive"><Trash2 className="h-3 w-3" /> Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="border border-border rounded-2xl bg-card p-7 h-fit sticky top-28">
            <h2 className="font-serif text-2xl mb-5">Summary</h2>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={region === "IN" ? `₹${subtotal.toLocaleString("en-IN")}` : `$${subtotal}`} />
              <Row label="Shipping" value="Calculated at checkout" />
            </div>
            <div className="my-5 h-px bg-border" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm">Total</span>
              <span className="font-serif text-2xl text-emerald-deep">{region === "IN" ? `₹${subtotal.toLocaleString("en-IN")}` : `$${subtotal}`}</span>
            </div>
            <Link to="/checkout" className="mt-6 inline-flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Proceed to checkout</Link>
            <Link to="/books" className="mt-3 inline-flex w-full items-center justify-center text-xs tracking-[0.18em] uppercase text-emerald-deep">Continue browsing</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
