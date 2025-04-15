-- Création de la table organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    industry text,
    address text,
    phone text,
    website text,
    logo_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Ajout d'un index sur le nom de l'organisation pour faciliter les recherches
CREATE INDEX IF NOT EXISTS idx_organizations_name ON public.organizations(name);

-- Ajout de la colonne organization_id à la table users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL;

-- Création d'un index sur organization_id pour optimiser les jointures
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON public.users(organization_id);

-- Table des invitations à une organisation
CREATE TABLE IF NOT EXISTS public.organization_invitations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    email text NOT NULL,
    role text DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    token text NOT NULL UNIQUE,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Index pour rechercher les invitations par email
CREATE INDEX IF NOT EXISTS idx_org_invitations_email ON public.organization_invitations(email);
CREATE INDEX IF NOT EXISTS idx_org_invitations_organization ON public.organization_invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_invitations_token ON public.organization_invitations(token);

-- Activer RLS pour les tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_invitations ENABLE ROW LEVEL SECURITY;

-- Politique RLS: les utilisateurs peuvent voir leur propre organisation
CREATE POLICY "Users can view own organization" ON public.organizations
    FOR SELECT
    USING (id IN (
        SELECT organization_id FROM public.users WHERE user_id = auth.uid()::text
    ));

-- Politique RLS: les utilisateurs peuvent modifier leur propre organisation s'ils sont admin
CREATE POLICY "Organization admins can update organization" ON public.organizations
    FOR UPDATE
    USING (id IN (
        SELECT organization_id FROM public.users WHERE user_id = auth.uid()::text AND role = 'admin'
    ));

-- Politique RLS: voir les invitations pour sa propre organisation
CREATE POLICY "Users can view invitations for their organization" ON public.organization_invitations
    FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM public.users WHERE user_id = auth.uid()::text
    ));

-- Politique RLS: admin peut créer des invitations
CREATE POLICY "Admins can create invitations" ON public.organization_invitations
    FOR INSERT
    WITH CHECK (organization_id IN (
        SELECT organization_id FROM public.users WHERE user_id = auth.uid()::text AND role = 'admin'
    ));

-- Politique RLS: admin peut supprimer des invitations
CREATE POLICY "Admins can delete invitations" ON public.organization_invitations
    FOR DELETE
    USING (organization_id IN (
        SELECT organization_id FROM public.users WHERE user_id = auth.uid()::text AND role = 'admin'
    ));

-- Fonction pour générer le jeton d'invitation
CREATE OR REPLACE FUNCTION generate_invitation_token()
RETURNS text AS $$
DECLARE
    result text;
BEGIN
    result := encode(gen_random_bytes(24), 'hex');
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour remplir automatiquement le jeton et la date d'expiration
CREATE OR REPLACE FUNCTION set_invitation_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Définir le jeton s'il n'est pas fourni
    IF NEW.token IS NULL THEN
        NEW.token := generate_invitation_token();
    END IF;
    
    -- Définir la date d'expiration à 7 jours si non fournie
    IF NEW.expires_at IS NULL THEN
        NEW.expires_at := NOW() + INTERVAL '7 days';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger
DROP TRIGGER IF EXISTS set_invitation_defaults_trigger ON public.organization_invitations;
CREATE TRIGGER set_invitation_defaults_trigger
    BEFORE INSERT ON public.organization_invitations
    FOR EACH ROW
    EXECUTE FUNCTION set_invitation_defaults();

-- Mettre à jour la fonction handle_user_update pour mettre à jour company
CREATE OR REPLACE FUNCTION public.handle_organization_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Si l'utilisateur a une organisation et que le champ company change
    IF NEW.raw_user_meta_data->>'company' IS NOT NULL AND 
       (OLD.raw_user_meta_data->>'company' IS NULL OR 
        NEW.raw_user_meta_data->>'company' != OLD.raw_user_meta_data->>'company') THEN
        
        -- Récupérer l'utilisateur public
        DECLARE 
            user_record public.users;
        BEGIN
            SELECT * INTO user_record FROM public.users WHERE user_id = NEW.id::text LIMIT 1;
            
            -- Vérifier si l'utilisateur a une organisation
            IF user_record.organization_id IS NOT NULL THEN
                -- Mettre à jour le nom de l'organisation
                UPDATE public.organizations
                SET name = NEW.raw_user_meta_data->>'company',
                    updated_at = NOW()
                WHERE id = user_record.organization_id;
            END IF;
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger pour la mise à jour de l'organisation
DROP TRIGGER IF EXISTS on_auth_user_organization_update ON auth.users;
CREATE TRIGGER on_auth_user_organization_update
  AFTER UPDATE ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_organization_update();

-- Fonction utilitaire pour créer ou récupérer l'ID d'une organisation existante
CREATE OR REPLACE FUNCTION get_or_create_organization(org_name text, owner_uuid uuid) 
RETURNS uuid AS $$
DECLARE
    org_id uuid;
BEGIN
    -- Chercher une organisation existante avec ce nom
    SELECT id INTO org_id FROM public.organizations WHERE name = org_name LIMIT 1;
    
    -- Si aucune organisation n'existe, en créer une nouvelle
    IF org_id IS NULL THEN
        INSERT INTO public.organizations (name, owner_id, created_at, updated_at)
        VALUES (org_name, owner_uuid, NOW(), NOW())
        RETURNING id INTO org_id;
    END IF;
    
    RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 