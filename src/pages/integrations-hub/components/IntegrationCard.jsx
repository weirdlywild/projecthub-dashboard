import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const IntegrationCard = ({ integration, onConnect, onDisconnect, onManage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await onConnect(integration.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await onDisconnect(integration.id);
    } finally {
      setIsLoading(false);
    }
  };

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image 
              src={integration.logo} 
              alt={`${integration.name} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{integration.name}</h3>
            <p className="text-sm text-muted-foreground">{integration.category}</p>
          </div>
        </div>
        <IntegrationStatusIndicator 
          status={integration.status} 
          size="md"
          showLabel={false}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {integration.description}
      </p>

      {/* Connection Details */}
      {integration.status === 'connected' && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last sync:</span>
            <span className="text-foreground font-medium">
              {formatLastSync(integration.lastSync)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sync frequency:</span>
            <span className="text-foreground font-medium">{integration.syncFrequency}</span>
          </div>
          {integration.dataScope && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Data access:</span>
              <span className="text-foreground font-medium">{integration.dataScope}</span>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {integration.status === 'error' && integration.errorMessage && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-error">Connection Error</p>
              <p className="text-xs text-error/80 mt-1">{integration.errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {integration.status === 'connected' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManage(integration.id)}
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Manage
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              loading={isLoading}
              iconName="Unplug"
              iconPosition="left"
              iconSize={16}
              className="text-error hover:text-error hover:bg-error/10"
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={handleConnect}
            loading={isLoading}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Connect
          </Button>
        )}
      </div>

      {/* Features */}
      {integration.features && integration.features.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Features:</p>
          <div className="flex flex-wrap gap-1">
            {integration.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
              >
                {feature}
              </span>
            ))}
            {integration.features.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                +{integration.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationCard;