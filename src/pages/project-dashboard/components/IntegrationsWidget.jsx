import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const IntegrationsWidget = ({ onIntegrationClick, onConfigureIntegration }) => {
  const [showAllIntegrations, setShowAllIntegrations] = useState(false);

  const integrationData = [
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: 'Gmail, Calendar, Drive, and Chat integration',
      icon: 'Mail',
      status: 'connected',
      lastSync: '2025-07-27T09:20:00Z',
      dataPoints: {
        emails: 1247,
        events: 23,
        files: 89
      },
      features: ['Email sync', 'Calendar events', 'Drive files', 'Chat messages']
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      description: 'Outlook, Teams, and OneDrive integration',
      icon: 'MessageSquare',
      status: 'connected',
      lastSync: '2025-07-27T09:15:00Z',
      dataPoints: {
        emails: 892,
        meetings: 15,
        files: 67
      },
      features: ['Outlook sync', 'Teams meetings', 'OneDrive files']
    },
    {
      id: 'jira',
      name: 'Atlassian Jira',
      description: 'Issues, sprints, and project tracking',
      icon: 'Layers',
      status: 'connected',
      lastSync: '2025-07-27T09:18:00Z',
      dataPoints: {
        issues: 156,
        sprints: 8,
        projects: 3
      },
      features: ['Issue tracking', 'Sprint management', 'Epic planning']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and file sharing',
      icon: 'Hash',
      status: 'syncing',
      lastSync: '2025-07-27T09:10:00Z',
      dataPoints: {
        messages: 2341,
        channels: 12,
        files: 45
      },
      features: ['Channel messages', 'Direct messages', 'File sharing']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code repositories and development workflow',
      icon: 'Github',
      status: 'connected',
      lastSync: '2025-07-27T09:22:00Z',
      dataPoints: {
        repositories: 8,
        commits: 234,
        pullRequests: 23
      },
      features: ['Repository sync', 'Commit tracking', 'PR management']
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Kanban boards and task management',
      icon: 'Trello',
      status: 'error',
      lastSync: '2025-07-27T08:45:00Z',
      error: 'Authentication expired',
      dataPoints: {
        boards: 5,
        cards: 78,
        lists: 15
      },
      features: ['Board sync', 'Card management', 'List organization']
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Project management and team collaboration',
      icon: 'CheckSquare',
      status: 'disconnected',
      lastSync: null,
      dataPoints: {
        projects: 0,
        tasks: 0,
        teams: 0
      },
      features: ['Project tracking', 'Task management', 'Team collaboration']
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Documentation and knowledge management',
      icon: 'FileText',
      status: 'connected',
      lastSync: '2025-07-27T09:05:00Z',
      dataPoints: {
        pages: 45,
        databases: 8,
        blocks: 1234
      },
      features: ['Page sync', 'Database integration', 'Content management']
    }
  ];

  const connectedIntegrations = integrationData.filter(integration => integration.status === 'connected');
  const displayedIntegrations = showAllIntegrations ? integrationData : integrationData.slice(0, 6);

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getTotalDataPoints = () => {
    return connectedIntegrations.reduce((total, integration) => {
      return total + Object.values(integration.dataPoints).reduce((sum, value) => sum + value, 0);
    }, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Puzzle" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Integrations</h3>
          <span className="bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full">
            {connectedIntegrations.length} active
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onConfigureIntegration(null)}
        >
          Add Integration
        </Button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Connected</span>
          </div>
          <span className="text-2xl font-bold text-foreground">{connectedIntegrations.length}</span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Database" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Data Points</span>
          </div>
          <span className="text-2xl font-bold text-foreground">{getTotalDataPoints().toLocaleString()}</span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="RefreshCw" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Syncing</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {integrationData.filter(i => i.status === 'syncing').length}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm font-medium text-foreground">Issues</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {integrationData.filter(i => i.status === 'error').length}
          </span>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {displayedIntegrations.map((integration) => (
          <div
            key={integration.id}
            onClick={() => onIntegrationClick(integration)}
            className="bg-muted rounded-lg p-4 cursor-pointer hover:elevation-1 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              
              <IntegrationStatusIndicator 
                status={integration.status} 
                size="sm" 
              />
            </div>

            {integration.error && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-2 mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={14} className="text-error" />
                  <span className="text-sm text-error">{integration.error}</span>
                </div>
              </div>
            )}

            {/* Data Points */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {Object.entries(integration.dataPoints).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-foreground">{value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-3">
              {integration.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-background text-muted-foreground px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {integration.features.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{integration.features.length - 3} more
                </span>
              )}
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last sync:</span>
              <span className="text-foreground">{formatLastSync(integration.lastSync)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {integrationData.length > 6 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            iconName={showAllIntegrations ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowAllIntegrations(!showAllIntegrations)}
          >
            {showAllIntegrations ? 'Show Less' : `Show All (${integrationData.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default IntegrationsWidget;