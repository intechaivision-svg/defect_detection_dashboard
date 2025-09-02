import React from 'react';
import { useSelector } from 'react-redux';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { RootState } from '../../store';
import { formatDistanceToNow } from 'date-fns';

export const RecentInspections: React.FC = () => {
  const inspections = useSelector((state: RootState) => state.inspections.results.slice(0, 8));
  const machines = useSelector((state: RootState) => state.machines.machines);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMachineName = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    return machine?.name || 'Unknown Machine';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inspections</h3>
      
      <div className="space-y-3">
        {inspections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent inspections</p>
            <p className="text-sm">Enable real-time mode to see live results</p>
          </div>
        ) : (
          inspections.map((inspection) => (
            <div key={inspection.id} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {getStatusIcon(inspection.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getMachineName(inspection.machineId)}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inspection.status)}`}>
                    {inspection.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 capitalize">
                  {inspection.type.replace('_', ' ')} • {formatDistanceToNow(inspection.timestamp, { addSuffix: true })}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-400">
                  {Math.round(inspection.confidence * 100)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};