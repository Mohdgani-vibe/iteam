export type UserRole = 'super-admin' | 'it-team' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface Device {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  status: string;
  type: string;
  os: string;
  lastSeen: string;
  ipAddress: string;
  cpu: string;
  ram: string;
  storage: string;
  assetTag?: string;
  group?: string;
  score?: number;
  reachability?: number;
  user?: string;
  emailId?: string;
  hardwareSpecs?: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
  };
  installedSoftware?: { name: string; version: string }[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requesterId: string;
  requesterName: string;
  assigneeId?: string;
  assignee?: string;
  user?: string;
  createdAt: string;
  type: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: string;
  timestamp: string;
  targetUserId?: string;
  type?: string;
  deviceId?: string;
  deviceName?: string;
  branch?: string;
  time?: string;
  status?: string;
  description?: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  branch: string;
  available: number;
  reserved: number;
  issued: number;
  status: string;
}

export interface Gatepass {
  id: string;
  assetId: string;
  assetName: string;
  employeeName: string;
  employeeEmail: string;
  branch: string;
  purpose: string;
  status: string;
  managerSign?: any;
  employeeSign?: any;
  securitySign?: any;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  assets: any[];
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  assetsCount: number;
}

export interface Requirement {
  id: string;
  employeeName: string;
  type: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
}

export interface DeploymentGroup {
  id: string;
  name: string;
  description: string;
  deviceCount: number;
  lastUpdate: string;
  status: string;
}
