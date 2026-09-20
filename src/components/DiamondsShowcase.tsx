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
    <section className="py-20 lg:py-28 bg-[#FAF8F5] dark:bg-[#0F0E0D] border-b border-[#E8E1D9] dark:border-[#262320] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 2 Header: "yosenamora" & "All our diamonds, worth millions." */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8C827A] dark:text-[#A69C94] font-bold">
            yosenamora
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1918] dark:text-[#F5F2ED] font-normal tracking-tight">
            All our diamonds, worth millions.
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A880] mx-auto my-4" />
          <p className="text-[#57534E] dark:text-[#D5CDC4] text-base sm:text-lg font-light leading-relaxed">
            Positioned at the highest echelon of the global gemstone market. We curate single-owner, investment-grade diamonds and ultra-rare unheated colored gems for sovereign clients and independent ateliers.
          </p>
        </div>

        {/* Section 3: The 3 Scaffolding Containers (Process, Benefits & B2B Trust) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-[#FFFFFF] dark:bg-[#181614] border border-[#EBE5DE] dark:border-[#282421] p-8 rounded-lg shadow-sm hover:border-[#C5A880] dark:hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-[#23201D] border border-[#E5DFD7] dark:border-[#38332E] flex items-center justify-center text-[#1A1918] dark:text-[#F5F2ED] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] dark:group-hover:bg-[#C5A880] dark:group-hover:text-[#141413] transition-colors">
              <Gem className="w-5 h-5 text-[#C5A880] group-hover:text-inherit" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A] dark:text-[#A69C94] font-bold block mb-2">
              01 • Allocation
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] dark:text-[#F5F2ED] mb-3 font-normal">
              Direct Primary Allocation
            </h3>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#C4BCB3] leading-relaxed font-light">
              Secured directly from vetted African and Canadian artisanal operators and historical European estate vaults, eliminating the 30-45% intermediary broker inflation.
            </p>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#181614] border border-[#EBE5DE] dark:border-[#282421] p-8 rounded-lg shadow-sm hover:border-[#C5A880] dark:hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-[#23201D] border border-[#E5DFD7] dark:border-[#38332E] flex items-center justify-center text-[#1A1918] dark:text-[#F5F2ED] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] dark:group-hover:bg-[#C5A880] dark:group-hover:text-[#141413] transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#C5A880] group-hover:text-inherit" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A] dark:text-[#A69C94] font-bold block mb-2">
              02 • Dual Verification
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] dark:text-[#F5F2ED] mb-3 font-normal">
              GIA &amp; Swiss Monographs
            </h3>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#C4BCB3] leading-relaxed font-light">
              Every stone is accompanied by exhaustive dual laboratory dossiers (GIA, Gübelin, or SSEF) certifying geographic provenance, absence of thermal enhancement, and chemical purity.
            </p>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#181614] border border-[#EBE5DE] dark:border-[#282421] p-8 rounded-lg shadow-sm hover:border-[#C5A880] dark:hover:border-[#C5A880] transition-colors relative group">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-[#23201D] border border-[#E5DFD7] dark:border-[#38332E] flex items-center justify-center text-[#1A1918] dark:text-[#F5F2ED] mb-6 group-hover:bg-[#1A1918] group-hover:text-[#FAF8F5] dark:group-hover:bg-[#C5A880] dark:group-hover:text-[#141413] transition-colors">
              <Scale className="w-5 h-5 text-[#C5A880] group-hover:text-inherit" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A] dark:text-[#A69C94] font-bold block mb-2">
              03 • Jeweller Flexibility
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] dark:text-[#F5F2ED] mb-3 font-normal">
              14-Day Consignment Memo
            </h3>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#C4BCB3] leading-relaxed font-light">
              Present high-value center stones to your private bespoke collectors with complete peace of mind. We dispatch on fully insured memo terms with no upfront capital commitment.
            </p>
          </div>

        </div>

        {/* Featured High-Value Stones Showcase Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD7] dark:border-[#262320] pb-4">
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C827A] dark:text-[#A69C94] font-bold">
                Vault Selection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1918] dark:text-[#F5F2ED]">
                Representative High-Value Diamonds &amp; Rare Gems
              </h3>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#1A1918] dark:text-[#F5F2ED] hover:text-[#C5A880] dark:hover:text-[#C5A880] flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
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
                className="bg-[#FFFFFF] dark:bg-[#181614] rounded-lg overflow-hidden border border-[#E8E1D9] dark:border-[#262320] hover:border-[#1A1918] dark:hover:border-[#C5A880] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-[#1E1D1B]">
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/95 dark:bg-[#121110]/95 backdrop-blur px-3 py-1 rounded text-xs uppercase tracking-wider font-bold text-[#1A1918] dark:text-[#F5F2ED] shadow-sm">
                    {stone.shape} • {stone.carat} ct
                  </div>
                  <div className="absolute top-3 right-3 bg-[#1A1918] dark:bg-[#C5A880] text-[#FAF8F5] dark:text-[#141413] px-2.5 py-1 rounded text-xs uppercase tracking-wider font-bold shadow-sm">
                    {stone.certification}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#FAF8F5] text-[#1A1918] text-xs uppercase tracking-widest font-bold rounded shadow-md flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> Inspect Specs
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8C827A] dark:text-[#A69C94] font-semibold block mb-1">
                      {stone.origin}
                    </span>
                    <h4 className="font-serif text-xl text-[#1A1918] dark:text-[#F5F2ED] group-hover:text-[#635E59] dark:group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1">
                      {stone.name}
                    </h4>
                    <div className="mt-3 flex items-center gap-2.5 text-xs font-medium text-[#57534E] dark:text-[#D5CDC4]">
                      <span className="bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 border border-[#EBE5DE] dark:border-[#332F2B] rounded">
                        Color: {stone.color.split(' ')[0]}
                      </span>
                      <span className="bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 border border-[#EBE5DE] dark:border-[#332F2B] rounded">
                        Clarity: {stone.clarity}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F2ECE4] dark:border-[#262320] flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C827A] dark:text-[#A69C94] font-medium block">
                        Valuation (B2B Allocation)
                      </span>
                      <span className="font-serif text-2xl font-semibold text-[#1A1918] dark:text-[#F5F2ED]">
                        ${stone.priceUSD.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#C5A880] font-bold underline underline-offset-4 group-hover:text-[#1A1918] dark:group-hover:text-[#F5F2ED]">
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
