export interface Machine {
  id: string;
  name: string;
  type: 'camera' | 'scanner' | 'sensor';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  ipAddress?: string;
  lastSeen: Date;
  inspectionTypes: InspectionType[];
}

export interface InspectionResult {
  id: string;
  machineId: string;
  type: InspectionType;
  timestamp: Date;
  status: 'pass' | 'fail' | 'warning';
  confidence: number;
  details: {
    defects?: DefectDetail[];
    codes?: CodeDetail[];
    presence?: PresenceDetail;
    wear?: WearDetail;
  };
  imageUrl?: string;
}

export interface DefectDetail {
  type: 'crack' | 'scratch' | 'dent' | 'misalignment';
  severity: 'low' | 'medium' | 'high';
  coordinates: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface CodeDetail {
  type: '2d_code' | 'barcode' | 'ocr';
  content: string;
  readable: boolean;
  confidence: number;
}

export interface PresenceDetail {
  expected: string[];
  found: string[];
  missing: string[];
  unexpected: string[];
}

export interface WearDetail {
  component: string;
  wearLevel: number; // 0-100
  predictedLifespan: number; // days
  anomalyScore: number;
}

export type InspectionType = 'defect' | 'code_ocr' | 'presence' | 'wear';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  lastLogin: Date;
  permissions: string[];
}

export interface Report {
  id: string;
  title: string;
  type: 'defect' | 'productivity' | 'wear' | 'comprehensive';
  dateRange: { start: Date; end: Date };
  filters: ReportFilters;
  generatedBy: string;
  createdAt: Date;
  status: 'generating' | 'ready' | 'failed';
}

export interface ReportFilters {
  machineIds?: string[];
  inspectionTypes?: InspectionType[];
  status?: ('pass' | 'fail' | 'warning')[];
  severity?: ('low' | 'medium' | 'high')[];
}

export interface DashboardStats {
  totalInspections: number;
  passRate: number;
  activeInspections: number;
  criticalAlerts: number;
  machinesOnline: number;
  totalMachines: number;
}