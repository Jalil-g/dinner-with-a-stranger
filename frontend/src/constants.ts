import type { MatchPreference } from "@dws/shared";

// Form options and validation rules live in shared/submission.ts.
// This file only holds frontend display data.

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

export const MATCH_PREFERENCE_LABELS: Record<MatchPreference, string> = {
  Woman: "Women",
  Man: "Men",
  "Non-binary": "Non-binary people",
  Anyone: "Anyone",
};
