'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MetricCard } from '@/components/MetricCard';
import { 
  Banknote, 
  Home, 
  UserPlus, 
  BarChart, 
  Star, 
  MoreVertical, 
  ChevronRight,
  Palmtree,
  Users,
  Calendar,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, propsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/properties')
        ]);
        const leadsData = await leadsRes.json();
        const propsData = await propsRes.json();
        setLeads(leadsData);
        setProperties(propsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const metrics = [
    { title: 'Total Sales', value: '$48,250,000', change: '+12.5%', isPositive: true, icon: Banknote, iconColor: 'text-primary', bgColor: 'bg-primary/10' },
    { title: 'Active Listings', value: `${properties.length} Units`, change: '+5%', isPositive: true, icon: Home, iconColor: 'text-accent', bgColor: 'bg-accent/10' },
    { title: 'Total Leads', value: leads.length.toString(), change: '+8.4%', isPositive: true, icon: UserPlus, iconColor: 'text-primary', bgColor: 'bg-primary/10' },
    { title: 'Monthly Revenue', value: '$2,140,000', change: '+18.2%', isPositive: true, icon: BarChart, iconColor: 'text-accent', bgColor: 'bg-accent/10' },
  ];

  const priorityListings = properties.slice(0, 3);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Dashboard</h1>
                <p className="text-slate-500 mt-1">Real-time performance overview for your luxury portfolio.</p>
              </motion.div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  <Calendar className="size-4" />
                  Last 30 Days
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <BarChart className="size-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <MetricCard {...metric} />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Sales Pipeline Overview */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Sales Funnel</h3>
                  <Link href="/leads" className="text-primary text-xs font-bold hover:underline">View Pipeline</Link>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Awareness', value: leads.length, color: 'bg-primary', width: '100%' },
                    { label: 'Interest', value: leads.filter(l => l.status === 'Contacted').length, color: 'bg-accent', width: '75%' },
                    { label: 'Proposal', value: leads.filter(l => l.status === 'Qualified').length, color: 'bg-primary', width: '45%' },
                    { label: 'Closing', value: 2, color: 'bg-emerald-500', width: '20%' },
                  ].map((item) => (
                    <div key={item.label} className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold uppercase inline-block text-slate-600">{item.label}</span>
                        <span className="text-xs font-semibold inline-block text-slate-900">{item.value}</span>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: item.width }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn("shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center", item.color)}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="size-5 text-accent fill-accent" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Win Rate this Month</p>
                      <p className="text-lg font-black text-primary">24.5%</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Properties List */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Priority Listings</h3>
                  <Link href="/properties" className="text-slate-500 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                    All Listings <ChevronRight className="size-4" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50">
                        <th className="px-6 py-4 font-bold">Property</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Price</th>
                        <th className="px-6 py-4 font-bold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                          </td>
                        </tr>
                      ) : priorityListings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Nenhum imóvel.</td>
                        </tr>
                      ) : priorityListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-12 rounded-lg overflow-hidden relative">
                                <Image 
                                  alt={listing.name} 
                                  className="object-cover" 
                                  src={listing.image} 
                                  fill
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 leading-tight">{listing.name}</p>
                                <p className="text-xs text-slate-500">{listing.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                              listing.status === 'Available' ? "bg-emerald-100 text-emerald-700" : 
                              listing.status === 'Reserved' ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600"
                            )}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">{listing.price}</td>
                          <td className="px-6 py-4 text-right">
                            <Link href="/properties" className="p-1 hover:text-primary text-slate-400 transition-colors">
                              <ChevronRight className="size-5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Bottom Dashboard Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-primary p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
              >
                <div className="relative z-10 text-white">
                  <h4 className="text-2xl font-bold mb-2">New Portfolio Alert</h4>
                  <p className="text-white/70 mb-6 max-w-sm">Exclusive beachfront collection in Angra dos Reis has just been added to the CRM.</p>
                  <Link href="/leads" className="bg-accent text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors inline-block">Assign Leads</Link>
                </div>
                <Palmtree className="absolute -bottom-4 -right-4 size-40 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div>
                  <h4 className="text-xl font-bold mb-1">Upcoming Viewings</h4>
                  <p className="text-slate-500 text-sm mb-4">4 tours scheduled for today</p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 relative overflow-hidden">
                        <Image src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" fill referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="size-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[8px] font-bold">+3</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block p-4 bg-accent/10 rounded-2xl text-accent font-black text-center border border-accent/20">
                    <p className="text-xs uppercase leading-none">Sept</p>
                    <p className="text-3xl leading-tight">24</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
