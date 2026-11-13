import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Zap,
  Droplets,
  ShieldCheck,
  Video,
  Calendar,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  Play,
  RotateCcw,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Lodge, RoommateProfile, University } from '../../types';
import { getLodgesForUniversity, getRoommatesForUniversity, formatNaira } from '../../data/mockData';

interface LivingTabProps {
  currentUniversity: University;
  onShowToast: (msg: string) => void;
}

export const LivingTab: React.FC<LivingTabProps> = ({ currentUniversity, onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'lodges' | 'roommates'>('lodges');

  // Lodge filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(800000);
  const [powerFilter, setPowerFilter] = useState<'all' | 'solar'>('all');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Modals state
  const [selectedTourLodge, setSelectedTourLodge] = useState<Lodge | null>(null);
  const [tourSceneIndex, setTourSceneIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(true);

  const [bookingLodge, setBookingLodge] = useState<Lodge | null>(null);
  const [inspectionDate, setInspectionDate] = useState('2026-11-15');
  const [inspectionTime, setInspectionTime] = useState('14:00');
  const [inspectionNotes, setInspectionNotes] = useState('');

  // Roommate chat state
  const [activeChatRoommate, setActiveChatRoommate] = useState<RoommateProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'me' | 'them'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState('');

  // Roommate filters
  const [roommateGenderFilter, setRoommateGenderFilter] = useState<'all' | 'Male' | 'Female'>('all');
  const [roommateMaxBudget, setRoommateMaxBudget] = useState<number>(300000);

  const universityLodges = useMemo(() => getLodgesForUniversity(currentUniversity), [currentUniversity]);
  const universityRoommates = useMemo(() => getRoommatesForUniversity(currentUniversity), [currentUniversity]);

  // Filtered Lodges
  const filteredLodges = useMemo(() => {
    return universityLodges.filter((lodge) => {
      // Search match
      if (
        searchQuery &&
        !lodge.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lodge.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Room type
      if (selectedRoomType !== 'all') {
        if (selectedRoomType === 'Self-Con' && lodge.roomType !== 'Self-Con') return false;
        if (selectedRoomType === '2-Bed Shared' && lodge.roomType !== '2-Bed Shared') return false;
        if (selectedRoomType === 'Single Room' && lodge.roomType !== 'Single Room') return false;
        if (selectedRoomType === 'Mini-Flat' && lodge.roomType !== 'Mini-Flat') return false;
      }

      // Budget
      if (lodge.pricePerYear > maxBudget) return false;

      // Distance
      if (lodge.distanceToGateMinutes > maxDistance) return false;

      // Power
      if (powerFilter === 'solar' && !lodge.powerScore.toLowerCase().includes('solar')) {
        return false;
      }

      return true;
    });
  }, [universityLodges, searchQuery, selectedRoomType, maxBudget, powerFilter, maxDistance]);

  // Filtered Roommates
  const filteredRoommates = useMemo(() => {
    return universityRoommates.filter((r) => {
      if (roommateGenderFilter !== 'all' && r.gender !== roommateGenderFilter) return false;
      if (r.budgetShareMax > roommateMaxBudget) return false;
      return true;
    });
  }, [universityRoommates, roommateGenderFilter, roommateMaxBudget]);

  const handleOpenChat = (roommate: RoommateProfile) => {
    setActiveChatRoommate(roommate);
    setChatMessages([
      {
        sender: 'them',
        text: `Hi there! I saw your profile on CampusHub. I'm currently checking lodges around ${roommate.preferredLocation}. Are you interested in pairing up for rent?`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'me' as const,
      text: chatInput.trim(),
      time: 'Just now'
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Simulate friendly instant reply from verified student
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'them',
          text: `Awesome! My budget is around ${formatNaira(activeChatRoommate?.budgetShareMax || 200000)} max. Can we book a zero-fee inspection together this weekend?`,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleConfirmInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingLodge) return;
    onShowToast(`Inspection booked for ${bookingLodge.title}! Zero agent fee confirmed.`);
    setBookingLodge(null);
  };

  const tourScenes = [
    { title: 'Gated Compound & Security Post', duration: '0:15', note: 'Paved compound with 24/7 security guard post.' },
    { title: 'Main Living & Bedroom Space', duration: '0:35', note: 'Spacious tiled layout with ample natural window sunlight.' },
    { title: 'Personal Kitchenette & Sink', duration: '0:50', note: 'Dedicated in-room cooking counter with storage cabinets.' },
    { title: 'Ensuite Restroom & Water Pressure', duration: '1:10', note: 'Treated borehole running water with personal shower.' }
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Sub-Tabs: Lodge Finder vs Roommate Match */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <button
          onClick={() => setActiveSubTab('lodges')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'lodges'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Lodge Finder ({filteredLodges.length})
        </button>
        <button
          onClick={() => setActiveSubTab('roommates')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'roommates'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Roommate Match ({filteredRoommates.length})
        </button>
      </div>

      {/* ======================= LODGES SUB-TAB ======================= */}
      {activeSubTab === 'lodges' && (
        <div className="space-y-3.5">
          {/* Zero Agent Fee Guarantee Banner */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  ₦0 Inspection Fee Guarantee
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  No scam agents or form fees. Connect directly with verified student landlords.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shrink-0"
              title="Filter lodges"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search & Filter Chips Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search area (e.g. Abule Oja, Iwaya, Gate)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilterDrawer(true)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Room Type Segmented Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['all', 'Self-Con', '2-Bed Shared', 'Single Room', 'Mini-Flat'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRoomType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedRoomType === type
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          {/* Lodge Cards List */}
          {filteredLodges.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No lodges found matching your filters.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try widening your budget range or clearing search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRoomType('all');
                  setMaxBudget(800000);
                  setPowerFilter('all');
                }}
                className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-emerald-600 text-white font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLodges.map((lodge) => (
                <div
                  key={lodge.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Image with Overlays */}
                  <div className="relative aspect-16/9 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={lodge.image}
                      alt={lodge.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* Gradient Scrim for readable badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top Zero Fee & Verified Tag */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        ₦0 Inspection Fee
                      </span>
                    </div>

                    {/* Bottom Title & Price Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <div className="text-[11px] font-medium text-emerald-300">
                          {lodge.roomType} · {lodge.distanceToGateMinutes} mins to gate
                        </div>
                        <div className="font-bold text-lg leading-tight tabular-nums">
                          {formatNaira(lodge.pricePerYear)}
                          <span className="text-xs font-normal text-slate-200"> / year</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedTourLodge(lodge);
                          setTourSceneIndex(0);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-amber-300" />
                        <span>Video Tour</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2.5">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {lodge.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {lodge.location}
                      </p>
                    </div>

                    {/* Power & Water Score Strip */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{lodge.powerScore}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span className="truncate">{lodge.waterScore}</span>
                      </div>
                    </div>

                    {/* Features Unboxed Text */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5">
                      {lodge.features.map((feat, idx) => (
                        <React.Fragment key={idx}>
                          <span>{feat}</span>
                          {idx < lodge.features.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => setBookingLodge(lodge)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Free Inspection</span>
                      </button>
                      <button
                        onClick={() => {
                          onShowToast(`Connected to Landlord: ${lodge.landlordName}`);
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Direct chat with landlord"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Landlord</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================= ROOMMATES SUB-TAB ======================= */}
      {activeSubTab === 'roommates' && (
        <div className="space-y-3.5">
          {/* Roommate Explainer Card */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Verified Student Roommate Match
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Split rent 50/50 and share generator fuel with background-checked students.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setRoommateGenderFilter(roommateGenderFilter === 'Male' ? 'all' : 'Male')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  roommateGenderFilter === 'Male'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Guys
              </button>
              <button
                onClick={() => setRoommateGenderFilter(roommateGenderFilter === 'Female' ? 'all' : 'Female')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  roommateGenderFilter === 'Female'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Ladies
              </button>
            </div>
          </div>

          {/* Roommate Cards */}
          <div className="space-y-3">
            {filteredRoommates.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Header: Student Identity & Compatibility */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {student.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {student.name}
                        </span>
                        <span title="Matric Verified">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {student.department} · {student.level}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/60">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{student.compatibilityScore}% Match</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Budget: {formatNaira(student.budgetShareMax)}
                    </div>
                  </div>
                </div>

                {/* About Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{student.about}"
                </p>

                {/* Preferred Area & Lifestyle Tags */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Target Area:</span> {student.preferredLocation}
                  </div>

                  {/* Clean Lifestyle Tags (unboxed or subtle) */}
                  <div className="flex flex-wrap gap-1.5">
                    {student.lifestyleTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connect Action Button */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Matric: {student.matricPreview}
                  </span>
                  <button
                    onClick={() => handleOpenChat(student)}
                    className="py-1.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Connect & Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= VIRTUAL VIDEO TOUR MODAL ======================= */}
      {selectedTourLodge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-xs font-bold truncate max-w-[240px]">
                    {selectedTourLodge.title}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Recorded Virtual Walkthrough · Zero Fee Verified
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTourLodge(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Video Viewport Simulation */}
            <div className="relative aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedTourLodge.image}
                alt="Tour scene"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPlayingTour ? 'scale-105' : 'scale-100 brightness-75'
                }`}
              />

              {/* Timestamp & Playback indicator */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC · Scene {tourSceneIndex + 1}/4</span>
              </div>

              {/* Center Play/Pause button */}
              <button
                onClick={() => setIsPlayingTour(!isPlayingTour)}
                className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all transform hover:scale-110"
              >
                {isPlayingTour ? <Clock className="w-6 h-6 text-emerald-400" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              {/* Bottom Scrim with Scene Caption */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
                <div className="text-xs font-bold text-amber-300">
                  {tourScenes[tourSceneIndex].title}
                </div>
                <div className="text-[11px] text-slate-300">
                  {tourScenes[tourSceneIndex].note}
                </div>
              </div>
            </div>

            {/* Scene Selector Strip */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Room Walkthrough Timeline
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {tourScenes.map((scene, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTourSceneIndex(idx);
                      setIsPlayingTour(true);
                    }}
                    className={`p-1.5 rounded-lg text-left text-[10px] transition-all ${
                      tourSceneIndex === idx
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <div className="truncate font-medium">{scene.title.split(' ')[0]}</div>
                    <div className="text-[9px] opacity-80">{scene.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedTourLodge(null);
                  setBookingLodge(selectedTourLodge);
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free In-Person Inspection</span>
              </button>
              <button
                onClick={() => setSelectedTourLodge(null)}
                className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= BOOK INSPECTION MODAL ======================= */}
      {bookingLodge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Schedule Free Physical Inspection
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {bookingLodge.title}
                </p>
              </div>
              <button
                onClick={() => setBookingLodge(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmInspection} className="mt-3.5 space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px]">
                <span className="font-bold">Zero Agent Fee Guarantee:</span> You will never be asked to pay any ₦10k or ₦15k "agent mobility" fee. If anyone asks, report immediately.
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Select Preferred Date
                </label>
                <input
                  type="date"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Preferred Time (Between Lectures)
                </label>
                <select
                  value={inspectionTime}
                  onChange={(e) => setInspectionTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="10:00">Morning (10:00 AM)</option>
                  <option value="12:30">Midday Break (12:30 PM)</option>
                  <option value="14:00">Afternoon (2:00 PM)</option>
                  <option value="16:30">Evening (4:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Special Note for Landlord (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coming with my prospective roommate"
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Confirm Free Inspection
                </button>
                <button
                  type="button"
                  onClick={() => setBookingLodge(null)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= ROOMMATE CONNECT / CHAT MODAL ======================= */}
      {activeChatRoommate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm h-[480px] bg-white dark:bg-slate-900 rounded-2xl flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Chat Header */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  {activeChatRoommate.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>{activeChatRoommate.name}</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {activeChatRoommate.department} · {activeChatRoommate.level}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveChatRoommate(null)}
                className="p-1 text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50 dark:bg-slate-950/60 text-xs">
              <div className="text-center">
                <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-500">
                  End-to-End Verified Student Chat
                </span>
              </div>

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${
                      msg.sender === 'me'
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input Footer */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type message to roommate..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-transparent focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================= LODGE FILTERS DRAWER ======================= */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Filter Accommodation
              </h3>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Max Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Max Budget (Annual)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums font-mono">
                    {formatNaira(maxBudget)}
                  </span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="800000"
                  step="25000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₦150k</span>
                  <span>₦450k</span>
                  <span>₦800k</span>
                </div>
              </div>

              {/* Walking Distance */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Max Walk Distance to Gate
                </label>
                <select
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value={5}>Within 5 mins walk</option>
                  <option value={10}>Within 10 mins walk</option>
                  <option value={15}>Any distance (up to 15 mins)</option>
                </select>
              </div>

              {/* Power / Light Reliability */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Power Reliability
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPowerFilter('all')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-colors ${
                      powerFilter === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Any Power Source
                  </button>
                  <button
                    type="button"
                    onClick={() => setPowerFilter('solar')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                      powerFilter === 'solar'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>24/7 Solar Backup</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                >
                  Apply Filters ({filteredLodges.length} Lodges)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
