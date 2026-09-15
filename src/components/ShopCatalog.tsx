import React, { useState, useMemo } from 'react';
import { Gemstone, GemCategory } from '../types';
import { Search, SlidersHorizontal, Eye, ShoppingBag, ShieldCheck, Check, RotateCcw } from 'lucide-react';

interface ShopCatalogProps {
  gemstones: Gemstone[];
  onSelectStone: (stone: Gemstone) => void;
  onAddToCart: (stone: Gemstone) => void;
  savedStoneIds: string[];
  onToggleSave: (stoneId: string) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  gemstones,
  onSelectStone,
  onAddToCart,
  savedStoneIds,
  onToggleSave,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'carat-desc'>('featured');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const categories = ['All', 'Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Spinel', 'Tourmaline'];
  const shapes = ['All', 'Emerald Cut', 'Cushion', 'Round Brilliant', 'Oval', 'Pear'];
  const certs = ['All', 'GIA', 'Gübelin', 'SSEF'];

  const filteredStones = useMemo(() => {
    return gemstones.filter((stone) => {
      const matchCategory = selectedCategory === 'All' || stone.category === selectedCategory;
      const matchShape = selectedShape === 'All' || stone.shape === selectedShape;
      const matchCert = selectedCert === 'All' || stone.certification === selectedCert;
      const matchSearch =
        searchQuery === '' ||
        stone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stone.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stone.certNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stone.color.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchShape && matchCert && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'carat-desc') return b.carat - a.carat;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [gemstones, selectedCategory, selectedShape, selectedCert, searchQuery, sortBy]);

  const handleAddToCartWithFeedback = (stone: Gemstone, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(stone);
    setAddedNoticeId(stone.id);
    setTimeout(() => setAddedNoticeId(null), 1800);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedShape('All');
    setSelectedCert('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-[#E8E1D9] pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C827A] font-semibold">
                Haute Lapidary Vault
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918] mt-1">
                Gemstone &amp; Diamond Catalog
              </h1>
              <p className="text-[#57534E] text-sm mt-2 max-w-xl font-light">
                Direct wholesale allocation of investment diamonds and untreated master gems. Certified by GIA, Gübelin, and SSEF with full origin provenance.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-[#8C827A]">
                Showing {filteredStones.length} of {gemstones.length} stones
              </span>
              {(selectedCategory !== 'All' || selectedShape !== 'All' || selectedCert !== 'All' || searchQuery !== '') && (
                <button
                  onClick={resetFilters}
                  className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#1A1918] flex items-center gap-1 underline transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Search and Category Quick Filters */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Category Tabs */}
            <div className="lg:col-span-8 flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold shadow-sm'
                      : 'bg-[#FFFFFF] border border-[#E0D8CE] text-[#57534E] hover:border-[#1A1918]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cut, origin, GIA cert #..."
                className="w-full bg-[#FFFFFF] border border-[#E0D8CE] rounded pl-9 pr-4 py-2 text-xs text-[#1A1918] placeholder-[#A8A29E] focus:outline-none focus:border-[#1A1918] transition-colors"
              />
            </div>

          </div>

          {/* Secondary Filter Bar */}
          <div className="mt-4 pt-4 border-t border-[#EFE9E0] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Shape dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[#8C827A] uppercase tracking-wider">Shape:</span>
                <select
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E0D8CE] rounded px-2.5 py-1 text-xs text-[#1A1918] focus:outline-none"
                >
                  {shapes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Lab Certification dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[#8C827A] uppercase tracking-wider">Laboratory:</span>
                <select
                  value={selectedCert}
                  onChange={(e) => setSelectedCert(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E0D8CE] rounded px-2.5 py-1 text-xs text-[#1A1918] focus:outline-none"
                >
                  {certs.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Sort by dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#8C827A] uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] border border-[#E0D8CE] rounded px-2.5 py-1 text-xs text-[#1A1918] focus:outline-none"
              >
                <option value="featured">Featured Allocation</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="carat-desc">Carat Weight: Largest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gemstones Grid */}
        {filteredStones.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg p-8">
            <p className="font-serif text-2xl text-[#1A1918]">No gemstones match your specific criteria</p>
            <p className="text-sm text-[#78716C] mt-2 mb-6 font-light">
              We frequently hold unlisted off-market rough and private estate parcels.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded cursor-pointer"
            >
              Reset Filter Parameters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStones.map((stone) => {
              const isSaved = savedStoneIds.includes(stone.id);
              const isJustAdded = addedNoticeId === stone.id;

              return (
                <div
                  key={stone.id}
                  onClick={() => onSelectStone(stone)}
                  className="bg-[#FFFFFF] rounded-lg border border-[#E8E1D9] hover:border-[#1A1918] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-60 overflow-hidden bg-[#1A1918]">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-[#FAF8F5]/90 backdrop-blur px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-[#1A1918]">
                          {stone.shape}
                        </span>
                        <span className="bg-[#1A1918]/85 text-[#FAF8F5] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                          {stone.carat} ct
                        </span>
                      </div>

                      {/* Certification Pill */}
                      <div className="absolute top-2.5 right-2.5 bg-[#C5A880] text-[#141413] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {stone.certification}
                      </div>

                      {/* Hover Overlay with Quick Inspect */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="px-4 py-2 bg-[#FAF8F5] text-[#1A1918] text-xs uppercase tracking-wider font-semibold rounded shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> View Full Dossier
                        </span>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#8C827A] uppercase tracking-wider">
                        <span>{stone.category}</span>
                        <span className="truncate max-w-[140px]">{stone.origin.split('(')[0]}</span>
                      </div>

                      <h3 className="font-serif text-base text-[#1A1918] group-hover:text-[#57534E] transition-colors leading-snug line-clamp-2">
                        {stone.name}
                      </h3>

                      {/* 4Cs summary badges */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] text-[#57534E]">
                        <div className="bg-[#FAF8F5] px-2 py-1 rounded border border-[#EFEAE3] truncate">
                          Color: <span className="font-medium text-[#1A1918]">{stone.color.split('(')[0]}</span>
                        </div>
                        <div className="bg-[#FAF8F5] px-2 py-1 rounded border border-[#EFEAE3] truncate">
                          Clarity: <span className="font-medium text-[#1A1918]">{stone.clarity}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#78716C] italic truncate">
                        {stone.treatment}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="p-4 pt-3 border-t border-[#F2ECE4] bg-[#FDFCFA]">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                          Atelier Price
                        </span>
                        <span className="font-serif text-lg font-medium text-[#1A1918]">
                          ${stone.priceUSD.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#8C827A] block">Per Carat</span>
                        <span className="text-xs text-[#57534E] font-medium">
                          ${stone.pricePerCarat.toLocaleString()}/ct
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(stone.id);
                        }}
                        className={`py-2 text-[11px] uppercase tracking-wider rounded border transition-colors cursor-pointer ${
                          isSaved
                            ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#8C6D44] font-semibold'
                            : 'border-[#E0D8CE] text-[#57534E] hover:border-[#1A1918]'
                        }`}
                      >
                        {isSaved ? '★ In Vault' : '☆ Save Stone'}
                      </button>

                      <button
                        onClick={(e) => handleAddToCartWithFeedback(stone, e)}
                        className={`py-2 text-[11px] uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isJustAdded
                            ? 'bg-[#2E7D32] text-white font-semibold'
                            : 'bg-[#1A1918] hover:bg-[#33312E] text-[#FAF8F5] font-medium'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Memo / Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
