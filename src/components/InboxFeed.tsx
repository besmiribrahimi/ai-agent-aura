'use client';

import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  PhoneCall,
  Search,
  Bot,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { InquiryCase } from '@/data/hackathonData';

interface InboxFeedProps {
  cases: InquiryCase[];
  selectedCaseId: number;
  onSelectCase: (c: InquiryCase) => void;
}

export default function InboxFeed({
  cases,
  selectedCaseId,
  onSelectCase,
}: InboxFeedProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'HUMAN' | 'AI'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const humanCasesCount = cases.filter((c) => c.decision === 'HANDS_TO_HUMAN').length;
  const aiCasesCount = cases.filter((c) => c.decision === 'DECIDES_ALONE').length;

  const filteredCases = cases.filter((item) => {
    if (activeTab === 'HUMAN' && item.decision !== 'HANDS_TO_HUMAN') return false;
    if (activeTab === 'AI' && item.decision !== 'DECIDES_ALONE') return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.sender.toLowerCase().includes(q) ||
        item.initialMessage.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        (item.ticket && item.ticket.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getChannelIcon = (channel: InquiryCase['channel']) => {
    switch (channel) {
      case 'Instagram DM':
        return (
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Instagram className="w-3.5 h-3.5" />
          </div>
        );
      case 'Viber':
        return (
          <div className="w-6 h-6 rounded-md bg-[#7360F2] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
        );
      case 'Email':
        return (
          <div className="w-6 h-6 rounded-md bg-[#2563EB] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  return (
    <aside className="w-full lg:w-[330px] xl:w-[350px] flex-shrink-0 flex flex-col bg-[#0E1522] border-r border-[#1E293B] h-full overflow-hidden">
      {/* Search & Omnichannel Filter Header */}
      <div className="p-3.5 border-b border-[#1E293B] space-y-3 bg-[#0B0F17]/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Omnichannel Feed</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-[#131B2A] px-2 py-0.5 rounded border border-slate-800">
            {cases.length} in queue
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages, tags, tickets..."
            className="w-full bg-[#131B2A] border border-[#1E293B] focus:border-cyan-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#131B2A] p-1 rounded-xl border border-[#1E293B]">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`py-1 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'ALL'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({cases.length})
          </button>
          <button
            onClick={() => setActiveTab('HUMAN')}
            className={`py-1 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'HUMAN'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <span>Needs Human</span>
            <span className="px-1 py-0.2 rounded text-[10px] bg-amber-500/30 text-amber-200">
              {humanCasesCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('AI')}
            className={`py-1 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'AI'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <span>AI Solved</span>
            <span className="px-1 py-0.2 rounded text-[10px] bg-emerald-500/30 text-emerald-200">
              {aiCasesCount}
            </span>
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1E293B]/70">
        {filteredCases.map((item) => {
          const isSelected = item.id === selectedCaseId;
          const isHuman = item.decision === 'HANDS_TO_HUMAN';

          return (
            <button
              key={item.id}
              onClick={() => onSelectCase(item)}
              className={`w-full text-left p-3.5 transition-all relative flex flex-col gap-2 ${
                isSelected
                  ? 'bg-[#152033] border-l-4 border-l-cyan-400'
                  : 'hover:bg-[#111927] bg-[#0E1522]'
              }`}
            >
              {/* Top row: Channel, Sender, Time */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {getChannelIcon(item.channel)}
                  <span className="font-semibold text-xs text-slate-100 truncate">
                    {item.sender}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {item.lang}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">
                  {item.timestamp}
                </span>
              </div>

              {/* Message snippet */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.initialMessage}
              </p>

              {/* Bottom row: Status & Tags */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 truncate max-w-[170px]">
                  {item.tag}
                </span>

                {isHuman ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>{item.ticket || 'Staff Queue'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>AI Resolved</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {filteredCases.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No matching messages found in current inbox view.
          </div>
        )}
      </div>
    </aside>
  );
}
