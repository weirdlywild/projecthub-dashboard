import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend = [], 
  color = 'primary',
  loading = false 
}) => {
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

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
          </div>
          <div className="h-8 bg-muted rounded w-20 mb-2"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} className={colorClasses.icon} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        
        {change && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${
              changeType === 'increase' ? 'text-success' : 
              changeType === 'decrease'? 'text-error' : 'text-muted-foreground'
            }`}>
              {changeType === 'increase' && <Icon name="TrendingUp" size={16} />}
              {changeType === 'decrease' && <Icon name="TrendingDown" size={16} />}
              <span className="text-sm font-medium">{change}</span>
            </div>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
        
        {trend.length > 0 && (
          <div className="flex items-end space-x-1 h-8 mt-3">
            {trend.map((value, index) => (
              <div
                key={index}
                className={`${colorClasses.bg} rounded-sm flex-1`}
                style={{ height: `${Math.max(value * 100, 4)}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;