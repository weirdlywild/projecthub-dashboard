import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "project timeline Q4 2024",
    "team meeting notes",
    "budget approval documents",
    "sprint retrospective",
    "client feedback forms"
  ]);
  const [suggestions] = useState([
    "project status reports",
    "team performance metrics",
    "quarterly budget analysis",
    "client communication logs",
    "development roadmap",
    "marketing campaign assets",
    "user feedback surveys",
    "technical documentation"
  ]);
  
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search across all your connected tools..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          className="pl-12 pr-12 h-12 text-base bg-card border-2 border-border focus:border-primary rounded-xl"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <button
            onClick={() => handleSearch()}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-150 rounded-lg hover:bg-muted"
            title="Search"
          >
            <Icon name="ArrowRight" size={20} />
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl elevation-2 z-50 max-h-96 overflow-y-auto"
        >
          {searchQuery.length === 0 && recentSearches.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Recent Searches
              </h4>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-150 flex items-center"
                  >
                    <Icon name="Search" size={14} className="mr-3 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery.length > 0 && filteredSuggestions.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Icon name="Lightbulb" size={16} className="mr-2" />
                Suggestions
              </h4>
              <div className="space-y-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-150 flex items-center"
                  >
                    <Icon name="Search" size={14} className="mr-3 text-muted-foreground" />
                    <span dangerouslySetInnerHTML={{
                      __html: suggestion.replace(
                        new RegExp(`(${searchQuery})`, 'gi'),
                        '<mark class="bg-primary/20 text-primary">$1</mark>'
                      )
                    }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery.length > 0 && filteredSuggestions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No suggestions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;