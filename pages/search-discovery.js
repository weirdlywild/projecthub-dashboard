import SearchDiscovery from '../src/pages/search-discovery';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function SearchDiscoveryPage() {
  return (
    <ErrorBoundary>
      <SearchDiscovery />
    </ErrorBoundary>
  );
}