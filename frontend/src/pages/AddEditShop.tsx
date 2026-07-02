import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApp } from '../context/AppContext';
import type { BusinessType, ShopLeadStatus } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { ArrowLeft, Save, ShieldCheck, Camera, Info, Calendar, FileText } from 'lucide-react';

interface FormValues {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  businessType: BusinessType;
  status: ShopLeadStatus;
  
  // Camera details
  cameraCount: number;
  cameraBrand: string;
  cameraResolution: string;
  cameraType: 'ip' | 'analog' | 'mixed';
  recordingDays: number;

  // Demo details
  scheduledDate?: string;
  completedDate?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  assignedTo?: string;
  demoNotes?: string;

  notes?: string;
}

export const AddEditShop: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { leads, addLead, updateLead } = useApp();
  
  const isEditMode = !!id;
  const existingLead = isEditMode ? leads.find((l) => l.id === id) : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      businessName: '',
      ownerName: '',
      phone: '',
      email: '',
      address: '',
      businessType: 'retail',
      status: 'new',
      cameraCount: 8,
      cameraBrand: 'Hikvision',
      cameraResolution: '1080p (2MP)',
      cameraType: 'ip',
      recordingDays: 30,
      assignedTo: '',
      demoNotes: '',
      notes: ''
    }
  });

  // Watch status to dynamically show/hide Demo details fields
  const watchedStatus = watch('status');

  // Populate form if in edit mode
  useEffect(() => {
    if (isEditMode && existingLead) {
      setValue('businessName', existingLead.businessName);
      setValue('ownerName', existingLead.ownerName);
      setValue('phone', existingLead.phone);
      setValue('email', existingLead.email);
      setValue('address', existingLead.address);
      setValue('businessType', existingLead.businessType);
      setValue('status', existingLead.status);
      
      setValue('cameraCount', existingLead.cameraDetails.count);
      setValue('cameraBrand', existingLead.cameraDetails.brand);
      setValue('cameraResolution', existingLead.cameraDetails.resolution);
      setValue('cameraType', existingLead.cameraDetails.type);
      setValue('recordingDays', existingLead.cameraDetails.recordingDays);

      if (existingLead.demoDetails) {
        setValue('scheduledDate', existingLead.demoDetails.scheduledDate || '');
        setValue('completedDate', existingLead.demoDetails.completedDate || '');
        setValue('trialStartDate', existingLead.demoDetails.trialStartDate || '');
        setValue('trialEndDate', existingLead.demoDetails.trialEndDate || '');
        setValue('assignedTo', existingLead.demoDetails.assignedTo || '');
        setValue('demoNotes', existingLead.demoDetails.notes || '');
      }

      setValue('notes', existingLead.notes || '');
    }
  }, [isEditMode, existingLead, setValue]);

  const onSubmit = async (data: FormValues) => {
    // Construct Lead Object payload
    const leadPayload = {
      businessName: data.businessName,
      ownerName: data.ownerName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      businessType: data.businessType,
      status: data.status,
      cameraDetails: {
        count: Number(data.cameraCount),
        brand: data.cameraBrand,
        resolution: data.cameraResolution,
        type: data.cameraType,
        recordingDays: Number(data.recordingDays)
      },
      demoDetails: {
        scheduledDate: data.scheduledDate || undefined,
        completedDate: data.completedDate || undefined,
        trialStartDate: data.trialStartDate || undefined,
        trialEndDate: data.trialEndDate || undefined,
        assignedTo: data.assignedTo || undefined,
        notes: data.demoNotes || undefined
      },
      notes: data.notes || undefined
    };

    if (isEditMode && id) {
      await updateLead(id, leadPayload);
      navigate(`/leads/${id}`);
    } else {
      const newLead = await addLead(leadPayload);
      navigate(`/leads/${newLead.id}`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header bar */}
      <div className="flex items-center gap-4">
        <Link
          to={isEditMode ? `/leads/${id}` : '/leads'}
          className="w-10 h-10 rounded-xl bg-white border border-neutral-slate-200/80 flex items-center justify-center text-neutral-slate-500 hover:text-neutral-slate-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">
            {isEditMode ? 'Edit Shop Lead' : 'Register New Shop Lead'}
          </h1>
          <p className="text-xs text-neutral-slate-400 mt-1">
            {isEditMode
              ? `Modify properties for ${existingLead?.businessName}`
              : 'Add details to register and launch demo trials.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section 1: Contact Details */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Basic & Contact Info</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Business Name *"
                placeholder="e.g. Apex Supermarket"
                error={errors.businessName?.message}
                {...register('businessName', { required: 'Business Name is required' })}
              />

              <Input
                label="Owner / Contact Person *"
                placeholder="e.g. John Doe"
                error={errors.ownerName?.message}
                {...register('ownerName', { required: 'Owner Name is required' })}
              />

              <Input
                label="Phone Number *"
                placeholder="e.g. +1 (555) 234-5678"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone Number is required' })}
              />

              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g. contact@business.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email Address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <div className="md:col-span-2">
                <Input
                  label="Business Address *"
                  placeholder="e.g. 123 Main St, New York, NY 10001"
                  error={errors.address?.message}
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Section 2: Business & Status Options */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <Info className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Business Profiling</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-slate-600">Business Category *</label>
                <select
                  className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  {...register('businessType')}
                >
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant / Café</option>
                  <option value="supermarket">Supermarket / Grocery</option>
                  <option value="warehouse">Warehouse / Logistics</option>
                  <option value="office">Corporate Office</option>
                  <option value="other">Other Business Type</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-slate-600">Pipeline Status *</label>
                <select
                  className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  {...register('status')}
                >
                  <option value="new">New Lead</option>
                  <option value="demo_scheduled">Demo Scheduled</option>
                  <option value="trial_running">Trial Running</option>
                  <option value="interested">Interested</option>
                  <option value="converted">Converted</option>
                  <option value="not_interested">Not Interested</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Section 3: Technical & CCTV Details */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <Camera className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">CCTV & Hardware Setup</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <Input
                label="Camera Channels Count *"
                type="number"
                placeholder="e.g. 16"
                error={errors.cameraCount?.message}
                {...register('cameraCount', { required: 'Camera Count is required', min: { value: 1, message: 'Must be at least 1' } })}
              />

              <Input
                label="Camera Brand"
                placeholder="e.g. Hikvision, Axis"
                error={errors.cameraBrand?.message}
                {...register('cameraBrand')}
              />

              <Input
                label="Stream Resolution"
                placeholder="e.g. 1080p, 4MP, 4K"
                error={errors.cameraResolution?.message}
                {...register('cameraResolution')}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-slate-600">Signal Type</label>
                <select
                  className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  {...register('cameraType')}
                >
                  <option value="ip">IP Cameras (Digital)</option>
                  <option value="analog">Analog System</option>
                  <option value="mixed">Mixed System</option>
                </select>
              </div>

              <Input
                label="Local Archival Retention (Days)"
                type="number"
                placeholder="e.g. 30"
                error={errors.recordingDays?.message}
                {...register('recordingDays', { min: { value: 1, message: 'Must be at least 1 day' } })}
              />
            </div>
          </CardBody>
        </Card>

        {/* Section 4: Demo / Trial Information - Dynamically shown if status qualifies */}
        {watchedStatus !== 'new' && (
          <Card>
            <CardBody className="p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
                <Calendar className="w-5 h-5 text-brand-500" />
                <h3 className="text-sm font-bold text-neutral-slate-800">Pilot & Scheduled Demo Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-slate-600">Demo Date</label>
                  <input
                    type="date"
                    className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                    {...register('scheduledDate')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-slate-600">Demo Completion Date</label>
                  <input
                    type="date"
                    className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                    {...register('completedDate')}
                  />
                </div>

                {watchedStatus === 'trial_running' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-neutral-slate-600">Trial Start Date</label>
                      <input
                        type="date"
                        className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                        {...register('trialStartDate')}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-neutral-slate-600">Trial End Date</label>
                      <input
                        type="date"
                        className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                        {...register('trialEndDate')}
                      />
                    </div>
                  </>
                )}

                <Input
                  label="Assigned Lead Engineer"
                  placeholder="e.g. Sarah Jenkins"
                  error={errors.assignedTo?.message}
                  {...register('assignedTo')}
                />

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-slate-600">Demo/Trial Execution Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Enter notes about sandbox configurations or table turnaround setups..."
                    className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all resize-none"
                    {...register('demoNotes')}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Section 5: General Notes */}
        <Card>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm font-bold text-neutral-slate-800">Additional Lead Notes</h3>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-xs font-semibold text-neutral-slate-600">Notes & Comments</label>
              <textarea
                rows={4}
                placeholder="Enter any general feedback, customized pricing requests, or SLA stipulations..."
                className="w-full text-sm rounded-xl border border-neutral-slate-200 px-4 py-2.5 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all resize-none"
                {...register('notes')}
              />
            </div>
          </CardBody>
        </Card>

        {/* Sticky action bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEditMode ? `/leads/${id}` : '/leads')}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEditMode ? 'Update Lead' : 'Create Lead'}
          </Button>
        </div>

      </form>
    </div>
  );
};
