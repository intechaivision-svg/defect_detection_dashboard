import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LiveInspectionFeed } from '../components/monitoring/LiveInspectionFeed';
import { ActiveInspections } from '../components/monitoring/ActiveInspections';
import { InspectionOverlay } from '../components/monitoring/InspectionOverlay';

export const LiveMonitoring: React.FC = () => {
  const realTimeEnabled = useSelector((state: RootState) => state.dashboard.realTimeEnabled);
  const liveResults = useSelector((state: RootState) => state.inspections.liveResults);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Monitoring</h1>
          <p className="text-gray-600">Real-time inspection results and system status</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${realTimeEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="text-sm font-medium text-gray-700">
            {realTimeEnabled ? 'Live' : 'Paused'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveInspectionFeed results={liveResults} />
        </div>
        <div className="space-y-6">
          <ActiveInspections />
          <InspectionOverlay />
        </div>
      </div>
    </div>
  );
};