import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, User } from "lucide-react";
import { TableIllustration } from "./TableIllustration";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="text-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight"
      >
        Meet someone new over{" "}
        <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">dinner</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-neutral-600 max-w-2xl mx-auto"
      >
        A simple way for students to connect. Tell us a bit about yourself, and we’ll match you with a dinner buddy.
      </motion.p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10">
        <Step icon={<User className="h-4 w-4" />} title="Fill the form" text="Share interests, preferences, and dietary needs." />
        <Step icon={<Clock className="h-4 w-4" />} title="We match you" text="Smart pairing based on what you share." />
        <Step icon={<Mail className="h-4 w-4" />} title="Say hello" text="You'll both get an intro email to coordinate dinner." />
      </div>

      <TableIllustration onStart={onStart} />
    </section>
  );
}

function Step({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 flex flex-col items-center text-center gap-2">
      <div className="rounded-full p-2 bg-rose-50 border text-rose-600">{icon}</div>
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-neutral-600">{text}</p>
    </div>
  );
}
