import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { SignupModal } from "./components/SignupModal";
import { ThankYouModal } from "./components/ThankYouModal";

export default function App() {
  const [open, setOpen] = useState(false);
  const [thanks, setThanks] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-rose-50 flex flex-col justify-between">
      <main className="flex-1 mx-auto max-w-5xl px-4 py-20">
        <Hero onStart={() => setOpen(true)} />
      </main>

      <AnimatePresence>
        {open && (
          <SignupModal
            key="signup"
            onClose={() => setOpen(false)}
            onSuccess={() => {
              setOpen(false);
              setThanks(true);
            }}
          />
        )}
        {thanks && <ThankYouModal key="thanks" onClose={() => setThanks(false)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
