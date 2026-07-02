import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import {
  CalendarCheck,
  CheckCircle,
  Trash2,
  Clock,
  Search
} from 'lucide-react';

export const FollowUps: React.FC = () => {
  const { leads, followUps, completeFollowUp, deleteFollowUp } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');
  const [taskSearch, setTaskSearch] = useState('');

  const mockToday = '2026-07-03';

  // Helper to categorize tasks
  const getCategorizedTasks = () => {
    return followUps.filter((task) => {
      const lead = leads.find((l) => l.id === task.leadId);
      if (!lead) return false;

      // Filter by search query matching shop name or task notes
      const matchesSearch =
        lead.businessName.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.notes.toLowerCase().includes(taskSearch.toLowerCase());

      if (!matchesSearch) return false;

      const isTaskOverdue = task.date < mockToday && task.status === 'pending';
      const isTaskUpcoming = task.date >= mockToday && task.status === 'pending';

      if (activeTab === 'overdue') return isTaskOverdue;
      if (activeTab === 'upcoming') return isTaskUpcoming;
      return task.status === 'completed';
    });
  };

  const currentTasks = getCategorizedTasks();

  const counts = {
    upcoming: followUps.filter((f) => f.status === 'pending' && f.date >= mockToday).length,
    overdue: followUps.filter((f) => f.status === 'pending' && f.date < mockToday).length,
    completed: followUps.filter((f) => f.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Task Follow-ups</h1>
          <p className="text-xs text-neutral-slate-400 mt-1">Audit, schedule, and check off pending sales outreach tasks.</p>
        </div>
      </div>

      {/* Tabs & Search controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-neutral-slate-200/60 shadow-sm">
        {/* Tabs switcher */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto select-none">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-brand-50 border-brand-200 text-brand-700 font-semibold'
                : 'bg-transparent border-transparent text-neutral-slate-505 text-neutral-slate-500 hover:bg-neutral-slate-50'
            }`}
          >
            Upcoming
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'upcoming' ? 'bg-brand-100 text-brand-850' : 'bg-neutral-slate-100 text-neutral-slate-550'}`}>
              {counts.upcoming}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overdue'
                ? 'bg-rose-50 border-rose-200 text-rose-700 font-semibold'
                : 'bg-transparent border-transparent text-neutral-slate-500 hover:bg-neutral-slate-55'
            }`}
          >
            Overdue
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${counts.overdue > 0 ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-neutral-slate-100 text-neutral-slate-500'}`}>
              {counts.overdue}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                : 'bg-transparent border-transparent text-neutral-slate-500 hover:bg-neutral-slate-50'
            }`}
          >
            Completed
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'completed' ? 'bg-emerald-100 text-emerald-850' : 'bg-neutral-slate-100 text-neutral-slate-500'}`}>
              {counts.completed}
            </span>
          </button>
        </div>

        {/* Task Specific Search Box */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-neutral-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-neutral-slate-200 bg-neutral-slate-50/50 text-xs placeholder-neutral-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Task List Grid */}
      {currentTasks.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title={`No ${activeTab} Tasks`}
          description={
            taskSearch
              ? 'No scheduled follow-up tasks match your search criteria.'
              : `You do not have any ${activeTab} follow-up reminders registered right now.`
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {currentTasks.map((task) => {
            const lead = leads.find((l) => l.id === task.leadId);
            const isOverdue = task.date < mockToday && task.status === 'pending';

            return (
              <Card
                key={task.id}
                className={`transition-all hover:shadow-md border-l-4 ${
                  task.status === 'completed'
                    ? 'border-l-neutral-slate-300'
                    : task.priority === 'high'
                    ? 'border-l-danger-500'
                    : task.priority === 'medium'
                    ? 'border-l-warning-500'
                    : 'border-l-brand-500'
                }`}
              >
                <CardBody className="p-5 space-y-4 text-xs text-left">
                  {/* Card Header row */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4
                        className="font-extrabold text-neutral-slate-800 text-sm hover:underline cursor-pointer"
                        onClick={() => navigate(`/leads/${task.leadId}`)}
                      >
                        {lead?.businessName}
                      </h4>
                      <p className="text-[10px] text-neutral-slate-400 mt-0.5">Contact: {lead?.ownerName}</p>
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      task.status === 'completed'
                        ? 'bg-neutral-slate-100 text-neutral-slate-450 border border-neutral-slate-200/50'
                        : task.priority === 'high'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/50'
                        : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                        : 'bg-blue-50 text-blue-700 border border-blue-200/50'
                    }`}>
                      {task.status === 'completed' ? 'Completed' : `${task.priority} Priority`}
                    </span>
                  </div>

                  {/* Task Notes details */}
                  <p className={`text-neutral-slate-550 leading-relaxed ${task.status === 'completed' ? 'line-through text-neutral-slate-400' : ''}`}>
                    {task.notes}
                  </p>

                  {/* Date details and check-off controls */}
                  <div className="flex items-center justify-between border-t border-neutral-slate-100 pt-3.5 flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-neutral-slate-400">
                      <Clock className={`w-4 h-4 ${isOverdue ? 'text-danger-550 text-danger-550 text-danger-500 animate-pulse' : 'text-neutral-slate-400'}`} />
                      <span className={`font-semibold ${isOverdue ? 'text-danger-500 font-bold' : ''}`}>
                        {task.date} {isOverdue && '(OVERDUE)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 ml-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/leads/${task.leadId}`)}
                        className="px-2.5 py-1 text-neutral-slate-655 text-xs"
                      >
                        Details
                      </Button>
                      
                      {task.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => completeFollowUp(task.id)}
                          className="px-2.5 py-1 text-success-600 hover:text-success-700 font-bold flex items-center gap-1 hover:bg-success-50 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFollowUp(task.id)}
                        className="px-2.5 py-1 text-neutral-slate-400 hover:text-danger-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )})}
          </div>
        )}
    </div>
  );
};
