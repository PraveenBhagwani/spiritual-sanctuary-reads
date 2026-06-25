import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useRegion } from "@/lib/region";
import { bookBySlug } from "@/data/books";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Dada Vaswani's Books" }, { name: "robots", content: "noindex" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart } = useCart();
  const { region, formatPrice } = useRegion();
  const items = cart.map((i) => ({ qty: i.qty, book: bookBySlug(i.slug.replace(/^journal-/, "")) })).filter((i) => i.book);
  const subtotal = items.reduce((s, i) => s + (region === "IN" ? i.book!.price.inr : i.book!.price.usd) * i.qty, 0);
  const shipping = region === "IN" ? 60 : 8;
  const total = subtotal + (items.length ? shipping : 0);

  return (
    <div className="container-prose py-14 md:py-20 grid lg:grid-cols-[1.4fr,1fr] gap-12">
      <div>
        <div className="mb-10">
          <Link to="/cart" className="text-xs tracking-[0.18em] uppercase text-emerald-deep">← Cart</Link>
          <h1 className="font-serif text-4xl md:text-5xl mt-3">Checkout</h1>
        </div>

        <form className="space-y-10">
          <Section title="Contact">
            <Field label="Email"><input type="email" required className="form-input" /></Field>
          </Section>
          <Section title="Shipping to · {region}">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name"><input type="text" className="form-input" /></Field>
              <Field label="Last name"><input type="text" className="form-input" /></Field>
            </div>
            <Field label="Address"><input type="text" className="form-input" /></Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="City"><input type="text" className="form-input" /></Field>
              <Field label="State"><input type="text" className="form-input" /></Field>
              <Field label={region === "IN" ? "PIN" : "ZIP"}><input type="text" className="form-input" /></Field>
            </div>
          </Section>
          <Section title="Delivery">
            <div className="space-y-3">
              {(region === "IN"
                ? [{ id: "std", n: "Standard · 3–7 days", p: "₹60" }, { id: "exp", n: "Express · 2–3 days", p: "₹150" }]
                : [{ id: "std", n: "Standard USPS · 5–10 days", p: "$8" }, { id: "exp", n: "Priority · 2–4 days", p: "$18" }]
              ).map((s) => (
                <label key={s.id} className="flex items-center gap-3 border border-border rounded-md p-4 cursor-pointer hover:border-emerald-soft">
                  <input type="radio" name="ship" defaultChecked={s.id === "std"} className="accent-emerald-deep" />
                  <span className="flex-1 text-sm">{s.n}</span>
                  <span className="font-serif">{s.p}</span>
                </label>
              ))}
            </div>
          </Section>
          <Section title="Payment">
            <p className="text-sm text-muted-foreground">Payment is handled securely by our payment partners. (Connect your live processor in the next step.)</p>
            <button type="button" className="mt-3 w-full px-7 py-4 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Place order</button>
          </Section>
        </form>
        <style>{`.form-input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:.5rem;padding:.7rem 1rem;font-size:.95rem;outline:none;}.form-input:focus{border-color:var(--emerald-soft)}`}</style>
      </div>

      <aside className="border border-border rounded-2xl bg-card p-7 h-fit sticky top-28">
        <h2 className="font-serif text-2xl mb-5">Order summary</h2>
        <ul className="divide-y divide-border max-h-64 overflow-y-auto">
          {items.map((i) => (
            <li key={i.book!.slug} className="py-3 flex justify-between gap-3 text-sm">
              <span className="font-serif">{i.book!.title} <span className="text-muted-foreground">× {i.qty}</span></span>
              <span>{formatPrice(i.book!.price)}</span>
            </li>
          ))}
          {items.length === 0 && <li className="text-sm text-muted-foreground py-3">Your cart is empty.</li>}
        </ul>
        <div className="mt-5 space-y-2 text-sm">
          <Row label="Subtotal" value={region === "IN" ? `₹${subtotal.toLocaleString("en-IN")}` : `$${subtotal}`} />
          <Row label="Shipping" value={items.length ? (region === "IN" ? `₹${shipping}` : `$${shipping}`) : "—"} />
        </div>
        <div className="my-5 h-px bg-border" />
        <div className="flex justify-between items-baseline">
          <span className="text-sm">Total</span>
          <span className="font-serif text-2xl text-emerald-deep">{region === "IN" ? `₹${total.toLocaleString("en-IN")}` : `$${total}`}</span>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl text-emerald-deep">{title}</h2>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep mb-2">{label}</span>{children}</label>;
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
