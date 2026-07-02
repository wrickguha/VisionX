import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Store,
  Tv,
  CalendarCheck,
  BarChart3,
  Settings as SettingsIcon,
  Menu,
  X,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const DashboardLayout: React.FC = () => {
  const {
    currentUser,
    notifications,
    markNotificationAsRead,
    searchQuery,
    setSearchQuery,
    toasts,
    removeToast
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Shop Leads', path: '/leads', icon: Store },
    { name: 'Demo Tracker', path: '/demos', icon: Tv },
    { name: 'Follow-ups', path: '/followups', icon: CalendarCheck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon }
  ];

  // Generate Breadcrumbs
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return [{ name: 'Dashboard', path: '/' }];

    const breadcrumbs = [{ name: 'Dashboard', path: '/' }];
    let currentPath = '';

    paths.forEach((p, idx) => {
      currentPath += `/${p}`;
      let name = p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ');
      if (p === 'leads' && idx === 0) name = 'Shop Leads';
      if (p === 'demos') name = 'Demo Tracker';
      if (p === 'followups') name = 'Follow-ups';
      if (p === 'add') name = 'New Shop';
      if (p === 'edit') name = 'Edit Shop';
      // If it looks like a lead ID
      if (p.startsWith('lead-')) {
        name = 'Lead Details';
      }

      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: string, leadId?: string) => {
    markNotificationAsRead(id);
    setIsNotificationOpen(false);
    if (leadId) {
      navigate(`/leads/${leadId}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-slate-50 flex">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-lg border border-neutral-slate-200/80 p-4 flex gap-3 items-start cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => removeToast(toast.id)}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-danger-500 shrink-0 mt-0.5" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-slate-900 leading-tight">{toast.title}</p>
                <p className="text-xs text-neutral-slate-500 mt-0.5 leading-snug">{toast.message}</p>
              </div>
              <button className="text-neutral-slate-400 hover:text-neutral-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-neutral-slate-200 transition-all duration-300 relative z-30 shrink-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-neutral-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shrink-0">
              V
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-neutral-slate-900 tracking-tight"
              >
                VisionX <span className="text-brand-600 font-medium">Guard</span>
              </motion.span>
            )}
          </Link>
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-neutral-slate-200 flex items-center justify-center text-neutral-slate-500 hover:text-neutral-slate-800 hover:border-neutral-slate-400 shadow-sm cursor-pointer transition-all"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Navigation items */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-neutral-slate-500 hover:bg-neutral-slate-100 hover:text-neutral-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-600' : 'text-neutral-slate-400 group-hover:text-neutral-slate-600'}`} />
                {!isSidebarCollapsed && <span>{item.name}</span>}
                
                {/* Collapsed Tooltip */}
                {isSidebarCollapsed && (
                  <div className="absolute left-16 bg-neutral-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-40">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full border border-neutral-slate-200 shrink-0"
            />
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-w-0"
              >
                <p className="text-sm font-semibold text-neutral-slate-800 truncate">{currentUser.name}</p>
                <p className="text-xs text-neutral-slate-400 truncate">{currentUser.role}</p>
              </motion.div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 flex flex-col md:hidden shadow-2xl"
            >
              <div className="h-16 px-6 border-b border-neutral-slate-100 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                    V
                  </div>
                  <span className="text-lg font-bold text-neutral-slate-900 tracking-tight">
                    VisionX <span className="text-brand-600 font-medium">Guard</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-neutral-slate-50 border border-neutral-slate-200 flex items-center justify-center text-neutral-slate-500 hover:text-neutral-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-50 text-brand-600 font-semibold'
                          : 'text-neutral-slate-600 hover:bg-neutral-slate-50 hover:text-neutral-slate-950'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-600' : 'text-neutral-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-neutral-slate-100 flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-full border border-neutral-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-slate-850 truncate">{currentUser.name}</p>
                  <p className="text-xs text-neutral-slate-450 truncate">{currentUser.role}</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-neutral-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-slate-100 text-neutral-slate-500 hover:text-neutral-slate-800"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>

            {/* Breadcrumbs - Hidden on small mobile screens */}
            <nav className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-slate-400">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path}>
                  {idx > 0 && <span className="text-neutral-slate-300">/</span>}
                  <Link
                    to={crumb.path}
                    className={`hover:text-neutral-slate-700 transition-colors ${
                      idx === breadcrumbs.length - 1 ? 'text-neutral-slate-600 font-semibold' : ''
                    }`}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Search, Notifications, Profile controls */}
          <div className="flex items-center gap-3.5">
            {/* Global Search Bar */}
            <div className="relative max-w-xs w-48 sm:w-60 md:w-72">
              <Search className="w-4 h-4 text-neutral-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Global search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-neutral-slate-200 bg-neutral-slate-50 text-sm placeholder-neutral-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-slate-400 hover:text-neutral-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                className="p-2 rounded-lg border border-neutral-slate-200 hover:bg-neutral-slate-50 text-neutral-slate-500 hover:text-neutral-slate-800 transition-all cursor-pointer relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white border border-neutral-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-neutral-slate-100 flex justify-between items-center bg-neutral-slate-50">
                        <span className="text-xs font-bold text-neutral-slate-700">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-[10px] bg-brand-50 text-brand-600 font-semibold px-2 py-0.5 rounded-full">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-neutral-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-neutral-slate-400">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => handleNotificationClick(notif.id)}
                              className={`p-4 hover:bg-neutral-slate-50 cursor-pointer transition-colors ${
                                !notif.read ? 'bg-brand-50/20' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-semibold text-neutral-slate-800">{notif.title}</p>
                                <span className="text-[10px] text-neutral-slate-400 shrink-0">
                                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-slate-500 mt-1 leading-snug">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full border border-neutral-slate-200"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-56 bg-white border border-neutral-slate-200 rounded-xl shadow-xl z-50 py-1.5"
                    >
                      <div className="px-4 py-2 border-b border-neutral-slate-100">
                        <p className="text-xs font-bold text-neutral-slate-800">{currentUser.name}</p>
                        <p className="text-[10px] text-neutral-slate-400 truncate">{currentUser.email}</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-slate-600 hover:bg-neutral-slate-50 hover:text-neutral-slate-900 transition-colors"
                      >
                        <SettingsIcon className="w-4 h-4 text-neutral-slate-400" />
                        Account Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          alert('Profile actions will be handled by Laravel auth services.');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-danger-600 hover:bg-danger-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-danger-500" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
