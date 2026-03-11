import { User, Device, Ticket, Alert, StockItem, Gatepass, Employee, Department, Requirement, DeploymentGroup } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Super Admin', email: 'admin@zerodha.com', role: 'super-admin' },
  { id: '2', name: 'IT Manager', email: 'it@zerodha.com', role: 'it-team' },
  { id: '3', name: 'John Employee', email: 'john@zerodha.com', role: 'employee', department: 'Engineering' },
  { id: '4', name: 'Sarah Designer', email: 'sarah@zerodha.com', role: 'employee', department: 'Design' },
];

export const MOCK_DEVICES: Device[] = [
  {
    id: 'DEV-001',
    name: 'MacBook Pro 16"',
    ownerId: '3',
    ownerName: 'John Employee',
    status: 'Online',
    type: 'Laptop',
    os: 'macOS Sequoia',
    lastSeen: '2 mins ago',
    ipAddress: '192.168.1.45',
    cpu: 'Apple M3 Max',
    ram: '64GB',
    storage: '2TB SSD',
    assetTag: 'ZT-001',
    group: 'Engineering',
    score: 95,
    reachability: 100,
    user: 'John Employee',
    emailId: 'john@zerodha.com',
    hardwareSpecs: {
      cpu: 'Apple M3 Max',
      ram: '64GB',
      storage: '2TB SSD',
      gpu: '30-core GPU'
    },
    installedSoftware: [
      { name: 'Slack', version: '4.36.140' },
      { name: 'VS Code', version: '1.85.1' }
    ]
  },
  {
    id: 'DEV-002',
    name: 'Dell Precision 5570',
    ownerId: '4',
    ownerName: 'Sarah Designer',
    status: 'Online',
    type: 'Laptop',
    os: 'Windows 11 Pro',
    lastSeen: '5 mins ago',
    ipAddress: '192.168.1.46',
    cpu: 'Intel i9-12900H',
    ram: '32GB',
    storage: '1TB SSD',
    assetTag: 'ZT-002',
    group: 'Design',
    score: 88,
    reachability: 100,
    user: 'Sarah Designer',
    emailId: 'sarah@zerodha.com',
    hardwareSpecs: {
      cpu: 'Intel i9-12900H',
      ram: '32GB',
      storage: '1TB SSD',
      gpu: 'NVIDIA RTX A2000'
    },
    installedSoftware: [
      { name: 'Adobe Photoshop', version: '2024.1' },
      { name: 'Figma', version: '116.15.4' }
    ]
  },
  {
    id: 'DEV-003',
    name: 'Ubuntu Server 01',
    ownerId: '2',
    ownerName: 'IT Manager',
    status: 'Online',
    type: 'SERVER',
    os: 'Ubuntu 24.04 LTS',
    lastSeen: 'Just now',
    ipAddress: '10.0.0.10',
    cpu: 'AMD EPYC 7763',
    ram: '256GB',
    storage: '10TB RAID',
    assetTag: 'ZT-SRV-01',
    group: 'Infrastructure',
    score: 99,
    reachability: 100,
    user: 'IT Manager',
    emailId: 'it@zerodha.com',
    hardwareSpecs: {
      cpu: 'AMD EPYC 7763',
      ram: '256GB',
      storage: '10TB RAID',
      gpu: 'N/A'
    },
    installedSoftware: [
      { name: 'Docker', version: '24.0.7' },
      { name: 'Nginx', version: '1.24.0' }
    ]
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TKT-1001',
    title: 'Photoshop License Expired',
    description: 'My Adobe license needs renewal for the new project.',
    status: 'Open',
    priority: 'Medium',
    requesterId: '4',
    requesterName: 'Sarah Designer',
    createdAt: '2024-03-10T10:00:00Z',
    type: 'Software',
    user: 'Sarah Designer',
    assignee: 'IT Team',
    assigneeId: '2'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALT-001',
    title: 'ClamAV Threat Detected',
    message: 'Potentially unwanted program (PUP) detected in /tmp/installer.sh',
    severity: 'High',
    timestamp: '2024-03-11T08:00:00Z',
    targetUserId: '3',
    type: 'Security',
    status: 'Open',
    deviceName: 'MacBook Pro 16"',
    deviceId: 'DEV-001',
    time: '08:00 AM',
    branch: 'HO Bangalore'
  },
  {
    id: 'ALT-002',
    title: 'OpenSCAP Compliance Failure',
    message: 'System failed CIS Ubuntu 22.04 Benchmark - Rule: Ensure SSH root login is disabled',
    severity: 'Critical',
    timestamp: '2024-03-11T09:30:00Z',
    type: 'Compliance',
    status: 'Open',
    deviceName: 'Ubuntu Server',
    deviceId: 'SRV-001',
    time: '09:30 AM',
    branch: 'Mumbai Branch'
  },
  {
    id: 'ALT-003',
    title: 'Syslog Error Spike',
    message: 'High frequency of "Authentication failure" logs detected from IP 192.168.1.45',
    severity: 'Medium',
    timestamp: '2024-03-11T10:15:00Z',
    type: 'Log Analysis',
    status: 'Open',
    deviceName: 'Gateway-01',
    deviceId: 'GW-001',
    time: '10:15 AM',
    branch: 'HO Bangalore'
  }
];

export const MOCK_STOCK: StockItem[] = [];
export const MOCK_GATEPASSES: Gatepass[] = [];
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '3',
    name: 'John Employee',
    email: 'john@zerodha.com',
    department: 'Engineering',
    assets: [MOCK_DEVICES[0]]
  },
  {
    id: '4',
    name: 'Sarah Designer',
    email: 'sarah@zerodha.com',
    department: 'Design',
    assets: [MOCK_DEVICES[1]]
  }
];
export const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering', head: 'John Doe', employeeCount: 45, assetsCount: 50 },
  { id: '2', name: 'Design', head: 'Sarah Smith', employeeCount: 12, assetsCount: 15 }
];
export const MOCK_REQUIREMENTS: Requirement[] = [];
export const MOCK_DEPLOYMENT_GROUPS: DeploymentGroup[] = [];
