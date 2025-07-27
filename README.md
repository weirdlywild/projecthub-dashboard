# ProjectHub Dashboard

A modern React-based project management dashboard that provides comprehensive project oversight, analytics, and team collaboration features. Built with Next.js 14 and powered by Supabase for real-time data management.

## 🚀 Core Features

- **Dashboard Overview** - Central hub for project metrics and status tracking
- **Analytics & Reports** - Advanced data visualization with D3.js and Recharts
  - Real-time project metrics and performance tracking
  - Customizable reports (daily, weekly, monthly, quarterly)
  - User activity analytics and time tracking
  - Project completion rates and progress visualization
- **Search & Discovery** - Powerful project and resource discovery tools
- **Integrations Hub** - Third-party service connections and management
- **Project Management** - Individual project dashboards with detailed tracking
  - Task dependencies and workflow management
  - Time tracking and logging capabilities
  - Project templates for quick setup
- **Notifications System** - Real-time alerts and updates
  - Task assignments and deadline reminders
  - Project status updates and integration alerts
- **Authentication** - Secure Supabase-powered user authentication and profiles

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with SSR, SSG, and file-based routing
- **React 18** - Modern React with concurrent features and improved rendering
- **JavaScript (JSX)** - No TypeScript, uses JSX for component development

### State Management & Routing
- **Redux Toolkit** - Simplified Redux for global state management
- **React Context** - Local state management (AuthContext pattern)
- **Next.js Router** - File-based routing with `useRouter` hook

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework with extensive customization
- **CSS Custom Properties** - Design system with CSS variables
- **Framer Motion** - Smooth UI animations and transitions
- **Lucide React** - Modern icon library

### Data & Visualization
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
  - Advanced analytics schema with project metrics, reports, and notifications
  - Row Level Security (RLS) for secure data access
  - Real-time subscriptions for live updates
- **D3.js** - Advanced data visualization capabilities
- **Recharts** - React-based charting library
- **Axios** - HTTP client for API requests

### Development Tools
- **React Hook Form** - Efficient form handling and validation
- **date-fns** - Date manipulation utilities
- **clsx + tailwind-merge** - Conditional className utility (`cn` function)
- **ESLint** - Code linting with Next.js configuration

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd projecthub-dashboard
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Available Pages

The application includes the following routes:

- `/` - Dashboard Overview (home page)
- `/login` - User authentication
- `/dashboard-overview` - Main dashboard with project metrics
- `/analytics-reports` - Data visualization and reporting
- `/search-discovery` - Project and resource search
- `/integrations-hub` - Third-party integrations management
- `/project-dashboard` - Individual project management
- `/404` - Custom error page

## 📁 Project Structure

```
projecthub-dashboard/
├── pages/                 # Next.js pages (file-based routing)
│   ├── _app.js           # App wrapper with providers
│   ├── _document.js      # HTML document structure
│   ├── index.js          # Home page (dashboard-overview)
│   ├── login.js          # Authentication page
│   ├── dashboard-overview.js
│   ├── analytics-reports.js
│   ├── search-discovery.js
│   ├── integrations-hub.js
│   ├── project-dashboard.js
│   └── 404.js            # Custom 404 page
├── public/               # Static assets and manifest
│   ├── assets/          # Images and icons
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base UI components (buttons, inputs, etc.)
│   │   ├── AppIcon.jsx   # Icon component wrapper
│   │   ├── AppImage.jsx  # Image component wrapper
│   │   ├── ErrorBoundary.jsx
│   │   └── ScrollToTop.jsx
│   ├── contexts/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Page-level components
│   │   ├── analytics-reports/
│   │   ├── dashboard-overview/
│   │   ├── integrations-hub/
│   │   ├── login/
│   │   ├── project-dashboard/
│   │   ├── search-discovery/
│   │   └── NotFound.jsx
│   ├── store/            # Redux store configuration
│   │   └── store.js      # Redux Toolkit store with placeholder reducer
│   ├── styles/           # Global styles
│   │   ├── index.css     # Base styles and utilities
│   │   └── tailwind.css  # Tailwind imports and CSS variables
│   └── utils/            # Utility functions and services
│       ├── authService.js        # Authentication utilities
│       ├── cn.js                 # Tailwind class merging utility
│       ├── integrationService.js # Integration API calls
│       ├── projectService.js     # Project management API
│       ├── supabaseClient.js     # Supabase client configuration
│       └── taskService.js        # Task management utilities
├── supabase/             # Database migrations and schema
│   ├── migrations/       # SQL migration files
│   │   ├── 20250127093500_project_management_with_auth.sql
│   │   └── 20250127094000_analytics_and_reporting.sql
│   └── README.md         # Supabase setup documentation
├── .kiro/                # Kiro AI assistant configuration
├── .env.local            # Environment variables (Supabase keys)
├── .env.local.example    # Environment variables template
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

## 🏗️ Architecture Patterns

### Page Structure
- Each page has its own folder in `src/pages/` containing an `index.jsx` as the main component
- Related components, hooks, or utilities can be co-located in page folders
- Next.js pages in `pages/` directory import and wrap components from `src/pages/`

### Component Organization
- **Base components** in `src/components/ui/` for reusable UI elements
- **Feature components** in `src/components/` for app-specific functionality  
- **Page components** in `src/pages/` for route-level components

### State Management
- **Global state**: Redux Toolkit for app-wide state management (currently configured with placeholder reducer)
- **Authentication**: React Context (`AuthContext`) for user state
- **Local state**: React hooks (`useState`, `useReducer`) for component state

### Service Layer
- **API services** in `src/utils/` following the pattern `[feature]Service.js`
  - `projectService.js` - Project CRUD operations and analytics
  - `taskService.js` - Task management and time tracking
  - `authService.js` - Authentication and user management
  - `integrationService.js` - Third-party service connections
  - Future services: `analyticsService.js`, `notificationService.js`, `reportService.js`
- **Supabase client** centralized in `src/utils/supabaseClient.js`
- **Utility functions** like `cn.js` for common operations

## 🗄️ Database Schema & Analytics

### Core Database Tables

The application uses Supabase with a comprehensive schema for project management and analytics:

#### Project Management Tables
- **`projects`** - Core project information with status tracking
- **`project_members`** - User-project relationships and permissions
- **`tasks`** - Individual tasks with assignments and dependencies
- **`task_dependencies`** - Task dependency relationships
- **`user_profiles`** - Extended user information and preferences

#### Analytics & Reporting Tables
- **`project_metrics`** - Real-time project performance metrics
  - Task completion rates, user activity, integration usage
  - Time-series data for trend analysis
- **`reports`** - Saved analytics reports and configurations
  - Daily, weekly, monthly, quarterly, and custom reports
  - Public and private report sharing
- **`notifications`** - Real-time user notifications
  - Task assignments, deadline reminders, project updates
- **`user_activity_logs`** - Comprehensive user action tracking
- **`time_entries`** - Time tracking for tasks and projects
- **`project_templates`** - Reusable project templates

### Analytics Views & Functions

#### Database Views
- **`project_analytics`** - Aggregated project statistics
  - Member count, task completion rates, hours logged
  - Real-time project health metrics
- **`user_dashboard_stats`** - Personal dashboard statistics
  - Task counts by status, active projects, unread notifications

#### Helper Functions
- **`get_project_completion_rate()`** - Calculate project completion percentage
- **`get_user_task_count()`** - Count user tasks with optional status filtering
- **`log_user_activity()`** - Log user actions for analytics
- **`can_access_project()`** - Check user project access permissions

### Row Level Security (RLS)

All tables implement comprehensive RLS policies:
- Users can only access projects they're members of
- Personal data (notifications, activity logs) is user-scoped
- Public templates and reports are accessible to all users
- Time entries and metrics respect project access permissions

### Sample Data

The migration includes sample data for development:
- Demo projects with realistic task structures
- Sample users with different roles (admin, manager, members)
- Analytics metrics and time tracking entries
- Notification examples and project templates

## 🧩 Adding New Routes

To add a new route to the application:

1. **Create the page component:**
   ```jsx
   // src/pages/new-feature/index.jsx
   const NewFeaturePage = () => {
     return (
       <div className="container mx-auto p-6">
         <h1 className="text-2xl font-semibold">New Feature</h1>
         {/* Your component content */}
       </div>
     );
   };
   export default NewFeaturePage;
   ```

2. **Create the Next.js page:**
   ```jsx
   // pages/new-feature.js
   import NewFeaturePage from '../src/pages/new-feature';
   import ErrorBoundary from '../src/components/ErrorBoundary';

   export default function NewFeature() {
     return (
       <ErrorBoundary>
         <NewFeaturePage />
       </ErrorBoundary>
     );
   }
   ```

## 🎨 Styling & Design System

### Tailwind CSS Configuration
The project uses Tailwind CSS 3.4 with extensive customization:

- **Design System**: CSS custom properties for consistent theming
- **Typography**: Inter font family with fluid typography scaling
- **Color Palette**: Comprehensive color system with semantic naming
- **Animations**: Custom animations with `tailwindcss-animate`
- **Responsive Design**: Mobile-first approach with custom breakpoints

### Key Tailwind Plugins
- `@tailwindcss/forms` - Enhanced form styling
- `@tailwindcss/typography` - Rich text formatting
- `@tailwindcss/aspect-ratio` - Responsive aspect ratios
- `@tailwindcss/container-queries` - Component-level responsive design
- `tailwindcss-animate` - Animation utilities
- `tailwindcss-fluid-type` - Responsive typography scaling

### CSS Custom Properties
The design system uses CSS variables defined in `src/styles/tailwind.css`:
```css
:root {
  --color-primary: #1e40af;        /* Deep blue */
  --color-secondary: #64748b;      /* Slate gray */
  --color-accent: #0ea5e9;         /* Sky blue */
  --color-background: #fefefe;     /* Warm off-white */
  --color-foreground: #1f2937;     /* Rich charcoal */
  /* ... additional color variables */
}
```

### Utility Functions
- `cn()` function in `src/utils/cn.js` for conditional class merging
- Combines `clsx` and `tailwind-merge` for optimal class handling


## 🧪 Development Scripts

```bash
# Development
npm run dev        # Start Next.js dev server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint for code quality
```

### Database Development

The project includes comprehensive database migrations in `supabase/migrations/`:

1. **Base Schema** (`20250127093500_project_management_with_auth.sql`)
   - Core project management tables
   - User authentication and profiles
   - Basic task and project structures

2. **Analytics Enhancement** (`20250127094000_analytics_and_reporting.sql`)
   - Advanced analytics tables and metrics
   - Notification system and user activity tracking
   - Time tracking and project templates
   - Comprehensive RLS policies and helper functions

To apply migrations to your Supabase project:
```bash
# Using Supabase CLI (recommended)
supabase db push

# Or apply manually through Supabase Dashboard SQL Editor
```

## 🔧 Configuration Files

- **`next.config.js`** - Next.js configuration with Supabase environment variables
- **`tailwind.config.js`** - Tailwind CSS configuration with custom theme
- **`postcss.config.js`** - PostCSS configuration for Tailwind processing
- **`jsconfig.json`** - JavaScript project configuration for absolute imports

## 📦 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Vercel Deployment (Recommended)
This project is optimized for Vercel deployment:

```bash
npm install -g vercel
vercel
```

### Environment Variables for Production
Ensure these environment variables are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎯 Target Users

Development teams and project managers who need:
- Centralized project visibility and tracking
- Real-time analytics and reporting
- Team coordination and collaboration tools
- Integration with development workflows

## 🔑 Key Value Propositions

- **Real-time Insights** - Live project metrics and status updates with comprehensive analytics
  - Project completion rates and performance tracking
  - User activity monitoring and time tracking
  - Customizable reports and data visualization
- **Advanced Analytics** - Deep project intelligence and reporting
  - Task dependency tracking and workflow optimization
  - Team productivity metrics and resource allocation
  - Historical data analysis and trend identification
- **Smart Notifications** - Contextual alerts and updates
  - Task assignments and deadline management
  - Project milestone notifications
  - Integration status alerts
- **Seamless Integrations** - Connect with your existing development tools
- **Responsive Design** - Optimized for desktop and mobile use
- **Modern UI/UX** - Intuitive interface built with latest design principles
- **Secure & Scalable** - Powered by Supabase for enterprise-grade security with RLS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js 14 and React 18
- Styled with Tailwind CSS 3.4
- Backend by Supabase
- Icons by Lucide React
- Data visualization by D3.js and Recharts

Built with ❤️ for modern development teams
