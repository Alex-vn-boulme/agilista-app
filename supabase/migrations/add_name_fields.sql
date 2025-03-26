-- Add first_name and last_name columns to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_name text;

-- Create trigger to sync first_name and last_name with raw_user_meta_data
CREATE OR REPLACE FUNCTION public.sync_user_names()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'first_name' IS NOT NULL THEN
    NEW.first_name = NEW.raw_user_meta_data->>'first_name';
  END IF;
  
  IF NEW.raw_user_meta_data->>'last_name' IS NOT NULL THEN
    NEW.last_name = NEW.raw_user_meta_data->>'last_name';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS sync_user_names ON auth.users;

-- Create the trigger
CREATE TRIGGER sync_user_names
BEFORE INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_names(); 