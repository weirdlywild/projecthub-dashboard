import React, { ComponentType } from 'react';
import AuthGuard from './AuthGuard';
import ErrorBoundary from './ErrorBoundary';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
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