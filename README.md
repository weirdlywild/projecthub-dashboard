# ProjectHub Dashboard

A modern React-based project management dashboard that provides comprehensive project oversight, analytics, and team collaboration features. Built with Next.js 14 and powered by Supabase for real-time data management.

## 📚 Documentation

Complete documentation is available in the [`docs/`](./docs/) folder:

- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Features, setup, and quick start guide
- **[Authentication Guide](./docs/AUTHENTICATION.md)** - Complete authentication system documentation
- **[Database Schema](./docs/DATABASE.md)** - Supabase database structure and migrations
- **[Architecture](./docs/ARCHITECTURE.md)** - Project structure and architectural patterns

For a quick start, see the [Project Overview](./docs/PROJECT_OVERVIEW.md).

## 🚀 Key Features

- **Dashboard Overview** - Central hub for project metrics and status tracking
- **Analytics & Reports** - Advanced data visualization with real-time insights
- **Search & Discovery** - Powerful project and resource discovery tools
- **Integrations Hub** - Third-party service connections and management
- **Project Management** - Individual project dashboards with detailed tracking
- **Authentication** - Secure Supabase-powered user authentication with route protection

## 🛠️ Tech Stack

- **Next.js 14** + **React 18** - Modern React framework with SSR/SSG
- **Tailwind CSS 3.4** - Utility-first styling with custom design system
- **Supabase** - Backend-as-a-Service with authentication and real-time database
- **Redux Toolkit** - Global state management
- **D3.js** + **Recharts** - Advanced data visualization

## ⚡ Quick Start

```bash
# Clone and install
git clone <repository-url>
cd projecthub-dashboard
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Apply database migrations
supabase db push

# Create admin user (optional)
supabase db reset --db-url "your-supabase-db-url" --file supabase/seed.sql

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Admin Account
After running the admin seed script, you can login with:
- **Email**: `admin@projecthub.com`
- **Password**: `Admin123!`

## 📁 Project Structure

```
projecthub-dashboard/
├── docs/                  # 📚 Complete documentation
├── pages/                 # Next.js file-based routing
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── contexts/          # React Context providers
│   ├── utils/             # Services and utilities
│   └── styles/            # Global styles
├── supabase/              # Database migrations
├── public/                # Static assets
└── [config files]         # Various configuration files
```

## 🔐 Authentication

All routes except `/login` and `/404` are protected by authentication guards using a Higher-Order Component pattern. The system provides:

- **Route Protection** - Automatic redirects for unauthenticated users
- **Session Management** - Persistent authentication across browser sessions  
- **Loading States** - Smooth loading indicators during auth checks
- **Error Boundaries** - Graceful error handling

See [Authentication Guide](./docs/AUTHENTICATION.md) for complete implementation details.

## 🗄️ Database

The application uses Supabase with a comprehensive schema across two migration files:

### Core Schema (`20250127093500_project_management_with_auth.sql`)
- **User Management** - Profiles, roles, and authentication integration
- **Project Management** - Projects, tasks, team members, and activities
- **Integrations** - Third-party service connections and status tracking
- **Row Level Security** - Comprehensive RLS policies for secure data access

### Analytics Enhancement (`20250127094000_analytics_and_reporting.sql`)
- **Advanced Analytics** - Project metrics, completion rates, and performance tracking
- **Reporting System** - Custom reports with flexible configuration
- **Notifications** - Real-time alerts and activity notifications
- **Time Tracking** - Task-based time logging and project hour tracking
- **Project Templates** - Reusable project structures for quick setup
- **Task Dependencies** - Complex task relationship management

### Admin User Setup (`create_admin.js`, `seed.sql` & `seed_admin.sql`)
- **JavaScript Script** - `create_admin.js` provides a modern Node.js approach using Supabase Auth API
- **SQL Scripts** - `seed.sql` and `seed_admin.sql` offer database-level admin user creation
- **System Administrator** - Creates a default admin user for initial system access
- **Role Management** - Automatically assigns admin privileges with full system access
- **Safe Execution** - Handles duplicate user creation gracefully with proper error handling
- **Profile Integration** - Creates corresponding user profile via database triggers

See [Database Schema](./docs/DATABASE.md) for complete table structures and usage examples.

## 🎯 Target Users

Development teams and project managers who need centralized project visibility, real-time analytics, and team collaboration tools.

## 🔑 Key Features

- **Real-time Insights** - Live project metrics with comprehensive analytics
- **Advanced Reporting** - Customizable reports and data visualization  
- **Smart Notifications** - Contextual alerts for tasks and deadlines
- **Secure & Scalable** - Enterprise-grade security with Supabase RLS
- **Modern UI/UX** - Responsive design optimized for all devices

## 🧪 Development

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Database Management

```bash
# Apply migrations
supabase db push

# Reset database with migrations
supabase db reset

# Create admin user (multiple options)
# Option 1: Using JavaScript script (recommended)
node create_admin.js

# Option 2: Using SQL seed file
supabase db reset --db-url "your-supabase-db-url" --file supabase/seed.sql

# View database locally
supabase start
```

## 🚀 Deployment

Optimized for Vercel deployment. Ensure environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update relevant documentation in `docs/`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js 14, Tailwind CSS, and Supabase
