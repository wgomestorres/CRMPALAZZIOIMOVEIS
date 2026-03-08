'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PropertyModal } from '@/components/PropertyModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All Properties');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    
    if (searchParams.get('new') === 'true') {
      setSelectedProperty(null);
      setModalOpen(true);
      // Clear the param without refreshing
      const params = new URLSearchParams(searchParams.toString());
      params.delete('new');
      router.replace(`/properties?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      fetchProperties();
    }
  };

  const filteredProperties = properties.filter(prop => {
    if (activeTab === 'All Properties') return true;
    return prop.status === activeTab;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <div className="p-4 lg:p-8 pb-4 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Property Management</h2>
                <p className="text-slate-500 text-sm">Manage your listings and real estate portfolio</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setSelectedProperty(null); setModalOpen(true); }}
                  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm font-bold text-sm w-full sm:w-auto justify-center"
                >
                  <Plus className="size-4" />
                  Add Property
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {['Property Type', 'Price Range', 'Status', 'More Filters'].map((filter) => (
                  <button key={filter} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:border-primary/50 transition-all">
                    {filter}
                    <Filter className="size-3 text-slate-400" />
                  </button>
                ))}
              </div>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
                <button className="p-1.5 rounded-md bg-slate-100 text-primary">
                  <LayoutGrid className="size-4" />
                </button>
                <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600">
                  <List className="size-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 flex gap-4 lg:gap-8 overflow-x-auto no-scrollbar">
              {['All Properties', 'Available', 'Reserved', 'Sold'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-bold border-b-2 px-1 transition-all whitespace-nowrap",
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-10 animate-spin text-primary" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20 text-slate-400">Nenhum imóvel encontrado.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((prop, idx) => (
                  <motion.div 
                    key={prop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300",
                      prop.status === 'Sold' && "opacity-75 grayscale-[20%]"
                    )}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        alt={prop.name} 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        src={prop.image} 
                        fill
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded text-white",
                          prop.status === 'Available' ? "bg-emerald-500" : 
                          prop.status === 'Reserved' ? "bg-primary" : "bg-slate-600"
                        )}>
                          {prop.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={() => { setSelectedProperty(prop); setModalOpen(true); }}
                          className="size-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(prop.id)}
                          className="size-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 leading-tight">{prop.name}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="size-3" />
                            {prop.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "font-bold text-lg",
                            prop.status === 'Sold' ? "text-slate-400 line-through" : "text-primary"
                          )}>{prop.price}</p>
                          {prop.type === 'Premium' && <p className="text-[10px] text-accent font-bold uppercase tracking-tighter">Premium Listing</p>}
                          {prop.type === 'Luxury' && <p className="text-[10px] text-primary font-bold uppercase tracking-tighter">Luxury Collection</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bed className="size-4" />
                          <span className="text-xs font-medium">{prop.beds} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bath className="size-4" />
                          <span className="text-xs font-medium">{prop.baths} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Square className="size-4" />
                          <span className="text-xs font-medium">{prop.sqft} sqft</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-lg transition-colors">Details</button>
                        <button className="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Contact</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between py-8 mt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500">Showing {filteredProperties.length} of {properties.length} properties</p>
              <div className="flex items-center gap-1">
                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <PropertyModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={fetchProperties} 
        property={selectedProperty}
      />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
