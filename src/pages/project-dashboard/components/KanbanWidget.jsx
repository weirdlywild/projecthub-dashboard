import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const KanbanWidget = ({ onTaskClick, onCreateTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const kanbanData = {
    columns: [
      {
        id: 'todo',
        title: 'To Do',
        color: 'bg-muted',
        tasks: [
          {
            id: 'task-1',
            title: 'Design user authentication flow',
            description: 'Create wireframes and mockups for login/signup process',
            assignee: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            priority: 'high',
            source: 'jira',
            labels: ['UI/UX', 'Frontend'],
            dueDate: '2025-07-30'
          },
          {
            id: 'task-2',
            title: 'Set up CI/CD pipeline',
            description: 'Configure automated testing and deployment',
            assignee: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            priority: 'medium',
            source: 'github',
            labels: ['DevOps', 'Backend'],
            dueDate: '2025-08-02'
          }
        ]
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        color: 'bg-accent/10',
        tasks: [
          {
            id: 'task-3',
            title: 'Implement payment gateway',
            description: 'Integrate Stripe API for secure payments',
            assignee: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            priority: 'high',
            source: 'trello',
            labels: ['Backend', 'API'],
            dueDate: '2025-07-29',
            progress: 65
          },
          {
            id: 'task-4',
            title: 'Mobile responsive design',
            description: 'Optimize layouts for mobile devices',
            assignee: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
            priority: 'medium',
            source: 'asana',
            labels: ['Frontend', 'Mobile'],
            dueDate: '2025-08-01',
            progress: 40
          }
        ]
      },
      {
        id: 'review',
        title: 'In Review',
        color: 'bg-warning/10',
        tasks: [
          {
            id: 'task-5',
            title: 'Database optimization',
            description: 'Improve query performance and indexing',
            assignee: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            priority: 'medium',
            source: 'jira',
            labels: ['Backend', 'Database'],
            dueDate: '2025-07-28'
          }
        ]
      },
      {
        id: 'done',
        title: 'Done',
        color: 'bg-success/10',
        tasks: [
          {
            id: 'task-6',
            title: 'User registration API',
            description: 'Complete user signup and validation endpoints',
            assignee: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            priority: 'high',
            source: 'github',
            labels: ['Backend', 'API'],
            completedDate: '2025-07-25'
          }
        ]
      }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'jira': return 'Layers';
      case 'trello': return 'Trello';
      case 'asana': return 'CheckSquare';
      case 'github': return 'Github';
      case 'slack': return 'MessageSquare';
      default: return 'Circle';
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask) {
      // In a real app, this would update the task status
      console.log(`Moving task ${draggedTask.id} to column ${columnId}`);
      setDraggedTask(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Kanban" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Kanban Board</h3>
          <IntegrationStatusIndicator status="connected" size="sm" />
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateTask}
        >
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {kanbanData.columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg p-4 min-h-[400px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">{column.title}</h4>
              <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onClick={() => onTaskClick(task)}
                  className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:elevation-2 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getSourceIcon(task.source)} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                      <Icon 
                        name="Circle" 
                        size={12} 
                        className={getPriorityColor(task.priority)} 
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      iconSize={16}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>

                  <h5 className="font-medium text-foreground mb-2 line-clamp-2">
                    {task.title}
                  </h5>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  {task.progress && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium text-foreground">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.labels.map((label, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={task.avatar}
                        alt={task.assignee}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />
                      <span>
                        {task.dueDate ? formatDate(task.dueDate) : formatDate(task.completedDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanWidget;