import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = ({ insights = [], loading = false }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const mockInsights = [
    {
      id: 1,
      type: 'bottleneck',
      severity: 'high',
      title: 'Development Bottleneck Detected',
      summary: 'Code review process is causing 2.3 day average delays in the Mobile App Development project.',
      details: `Analysis of the past 30 days shows that pull requests in the Mobile App Development project are spending an average of 2.3 days in review status before being merged. This is 40% longer than the team's target of 1.5 days.\n\nKey factors contributing to this bottleneck:\n• 3 out of 5 senior developers are currently overloaded with review requests\n• Complex feature branches require multiple review cycles\n• Review feedback is taking 8+ hours to address on average\n\nRecommended actions:\n• Distribute review load more evenly across team members\n• Implement smaller, more focused pull requests\n• Set up automated code quality checks to reduce review iterations`,impact: 'High',
      affectedProjects: ['Mobile App Development'],
      timestamp: new Date(Date.now() - 3600000),
      actionable: true
    },
    {
      id: 2,
      type: 'performance',severity: 'medium',title: 'Sprint Velocity Improvement',summary: 'Team velocity has increased by 23% over the last 3 sprints, indicating improved efficiency.',
      details: `The development team has shown consistent improvement in sprint velocity over the past 3 sprints:\n\nSprint 12: 34 story points completed\nSprint 13: 38 story points completed\nSprint 14: 42 story points completed\n\nThis 23% improvement can be attributed to:\n• Better story point estimation accuracy\n• Reduced context switching between projects\n• Implementation of daily standup improvements\n• New team member onboarding completion\n\nTo maintain this momentum:\n• Continue current sprint planning practices\n• Monitor for signs of team burnout\n• Ensure sustainable pace is maintained`,
      impact: 'Medium',
      affectedProjects: ['Website Redesign', 'API Integration'],
      timestamp: new Date(Date.now() - 7200000),
      actionable: false
    },
    {
      id: 3,
      type: 'anomaly',severity: 'low',title: 'Unusual Slack Activity Pattern',summary: 'Slack messages in #general channel decreased by 45% this week, which is unusual for the team.',
      details: `Slack activity analysis shows a significant decrease in team communication:\n\n• #general channel: 45% decrease in messages\n• #development channel: 12% decrease in messages\n• Direct messages: 8% increase\n\nPossible explanations:\n• Team members may be focusing on deep work\n• Shift towards more direct communication\n• Potential disengagement or communication issues\n\nMonitoring recommendations:\n• Check in with team leads about communication patterns\n• Ensure important updates aren't being missed\n• Consider team engagement survey if pattern continues`,
      impact: 'Low',
      affectedProjects: ['All Projects'],
      timestamp: new Date(Date.now() - 10800000),
      actionable: true
    }
  ];

  const displayInsights = insights.length > 0 ? insights : mockInsights;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          border: 'border-error/20',
          icon: 'AlertTriangle'
        };
      case 'medium':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20',
          icon: 'AlertCircle'
        };
      case 'low':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          border: 'border-accent/20',
          icon: 'Info'
        };
      default:
        return {
          bg: 'bg-muted/10',
          text: 'text-muted-foreground',
          border: 'border-muted',
          icon: 'Circle'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'bottleneck':
        return 'Zap';
      case 'performance':
        return 'TrendingUp';
      case 'anomaly':
        return 'Search';
      default:
        return 'Lightbulb';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {displayInsights.length} insights
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconSize={16}
        >
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {displayInsights.map((insight) => {
          const severityConfig = getSeverityColor(insight.severity);
          const isExpanded = expandedInsight === insight.id;
          
          return (
            <div
              key={insight.id}
              className={`border rounded-lg transition-all duration-200 ${severityConfig.border} ${
                isExpanded ? 'elevation-2' : 'elevation-1'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${severityConfig.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon 
                      name={getTypeIcon(insight.type)} 
                      size={16} 
                      className={severityConfig.text} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.summary}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name={severityConfig.icon} size={12} />
                            <span className={`font-medium ${severityConfig.text}`}>
                              {insight.severity.toUpperCase()} IMPACT
                            </span>
                          </span>
                          <span>{formatTimestamp(insight.timestamp)}</span>
                          {insight.actionable && (
                            <span className="flex items-center space-x-1 text-primary">
                              <Icon name="Target" size={12} />
                              <span>Actionable</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                        iconSize={16}
                        onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                      />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm text-foreground whitespace-pre-line">
                        {insight.details}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Affected Projects:</span>
                        <div className="flex flex-wrap gap-1">
                          {insight.affectedProjects.map((project, index) => (
                            <span
                              key={index}
                              className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {insight.actionable && (
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                          iconSize={14}
                        >
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsPanel;