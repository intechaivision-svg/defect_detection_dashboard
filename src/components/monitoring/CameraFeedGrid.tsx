import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Camera, Wifi, WifiOff, Maximize2, Settings } from 'lucide-react';
import { RootState } from '../../store';
import { Machine } from '../../types';

interface DetectionOverlay {
  id: string;
  type: 'defect' | 'code' | 'presence' | 'wear';
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

interface CameraFeedProps {
  machine: Machine;
  detections: DetectionOverlay[];
}

const CameraFeed: React.FC<CameraFeedProps> = ({ machine, detections }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulate camera feed with a gradient background
    const drawFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw simulated camera feed background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(0.5, '#374151');
      gradient.addColorStop(1, '#1f2937');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add grid pattern to simulate industrial environment
      ctx.strokeStyle = '#4b5563';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw detection overlays
      detections.forEach((detection) => {
        const color = getDetectionColor(detection.type);
        
        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(detection.x, detection.y, detection.width, detection.height);
        
        // Draw label background
        const labelText = `${detection.label} (${Math.round(detection.confidence * 100)}%)`;
        ctx.font = '12px Inter, sans-serif';
        const textMetrics = ctx.measureText(labelText);
        const labelWidth = textMetrics.width + 8;
        const labelHeight = 20;
        
        ctx.fillStyle = color;
        ctx.fillRect(detection.x, detection.y - labelHeight, labelWidth, labelHeight);
        
        // Draw label text
        ctx.fillStyle = 'white';
        ctx.fillText(labelText, detection.x + 4, detection.y - 6);
      });

      // Add timestamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(new Date().toLocaleTimeString(), 10, canvas.height - 10);
    };

    const getDetectionColor = (type: string) => {
      switch (type) {
        case 'defect': return '#ef4444';
        case 'code': return '#3b82f6';
        case 'presence': return '#10b981';
        case 'wear': return '#8b5cf6';
        default: return '#6b7280';
      }
    };

    // Initial draw
    drawFrame();

    // Animate detections
    const interval = setInterval(drawFrame, 100);

    return () => clearInterval(interval);
  }, [detections]);

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : 'aspect-video'
    }`}>
      <div className="absolute top-2 left-2 z-10 flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
          machine.status === 'online' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {machine.status === 'online' ? (
            <Wifi className="w-3 h-3" />
          ) : (
            <WifiOff className="w-3 h-3" />
          )}
          <span>{machine.status}</span>
        </div>
        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {machine.name}
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10 flex space-x-1">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        className="w-full h-full object-cover"
      />

      {machine.status === 'offline' && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Camera Offline</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const CameraFeedGrid: React.FC = () => {
  const machines = useSelector((state: RootState) => state.machines.machines);
  const enabledModules = useSelector((state: RootState) => state.dashboard.enabledModules);
  const [detections, setDetections] = useState<Record<string, DetectionOverlay[]>>({});

  // Generate random detections for demonstration
  useEffect(() => {
    const generateDetections = () => {
      const newDetections: Record<string, DetectionOverlay[]> = {};
      
      machines.forEach((machine) => {
        if (machine.status !== 'online') return;
        
        const machineDetections: DetectionOverlay[] = [];
        
        // Generate random detections based on enabled modules and machine capabilities
        machine.inspectionTypes.forEach((inspectionType) => {
          if (!enabledModules[inspectionType]) return;
          
          if (Math.random() < 0.3) { // 30% chance of detection
            const detection: DetectionOverlay = {
              id: `${machine.id}-${inspectionType}-${Date.now()}`,
              type: inspectionType === 'code_ocr' ? 'code' : inspectionType,
              x: Math.random() * 500 + 20,
              y: Math.random() * 250 + 20,
              width: Math.random() * 100 + 50,
              height: Math.random() * 80 + 30,
              confidence: Math.random() * 0.3 + 0.7,
              label: getDetectionLabel(inspectionType),
            };
            machineDetections.push(detection);
          }
        });
        
        newDetections[machine.id] = machineDetections;
      });
      
      setDetections(newDetections);
    };

    const getDetectionLabel = (type: string) => {
      switch (type) {
        case 'defect': return ['Crack', 'Scratch', 'Dent'][Math.floor(Math.random() * 3)];
        case 'code_ocr': return 'QR Code';
        case 'presence': return 'Missing Part';
        case 'wear': return 'Wear Pattern';
        default: return 'Detection';
      }
    };

    generateDetections();
    const interval = setInterval(generateDetections, 2000);

    return () => clearInterval(interval);
  }, [machines, enabledModules]);

  const onlineMachines = machines.filter(m => m.status === 'online' || m.status === 'maintenance');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Live Camera Feeds</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live Detection Active</span>
        </div>
      </div>

      {onlineMachines.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Cameras</h3>
          <p className="text-gray-600">Turn on cameras from the Machines page to see live feeds</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {onlineMachines.map((machine) => (
            <div key={machine.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <CameraFeed 
                machine={machine} 
                detections={detections[machine.id] || []} 
              />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{machine.name}</p>
                  <p className="text-sm text-gray-600">{machine.location}</p>
                </div>
                <div className="flex space-x-1">
                  {machine.inspectionTypes.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-1 text-xs rounded-full ${
                        enabledModules[type] 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};