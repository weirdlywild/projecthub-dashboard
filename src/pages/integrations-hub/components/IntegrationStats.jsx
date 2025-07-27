import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Connected',
      value: stats.connected,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Available',
      value: stats.total,
      icon: 'Grid3X3',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Syncing',
      value: stats.syncing,
      icon: 'RefreshCw',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Errors',
      value: stats.errors,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item) => (
        <div key={item.label} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <Icon 
                name={item.icon} 
                size={20} 
                className={`${item.color} ${item.label === 'Syncing' ? 'animate-spin' : ''}`}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationStats;