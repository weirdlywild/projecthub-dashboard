import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, value, trend, trendValue, icon, color = 'primary' }) => {
  const getColorClasses = (color) => {
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

  const colorClasses = getColorClasses(color);
  const isPositiveTrend = trend === 'up';

  return (
    <div className="bg-card rounded-lg p-6 border border-border elevation-1 hover:elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
        {trendValue && (
          <div className={`flex items-center space-x-1 ${isPositiveTrend ? 'text-success' : 'text-error'}`}>
            <Icon 
              name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
            />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default SummaryCard;