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
- **Authentication** - Secure Supabase-powered user authentication with route protection
  - Higher-Order Component (HOC) pattern for protected routes
  - Automatic redirect to login for unauthenticated users
  - Loading states and seamless user experience

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with SSR, SSG, and file-based routing
- **React 18** - Modern React with concurrent features and improved rendering
- **TypeScript** - Full TypeScript support with comprehensive type definitions
- **JavaScript (JSX)** - Gradual migration from JavaScript to TypeScript

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
- **TypeScript 5.0** - Static type checking with comprehensive type definitions
- **React Hook Form** - Efficient form handling and validation
- **date-fns** - Date manipulation utilities
- **clsx + tailwind-merge** - Conditional className utility (`cn` function)
- **ESLint** - Code linting with Next.js configuration
- **VS Code Configuration** - Optimized development environment with TypeScript settings

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

### Protected Routes (Require Authentication)
- `/` - Dashboard Overview (home page) 🔒
- `/dashboard-overview` - Main dashboard with project metrics 🔒
- `/analytics-reports` - Data visualization and reporting 🔒
- `/search-discovery` - Project and resource search 🔒
- `/integrations-hub` - Third-party integrations management 🔒
- `/project-dashboard` - Individual project management 🔒

### Public Routes
- `/login` - User authentication
- `/404` - Custom error page

**Note**: All protected routes automatically redirect unauthenticated users to `/login`.

## 🧪 Development Scripts

```bash
# Development
npm run dev        # Start Next.js dev server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint for code quality
```

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
- **Robust Authentication** - Comprehensive route protection with seamless user experience
  - Higher-Order Component pattern for consistent authentication
  - Automatic session management and redirect handling
  - Loading states and error boundaries for reliability

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