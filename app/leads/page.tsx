'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { LeadModal } from '@/components/LeadModal';
import { 
  Plus, 
  FileDown, 
  ChevronDown, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  Users, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All Leads');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'All Leads') return true;
    return lead.status === activeTab;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col min-w-0">
          <div className="p-4 lg:p-8">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-1"
              >
                <h2 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Lead Management</h2>
                <p className="text-slate-500 text-base font-normal">Track and manage your property inquiries across your portfolio</p>
              </motion.div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center rounded-lg h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm font-semibold text-sm">
                  <FileDown className="size-4 mr-2" />
                  Export CSV
                </button>
                <button 
                  onClick={() => { setSelectedLead(null); setModalOpen(true); }}
                  className="flex-1 sm:flex-none flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm font-bold text-sm"
                >
                  <Plus className="size-4 mr-2" />
                  Add Lead
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              {['All Leads', 'New', 'Contacted', 'Qualified', 'Lost'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all",
                    activeTab === tab 
                      ? "bg-primary text-white shadow-sm shadow-primary/20" 
                      : "bg-white border border-slate-200 text-slate-600 hover:border-primary"
                  )}
                >
                  <span className="text-sm font-semibold">{tab}</span>
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-white border border-slate-200 text-slate-600 px-4">
                  <span className="text-sm font-medium">Last Activity</span>
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[25%]">Lead Name</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[20%]">Contact Info</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[12%]">Interest</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[12%]">Source</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[15%]">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[16%] text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">Nenhum lead encontrado.</td>
                      </tr>
                    ) : filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("size-9 rounded-full flex items-center justify-center font-bold text-xs", lead.color)}>
                              {lead.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                              <p className="text-xs text-slate-500">{lead.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                              <Phone className="size-3" />
                              <span>{lead.contact}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                              <Mail className="size-3" />
                              <span>{lead.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold uppercase ring-1 ring-inset",
                            lead.interest === 'Buying' ? "bg-blue-50 text-blue-700 ring-blue-700/10" : "bg-slate-100 text-slate-700 ring-slate-700/10"
                          )}>
                            {lead.interest}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                            <Globe className="size-4" />
                            <span>{lead.source}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                            lead.status === 'New' ? "bg-emerald-50 text-emerald-700" :
                            lead.status === 'Contacted' ? "bg-blue-50 text-blue-700" :
                            lead.status === 'Qualified' ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
                          )}>
                            <span className={cn(
                              "size-1.5 rounded-full",
                              lead.status === 'New' ? "bg-emerald-500" :
                              lead.status === 'Contacted' ? "bg-blue-500" :
                              lead.status === 'Qualified' ? "bg-primary" : "bg-slate-400"
                            )}></span>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => { setSelectedLead(lead); setModalOpen(true); }}
                              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(lead.id)}
                              className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-all"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{filteredLeads.length}</span> of <span className="font-bold text-slate-900">{leads.length}</span> leads</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button className="px-3 py-1 rounded bg-primary text-white text-sm font-bold">1</button>
                  <button className="p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <LeadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={fetchLeads} 
        lead={selectedLead}
      />
    </div>
  );
}
