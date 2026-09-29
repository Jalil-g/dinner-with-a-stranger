import { useState, type FormEvent } from "react";
import {
  GENDERS,
  GENRES,
  GROUP_SIZES,
  MATCH_PREFERENCE_LABELS,
  MATCH_PREFERENCES,
  type Gender,
  type GroupSize,
  type MatchPreference,
} from "../constants";
import { submitSignup } from "../lib/api";
import { Field } from "./ui/Field";
import { Modal } from "./ui/Modal";
import { ToggleChip } from "./ui/ToggleChip";

export function SignupModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender | "">("");
  const [matchPref, setMatchPref] = useState<MatchPreference[]>(["Anyone"]);
  const [groupSize, setGroupSize] = useState<GroupSize>(2);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
  }

  function toggleMatchPref(value: MatchPreference) {
    setMatchPref((prev) => {
      // "Anyone" is exclusive; picking a specific option replaces it
      if (value === "Anyone") return ["Anyone"];
      const base = prev.filter((v) => v !== "Anyone");
      return base.includes(value) ? base.filter((v) => v !== value) : [...base, value];
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!gender) return setError("Please choose your gender.");
    if (matchPref.length === 0) return setError("Please choose at least one matching preference.");

    const fd = new FormData(e.currentTarget);
    const text = (key: string) => String(fd.get(key) ?? "").trim();

    setSubmitting(true);
    try {
      await submitSignup({
        email: text("email"),
        name: text("name"),
        program: text("program"),
        gradYear: text("gradYear") ? Number(text("gradYear")) : null,
        interests: text("interests")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        diet: text("diet"),
        bio: text("bio"),
        musicGenres: selectedGenres,
        gender,
        matchPreference: matchPref,
        groupSize,
        consent: fd.get("consent") === "on",
        website: text("website"),
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="signup-title" className="max-w-xl max-h-[90vh] overflow-y-auto">
      <div className="mb-4">
        <h3 id="signup-title" className="text-2xl font-bold">Tell us about you</h3>
        <p className="text-sm text-neutral-600">It takes 1–2 minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="School email*" name="email" type="email" autoComplete="email" maxLength={254} required />
        <Field label="Full name*" name="name" autoComplete="name" maxLength={100} required />
        <Field label="Program / Major*" name="program" maxLength={100} required />
        <Field label="Graduation year*" name="gradYear" type="number" min={1900} max={2100} step={1} inputMode="numeric" required />
        <Field
          label="Interests (comma-separated)*"
          name="interests"
          className="md:col-span-2"
          placeholder="pizza, hiking, anime"
          required
        />
        <Field label="Dietary preference" name="diet" placeholder="none / vegetarian / halal / ..." maxLength={100} />

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="gender">Gender*</label>
          <select
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="" disabled>Choose one</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <fieldset className="md:col-span-2 space-y-2">
          <legend className="text-sm font-medium">I’d like to have dinner with (pick all that apply)</legend>
          <div className="flex flex-wrap gap-2">
            {MATCH_PREFERENCES.map((opt) => (
              <ToggleChip key={opt} selected={matchPref.includes(opt)} onClick={() => toggleMatchPref(opt)}>
                {MATCH_PREFERENCE_LABELS[opt]}
              </ToggleChip>
            ))}
          </div>
          <p className="text-xs text-neutral-500">
            {gender === "Prefer not to say"
              ? "Since you’d rather not share your gender, you’ll be matched with people who picked Anyone."
              : "You’ll only be matched with people whose preferences include you too."}
          </p>
        </fieldset>

        <fieldset className="md:col-span-2 space-y-2">
          <legend className="text-sm font-medium">Group size</legend>
          <div className="flex items-center gap-2">
            {GROUP_SIZES.map((size) => (
              <ToggleChip key={size} shape="rounded" selected={groupSize === size} onClick={() => setGroupSize(size)}>
                {size}
              </ToggleChip>
            ))}
          </div>
        </fieldset>

        <fieldset className="md:col-span-2 space-y-2">
          <legend className="text-sm font-medium">Music genres you like (pick a few)</legend>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <ToggleChip key={g} selected={selectedGenres.includes(g)} onClick={() => toggleGenre(g)}>
                {g}
              </ToggleChip>
            ))}
          </div>
          <p className="text-xs text-neutral-500">Tip: pick 2–6 so we can match better.</p>
        </fieldset>

        <div className="md:col-span-2">
          <label className="text-sm font-medium" htmlFor="bio">Short bio*</label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={1000}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
            required
          />
        </div>

        <div className="md:col-span-2 rounded-xl border bg-neutral-50 p-4 text-xs text-neutral-600 space-y-2">
          <p className="text-sm font-medium text-neutral-800">How we use your info</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Your answers are only used to find you a dinner match. Only the organizers can see them.</li>
            <li>Once you’re matched, we share your name and email with your dinner group so you can coordinate.</li>
            <li>Your gender is only used to respect everyone’s matching preferences.</li>
            <li>We never sell your data or share it with anyone else.</li>
          </ul>
        </div>

        <label className="md:col-span-2 flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-rose-500" />
          <span>I agree to my answers being used to match me for dinner, as described above.*</span>
        </label>

        {/* Honeypot: hidden from people, but bots tend to fill in every field */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error && (
          <p role="alert" className="md:col-span-2 rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-rose-500 px-5 py-2.5 text-white font-semibold hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 border font-medium">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
