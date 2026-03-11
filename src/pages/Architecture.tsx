import React from 'react';
import { 
  Server, 
  Database, 
  Shield, 
  Terminal, 
  Monitor, 
  Globe, 
  Cpu, 
  ArrowRight,
  Zap,
  Lock,
  Activity,
  Network,
  Cloud,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Architecture() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
          <Layers size={12} />
          System Infrastructure
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Blueprint</h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium">
          A high-level overview of the Zerodha IT Management orchestration and security infrastructure.
        </p>
      </div>

      {/* Visual Diagram */}
      <div className="relative bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:48px_48px] opacity-30"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Column 1: Agents */}
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Edge Layer</h3>
              <p className="text-sm font-bold text-slate-900">Managed Endpoints</p>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Ubuntu Laptop', icon: Monitor, status: 'online' },
                { name: 'Windows Workstation', icon: Monitor, status: 'online' },
                { name: 'Production Server', icon: Server, status: 'online' },
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm hover:border-blue-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all border border-slate-100">
                    <node.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900">{node.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salt Minion Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Central Hub */}
          <div className="flex flex-col items-center gap-10">
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 bg-blue-600/5 rounded-full blur-3xl"
              />
              <div className="relative w-56 h-56 bg-white rounded-[4rem] flex flex-col items-center justify-center text-slate-900 shadow-2xl shadow-blue-100 border border-slate-100">
                <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-4">
                  <Server size={48} />
                </div>
                <p className="font-black text-xl tracking-tight">IT MASTER</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Orchestration Hub</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3 hover:border-blue-100 transition-all">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Database size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Persistence</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">SQLite Engine</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3 hover:border-emerald-100 transition-all">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Security</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ClamAV / SCAP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Management */}
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Control Plane</h3>
              <p className="text-sm font-bold text-slate-900">Admin Interfaces</p>
            </div>
            <div className="space-y-4">
              {[
                { name: 'IT Dashboard', icon: Globe, desc: 'Real-time Monitoring' },
                { name: 'SaltStack CLI', icon: Terminal, desc: 'Fleet Orchestration' },
                { name: 'API Gateway', icon: Zap, desc: 'Agent Communication' },
              ].map((tool, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm hover:border-blue-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all border border-slate-100">
                    <tool.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900">{tool.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{tool.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Connection Lines (Simplified Visuals) */}
        <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent -translate-y-1/2 hidden lg:block"></div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { 
            title: 'Enrollment', 
            icon: Cpu, 
            text: 'Agent is installed on endpoint. It generates a unique Device ID and registers with the IT Master via HTTPS.',
            color: 'bg-blue-50 text-blue-600'
          },
          { 
            title: 'Provisioning', 
            icon: Lock, 
            text: 'SaltStack Master accepts the minion key. Security policies (ClamAV, Firewall) are pushed automatically.',
            color: 'bg-emerald-50 text-emerald-600'
          },
          { 
            title: 'Monitoring', 
            icon: Activity, 
            text: 'Agent sends periodic heartbeats. Security logs and system health are streamed to the SQLite database.',
            color: 'bg-amber-50 text-amber-600'
          },
          { 
            title: 'Governance', 
            icon: Shield, 
            text: 'IT admins use the dashboard to approve gatepasses, push patches, and respond to security alerts.',
            color: 'bg-purple-50 text-purple-600'
          },
        ].map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 hover:shadow-md transition-all">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", step.color)}>
              <step.icon size={28} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Step 0{i+1}</span>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">{step.title}</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
