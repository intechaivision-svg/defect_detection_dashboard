import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MachineGrid } from '../components/machines/MachineGrid';
import { MachineStatus } from '../components/machines/MachineStatus';
import { AddMachineModal } from '../components/machines/AddMachineModal';

export const Machines: React.FC = () => {
  const machines = useSelector((state: RootState) => state.machines.machines);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machine Management</h1>
          <p className="text-gray-600">Configure and monitor inspection machines and cameras</p>
        </div>
        <AddMachineModal />
      </div>

      <MachineStatus machines={machines} />
      <MachineGrid />
    </div>
  );
};