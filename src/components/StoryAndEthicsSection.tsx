import React from 'react';
import { Globe2 } from 'lucide-react';

export const StoryAndEthicsSection: React.FC = () => {
  const sourcingRegions = [
    {
      region: 'Ratnapura Basin, Sri Lanka',
      gem: 'Unheated Ceylon Sapphires',
      pledge: 'Zero heavy machinery river dredging; exclusive support of multi-generational artisanal family pits with fair living wage guarantees.'
    },
    {
      region: 'Muzo & Chivor, Colombia',
      gem: 'Untreated & Minor-Oil Emeralds',
      pledge: 'Direct partnership with indigenous mining cooperatives adhering to reforestation mandates and non-chemical cedar oil standards.'
    },
    {
      region: 'Jwaneng & Orapa, Botswana',
      gem: 'Type IIa & High-Value Diamonds',
      pledge: 'Sourced strictly through sovereign citizen-dividend beneficiation partnerships, funding national healthcare and university infrastructure.'
    },
    {
      region: 'Ekati Mine, Northwest Territories, Canada',
      gem: 'Ethical Arctic Diamonds',
      pledge: 'Sub-zero subterranean extraction respecting First Nations community accords and 100% laser-inscribed origin certificates.'
    }
  ];

  return (
    <div className="py-12 lg:py-20 bg-[#FAF8F5] dark:bg-[#0F0E0D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Genesis Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#8C827A] dark:text-[#A69C94] font-bold">
            Our Lineage &amp; Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A1918] dark:text-[#F5F2ED] font-normal">
            YosenaMora
          </h1>
          <p className="text-base sm:text-xl text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
            Founded to bridge the historic divide between remote, ethical artisanal gem pits and the bespoke workbenches of the world&apos;s most discerning independent jewellers.
          </p>
        </div>

        {/* Two Column Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] dark:text-[#F5F2ED] leading-snug">
              Why Independent Jewellers Require a Direct Primary Ally
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
              For decades, independent ateliers were relegated to buying stones that had passed through five or six broker hands in Antwerp, Mumbai, or Idar-Oberstein—each intermediary adding speculative markup while eroding origin certainty.
            </p>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
              <strong className="font-semibold text-[#1A1918] dark:text-[#F5F2ED]">YosenaMora</strong> was established with a singular directive: operate as your in-house senior gemologist on the ground. We select rough at the pit head, oversee master European faceting, and deliver investment stones backed by unimpeachable GIA and Swiss lab monographs directly to your bench.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E1D9] dark:border-[#262320] text-xs sm:text-sm">
              <div className="p-4 bg-[#FFFFFF] dark:bg-[#181614] rounded border border-[#E8E1D9] dark:border-[#262320]">
                <span className="font-serif text-3xl font-bold text-[#1A1918] dark:text-[#F5F2ED] block">0%</span>
                <span className="text-[#78716C] dark:text-[#A69C94] font-medium">Synthetic or treated stone tolerance</span>
              </div>
              <div className="p-4 bg-[#FFFFFF] dark:bg-[#181614] rounded border border-[#E8E1D9] dark:border-[#262320]">
                <span className="font-serif text-3xl font-bold text-[#1A1918] dark:text-[#F5F2ED] block">100%</span>
                <span className="text-[#78716C] dark:text-[#A69C94] font-medium">Chain of custody from pit to vault</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-[#D5CDC4] dark:border-[#2A2724] bg-[#1A1918] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
                alt="Gemstone sorting and grading"
                className="w-full h-[420px] object-cover filter contrast-105"
              />
            </div>
          </div>
        </div>

        {/* Ethical Sourcing Charter */}
        <div className="bg-[#FFFFFF] dark:bg-[#181614] border border-[#E8E1D9] dark:border-[#262320] rounded-xl p-8 sm:p-12 mb-16 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C5A880] font-bold">
              The Ethical Charter
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1918] dark:text-[#F5F2ED]">
              Ethical Sourcing &amp; Quality Assurance Protocol
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] font-light">
              Full adherence to OECD Due Diligence Guidance and the World Diamond Council System of Warranties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sourcingRegions.map((item, idx) => (
              <div key={idx} className="p-5 bg-[#FAF8F5] dark:bg-[#121110] rounded-lg border border-[#EBE5DE] dark:border-[#262320] space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1918] dark:text-[#F5F2ED]">
                  <Globe2 className="w-4 h-4 text-[#C5A880]" />
                  <span>{item.region}</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 bg-[#FFFFFF] dark:bg-[#181614] border border-[#E0D8CE] dark:border-[#332F2B] text-xs uppercase font-bold text-[#8C6D44] dark:text-[#C5A880] rounded">
                  {item.gem}
                </span>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
                  {item.pledge}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-[#141413] dark:bg-[#0A0908] text-[#FAF8F5] rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 border border-[#2E2C2A] dark:border-[#22201D] shadow-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold">
            Direct Trade Advisory
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl">
            Partner With YosenaMora For Your Next Collection
          </h3>
          <p className="text-xs sm:text-base text-[#A8A29E] font-light max-w-lg mx-auto leading-relaxed">
            Reach our Senior Gemological Desk in London or Geneva to request private vault viewings or custom rough parcel evaluations.
          </p>
          <div className="pt-2">
            <a
              href="mailto:consult@yosenamora.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF8F5] text-[#141413] hover:bg-[#E2DDD6] rounded text-xs sm:text-sm uppercase tracking-wider font-bold transition-colors shadow-lg cursor-pointer"
            >
              Contact consult@yosenamora.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
