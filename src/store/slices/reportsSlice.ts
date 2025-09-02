import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report } from '../../types';

interface ReportsState {
  reports: Report[];
  loading: boolean;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Weekly Defect Analysis',
    type: 'defect',
    dateRange: { 
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
      end: new Date() 
    },
    filters: { inspectionTypes: ['defect'] },
    generatedBy: 'admin',
    createdAt: new Date(),
    status: 'ready',
  },
  {
    id: '2',
    title: 'Comprehensive Monthly Report',
    type: 'comprehensive',
    dateRange: { 
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
      end: new Date() 
    },
    filters: {},
    generatedBy: 'operator1',
    createdAt: new Date(Date.now() - 3600000),
    status: 'generating',
  },
];

const initialState: ReportsState = {
  reports: mockReports,
  loading: false,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
    },
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.unshift(action.payload);
    },
    updateReport: (state, action: PayloadAction<Report>) => {
      const index = state.reports.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
    removeReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setReports, addReport, updateReport, removeReport, setLoading } = reportsSlice.actions;
export default reportsSlice.reducer;