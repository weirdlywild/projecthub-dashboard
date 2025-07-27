-- Create admin user
-- This script creates an admin user in the auth.users table and corresponding user_profile

DO $$
DECLARE
    admin_user_id UUID := gen_random_uuid();
BEGIN
    -- Insert into auth.users table
    INSERT INTO auth.users (
        id,
        instance_id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        raw_app_meta_data,
        is_sso_user,
        is_anonymous
    ) VALUES (
        admin_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'admin@projecthub.com',
        crypt('Admin123!', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"full_name": "System Administrator", "role": "admin"}'::jsonb,
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        false,
        false
    );

    -- The user_profile will be automatically created by the trigger
    -- But let's ensure it has admin role
    UPDATE public.user_profiles 
    SET role = 'admin'::public.user_role,
        full_name = 'System Administrator'
    WHERE id = admin_user_id;

    RAISE NOTICE 'Admin user created successfully with email: admin@projecthub.com and password: Admin123!';

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Admin user already exists';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating admin user: %', SQLERRM;
END $$;