-- Location: supabase/migrations/20250127093500_project_management_with_auth.sql
-- Schema Analysis: Fresh project implementation
-- Integration Type: Complete new schema with authentication
-- Dependencies: auth.users (Supabase built-in)

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'member');
CREATE TYPE public.project_status AS ENUM ('planning', 'on-track', 'at-risk', 'delayed', 'completed', 'cancelled');
CREATE TYPE public.task_status AS ENUM ('todo', 'in-progress', 'review', 'completed');
CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.activity_type AS ENUM ('task', 'meeting', 'message', 'file', 'integration', 'milestone');
CREATE TYPE public.integration_status AS ENUM ('connected', 'disconnected', 'syncing', 'error');

-- 2. User Profiles (Critical intermediary table)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'member'::public.user_role,
    avatar_url TEXT,
    bio TEXT,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    status public.project_status DEFAULT 'planning'::public.project_status,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    start_date DATE,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Project Members (Junction table)
CREATE TABLE public.project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role public.user_role DEFAULT 'member'::public.user_role,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- 5. Tasks
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status public.task_status DEFAULT 'todo'::public.task_status,
    priority public.task_priority DEFAULT 'medium'::public.task_priority,
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Activities/Timeline
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type public.activity_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Integrations
CREATE TABLE public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    status public.integration_status DEFAULT 'disconnected'::public.integration_status,
    config JSONB DEFAULT '{}',
    last_sync_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, service_name)
);

-- 8. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_activities_project_id ON public.activities(project_id);
CREATE INDEX idx_activities_user_id ON public.activities(user_id);
CREATE INDEX idx_integrations_user_id ON public.integrations(user_id);

-- 9. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- 10. Helper Functions
CREATE OR REPLACE FUNCTION public.is_project_member(project_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.project_members pm
    WHERE pm.project_id = project_uuid AND pm.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.is_project_owner(project_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_uuid AND p.owner_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_project(project_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT (
    public.is_project_owner(project_uuid) OR
    public.is_project_member(project_uuid)
)
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role::TEXT = required_role
)
$$;

-- 11. RLS Policies
-- User Profiles
CREATE POLICY "users_view_own_profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Projects
CREATE POLICY "users_view_accessible_projects" ON public.projects
FOR SELECT USING (public.can_access_project(id));

CREATE POLICY "owners_manage_projects" ON public.projects
FOR ALL USING (public.is_project_owner(id)) WITH CHECK (public.is_project_owner(id));

-- Project Members
CREATE POLICY "members_view_project_members" ON public.project_members
FOR SELECT USING (public.can_access_project(project_id));

CREATE POLICY "owners_manage_project_members" ON public.project_members
FOR ALL USING (public.is_project_owner(project_id)) WITH CHECK (public.is_project_owner(project_id));

-- Tasks
CREATE POLICY "users_view_project_tasks" ON public.tasks
FOR SELECT USING (public.can_access_project(project_id));

CREATE POLICY "members_manage_tasks" ON public.tasks
FOR ALL USING (public.can_access_project(project_id)) WITH CHECK (public.can_access_project(project_id));

-- Activities
CREATE POLICY "users_view_project_activities" ON public.activities
FOR SELECT USING (public.can_access_project(project_id));

CREATE POLICY "members_create_activities" ON public.activities
FOR INSERT WITH CHECK (public.can_access_project(project_id) AND auth.uid() = user_id);

-- Integrations
CREATE POLICY "users_manage_own_integrations" ON public.integrations
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 12. Trigger Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role)
  );  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 13. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 14. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    manager_uuid UUID := gen_random_uuid();
    member1_uuid UUID := gen_random_uuid();
    member2_uuid UUID := gen_random_uuid();
    project1_uuid UUID := gen_random_uuid();
    project2_uuid UUID := gen_random_uuid();
    project3_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@projecthub.com', crypt('ProjectHub2025!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (manager_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'manager@projecthub.com', crypt('ProjectHub2025!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Project Manager", "role": "manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (member1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah.chen@projecthub.com', crypt('ProjectHub2025!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Chen", "role": "member"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (member2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'mike.johnson@projecthub.com', crypt('ProjectHub2025!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Mike Johnson", "role": "member"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample projects
    INSERT INTO public.projects (id, name, description, status, progress, owner_id, start_date, due_date) VALUES
        (project1_uuid, 'E-commerce Platform Redesign', 'Complete UI/UX overhaul for mobile and desktop', 'on-track'::public.project_status, 75, admin_uuid, '2025-01-01', '2025-08-15'),
        (project2_uuid, 'Mobile App Development', 'React Native app for iOS and Android', 'at-risk'::public.project_status, 45, manager_uuid, '2025-02-01', '2025-09-30'),
        (project3_uuid, 'Data Analytics Dashboard', 'Real-time analytics and reporting system', 'on-track'::public.project_status, 90, admin_uuid, '2025-01-15', '2025-08-05');

    -- Add project members
    INSERT INTO public.project_members (project_id, user_id, role) VALUES
        (project1_uuid, member1_uuid, 'member'::public.user_role),
        (project1_uuid, member2_uuid, 'member'::public.user_role),
        (project2_uuid, admin_uuid, 'member'::public.user_role),
        (project2_uuid, member1_uuid, 'member'::public.user_role),
        (project3_uuid, manager_uuid, 'manager'::public.user_role),
        (project3_uuid, member2_uuid, 'member'::public.user_role);

    -- Create sample tasks
    INSERT INTO public.tasks (project_id, title, description, status, priority, assigned_to, created_by, due_date) VALUES
        (project1_uuid, 'Design Homepage Mockups', 'Create wireframes and high-fidelity mockups for homepage', 'completed'::public.task_status, 'high'::public.task_priority, member1_uuid, admin_uuid, '2025-02-01'),
        (project1_uuid, 'Implement Payment Flow', 'Integrate Stripe payment processing', 'in-progress'::public.task_status, 'high'::public.task_priority, member2_uuid, admin_uuid, '2025-02-15'),
        (project2_uuid, 'Setup React Native Environment', 'Configure development environment and dependencies', 'completed'::public.task_status, 'medium'::public.task_priority, member1_uuid, manager_uuid, '2025-02-10'),
        (project2_uuid, 'API Integration', 'Connect mobile app with backend services', 'todo'::public.task_status, 'high'::public.task_priority, member2_uuid, manager_uuid, '2025-03-01'),
        (project3_uuid, 'Database Schema Design', 'Design optimal database structure for analytics', 'completed'::public.task_status, 'high'::public.task_priority, manager_uuid, admin_uuid, '2025-01-25'),
        (project3_uuid, 'Chart Components Implementation', 'Build reusable chart components', 'in-progress'::public.task_status, 'medium'::public.task_priority, member2_uuid, admin_uuid, '2025-02-20');

    -- Create sample activities
    INSERT INTO public.activities (project_id, user_id, type, title, description) VALUES
        (project1_uuid, member1_uuid, 'task'::public.activity_type, 'Task Completed', 'Completed user interface mockups for checkout flow'),
        (project2_uuid, manager_uuid, 'meeting'::public.activity_type, 'Sprint Planning', 'Sprint planning meeting scheduled for tomorrow 10 AM'),
        (project1_uuid, member1_uuid, 'message'::public.activity_type, 'Design Assets Shared', 'Shared latest design assets in project channel'),
        (project2_uuid, member2_uuid, 'file'::public.activity_type, 'Document Upload', 'Uploaded technical specifications document'),
        (project3_uuid, manager_uuid, 'integration'::public.activity_type, 'GitHub Connected', 'Connected GitHub repository for automated deployments');

    -- Create sample integrations
    INSERT INTO public.integrations (user_id, service_name, status, last_sync_at) VALUES
        (admin_uuid, 'Google Workspace', 'connected'::public.integration_status, now() - interval '2 minutes'),
        (admin_uuid, 'Microsoft Teams', 'connected'::public.integration_status, now() - interval '5 minutes'),
        (admin_uuid, 'Slack', 'syncing'::public.integration_status, now() - interval '1 minute'),
        (admin_uuid, 'Jira', 'connected'::public.integration_status, now() - interval '1 minute'),
        (manager_uuid, 'GitHub', 'connected'::public.integration_status, now() - interval '3 minutes'),
        (manager_uuid, 'Trello', 'error'::public.integration_status, now() - interval '1 hour'),
        (member1_uuid, 'Notion', 'connected'::public.integration_status, now() - interval '4 minutes'),
        (member2_uuid, 'Asana', 'disconnected'::public.integration_status, null);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;