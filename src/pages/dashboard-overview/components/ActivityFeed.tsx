import React from 'react';
import Icon from '../../../components/AppIcon';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  // Mock activities if none provided
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'project',
      title: 'Project Created',
      description: 'Website Redesign project was created',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'task',
      title: 'Task Completed',
      description: 'Homepage mockup design completed',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'member',
      title: 'Team Member Added',
      description: 'John Doe joined Mobile App Development',
      timestamp: '1 day ago'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return 'FolderPlus';
      case 'task':
        return 'CheckCircle';
      case 'member':
        return 'UserPlus';
      default:
        return 'Activity';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Icon name={getActivityIcon(activity.type)} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
          
          {displayActivities.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;