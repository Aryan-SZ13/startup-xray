import React from 'react';

export const SkeletonText: React.FC<{ className?: string; width?: string }> = ({ className = '', width = 'w-full' }) => (
  <div className={`h-4 bg-white/10 rounded animate-pulse ${width} ${className}`} />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/[0.02] border border-white/5 rounded-xl p-5 animate-pulse ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="flex-1 space-y-2">
        <SkeletonText width="w-3/4" className="h-5" />
        <SkeletonText width="w-1/2" className="h-3" />
      </div>
    </div>
    <div className="space-y-3 mt-6">
      <SkeletonText width="w-full" />
      <SkeletonText width="w-5/6" />
    </div>
  </div>
);

export const SkeletonMetric: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-5 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse flex flex-col gap-3 ${className}`}>
    <SkeletonText width="w-1/3" className="h-3" />
    <SkeletonText width="w-1/2" className="h-8" />
  </div>
);
