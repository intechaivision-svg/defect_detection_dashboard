import React from 'react';
import { SystemSettings } from '../components/settings/SystemSettings';
import { InspectionSettings } from '../components/settings/InspectionSettings';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system parameters and inspection models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemSettings />
        <InspectionSettings />
      </div>
    </div>
  );
};