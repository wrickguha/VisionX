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
  const { activities, searchQuery, isLoading, dashboardMetrics } = useApp();
  const navigate = useNavigate();

  // If user searches globally, redirect to leads page where filters and search will execute
  useEffect(() => {
    if (searchQuery) {
      navigate('/leads');
    }
  }, [searchQuery, navigate]);

  // Loading skeleton state
  if (isLoading || !dashboardMetrics) {
    return (
      <div className="space-y-8 animate-pulse">
        <div>
          <div className="h-7 w-48 bg-neutral-200 rounded-lg"></div>
          <div className="h-4 w-72 bg-neutral-100 rounded-lg mt-2"></div>
        </div>
        
        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-neutral-50 rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-3.5 w-24 bg-neutral-200 rounded"></div>
                  <div className="h-7 w-12 bg-neutral-250 rounded"></div>
                </div>
                <div className="w-10 h-10 bg-neutral-200 rounded-xl"></div>
              </div>
              <div className="h-3 w-full bg-neutral-100 rounded"></div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-neutral-50 rounded-2xl border border-neutral-200"></div>
          <div className="h-96 bg-neutral-50 rounded-2xl border border-neutral-200"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Shop Leads',
      value: dashboardMetrics.summary.total_leads,
      trend: `+${dashboardMetrics.summary.total_leads} total`,
      isPositive: true,
      icon: Users,
      iconColor: 'text-brand-600 bg-brand-50 border-brand-100',
      subtitle: 'Registered prospects'
    },
    {
      title: 'Active Demos',
      value: dashboardMetrics.summary.active_demos,
      trend: 'Pipeline demonstrations',
      isPositive: true,
      icon: Tv,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      subtitle: 'Leads scheduled for demo'
    },
    {
      title: 'Trials Running',
      value: dashboardMetrics.summary.trials_running,
      trend: 'Live pilot setups',
      isPositive: true,
      icon: PlayCircle,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100',
      subtitle: 'Sandboxed edge trials'
    },
    {
      title: 'Conversion Rate',
      value: `${dashboardMetrics.summary.conversion_rate}%`,
      trend: 'Successful conversions',
      isPositive: true,
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      subtitle: 'Converted vs eligible leads'
    }
  ];

  // Chart 1: Monthly Lead Growth
  const monthlyGrowthData = dashboardMetrics.monthly_growth;

  // Chart 2: Leads by Status
  const statusColors = {
    new: '#3b82f6', // blue
    demo_scheduled: '#f59e0b', // amber
    trial_running: '#a855f7', // purple
    interested: '#14b8a6', // teal
    converted: '#10b981', // green
    not_interested: '#ef4444', // red
    trial_expired: '#6b7280' // gray
  };

  const statusPieData = dashboardMetrics.status_distribution.map((item: any) => ({
    name: item.label,
    value: item.count,
    color: statusColors[item.status as keyof typeof statusColors] || '#94a3b8'
  })).filter((item: any) => item.value > 0);

  // Chart 3: Camera Distribution
  const cameraChartData = dashboardMetrics.camera_distribution;

  // Chart 4: Conversion Rate Trend
  const conversionTrendData = [
    { month: 'May', Rate: 20 },
    { month: 'Jun', Rate: 24 },
    { month: 'Jul', Rate: dashboardMetrics.summary.conversion_rate }
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
  const upcomingFollowups = dashboardMetrics.upcoming_followups.slice(0, 3);

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
                    {statusPieData.map((entry: any, index: number) => (
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
                <span className="text-2xl font-black text-neutral-slate-800">{dashboardMetrics.summary.total_leads}</span>
                <span className="text-[9px] text-neutral-slate-450 uppercase tracking-widest font-semibold">Total Leads</span>
              </div>
            </div>

            {/* Legend Labels Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-left border-t border-neutral-slate-100 pt-3">
              {statusPieData.map((item: any, idx: number) => (
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
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Shops" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Conversion rate line chart */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Demo Conversion Performance</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Historical efficiency ratios</p>
            </div>
          </CardHeader>
          <CardBody className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrendData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glassmorphism p-2 rounded-lg border border-neutral-slate-200 text-[10px] font-bold">
                          Conversion: {payload[0].value}%
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="Rate" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Third Row: Workflows Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Audit Logs */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Recent System Logs</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Audit log of system and lead events</p>
            </div>
            <span className="text-[10px] font-semibold text-neutral-slate-450 flex items-center gap-0.5">
              Live Feed <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </span>
          </CardHeader>
          <CardBody>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((act, actIdx) => (
                  <li key={act.id}>
                    <div className="relative pb-8">
                      {actIdx !== recentActivities.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-slate-100" aria-hidden="true" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                            <Activity className="w-4 h-4" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5">
                          <p className="text-xs font-semibold text-neutral-slate-700">
                            {act.userName}{' '}
                            <span className="font-normal text-neutral-slate-500">performed</span>{' '}
                            <span className="font-bold text-brand-600">{act.action}</span>
                          </p>
                          <p className="text-[10px] text-neutral-slate-400 mt-0.5">{act.details}</p>
                        </div>
                        <div className="text-right text-[10px] whitespace-nowrap text-neutral-slate-450">
                          <time>{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {recentActivities.length === 0 && (
                  <div className="text-center py-6 text-xs text-neutral-slate-400">
                    No recent activities recorded.
                  </div>
                )}
              </ul>
            </div>
          </CardBody>
        </Card>

        {/* Immediate Follow-ups Panel */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-neutral-slate-800">Pending Outreaches</h3>
              <p className="text-[10px] text-neutral-slate-400 mt-0.5">Nearest pending outreach items</p>
            </div>
            <button
              onClick={() => navigate('/follow-ups')}
              className="text-[10px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
            >
              All <ChevronRight className="w-3 h-3" />
            </button>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {upcomingFollowups.map((task: any) => (
                <div
                  key={task.id}
                  onClick={() => navigate(`/leads/${task.leadId}`)}
                  className="group cursor-pointer p-3 rounded-xl border border-neutral-slate-100 hover:border-brand-200 bg-neutral-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-2 shadow-sm hover:shadow"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-neutral-slate-655 truncate max-w-[120px]">
                      {task.createdBy}
                    </span>
                    <span className="text-[9px] font-semibold text-neutral-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-slate-350" /> {task.date}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-slate-600 line-clamp-2 leading-relaxed">{task.notes}</p>
                </div>
              ))}
              {upcomingFollowups.length === 0 && (
                <div className="text-center py-10 text-xs text-neutral-slate-400">
                  All caught up! No pending follow-ups.
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
