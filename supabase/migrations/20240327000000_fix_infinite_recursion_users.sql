-- Disable the existing policies that are causing recursion issues
DROP POLICY IF EXISTS "Admins can view all users" ON "users";
DROP POLICY IF EXISTS "Admins can insert users" ON "users";
DROP POLICY IF EXISTS "Admins can update users" ON "users";
DROP POLICY IF EXISTS "Admins can delete users" ON "users";
DROP POLICY IF EXISTS "Admins can access all users" ON "users";
DROP POLICY IF EXISTS "Users can view their own data" ON "users";
DROP POLICY IF EXISTS "Users can update own profile" ON "users";
DROP POLICY IF EXISTS "Users can view own profile" ON "users";
DROP POLICY IF EXISTS "Service role bypass" ON "users";

-- Ensure RLS is enabled
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to bypass RLS - this is essential for server-side operations
CREATE POLICY "Service role bypass" ON "users"
  USING (current_setting('request.jwt.claim.role', true)::text = 'service_role')
  WITH CHECK (current_setting('request.jwt.claim.role', true)::text = 'service_role');

-- Create policy for anonymous users to be able to signup - important for the signup flow
CREATE POLICY "Anonymous users can insert" ON "users"
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Create policy for users to view and update only their own data
-- Note: user_id is already TEXT type, and auth.uid() is UUID which needs conversion to text
CREATE POLICY "Users can view and update their own data" ON "users"
  USING (
    user_id = auth.uid()::text OR 
    id::text = auth.uid()::text
  )
  WITH CHECK (
    user_id = auth.uid()::text OR 
    id::text = auth.uid()::text
  );

-- Create separate read-only policy for platform_admin users
-- This avoids the recursion by not having to query the same table to determine access
CREATE POLICY "Platform admins can read all users" ON "users"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'platform_admin'
    )
  );

-- Create separate write policy for platform_admin users
CREATE POLICY "Platform admins can write all users" ON "users"
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'platform_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'platform_admin'
    )
  );

-- Note pour l'application : 
-- La fonction signUpAction dans src/app/actions.ts doit être modifiée pour utiliser
-- le client Supabase avec le rôle de service pour l'insertion d'utilisateurs. 