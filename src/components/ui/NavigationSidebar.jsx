import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const NavigationSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const location = { pathname: router.pathname };
  const { signOut, userProfile } = useAuth();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Dashboard Overview'
    },
    {
      label: 'Projects',
      path: '/project-dashboard',
      icon: 'FolderKanban',
      tooltip: 'Project Management'
    },
    {
      label: 'Analytics',
      path: '/analytics-reports',
      icon: 'BarChart3',
      tooltip: 'Analytics & Reports'
    },
    {
      label: 'Search',
      path: '/search-discovery',
      icon: 'Search',
      tooltip: 'Search & Discovery'
    },
    {
      label: 'Integrations',
      path: '/integrations-hub',
      icon: 'Puzzle',
      tooltip: 'Integration Hub'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogoClick = () => {
    router.push('/dashboard-overview');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
        <div className="flex justify-around items-center py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-150 ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-100 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center p-4 border-b border-border">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">ProjectHub</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-150 ease-out group relative ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground elevation-1'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:elevation-1'
                  }`}
                  title={isCollapsed ? item.tooltip : ''}
                >
                  <div className="flex-shrink-0">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={isActive(item.path) ? 'text-primary-foreground' : ''}
                    />
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap elevation-2 z-110">
                      {item.tooltip}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full justify-center"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
          >
            {!isCollapsed && "Collapse"}
          </Button>
        </div>

        {/* User Profile Section */}
        <div className={`mt-auto border-t border-border pt-4 ${!isCollapsed ? 'px-4' : 'px-2'}`}>
          <div className={`flex items-center space-x-3 ${!isCollapsed ? '' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userProfile?.full_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userProfile?.email || 'user@example.com'}
                </p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="mt-3 pt-3 border-t border-border">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 w-full p-2 text-sm text-muted-foreground hover:text-error 
                         hover:bg-error/5 rounded-lg transition-all duration-200"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default NavigationSidebar;