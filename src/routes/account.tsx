import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Dada Vaswani's Books" }, { name: "robots", content: "noindex" }] }),
  component: Account,
});

function Account() {
  return (
    <div className="container-prose py-14 md:py-20 max-w-3xl">
      <div className="mb-12">
        <div className="eyebrow mb-3"><span className="rule-gold mr-3" />Your account</div>
        <h1 className="font-serif text-4xl md:text-5xl">Welcome back</h1>
        <p className="mt-3 text-muted-foreground">A quiet space for your orders, your wishlist and your monthly journal.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { to: "/account/orders", title: "Orders", body: "View and track your recent orders." },
          { to: "/wishlist", title: "Wishlist", body: "Books you've saved for later." },
          { to: "/subscriptions", title: "Subscriptions", body: "Manage your journal subscription." },
          { to: "/auth", title: "Sign out", body: "End your session." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="block p-7 border border-border rounded-lg bg-card hover:bg-cream lift hover:lift-hover">
            <div className="font-serif text-xl">{c.title}</div>
            <p className="text-sm text-muted-foreground mt-2">{c.body}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12 p-7 border border-border rounded-lg bg-cream/40">
        <div className="eyebrow mb-2">Not signed in?</div>
        <Link to="/auth" className="font-serif text-xl text-emerald-deep underline-offset-4 hover:underline">Sign in with Google or email</Link>
      </div>
    </div>
  );
}
