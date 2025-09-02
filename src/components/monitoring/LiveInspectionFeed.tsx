import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Activity } from 'lucide-react';
import { InspectionResult } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface LiveInspectionFeedProps {
  results: InspectionResult[];
}

export const LiveInspectionFeed: React.FC<LiveInspectionFeedProps> = ({ results }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 border-green-200';
      case 'fail':
        return 'bg-red-100 border-red-200';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Inspection Feed</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Waiting for inspection results...</p>
          </div>
        ) : (
          results.map((result, index) => (
            <div
              key={result.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${getStatusColor(result.status)} ${
                index === 0 ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <p className="font-medium text-sm">Machine {result.machineId}</p>
                    <p className="text-xs opacity-75 capitalize">
                      {result.type.replace('_', ' ')} inspection
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{Math.round(result.confidence * 100)}%</p>
                  <p className="text-xs opacity-75">
                    {formatDistanceToNow(result.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};