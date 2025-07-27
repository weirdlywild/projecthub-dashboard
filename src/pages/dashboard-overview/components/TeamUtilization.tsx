import React from 'react';
import Icon from '../../../components/AppIcon';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  utilization: number;
  role: string;
}

interface TeamUtilizationProps {
  teamMembers: TeamMember[];
  onViewTeam: () => void;
}

const TeamUtilization = ({ teamMembers, onViewTeam }: TeamUtilizationProps) => {
  // Mock team members if none provided
  const mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=32&background=3b82f6&color=ffffff',
      utilization: 85,
      role: 'Developer'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&size=32&background=10b981&color=ffffff',
      utilization: 72,
      role: 'Designer'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&size=32&background=f59e0b&color=ffffff',
      utilization: 90,
      role: 'Manager'
    }
  ];

  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : mockTeamMembers;

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-error';
    if (utilization >= 75) return 'bg-warning';
    if (utilization >= 50) return 'bg-success';
    return 'bg-primary';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Team Utilization</h2>
        <button 
          onClick={onViewTeam}
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View Team
        </button>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="space-y-4">
          {displayTeamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getUtilizationColor(member.utilization)}`}
                    style={{ width: `${member.utilization}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground w-8">
                  {member.utilization}%
                </span>
              </div>
            </div>
          ))}
          
          {displayTeamMembers.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No team members</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamUtilization;