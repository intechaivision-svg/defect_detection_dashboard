import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Camera, CheckCircle } from 'lucide-react';
import { RootState } from '../../store';

export const StatsGrid: React.FC = () => {
  const stats = useSelector((state: RootState) => state.dashboard.stats);

  const statCards = [
    {
      title: 'Total Inspections',
      value: stats.totalInspections.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'blue',
    },
    {
      title: 'Pass Rate',
      value: `${stats.passRate.toFixed(1)}%`,
      change: '+2.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: 'Active Inspections',
      value: stats.activeInspections.toString(),
      change: 'Live',
      trend: 'neutral',
      icon: Activity,
      color: 'yellow',
    },
    {
      title: 'Critical Alerts',
      value: stats.criticalAlerts.toString(),
      change: '-1',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red',
    },
    {
      title: 'Machines Online',
      value: `${stats.machinesOnline}/${stats.totalMachines}`,
      change: '80%',
      trend: 'up',
      icon: Camera,
      color: 'indigo',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl border-2 ${getColorClasses(stat.color)} transition-all duration-200 hover:shadow-lg hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <stat.icon className="w-8 h-8 opacity-80" />
          </div>
          
          <div className="flex items-center mt-3">
            {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600 mr-1" />}
            {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600 mr-1" />}
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};