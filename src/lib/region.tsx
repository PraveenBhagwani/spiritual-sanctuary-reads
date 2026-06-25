import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Region, Language, Price } from "@/data/types";

interface RegionState {
  region: Region;
  language: Language;
  setRegion: (r: Region) => void;
  setLanguage: (l: Language) => void;
  formatPrice: (p: Price) => string;
}

const RegionCtx = createContext<RegionState | null>(null);

const LANG_LABEL: Record<Language, string> = { en: "English", hi: "हिन्दी", sd: "سنڌي" };
export const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: LANG_LABEL.en },
  { code: "hi", label: LANG_LABEL.hi },
  { code: "sd", label: LANG_LABEL.sd },
];

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("IN");
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const r = localStorage.getItem("svm_region") as Region | null;
      const l = localStorage.getItem("svm_lang") as Language | null;
      if (r === "IN" || r === "US") setRegionState(r);
      if (l === "en" || l === "hi" || l === "sd") setLanguageState(l);
    } catch {}
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try { localStorage.setItem("svm_region", r); } catch {}
  };
  const setLanguage = (l: Language) => {
    setLanguageState(l);
    try { localStorage.setItem("svm_lang", l); } catch {}
  };

  const formatPrice = (p: Price) =>
    region === "IN"
      ? `₹${p.inr.toLocaleString("en-IN")}`
      : `$${p.usd.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  return (
    <RegionCtx.Provider value={{ region, language, setRegion, setLanguage, formatPrice }}>
      {children}
    </RegionCtx.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionCtx);
  if (!ctx) throw new Error("useRegion must be used inside RegionProvider");
  return ctx;
}
