import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db.js";
import { submissionSchema } from "../schemas/submission.js";

export const submissionsRouter = Router();

submissionsRouter.post("/submit", async (req, res) => {
  const parsed = submissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid submission", details: parsed.error.flatten() });
  }

  try {
    // create (not upsert): without email verification, upserting by email would
    // let anyone overwrite someone else's signup just by knowing their address.
    const saved = await prisma.submission.create({ data: parsed.data });
    return res.status(201).json({ ok: true, id: saved.id });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return res.status(409).json({ error: "This email is already signed up." });
    }
    console.error(e);
    return res.status(500).json({ error: "Failed to save submission" });
  }
});
