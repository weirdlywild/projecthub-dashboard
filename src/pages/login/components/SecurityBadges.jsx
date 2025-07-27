import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'OAuth 2.0',
      description: 'Secure authentication'
    },
    {
      icon: 'CheckCircle',
      text: 'SOC 2 Compliant',
      description: 'Enterprise security'
    },
    {
      icon: 'Globe',
      text: 'GDPR Ready',
      description: 'Privacy protected'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityFeatures.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center space-y-2 p-3 rounded-lg bg-muted/30"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon 
                name={feature.icon} 
                size={16} 
                className="text-success" 
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                {feature.text}
              </p>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security standards
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;