import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-neutral-slate-200/80 rounded ${className}`}
      {...props}
    />
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <div className="border border-neutral-slate-200/60 rounded-2xl overflow-hidden">
        <div className="bg-neutral-slate-50 p-4 border-b border-neutral-slate-200/60 flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/12" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/12" />
        </div>
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/12" />
              <Skeleton className="h-5 w-1/5" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
