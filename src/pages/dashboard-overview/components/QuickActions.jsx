import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateProject, onAddIntegration, onViewAnalytics }) => {
  const quickActionItems = [
    {
      label: 'Create New Project',
      description: 'Start a new project with team setup',
      icon: 'Plus',
      variant: 'default',
      onClick: onCreateProject
    },
    {
      label: 'Add Integration',
      description: 'Connect new tools and services',
      icon: 'Zap',
      variant: 'outline',
      onClick: onAddIntegration
    },
    {
      label: 'View Analytics',
      description: 'Check team performance metrics',
      icon: 'BarChart3',
      variant: 'ghost',
      onClick: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActionItems.map((action, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Button
              variant={action.variant}
              iconName={action.icon}
              iconPosition="left"
              onClick={action.onClick}
              className="justify-start h-auto py-3"
            >
              <div className="text-left">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;