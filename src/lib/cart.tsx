import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface CartItem { slug: string; qty: number }
interface CartState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;
  cartCount: number;
  wishlistCount: number;
}

const Ctx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("svm_cart");
      const w = localStorage.getItem("svm_wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("svm_cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("svm_wishlist", JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const addToCart = (slug: string) =>
    setCart((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug, qty: 1 }];
    });
  const removeFromCart = (slug: string) => setCart((p) => p.filter((i) => i.slug !== slug));
  const updateQty = (slug: string, qty: number) =>
    setCart((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  const toggleWishlist = (slug: string) =>
    setWishlist((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const inWishlist = (slug: string) => wishlist.includes(slug);

  return (
    <Ctx.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, inWishlist,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      wishlistCount: wishlist.length,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
