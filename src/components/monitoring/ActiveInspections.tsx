import React from 'react';
import { useSelector } from 'react-redux';
import { Activity, Play, Pause } from 'lucide-react';
import { RootState } from '../../store';

export const ActiveInspections: React.FC = () => {
  const { activeInspections } = useSelector((state: RootState) => state.dashboard.stats);
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);

  const activeModuleCount = Object.values(enabledModules).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Inspections</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">Running Inspections</span>
          </div>
          <span className="text-xl font-bold text-blue-700">{activeInspections}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Play className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Active Modules</span>
          </div>
          <span className="text-xl font-bold text-green-700">{activeModuleCount}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Module Status</h4>
          {Object.entries(enabledModules).map(([moduleType, enabled]) => (
            <div key={moduleType} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">
                {moduleType.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-2">
                {enabled ? (
                  <Play className="w-3 h-3 text-green-600" />
                ) : (
                  <Pause className="w-3 h-3 text-gray-400" />
                )}
                <span className={`text-xs font-medium ${enabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {enabled ? 'Active' : 'Paused'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};