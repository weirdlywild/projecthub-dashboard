import React from 'react';
import Icon from '../../../components/AppIcon';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'connected':
        return 'CheckCircle';
      case 'disconnected':
        return 'XCircle';
      case 'sync':
        return 'RefreshCw';
      case 'error':
        return 'AlertTriangle';
      case 'configured':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'connected':
        return 'text-success';
      case 'disconnected':
        return 'text-muted-foreground';
      case 'sync':
        return 'text-accent';
      case 'error':
        return 'text-error';
      case 'configured':
        return 'text-warning';
      default:
        return 'text-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Activity" size={20} className="text-foreground" />
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
              <div className={`mt-0.5 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground text-sm">
                    {activity.service}
                  </span>
                  <IntegrationStatusIndicator 
                    status={activity.status} 
                    size="xs"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-150">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;