import React, { useEffect, useState } from 'react';
import { 
  Monitor, 
  Shield, 
  Activity, 
  Search, 
  Filter, 
  MoreVertical,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebSocket } from '../hooks/useWebSocket';

interface Device {
  device_id: string;
  hostname: string;
  ip_address: string;
  status: 'online' | 'offline';
  last_seen: string;
  os_version: string;
  security_score: number;
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const { events } = useWebSocket();

  const fetchDevices = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setDevices(data);
    } catch (err) {
      console.error('Failed to fetch devices', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Update device status in real-time when WS events arrive
  useEffect(() => {
    const statusEvent = events.find(e => e.type === 'DEVICE_STATUS');
    if (statusEvent && statusEvent.deviceId) {
      setDevices(prev => prev.map(d => 
        d.device_id === statusEvent.deviceId 
          ? { ...d, status: statusEvent.status as 'online' | 'offline', last_seen: statusEvent.timestamp }
          : d
      ));
    }
  }, [events]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Infrastructure Fleet</h1>
          <p className="text-slate-500 font-medium">Manage and monitor all connected endpoints in real-time.</p>
        </div>
        <button 
          onClick={fetchDevices}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: devices.length, icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Online Now', value: devices.filter(d => d.status === 'online').length, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Critical Alerts', value: 3, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Fleet Health', value: '94%', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Device List */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-bottom border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by hostname, IP, or Device ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-y border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Endpoint</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Network</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Security</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Seen</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {devices.map((device) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={device.device_id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <Monitor size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{device.hostname}</p>
                          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{device.device_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        device.status === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                        {device.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-mono text-slate-600">{device.ip_address}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{device.os_version}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className={`h-full rounded-full ${
                              device.security_score > 80 ? 'bg-emerald-500' : device.security_score > 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${device.security_score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{device.security_score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 font-medium">
                        {new Date(device.last_seen).toLocaleTimeString()}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(device.last_seen).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {devices.length === 0 && !loading && (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Monitor size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 font-bold">No devices found</p>
                <p className="text-slate-500 text-sm">Enroll your first device using the SaltStack agent.</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                Enroll Device
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
