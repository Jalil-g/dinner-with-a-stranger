import "dotenv/config";

function intEnv(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}

export const PORT = intEnv("PORT", 5174);

// Comma-separated list of allowed origins. Falls back to the Vite dev server
// rather than "*" so a missing env var in production fails closed.
export const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Number of reverse proxies in front of the API (e.g. 1 on Render/Fly/Railway).
// Needed so rate limiting sees the real client IP instead of the proxy's.
export const TRUST_PROXY = intEnv("TRUST_PROXY", 0);

// Max signup requests per IP per 15 minutes. Campus Wi-Fi often puts many
// students behind one public IP, so keep this generous for sign-up rushes.
export const SUBMIT_RATE_LIMIT = intEnv("SUBMIT_RATE_LIMIT", 20);
