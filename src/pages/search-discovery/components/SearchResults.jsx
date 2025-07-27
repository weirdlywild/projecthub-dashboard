import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SearchResults = ({ results, viewMode, onViewModeChange, isLoading }) => {
  const [selectedResults, setSelectedResults] = useState([]);

  const getSourceIcon = (source) => {
    const iconMap = {
      'google-drive': 'HardDrive',
      'jira': 'Bug',
      'outlook': 'Mail',
      'slack': 'MessageSquare',
      'github': 'Github',
      'notion': 'FileText',
      'trello': 'Trello',
      'confluence': 'BookOpen'
    };
    return iconMap[source] || 'File';
  };

  const getContentTypeIcon = (type) => {
    const iconMap = {
      'document': 'FileText',
      'task': 'CheckSquare',
      'message': 'MessageCircle',
      'code': 'Code',
      'meeting': 'Calendar',
      'file': 'Paperclip'
    };
    return iconMap[type] || 'File';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleResultSelect = (resultId) => {
    setSelectedResults(prev => 
      prev.includes(resultId) 
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    );
  };

  const handleOpenInSource = (result) => {
    // Mock opening in source application
    console.log(`Opening ${result.title} in ${result.source}`);
  };

  const handleAddToProject = (result) => {
    // Mock adding to current project
    console.log(`Adding ${result.title} to current project`);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Searching across all platforms...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button variant="outline">
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  const renderListView = () => (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-150"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={getContentTypeIcon(result.type)} size={20} className="text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-base font-medium text-foreground truncate">{result.title}</h3>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name={getSourceIcon(result.source)} size={14} />
                  <span>{result.sourceName}</span>
                </div>
                {result.relevanceScore && (
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {Math.round(result.relevanceScore * 100)}% match
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {result.preview}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Modified {formatDate(result.lastModified)}</span>
                  {result.author && <span>by {result.author}</span>}
                  {result.project && <span>in {result.project}</span>}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToProject(result)}
                    iconName="Plus"
                    iconSize={14}
                  >
                    Add to Project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenInSource(result)}
                    iconName="ExternalLink"
                    iconSize={14}
                  >
                    Open
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-card border border-border rounded-lg overflow-hidden hover:elevation-1 transition-all duration-150"
        >
          {result.thumbnail && (
            <div className="h-32 bg-muted overflow-hidden">
              <Image
                src={result.thumbnail}
                alt={result.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={getContentTypeIcon(result.type)} size={16} className="text-muted-foreground" />
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name={getSourceIcon(result.source)} size={12} />
                <span>{result.sourceName}</span>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
              {result.title}
            </h3>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
              {result.preview}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{formatDate(result.lastModified)}</span>
              {result.relevanceScore && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {Math.round(result.relevanceScore * 100)}%
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenInSource(result)}
                className="flex-1"
                iconName="ExternalLink"
                iconSize={12}
              >
                Open
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddToProject(result)}
                iconName="Plus"
                iconSize={12}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimelineView = () => (
    <div className="space-y-6">
      {results.reduce((acc, result) => {
        const date = formatDate(result.lastModified);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(result);
        return acc;
      }, {}).map = Object.entries(results.reduce((acc, result) => {
        const date = formatDate(result.lastModified);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(result);
        return acc;
      }, {})).map(([date, dateResults]) => (
        <div key={date}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <h3 className="text-sm font-medium text-foreground">{date}</h3>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          
          <div className="ml-5 space-y-3">
            {dateResults.map((result) => (
              <div
                key={result.id}
                className="bg-card border border-border rounded-lg p-3 hover:elevation-1 transition-all duration-150"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={getContentTypeIcon(result.type)} size={16} className="text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-foreground truncate">{result.title}</h4>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name={getSourceIcon(result.source)} size={12} />
                        <span>{result.sourceName}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {result.preview}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenInSource(result)}
                    iconName="ExternalLink"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 p-6">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">
            {results.length} results found
          </h2>
          {selectedResults.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedResults.length} selected
              </span>
              <Button variant="outline" size="sm">
                Add to Project
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            iconSize={16}
          />
          <Button
            variant={viewMode === 'card' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('card')}
            iconName="Grid3X3"
            iconSize={16}
          />
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('timeline')}
            iconName="Clock"
            iconSize={16}
          />
        </div>
      </div>

      {/* Results Content */}
      <div className="min-h-0">
        {viewMode === 'list' && renderListView()}
        {viewMode === 'card' && renderCardView()}
        {viewMode === 'timeline' && renderTimelineView()}
      </div>
    </div>
  );
};

export default SearchResults;