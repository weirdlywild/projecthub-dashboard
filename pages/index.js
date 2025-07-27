import DashboardOverview from '../src/pages/dashboard-overview';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <DashboardOverview />
    </ErrorBoundary>
  );
}