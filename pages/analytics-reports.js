import AnalyticsReports from '../src/pages/analytics-reports';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function AnalyticsReportsPage() {
  return (
    <ErrorBoundary>
      <AnalyticsReports />
    </ErrorBoundary>
  );
}