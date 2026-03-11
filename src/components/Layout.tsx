import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  Ticket, 
  AlertCircle, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Search,
  Bell,
  Terminal,
  ShieldCheck,
  Package,
  FileText,
  User as UserIcon,
  Bot,
  History,
  Box,
  Building2,
  Cpu,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard', roles: ['super-admin', 'it-team'] },
  { label: 'Devices', icon: Monitor, path: '/devices', roles: ['super-admin', 'it-team'] },
  { label: 'Patch Center', icon: ShieldCheck, path: '/patch-management', roles: ['super-admin', 'it-team'] },
  { label: 'Security Alerts', icon: ShieldAlert, path: '/alerts', roles: ['super-admin', 'it-team'] },
  { label: 'Tickets', icon: Ticket, path: '/tickets', roles: ['super-admin', 'it-team', 'employee'] },
  { label: 'Gatepass', icon: FileText, path: '/gatepasses', roles: ['super-admin', 'it-team'] },
  { label: 'Inventory', icon: Package, path: '/stock', roles: ['super-admin', 'it-team'] },
  { label: 'Branch Stock', icon: Building2, path: '/branches', roles: ['super-admin', 'it-team'] },
  { label: 'Agent Deploy', icon: Cpu, path: '/install-agent', roles: ['super-admin', 'it-team'] },
  { label: 'Architecture', icon: Terminal, path: '/architecture', roles: ['super-admin', 'it-team'] },
  { label: 'AI Assistant', icon: Bot, path: '/ai-assistant', roles: ['super-admin', 'it-team', 'employee'] },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNav = NAV_ITEMS.filter(item => item.roles.includes(user?.role || ''));

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-30">
        <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-200">
              Z
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Zerodha</p>
              <p className="text-lg font-black text-slate-900 tracking-tight">Enterprise IT</p>
            </div>
          </div>

          {/* Workspace Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Workspace</p>
            <p className="text-sm font-black text-slate-900">Command Center</p>
            <p className="text-[10px] font-bold text-slate-500 mt-1">Admin · {user?.name}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm group",
                    isActive 
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-100" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={18} className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 z-20">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search endpoints, tickets, alerts, employees"
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
              <History size={20} />
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            <button className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl pl-3 pr-4 py-1.5 hover:bg-slate-50 transition-all shadow-sm group">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                {user?.name.charAt(0)}
              </div>
              <span className="text-sm font-black text-slate-900">Admin</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
