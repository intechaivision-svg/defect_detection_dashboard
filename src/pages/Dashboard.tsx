import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { ModuleToggleGrid } from '../components/dashboard/ModuleToggleGrid';
import { CameraFeedGrid } from '../components/monitoring/CameraFeedGrid';
import { LiveInspectionFeed } from '../components/monitoring/LiveInspectionFeed';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Dashboard: React.FC = () => {
  const realTimeEnabled = useSelector((state: RootState) => state.dashboard.realTimeEnabled);
  const liveResults = useSelector((state: RootState) => state.inspections.liveResults);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your industrial inspection systems in real-time</p>
      </div>
      
      <StatsGrid />
      <ModuleToggleGrid />
      
      <div className="space-y-6">
        <CameraFeedGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveInspectionFeed results={liveResults} />
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {liveResults.filter(r => r.status === 'fail').length}
                </p>
                <p className="text-sm text-red-600">Failures</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {liveResults.filter(r => r.status === 'pass').length}
                </p>
                <p className="text-sm text-green-600">Passes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};