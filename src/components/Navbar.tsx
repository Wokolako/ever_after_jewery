import React from 'react';
import { PageView } from '../types';
import { 
  ShoppingBag, 
  User, 
  Calendar, 
  BookOpen, 
  Calculator, 
  ShieldCheck, 
  Info,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  openCart: () => void;
  openSiteGuide: () => void;
  openVault: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openSiteGuide,
  openVault,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Full descriptive labels for the mobile dropdown menu (more horizontal room there).
  const navLinks: { id: PageView; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Atelier Home' },
    { id: 'shop', label: 'Haute Gemstones' },
    { id: 'bookings', label: 'Private Consultations' },
    { id: 'quote-calc', label: 'Wholesale Quotes' },
    { id: 'blog', label: 'Journal & Insights' },
    { id: 'story', label: 'Our Story & Ethics' },
  ];

  // Shorter labels for the desktop nav row, which has to share space with the
  // logo and action icons inside the max-w-7xl header — the full labels above
  // are too wide to fit at any viewport width without overflowing.
  const desktopNavLabels: Partial<Record<PageView, string>> = {
    home: 'Home',
    shop: 'Gemstones',
    bookings: 'Consultations',
    'quote-calc': 'Wholesale',
    blog: 'Journal',
    story: 'Our Story',
  };

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE5DE] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#1A1918] text-[#FAF8F5] text-xs py-1.5 px-4 text-center font-sans tracking-wider flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
        <span>PRIVATE VAULT ACCESS: Unheated Ceylon Sapphires & Type IIa Diamonds Available on Memo</span>
        <span className="text-[#C5A880] hidden sm:inline">|</span>
        <button 
          onClick={openSiteGuide}
          id="nav-site-architecture-btn"
          className="text-[#C5A880] underline hover:text-[#FAF8F5] transition-colors cursor-pointer hidden sm:inline"
        >
          View Site Features & Architecture Guide
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex flex-col text-left group focus:outline-none shrink-0"
          >
            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-normal tracking-[0.08em] sm:tracking-[0.1em] lg:tracking-[0.15em] text-[#1A1918] group-hover:text-[#4A4744] transition-colors whitespace-nowrap">
              SOMUCHAURA
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] text-[#78716C] uppercase -mt-0.5 whitespace-nowrap">
              YosenaMora Atelier
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3 2xl:space-x-5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNav(link.id)}
                  title={link.label}
                  className={`text-xs tracking-wide uppercase transition-all py-1 relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#1A1918] font-semibold'
                      : 'text-[#57534E] hover:text-[#1A1918] font-normal'
                  }`}
                >
                  {desktopNavLabels[link.id] ?? link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1A1918]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 lg:space-x-4 shrink-0">
            {/* Guide button mobile/desktop (hidden on the smallest screens; reachable via the mobile menu instead) */}
            <button
              id="guide-inspect-btn"
              onClick={openSiteGuide}
              title="Inspect Site Architecture"
              className="hidden sm:flex px-2.5 py-1 text-xs tracking-wider uppercase border border-[#D5CDC4] rounded hover:border-[#1A1918] text-[#57534E] hover:text-[#1A1918] transition-colors items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>

            {/* Member Portal / Vault */}
            <button
              id="member-portal-btn"
              onClick={openVault}
              title="Jeweller Member Area"
              className="p-2 text-[#57534E] hover:text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors relative flex items-center gap-1.5"
            >
              <div className="w-7 h-7 rounded-full bg-[#1A1918] text-[#FAF8F5] flex items-center justify-center text-xs font-serif font-medium">
                YM
              </div>
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={openCart}
              title="View Vault Order / Memo Cart"
              className="p-2 text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#1A1918] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1918] hover:bg-[#F2ECE4] rounded"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EBE5DE] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left px-3 py-2.5 text-sm uppercase tracking-wider ${
                currentPage === link.id
                  ? 'bg-[#F2ECE4] text-[#1A1918] font-semibold'
                  : 'text-[#57534E] hover:bg-[#F7F3EE]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#EBE5DE] flex justify-between items-center px-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openVault();
              }}
              className="text-xs uppercase tracking-wider font-semibold text-[#1A1918] flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Member Jeweller Area
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSiteGuide();
              }}
              className="text-xs uppercase tracking-wider text-[#C5A880] underline font-medium"
            >
              Site Features Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
