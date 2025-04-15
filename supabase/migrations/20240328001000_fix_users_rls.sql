-- Enable RLS
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "view_own" ON "users";
DROP POLICY IF EXISTS "update_own" ON "users";
DROP POLICY IF EXISTS "insert_own" ON "users";
DROP POLICY IF EXISTS "service_bypass" ON "users";
DROP POLICY IF EXISTS "public_view" ON "users";

-- Create simplified policies
CREATE POLICY "view_own"
ON "users"
FOR SELECT
USING (auth.uid() = id OR true);

CREATE POLICY "update_own"
ON "users"
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "insert_own"
ON "users"
FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "service_bypass"
ON "users"
TO service_role
USING (true);

-- Allow public to read user profiles (for basic info like names)
CREATE POLICY "public_view"
ON "users"
FOR SELECT
TO public
USING (true); 