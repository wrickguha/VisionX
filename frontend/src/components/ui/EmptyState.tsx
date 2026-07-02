import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onActionClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-neutral-slate-200/80 rounded-2xl bg-white max-w-lg mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-neutral-slate-50 flex items-center justify-center border border-neutral-slate-100 text-neutral-slate-400 mb-5">
        <Icon className="w-7 h-7 text-neutral-slate-400" />
      </div>
      <h3 className="text-base font-bold text-neutral-slate-900 tracking-tight">{title}</h3>
      <p className="text-xs text-neutral-slate-500 max-w-sm mt-2 leading-relaxed">{description}</p>
      {actionLabel && onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
