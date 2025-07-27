import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { isProtectedRoute } from '../utils/navigationService';

interface AuthMiddlewareProps {
  children: ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleRouteProtection = () => {
      const currentPath = router.pathname;

      // If still loading, don't do anything
      if (loading) return;

      // If user is not authenticated and trying to access protected route
      if (!user && isProtectedRoute(currentPath)) {
        router.push('/login');
        return;
      }

      // If user is authenticated and trying to access login page
      if (user && currentPath === '/login') {
        router.push('/dashboard-overview');
        return;
      }
    };

    handleRouteProtection();
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;