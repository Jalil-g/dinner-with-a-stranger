import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

/** Centered dialog with backdrop. Closes on Escape and on backdrop click. */
export function Modal({
  onClose,
  labelledBy,
  className = "",
  children,
}: {
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 grid place-items-center p-4"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        className={`relative z-10 w-full rounded-2xl border bg-white p-6 shadow-xl ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
