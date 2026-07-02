import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ShopLead, FollowUp, ActivityLog, AppState } from '../types';
import { initialLeads, initialFollowUps, initialActivities, mockCurrentUser, mockNotifications } from '../data/mockData';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
  duration?: number;
}

interface AppContextType {
  leads: ShopLead[];
  followUps: FollowUp[];
  activities: ActivityLog[];
  notifications: AppState['notifications'];
  currentUser: AppState['currentUser'];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addLead: (lead: Omit<ShopLead, 'id' | 'createdAt' | 'updatedAt'>) => ShopLead;
  updateLead: (id: string, updates: Partial<ShopLead>) => void;
  deleteLead: (id: string) => void;
  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => void;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  completeFollowUp: (id: string) => void;
  deleteFollowUp: (id: string) => void;
  addActivity: (leadId: string, action: string, details?: string) => void;
  markNotificationAsRead: (id: string) => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<ShopLead[]>(() => {
    const saved = localStorage.getItem('vx_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem('vx_followups');
    return saved ? JSON.parse(saved) : initialFollowUps;
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('vx_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [notifications, setNotifications] = useState<AppState['notifications']>(() => {
    const saved = localStorage.getItem('vx_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem('vx_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vx_followups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('vx_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('vx_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const addToast = (title: string, message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, duration }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity logger
  const addActivity = (leadId: string, action: string, details?: string) => {
    const newActivity: ActivityLog = {
      id: `act-${Math.random().toString(36).substring(2, 9)}`,
      leadId,
      timestamp: new Date().toISOString(),
      userId: 'user-1',
      userName: mockCurrentUser.name,
      action,
      details
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // Lead CRUD
  const addLead = (leadData: Omit<ShopLead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `lead-${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();
    const newLead: ShopLead = {
      ...leadData,
      id,
      createdAt: now,
      updatedAt: now
    };
    setLeads((prev) => [newLead, ...prev]);
    addActivity(id, 'Lead Created', `Lead for ${leadData.businessName} was added.`);
    addToast('Success', `${leadData.businessName} lead created successfully.`, 'success');
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<ShopLead>) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const updated = {
            ...lead,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          
          // Log specific significant updates
          if (updates.status && updates.status !== lead.status) {
            addActivity(id, 'Status Updated', `Status changed from ${lead.status.replace('_', ' ')} to ${updates.status.replace('_', ' ')}.`);
            
            // Auto add notification if status converted
            if (updates.status === 'converted') {
              const newNotif = {
                id: `notif-${Math.random().toString(36).substring(2, 9)}`,
                title: 'Conversion Achieved! 🎉',
                message: `${lead.businessName} has been converted successfully.`,
                timestamp: new Date().toISOString(),
                read: false
              };
              setNotifications((prevNotif) => [newNotif, ...prevNotif]);
            }
          } else {
            addActivity(id, 'Lead Modified', 'Basic lead information was updated.');
          }

          return updated;
        }
        return lead;
      })
    );
    addToast('Success', 'Lead information updated.', 'success');
  };

  const deleteLead = (id: string) => {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    // clean up associated followups
    setFollowUps((prev) => prev.filter((f) => f.leadId !== id));
    setActivities((prev) => prev.filter((a) => a.leadId !== id));
    addToast('Deleted', `${lead.businessName} lead and related logs have been deleted.`, 'error');
  };

  // Follow-up CRUD
  const addFollowUp = (followUpData: Omit<FollowUp, 'id'>) => {
    const id = `followup-${Math.random().toString(36).substring(2, 9)}`;
    const newFollowUp: FollowUp = {
      ...followUpData,
      id
    };
    setFollowUps((prev) => [newFollowUp, ...prev]);
    
    const lead = leads.find(l => l.id === followUpData.leadId);
    const leadName = lead ? lead.businessName : 'Unknown Shop';
    addActivity(followUpData.leadId, 'Follow-up Scheduled', `Follow-up set for ${followUpData.date}.`);
    addToast('Follow-up Added', `New task scheduled for ${leadName}.`, 'success');
  };

  const updateFollowUp = (id: string, updates: Partial<FollowUp>) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    addToast('Updated', 'Follow-up task updated.', 'info');
  };

  const completeFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          addActivity(f.leadId, 'Follow-up Completed', f.notes);
          return { ...f, status: 'completed' as const };
        }
        return f;
      })
    );
    addToast('Task Completed', 'Follow-up marked as completed.', 'success');
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps((prev) => prev.filter((f) => f.id !== id));
    addToast('Removed', 'Follow-up task removed.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        leads,
        followUps,
        activities,
        notifications,
        currentUser: mockCurrentUser,
        searchQuery,
        setSearchQuery,
        addLead,
        updateLead,
        deleteLead,
        addFollowUp,
        updateFollowUp,
        completeFollowUp,
        deleteFollowUp,
        addActivity,
        markNotificationAsRead,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
