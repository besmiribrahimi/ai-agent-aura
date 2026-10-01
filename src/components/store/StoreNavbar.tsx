'use client';

import React from 'react';
import { ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';

interface StoreNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onToggleAdminView: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function StoreNavbar({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onToggleAdminView,
  activeCategory,
  onSelectCategory,
}: StoreNavbarProps) {
  const categories = [
    { id: 'all', label: 'Të gjitha' },
    { id: 'laptops', label: 'Laptopë' },
    { id: 'audio', label: 'Audio & Kufje' },
    { id: 'phones', label: 'Telefona' },
    { id: 'accessories', label: 'Orë & Aksesorë' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top operational announcement */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px]">
            <span>Dërgesa në tërë Kosovën brenda 2 deri 4 ditë pune</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Këste 0% interes me TEB Starcard, NLB, BKT, Raiffeisen
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Dyqani në Prishtinë (Hënë–Shtunë 08:30–20:00)</span>
            <button
              onClick={onToggleAdminView}
              className="text-slate-300 hover:text-white underline decoration-slate-600 underline-offset-2 transition-colors"
            >
              Paneli i Inbox AI
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-950 font-sans">
              Kosova Digital
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              Pajisje elektronike me garanci zyrtare
            </span>
          </a>

          {/* Categories */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  activeCategory === c.id
                    ? 'font-semibold text-slate-950 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTracker}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-700 bg-white transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Gjurmo porosinë</span>
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shporta</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[11px] font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
