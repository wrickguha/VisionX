import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardBody } from '../components/ui/Card';
import {
  Calendar,
  Clock,
  User,
  CheckSquare,
  ChevronRight,
  TrendingUp,
  Camera
} from 'lucide-react';

export const DemoTracker: React.FC = () => {
  const { leads } = useApp();
  const navigate = useNavigate();

  // Filter leads by pipeline status
  const columns = [
    {
      id: 'demo_scheduled',
      title: 'Demo Scheduled',
      description: 'Scheduled demonstrations',
      leads: leads.filter((l) => l.status === 'demo_scheduled'),
      color: 'border-t-4 border-t-amber-500 bg-amber-50/20'
    },
    {
      id: 'trial_running',
      title: 'Trial Running',
      description: 'Active sandboxes & proofs of concept',
      leads: leads.filter((l) => l.status === 'trial_running'),
      color: 'border-t-4 border-t-purple-500 bg-purple-50/20'
    },
    {
      id: 'interested',
      title: 'Interested',
      description: 'Completed demos evaluating proposals',
      leads: leads.filter((l) => l.status === 'interested'),
      color: 'border-t-4 border-t-teal-500 bg-teal-50/20'
    },
    {
      id: 'converted',
      title: 'Converted Clients',
      description: 'Signed SLA active contracts',
      leads: leads.filter((l) => l.status === 'converted'),
      color: 'border-t-4 border-t-emerald-500 bg-emerald-50/20'
    }
  ];

  // Helper to calculate trial days remaining relative to mock date 2026-07-03
  const getTrialDaysRemaining = (endDateStr?: string) => {
    if (!endDateStr) return null;
    const today = new Date('2026-07-03');
    const endDate = new Date(endDateStr);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Demo & Trial Tracker</h1>
        <p className="text-xs text-neutral-slate-400 mt-1">Visualize and monitor active software sandboxes and demo presentations.</p>
      </div>

      {/* Summary stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-neutral-slate-200/60 p-4 rounded-2xl shadow-sm">
        <div className="text-center md:border-r border-neutral-slate-100 p-2">
          <span className="text-[10px] font-bold text-neutral-slate-400 uppercase tracking-wider block">Demos Scheduled</span>
          <span className="text-xl font-extrabold text-neutral-slate-800 block mt-1">
            {leads.filter(l => l.status === 'demo_scheduled').length}
          </span>
        </div>
        <div className="text-center md:border-r border-neutral-slate-100 p-2">
          <span className="text-[10px] font-bold text-neutral-slate-400 uppercase tracking-wider block">Active Pilots</span>
          <span className="text-xl font-extrabold text-neutral-slate-800 block mt-1">
            {leads.filter(l => l.status === 'trial_running').length}
          </span>
        </div>
        <div className="text-center md:border-r border-neutral-slate-100 p-2">
          <span className="text-[10px] font-bold text-neutral-slate-400 uppercase tracking-wider block">Evaluating Deals</span>
          <span className="text-xl font-extrabold text-neutral-slate-800 block mt-1">
            {leads.filter(l => l.status === 'interested').length}
          </span>
        </div>
        <div className="text-center p-2">
          <span className="text-[10px] font-bold text-neutral-slate-400 uppercase tracking-wider block">Fully Converted</span>
          <span className="text-xl font-extrabold text-success-600 block mt-1">
            {leads.filter(l => l.status === 'converted').length}
          </span>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between border-b border-neutral-slate-200 pb-2">
              <div>
                <h3 className="text-xs font-extrabold text-neutral-slate-800 tracking-wide">{col.title}</h3>
                <p className="text-[9px] text-neutral-slate-400 leading-normal mt-0.5">{col.description}</p>
              </div>
              <span className="text-xs font-bold text-neutral-slate-400 bg-neutral-slate-100 border border-neutral-slate-200 px-2.5 py-0.5 rounded-full select-none">
                {col.leads.length}
              </span>
            </div>

            {/* Leads Cards Container */}
            <div className="space-y-4 min-h-[400px]">
              {col.leads.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-neutral-slate-200 rounded-2xl bg-white text-[11px] text-neutral-slate-400">
                  No prospects in this stage.
                </div>
              ) : (
                col.leads.map((lead) => {
                  const daysLeft = getTrialDaysRemaining(lead.demoDetails?.trialEndDate);
                  
                  return (
                    <Card
                      key={lead.id}
                      hoverable
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className={`${col.color} border-t-4 transition-all hover:-translate-y-0.5`}
                    >
                      <CardBody className="p-4 space-y-3.5 text-xs text-left">
                        {/* Title and category */}
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-neutral-slate-850 truncate">{lead.businessName}</h4>
                          <span className="text-[10px] text-neutral-slate-400 font-medium block">
                            {lead.businessType.toUpperCase()}
                          </span>
                        </div>

                        {/* Middle stats */}
                        <div className="space-y-2 border-t border-neutral-slate-200/50 pt-3">
                          <div className="flex items-center justify-between text-[11px] text-neutral-slate-500">
                            <span className="flex items-center gap-1">
                              <Camera className="w-3.5 h-3.5 text-neutral-slate-400" />
                              {lead.cameraDetails.count} Channels
                            </span>
                            <span className="font-semibold text-neutral-slate-700">
                              {lead.cameraDetails.resolution}
                            </span>
                          </div>

                          {lead.demoDetails?.assignedTo && (
                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-slate-500">
                              <User className="w-3.5 h-3.5 text-neutral-slate-400" />
                              <span>Eng: <span className="font-bold text-neutral-slate-700">{lead.demoDetails.assignedTo}</span></span>
                            </div>
                          )}
                        </div>

                        {/* Footer timelines and days remaining */}
                        {col.id === 'demo_scheduled' && lead.demoDetails?.scheduledDate && (
                          <div className="bg-amber-100/30 border border-amber-200/30 p-2.5 rounded-xl flex items-center gap-1.5 text-[10px] text-amber-800">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span>Demo: <span className="font-bold">{lead.demoDetails.scheduledDate}</span></span>
                          </div>
                        )}

                        {col.id === 'trial_running' && daysLeft !== null && (
                          <div className={`p-2.5 rounded-xl flex flex-col gap-1.5 ${
                            daysLeft < 0
                              ? 'bg-rose-100/30 border border-rose-200/30 text-rose-800 font-semibold'
                              : daysLeft <= 5
                              ? 'bg-amber-100/30 border border-amber-200/30 text-amber-800 font-semibold animate-pulse'
                              : 'bg-purple-100/30 border border-purple-200/30 text-purple-800'
                          }`}>
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <Clock className="w-4 h-4 shrink-0" />
                              <span>
                                {daysLeft < 0
                                  ? 'Trial Completed'
                                  : daysLeft === 0
                                  ? 'Ends Today!'
                                  : `${daysLeft} days remaining`}
                              </span>
                            </div>
                            {/* Visual Progress bar */}
                            {daysLeft >= 0 && (
                              <div className="w-full bg-neutral-slate-200 rounded-full h-1">
                                <div
                                  className={`h-1 rounded-full ${
                                    daysLeft <= 5 ? 'bg-amber-500' : 'bg-purple-500'
                                  }`}
                                  style={{ width: `${Math.min(100, (daysLeft / 30) * 100)}%` }}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {col.id === 'interested' && (
                          <div className="bg-teal-100/30 border border-teal-200/30 p-2.5 rounded-xl flex items-center gap-1.5 text-[10px] text-teal-850 text-teal-800">
                            <TrendingUp className="w-4 h-4 shrink-0" />
                            <span className="font-semibold">Reviewing quotation proposal</span>
                          </div>
                        )}

                        {col.id === 'converted' && (
                          <div className="bg-emerald-100/30 border border-emerald-200/30 p-2.5 rounded-xl flex items-center gap-1.5 text-[10px] text-emerald-800">
                            <CheckSquare className="w-4 h-4 shrink-0 text-emerald-600" />
                            <span className="font-semibold">SaaS License Active</span>
                          </div>
                        )}

                        {/* Click to details */}
                        <div className="flex justify-end pt-1">
                          <span className="text-[10px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>

                      </CardBody>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
