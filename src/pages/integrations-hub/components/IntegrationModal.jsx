import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const IntegrationModal = ({ integration, isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    syncFrequency: integration?.syncFrequency || 'hourly',
    dataScope: integration?.dataScope || 'basic',
    notifications: integration?.notifications || true,
    autoSync: integration?.autoSync || true,
    webhookUrl: integration?.webhookUrl || '',
    apiKey: integration?.apiKey || ''
  });

  const syncFrequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: '15min', label: 'Every 15 minutes' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'manual', label: 'Manual only' }
  ];

  const dataScopeOptions = [
    { value: 'basic', label: 'Basic (Read-only)' },
    { value: 'standard', label: 'Standard (Read/Write)' },
    { value: 'full', label: 'Full Access' }
  ];

  const handleSave = () => {
    onSave(integration.id, settings);
    onClose();
  };

  if (!isOpen || !integration) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image 
                src={integration.logo} 
                alt={`${integration.name} logo`}
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{integration.name} Settings</h2>
              <p className="text-sm text-muted-foreground">Configure integration preferences</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sync Settings */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Sync Settings</h3>
            <div className="space-y-4">
              <Select
                label="Sync Frequency"
                description="How often should data be synchronized?"
                options={syncFrequencyOptions}
                value={settings.syncFrequency}
                onChange={(value) => setSettings(prev => ({ ...prev, syncFrequency: value }))}
              />
              
              <Select
                label="Data Scope"
                description="Level of access permissions"
                options={dataScopeOptions}
                value={settings.dataScope}
                onChange={(value) => setSettings(prev => ({ ...prev, dataScope: value }))}
              />

              <div className="flex items-center space-x-4">
                <Checkbox
                  label="Enable auto-sync"
                  description="Automatically sync data based on frequency"
                  checked={settings.autoSync}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoSync: e.target.checked }))}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Checkbox
                  label="Enable notifications"
                  description="Receive notifications for sync events"
                  checked={settings.notifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <Input
                label="Webhook URL"
                description="Optional webhook endpoint for real-time updates"
                type="url"
                placeholder="https://your-app.com/webhooks/integration"
                value={settings.webhookUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
              />

              <Input
                label="Custom API Key"
                description="Override default API credentials (optional)"
                type="password"
                placeholder="Enter custom API key"
                value={settings.apiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>
          </div>

          {/* Connection Info */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Connection Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-foreground font-medium capitalize">{integration.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected:</span>
                <span className="text-foreground font-medium">
                  {integration.connectedAt ? new Date(integration.connectedAt).toLocaleDateString() : 'Not connected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync:</span>
                <span className="text-foreground font-medium">
                  {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;