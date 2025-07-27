import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  variant = 'default',
  size = 'sm',
  showZero = false,
  className = '',
  children 
}) => {
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeStyles = (size) => {
    switch (size) {
      case 'xs':
        return {
          badge: 'min-w-[16px] h-4 text-xs px-1',
          dot: 'w-2 h-2'
        };
      case 'sm':
        return {
          badge: 'min-w-[18px] h-[18px] text-xs px-1.5',
          dot: 'w-2.5 h-2.5'
        };
      case 'md':
        return {
          badge: 'min-w-[20px] h-5 text-sm px-2',
          dot: 'w-3 h-3'
        };
      case 'lg':
        return {
          badge: 'min-w-[24px] h-6 text-sm px-2',
          dot: 'w-3.5 h-3.5'
        };
      default:
        return {
          badge: 'min-w-[18px] h-[18px] text-xs px-1.5',
          dot: 'w-2.5 h-2.5'
        };
    }
  };

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const shouldShow = count > 0 || showZero;

  if (children) {
    return (
      <div className={`relative inline-block ${className}`}>
        {children}
        {shouldShow && (
          <span className={`absolute -top-1 -right-1 ${sizeStyles.badge} ${variantStyles} rounded-full flex items-center justify-center font-medium leading-none z-10`}>
            {displayCount}
          </span>
        )}
      </div>
    );
  }

  if (!shouldShow) {
    return null;
  }

  // Dot variant for small counts
  if (count > 0 && count < 10 && size === 'xs') {
    return (
      <span className={`${sizeStyles.dot} ${variantStyles} rounded-full ${className}`} />
    );
  }

  return (
    <span className={`${sizeStyles.badge} ${variantStyles} rounded-full flex items-center justify-center font-medium leading-none ${className}`}>
      {displayCount}
    </span>
  );
};

export default NotificationBadge;