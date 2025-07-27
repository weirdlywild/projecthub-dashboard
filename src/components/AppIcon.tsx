import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import type { IconProps } from '../types';

interface ExtendedIconProps extends IconProps {
  strokeWidth?: number;
  color?: string;
  [key: string]: any;
}

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}: ExtendedIconProps) {
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}

export default Icon;