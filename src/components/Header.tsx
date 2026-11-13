import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Building2,
  ChevronDown,
  Moon,
  Sun,
  Sparkles,
  Maximize2,
  Minimize2,
  Search,
  MapPin,
  X,
  Check
} from 'lucide-react';
import { University, ViewMode } from '../types';
import { UNIVERSITIES } from '../data/mockData';
import { AppLogo } from './AppLogo';

interface HeaderProps {
  currentUniversity: University;
  onSelectUniversity: (uni: University) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isExpandedView: boolean;
  onToggleExpand: () => void;
  matricNumber?: string;
  studentName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUniversity,
  onSelectUniversity,
  viewMode,
  onToggleViewMode,
  isDark,
  onToggleDark,
  isExpandedView,
  onToggleExpand,
  matricNumber = '210408044',
  studentName = 'Chidera Okafor'
}) => {
  const [showUniDirectory, setShowUniDirectory] = useState(false);
  const [uniSearchQuery, setUniSearchQuery] = useState('');
  const [uniTypeFilter, setUniTypeFilter] = useState<'all' | 'Federal' | 'State'>('all');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const federalCount = useMemo(() => UNIVERSITIES.filter((u) => u.type === 'Federal').length, []);
  const stateCount = useMemo(() => UNIVERSITIES.filter((u) => u.type === 'State').length, []);

  const filteredUniversities = useMemo(() => {
    const q = uniSearchQuery.trim().toLowerCase();
    return UNIVERSITIES.filter((uni) => {
      if (uniTypeFilter !== 'all' && uni.type !== uniTypeFilter) return false;
      if (!q) return true;
      return (
        uni.shortName.toLowerCase().includes(q) ||
        uni.name.toLowerCase().includes(q) ||
        uni.state.toLowerCase().includes(q) ||
        uni.campus.toLowerCase().includes(q)
      );
    });
  }, [uniSearchQuery, uniTypeFilter]);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Top Info Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 text-xs">
          {/* Active Institution Selector Button */}
          <div>
            <button
              onClick={() => setShowUniDirectory(true)}
              className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
              title="Browse all Federal & State Universities"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[175px] sm:max-w-[230px]">
                {currentUniversity.shortName} · {currentUniversity.campus.split(',')[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Quick Verification & Preferences Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Student Verified Status Badge */}
            <button
              onClick={() => setShowVerificationModal(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium hover:bg-emerald-100 transition-colors"
              title="View student verification badge"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="hidden xs:inline">Verified</span>
              <span className="font-mono text-[10px]">{matricNumber.slice(-4)}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleDark}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-[11px] font-medium"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Desktop Expand / Phone Shell Toggle */}
            <button
              onClick={onToggleExpand}
              className="hidden md:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isExpandedView ? "Switch to Mobile Container" : "Expand Fullscreen"}
              aria-label="Toggle viewport view"
            >
              {isExpandedView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Brand & Persona Switcher Row */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Mark */}
          <div className="flex items-center gap-2">
            <AppLogo size="sm" />
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                CampusHub
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                · {currentUniversity.shortName} Living & Hustle
              </span>
            </div>
          </div>

          {/* Persona Switcher Toggle (Regular Student vs Class Rep / Vendor) */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => onToggleViewMode('student')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                viewMode === 'student'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onToggleViewMode('rep_vendor')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                viewMode === 'rep_vendor'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>Class Rep / Vendor</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Verification Status Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Campus ID Verification
                  </h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified Tier 1 Student
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Full Name</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Institution</span>
                  <span className="font-medium text-slate-900 dark:text-white">{currentUniversity.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Department</span>
                  <span className="font-medium text-slate-900 dark:text-white">Computer Science, 300L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Matriculation No</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{matricNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Biometrics / NIN</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Matched & Verified</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Your verified identity protects you from predatory lodge agents and unlocks CampusHub Escrow payments with zero inspection fees.
              </p>

              <button
                onClick={() => setShowVerificationModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-xs hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                Close Verification Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Searchable Nigerian Federal & State Universities Directory Modal */}
      {showUniDirectory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md h-[82vh] max-h-[640px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Nigerian Universities Directory</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {UNIVERSITIES.length} Federal & State institutions supported nationwide
                </p>
              </div>
              <button
                onClick={() => setShowUniDirectory(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close university directory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Ownership Filter Controls */}
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 space-y-2.5 bg-slate-50/70 dark:bg-slate-950/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by acronym (LASU, UNN, BUK), name or state..."
                  value={uniSearchQuery}
                  onChange={(e) => setUniSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
                {uniSearchQuery && (
                  <button
                    onClick={() => setUniSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Segmented Filter Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-xs font-medium">
                <button
                  onClick={() => setUniTypeFilter('all')}
                  className={`py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    uniTypeFilter === 'all'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All ({UNIVERSITIES.length})
                </button>
                <button
                  onClick={() => setUniTypeFilter('Federal')}
                  className={`py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    uniTypeFilter === 'Federal'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Federal ({federalCount})
                </button>
                <button
                  onClick={() => setUniTypeFilter('State')}
                  className={`py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    uniTypeFilter === 'State'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  State ({stateCount})
                </button>
              </div>
            </div>

            {/* Scrollable List of Universities */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
              {filteredUniversities.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                  No university matched "{uniSearchQuery}". Try searching by state (e.g., Lagos, Enugu, Kano) or acronym.
                </div>
              ) : (
                filteredUniversities.map((uni) => {
                  const isActive = uni.id === currentUniversity.id;
                  return (
                    <button
                      key={uni.id}
                      onClick={() => {
                        onSelectUniversity(uni);
                        setShowUniDirectory(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                        isActive
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-xs ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                            {uni.shortName}
                          </span>
                          <span className="text-[11px] text-slate-400">·</span>
                          <span className={`text-[11px] font-medium ${uni.type === 'Federal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>
                            {uni.type}
                          </span>
                          <span className="text-[11px] text-slate-400">·</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {uni.state}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate mt-0.5">
                          {uni.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{uni.campus}</span>
                        </div>
                      </div>

                      {isActive && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
