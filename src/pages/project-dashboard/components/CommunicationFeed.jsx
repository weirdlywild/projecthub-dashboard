import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const CommunicationFeed = ({ onMessageClick }) => {
  const [filterSource, setFilterSource] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'slack', label: 'Slack' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'email', label: 'Email' },
    { value: 'jira', label: 'Jira' },
    { value: 'github', label: 'GitHub' }
  ];

  const communicationData = [
    {
      id: 'msg-1',
      source: 'slack',
      channel: '#project-alpha',
      sender: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      content: `Just finished the wireframes for the mobile app. The user flow looks much cleaner now. \n\nCan someone review the authentication screens? I've uploaded them to Figma.`,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isUnread: true,
      reactions: [
        { emoji: '👍', count: 3 },
        { emoji: '🎉', count: 1 }
      ],
      attachments: [
        { type: 'link', title: 'Figma - Mobile App Wireframes', url: '#' }
      ]
    },
    {
      id: 'msg-2',source: 'teams',channel: 'Development Team',sender: 'Mike Chen',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      content: `CI/CD pipeline is now live! 🚀\n\nAll commits to main branch will automatically trigger:\n• Unit tests\n• Integration tests\n• Deployment to staging\n\nProduction deployments still require manual approval.`,
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isUnread: true,
      reactions: [
        { emoji: '🚀', count: 5 },
        { emoji: '👏', count: 2 }
      ]
    },
    {
      id: 'msg-3',source: 'jira',channel: 'Project Updates',sender: 'Jira Bot',avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=32&h=32&fit=crop&crop=center',
      content: `Sprint Review Summary:\n• 12 stories completed\n• 3 stories moved to next sprint\n• Velocity: 45 story points\n\nNext sprint planning scheduled for tomorrow at 10 AM.`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isUnread: false,
      priority: 'high'
    },
    {
      id: 'msg-4',source: 'email',channel: 'project-team@company.com',sender: 'John Doe',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      content: `Weekly Status Report - July 27, 2025\n\nKey Achievements:\n• Payment gateway integration completed\n• User authentication system deployed\n• Mobile app wireframes approved\n\nUpcoming Milestones:\n• Beta testing begins August 1st\n• Production launch scheduled for September 30th`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isUnread: false,
      attachments: [
        { type: 'file', title: 'Weekly_Report_July_27.pdf', size: '2.3 MB' }
      ]
    },
    {
      id: 'msg-5',source: 'github',channel: 'project-alpha/backend',sender: 'Emma Davis',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      content: `Pull Request #47: Add comprehensive test coverage for payment module\n\n• Added unit tests for payment processing\n• Integration tests for Stripe API\n• Error handling test scenarios\n• Code coverage increased to 95%`,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isUnread: false,
      reactions: [
        { emoji: '✅', count: 2 },
        { emoji: '🧪', count: 1 }
      ]
    },
    {
      id: 'msg-6',source: 'slack',channel: '#general',sender: 'Team Bot',avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=32&h=32&fit=crop&crop=center',content: `Daily Standup Reminder 📅\n\nStandup meeting starts in 15 minutes!\n\nToday's agenda:\n• Yesterday's progress\n• Today's goals\n• Any blockers\n\nJoin the meeting room: #standup-room`,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      isUnread: false,
      priority: 'medium'
    }
  ];

  const getSourceIcon = (source) => {
    switch (source) {
      case 'slack': return 'MessageSquare';
      case 'teams': return 'Video';
      case 'email': return 'Mail';
      case 'jira': return 'Layers';
      case 'github': return 'Github';
      default: return 'MessageCircle';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'slack': return 'text-purple-600';
      case 'teams': return 'text-blue-600';
      case 'email': return 'text-green-600';
      case 'jira': return 'text-blue-500';
      case 'github': return 'text-gray-800';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredMessages = communicationData.filter(message => {
    if (filterSource !== 'all' && message.source !== filterSource) return false;
    if (showUnreadOnly && !message.isUnread) return false;
    return true;
  });

  const unreadCount = communicationData.filter(msg => msg.isUnread).length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Communication Feed</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            Unread Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconSize={16}
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <Select
          label="Filter by Source"
          options={sourceOptions}
          value={filterSource}
          onChange={setFilterSource}
          className="w-48"
        />
        
        <div className="flex items-center space-x-4">
          <IntegrationStatusIndicator status="connected" service="Slack" showLabel size="sm" />
          <IntegrationStatusIndicator status="connected" service="Teams" showLabel size="sm" />
          <IntegrationStatusIndicator status="syncing" service="Email" showLabel size="sm" />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageClick(message)}
            className={`p-4 rounded-lg border cursor-pointer hover:elevation-1 transition-all duration-200 ${
              message.isUnread 
                ? 'bg-primary/5 border-primary/20' :'bg-muted border-border'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                  message.source === 'slack' ? 'bg-purple-600' :
                  message.source === 'teams' ? 'bg-blue-600' :
                  message.source === 'email' ? 'bg-green-600' :
                  message.source === 'jira' ? 'bg-blue-500' :
                  message.source === 'github' ? 'bg-gray-800' : 'bg-muted-foreground'
                }`}>
                  <Icon 
                    name={getSourceIcon(message.source)} 
                    size={10} 
                    color="white" 
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{message.sender}</span>
                    <span className="text-sm text-muted-foreground">in {message.channel}</span>
                    {message.priority && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        message.priority === 'high' ? 'bg-error/10 text-error' :
                        message.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                      }`}>
                        {message.priority}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                
                <div className="text-sm text-foreground mb-3 whitespace-pre-line">
                  {message.content}
                </div>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-background rounded-lg p-2">
                        <Icon 
                          name={attachment.type === 'file' ? 'FileText' : 'Link'} 
                          size={16} 
                          className="text-muted-foreground" 
                        />
                        <span className="text-sm text-foreground">{attachment.title}</span>
                        {attachment.size && (
                          <span className="text-xs text-muted-foreground">({attachment.size})</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex items-center space-x-2">
                    {message.reactions.map((reaction, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-1 bg-background hover:bg-muted rounded-full px-2 py-1 text-sm transition-colors duration-150"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-muted-foreground">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronDown"
          iconPosition="right"
        >
          Load More Messages
        </Button>
      </div>
    </div>
  );
};

export default CommunicationFeed;