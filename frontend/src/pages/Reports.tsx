import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  FileSpreadsheet,
  FileText,
  Camera,
  Layers,
  Award
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { leads, addToast } = useApp();

  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  // Computations
  const totalLeads = leads.length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;
  
  // Total cameras monitored (across converted and active trial leads)
  const totalCamerasMonitored = leads
    .filter(l => l.status === 'converted' || l.status === 'trial_running')
    .reduce((sum, lead) => sum + lead.cameraDetails.count, 0);

  // Business Category Distribution
  const typeCounts = leads.reduce((acc, lead) => {
    acc[lead.businessType] = (acc[lead.businessType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const businessTypesNames: Record<string, string> = {
    retail: 'Retail',
    restaurant: 'Restaurant',
    supermarket: 'Supermarket',
    warehouse: 'Warehouse',
    office: 'Office',
    other: 'Other'
  };

  const businessDistributionData = Object.entries(typeCounts).map(([type, count]) => ({
    name: businessTypesNames[type] || type,
    Prospects: count
  }));

  // Demo Completion Velocity trends
  const pipelineTrends = [
    { week: 'Wk 1', Scheduled: 3, Completed: 2, Converted: 1 },
    { week: 'Wk 2', Scheduled: 5, Completed: 4, Converted: 2 },
    { week: 'Wk 3', Scheduled: 8, Completed: 6, Converted: 3 },
    { week: 'Wk 4', Scheduled: totalLeads - 10, Completed: totalLeads - 15, Converted: convertedCount }
  ];

  // Simulating exports
  const triggerCSVExport = () => {
    setIsExportingCSV(true);
    setTimeout(() => {
      setIsExportingCSV(false);
      addToast(
        'Export Complete',
        'CSV file compiled containing 26 leads with details has been downloaded.',
        'success'
      );
    }, 2000);
  };

  const triggerPDFExport = () => {
    setIsExportingPDF(true);
    setTimeout(() => {
      setIsExportingPDF(false);
      addToast(
        'Report Rendered',
        'PDF Performance Report printed successfully.',
        'success'
      );
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Analytics & Reports</h1>
          <p className="text-xs text-neutral-slate-400 mt-1">Export, review and audit shop leads conversion velocities.</p>
        </div>
        
        {/* Export buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            isLoading={isExportingCSV}
            leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            onClick={triggerCSVExport}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            isLoading={isExportingPDF}
            leftIcon={<FileText className="w-4 h-4" />}
            onClick={triggerPDFExport}
          >
            Download Report
          </Button>
        </div>
      </div>

      {/* Grid: Reporting cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="p-5 flex items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-slate-400 font-semibold block uppercase">Cams Under Management</span>
              <span className="text-2xl font-black text-neutral-slate-800 block mt-1">{totalCamerasMonitored} Channels</span>
              <span className="text-[10px] text-neutral-slate-400 block mt-1">Active monitoring / sandbox channels</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-5 flex items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-slate-400 font-semibold block uppercase">Lead Conversion Ratio</span>
              <span className="text-2xl font-black text-neutral-slate-800 block mt-1">
                {((convertedCount / (totalLeads || 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-neutral-slate-400 block mt-1">Signed contracts vs total prospects</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-5 flex items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-slate-400 font-semibold block uppercase">Average Pilot Term</span>
              <span className="text-2xl font-black text-neutral-slate-800 block mt-1">24.5 Days</span>
              <span className="text-[10px] text-neutral-slate-400 block mt-1">Proof of concept duration mean</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Grid: Recharts Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Business Category chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Leads by Business Category</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Quantity of registered prospects by industry</p>
            </div>
          </CardHeader>
          <CardBody className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glassmorphism px-3 py-1.5 rounded-lg border border-neutral-slate-200 text-xs font-semibold">
                          {payload[0].name}: <span className="font-bold text-neutral-slate-900">{payload[0].value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Prospects" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Pipeline Velocity Area Chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Pipeline Velocity Growth</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Outreach, demo completed, and converted progressions</p>
            </div>
          </CardHeader>
          <CardBody className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScheduled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" name="Scheduled" dataKey="Scheduled" stroke="#3b82f6" strokeWidth={2} fill="url(#colorScheduled)" />
                <Area type="monotone" name="Completed" dataKey="Completed" stroke="#f59e0b" strokeWidth={2} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

      </div>
    </div>
  );
};
