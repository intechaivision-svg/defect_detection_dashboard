import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Brain, Sliders, Save } from 'lucide-react';
import { RootState } from '../../store';

export const InspectionSettings: React.FC = () => {
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);
  const [modelSettings, setModelSettings] = useState({
    defectThreshold: 0.85,
    ocrConfidence: 0.90,
    presenceThreshold: 0.80,
    wearAnomalyThreshold: 0.75,
  });

  const handleSave = () => {
    console.log('Model settings saved:', modelSettings);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Inspection Models</h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Defect Detection Threshold
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={modelSettings.defectThreshold}
                onChange={(e) => setModelSettings(prev => ({ 
                  ...prev, 
                  defectThreshold: parseFloat(e.target.value) 
                }))}
                className="flex-1"
                disabled={!enabledModules.defect}
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {Math.round(modelSettings.defectThreshold * 100)}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OCR Confidence Threshold
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={modelSettings.ocrConfidence}
                onChange={(e) => setModelSettings(prev => ({ 
                  ...prev, 
                  ocrConfidence: parseFloat(e.target.value) 
                }))}
                className="flex-1"
                disabled={!enabledModules.code_ocr}
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {Math.round(modelSettings.ocrConfidence * 100)}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presence Detection Threshold
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={modelSettings.presenceThreshold}
                onChange={(e) => setModelSettings(prev => ({ 
                  ...prev, 
                  presenceThreshold: parseFloat(e.target.value) 
                }))}
                className="flex-1"
                disabled={!enabledModules.presence}
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {Math.round(modelSettings.presenceThreshold * 100)}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wear Anomaly Threshold
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={modelSettings.wearAnomalyThreshold}
                onChange={(e) => setModelSettings(prev => ({ 
                  ...prev, 
                  wearAnomalyThreshold: parseFloat(e.target.value) 
                }))}
                className="flex-1"
                disabled={!enabledModules.wear}
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {Math.round(modelSettings.wearAnomalyThreshold * 100)}%
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Model Settings
        </button>
      </div>
    </div>
  );
};