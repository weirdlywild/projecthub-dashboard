import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { validateRouteProtection } from '../utils/authTestHelper';

const AuthStatus = ({ showDebug = false }) => {
  const auth = useAuth();
  const router = useRouter();
  const { user, loading, authError } = auth;

  const isAuthenticated = !!user && !loading;
  const routeValidation = validateRouteProtection(router.pathname, isAuthenticated);

  if (!showDebug) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">🔐 Auth Status (Debug)</div>
      
      <div className="space-y-1">
        <div>
          <span className="text-gray-300">Status:</span>{' '}
          <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
            {loading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </span>
        </div>
        
        {user && (
          <div>
            <span className="text-gray-300">User:</span>{' '}
            <span className="text-blue-400">{user.email}</span>
          </div>
        )}
        
        <div>
          <span className="text-gray-300">Route:</span>{' '}
          <span className="text-yellow-400">{router.pathname}</span>
        </div>
        
        <div>
          <span className="text-gray-300">Protected:</span>{' '}
          <span className={routeValidation.isProtected ? 'text-orange-400' : 'text-gray-400'}>
            {routeValidation.isProtected ? 'Yes' : 'No'}
          </span>
        </div>
        
        {authError && (
          <div>
            <span className="text-gray-300">Error:</span>{' '}
            <span className="text-red-400">{authError}</span>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-700">
          <span className="text-gray-300">Action:</span>{' '}
          <span className="text-cyan-400">{routeValidation.recommendation}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthStatus;