-- Exécuter ce script avec les privilèges postgres
SET ROLE postgres;

-- Ensure the first_name and last_name columns exist in the users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_name text;

-- Update users table with first_name and last_name from existing data
UPDATE public.users
SET 
  first_name = split_part(COALESCE(full_name, name, ''), ' ', 1),
  last_name = substring(COALESCE(full_name, name, '') from (length(split_part(COALESCE(full_name, name, ''), ' ', 1)) + 2))
WHERE 
  (first_name IS NULL OR first_name = '') 
  AND (COALESCE(full_name, name, '') <> '');

-- Mettre à jour la fonction qui gère les nouveaux utilisateurs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    user_id,
    email,
    name,
    full_name,
    first_name,
    last_name,
    avatar_url,
    token_identifier,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.id::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mettre à jour la fonction qui gère les mises à jour d'utilisateurs
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
DECLARE
  current_record public.users;
BEGIN
  SELECT * INTO current_record FROM public.users WHERE user_id = NEW.id::text LIMIT 1;
  
  UPDATE public.users
  SET
    email = NEW.email,
    name = COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', current_record.name, NEW.email),
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', current_record.full_name, NEW.email),
    first_name = COALESCE(NEW.raw_user_meta_data->>'first_name', current_record.first_name),
    last_name = COALESCE(NEW.raw_user_meta_data->>'last_name', current_record.last_name),
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', current_record.avatar_url),
    updated_at = NEW.updated_at
  WHERE user_id = NEW.id::text;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vérifier que les triggers existent
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Vérifiez que les champs existent maintenant
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users' 
AND column_name IN ('first_name', 'last_name', 'full_name', 'name'); 