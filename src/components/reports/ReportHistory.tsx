import React from 'react';
import { useSelector } from 'react-redux';
import { Download, Eye, Trash2, Clock } from 'lucide-react';
import { RootState } from '../../store';
import { formatDistanceToNow } from 'date-fns';

export const ReportHistory: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'generating':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Report History</h3>
      
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h4 className="font-medium text-gray-900">{report.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                <span className="capitalize">{report.type}</span>
                <span>By {report.generatedBy}</span>
                <span>{formatDistanceToNow(report.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {report.status === 'generating' && (
                <Clock className="w-4 h-4 text-blue-600 animate-spin" />
              )}
              {report.status === 'ready' && (
                <>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};