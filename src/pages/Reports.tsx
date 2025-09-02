import React from 'react';
import { ReportGenerator } from '../components/reports/ReportGenerator';
import { ReportHistory } from '../components/reports/ReportHistory';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and manage inspection reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ReportGenerator />
        </div>
        <div className="lg:col-span-2">
          <ReportHistory />
        </div>
      </div>
    </div>
  );
};