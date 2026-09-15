import React, { useState } from 'react';
import { Gemstone } from '../types';
import { 
  ShieldCheck, 
  User, 
  Building, 
  FileText, 
  Clock, 
  Bell, 
  Star, 
  Trash2, 
  Eye, 
  ExternalLink,
  Award
} from 'lucide-react';

interface MembersVaultProps {
  savedStones: Gemstone[];
  onSelectStone: (stone: Gemstone) => void;
  onRemoveSaved: (stoneId: string) => void;
  onNavigateShop: () => void;
}

export const MembersVault: React.FC<MembersVaultProps> = ({
  savedStones,
  onSelectStone,
  onRemoveSaved,
  onNavigateShop,
}) => {
  const [activeTab, setActiveTab] = useState<'vault' | 'memos' | 'settings'>('vault');
  const [notifyDrops, setNotifyDrops] = useState(true);
  const [notifyMemos, setNotifyMemos] = useState(true);

  // Simulated active memo consignments
  const mockMemos = [
    {
      id: 'MEMO-9021',
      stoneName: '9.65ct Unheated Royal Blue Ceylon Sapphire',
      dateDispatched: '2026-09-08',
      daysRemaining: 9,
      courier: 'Ferrari Logistics (Armored)',
      tracking: 'FER-8829104-UK',
      declaredValue: '$168,000 USD',
      status: 'On Inspection at Client Atelier',
    },
    {
      id: 'MEMO-8840',
      stoneName: '5.42ct E VVS2 Oval Brilliant Diamond',
      dateDispatched: '2026-09-02',
      daysRemaining: 3,
      courier: 'Malca-Amit High Value',
      tracking: 'MA-91044-LON',
      declaredValue: '$495,000 USD',
      status: 'Awaiting Settlement Wire',
    }
  ];

  return (
    <div className="py-12 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Jeweller Member Profile Banner */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D9] rounded-xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1A1918] text-[#FAF8F5] flex items-center justify-center font-serif text-2xl font-medium border-2 border-[#C5A880]">
              YM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl text-[#1A1918]">Atelier Sterling &amp; Co.</h2>
                <span className="bg-[#FAF8F5] border border-[#C5A880] text-[#8C6D44] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C5A880]" /> Verified Trade Partner
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-0.5">
                Member ID: YM-ATELIER-7741 • Account Lead: Arthur Sterling, Master Goldsmith
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E1D9] text-xs text-right hidden sm:block">
              <span className="text-[10px] uppercase text-[#8C827A] block">Approved Memo Credit Line</span>
              <span className="font-serif text-base font-bold text-[#1A1918]">$1,500,000 USD</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E1D9] mb-8 gap-6 sm:gap-8 text-xs uppercase tracking-wider font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('vault')}
            className={`pb-3 relative flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'vault' ? 'text-[#1A1918] border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Saved Atelier Stones ({savedStones.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('memos')}
            className={`pb-3 relative flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'memos' ? 'text-[#1A1918] border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Active Consignment Memos ({mockMemos.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 relative flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'settings' ? 'text-[#1A1918] border-b-2 border-[#1A1918]' : 'text-[#8C827A] hover:text-[#1A1918]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications &amp; Preferences</span>
          </button>
        </div>

        {/* Tab Content 1: Saved Stones */}
        {activeTab === 'vault' && (
          <div>
            {savedStones.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFFFF] border border-[#E8E1D9] rounded-xl p-8 space-y-4">
                <Star className="w-10 h-10 text-[#C5A880] mx-auto opacity-70" />
                <h3 className="font-serif text-2xl text-[#1A1918]">Your Atelier Vault is Empty</h3>
                <p className="text-xs text-[#78716C] max-w-md mx-auto font-light leading-relaxed">
                  Bookmark gemstones while browsing our catalog to easily compare carat weights, origins, and GIA certificates with your private bespoke clients.
                </p>
                <button
                  onClick={onNavigateShop}
                  className="px-6 py-3 bg-[#1A1918] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#33312E] transition-colors cursor-pointer"
                >
                  Browse Gemstone Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedStones.map((stone) => (
                  <div
                    key={stone.id}
                    className="bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="relative h-48 bg-[#1A1918] cursor-pointer" onClick={() => onSelectStone(stone)}>
                      <img src={stone.image} alt={stone.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-[#FAF8F5]/90 px-2 py-0.5 rounded text-[10px] font-bold text-[#1A1918]">
                        {stone.shape} • {stone.carat}ct
                      </div>
                      <div className="absolute top-2 right-2 bg-[#1A1918] text-[#FAF8F5] px-2 py-0.5 rounded text-[10px] font-bold">
                        {stone.certification}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                        {stone.origin}
                      </span>
                      <h4 
                        onClick={() => onSelectStone(stone)}
                        className="font-serif text-base text-[#1A1918] hover:text-[#635E59] cursor-pointer line-clamp-1 font-semibold"
                      >
                        {stone.name}
                      </h4>
                      <p className="text-xs font-serif text-[#1A1918]">
                        ${stone.priceUSD.toLocaleString()} USD (${stone.pricePerCarat.toLocaleString()}/ct)
                      </p>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#F2ECE4] flex items-center justify-between">
                      <button
                        onClick={() => onSelectStone(stone)}
                        className="text-xs text-[#1A1918] hover:text-[#C5A880] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Dossier
                      </button>
                      <button
                        onClick={() => onRemoveSaved(stone.id)}
                        className="text-xs text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer"
                        title="Remove from vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Active Memos */}
        {activeTab === 'memos' && (
          <div className="space-y-4">
            {mockMemos.map((memo) => (
              <div
                key={memo.id}
                className="bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1A1918]">{memo.id}</span>
                    <span className="bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                      {memo.status}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1A1918]">{memo.stoneName}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-[#78716C] pt-1">
                    <span>Courier: <strong className="text-[#1A1918]">{memo.courier}</strong></span>
                    <span>Tracking: <strong className="text-[#1A1918]">{memo.tracking}</strong></span>
                    <span>Declared Value: <strong className="text-[#1A1918]">{memo.declaredValue}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#F2ECE4]">
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#8C827A] block">Inspection Window</span>
                    <span className="text-xs font-bold text-[#DC2626] flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5" /> {memo.daysRemaining} Days Left
                    </span>
                  </div>
                  <a
                    href="mailto:consult@yosenamora.com?subject=Settlement%20for%20Memo%20MEMO-9021"
                    className="px-4 py-2 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#33312E] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Confirm Purchase / Return
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Notification Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#FFFFFF] border border-[#E8E1D9] rounded-xl p-6 sm:p-8 max-w-2xl space-y-6">
            <h3 className="font-serif text-xl text-[#1A1918]">Atelier Intelligence &amp; Alert Preferences</h3>
            <p className="text-xs text-[#78716C] leading-relaxed font-light">
              Receive confidential private briefings before rare rough parcels and untreated estate gems are released to the public market.
            </p>

            <div className="space-y-4 pt-2 border-t border-[#F2ECE4] text-xs">
              <label className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#E8E1D9] rounded cursor-pointer">
                <div>
                  <span className="font-semibold text-[#1A1918] block">High-Value Type IIa &amp; Colored Diamond Drops</span>
                  <span className="text-[#78716C] text-[11px]">Instant alerts for new GIA Flawless stones entering our European vaults.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDrops}
                  onChange={(e) => setNotifyDrops(e.target.checked)}
                  className="accent-[#1A1918] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#E8E1D9] rounded cursor-pointer">
                <div>
                  <span className="font-semibold text-[#1A1918] block">Consignment Memo Expiry Reminders</span>
                  <span className="text-[#78716C] text-[11px]">Automated 72-hour notice prior to the expiration of your 14-day client memo.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyMemos}
                  onChange={(e) => setNotifyMemos(e.target.checked)}
                  className="accent-[#1A1918] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            <button
              onClick={() => alert('Preferences saved successfully.')}
              className="px-6 py-2.5 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold rounded cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
