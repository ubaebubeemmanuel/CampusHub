import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  Star,
  Clock,
  Plus,
  Lock,
  CheckCircle,
  Truck,
  ArrowRight,
  Package,
  CheckCheck,
  AlertCircle,
  Sparkles,
  Building2,
  DollarSign,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MarketCategory, MarketItem, EscrowOrder, University } from '../../types';
import { getMarketItemsForUniversity, INITIAL_ESCROW_ORDERS, formatNaira } from '../../data/mockData';

interface MarketTabProps {
  currentUniversity: University;
  walletBalance: number;
  onDeductBalance: (amount: number, description: string) => boolean;
  onShowToast: (msg: string) => void;
}

export const MarketTab: React.FC<MarketTabProps> = ({
  currentUniversity,
  walletBalance,
  onDeductBalance,
  onShowToast
}) => {
  const [viewMode, setViewMode] = useState<'browse' | 'orders'>('browse');
  const [customItems, setCustomItems] = useState<MarketItem[]>([]);
  const [orders, setOrders] = useState<EscrowOrder[]>(INITIAL_ESCROW_ORDERS);

  const items = useMemo(
    () => [
      ...customItems.filter((i) => i.universityId === currentUniversity.id),
      ...getMarketItemsForUniversity(currentUniversity)
    ],
    [customItems, currentUniversity]
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('all');
  const [selectedHostelFilter, setSelectedHostelFilter] = useState<string>('all');

  // Checkout modal
  const [activeCheckoutItem, setActiveCheckoutItem] = useState<MarketItem | null>(null);
  const [deliveryHostel, setDeliveryHostel] = useState(currentUniversity.hostels[0] || 'Main Hostel');
  const [deliveryRoom, setDeliveryRoom] = useState('Block B, Room 104');
  const [specialNote, setSpecialNote] = useState('');

  // Post Hustle modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [hustleTitle, setHustleTitle] = useState('');
  const [hustleCategory, setHustleCategory] = useState<MarketCategory>('food');
  const [hustlePrice, setHustlePrice] = useState<number>(2000);
  const [hustleDescription, setHustleDescription] = useState('');
  const [hustleDeliveryTime, setHustleDeliveryTime] = useState(25);

  const categories: Array<{ id: MarketCategory; label: string }> = [
    { id: 'all', label: 'All Hustles' },
    { id: 'food', label: 'Food & Chow' },
    { id: 'thrift', label: 'Thrift Fashion' },
    { id: 'tech', label: 'Tech & Gadgets' },
    { id: 'grooming', label: 'Hair & Grooming' },
    { id: 'print', label: 'Print & Past Qs' }
  ];

  const hostelOptions = useMemo(() => ['all', ...currentUniversity.hostels], [currentUniversity]);

  // Filtered market items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      if (selectedHostelFilter !== 'all' && !item.deliveryHostels.includes(selectedHostelFilter)) {
        return false;
      }

      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [items, selectedCategory, selectedHostelFilter, searchQuery]);

  const activeOrdersCount = orders.filter((o) => o.status !== 'funds_released').length;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCheckoutItem) return;

    if (walletBalance < activeCheckoutItem.price) {
      onShowToast(`Insufficient allowance balance (${formatNaira(walletBalance)}). Please top up first!`);
      return;
    }

    const deducted = onDeductBalance(
      activeCheckoutItem.price,
      `Escrow: ${activeCheckoutItem.title}`
    );

    if (!deducted) return;

    const newOrder: EscrowOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      itemId: activeCheckoutItem.id,
      itemTitle: activeCheckoutItem.title,
      itemImage: activeCheckoutItem.image,
      sellerName: activeCheckoutItem.sellerName,
      amount: activeCheckoutItem.price,
      deliveryHostel,
      roomNumber: deliveryRoom,
      status: 'held_in_escrow',
      orderTime: 'Just now',
      specialNote: specialNote.trim() || undefined
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveCheckoutItem(null);
    setViewMode('orders');
    onShowToast(`₦${activeCheckoutItem.price.toLocaleString()} locked safely in CampusHub Escrow!`);

    // Simulate vendor accepting and dispatching after 4 seconds
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === newOrder.id ? { ...o, status: 'dispatched' } : o))
      );
      onShowToast(`Vendor dispatched your order to ${deliveryHostel}!`);
    }, 4000);

    // Simulate delivered after 9 seconds
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === newOrder.id ? { ...o, status: 'delivered' } : o))
      );
      onShowToast(`Order delivered to ${deliveryRoom}! Please inspect and release funds.`);
    }, 9000);
  };

  const handleReleaseFunds = (order: EscrowOrder) => {
    // Release escrow funds to vendor
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'funds_released' } : o))
    );

    // Confetti celebration
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    onShowToast(`Payment of ${formatNaira(order.amount)} released to ${order.sellerName}! Thank you for supporting campus entrepreneurs.`);
  };

  const handleCreateHustle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hustleTitle.trim() || hustlePrice <= 0) return;

    const defaultImages: Record<MarketCategory, string> = {
      all: '/src/assets/images/student_jollof_pack_1794492305210.jpg',
      food: '/src/assets/images/student_jollof_pack_1794492305210.jpg',
      thrift: '/src/assets/images/student_thrift_hoodie_1794492306137.jpg',
      tech: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
      laundry: '/src/assets/images/student_thrift_hoodie_1794492306137.jpg',
      grooming: '/src/assets/images/student_thrift_hoodie_1794492306137.jpg',
      print: '/src/assets/images/student_jollof_pack_1794492305210.jpg'
    };

    const newItem: MarketItem = {
      id: `m-custom-${Date.now()}`,
      universityId: currentUniversity.id,
      title: hustleTitle.trim(),
      category: hustleCategory,
      price: hustlePrice,
      sellerName: 'Chidera Okafor (You)',
      sellerDepartment: 'Computer Science 300L',
      sellerRating: 5.0,
      ordersCompleted: 0,
      image: defaultImages[hustleCategory] || defaultImages.food,
      deliveryHostels: currentUniversity.hostels.slice(0, 4),
      deliveryEstimateMinutes: hustleDeliveryTime,
      description: hustleDescription.trim() || 'Fast, reliable campus service with CampusHub Escrow Guarantee.',
      verifiedVendor: true
    };

    setCustomItems((prev) => [newItem, ...prev]);
    setShowPostModal(false);
    setHustleTitle('');
    setHustleDescription('');
    onShowToast(`Your hustle "${newItem.title}" is live at ${currentUniversity.shortName}!`);
  };

  return (
    <div className="space-y-3.5 pb-12">
      {/* View Switcher: Browse Hustles vs Escrow Orders */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <button
          onClick={() => setViewMode('browse')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            viewMode === 'browse'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Student Hustles ({filteredItems.length})
        </button>
        <button
          onClick={() => setViewMode('orders')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            viewMode === 'orders'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span>Escrow Orders</span>
          {activeOrdersCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
              {activeOrdersCount}
            </span>
          )}
        </button>
      </div>

      {/* ======================= BROWSE HUSTLES VIEW ======================= */}
      {viewMode === 'browse' && (
        <div className="space-y-3.5">
          {/* Escrow Protection Explainer Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-800/40 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">CampusHub Escrow Protection</h3>
                  <p className="text-[11px] text-emerald-300/90 font-medium">
                    100% Student Scam Protection
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPostModal(true)}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Post Hustle</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              When you order, funds stay safely locked in CampusHub Escrow. The student vendor only gets paid after you receive and confirm your delivery.
            </p>
          </div>

          {/* Search & Area Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search jollof, thrift, hair, repairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Hostel Dropdown Filter */}
            <select
              value={selectedHostelFilter}
              onChange={(e) => setSelectedHostelFilter(e.target.value)}
              className="px-2.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shrink-0"
            >
              <option value="all">All Hostels</option>
              {hostelOptions.slice(1).map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Hustle Items Grid */}
          <div className="space-y-3.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row"
              >
                {/* Image Section */}
                <div className="relative sm:w-44 h-40 sm:h-auto shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>~{item.deliveryEstimateMinutes} mins</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    {/* Seller Metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.sellerName}
                        </span>
                        {item.verifiedVendor && (
                          <span title="Verified Campus Vendor">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{item.sellerRating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({item.ordersCompleted})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Delivery Hostels unboxed list */}
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                      Delivers to: {item.deliveryHostels.slice(0, 3).join(', ')}
                    </span>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-base text-slate-900 dark:text-white tabular-nums">
                      {formatNaira(item.price)}
                    </div>

                    <button
                      onClick={() => {
                        setDeliveryHostel(currentUniversity.hostels[0] || 'Main Hostel');
                        setActiveCheckoutItem(item);
                      }}
                      className="py-1.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Order via Escrow</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= ESCROW ORDERS & TRACKER VIEW ======================= */}
      {viewMode === 'orders' && (
        <div className="space-y-3.5">
          {orders.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No active escrow orders
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Browse student hustles and place an order with escrow protection!
              </p>
              <button
                onClick={() => setViewMode('browse')}
                className="mt-3 px-3 py-1.5 text-xs rounded-xl bg-emerald-600 text-white font-medium"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Live Escrow Orders Protection Tracker
              </div>

              {orders.map((order) => {
                const isHeld = order.status === 'held_in_escrow';
                const isDispatched = order.status === 'dispatched';
                const isDelivered = order.status === 'delivered';
                const isReleased = order.status === 'funds_released';

                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-xs"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {order.id} · {order.orderTime}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                          {order.itemTitle}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Seller: {order.sellerName} · Deliver to {order.deliveryHostel} ({order.roomNumber})
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                          {formatNaira(order.amount)}
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <Lock className="w-2.5 h-2.5" /> Escrow Safe
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Milestones */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <span className={isHeld || isDispatched || isDelivered || isReleased ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                          1. Funds Locked
                        </span>
                        <span className={isDispatched || isDelivered || isReleased ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                          2. Dispatched
                        </span>
                        <span className={isDelivered || isReleased ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                          3. Delivered
                        </span>
                        <span className={isReleased ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                          4. Paid
                        </span>
                      </div>

                      {/* Progress Bar Track */}
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{
                            width: isReleased
                              ? '100%'
                              : isDelivered
                              ? '75%'
                              : isDispatched
                              ? '50%'
                              : '25%'
                          }}
                        />
                      </div>
                    </div>

                    {/* Escrow Status Message & Action */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      {isReleased ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          <span>Delivery Completed & Funds Released!</span>
                        </div>
                      ) : isDelivered ? (
                        <div className="flex-1 flex items-center justify-between gap-2">
                          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                            Delivered! Please inspect your package.
                          </div>
                          <button
                            onClick={() => handleReleaseFunds(order)}
                            className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Confirm & Release Funds</span>
                          </button>
                        </div>
                      ) : isDispatched ? (
                        <div className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 font-medium">
                          <Truck className="w-4 h-4 animate-bounce" />
                          <span>Vendor on their way to {order.deliveryHostel}...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <Package className="w-4 h-4 text-emerald-600" />
                          <span>Vendor notified. Packaging your order...</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================= ESCROW CHECKOUT MODAL ======================= */}
      {activeCheckoutItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  CampusHub Escrow Checkout
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Guaranteed safe student transaction
                </p>
              </div>
              <button
                onClick={() => setActiveCheckoutItem(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="mt-3.5 space-y-3 text-xs">
              {/* Order Summary Item */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {activeCheckoutItem.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Seller: {activeCheckoutItem.sellerName}
                  </div>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                  {formatNaira(activeCheckoutItem.price)}
                </div>
              </div>

              {/* Escrow Mechanism Explainer Box */}
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>How Escrow Protects You:</span>
                </div>
                <p className="leading-tight">
                  Your money will NOT be sent to the vendor immediately. It stays locked until you receive the item and tap "Confirm Delivery". If the vendor doesn't deliver, your money is automatically refunded.
                </p>
              </div>

              {/* Delivery Hostel & Room */}
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Delivery Hostel / Hall
                </label>
                <select
                  value={deliveryHostel}
                  onChange={(e) => setDeliveryHostel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  {currentUniversity.hostels.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Room / Block / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Block C, Room 214 or Porter Gate"
                  value={deliveryRoom}
                  onChange={(e) => setDeliveryRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call when outside the hall"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* Wallet deduction info */}
              <div className="flex justify-between items-center text-[11px] pt-1">
                <span className="text-slate-500">Your Campus Allowance Balance:</span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {formatNaira(walletBalance)}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock {formatNaira(activeCheckoutItem.price)} in Escrow</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCheckoutItem(null)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= POST HUSTLE MODAL ======================= */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                List Your Campus Hustle
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateHustle} className="mt-3.5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Hustle / Item Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hot Fried Akara & Bread Combo, Hair Braiding"
                  value={hustleTitle}
                  onChange={(e) => setHustleTitle(e.target.value)}
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
                    value={hustleCategory}
                    onChange={(e) => setHustleCategory(e.target.value as MarketCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="food">Food & Chow</option>
                    <option value="thrift">Thrift Fashion</option>
                    <option value="tech">Tech Repair</option>
                    <option value="grooming">Hair & Beauty</option>
                    <option value="print">Printing & Past Qs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    min="200"
                    step="100"
                    value={hustlePrice}
                    onChange={(e) => setHustlePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Delivery Turnaround (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={hustleDeliveryTime}
                  onChange={(e) => setHustleDeliveryTime(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Description & What's Included
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Freshly fried with spicy pepper sauce. Delivered hot to your room."
                  value={hustleDescription}
                  onChange={(e) => setHustleDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Publish Hustle
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
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
