'use client';

import React from 'react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="luxury-card rounded-2xl p-5 flex flex-col justify-between group">
      <div>
        {/* Availability & Warranty */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
          <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>Në stok</span>
          </span>
          <span className="font-mono text-slate-500">{product.warrantyMonths}m garanci</span>
        </div>

        {/* Product photo on clean studio stage */}
        <div
          onClick={() => onSelect(product)}
          className="h-48 w-full bg-slate-50/80 rounded-xl overflow-hidden flex items-center justify-center p-3 cursor-pointer mb-4 border border-slate-100/80"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>

        {/* Information */}
        <h3
          onClick={() => onSelect(product)}
          className="font-bold text-sm text-slate-950 group-hover:text-blue-700 cursor-pointer line-clamp-1 transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
          {product.tagline}
        </p>

        {/* Key specifications */}
        <ul className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
          {product.specs.slice(0, 2).map((s, i) => (
            <li key={i} className="truncate">
              • {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing and Action */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-lg font-bold font-mono text-slate-950">
              {product.price} €
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice} €
              </span>
            )}
          </div>
          <div className="text-right text-[11px]">
            <span className="font-semibold text-slate-900 block">
              nga {product.monthlyInstallment24.toFixed(2)} €/m
            </span>
            <span className="text-slate-500">me 0% këste (24x)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(product)}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold bg-white transition-colors"
          >
            Detajet
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow"
          >
            Shto në shportë
          </button>
        </div>
      </div>
    </div>
  );
}
