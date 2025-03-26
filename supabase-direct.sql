-- Drop existing policies on the users table if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON "users";
DROP POLICY IF EXISTS "Admins can view all users" ON "users";
DROP POLICY IF EXISTS "Admins can insert users" ON "users";
DROP POLICY IF EXISTS "Admins can update users" ON "users";
DROP POLICY IF EXISTS "Admins can delete users" ON "users";

-- Disable RLS temporarily to create the first admin user if needed
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;

-- Create a temporary function to make sure at least one admin exists
DO $$
DECLARE
  admin_count integer;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM users WHERE role = 'platform_admin';
  
  IF admin_count = 0 THEN
    -- Create an admin user if none exists
    INSERT INTO users (
      id, 
      email, 
      full_name, 
      role, 
      status, 
      plan, 
      created_at, 
      token_identifier,
      user_id
    ) VALUES (
      gen_random_uuid()::text, 
      'admin@example.com', 
      'System Admin', 
      'platform_admin', 
      'active', 
      'premium', 
      now(), 
      gen_random_uuid()::text,
      auth.uid()::text
    );
  END IF;
END
$$;

-- Re-enable RLS on the users table
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view and update their own data
CREATE POLICY "Users can view their own data" ON "users"
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Create policy to bypass RLS for the service role
CREATE POLICY "Service role bypass" ON "users"
  USING (auth.jwt() ? 'service_role')
  WITH CHECK (auth.jwt() ? 'service_role');

-- Special policy for admins that allows CRUD operations if they have the admin role
-- This policy accounts for the possibility that the user_id might be NULL or not match auth.uid
CREATE POLICY "Admins can access all users" ON "users"
  USING (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE (
        (user_id IS NOT NULL AND user_id = auth.uid()::text) OR
        (id = auth.uid()::text)
      ) AND role = 'platform_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "users"
      WHERE (
        (user_id IS NOT NULL AND user_id = auth.uid()::text) OR
        (id = auth.uid()::text)
      ) AND role = 'platform_admin'
    )
  ); 