import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CameraFeedGrid } from '../components/monitoring/CameraFeedGrid';
import { ActiveInspections } from '../components/monitoring/ActiveInspections';
import { LiveInspectionFeed } from '../components/monitoring/LiveInspectionFeed';
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