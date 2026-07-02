import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ShopLead, FollowUp, ActivityLog, AppState } from '../types';
import { api } from '../services/api';
import { mockCurrentUser, mockNotifications } from '../data/mockData';

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
  isLoading: boolean;
  refreshData: () => Promise<void>;
  dashboardMetrics: any; // Using dynamic type or DashboardMetrics from api.ts
  
  // Lead Operations
  addLead: (lead: Omit<ShopLead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ShopLead>;
  updateLead: (id: string, updates: Partial<ShopLead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  
  // Follow-up Operations
  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => Promise<void>;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => Promise<void>;
  completeFollowUp: (id: string) => Promise<void>;
  deleteFollowUp: (id: string) => Promise<void>;
  
  // Notification & Toast Operations
  markNotificationAsRead: (id: string) => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<ShopLead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [notifications, setNotifications] = useState<AppState['notifications']>(mockNotifications);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState<any>(null);

  // Fetch initial data from API
  const refreshData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch dashboard metrics (to get upcoming/overdue followups and status items)
      const dashboard = await api.getDashboard();
      
      // 2. Fetch all leads from backend (without paging filters to keep lists populated)
      const paginatedLeads = await api.getLeads({ per_page: 100 });
      setLeads(paginatedLeads.data);

      // 3. Compile mock activity logs based on real leads (since backend doesn't store audit logs yet)
      const compiledActivities: ActivityLog[] = paginatedLeads.data.map((lead) => ({
        id: `act-comp-${lead.id}`,
        leadId: lead.id,
        timestamp: lead.createdAt || new Date().toISOString(),
        userId: 'user-1',
        userName: mockCurrentUser.name,
        action: lead.status === 'converted' ? 'Converted' : 'Lead Created',
        details: `Shop registered under category ${lead.businessType}.`
      }));
      setActivities(compiledActivities);

      // 4. Set followups compiled from dashboard lists
      const allFollowups = [...dashboard.upcoming_followups, ...dashboard.overdue_followups];
      setFollowUps(allFollowups);
      
      // 5. Store dashboard metrics
      setDashboardMetrics(dashboard);

    } catch (err) {
      console.error('Error fetching backend data:', err);
      addToast('Connection Error', 'Could not sync database records with Laravel backend.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

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

  // Lead CRUD
  const addLead = async (leadData: Omit<ShopLead, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newLead = await api.createLead(leadData);
      addToast('Success', `${leadData.businessName} lead created successfully.`, 'success');
      await refreshData();
      return newLead;
    } catch (err) {
      console.error(err);
      addToast('Save Failed', 'Could not create lead in Laravel API.', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLead = async (id: string, updates: Partial<ShopLead>) => {
    setIsLoading(true);
    try {
      await api.updateLead(id, updates);
      addToast('Success', 'Lead information updated.', 'success');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Update Failed', 'Could not save lead changes in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    setIsLoading(true);
    try {
      await api.deleteLead(id);
      addToast('Deleted', 'Lead and related logs have been deleted.', 'error');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Delete Failed', 'Could not delete lead in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Follow-up CRUD
  const addFollowUp = async (followUpData: Omit<FollowUp, 'id'>) => {
    setIsLoading(true);
    try {
      await api.createFollowUp(followUpData.leadId, {
          notes: followUpData.notes,
          date: followUpData.date,
          status: followUpData.status,
          createdBy: followUpData.createdBy
        });
      addToast('Follow-up Added', 'New outreach task scheduled successfully.', 'success');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Error', 'Could not schedule task in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFollowUp = async (id: string, updates: Partial<FollowUp>) => {
    setIsLoading(true);
    try {
      await api.updateFollowUp(id, {
          notes: updates.notes,
          date: updates.date,
          status: updates.status,
          createdBy: updates.createdBy
        });
      addToast('Updated', 'Follow-up task updated.', 'info');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Error', 'Could not update task in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const completeFollowUp = async (id: string) => {
    setIsLoading(true);
    try {
      await api.updateFollowUp(id, { status: 'completed' });
      addToast('Task Completed', 'Follow-up marked as completed.', 'success');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Error', 'Could not complete task in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFollowUp = async (id: string) => {
    setIsLoading(true);
    try {
      await api.deleteFollowUp(id);
      addToast('Removed', 'Follow-up task removed.', 'info');
      await refreshData();
    } catch (err) {
      console.error(err);
      addToast('Error', 'Could not delete task in Laravel API.', 'error');
    } finally {
      setIsLoading(false);
    }
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
        isLoading,
        refreshData,
        dashboardMetrics,
        addLead,
        updateLead,
        deleteLead,
        addFollowUp,
        updateFollowUp,
        completeFollowUp,
        deleteFollowUp,
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
