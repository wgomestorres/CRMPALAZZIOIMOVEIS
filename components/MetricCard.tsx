'use client';

import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export function MetricCard({ title, value, change, isPositive, icon: Icon, iconColor, bgColor }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg", bgColor)}>
          <Icon className={cn("size-5", iconColor)} />
        </div>
        <span className={cn(
          "text-xs font-bold flex items-center gap-1",
          isPositive ? "text-emerald-600" : "text-rose-600"
        )}>
          {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {change}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}
