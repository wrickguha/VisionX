export type ShopLeadStatus =
  | 'new'
  | 'demo_scheduled'
  | 'trial_running'
  | 'interested'
  | 'converted'
  | 'not_interested';

export type BusinessType =
  | 'retail'
  | 'restaurant'
  | 'supermarket'
  | 'warehouse'
  | 'office'
  | 'other';

export interface CameraDetails {
  count: number;
  brand: string;
  resolution: string;
  type: 'ip' | 'analog' | 'mixed';
  recordingDays: number;
}

export interface DemoDetails {
  scheduledDate?: string;
  completedDate?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  assignedTo?: string;
  notes?: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  date: string;
  notes: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdBy?: string;
}

export interface ActivityLog {
  id: string;
  leadId: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details?: string;
}

export interface ShopLead {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  businessType: BusinessType;
  status: ShopLeadStatus;
  cameraDetails: CameraDetails;
  demoDetails: DemoDetails;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  leads: ShopLead[];
  followUps: FollowUp[];
  activities: ActivityLog[];
  currentUser: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  notifications: {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }[];
}
