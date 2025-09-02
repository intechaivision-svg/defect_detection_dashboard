import React from 'react';
import { useSelector } from 'react-redux';
import { Eye, Camera, Scan, Cog } from 'lucide-react';
import { RootState } from '../../store';

export const InspectionOverlay: React.FC = () => {
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);
  const machines = useSelector((state: RootState) => state.machines.machines);

  const moduleIcons = {
    defect: Camera,
    code_ocr: Scan,
    presence: Eye,
    wear: Cog,
  };

  const onlineMachines = machines.filter(m => m.status === 'online');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Overview</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(enabledModules).map(([moduleType, enabled]) => {
            const IconComponent = moduleIcons[moduleType as keyof typeof moduleIcons];
            return (
              <div
                key={moduleType}
                className={`p-3 rounded-lg border-2 transition-all ${
                  enabled 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                <IconComponent className="w-5 h-5 mb-2" />
                <p className="text-xs font-medium capitalize">
                  {moduleType.replace('_', ' ')}
                </p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Machine Health</h4>
          <div className="space-y-2">
            {onlineMachines.slice(0, 3).map((machine) => (
              <div key={machine.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate">{machine.name}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};