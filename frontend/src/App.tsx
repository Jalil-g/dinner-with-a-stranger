import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, User } from "lucide-react";


export default function App() {
  const [open, setOpen] = useState(false);
  const [thanks, setThanks] = useState(false);
  

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-rose-50 flex flex-col justify-between">
      <main className="flex-1 mx-auto max-w-5xl px-4 py-20">
        <Hero onStart={() => setOpen(true)}/>
      </main>
      {/* Modal */}
      {open && <SignupModal
    onClose={() => setOpen(false)}
    onSuccess={() => {
      setOpen(false);   // hide form
      setThanks(true);  // show thank-you
    }}
  />}
      {thanks && <ThankYouModal onClose={() => setThanks(false)} />}
      <Footer />
    </div>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="text-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight"
      >
        Meet someone new over <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">dinner</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        A simple way for students to connect. Tell us a bit about yourself, and we’ll match you with a dinner buddy.
      </motion.p>

      {/* Steps BEFORE the table */}
      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10">
        <Step icon={<User className="h-4 w-4" />} title="Fill the form" text="Share interests, preferences, and dietary needs." />
        <Step icon={<Clock className="h-4 w-4" />} title="We match you" text="Smart pairing based on what you share." />
        <Step icon={<Mail className="h-4 w-4" />} title="Say hello" text="You'll both get an intro email to coordinate dinner." />
      </div>

      <TableIllustration onStart={onStart} />
    </section>
  );
}

function Step({ icon, title, text }: any) {
  return (
    <div className="rounded-2xl border bg-white p-4 flex flex-col items-center text-center gap-2">
      <div className="rounded-full p-2 bg-rose-50 border text-rose-600">{icon}</div>
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function TableIllustration({ onStart }: { onStart: () => void }) {
  // Polar placement so chairs are evenly spaced from the table edge
  const CX = 350;      // table center x
  const CY = 250;      // table center y
  const R = 150;       // table radius
  const GAP = 60;      // distance from table edge to chair center (tweak here)
  const D = R + GAP;   // distance from table center to chair center

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="relative w-full max-w-[640px] mx-auto"
    >
      <svg viewBox="0 0 700 520" className="w-full drop-shadow-xl">
        <defs>
          <radialGradient id="g1" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopOpacity="1" stopColor="#ffffff" />
            <stop offset="100%" stopOpacity="1" stopColor="#f9e6d6" />
          </radialGradient>
          <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>

        <g
          onClick={onStart}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
          onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onStart();
            }
          }}  
        >
        {/* invisible hit circle (bigger target for taps) */}
        <circle cx={CX} cy={CY} r={R * 0.85} fill="transparent" />



        {/* table */}
        <circle cx={CX} cy={CY} r={R} fill="url(#g1)" stroke="#e2c2a8" strokeWidth="6" />

        {/* plates */}
        <circle cx={CX} cy={CY - 80} r="30" fill="#fff" stroke="#e5e7eb" />
        <circle cx={CX + 80} cy={CY} r="30" fill="#fff" stroke="#e5e7eb" />
        <circle cx={CX} cy={CY + 80} r="30" fill="#fff" stroke="#e5e7eb" />
        <circle cx={CX - 80} cy={CY} r="30" fill="#fff" stroke="#e5e7eb" />

        {/* chairs at N, E, S, W with equal distance */}
        <Chair x={CX} y={CY - D} angle={0} />
        <Chair x={CX + D} y={CY} angle={90} />
        <Chair x={CX} y={CY + D} angle={180} />
        <Chair x={CX - D} y={CY} angle={270} />

        {/* Tap to start text on table */}
        <text x={CX} y={CY + 5} textAnchor="middle" fontSize="22" fill="#5c4033" fontWeight="600">Tap to start →</text> 
        </g>
      </svg>
    </motion.div>
  );
}

function Chair({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) translate(-50, -35)`}>
      <rect x="10" y="10" width="80" height="50" rx="12" fill="#ffe4d6" stroke="#e2c2a8" />
      <rect x="0" y="0" width="100" height="14" rx="5" fill="#f7caa7" stroke="#e2c2a8" />
    </g>
  );
}



function SignupModal({ onClose, onSuccess, }: { onClose: () => void; onSuccess: () => void; }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [gender, setGender] = useState<string>(""); // required
  const [matchPref, setMatchPref] = useState<string[]>(["Anyone"]); // default
  const [groupSize, setGroupSize] = useState<2 | 4>(2);

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const GENRES = [
    "Pop", "Hip-Hop", "R&B", "Rock", "Indie",
    "Electronic", "House", "Techno",
    "Jazz", "Blues",
    "Classical",
    "K-Pop", "J-Pop",
    "Latin", "Reggaeton", "Afrobeats",
    "Country", "Folk",
    "Metal", "Punk",
    "Lo-fi", "Ambient",
  ];

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  function toggleMatchPref(value: "Same sex" | "Opposite sex" | "Anyone") {
    setMatchPref((prev) => {
      // If choosing "Anyone", make it the only selection
      if (value === "Anyone") return ["Anyone"];
      // If "Anyone" was set, replace it with the chosen specific value
      const base = prev.includes("Anyone") ? [] : prev;
      return base.includes(value)
        ? base.filter((v) => v !== value) || []
        : [...base, value];
    });
  }

  // simple form submit (wire later)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // basic client-side checks (optional)
    if (!gender) {
      alert("Please choose your gender.");
      return;
    }
    if (matchPref.length === 0) {
      alert("Please choose at least one matching preference.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get("email") || "").trim(),
      name: String(fd.get("name") || "").trim(),
      program: String(fd.get("program") || ""),
      gradYear: fd.get("gradYear") ? Number(fd.get("gradYear")) : null,
      interests: String(fd.get("interests") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      diet: String(fd.get("diet") || ""),
      bio: String(fd.get("bio") || ""),
      musicGenres: selectedGenres,
      // NEW fields:
      gender,                    // "Male" | "Female" | "Non-binary" | "Prefer not to say"
      matchPreference: matchPref, // ["Same sex","Opposite sex"] | ["Anyone"] | etc.
      groupSize,                 // 2 | 4
    };

    try {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";
      const res = await fetch(`${base}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to submit form");
    }

    console.log("✅ Submitted successfully");
    onSuccess(); // show thank-you window
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your form. Please try again.");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      {/* panel */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-white p-6 shadow-xl"
      >
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Tell us about you</h3>
          <p className="text-sm text-neutral-600">It takes 1–2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="School email*" name="email" type="email" required />
          <Field label="Full name*" name="name" required />
          <Field label="Program / Major*" name="program" required />
          <Field label="Graduation year*" name="gradYear" type="number" min="1900" max="2100" step="1" inputMode="numeric" pattern="[0-9]*" required />
          <Field
            label="Interests (comma-separated)"
            name="interests"
            className="md:col-span-2"
            placeholder="pizza, hiking, anime"
            required
          />
          <Field label="Dietary preference" name="diet" placeholder="none / vegetarian / halal / ..." />

          {/* NEW: Gender (required) */}
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="gender">Gender*</label>
            <select
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="" disabled>Choose one</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* NEW: Matching With (multi-select) */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Matching with (select one or more)</label>
            <div className="flex flex-wrap gap-2">
              {["Same sex", "Opposite sex", "Anyone"].map((opt) => (
                <GenreChip
                  key={opt}
                  label={opt}
                  selected={matchPref.includes(opt)}
                  onClick={() => toggleMatchPref(opt as "Same sex" | "Opposite sex" | "Anyone")}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              If you pick <b>Anyone</b>, we’ll consider everyone regardless of gender.
            </p>
          </div>

          {/* NEW: Group Size (2 or 4) */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Group size</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGroupSize(2)}
                className={[
                  "rounded-xl px-3 py-1.5 border text-sm",
                  groupSize === 2
                    ? "bg-rose-100 border-rose-300 text-rose-700"
                    : "bg-white hover:bg-rose-50 border-neutral-200 text-neutral-700",
                ].join(" ")}
                aria-pressed={groupSize === 2}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setGroupSize(4)}
                className={[
                  "rounded-xl px-3 py-1.5 border text-sm",
                  groupSize === 4
                    ? "bg-rose-100 border-rose-300 text-rose-700"
                    : "bg-white hover:bg-rose-50 border-neutral-200 text-neutral-700",
                ].join(" ")}
                aria-pressed={groupSize === 4}
              >
                4
              </button>
            </div>
          </div>

          {/* Music Genres */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Music genres you like (pick a few)</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <GenreChip
                  key={g}
                  label={g}
                  selected={selectedGenres.includes(g)}
                  onClick={() => toggleGenre(g)}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">Tip: pick 2–6 so we can match better.</p>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Short bio*</label>
            <textarea
              name="bio"
              rows={3}
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-rose-500 px-5 py-2.5 text-white font-semibold hover:bg-rose-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 border font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


/** pill-style toggle chip */
function GenreChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1.5 text-sm border transition",
        selected
          ? "bg-rose-100 border-rose-300 text-rose-700"
          : "bg-white hover:bg-rose-50 border-neutral-200 text-neutral-700",
      ].join(" ")}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}


function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
      />
    </div>
  );
}

function ThankYouModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
  const emojis = ["🎉", "✨", "🥳", "🍽️", "🍝", "🍷", "💫", "🕯️"];
  emojis.forEach((e, i) => {
    const span = document.createElement("span");
    span.textContent = e;
    span.style.position = "fixed";
    span.style.left = Math.random() * 100 + "vw";
    span.style.top = "100vh";
    span.style.fontSize = "2rem";
    span.style.transition = "all 2.8s ease-out";
    span.style.zIndex = "9999";
    document.body.appendChild(span);
    span.style.pointerEvents = "none";
    span.style.opacity = "1";

    // Animate upward fade
    setTimeout(() => {
      span.style.top = Math.random() * 60 + "vh";
      span.style.opacity = "0";
      span.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 50 + i * 100);

    // Remove after animation
    setTimeout(() => span.remove(), 2000);
  });
}, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl text-center overflow-hidden"
      >
        {/*  single animated glow layer, behind content */}
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: [0, 1, 0], scale: [0.9, 1.25, 1] }}
  transition={{ duration: 3.8, ease: "easeOut" }}
  className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-br from-rose-200 via-amber-100 to-transparent"
/>

        {/* content on top */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold">Thanks for signing up! 🎉</h3>
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
      </motion.div>
    </div>
  );
}



function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-muted-foreground text-center">
        Built by students for students who love good food & good convo. Be kind, be curious. © 2025
      </div>
    </footer>
  );
}
