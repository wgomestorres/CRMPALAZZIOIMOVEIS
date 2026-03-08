'use client';

import React from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 sticky top-0 z-50 mt-16 lg:mt-0">
      <div className="flex flex-1 justify-start max-w-2xl">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
          <input 
            className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-slate-100 focus:ring-2 focus:ring-primary/20 text-sm" 
            placeholder="Search properties, leads, or documents..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full relative text-slate-600">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
          <Settings className="size-5" />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Ricardo Valente</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Premium Director</p>
          </div>
          <div className="size-10 rounded-full border-2 border-accent p-0.5 relative">
            <Image 
              alt="Profile" 
              className="rounded-full size-full object-cover" 
              src="https://picsum.photos/seed/broker/100/100" 
              width={40}
              height={40}
              referrerPolicy="no-referrer"
            />
          </div>
          <ChevronDown className="size-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
