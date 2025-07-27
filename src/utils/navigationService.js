import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

// Navigation service for authenticated routes
export const useAuthNavigation = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const navigateTo = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const goToDashboard = () => {
    router.push('/dashboard-overview');
  };

  return {
    navigateTo,
    handleLogout,
    goToLogin,
    goToDashboard,
    currentPath: router.pathname
  };
};

// Protected route paths
export const PROTECTED_ROUTES = [
  '/',
  '/dashboard-overview',
  '/analytics-reports',
  '/search-discovery',
  '/integrations-hub',
  '/project-dashboard'
];

// Public route paths
export const PUBLIC_ROUTES = [
  '/login',
  '/404'
];

// Check if a route is protected
export const isProtectedRoute = (path) => {
  return PROTECTED_ROUTES.includes(path);
};

// Check if a route is public
export const isPublicRoute = (path) => {
  return PUBLIC_ROUTES.includes(path);
};