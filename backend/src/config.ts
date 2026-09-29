import "dotenv/config";

export const PORT = Number(process.env.PORT ?? 5174);

// Comma-separated list of allowed origins. Falls back to the Vite dev server
// rather than "*" so a missing env var in production fails closed.
export const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
