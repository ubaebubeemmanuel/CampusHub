import React, { useState, useEffect } from 'react';
import { University, UniversityId, ViewMode, TabId } from './types';
import { UNIVERSITIES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LivingTab } from './components/living/LivingTab';
import { CampusMapTab } from './components/map/CampusMapTab';
import { MarketTab } from './components/market/MarketTab';
import { WalletTab } from './components/wallet/WalletTab';
import {
  Wifi,
  BatteryCharging,
  Signal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Theme state persisted in localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campushub-theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
    } catch {
      // ignore storage errors
    }
    return true;
  });

  // Active institution
  const [currentUniversity, setCurrentUniversity] = useState<University>(UNIVERSITIES[0]);

  // Persona mode: 'student' | 'rep_vendor'
  const [viewMode, setViewMode] = useState<ViewMode>('student');

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabId>('living');

  // Mobile Container vs Expanded View toggle
  const [isExpandedView, setIsExpandedView] = useState(false);

  // Student Allowance balance
  const [walletBalance, setWalletBalance] = useState<number>(42500);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class to html document and persist preference
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('campushub-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const handleDeductBalance = (amount: number, description: string): boolean => {
    if (walletBalance < amount) {
      showToast(`Insufficient balance for ${description}.`);
      return false;
    }
    setWalletBalance((prev) => prev - amount);
    return true;
  };

  const handleTopUpBalance = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-start p-0 md:py-6 md:px-4 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 max-w-sm mx-auto z-50 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl border border-slate-700 dark:border-slate-200 flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span className="flex-1 leading-snug">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white dark:hover:text-slate-900 p-0.5"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container: Mobile App Shell Centered on Desktop (with Expand Toggle) */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-white dark:bg-slate-900 md:rounded-3xl shadow-2xl md:border border-slate-200/90 dark:border-slate-800 overflow-hidden relative ${
          isExpandedView
            ? 'max-w-4xl min-h-[92vh]'
            : 'max-w-[430px] min-h-screen md:min-h-[860px]'
        }`}
      >
        {/* Simulated Mobile Status Bar (Visible on mobile aesthetic container) */}
        <div className="hidden md:flex items-center justify-between px-5 pt-2.5 pb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 select-none border-b border-slate-100 dark:border-slate-800/40">
          <span>9:41 AM · MTN NG 5G</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <span className="font-mono text-[10px]">98%</span>
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        {/* Persistent CampusHub Header */}
        <Header
          currentUniversity={currentUniversity}
          onSelectUniversity={(uni) => {
            setCurrentUniversity(uni);
            showToast(`Switched campus to ${uni.name}! Showing local lodges & landmarks.`);
          }}
          viewMode={viewMode}
          onToggleViewMode={(mode) => {
            setViewMode(mode);
            showToast(
              mode === 'rep_vendor'
                ? 'Switched to Class Rep & Vendor Mode. Dues transparency portal unlocked!'
                : 'Switched to Regular Student Mode.'
            );
          }}
          isDark={isDark}
          onToggleDark={() => {
            const next = !isDark;
            setIsDark(next);
            showToast(next ? 'Switched to Dark Mode' : 'Switched to Light Mode');
          }}
          isExpandedView={isExpandedView}
          onToggleExpand={() => setIsExpandedView(!isExpandedView)}
        />

        {/* Tab Content Body (Scrollable Stretch Zone) */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'living' && (
            <LivingTab
              currentUniversity={currentUniversity}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'map' && (
            <CampusMapTab
              currentUniversity={currentUniversity}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'market' && (
            <MarketTab
              currentUniversity={currentUniversity}
              walletBalance={walletBalance}
              onDeductBalance={handleDeductBalance}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletTab
              currentUniversity={currentUniversity}
              viewMode={viewMode}
              walletBalance={walletBalance}
              onDeductBalance={handleDeductBalance}
              onTopUpBalance={handleTopUpBalance}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation Anchor */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          pendingEscrowOrdersCount={1}
          unpaidDuesCount={2}
        />
      </div>

      {/* Subtle Desktop Footer with Campus Disclaimer */}
      <footer className="hidden md:block text-center mt-3 text-xs text-slate-400 dark:text-slate-500">
        CampusHub · Supporting All Nigerian Federal & State Universities Across 36 States + FCT
      </footer>
    </div>
  );
}
