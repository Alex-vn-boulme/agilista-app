-- Quick fix: Just disable RLS temporarily to get all users
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;

-- After fixing the issue, you can re-enable RLS with the proper policies:

-- To re-enable RLS when ready:
-- ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
-- 
-- -- Create policy for platform admins
-- CREATE POLICY "Admins can do everything" ON "users"
--   USING (
--     EXISTS (
--       SELECT 1 FROM "users"
--       WHERE ((user_id IS NOT NULL AND user_id = auth.uid()::text) OR id = auth.uid()::text)
--       AND role = 'platform_admin'
--     )
--   )
--   WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM "users"
--       WHERE ((user_id IS NOT NULL AND user_id = auth.uid()::text) OR id = auth.uid()::text)
--       AND role = 'platform_admin'
--     )
--   ); 