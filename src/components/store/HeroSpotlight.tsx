'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Product } from '@/data/products';

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
  return (
    <section className="border-b border-slate-200 bg-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Editorial message */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 tracking-normal">
                Kosova Digital • Dyqani në Prishtinë
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 leading-[1.12]">
                Pajisje elektronike origjinale, me garancion dhe këste pa interes.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Shitje e autorizuar e laptopëve, telefonave dhe kufjeve. Dërgojmë kudo në Kosovë brenda 2 deri në 4 ditë pune, me mundësi pagese me këste përmes kartelave të bankave partnere.
              </p>
            </div>

            {/* Clear, quiet service terms */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span><strong>Dërgesa:</strong> 2 deri 4 ditë pune në çdo qytet të Kosovës</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span><strong>Këstet 0%:</strong> Me kartela TEB Starcard, NLB, BKT, dhe Raiffeisen Bonus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span><strong>Rregullorja e kthimit:</strong> 30 ditë vetëm në paketim origjinal të pahapur</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onAddToCart(featuredProduct)}
                className="px-5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                Porosit {featuredProduct.name.split(' ')[0]} {featuredProduct.name.split(' ')[1]}
              </button>
              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="px-4 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium bg-white transition-colors"
              >
                Shiko specifikat teknike
              </button>
            </div>
          </div>

          {/* Right: Studio Product Stage (Bold, high-contrast, uncluttered) */}
          <div className="lg:col-span-6">
            <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50 relative">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-200">
                <span className="font-medium text-slate-900">E theksuar këtë javë</span>
                <span className="font-mono">{featuredProduct.warrantyMonths} muaj garanci</span>
              </div>

              {/* Product Hero Image */}
              <div className="py-6 flex items-center justify-center">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="max-h-72 w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Product details */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-slate-950">
                    {featuredProduct.name}
                  </h3>
                  <span className="text-xl font-bold font-mono text-slate-950">
                    {featuredProduct.price} €
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {featuredProduct.tagline}
                </p>
                <div className="pt-2 text-xs text-slate-700 flex items-center justify-between">
                  <span>Pagesa me këste:</span>
                  <span className="font-medium text-slate-950">
                    nga {featuredProduct.monthlyInstallment24.toFixed(2)} €/muaj (24 këste me 0%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
