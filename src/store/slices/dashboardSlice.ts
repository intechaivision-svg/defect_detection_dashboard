import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardStats, InspectionType } from '../../types';

interface DashboardState {
  stats: DashboardStats;
  enabledModules: Record<InspectionType, boolean>;
  currentUser: {
    id: string;
    username: string;
    role: 'admin' | 'operator' | 'viewer';
  } | null;
  realTimeEnabled: boolean;
}

const initialState: DashboardState = {
  stats: {
    totalInspections: 15847,
    passRate: 94.2,
    activeInspections: 12,
    criticalAlerts: 3,
    machinesOnline: 8,
    totalMachines: 10,
  },
  enabledModules: {
    defect: true,
    code_ocr: true,
    presence: true,
    wear: false,
  },
  currentUser: {
    id: '1',
    username: 'admin',
    role: 'admin',
  },
  realTimeEnabled: true,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateStats: (state, action: PayloadAction<Partial<DashboardStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    toggleModule: (state, action: PayloadAction<InspectionType>) => {
      state.enabledModules[action.payload] = !state.enabledModules[action.payload];
    },
    setCurrentUser: (state, action: PayloadAction<DashboardState['currentUser']>) => {
      state.currentUser = action.payload;
    },
    toggleRealTime: (state) => {
      state.realTimeEnabled = !state.realTimeEnabled;
    },
  },
});

export const { updateStats, toggleModule, setCurrentUser, toggleRealTime } = dashboardSlice.actions;
export default dashboardSlice.reducer;