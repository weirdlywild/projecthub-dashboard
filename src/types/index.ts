// User and Authentication Types
export interface User {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Authentication Context Types
export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<ApiResponse>;
  signOut: () => Promise<ApiResponse>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<ApiResponse<UserProfile>>;
  resetPassword: (email: string) => Promise<ApiResponse>;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Project Types
export interface Project {
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

// Task Types
export interface Task {
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

// Integration Types
export interface Integration {
  id: string;
  name: string;
  type: 'github' | 'slack' | 'jira' | 'trello' | 'discord' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  project_id?: string;
  created_at: string;
  updated_at: string;
}

// Analytics Types
export interface AnalyticsData {
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

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

// Supabase Auth Event Types
export type AuthEvent = 
  | 'SIGNED_IN' 
  | 'SIGNED_OUT' 
  | 'TOKEN_REFRESHED' 
  | 'USER_UPDATED' 
  | 'PASSWORD_RECOVERY';

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}