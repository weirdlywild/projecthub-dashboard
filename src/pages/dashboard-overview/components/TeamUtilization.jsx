import React from 'react';

import Image from '../../../components/AppImage';

const TeamUtilization = ({ teamMembers, onViewTeam }) => {
  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-error';
    if (utilization >= 75) return 'bg-warning';
    if (utilization >= 50) return 'bg-primary';
    return 'bg-success';
  };

  const getUtilizationStatus = (utilization) => {
    if (utilization >= 90) return { label: 'Overloaded', color: 'text-error' };
    if (utilization >= 75) return { label: 'High', color: 'text-warning' };
    if (utilization >= 50) return { label: 'Optimal', color: 'text-primary' };
    return { label: 'Available', color: 'text-success' };
  };

  const averageUtilization = Math.round(
    teamMembers.reduce((sum, member) => sum + member.utilization, 0) / teamMembers.length
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Team Utilization</h2>
          <p className="text-sm text-muted-foreground">
            Average: {averageUtilization}% across {teamMembers.length} members
          </p>
        </div>
        <button
          onClick={onViewTeam}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-150"
        >
          View Team
        </button>
      </div>

      <div className="space-y-4">
        {teamMembers.map((member) => {
          const status = getUtilizationStatus(member.utilization);
          
          return (
            <div key={member.id} className="flex items-center space-x-3">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.utilization}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(member.utilization)}`}
                    style={{ width: `${member.utilization}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {member.activeTasks} active tasks
                  </span>
                  {member.isOnline && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-xs text-success">Online</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Team Capacity</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">High Load</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Overloaded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamUtilization;