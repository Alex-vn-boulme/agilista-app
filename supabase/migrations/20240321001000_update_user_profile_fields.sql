-- Add missing columns to the users table
ALTER TABLE "public"."users"
ADD COLUMN IF NOT EXISTS "company" text,
ADD COLUMN IF NOT EXISTS "industry" text,
ADD COLUMN IF NOT EXISTS "address" text;

-- Update role column to have a default value if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'role' 
    AND column_default = '''user'''
  ) THEN
    ALTER TABLE "public"."users" 
    ALTER COLUMN "role" SET DEFAULT 'user';
  END IF;
END $$;

-- Ensure RLS policies are in place
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can update own profile" ON "public"."users";
DROP POLICY IF EXISTS "Users can view own profile" ON "public"."users";

-- Create or replace policies
CREATE POLICY "Users can update own profile"
ON "public"."users"
FOR UPDATE
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view own profile"
ON "public"."users"
FOR SELECT
USING (auth.uid()::text = user_id); 