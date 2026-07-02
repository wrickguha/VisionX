import React from 'react';
import type { ShopLeadStatus } from '../../types';

interface BadgeProps {
  status: ShopLeadStatus;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const configs: Record<
    ShopLeadStatus,
    { label: string; container: string; dot: string; text: string }
  > = {
    new: {
      label: 'New Lead',
      container: 'bg-blue-50/50 border-blue-200/60 text-blue-700',
      dot: 'bg-blue-500',
      text: 'text-blue-700'
    },
    demo_scheduled: {
      label: 'Demo Scheduled',
      container: 'bg-amber-50/50 border-amber-200/60 text-amber-700',
      dot: 'bg-amber-500',
      text: 'text-amber-700'
    },
    trial_running: {
      label: 'Trial Running',
      container: 'bg-purple-50/50 border-purple-200/60 text-purple-700',
      dot: 'bg-purple-500',
      text: 'text-purple-700 font-medium'
    },
    interested: {
      label: 'Interested',
      container: 'bg-teal-50/50 border-teal-200/60 text-teal-700',
      dot: 'bg-teal-500',
      text: 'text-teal-700'
    },
    converted: {
      label: 'Converted',
      container: 'bg-emerald-50/50 border-emerald-200/60 text-emerald-700 font-semibold',
      dot: 'bg-emerald-500',
      text: 'text-emerald-700'
    },
    not_interested: {
      label: 'Not Interested',
      container: 'bg-rose-50/50 border-rose-200/60 text-rose-700',
      dot: 'bg-rose-450 bg-rose-500',
      text: 'text-rose-700'
    }
  };

  const config = configs[status] || {
    label: status.toUpperCase(),
    container: 'bg-neutral-slate-50 border-neutral-slate-200 text-neutral-slate-600',
    dot: 'bg-neutral-slate-400',
    text: 'text-neutral-slate-600'
  };

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';
  const dotSize = size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${padding} ${config.container} select-none shrink-0`}
    >
      <span className={`rounded-full ${dotSize} ${config.dot} animate-pulse`} />
      <span className="font-semibold tracking-wide">{config.label}</span>
    </span>
  );
};
