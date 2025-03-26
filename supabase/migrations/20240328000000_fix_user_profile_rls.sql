-- D'abord, définir le rôle postgres pour avoir les privilèges administrateur
-- Cela est nécessaire pour gérer les politiques RLS
SET ROLE postgres;

-- Supprimer les politiques existantes qui posent problème
DROP POLICY IF EXISTS "Users can view and update their own data" ON public.users;
DROP POLICY IF EXISTS "Platform admins can read all users" ON public.users;
DROP POLICY IF EXISTS "Platform admins can write all users" ON public.users;
DROP POLICY IF EXISTS "Anonymous users can insert" ON public.users;
-- Assurez-vous que RLS est activé
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 1. Politique permettant aux utilisateurs de LIRE leur propre profil
-- Cette politique est séparée pour mieux gérer les permissions
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT
  USING (
    (auth.uid()::text = user_id) OR 
    (auth.uid()::text = id::text)
  );

-- 2. Politique permettant aux utilisateurs de METTRE À JOUR leur propre profil
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (
    (auth.uid()::text = user_id) OR 
    (auth.uid()::text = id::text)
  )
  WITH CHECK (
    (auth.uid()::text = user_id) OR 
    (auth.uid()::text = id::text)
  );

-- 3. Politique permettant aux utilisateurs de SUPPRIMER leur propre profil
CREATE POLICY "Users can delete their own profile" ON public.users
  FOR DELETE
  USING (
    (auth.uid()::text = user_id) OR 
    (auth.uid()::text = id::text)
  );

-- 4. Politique permettant aux administrateurs de LIRE tous les profils
-- Vérifie le rôle directement dans la table auth.users pour éviter les récursions
CREATE POLICY "Admins can read all profiles" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE 
        auth.users.id = auth.uid() AND
        (
          auth.users.raw_user_meta_data->>'role' = 'platform_admin' OR
          auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    )
  );

-- 5. Politique permettant aux administrateurs de MODIFIER tous les profils
CREATE POLICY "Admins can update all profiles" ON public.users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE 
        auth.users.id = auth.uid() AND
        (
          auth.users.raw_user_meta_data->>'role' = 'platform_admin' OR
          auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE 
        auth.users.id = auth.uid() AND
        (
          auth.users.raw_user_meta_data->>'role' = 'platform_admin' OR
          auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    )
  );

-- 6. Politique permettant aux administrateurs de SUPPRIMER tous les profils
CREATE POLICY "Admins can delete all profiles" ON public.users
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE 
        auth.users.id = auth.uid() AND
        (
          auth.users.raw_user_meta_data->>'role' = 'platform_admin' OR
          auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    )
  );

-- 7. Politique permettant au rôle de service de contourner les RLS
-- Cette politique est essentielle pour les opérations côté serveur
CREATE POLICY "Service role can do anything" ON public.users
  FOR ALL
  USING (
    (current_setting('request.jwt.claim.role', true)::text = 'service_role') OR
    (current_setting('role', true)::text = 'service_role')
  )
  WITH CHECK (
    (current_setting('request.jwt.claim.role', true)::text = 'service_role') OR
    (current_setting('role', true)::text = 'service_role')
  );

-- 8. Politique permettant aux utilisateurs anonymes d'INSÉRER (pour l'inscription)
CREATE POLICY "Anonymous users can insert" ON public.users
  FOR INSERT
  WITH CHECK (auth.role() = 'anon'); 