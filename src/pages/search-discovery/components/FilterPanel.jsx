import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const contentTypes = [
    { id: 'documents', label: 'Documents', count: 1247 },
    { id: 'tasks', label: 'Tasks & Issues', count: 892 },
    { id: 'messages', label: 'Messages', count: 2156 },
    { id: 'code', label: 'Code & Repositories', count: 543 },
    { id: 'meetings', label: 'Meetings & Calendar', count: 678 },
    { id: 'files', label: 'Files & Media', count: 1834 }
  ];

  const integrationSources = [
    { id: 'google-drive', label: 'Google Drive', icon: 'HardDrive', count: 856 },
    { id: 'jira', label: 'Jira', icon: 'Bug', count: 234 },
    { id: 'outlook', label: 'Outlook', icon: 'Mail', count: 567 },
    { id: 'slack', label: 'Slack', icon: 'MessageSquare', count: 1234 },
    { id: 'github', label: 'GitHub', icon: 'Github', count: 345 },
    { id: 'notion', label: 'Notion', icon: 'FileText', count: 123 },
    { id: 'trello', label: 'Trello', icon: 'Trello', count: 89 },
    { id: 'confluence', label: 'Confluence', icon: 'BookOpen', count: 156 }
  ];

  const teamMembers = [
    { value: 'sarah-chen', label: 'Sarah Chen' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-rodriguez', label: 'Alex Rodriguez' },
    { value: 'lisa-wang', label: 'Lisa Wang' },
    { value: 'david-brown', label: 'David Brown' }
  ];

  const projects = [
    { value: 'project-alpha', label: 'Project Alpha' },
    { value: 'mobile-app-redesign', label: 'Mobile App Redesign' },
    { value: 'q4-marketing-campaign', label: 'Q4 Marketing Campaign' },
    { value: 'api-integration', label: 'API Integration' },
    { value: 'user-research-study', label: 'User Research Study' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this-week', label: 'This Week' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleContentTypeChange = (typeId, checked) => {
    const updatedTypes = checked
      ? [...localFilters.contentTypes, typeId]
      : localFilters.contentTypes.filter(id => id !== typeId);
    
    const newFilters = { ...localFilters, contentTypes: updatedTypes };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSourceChange = (sourceId, checked) => {
    const updatedSources = checked
      ? [...localFilters.sources, sourceId]
      : localFilters.sources.filter(id => id !== sourceId);
    
    const newFilters = { ...localFilters, sources: updatedSources };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSelectChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      contentTypes: [],
      sources: [],
      dateRange: '',
      teamMembers: [],
      projects: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return localFilters.contentTypes.length + 
           localFilters.sources.length + 
           (localFilters.dateRange ? 1 : 0) + 
           localFilters.teamMembers.length + 
           localFilters.projects.length;
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border h-full">
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-full"
          >
            <Icon name="SlidersHorizontal" size={20} />
          </Button>
          {getActiveFiltersCount() > 0 && (
            <div className="mt-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mx-auto">
              {getActiveFiltersCount()}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="SlidersHorizontal" size={20} className="text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {getActiveFiltersCount()}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
          </div>
        </div>

        {/* Content Types */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Content Type</h3>
          <div className="space-y-2">
            {contentTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <Checkbox
                  label={type.label}
                  checked={localFilters.contentTypes.includes(type.id)}
                  onChange={(e) => handleContentTypeChange(type.id, e.target.checked)}
                />
                <span className="text-xs text-muted-foreground">{type.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <Select
            label="Date Range"
            options={dateRanges}
            value={localFilters.dateRange}
            onChange={(value) => handleSelectChange('dateRange', value)}
            placeholder="Select date range"
          />
        </div>

        {/* Team Members */}
        <div className="mb-6">
          <Select
            label="Team Members"
            options={teamMembers}
            value={localFilters.teamMembers}
            onChange={(value) => handleSelectChange('teamMembers', value)}
            placeholder="Select team members"
            multiple
            searchable
          />
        </div>

        {/* Projects */}
        <div className="mb-6">
          <Select
            label="Projects"
            options={projects}
            value={localFilters.projects}
            onChange={(value) => handleSelectChange('projects', value)}
            placeholder="Select projects"
            multiple
            searchable
          />
        </div>

        {/* Integration Sources */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Sources</h3>
          <div className="space-y-2">
            {integrationSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={localFilters.sources.includes(source.id)}
                    onChange={(e) => handleSourceChange(source.id, e.target.checked)}
                  />
                  <Icon name={source.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{source.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{source.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;