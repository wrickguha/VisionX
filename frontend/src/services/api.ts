import axios from 'axios';
import type { ShopLead, FollowUp, CameraDetails, DemoDetails, BusinessType, ShopLeadStatus } from '../types';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface LeadFilterParams {
  search?: string;
  status?: string;
  business_type?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

export interface PaginatedLeads {
  data: ShopLead[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface DashboardMetrics {
  summary: {
    total_leads: number;
    active_demos: number;
    trials_running: number;
    converted_shops: number;
    trial_expired_leads: number;
    pending_followups: number;
    conversion_rate: number;
  };
  monthly_growth: { name: string; Leads: number }[];
  status_distribution: { status: string; label: string; count: number }[];
  business_type_distribution: { type: string; count: number }[];
  camera_distribution: { range: string; Shops: number }[];
  upcoming_followups: FollowUp[];
  overdue_followups: FollowUp[];
}

// Mapping Helpers
const mapFollowUpToFrontend = (f: any): FollowUp => {
  const today = '2026-07-03';
  const isOverdue = f.follow_up_date < today && f.status === 'pending';
  return {
    id: String(f.id),
    leadId: String(f.shop_lead_id),
    date: f.follow_up_date,
    notes: f.note,
    status: isOverdue ? 'overdue' : (f.status as 'pending' | 'completed'),
    priority: f.note.length > 50 ? 'high' : 'medium', // Derived priority
    createdBy: f.created_by
  };
};

const mapLeadToFrontend = (lead: any): ShopLead => {
  // Format dates appropriately
  const scheduledDate = lead.follow_up_date || undefined;
  
  return {
    id: String(lead.id),
    businessName: lead.shop_name,
    ownerName: lead.owner_name,
    phone: lead.phone,
    email: lead.email || `${lead.owner_name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    address: lead.location,
    businessType: lead.business_type as BusinessType,
    status: lead.demo_status as ShopLeadStatus,
    cameraDetails: {
      count: lead.camera_count,
      brand: lead.demo_detail?.notes ? 'Axis Communications' : 'Hikvision',
      resolution: lead.camera_count > 30 ? '4K (8MP)' : '1080p (2MP)',
      type: lead.demo_detail?.rtsp_available ? 'ip' : 'mixed',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate,
      completedDate: lead.demo_detail ? lead.created_at : undefined,
      trialStartDate: lead.demo_detail?.created_at ? lead.demo_detail.created_at.split('T')[0] : undefined,
      trialEndDate: lead.follow_up_date || undefined,
      assignedTo: lead.demo_detail ? 'Alex Rivera' : undefined,
      notes: lead.demo_detail?.notes || undefined
    },
    notes: lead.notes || undefined,
    createdAt: lead.created_at,
    updatedAt: lead.updated_at
  };
};

export const api = {
  // Dashboard Endpoint
  getDashboard: async (): Promise<DashboardMetrics> => {
    const response = await apiClient.get('/dashboard');
    const data = response.data.data;
    
    return {
      summary: data.summary,
      monthly_growth: data.monthly_growth,
      status_distribution: data.status_distribution,
      business_type_distribution: data.business_type_distribution,
      camera_distribution: data.camera_distribution,
      upcoming_followups: data.upcoming_followups.map(mapFollowUpToFrontend),
      overdue_followups: data.overdue_followups.map(mapFollowUpToFrontend)
    };
  },

  // Shop Leads CRUD
  getLeads: async (params?: LeadFilterParams): Promise<PaginatedLeads> => {
    const backendParams: any = {};
    if (params?.search) backendParams.search = params.search;
    if (params?.status) backendParams.status = params.status;
    if (params?.business_type) backendParams.business_type = params.business_type;
    
    // Map sorting fields to backend columns
    if (params?.sort) {
      backendParams.sort = params.sort === 'businessName' ? 'shop_name' : 
                           params.sort === 'cameraCount' ? 'camera_count' : 'created_at';
    }
    if (params?.order) backendParams.order = params.order;
    if (params?.page) backendParams.page = params.page;
    if (params?.per_page) backendParams.per_page = params.per_page;

    const response = await apiClient.get('/shop-leads', { params: backendParams });
    return {
      data: response.data.data.map(mapLeadToFrontend),
      meta: response.data.meta
    };
  },

  getLead: async (id: number | string): Promise<ShopLead> => {
    const response = await apiClient.get(`/shop-leads/${id}`);
    return mapLeadToFrontend(response.data.data);
  },

  createLead: async (data: Partial<ShopLead> & { cameraDetails?: CameraDetails }): Promise<ShopLead> => {
    const payload = {
      shop_name: data.businessName,
      owner_name: data.ownerName,
      phone: data.phone,
      location: data.address,
      business_type: data.businessType,
      camera_count: data.cameraDetails?.count ?? 0,
      demo_status: data.status,
      notes: data.notes
    };

    const response = await apiClient.post('/shop-leads', payload);
    return mapLeadToFrontend(response.data.data);
  },

  updateLead: async (id: number | string, data: Partial<ShopLead> & { cameraDetails?: CameraDetails }): Promise<ShopLead> => {
    const payload = {
      shop_name: data.businessName,
      owner_name: data.ownerName,
      phone: data.phone,
      location: data.address,
      business_type: data.businessType,
      camera_count: data.cameraDetails?.count,
      demo_status: data.status,
      notes: data.notes
    };

    const response = await apiClient.put(`/shop-leads/${id}`, payload);
    return mapLeadToFrontend(response.data.data);
  },

  deleteLead: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/shop-leads/${id}`);
  },

  // Demo Details
  getDemoDetails: async (leadId: number | string): Promise<DemoDetails> => {
    const response = await apiClient.get(`/shop-leads/${leadId}/demo`);
    const d = response.data.data;
    return {
      scheduledDate: d.created_at?.split('T')[0],
      completedDate: d.updated_at?.split('T')[0],
      trialStartDate: d.created_at?.split('T')[0],
      trialEndDate: d.updated_at?.split('T')[0],
      assignedTo: 'Alex Rivera',
      notes: d.notes
    };
  },

  saveDemoDetails: async (leadId: number | string, data: DemoDetails & { dvr_available?: boolean; rtsp_available?: boolean; engine_url?: string; notes?: string; last_test_status?: string }): Promise<void> => {
    const payload = {
      dvr_available: data.dvr_available ?? true,
      rtsp_available: data.rtsp_available ?? true,
      engine_url: data.engine_url || null,
      last_test_status: data.last_test_status || 'online',
      notes: data.notes || null,
    };
    await apiClient.put(`/shop-leads/${leadId}/demo`, payload);
  },

  // Follow-up Notes
  getFollowUps: async (leadId: number | string): Promise<FollowUp[]> => {
    const response = await apiClient.get(`/shop-leads/${leadId}/followups`);
    return response.data.data.map(mapFollowUpToFrontend);
  },

  createFollowUp: async (leadId: number | string, data: Partial<FollowUp>): Promise<FollowUp> => {
    const payload = {
      note: data.notes,
      follow_up_date: data.date,
      status: data.status || 'pending',
      created_by: data.createdBy || 'Alex Rivera'
    };
    const response = await apiClient.post(`/shop-leads/${leadId}/followups`, payload);
    return mapFollowUpToFrontend(response.data.data);
  },

  updateFollowUp: async (id: number | string, data: Partial<FollowUp>): Promise<FollowUp> => {
    const payload = {
      note: data.notes,
      follow_up_date: data.date,
      status: data.status,
      created_by: data.createdBy
    };
    const response = await apiClient.put(`/followups/${id}`, payload);
    return mapFollowUpToFrontend(response.data.data);
  },

  deleteFollowUp: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/followups/${id}`);
  }
};
