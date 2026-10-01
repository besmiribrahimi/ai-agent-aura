'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { SAMPLE_ORDERS, StoreOrder } from '@/data/products';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackerModal({
  isOpen,
  onClose,
}: OrderTrackerModalProps) {
  const [searchNumber, setSearchNumber] = useState('#1048');
  const [searchedOrder, setSearchedOrder] = useState<StoreOrder | null>(
    SAMPLE_ORDERS['#1048']
  );
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = searchNumber.trim().startsWith('#')
      ? searchNumber.trim()
      : `#${searchNumber.trim()}`;
    const result = SAMPLE_ORDERS[cleanNum] || null;
    setSearchedOrder(result);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-950">Gjurmimi i porosisë me korrierin</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              placeholder="Shkruani numrin e porosisë (psh. #1048)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 outline-none focus:border-slate-900 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
            >
              Gjurmo
            </button>
          </form>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Raste testimi:</span>
            <button
              onClick={() => {
                setSearchNumber('#1048');
                setSearchedOrder(SAMPLE_ORDERS['#1048']);
                setHasSearched(true);
              }}
              className="px-2 py-0.5 rounded border border-slate-200 text-slate-700 hover:text-slate-950 font-mono bg-slate-50"
            >
              #1048 (Vonesë 6 ditë)
            </button>
            <button
              onClick={() => {
                setSearchNumber('#1031');
                setSearchedOrder(SAMPLE_ORDERS['#1031']);
                setHasSearched(true);
              }}
              className="px-2 py-0.5 rounded border border-slate-200 text-slate-700 hover:text-slate-950 font-mono bg-slate-50"
            >
              #1031 (Arbeni)
            </button>
          </div>

          {/* Result details */}
          {hasSearched && (
            <>
              {searchedOrder ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div>
                      <span className="text-[10px] text-slate-500">Numri i porosisë:</span>
                      <div className="text-base font-bold text-slate-950 font-mono">
                        {searchedOrder.orderNumber}
                      </div>
                    </div>
                    {searchedOrder.daysElapsed > 4 ? (
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        Vonesë ({searchedOrder.daysElapsed} ditë)
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Në afat ({searchedOrder.daysElapsed} ditë)
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-slate-700 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Blerësi:</span>
                      <span className="font-semibold text-slate-900">{searchedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Destinacioni:</span>
                      <span>{searchedOrder.city}, Kosovë</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Korrieri:</span>
                      <span>{searchedOrder.carrierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mënyra e pagesës:</span>
                      <span>{searchedOrder.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] space-y-1 text-slate-700">
                    <div className="font-semibold text-slate-900">Shënimi nga logjistika:</div>
                    <p>{searchedOrder.trackingNotes}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                  Nuk u gjet asnjë porosi me këtë numër.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
