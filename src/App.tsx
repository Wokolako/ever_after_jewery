'use client';

import React, { useState, useEffect } from 'react';
import { GEMSTONES_CATALOG } from './data/gemstones';
import { Gemstone, CartItem, PageView, PolicyType, BookingAppointment } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DiamondsShowcase } from './components/DiamondsShowcase';
import { QualityPromise } from './components/QualityPromise';
import { ShopCatalog } from './components/ShopCatalog';
import { GemstoneDetailModal } from './components/GemstoneDetailModal';
import { BookingSection } from './components/BookingSection';
import { WholesaleQuoteCalculator } from './components/WholesaleQuoteCalculator';
import { MembersVault } from './components/MembersVault';
import { BlogSection } from './components/BlogSection';
import { StoryAndEthicsSection } from './components/StoryAndEthicsSection';
import { CartDrawer } from './components/CartDrawer';
import { PolicyModal } from './components/PolicyModal';
import { SiteGuideModal } from './components/SiteGuideModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedStoneIds, setSavedStoneIds] = useState<string[]>(['dia-1001', 'sap-2001']);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isSiteGuideOpen, setIsSiteGuideOpen] = useState<boolean>(false);

  // Load / save cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('somuchaura_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      const savedVault = localStorage.getItem('somuchaura_vault');
      if (savedVault) {
        setSavedStoneIds(JSON.parse(savedVault));
      }
    } catch (e) {
      // Ignore in iframe restricted environments
    }
  }, []);

  const handleAddToCart = (stone: Gemstone) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.gemstone.id === stone.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.gemstone.id === stone.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { gemstone: stone, quantity: 1, addedAt: new Date().toISOString() }];
      }
      try {
        localStorage.setItem('somuchaura_cart', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleRemoveFromCart = (stoneId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.gemstone.id !== stoneId);
      try {
        localStorage.setItem('somuchaura_cart', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('somuchaura_cart');
    } catch (e) {}
  };

  const handleToggleSaveStone = (stoneId: string) => {
    setSavedStoneIds((prev) => {
      const updated = prev.includes(stoneId)
        ? prev.filter((id) => id !== stoneId)
        : [...prev, stoneId];
      try {
        localStorage.setItem('somuchaura_vault', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const savedStonesList = GEMSTONES_CATALOG.filter((s) => savedStoneIds.includes(s.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1918] flex flex-col font-sans selection:bg-[#2C2A29] selection:text-[#FAF8F5]">
      
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openSiteGuide={() => setIsSiteGuideOpen(true)}
        openVault={() => setCurrentPage('vault')}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Section 1: Hero with Option A vs B switch */}
            <HeroSection onNavigate={setCurrentPage} />

            {/* Section 2 & 3: "yosenamora" & "All our diamonds, worth millions." & 3 Containers */}
            <DiamondsShowcase
              diamonds={GEMSTONES_CATALOG}
              onSelectStone={(stone) => setSelectedGemstone(stone)}
              onNavigate={setCurrentPage}
            />

            {/* Section 4: "Polished, clean, minted!" & Gemstone Macro */}
            <QualityPromise onNavigate={setCurrentPage} />

            {/* Quick Sourcing Calculator Teaser */}
            <section className="py-16 bg-[#F5EFE8] border-b border-[#E8E1D9] text-center px-4">
              <div className="max-w-4xl mx-auto space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C827A] font-bold">
                  B2B Jeweller Tools
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1918]">
                  Calculate Custom Wholesale Parcel Allocations
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] max-w-xl mx-auto font-light leading-relaxed">
                  Need specific calibrated emerald cuts for an eternity band or an unheated Ceylon sapphire solitaire? Calculate real-time trade prices with our instant quote desk.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentPage('quote-calc')}
                    className="px-7 py-3 bg-[#1A1918] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#33312E] transition-colors cursor-pointer shadow-md"
                  >
                    Open Wholesale Quote Calculator
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'shop' && (
          <ShopCatalog
            gemstones={GEMSTONES_CATALOG}
            onSelectStone={(stone) => setSelectedGemstone(stone)}
            onAddToCart={handleAddToCart}
            savedStoneIds={savedStoneIds}
            onToggleSave={handleToggleSaveStone}
          />
        )}

        {currentPage === 'bookings' && (
          <BookingSection />
        )}

        {currentPage === 'quote-calc' && (
          <WholesaleQuoteCalculator />
        )}

        {currentPage === 'vault' && (
          <MembersVault
            savedStones={savedStonesList}
            onSelectStone={(stone) => setSelectedGemstone(stone)}
            onRemoveSaved={handleToggleSaveStone}
            onNavigateShop={() => setCurrentPage('shop')}
          />
        )}

        {currentPage === 'blog' && (
          <BlogSection />
        )}

        {currentPage === 'story' && (
          <StoryAndEthicsSection />
        )}
      </main>

      {/* Persistent Global Modals & Drawers */}
      <GemstoneDetailModal
        gemstone={selectedGemstone}
        onClose={() => setSelectedGemstone(null)}
        onAddToCart={handleAddToCart}
        isSaved={selectedGemstone ? savedStoneIds.includes(selectedGemstone.id) : false}
        onToggleSave={handleToggleSaveStone}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onSelectStone={(stone) => setSelectedGemstone(stone)}
      />

      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      <SiteGuideModal
        isOpen={isSiteGuideOpen}
        onClose={() => setIsSiteGuideOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

    </div>
  );
}
