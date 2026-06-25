import { createFileRoute, Link } from "@tanstack/react-router";

const ORDERS = [
  { id: "SVM-24108", date: "11 June 2026", items: 2, total: "₹445", status: "Delivered" },
  { id: "SVM-24102", date: "29 May 2026", items: 1, total: "₹250", status: "Shipped" },
];

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "Orders — My Account" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <div className="container-prose py-14 md:py-20 max-w-3xl">
      <div className="mb-10"><Link to="/account" className="text-xs tracking-[0.18em] uppercase text-emerald-deep">← Account</Link>
        <h1 className="font-serif text-4xl mt-3">Your orders</h1>
      </div>
      <ul className="border-y border-border divide-y divide-border">
        {ORDERS.map((o) => (
          <li key={o.id} className="py-5 flex flex-wrap items-center gap-4">
            <div className="font-serif text-lg">{o.id}</div>
            <div className="text-sm text-muted-foreground">{o.date} · {o.items} item{o.items > 1 ? "s" : ""}</div>
            <div className="ml-auto flex items-center gap-5">
              <span className="text-xs tracking-[0.18em] uppercase text-emerald-soft">{o.status}</span>
              <span className="font-serif text-lg">{o.total}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ),
});
