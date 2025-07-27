import React from 'react';
import Icon from '../../../components/AppIcon';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const IntegrationStatus = ({ integrations, onManageIntegrations }) => {
  const getIntegrationIcon = (service) => {
    const iconMap = {
      'Google Workspace': 'Mail',
      'Microsoft Teams': 'MessageSquare',
      'Slack': 'Hash',
      'Jira': 'Bug',
      'GitHub': 'Github',
      'Trello': 'Kanban',
      'Notion': 'FileText',
      'Asana': 'CheckSquare'
    };
    return iconMap[service] || 'Zap';
  };

  const connectedCount = integrations.filter(int => int.status === 'connected').length;
  const totalCount = integrations.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {connectedCount}/{totalCount} connected
          </span>
          <button
            onClick={onManageIntegrations}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-150"
          >
            Manage
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {integrations.slice(0, 8).map((integration) => (
          <div
            key={integration.id}
            className="flex flex-col items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-2">
              <Icon 
                name={getIntegrationIcon(integration.service)} 
                size={20} 
                className="text-muted-foreground"
              />
            </div>
            
            <span className="text-xs font-medium text-foreground text-center mb-1">
              {integration.service}
            </span>
            
            <IntegrationStatusIndicator 
              status={integration.status}
              size="xs"
            />
            
            {integration.lastSync && (
              <span className="text-xs text-muted-foreground mt-1">
                {integration.lastSync}
              </span>
            )}
          </div>
        ))}
      </div>

      {integrations.length > 8 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button
            onClick={onManageIntegrations}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
          >
            View All {integrations.length} Integrations
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatus;