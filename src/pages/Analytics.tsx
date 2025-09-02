import React from 'react';
import { InspectionTrends } from '../components/analytics/InspectionTrends';
import { DefectAnalysis } from '../components/analytics/DefectAnalysis';
import { PerformanceMetrics } from '../components/analytics/PerformanceMetrics';
import { PassRateChart } from '../components/analytics/PassRateChart';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Detailed insights into inspection performance and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InspectionTrends />
        <PassRateChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DefectAnalysis />
        <PerformanceMetrics />
      </div>
    </div>
  );
};