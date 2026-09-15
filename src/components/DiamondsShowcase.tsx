import React from 'react';
import { Gemstone, PageView } from '../types';
import { ShieldCheck, Sparkles, Eye, ArrowUpRight, Scale, Gem } from 'lucide-react';

interface DiamondsShowcaseProps {
  diamonds: Gemstone[];
  onSelectStone: (stone: Gemstone) => void;
  onNavigate: (page: PageView) => void;
}

export const DiamondsShowcase: React.FC<DiamondsShowcaseProps> = ({
  diamonds,
  onSelectStone,
  onNavigate,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 2 Header: "yosenamora" & "All our diamonds, worth millions." */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8C827A] font-semibold">
            yosenamora
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1918] font-normal tracking-tight">
            All our diamonds, worth millions.
          </h2>
          <div className="w-12 h-[1.5px] bg-[#C5A880] mx-auto my-4" />
          <p className="text-[#57534E] text-base sm:text-lg font-light leading-relaxed">
            Positioned at the highest echelon of the global gemstone market. We curate single-owner, investment-grade diamonds and ultra-rare unheated colored gems for sovereign clients and independent haute ateliers.
          </p>
        </div>

        {/* Section 3: The 3 Scaffolding Containers (Process, Benefits & B2B Trust) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-[#FFFFFF] border border-[#EBE5DE] p-8 rounded-lg shadow-sm hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5DFD7] flex items-center justify-center text-[#1A1918] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] transition-colors">
              <Gem className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C827A] font-semibold block mb-2">
              01 • Allocation
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] mb-3">
              Direct Primary Allocation
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed font-light">
              Secured directly from vetted African and Canadian artisanal operators and historical European estate vaults, eliminating the 30-45% intermediary broker inflation.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EBE5DE] p-8 rounded-lg shadow-sm hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5DFD7] flex items-center justify-center text-[#1A1918] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C827A] font-semibold block mb-2">
              02 • Dual Verification
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] mb-3">
              GIA &amp; Swiss Monographs
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed font-light">
              Every stone is accompanied by exhaustive dual laboratory dossiers (GIA, Gübelin, or SSEF) certifying geographic provenance, absence of thermal enhancement, and chemical purity.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EBE5DE] p-8 rounded-lg shadow-sm hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5DFD7] flex items-center justify-center text-[#1A1918] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C827A] font-semibold block mb-2">
              03 • Jeweller Flexibility
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] mb-3">
              14-Day Consignment Memo
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed font-light">
              Present high-value center stones to your private bespoke collectors with complete peace of mind. We dispatch on fully insured memo terms with no upfront capital commitment.
            </p>
          </div>

        </div>

        {/* Featured High-Value Stones Showcase Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD7] pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A]">
                Vault Selection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1918]">
                Representative High-Value Diamonds &amp; Rare Gems
              </h3>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1918] hover:text-[#C5A880] flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>View All Vault Stones</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diamonds.slice(0, 3).map((stone) => (
              <div
                key={stone.id}
                onClick={() => onSelectStone(stone)}
                className="bg-[#FFFFFF] rounded-lg overflow-hidden border border-[#E8E1D9] hover:border-[#1A1918] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-[#1E1D1B]">
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold text-[#1A1918]">
                    {stone.shape} • {stone.carat} ct
                  </div>
                  <div className="absolute top-3 right-3 bg-[#1A1918] text-[#FAF8F5] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
                    {stone.certification}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#FAF8F5] text-[#1A1918] text-xs uppercase tracking-widest font-semibold rounded shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Inspect Specs
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C827A] block mb-1">
                      {stone.origin}
                    </span>
                    <h4 className="font-serif text-lg text-[#1A1918] group-hover:text-[#635E59] transition-colors leading-snug line-clamp-1">
                      {stone.name}
                    </h4>
                    <div className="mt-3 flex items-center gap-3 text-xs text-[#57534E]">
                      <span className="bg-[#FAF8F5] px-2 py-0.5 border border-[#EBE5DE] rounded">
                        Color: {stone.color.split(' ')[0]}
                      </span>
                      <span className="bg-[#FAF8F5] px-2 py-0.5 border border-[#EBE5DE] rounded">
                        Clarity: {stone.clarity}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                        Valuation (B2B Allocation)
                      </span>
                      <span className="font-serif text-xl font-medium text-[#1A1918]">
                        ${stone.priceUSD.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-xs text-[#C5A880] underline underline-offset-4 group-hover:text-[#1A1918]">
                      View Dossier
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
