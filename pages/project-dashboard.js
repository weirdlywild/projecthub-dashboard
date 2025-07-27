import ProjectDashboard from '../src/pages/project-dashboard';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function ProjectDashboardPage() {
  return (
    <ErrorBoundary>
      <ProjectDashboard />
    </ErrorBoundary>
  );
}