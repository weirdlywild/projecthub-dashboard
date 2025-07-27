import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';
import LogoutButton from './LogoutButton';

const AuthNavigation = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const navigationItems = [
    { href: '/dashboard-overview', label: 'Dashboard' },
    { href: '/analytics-reports', label: 'Analytics' },
    { href: '/search-discovery', label: 'Search' },
    { href: '/integrations-hub', label: 'Integrations' },
    { href: '/project-dashboard', label: 'Projects' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard-overview" className="text-xl font-bold text-blue-600">
                ProjectHub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    router.pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User profile and logout */}
          <div className="flex items-center space-x-4">
            <UserProfile className="hidden sm:block" />
            <LogoutButton className="text-sm px-3 py-1" />
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                router.pathname === item.href
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavigation;