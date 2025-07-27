import IntegrationsHub from '../src/pages/integrations-hub';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function IntegrationsHubPage() {
  return (
    <ErrorBoundary>
      <IntegrationsHub />
    </ErrorBoundary>
  );
}