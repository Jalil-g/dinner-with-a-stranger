import { z } from "zod";

// Single source of truth for the signup form, shared by frontend and backend.

export const GENDERS = ["Woman", "Man", "Non-binary", "Prefer not to say"] as const;
// Genders someone wants to be matched with, or "Anyone"
export const MATCH_PREFERENCES = ["Woman", "Man", "Non-binary", "Anyone"] as const;
export const GROUP_SIZES = [2, 4] as const;

export const LIMITS = {
  email: 254,
  name: 100,
  program: 100,
  diet: 100,
  bio: 1000,
  tag: 50, // length of one interest or music genre
  interests: 20,
  musicGenres: 30,
  gradYearMin: 1900,
  gradYearMax: 2100,
} as const;

export type Gender = (typeof GENDERS)[number];
export type MatchPreference = (typeof MATCH_PREFERENCES)[number];
export type GroupSize = (typeof GROUP_SIZES)[number];

const requiredText = (max: number, emptyMessage: string) =>
  z
    .string({ required_error: emptyMessage })
    .trim()
    .min(1, emptyMessage)
    .max(max, `Keep this under ${max} characters`);

// Optional free-text field: trims, caps length, and stores "" as null.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .optional()
    .nullable()
    .transform((v) => v || null);

const tagList = (min: number, max: number, emptyMessage?: string) =>
  z
    .array(z.string().trim().min(1).max(LIMITS.tag, `Keep each one under ${LIMITS.tag} characters`), {
      required_error: emptyMessage,
    })
    .min(min, emptyMessage)
    .max(max, `Pick at most ${max}`)
    .transform((items) => [...new Set(items)]);

export const submissionSchema = z.object({
  email: z
    .string({ required_error: "Enter your email" })
    .trim()
    .toLowerCase()
    .min(1, "Enter your email")
    .email("Enter a valid email address")
    .max(LIMITS.email, `Keep this under ${LIMITS.email} characters`),
  name: requiredText(LIMITS.name, "Enter your full name"),
  program: requiredText(LIMITS.program, "Enter your program or major"),
  gradYear: z
    .number({ required_error: "Enter your graduation year", invalid_type_error: "Enter your graduation year" })
    .int("Enter a whole year")
    .min(LIMITS.gradYearMin, "Enter a valid year")
    .max(LIMITS.gradYearMax, "Enter a valid year"),
  interests: tagList(1, LIMITS.interests, "Add at least one interest"),
  diet: optionalText(LIMITS.diet),
  bio: requiredText(LIMITS.bio, "Write a short bio"),
  musicGenres: tagList(0, LIMITS.musicGenres).default([]),
  gender: z.enum(GENDERS, { errorMap: () => ({ message: "Choose your gender" }) }),
  matchPreference: z
    .array(z.enum(MATCH_PREFERENCES), { required_error: "Pick at least one option" })
    .min(1, "Pick at least one option")
    // "Anyone" is exclusive
    .transform((prefs) => (prefs.includes("Anyone") ? ["Anyone" as const] : [...new Set(prefs)])),
  groupSize: z.union([z.literal(GROUP_SIZES[0]), z.literal(GROUP_SIZES[1])], {
    errorMap: () => ({ message: "Pick a group size" }),
  }),
  // Must tick the privacy note checkbox. The backend doesn't store it; createdAt records when.
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to continue" }) }),
});

/** What the form sends (before trimming/normalizing). */
export type SubmissionInput = z.input<typeof submissionSchema>;
/** Validated, normalized submission. */
export type Submission = z.output<typeof submissionSchema>;
export type SubmissionFieldErrors = z.inferFlattenedErrors<typeof submissionSchema>["fieldErrors"];
