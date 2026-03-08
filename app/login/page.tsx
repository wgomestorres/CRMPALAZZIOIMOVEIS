'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building, Lock, Mail, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@palazzio.com');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        setError('Credenciais inválidas. Tente admin@palazzio.com / admin');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-8 luxury-gradient text-white text-center">
          <div className="size-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <Building className="size-8" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Palazzio <span className="text-accent">Imóveis</span></h1>
          <p className="text-white/70 text-sm mt-1">Acesse o seu Dashboard Executivo</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full luxury-gradient text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : 'Entrar no Sistema'}
          </button>

          <div className="text-center">
            <p className="text-xs text-slate-400">Esqueceu sua senha? Entre em contato com o suporte.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
