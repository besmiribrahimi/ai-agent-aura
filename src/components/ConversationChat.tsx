'use client';

import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  CornerDownRight,
  Clock,
  Instagram,
  PhoneCall,
  Mail,
  Zap,
  Sliders,
  UserCheck,
} from 'lucide-react';
import { InquiryCase } from '@/data/hackathonData';

interface ConversationChatProps {
  activeCase: InquiryCase;
  onSendCustomMessage: (
    text: string,
    channel: 'Viber' | 'Email' | 'Instagram DM'
  ) => void;
  onSelectPreset: (id: number) => void;
  autonomousMode: boolean;
  onToggleAutonomousMode: () => void;
  isProcessing: boolean;
}

export default function ConversationChat({
  activeCase,
  onSendCustomMessage,
  onSelectPreset,
  autonomousMode,
  onToggleAutonomousMode,
  isProcessing,
}: ConversationChatProps) {
  const [inputText, setInputText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'Viber' | 'Email' | 'Instagram DM'>(
    activeCase.channel
  );
  const [humanApproved, setHumanApproved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendCustomMessage(inputText, selectedChannel);
    setInputText('');
  };

  const getChannelBadge = (channel: InquiryCase['channel']) => {
    switch (channel) {
      case 'Instagram DM':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-600/20 text-rose-300 border border-rose-500/30">
            <Instagram className="w-3 h-3 text-rose-400" />
            <span>Instagram DM</span>
          </span>
        );
      case 'Viber':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#7360F2]/20 text-[#a395f8] border border-[#7360F2]/40">
            <PhoneCall className="w-3 h-3 text-[#a395f8]" />
            <span>Viber Business</span>
          </span>
        );
      case 'Email':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Mail className="w-3 h-3 text-blue-400" />
            <span>Customer Support Email</span>
          </span>
        );
    }
  };

  const officialPresets = [
    { id: 1, label: '1. Delay #1048', desc: 'SLA Delay (> 4 days, SQ)' },
    { id: 2, label: '2. Return 45d', desc: 'Policy Denied (EN)' },
    { id: 3, label: '3. 3rd Time Hostile', desc: 'DOA & Urgent Churn (EN)' },
    { id: 4, label: '4. PII Probe', desc: 'Zero-Trust Address Lock' },
    { id: 5, label: '5. Këste 0%', desc: 'Bank Installments (SQ)' },
  ];

  return (
    <main className="flex-1 flex flex-col bg-[#0B0F17] h-full overflow-hidden border-r border-[#1E293B]">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#1E293B] bg-[#0E1522]/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-inner flex-shrink-0">
            {activeCase.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-white">{activeCase.sender}</h2>
              {getChannelBadge(activeCase.channel)}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {activeCase.phoneOrEmail}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active Conversation</span>
              </span>
              <span>•</span>
              <span className="font-mono text-slate-500">Pristina Retail Region</span>
              {activeCase.ticket && (
                <>
                  <span>•</span>
                  <span className="font-mono text-amber-400 font-medium">
                    Ticket {activeCase.ticket}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Autonomous Mode Toggle Switch */}
        <div className="flex items-center gap-3 bg-[#131B2A] px-3 py-1.5 rounded-xl border border-[#1E293B] self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-200">
              {autonomousMode ? 'Autonomous Dispatch' : 'Human Review Mode'}
            </div>
            <div className="text-[9px] text-slate-400">
              {autonomousMode ? 'AI executes directly' : 'Staff approval required'}
            </div>
          </div>
          <button
            onClick={onToggleAutonomousMode}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
              autonomousMode ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                autonomousMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preset Scenario Launcher Chips */}
      <div className="px-4 py-2 bg-[#0E1522]/40 border-b border-[#1E293B]/70 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Official Benchmarks:</span>
        </span>
        {officialPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCase.id === preset.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-[#131B2A] text-slate-400 hover:text-slate-200 hover:bg-[#192438] border border-[#1E293B]'
            }`}
          >
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Thread Viewer */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeCase.thread.map((msg) => {
          const isCustomer = msg.sender === 'customer';

          if (isCustomer) {
            return (
              <div key={msg.id} className="flex flex-col items-start max-w-xl">
                <div className="flex items-center gap-2 mb-1 px-1">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    {activeCase.sender}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
                <div className="bg-[#1A2438] text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-700/60 shadow-md text-sm leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }

          // Agent Response
          return (
            <div key={msg.id} className="flex flex-col items-end max-w-2xl ml-auto">
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] text-slate-500 font-mono">
                  {msg.timestamp}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Bot className="w-3 h-3 text-emerald-400" />
                  <span>Pristina Tech Inbox AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                  Autonomous v2.4
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#12232C] to-[#0E1B26] text-slate-100 px-4 py-3.5 rounded-2xl rounded-tr-sm border border-emerald-500/30 shadow-lg text-sm leading-relaxed space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="whitespace-pre-line text-slate-100 font-normal">
                  {msg.text}
                </div>

                {msg.ticketRef && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ticket Reference Created</span>
                    </span>
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {msg.ticketRef}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Zero-Trust PII Verified</span>
                </span>
                <span>•</span>
                <span>Response SLA: {activeCase.telemetry.skill5_formatting.responseTimeMs}ms</span>
              </div>
            </div>
          );
        })}

        {/* Live Typing Simulator */}
        {isProcessing && (
          <div className="flex flex-col items-end max-w-xl ml-auto">
            <div className="flex items-center gap-1.5 px-1 mb-1 text-xs text-emerald-400 font-mono">
              <Bot className="w-3.5 h-3.5 animate-spin" />
              <span>Pristina Tech AI orchestrating response...</span>
            </div>
            <div className="bg-[#12232C] px-4 py-3 rounded-2xl rounded-tr-sm border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        {/* Human Review Mode Banner if pending */}
        {!autonomousMode && !humanApproved && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <UserCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Human Review Mode Active:</strong> Agent draft is paused for staff verification before dispatch to customer.
              </span>
            </div>
            <button
              onClick={() => setHumanApproved(true)}
              className="px-3 py-1 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors flex-shrink-0"
            >
              Approve & Dispatch
            </button>
          </div>
        )}
      </div>

      {/* Interactive Message Input Box */}
      <div className="p-3 lg:p-4 border-t border-[#1E293B] bg-[#0E1522]">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Channel selector bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-[11px] font-medium">Channel:</span>
              <div className="flex items-center gap-1 bg-[#131B2A] p-0.5 rounded-lg border border-[#1E293B]">
                {(['Viber', 'Instagram DM', 'Email'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setSelectedChannel(ch)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                      selectedChannel === ch
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-slate-500 hidden sm:inline font-mono">
              Press Enter to send • Evaluates all 5 skills
            </span>
          </div>

          {/* Text Input Row */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type custom customer inquiry in Albanian or English (e.g. A keni kufje Sony? or Where is order #1048?)..."
              disabled={isProcessing}
              className="flex-1 bg-[#131B2A] border border-[#1E293B] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-glow-emerald flex-shrink-0"
            >
              <span>Evaluate</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
