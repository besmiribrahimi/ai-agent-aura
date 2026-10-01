'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  FileText,
  Shield,
  Zap,
  Award,
} from 'lucide-react';
import { InquiryCase, KPI_METRICS } from '@/data/hackathonData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: InquiryCase[];
}

export default function ExportModal({ isOpen, onClose, cases }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const autoCount = cases.filter((c) => c.decision === 'DECIDES_ALONE').length;
  const humanCount = cases.filter((c) => c.decision === 'HANDS_TO_HUMAN').length;
  const piiBlocks = cases.filter(
    (c) => c.telemetry.skill2_orderLookup.piiStatus === 'BLOCKED_ZERO_TRUST'
  ).length;

  const exportPayload = {
    hackathonProject: 'Pristina Tech • Inbox Orchestrator v2.4-PROD',
    timestamp: new Date().toISOString(),
    region: 'Kosovo / Western Balkans',
    kpiSummary: {
      dailyInquiriesVolume: 250,
      autonomousRateAchieved: `${((autoCount / cases.length) * 100).toFixed(1)}%`,
      weeklyHoursSaved: KPI_METRICS.weeklyHoursSaved,
      averageFirstResponseSla: KPI_METRICS.avgResponseSla,
      zeroTrustPiiBlocksEnforced: piiBlocks,
      humanEscalationTicketsCreated: humanCount,
    },
    inquiriesEvaluated: cases,
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'pristina_tech_hackathon_report.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#0E1522] border border-[#1E293B] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#131B2A]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Hackathon Performance Audit Report
              </h3>
              <p className="text-[11px] text-slate-400">
                Pristina Tech Electronics Retail Inbox Automation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#131B2A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Autonomous
              </div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                {((autoCount / cases.length) * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] text-slate-500">{autoCount} solved</div>
            </div>
            <div className="p-3 rounded-xl bg-[#131B2A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Staff Escalations
              </div>
              <div className="text-lg font-bold text-amber-400 font-mono">
                {humanCount}
              </div>
              <div className="text-[10px] text-slate-500">Tickets generated</div>
            </div>
            <div className="p-3 rounded-xl bg-[#131B2A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Zero-Trust Locks
              </div>
              <div className="text-lg font-bold text-cyan-400 font-mono">
                {piiBlocks}
              </div>
              <div className="text-[10px] text-slate-500">PII Leaks Blocked</div>
            </div>
            <div className="p-3 rounded-xl bg-[#131B2A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Weekly Savings
              </div>
              <div className="text-lg font-bold text-purple-400 font-mono">
                {KPI_METRICS.weeklyHoursSaved}
              </div>
              <div className="text-[10px] text-slate-500">Store staff hours</div>
            </div>
          </div>

          {/* Executive Summary Pitch */}
          <div className="bg-[#131B2A]/70 border border-[#1E293B] rounded-xl p-3.5 space-y-2 text-xs">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hackathon Solution Highlights</span>
            </div>
            <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Native Dialect & Zero Corporate Filler:</strong> Speaks authentic Pristina Gheg/Standard Albanian & English, eliminating robotic cliches.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>
                  <strong>Zero-Trust PII Protection:</strong> Completely denies unauthorized third-party address lookups, neutralizing social engineering attacks.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Strict Local Business Policy:</strong> Automatically enforces 30-day unopened returns, 2-4 day Kosovo courier SLAs, and 0% installment bank cards (TEB, NLB, BKT, Raiffeisen).
                </span>
              </li>
            </ul>
          </div>

          {/* JSON Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Telemetry Data Export (JSON)</span>
              <button
                onClick={handleCopyJson}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
            <div className="bg-[#080C13] border border-slate-800 rounded-xl p-3 max-h-44 overflow-y-auto font-mono text-[10px] text-slate-400">
              <pre>{JSON.stringify(exportPayload, null, 2)}</pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#131B2A]/40 flex items-center justify-end gap-2.5">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-[#131B2A] border border-[#1E293B] hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-glow-emerald"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
