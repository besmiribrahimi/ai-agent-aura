'use client';

import React, { useState } from 'react';
import {
  Cpu,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Terminal,
  FileCode,
  ArrowRight,
  Database,
  Lock,
  Compass,
  MessageSquare,
  Sparkles,
  Zap,
} from 'lucide-react';
import { InquiryCase } from '@/data/hackathonData';

interface TelemetryEngineProps {
  activeCase: InquiryCase;
}

export default function TelemetryEngine({ activeCase }: TelemetryEngineProps) {
  const [viewMode, setViewMode] = useState<'VISUAL' | 'JSON'>('VISUAL');
  const t = activeCase.telemetry;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Frustrated':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Hostile':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 5) return 'bg-rose-500 text-rose-100';
    if (score >= 4) return 'bg-amber-500 text-amber-100';
    if (score >= 3) return 'bg-yellow-500 text-yellow-950';
    return 'bg-emerald-500 text-emerald-950';
  };

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 flex flex-col bg-[#0E1522] border-l border-[#1E293B] h-full overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-[#1E293B] bg-[#0B0F17]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Agent Telemetry</span>
              <span className="text-[10px] text-cyan-400 font-mono">v2.4</span>
            </h3>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#131B2A] p-0.5 rounded-lg border border-[#1E293B]">
          <button
            onClick={() => setViewMode('VISUAL')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
              viewMode === 'VISUAL'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Trace</span>
          </button>
          <button
            onClick={() => setViewMode('JSON')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
              viewMode === 'JSON'
                ? 'bg-slate-800 text-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3 h-3" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'JSON' ? (
        <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] bg-[#080C13] text-emerald-400 leading-relaxed selection:bg-emerald-900/50">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[10px]">
            <span>// Raw Telemetry Payload</span>
            <span>ID: {activeCase.id}</span>
          </div>
          <pre className="mt-2 text-slate-300">
            {JSON.stringify(
              {
                messageId: activeCase.id,
                channel: activeCase.channel,
                customer: activeCase.sender,
                decision: activeCase.decision,
                reasoning: activeCase.reasoning,
                telemetry: activeCase.telemetry,
              },
              null,
              2
            )}
          </pre>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
          {/* Autonomous Status Callout */}
          <div
            className={`p-3 rounded-xl border flex items-center justify-between ${
              activeCase.decision === 'HANDS_TO_HUMAN'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {activeCase.decision === 'HANDS_TO_HUMAN' ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              <div>
                <div className="font-bold text-xs">
                  {activeCase.decision === 'HANDS_TO_HUMAN'
                    ? 'Staff Escalation Dispatched'
                    : 'Autonomous Resolution Cleared'}
                </div>
                <div className="text-[10px] text-slate-400">{activeCase.reasoning}</div>
              </div>
            </div>
            {activeCase.ticket && (
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeCase.ticket}
              </span>
            )}
          </div>

          {/* Skill 1: Intent & Sentiment */}
          <div className="bg-[#131B2A] border border-[#1E293B] rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Skill 1: classify_intent</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Lang: {t.skill1_intent.language}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <div className="text-[10px] text-slate-500">Detected Intent</div>
                <div className="font-mono font-semibold text-cyan-300 truncate">
                  {t.skill1_intent.intent}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Sentiment Score</div>
                <span
                  className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] border ${getSentimentColor(
                    t.skill1_intent.sentiment
                  )}`}
                >
                  {t.skill1_intent.sentiment}
                </span>
              </div>
            </div>

            {/* Urgency meter */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Urgency Level</span>
                <span className="font-mono font-bold text-slate-300">
                  {t.skill1_intent.urgencyScore} / 5
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`flex-1 rounded-sm ${
                      lvl <= t.skill1_intent.urgencyScore
                        ? getUrgencyColor(t.skill1_intent.urgencyScore)
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Skill 2: Order Lookup & Zero-Trust PII */}
          <div className="bg-[#131B2A] border border-[#1E293B] rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Skill 2: get_order_details</span>
              </span>
              {t.skill2_orderLookup.piiStatus === 'BLOCKED_ZERO_TRUST' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Zero-Trust Lock</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Auth Verified</span>
                </span>
              )}
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center text-slate-400">
                <span>Order Reference:</span>
                <span className="font-mono text-slate-200 font-semibold">
                  {t.skill2_orderLookup.orderId || 'None Provided'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Requester Token:</span>
                <span className="font-mono text-[10px] text-slate-400 truncate max-w-[180px]">
                  {t.skill2_orderLookup.requesterToken}
                </span>
              </div>

              {t.skill2_orderLookup.maskedFields.length > 0 && (
                <div className="mt-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-300 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3 text-rose-400" />
                    <span>Redacted / Masked Fields (Anti-Leak):</span>
                  </div>
                  {t.skill2_orderLookup.maskedFields.map((field, idx) => (
                    <div key={idx} className="font-mono text-[10px] text-rose-400 pl-3">
                      • {field}
                    </div>
                  ))}
                </div>
              )}

              {t.skill2_orderLookup.carrierSync && (
                <div className="mt-2 p-2 rounded-lg bg-[#0E1522] border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Carrier:</span>
                    <span className="text-slate-300">
                      {t.skill2_orderLookup.carrierSync.carrier}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Delivery SLA:</span>
                    <span className="text-rose-400 font-mono font-bold">
                      {t.skill2_orderLookup.carrierSync.daysElapsed} days (Max {t.skill2_orderLookup.carrierSync.slaLimit})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skill 3: Policy Eligibility Checker */}
          <div className="bg-[#131B2A] border border-[#1E293B] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Skill 3: validate_policy</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {t.skill3_policy.policyType}
              </span>
            </div>

            <div className="text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Policy Eligibility:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                    t.skill3_policy.isEligible
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {t.skill3_policy.isEligible ? 'QUALIFIED / ACCEPTED' : 'INELIGIBLE / REJECTED'}
                </span>
              </div>

              {t.skill3_policy.rejectionReasons.length > 0 && (
                <div className="p-2 rounded bg-[#0E1522] border border-slate-800 text-[10px] space-y-0.5">
                  <div className="text-slate-500 font-medium">Rejection Constraints:</div>
                  {t.skill3_policy.rejectionReasons.map((r, i) => (
                    <div key={i} className="text-amber-400 font-mono">
                      ✕ {r}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-slate-500 leading-normal pt-1">
                {t.skill3_policy.details}
              </p>
            </div>
          </div>

          {/* Skill 4: High-Risk & Escalation Dispatcher */}
          <div className="bg-[#131B2A] border border-[#1E293B] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Skill 4: create_human_ticket</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  t.skill4_escalation.dispatched
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {t.skill4_escalation.dispatched ? 'TRIGGERED' : 'STANDBY'}
              </span>
            </div>

            <div className="text-[11px] space-y-1 text-slate-300">
              <div className="flex justify-between text-slate-400">
                <span>Priority Level:</span>
                <span className="font-mono text-white font-bold">
                  {t.skill4_escalation.priority}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Target Dept:</span>
                <span className="font-mono text-slate-200">
                  {t.skill4_escalation.department}
                </span>
              </div>
              {t.skill4_escalation.slaResolutionCommitment && (
                <div className="mt-1.5 p-2 rounded bg-amber-500/5 border border-amber-500/20 text-amber-300 text-[10px] font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{t.skill4_escalation.slaResolutionCommitment}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skill 5: Localized Dialect Engine */}
          <div className="bg-[#131B2A] border border-[#1E293B] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Skill 5: format_local_response</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>{t.skill5_formatting.responseTimeMs}ms</span>
              </span>
            </div>

            <div className="text-[10px] space-y-1 text-slate-400">
              <div>
                <span className="text-slate-500">Locale Target:</span>{' '}
                <span className="text-slate-200 font-medium">
                  {t.skill5_formatting.localeProfile}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Tone Persona:</span>{' '}
                <span className="text-slate-300">{t.skill5_formatting.tone}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">Anti-Hallucination:</span>
                <span className="text-emerald-400 font-semibold font-mono">
                  ✓ {t.skill5_formatting.antiHallucinationCheck}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
