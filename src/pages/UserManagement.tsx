import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  Mail,
  Trash2,
  Edit2
} from 'lucide-react';
import { MOCK_USERS } from '../mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const removeUser = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage directory, roles, and access permissions</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-level-border flex items-center gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 transition-all">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="data-grid border-none rounded-none">
          <div className="data-row grid-cols-5 bg-slate-50 font-bold text-slate-500 text-xs uppercase tracking-wider">
            <div className="data-cell">User</div>
            <div className="data-cell">Role</div>
            <div className="data-cell">Department</div>
            <div className="data-cell">Status</div>
            <div className="data-cell justify-end">Actions</div>
          </div>
          
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user) => (
              <motion.div 
                key={user.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="data-row grid-cols-5 items-center"
              >
                <div className="data-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600 border border-blue-100">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="data-cell">
                  <span className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit",
                    user.role === 'super-admin' ? "bg-purple-500/10 text-purple-600" : 
                    user.role === 'it-team' ? "bg-blue-500/10 text-blue-600" : 
                    "bg-slate-500/10 text-slate-500"
                  )}>
                    <Shield size={10} />
                    {user.role.replace('-', ' ')}
                  </span>
                </div>
                <div className="data-cell text-slate-600 text-sm">
                  {user.department || 'N/A'}
                </div>
                <div className="data-cell">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
                <div className="data-cell justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => removeUser(user.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
