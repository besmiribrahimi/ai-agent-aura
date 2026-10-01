'use client';

import React from 'react';

export default function StoreFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h4 className="text-slate-950 font-bold text-sm">Kosova Digital</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Dyqani i pajisjeve elektronike origjinale me garanci prodhuesi në Prishtinë.
            </p>
            <div className="text-xs text-slate-700 space-y-1">
              <div>Rruga Nëna Terezë, Prishtinë, Kosovë</div>
              <div>E hënë – E shtunë: 08:30 – 20:00</div>
            </div>
          </div>

          {/* Financing */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-950 text-xs">Blerje me këste 0%</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>TEB Starcard (deri 24 këste)</li>
              <li>NLB Banka (deri 24 këste)</li>
              <li>BKT Kosova (deri 12 këste)</li>
              <li>Raiffeisen Bonus Card (deri 12 këste)</li>
            </ul>
          </div>

          {/* Delivery & Returns */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-950 text-xs">Dërgesat dhe kthimi</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dërgesa në gjithë territorin e Kosovës brenda 2 deri 4 ditë pune me Posta Shqiptare ose korrier privat.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Kthimi pranohet brenda 30 ditësh vetëm me paketim origjinal të pahapur të fabrikës.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-950 text-xs">Kujdesi ndaj klientit</h5>
            <div className="space-y-1 text-xs text-slate-600">
              <div>Viber: +383 49 100 200</div>
              <div>Email: support@kosovadigital.com</div>
              <div>Instagram: @kosovadigital.tech</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Kosova Digital. Prishtinë, Kosovë.
          </div>
          <div className="flex items-center gap-4">
            <span>Privatësia dhe mbrojtja e të dhënave</span>
            <span>Kushtet e garancisë</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
