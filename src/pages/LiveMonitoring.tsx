import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CameraFeedGrid } from '../components/monitoring/CameraFeedGrid';
import { LiveInspectionFeed } from '../components/monitoring/LiveInspectionFeed';
import { RecentInspections } from '../components/inspections/RecentInspections';
import { SystemStatus } from '../components/dashboard/SystemStatus';
import { MachineGrid } from '../components/machines/MachineGrid';
import { MachineStatus } from '../components/machines/MachineStatus';
import { AddMachineModal } from '../components/machines/AddMachineModal';

export const LiveMonitoring: React.FC = () => {
  const realTimeEnabled = useSelector((state: RootState) => state.dashboard.realTimeEnabled);
  const liveResults = useSelector((state: RootState) => state.inspections.liveResults);
  const machines = useSelector((state: RootState) => state.machines.machines);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Monitoring</h1>
          <p className="text-gray-600">Real-time inspection results, machine management, and system status</p>
        </div>
        <div className="flex items-center space-x-4">
          <AddMachineModal />
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${realTimeEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700">
              {realTimeEnabled ? 'Live' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      <MachineStatus machines={machines} />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Machine Management</h2>
          <MachineGrid />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Camera Feeds</h2>
          <CameraFeedGrid />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveInspectionFeed results={liveResults} />
          <div className={`w-3 h-3 rounded-full ${realTimeEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="text-sm font-medium text-gray-700">
            {realTimeEnabled ? 'Live' : 'Paused'}
          </span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentInspections />
          <SystemStatus />
        </div>
      </div>
    </div>
  );
};