import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import projectService from '../../utils/projectService';
import taskService from '../../utils/taskService';
import integrationService from '../../utils/integrationService';
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

const DashboardOverview = () => {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
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

        // Load projects
        const projectsResult = await projectService.getProjects();
        if (!projectsResult.success && isMounted) {
          setError(projectsResult.error);
          return;
        }

        // Load overdue tasks
        const overdueResult = await taskService.getOverdueTasks();
        if (!overdueResult.success && isMounted) {
          console.log('Failed to load overdue tasks:', overdueResult.error);
        }

        // Load integrations
        const integrationsResult = await integrationService.getUserIntegrations();
        if (!integrationsResult.success && isMounted) {
          console.log('Failed to load integrations:', integrationsResult.error);
        }

        if (isMounted) {
          const projects = projectsResult.data || [];
          const overdueTasks = overdueResult.data || [];
          const integrations = integrationsResult.data || [];

          // Calculate statistics
          const activeProjects = projects.filter(p => ['planning', 'on-track', 'at-risk'].includes(p.status)).length;
          const completedThisWeek = projects.reduce((total, project) => {
            const completedTasks = project.tasks?.filter(task => {
              if (task.status !== 'completed' || !task.completed_at) return false;
              const completedDate = new Date(task.completed_at);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return completedDate >= weekAgo;
            }) || [];
            return total + completedTasks.length;
          }, 0);

          // Mock team utilization (would be calculated from actual data)
          const teamUtilization = 78;

          setDashboardData({
            projects,
            overdueTasks,
            integrations,
            activities: [], // TODO: Load recent activities
            stats: {
              activeProjects,
              overdueTasks: overdueTasks.length,
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
      trend: "up",
      trendValue: "+2",
      icon: "FolderKanban",
      color: "primary"
    },
    {
      title: "Overdue Tasks",
      value: dashboardData.stats.overdueTasks.toString(),
      trend: dashboardData.stats.overdueTasks > 5 ? "up" : "down",
      trendValue: dashboardData.stats.overdueTasks > 5 ? "+3" : "-3",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      title: "Team Utilization",
      value: `${dashboardData.stats.teamUtilization}%`,
      trend: "up",
      trendValue: "+5%",
      icon: "Users",
      color: "success"
    },
    {
      title: "Completed This Week",
      value: dashboardData.stats.completedThisWeek.toString(),
      trend: "up",
      trendValue: `+${Math.max(0, dashboardData.stats.completedThisWeek - 12)}`,
      icon: "CheckCircle",
      color: "success"
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

  const handleViewProjectDetails = (project) => {
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
                  Welcome back{userProfile?.full_name ? `, ${userProfile.full_name}` : ''}! Here's what's happening with your projects today.
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