import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import ProjectHeader from './components/ProjectHeader';
import KanbanWidget from './components/KanbanWidget';
import TimelineWidget from './components/TimelineWidget';
import TeamWorkloadWidget from './components/TeamWorkloadWidget';
import CommunicationFeed from './components/CommunicationFeed';
import IntegrationsWidget from './components/IntegrationsWidget';
import QuickActionsWidget from './components/QuickActionsWidget';
import Icon from '../../components/AppIcon';


const ProjectDashboard = () => {
  const [currentProject, setCurrentProject] = useState('proj-1');
  const [activeFilters, setActiveFilters] = useState({
    assignee: 'all',
    priority: 'all',
    status: 'all',
    source: 'all',
    search: ''
  });
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('kanban');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProjectChange = (projectId) => {
    setCurrentProject(projectId);
    console.log('Project changed to:', projectId);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    console.log('Filters applied:', filters);
  };

  const handleCreateTask = () => {
    console.log('Creating new task...');
    // In a real app, this would open a task creation modal
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // In a real app, this would open task details modal
  };

  const handleMilestoneClick = (milestone) => {
    console.log('Milestone clicked:', milestone);
    // In a real app, this would open milestone details modal
  };

  const handleMemberClick = (member) => {
    console.log('Team member clicked:', member);
    // In a real app, this would open member profile modal
  };

  const handleMessageClick = (message) => {
    console.log('Message clicked:', message);
    // In a real app, this would open message thread or details
  };

  const handleIntegrationClick = (integration) => {
    console.log('Integration clicked:', integration);
    // In a real app, this would open integration settings
  };

  const handleConfigureIntegration = (integration) => {
    console.log('Configure integration:', integration);
    // In a real app, this would open integration configuration modal
  };

  const handleActionClick = (action) => {
    console.log('Quick action clicked:', action);
    // In a real app, this would execute the specific action
    switch (action.id) {
      case 'create-task':
        handleCreateTask();
        break;
      case 'start-timer': console.log('Starting timer...');
        break;
      case 'schedule-meeting': console.log('Opening meeting scheduler...');
        break;
      case 'search-all': console.log('Opening global search...');
        break;
      case 'create-document':
        console.log('Creating new document...');
        break;
      case 'send-update': console.log('Opening update composer...');
        break;
      default:
        console.log('Unknown action:', action.id);
    }
  };

  const tabOptions = [
    { id: 'kanban', label: 'Kanban', icon: 'Kanban' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <NavigationSidebar />
        
        <div className="p-4">
          <ProjectHeader
            currentProject={currentProject}
            onProjectChange={handleProjectChange}
            onCreateTask={handleCreateTask}
            onFilterChange={handleFilterChange}
          />

          {/* Mobile Tab Navigation */}
          <div className="bg-card rounded-lg border border-border p-2 mb-6">
            <div className="grid grid-cols-4 gap-1">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={20} />
                  <span className="text-xs mt-1 font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Content */}
          <div className="space-y-6">
            {activeTab === 'kanban' && (
              <KanbanWidget
                onTaskClick={handleTaskClick}
                onCreateTask={handleCreateTask}
              />
            )}
            
            {activeTab === 'timeline' && (
              <TimelineWidget onMilestoneClick={handleMilestoneClick} />
            )}
            
            {activeTab === 'team' && (
              <TeamWorkloadWidget onMemberClick={handleMemberClick} />
            )}
            
            {activeTab === 'communication' && (
              <CommunicationFeed onMessageClick={handleMessageClick} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <div className="ml-60 min-h-screen">
        <ProjectHeader
          currentProject={currentProject}
          onProjectChange={handleProjectChange}
          onCreateTask={handleCreateTask}
          onFilterChange={handleFilterChange}
        />

        <div className="p-6">
          {/* Desktop Layout - Three Column Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Kanban and Quick Actions */}
            <div className="col-span-5 space-y-6">
              <KanbanWidget
                onTaskClick={handleTaskClick}
                onCreateTask={handleCreateTask}
              />
              
              <QuickActionsWidget onActionClick={handleActionClick} />
            </div>

            {/* Center Column - Timeline */}
            <div className="col-span-4 space-y-6">
              <TimelineWidget onMilestoneClick={handleMilestoneClick} />
              
              <IntegrationsWidget
                onIntegrationClick={handleIntegrationClick}
                onConfigureIntegration={handleConfigureIntegration}
              />
            </div>

            {/* Right Column - Team and Communication */}
            <div className="col-span-3 space-y-6">
              <TeamWorkloadWidget onMemberClick={handleMemberClick} />
              
              <CommunicationFeed onMessageClick={handleMessageClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;