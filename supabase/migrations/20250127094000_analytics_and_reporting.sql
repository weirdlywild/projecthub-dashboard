-- Location: supabase/migrations/20250127094000_analytics_and_reporting.sql
-- Schema Enhancement: Analytics and reporting features
-- Dependencies: 20250127093500_project_management_with_auth.sql

-- 1. Additional Types for Analytics
CREATE TYPE public.metric_type AS ENUM ('task_completion', 'project_progress', 'user_activity', 'integration_usage', 'performance');
CREATE TYPE public.report_type AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'custom');
CREATE TYPE public.notification_type AS ENUM ('task_assigned', 'task_completed', 'project_update', 'deadline_reminder', 'integration_alert');

-- 2. Project Metrics (for analytics dashboard)
CREATE TABLE public.project_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    metric_type public.metric_type NOT NULL,
    value NUMERIC NOT NULL,
    metadata JSONB DEFAULT '{}',
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL
);

-- 3. Reports (saved analytics reports)
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    type public.report_type NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type public.notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Activity Logs (for analytics)
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Project Templates (for quick project creation)
CREATE TABLE public.project_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    template_data JSONB NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Task Dependencies
CREATE TABLE public.task_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
    depends_on_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(task_id, depends_on_task_id),
    CHECK (task_id != depends_on_task_id)
);

-- 8. Time Tracking
CREATE TABLE public.time_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    description TEXT,
    hours_spent NUMERIC(5,2) NOT NULL CHECK (hours_spent > 0),
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Indexes for Performance
CREATE INDEX idx_project_metrics_project_id ON public.project_metrics(project_id);
CREATE INDEX idx_project_metrics_type ON public.project_metrics(metric_type);
CREATE INDEX idx_project_metrics_recorded_at ON public.project_metrics(recorded_at);
CREATE INDEX idx_reports_created_by ON public.reports(created_by);
CREATE INDEX idx_reports_type ON public.reports(type);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_user_activity_logs_user_id ON public.user_activity_logs(user_id);
CREATE INDEX idx_user_activity_logs_created_at ON public.user_activity_logs(created_at);
CREATE INDEX idx_project_templates_created_by ON public.project_templates(created_by);
CREATE INDEX idx_project_templates_is_public ON public.project_templates(is_public);
CREATE INDEX idx_task_dependencies_task_id ON public.task_dependencies(task_id);
CREATE INDEX idx_task_dependencies_depends_on ON public.task_dependencies(depends_on_task_id);
CREATE INDEX idx_time_entries_task_id ON public.time_entries(task_id);
CREATE INDEX idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_entry_date ON public.time_entries(entry_date);

-- 10. Enable RLS for new tables
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- 11. RLS Policies for new tables
-- Project Metrics
CREATE POLICY "users_view_project_metrics" ON public.project_metrics
FOR SELECT USING (public.can_access_project(project_id));

CREATE POLICY "members_create_project_metrics" ON public.project_metrics
FOR INSERT WITH CHECK (public.can_access_project(project_id) AND auth.uid() = created_by);

-- Reports
CREATE POLICY "users_view_accessible_reports" ON public.reports
FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "users_manage_own_reports" ON public.reports
FOR ALL USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

-- Notifications
CREATE POLICY "users_manage_own_notifications" ON public.notifications
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- User Activity Logs
CREATE POLICY "users_view_own_activity" ON public.user_activity_logs
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "system_create_activity_logs" ON public.user_activity_logs
FOR INSERT WITH CHECK (user_id = auth.uid());

-- Project Templates
CREATE POLICY "users_view_accessible_templates" ON public.project_templates
FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "users_manage_own_templates" ON public.project_templates
FOR ALL USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

-- Task Dependencies
CREATE POLICY "users_view_task_dependencies" ON public.task_dependencies
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.tasks t 
        WHERE t.id = task_id AND public.can_access_project(t.project_id)
    )
);

CREATE POLICY "members_manage_task_dependencies" ON public.task_dependencies
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.tasks t 
        WHERE t.id = task_id AND public.can_access_project(t.project_id)
    )
) WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.tasks t 
        WHERE t.id = task_id AND public.can_access_project(t.project_id)
    )
);

-- Time Entries
CREATE POLICY "users_view_project_time_entries" ON public.time_entries
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.tasks t 
        WHERE t.id = task_id AND public.can_access_project(t.project_id)
    )
);

CREATE POLICY "users_manage_own_time_entries" ON public.time_entries
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 12. Additional Helper Functions
CREATE OR REPLACE FUNCTION public.get_project_completion_rate(project_uuid UUID)
RETURNS NUMERIC
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND((COUNT(*) FILTER (WHERE status = 'completed')) * 100.0 / COUNT(*), 2)
    END
FROM public.tasks 
WHERE project_id = project_uuid
$$;

CREATE OR REPLACE FUNCTION public.get_user_task_count(user_uuid UUID, task_status_filter public.task_status DEFAULT NULL)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT COUNT(*)::INTEGER
FROM public.tasks t
JOIN public.projects p ON t.project_id = p.id
WHERE t.assigned_to = user_uuid 
  AND public.can_access_project(p.id)
  AND (task_status_filter IS NULL OR t.status = task_status_filter)
$$;

CREATE OR REPLACE FUNCTION public.log_user_activity(
    action_name TEXT,
    resource_type_param TEXT DEFAULT NULL,
    resource_id_param UUID DEFAULT NULL,
    metadata_param JSONB DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_activity_logs (
        user_id, action, resource_type, resource_id, metadata
    ) VALUES (
        auth.uid(), action_name, resource_type_param, resource_id_param, metadata_param
    );
END;
$$;

-- 13. Update triggers for new tables
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON public.reports
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_project_templates_updated_at
    BEFORE UPDATE ON public.project_templates
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 14. Views for Analytics
CREATE VIEW public.project_analytics AS
SELECT 
    p.id,
    p.name,
    p.status,
    p.progress,
    p.owner_id,
    p.start_date,
    p.due_date,
    COUNT(DISTINCT pm.user_id) as member_count,
    COUNT(DISTINCT t.id) as total_tasks,
    COUNT(DISTINCT t.id) FILTER (WHERE t.status = 'completed') as completed_tasks,
    public.get_project_completion_rate(p.id) as completion_rate,
    COALESCE(SUM(te.hours_spent), 0) as total_hours_logged,
    p.created_at,
    p.updated_at
FROM public.projects p
LEFT JOIN public.project_members pm ON p.id = pm.project_id
LEFT JOIN public.tasks t ON p.id = t.project_id
LEFT JOIN public.time_entries te ON t.id = te.task_id
WHERE public.can_access_project(p.id)
GROUP BY p.id, p.name, p.status, p.progress, p.owner_id, p.start_date, p.due_date, p.created_at, p.updated_at;

CREATE VIEW public.user_dashboard_stats AS
SELECT 
    up.id,
    up.full_name,
    up.email,
    public.get_user_task_count(up.id) as total_assigned_tasks,
    public.get_user_task_count(up.id, 'completed') as completed_tasks,
    public.get_user_task_count(up.id, 'in-progress') as in_progress_tasks,
    public.get_user_task_count(up.id, 'todo') as todo_tasks,
    COUNT(DISTINCT pm.project_id) as active_projects,
    COUNT(DISTINCT n.id) FILTER (WHERE n.is_read = false) as unread_notifications
FROM public.user_profiles up
LEFT JOIN public.project_members pm ON up.id = pm.user_id
LEFT JOIN public.notifications n ON up.id = n.user_id
WHERE up.id = auth.uid()
GROUP BY up.id, up.full_name, up.email;