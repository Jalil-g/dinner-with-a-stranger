-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "program" TEXT,
    "gradYear" INTEGER,
    "interests" TEXT[],
    "diet" TEXT,
    "bio" TEXT,
    "musicGenres" TEXT[],
    "gender" TEXT NOT NULL,
    "matchPreference" TEXT[],
    "groupSize" INTEGER NOT NULL,
    "bioEmbedding" DOUBLE PRECISION[],

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_email_key" ON "Submission"("email");
