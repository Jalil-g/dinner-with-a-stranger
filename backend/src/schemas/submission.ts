import { z } from "zod";

export const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"] as const;
export const MATCH_PREFERENCES = ["Same sex", "Opposite sex", "Anyone"] as const;

// Optional free-text field: trims, caps length, and stores "" as null.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => v || null);

const tagList = (maxItems: number) =>
  z
    .array(z.string().trim().min(1).max(50))
    .max(maxItems)
    .default([])
    .transform((items) => [...new Set(items)]);

export const submissionSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().min(1).max(100),
  program: optionalText(100),
  gradYear: z.number().int().min(1900).max(2100).optional().nullable(),
  interests: tagList(20),
  diet: optionalText(100),
  bio: optionalText(1000),
  musicGenres: tagList(30),
  gender: z.enum(GENDERS),
  matchPreference: z
    .array(z.enum(MATCH_PREFERENCES))
    .min(1)
    .transform((prefs) => (prefs.includes("Anyone") ? ["Anyone"] : [...new Set(prefs)])),
  groupSize: z.union([z.literal(2), z.literal(4)]),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
