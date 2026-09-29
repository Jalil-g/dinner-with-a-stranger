import type { ReactNode } from "react";

/** Pill-style toggle button. */
export function ToggleChip({
  selected,
  onClick,
  shape = "pill",
  children,
}: {
  selected: boolean;
  onClick: () => void;
  shape?: "pill" | "rounded";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "px-3 py-1.5 text-sm border transition",
        shape === "pill" ? "rounded-full" : "rounded-xl",
        selected
          ? "bg-rose-100 border-rose-300 text-rose-700"
          : "bg-white hover:bg-rose-50 border-neutral-200 text-neutral-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
