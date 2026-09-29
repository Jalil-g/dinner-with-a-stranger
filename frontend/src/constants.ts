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
export const GENDERS = ["Woman", "Man", "Non-binary", "Prefer not to say"] as const;
// Genders someone wants to be matched with, or "Anyone"
export const MATCH_PREFERENCES = ["Woman", "Man", "Non-binary", "Anyone"] as const;
export const GROUP_SIZES = [2, 4] as const;

export type Gender = (typeof GENDERS)[number];
export type MatchPreference = (typeof MATCH_PREFERENCES)[number];
export type GroupSize = (typeof GROUP_SIZES)[number];

export const MATCH_PREFERENCE_LABELS: Record<MatchPreference, string> = {
  Woman: "Women",
  Man: "Men",
  "Non-binary": "Non-binary people",
  Anyone: "Anyone",
};
