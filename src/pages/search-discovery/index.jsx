import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SearchResults from './components/SearchResults';
import SavedSearches from './components/SavedSearches';
import AIInsights from './components/AIInsights';

import Button from '../../components/ui/Button';

const SearchDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(true);
  const [filters, setFilters] = useState({
    contentTypes: [],
    sources: [],
    dateRange: '',
    teamMembers: [],
    projects: []
  });

  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: "Q4 Budget Planning Document - Final Draft",
      type: "document",
      source: "google-drive",
      sourceName: "Google Drive",
      preview: "Comprehensive budget analysis for Q4 2024 including departmental allocations, projected expenses, and revenue forecasts. This document contains the final approved version with stakeholder feedback incorporated.",
      lastModified: new Date('2024-07-26'),
      author: "Sarah Chen",
      project: "Q4 Planning",
      relevanceScore: 0.95,
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Sprint 23 Retrospective Meeting Notes",
      type: "meeting",
      source: "slack",
      sourceName: "Slack",
      preview: "Team retrospective discussion covering sprint achievements, blockers encountered, and action items for improvement. Key insights on development velocity and team collaboration patterns.",
      lastModified: new Date('2024-07-25'),
      author: "Mike Johnson",
      project: "Project Alpha",
      relevanceScore: 0.87
    },
    {
      id: 3,
      title: "API Integration Technical Specifications",
      type: "code",
      source: "github",
      sourceName: "GitHub",
      preview: "Detailed technical documentation for third-party API integrations including authentication flows, endpoint specifications, and error handling procedures.",
      lastModified: new Date('2024-07-24'),
      author: "Alex Rodriguez",
      project: "API Integration",
      relevanceScore: 0.82,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Client Feedback Survey Results - July 2024",
      type: "document",
      source: "notion",
      sourceName: "Notion",
      preview: "Comprehensive analysis of client satisfaction survey responses collected in July 2024. Includes satisfaction scores, feature requests, and improvement recommendations.",
      lastModified: new Date('2024-07-23'),
      author: "Emily Davis",
      project: "User Research Study",
      relevanceScore: 0.78
    },
    {
      id: 5,
      title: "Weekly Team Standup - Project Alpha Updates",
      type: "message",
      source: "slack",
      sourceName: "Slack",
      preview: "Weekly standup meeting discussion covering current sprint progress, upcoming deliverables, and team capacity planning for Project Alpha development.",
      lastModified: new Date('2024-07-22'),
      author: "Lisa Wang",
      project: "Project Alpha",
      relevanceScore: 0.75
    },
    {
      id: 6,
      title: "Marketing Campaign Assets - Q4 Launch",
      type: "file",
      source: "google-drive",
      sourceName: "Google Drive",
      preview: "Collection of marketing materials for Q4 product launch including banner designs, social media assets, and promotional copy variations.",
      lastModified: new Date('2024-07-21'),
      author: "David Brown",
      project: "Q4 Marketing Campaign",
      relevanceScore: 0.71,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    }
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setFiltersCollapsed(true);
        setShowSavedSearches(false);
      } else {
        setShowSavedSearches(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate search delay
    setTimeout(() => {
      // Filter results based on query (mock implementation)
      const filteredResults = searchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.preview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to search results (mock implementation)
    console.log('Applying filters:', newFilters);
  };

  const handleSavedSearchSelect = (query, savedFilters) => {
    setSearchQuery(query);
    setFilters(savedFilters);
    handleSearch(query);
  };

  const handleVoiceSearch = () => {
    // Mock voice search implementation
    console.log('Starting voice search...');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <div className={`transition-all duration-300 ${isMobile ? 'ml-0 pb-16' : filtersCollapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <BreadcrumbNavigation />
              <h1 className="text-2xl font-semibold text-foreground mt-2">Search & Discovery</h1>
              <p className="text-muted-foreground">Find content across all your connected platforms</p>
            </div>
            
            {!isMobile && (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleVoiceSearch}
                  iconName="Mic"
                  iconSize={16}
                >
                  Voice Search
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowSavedSearches(!showSavedSearches)}
                  iconName="Bookmark"
                  iconSize={16}
                >
                  Saved Searches
                </Button>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </header>

        <div className="flex h-[calc(100vh-200px)]">
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isCollapsed={filtersCollapsed}
            onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* AI Insights */}
              {searchQuery && !isSearching && (
                <div className="p-6 pb-0">
                  <AIInsights searchQuery={searchQuery} results={searchResults} />
                </div>
              )}

              {/* Search Results */}
              <SearchResults
                results={searchResults}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isLoading={isSearching}
              />
            </div>
          </div>

          {/* Saved Searches Sidebar */}
          {showSavedSearches && !isMobile && (
            <div className="w-80 border-l border-border bg-card overflow-y-auto">
              <div className="p-6">
                <SavedSearches onSearchSelect={handleSavedSearchSelect} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Saved Searches Bottom Sheet */}
        {isMobile && showSavedSearches && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={() => setShowSavedSearches(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-xl max-h-[70vh] overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Saved Searches</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSavedSearches(false)}
                    iconName="X"
                    iconSize={16}
                  />
                </div>
              </div>
              <div className="p-4">
                <SavedSearches onSearchSelect={handleSavedSearchSelect} />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Button */}
        {isMobile && (
          <div className="fixed bottom-20 right-4 z-40">
            <Button
              variant="default"
              size="lg"
              onClick={() => setFiltersCollapsed(!filtersCollapsed)}
              iconName="SlidersHorizontal"
              iconSize={20}
              className="rounded-full shadow-lg"
            >
              Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDiscovery;