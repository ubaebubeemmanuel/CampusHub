import {
  University,
  Lodge,
  RoommateProfile,
  CampusLandmark,
  MarketItem,
  ClassDue,
  ClassStudentRoster,
  EscrowOrder,
  BudgetExpense
} from '../types';

import { NIGERIAN_UNIVERSITIES } from './universities';

export const UNIVERSITIES: University[] = NIGERIAN_UNIVERSITIES;

export const MOCK_LODGES: Lodge[] = [
  {
    id: 'lodge-1',
    universityId: 'unilag',
    title: 'The Oasis Executive Self-Contain Suites',
    pricePerYear: 450000,
    roomType: 'Self-Con',
    location: 'Abule Oja, 4 mins to UNILAG Back Gate',
    distanceToGateMinutes: 4,
    powerScore: '24/7 Solar Backup & Band A Grid',
    waterScore: 'Treated Borehole + In-room Tap',
    image: '/src/assets/images/lodge_exterior_lagos_1794492303395.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.8,
    reviewsCount: 34,
    description: 'Fully tiled self-contain apartment with private kitchenette, ensuite restroom, personal prepaid prepaid meter, and dedicated security guards.',
    features: ['Solar Inverter 24/7', 'Zero Inspection Fee', 'Tiled Floors', 'Paved Gated Compound', 'Uniformed Guard'],
    contactPhone: '+234 803 456 7890',
    landlordName: 'Engr. Babatunde (Verified Landlord)'
  },
  {
    id: 'lodge-2',
    universityId: 'unilag',
    title: 'Heritage Scholars 2-Bedroom Shared Flat',
    pricePerYear: 320000,
    roomType: '2-Bed Shared',
    location: 'Iwaya Road, near St. Dominic Catholic Church',
    distanceToGateMinutes: 8,
    powerScore: 'Gen Hours (7pm - 12am) + Band B',
    waterScore: 'Overhead 5000L Water Reservoir',
    image: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.6,
    reviewsCount: 19,
    description: 'Spacious shared flat for 2 students. Each room has a personal reading wardrobe and pre-installed ceiling fans. Quiet study environment.',
    features: ['Balcony View', 'Study Desk Setup', 'Kitchen Cabinets', 'CCTV on Corridor', 'Waste Management Included'],
    contactPhone: '+234 812 345 6789',
    landlordName: 'Mrs. Alake Adeyemi (Direct Owner)'
  },
  {
    id: 'lodge-3',
    universityId: 'unilag',
    title: 'Akoka Greenfield Studio Apartment',
    pricePerYear: 280000,
    roomType: 'Single Room',
    location: 'Community Road, Akoka',
    distanceToGateMinutes: 6,
    powerScore: 'Band A Electricity (18+ hrs daily)',
    waterScore: 'Borehole Running 24/7',
    image: '/src/assets/images/lodge_exterior_lagos_1794492303395.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.4,
    reviewsCount: 28,
    description: 'Affordable single room studio with shared spotless kitchen and wash facilities. Very safe street with student community.',
    features: ['Gated Street Security', 'Borehole Water', 'Regular Power', 'Near Keke Park', 'No Agency Commission'],
    contactPhone: '+234 705 987 6543',
    landlordName: 'Chief Okonkwo'
  },
  {
    id: 'lodge-4',
    universityId: 'unilag',
    title: 'Lagoon Crest Luxury Mini-Flat',
    pricePerYear: 750000,
    roomType: 'Mini-Flat',
    location: 'Onike Roundabout, Yaba',
    distanceToGateMinutes: 12,
    powerScore: 'Dedicated Inverter + Generator Hub',
    waterScore: 'Reverse Osmosis Treated Water',
    image: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.9,
    reviewsCount: 12,
    description: 'High-end mini flat with sitting parlour, private bedroom, modern POP ceilings, and reserved parking. Suited for postgraduate or senior students.',
    features: ['POP Ceiling & Spotlights', '24/7 Solar Backup', 'Private Balcony', 'Smart Lock Access', 'Car Park Space'],
    contactPhone: '+234 802 111 2233',
    landlordName: 'Dr. (Barr.) Fashola'
  },
  // UNN Lodges
  {
    id: 'lodge-5',
    universityId: 'unn',
    title: 'Hilltop Pine Crest Self-Con',
    pricePerYear: 260000,
    roomType: 'Self-Con',
    location: 'Hilltop Junction, Nsukka',
    distanceToGateMinutes: 5,
    powerScore: 'Solar Inverter + Solar Streetlights',
    waterScore: 'Deep Well Borehole with Pumping Machine',
    image: '/src/assets/images/lodge_exterior_lagos_1794492303395.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.7,
    reviewsCount: 22,
    description: 'Peaceful student lodge right by Hilltop gate. Gated with security fence, student caretaker on site, no landlord harassment.',
    features: ['Solar Lighting', 'Borehole Pump', 'Zero Agent Fee', 'Perimeter Fence', 'Fast Walk to Franco'],
    contactPhone: '+234 806 777 8899',
    landlordName: 'Elder Nnamdi'
  },
  // ABU Lodges
  {
    id: 'lodge-6',
    universityId: 'abu',
    title: 'Samaru Grace Lodge Single Suites',
    pricePerYear: 180000,
    roomType: 'Self-Con',
    location: 'Behind PZ Quarters, Samaru, Zaria',
    distanceToGateMinutes: 7,
    powerScore: 'Steady Solar Lighting & Generator',
    waterScore: 'Overhead Borehole Tanks',
    image: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
    verifiedLandlord: true,
    zeroInspectionFee: true,
    rating: 4.5,
    reviewsCount: 15,
    description: 'Affordable self-contain units for ABU scholars. Safe neighborhood, active neighborhood watch, close to Samaru market.',
    features: ['Low Annual Rent', 'Borehole Water', 'Secure Compound', 'No Landlord Drama', 'Direct Lease'],
    contactPhone: '+234 803 222 9900',
    landlordName: 'Mallam Abdullahi'
  }
];

export const MOCK_ROOMMATES: RoommateProfile[] = [
  {
    id: 'roommate-1',
    universityId: 'unilag',
    name: 'Tobi Adeleke',
    avatar: 'TA',
    department: 'Computer Science',
    level: '300L',
    budgetShareMax: 225000,
    gender: 'Male',
    lifestyleTags: ['Quiet Study', 'Night Owl', 'Neat Freak', 'Codes Late'],
    compatibilityScore: 94,
    preferredLocation: 'Abule Oja / Iwaya (Near Back Gate)',
    about: 'Tech enthusiast & freelance developer. Mostly on my laptop with headphones. Super clean with kitchen and bathroom chores.',
    verifiedStudent: true,
    matricPreview: '210408***'
  },
  {
    id: 'roommate-2',
    universityId: 'unilag',
    name: 'Zainab Bello',
    avatar: 'ZB',
    department: 'Mass Communication',
    level: '200L',
    budgetShareMax: 200000,
    gender: 'Female',
    lifestyleTags: ['Early Riser', 'Cooks Often', 'Christian Fellowship', 'No Parties'],
    compatibilityScore: 89,
    preferredLocation: 'Akoka / St. Finbarrs Road',
    about: 'Serious student who loves preparing home-cooked meals (jollof, soups) so we can save food money. Looking for a neat female roommate.',
    verifiedStudent: true,
    matricPreview: '220901***'
  },
  {
    id: 'roommate-3',
    universityId: 'unilag',
    name: 'Emeka Umeh',
    avatar: 'EU',
    department: 'Mechanical Engineering',
    level: '400L',
    budgetShareMax: 250000,
    gender: 'Male',
    lifestyleTags: ['Gen Fuel Contributor', 'Weekend Gamer', 'Early Classes'],
    compatibilityScore: 85,
    preferredLocation: 'Bariga / Abule Oja',
    about: 'Final year engineering student. Ready to split generator fuel and Wi-Fi costs equally without stories.',
    verifiedStudent: true,
    matricPreview: '200405***'
  },
  {
    id: 'roommate-4',
    universityId: 'unilag',
    name: 'Blessing Okon',
    avatar: 'BO',
    department: 'Accounting',
    level: '300L',
    budgetShareMax: 180000,
    gender: 'Female',
    lifestyleTags: ['Quiet Study Only', 'No Overnight Guests', 'Neat Freak'],
    compatibilityScore: 91,
    preferredLocation: 'Onike / Yaba',
    about: 'ICAN candidate + student. I value personal boundaries, cleanliness, and a silent study environment after 9 PM.',
    verifiedStudent: true,
    matricPreview: '210204***'
  }
];

export const MOCK_LANDMARKS: CampusLandmark[] = [
  // UNILAG Landmarks
  {
    id: 'lm-1',
    universityId: 'unilag',
    name: 'J.F. Ade Ajayi Auditorium (Main Hall)',
    category: 'theatre',
    xPercent: 48,
    yPercent: 40,
    walkMinutesFromGate: 6,
    bestTip: 'Fully air-conditioned during exams. Arrive 30 mins before large lectures to secure front seats near charging sockets.',
    tipsCount: 42,
    operatingHours: '7:00 AM - 9:00 PM',
    upvotes: 89
  },
  {
    id: 'lm-2',
    universityId: 'unilag',
    name: 'Senate Building & Bursary',
    category: 'admin',
    xPercent: 52,
    yPercent: 28,
    walkMinutesFromGate: 8,
    bestTip: 'Go to 3rd floor Bursary before 11:00 AM to beat the clearance queue. Always keep photocopy of bank teller handy.',
    tipsCount: 38,
    operatingHours: '8:00 AM - 4:00 PM',
    upvotes: 64
  },
  {
    id: 'lm-3',
    universityId: 'unilag',
    name: 'New Hall Buka & Shopping Complex',
    category: 'food',
    xPercent: 32,
    yPercent: 58,
    walkMinutesFromGate: 10,
    bestTip: 'Mama Shade sells the hottest Jollof & Fried Fish at ₦1,200. Best place for emergency document printing at ₦20/page.',
    tipsCount: 65,
    operatingHours: '6:30 AM - 11:00 PM',
    upvotes: 142
  },
  {
    id: 'lm-4',
    universityId: 'unilag',
    name: 'Access Bank & GTCO ATM Gallery',
    category: 'bank',
    xPercent: 42,
    yPercent: 46,
    walkMinutesFromGate: 5,
    bestTip: 'GTCO ATMs dispense crisp cash even on Sunday nights. Free Wi-Fi hotspot outside the glass corridor.',
    tipsCount: 29,
    operatingHours: '24 Hours (ATMs)',
    upvotes: 77
  },
  {
    id: 'lm-5',
    universityId: 'unilag',
    name: 'Moremi & Queen Amina Hostel Hub',
    category: 'hostel',
    xPercent: 25,
    yPercent: 35,
    walkMinutesFromGate: 9,
    bestTip: 'Shuttle bus drop-off directly in front. Porters lodge closes strictly by 10:00 PM on weekdays.',
    tipsCount: 31,
    operatingHours: 'Resident Access Only',
    upvotes: 53
  },
  {
    id: 'lm-6',
    universityId: 'unilag',
    name: 'Lagoon Front Relaxation Park',
    category: 'food',
    xPercent: 68,
    yPercent: 65,
    walkMinutesFromGate: 12,
    bestTip: 'Breezy waterside atmosphere. Perfect for evening group project discussions and suya hangouts after 5 PM.',
    tipsCount: 55,
    operatingHours: '8:00 AM - 7:30 PM',
    upvotes: 110
  },
  {
    id: 'lm-7',
    universityId: 'unilag',
    name: 'Faculty of Science Lecture Theatre (LT 1 & 2)',
    category: 'theatre',
    xPercent: 38,
    yPercent: 44,
    walkMinutesFromGate: 7,
    bestTip: 'Biology and Chemistry practicals holding here. Best photocopy center is at the basement corridor.',
    tipsCount: 24,
    operatingHours: '7:30 AM - 6:00 PM',
    upvotes: 45
  },
  // UNN Landmarks
  {
    id: 'lm-8',
    universityId: 'unn',
    name: 'Nnamdi Azikiwe Library',
    category: 'admin',
    xPercent: 50,
    yPercent: 45,
    walkMinutesFromGate: 5,
    bestTip: 'One of the largest libraries in West Africa. 2nd floor e-library has uninterrupted high-speed internet.',
    tipsCount: 40,
    operatingHours: '8:00 AM - 8:00 PM',
    upvotes: 95
  },
  {
    id: 'lm-9',
    universityId: 'unn',
    name: 'Franco Hall & Sub Cafeteria',
    category: 'food',
    xPercent: 35,
    yPercent: 55,
    walkMinutesFromGate: 8,
    bestTip: 'Delicious Okpa Nsukka warm in the morning for ₦300. Student tricycle hub right outside.',
    tipsCount: 48,
    operatingHours: '6:00 AM - 10:00 PM',
    upvotes: 120
  }
];

export const MOCK_MARKET_ITEMS: MarketItem[] = [
  {
    id: 'm-1',
    universityId: 'unilag',
    title: 'Hot Smoky Party Jollof + Grilled Pepper Chicken Box',
    category: 'food',
    price: 2500,
    sellerName: 'Chef Dammy (Biochem 300L)',
    sellerDepartment: 'Biochemistry 300L',
    sellerRating: 4.9,
    ordersCompleted: 142,
    image: '/src/assets/images/student_jollof_pack_1794492305210.jpg',
    deliveryHostels: ['New Hall', 'Moremi', 'Jaja', 'Mariere', 'Off-Campus Gate'],
    deliveryEstimateMinutes: 20,
    description: 'Freshly prepared wood-smoked party jollof, soft fried sweet dodo, spiced peppered chicken, packed neatly in food carton.',
    verifiedVendor: true
  },
  {
    id: 'm-2',
    universityId: 'unilag',
    title: 'Vintage Washed Graphic Hoodie & Denim Set',
    category: 'thrift',
    price: 8500,
    sellerName: 'Korede Campus Thrift (Law 400L)',
    sellerDepartment: 'Faculty of Law',
    sellerRating: 4.8,
    ordersCompleted: 88,
    image: '/src/assets/images/student_thrift_hoodie_1794492306137.jpg',
    deliveryHostels: ['Moremi', 'Queen Amina', 'New Hall', 'Jaja'],
    deliveryEstimateMinutes: 30,
    description: 'Hand-picked Grade A vintage oversized hoodie. 100% thick cotton, washed and disinfected. Unisex fit.',
    verifiedVendor: true
  },
  {
    id: 'm-3',
    universityId: 'unilag',
    title: 'iPhone & Android Fast Screen / Battery Replacement',
    category: 'tech',
    price: 6000,
    sellerName: 'Engr. Segun Fix (Elect/Elect 500L)',
    sellerDepartment: 'Electrical Engineering',
    sellerRating: 4.9,
    ordersCompleted: 210,
    image: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
    deliveryHostels: ['New Hall Shop 14', 'Hostel Door Delivery'],
    deliveryEstimateMinutes: 45,
    description: 'Same-day repair with 30-day warranty. Screen replacement, charging port fix, laptop thermal paste servicing.',
    verifiedVendor: true
  },
  {
    id: 'm-4',
    universityId: 'unilag',
    title: 'Braids & Knotless Hair Styling (In-Room Service)',
    category: 'grooming',
    price: 5000,
    sellerName: 'Amara Glam (Creative Arts 200L)',
    sellerDepartment: 'Creative Arts',
    sellerRating: 4.9,
    ordersCompleted: 67,
    image: '/src/assets/images/student_thrift_hoodie_1794492306137.jpg',
    deliveryHostels: ['Moremi Hall', 'Queen Amina', 'Fagunwa Hall'],
    deliveryEstimateMinutes: 15,
    description: 'Neat, painless bohemian knotless braids and cornrows. I come directly to your hostel room with all tools.',
    verifiedVendor: true
  },
  {
    id: 'm-5',
    universityId: 'unilag',
    title: 'Urgent Project Document Laser Print & Spiral Binding',
    category: 'print',
    price: 1500,
    sellerName: 'Chuka Fast Print (CSC 400L)',
    sellerDepartment: 'Computer Science',
    sellerRating: 4.7,
    ordersCompleted: 320,
    image: '/src/assets/images/student_jollof_pack_1794492305210.jpg',
    deliveryHostels: ['All Faculty Libraries', 'New Hall'],
    deliveryEstimateMinutes: 15,
    description: 'High-speed color and monochrome laser printing. Spiral comb binding. Send PDF on WhatsApp, pick up in 10 mins.',
    verifiedVendor: true
  }
];

export const INITIAL_ESCROW_ORDERS: EscrowOrder[] = [
  {
    id: 'ord-8821',
    itemId: 'm-1',
    itemTitle: 'Hot Smoky Party Jollof + Grilled Pepper Chicken Box',
    itemImage: '/src/assets/images/student_jollof_pack_1794492305210.jpg',
    sellerName: 'Chef Dammy (Biochem 300L)',
    amount: 2500,
    deliveryHostel: 'New Hall',
    roomNumber: 'Block C, Room 214',
    status: 'delivered', // Ready to release!
    orderTime: 'Today, 1:15 PM',
    specialNote: 'Extra shito pepper sauce please!'
  }
];

export const INITIAL_EXPENSES: BudgetExpense[] = [
  {
    id: 'exp-1',
    title: 'Campus Shuttle bus & Keke to Yaba',
    amount: 400,
    category: 'Transport',
    timestamp: 'Today, 8:30 AM'
  },
  {
    id: 'exp-2',
    title: 'Mama Shade Amala & Goat Meat (New Hall)',
    amount: 1500,
    category: 'Food',
    timestamp: 'Today, 1:45 PM'
  },
  {
    id: 'exp-3',
    title: 'MTN 2.5GB 2-Day Data Plan',
    amount: 600,
    category: 'Data & Airtime',
    timestamp: 'Yesterday, 9:20 PM'
  },
  {
    id: 'exp-4',
    title: 'CSC 312 Past Questions & Course Booklet',
    amount: 1200,
    category: 'Handouts',
    timestamp: 'Nov 10, 11:15 AM'
  }
];

export const MOCK_CLASS_DUES: ClassDue[] = [
  {
    id: 'due-1',
    universityId: 'unilag',
    title: 'CSC 300L Course Pack & Practical Lab Kit',
    departmentOrScope: 'Computer Science Department',
    amount: 3500,
    deadline: 'Nov 30, 2026',
    mandatory: true,
    description: 'Covers printed semester practical manuals, cloud computing lab server token, and mid-term exam logistics.',
    paid: false
  },
  {
    id: 'due-2',
    universityId: 'unilag',
    title: 'Faculty of Science Annual Dues (FASSA)',
    departmentOrScope: 'Faculty of Science',
    amount: 2500,
    deadline: 'Dec 15, 2026',
    mandatory: true,
    description: 'Mandatory faculty clearance dues. Required for signing exam pass and accessing faculty e-library.',
    paid: true,
    paidAt: 'Nov 02, 2026',
    receiptReference: 'CH-FASSA-2026-99214'
  },
  {
    id: 'due-3',
    universityId: 'unilag',
    title: 'SUG Annual Welfare & Insurance Levy',
    departmentOrScope: 'Student Union Government (SUG)',
    amount: 2000,
    deadline: 'Dec 05, 2026',
    mandatory: true,
    description: 'Covers campus health emergency insurance, subsidised campus shuttle tickets, and annual student almanac.',
    paid: false
  },
  {
    id: 'due-4',
    universityId: 'unilag',
    title: 'Departmental Dinner, Awards & Customized Polo',
    departmentOrScope: 'CSC Class of 2026 Exco',
    amount: 6000,
    deadline: 'Jan 10, 2027',
    mandatory: false,
    description: 'Official 300L class social night ticket, luxury buffet dinner, bespoke embroidered department polo, and yearbook listing.',
    paid: false
  }
];

export const MOCK_CLASS_ROSTER: ClassStudentRoster[] = [
  { id: 'st-1', name: 'Chidera Okafor (You)', matricNumber: '210408044', paid: true, paidDate: 'Nov 10, 2026', amountPaid: 3500, phone: '+234 814 123 4567' },
  { id: 'st-2', name: 'Tobi Adeleke', matricNumber: '210408012', paid: true, paidDate: 'Nov 08, 2026', amountPaid: 3500, phone: '+234 803 987 1122' },
  { id: 'st-3', name: 'Korede Balogun', matricNumber: '210408089', paid: false, amountPaid: 0, phone: '+234 705 333 4455' },
  { id: 'st-4', name: 'Fatima Sanusi', matricNumber: '210408031', paid: true, paidDate: 'Nov 05, 2026', amountPaid: 3500, phone: '+234 812 666 7788' },
  { id: 'st-5', name: 'Emeka Umeh', matricNumber: '210408005', paid: false, amountPaid: 0, phone: '+234 802 444 5566' },
  { id: 'st-6', name: 'Blessing Okon', matricNumber: '210408077', paid: true, paidDate: 'Nov 09, 2026', amountPaid: 3500, phone: '+234 901 888 9900' },
  { id: 'st-7', name: 'David Babalola', matricNumber: '210408022', paid: false, amountPaid: 0, phone: '+234 818 222 3344' },
  { id: 'st-8', name: 'Ngozi Eze', matricNumber: '210408053', paid: true, paidDate: 'Nov 11, 2026', amountPaid: 3500, phone: '+234 809 111 2233' },
  { id: 'st-9', name: 'Adebayo Sanni', matricNumber: '210408064', paid: false, amountPaid: 0, phone: '+234 708 555 6677' },
  { id: 'st-10', name: 'Somtochukwu Ani', matricNumber: '210408018', paid: true, paidDate: 'Nov 06, 2026', amountPaid: 3500, phone: '+234 816 777 8899' }
];

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
};

// ================= CAMPUS-AWARE DATA ADAPTERS =================
// Dynamically generates realistic, campus-tailored lodges, roommates,
// map landmarks, and hustles for any Nigerian Federal or State university.

export const getLodgesForUniversity = (uni: University): Lodge[] => {
  const exactMatches = MOCK_LODGES.filter((l) => l.universityId === uni.id);
  if (exactMatches.length >= 3) return exactMatches;

  const area1 = uni.offCampusAreas[0] || `${uni.campus.split(',')[0]} Gate`;
  const area2 = uni.offCampusAreas[1] || 'School Road';
  const area3 = uni.offCampusAreas[2] || 'Back Gate Junction';

  // Regional rent adjustment (Lagos/Abuja/PH higher than Northern/Eastern towns)
  const isHighRentCity = ['Lagos', 'FCT Abuja', 'Rivers'].includes(uni.state);
  const baseSelfCon = isHighRentCity ? 420000 : 240000;
  const baseShared = isHighRentCity ? 290000 : 170000;
  const baseSingle = isHighRentCity ? 250000 : 140000;

  const generated: Lodge[] = [
    {
      id: `${uni.id}-lodge-1`,
      universityId: uni.id,
      title: `${uni.shortName} Scholars Executive Self-Con`,
      pricePerYear: baseSelfCon,
      roomType: 'Self-Con',
      location: `${area1}, 4 mins walk to ${uni.shortName} Main Gate`,
      distanceToGateMinutes: 4,
      powerScore: '24/7 Solar Inverter + Campus Grid',
      waterScore: 'Treated Borehole + In-room Tap',
      image: '/src/assets/images/lodge_exterior_lagos_1794492303395.jpg',
      verifiedLandlord: true,
      zeroInspectionFee: true,
      rating: 4.8,
      reviewsCount: 24,
      description: `Clean, newly painted self-contain suite tailored for ${uni.shortName} students in ${area1}. Gated compound with night security and zero agent commission.`,
      features: ['Solar Inverter 24/7', 'Zero Inspection Fee', 'Tiled Floors', 'Paved Gated Compound'],
      contactPhone: '+234 803 456 7890',
      landlordName: `${uni.state} Direct Hostels (Verified)`
    },
    {
      id: `${uni.id}-lodge-2`,
      universityId: uni.id,
      title: `${area2} Heritage 2-Bed Shared Student Flat`,
      pricePerYear: baseShared,
      roomType: '2-Bed Shared',
      location: `${area2}, near ${uni.shortName} Shuttle Park`,
      distanceToGateMinutes: 7,
      powerScore: 'Estate Gen (7pm - 12am) + Prepaid',
      waterScore: 'Overhead 5000L Reservoir',
      image: '/src/assets/images/lodge_interior_room_1794492304493.jpg',
      verifiedLandlord: true,
      zeroInspectionFee: true,
      rating: 4.6,
      reviewsCount: 16,
      description: `Spacious 2-bedroom apartment in ${area2} perfect for ${uni.shortName} roommates splitting rent. Quiet study atmosphere with fast network reception.`,
      features: ['Study Desk Setup', 'Kitchen Cabinets', 'Fenced Compound', 'No Agency Fee'],
      contactPhone: '+234 812 345 6789',
      landlordName: `Alhaji / Chief Direct Caretaker`
    },
    {
      id: `${uni.id}-lodge-3`,
      universityId: uni.id,
      title: `${area3} Affordable Single Room Studio`,
      pricePerYear: baseSingle,
      roomType: 'Single Room',
      location: `${area3}, ${uni.state}`,
      distanceToGateMinutes: 9,
      powerScore: 'Steady Grid + Solar Corridor Lights',
      waterScore: 'Borehole Running 24/7',
      image: '/src/assets/images/lodge_exterior_lagos_1794492303395.jpg',
      verifiedLandlord: true,
      zeroInspectionFee: true,
      rating: 4.5,
      reviewsCount: 21,
      description: `Budget-friendly student room near ${uni.shortName} (${area3}). Clean shared kitchen and bathroom, safe student-populated street.`,
      features: ['Budget Friendly', 'Borehole Water', 'Student Community', 'Direct Lease'],
      contactPhone: '+234 705 987 6543',
      landlordName: `Verified Hostel Caretaker`
    }
  ];

  return [...exactMatches, ...generated];
};

export const getRoommatesForUniversity = (uni: University): RoommateProfile[] => {
  const exactMatches = MOCK_ROOMMATES.filter((r) => r.universityId === uni.id);
  if (exactMatches.length >= 2) return exactMatches;

  const area1 = uni.offCampusAreas[0] || uni.campus.split(',')[0];
  const area2 = uni.offCampusAreas[1] || 'Gate Area';
  const shareBase = ['Lagos', 'FCT Abuja', 'Rivers'].includes(uni.state) ? 210000 : 120000;

  return [
    {
      id: `${uni.id}-rm-1`,
      universityId: uni.id,
      name: 'Chinedu Eze',
      avatar: 'CE',
      department: 'Computer Science',
      level: '300L',
      budgetShareMax: shareBase,
      gender: 'Male',
      lifestyleTags: ['Quiet Study', 'Night Owl', 'Neat Freak'],
      compatibilityScore: 93,
      preferredLocation: `${area1} (Near ${uni.shortName} Gate)`,
      about: `${uni.shortName} 300L student looking to split a clean self-con or 2-bed flat around ${area1}. Very neat and focused on grades.`,
      verifiedStudent: true,
      matricPreview: `${uni.shortName.slice(0, 3)}/21/***`
    },
    {
      id: `${uni.id}-rm-2`,
      universityId: uni.id,
      name: 'Aisha Mohammed',
      avatar: 'AM',
      department: 'Biochemistry',
      level: '200L',
      budgetShareMax: shareBase - 15000,
      gender: 'Female',
      lifestyleTags: ['Early Riser', 'Cooks Often', 'No Parties'],
      compatibilityScore: 88,
      preferredLocation: `${area2} / ${uni.hostels[0] || 'Campus Axis'}`,
      about: `Looking for an easy-going female ${uni.shortName} student to share rent and groceries around ${area2}.`,
      verifiedStudent: true,
      matricPreview: `${uni.shortName.slice(0, 3)}/22/***`
    },
    {
      id: `${uni.id}-rm-3`,
      universityId: uni.id,
      name: 'Oluwaseun Adeyemi',
      avatar: 'OA',
      department: 'Civil Engineering',
      level: '400L',
      budgetShareMax: shareBase + 25000,
      gender: 'Male',
      lifestyleTags: ['Gen Fuel Contributor', 'Early Classes', 'Respects Privacy'],
      compatibilityScore: 86,
      preferredLocation: `${area1} / ${area2}`,
      about: `400L student at ${uni.shortName}. Ready to split solar/generator contribution equally without drama.`,
      verifiedStudent: true,
      matricPreview: `${uni.shortName.slice(0, 3)}/20/***`
    }
  ];
};

export const getLandmarksForUniversity = (uni: University): CampusLandmark[] => {
  const exactMatches = MOCK_LANDMARKS.filter((lm) => lm.universityId === uni.id);
  if (exactMatches.length >= 4) return exactMatches;

  const mainHostel = uni.hostels[0] || 'Main Student Hostel';
  const mainArea = uni.offCampusAreas[0] || 'Student Centre';

  const generated: CampusLandmark[] = [
    {
      id: `${uni.id}-lm-1`,
      universityId: uni.id,
      name: `${uni.shortName} Main Auditorium / Convocation Hall`,
      category: 'theatre',
      xPercent: 48,
      yPercent: 40,
      walkMinutesFromGate: 6,
      bestTip: `Arrive 25 mins early for GST & Faculty 100L/200L general lectures to get seats near power outlets.`,
      tipsCount: 34,
      operatingHours: '7:00 AM - 8:00 PM',
      upvotes: 76
    },
    {
      id: `${uni.id}-lm-2`,
      universityId: uni.id,
      name: `${uni.shortName} Senate & Bursary Clearance Building`,
      category: 'admin',
      xPercent: 52,
      yPercent: 26,
      walkMinutesFromGate: 8,
      bestTip: `Visit Bursary & Admissions clearance desks before 10:30 AM. Keep 2 photocopies of your school fees receipt.`,
      tipsCount: 28,
      operatingHours: '8:00 AM - 4:00 PM',
      upvotes: 58
    },
    {
      id: `${uni.id}-lm-3`,
      universityId: uni.id,
      name: `${mainHostel} Hub & Student Union Canteen`,
      category: 'hostel',
      xPercent: 26,
      yPercent: 38,
      walkMinutesFromGate: 9,
      bestTip: `Campus shuttle pick-up point directly outside ${mainHostel}. Best spot for affordable night snacks.`,
      tipsCount: 41,
      operatingHours: '6:00 AM - 10:30 PM',
      upvotes: 92
    },
    {
      id: `${uni.id}-lm-4`,
      universityId: uni.id,
      name: `Campus ATM Gallery & Microfinance Bank`,
      category: 'bank',
      xPercent: 40,
      yPercent: 50,
      walkMinutesFromGate: 5,
      bestTip: `Fastest POS & ATM cash withdrawal before 8am classes. Low queue compared to town branches.`,
      tipsCount: 22,
      operatingHours: '24 Hours (ATMs)',
      upvotes: 63
    },
    {
      id: `${uni.id}-lm-5`,
      universityId: uni.id,
      name: `${mainArea} Buka & Photocopy Plaza`,
      category: 'food',
      xPercent: 64,
      yPercent: 62,
      walkMinutesFromGate: 10,
      bestTip: `Hot Jollof, Swallow, and ₦20/page laser printing & spiral binding for assignments and project work.`,
      tipsCount: 51,
      operatingHours: '7:00 AM - 9:30 PM',
      upvotes: 114
    }
  ];

  return [...exactMatches, ...generated];
};

export const getMarketItemsForUniversity = (uni: University): MarketItem[] => {
  const exactMatches = MOCK_MARKET_ITEMS.filter((m) => m.universityId === uni.id);
  if (exactMatches.length >= 4) return exactMatches;

  const hostels = uni.hostels.slice(0, 4);

  return MOCK_MARKET_ITEMS.map((item, idx) => ({
    ...item,
    id: `${uni.id}-${item.id}`,
    universityId: uni.id,
    deliveryHostels: hostels.length > 0 ? hostels : item.deliveryHostels,
    sellerName: idx === 0
      ? `Chef Musa (${uni.shortName} 300L)`
      : idx === 1
      ? `Vee Campus Thrift (${uni.shortName} 400L)`
      : idx === 2
      ? `TechFix ${uni.shortName} (Engr. 500L)`
      : item.sellerName
  }));
};

export const getDuesForUniversity = (uni: University): ClassDue[] => {
  return [
    {
      id: `${uni.id}-due-1`,
      universityId: uni.id,
      title: `${uni.shortName} CSC 300L Practical & Course Pack Levy`,
      departmentOrScope: 'Computer Science Department',
      amount: 3500,
      deadline: 'Nov 30, 2026',
      mandatory: true,
      description: `Covers printed semester lab manuals, ${uni.shortName} departmental practical workbook, and test logistics.`,
      paid: false
    },
    {
      id: `${uni.id}-due-2`,
      universityId: uni.id,
      title: `${uni.shortName} Faculty Annual Clearance Dues`,
      departmentOrScope: 'Faculty Student Association',
      amount: 2500,
      deadline: 'Dec 15, 2026',
      mandatory: true,
      description: 'Mandatory faculty clearance dues required for exam docket signing and faculty library access.',
      paid: true,
      paidAt: 'Nov 02, 2026',
      receiptReference: `CH-${uni.shortName}-2026-99214`
    },
    {
      id: `${uni.id}-due-3`,
      universityId: uni.id,
      title: `${uni.shortName} SUG Annual Welfare & Shuttle Levy`,
      departmentOrScope: 'Student Union Government (SUG)',
      amount: 2000,
      deadline: 'Dec 05, 2026',
      mandatory: true,
      description: 'Covers campus student health support, subsidized campus shuttle passes, and student union welfare.',
      paid: false
    },
    {
      id: `${uni.id}-due-4`,
      universityId: uni.id,
      title: 'Departmental Dinner, Awards & Customized Polo',
      departmentOrScope: `${uni.shortName} Class of 2026 Exco`,
      amount: 6000,
      deadline: 'Jan 10, 2027',
      mandatory: false,
      description: 'Official 300L class social night ticket, buffet dinner, and customized department polo.',
      paid: false
    }
  ];
};

