import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import SummaryCard from './components/SummaryCard';
import ProjectCard from './components/ProjectCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import IntegrationStatus from './components/IntegrationStatus';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import TeamUtilization from './components/TeamUtilization';
import Button from '../../components/ui/Button';
import type { Project, Task, Integration } from '../../types';

interface DashboardStats {
  activeProjects: number;
  overdueTasks: number;
  teamUtilization: number;
  completedThisWeek: number;
}

interface DashboardProject {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: string;
  teamSize: number;
  teamMembers: {
    id: string;
    name: string;
    avatar: string;
  }[];
  alerts: {
    id: string;
    message: string;
  }[];
}

interface DashboardData {
  projects: DashboardProject[];
  overdueTasks: Task[];
  integrations: Integration[];
  activities: any[];
  stats: DashboardStats;
}

const DashboardOverview = () => {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    projects: [],
    overdueTasks: [],
    integrations: [],
    activities: [],
    stats: {
      activeProjects: 0,
      overdueTasks: 0,
      teamUtilization: 0,
      completedThisWeek: 0
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      if (authLoading || !user) return;

      try {
        setLoading(true);
        setError(null);

        // Mock data for now since services might not be available
        const mockProjects = [
          {
            id: '1',
            name: 'Website Redesign',
            description: 'Complete redesign of company website',
            status: 'on-track',
            priority: 'high',
            progress: 75,
            dueDate: '2024-03-01',
            teamSize: 4,
            teamMembers: [
              {
                id: '1',
                name: 'John Doe',
                avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=32&background=3b82f6&color=ffffff'
              },
              {
                id: '2',
                name: 'Jane Smith',
                avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&size=32&background=10b981&color=ffffff'
              },
              {
                id: '3',
                name: 'Mike Johnson',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&size=32&background=f59e0b&color=ffffff'
              }
            ],
            alerts: []
          },
          {
            id: '2',
            name: 'Mobile App Development',
            description: 'Develop mobile application for iOS and Android',
            status: 'at-risk',
            priority: 'medium',
            progress: 45,
            dueDate: '2024-06-01',
            teamSize: 6,
            teamMembers: [
              {
                id: '4',
                name: 'Sarah Wilson',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&size=32&background=ef4444&color=ffffff'
              },
              {
                id: '5',
                name: 'Tom Brown',
                avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&size=32&background=8b5cf6&color=ffffff'
              },
              {
                id: '6',
                name: 'Lisa Davis',
                avatar: 'https://ui-avatars.com/api/?name=Lisa+Davis&size=32&background=06b6d4&color=ffffff'
              },
              {
                id: '7',
                name: 'Chris Lee',
                avatar: 'https://ui-avatars.com/api/?name=Chris+Lee&size=32&background=84cc16&color=ffffff'
              }
            ],
            alerts: [
              { id: '1', message: 'Behind schedule' }
            ]
          },
          {
            id: '3',
            name: 'API Integration',
            description: 'Integrate third-party APIs for enhanced functionality',
            status: 'on-track',
            priority: 'low',
            progress: 90,
            dueDate: '2024-02-15',
            teamSize: 2,
            teamMembers: [
              {
                id: '8',
                name: 'Alex Chen',
                avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&size=32&background=f97316&color=ffffff'
              },
              {
                id: '9',
                name: 'Emma Taylor',
                avatar: 'https://ui-avatars.com/api/?name=Emma+Taylor&size=32&background=ec4899&color=ffffff'
              }
            ],
            alerts: []
          }
        ];

        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Design homepage mockup',
            description: 'Create initial design for homepage',
            status: 'todo',
            priority: 'high',
            project_id: '1',
            due_date: '2024-01-15',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        ];

        const mockIntegrations: Integration[] = [
          {
            id: '1',
            name: 'GitHub',
            type: 'github',
            status: 'connected',
            config: {},
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        ];

        if (isMounted) {
          const activeProjects = mockProjects.filter(p => ['on-track', 'at-risk'].includes(p.status)).length;
          const completedThisWeek = 5; // Mock value
          const teamUtilization = 78; // Mock value

          setDashboardData({
            projects: mockProjects,
            overdueTasks: mockTasks,
            integrations: mockIntegrations,
            activities: [],
            stats: {
              activeProjects,
              overdueTasks: mockTasks.length,
              teamUtilization,
              completedThisWeek
            }
          });
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load dashboard data');
          console.log('Dashboard error:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const summaryData = [
    {
      title: "Active Projects",
      value: dashboardData.stats.activeProjects.toString(),
      trend: "up" as const,
      trendValue: "+2",
      icon: "FolderKanban",
      color: "primary" as const
    },
    {
      title: "Overdue Tasks",
      value: dashboardData.stats.overdueTasks.toString(),
      trend: dashboardData.stats.overdueTasks > 5 ? "up" as const : "down" as const,
      trendValue: dashboardData.stats.overdueTasks > 5 ? "+3" : "-3",
      icon: "AlertTriangle",
      color: "error" as const
    },
    {
      title: "Team Utilization",
      value: `${dashboardData.stats.teamUtilization}%`,
      trend: "up" as const,
      trendValue: "+5%",
      icon: "Users",
      color: "success" as const
    },
    {
      title: "Completed This Week",
      value: dashboardData.stats.completedThisWeek.toString(),
      trend: "up" as const,
      trendValue: `+${Math.max(0, dashboardData.stats.completedThisWeek - 12)}`,
      icon: "CheckCircle",
      color: "success" as const
    }
  ];

  const handleCreateProject = () => {
    router.push('/project-dashboard');
  };

  const handleAddIntegration = () => {
    router.push('/integrations-hub');
  };

  const handleViewAnalytics = () => {
    router.push('/analytics-reports');
  };

  const handleViewProjectDetails = (project: Project) => {
    router.push({
      pathname: '/project-dashboard',
      query: { selectedProject: JSON.stringify(project) }
    });
  };

  const handleManageIntegrations = () => {
    router.push('/integrations-hub');
  };

  const handleViewAllDeadlines = () => {
    router.push({
      pathname: '/project-dashboard',
      query: { tab: 'deadlines' }
    });
  };

  const handleViewTeam = () => {
    router.push({
      pathname: '/project-dashboard',
      query: { tab: 'team' }
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 pb-16' : 'ml-16 lg:ml-60'}`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbNavigation />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">
                  Welcome back{userProfile?.full_name ? `, ${userProfile.full_name}` : ''}! Here&apos;s what&apos;s happening with your projects today.
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => router.push('/search-discovery')}
                >
                  Search
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleCreateProject}
                >
                  New Project
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData.map((card, index) => (
              <SummaryCard
                key={index}
                title={card.title}
                value={card.value}
                trend={card.trend}
                trendValue={card.trendValue}
                icon={card.icon}
                color={card.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions
              onCreateProject={handleCreateProject}
              onAddIntegration={handleAddIntegration}
              onViewAnalytics={handleViewAnalytics}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Projects */}
            <div className="xl:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
                  <Button
                    variant="ghost"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => router.push('/project-dashboard')}
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dashboardData.projects.slice(0, 4).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={handleViewProjectDetails}
                    />
                  ))}
                  {dashboardData.projects.length === 0 && (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">No projects found. Create your first project to get started.</p>
                      <Button
                        className="mt-4"
                        onClick={handleCreateProject}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Create Project
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Integration Status */}
              <IntegrationStatus
                integrations={dashboardData.integrations}
                onManageIntegrations={handleManageIntegrations}
              />
            </div>

            {/* Right Column - Activity Feed */}
            <div className="space-y-6">
              <ActivityFeed activities={dashboardData.activities} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingDeadlines
              deadlines={dashboardData.overdueTasks.slice(0, 4)}
              onViewAll={handleViewAllDeadlines}
            />
            <TeamUtilization
              teamMembers={[]} // TODO: Load team members data
              onViewTeam={handleViewTeam}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;