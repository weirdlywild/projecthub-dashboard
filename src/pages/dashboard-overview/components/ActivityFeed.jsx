import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task':
        return 'CheckSquare';
      case 'meeting':
        return 'Calendar';
      case 'message':
        return 'MessageSquare';
      case 'file':
        return 'FileText';
      case 'integration':
        return 'Zap';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task':
        return 'text-success bg-success/10';
      case 'meeting':
        return 'text-primary bg-primary/10';
      case 'message':
        return 'text-accent bg-accent/10';
      case 'file':
        return 'text-warning bg-warning/10';
      case 'integration':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filterOptions = [
    { value: 'all', label: 'All', icon: 'Activity' },
    { value: 'task', label: 'Tasks', icon: 'CheckSquare' },
    { value: 'meeting', label: 'Meetings', icon: 'Calendar' },
    { value: 'message', label: 'Messages', icon: 'MessageSquare' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Activity Feed</h2>
        <div className="flex items-center space-x-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={option.icon} size={14} className="mr-1.5" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Image
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-foreground">{activity.user.name}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
              
              {activity.project && (
                <div className="flex items-center space-x-1">
                  <Icon name="Folder" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.project}</span>
                </div>
              )}
            </div>

            {activity.priority === 'high' && (
              <div className="flex-shrink-0">
                <Icon name="AlertCircle" size={16} className="text-error" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;