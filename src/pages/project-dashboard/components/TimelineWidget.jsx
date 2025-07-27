import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TimelineWidget = ({ onMilestoneClick }) => {
  const [viewMode, setViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 27)); // July 27, 2025

  const viewOptions = [
    { value: 'week', label: 'Week View' },
    { value: 'month', label: 'Month View' },
    { value: 'quarter', label: 'Quarter View' }
  ];

  const timelineData = {
    milestones: [
      {
        id: 'milestone-1',
        title: 'Project Kickoff',
        date: '2025-07-15',
        status: 'completed',
        description: 'Initial project setup and team alignment'
      },
      {
        id: 'milestone-2',
        title: 'Design Phase Complete',
        date: '2025-08-05',
        status: 'in-progress',
        description: 'UI/UX designs and wireframes finalized'
      },
      {
        id: 'milestone-3',
        title: 'Backend Development',
        date: '2025-08-20',
        status: 'upcoming',
        description: 'Core API and database implementation'
      },
      {
        id: 'milestone-4',
        title: 'Beta Release',
        date: '2025-09-10',
        status: 'upcoming',
        description: 'Internal testing and feedback collection'
      },
      {
        id: 'milestone-5',
        title: 'Production Launch',
        date: '2025-09-30',
        status: 'upcoming',
        description: 'Public release and go-live'
      }
    ],
    tasks: [
      {
        id: 'gantt-1',
        title: 'User Authentication System',
        startDate: '2025-07-20',
        endDate: '2025-08-10',
        progress: 75,
        assignee: 'John Doe',
        dependencies: [],
        color: 'bg-primary'
      },
      {
        id: 'gantt-2',
        title: 'Payment Integration',
        startDate: '2025-07-25',
        endDate: '2025-08-15',
        progress: 45,
        assignee: 'Sarah Wilson',
        dependencies: ['gantt-1'],
        color: 'bg-accent'
      },
      {
        id: 'gantt-3',
        title: 'Mobile App Development',
        startDate: '2025-08-01',
        endDate: '2025-08-25',
        progress: 20,
        assignee: 'Mike Chen',
        dependencies: ['gantt-1'],
        color: 'bg-success'
      },
      {
        id: 'gantt-4',
        title: 'Testing & QA',
        startDate: '2025-08-20',
        endDate: '2025-09-05',
        progress: 0,
        assignee: 'Emma Davis',
        dependencies: ['gantt-2', 'gantt-3'],
        color: 'bg-warning'
      }
    ]
  };

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'upcoming': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMilestoneIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'upcoming': return 'Circle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTaskWidth = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(duration * 8, 80); // Minimum 80px width
  };

  const calculateTaskPosition = (startDate) => {
    const start = new Date(startDate);
    const baseDate = new Date(2025, 6, 15); // July 15, 2025
    const daysDiff = Math.ceil((start - baseDate) / (1000 * 60 * 60 * 24));
    return Math.max(daysDiff * 8, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Project Timeline</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={viewOptions}
            value={viewMode}
            onChange={setViewMode}
            className="w-32"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-foreground mb-4">Key Milestones</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timelineData.milestones.map((milestone) => (
            <div
              key={milestone.id}
              onClick={() => onMilestoneClick(milestone)}
              className="bg-muted rounded-lg p-4 cursor-pointer hover:elevation-1 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getMilestoneStatusColor(milestone.status)}`}>
                  <Icon name={getMilestoneIcon(milestone.status)} size={16} />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{milestone.title}</h5>
                  <p className="text-sm text-muted-foreground">{formatDate(milestone.date)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Chart Section */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-foreground mb-4">Gantt Chart</h4>
        
        {/* Timeline Header */}
        <div className="bg-muted rounded-t-lg p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-64 font-medium text-foreground">Task</div>
            <div className="flex-1 grid grid-cols-12 gap-2 text-sm text-muted-foreground">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="text-center">
                  {new Date(2025, 6 + Math.floor(i / 4), 15 + (i % 4) * 7).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Tasks */}
        <div className="bg-card rounded-b-lg border border-t-0 border-border">
          {timelineData.tasks.map((task, index) => (
            <div key={task.id} className={`flex items-center space-x-4 p-4 ${index !== timelineData.tasks.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="w-64">
                <h5 className="font-medium text-foreground mb-1">{task.title}</h5>
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://images.unsplash.com/photo-${task.assignee === 'John Doe' ? '1472099645785-5658abf4ff4e' : task.assignee === 'Sarah Wilson' ? '1494790108755-2616b612b786' : task.assignee === 'Mike Chen' ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=24&h=24&fit=crop&crop=face`}
                    alt={task.assignee}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">{task.assignee}</span>
                </div>
              </div>
              
              <div className="flex-1 relative h-8">
                <div className="absolute inset-0 bg-muted rounded-full" />
                <div
                  className={`absolute top-0 h-8 ${task.color} rounded-full flex items-center px-3 text-white text-sm font-medium`}
                  style={{
                    left: `${calculateTaskPosition(task.startDate)}px`,
                    width: `${calculateTaskWidth(task.startDate, task.endDate)}px`
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{task.progress}%</span>
                    <div className="w-16 bg-white/20 rounded-full h-1">
                      <div 
                        className="bg-white h-1 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <span className="text-sm text-muted-foreground">
          {currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TimelineWidget;