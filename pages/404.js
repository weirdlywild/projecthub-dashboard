import NotFound from '../src/pages/NotFound';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function Custom404() {
  return (
    <ErrorBoundary>
      <NotFound />
    </ErrorBoundary>
  );
}