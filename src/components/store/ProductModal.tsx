'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-emerald-700">Pako origjinale e vulosur</span>
            <span>•</span>
            <span className="font-mono">{product.warrantyMonths} muaj garanci e autorizuar</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Image */}
            <div className="md:col-span-5 bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-64 object-contain rounded"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-7 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2">
                <div className="text-2xl font-bold text-slate-950 font-mono">
                  {product.price} €
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  nga {product.monthlyInstallment24.toFixed(2)} €/muaj me 0% interes (24 këste)
                </div>
              </div>

              {/* Installment breakdown table */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-semibold text-slate-900 text-[11px]">
                  Këstet me 0% interes me kartela bankare në Kosovë:
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                  <div>• TEB Starcard: <strong>{product.monthlyInstallment24.toFixed(2)} €</strong> (24x)</div>
                  <div>• NLB Banka: <strong>{product.monthlyInstallment24.toFixed(2)} €</strong> (24x)</div>
                  <div>• BKT Kosova: <strong>{product.monthlyInstallment12.toFixed(2)} €</strong> (12x)</div>
                  <div>• Raiffeisen Bonus: <strong>{product.monthlyInstallment12.toFixed(2)} €</strong> (12x)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full specifications */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">Specifikat teknike</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.specs.map((s, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 flex items-start gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Store policy clarification */}
          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-700 space-y-1.5">
            <div className="font-semibold text-slate-950">Politika zyrtare e dyqanit</div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              • Dërgesa me korrier brenda 2–4 ditë pune në gjithë territorin e Kosovës.<br />
              • Kthimi lejohet brenda 30 ditësh kalendarike vetëm nëse kutia e fabrikës është e pahapur dhe me vulën e paprekur.<br />
              • Të gjitha pajisjet mbulohen nga 24 muaj garancion zyrtar prodhuesi.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Çmimi i plotë:</span>
            <div className="text-xl font-bold text-slate-950 font-mono">{product.price} €</div>
          </div>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Shto në shportë
          </button>
        </div>
      </div>
    </div>
  );
}
