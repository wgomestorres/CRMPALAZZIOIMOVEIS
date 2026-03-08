'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  GitBranch, 
  BarChart3, 
  Calendar, 
  Settings, 
  HelpCircle,
  PlusCircle,
  Building,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Properties', icon: Building2, href: '/properties' },
  { name: 'Leads', icon: Users, href: '/leads' },
  { name: 'Pipeline', icon: GitBranch, href: '/pipeline' },
  { name: 'Reports', icon: BarChart3, href: '/reports' },
];

const secondaryItems = [
  { name: 'Calendar', icon: Calendar, href: '/calendar' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help Center', icon: HelpCircle, href: '/help' },
];

interface SidebarContentProps {
  pathname: string;
  setIsOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const SidebarContent = ({ pathname, setIsOpen, handleLogout }: SidebarContentProps) => (
  <>
    <div className="p-6 flex items-center gap-3">
      <div className="size-10 rounded-lg luxury-gradient text-white flex items-center justify-center">
        <Building className="size-6" />
      </div>
      <div>
        <h1 className="font-bold text-lg leading-tight text-primary uppercase tracking-tight">
          Palazzio <span className="text-accent">Imóveis</span>
        </h1>
      </div>
    </div>

    <nav className="flex-1 py-6 overflow-y-auto">
      <div className="px-4 mb-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href 
                    ? "bg-primary/10 border-r-4 border-primary text-primary font-semibold" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <item.icon className="size-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 mb-4 mt-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">System</p>
        <ul className="space-y-1">
          {secondaryItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href 
                    ? "bg-primary/10 border-r-4 border-primary text-primary font-semibold" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <item.icon className="size-5" />
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="size-5" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div className="p-6 border-t border-slate-100">
      <Link 
        href="/properties?new=true"
        onClick={() => setIsOpen(false)}
        className="w-full luxury-gradient text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <PlusCircle className="size-5" />
        New Listing
      </Link>
    </div>
  </>
);

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col hidden lg:flex h-screen sticky top-0">
        <SidebarContent pathname={pathname} setIsOpen={setIsOpen} handleLogout={handleLogout} />
      </aside>

      {/* Mobile Header/Menu Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-[60]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg luxury-gradient text-white flex items-center justify-center">
            <Building className="size-5" />
          </div>
          <h1 className="font-bold text-sm leading-tight text-primary uppercase tracking-tight">
            Palazzio <span className="text-accent">Imóveis</span>
          </h1>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600">
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[70] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[80] lg:hidden flex flex-col shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="size-6" />
              </button>
              <SidebarContent pathname={pathname} setIsOpen={setIsOpen} handleLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
