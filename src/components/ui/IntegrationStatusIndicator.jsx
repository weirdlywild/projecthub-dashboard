import React from 'react';
import Icon from '../AppIcon';

const IntegrationStatusIndicator = ({ 
  status = 'connected', 
  service = '', 
  size = 'sm',
  showLabel = false,
  className = '' 
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle',
          label: 'Connected'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'AlertCircle',
          label: 'Error'
        };
      case 'syncing':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'RefreshCw',
          label: 'Syncing'
        };
      case 'disconnected':
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'XCircle',
          label: 'Disconnected'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const getSizeConfig = (size) => {
    switch (size) {
      case 'xs':
        return {
          container: 'w-4 h-4',
          icon: 12,
          text: 'text-xs'
        };
      case 'sm':
        return {
          container: 'w-5 h-5',
          icon: 14,
          text: 'text-sm'
        };
      case 'md':
        return {
          container: 'w-6 h-6',
          icon: 16,
          text: 'text-sm'
        };
      case 'lg':
        return {
          container: 'w-8 h-8',
          icon: 20,
          text: 'text-base'
        };
      default:
        return {
          container: 'w-5 h-5',
          icon: 14,
          text: 'text-sm'
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const sizeConfig = getSizeConfig(size);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeConfig.container} ${statusConfig.bgColor} rounded-full flex items-center justify-center`}>
        <Icon 
          name={statusConfig.icon} 
          size={sizeConfig.icon} 
          className={`${statusConfig.color} ${status === 'syncing' ? 'animate-spin' : ''}`}
        />
      </div>
      {showLabel && (
        <span className={`${sizeConfig.text} font-medium ${statusConfig.color}`}>
          {service ? `${service} ${statusConfig.label}` : statusConfig.label}
        </span>
      )}
    </div>
  );
};

export default IntegrationStatusIndicator;