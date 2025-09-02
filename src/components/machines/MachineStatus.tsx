import React from 'react';
import { Wifi, WifiOff, Settings } from 'lucide-react';
import { Machine } from '../../types';

interface MachineStatusProps {
  machines: Machine[];
}

export const MachineStatus: React.FC<MachineStatusProps> = ({ machines }) => {
  const onlineCount = machines.filter(m => m.status === 'online').length;
  const offlineCount = machines.filter(m => m.status === 'offline').length;
  const maintenanceCount = machines.filter(m => m.status === 'maintenance').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Wifi className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Online Machines</p>
            <p className="text-2xl font-bold text-green-600">{onlineCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-100 rounded-lg">
            <WifiOff className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Offline Machines</p>
            <p className="text-2xl font-bold text-red-600">{offlineCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Settings className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Maintenance</p>
            <p className="text-2xl font-bold text-yellow-600">{maintenanceCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};