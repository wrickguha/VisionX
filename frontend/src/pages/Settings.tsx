import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  User,
  Bell,
  Sliders,
  Save
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { currentUser, addToast } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);

  // Mocks settings
  const [trialDuration, setTrialDuration] = useState(30);
  const [defaultRetention, setDefaultRetention] = useState(30);
  const [cameraBrand, setCameraBrand] = useState('Hikvision');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [trialEndingAlerts, setTrialEndingAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'Settings Saved',
        'Your profile options and system preferences have been updated.',
        'success'
      );
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Application Settings</h1>
        <p className="text-xs text-neutral-slate-400 mt-1">Manage accounts options, pipeline trial durations, and system alerts.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-left">
        {/* Profile Details */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <User className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Account Profile Details</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full border border-neutral-slate-200 shadow-sm"
              />
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-slate-700">Profile Image</h4>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => alert('Laravel profile services will process image uploads.')}>
                    Change Image
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-danger-500 hover:text-danger-600">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Access Permission Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled
                helperText="Role access is managed by corporate administrator profiles."
              />
            </div>
          </CardBody>
        </Card>

        {/* Application Default thresholds */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Default Trial & CCTV Specs</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <Input
                label="Standard Trial Period (Days)"
                type="number"
                value={trialDuration}
                onChange={(e) => setTrialDuration(Number(e.target.value))}
                min={1}
                required
              />
              
              <Input
                label="Standard Archival Retention (Days)"
                type="number"
                value={defaultRetention}
                onChange={(e) => setDefaultRetention(Number(e.target.value))}
                min={1}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-slate-655 text-neutral-slate-600">Standard Camera Brand</label>
                <select
                  value={cameraBrand}
                  onChange={(e) => setCameraBrand(e.target.value)}
                  className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="Hikvision">Hikvision</option>
                  <option value="Dahua">Dahua</option>
                  <option value="Axis Communications">Axis Communications</option>
                  <option value="Hanwha Techwin">Hanwha Techwin</option>
                  <option value="Lorex">Lorex</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* System alerts settings */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <Bell className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Alert Notifications</h3>
            </div>

            <div className="space-y-4 text-xs font-medium text-neutral-slate-700">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-neutral-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-neutral-slate-800 block text-xs">Email Alerts</span>
                  <span className="text-[10px] text-neutral-slate-405 text-neutral-slate-400 block mt-0.5 font-normal">Receive reports on demo milestones and conversions weekly.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none border-t border-neutral-slate-100 pt-4">
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-neutral-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-neutral-slate-800 block text-xs">SMS Broadcasts</span>
                  <span className="text-[10px] text-neutral-slate-400 block mt-0.5 font-normal">Receive instant SMS alerts when a pilot is marked critical or overdue.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none border-t border-neutral-slate-100 pt-4">
                <input
                  type="checkbox"
                  checked={trialEndingAlerts}
                  onChange={(e) => setTrialEndingAlerts(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-neutral-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-neutral-slate-800 block text-xs">Trial Concluding Warning</span>
                  <span className="text-[10px] text-neutral-slate-450 text-neutral-slate-400 block mt-0.5 font-normal">Receive warning notifications 3 days before a sandbox expires.</span>
                </div>
              </label>
            </div>
          </CardBody>
        </Card>

        {/* Save button */}
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
