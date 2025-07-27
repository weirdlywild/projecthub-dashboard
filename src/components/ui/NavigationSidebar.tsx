import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const NavigationSidebar = () => {
  const router = useRouter();
  const { userProfile } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: 'Home' },
    { name: 'Projects', href: '/project-dashboard', icon: 'FolderKanban' },
    { name: 'Analytics', href: '/analytics-reports', icon: 'BarChart3' },
    { name: 'Search', href: '/search-discovery', icon: 'Search' },
    { name: 'Integrations', href: '/integrations-hub', icon: 'Link' },
  ];

  // Function to check if a navigation item is active
  const isActive = (href: string) => {
    // Handle root path redirect to dashboard-overview
    if (router.pathname === '/' && href === '/dashboard-overview') {
      return true;
    }
    return router.pathname === href;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-16 lg:w-60 bg-card border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center lg:justify-start lg:px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary-foreground" />
            </div>
            <span className="hidden lg:block text-lg font-semibold text-foreground">
              ProjectHub
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 lg:px-6 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon name={item.icon} size={20} className="flex-shrink-0" />
                    <span className="hidden lg:block ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-3 lg:p-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.full_name || 'Demo User')}&size=32&background=3b82f6&color=ffffff`}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-foreground">
                {userProfile?.full_name || 'Demo User'}
              </p>
              <p className="text-xs text-muted-foreground">
                {userProfile?.email || 'demo@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;