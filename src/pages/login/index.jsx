import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import OAuthIntegrations from './components/OAuthIntegrations';
import SecurityBadges from './components/SecurityBadges';

const LoginPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      router.push('/');
    }
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

  // Don't render login form if user is authenticated (redirect will happen)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl elevation-2 p-8">
          {/* Header */}
          <LoginHeader />

          {/* Login Form */}
          <div className="mt-8">
            <LoginForm />
          </div>

          {/* OAuth Integrations */}
          <div className="mt-6">
            <OAuthIntegrations />
          </div>

          {/* Security Badges */}
          <SecurityBadges />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProjectHub Dashboard. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
              Privacy Policy
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
              Terms of Service
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;