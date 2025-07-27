# Supabase Database Setup

This document provides quick setup instructions for the ProjectHub Dashboard database. For complete database documentation, see [docs/DATABASE.md](../docs/DATABASE.md).

## Quick Setup

## Migration Files

The database includes two migration files:

1. **Core Schema** (`20250127093500_project_management_with_auth.sql`)
   - User profiles and authentication
   - Projects, tasks, and team management
   - Basic integrations and activities

2. **Analytics Enhancement** (`20250127094000_analytics_and_reporting.sql`)
   - Advanced analytics and reporting
   - Notifications and activity logging
   - Time tracking and project templates

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
## Envi
ronment Setup

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

## Complete Documentation

For detailed database schema, table structures, and usage examples, see the complete documentation at [docs/DATABASE.md](../docs/DATABASE.md).