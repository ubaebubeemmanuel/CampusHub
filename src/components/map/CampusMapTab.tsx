import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Compass,
  Footprints,
  Clock,
  ThumbsUp,
  Plus,
  Share2,
  Navigation,
  School,
  Building,
  Utensils,
  Landmark as BankIcon,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { CampusLandmark, LandmarkCategory, University } from '../../types';
import { getLandmarksForUniversity } from '../../data/mockData';

interface CampusMapTabProps {
  currentUniversity: University;
  onShowToast: (msg: string) => void;
}

export const CampusMapTab: React.FC<CampusMapTabProps> = ({ currentUniversity, onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<LandmarkCategory | 'all'>('all');
  const [customLandmarks, setCustomLandmarks] = useState<CampusLandmark[]>([]);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const baseLandmarks = useMemo(() => getLandmarksForUniversity(currentUniversity), [currentUniversity]);
  const landmarksList = useMemo(
    () => [...customLandmarks.filter((c) => c.universityId === currentUniversity.id), ...baseLandmarks],
    [customLandmarks, baseLandmarks, currentUniversity.id]
  );

  const [activeLandmark, setActiveLandmark] = useState<CampusLandmark | null>(landmarksList[0] || null);

  useEffect(() => {
    setActiveLandmark(landmarksList[0] || null);
  }, [currentUniversity.id]);

  // Add Landmark Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<LandmarkCategory>('theatre');
  const [newWalkTime, setNewWalkTime] = useState<number>(7);
  const [newTip, setNewTip] = useState('');
  const [newHours, setNewHours] = useState('8:00 AM - 6:00 PM');

  // Filter landmarks for current university
  const filteredLandmarks = useMemo(() => {
    return landmarksList.filter((lm) => {
      if (selectedCategory !== 'all' && lm.category !== selectedCategory) return false;
      return true;
    });
  }, [landmarksList, selectedCategory]);

  const categories: Array<{ id: LandmarkCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'all', label: 'All Pins', icon: Compass },
    { id: 'theatre', label: 'Lecture Theatres', icon: School },
    { id: 'hostel', label: 'Hostels & Halls', icon: Building },
    { id: 'food', label: 'Food & Hangouts', icon: Utensils },
    { id: 'bank', label: 'Banks / ATMs', icon: BankIcon },
    { id: 'admin', label: 'Admin & Clearance', icon: ShieldAlert }
  ];

  const getCategoryColor = (cat: LandmarkCategory) => {
    switch (cat) {
      case 'theatre':
        return { bg: 'bg-indigo-600', text: 'text-indigo-400', border: 'border-indigo-500' };
      case 'hostel':
        return { bg: 'bg-emerald-600', text: 'text-emerald-400', border: 'border-emerald-500' };
      case 'food':
        return { bg: 'bg-amber-600', text: 'text-amber-400', border: 'border-amber-500' };
      case 'bank':
        return { bg: 'bg-sky-600', text: 'text-sky-400', border: 'border-sky-500' };
      case 'admin':
        return { bg: 'bg-rose-600', text: 'text-rose-400', border: 'border-rose-500' };
      default:
        return { bg: 'bg-slate-700', text: 'text-slate-400', border: 'border-slate-600' };
    }
  };

  const handleUpvoteTip = (landmarkId: string) => {
    if (upvotedIds[landmarkId]) return;
    setCustomLandmarks((prev) =>
      prev.map((lm) => (lm.id === landmarkId ? { ...lm, upvotes: lm.upvotes + 1 } : lm))
    );
    if (activeLandmark?.id === landmarkId) {
      setActiveLandmark({ ...activeLandmark, upvotes: activeLandmark.upvotes + 1 });
    }
    setUpvotedIds((prev) => ({ ...prev, [landmarkId]: true }));
    onShowToast('Helpful tip upvoted! Thank you for helping campus freshers.');
  };

  const handleCreateLandmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTip.trim()) return;

    const newPin: CampusLandmark = {
      id: `lm-custom-${Date.now()}`,
      universityId: currentUniversity.id,
      name: newName.trim(),
      category: newCategory,
      xPercent: 30 + Math.floor(Math.random() * 40),
      yPercent: 30 + Math.floor(Math.random() * 40),
      walkMinutesFromGate: newWalkTime,
      bestTip: newTip.trim(),
      tipsCount: 1,
      operatingHours: newHours,
      upvotes: 1
    };

    setCustomLandmarks((prev) => [newPin, ...prev]);
    setActiveLandmark(newPin);
    setShowAddModal(false);
    setNewName('');
    setNewTip('');
    onShowToast(`Landmark "${newPin.name}" added to ${currentUniversity.shortName} map!`);
  };

  return (
    <div className="space-y-3.5 pb-12">
      {/* Top Map Context & Add Action */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Campus Navigator</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {currentUniversity.name} · Student Crowd-Sourced Pins
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Pin</span>
        </button>
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Stylized Vector Campus Map */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner select-none">
        {/* SVG Campus Geography & Roadways */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute inset-0 pointer-events-none opacity-80"
          preserveAspectRatio="none"
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="campus-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#campus-grid)" />

          {/* Waterfront / Lagoon / Natural Park Curve */}
          <path
            d="M 65 0 C 70 30, 60 70, 100 100 L 100 0 Z"
            fill="rgba(14, 165, 233, 0.12)"
          />
          <path
            d="M 65 0 C 70 30, 60 70, 100 100"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />

          {/* Green Sports Oval & Lawns */}
          <ellipse cx="25" cy="72" rx="14" ry="9" fill="rgba(16, 185, 129, 0.12)" />
          <ellipse cx="25" cy="72" rx="12" ry="7" fill="none" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="0.6" />

          {/* Academic Main Drive Roadways */}
          {/* Main Gate road starting at bottom-left corner */}
          <path
            d="M 10 100 L 25 70 L 45 45 L 75 40"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Inner ring road */}
          <path
            d="M 30 30 C 45 15, 65 25, 60 50 C 55 65, 35 60, 30 30"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.8"
            strokeDasharray="1,1"
          />
          {/* Faculty Spur road */}
          <path
            d="M 45 45 L 52 28"
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.8"
          />
        </svg>

        {/* Main Campus Gate Indicator */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold flex items-center gap-1 shadow-sm">
          <Navigation className="w-3 h-3 text-emerald-400" />
          <span>Main University Gate (0 min)</span>
        </div>

        {/* Lagoon / Waterside Label */}
        <div className="absolute top-2.5 right-3 text-[10px] font-medium text-sky-400/80 tracking-wider">
          Lagoon Waterfront
        </div>

        {/* Dynamic Clickable Landmark Pins */}
        {filteredLandmarks.map((lm) => {
          const isSelected = activeLandmark?.id === lm.id;
          const colors = getCategoryColor(lm.category);

          return (
            <button
              key={lm.id}
              onClick={() => setActiveLandmark(lm)}
              style={{
                left: `${lm.xPercent}%`,
                top: `${lm.yPercent}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20 cursor-pointer"
              title={`${lm.name} (${lm.walkMinutesFromGate} mins walk)`}
            >
              {/* Outer pulsing ring for selected pin */}
              {isSelected && (
                <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
              )}

              {/* Pin Icon Bubble */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg transition-transform ${
                  colors.bg
                } ${isSelected ? 'scale-125 ring-2 ring-white z-30' : 'group-hover:scale-110'}`}
              >
                <MapPin className="w-3.5 h-3.5 text-white stroke-[2.4]" />
              </div>

              {/* Pin Tooltip Caption */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-1.5 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-xs text-[10px] text-white whitespace-nowrap pointer-events-none transition-opacity ${
                  isSelected ? 'opacity-100 font-semibold' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {lm.name.split('(')[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Landmark Detail Card */}
      {activeLandmark && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs animate-in fade-in duration-150">
          {/* Header & Walking Distance */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <Footprints className="w-3.5 h-3.5" />
                <span>{activeLandmark.walkMinutesFromGate} mins walk from Main Gate</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 leading-snug">
                {activeLandmark.name}
              </h3>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[11px]">{activeLandmark.operatingHours}</span>
            </div>
          </div>

          {/* Student Crowd-Sourced Insider Tip Box */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Crowd-Sourced Student Tip
              </span>
              <button
                onClick={() => handleUpvoteTip(activeLandmark.id)}
                disabled={upvotedIds[activeLandmark.id]}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  upvotedIds[activeLandmark.id]
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
                title="Upvote this helpful tip"
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="tabular-nums">{activeLandmark.upvotes}</span>
              </button>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{activeLandmark.bestTip}"
            </p>
          </div>

          {/* Quick Route Guidance Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                onShowToast(`Walking Route plotted: ~${activeLandmark.walkMinutesFromGate} mins via Academic Drive.`);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Guide Me Here</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${activeLandmark.name} - ${activeLandmark.walkMinutesFromGate} mins from UNILAG Gate`);
                onShowToast('Landmark directions copied to clipboard!');
              }}
              className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Share pin with classmate"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================= ADD LANDMARK PIN MODAL ======================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Add New Campus Landmark
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLandmark} className="mt-3.5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Landmark Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. DLI Annex Classroom 4"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as LandmarkCategory)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="theatre">Lecture Theatre / Classroom</option>
                  <option value="hostel">Hostel & Lodge</option>
                  <option value="food">Food & Hangout Buka</option>
                  <option value="bank">Bank / ATM Gallery</option>
                  <option value="admin">Admin / Clearance Office</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                    Walk Time (Mins)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={newWalkTime}
                    onChange={(e) => setNewWalkTime(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Insider Student Tip
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Best place for quiet self-study after 6pm, strong sockets on row 3."
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Pin Landmark to Map
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
