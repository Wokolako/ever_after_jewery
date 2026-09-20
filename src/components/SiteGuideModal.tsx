import React, { useEffect } from 'react';
import { X, Sparkles, Layers, ShoppingBag, Gem, BookOpen, Calendar, ShieldCheck } from 'lucide-react';

interface SiteGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiteGuideModal: React.FC<SiteGuideModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape and lock background scroll while the guide is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Website architecture and features guide"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
    >
      <div 
        className="bg-[#FAF8F5] dark:bg-[#121110] w-full max-w-4xl rounded-2xl border border-[#D5CDC4] dark:border-[#2C2926] shadow-2xl overflow-hidden my-6 relative max-h-[92vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E1D9] dark:border-[#262320] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#181614]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1918] dark:bg-[#FAF8F5] text-[#C5A880] dark:text-[#1A1918] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A1918] dark:text-[#F5F2ED]">
                Website Architecture, Features &amp; Strategy Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] font-sans font-medium">
                YosenaMora Atelier Platform Analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#57534E] dark:text-[#D5CDC4] hover:text-[#1A1918] dark:hover:text-[#F5F2ED] hover:bg-[#F2ECE4] dark:hover:bg-[#23201D] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Explanations */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10 text-[#44403C] dark:text-[#D5CDC4] text-xs sm:text-sm">
          
          {/* Section 1: Overall Purpose & Visual Feel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9] dark:border-[#262320]">
              <Gem className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1918] dark:text-[#F5F2ED]">
                1. Overall Purpose, Market Positioning &amp; Visual Tone
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] dark:bg-[#181614] p-5 rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#8C827A] dark:text-[#A69C94] font-bold block">
                  Business Model
                </span>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong className="font-semibold text-[#1A1918] dark:text-[#F5F2ED]">Consultant &amp; High-Value Gemstone Supplier:</strong> Serves independent master goldsmiths, private bespoke ateliers, and discerning jewelry designers who need investment-grade diamonds and untreated colored gems without intermediary broker markups.
                </p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#181614] p-5 rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#8C827A] dark:text-[#A69C94] font-bold block">
                  Aesthetic Palette &amp; Theme Support
                </span>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong className="font-semibold text-[#1A1918] dark:text-[#F5F2ED]">Adaptive Light / System / Dark Modes:</strong> Grounded in warm ivory (<code className="bg-[#FAF8F5] dark:bg-[#23201D] px-1.5 py-0.5 rounded text-xs font-mono">#FAF8F5</code>) and deep vault noir (<code className="bg-[#FAF8F5] dark:bg-[#23201D] px-1.5 py-0.5 rounded text-xs font-mono">#0F0E0D</code>). Evokes heritage European private vault rooms (Hatton Garden &amp; Genève).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Home Page Anatomy & Introduction */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9] dark:border-[#262320]">
              <Layers className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1918] dark:text-[#F5F2ED]">
                2. Home Page Anatomy &amp; Introduction Breakdown
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1918] dark:text-[#F5F2ED]">Hero / First Section (Brand Wordmark)</span>
                  <span className="text-xs uppercase bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 rounded border border-[#E8E1D9] dark:border-[#38332E] text-[#C5A880] font-bold">Main Impression</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Leads with the stylized wordmark <strong>&ldquo;YosenaMora.&rdquo;</strong> set against a dark gemstone visual. The introduction stays in a single <em>Minimal &amp; Mysterious</em> register — a restrained serif epigraph, a plain-spoken sourcing line, and a private vault allocation footer — rather than an explanatory headline.
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1918] dark:text-[#F5F2ED]">Second Section (&ldquo;yosenamora&rdquo; &amp; &ldquo;All our diamonds, worth millions.&rdquo;)</span>
                  <span className="text-xs uppercase bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 rounded border border-[#E8E1D9] dark:border-[#38332E] text-[#1A1918] dark:text-[#F5F2ED] font-bold">Market Anchoring</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Immediately positions the firm in the apex tier of seven-figure diamonds (Type IIa D Flawless, Argyle pinks, and investment collection gems).
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1918] dark:text-[#F5F2ED]">Third Section (The 3 Scaffolding Containers)</span>
                  <span className="text-xs uppercase bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 rounded border border-[#E8E1D9] dark:border-[#38332E] text-[#1A1918] dark:text-[#F5F2ED] font-bold">B2B Trust Pillars</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Now populated with the essential B2B jeweller assurances: Direct Primary Allocation, Dual GIA/Gübelin Monograph verification, and 14-Day Risk-Free Consignment Memos.
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1918] dark:text-[#F5F2ED]">Fourth Section (&ldquo;Polished, clean, minted!&rdquo;)</span>
                  <span className="text-xs uppercase bg-[#FAF8F5] dark:bg-[#23201D] px-2.5 py-1 rounded border border-[#E8E1D9] dark:border-[#38332E] text-[#1A1918] dark:text-[#F5F2ED] font-bold">Quality Covenant</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Combines the memorable quality punchline with an interactive 3-point macro inspection showing zero synthetic filler, exact millimeter tolerances, and laser girdle inscriptions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Installed Apps Equivalent Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9] dark:border-[#262320]">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1918] dark:text-[#F5F2ED]">
                3. Full Suite of Features &amp; Installed Apps Capabilities
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1918] dark:text-[#F5F2ED]">
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Selling &amp; Products (Wix Stores Stack)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Full dynamic catalog with category filters, carat/cut/lab sorting, 360° rotation simulation, Avalara tax calculation, coupons (<code className="bg-[#FAF8F5] dark:bg-[#23201D] px-1 py-0.5 rounded text-xs font-mono">JEWELLER10</code>), and armored courier dispatch (Malca-Amit, Ferrari, USPS RTC).
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1918] dark:text-[#F5F2ED]">
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Services &amp; Consultations (Wix Bookings)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Interactive booking calendar with 3 service tiers (Vault viewing in London/Genève, virtual 45-min gem curation, and custom lapidary commission) with real-time date/slot reservation and confirmation receipts.
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1918] dark:text-[#F5F2ED]">
                  <BookOpen className="w-4 h-4 text-[#C5A880]" />
                  <span>Authority &amp; Content (Wix Blog)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  The YosenaMora Gazette editorial system providing scholarly education on GIA provenance, unheated corundum valuation multipliers, and Type IIa atomic purity. Reached from a story carousel low on the home page and from the footer, keeping the header nav on the commercial path.
                </p>
              </div>

              <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] rounded-lg border border-[#E8E1D9] dark:border-[#262320] space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A1918] dark:text-[#F5F2ED]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Members Area &amp; B2B Memo Portal</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D5CDC4] leading-relaxed">
                  Dedicated Jeweller Member Vault tracking saved stones, 14-day active consignment memos with countdowns, and alert preferences for rare rough drops.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Introduction Strategy */}
          <div className="bg-[#FFFFFF] dark:bg-[#0A0908] text-[#1A1918] dark:text-[#FAF8F5] p-6 sm:p-8 rounded-xl space-y-4 border border-[#E8E1D9] dark:border-[#22201D] shadow-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D44] dark:text-[#C5A880] font-bold">
              Introduction Strategy
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-normal">
              A Single Register: Minimal &amp; Mysterious
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed pt-2">
              <div className="space-y-2">
                <strong className="text-[#1A1918] dark:text-[#FAF8F5] block font-semibold text-sm">Why the restrained opening:</strong>
                <p>
                  YosenaMora positions as an invite-only private salon for sovereign family offices and master jewellers, where restraint builds prestige. The serif epigraph and the &ldquo;Private Vault Allocation&rdquo; line signal discretion rather than explaining the offer.
                </p>
              </div>
              <div className="space-y-2">
                <strong className="text-[#1A1918] dark:text-[#FAF8F5] block font-semibold text-sm">Where the specifics live:</strong>
                <p>
                  The trade credentials that independent jewellers need — GIA &amp; Gübelin dual monographs, 14-day memo inspection, direct artisanal co-op sourcing — sit immediately beneath the hero as micro trust proofs, so nothing is lost to the quieter headline.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E1D9] dark:border-[#262320] bg-[#FFFFFF] dark:bg-[#181614] flex justify-between items-center text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94]">
          <span>Inquiries: consult@yosenamora.com</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1918] dark:bg-[#F5F2ED] text-[#FAF8F5] dark:text-[#1A1918] rounded text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-[#33312E] dark:hover:bg-[#E3DDD4] transition-colors cursor-pointer"
          >
            Explore Live Platform
          </button>
        </div>

      </div>
    </div>
  );
};
