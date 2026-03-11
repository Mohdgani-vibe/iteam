import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 relative z-10 shadow-2xl shadow-slate-200/50"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2563EB] rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-blue-200">
              Z
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Zerodha</p>
              <p className="text-xl font-black text-slate-900 tracking-tight">Enterprise IT</p>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 font-medium">Sign in to access the Command Center</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zerodha.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-600 text-center"
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-200"
          >
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Demo Credentials</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { email: 'admin@zerodha.com', role: 'Super Admin' },
              { email: 'john@zerodha.com', role: 'Employee' }
            ].map((cred) => (
              <button 
                key={cred.email}
                type="button"
                onClick={() => setEmail(cred.email)}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group"
              >
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-900 leading-none">{cred.email}</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{cred.role}</p>
                </div>
                <CheckCircle2 size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
