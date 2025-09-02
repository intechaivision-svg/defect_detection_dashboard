import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { ModuleToggleGrid } from '../components/dashboard/ModuleToggleGrid';
import { RecentInspections } from '../components/inspections/RecentInspections';
import { SystemStatus } from '../components/dashboard/SystemStatus';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your industrial inspection systems in real-time</p>
      </div>
      
      <StatsGrid />
      <ModuleToggleGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentInspections />
        <SystemStatus />
      </div>
    </div>
  );
};