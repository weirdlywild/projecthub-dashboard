import DashboardOverview from '../src/pages/dashboard-overview';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function DashboardOverviewPage() {
  return (
    <ErrorBoundary>
      <DashboardOverview />
    </ErrorBoundary>
  );
}