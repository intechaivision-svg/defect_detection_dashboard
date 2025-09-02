import React, { useState } from 'react';
import { Save, RefreshCw, Database, Shield } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    maxRetries: 3,
    timeoutSeconds: 30,
    autoReconnect: true,
    logLevel: 'info',
    maxLogSize: 100,
    enableBackup: true,
    backupInterval: 24,
  });

  const handleSave = () => {
    // Simulate saving settings
    console.log('Settings saved:', settings);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Database className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Retries</label>
          <input
            type="number"
            value={settings.maxRetries}
            onChange={(e) => setSettings(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (seconds)</label>
          <input
            type="number"
            value={settings.timeoutSeconds}
            onChange={(e) => setSettings(prev => ({ ...prev, timeoutSeconds: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="5"
            max="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Log Level</label>
          <select
            value={settings.logLevel}
            onChange={(e) => setSettings(prev => ({ ...prev, logLevel: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoReconnect}
              onChange={(e) => setSettings(prev => ({ ...prev, autoReconnect: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Auto-reconnect to machines</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.enableBackup}
              onChange={(e) => setSettings(prev => ({ ...prev, enableBackup: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable automatic backups</span>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};