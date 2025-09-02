import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InspectionResult } from '../../types';

interface InspectionsState {
  results: InspectionResult[];
  liveResults: InspectionResult[];
  loading: boolean;
  filters: {
    machineId?: string;
    type?: string;
    status?: string;
    dateRange?: { start: Date; end: Date };
  };
}

const initialState: InspectionsState = {
  results: [],
  liveResults: [],
  loading: false,
  filters: {},
};

const inspectionsSlice = createSlice({
  name: 'inspections',
  initialState,
  reducers: {
    setInspectionResults: (state, action: PayloadAction<InspectionResult[]>) => {
      state.results = action.payload;
    },
    addInspectionResult: (state, action: PayloadAction<InspectionResult>) => {
      state.results.unshift(action.payload);
      state.liveResults.unshift(action.payload);
      
      // Keep only the last 50 live results for performance
      if (state.liveResults.length > 50) {
        state.liveResults = state.liveResults.slice(0, 50);
      }
    },
    clearLiveResults: (state) => {
      state.liveResults = [];
    },
    setFilters: (state, action: PayloadAction<InspectionsState['filters']>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setInspectionResults, 
  addInspectionResult, 
  clearLiveResults, 
  setFilters, 
  setLoading 
} = inspectionsSlice.actions;
export default inspectionsSlice.reducer;