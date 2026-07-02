import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import {
  Users,
  Tv,
  PlayCircle,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Calendar,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { leads, activities, followUps, searchQuery } = useApp();
  const navigate = useNavigate();

  // If user searches globally, redirect to leads page where filters and search will execute
  useEffect(() => {
    if (searchQuery) {
      navigate('/leads');
    }
  }, [searchQuery, navigate]);

  // Calculations for Stat Cards
  const totalLeads = leads.length;
  const activeDemos = leads.filter((l) => l.status === 'demo_scheduled').length;
  const trialsRunning = leads.filter((l) => l.status === 'trial_running').length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;
  const nonInterestedLeads = leads.filter((l) => l.status === 'not_interested').length;
  
  const eligibleForConversionRate = totalLeads - leads.filter(l => l.status === 'new').length;
  const conversionRate = eligibleForConversionRate > 0 
    ? ((convertedLeads / eligibleForConversionRate) * 100).toFixed(1) 
    : '0.0';

  // Trends calculation (static representation for high visual polish, but computed from mock timestamps)
  const currentMonthLeads = leads.filter(l => new Date(l.createdAt).getMonth() === 6).length; // July
  const lastMonthLeads = leads.filter(l => new Date(l.createdAt).getMonth() === 5).length; // June
  const leadTrend = currentMonthLeads - lastMonthLeads >= 0 
    ? `+${currentMonthLeads - lastMonthLeads} this month` 
    : `${currentMonthLeads - lastMonthLeads} this month`;

  const statCards = [
    {
      title: 'Total Shop Leads',
      value: totalLeads,
      trend: leadTrend,
      isPositive: currentMonthLeads - lastMonthLeads >= 0,
      icon: Users,
      iconColor: 'text-brand-600 bg-brand-50 border-brand-100',
      subtitle: 'Total registered prospects'
    },
    {
      title: 'Active Demos',
      value: activeDemos,
      trend: '+3 scheduled this week',
      isPositive: true,
      icon: Tv,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      subtitle: 'Scheduled demonstrations'
    },
    {
      title: 'Trials Running',
      value: trialsRunning,
      trend: '+2 started today',
      isPositive: true,
      icon: PlayCircle,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100',
      subtitle: 'Active sandbox trials'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      trend: 'Lead-to-converted metrics',
      isPositive: true,
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      subtitle: 'Converted vs completed demos'
    }
  ];

  // Chart 1: Monthly Lead Growth
  const monthlyGrowthData = [
    { name: 'Jan', Leads: 2 },
    { name: 'Feb', Leads: 5 },
    { name: 'Mar', Leads: 8 },
    { name: 'Apr', Leads: 12 },
    { name: 'May', Leads: 18 },
    { name: 'Jun', Leads: 23 },
    { name: 'Jul', Leads: totalLeads } // Dynamically binding to actual leads count
  ];

  // Chart 2: Leads by Status
  const statusColors = {
    new: '#3b82f6', // blue
    demo_scheduled: '#f59e0b', // amber
    trial_running: '#a855f7', // purple
    interested: '#14b8a6', // teal
    converted: '#10b981', // green
    not_interested: '#ef4444' // red
  };

  const statusPieData = [
    { name: 'New Lead', value: leads.filter(l => l.status === 'new').length, color: statusColors.new },
    { name: 'Demo Scheduled', value: activeDemos, color: statusColors.demo_scheduled },
    { name: 'Trial Running', value: trialsRunning, color: statusColors.trial_running },
    { name: 'Interested', value: leads.filter(l => l.status === 'interested').length, color: statusColors.interested },
    { name: 'Converted', value: convertedLeads, color: statusColors.converted },
    { name: 'Not Interested', value: nonInterestedLeads, color: statusColors.not_interested }
  ].filter(item => item.value > 0);

  // Chart 3: Camera Distribution
  const cameraDistribution = {
    '1-10 Cameras': leads.filter(l => l.cameraDetails.count <= 10).length,
    '11-30 Cameras': leads.filter(l => l.cameraDetails.count > 10 && l.cameraDetails.count <= 30).length,
    '31-80 Cameras': leads.filter(l => l.cameraDetails.count > 30 && l.cameraDetails.count <= 80).length,
    '80+ Cameras': leads.filter(l => l.cameraDetails.count > 80).length
  };

  const cameraChartData = Object.entries(cameraDistribution).map(([range, count]) => ({
    range,
    Shops: count
  }));

  // Chart 4: Conversion Rate Trend
  const conversionTrendData = [
    { month: 'Mar', Rate: 20 },
    { month: 'Apr', Rate: 22 },
    { month: 'May', Rate: 25 },
    { month: 'Jun', Rate: 33 },
    { month: 'Jul', Rate: parseFloat(conversionRate) || 35 }
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism p-3 rounded-xl border border-neutral-slate-200/80 shadow-md">
          <p className="text-xs font-bold text-neutral-slate-800">{label}</p>
          <p className="text-xs font-semibold text-brand-600 mt-1">
            {payload[0].name}: <span className="font-bold text-neutral-slate-900">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Recent 5 activities
  const recentActivities = activities.slice(0, 5);

  // Upcoming followups
  const upcomingFollowups = followUps
    .filter(f => f.status === 'pending')
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Dashboard Overview</h1>
        <p className="text-xs text-neutral-slate-400 mt-1">Real-time analytical insights and workflow pipeline metrics.</p>
      </div>

      {/* Grid: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} hoverable onClick={() => navigate('/leads')}>
              <CardBody className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-slate-500 tracking-wide">{card.title}</p>
                    <h3 className="text-2xl font-extrabold text-neutral-slate-800 tracking-tight mt-1">
                      {card.value}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-neutral-slate-100">
                  <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                    card.isPositive ? 'text-success-600' : 'text-neutral-slate-450'
                  }`}>
                    {card.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                    {card.trend}
                  </span>
                  <span className="text-[10px] text-neutral-slate-400">
                    &bull; {card.subtitle}
                  </span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Lead Volume Trend</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Cumulative monthly growth profiles</p>
            </div>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Leads" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Lead Status Donut Chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Leads by Status</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Distribution across sales pipeline</p>
            </div>
          </CardHeader>
          <CardBody className="h-80 flex flex-col justify-between">
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glassmorphism px-2 py-1.5 rounded-lg border border-neutral-slate-200 text-[10px] font-bold">
                            {payload[0].name}: {payload[0].value}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-neutral-slate-800">{totalLeads}</span>
                <span className="text-[9px] text-neutral-slate-450 uppercase tracking-widest font-semibold">Total Leads</span>
              </div>
            </div>

            {/* Legend Labels Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-left border-t border-neutral-slate-100 pt-3">
              {statusPieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-medium text-neutral-slate-655 truncate">{item.name}</span>
                  <span className="text-[10px] font-bold text-neutral-slate-700 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Second Row: Distribution Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Camera count density</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Quantity distributions among shops</p>
            </div>
          </CardHeader>
          <CardBody className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cameraChartData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glassmorphism px-3 py-2 rounded-lg border border-neutral-slate-200 text-xs font-semibold">
                          <p className="text-neutral-slate-500">{label}</p>
                          <p className="text-brand-600 mt-0.5">Leads: <span className="font-bold text-neutral-slate-900">{payload[0].value}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Shops" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Conversion Rate Progression Line Chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Conversion Rate History</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Lead-to-client conversion velocity</p>
            </div>
          </CardHeader>
          <CardBody className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrendData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glassmorphism px-3 py-2 rounded-lg border border-neutral-slate-200 text-xs font-semibold">
                          <p className="text-neutral-slate-500">{label}</p>
                          <p className="text-emerald-600 mt-0.5">Rate: <span className="font-bold text-neutral-slate-900">{payload[0].value}%</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="Rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Third Row: Activities Feed & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-neutral-slate-400" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Security Team Activity Log</h3>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-neutral-slate-100">
              {recentActivities.map((act) => {
                const lead = leads.find((l) => l.id === act.leadId);
                const leadName = lead ? lead.businessName : 'Unknown Shop';

                return (
                  <div key={act.id} className="p-4 hover:bg-neutral-slate-50 transition-colors flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0 text-xs font-bold">
                      {act.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-neutral-slate-850">
                          {act.userName} <span className="font-normal text-neutral-slate-450">logged</span> {act.action}
                        </p>
                        <span className="text-[10px] text-neutral-slate-400 whitespace-nowrap">
                          {new Date(act.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-slate-500 mt-1">
                        Shop: <span className="font-bold text-neutral-slate-700">{leadName}</span> &bull; {act.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Action Follow-Ups */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-slate-400" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Critical Tasks</h3>
            </div>
            <button onClick={() => navigate('/followups')} className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5 cursor-pointer">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-neutral-slate-100">
              {upcomingFollowups.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-slate-400">
                  No upcoming follow-up tasks.
                </div>
              ) : (
                upcomingFollowups.map((task) => {
                  const lead = leads.find((l) => l.id === task.leadId);
                  const isOverdue = new Date(task.date) < new Date('2026-07-03');

                  return (
                    <div key={task.id} className="p-4 hover:bg-neutral-slate-50/70 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          task.priority === 'high'
                            ? 'bg-rose-50 text-rose-700 border border-rose-105 border-rose-200/50'
                            : task.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                            : 'bg-blue-50 text-blue-700 border border-blue-200/50'
                        }`}>
                          {task.priority} priority
                        </span>
                        <span className={`text-[10px] font-bold ${isOverdue ? 'text-danger-550 text-danger-500 animate-pulse' : 'text-neutral-slate-400'}`}>
                          {isOverdue ? 'OVERDUE' : task.date}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-neutral-slate-800 mt-2 hover:underline cursor-pointer" onClick={() => navigate(`/leads/${task.leadId}`)}>
                        {lead ? lead.businessName : 'Unknown Shop'}
                      </p>
                      <p className="text-xs text-neutral-slate-500 mt-1 leading-snug truncate">
                        {task.notes}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
