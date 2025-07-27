import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsWidget = ({ onActionClick }) => {
  const [recentActions, setRecentActions] = useState([]);

  const quickActions = [
    {
      id: 'create-task',
      title: 'Create Task',
      description: 'Add a new task to any project',
      icon: 'Plus',
      color: 'bg-primary',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'start-timer',
      title: 'Start Timer',
      description: 'Begin time tracking for current task',
      icon: 'Play',
      color: 'bg-success',
      shortcut: 'Ctrl+T'
    },
    {
      id: 'schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Create a new team meeting',
      icon: 'Calendar',
      color: 'bg-accent',
      shortcut: 'Ctrl+M'
    },
    {
      id: 'search-all',
      title: 'Search Everything',
      description: 'Search across all integrations',
      icon: 'Search',
      color: 'bg-secondary',
      shortcut: 'Ctrl+K'
    },
    {
      id: 'create-document',
      title: 'New Document',
      description: 'Create document in Google Drive',
      icon: 'FileText',
      color: 'bg-warning',
      shortcut: 'Ctrl+D'
    },
    {
      id: 'send-update',
      title: 'Send Update',
      description: 'Share project status with team',
      icon: 'Send',
      color: 'bg-purple-600',
      shortcut: 'Ctrl+U'
    }
  ];

  const recentActionsData = [
    {
      id: 'recent-1',
      action: 'Created task "Fix login bug"',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'Plus',
      color: 'text-primary'
    },
    {
      id: 'recent-2',
      action: 'Started timer for "Payment integration"',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'Play',
      color: 'text-success'
    },
    {
      id: 'recent-3',
      action: 'Scheduled meeting "Sprint Review"',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Calendar',
      color: 'text-accent'
    },
    {
      id: 'recent-4',
      action: 'Searched for "API documentation"',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Search',
      color: 'text-secondary'
    }
  ];

  const handleActionClick = (action) => {
    // Add to recent actions
    const newRecentAction = {
      id: `recent-${Date.now()}`,
      action: `Clicked "${action.title}"`,
      timestamp: new Date(),
      icon: action.icon,
      color: action.color.replace('bg-', 'text-')
    };
    
    setRecentActions(prev => [newRecentAction, ...prev.slice(0, 4)]);
    onActionClick(action);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const displayedRecentActions = recentActions.length > 0 ? recentActions : recentActionsData;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconSize={16}
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-200 hover:elevation-1 group"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action.icon} size={20} color="white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                {action.title}
              </h4>
              <p className="text-sm text-muted-foreground">{action.description}</p>
              {action.shortcut && (
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">
                    {action.shortcut}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Recent Actions */}
      <div>
        <h4 className="text-md font-medium text-foreground mb-4">Recent Actions</h4>
        <div className="space-y-3">
          {displayedRecentActions.slice(0, 4).map((recentAction) => (
            <div key={recentAction.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-8 h-8 bg-background rounded-lg flex items-center justify-center`}>
                <Icon name={recentAction.icon} size={16} className={recentAction.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{recentAction.action}</p>
                <p className="text-xs text-muted-foreground">{formatTimestamp(recentAction.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Keyboard shortcuts available</span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Keyboard"
            iconSize={16}
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsWidget;