-- Alter Lead table to add optional service column
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "service" TEXT;
