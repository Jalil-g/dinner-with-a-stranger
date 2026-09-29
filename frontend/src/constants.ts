export const GENRES = [
  "Pop", "Hip-Hop", "R&B", "Rock", "Indie",
  "Electronic", "House", "Techno",
  "Jazz", "Blues",
  "Classical",
  "K-Pop", "J-Pop",
  "Latin", "Reggaeton", "Afrobeats",
  "Country", "Folk",
  "Metal", "Punk",
  "Lo-fi", "Ambient",
] as const;

// Keep in sync with backend/src/schemas/submission.ts
export const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"] as const;
export const MATCH_PREFERENCES = ["Same sex", "Opposite sex", "Anyone"] as const;
export const GROUP_SIZES = [2, 4] as const;

export type Gender = (typeof GENDERS)[number];
export type MatchPreference = (typeof MATCH_PREFERENCES)[number];
export type GroupSize = (typeof GROUP_SIZES)[number];
