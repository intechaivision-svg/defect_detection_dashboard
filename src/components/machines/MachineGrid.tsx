import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera, Wifi, WifiOff, Settings, MapPin, Clock } from 'lucide-react';
import { RootState } from '../../store';
import { updateMachineStatus } from '../../store/slices/machinesSlice';
import { formatDistanceToNow } from 'date-fns';

export const MachineGrid: React.FC = () => {
  const dispatch = useDispatch();
  const machines = useSelector((state: RootState) => state.machines.machines);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 border-green-200 text-green-700';
      case 'offline':
        return 'bg-red-100 border-red-200 text-red-700';
      case 'maintenance':
        return 'bg-yellow-100 border-yellow-200 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-green-600" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-600" />;
      case 'maintenance':
        return <Settings className="w-5 h-5 text-yellow-600" />;
      default:
        return <WifiOff className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleToggleMachine = (machineId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'online' ? 'offline' : 'online';
    dispatch(updateMachineStatus({ id: machineId, status: newStatus }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {machines.map((machine) => (
        <div key={machine.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{machine.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{machine.type}</p>
              </div>
            </div>
            {getStatusIcon(machine.status)}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Camera Power</span>
              <button
                onClick={() => handleToggleMachine(machine.id, machine.status)}
                disabled={machine.status === 'maintenance'}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  machine.status === 'online' ? 'bg-green-600' : 'bg-gray-200'
                } ${machine.status === 'maintenance' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    machine.status === 'online' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {machine.status === 'maintenance' && (
              <p className="text-xs text-yellow-600 mt-1">Camera in maintenance mode</p>
            )}
          </div>

          <div className="space-y-3">
            <div className={`px-3 py-2 rounded-lg border ${getStatusColor(machine.status)}`}>
              <span className="text-sm font-medium capitalize">{machine.status}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{machine.location}</span>
            </div>

            {machine.ipAddress && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">IP:</span> {machine.ipAddress}
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last seen {formatDistanceToNow(machine.lastSeen, { addSuffix: true })}</span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Inspection Types:</p>
              <div className="flex flex-wrap gap-2">
                {machine.inspectionTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                  >
                    {type.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};