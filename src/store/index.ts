import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import machinesReducer from './slices/machinesSlice';
import inspectionsReducer from './slices/inspectionsSlice';
import usersReducer from './slices/usersSlice';
import reportsReducer from './slices/reportsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    machines: machinesReducer,
    inspections: inspectionsReducer,
    users: usersReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;