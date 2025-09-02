import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, User, Settings, Power } from 'lucide-react';
import { RootState } from '../../store';
import { toggleRealTime } from '../../store/slices/dashboardSlice';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, realTimeEnabled } = useSelector((state: RootState) => state.dashboard);
  const { criticalAlerts } = useSelector((state: RootState) => state.dashboard.stats);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ID</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Industrial Inspection</h1>
                <p className="text-sm text-gray-500">Quality Control Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-8">
              <span className="text-sm text-gray-600">Real-time:</span>
              <button
                onClick={() => dispatch(toggleRealTime())}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  realTimeEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    realTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {criticalAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {criticalAlerts}
                </span>
              )}
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                {currentUser?.username}
              </span>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                {currentUser?.role}
              </span>
            </div>

            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Power className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};