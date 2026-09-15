import React from 'react';
import { PageView, PolicyType } from '../types';
import { 
  Mail, 
  ShieldCheck, 
  Globe2, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  ArrowUpRight 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenPolicy: (policy: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  return (
    <footer className="bg-[#141413] text-[#FAF8F5] border-t border-[#2C2B29] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#292826]">
          
          {/* Brand & Ethical Sourcing Statement */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="font-serif text-3xl tracking-[0.18em] block text-[#FAF8F5]">
                SOMUCHAURA
              </span>
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#C5A880] uppercase -mt-0.5 block">
                YosenaMora Atelier
              </span>
            </div>

            {/* Sourcing Statement from Prompt */}
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed max-w-md">
              Somuchaura sources exclusively from verified ethical artisanal cooperatives and certified industrial extraction partners. Guaranteed untreated corundum, zero conflict financing, and direct primary allocation for independent fine jewellers.
            </p>

            {/* Direct Contact Email */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1">
                Direct Atelier Consultation &amp; Memo Desk
              </span>
              <a
                href="mailto:consult@yosenamora.com"
                className="font-serif text-lg text-[#FAF8F5] hover:text-[#C5A880] transition-colors flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>consult@yosenamora.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#C5A880] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              Atelier Portals
            </span>
            <ul className="space-y-2.5 text-xs text-[#D6D3D1]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Home &amp; Curation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Haute Gemstone Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookings')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Book Private Vault Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote-calc')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  B2B Wholesale Parcel Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  The Somuchaura Gazette (Journal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vault')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Jeweller Member Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Filing Menu from Prompt */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              Legal Filing &amp; Compliance
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A8A29E]">
              <li>
                <button
                  onClick={() => onOpenPolicy('ethical-sourcing')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Ethical Sourcing &amp; QA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping-returns')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Shipping, Delivery &amp; Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('cookies')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('legal-notice')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Legal Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('accessibility')}
                  className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                >
                  Accessibility Statement
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-[#78716C] font-light">
              Registered with London Diamond Bourse &amp; Swiss Gemmological Society (SGG).
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>
            &copy; {new Date().getFullYear()} Somuchaura Atelier &amp; YosenaMora Ltd. All rights reserved.
          </p>

          {/* Social Bar */}
          <div className="flex items-center space-x-4 text-[#A8A29E]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FAF8F5] transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#FAF8F5] transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#FAF8F5] transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#FAF8F5] transition-colors" title="Twitter / X">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
