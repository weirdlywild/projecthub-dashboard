# Project Structure & Organization

## Directory Layout

```
projecthub-dashboard/
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
├── _app.tsx              # App wrapper with providers (Redux, Auth)
├── _document.tsx         # HTML document structure
├── index.tsx             # Home page (dashboard overview)
├── login.tsx             # Authentication page
├── analytics-reports.tsx  # Data visualization
├── search-discovery.tsx   # Search functionality
├── integrations-hub.tsx   # Third-party integrations
├── project-dashboard.tsx  # Individual project management
└── 404.tsx               # Custom 404 page
```

**Pattern**: Each Next.js page imports and wraps a component from `src/pages/` with `ErrorBoundary`.

## Source Directory (`src/`)

### Components (`src/components/`)
```
src/components/
├── ui/                   # Base UI components (buttons, inputs, etc.)
├── AppIcon.tsx           # Icon component wrapper
├── AppImage.tsx          # Image component wrapper
├── ErrorBoundary.tsx     # Error boundary wrapper
└── ScrollToTop.tsx       # Scroll utility component
```

**Patterns**:
- **Base components** in `ui/` for reusable UI elements
- **Feature components** in root for app-specific functionality
- Use `.tsx` extension for components

### Pages (`src/pages/`)
```
src/pages/
├── analytics-reports/    # Analytics page components
├── dashboard-overview/   # Dashboard page components
├── integrations-hub/     # Integrations page components
├── login/                # Login page components
├── project-dashboard/    # Project page components
├── search-discovery/     # Search page components
└── NotFound.tsx          # 404 page component
```

**Patterns**:
- Each page has its own folder containing `index.tsx` as main component
- Related components, hooks, or utilities can be co-located in page folders
- Page components are imported by corresponding Next.js pages

### Contexts (`src/contexts/`)
```
src/contexts/
└── AuthContext.tsx       # Authentication context provider
```

**Pattern**: React Context for local state management (authentication, theme, etc.)

### Store (`src/store/`)
```
src/store/
└── store.ts              # Redux Toolkit store configuration
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
- Import order: `tailwind.css` then `index.css` in `_app.tsx`

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
├── authService.ts        # Authentication utilities
├── cn.ts                 # Tailwind class merging utility
├── integrationService.ts # Integration API calls
├── projectService.ts     # Project API calls
├── supabaseClient.ts     # Supabase client configuration
└── taskService.ts        # Task management utilities
```

**Patterns**:
- **API services** follow pattern `[feature]Service.ts`
- **Supabase client** centralized in `supabaseClient.ts`
- **Utility functions** like `cn.ts` for common operations

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
3. Page component in `src/pages/[feature]/index.tsx`

### Component Organization
- **Base components**: `src/components/ui/` for reusable UI
- **Feature components**: `src/components/` for app-specific functionality  
- **Page components**: `src/pages/` for route-level components

### State Management
- **Global state**: Redux Toolkit for app-wide state
- **Authentication**: React Context (`AuthContext`) for user state
- **Local state**: React hooks (`useState`, `useReducer`) for component state

### Service Layer
- **API services** in `src/utils/` following `[feature]Service.ts` pattern
- **Supabase client** centralized in `src/utils/supabaseClient.ts`
- **Utility functions** for common operations

## Adding New Routes

### 1. Create Page Component
```tsx
// src/pages/new-feature/index.tsx
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
```tsx
// pages/new-feature.tsx
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
- **Pages**: `kebab-case.tsx` in `pages/`, `index.tsx` in `src/pages/`
- **Components**: `PascalCase.tsx` for TypeScript components
- **Services**: `camelCaseService.ts` for TypeScript services
- **Utilities**: `camelCase.ts` for TypeScript utilities
- **Types**: `camelCase.ts` for TypeScript definitions
- **Styles**: `kebab-case.css`

## Import Patterns
- Use relative imports for local files
- Absolute imports configured via `tsconfig.json` with path mapping
- Import order: external libraries, then internal modules
- Use `cn()` utility from `src/utils/cn.ts` for conditional classes
- TypeScript imports: `import type { TypeName } from '@/types'` for type-only imports