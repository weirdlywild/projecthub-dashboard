import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UpcomingDeadlines = ({ deadlines, onViewAll }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getUrgencyIcon = (daysLeft) => {
    if (daysLeft < 0) return 'AlertTriangle';
    if (daysLeft <= 1) return 'Clock';
    if (daysLeft <= 3) return 'Calendar';
    return 'CalendarDays';
  };

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft < 0) return 'text-error';
    if (daysLeft <= 1) return 'text-warning';
    if (daysLeft <= 3) return 'text-accent';
    return 'text-muted-foreground';
  };

  const formatDaysLeft = (daysLeft) => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return 'Due tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
        <button
          onClick={onViewAll}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-150"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-150"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getUrgencyColor(deadline.daysLeft)}`}>
              <Icon name={getUrgencyIcon(deadline.daysLeft)} size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {deadline.title}
                </h3>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(deadline.priority)}`}>
                  {deadline.priority.toUpperCase()}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Folder" size={12} />
                <span>{deadline.project}</span>
                <span>•</span>
                <span className={getUrgencyColor(deadline.daysLeft)}>
                  {formatDaysLeft(deadline.daysLeft)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {deadline.assignee && (
                <Image
                  src={deadline.assignee.avatar}
                  alt={deadline.assignee.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-150">
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deadlines.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No upcoming deadlines</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;