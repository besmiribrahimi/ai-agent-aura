'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { processCustomInboundMessage } from '@/lib/agentEngine';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  time: string;
  ticket?: string;
}

export default function StoreChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: 'Përshëndetje! Mirë se vini në Kosova Digital. Jam asistenti i dyqanit. Si mund t\'ju ndihmoj me produktet, këstet me 0% interes, apo dërgesat me korrier?',
      time: 'Tani',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const evaluation = processCustomInboundMessage(text, 'Viber');
      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: evaluation.agentResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticket: evaluation.ticket,
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 450);
  };

  const samplePrompts = [
    'A keni dërgesa në Pejë dhe sa vonojnë?',
    'A ban me këste me Starcard të TEB-it?',
    'Ku e kam porosinë #1048? Kanë kaluar 6 ditë.',
    'Can I return headphones after 45 days? Box is open.',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2.5 shadow-xl transition-all"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>Ndihmë nga dyqani</span>
        </button>
      )}

      {/* Expanded chat window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-950">
                Kosova Digital • Kujdesi ndaj klientit
              </h4>
              <p className="text-[10px] text-slate-500">
                Përgjigje e menjëhershme • Prishtinë
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick inquiry chips */}
          <div className="p-2 bg-slate-100 border-b border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-md bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-white">
            {messages.map((m) => {
              const isCust = m.sender === 'customer';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isCust ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-slate-400 mb-1 px-1">
                    {isCust ? 'Ju' : 'Asistenti'} • {m.time}
                  </div>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      isCust
                        ? 'bg-slate-950 text-white rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                    }`}
                  >
                    {m.text}

                    {m.ticket && (
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="text-amber-800 font-medium">Numri i tiketës:</span>
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                          {m.ticket}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="text-slate-400 text-xs px-2 py-1">
                Po shkruan...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Shkruani pyetjen tuaj këtu..."
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
