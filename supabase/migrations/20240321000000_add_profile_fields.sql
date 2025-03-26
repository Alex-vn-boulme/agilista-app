-- Add new columns to the users table
ALTER TABLE "public"."users"
ADD COLUMN IF NOT EXISTS "phone" text,
ADD COLUMN IF NOT EXISTS "company" text,
ADD COLUMN IF NOT EXISTS "industry" text,
ADD COLUMN IF NOT EXISTS "address" text,
ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'user';

-- Update RLS policies
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can update own profile"
ON "public"."users"
FOR UPDATE
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view own profile"
ON "public"."users"
FOR SELECT
USING (auth.uid()::text = user_id); 