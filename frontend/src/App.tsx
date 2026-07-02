import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { ShopLeads } from './pages/ShopLeads';
import { ShopDetails } from './pages/ShopDetails';
import { AddEditShop } from './pages/AddEditShop';
import { DemoTracker } from './pages/DemoTracker';
import { FollowUps } from './pages/FollowUps';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<ShopLeads />} />
            <Route path="leads/add" element={<AddEditShop />} />
            <Route path="leads/:id" element={<ShopDetails />} />
            <Route path="leads/edit/:id" element={<AddEditShop />} />
            <Route path="demos" element={<DemoTracker />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            {/* Fallback to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
