import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", action }: Props) {
  const ta = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-10 sm:mb-14 max-w-3xl ${ta} ${align === "center" ? "" : "flex flex-wrap items-end justify-between gap-6"}`}>
      <div className={align === "center" ? "" : "max-w-2xl"}>
        {eyebrow && <div className="eyebrow mb-3 flex items-center gap-3 justify-start">
          <span className="rule-gold" />{eyebrow}
        </div>}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-foreground">{title}</h2>
        {description && <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
