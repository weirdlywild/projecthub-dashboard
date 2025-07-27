import React from 'react';
import Icon from '../../../components/AppIcon';

interface QuickActionsProps {
  onCreateProject: () => void;
  onAddIntegration: () => void;
  onViewAnalytics: () => void;
}

const QuickActions = ({ onCreateProject, onAddIntegration, onViewAnalytics }: QuickActionsProps) => {
  const actions = [
    {
      title: 'Create Project',
      description: 'Start a new project',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      onClick: onCreateProject
    },
    {
      title: 'Add Integration',
      description: 'Connect external tools',
      icon: 'Link',
      color: 'bg-secondary text-secondary-foreground',
      onClick: onAddIntegration
    },
    {
      title: 'View Analytics',
      description: 'Check project insights',
      icon: 'BarChart3',
      color: 'bg-accent text-accent-foreground',
      onClick: onViewAnalytics
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors duration-200 text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${action.color}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;