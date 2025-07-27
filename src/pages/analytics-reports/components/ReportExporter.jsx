import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportExporter = ({ onExport, onSchedule, isOpen, onClose }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeData: true,
    includeSummary: true,
    dateRange: true,
    fileName: `analytics-report-${new Date().toISOString().split('T')[0]}`
  });

  const [scheduleConfig, setScheduleConfig] = useState({
    enabled: false,
    frequency: 'weekly',
    day: 'monday',
    time: '09:00',
    recipients: []
  });

  const [activeTab, setActiveTab] = useState('export');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'html', label: 'HTML Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'xlsx', label: 'Excel Spreadsheet' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const dayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' }
  ];

  const recipientOptions = [
    { value: 'sarah@company.com', label: 'Sarah Johnson' },
    { value: 'michael@company.com', label: 'Michael Chen' },
    { value: 'emily@company.com', label: 'Emily Rodriguez' },
    { value: 'david@company.com', label: 'David Kim' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport?.(exportConfig);
      setTimeout(() => {
        setIsExporting(false);
        onClose?.();
      }, 2000);
    } catch (error) {
      setIsExporting(false);
    }
  };

  const handleSchedule = async () => {
    try {
      await onSchedule?.(scheduleConfig);
      onClose?.();
    } catch (error) {
      console.error('Failed to schedule report:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden elevation-3">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Export & Schedule Reports</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'export'
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Download" size={16} className="inline mr-2" />
            Export Now
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'schedule' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Calendar" size={16} className="inline mr-2" />
            Schedule Reports
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Export Format"
                  options={formatOptions}
                  value={exportConfig.format}
                  onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
                />
                
                <Input
                  label="File Name"
                  type="text"
                  value={exportConfig.fileName}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, fileName: e.target.value }))}
                  placeholder="Enter file name"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Include in Export</h3>
                
                <Checkbox
                  label="Charts and Visualizations"
                  checked={exportConfig.includeCharts}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                />
                
                <Checkbox
                  label="Raw Data Tables"
                  checked={exportConfig.includeData}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, includeData: e.target.checked }))}
                />
                
                <Checkbox
                  label="Executive Summary"
                  checked={exportConfig.includeSummary}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, includeSummary: e.target.checked }))}
                />
                
                <Checkbox
                  label="Date Range & Filters"
                  checked={exportConfig.dateRange}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, dateRange: e.target.checked }))}
                />
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <Checkbox
                label="Enable Scheduled Reports"
                description="Automatically generate and send reports at specified intervals"
                checked={scheduleConfig.enabled}
                onChange={(e) => setScheduleConfig(prev => ({ ...prev, enabled: e.target.checked }))}
              />

              {scheduleConfig.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Frequency"
                      options={frequencyOptions}
                      value={scheduleConfig.frequency}
                      onChange={(value) => setScheduleConfig(prev => ({ ...prev, frequency: value }))}
                    />
                    
                    {scheduleConfig.frequency === 'weekly' && (
                      <Select
                        label="Day of Week"
                        options={dayOptions}
                        value={scheduleConfig.day}
                        onChange={(value) => setScheduleConfig(prev => ({ ...prev, day: value }))}
                      />
                    )}
                    
                    <Input
                      label="Time"
                      type="time"
                      value={scheduleConfig.time}
                      onChange={(e) => setScheduleConfig(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>

                  <Select
                    label="Recipients"
                    description="Select team members to receive scheduled reports"
                    options={recipientOptions}
                    value={scheduleConfig.recipients}
                    onChange={(value) => setScheduleConfig(prev => ({ ...prev, recipients: value }))}
                    multiple
                    searchable
                    placeholder="Select recipients"
                  />
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          
          {activeTab === 'export' ? (
            <Button
              variant="default"
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              onClick={handleExport}
            >
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          ) : (
            <Button
              variant="default"
              iconName="Calendar"
              iconPosition="left"
              onClick={handleSchedule}
              disabled={!scheduleConfig.enabled}
            >
              Save Schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportExporter;