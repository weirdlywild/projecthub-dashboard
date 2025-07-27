import React from 'react';
import Icon from '../AppIcon';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
}

const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  // Default breadcrumb for dashboard
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', current: true }
  ];

  const breadcrumbItems = items || defaultItems;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {item.current ? (
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;