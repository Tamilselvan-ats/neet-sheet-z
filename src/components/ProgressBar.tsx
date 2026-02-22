import React from 'react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'emerald';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  className,
  size = 'md',
  color = 'emerald'
}) => {
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  const colorClass = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    emerald: 'bg-emerald-600'
  }[color];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between mb-1 items-center">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          <span className="text-sm font-semibold text-slate-900">{progress}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-200 rounded-full overflow-hidden", heightClass)}>
        <div 
          className={cn("transition-all duration-500 ease-out rounded-full", colorClass, heightClass)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
