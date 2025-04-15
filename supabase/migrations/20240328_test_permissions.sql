-- Enable RLS on profiles table
alter table "public"."profiles" enable row level security;

-- Create a basic policy
create policy "Public profiles are viewable"
  on profiles for select
  using ( true );

-- Droits de base pour le rôle authenticated
GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."profiles" TO authenticated;

-- Droits limités pour le rôle anon (selon vos besoins)
GRANT SELECT, INSERT ON "public"."profiles" TO anon;

-- Si vous utilisez des séquences pour les IDs
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon; 