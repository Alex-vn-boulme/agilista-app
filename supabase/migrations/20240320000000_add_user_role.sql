-- Add role column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Update existing users to have 'user' role
UPDATE public.users SET role = 'user' WHERE role IS NULL; 