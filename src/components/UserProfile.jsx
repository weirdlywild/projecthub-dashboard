import { useAuth } from '../contexts/AuthContext';

const UserProfile = ({ showEmail = true, showRole = true, className = '' }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`text-sm ${className}`}>
      <div className="font-medium text-gray-900">
        {userProfile?.full_name || user.email}
      </div>
      {showEmail && (
        <div className="text-gray-500">
          {user.email}
        </div>
      )}
      {showRole && userProfile?.role && (
        <div className="text-xs text-gray-400 capitalize">
          {userProfile.role}
        </div>
      )}
    </div>
  );
};

export default UserProfile;