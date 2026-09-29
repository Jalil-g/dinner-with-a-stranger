import { useEffect } from "react";
import { motion } from "framer-motion";
import { Modal } from "./ui/Modal";

const EMOJIS = ["🎉", "✨", "🥳", "🍽️", "🍝", "🍷", "💫", "🕯️"];
const FLOAT_MS = 2800;

export function ThankYouModal({ onClose }: { onClose: () => void }) {
  useFloatingEmojis();

  return (
    <Modal onClose={onClose} labelledBy="thanks-title" className="max-w-md text-center overflow-hidden">
      {/* animated glow layer, behind content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 0], scale: [0.9, 1.25, 1] }}
        transition={{ duration: 3.8, ease: "easeOut" }}
        className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-br from-rose-200 via-amber-100 to-transparent"
      />

      <div className="relative z-10">
        <h3 id="thanks-title" className="text-2xl font-bold">Thanks for signing up! 🎉</h3>
        <p className="mt-2 text-sm text-neutral-600">
          We’ll match you soon and send an intro email so you can coordinate dinner.
        </p>
        <button
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-2.5 text-white font-semibold hover:bg-rose-600"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

/** Emojis that float up from the bottom of the screen and fade out. */
function useFloatingEmojis() {
  useEffect(() => {
    const timers: number[] = [];
    const spans = EMOJIS.map((emoji, i) => {
      const span = document.createElement("span");
      span.textContent = emoji;
      Object.assign(span.style, {
        position: "fixed",
        left: `${Math.random() * 100}vw`,
        top: "100vh",
        fontSize: "2rem",
        transition: `all ${FLOAT_MS}ms ease-out`,
        zIndex: "9999",
        pointerEvents: "none",
        opacity: "1",
      });
      document.body.appendChild(span);

      timers.push(
        window.setTimeout(() => {
          span.style.top = `${Math.random() * 60}vh`;
          span.style.opacity = "0";
          span.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 50 + i * 100),
      );
      return span;
    });

    // Clean up after the last animation finishes (or immediately on unmount)
    timers.push(window.setTimeout(() => spans.forEach((s) => s.remove()), FLOAT_MS + EMOJIS.length * 100 + 100));
    return () => {
      timers.forEach(clearTimeout);
      spans.forEach((s) => s.remove());
    };
  }, []);
}
