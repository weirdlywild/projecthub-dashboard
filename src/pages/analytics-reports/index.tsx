import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

interface ChartData {
  name: string;
  value: number;
}

const AnalyticsReports = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock KPI data
  const kpiData: KPIData[] = [
    {
      title: 'Total Projects',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: 'FolderKanban'
    },
    {
      title: 'Completed Tasks',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: 'CheckCircle'
    },
    {
      title: 'Team Productivity',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      title: 'Average Completion Time',
      value: '4.2 days',
      change: '-15%',
      trend: 'down',
      icon: 'Clock'
    }
  ];

  // Mock chart data
  const projectStatusData: ChartData[] = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 30 },
    { name: 'Planning', value: 15 },
    { name: 'On Hold', value: 10 }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Mock export functionality
    alert('Export functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Analytics & Reports - ProjectHub Dashboard</title>
        <meta name="description" content="View detailed analytics and reports for your projects" />
      </Head>

      <div className="min-h-screen bg-background">
        <NavigationSidebar />
        
        <main className={`transition-all duration-300 ${isMobile ? 'ml-0 pb-16' : 'ml-16 lg:ml-60'}`}>
          <div className="p-6">
            {/* Header Section */}
            <div className="mb-6">
              <BreadcrumbNavigation />
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                  <p className="text-muted-foreground">
                    Track your project performance and team productivity with detailed insights.
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <Button
                    variant="outline"
                    iconName="RefreshCw"
                    iconPosition="left"
                    loading={refreshing}
                    onClick={handleRefresh}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="default"
                    iconName="Download"
                    iconPosition="left"
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon name={kpi.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Icon 
                      name={kpi.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={`mr-1 ${kpi.trend === 'up' ? 'text-success' : 'text-error'}`} 
                    />
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-success' : 'text-error'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Project Status Chart */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Project Status Distribution</h3>
                  <Icon name="PieChart" size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {projectStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index] 
                          }}
                        />
                        <span className="text-sm text-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productivity Trends */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Productivity Trends</h3>
                  <Icon name="BarChart3" size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tasks Completed</span>
                    <span className="text-sm font-medium text-foreground">156 this month</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">On-time Delivery</span>
                    <span className="text-sm font-medium text-foreground">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Team Utilization</span>
                    <span className="text-sm font-medium text-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Panel */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
                <Icon name="Lightbulb" size={20} className="text-muted-foreground" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Positive Trend</span>
                  </div>
                  <p className="text-sm text-foreground">
                    Project completion rate has improved by 15% compared to last quarter.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Attention Needed</span>
                  </div>
                  <p className="text-sm text-foreground">
                    3 projects are approaching their deadlines and may need additional resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsReports;