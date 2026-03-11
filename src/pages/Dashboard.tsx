import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus,
  Send,
  Bot,
  User as UserIcon,
  Search,
  ChevronRight,
  MessageSquare,
  Monitor,
  ShieldCheck,
  FileText,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

const SUGGESTIONS = [
  "Convert chat to ticket after conversation closes",
  "Lookup employee-owned devices",
  "Create software install request",
  "Show gatepass status and approval trail",
  "Suggest patch troubleshooting steps"
];

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help with your device, ticket, or gatepass today?',
      sender: 'ai',
      timestamp: new Date()
    },
    {
      id: '2',
      text: 'Raise a software install request for Chrome and show my assigned laptop.',
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: '3',
      text: 'Request drafted. Device found: support.zbl-1395. I can convert this chat into REQ-9915.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. I've located the relevant records in the IT database.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
        
        {/* Left Column: AI Helpdesk Assistant */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm"
        >
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Helpdesk Assistant</h2>
              <p className="text-sm font-medium text-slate-500">Select a common action or ask anything below.</p>
            </div>

            <div className="space-y-3">
              {SUGGESTIONS.map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="w-full text-left p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/50 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{suggestion}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats at bottom of left card */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tickets</p>
              <p className="text-lg font-black text-slate-900">12</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Devices</p>
              <p className="text-lg font-black text-slate-900">45</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alerts</p>
              <p className="text-lg font-black text-rose-600">3</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: IT Assistant Chat */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-sm overflow-hidden"
        >
          {/* Chat Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">IT Assistant</h3>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Clear Chat</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-slate-100 text-slate-900 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <form onSubmit={handleSend} className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type message..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shadow-lg shadow-blue-200"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'My Devices', icon: Monitor, count: 2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Open Tickets', icon: MessageSquare, count: 1, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Gatepasses', icon: FileText, count: 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'System Health', icon: Zap, count: '99%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((item, i) => (
          <button key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-4 group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", item.bg, item.color)}>
              <item.icon size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-lg font-black text-slate-900">{item.count}</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
