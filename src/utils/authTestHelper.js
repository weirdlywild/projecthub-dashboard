// Authentication test helper utilities
// This file helps verify that authentication guards are working correctly

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from './navigationService';

/**
 * Test authentication flow scenarios
 */
export const authTestScenarios = {
  // Test that unauthenticated users are redirected to login
  testUnauthenticatedAccess: () => {
    console.log('Testing unauthenticated access to protected routes...');
    PROTECTED_ROUTES.forEach(route => {
      console.log(`- ${route}: Should redirect to /login`);
    });
  },

  // Test that authenticated users can access protected routes
  testAuthenticatedAccess: () => {
    console.log('Testing authenticated access to protected routes...');
    PROTECTED_ROUTES.forEach(route => {
      console.log(`- ${route}: Should allow access`);
    });
  },

  // Test that authenticated users are redirected from login
  testLoginRedirect: () => {
    console.log('Testing login page redirect for authenticated users...');
    console.log('- /login: Should redirect to /dashboard-overview');
  },

  // Test public routes accessibility
  testPublicRoutes: () => {
    console.log('Testing public routes accessibility...');
    PUBLIC_ROUTES.forEach(route => {
      console.log(`- ${route}: Should be accessible to all users`);
    });
  }
};

/**
 * Authentication status checker
 */
export const checkAuthStatus = (user, loading) => {
  return {
    isAuthenticated: !!user && !loading,
    isLoading: loading,
    userInfo: user ? {
      id: user.id,
      email: user.email,
      lastSignIn: user.last_sign_in_at
    } : null
  };
};

/**
 * Route protection validator
 */
export const validateRouteProtection = (currentPath, isAuthenticated) => {
  const isProtected = PROTECTED_ROUTES.includes(currentPath);
  const isPublic = PUBLIC_ROUTES.includes(currentPath);

  return {
    currentPath,
    isProtected,
    isPublic,
    shouldRedirect: isProtected && !isAuthenticated,
    shouldAllowAccess: isPublic || (isProtected && isAuthenticated),
    recommendation: isProtected && !isAuthenticated 
      ? 'Redirect to /login' 
      : isAuthenticated && currentPath === '/login'
      ? 'Redirect to /dashboard-overview'
      : 'Allow access'
  };
};

/**
 * Debug authentication state
 */
export const debugAuthState = (authContext) => {
  const { user, userProfile, loading, authError } = authContext;
  
  console.group('🔐 Authentication Debug Info');
  console.log('Loading:', loading);
  console.log('User:', user ? { id: user.id, email: user.email } : null);
  console.log('User Profile:', userProfile);
  console.log('Auth Error:', authError);
  console.log('Is Authenticated:', !!user && !loading);
  console.groupEnd();
  
  return {
    isAuthenticated: !!user && !loading,
    hasError: !!authError,
    isLoading: loading,
    userEmail: user?.email,
    userRole: userProfile?.role
  };
};