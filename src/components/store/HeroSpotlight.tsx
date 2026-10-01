'use client';

import React, { useState } from 'react';
import { Product, KOSOVA_PRODUCTS } from '@/data/products';
import { Check, ShieldCheck, Truck, CreditCard, RotateCcw } from 'lucide-react';

interface HeroSpotlightProps {
  featuredProduct: Product;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function HeroSpotlight({
  featuredProduct,
  onSelectProduct,
  onAddToCart,
}: HeroSpotlightProps) {
  // Let the user interactively switch the hero showcase device!
  const [activeDeviceIndex, setActiveDeviceIndex] = useState(0);
  const [selectedMonths, setSelectedMonths] = useState<number>(24);

  // Showcase 3 flagship items matching the benchmark cases
  const showcaseDevices = [
    KOSOVA_PRODUCTS[0], // ThinkPad X1 (Laptop, Order #1048)
    KOSOVA_PRODUCTS[1], // Sony WH-1000XM5 (Headphones, 45d return policy)
    KOSOVA_PRODUCTS[2], // iPhone 15 Pro Max (Titanium)
  ];

  const currentDevice = showcaseDevices[activeDeviceIndex] || featuredProduct;
  const calculatedMonthly = (currentDevice.price / selectedMonths).toFixed(2);

  return (
    <section className="relative border-b border-slate-200 bg-white overflow-hidden py-10 lg:py-16">
      {/* Halo Effect: subtle ambient radial backlighting */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] halo-spotlight pointer-events-none rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Device Switcher Pills */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Zgjedhja e javës:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {showcaseDevices.map((dev, idx) => (
                <button
                  key={dev.id}
                  onClick={() => setActiveDeviceIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDeviceIndex === idx
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {dev.name.split(' ')[0]} {dev.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-slate-900 font-medium">Në stok në Prishtinë</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline font-mono">
              Garancion: {currentDevice.warrantyMonths} muaj
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold, refined product narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {currentDevice.category === 'laptops'
                  ? 'Laptopë Profesionalë'
                  : currentDevice.category === 'audio'
                  ? 'Akustikë & Izolim Zhurme'
                  : 'Telefonia Mobile'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
                {currentDevice.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                {currentDevice.description}
              </p>
            </div>

            {/* Interactive Installment Calculator Widget right in the Hero */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-700" />
                  <span>Kalkulatori i kësteve me 0% interes:</span>
                </span>
                <span className="font-mono text-slate-500">
                  {currentDevice.price} € total
                </span>
              </div>

              {/* Installment options slider / button tabs */}
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[6, 12, 18, 24].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setSelectedMonths(months)}
                    className={`py-1.5 rounded-lg font-semibold transition-all text-center ${
                      selectedMonths === months
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {months} këste
                  </button>
                ))}
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60 text-xs">
                <span className="text-slate-600">Pagesa mujore me TEB / NLB:</span>
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-slate-950">
                    {calculatedMonthly} €
                  </span>
                  <span className="text-[11px] text-slate-500"> /muaj</span>
                </div>
              </div>
            </div>

            {/* 3 Operational Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-0.5">
                <div className="font-semibold text-slate-950 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-slate-700" />
                  <span>2–4 Ditë Pune</span>
                </div>
                <div className="text-[11px] text-slate-500">Posta në gjithë Kosovën</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-0.5">
                <div className="font-semibold text-slate-950 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
                  <span>30 Ditë Kthim</span>
                </div>
                <div className="text-[11px] text-slate-500">Paketim i pahapur</div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-0.5">
                <div className="font-semibold text-slate-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>24 Muaj Garanci</span>
                </div>
                <div className="text-[11px] text-slate-500">Servis i autorizuar</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onAddToCart(currentDevice)}
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
              >
                Shto në shportë — {currentDevice.price} €
              </button>
              <button
                onClick={() => onSelectProduct(currentDevice)}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold bg-white transition-colors"
              >
                Specifikat e plota
              </button>
            </div>
          </div>

          {/* Right Column: Physical Product Pedestal (Halo Effect) */}
          <div className="lg:col-span-6">
            <div className="halo-pedestal border border-slate-200 rounded-3xl p-6 sm:p-10 relative group">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="font-semibold text-slate-900">
                  Fabrikisht e vulosur • Origjinale
                </span>
                <span className="font-mono text-slate-600">
                  {currentDevice.boxCondition}
                </span>
              </div>

              {/* Showcase Image on Ambient Pedestal */}
              <div className="py-8 flex items-center justify-center min-h-[300px]">
                <img
                  src={currentDevice.image}
                  alt={currentDevice.name}
                  className="max-h-80 w-auto object-contain rounded-xl drop-shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              {/* Physical Specs bar */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                {currentDevice.specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex items-start gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
