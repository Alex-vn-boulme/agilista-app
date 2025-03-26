-- Add status and plan fields to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'active' CHECK ("status" IN ('active', 'inactive'));
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan" text NOT NULL DEFAULT 'free' CHECK ("plan" IN ('free', 'premium')); 