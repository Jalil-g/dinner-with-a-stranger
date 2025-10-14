import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({ origin: (process.env.CORS_ORIGIN || "").split(",").map(s=>s.trim()).filter(Boolean) || "*" }));

const submissionSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  program: z.string().optional().nullable(),
  gradYear: z.number().int().optional().nullable(),
  interests: z.array(z.string()).default([]),
  diet: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  musicGenres: z.array(z.string()).default([]),
  gender: z.string().min(1),
  matchPreference: z.array(z.string()).min(1),
  groupSize: z.number().int().refine(v=>v===2||v===4),
});

app.get("/api/health", (_req,res)=>res.json({ok:true}));
app.post("/api/submit", async (req,res)=>{
  const parsed = submissionSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try{
    const saved = await prisma.submission.upsert({
      where: { email: parsed.data.email },
      update: { ...parsed.data },
      create: { ...parsed.data }
    });
    res.json({ ok:true, id: saved.id });
  }catch(e){ console.error(e); res.status(500).json({ error:"Failed to save submission" }); }
});

const port = Number(process.env.PORT || 5174);
app.listen(port, ()=>console.log(`API on http://localhost:${port}`));
