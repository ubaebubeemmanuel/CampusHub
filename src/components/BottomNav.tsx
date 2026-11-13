import React from 'react';
import { Home, MapPin, ShoppingBag, Wallet } from 'lucide-react';
import { TabId } from '../types';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  pendingEscrowOrdersCount?: number;
  unpaidDuesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingEscrowOrdersCount = 0,
  unpaidDuesCount = 0
}) => {
  const tabs = [
    {
      id: 'living' as TabId,
      label: 'Living',
      icon: Home,
      badge: 0
    },
    {
      id: 'map' as TabId,
      label: 'Map',
      icon: MapPin,
      badge: 0
    },
    {
      id: 'market' as TabId,
      label: 'Market',
      icon: ShoppingBag,
      badge: pendingEscrowOrdersCount
    },
    {
      id: 'wallet' as TabId,
      label: 'Wallet',
      icon: Wallet,
      badge: unpaidDuesCount
    }
  ];

  return (
    <nav className="sticky bottom-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 transition-all group focus:outline-none"
              aria-label={tab.label}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Subtle Numeric Badge if active count */}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Tab Underline Indicator */}
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
