import { createContext, useContext, type ReactNode } from "react";
import type { Region, Language, Price } from "@/data/types";

interface RegionState {
  region: Region;
  language: Language;
  setRegion: (r: Region) => void;
  setLanguage: (l: Language) => void;
  formatPrice: (p: Price) => string;
}

const RegionCtx = createContext<RegionState | null>(null);

// India-only, English-only. Selectors removed per brand brief.
export const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
];

export function RegionProvider({ children }: { children: ReactNode }) {
  const region: Region = "IN";
  const language: Language = "en";

  const formatPrice = (p: Price) => `₹${p.inr.toLocaleString("en-IN")}`;

  return (
    <RegionCtx.Provider
      value={{
        region,
        language,
        setRegion: () => {},
        setLanguage: () => {},
        formatPrice,
      }}
    >
      {children}
    </RegionCtx.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionCtx);
  if (!ctx) throw new Error("useRegion must be used inside RegionProvider");
  return ctx;
}
