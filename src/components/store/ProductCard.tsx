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
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Availability & Warranty */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
          <span className="text-emerald-700 font-medium">Në stok</span>
          <span className="font-mono">{product.warrantyMonths}m garanci</span>
        </div>

        {/* Product photo */}
        <div
          onClick={() => onSelect(product)}
          className="h-48 w-full bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-3 cursor-pointer group mb-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded group-hover:scale-[1.02] transition-transform duration-200"
          />
        </div>

        {/* Information */}
        <h3
          onClick={() => onSelect(product)}
          className="font-bold text-sm text-slate-950 hover:text-blue-700 cursor-pointer line-clamp-1 transition-colors"
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
            <span className="font-medium text-slate-900 block">
              nga {product.monthlyInstallment24.toFixed(2)} €/m
            </span>
            <span className="text-slate-500">me 0% këste (24x)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(product)}
            className="w-full py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium transition-colors"
          >
            Detajet
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Shto në shportë
          </button>
        </div>
      </div>
    </div>
  );
}
