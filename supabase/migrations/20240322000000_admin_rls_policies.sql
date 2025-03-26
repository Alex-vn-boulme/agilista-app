-- Drop existing policies on the users table if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON "users";
DROP POLICY IF EXISTS "Admins can view all users" ON "users";
DROP POLICY IF EXISTS "Admins can insert users" ON "users";
DROP POLICY IF EXISTS "Admins can update users" ON "users";
DROP POLICY IF EXISTS "Admins can delete users" ON "users";

-- Enable RLS on the users table
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view and update their own data
CREATE POLICY "Users can view their own data" ON "users"
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Create policy for platform_admin to view all users
CREATE POLICY "Admins can view all users" ON "users"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE "users".user_id = auth.uid()::text AND "users".role = 'platform_admin'
    )
  );

-- Create policy for platform_admin to insert users
CREATE POLICY "Admins can insert users" ON "users"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE "users".user_id = auth.uid()::text AND "users".role = 'platform_admin'
    )
  );

-- Create policy for platform_admin to update users
CREATE POLICY "Admins can update users" ON "users"
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE "users".user_id = auth.uid()::text AND "users".role = 'platform_admin'
    )
  );

-- Create policy for platform_admin to delete users
CREATE POLICY "Admins can delete users" ON "users"
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE "users".user_id = auth.uid()::text AND "users".role = 'platform_admin'
    )
  ); 