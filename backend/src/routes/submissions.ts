import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { Prisma } from "@prisma/client";
import { submissionSchema } from "@dws/shared";
import { SUBMIT_RATE_LIMIT } from "../config.js";
import { prisma } from "../db.js";

export const submissionsRouter = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: SUBMIT_RATE_LIMIT,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many signups from this network. Please try again in a few minutes." },
});

submissionsRouter.post("/submit", submitLimiter, async (req, res) => {
  // Honeypot: the "website" field is hidden from people, but bots tend to fill
  // in every input. Pretend it worked so they don't learn to skip it.
  const { website, ...body } = req.body ?? {};
  if (website) return res.status(201).json({ ok: true });

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid submission", details: parsed.error.flatten() });
  }

  // consent is required to get this far but isn't stored (createdAt records when)
  const { consent: _consent, ...data } = parsed.data;

  try {
    // create (not upsert): without email verification, upserting by email would
    // let anyone overwrite someone else's signup just by knowing their address.
    const saved = await prisma.submission.create({ data });
    return res.status(201).json({ ok: true, id: saved.id });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return res.status(409).json({ error: "This email is already signed up." });
    }
    console.error(e);
    return res.status(500).json({ error: "Failed to save submission" });
  }
});
