import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import BreadcrumbNavigation from '../../../components/ui/BreadcrumbNavigation';

const ProjectHeader = ({ currentProject, onProjectChange, onCreateTask, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    assignee: 'all',
    priority: 'all',
    status: 'all',
    source: 'all'
  });

  const projectOptions = [
    { value: 'proj-1', label: 'E-Commerce Platform Redesign' },
    { value: 'proj-2', label: 'Mobile App Development' },
    { value: 'proj-3', label: 'Marketing Campaign Q4' },
    { value: 'proj-4', label: 'Infrastructure Migration' }
  ];

  const filterOptions = {
    assignee: [
      { value: 'all', label: 'All Assignees' },
      { value: 'john-doe', label: 'John Doe' },
      { value: 'sarah-wilson', label: 'Sarah Wilson' },
      { value: 'mike-chen', label: 'Mike Chen' },
      { value: 'emma-davis', label: 'Emma Davis' }
    ],
    priority: [
      { value: 'all', label: 'All Priorities' },
      { value: 'high', label: 'High Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'low', label: 'Low Priority' }
    ],
    status: [
      { value: 'all', label: 'All Status' },
      { value: 'todo', label: 'To Do' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'review', label: 'In Review' },
      { value: 'done', label: 'Done' }
    ],
    source: [
      { value: 'all', label: 'All Sources' },
      { value: 'jira', label: 'Jira' },
      { value: 'trello', label: 'Trello' },
      { value: 'asana', label: 'Asana' },
      { value: 'github', label: 'GitHub' },
      { value: 'slack', label: 'Slack' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ ...activeFilters, search: searchQuery });
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard-overview', isClickable: true },
    { label: 'Projects', path: '/project-dashboard', isClickable: false }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="p-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} className="mb-4" />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FolderKanban" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Project Dashboard</h1>
              <p className="text-muted-foreground">Manage and track your project progress</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Settings"
              iconPosition="left"
              size="sm"
            >
              Configure
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              size="sm"
              onClick={onCreateTask}
            >
              New Task
            </Button>
          </div>
        </div>

        {/* Project Selection and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Select
              label="Current Project"
              options={projectOptions}
              value={currentProject}
              onChange={onProjectChange}
              className="max-w-md"
            />
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search across all integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                iconName="ArrowRight"
                iconSize={16}
              />
            </div>
          </form>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Assignee"
            options={filterOptions.assignee}
            value={activeFilters.assignee}
            onChange={(value) => handleFilterChange('assignee', value)}
            size="sm"
          />
          
          <Select
            label="Priority"
            options={filterOptions.priority}
            value={activeFilters.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            size="sm"
          />
          
          <Select
            label="Status"
            options={filterOptions.status}
            value={activeFilters.status}
            onChange={(value) => handleFilterChange('status', value)}
            size="sm"
          />
          
          <Select
            label="Source"
            options={filterOptions.source}
            value={activeFilters.source}
            onChange={(value) => handleFilterChange('source', value)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;