import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import ChartWidget from './components/ChartWidget';
import FilterControls from './components/FilterControls';
import ReportExporter from './components/ReportExporter';
import InsightsPanel from './components/InsightsPanel';

const AnalyticsReports = () => {
  const [loading, setLoading] = useState(true);
  const [showExporter, setShowExporter] = useState(false);
  const [filters, setFilters] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      title: 'Project Velocity',
      value: '42 pts',
      change: '+23%',
      changeType: 'increase',
      icon: 'Zap',
      color: 'primary',
      trend: [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.9]
    },
    {
      title: 'Team Productivity',
      value: '87%',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success',
      trend: [0.6, 0.7, 0.8, 0.75, 0.85, 0.87, 0.9]
    },
    {
      title: 'Milestone Completion',
      value: '94%',
      change: '+8%',
      changeType: 'increase',
      icon: 'Target',
      color: 'success',
      trend: [0.8, 0.82, 0.85, 0.88, 0.91, 0.93, 0.94]
    },
    {
      title: 'Average Resolution Time',
      value: '2.3 days',
      change: '-15%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'warning',
      trend: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3]
    }
  ];

  // Mock chart data
  const velocityData = [
    { name: 'Sprint 10', velocity: 28, planned: 30, completed: 26 },
    { name: 'Sprint 11', velocity: 32, planned: 35, completed: 31 },
    { name: 'Sprint 12', velocity: 34, planned: 32, completed: 34 },
    { name: 'Sprint 13', velocity: 38, planned: 36, completed: 37 },
    { name: 'Sprint 14', velocity: 42, planned: 40, completed: 41 },
    { name: 'Sprint 15', velocity: 39, planned: 42, completed: 38 }
  ];

  const workloadData = [
    { name: 'Sarah Johnson', tasks: 12, capacity: 15, utilization: 80 },
    { name: 'Michael Chen', tasks: 14, capacity: 16, utilization: 87 },
    { name: 'Emily Rodriguez', tasks: 10, capacity: 14, utilization: 71 },
    { name: 'David Kim', tasks: 16, capacity: 18, utilization: 89 },
    { name: 'Lisa Thompson', tasks: 11, capacity: 15, utilization: 73 },
    { name: 'James Wilson', tasks: 13, capacity: 16, utilization: 81 }
  ];

  const burndownData = [
    { name: 'Day 1', remaining: 120, ideal: 120 },
    { name: 'Day 3', remaining: 105, ideal: 102 },
    { name: 'Day 5', remaining: 88, ideal: 85 },
    { name: 'Day 7', remaining: 72, ideal: 68 },
    { name: 'Day 9', remaining: 54, ideal: 51 },
    { name: 'Day 11', remaining: 38, ideal: 34 },
    { name: 'Day 13', remaining: 22, ideal: 17 },
    { name: 'Day 15', remaining: 8, ideal: 0 }
  ];

  const integrationData = [
    { name: 'Jira', value: 35, fill: '#2563EB' },
    { name: 'Slack', value: 25, fill: '#059669' },
    { name: 'GitHub', value: 20, fill: '#D97706' },
    { name: 'Google Workspace', value: 15, fill: '#DC2626' },
    { name: 'Others', value: 5, fill: '#7C3AED' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExport = async (config) => {
    // Simulate export process
    console.log('Exporting report with config:', config);
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSchedule = async (config) => {
    // Simulate scheduling
    console.log('Scheduling report with config:', config);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <>
      <Helmet>
        <title>Analytics & Reports - ProjectHub Dashboard</title>
        <meta name="description" content="Comprehensive project performance insights with data visualization and automated reporting capabilities across all integrated platforms." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationSidebar />
        
        <main className="lg:ml-60 min-h-screen">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-subtle border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <BreadcrumbNavigation />
                  <div className="flex items-center space-x-3 mt-2">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Comprehensive project performance insights and automated reporting
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="RefreshCw"
                    iconSize={16}
                    loading={refreshing}
                    onClick={handleRefresh}
                  >
                    Refresh
                  </Button>
                  
                  <Button
                    variant="default"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => setShowExporter(true)}
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 pb-20 lg:pb-6">
            {/* Filter Controls */}
            <FilterControls 
              onFiltersChange={handleFiltersChange}
              loading={loading}
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  changeType={kpi.changeType}
                  icon={kpi.icon}
                  color={kpi.color}
                  trend={kpi.trend}
                  loading={loading}
                />
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWidget
                title="Sprint Velocity Trends"
                data={velocityData}
                type="line"
                height={350}
                loading={loading}
                onExport={() => setShowExporter(true)}
              />
              
              <ChartWidget
                title="Team Workload Distribution"
                data={workloadData}
                type="bar"
                height={350}
                loading={loading}
                onExport={() => setShowExporter(true)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWidget
                title="Sprint Burndown Chart"
                data={burndownData}
                type="line"
                height={350}
                loading={loading}
                onExport={() => setShowExporter(true)}
              />
              
              <ChartWidget
                title="Integration Usage Distribution"
                data={integrationData}
                type="pie"
                height={350}
                loading={loading}
                onExport={() => setShowExporter(true)}
              />
            </div>

            {/* AI Insights Panel */}
            <InsightsPanel loading={loading} />

            {/* Performance Summary */}
            <div className="bg-card border border-border rounded-lg p-6 elevation-1">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="TrendingUp" size={20} className="text-success" />
                <h3 className="text-lg font-semibold text-foreground">Performance Summary</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">↑ 23%</div>
                  <div className="text-sm text-muted-foreground">Overall Productivity</div>
                  <div className="text-xs text-muted-foreground mt-1">vs last month</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">94%</div>
                  <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                  <div className="text-xs text-muted-foreground mt-1">across all projects</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">2.3d</div>
                  <div className="text-sm text-muted-foreground">Avg Resolution Time</div>
                  <div className="text-xs text-muted-foreground mt-1">15% improvement</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Export Modal */}
        <ReportExporter
          isOpen={showExporter}
          onClose={() => setShowExporter(false)}
          onExport={handleExport}
          onSchedule={handleSchedule}
        />
      </div>
    </>
  );
};

export default AnalyticsReports;