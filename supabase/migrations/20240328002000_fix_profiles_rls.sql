-- Enable RLS
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Can view own profile" ON "profiles";
DROP POLICY IF EXISTS "Can update own profile" ON "profiles";
DROP POLICY IF EXISTS "Can insert own profile" ON "profiles";
DROP POLICY IF EXISTS "Service role bypass" ON "profiles";
DROP POLICY IF EXISTS "Public read access" ON "profiles";
DROP POLICY IF EXISTS "Enable insert for signup" ON "profiles";

-- Allow service role to bypass RLS (this should be first)
CREATE POLICY "service_role_policy"
ON "profiles"
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anyone to create a profile during signup
CREATE POLICY "create_profile"
ON "profiles"
FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to read their own profile and basic info of others
CREATE POLICY "read_profile"
ON "profiles"
FOR SELECT
TO public
USING (true);

-- Allow users to update their own profile
CREATE POLICY "update_own_profile"
ON "profiles"
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id); 