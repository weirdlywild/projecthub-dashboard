# Development Environment Setup

This guide covers the development environment configuration and best practices for working on the ProjectHub Dashboard.

## IDE Configuration

### VS Code Settings

The project includes optimized VS Code settings in `.vscode/settings.json`:

```json
{
    "kiroAgent.configureMCP": "Disabled",
    "typescript.autoClosingTags": false
}
```

#### Key Settings Explained

- **`kiroAgent.configureMCP: "Disabled"`** - Disables Kiro AI assistant's Model Context Protocol configuration to prevent conflicts during development
- **`typescript.autoClosingTags: false`** - Disables automatic closing of JSX/TSX tags to give developers more control over tag completion

### Recommended VS Code Extensions

For optimal development experience, install these extensions:

- **TypeScript and JavaScript Language Features** (built-in)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**
- **Prettier - Code formatter**
- **ESLint**

## TypeScript Configuration

### Strict Type Checking

The project uses strict TypeScript configuration for maximum type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Import Patterns

Follow these import patterns for consistency:

```typescript
// Type-only imports (preferred for types)
import type { User, Project, AuthContextType } from '../types';

// Regular imports for components and utilities
import { useState, useEffect } from 'react';
import authService from '../utils/authService';

// Path mapping (when configured)
import type { User } from '@/types';
import { Button } from '@/components/ui/Button';
```

### Common TypeScript Issues and Solutions

#### Missing Type Declarations

**Issue**: `Cannot find module '../types' or its corresponding type declarations`

**Solution**: Ensure proper type-only imports:
```typescript
// ❌ Incorrect
import { User } from '../types';

// ✅ Correct
import type { User } from '../types';
```

#### Unused Variables

**Issue**: `'variable' is declared but its value is never read`

**Solution**: Remove unused variables or prefix with underscore:
```typescript
// ❌ Unused variable
const error = new Error('Something went wrong');

// ✅ Prefixed unused variable (if needed for debugging)
const _error = new Error('Something went wrong');

// ✅ Best - remove if truly unused
```

## Development Workflow

### Starting Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Code Quality Checks

Run these commands before committing:

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build test
npm run build
```

### File Organization

Follow the established patterns:

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base components (Button, Input, etc.)
│   └── [Feature].tsx    # Feature-specific components
├── contexts/            # React Context providers
├── pages/               # Page components (imported by Next.js pages)
├── store/               # Redux store configuration
├── styles/              # CSS and styling
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and services
```

### Component Development

#### TypeScript Component Template

```typescript
import React from 'react';
import type { ComponentProps } from '../types';

interface Props extends ComponentProps {
  // Additional props specific to this component
  customProp?: string;
}

const MyComponent: React.FC<Props> = ({ 
  children, 
  customProp,
  ...props 
}) => {
  return (
    <div {...props}>
      {children}
      {customProp && <span>{customProp}</span>}
    </div>
  );
};

export default MyComponent;
```

#### Service Layer Pattern

```typescript
import { supabase } from './supabaseClient';
import type { ApiResponse, EntityType } from '../types';

const entityService = {
  async getEntity(id: string): Promise<ApiResponse<EntityType>> {
    try {
      const { data, error } = await supabase
        .from('entities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      return { 
        success: false, 
        error: 'Failed to fetch entity' 
      };
    }
  }
};

export default entityService;
```

## Debugging

### Common Development Issues

1. **Supabase Connection Errors**
   - Check environment variables in `.env.local`
   - Verify Supabase project is active (not paused)
   - Confirm API keys are correct

2. **TypeScript Errors**
   - Run `npx tsc --noEmit` for detailed error information
   - Check import paths and type definitions
   - Ensure all required types are exported from `src/types/index.ts`

3. **Build Failures**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npx tsc --noEmit`

### Development Tools

#### Browser DevTools

- **React Developer Tools** - Component inspection and state debugging
- **Redux DevTools** - State management debugging
- **Network Tab** - API request monitoring

#### VS Code Debugging

Configure launch.json for Next.js debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## Performance Optimization

### Development Performance

- Use `React.memo()` for expensive components
- Implement proper dependency arrays in `useEffect`
- Avoid unnecessary re-renders with `useCallback` and `useMemo`
- Use Next.js Image component for optimized images

### Build Performance

- Monitor bundle size with `npm run build`
- Use dynamic imports for code splitting
- Optimize images and assets
- Implement proper caching strategies

## Best Practices

### Code Style

- Use TypeScript strict mode
- Follow consistent naming conventions
- Write descriptive component and function names
- Add JSDoc comments for complex functions
- Use proper error boundaries

### Git Workflow

- Create feature branches from `main`
- Write descriptive commit messages
- Run quality checks before pushing
- Keep commits focused and atomic

### Testing

While not currently implemented, consider adding:

- Unit tests with Jest and React Testing Library
- Integration tests for API services
- E2E tests with Playwright or Cypress

This development environment setup ensures consistent, efficient development across the team while maintaining code quality and type safety.