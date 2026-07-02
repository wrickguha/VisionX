import type { ShopLead, FollowUp, ActivityLog } from '../types';

export const mockCurrentUser = {
  name: 'Alex Rivera',
  email: 'alex.rivera@visionx.ai',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80',
  role: 'Shop Security Operations Lead'
};

export const initialLeads: ShopLead[] = [];

export const initialFollowUps: FollowUp[] = [];

export const initialActivities: ActivityLog[] = [];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Trial Ending Soon',
    message: 'Trial for Sweet Bodega is ending in 3 days. Please schedule follow-up.',
    timestamp: '2026-07-02T18:30:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Lead Generated',
    message: 'Apex Fashion Hub registered as a new lead under retail category.',
    timestamp: '2026-07-03T08:10:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Demo Tomorrow',
    message: 'Reminder: Virtual kitchen compliance demo with Bella Vista Ristorante is scheduled for tomorrow at 2 PM.',
    timestamp: '2026-07-03T09:00:00Z',
    read: true
  }
];
