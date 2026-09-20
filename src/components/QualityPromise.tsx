import React, { useState } from 'react';
import { PageView } from '../types';
import { CheckCircle2, Sparkles, Sliders, ArrowRight } from 'lucide-react';

interface QualityPromiseProps {
  onNavigate: (page: PageView) => void;
}

export const QualityPromise: React.FC<QualityPromiseProps> = ({ onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    {
      id: 0,
      title: 'Precision Culet & Pavilion Alignment',
      detail: '0.00% light leakage through perfectly calculated pavilion angles designed for full internal light refraction.',
      coords: 'bottom-1/3 left-1/2',
    },
    {
      id: 1,
      title: 'Micro Laser Registry Inscription',
      detail: 'Indelible GIA & ethical mine serial inscription on the girdle, verified under 40x gemological magnification.',
      coords: 'top-1/3 right-1/4',
    },
    {
      id: 2,
      title: 'Flawless Table Proportion',
      detail: 'Optimal 56-59% table ratio delivering balanced fire dispersion and scintillation without milky extinction.',
      coords: 'top-1/4 left-1/3',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] dark:bg-[#080807] text-[#1A1918] dark:text-[#FAF8F5] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Brand Promise Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EBE5DE] dark:bg-[#181614] border border-[#E0D8CE] dark:border-[#2C2926] rounded text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C6D44] dark:text-[#C5A880] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Section 04 • The Lapidary Covenant</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl text-[#1A1918] dark:text-[#FAF8F5] tracking-tight leading-[1.1]">
              Polished, clean, minted!
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
              Every stone that leaves our vault is ready for immediate bench mounting. We reject standard commercial fast-polishing in favor of heritage European hand-finishing, achieving triple-excellent symmetry that commands peak retail valuation for your custom creations.
            </p>

            <div className="space-y-4 pt-3 border-t border-[#E8E1D9] dark:border-[#1F1E1C]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6D44] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#1A1918] dark:text-[#FAF8F5]">
                    Zero Artificial Clarity Fillers or Synthetics
                  </h4>
                  <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] mt-1 font-light">
                    Guaranteed untreated crystalline integrity. No glass-filling, resin polymer infusions, or fracture diffusion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6D44] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#1A1918] dark:text-[#FAF8F5]">
                    Calibrated Millimeter Tolerances
                  </h4>
                  <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] mt-1 font-light">
                    Exact digital micrometer dimensions provided to within ±0.02mm for seamless CAD bezel and prong seat preparation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C6D44] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#1A1918] dark:text-[#FAF8F5]">
                    Minted Provenance Certification
                  </h4>
                  <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] mt-1 font-light">
                    Accompanied by verifiable physical and digital ledger certificates proving non-conflict extraction and ethical royalty remittance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('story')}
                className="px-7 py-3.5 bg-[#1A1918] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#141413] hover:bg-[#33312E] dark:hover:bg-[#E2DDD6] text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-colors flex items-center gap-2 cursor-pointer rounded"
              >
                <span>Read Ethical Sourcing Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('bookings')}
                className="px-7 py-3.5 border border-[#8C827A] dark:border-[#3E3B38] text-[#1A1918] dark:text-[#FAF8F5] hover:border-[#8C6D44] dark:hover:border-[#C5A880] hover:text-[#8C6D44] dark:hover:text-[#C5A880] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer rounded"
              >
                Book Inspection Call
              </button>
            </div>
          </div>

          {/* Right Side: Gemstone Image with Interactive Facet Inspection */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#2E2C2A] dark:border-[#242220] bg-[#1C1B1A] dark:bg-[#121110] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
                alt="Gemstone Polish and Facet Analysis"
                className="w-full h-[480px] object-cover object-center filter brightness-90 contrast-110"
              />

              {/* Dark aesthetic subtle radial vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

              {/* Hotspot triggers overlay */}
              <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setActiveHotspot(2)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    activeHotspot === 2
                      ? 'bg-[#FAF8F5] text-[#141413] scale-125 ring-4 ring-[#C5A880]/50'
                      : 'bg-[#141413]/80 border border-[#C5A880] text-[#FAF8F5] hover:scale-110'
                  }`}
                  title="Table Proportion"
                >
                  1
                </button>
              </div>

              <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setActiveHotspot(1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    activeHotspot === 1
                      ? 'bg-[#FAF8F5] text-[#141413] scale-125 ring-4 ring-[#C5A880]/50'
                      : 'bg-[#141413]/80 border border-[#C5A880] text-[#FAF8F5] hover:scale-110'
                  }`}
                  title="Laser Inscription"
                >
                  2
                </button>
              </div>

              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setActiveHotspot(0)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    activeHotspot === 0
                      ? 'bg-[#FAF8F5] text-[#141413] scale-125 ring-4 ring-[#C5A880]/50'
                      : 'bg-[#141413]/80 border border-[#C5A880] text-[#FAF8F5] hover:scale-110'
                  }`}
                  title="Pavilion Alignment"
                >
                  3
                </button>
              </div>

              {/* Selected Hotspot Detail Card */}
              {activeHotspot !== null && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#141413]/95 backdrop-blur-md border border-[#3E3B38] p-4.5 rounded shadow-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold">
                      Macro Inspection Point #{activeHotspot + 1}
                    </span>
                    <span className="text-xs text-[#A69C94] font-medium">Interactive Spec</span>
                  </div>
                  <h5 className="font-serif text-lg text-[#FAF8F5]">
                    {hotspots[activeHotspot].title}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#D5CDC4] mt-1 font-light">
                    {hotspots[activeHotspot].detail}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
