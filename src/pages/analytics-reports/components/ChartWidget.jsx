import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChartWidget = ({ 
  title, 
  data, 
  type = 'line', 
  height = 300,
  showControls = true,
  loading = false,
  onExport,
  onDrillDown 
}) => {
  const [chartType, setChartType] = useState(type);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED', '#0EA5E9'];

  const chartTypes = [
    { type: 'line', icon: 'TrendingUp', label: 'Line Chart' },
    { type: 'bar', icon: 'BarChart3', label: 'Bar Chart' },
    { type: 'pie', icon: 'PieChart', label: 'Pie Chart' }
  ];

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} className="text-muted-foreground" />
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Legend />
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Legend />
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[2, 2, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        const pieData = data.map((item, index) => ({
          ...item,
          fill: colors[index % colors.length]
        }));
        
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-1 ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {chartTypes.map((chart) => (
                <button
                  key={chart.type}
                  onClick={() => setChartType(chart.type)}
                  className={`p-2 rounded-md transition-colors duration-150 ${
                    chartType === chart.type
                      ? 'bg-background text-foreground elevation-1'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={chart.label}
                >
                  <Icon name={chart.icon} size={16} />
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconSize={16}
              onClick={onExport}
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              iconSize={16}
              onClick={() => setIsFullscreen(!isFullscreen)}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div style={{ height: isFullscreen ? 'calc(100vh - 200px)' : height }}>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;