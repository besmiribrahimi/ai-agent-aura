'use client';

import React from 'react';
import {
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  Download,
  Activity,
  Layers,
} from 'lucide-react';
import { KPI_METRICS } from '@/data/hackathonData';

interface HeaderProps {
  onReset: () => void;
  onExport: () => void;
  autonomousCount: number;
  escalatedCount: number;
  totalCount: number;
}

export default function Header({
  onReset,
  onExport,
  autonomousCount,
  escalatedCount,
  totalCount,
}: HeaderProps) {
  const currentAutoRate =
    totalCount > 0 ? ((autonomousCount / totalCount) * 100).toFixed(1) : '76.4';

  return (
    <header className="border-b border-[#1E293B] bg-[#0E1522]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* Branding & Status */}
        <div className="flex items-center justify-between xl:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-glow-emerald">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base lg:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Pristina Tech</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                    v2.4-PROD
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium">System Online</span>
                <span className="text-slate-500">•</span>
                <span>Kosovo Region (Pristina Hub)</span>
              </p>
            </div>
          </div>

          {/* Quick Actions (Mobile View) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onReset}
              className="p-2 rounded-lg bg-surface border border-surface-border text-slate-400 hover:text-slate-200 transition-colors"
              title="Reset Database"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onExport}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* KPI Snapshot Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 xl:gap-3 flex-1 xl:max-w-4xl xl:mx-6">
          {/* Metric 1 */}
          <div className="bg-[#131B2A]/70 border border-[#1E293B] rounded-xl p-2.5 flex items-center gap-2.5 hover:border-slate-700 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium truncate">
                Messages Handled
              </div>
              <div className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                <span>{KPI_METRICS.messagesHandledDaily}</span>
                <span className="text-[10px] text-emerald-400 font-sans font-normal">Omnichannel</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#131B2A]/70 border border-[#1E293B] rounded-xl p-2.5 flex items-center gap-2.5 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium truncate">
                Autonomous Rate
              </div>
              <div className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1">
                <span>{currentAutoRate}%</span>
                <span className="text-[10px] text-slate-500 font-normal">({autonomousCount}/{totalCount})</span>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div
            className="bg-[#131B2A]/70 border border-[#1E293B] rounded-xl p-2.5 flex items-center gap-2.5 hover:border-slate-700 transition-colors cursor-help group relative"
            title={KPI_METRICS.hoursSavedFormula}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium truncate">
                Weekly Saved
              </div>
              <div className="text-sm font-bold text-amber-300 font-mono">
                {KPI_METRICS.weeklyHoursSaved}
              </div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-[#131B2A]/70 border border-[#1E293B] rounded-xl p-2.5 flex items-center gap-2.5 hover:border-slate-700 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium truncate">
                First Response SLA
              </div>
              <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                <span>{KPI_METRICS.avgResponseSla}</span>
                <span className="text-[10px] text-emerald-400">⚡ Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden xl:flex items-center gap-2.5">
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl bg-[#131B2A] border border-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium flex items-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Database</span>
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-all shadow-glow-emerald"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Hackathon Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
