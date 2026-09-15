import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, ArrowRight, Shield, Award, SlidersHorizontal } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageView) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  // Allow toggling between Option A (Clear & Authoritative) and Option B (Minimal & Mysterious)
  const [introMode, setIntroMode] = useState<'minimal' | 'clear'>('clear');

  return (
    <section className="relative bg-[#141413] text-[#FAF8F5] overflow-hidden">
      {/* Intro Style Selector Bar */}
      <div className="border-b border-[#2C2B29] bg-[#1C1B1A]/80 backdrop-blur px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#A8A29E]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-medium tracking-wide">Hero Introduction Mode:</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              id="intro-mode-clear"
              onClick={() => setIntroMode('clear')}
              className={`px-3 py-1 rounded text-xs transition-all tracking-wider uppercase font-medium ${
                introMode === 'clear'
                  ? 'bg-[#C5A880] text-[#141413] shadow-sm font-semibold'
                  : 'bg-[#2A2928] text-[#D6D3D1] hover:text-[#FAF8F5]'
              }`}
            >
              Mode A: Clear & Authoritative
            </button>
            <button
              id="intro-mode-minimal"
              onClick={() => setIntroMode('minimal')}
              className={`px-3 py-1 rounded text-xs transition-all tracking-wider uppercase font-medium ${
                introMode === 'minimal'
                  ? 'bg-[#C5A880] text-[#141413] shadow-sm font-semibold'
                  : 'bg-[#2A2928] text-[#D6D3D1] hover:text-[#FAF8F5]'
              }`}
            >
              Mode B: Minimal & Mysterious
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Typography & Identity */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visual Monogram / Initials Motif ("S", "N", "M", "R") */}
            <div className="flex items-center gap-3 text-[#A8A29E]">
              <div className="flex items-center gap-2 tracking-[0.4em] font-serif text-sm font-light uppercase border-b border-[#2E2C2A] pb-2">
                <span className="text-[#C5A880] font-normal">S</span>
                <span>•</span>
                <span className="text-[#FAF8F5]">N</span>
                <span>•</span>
                <span className="text-[#FAF8F5]">M</span>
                <span>•</span>
                <span className="text-[#C5A880] font-normal">R</span>
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#78716C] ml-2 font-sans">
                Haute Gemstone Atelier
              </span>
            </div>

            {/* Stylized Brand Name */}
            <div>
              <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-normal tracking-tight leading-[1.05] text-[#FAF8F5]">
                Somuchaura.
              </h1>
              <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C5A880] mt-3">
                Curated by YosenaMora & Co.
              </p>
            </div>

            {/* Dynamic Intro Description according to selected mode */}
            {introMode === 'clear' ? (
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-serif text-[#E7E5E4] font-light leading-relaxed max-w-xl">
                  Consultant & Verified Ethical Gemstone Supplier for Independent Master Jewellers.
                </h2>
                <p className="text-sm sm:text-base text-[#A8A29E] leading-relaxed max-w-xl font-sans font-light">
                  We supply natural unheated sapphires, Colombian emeralds, and certified high-value Type IIa diamonds directly from verified artisanal co-ops and accredited European vaults. Zero intermediate trading markup; absolute geological integrity.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <p className="font-serif text-xl sm:text-2xl text-[#D6D3D1] italic font-light tracking-wide max-w-lg">
                  &ldquo;A rare quietude in the world of high jewelry. Where provenance meets pure crystalline fire.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-[#78716C]">
                  Private Vault Allocation • Hatton Garden &amp; Genève
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-explore-catalog-btn"
                onClick={() => onNavigate('shop')}
                className="px-7 py-3.5 bg-[#FAF8F5] text-[#141413] hover:bg-[#EBE5DE] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-lg"
              >
                <span>Explore Gemstone Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-book-consult-btn"
                onClick={() => onNavigate('bookings')}
                className="px-7 py-3.5 border border-[#44403C] hover:border-[#C5A880] text-[#FAF8F5] hover:text-[#C5A880] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 cursor-pointer"
              >
                <span>Book 1:1 Consultation</span>
              </button>

              <button
                id="hero-request-quote-btn"
                onClick={() => onNavigate('quote-calc')}
                className="text-xs uppercase tracking-[0.2em] text-[#A8A29E] hover:text-[#FAF8F5] underline underline-offset-4 py-2 cursor-pointer transition-colors"
              >
                Wholesale Quote Calculator
              </button>
            </div>

            {/* Micro Trust Proofs */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#292826] text-xs text-[#A8A29E]">
              <div>
                <span className="block font-serif text-base text-[#FAF8F5] font-normal">GIA &amp; Gübelin</span>
                <span className="text-[11px] text-[#78716C] tracking-wide">Dual Laboratory Monograph</span>
              </div>
              <div>
                <span className="block font-serif text-base text-[#FAF8F5] font-normal">14-Day Memo</span>
                <span className="text-[11px] text-[#78716C] tracking-wide">Inspection for Ateliers</span>
              </div>
              <div>
                <span className="block font-serif text-base text-[#FAF8F5] font-normal">Direct Ethical</span>
                <span className="text-[11px] text-[#78716C] tracking-wide">Artisanal Co-op Sourcing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Gemstone Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Luxury Frame */}
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-tr from-[#C5A880]/20 via-transparent to-[#FAF8F5]/10 blur-sm pointer-events-none" />
              
              <div className="relative rounded-lg overflow-hidden bg-[#1E1D1B] border border-[#2E2C2A] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                  alt="High Value Investment Grade Flawless Diamond"
                  className="w-full h-[460px] object-cover object-center filter contrast-105 brightness-95"
                />

                {/* Subdued overlay caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent opacity-80" />
                
                {/* Lifted on sm+ so the floating dispatch badge below does not cover the caption */}
                <div className="absolute bottom-6 sm:bottom-16 left-6 right-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141413]/90 border border-[#3E3B38] text-[11px] text-[#C5A880] tracking-wider uppercase mb-2">
                    <Sparkles className="w-3 h-3" /> Featured Vault Piece
                  </div>
                  <h3 className="font-serif text-xl text-[#FAF8F5] font-light">
                    14.28ct Type IIa D Flawless Emerald Cut
                  </h3>
                  <p className="text-xs text-[#A8A29E] font-sans tracking-wide mt-0.5">
                    Botswana Jwaneng Ethical Extraction • GIA Verified Monograph
                  </p>
                </div>
              </div>

              {/* Floating trust badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#1E1D1B] border border-[#3E3B38] p-3 rounded shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-[#D6D3D1] font-semibold">100% Insured Armored Dispatch</p>
                  <p className="text-[10px] text-[#78716C]">Ferrari Logistics &amp; Malca-Amit</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
