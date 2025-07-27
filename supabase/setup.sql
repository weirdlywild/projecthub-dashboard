-- Location: supabase/setup.sql
-- Quick setup script for local development
-- This file can be run directly in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Note: Run the migration files in order:
-- 1. 20250127093500_project_management_with_auth.sql
-- 2. 20250127094000_analytics_and_reporting.sql

-- Quick verification queries after setup:

-- Check if all tables exist
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Check if all custom types exist
SELECT 
    typname,
    typtype,
    typcategory
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  AND typtype = 'e'
ORDER BY typname;

-- Check if RLS is enabled on all tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND rowsecurity = true
ORDER BY tablename;

-- Check sample data counts
SELECT 
    'user_profiles' as table_name, COUNT(*) as record_count FROM public.user_profiles
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects
UNION ALL
SELECT 'tasks', COUNT(*) FROM public.tasks
UNION ALL
SELECT 'activities', COUNT(*) FROM public.activities
UNION ALL
SELECT 'integrations', COUNT(*) FROM public.integrations
UNION ALL
SELECT 'notifications', COUNT(*) FROM public.notifications
UNION ALL
SELECT 'time_entries', COUNT(*) FROM public.time_entries
ORDER BY table_name;

-- Test authentication (run after user signup)
-- SELECT auth.uid(), auth.email();

-- Test project access function
-- SELECT can_access_project('project-uuid-here');

-- Test analytics views
-- SELECT * FROM project_analytics LIMIT 5;
-- SELECT * FROM user_dashboard_stats;