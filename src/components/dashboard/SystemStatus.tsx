import React from 'react';
import { useSelector } from 'react-redux';
import { Wifi, WifiOff, Settings, AlertCircle } from 'lucide-react';
import { RootState } from '../../store';

export const SystemStatus: React.FC = () => {
  const machines = useSelector((state: RootState) => state.machines.machines);
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);

  const onlineMachines = machines.filter(m => m.status === 'online');
  const offlineMachines = machines.filter(m => m.status === 'offline');
  const maintenanceMachines = machines.filter(m => m.status === 'maintenance');

  const activeModules = Object.entries(enabledModules).filter(([_, enabled]) => enabled);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Machine Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Online</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{onlineMachines.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiOff className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">Offline</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{offlineMachines.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">Maintenance</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{maintenanceMachines.length}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Modules</h4>
          <div className="space-y-2">
            {activeModules.map(([moduleType, _]) => (
              <div key={moduleType} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600 capitalize">
                  {moduleType.replace('_', ' ')} Inspection
                </span>
              </div>
            ))}
            {activeModules.length === 0 && (
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">No modules active</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Machines</h4>
          <div className="space-y-2">
            {machines.slice(0, 3).map((machine) => (
              <div key={machine.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    machine.status === 'online' ? 'bg-green-500' :
                    machine.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-gray-600 truncate">{machine.name}</span>
                </div>
                <span className="text-xs text-gray-400">{machine.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};