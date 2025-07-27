import AuthGuard from './AuthGuard';
import ErrorBoundary from './ErrorBoundary';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    return (
      <ErrorBoundary>
        <AuthGuard>
          <WrappedComponent {...props} />
        </AuthGuard>
      </ErrorBoundary>
    );
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;