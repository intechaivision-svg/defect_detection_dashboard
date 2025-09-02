import React, { useState } from 'react';
import { Calendar, FileText, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addReport } from '../../store/slices/reportsSlice';
import { RootState } from '../../store';
import { Report, InspectionType } from '../../types';

export const ReportGenerator: React.FC = () => {
  const dispatch = useDispatch();
  const machines = useSelector((state: RootState) => state.machines.machines);
  const [formData, setFormData] = useState({
    title: '',
    type: 'comprehensive' as Report['type'],
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    machineIds: [] as string[],
    inspectionTypes: [] as InspectionType[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport: Report = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      dateRange: {
        start: new Date(formData.dateRange.start),
        end: new Date(formData.dateRange.end),
      },
      filters: {
        machineIds: formData.machineIds.length > 0 ? formData.machineIds : undefined,
        inspectionTypes: formData.inspectionTypes.length > 0 ? formData.inspectionTypes : undefined,
      },
      generatedBy: 'admin',
      createdAt: new Date(),
      status: 'generating',
    };

    dispatch(addReport(newReport));
    
    // Simulate report generation
    setTimeout(() => {
      dispatch(addReport({ ...newReport, status: 'ready' }));
    }, 3000);

    setFormData({
      title: '',
      type: 'comprehensive',
      dateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
      },
      machineIds: [],
      inspectionTypes: [],
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Weekly Quality Report"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Report['type'] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="comprehensive">Comprehensive</option>
            <option value="defect">Defect Analysis</option>
            <option value="productivity">Productivity</option>
            <option value="wear">Wear & Tear</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={formData.dateRange.start}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={formData.dateRange.end}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </form>
    </div>
  );
};