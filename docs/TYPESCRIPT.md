# TypeScript Integration Guide

ProjectHub Dashboard has been enhanced with comprehensive TypeScript support, providing type safety and improved developer experience while maintaining backward compatibility with existing JavaScript code.

## TypeScript Configuration

### tsconfig.json
The project uses a modern TypeScript configuration with:
- **Strict mode** enabled for maximum type safety
- **Path mapping** for clean imports (`@/types`, `@/components`, etc.)
- **Next.js plugin** for optimal integration
- **JSX preservation** for Next.js processing

### Key Configuration Features
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./src/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

## Type Definitions

### Centralized Type System
All TypeScript types are centralized in `src/types/index.ts` for consistency and maintainability.

### Core Domain Types

#### User & Authentication
```typescript
interface User {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}

interface UserProfile {
  id: string;
  full_name?: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<ApiResponse>;
  signOut: () => Promise<ApiResponse>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<ApiResponse<UserProfile>>;
}

// Supabase Auth Event Types
type AuthEvent = 
  | 'SIGNED_IN' 
  | 'SIGNED_OUT' 
  | 'TOKEN_REFRESHED' 
  | 'USER_UPDATED' 
  | 'PASSWORD_RECOVERY';

interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}
```

#### Project Management
```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  team_members?: string[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee_id?: string;
  project_id: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

interface Integration {
  id: string;
  name: string;
  type: 'github' | 'slack' | 'jira' | 'trello' | 'discord' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  project_id?: string;
  created_at: string;
  updated_at: string;
}
```

#### Analytics & Reporting
```typescript
interface AnalyticsData {
  projects: {
    total: number;
    active: number;
    completed: number;
    on_hold: number;
  };
  tasks: {
    total: number;
    completed: number;
    in_progress: number;
    overdue: number;
  };
  team: {
    total_members: number;
    active_members: number;
  };
}
```

#### Component Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}
```

### Utility Types

#### Generic API Response
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
```

#### Form Data Types
```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface ProjectFormData {
  name: string;
  description?: string;
  status: Project['status'];
  start_date?: string;
  due_date?: string;
}
```

#### Helper Types
```typescript
type WithAuth<T = {}> = T & {
  user: User;
  userProfile: UserProfile;
};

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CreateInput<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
type UpdateInput<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;
```

## Migration Strategy

### Gradual Adoption
The project supports both JavaScript and TypeScript files:
- Existing `.js` and `.jsx` files continue to work
- New files can be created as `.ts` or `.tsx`
- Gradual migration of existing files to TypeScript

### Import Patterns

#### Type-Only Imports
```typescript
import type { User, Project, Task } from '@/types';
import type { ButtonProps } from '@/types';
```

#### Regular Imports with Types
```typescript
import { useState } from 'react';
import type { User } from '@/types';

const [user, setUser] = useState<User | null>(null);
```

#### Path Mapping
```typescript
// Instead of relative imports
import { User } from '../../../types';

// Use path mapping
import type { User } from '@/types';
import { Button } from '@/components/ui/Button';
```

## Development Workflow

### Type Checking
```bash
# Type checking during development
npm run dev  # Includes TypeScript checking

# Manual type checking
npx tsc --noEmit
```

### IDE Integration
- Full IntelliSense support
- Auto-completion for props and methods
- Real-time error detection
- Refactoring assistance

### Component Development

#### TypeScript Component Example
```typescript
import type { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  className 
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### Service Layer with Types
```typescript
import type { ApiResponse, Project, CreateInput } from '@/types';

export const createProject = async (
  projectData: CreateInput<Project>
): Promise<ApiResponse<Project>> => {
  try {
    const response = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
    
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

## Best Practices

### Type Safety
- Use strict TypeScript configuration
- Avoid `any` type - use specific types or `unknown`
- Leverage union types for controlled values
- Use optional properties (`?`) appropriately

### Component Props
- Define comprehensive prop interfaces
- Use default parameters for optional props
- Leverage discriminated unions for variant props

### API Integration
- Type all API responses
- Use generic types for reusable patterns
- Handle error states with proper typing

### State Management
- Type Redux actions and state
- Use typed hooks for context
- Leverage TypeScript with React hooks

## Dependencies

### TypeScript-Related Packages
```json
{
  "@types/d3": "^7.4.3",
  "@types/node": "^20.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "typescript": "^5.0.0"
}
```

### Development Benefits
- **Compile-time error detection**
- **Enhanced IDE experience**
- **Better refactoring support**
- **Self-documenting code**
- **Improved team collaboration**

## Migration Checklist

When migrating existing files to TypeScript:

1. **Rename file** from `.js/.jsx` to `.ts/.tsx`
2. **Add type imports** from `@/types`
3. **Type component props** with interfaces
4. **Type state variables** and hooks
5. **Type function parameters** and return values
6. **Handle API responses** with proper typing
7. **Update imports** to use path mapping
8. **Test thoroughly** with TypeScript compiler

## Future Enhancements

- **Strict null checks** for enhanced safety
- **Additional utility types** for common patterns
- **Generated types** from Supabase schema
- **Enhanced error handling** with typed errors
- **Performance optimizations** with TypeScript

The TypeScript integration provides a solid foundation for scalable, maintainable code while preserving the flexibility to gradually adopt types throughout the codebase.