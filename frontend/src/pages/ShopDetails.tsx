import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import type { ShopLeadStatus, BusinessType } from '../types';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Edit2,
  Trash2,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Plus,
  CheckCircle,
  AlertTriangle,
  History
} from 'lucide-react';

export const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    leads,
    followUps,
    activities,
    updateLead,
    deleteLead,
    addFollowUp,
    completeFollowUp,
    deleteFollowUp
  } = useApp();

  const lead = leads.find((l) => l.id === id);

  // Follow-up form states
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpPriority, setFollowUpPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Delete lead state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!lead) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Lead Not Found"
        description="The lead profile you are trying to view does not exist or has been deleted."
        actionLabel="Back to Shop Leads"
        onActionClick={() => navigate('/leads')}
      />
    );
  }

  // Filter followups and activities related to this lead
  const leadFollowUps = followUps.filter((f) => f.leadId === lead.id);
  const leadActivities = activities.filter((a) => a.leadId === lead.id);

  const businessTypes: Record<BusinessType, string> = {
    retail: 'Retail Store',
    restaurant: 'Restaurant / Café',
    supermarket: 'Supermarket / Grocery',
    warehouse: 'Warehouse / Logistics',
    office: 'Corporate Office',
    other: 'Other Business'
  };

  const handleStatusChange = (newStatus: ShopLeadStatus) => {
    updateLead(lead.id, { status: newStatus });
  };

  const handleDeleteLead = () => {
    deleteLead(lead.id);
    navigate('/leads');
  };

  const handleAddFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpDate || !followUpNotes) return;

    addFollowUp({
      leadId: lead.id,
      date: followUpDate,
      notes: followUpNotes,
      status: 'pending',
      priority: followUpPriority
    });

    setFollowUpNotes('');
    setFollowUpDate('');
    setFollowUpPriority('medium');
    setIsFollowUpModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Detail Header Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-slate-200/60 pb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/leads"
            className="w-10 h-10 rounded-xl bg-white border border-neutral-slate-200/80 flex items-center justify-center text-neutral-slate-500 hover:text-neutral-slate-800 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">{lead.businessName}</h1>
              <Badge status={lead.status} />
            </div>
            <p className="text-xs text-neutral-slate-450 mt-1">
              Lead Owner: <span className="font-semibold text-neutral-slate-655">{lead.ownerName}</span> &bull; Registered on {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Change status select & action keys */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-white border border-neutral-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-neutral-slate-450 uppercase mr-2.5">Status:</span>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value as ShopLeadStatus)}
              className="text-xs font-bold text-brand-600 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
            >
              <option value="new">New Lead</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="trial_running">Trial Running</option>
              <option value="interested">Interested</option>
              <option value="converted">Converted</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Edit2 className="w-4 h-4" />}
            onClick={() => navigate(`/leads/edit/${lead.id}`)}
          >
            Edit
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Grid: Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Information and Technical Infrastructure */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: Lead Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-neutral-slate-800">Lead Overview</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-slate-50 border border-neutral-slate-100 flex items-center justify-center text-neutral-slate-400">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-slate-400 block font-semibold">Contact Person</span>
                    <span className="font-bold text-neutral-slate-800">{lead.ownerName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-slate-50 border border-neutral-slate-100 flex items-center justify-center text-neutral-slate-400">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-slate-400 block font-semibold">Phone Number</span>
                    <a href={`tel:${lead.phone}`} className="font-bold text-brand-600 hover:underline">{lead.phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-slate-50 border border-neutral-slate-100 flex items-center justify-center text-neutral-slate-400">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-slate-400 block font-semibold">Email Address</span>
                    <a href={`mailto:${lead.email}`} className="font-bold text-brand-600 hover:underline truncate block max-w-xs">{lead.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-slate-50 border border-neutral-slate-100 flex items-center justify-center text-neutral-slate-400">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-slate-400 block font-semibold">Business Address</span>
                    <span className="font-bold text-neutral-slate-800 truncate block max-w-xs">{lead.address}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-3 border-t border-neutral-slate-100">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold mb-1.5">Business Category</span>
                  <span className="font-bold text-neutral-slate-800 bg-neutral-slate-100/70 border border-neutral-slate-200/50 px-2.5 py-1 rounded-lg">
                    {businessTypes[lead.businessType]}
                  </span>
                </div>

                {lead.notes && (
                  <div className="sm:col-span-2 pt-3 border-t border-neutral-slate-100">
                    <span className="text-[10px] text-neutral-slate-400 block font-semibold">Lead Notes</span>
                    <p className="text-neutral-slate-655 mt-1 leading-relaxed">{lead.notes}</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Card: Camera details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-neutral-slate-800">Hardware & CCTV Infrastructure</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-xs">
                <div className="bg-neutral-slate-50/50 border border-neutral-slate-100 p-3 rounded-2xl">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold">Channels Count</span>
                  <span className="text-xl font-extrabold text-neutral-slate-800 block mt-1">{lead.cameraDetails.count}</span>
                </div>
                <div className="bg-neutral-slate-50/50 border border-neutral-slate-100 p-3 rounded-2xl">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold">Camera Brand</span>
                  <span className="text-sm font-bold text-neutral-slate-850 block mt-2">{lead.cameraDetails.brand}</span>
                </div>
                <div className="bg-neutral-slate-50/50 border border-neutral-slate-100 p-3 rounded-2xl">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold">Resolution</span>
                  <span className="text-sm font-bold text-neutral-slate-850 block mt-2">{lead.cameraDetails.resolution}</span>
                </div>
                <div className="bg-neutral-slate-50/50 border border-neutral-slate-100 p-3 rounded-2xl">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold">Stream Type</span>
                  <span className="text-sm font-bold text-brand-600 block mt-2 uppercase">{lead.cameraDetails.type}</span>
                </div>
                <div className="bg-neutral-slate-50/50 border border-neutral-slate-100 p-3 rounded-2xl col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-neutral-slate-400 block font-semibold">Archive Retention</span>
                  <span className="text-sm font-bold text-neutral-slate-850 block mt-2">{lead.cameraDetails.recordingDays} Days</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card: Demo details & Timeline */}
          {lead.demoDetails.scheduledDate && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <h3 className="text-sm font-bold text-neutral-slate-800">Pilot & Sandbox Timeline</h3>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="relative border-l border-neutral-slate-200 pl-6 space-y-6 text-xs text-left">
                  {/* Step 1: Demo Scheduled */}
                  <div className="relative">
                    <div className="absolute -left-9.5 top-0.5 w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-semibold z-10 text-[10px]">
                      D
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-slate-800">Demonstration Scheduled</h4>
                      <p className="text-[10px] text-neutral-slate-400 mt-0.5">Date: {lead.demoDetails.scheduledDate} &bull; Lead Engineer: {lead.demoDetails.assignedTo}</p>
                      {lead.demoDetails.completedDate && (
                        <p className="text-success-600 font-semibold mt-1">✓ Completed on {lead.demoDetails.completedDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Trial Running */}
                  {lead.demoDetails.trialStartDate && (
                    <div className="relative">
                      <div className="absolute -left-9.5 top-0.5 w-7 h-7 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 font-semibold z-10 text-[10px]">
                        T
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-slate-800">Sandbox Trial Execution</h4>
                        <p className="text-[10px] text-neutral-slate-400 mt-0.5">
                          Duration: {lead.demoDetails.trialStartDate} to {lead.demoDetails.trialEndDate}
                        </p>
                        {lead.demoDetails.notes && (
                          <p className="bg-neutral-slate-50 border border-neutral-slate-100 p-2 rounded-xl text-neutral-slate-500 mt-2 leading-relaxed">
                            {lead.demoDetails.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Converted */}
                  {lead.status === 'converted' && (
                    <div className="relative">
                      <div className="absolute -left-9.5 top-0.5 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold z-10 text-[10px]">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-700">Contract Activated</h4>
                        <p className="text-[10px] text-neutral-slate-450 mt-0.5">Client account is fully initialized and monitoring active SaaS channels.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}

        </div>

        {/* Right Column: Follow-ups list and chronological Activity Logs */}
        <div className="space-y-8">
          
          {/* Card: Follow-up Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-neutral-slate-800">Action Tasks</h3>
              </div>
              <button
                onClick={() => setIsFollowUpModalOpen(true)}
                className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 hover:bg-brand-100 transition-colors cursor-pointer"
                title="Add Task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-neutral-slate-100 text-xs">
                {leadFollowUps.length === 0 ? (
                  <div className="p-8 text-center text-neutral-slate-400">
                    No tasks assigned to this lead.
                  </div>
                ) : (
                  leadFollowUps.map((task) => {
                    const isOverdue = new Date(task.date) < new Date('2026-07-03') && task.status === 'pending';
                    
                    return (
                      <div key={task.id} className="p-4 space-y-2 hover:bg-neutral-slate-50/50 transition-colors">
                        <div className="flex justify-between items-start gap-1">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            task.status === 'completed'
                              ? 'bg-neutral-slate-100 text-neutral-slate-450 border border-neutral-slate-200/50'
                              : task.priority === 'high'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200/50'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                          }`}>
                            {task.status === 'completed' ? 'Completed' : `${task.priority} Priority`}
                          </span>
                          
                          <span className={`font-semibold ${isOverdue ? 'text-danger-500 animate-pulse' : 'text-neutral-slate-400'}`}>
                            {task.date} {isOverdue && '(OVERDUE)'}
                          </span>
                        </div>
                        <p className={`text-neutral-slate-655 leading-relaxed ${task.status === 'completed' ? 'line-through text-neutral-slate-400' : ''}`}>
                          {task.notes}
                        </p>
                        
                        {task.status === 'pending' && (
                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => completeFollowUp(task.id)}
                              className="text-[10px] font-bold text-success-600 hover:text-success-700 flex items-center gap-1 border border-success-200 px-2 py-1 rounded-lg hover:bg-success-50 transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Mark Complete
                            </button>
                            <button
                              onClick={() => deleteFollowUp(task.id)}
                              className="text-[10px] font-bold text-neutral-slate-400 hover:text-danger-600 border border-neutral-slate-200 px-2 py-1 rounded-lg hover:bg-neutral-slate-50 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardBody>
          </Card>

          {/* Card: History Logs */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-neutral-slate-800">Activity History</h3>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-neutral-slate-100 max-h-96 overflow-y-auto text-xs">
                {leadActivities.length === 0 ? (
                  <div className="p-8 text-center text-neutral-slate-400">
                    No activity registered yet.
                  </div>
                ) : (
                  leadActivities.map((act) => (
                    <div key={act.id} className="p-4 hover:bg-neutral-slate-55 hover:bg-neutral-slate-50/50 transition-colors">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-bold text-neutral-slate-700">{act.action}</span>
                        <span className="text-[10px] text-neutral-slate-400">
                          {new Date(act.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-slate-400 mt-1">Logged by {act.userName}</p>
                      <p className="text-neutral-slate-500 mt-1 leading-snug">{act.details}</p>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>

        </div>
      </div>

      {/* Modal: Add Follow-up Task */}
      <Modal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        title="Schedule Follow-up Task"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsFollowUpModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddFollowUpSubmit}>
              Schedule Task
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddFollowUpSubmit} className="space-y-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-slate-500">Scheduled Date</label>
            <input
              type="date"
              required
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-slate-500">Priority Level</label>
            <select
              value={followUpPriority}
              onChange={(e) => setFollowUpPriority(e.target.value as any)}
              className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-slate-500">Task Notes</label>
            <textarea
              required
              rows={3}
              placeholder="Detail what needs to be discussed or sent..."
              value={followUpNotes}
              onChange={(e) => setFollowUpNotes(e.target.value)}
              className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all resize-none"
            />
          </div>
        </form>
      </Modal>

      {/* Modal: Confirm Delete Lead */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Lead Profile"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteLead}>
              Delete Lead
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-danger-50 border border-danger-100 flex items-center justify-center text-danger-500 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-neutral-slate-900">Confirm permanent deletion</p>
            <p className="text-xs text-neutral-slate-450 mt-2 leading-relaxed">
              Are you sure you want to delete the lead profile for <span className="font-bold text-neutral-slate-800">{lead.businessName}</span>?
              This action will clear all associated activities and follow-ups. This cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
