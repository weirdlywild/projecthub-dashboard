import Login from '../src/pages/login';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function LoginPage() {
  return (
    <ErrorBoundary>
      <Login />
    </ErrorBoundary>
  );
}