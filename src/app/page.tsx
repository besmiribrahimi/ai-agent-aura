'use client';

import React, { useState } from 'react';
import StoreNavbar from '@/components/store/StoreNavbar';
import HeroSpotlight from '@/components/store/HeroSpotlight';
import ProductCard from '@/components/store/ProductCard';
import ProductModal from '@/components/store/ProductModal';
import CartDrawer, { CartItem } from '@/components/store/CartDrawer';
import OrderTrackerModal from '@/components/store/OrderTrackerModal';
import StoreChatWidget from '@/components/store/StoreChatWidget';
import StoreFooter from '@/components/store/StoreFooter';

import Header from '@/components/Header';
import InboxFeed from '@/components/InboxFeed';
import ConversationChat from '@/components/ConversationChat';
import TelemetryEngine from '@/components/TelemetryEngine';
import ExportModal from '@/components/ExportModal';

import { KOSOVA_PRODUCTS, Product } from '@/data/products';
import { INITIAL_HACKATHON_CASES, InquiryCase } from '@/data/hackathonData';
import { processCustomInboundMessage } from '@/lib/agentEngine';
import { ArrowLeft, MessageSquare, Cpu, Layers } from 'lucide-react';

export default function Home() {
  // View mode
  const [viewMode, setViewMode] = useState<'store' | 'orchestrator'>('store');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([
    { product: KOSOVA_PRODUCTS[1], quantity: 1 }, // preloaded with Sony XM5
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Orchestrator State
  const [cases, setCases] = useState<InquiryCase[]>(INITIAL_HACKATHON_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<number>(1);
  const [autonomousMode, setAutonomousMode] = useState<boolean>(true);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'feed' | 'chat' | 'telemetry'>('chat');

  // Active orchestrator case
  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const autonomousCount = cases.filter((c) => c.decision === 'DECIDES_ALONE').length;
  const escalatedCount = cases.filter((c) => c.decision === 'HANDS_TO_HUMAN').length;

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filter products
  const filteredProducts =
    activeCategory === 'all'
      ? KOSOVA_PRODUCTS
      : KOSOVA_PRODUCTS.filter((p) => p.category === activeCategory);

  // Orchestrator operations
  const handleSelectCase = (c: InquiryCase) => {
    setSelectedCaseId(c.id);
    setMobileTab('chat');
  };

  const handleSelectPreset = (id: number) => {
    const found = cases.find((c) => c.id === id);
    if (found) {
      setSelectedCaseId(id);
    }
  };

  const handleSendCustomMessage = (
    text: string,
    channel: 'Viber' | 'Email' | 'Instagram DM'
  ) => {
    setIsProcessing(true);
    setTimeout(() => {
      const newCase = processCustomInboundMessage(text, channel);
      setCases((prev) => [newCase, ...prev]);
      setSelectedCaseId(newCase.id);
      setIsProcessing(false);
    }, 450);
  };

  const handleResetDatabase = () => {
    setCases(INITIAL_HACKATHON_CASES);
    setSelectedCaseId(1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-slate-950 selection:text-white">
      {viewMode === 'store' ? (
        /* ================= KOSOVA DIGITAL STOREFRONT ================= */
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
          <StoreNavbar
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenTracker={() => setIsTrackerOpen(true)}
            onToggleAdminView={() => setViewMode('orchestrator')}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <HeroSpotlight
            featuredProduct={KOSOVA_PRODUCTS[0]}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />

          {/* Product Catalog Section */}
          <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  Pajisjet në dyqan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Të gjitha produktet vijnë të vulosura me 24 muaj garancion zyrtar
                </p>
              </div>

              {/* Segmented category filter */}
              <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-lg text-xs">
                {[
                  { id: 'all', label: 'Të gjitha' },
                  { id: 'laptops', label: 'Laptopë' },
                  { id: 'audio', label: 'Audio' },
                  { id: 'phones', label: 'Telefona' },
                  { id: 'accessories', label: 'Aksesorë' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-white text-slate-950 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>

          <StoreFooter />

          {/* Modals & Embedded Floating Chat */}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onOrderPlaced={(orderId) => {}}
          />

          <OrderTrackerModal
            isOpen={isTrackerOpen}
            onClose={() => setIsTrackerOpen(false)}
          />

          {/* Embedded Store Chat Widget */}
          <StoreChatWidget />
        </div>
      ) : (
        /* ================= INBOX AI ORCHESTRATOR ADMIN VIEW ================= */
        <div className="flex flex-col h-screen max-h-screen bg-[#0B0F17] text-slate-100 overflow-hidden">
          {/* Top Banner to switch back to storefront */}
          <div className="bg-[#161B22] border-b border-[#21262D] px-4 py-2 flex items-center justify-between text-xs">
            <button
              onClick={() => setViewMode('store')}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kthehu te Dyqani "Kosova Digital"</span>
            </button>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Backend Triage & Telemetry Engine (Viber, Instagram DM, Email)
            </span>
          </div>

          <Header
            onReset={handleResetDatabase}
            onExport={() => setIsExportOpen(true)}
            autonomousCount={autonomousCount}
            escalatedCount={escalatedCount}
            totalCount={cases.length}
          />

          {/* Mobile switcher for orchestrator */}
          <div className="lg:hidden flex items-center border-b border-[#1E293B] bg-[#0E1522] px-2 py-1.5 justify-around text-xs">
            <button
              onClick={() => setMobileTab('feed')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                mobileTab === 'feed'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Feed ({cases.length})</span>
            </button>
            <button
              onClick={() => setMobileTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                mobileTab === 'chat'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>
            <button
              onClick={() => setMobileTab('telemetry')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                mobileTab === 'telemetry'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Telemetry</span>
            </button>
          </div>

          {/* 3-Column Layout */}
          <div className="flex-1 flex overflow-hidden">
            <div
              className={`h-full ${
                mobileTab === 'feed' ? 'block w-full' : 'hidden lg:block'
              }`}
            >
              <InboxFeed
                cases={cases}
                selectedCaseId={selectedCaseId}
                onSelectCase={handleSelectCase}
              />
            </div>

            <div
              className={`h-full flex-1 ${
                mobileTab === 'chat' ? 'flex flex-col w-full' : 'hidden lg:flex lg:flex-col'
              }`}
            >
              <ConversationChat
                activeCase={activeCase}
                onSendCustomMessage={handleSendCustomMessage}
                onSelectPreset={handleSelectPreset}
                autonomousMode={autonomousMode}
                onToggleAutonomousMode={() => setAutonomousMode(!autonomousMode)}
                isProcessing={isProcessing}
              />
            </div>

            <div
              className={`h-full ${
                mobileTab === 'telemetry' ? 'block w-full' : 'hidden lg:block'
              }`}
            >
              <TelemetryEngine activeCase={activeCase} />
            </div>
          </div>

          <ExportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            cases={cases}
          />
        </div>
      )}
    </div>
  );
}
