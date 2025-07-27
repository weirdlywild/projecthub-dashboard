import React from 'react';
import Icon from '../../../components/AppIcon';

interface SummaryCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  icon: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const SummaryCard = ({ title, value, trend, trendValue, icon, color = 'primary' }: SummaryCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          icon: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          icon: 'text-error'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'text-primary'
        };
    }
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const colors = getColorClasses(color);

  return (
    <div className="bg-card rounded-lg border border-border p-6 elevation-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colors.bg}`}>
          <Icon name={icon} size={24} className={colors.icon} />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <Icon 
          name={getTrendIcon(trend)} 
          size={16} 
          className={`mr-1 ${getTrendColor(trend)}`} 
        />
        <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
          {trendValue}
        </span>
        <span className="text-sm text-muted-foreground ml-1">from last month</span>
      </div>
    </div>
  );
};

export default SummaryCard;