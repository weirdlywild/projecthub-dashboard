import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import OAuthIntegrations from './components/OAuthIntegrations';
import SecurityBadges from './components/SecurityBadges';
import SignUpPrompt from './components/SignUpPrompt';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      router.push('/dashboard-overview');
    }
  }, [router]);

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

          {/* Sign Up Prompt */}
          <div className="mt-6">
            <SignUpPrompt />
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