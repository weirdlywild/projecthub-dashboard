import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ searchQuery, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insights] = useState({
    summary: `Based on your search for "${searchQuery}", I found ${results.length} relevant items across your connected platforms. The majority of results come from Google Drive (45%) and Slack (32%), with recent activity concentrated around Project Alpha and Q4 planning initiatives.`,
    keyFindings: [
      {
        title: "Most Active Project",
        value: "Project Alpha",
        description: "67% of recent documents and discussions relate to this project",
        icon: "TrendingUp"
      },
      {
        title: "Primary Contributors",
        value: "Sarah Chen, Mike Johnson",
        description: "These team members appear in 80% of the relevant content",
        icon: "Users"
      },
      {
        title: "Content Hotspot",
        value: "Last 7 days",
        description: "78% of matching content was created or modified recently",
        icon: "Calendar"
      }
    ],
    relatedSuggestions: [
      {
        query: "Project Alpha sprint planning documents",
        reason: "Related to your most active project",
        estimatedResults: 23
      },
      {
        query: "Q4 budget approval Sarah Chen",
        reason: "Combines frequent topics and contributors",
        estimatedResults: 15
      },
      {
        query: "team meeting notes last week",
        reason: "Based on recent activity patterns",
        estimatedResults: 31
      }
    ],
    contentGaps: [
      {
        title: "Missing Documentation",
        description: "No recent technical specifications found for Project Alpha",
        suggestion: "Check GitHub repositories or Confluence spaces"
      },
      {
        title: "Outdated Information",
        description: "Some budget documents haven't been updated since Q3",
        suggestion: "Review and update financial planning materials"
      }
    ]
  });

  const handleSuggestionClick = (suggestion) => {
    // This would trigger a new search with the suggested query
    console.log(`Searching for: ${suggestion.query}`);
  };

  if (!searchQuery || results.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-medium text-foreground">AI Insights</h3>
            <p className="text-xs text-muted-foreground">Powered by intelligent analysis</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconSize={16}
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-sm text-foreground leading-relaxed">
          {insights.summary}
        </p>
      </div>

      {/* Key Findings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {insights.keyFindings.map((finding, index) => (
          <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={finding.icon} size={16} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                {finding.title}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              {finding.value}
            </p>
            <p className="text-xs text-muted-foreground">
              {finding.description}
            </p>
          </div>
        ))}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border/50">
          {/* Related Suggestions */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
              Suggested Searches
            </h4>
            <div className="space-y-2">
              {insights.relatedSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card/30 border border-border/30 rounded-lg hover:bg-card/50 transition-colors duration-150"
                >
                  <div className="flex-1">
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left w-full"
                    >
                      <p className="text-sm font-medium text-foreground mb-1">
                        "{suggestion.query}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.reason} • ~{suggestion.estimatedResults} results
                      </p>
                    </button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    iconName="ArrowRight"
                    iconSize={14}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content Gaps */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
              Potential Gaps
            </h4>
            <div className="space-y-2">
              {insights.contentGaps.map((gap, index) => (
                <div
                  key={index}
                  className="p-3 bg-warning/5 border border-warning/20 rounded-lg"
                >
                  <h5 className="text-sm font-medium text-foreground mb-1">
                    {gap.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mb-2">
                    {gap.description}
                  </p>
                  <p className="text-xs text-warning font-medium">
                    💡 {gap.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;