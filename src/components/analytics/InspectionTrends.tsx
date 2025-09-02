import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2025-01-01', defect: 45, code_ocr: 89, presence: 78, wear: 12 },
  { date: '2025-01-02', defect: 52, code_ocr: 94, presence: 82, wear: 15 },
  { date: '2025-01-03', defect: 38, code_ocr: 87, presence: 76, wear: 18 },
  { date: '2025-01-04', defect: 61, code_ocr: 91, presence: 84, wear: 22 },
  { date: '2025-01-05', defect: 43, code_ocr: 96, presence: 79, wear: 19 },
  { date: '2025-01-06', defect: 56, code_ocr: 88, presence: 81, wear: 25 },
  { date: '2025-01-07', defect: 48, code_ocr: 93, presence: 85, wear: 16 },
];

export const InspectionTrends: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Trends (Last 7 Days)</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value, name) => [value, name?.toString().replace('_', ' ').toUpperCase()]}
          />
          <Line type="monotone" dataKey="defect" stroke="#ef4444" strokeWidth={2} name="Defect" />
          <Line type="monotone" dataKey="code_ocr" stroke="#3b82f6" strokeWidth={2} name="Code OCR" />
          <Line type="monotone" dataKey="presence" stroke="#10b981" strokeWidth={2} name="Presence" />
          <Line type="monotone" dataKey="wear" stroke="#8b5cf6" strokeWidth={2} name="Wear" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};