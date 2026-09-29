import type { Gender, GroupSize, MatchPreference } from "../constants";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5174";

export type SignupPayload = {
  email: string;
  name: string;
  program: string;
  gradYear: number | null;
  interests: string[];
  diet: string;
  bio: string;
  musicGenres: string[];
  gender: Gender;
  matchPreference: MatchPreference[];
  groupSize: GroupSize;
};

export async function submitSignup(payload: SignupPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "There was an error submitting your form. Please try again.");
  }
}
