import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Machine } from '../../types';

interface MachinesState {
  machines: Machine[];
  selectedMachine: Machine | null;
  loading: boolean;
}

const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'Assembly Line Camera 1',
    type: 'camera',
    status: 'online',
    location: 'Production Floor A',
    ipAddress: '192.168.1.101',
    lastSeen: new Date(),
    inspectionTypes: ['defect', 'presence'],
  },
  {
    id: '2',
    name: 'Barcode Scanner Station',
    type: 'scanner',
    status: 'online',
    location: 'Packaging Area',
    ipAddress: '192.168.1.102',
    lastSeen: new Date(),
    inspectionTypes: ['code_ocr'],
  },
  {
    id: '3',
    name: 'Quality Control Camera 2',
    type: 'camera',
    status: 'maintenance',
    location: 'Production Floor B',
    ipAddress: '192.168.1.103',
    lastSeen: new Date(Date.now() - 3600000),
    inspectionTypes: ['defect', 'wear'],
  },
];

const initialState: MachinesState = {
  machines: mockMachines,
  selectedMachine: null,
  loading: false,
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    setMachines: (state, action: PayloadAction<Machine[]>) => {
      state.machines = action.payload;
    },
    addMachine: (state, action: PayloadAction<Machine>) => {
      state.machines.push(action.payload);
    },
    updateMachine: (state, action: PayloadAction<Machine>) => {
      const index = state.machines.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.machines[index] = action.payload;
      }
    },
    removeMachine: (state, action: PayloadAction<string>) => {
      state.machines = state.machines.filter(m => m.id !== action.payload);
    },
    setSelectedMachine: (state, action: PayloadAction<Machine | null>) => {
      state.selectedMachine = action.payload;
    },
    updateMachineStatus: (state, action: PayloadAction<{ id: string; status: Machine['status'] }>) => {
      const machine = state.machines.find(m => m.id === action.payload.id);
      if (machine) {
        machine.status = action.payload.status;
        machine.lastSeen = new Date();
      }
    },
  },
});

export const { 
  setMachines, 
  addMachine, 
  updateMachine, 
  removeMachine, 
  setSelectedMachine, 
  updateMachineStatus 
} = machinesSlice.actions;
export default machinesSlice.reducer;