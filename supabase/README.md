# Supabase Database Setup

This document provides quick setup instructions for the ProjectHub Dashboard database. For complete database documentation, see [docs/DATABASE.md](../docs/DATABASE.md).

## Quick Setup

## Migration Files

The database includes two migration files that should be applied in order:

### 1. Core Schema (`20250127093500_project_management_with_auth.sql`)
- **User Management** - Profiles, roles, and authentication integration
- **Project Management** - Projects, tasks, team members, and activities
- **Integrations** - Third-party service connections and status tracking
- **Row Level Security** - Comprehensive RLS policies for secure data access
- **Helper Functions** - Project access control and role management utilities

### 2. Analytics Enhancement (`20250127094000_analytics_and_reporting.sql`)
- **Advanced Analytics** - Project metrics, completion rates, and performance tracking
- **Reporting System** - Custom reports with flexible configuration and sharing
- **Notifications** - Real-time alerts and activity notifications
- **Time Tracking** - Task-based time logging and project hour tracking
- **Project Templates** - Reusable project structures for quick setup
- **Task Dependencies** - Complex task relationship management
- **Analytics Views** - Pre-built views for dashboard and reporting queries

**Note**: The core migration file contains only the schema definition. Sample data is included in the analytics migration for testing purposes.

### 3. Admin User Setup (`seed.sql`)
- **System Administrator** - Creates a default admin user for initial system access
- **Role Management** - Automatically assigns admin privileges with full system access
- **Safe Execution** - Handles duplicate user creation gracefully with proper error handling
- **Profile Integration** - Creates corresponding user profile via database triggers
- **Enhanced Validation** - Comprehensive field mapping and duplicate prevention

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

## Recent Updates

- **Schema Cleanup** - Core migration file now contains only schema definition (mock data removed)
- **Production Ready** - Clean separation between schema and test data
- **Enhanced Security** - Comprehensive RLS policies across all tables
- **Performance Optimized** - Strategic indexing for frequently queried columns

This database structure provides a solid foundation for the ProjectHub Dashboard with room for future enhancements and scaling.

## Admin User Setup

The `seed.sql` script creates a default system administrator account:

- **Email**: `admin@projecthub.com`
- **Password**: `Admin123!`
- **Role**: `admin`
- **Full Name**: `System Administrator`

### Features:
- **Safe Execution** - Handles duplicate user creation gracefully
- **Automatic Profile** - Creates corresponding user profile via trigger
- **Admin Privileges** - Assigns admin role for full system access
- **Error Handling** - Provides clear feedback on execution status
- **Enhanced Validation** - Comprehensive field mapping and duplicate prevention

### Usage:
```bash
# Apply admin user seed
supabase db reset --db-url "your-supabase-db-url" --file supabase/seed.sql
```

## Complete Documentation

For detailed database schema, table structures, and usage examples, see the complete documentation at [docs/DATABASE.md](../docs/DATABASE.md).