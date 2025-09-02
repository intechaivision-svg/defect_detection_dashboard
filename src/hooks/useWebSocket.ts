import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addInspectionResult } from '../store/slices/inspectionsSlice';
import { updateStats } from '../store/slices/dashboardSlice';
import { updateMachineStatus } from '../store/slices/machinesSlice';
import { InspectionResult, InspectionType } from '../types';

export const useWebSocket = (enabled: boolean) => {
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const generateMockResult = (): InspectionResult => {
      const types: InspectionType[] = ['defect', 'code_ocr', 'presence', 'wear'];
      const statuses = ['pass', 'fail', 'warning'];
      const machineIds = ['1', '2', '3'];
      
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
      const machineId = machineIds[Math.floor(Math.random() * machineIds.length)];
      
      const result: InspectionResult = {
        id: Date.now().toString(),
        machineId,
        type,
        timestamp: new Date(),
        status,
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
        details: {},
      };

      // Add type-specific details
      switch (type) {
        case 'defect':
          result.details.defects = [
            {
              type: 'scratch',
              severity: 'medium',
              coordinates: { x: 100, y: 150, width: 50, height: 20 },
              confidence: result.confidence,
            },
          ];
          break;
        case 'code_ocr':
          result.details.codes = [
            {
              type: '2d_code',
              content: 'ABC123456789',
              readable: status === 'pass',
              confidence: result.confidence,
            },
          ];
          break;
        case 'presence':
          result.details.presence = {
            expected: ['Component A', 'Component B'],
            found: status === 'pass' ? ['Component A', 'Component B'] : ['Component A'],
            missing: status === 'pass' ? [] : ['Component B'],
            unexpected: [],
          };
          break;
        case 'wear':
          result.details.wear = {
            component: 'Bearing Assembly',
            wearLevel: Math.floor(Math.random() * 40 + 20), // 20-60%
            predictedLifespan: Math.floor(Math.random() * 90 + 30), // 30-120 days
            anomalyScore: Math.random() * 0.5,
          };
          break;
      }

      return result;
    };

    // Simulate real-time inspection results
    intervalRef.current = setInterval(() => {
      const result = generateMockResult();
      dispatch(addInspectionResult(result));
      
      // Update stats occasionally
      if (Math.random() < 0.3) {
        dispatch(updateStats({
          totalInspections: Math.floor(Math.random() * 100) + 15800,
          passRate: Math.random() * 10 + 90,
          activeInspections: Math.floor(Math.random() * 5) + 8,
        }));
      }
    }, 2000 + Math.random() * 3000); // Random interval 2-5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, dispatch]);
};