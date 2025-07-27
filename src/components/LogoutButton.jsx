import { useState } from 'react';
import { useAuthNavigation } from '../utils/navigationService';

const LogoutButton = ({ className = '', children = 'Logout' }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { handleLogout } = useAuthNavigation();

  const onLogout = async () => {
    setIsLoggingOut(true);
    try {
      await handleLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={isLoggingOut}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoggingOut ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Logging out...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LogoutButton;