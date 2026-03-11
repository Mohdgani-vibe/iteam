import React, { useState } from 'react';
import { 
  Monitor, 
  Ticket, 
  AlertCircle, 
  Plus, 
  ChevronRight,
  Shield,
  Cpu,
  HardDrive,
  Activity,
  Send,
  FileText
} from 'lucide-react';
import { MOCK_DEVICES, MOCK_ALERTS, MOCK_TICKETS, MOCK_GATEPASSES } from '../mockData';
import { useAuth } from '../AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EmployeePortal() {
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState('hardware');

  const myDevices = MOCK_DEVICES.filter(d => d.ownerId === user?.id);
  const myAlerts = MOCK_ALERTS.filter(a => !a.targetUserId || a.targetUserId === user?.id);
  const myTickets = MOCK_TICKETS.filter(t => t.requesterId === user?.id);
  const myGatepasses = MOCK_GATEPASSES.filter(g => g.employeeEmail === user?.email);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
          <p className="text-slate-500">Manage your workspace and IT requests</p>
        </div>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Raise Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Devices & Tickets */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Devices */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Monitor size={20} className="text-blue-500" />
              My Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myDevices.map((device) => (
                <motion.div 
                  key={device.id}
                  whileHover={{ y: -4 }}
                  className="glass-panel p-6 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Monitor size={24} />
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      device.status === 'online' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {device.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{device.name}</h3>
                    <p className="text-sm text-slate-500 font-mono">{device.id}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <Cpu size={14} className="mx-auto mb-1 text-slate-400" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold">CPU</p>
                      <p className="text-xs font-medium truncate text-slate-700">{device.cpu.split(' ')[1]}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <Activity size={14} className="mx-auto mb-1 text-slate-400" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold">RAM</p>
                      <p className="text-xs font-medium text-slate-700">{device.ram}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <HardDrive size={14} className="mx-auto mb-1 text-slate-400" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Disk</p>
                      <p className="text-xs font-medium text-slate-700">{device.storage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* My Tickets */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Ticket size={20} className="text-amber-500" />
              Recent Requests
            </h2>
            <div className="data-grid bg-white">
              {myTickets.map((ticket) => (
                <div key={ticket.id} className="data-row grid-cols-4 items-center">
                  <div className="data-cell">
                    <div>
                      <p className="font-bold text-slate-900">{ticket.title}</p>
                      <p className="text-xs text-slate-500">{ticket.id}</p>
                    </div>
                  </div>
                  <div className="data-cell">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold uppercase",
                      ticket.status === 'Open' ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"
                    )}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="data-cell text-slate-500 text-xs">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                  <div className="data-cell justify-end">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <ChevronRight size={18} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
              {myTickets.length === 0 && (
                <div className="p-8 text-center text-slate-500 italic">
                  No active requests found.
                </div>
              )}
            </div>
          </section>

          {/* My Gatepasses */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText size={20} className="text-blue-500" />
              My Gatepasses
            </h2>
            <div className="data-grid bg-white">
              {myGatepasses.map((gp) => (
                <div key={gp.id} className="data-row grid-cols-4 items-center">
                  <div className="data-cell">
                    <div>
                      <p className="font-bold text-slate-900">{gp.assetName}</p>
                      <p className="text-xs text-slate-500">{gp.id}</p>
                    </div>
                  </div>
                  <div className="data-cell">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold uppercase",
                      gp.status === 'Approved' ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                    )}>
                      {gp.status}
                    </span>
                  </div>
                  <div className="data-cell text-slate-500 text-xs">
                    {gp.createdAt}
                  </div>
                  <div className="data-cell justify-end">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <ChevronRight size={18} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
              {myGatepasses.length === 0 && (
                <div className="p-8 text-center text-slate-500 italic">
                  No gatepasses found.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Alerts & Info */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              Alerts & Notifications
            </h2>
            <div className="space-y-3">
              {myAlerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "p-4 rounded-xl border flex gap-3",
                    alert.severity === 'error' ? "bg-red-500/10 border-red-500/20" : 
                    alert.severity === 'warning' ? "bg-amber-500/10 border-amber-500/20" : 
                    "bg-blue-500/10 border-blue-500/20"
                  )}
                >
                  <div className={cn(
                    "mt-1",
                    alert.severity === 'error' ? "text-red-500" : 
                    alert.severity === 'warning' ? "text-amber-500" : 
                    "text-blue-500"
                  )}>
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{alert.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6 bg-blue-50 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-900">IT Support Hours</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our team is available for live support from 9:00 AM to 6:00 PM IST, Monday to Friday.
            </p>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Emergency Contact</p>
              <p className="text-sm text-slate-900 font-bold mt-1">+91 80 1234 5678</p>
            </div>
          </section>
        </div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRequestModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 space-y-6 bg-white"
            >
              <h2 className="text-2xl font-bold text-slate-900">Raise IT Request</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Request Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['hardware', 'software', 'access', 'other'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setRequestType(type)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                          requestType === type 
                            ? "bg-blue-600 text-white" 
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Briefly describe your request"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide more details about your request..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Request submitted successfully!');
                    setShowRequestModal(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
