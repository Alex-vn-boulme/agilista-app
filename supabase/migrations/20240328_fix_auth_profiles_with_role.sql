-- Set role to postgres
set role postgres;

-- Enable RLS
alter table "public"."profiles" enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Add missing auth triggers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, status, created_at, updated_at)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    'active',
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop if exists and recreate the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Add service role policy
create policy "Service role can do all"
  on profiles for all
  using ( auth.role() = 'service_role' )
  with check ( auth.role() = 'service_role' );

-- Add anonymous insert policy for signup
create policy "Anyone can insert during signup"
  on profiles for insert
  with check ( true );

-- Remove password_hash column as it's managed by auth.users
alter table profiles drop column if exists password_hash;

-- Reset role
reset role; 