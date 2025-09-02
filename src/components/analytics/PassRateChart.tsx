import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { module: 'Defect', passRate: 94.2, failRate: 5.8 },
  { module: 'Code OCR', passRate: 98.1, failRate: 1.9 },
  { module: 'Presence', passRate: 91.7, failRate: 8.3 },
  { module: 'Wear', passRate: 88.5, failRate: 11.5 },
];

export const PassRateChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pass Rate by Module</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="module" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="passRate" fill="#10b981" name="Pass Rate" />
          <Bar dataKey="failRate" fill="#ef4444" name="Fail Rate" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};