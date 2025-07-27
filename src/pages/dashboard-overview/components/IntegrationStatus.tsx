import React from 'react';
import Icon from '../../../components/AppIcon';

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
}

interface IntegrationStatusProps {
  integrations: Integration[];
  onManageIntegrations: () => void;
}

const IntegrationStatus = ({ integrations, onManageIntegrations }: IntegrationStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'github':
        return 'Github';
      case 'slack':
        return 'MessageSquare';
      case 'jira':
        return 'Bug';
      default:
        return 'Link';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
        <button 
          onClick={onManageIntegrations}
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          Manage
        </button>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-full">
                  <Icon name={getIntegrationIcon(integration.type)} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{integration.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{integration.type}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {integration.status}
              </div>
            </div>
          ))}
          
          {integrations.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Link" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-2">No integrations configured</p>
              <button 
                onClick={onManageIntegrations}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Add Integration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;