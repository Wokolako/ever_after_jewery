import React, { useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Layers, ShieldCheck, Gem, BookOpen, Calendar, ShoppingBag, Info, ArrowRight } from 'lucide-react';

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
        className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl border border-[#D5CDC4] shadow-2xl overflow-hidden my-6 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E1D9] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1A1918] text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A1918]">
                Website Architecture, Features &amp; Strategy Breakdown
              </h2>
              <p className="text-xs text-[#78716C] font-sans">
                Somuchaura / YosenaMora Atelier Platform Analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#57534E] hover:text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Explanations */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10 text-[#44403C] text-xs sm:text-sm">
          
          {/* Section 1: Overall Purpose & Visual Feel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9]">
              <Gem className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#1A1918]">
                1. Overall Purpose, Market Positioning &amp; Visual Tone
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#E8E1D9] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#8C827A] font-bold block">
                  Business Model
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>Consultant &amp; High-Value Gemstone Supplier:</strong> Serves independent master goldsmiths, private bespoke ateliers, and discerning jewelry designers who need investment-grade diamonds and untreated colored gems without intermediary broker markups.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#E8E1D9] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#8C827A] font-bold block">
                  Aesthetic Palette
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>Warm Ivory &amp; Noir Charcoal:</strong> Grounded in warm ivory (<code className="bg-[#FAF8F5] px-1 py-0.5 rounded text-[11px]">#FAF8F5</code>) and deep charcoal (<code className="bg-[#FAF8F5] px-1 py-0.5 rounded text-[11px]">#141413</code>). Evokes heritage European private vault rooms (Hatton Garden &amp; Genève) rather than gaudy mass-market retail.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Home Page Anatomy & Introduction */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9]">
              <Layers className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#1A1918]">
                2. Home Page Anatomy &amp; Introduction Breakdown
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1918]">Hero / First Section (Brand Wordmark &amp; Monogram)</span>
                  <span className="text-[10px] uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E1D9] text-[#C5A880] font-bold">Main Impression</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Features the stylized wordmark <strong>&ldquo;Somuchaura.&rdquo;</strong> with the abstract monogram letters <strong>&ldquo;S • N • M • R&rdquo;</strong> over a dark gemstone visual. In this live app, you can toggle between <em>Mode A (Clear &amp; Authoritative headline)</em> and <em>Mode B (Minimal &amp; Mysterious luxury aura)</em>.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1918]">Second Section (&ldquo;yosenamora&rdquo; &amp; &ldquo;All our diamonds, worth millions.&rdquo;)</span>
                  <span className="text-[10px] uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E1D9] text-[#1A1918] font-bold">Market Anchoring</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Immediately positions the firm in the apex tier of seven-figure diamonds (Type IIa D Flawless, Argyle pinks, and investment collection gems).
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1918]">Third Section (The 3 Scaffolding Containers)</span>
                  <span className="text-[10px] uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E1D9] text-[#1A1918] font-bold">B2B Trust Pillars</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Now populated with the essential B2B jeweller assurances: Direct Primary Allocation, Dual GIA/Gübelin Monograph verification, and 14-Day Risk-Free Consignment Memos.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1918]">Fourth Section (&ldquo;Polished, clean, minted!&rdquo;)</span>
                  <span className="text-[10px] uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E1D9] text-[#1A1918] font-bold">Quality Covenant</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Combines the memorable quality punchline with an interactive 3-point macro inspection showing zero synthetic filler, exact millimeter tolerances, and laser girdle inscriptions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Installed Apps Equivalent Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E8E1D9]">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#1A1918]">
                3. Full Suite of Features &amp; Installed Apps Capabilities
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1918]">
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Selling &amp; Products (Wix Stores Stack)</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Full dynamic catalog with category filters, carat/cut/lab sorting, 360° rotation simulation, Avalara tax calculation, coupons (<code className="bg-[#FAF8F5] px-1 py-0.5 rounded text-[10px]">JEWELLER10</code>), and armored courier dispatch (Malca-Amit, Ferrari, USPS RTC).
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1918]">
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Services &amp; Consultations (Wix Bookings)</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Interactive booking calendar with 3 service tiers (Vault viewing in London/Genève, virtual 45-min gem curation, and custom lapidary commission) with real-time date/slot reservation and confirmation receipts.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1918]">
                  <BookOpen className="w-4 h-4 text-[#C5A880]" />
                  <span>Authority &amp; Content (Wix Blog)</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  The Somuchaura Gazette editorial system providing scholarly education on GIA provenance, unheated corundum valuation multipliers, and Type IIa atomic purity.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1918]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Members Area &amp; B2B Memo Portal</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Dedicated Jeweller Member Vault tracking saved stones, 14-day active consignment memos with countdowns, and alert preferences for rare rough drops.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Strategic Recommendations for Introduction */}
          <div className="bg-[#141413] text-[#FAF8F5] p-6 sm:p-8 rounded-xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
              Introduction Strategy Evaluation
            </span>
            <h4 className="font-serif text-2xl">
              Mode A (Clear &amp; Authoritative) vs. Mode B (Minimal &amp; Mysterious)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#A8A29E] leading-relaxed pt-2">
              <div className="space-y-2">
                <strong className="text-[#FAF8F5] block">Why Mode A works best for B2B Conversion:</strong>
                <p>
                  Independent jewellers have limited time and high risk aversion. Explicitly stating &ldquo;Consultant &amp; Verified Ethical Gemstone Supplier for Independent Master Jewellers&rdquo; instantly tells them who you are, filters out retail hobbyists, and clarifies that you provide trade terms (14-day memos, GIA monographs).
                </p>
              </div>
              <div className="space-y-2">
                <strong className="text-[#FAF8F5] block">When to use Mode B:</strong>
                <p>
                  If your brand positions primarily as an invite-only private salon for sovereign family offices where mystery builds prestige. In the app&apos;s Hero banner, you can click either button to test this aesthetic in real time!
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E1D9] bg-[#FFFFFF] flex justify-between items-center text-xs">
          <span className="text-[#78716C]">Inquiries: consult@yosenamora.com</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1918] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#33312E] transition-colors cursor-pointer"
          >
            Explore Live Platform
          </button>
        </div>

      </div>
    </div>
  );
};
