import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ onSearchSelect }) => {
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "Q4 Budget Documents",
      query: "budget Q4 2024 approval",
      filters: {
        contentTypes: ['documents'],
        sources: ['google-drive', 'outlook'],
        dateRange: 'this-quarter'
      },
      lastUsed: new Date('2024-07-25'),
      resultCount: 23
    },
    {
      id: 2,
      name: "Sprint Planning Materials",
      query: "sprint planning retrospective",
      filters: {
        contentTypes: ['tasks', 'meetings'],
        sources: ['jira', 'slack'],
        projects: ['project-alpha']
      },
      lastUsed: new Date('2024-07-26'),
      resultCount: 45
    },
    {
      id: 3,
      name: "Client Feedback Collection",
      query: "client feedback survey responses",
      filters: {
        contentTypes: ['documents', 'messages'],
        sources: ['notion', 'outlook'],
        teamMembers: ['sarah-chen', 'mike-johnson']
      },
      lastUsed: new Date('2024-07-24'),
      resultCount: 67
    },
    {
      id: 4,
      name: "Development Documentation",
      query: "API documentation technical specs",
      filters: {
        contentTypes: ['code', 'documents'],
        sources: ['github', 'confluence'],
        projects: ['api-integration']
      },
      lastUsed: new Date('2024-07-23'),
      resultCount: 89
    }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSearchSelect = (search) => {
    onSearchSelect(search.query, search.filters);
    // Update last used date
    setSavedSearches(prev => 
      prev.map(s => 
        s.id === search.id 
          ? { ...s, lastUsed: new Date() }
          : s
      )
    );
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const handleSaveNewSearch = () => {
    if (newSearchName.trim()) {
      const newSearch = {
        id: Date.now(),
        name: newSearchName,
        query: "current search query", // This would come from parent component
        filters: {}, // This would come from parent component
        lastUsed: new Date(),
        resultCount: 0
      };
      setSavedSearches(prev => [newSearch, ...prev]);
      setNewSearchName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-foreground" />
          <h3 className="text-base font-medium text-foreground">Saved Searches</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          iconSize={16}
        >
          Save Current
        </Button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter search name..."
              value={newSearchName}
              onChange={(e) => setNewSearchName(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveNewSearch}
              disabled={!newSearchName.trim()}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowSaveDialog(false);
                setNewSearchName('');
              }}
              iconName="X"
              iconSize={16}
            />
          </div>
        </div>
      )}

      {/* Saved Searches List */}
      <div className="space-y-3">
        {savedSearches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Bookmark" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved searches yet</p>
            <p className="text-xs">Save your frequent searches for quick access</p>
          </div>
        ) : (
          savedSearches.map((search) => (
            <div
              key={search.id}
              className="group p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => handleSearchSelect(search)}
                    className="text-left w-full"
                  >
                    <h4 className="text-sm font-medium text-foreground mb-1 truncate">
                      {search.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      "{search.query}"
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>{search.resultCount} results</span>
                      <span>•</span>
                      <span>Used {formatDate(search.lastUsed)}</span>
                    </div>
                  </button>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSearchSelect(search)}
                    iconName="Search"
                    iconSize={14}
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSearch(search.id)}
                    iconName="Trash2"
                    iconSize={14}
                    className="text-muted-foreground hover:text-error"
                  />
                </div>
              </div>
              
              {/* Filter Tags */}
              {Object.keys(search.filters).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {search.filters.contentTypes?.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                  {search.filters.sources?.slice(0, 2).map((source) => (
                    <span
                      key={source}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {source}
                    </span>
                  ))}
                  {search.filters.sources?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{search.filters.sources.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedSearches;