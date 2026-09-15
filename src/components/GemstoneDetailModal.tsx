import React, { useState, useEffect } from 'react';
import { Gemstone } from '../types';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Award, 
  FileText, 
  Maximize2, 
  Check, 
  Mail, 
  Truck,
  RotateCw
} from 'lucide-react';

interface GemstoneDetailModalProps {
  gemstone: Gemstone | null;
  onClose: () => void;
  onAddToCart: (stone: Gemstone) => void;
  isSaved: boolean;
  onToggleSave: (stoneId: string) => void;
}

export const GemstoneDetailModal: React.FC<GemstoneDetailModalProps> = ({
  gemstone,
  onClose,
  onAddToCart,
  isSaved,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'certificate' | 'memo-terms'>('specs');
  const [zoomMacro, setZoomMacro] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Close on Escape and lock background scroll while the dossier is open.
  useEffect(() => {
    if (!gemstone) return;
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
  }, [gemstone, onClose]);

  if (!gemstone) return null;

  const handleAdd = () => {
    onAddToCart(gemstone);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gemstone dossier: ${gemstone.name}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-4xl rounded-xl border border-[#D5CDC4] shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E8E1D9] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8C827A]">
              Vault Reference #{gemstone.certNumber}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E0D8CE] text-[10px] uppercase font-semibold text-[#1A1918]">
              {gemstone.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#57534E] hover:text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Visual Presentation with Macro & Rotation */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-[#D5CDC4] bg-[#141413] h-[340px] flex items-center justify-center">
                <img
                  src={gemstone.image}
                  alt={gemstone.name}
                  style={{ transform: `rotate(${rotationAngle}deg) scale(${zoomMacro ? 1.6 : 1})` }}
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Interactive Controls Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRotate}
                      className="px-2.5 py-1 bg-[#1A1918]/80 hover:bg-[#1A1918] text-[#FAF8F5] rounded border border-[#3E3B38] flex items-center gap-1 text-[10px] uppercase tracking-wider backdrop-blur cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" /> Rotate 90°
                    </button>
                    <button
                      onClick={() => setZoomMacro(!zoomMacro)}
                      className={`px-2.5 py-1 rounded border flex items-center gap-1 text-[10px] uppercase tracking-wider backdrop-blur cursor-pointer ${
                        zoomMacro 
                          ? 'bg-[#C5A880] text-[#141413] font-bold border-[#C5A880]' 
                          : 'bg-[#1A1918]/80 hover:bg-[#1A1918] text-[#FAF8F5] border-[#3E3B38]'
                      }`}
                    >
                      <Maximize2 className="w-3 h-3" /> {zoomMacro ? '40x Active' : '40x Macro'}
                    </button>
                  </div>
                  <span className="bg-[#FAF8F5]/90 text-[#1A1918] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {gemstone.certification} Verified
                  </span>
                </div>
              </div>

              {/* Lab Certification Banner */}
              <div className="p-3 bg-[#FFFFFF] border border-[#E8E1D9] rounded flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="font-semibold text-[#1A1918]">{gemstone.certification} Laboratory Certificate</span>
                    <p className="text-[11px] text-[#78716C]">Dossier ID: {gemstone.certNumber}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('certificate')}
                  className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#1A1918] underline font-medium cursor-pointer"
                >
                  Inspect Certificate
                </button>
              </div>
            </div>

            {/* Right Column: Key Details & Pricing */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C827A] mb-1">
                  <span>{gemstone.category}</span>
                  <span>•</span>
                  <span>{gemstone.origin}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918] leading-tight">
                  {gemstone.name}
                </h2>
                <p className="text-xs text-[#57534E] font-light mt-2 leading-relaxed">
                  {gemstone.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 p-4 bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                        Wholesale Atelier Valuation
                      </span>
                      <span className="font-serif text-3xl font-medium text-[#1A1918]">
                        ${gemstone.priceUSD.toLocaleString()} USD
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                        Unit Rate
                      </span>
                      <span className="text-sm font-medium text-[#57534E]">
                        ${gemstone.pricePerCarat.toLocaleString()} / ct
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Spec Highlights */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E8E1D9] rounded">
                    <span className="text-[10px] text-[#8C827A] uppercase block">Carat Weight</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.carat} carats</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E8E1D9] rounded">
                    <span className="text-[10px] text-[#8C827A] uppercase block">Dimensions</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.dimensions}</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E8E1D9] rounded">
                    <span className="text-[10px] text-[#8C827A] uppercase block">Color Grade</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.color}</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E8E1D9] rounded">
                    <span className="text-[10px] text-[#8C827A] uppercase block">Clarity Grade</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.clarity}</span>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3.5 px-4 rounded text-xs uppercase tracking-[0.15em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      addedSuccess
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#1A1918] hover:bg-[#33312E] text-[#FAF8F5]'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Order / Memo
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Order / Memo
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleSave(gemstone.id)}
                    className={`py-3.5 px-4 rounded text-xs uppercase tracking-[0.15em] font-semibold border transition-all cursor-pointer ${
                      isSaved
                        ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#8C6D44]'
                        : 'border-[#D5CDC4] bg-[#FFFFFF] text-[#1A1918] hover:border-[#1A1918]'
                    }`}
                  >
                    {isSaved ? '★ Saved in Vault' : '☆ Save to Vault'}
                  </button>
                </div>

                <a
                  href={`mailto:consult@yosenamora.com?subject=Inquiry for Gemstone Reference ${gemstone.certNumber} (${gemstone.name})`}
                  className="w-full py-2.5 px-4 text-center text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1A1918] border border-dashed border-[#D5CDC4] rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Email Atelier Desk (consult@yosenamora.com)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tabbed In-Depth Information */}
          <div className="border-t border-[#E8E1D9] pt-6">
            <div className="flex border-b border-[#E8E1D9] space-x-6 text-xs uppercase tracking-wider font-medium">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'specs' ? 'text-[#1A1918] font-bold border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
                }`}
              >
                Comprehensive Gemological Analysis
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'certificate' ? 'text-[#1A1918] font-bold border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
                }`}
              >
                {gemstone.certification} Official Dossier
              </button>
              <button
                onClick={() => setActiveTab('memo-terms')}
                className={`pb-3 relative cursor-pointer ${
                  activeTab === 'memo-terms' ? 'text-[#1A1918] font-bold border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
                }`}
              >
                14-Day Memo &amp; Armored Dispatch
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3 bg-[#FFFFFF] p-4 rounded border border-[#E8E1D9]">
                  <h4 className="font-serif text-sm text-[#1A1918] font-semibold border-b border-[#F2ECE4] pb-2">
                    Physical &amp; Optical Properties
                  </h4>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Shape &amp; Cutting Style:</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.shape} Step / Brilliant Facets</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Exact Millimeters:</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Treatment Classification:</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.treatment}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8C827A]">Polish / Symmetry:</span>
                    <span className="font-medium text-[#1A1918]">Excellent / Excellent</span>
                  </div>
                </div>

                <div className="space-y-3 bg-[#FFFFFF] p-4 rounded border border-[#E8E1D9]">
                  <h4 className="font-serif text-sm text-[#1A1918] font-semibold border-b border-[#F2ECE4] pb-2">
                    Provenance &amp; Ethical Chain
                  </h4>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Geographic Origin:</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.origin}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Mine Integrity Protocol:</span>
                    <span className="font-medium text-[#1A1918]">OECD Due Diligence Compliant</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F5EFE8]">
                    <span className="text-[#8C827A]">Custody Ledger:</span>
                    <span className="font-medium text-[#1A1918]">Single-Owner Atelier Batch</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8C827A]">Laser Inscription:</span>
                    <span className="font-medium text-[#1A1918]">{gemstone.certNumber}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Certificate */}
            {activeTab === 'certificate' && (
              <div className="pt-6 bg-[#FFFFFF] p-6 rounded border border-[#E8E1D9] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E1D9] pb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#C5A880]" />
                    <div>
                      <h4 className="font-serif text-base text-[#1A1918]">
                        Official Gemological Institute Monograph
                      </h4>
                      <p className="text-xs text-[#78716C]">
                        Accredited Laboratory: {gemstone.certification} • Registration: {gemstone.certNumber}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Database Authenticated
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D9] rounded font-mono text-xs space-y-1 text-[#44403C]">
                  <p>CERTIFICATE NUMBER: {gemstone.certNumber}</p>
                  <p>SPECIES / VARIETY: Natural {gemstone.category}</p>
                  <p>WEIGHT: {gemstone.carat} ct</p>
                  <p>MEASUREMENTS: {gemstone.dimensions}</p>
                  <p>COLOR: {gemstone.color}</p>
                  <p>CLARITY: {gemstone.clarity}</p>
                  <p>ORIGIN OPINION: {gemstone.origin}</p>
                  <p>COMMENTS: No indications of heating or optical enhancement observed.</p>
                </div>

                <p className="text-xs text-[#78716C] italic font-light">
                  A high-resolution sealed copy with holographic tamper seal is dispatched alongside the physical stone via armored courier.
                </p>
              </div>
            )}

            {/* Tab 3: Memo Terms */}
            {activeTab === 'memo-terms' && (
              <div className="pt-6 bg-[#FFFFFF] p-6 rounded border border-[#E8E1D9] space-y-4 text-xs text-[#57534E]">
                <div className="flex items-center gap-3 text-[#1A1918]">
                  <Truck className="w-5 h-5 text-[#C5A880]" />
                  <h4 className="font-serif text-base font-semibold">
                    14-Day Atelier Consignment &amp; Armored Dispatch
                  </h4>
                </div>
                <p className="font-light leading-relaxed">
                  Verified independent jewellers can request this gemstone on a 14-calendar-day approval memo to present to private commission clients or fit against physical wax models.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D9] rounded">
                    <span className="font-semibold text-[#1A1918] block">Fully Insured</span>
                    <span className="text-[11px] text-[#78716C]">100% underwriters coverage via Malca-Amit &amp; Ferrari.</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D9] rounded">
                    <span className="font-semibold text-[#1A1918] block">Zero Restocking Fee</span>
                    <span className="text-[11px] text-[#78716C]">Full credit refund if returned in sealed tamper box within 14 days.</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D9] rounded">
                    <span className="font-semibold text-[#1A1918] block">B2B Wire / Invoicing</span>
                    <span className="text-[11px] text-[#78716C]">Flexible settlement options including Net-30 for vetted partners.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E8E1D9] bg-[#FFFFFF] flex items-center justify-between text-xs text-[#78716C]">
          <span>Somuchaura / YosenaMora Atelier • London &amp; Genève</span>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-[#1A1918] hover:text-[#C5A880] font-semibold cursor-pointer"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
