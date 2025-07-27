import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TeamWorkloadWidget = ({ onMemberClick }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [sortBy, setSortBy] = useState('workload');

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const sortOptions = [
    { value: 'workload', label: 'By Workload' },
    { value: 'name', label: 'By Name' },
    { value: 'availability', label: 'By Availability' }
  ];

  const teamData = [
    {
      id: 'john-doe',
      name: 'John Doe',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      workload: 85,
      capacity: 40,
      hoursWorked: 34,
      tasksActive: 5,
      tasksCompleted: 12,
      availability: 'available',
      skills: ['React', 'Node.js', 'Python'],
      currentTasks: [
        { title: 'Payment Gateway Integration', priority: 'high', dueDate: '2025-07-29' },
        { title: 'API Documentation', priority: 'medium', dueDate: '2025-07-31' }
      ]
    },
    {
      id: 'sarah-wilson',
      name: 'Sarah Wilson',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      workload: 65,
      capacity: 40,
      hoursWorked: 26,
      tasksActive: 3,
      tasksCompleted: 8,
      availability: 'available',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      currentTasks: [
        { title: 'Mobile App Wireframes', priority: 'high', dueDate: '2025-07-30' },
        { title: 'Design System Updates', priority: 'low', dueDate: '2025-08-05' }
      ]
    },
    {
      id: 'mike-chen',
      name: 'Mike Chen',
      role: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      workload: 95,
      capacity: 40,
      hoursWorked: 38,
      tasksActive: 7,
      tasksCompleted: 15,
      availability: 'busy',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      currentTasks: [
        { title: 'CI/CD Pipeline Setup', priority: 'high', dueDate: '2025-07-28' },
        { title: 'Database Migration', priority: 'medium', dueDate: '2025-08-02' }
      ]
    },
    {
      id: 'emma-davis',
      name: 'Emma Davis',
      role: 'QA Engineer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      workload: 45,
      capacity: 40,
      hoursWorked: 18,
      tasksActive: 2,
      tasksCompleted: 6,
      availability: 'available',
      skills: ['Selenium', 'Jest', 'Cypress'],
      currentTasks: [
        { title: 'Automated Test Scripts', priority: 'medium', dueDate: '2025-08-01' }
      ]
    }
  ];

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return 'text-error';
    if (workload >= 75) return 'text-warning';
    if (workload >= 50) return 'text-success';
    return 'text-muted-foreground';
  };

  const getWorkloadBgColor = (workload) => {
    if (workload >= 90) return 'bg-error';
    if (workload >= 75) return 'bg-warning';
    if (workload >= 50) return 'bg-success';
    return 'bg-muted-foreground';
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-success';
      case 'busy': return 'bg-error';
      case 'away': return 'bg-warning';
      default: return 'bg-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const sortedTeamData = [...teamData].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'availability':
        return a.availability.localeCompare(b.availability);
      case 'workload':
      default:
        return b.workload - a.workload;
    }
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Team Workload</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-32"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-36"
          />
        </div>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Total Members</span>
          </div>
          <span className="text-2xl font-bold text-foreground">{teamData.length}</span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Hours This Week</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {teamData.reduce((sum, member) => sum + member.hoursWorked, 0)}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Tasks Completed</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {teamData.reduce((sum, member) => sum + member.tasksCompleted, 0)}
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Avg Workload</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {Math.round(teamData.reduce((sum, member) => sum + member.workload, 0) / teamData.length)}%
          </span>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {sortedTeamData.map((member) => (
          <div
            key={member.id}
            onClick={() => onMemberClick(member)}
            className="bg-muted rounded-lg p-4 cursor-pointer hover:elevation-1 transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getAvailabilityColor(member.availability)} rounded-full border-2 border-card`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getWorkloadColor(member.workload)}`}>
                      {member.workload}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.hoursWorked}h / {member.capacity}h
                    </div>
                  </div>
                </div>

                {/* Workload Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getWorkloadBgColor(member.workload)}`}
                      style={{ width: `${member.workload}%` }}
                    />
                  </div>
                </div>

                {/* Tasks and Skills */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Circle" size={12} className="text-warning" />
                      <span className="text-sm text-muted-foreground">
                        {member.tasksActive} active
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} className="text-success" />
                      <span className="text-sm text-muted-foreground">
                        {member.tasksCompleted} completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-background text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Current Tasks */}
                <div className="space-y-2">
                  {member.currentTasks.slice(0, 2).map((task, index) => (
                    <div key={index} className="flex items-center justify-between bg-background rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name="Circle" 
                          size={8} 
                          className={getPriorityColor(task.priority)} 
                        />
                        <span className="text-sm text-foreground">{task.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
        >
          Add Member
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="BarChart3"
          iconPosition="left"
        >
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default TeamWorkloadWidget;