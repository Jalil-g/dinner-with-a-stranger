import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { CORS_ORIGINS } from "./config.js";
import { submissionsRouter } from "./routes/submissions.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: CORS_ORIGINS }));
  app.use(express.json({ limit: "20kb" }));

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api", submissionsRouter);

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));

  // Return JSON (not Express's HTML stack trace) for malformed bodies etc.
  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = typeof err?.status === "number" ? err.status : 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
  };
  app.use(errorHandler);

  return app;
}
