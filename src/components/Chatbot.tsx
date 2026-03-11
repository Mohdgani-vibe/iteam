import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${user?.name || 'there'}! I'm your Zerodha IT Assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: `You are an IT Support Assistant for Zerodha. 
          You help employees with hardware, software, and access requests.
          Be professional, concise, and helpful. 
          If you don't know something, suggest they raise a ticket in the portal.
          The current user is ${user?.name} with role ${user?.role}.`,
        },
      });

      const response = await model;
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I couldn't process that.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to my brain right now. Please try again later or raise a ticket.",
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all group"
          >
            <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-level-bg animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '500px',
              width: '380px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel flex flex-col shadow-2xl overflow-hidden bg-white border-slate-200"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">IT Assistant</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.sender === 'user' 
                          ? "bg-blue-100 text-black rounded-tr-none border border-blue-200" 
                          : "bg-white text-black border border-slate-200 rounded-tl-none shadow-sm"
                      )}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:bg-slate-700"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
