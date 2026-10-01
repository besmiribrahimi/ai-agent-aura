'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderPlaced: (orderId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Prishtinë');
  const [address, setAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState<'keste' | 'cash'>('keste');
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `#${Math.floor(1050 + Math.random() * 500)}`;
    setGeneratedOrderNumber(newOrderId);
    setCheckoutStep('success');
    onOrderPlaced(newOrderId);
  };

  const handleReset = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-950">
            {checkoutStep === 'cart'
              ? `Shporta (${cart.length})`
              : checkoutStep === 'checkout'
              ? 'Porositja'
              : 'Porosia u regjistrua'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs">
            <div className="flex justify-between items-center text-slate-700 text-[11px] mb-1.5">
              <span>
                {isFreeShipping
                  ? 'Keni fituar dërgesë falas me korrier në Kosovë.'
                  : `Shtoni edhe ${(freeShippingThreshold - subtotal).toFixed(2)} € për dërgesë falas.`}
              </span>
            </div>
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-950 transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-2">
                  <p className="text-sm font-medium text-slate-800">Shporta juaj është e zbrazët</p>
                  <p className="text-xs text-slate-500">
                    Zgjidhni pajisje nga katalogu ynë për të filluar.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-950 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                          {item.product.price} €
                        </div>
                        <div className="text-[10px] text-slate-500">
                          nga {(item.product.price / 24).toFixed(2)} €/m me 24 këste
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 border border-slate-200 rounded-md p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-0.5 text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold text-slate-900 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-0.5 text-slate-500 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 text-[11px] mb-1">Emri dhe mbiemri *</label>
                <input
                  type="text"
                  required
                  placeholder="psh. Bleron Gashi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] mb-1">Numri i telefonit *</label>
                <input
                  type="tel"
                  required
                  placeholder="+383 49 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 text-[11px] mb-1">Qyteti *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-slate-900"
                  >
                    <option value="Prishtinë">Prishtinë</option>
                    <option value="Prizren">Prizren</option>
                    <option value="Pejë">Pejë</option>
                    <option value="Ferizaj">Ferizaj</option>
                    <option value="Gjilan">Gjilan</option>
                    <option value="Gjakovë">Gjakovë</option>
                    <option value="Mitrovicë">Mitrovicë</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 text-[11px] mb-1">Adresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rruga & numri"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] mb-1">Mënyra e pagesës *</label>
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer bg-slate-50">
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentOption === 'keste'}
                      onChange={() => setPaymentOption('keste')}
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Me këste 0% interes</div>
                      <div className="text-[10px] text-slate-500">TEB Starcard, NLB, BKT, Raiffeisen</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer bg-slate-50">
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentOption === 'cash'}
                      onChange={() => setPaymentOption('cash')}
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Para në dorë te korrieri (Cash)</div>
                      <div className="text-[10px] text-slate-500">Pagesë gjatë dorëzimit në adresë</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Totali:</span>
                  <span className="font-bold text-slate-950 font-mono">{subtotal} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Dërgesa:</span>
                  <span className="text-emerald-700 font-medium">Falas në Kosovë (2-4 ditë)</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-1/3 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold"
                >
                  Kthehu
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white font-semibold transition-colors"
                >
                  Konfirmo porosinë
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-950">Porosia u regjistrua me sukses</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Pakoja do të dorëzohet brenda 2 deri në 4 ditë pune.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-center">
                <div className="text-[11px] text-slate-500">Kodi i porosisë suaj:</div>
                <div className="text-2xl font-bold font-mono text-slate-950">
                  {generatedOrderNumber}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
              >
                Vazhdo blerjen
              </button>
            </div>
          )}
        </div>

        {/* Footer Subtotal and Checkout Button */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-600">Nëntotali:</span>
              <span className="text-xl font-bold text-slate-950 font-mono">{subtotal} €</span>
            </div>
            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Vazhdo te porosia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
