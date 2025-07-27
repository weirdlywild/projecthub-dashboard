# ProjectHub Dashboard - Database Schema

This document describes the complete database structure for the ProjectHub Dashboard application built with Supabase.

## Overview

The database is designed to support a comprehensive project management platform with the following core features:
- User authentication and profiles
- Project and task management
- Team collaboration
- Analytics and reporting
- Third-party integrations
- Time tracking
- Notifications

## Database Migrations

### 1. Core Schema (`20250127093500_project_management_with_auth.sql`)
The foundational schema including:
- User profiles and authentication
- Projects and project members
- Tasks and activities
- Integrations
- Row Level Security (RLS) policies

### 2. Analytics Enhancement (`20250127094000_analytics_and_reporting.sql`)
Extended functionality for:
- Project metrics and analytics
- Saved reports
- Notifications system
- User activity logging
- Project templates
- Task dependencies
- Time tracking

## Core Tables

### Authentication & Users

#### `user_profiles`
Extends Supabase auth.users with application-specific profile data.
```sql
- id (UUID, PK) → references auth.users(id)
- email (TEXT, UNIQUE)
- full_name (TEXT)
- role (user_role ENUM: admin, manager, member)
- avatar_url (TEXT)
- bio (TEXT)
- timezone (TEXT)
- created_at, updated_at (TIMESTAMPTZ)
```

### Project Management

#### `projects`
Core project information and status tracking.
```sql
- id (UUID, PK)
- name (TEXT)
- description (TEXT)
- status (project_status ENUM: planning, on-track, at-risk, delayed, completed, cancelled)
- progress (INTEGER 0-100)
- owner_id (UUID) → user_profiles(id)
- start_date, due_date (DATE)
- created_at, updated_at (TIMESTAMPTZ)
```

#### `project_members`
Junction table for project team membership.
```sql
- id (UUID, PK)
- project_id (UUID) → projects(id)
- user_id (UUID) → user_profiles(id)
- role (user_role ENUM)
- joined_at (TIMESTAMPTZ)
```

#### `tasks`
Individual tasks within projects.
```sql
- id (UUID, PK)
- project_id (UUID) → projects(id)
- title, description (TEXT)
- status (task_status ENUM: todo, in-progress, review, completed)
- priority (task_priority ENUM: low, medium, high, urgent)
- assigned_to (UUID) → user_profiles(id)
- created_by (UUID) → user_profiles(id)
- due_date, completed_at (TIMESTAMPTZ)
- created_at, updated_at (TIMESTAMPTZ)
```

#### `task_dependencies`
Task dependency relationships.
```sql
- id (UUID, PK)
- task_id (UUID) → tasks(id)
- depends_on_task_id (UUID) → tasks(id)
- created_at (TIMESTAMPTZ)
```

### Activity & Communication

#### `activities`
Project activity timeline and audit trail.
```sql
- id (UUID, PK)
- project_id (UUID) → projects(id)
- user_id (UUID) → user_profiles(id)
- type (activity_type ENUM: task, meeting, message, file, integration, milestone)
- title, description (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMPTZ)
```

#### `notifications`
User notification system.
```sql
- id (UUID, PK)
- user_id (UUID) → user_profiles(id)
- type (notification_type ENUM: task_assigned, task_completed, project_update, deadline_reminder, integration_alert)
- title, message (TEXT)
- metadata (JSONB)
- is_read (BOOLEAN)
- created_at (TIMESTAMPTZ)
```

### Analytics & Reporting

#### `project_metrics`
Quantitative project performance data.
```sql
- id (UUID, PK)
- project_id (UUID) → projects(id)
- metric_type (metric_type ENUM: task_completion, project_progress, user_activity, integration_usage, performance)
- value (NUMERIC)
- metadata (JSONB)
- recorded_at (TIMESTAMPTZ)
- created_by (UUID) → user_profiles(id)
```

#### `reports`
Saved analytics reports and dashboards.
```sql
- id (UUID, PK)
- name, description (TEXT)
- type (report_type ENUM: daily, weekly, monthly, quarterly, custom)
- config (JSONB)
- created_by (UUID) → user_profiles(id)
- is_public (BOOLEAN)
- created_at, updated_at (TIMESTAMPTZ)
```

#### `user_activity_logs`
Detailed user action tracking for analytics.
```sql
- id (UUID, PK)
- user_id (UUID) → user_profiles(id)
- action (TEXT)
- resource_type, resource_id (TEXT, UUID)
- metadata (JSONB)
- ip_address (INET)
- user_agent (TEXT)
- created_at (TIMESTAMPTZ)
```

### Time Tracking

#### `time_entries`
Time tracking for tasks and projects.
```sql
- id (UUID, PK)
- task_id (UUID) → tasks(id)
- user_id (UUID) → user_profiles(id)
- description (TEXT)
- hours_spent (NUMERIC)
- entry_date (DATE)
- created_at (TIMESTAMPTZ)
```

### Templates & Integrations

#### `project_templates`
Reusable project templates for quick setup.
```sql
- id (UUID, PK)
- name, description (TEXT)
- template_data (JSONB)
- created_by (UUID) → user_profiles(id)
- is_public (BOOLEAN)
- usage_count (INTEGER)
- created_at, updated_at (TIMESTAMPTZ)
```

#### `integrations`
Third-party service connections.
```sql
- id (UUID, PK)
- user_id (UUID) → user_profiles(id)
- service_name (TEXT)
- status (integration_status ENUM: connected, disconnected, syncing, error)
- config (JSONB)
- last_sync_at (TIMESTAMPTZ)
- created_at, updated_at (TIMESTAMPTZ)
```

## Custom Types (ENUMs)

```sql
-- User and project roles
user_role: 'admin', 'manager', 'member'

-- Project lifecycle
project_status: 'planning', 'on-track', 'at-risk', 'delayed', 'completed', 'cancelled'

-- Task management
task_status: 'todo', 'in-progress', 'review', 'completed'
task_priority: 'low', 'medium', 'high', 'urgent'

-- Activity tracking
activity_type: 'task', 'meeting', 'message', 'file', 'integration', 'milestone'

-- Analytics and reporting
metric_type: 'task_completion', 'project_progress', 'user_activity', 'integration_usage', 'performance'
report_type: 'daily', 'weekly', 'monthly', 'quarterly', 'custom'

-- Notifications
notification_type: 'task_assigned', 'task_completed', 'project_update', 'deadline_reminder', 'integration_alert'

-- Integrations
integration_status: 'connected', 'disconnected', 'syncing', 'error'
```

## Helper Functions

### Access Control Functions
- `is_project_member(project_uuid)` - Check if user is project member
- `is_project_owner(project_uuid)` - Check if user owns project
- `can_access_project(project_uuid)` - Check if user can access project
- `has_role(required_role)` - Check if user has specific role

### Analytics Functions
- `get_project_completion_rate(project_uuid)` - Calculate project completion percentage
- `get_user_task_count(user_uuid, status_filter)` - Count user's tasks by status
- `log_user_activity(action, resource_type, resource_id, metadata)` - Log user actions

## Views

### `project_analytics`
Comprehensive project analytics with calculated metrics:
- Project details and status
- Member count
- Task completion statistics
- Total hours logged
- Completion rate

### `user_dashboard_stats`
User-specific dashboard statistics:
- Task counts by status
- Active project count
- Unread notification count

## Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only access projects they're members of
- Users can only modify their own profiles and data
- Project owners have additional management permissions
- Public templates and reports are accessible to all users

## Clean Schema

The migrations contain only schema definitions without sample data:
- Database tables and relationships
- Custom types and enums
- Indexes for performance optimization
- Row Level Security (RLS) policies
- Helper functions and triggers
- Views for analytics and reporting

## Usage Examples

### Get User's Dashboard Data
```sql
SELECT * FROM user_dashboard_stats WHERE id = auth.uid();
```

### Get Project Analytics
```sql
SELECT * FROM project_analytics WHERE can_access_project(id);
```

### Log User Activity
```sql
SELECT log_user_activity('task_created', 'task', task_id, '{"task_title": "New Task"}'::jsonb);
```

### Check Project Access
```sql
SELECT can_access_project('project-uuid-here');
```

## Environment Setup

Ensure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Migration Commands

To apply migrations to your Supabase project:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

## Security Considerations

- All tables use Row Level Security (RLS)
- Authentication handled by Supabase Auth
- API keys should be kept secure
- User roles control access levels
- Activity logging for audit trails
- Sensitive data stored in JSONB metadata fields

## Performance Optimizations

- Comprehensive indexing on frequently queried columns
- Materialized views for complex analytics queries
- Efficient RLS policies to minimize data access
- JSONB for flexible metadata storage
- Proper foreign key relationships for data integrity

This database structure provides a solid foundation for the ProjectHub Dashboard with room for future enhancements and scaling.