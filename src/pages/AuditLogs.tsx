import React, { useState, useEffect } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  User, 
  Activity,
  Shield,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface AuditLog {
  id: number;
  action: string;
  user: string;
  details: string;
  timestamp: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/audit-logs')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch logs:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action: string) => {
    if (action.includes('CREATED')) return 'text-emerald-600 bg-emerald-50';
    if (action.includes('DELETED')) return 'text-red-600 bg-red-50';
    if (action.includes('UPDATED')) return 'text-blue-600 bg-blue-50';
    return 'text-slate-600 bg-slate-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500">Track every administrative action across the system</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search logs by action, user, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">
            <Filter size={18} />
          </button>
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">
            <Clock size={18} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="data-grid bg-white overflow-hidden">
        <div className="data-row grid-cols-5 bg-slate-50 font-bold text-[10px] uppercase tracking-wider text-slate-500 py-3">
          <div className="data-cell">Timestamp</div>
          <div className="data-cell">Action</div>
          <div className="data-cell">User</div>
          <div className="data-cell col-span-2">Details</div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Loading audit history...</p>
          </div>
        ) : filteredLogs.length > 0 ? (
          filteredLogs.map((log, i) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="data-row grid-cols-5 items-center hover:bg-slate-50/50 transition-colors"
            >
              <div className="data-cell">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={14} />
                  <span className="text-xs font-medium">
                    {new Date(log.timestamp).toLocaleString([], { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              <div className="data-cell">
                <span className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                  getActionColor(log.action)
                )}>
                  {log.action.replace('_', ' ')}
                </span>
              </div>
              <div className="data-cell">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <User size={12} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">{log.user}</span>
                </div>
              </div>
              <div className="data-cell col-span-2">
                <p className="text-sm text-slate-600">{log.details}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <History size={24} />
            </div>
            <p className="text-slate-500 font-medium">No audit logs found matching your search.</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 bg-blue-50/50 border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <Activity size={20} className="text-blue-600" />
            <h3 className="font-bold text-slate-900">Total Events</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">{logs.length}</p>
          <p className="text-xs text-slate-500 mt-1">Last 30 days of activity</p>
        </div>
        <div className="glass-panel p-6 bg-emerald-50/50 border-emerald-100">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={20} className="text-emerald-600" />
            <h3 className="font-bold text-slate-900">Security Events</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">
            {logs.filter(l => l.action.includes('SECURITY') || l.action.includes('AGENT')).length}
          </p>
          <p className="text-xs text-slate-500 mt-1">High priority alerts logged</p>
        </div>
        <div className="glass-panel p-6 bg-purple-50/50 border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <User size={20} className="text-purple-600" />
            <h3 className="font-bold text-slate-900">Active Admins</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">
            {new Set(logs.map(l => l.user)).size}
          </p>
          <p className="text-xs text-slate-500 mt-1">Unique contributors to logs</p>
        </div>
      </div>
    </div>
  );
}
