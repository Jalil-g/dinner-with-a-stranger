import type { Submission, SubmissionFieldErrors } from "@dws/shared";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5174";

export class ApiError extends Error {
  fieldErrors: SubmissionFieldErrors;

  constructor(message: string, fieldErrors: SubmissionFieldErrors = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

/** Sends an already-validated submission. `honeypot` is the hidden bot-trap field. */
export async function submitSignup(submission: Submission, honeypot: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...submission, website: honeypot }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(
      body?.error ?? "There was an error submitting your form. Please try again.",
      body?.details?.fieldErrors ?? {},
    );
  }
}
