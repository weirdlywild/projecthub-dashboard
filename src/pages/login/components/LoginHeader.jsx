import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/dashboard-overview');
  };

  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <button
        onClick={handleLogoClick}
        className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
      >
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center elevation-1">
          <Icon name="Zap" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">ProjectHub</h1>
          <p className="text-sm text-muted-foreground">Dashboard</p>
        </div>
      </button>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account to access your project dashboards and integrations
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;