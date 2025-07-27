import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null, className = '' }) => {
  const router = useRouter();
  const location = { pathname: router.pathname };

  const routeLabels = {
    '/dashboard-overview': 'Dashboard',
    '/project-dashboard': 'Projects',
    '/analytics-reports': 'Analytics',
    '/search-discovery': 'Search',
    '/integrations-hub': 'Integrations',
    '/login': 'Login'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/dashboard-overview') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard-overview',
        isClickable: true
      });
    }

    // Add current page
    const currentPath = `/${pathSegments.join('/')}`;
    const currentLabel = routeLabels[currentPath] || pathSegments[pathSegments.length - 1];
    
    if (currentPath !== '/dashboard-overview') {
      breadcrumbs.push({
        label: currentLabel,
        path: currentPath,
        isClickable: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    router.push(path);
  };

  if (breadcrumbs.length <= 1 && location.pathname === '/dashboard-overview') {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {breadcrumb.isClickable ? (
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb.path)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium"
              >
                {breadcrumb.label}
              </button>
            ) : (
              <span className="text-foreground font-medium">
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;