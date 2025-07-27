import React from 'react';
import Icon from '../../../components/AppIcon';

interface Task {
  id: string;
  title: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  project_id: string;
}

interface UpcomingDeadlinesProps {
  deadlines: Task[];
  onViewAll: () => void;
}

const UpcomingDeadlines = ({ deadlines, onViewAll }: UpcomingDeadlinesProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-error bg-error/10';
      case 'high':
        return 'text-warning bg-warning/10';
      case 'medium':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  // Mock deadlines if none provided
  const mockDeadlines: Task[] = [
    {
      id: '1',
      title: 'Complete homepage design',
      due_date: '2024-01-15',
      priority: 'high',
      project_id: '1'
    },
    {
      id: '2',
      title: 'API integration testing',
      due_date: '2024-01-18',
      priority: 'medium',
      project_id: '2'
    }
  ];

  const displayDeadlines = deadlines.length > 0 ? deadlines : mockDeadlines;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Upcoming Deadlines</h2>
        <button 
          onClick={onViewAll}
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="space-y-4">
          {displayDeadlines.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.due_date}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </div>
            </div>
          ))}
          
          {displayDeadlines.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No upcoming deadlines</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;