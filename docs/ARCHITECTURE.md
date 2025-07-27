# Project Architecture & Structure

## Directory Layout

```
projecthub-dashboard/
├── docs/                  # Documentation files
├── pages/                 # Next.js pages (file-based routing)
├── src/                   # Source code
├── public/                # Static assets
├── supabase/              # Database migrations
├── .kiro/                 # Kiro AI assistant configuration
└── [config files]         # Various configuration files
```

## Pages Directory (`pages/`)
Next.js file-based routing - each file becomes a route:

```
pages/
├── _app.js               # App wrapper with providers (Redux, Auth)
├── _document.js          # HTML document structure
├── index.js              # Home page (routes to dashboard-overview)
├── login.js              # Authentication page
├── dashboard-overview.js # Main dashboard
├── analytics-reports.js  # Data visualization
├── search-discovery.js   # Search functionality
├── integrations-hub.js   # Third-party integrations
├── project-dashboard.js  # Individual project management
└── 404.js                # Custom 404 page
```

**Pattern**: Each Next.js page imports and wraps a component from `src/pages/` with `ErrorBoundary`.

## Source Directory (`src/`)

### Components (`src/components/`)
```
src/components/
├── ui/                   # Base UI components (buttons, inputs, etc.)
├── AppIcon.jsx           # Icon component wrapper
├── AppImage.jsx          # Image component wrapper
├── ErrorBoundary.jsx     # Error boundary wrapper
└── ScrollToTop.jsx       # Scroll utility component
```

**Patterns**:
- **Base components** in `ui/` for reusable UI elements
- **Feature components** in root for app-specific functionality
- Use `.jsx` extension for components

### Pages (`src/pages/`)
```
src/pages/
├── analytics-reports/    # Analytics page components
├── dashboard-overview/   # Dashboard page components
├── integrations-hub/     # Integrations page components
├── login/                # Login page components
├── project-dashboard/    # Project page components
├── search-discovery/     # Search page components
└── NotFound.jsx          # 404 page component
```

**Patterns**:
- Each page has its own folder containing `index.jsx` as main component
- Related components, hooks, or utilities can be co-located in page folders
- Page components are imported by corresponding Next.js pages

### Contexts (`src/contexts/`)
```
src/contexts/
└── AuthContext.jsx       # Authentication context provider
```

**Pattern**: React Context for local state management (authentication, theme, etc.)

### Store (`src/store/`)
```
src/store/
└── store.js              # Redux Toolkit store configuration
```

**Pattern**: Centralized Redux store for global state management

### Styles (`src/styles/`)
```
src/styles/
├── index.css             # Base styles and utilities
└── tailwind.css          # Tailwind imports and CSS variables
```

**Patterns**:
- `tailwind.css` contains CSS custom properties for design system
- Import order: `tailwind.css` then `index.css` in `_app.js`

### Types (`src/types/`)
```
src/types/
└── index.ts              # Comprehensive TypeScript type definitions
```

**Patterns**:
- **Centralized types** in `index.ts` for all application interfaces
- **Domain-specific types** for User, Project, Task, Integration entities
- **Component prop types** for consistent UI component interfaces
- **API response types** for type-safe service layer interactions

### Utils (`src/utils/`)
```
src/utils/
├── authService.js        # Authentication utilities
├── cn.js                 # Tailwind class merging utility
├── integrationService.js # Integration API calls
├── projectService.js     # Project API calls
├── supabaseClient.js     # Supabase client configuration
└── taskService.js        # Task management utilities
```

**Patterns**:
- **API services** follow pattern `[feature]Service.js`
- **Supabase client** centralized in `supabaseClient.js`
- **Utility functions** like `cn.js` for common operations

## Public Directory (`public/`)
```
public/
├── assets/               # Images and icons
├── favicon.ico           # Site favicon
├── manifest.json         # PWA manifest
└── robots.txt            # SEO robots file
```

## Architecture Patterns

### Page Structure
1. Next.js page in `pages/` directory
2. Wraps component from `src/pages/` with `ErrorBoundary`
3. Page component in `src/pages/[feature]/index.jsx`

### Component Organization
- **Base components**: `src/components/ui/` for reusable UI
- **Feature components**: `src/components/` for app-specific functionality  
- **Page components**: `src/pages/` for route-level components

### State Management
- **Global state**: Redux Toolkit for app-wide state
- **Authentication**: React Context (`AuthContext`) for user state
- **Local state**: React hooks (`useState`, `useReducer`) for component state

### Service Layer
- **API services** in `src/utils/` following `[feature]Service.js` pattern
- **Supabase client** centralized in `src/utils/supabaseClient.js`
- **Utility functions** for common operations

## Authentication Architecture

The application implements a comprehensive authentication system using React Context and Higher-Order Components:

### Authentication Flow
1. **AuthContext** (`src/contexts/AuthContext.jsx`) manages user state and session
2. **AuthGuard** (`src/components/AuthGuard.jsx`) handles route protection logic
3. **withAuth HOC** (`src/components/withAuth.jsx`) wraps protected components
4. **Automatic redirects** to `/login` for unauthenticated users

### Protected Route Implementation
```jsx
// pages/protected-page.js
import ProtectedPage from '../src/pages/protected-page';
import withAuth from '../src/components/withAuth';

export default withAuth(ProtectedPage);
```

### Authentication Components
- **`withAuth`** - Higher-Order Component that combines ErrorBoundary and AuthGuard
- **`AuthGuard`** - Handles authentication checks, loading states, and redirects
- **`AuthContext`** - Provides user state and authentication methods throughout the app

### User Experience Features
- **Loading states** during authentication checks
- **Seamless redirects** for unauthenticated users
- **Session persistence** across browser sessions
- **Error boundaries** for graceful error handling

## Adding New Routes

### 1. Create Page Component
```jsx
// src/pages/new-feature/index.jsx
const NewFeaturePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">New Feature</h1>
      {/* Component content */}
    </div>
  );
};
export default NewFeaturePage;
```

### 2. Create Next.js Page
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

## File Naming Conventions
- **Pages**: `kebab-case.js` in `pages/`, `index.jsx` in `src/pages/`
- **Components**: `PascalCase.jsx` or `PascalCase.tsx` for TypeScript
- **Services**: `camelCaseService.js` or `camelCaseService.ts` for TypeScript
- **Utilities**: `camelCase.js` or `camelCase.ts` for TypeScript
- **Types**: `camelCase.ts` for TypeScript definitions
- **Styles**: `kebab-case.css`

## Import Patterns
- Use relative imports for local files
- Absolute imports configured via `tsconfig.json` with path mapping
- Import order: external libraries, then internal modules
- Use `cn()` utility from `src/utils/cn.js` for conditional classes
- TypeScript imports: `import type { TypeName } from '@/types'` for type-only imports