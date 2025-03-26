-- Add status and plan fields to auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive'));
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium'));
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS full_name text;

-- Create a trigger to sync full_name with raw_user_meta_data
CREATE OR REPLACE FUNCTION public.sync_user_full_name()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'full_name' IS NOT NULL THEN
    NEW.full_name = NEW.raw_user_meta_data->>'full_name';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS sync_user_full_name ON auth.users;
CREATE TRIGGER sync_user_full_name
  BEFORE INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_full_name();

-- Create RLS policies for users table
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow platform admins to read all users"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'admin platform'
    )
  );

CREATE POLICY "Allow platform admins to update users"
  ON auth.users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'admin platform'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'admin platform'
    )
  );

CREATE POLICY "Allow platform admins to delete users"
  ON auth.users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'admin platform'
    )
  ); 