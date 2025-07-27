import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange, loading = false }) => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    projects: [],
    teamMembers: [],
    integrations: [],
    customStartDate: '',
    customEndDate: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const projectOptions = [
    { value: 'proj-1', label: 'Website Redesign' },
    { value: 'proj-2', label: 'Mobile App Development' },
    { value: 'proj-3', label: 'API Integration' },
    { value: 'proj-4', label: 'Marketing Campaign' },
    { value: 'proj-5', label: 'Database Migration' }
  ];

  const teamMemberOptions = [
    { value: 'user-1', label: 'Sarah Johnson' },
    { value: 'user-2', label: 'Michael Chen' },
    { value: 'user-3', label: 'Emily Rodriguez' },
    { value: 'user-4', label: 'David Kim' },
    { value: 'user-5', label: 'Lisa Thompson' },
    { value: 'user-6', label: 'James Wilson' }
  ];

  const integrationOptions = [
    { value: 'jira', label: 'Jira' },
    { value: 'asana', label: 'Asana' },
    { value: 'slack', label: 'Slack' },
    { value: 'github', label: 'GitHub' },
    { value: 'google', label: 'Google Workspace' },
    { value: 'microsoft', label: 'Microsoft 365' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: '30d',
      projects: [],
      teamMembers: [],
      integrations: [],
      customStartDate: '',
      customEndDate: ''
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.projects.length > 0) count++;
    if (filters.teamMembers.length > 0) count++;
    if (filters.integrations.length > 0) count++;
    if (filters.dateRange === 'custom' && (filters.customStartDate || filters.customEndDate)) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={16}
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          disabled={loading}
        />

        <Select
          label="Projects"
          options={projectOptions}
          value={filters.projects}
          onChange={(value) => handleFilterChange('projects', value)}
          multiple
          searchable
          placeholder="All projects"
          disabled={loading}
        />

        <Select
          label="Team Members"
          options={teamMemberOptions}
          value={filters.teamMembers}
          onChange={(value) => handleFilterChange('teamMembers', value)}
          multiple
          searchable
          placeholder="All members"
          disabled={loading}
        />

        <Select
          label="Integrations"
          options={integrationOptions}
          value={filters.integrations}
          onChange={(value) => handleFilterChange('integrations', value)}
          multiple
          placeholder="All sources"
          disabled={loading}
        />
      </div>

      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <Input
            label="Start Date"
            type="date"
            value={filters.customStartDate}
            onChange={(e) => handleFilterChange('customStartDate', e.target.value)}
            disabled={loading}
          />
          
          <Input
            label="End Date"
            type="date"
            value={filters.customEndDate}
            onChange={(e) => handleFilterChange('customEndDate', e.target.value)}
            disabled={loading}
          />
        </div>
      )}

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Chart Type"
              options={[
                { value: 'all', label: 'All Charts' },
                { value: 'performance', label: 'Performance Only' },
                { value: 'productivity', label: 'Productivity Only' },
                { value: 'timeline', label: 'Timeline Only' }
              ]}
              value="all"
              onChange={() => {}}
              disabled={loading}
            />
            
            <Select
              label="Grouping"
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' }
              ]}
              value="weekly"
              onChange={() => {}}
              disabled={loading}
            />
            
            <Select
              label="Comparison"
              options={[
                { value: 'none', label: 'No Comparison' },
                { value: 'previous', label: 'Previous Period' },
                { value: 'year', label: 'Same Period Last Year' }
              ]}
              value="previous"
              onChange={() => {}}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;