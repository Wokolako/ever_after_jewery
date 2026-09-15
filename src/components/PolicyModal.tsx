import React, { useEffect } from 'react';
import { POLICY_CONTENTS } from '../data/content';
import { PolicyType } from '../types';
import { X, ShieldCheck, FileText, Mail } from 'lucide-react';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  // Close on Escape and lock background scroll while the policy is open.
  useEffect(() => {
    if (!policyType) return;
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
  }, [policyType, onClose]);

  if (!policyType) return null;

  const policy = POLICY_CONTENTS[policyType] || {
    title: 'Policy Document',
    subtitle: 'Legal & Regulatory Compliance',
    sections: []
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={policy.title}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-2xl rounded-xl border border-[#D5CDC4] shadow-2xl overflow-hidden my-8 relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E1D9] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8C827A]">
              Legal Filing &amp; Compliance
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#57534E] hover:text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E8E1D9] pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918]">
              {policy.title}
            </h2>
            <p className="text-xs text-[#78716C] mt-1 font-light">
              {policy.subtitle}
            </p>
          </div>

          <div className="space-y-6 text-xs text-[#44403C] leading-relaxed font-light">
            {policy.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-serif text-base text-[#1A1918] font-semibold">
                  {section.heading}
                </h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg text-xs space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block font-semibold">
              Regulatory Queries &amp; Compliance Officer
            </span>
            <p className="text-[#57534E]">
              Direct contact regarding provenance, custom ATA Carnets, or legal governance:
            </p>
            <a
              href="mailto:consult@yosenamora.com"
              className="text-[#1A1918] font-semibold hover:text-[#C5A880] flex items-center gap-1 underline"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> consult@yosenamora.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E8E1D9] bg-[#FFFFFF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#33312E] transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
