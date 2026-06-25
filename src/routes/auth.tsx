import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Dada Vaswani's Books" },
      { name: "description", content: "Sign in or create an account with Google or email." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="container-prose py-14 md:py-24 max-w-md">
      <div className="text-center mb-10">
        <div className="eyebrow inline-flex items-center gap-3 mb-3"><span className="rule-gold" /> Welcome</div>
        <h1 className="font-serif text-4xl">Sign in to your account</h1>
        <p className="mt-3 text-muted-foreground text-sm">To keep your orders, wishlist and journal subscription in one quiet place.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
        <button className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full bg-background border border-border hover:bg-cream text-sm font-medium">
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.05 7.05 0 0 1 12 4.7c1.93 0 3.66.69 5.02 1.94l-2.04 2.04A4.16 4.16 0 0 0 12 7.7a4.3 4.3 0 0 0-4.04 2.84z" /><path fill="#34A853" d="M12 19.3a7.05 7.05 0 0 0 6.07-3.42l-2.96-2.25A4.27 4.27 0 0 1 12 14.3a4.3 4.3 0 0 1-4.03-2.81L5 13.76A7 7 0 0 0 12 19.3z" /><path fill="#FBBC05" d="M7.97 14.51a4.21 4.21 0 0 1 0-2.69V9.76L5 11.51a7 7 0 0 0 0 5z" /><path fill="#4285F4" d="M22 12c0-.66-.06-1.3-.18-1.92H12v3.84h5.6c-.24 1.3-.96 2.4-2.04 3.16l2.96 2.25C20.51 17.6 22 15 22 12z" /></svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="flex-1 h-px bg-border" />or<span className="flex-1 h-px bg-border" /></div>
        <form className="space-y-4">
          <label className="block">
            <span className="block text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep mb-2">Email</span>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" required className="w-full rounded-md border border-border bg-background pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-soft" />
            </div>
          </label>
          <label className="block">
            <span className="block text-[0.7rem] tracking-[0.22em] uppercase text-emerald-deep mb-2">Password</span>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" required className="w-full rounded-md border border-border bg-background pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-soft" />
            </div>
          </label>
          <button className="w-full px-5 py-3 rounded-full bg-emerald-deep text-ivory text-sm tracking-[0.18em] uppercase hover:bg-emerald-soft">Sign in</button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/auth" className="text-emerald-deep">Create an account</Link>
      </p>
    </div>
  );
}
