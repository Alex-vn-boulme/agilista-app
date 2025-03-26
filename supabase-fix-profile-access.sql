-- Script à exécuter directement dans la console SQL de Supabase
-- Ce script corrige le problème d'accès au profil utilisateur

-- D'abord, définir le rôle postgres pour avoir les privilèges administrateur
-- Cela est nécessaire pour gérer les politiques RLS
SET ROLE postgres;

-- Supprimer les politiques existantes qui posent problème
DROP POLICY IF EXISTS "Users can view and update their own data" ON public.users;
DROP POLICY IF EXISTS "Platform admins can read all users" ON public.users;
DROP POLICY IF EXISTS "Platform admins can write all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Service role bypass" ON public.users;
DROP POLICY IF EXISTS "Service role can do anything" ON public.users;
DROP POLICY IF EXISTS "Anonymous users can insert" ON public.users;

-- Assurez-vous que RLS est activé
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 1. Politique permettant aux utilisateurs de LIRE leur propre profil
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

-- 3. Politique permettant au rôle de service de contourner les RLS
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

-- 4. Politique permettant aux utilisateurs anonymes d'INSÉRER (pour l'inscription)
CREATE POLICY "Anonymous users can insert" ON public.users
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Vérifier que les politiques ont été créées correctement
SELECT * FROM pg_policies WHERE tablename = 'users'; 