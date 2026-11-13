import React, { useState, useMemo } from 'react';
import {
  Wallet,
  TrendingDown,
  Calendar,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Download,
  Share2,
  QrCode,
  ShieldCheck,
  Receipt,
  Users,
  Send,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BudgetExpense, ClassDue, ClassStudentRoster, University, ViewMode } from '../../types';
import { AppLogo } from '../AppLogo';
import {
  INITIAL_EXPENSES,
  getDuesForUniversity,
  MOCK_CLASS_ROSTER,
  formatNaira
} from '../../data/mockData';

interface WalletTabProps {
  currentUniversity: University;
  viewMode: ViewMode;
  walletBalance: number;
  onDeductBalance: (amount: number, description: string) => boolean;
  onTopUpBalance: (amount: number) => void;
  onShowToast: (msg: string) => void;
  studentName?: string;
  matricNumber?: string;
}

export const WalletTab: React.FC<WalletTabProps> = ({
  currentUniversity,
  viewMode,
  walletBalance,
  onDeductBalance,
  onTopUpBalance,
  onShowToast,
  studentName = 'Chidera Okafor',
  matricNumber = '210408044'
}) => {
  const [subTab, setSubTab] = useState<'budget' | 'dues'>('budget');
  const [expenses, setExpenses] = useState<BudgetExpense[]>(INITIAL_EXPENSES);
  const [paidDueOverrides, setPaidDueOverrides] = useState<Record<string, { paidAt: string; receiptReference: string }>>({});
  const [roster, setRoster] = useState<ClassStudentRoster[]>(MOCK_CLASS_ROSTER);

  const dues = useMemo(() => {
    return getDuesForUniversity(currentUniversity).map((d) => {
      const override = paidDueOverrides[d.id];
      if (override) {
        return { ...d, paid: true, paidAt: override.paidAt, receiptReference: override.receiptReference };
      }
      return d;
    });
  }, [currentUniversity, paidDueOverrides]);

  // Allowance & safe spend
  const [showLogExpenseModal, setShowLogExpenseModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number>(500);
  const [expenseCategory, setExpenseCategory] = useState<BudgetExpense['category']>('Food');

  const [topUpAmount, setTopUpAmount] = useState<number>(10000);

  // Digital Receipt modal
  const [selectedReceiptDue, setSelectedReceiptDue] = useState<ClassDue | null>(null);

  // Class Rep Mode search
  const [rosterSearch, setRosterSearch] = useState('');
  const [rosterFilter, setRosterFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  // Days left in current month calculation
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();
  const daysLeft = Math.max(1, daysInMonth - currentDay);

  // Daily safe-to-spend limit = balance / daysLeft
  const dailySafeLimit = Math.round(walletBalance / daysLeft);

  // Today's spending total
  const todaySpent = useMemo(() => {
    return expenses
      .filter((e) => e.timestamp.includes('Today'))
      .reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const spendingRatio = dailySafeLimit > 0 ? (todaySpent / dailySafeLimit) * 100 : 0;
  const isOverspent = todaySpent > dailySafeLimit;

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {
      Food: 0,
      Transport: 0,
      'Data & Airtime': 0,
      Handouts: 0,
      Misc: 0
    };
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return map;
  }, [expenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle.trim() || expenseAmount <= 0) return;

    const deducted = onDeductBalance(expenseAmount, `Expense: ${expenseTitle}`);
    if (!deducted) return;

    const newExp: BudgetExpense = {
      id: `exp-${Date.now()}`,
      title: expenseTitle.trim(),
      amount: expenseAmount,
      category: expenseCategory,
      timestamp: 'Today, Just now'
    };

    setExpenses((prev) => [newExp, ...prev]);
    setShowLogExpenseModal(false);
    setExpenseTitle('');
    onShowToast(`Logged expense of ${formatNaira(expenseAmount)} for ${newExp.title}.`);
  };

  const handleTopUpAllowance = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;
    onTopUpBalance(topUpAmount);
    setShowTopUpModal(false);
    onShowToast(`Allowance topped up with ${formatNaira(topUpAmount)} from Home Bank Transfer!`);
  };

  const handlePayDue = (due: ClassDue) => {
    if (walletBalance < due.amount) {
      onShowToast(`Insufficient allowance balance (${formatNaira(walletBalance)}). Please top up first!`);
      return;
    }

    const deducted = onDeductBalance(due.amount, `Dues: ${due.title}`);
    if (!deducted) return;

    const ref = `CH-${currentUniversity.shortName}-${Date.now().toString().slice(-6)}`;
    const now = 'Nov 13, 2026';

    setPaidDueOverrides((prev) => ({
      ...prev,
      [due.id]: { paidAt: now, receiptReference: ref }
    }));

    // Update roster to mark yourself as paid
    setRoster((prev) =>
      prev.map((s) => (s.name.includes('(You)') ? { ...s, paid: true, paidDate: now, amountPaid: due.amount } : s))
    );

    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    onShowToast(`Official Receipt generated for ${due.title}!`);
    setSelectedReceiptDue({
      ...due,
      paid: true,
      paidAt: now,
      receiptReference: ref
    });
  };

  // Class Rep calculations
  const totalRosterCount = roster.length;
  const paidStudentsCount = roster.filter((s) => s.paid).length;
  const totalLevyTarget = totalRosterCount * 3500;
  const totalLevyCollected = paidStudentsCount * 3500;
  const collectionPercentage = Math.round((totalLevyCollected / totalLevyTarget) * 100);

  const filteredRoster = useMemo(() => {
    return roster.filter((st) => {
      if (rosterFilter === 'paid' && !st.paid) return false;
      if (rosterFilter === 'unpaid' && st.paid) return false;
      if (
        rosterSearch &&
        !st.name.toLowerCase().includes(rosterSearch.toLowerCase()) &&
        !st.matricNumber.includes(rosterSearch)
      ) {
        return false;
      }
      return true;
    });
  }, [roster, rosterFilter, rosterSearch]);

  const handleToggleStudentPaid = (studentId: string) => {
    setRoster((prev) =>
      prev.map((st) => {
        if (st.id === studentId) {
          const nextPaid = !st.paid;
          return {
            ...st,
            paid: nextPaid,
            paidDate: nextPaid ? 'Today, 2:00 PM' : undefined,
            amountPaid: nextPaid ? 3500 : 0
          };
        }
        return st;
      })
    );
    onShowToast('Student payment status updated on official roster!');
  };

  return (
    <div className="space-y-3.5 pb-12">
      {/* Sub-Tabs: My Budget vs Class & SUG Dues */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <button
          onClick={() => setSubTab('budget')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            subTab === 'budget'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          My Allowance & Budget
        </button>
        <button
          onClick={() => setSubTab('dues')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'dues'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span>{viewMode === 'rep_vendor' ? 'Class Rep Portal' : 'Class & SUG Dues'}</span>
          {viewMode !== 'rep_vendor' && dues.filter((d) => !d.paid).length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
              {dues.filter((d) => !d.paid).length} Unpaid
            </span>
          )}
        </button>
      </div>

      {/* ======================= BUDGET & ALLOWANCE SUB-TAB ======================= */}
      {subTab === 'budget' && (
        <div className="space-y-3.5">
          {/* Monthly Balance Hero Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1 font-medium">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                Monthly Campus Allowance
              </span>
              <span className="text-[11px] text-emerald-300 font-mono">
                {daysLeft} days remaining in month
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight">
                {formatNaira(walletBalance)}
              </div>
              <button
                onClick={() => setShowTopUpModal(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Top Up</span>
              </button>
            </div>

            {/* Daily Safe Limit Meter */}
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">Daily Safe-to-Spend:</span>
                <span className="font-bold text-amber-300 tabular-nums">
                  {formatNaira(dailySafeLimit)} / day
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Today's Spent: {formatNaira(todaySpent)}</span>
                <span className={isOverspent ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {isOverspent ? '⚠️ Exceeded Daily Safe Limit' : '✓ Within Safe Spending'}
                </span>
              </div>

              {/* Spending Progress Bar */}
              <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isOverspent ? 'bg-rose-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, spendingRatio)}%` }}
                />
              </div>
            </div>

            {/* Log Quick Expense CTA */}
            <button
              onClick={() => setShowLogExpenseModal(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Log Student Expense</span>
            </button>
          </div>

          {/* Quick Expense Preset Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setExpenseTitle('Campus Shuttle Bus');
                setExpenseAmount(200);
                setExpenseCategory('Transport');
                setShowLogExpenseModal(true);
              }}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <div className="text-[10px] text-slate-400">Quick Log</div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">₦200 Shuttle</div>
            </button>
            <button
              onClick={() => {
                setExpenseTitle('Campus Buka Lunch');
                setExpenseAmount(1200);
                setExpenseCategory('Food');
                setShowLogExpenseModal(true);
              }}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <div className="text-[10px] text-slate-400">Quick Log</div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">₦1,200 Food</div>
            </button>
            <button
              onClick={() => {
                setExpenseTitle('MTN 1.5GB Data');
                setExpenseAmount(500);
                setExpenseCategory('Data & Airtime');
                setShowLogExpenseModal(true);
              }}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-colors"
            >
              <div className="text-[10px] text-slate-400">Quick Log</div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">₦500 Data</div>
            </button>
          </div>

          {/* Monthly Expenditure Category Breakdown */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              November Spending Breakdown
            </h4>

            <div className="space-y-2 text-xs">
              {Object.entries(categoryBreakdown).map(([cat, amt]) => {
                const total = Object.values(categoryBreakdown).reduce((a, b) => a + b, 0) || 1;
                const pct = Math.round((amt / total) * 100);

                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-600 dark:text-slate-400">{cat}</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatNaira(amt)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Expense History */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white px-1">
              Recent Expense Ledger
            </h4>
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
              {expenses.slice(0, 6).map((exp) => (
                <div key={exp.id} className="p-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{exp.title}</div>
                    <div className="text-[11px] text-slate-400">
                      {exp.category} · {exp.timestamp}
                    </div>
                  </div>
                  <div className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                    -{formatNaira(exp.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= DUES PORTAL SUB-TAB ======================= */}
      {subTab === 'dues' && (
        <div className="space-y-3.5">
          {/* Regular Student View vs Class Rep Dashboard */}
          {viewMode === 'student' ? (
            <div className="space-y-3.5">
              {/* Dues Guarantee Header */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-800/40 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white">
                    Automated Faculty & SUG Dues Clearance
                  </h3>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Never lose physical paper bank tellers again. Pay class levies instantly and generate an official, permanent digital receipt with verified QR code.
                </p>
              </div>

              {/* Dues Cards List */}
              <div className="space-y-3">
                {dues.map((due) => (
                  <div
                    key={due.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {due.departmentOrScope}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                          {due.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Deadline: {due.deadline} · {due.mandatory ? 'Mandatory Exam Clearance' : 'Optional Social'}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-base text-slate-900 dark:text-white tabular-nums">
                          {formatNaira(due.amount)}
                        </div>
                        {due.paid ? (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-amber-500">Unpaid</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {due.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      {due.paid ? (
                        <button
                          onClick={() => setSelectedReceiptDue(due)}
                          className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Receipt className="w-3.5 h-3.5 text-emerald-500" />
                          <span>View Official Digital Receipt</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePayDue(due)}
                          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Pay {formatNaira(due.amount)} Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ======================= CLASS REP TRANSPARENCY DASHBOARD ======================= */
            <div className="space-y-3.5">
              {/* Class Rep Overview Strip */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                    CSC 300L Class Rep Live Transparency Portal
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300">
                    {collectionPercentage}% Collected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="text-[11px] text-slate-400">Total Funds Collected</div>
                    <div className="text-xl font-extrabold tabular-nums text-emerald-400">
                      {formatNaira(totalLevyCollected)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Target (100% Class)</div>
                    <div className="text-xl font-extrabold tabular-nums text-slate-200">
                      {formatNaira(totalLevyTarget)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${collectionPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                  <span>{paidStudentsCount} students paid</span>
                  <span className="text-amber-300">{totalRosterCount - paidStudentsCount} students pending</span>
                </div>
              </div>

              {/* Roster Search & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search classmate name or matric..."
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setRosterFilter('all')}
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      rosterFilter === 'all' ? 'bg-white dark:bg-slate-900 shadow-xs font-bold' : 'text-slate-500'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setRosterFilter('paid')}
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      rosterFilter === 'paid' ? 'bg-white dark:bg-slate-900 shadow-xs font-bold text-emerald-600' : 'text-slate-500'
                    }`}
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => setRosterFilter('unpaid')}
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      rosterFilter === 'unpaid' ? 'bg-white dark:bg-slate-900 shadow-xs font-bold text-amber-500' : 'text-slate-500'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {/* Class Student Roster List */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
                {filteredRoster.map((st) => (
                  <div key={st.id} className="p-3.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{st.name}</span>
                        {st.paid && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Matric: {st.matricNumber} · {st.paid ? `Paid ${st.paidDate}` : 'Pending ₦3,500'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {st.paid ? (
                        <button
                          onClick={() => handleToggleStudentPaid(st.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800/60"
                          title="Click to toggle payment"
                        >
                          Paid ✓
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onShowToast(`Automated WhatsApp reminder sent to ${st.name} (${st.phone})!`);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-medium"
                            title="Send WhatsApp due reminder"
                          >
                            <Send className="w-3.5 h-3.5 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => handleToggleStudentPaid(st.id)}
                            className="px-2 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold"
                          >
                            Mark Paid
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================= OFFICIAL DIGITAL RECEIPT MODAL ======================= */}
      {selectedReceiptDue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Official Header with University Watermark */}
            <div className="p-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-300">
                  Official E-Receipt
                </span>
                <button
                  onClick={() => setSelectedReceiptDue(null)}
                  className="text-white/80 hover:text-white p-1 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="mt-2 flex items-center gap-2.5">
                <AppLogo size="md" />
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {currentUniversity.name}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Faculty & Departmental Clearance Slip
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex items-baseline justify-between">
                <span className="text-xs text-emerald-100">Amount Paid</span>
                <span className="text-xl font-extrabold tabular-nums">
                  {formatNaira(selectedReceiptDue.amount)}
                </span>
              </div>
            </div>

            {/* Receipt Body Details */}
            <div className="p-5 space-y-3.5 text-xs bg-white dark:bg-slate-900">
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Student Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Matriculation No</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{matricNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Purpose of Levy</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[180px] truncate">
                    {selectedReceiptDue.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Date Paid</span>
                  <span className="text-slate-900 dark:text-white">{selectedReceiptDue.paidAt || 'Nov 12, 2026'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Reference No</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedReceiptDue.receiptReference || 'CH-UNILAG-88412'}
                  </span>
                </div>
              </div>

              {/* Scannable QR Code Visualization */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <div className="w-16 h-16 p-1 bg-white rounded-xl shadow-xs flex items-center justify-center shrink-0">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[11px] space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cryptographic Audit Proof</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-tight">
                    Present this QR code to the Course Adviser or Financial Secretary for immediate exam clearance signing.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    onShowToast('Official PDF receipt saved to your downloads!');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Receipt</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `CampusHub Official Receipt: ${selectedReceiptDue.title} (${formatNaira(selectedReceiptDue.amount)}) Paid by ${studentName} [${matricNumber}] Ref: ${selectedReceiptDue.receiptReference}`
                    );
                    onShowToast('Receipt verification reference copied!');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= LOG EXPENSE MODAL ======================= */}
      {showLogExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                Log Daily Student Expense
              </h3>
              <button
                onClick={() => setShowLogExpenseModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="mt-3.5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  What did you spend on?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Iya Moria Amala, Shuttle, MTN Data"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                    Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as BudgetExpense['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Food">Food & Buka</option>
                    <option value="Transport">Transport / Shuttle</option>
                    <option value="Data & Airtime">Data & Airtime</option>
                    <option value="Handouts">Handouts / Print</option>
                    <option value="Misc">Miscellaneous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Save & Update Balance
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogExpenseModal(false)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= TOP UP ALLOWANCE MODAL ======================= */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-600" />
                Top Up Monthly Allowance
              </h3>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTopUpAllowance} className="mt-3.5 space-y-3 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Simulate receiving your monthly upkeep from sponsors or parent bank transfer into your CampusHub safe balance.
              </p>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Top Up Amount (₦)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className="py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                  >
                    +{formatNaira(amt)}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Confirm Top Up
                </button>
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
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
