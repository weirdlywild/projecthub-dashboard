# Technology Stack & Build System

## Frontend Framework
- **Next.js 14** - React framework with SSR, SSG, and file-based routing
- **React 18** - Modern React with concurrent features and improved rendering
- **TypeScript 5.0** - Full TypeScript support with comprehensive type definitions

## State Management & Routing
- **Redux Toolkit** - Simplified Redux for global state management
- **React Context** - Local state management (AuthContext pattern)
- **Next.js Router** - File-based routing with `useRouter` hook

## Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework with extensive customization
- **CSS Custom Properties** - Design system with CSS variables in `src/styles/tailwind.css`
- **Framer Motion** - Smooth UI animations and transitions
- **Lucide React** - Modern icon library
- **Class Variance Authority** - Component variant management
- **clsx + tailwind-merge** - Conditional className utility (`cn` function)

## Backend & Data
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
- **D3.js** - Advanced data visualization capabilities
- **Recharts** - React-based charting library
- **Axios** - HTTP client for API requests

## Development Tools
- **TypeScript 5.0** - Static type checking with comprehensive type definitions
- **React Hook Form** - Efficient form handling and validation
- **date-fns** - Date manipulation utilities
- **ESLint** - Code linting with Next.js configuration

## Critical Dependencies
⚠️ **DO NOT REMOVE OR MODIFY** these dependencies (marked as rocketCritical):
- `@dhiwise/component-tagger`
- `react`, `react-dom`
- `@reduxjs/toolkit`, `redux`
- `next`
- `tailwindcss`, `autoprefixer`, `postcss`

## Common Commands

### Development
```bash
npm run dev        # Start Next.js dev server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint for code quality
```

### Environment Setup
```bash
# Copy environment template
cp .env.local.example .env.local

# Required environment variables:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Installation
```bash
npm install        # Install all dependencies
```

## Configuration Files
- **`next.config.js`** - Next.js configuration with Supabase environment variables
- **`tailwind.config.js`** - Tailwind CSS configuration with custom theme
- **`postcss.config.js`** - PostCSS configuration for Tailwind processing
- **`tsconfig.json`** - TypeScript configuration with path mapping and strict type checking
- **`package.json`** - Dependencies and scripts with rocketCritical warnings

## Deployment
- **Recommended**: Vercel deployment (optimized for Next.js)
- **Production build**: `npm run build && npm run start`
- **Environment variables**: Ensure Supabase keys are set in deployment platform