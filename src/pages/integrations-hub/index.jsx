import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IntegrationCard from './components/IntegrationCard';
import CategoryFilter from './components/CategoryFilter';
import ActivityLog from './components/ActivityLog';
import IntegrationStats from './components/IntegrationStats';
import SearchBar from './components/SearchBar';
import IntegrationModal from './components/IntegrationModal';

const IntegrationsHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for integrations
  const integrations = [
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      category: 'Communication',
      description: 'Connect Gmail, Calendar, Drive, and Chat for seamless collaboration and file management.',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000),
      syncFrequency: 'Every 15 minutes',
      dataScope: 'Standard',
      features: ['Email sync', 'Calendar events', 'File sharing', 'Chat integration'],
      connectedAt: new Date(Date.now() - 86400000 * 7),
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      category: 'Communication',
      description: 'Integrate Outlook, Teams, OneDrive, and SharePoint for comprehensive productivity.',
      logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=64&h=64&fit=crop&crop=center',
      status: 'connected',
      lastSync: new Date(Date.now() - 600000),
      syncFrequency: 'Hourly',
      dataScope: 'Full Access',
      features: ['Outlook sync', 'Teams chat', 'OneDrive files', 'SharePoint docs'],
      connectedAt: new Date(Date.now() - 86400000 * 14),
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'Communication',
      description: 'Sync team conversations, channels, and direct messages for unified communication.',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      status: 'syncing',
      lastSync: new Date(Date.now() - 120000),
      syncFrequency: 'Real-time',
      dataScope: 'Standard',
      features: ['Channel sync', 'Direct messages', 'File sharing', 'Notifications'],
      connectedAt: new Date(Date.now() - 86400000 * 3),
      notifications: true,
      autoSync: true,
      webhookUrl: 'https://hooks.slack.com/services/...',
      apiKey: ''
    },
    {
      id: 'jira',
      name: 'Atlassian Jira',
      category: 'Project Management',
      description: 'Import issues, sprints, epics, and project data for comprehensive project tracking.',
      logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=64&h=64&fit=crop&crop=center',
      status: 'connected',
      lastSync: new Date(Date.now() - 900000),
      syncFrequency: 'Every 30 minutes',
      dataScope: 'Full Access',
      features: ['Issue tracking', 'Sprint management', 'Epic planning', 'Custom fields'],
      connectedAt: new Date(Date.now() - 86400000 * 21),
      notifications: false,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'confluence',
      name: 'Confluence',
      category: 'Documentation',
      description: 'Access team documentation, knowledge base, and collaborative content.',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop&crop=center',
      status: 'error',
      lastSync: new Date(Date.now() - 3600000),
      syncFrequency: 'Daily',
      dataScope: 'Basic',
      features: ['Page sync', 'Space management', 'Comments', 'Attachments'],
      errorMessage: 'Authentication expired. Please reconnect.',
      connectedAt: new Date(Date.now() - 86400000 * 30),
      notifications: true,
      autoSync: false,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'asana',
      name: 'Asana',
      category: 'Project Management',
      description: 'Sync tasks, projects, and team workload for better project visibility.',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      syncFrequency: 'Hourly',
      dataScope: 'Standard',
      features: ['Task management', 'Project tracking', 'Team collaboration', 'Timeline view'],
      connectedAt: null,
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'trello',
      name: 'Trello',
      category: 'Project Management',
      description: 'Import boards, cards, and lists for visual project management integration.',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      syncFrequency: 'Daily',
      dataScope: 'Basic',
      features: ['Board sync', 'Card management', 'List organization', 'Member tracking'],
      connectedAt: null,
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Development',
      description: 'Connect repositories, issues, pull requests, and development workflows.',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=64&h=64&fit=crop&crop=center',
      status: 'connected',
      lastSync: new Date(Date.now() - 1800000),
      syncFrequency: 'Every 15 minutes',
      dataScope: 'Full Access',
      features: ['Repository sync', 'Issue tracking', 'Pull requests', 'Commit history'],
      connectedAt: new Date(Date.now() - 86400000 * 10),
      notifications: true,
      autoSync: true,
      webhookUrl: 'https://api.github.com/repos/...',
      apiKey: ''
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      category: 'Development',
      description: 'Integrate GitLab projects, merge requests, and CI/CD pipeline data.',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=64&h=64&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      syncFrequency: 'Hourly',
      dataScope: 'Standard',
      features: ['Project sync', 'Merge requests', 'Pipeline status', 'Issue boards'],
      connectedAt: null,
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'notion',
      name: 'Notion',
      category: 'Documentation',
      description: 'Access databases, pages, and collaborative workspaces from Notion.',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      syncFrequency: 'Daily',
      dataScope: 'Basic',
      features: ['Database sync', 'Page content', 'Block management', 'Workspace access'],
      connectedAt: null,
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'clickup',
      name: 'ClickUp',
      category: 'Project Management',
      description: 'Sync tasks, spaces, and team productivity data from ClickUp workspace.',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      status: 'disconnected',
      lastSync: null,
      syncFrequency: 'Hourly',
      dataScope: 'Standard',
      features: ['Task sync', 'Space management', 'Time tracking', 'Goal tracking'],
      connectedAt: null,
      notifications: true,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      category: 'File Storage',
      description: 'Access and sync files, folders, and shared documents from Google Drive.',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center',
      status: 'connected',
      lastSync: new Date(Date.now() - 450000),
      syncFrequency: 'Every 30 minutes',
      dataScope: 'Standard',
      features: ['File sync', 'Folder structure', 'Shared files', 'Version history'],
      connectedAt: new Date(Date.now() - 86400000 * 5),
      notifications: false,
      autoSync: true,
      webhookUrl: '',
      apiKey: ''
    }
  ];

  // Mock activity data
  const activities = [
    {
      id: 1,
      service: 'Google Workspace',
      type: 'sync',
      status: 'connected',
      message: 'Successfully synced 24 emails and 3 calendar events',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      service: 'Slack',
      type: 'sync',
      status: 'syncing',
      message: 'Syncing messages from #general and #development channels',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 3,
      service: 'Confluence',
      type: 'error',
      status: 'error',
      message: 'Authentication token expired, please reconnect',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      service: 'GitHub',
      type: 'sync',
      status: 'connected',
      message: 'Imported 12 new issues and 5 pull requests',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 5,
      service: 'Microsoft 365',
      type: 'configured',
      status: 'connected',
      message: 'Updated sync frequency to hourly',
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'communication', name: 'Communication', icon: 'MessageSquare' },
    { id: 'project-management', name: 'Project Management', icon: 'FolderKanban' },
    { id: 'development', name: 'Development', icon: 'Code' },
    { id: 'file-storage', name: 'File Storage', icon: 'HardDrive' },
    { id: 'documentation', name: 'Documentation', icon: 'FileText' }
  ];

  // Calculate stats
  const stats = {
    total: integrations.length,
    connected: integrations.filter(i => i.status === 'connected').length,
    syncing: integrations.filter(i => i.status === 'syncing').length,
    errors: integrations.filter(i => i.status === 'error').length
  };

  // Filter integrations
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || integration.category.toLowerCase().replace(' ', '-') === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle integration actions
  const handleConnect = async (integrationId) => {
    // Mock OAuth flow
    console.log(`Connecting to ${integrationId}...`);
    // In real app, this would open OAuth popup
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleDisconnect = async (integrationId) => {
    console.log(`Disconnecting from ${integrationId}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleManage = (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleSaveSettings = (integrationId, settings) => {
    console.log(`Saving settings for ${integrationId}:`, settings);
    // In real app, this would update the integration settings
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <main className="lg:ml-60 min-h-screen">
        <div className="p-6 pb-20 lg:pb-6">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbNavigation />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Integrations Hub</h1>
                <p className="text-muted-foreground mt-1">
                  Connect and manage third-party services to centralize your project data
                </p>
              </div>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                iconSize={20}
              >
                Add Integration
              </Button>
            </div>
          </div>

          {/* Stats */}
          <IntegrationStats stats={stats} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Search and Filters */}
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search integrations by name or description..."
              />
              
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Integrations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No integrations found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or category filter
                    </p>
                  </div>
                ) : (
                  filteredIntegrations.map((integration) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      onConnect={handleConnect}
                      onDisconnect={handleDisconnect}
                      onManage={handleManage}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <ActivityLog activities={activities} />
            </div>
          </div>
        </div>
      </main>

      {/* Integration Settings Modal */}
      <IntegrationModal
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIntegration(null);
        }}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default IntegrationsHub;