import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addMachine } from '../../store/slices/machinesSlice';
import { Machine, InspectionType } from '../../types';

export const AddMachineModal: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'camera' as Machine['type'],
    location: '',
    ipAddress: '',
    inspectionTypes: [] as InspectionType[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMachine: Machine = {
      id: Date.now().toString(),
      ...formData,
      status: 'offline',
      lastSeen: new Date(),
    };

    dispatch(addMachine(newMachine));
    setIsOpen(false);
    setFormData({
      name: '',
      type: 'camera',
      location: '',
      ipAddress: '',
      inspectionTypes: [],
    });
  };

  const toggleInspectionType = (type: InspectionType) => {
    setFormData(prev => ({
      ...prev,
      inspectionTypes: prev.inspectionTypes.includes(type)
        ? prev.inspectionTypes.filter(t => t !== type)
        : [...prev.inspectionTypes, type]
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Machine
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Machine</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Machine['type'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="camera">Camera</option>
              <option value="scanner">Scanner</option>
              <option value="sensor">Sensor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
            <input
              type="text"
              value={formData.ipAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, ipAddress: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="192.168.1.100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Types</label>
            <div className="space-y-2">
              {(['defect', 'code_ocr', 'presence', 'wear'] as InspectionType[]).map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.inspectionTypes.includes(type)}
                    onChange={() => toggleInspectionType(type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {type.replace('_', ' ')} Inspection
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Machine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};