import React from 'react';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Avg Processing Time',
      value: '1.2s',
      change: '-15%',
      trend: 'down',
      icon: Clock,
    },
    {
      title: 'Accuracy Rate',
      value: '97.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
    },
    {
      title: 'Throughput',
      value: '450/hr',
      change: '+8%',
      trend: 'up',
      icon: Zap,
    },
    {
      title: 'Model Confidence',
      value: '94.2%',
      change: '+1.3%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <metric.icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{metric.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{metric.value}</span>
              <span className={`text-xs font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};