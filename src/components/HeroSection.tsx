import React from 'react';
import { PageView } from '../types';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageView) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-[#FAF8F5] dark:bg-[#080807] text-[#1A1918] dark:text-[#FAF8F5] overflow-hidden transition-colors">
      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Typography & Identity */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Stylized Brand Name */}
            <div>
              <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-normal tracking-tight leading-[1.05] text-[#1A1918] dark:text-[#FAF8F5]">
                YosenaMora.
              </h1>
              <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8C6D44] dark:text-[#C5A880] mt-3 font-semibold">
                Gemstones &amp; Diamonds
              </p>
            </div>

            {/* Intro Description — Minimal & Mysterious */}
            <div className="space-y-4 pt-2">
              <p className="font-serif text-2xl sm:text-3xl text-[#2C2A29] dark:text-[#E7E5E4] italic font-light tracking-wide max-w-lg">
                &ldquo;A rare quietude in the world of high jewelry. Where provenance meets pure crystalline fire.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-[#57534E] dark:text-[#D5CDC4] leading-relaxed max-w-xl font-sans font-light">
                We source natural unheated sapphires, Colombian emeralds, and certified Type IIa diamonds directly from verified artisanal co-ops and accredited European vaults.
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#78716C] dark:text-[#A69C94] font-semibold">
                Private Vault Allocation • Hatton Garden &amp; Genève
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-explore-catalog-btn"
                onClick={() => onNavigate('shop')}
                className="px-7 py-3.5 bg-[#1A1918] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#141413] hover:bg-[#33312E] dark:hover:bg-[#EBE5DE] text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-lg rounded"
              >
                <span>Explore Gemstone Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-book-consult-btn"
                onClick={() => onNavigate('bookings')}
                className="px-7 py-3.5 border border-[#8C827A] dark:border-[#44403C] hover:border-[#8C6D44] dark:hover:border-[#C5A880] text-[#1A1918] dark:text-[#FAF8F5] hover:text-[#8C6D44] dark:hover:text-[#C5A880] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer rounded"
              >
                <span>Book 1:1 Consultation</span>
              </button>

              <button
                id="hero-request-quote-btn"
                onClick={() => onNavigate('quote-calc')}
                className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C6D44] dark:text-[#C5A880] hover:text-[#1A1918] dark:hover:text-[#FAF8F5] underline underline-offset-4 py-2 cursor-pointer transition-colors font-semibold"
              >
                Wholesale Quote Calculator
              </button>
            </div>

            {/* Micro Trust Proofs */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8E1D9] dark:border-[#292826] text-sm text-[#57534E] dark:text-[#A8A29E]">
              <div>
                <span className="block font-serif text-lg text-[#1A1918] dark:text-[#FAF8F5] font-medium">GIA &amp; Gübelin</span>
                <span className="text-xs text-[#78716C] dark:text-[#999188] tracking-wide">Dual Laboratory Monograph</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#1A1918] dark:text-[#FAF8F5] font-medium">14-Day Memo</span>
                <span className="text-xs text-[#78716C] dark:text-[#999188] tracking-wide">Inspection for Ateliers</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#1A1918] dark:text-[#FAF8F5] font-medium">Direct Ethical</span>
                <span className="text-xs text-[#78716C] dark:text-[#999188] tracking-wide">Artisanal Co-op Sourcing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Gemstone Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Luxury Frame */}
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-tr from-[#C5A880]/20 via-transparent to-[#FAF8F5]/10 blur-sm pointer-events-none" />
              
              <div className="relative rounded-lg overflow-hidden bg-[#FFFFFF] dark:bg-[#121110] border border-[#E8E1D9] dark:border-[#262320] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                  alt="High Value Investment Grade Flawless Diamond"
                  className="w-full h-[460px] object-cover object-center filter contrast-105 brightness-95"
                />

                {/* Subdued overlay caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent opacity-80" />
                
                {/* Lifted on sm+ so the floating dispatch badge below does not cover the caption */}
                <div className="absolute bottom-6 sm:bottom-16 left-6 right-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#141413]/90 border border-[#3E3B38] text-xs text-[#C5A880] font-semibold tracking-wider uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Vault Piece
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">
                    14.28ct Type IIa D Flawless Emerald Cut
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D5CDC4] font-sans tracking-wide mt-1">
                    Botswana Jwaneng Ethical Extraction • GIA Verified Monograph
                  </p>
                </div>
              </div>

              {/* Floating trust badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#FFFFFF] dark:bg-[#141312] border border-[#E8E1D9] dark:border-[#2C2926] p-3.5 rounded shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#8C6D44] dark:text-[#C5A880]">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-[#1A1918] dark:text-[#E7E5E4] font-bold">100% Insured Armored Dispatch</p>
                  <p className="text-xs text-[#78716C] dark:text-[#A69C94]">Ferrari Logistics &amp; Malca-Amit</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
