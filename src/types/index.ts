export type UniversityId = string;

export type UniversityType = 'Federal' | 'State';

export interface University {
  id: UniversityId;
  name: string;
  shortName: string;
  campus: string;
  state: string;
  type: UniversityType;
  hostels: string[];
  offCampusAreas: string[];
}

export type ViewMode = 'student' | 'rep_vendor';

export type TabId = 'living' | 'map' | 'market' | 'wallet';

export interface Lodge {
  id: string;
  universityId: UniversityId;
  title: string;
  pricePerYear: number;
  roomType: 'Self-Con' | '2-Bed Shared' | 'Single Room' | 'Mini-Flat';
  location: string;
  distanceToGateMinutes: number;
  powerScore: string; // e.g. "24/7 Solar Backup" | "Band A (18-20 hrs)" | "Gen 7pm-12am"
  waterScore: string; // e.g. "Borehole + In-room tap" | "Overhead Tank"
  image: string;
  verifiedLandlord: boolean;
  zeroInspectionFee: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  contactPhone: string;
  landlordName: string;
}

export interface RoommateProfile {
  id: string;
  universityId: UniversityId;
  name: string;
  avatar: string;
  department: string;
  level: string; // e.g. "300L"
  budgetShareMax: number;
  gender: 'Male' | 'Female';
  lifestyleTags: string[];
  compatibilityScore: number;
  preferredLocation: string;
  about: string;
  verifiedStudent: boolean;
  matricPreview: string;
}

export type LandmarkCategory = 'theatre' | 'hostel' | 'bank' | 'food' | 'admin';

export interface CampusLandmark {
  id: string;
  universityId: UniversityId;
  name: string;
  category: LandmarkCategory;
  xPercent: number; // 0-100 on interactive campus vector map
  yPercent: number;
  walkMinutesFromGate: number;
  bestTip: string;
  tipsCount: number;
  operatingHours: string;
  upvotes: number;
}

export type MarketCategory = 'all' | 'food' | 'thrift' | 'tech' | 'laundry' | 'grooming' | 'print';

export interface MarketItem {
  id: string;
  universityId: UniversityId;
  title: string;
  category: MarketCategory;
  price: number;
  sellerName: string;
  sellerDepartment: string;
  sellerRating: number;
  ordersCompleted: number;
  image: string;
  deliveryHostels: string[];
  deliveryEstimateMinutes: number;
  description: string;
  verifiedVendor: boolean;
}

export interface EscrowOrder {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  sellerName: string;
  amount: number;
  deliveryHostel: string;
  roomNumber: string;
  status: 'held_in_escrow' | 'dispatched' | 'delivered' | 'funds_released';
  orderTime: string;
  specialNote?: string;
}

export interface BudgetExpense {
  id: string;
  title: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Data & Airtime' | 'Handouts' | 'Misc';
  timestamp: string;
}

export interface ClassDue {
  id: string;
  universityId: UniversityId;
  title: string;
  departmentOrScope: string;
  amount: number;
  deadline: string;
  mandatory: boolean;
  description: string;
  paid: boolean;
  paidAt?: string;
  receiptReference?: string;
}

export interface ClassStudentRoster {
  id: string;
  name: string;
  matricNumber: string;
  paid: boolean;
  paidDate?: string;
  amountPaid: number;
  phone: string;
}
