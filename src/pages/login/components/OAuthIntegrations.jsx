import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Icon from '../../../components/AppIcon';

const OAuthIntegrations = () => {
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState({});

  const integrationServices = [
    {
      id: 'google',
      name: 'Google Workspace',
      icon: 'Mail',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 'microsoft',
      name: 'Microsoft 365',
      icon: 'Building2',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'MessageSquare',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      id: 'atlassian',
      name: 'Atlassian',
      icon: 'Layers',
      color: 'text-blue-800',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200'
    }
  ];

  const handleOAuthConnect = async (serviceId, serviceName) => {
    setLoadingStates(prev => ({ ...prev, [serviceId]: true }));
    
    // Simulate OAuth flow
    setTimeout(() => {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('connectedService', serviceName);
      localStorage.setItem('userEmail', `user@${serviceId}.com`);
      
      // Redirect to dashboard with integration pre-configured
      router.push('/dashboard-overview');
      
      setLoadingStates(prev => ({ ...prev, [serviceId]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {integrationServices.map((service) => (
          <button
            key={service.id}
            onClick={() => handleOAuthConnect(service.id, service.name)}
            disabled={loadingStates[service.id]}
            className={`
              w-full flex items-center justify-center space-x-3 px-4 py-3 
              border ${service.borderColor} ${service.bgColor} 
              rounded-lg transition-all duration-150 
              hover:elevation-1 disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary/20
            `}
          >
            {loadingStates[service.id] ? (
              <Icon name="Loader2" size={20} className="animate-spin text-muted-foreground" />
            ) : (
              <Icon name={service.icon} size={20} className={service.color} />
            )}
            <span className="font-medium text-foreground">
              {loadingStates[service.id] 
                ? `Connecting to ${service.name}...` 
                : `Connect with ${service.name}`
              }
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OAuthIntegrations;