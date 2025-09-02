import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, ScanLine, Eye, Wrench } from 'lucide-react';
import { RootState } from '../../store';
import { toggleModule } from '../../store/slices/dashboardSlice';
import { InspectionType } from '../../types';

export const ModuleToggleGrid: React.FC = () => {
  const dispatch = useDispatch();
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);

  const modules = [
    {
      type: 'defect' as InspectionType,
      title: 'Defect Detection',
      description: 'Detect cracks, scratches, dents, and misalignments',
      icon: Shield,
      color: 'red',
    },
    {
      type: 'code_ocr' as InspectionType,
      title: '2D Code/Barcode/OCR',
      description: 'Scan and validate printed codes and text',
      icon: ScanLine,
      color: 'blue',
    },
    {
      type: 'presence' as InspectionType,
      title: 'Presence/Absence',
      description: 'Confirm part and component presence',
      icon: Eye,
      color: 'green',
    },
    {
      type: 'wear' as InspectionType,
      title: 'Wear & Tear Monitoring',
      description: 'Identify gradual degradation and anomalies',
      icon: Wrench,
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string, enabled: boolean) => {
    const baseClasses = enabled ? 'ring-2' : 'ring-1 opacity-60';
    const colors = {
      red: enabled ? 'bg-red-50 border-red-200 ring-red-300 text-red-700' : 'bg-gray-50 border-gray-200 ring-gray-200 text-gray-500',
      blue: enabled ? 'bg-blue-50 border-blue-200 ring-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 ring-gray-200 text-gray-500',
      green: enabled ? 'bg-green-50 border-green-200 ring-green-300 text-green-700' : 'bg-gray-50 border-gray-200 ring-gray-200 text-gray-500',
      purple: enabled ? 'bg-purple-50 border-purple-200 ring-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 ring-gray-200 text-gray-500',
    };
    return `${baseClasses} ${colors[color as keyof typeof colors]}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspection Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module) => {
          const enabled = enabledModules[module.type];
          return (
            <button
              key={module.type}
              onClick={() => dispatch(toggleModule(module.type))}
              className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 text-left ${getColorClasses(module.color, enabled)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <module.icon className="w-8 h-8" />
                <div className={`w-4 h-4 rounded-full border-2 ${
                  enabled ? 'bg-current border-current' : 'border-gray-300'
                }`} />
              </div>
              <h3 className="font-semibold text-sm mb-2">{module.title}</h3>
              <p className="text-xs opacity-80">{module.description}</p>
              <div className="mt-3">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  enabled ? 'bg-current bg-opacity-20' : 'bg-gray-200 text-gray-600'
                }`}>
                  {enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};