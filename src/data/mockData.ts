import { Product, StudentStore, User, ChatConversation, ChatMessage, NotificationItem, CampaignAnalytics, LearningModule, PickupSpot, JobListing, StudyServiceItem, CampusUtilityPost, AppSettings, FlashSaleItem, LiveSellingStream, CampusDealPartner, LoyaltyReward, EntrepreneurChallenge, BusinessCollaborationPost, StudentPoll, CampusNewsEvent, AIForecastItem, StudentPortfolioData } from '../types';

export const DEFAULT_SETTINGS: AppSettings = {
  primaryCampus: 'Politeknik Sultan Azlan Shah (PSAS Behrang)',
  defaultPickupSpot: 'PSAS Main Library Lobby',
  preferredContactMethod: 'whatsapp',

  notifyNewMessages: true,
  notifyPriceDrops: true,
  notifyJobAlerts: true,
  notifyDailyDeals: true,
  notifySoundEnabled: true,
  notifySmsStatus: false,

  showPhonePublicly: true,
  showMatricToVerifiedOnly: true,
  strictScamFilter: true,
  showTrustScorePublicly: true,
  enable2FA: true,
  defaultAccessRole: 'editor',
  allowEditorPermissions: true,

  defaultEWalletProvider: 'DuitNow',
  duitNowNumber: '012-8849201',
  bankAccountName: 'Ahmad Faiz Bin Rosli',
  bankAccountNumber: '158024910284',
  bankName: 'Maybank Islamic',

  storeVisibility: true,
  autoReplyEnabled: true,
  autoReplyMessage: 'Salam & hi! Thanks for reaching out to my PSAS listing. I am usually available for campus pickup between 12 PM - 2 PM & after 5 PM.',
  showCommerceBadge: true,

  language: 'English',
  themeMode: 'light',
  dataSaverMode: false,

  appName: 'Campus Corner',
  appTagline: 'Verified Student Marketplace',
  appDescription: 'Polytechnic Campus Marketplace, Commerce Student Business Hub, AI Price Estimator, Campaign Analytics, and Marketing Learning Hub.',
  appLogoType: 'icon',
  appLogoEmoji: '🛍️',
  appLogoUrl: '',
};

export const CURRENT_USER: User = {
  id: 'usr_me',
  name: 'Ahmad Faiz',
  studentId: '15DPM23F1008',
  email: 'faiz.15dpm23f1008@student.polytechnic.edu.my',
  department: 'Commerce (Jabatan Perdagangan)',
  course: 'Diploma in Marketing (DPM)',
  semester: 2,
  trustScore: 98,
  verified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '012-8849201',
  storeId: 'store_fresco',
  wishlist: ['prod_casio', 'prod_note_mkt'],
  reviewsReceived: [
    {
      id: 'rev_1',
      transactionId: 'tx_101',
      targetUserId: 'usr_me',
      reviewerId: 'usr_2',
      reviewerName: 'Siti Nurhaliza',
      reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Super fast seller! Tiramisu was delicious and freshly made for Digital Entrepreneurship project.',
      date: 'Yesterday at 3:15 PM',
      itemTitle: 'Fresco Tiramisu Dessert Cup',
    },
    {
      id: 'rev_2',
      transactionId: 'tx_102',
      targetUserId: 'usr_me',
      reviewerId: 'usr_3',
      reviewerName: 'Kevashan Nair',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Book in excellent condition as described. Smooth pickup at PSAS Library.',
      date: '3 days ago',
      itemTitle: 'Financial Accounting 2nd Ed Textbook',
    }
  ],
  totalSales: 18,
  reportCount: 0,
  scamWarning: false,
};

export const PICKUP_SPOTS: PickupSpot[] = [
  {
    id: 'spot_lib',
    name: 'PSAS Main Library Lobby',
    building: 'Perpustakaan PSAS',
    description: 'Well-lit area with security guard station & CCTV cameras.',
    safetyScore: '10/10 Safe Spot',
    popularTimes: '8:00 AM - 5:00 PM',
  },
  {
    id: 'spot_sc',
    name: 'Student Centre Pavilion',
    building: 'Pusat Pelajar',
    description: 'Central open space with benches & student union desk.',
    safetyScore: '9.8/10 Safe Spot',
    popularTimes: '10:00 AM - 6:00 PM',
  },
  {
    id: 'spot_caf',
    name: 'Commerce Cafeteria Food Court',
    building: 'Kafeteria Perdagangan',
    description: 'Busy dining area, ideal for quick daytime transactions.',
    safetyScore: '9.5/10 Safe Spot',
    popularTimes: '11:00 AM - 3:00 PM',
  },
  {
    id: 'spot_comm',
    name: 'Commerce Dept Block A Entrance',
    building: 'Bangunan Perdagangan',
    description: 'Directly in front of lecturer offices and faculty foyer.',
    safetyScore: '9.9/10 Safe Spot',
    popularTimes: '8:30 AM - 4:30 PM',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_casio',
    title: 'Casio FX-570EX ClassWiz Calculator',
    category: 'Calculator',
    condition: 'Like New',
    price: 55,
    originalPrice: 85,
    images: ['https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_2',
    sellerName: 'Siti Nurhaliza',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 99,
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'PSAS Main Library Lobby',
    availableUntil: '2026-08-15',
    createdAt: '2 hours ago',
    views: 142,
    clicks: 38,
    messagesCount: 9,
    salesCount: 0,
    isFeatured: true,
    description: 'Casio FX-570EX ClassWiz original scientific calculator. Used for 1 semester in Business Mathematics & Financial Accounting. High resolution LCD display, solar + battery powered. Clear screen, no scratches.',
  },
  {
    id: 'prod_mkt_book',
    title: 'Principles of Marketing (Malaysian Edition) Textbook',
    category: 'Books',
    condition: 'Used',
    price: 25,
    originalPrice: 65,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_3',
    sellerName: 'Kevashan Nair',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 97,
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'Commerce Dept Block A Entrance',
    availableUntil: '2026-08-30',
    createdAt: '5 hours ago',
    views: 215,
    clicks: 64,
    messagesCount: 14,
    salesCount: 1,
    isFeatured: true,
    description: 'Essential textbook for DPM / DAT / DPK Semester 1 & 2 Commerce students. Includes complete case studies on STP, 4Ps, and Digital Marketing in Malaysia. Light pencil highlights on Chapter 3.',
  },
  {
    id: 'prod_tiramisu',
    title: 'Fresco Tiramisu Cup (Digital Entrepreneurship FYP)',
    category: 'Student Businesses',
    condition: 'New',
    price: 8,
    images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_me',
    sellerName: 'Ahmad Faiz (Fresco Store)',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 98,
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'Commerce Cafeteria Food Court',
    availableUntil: '2026-08-10',
    createdAt: '1 day ago',
    views: 380,
    clicks: 110,
    messagesCount: 28,
    salesCount: 18,
    isFeatured: true,
    storeId: 'store_fresco',
    description: 'Handcrafted premium coffee-infused Tiramisu made fresh daily for our Commerce Digital Entrepreneurship Project! Premium mascarpone cream, cocoa dust, and ladyfinger sponge.',
  },
  {
    id: 'prod_canva_bmc',
    title: 'Business Model Canvas (BMC) & Pitch Deck Canva Template',
    category: 'Assignment Templates',
    templateCategory: 'Entrepreneurship',
    fileType: 'Canva Template + PPTX',
    condition: 'New',
    price: 12,
    images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_4',
    sellerName: 'Nurul Ain',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 100,
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'Instant Digital Download / Chat',
    availableUntil: '2026-12-31',
    createdAt: '2 days ago',
    views: 490,
    clicks: 185,
    messagesCount: 32,
    salesCount: 24,
    isFeatured: true,
    description: 'Tested 100% High Mark template for Polytechnic Entrepreneurship (DPB2012) BMC presentations. Includes 15 customizable slides, infographic charts, and sample case study entries.',
  },
  {
    id: 'prod_note_mkt',
    title: 'Complete Digital Marketing Summary Notes (Sem 2 DPM)',
    category: 'Notes',
    condition: 'Like New',
    price: 10,
    images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_4',
    sellerName: 'Nurul Ain',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 100,
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'PSAS Main Library Lobby',
    availableUntil: '2026-09-01',
    createdAt: '3 days ago',
    views: 180,
    clicks: 52,
    messagesCount: 11,
    salesCount: 7,
    description: 'Neatly organized PDF notes with mindmaps for Digital Marketing topics: SEO, Social Media Ads, Sales Funnels, ROI Metrics, and Email Marketing. Perfect for final exams revision.',
  },
  {
    id: 'prod_service_logo',
    title: 'Professional Logo & Poster Design Service for Student Businesses',
    category: 'Services',
    condition: 'New',
    price: 20,
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_5',
    sellerName: 'Daniel Wong',
    sellerDepartment: 'Graphic Design & Media',
    sellerTrustScore: 96,
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'Online Delivery (24 Hour turnaround)',
    availableUntil: '2026-11-30',
    createdAt: '4 days ago',
    views: 310,
    clicks: 95,
    messagesCount: 19,
    salesCount: 12,
    description: 'Need a stunning logo or marketing poster for your Digital Entrepreneurship business project? I provide 3 logo concepts, high-res PNG/SVG vectors, and social media post mockups.',
  },
  {
    id: 'prod_fvd',
    title: 'RM15 Campus Cafeteria Food Voucher (Special Discount)',
    category: 'Food Voucher',
    condition: 'New',
    price: 10,
    originalPrice: 15,
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_2',
    sellerName: 'Siti Nurhaliza',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 99,
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'Student Centre Pavilion',
    availableUntil: '2026-08-05',
    createdAt: '1 hour ago',
    views: 95,
    clicks: 40,
    messagesCount: 6,
    salesCount: 2,
    description: 'Valid at all PSAS Main Cafeteria stalls including Western, Nasi Kandar, and Juice Bar. Valid until end of month.',
  },
  {
    id: 'prod_hp_laptop',
    title: 'HP Pavilion 14 Laptop (Intel i5, 8GB RAM, 512GB SSD)',
    category: 'Laptop',
    condition: 'Used',
    price: 880,
    originalPrice: 2200,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80'],
    sellerId: 'usr_3',
    sellerName: 'Kevashan Nair',
    sellerDepartment: 'Commerce (Jabatan Perdagangan)',
    sellerTrustScore: 97,
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerVerified: true,
    pickupLocation: 'PSAS Main Library Lobby',
    availableUntil: '2026-08-20',
    createdAt: '1 day ago',
    views: 520,
    clicks: 140,
    messagesCount: 22,
    salesCount: 0,
    description: 'Great condition laptop for assignment typing, Excel financial modeling, and Zoom presentations. Battery health 85%, comes with original charger and laptop bag.',
  }
];

export const INITIAL_STORES: StudentStore[] = [
  {
    id: 'store_fresco',
    storeName: 'Fresco Tiramisu Studio',
    logoUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    ownerId: 'usr_me',
    ownerName: 'Ahmad Faiz',
    department: 'Commerce (Jabatan Perdagangan)',
    category: 'Food & Desserts',
    rating: 4.9,
    followers: 124,
    description: 'Polytechnic student mini business crafting authentic Italian desserts & cold coffee brews on campus.',
    productsCount: 3,
    featuredProductIds: ['prod_tiramisu'],
  },
  {
    id: 'store_digidesign',
    storeName: 'PixeLab Studio & Canva Templates',
    logoUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80',
    ownerId: 'usr_4',
    ownerName: 'Nurul Ain',
    department: 'Commerce (Jabatan Perdagangan)',
    category: 'Digital Templates & Design',
    rating: 5.0,
    followers: 210,
    description: 'Premium presentation decks, BMC graphics, poster templates, and assignment formatting for Polytechnic students.',
    productsCount: 8,
    featuredProductIds: ['prod_canva_bmc', 'prod_note_mkt'],
  }
];

export const INITIAL_CAMPAIGN: CampaignAnalytics = {
  storeId: 'store_fresco',
  storeName: 'Fresco Tiramisu Studio',
  visitors: 380,
  clicks: 110,
  messages: 28,
  sales: 18,
  revenue: 144, // 18 * 8
  conversionRate: 4.7, // (18 / 380) * 100
  dailyData: [
    { day: 'Mon', visitors: 35, clicks: 12, sales: 2, revenue: 16 },
    { day: 'Tue', visitors: 48, clicks: 15, sales: 3, revenue: 24 },
    { day: 'Wed', visitors: 62, clicks: 20, sales: 4, revenue: 32 },
    { day: 'Thu', visitors: 75, clicks: 24, sales: 3, revenue: 24 },
    { day: 'Fri', visitors: 90, clicks: 22, sales: 4, revenue: 32 },
    { day: 'Sat', visitors: 40, clicks: 10, sales: 1, revenue: 8 },
    { day: 'Sun', visitors: 30, clicks: 7, sales: 1, revenue: 8 },
  ],
  topProducts: [
    { id: 'prod_tiramisu', title: 'Fresco Tiramisu Dessert Cup', views: 380, clicks: 110, sales: 18, conversion: '4.7%' },
    { id: 'prod_coldbrew', title: 'Artisan Cold Brew Coffee (250ml)', views: 140, clicks: 45, sales: 8, conversion: '5.7%' },
  ]
};

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv_1',
    productId: 'prod_casio',
    productTitle: 'Casio FX-570EX ClassWiz Calculator',
    productPrice: 55,
    productImage: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=200&auto=format&fit=crop&q=80',
    buyerId: 'usr_me',
    buyerName: 'Ahmad Faiz',
    buyerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sellerId: 'usr_2',
    sellerName: 'Siti Nurhaliza',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Deal! Let us meet at PSAS Library at 2:30 PM.',
    lastTimestamp: '10:42 AM',
    unreadCount: 1,
    transactionStatus: 'offer_agreed',
    agreedPrice: 50,
    agreedPickupPoint: 'PSAS Main Library Lobby',
    buyerReviewed: false,
    sellerReviewed: false,
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  conv_1: [
    {
      id: 'm1',
      conversationId: 'conv_1',
      senderId: 'usr_me',
      senderName: 'Ahmad Faiz',
      text: 'Hi Siti! Is this Casio calculator still available for Commerce Sem 2?',
      timestamp: '10:30 AM',
    },
    {
      id: 'm2',
      conversationId: 'conv_1',
      senderId: 'usr_2',
      senderName: 'Siti Nurhaliza',
      text: 'Hi Faiz! Yes, still available. It works perfectly and screen is super clear.',
      timestamp: '10:32 AM',
    },
    {
      id: 'm3',
      conversationId: 'conv_1',
      senderId: 'usr_me',
      senderName: 'Ahmad Faiz',
      text: 'Can offer RM50? I can meet up at campus today.',
      timestamp: '10:35 AM',
      isOffer: true,
      offerPrice: 50,
      offerStatus: 'accepted',
    },
    {
      id: 'm4',
      conversationId: 'conv_1',
      senderId: 'usr_2',
      senderName: 'Siti Nurhaliza',
      text: 'Accepted RM 50 offer! Let us meet at the safe pickup point.',
      timestamp: '10:38 AM',
      isMeetupPoint: true,
      meetupLocation: 'PSAS Main Library Lobby',
    },
    {
      id: 'm5',
      conversationId: 'conv_1',
      senderId: 'usr_2',
      senderName: 'Siti Nurhaliza',
      text: 'Deal! Let us meet at PSAS Library at 2:30 PM.',
      timestamp: '10:42 AM',
    }
  ]
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'New Offer Received!',
    message: 'Siti Nurhaliza accepted your RM50 offer for Casio Calculator.',
    type: 'message',
    timestamp: '10 min ago',
    read: false,
    linkId: 'conv_1',
  },
  {
    id: 'notif_2',
    title: 'Product Liked',
    message: 'Kevashan Nair added your Fresco Tiramisu to wishlist.',
    type: 'like',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Campaign Milestone ⭐',
    message: 'Fresco Store hit 18 sales! Conversion rate reached 4.7%.',
    type: 'campaign',
    timestamp: '3 hours ago',
    read: true,
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod_pricing',
    title: 'Pricing Strategy & Value Optimization',
    category: 'Pricing',
    duration: '10 min read',
    icon: 'Tag',
    description: 'Learn Penetration Pricing, Skimming, Cost-Plus, and Psychological Pricing (e.g. RM25 vs RM29.90) for student businesses.',
    lessons: [
      {
        id: 'l1',
        title: 'Selecting the Right Pricing Strategy for Campus',
        content: `When selling to fellow students, pricing sensitivity is high.
        
1. **Penetration Pricing**: Set a lower introductory price (e.g., RM 8 for Tiramisu) to build quick brand trust and accumulate 5-star reviews.
2. **Value-Based Pricing**: Highlight time savings. Selling pre-formatted Canva templates for RM 12 saves students 4 hours of assignment work.
3. **Psychological Endings**: Prices ending in .00 or odd numbers (.90) trigger higher impulse buys on mobile feeds.`,
        keyTakeaways: [
          'High price sensitivity requires clear value communication.',
          'Penetration pricing builds initial review momentum.',
          'Highlight saved time/effort for assignment templates and notes.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Which pricing strategy sets a low introductory price to quickly gain campus market share?',
        options: ['Price Skimming', 'Penetration Pricing', 'Cost-Plus Pricing', 'Premium Lock-in'],
        correctIndex: 1,
        explanation: 'Penetration Pricing attracts price-sensitive campus buyers fast to build early social proof and reviews.',
      },
      {
        question: 'If a student spends RM 4 on ingredients and wants a 50% profit margin, what should the selling price be?',
        options: ['RM 5.00', 'RM 6.00', 'RM 8.00', 'RM 10.00'],
        correctIndex: 2,
        explanation: 'Cost (RM4) + Margin (RM4 = 50% of RM8 selling price) = RM 8.00.',
      },
    ],
  },
  {
    id: 'mod_stp',
    title: 'STP Marketing: Segmentation, Targeting, Positioning',
    category: 'Strategy',
    duration: '12 min read',
    icon: 'Target',
    description: 'Master how to target specific polytechnic semesters, departments (Commerce vs Engineering), and position your product.',
    lessons: [
      {
        id: 'l2',
        title: 'Defining Your Campus Target Audience',
        content: `Don't try to sell to "everyone on campus". Segment by:
        
• **Demographics**: Diploma vs Degree, Semester 1 vs Final Year.
• **Academic Need**: Commerce students need Calculators & Accounting books; Engineering students need drafting tools.
• **Positioning Statement**: "Fresco is the freshest hand-brewed coffee delivered directly to PSAS Library during exam week."`,
        keyTakeaways: [
          'Segment by semester and faculty for higher response rates.',
          'Position around convenience and exam time relief.',
        ],
      },
    ],
    quiz: [
      {
        question: 'In STP marketing, what does the letter "T" stand for?',
        options: ['Testing', 'Targeting', 'Timing', 'Tactics'],
        correctIndex: 1,
        explanation: 'STP stands for Segmentation, Targeting, and Positioning.',
      },
    ],
  },
  {
    id: 'mod_funnel',
    title: 'Digital Marketing & Conversion Funnels',
    category: 'Analytics',
    duration: '15 min read',
    icon: 'TrendingUp',
    description: 'Understand the sales funnel: Impressions → Product Clicks → Chat Messages → Closed Sales.',
    lessons: [
      {
        id: 'l3',
        title: 'Optimizing Your Campaign Conversion Rate',
        content: `Conversion Rate = (Completed Sales / Total Visitors) × 100%.
        
• **Top of Funnel (Awareness)**: Clear high-res photos increase clicks.
• **Middle of Funnel (Interest)**: Clear condition badges and AI descriptions answer buyer doubts.
• **Bottom of Funnel (Action)**: Offering safe campus pickup spots (e.g. PSAS Library) removes friction and seals the deal.`,
        keyTakeaways: [
          'Target a campus conversion benchmark of 3% - 6%.',
          'Fast chat responses double buyer closing rate.',
        ],
      },
    ],
    quiz: [
      {
        question: 'If 200 students view your listing and 10 make a purchase, what is your conversion rate?',
        options: ['2%', '5%', '10%', '20%'],
        correctIndex: 1,
        explanation: '(10 / 200) * 100 = 5% Conversion Rate.',
      },
    ],
  },
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'PolyCafe Kitchen & Beverage Helper',
    employer: 'PolyCafe PSAS Main Hall',
    employerVerified: true,
    category: 'Cafe/Food',
    hourlyWage: 8,
    payRate: 'RM 8.00 / hour',
    workingHours: '11:00 AM - 3:00 PM (Flexi shifts around classes)',
    location: 'PSAS Student Centre PolyCafe',
    description: 'Help with beverage preparation, cash register counter, and maintaining clean dining tables during peak lunch hours.',
    requirements: ['PSAS Student ID required', 'Friendly communication', 'Punctual & hygienic'],
    sdgBadge: 'SDG 8: Decent Work & Economic Growth',
    contactPerson: 'Puan Maznah (Cafe Manager)',
    contactPhone: '019-3321882',
    postedDate: 'Today',
  },
  {
    id: 'job_2',
    title: 'Koperasi PSAS Sales & Inventory Promoter',
    employer: 'Koperasi Politeknik PSAS Berhad',
    employerVerified: true,
    category: 'Retail/Promoter',
    hourlyWage: 9,
    payRate: 'RM 9.00 / hour + Commission',
    workingHours: '8:30 AM - 12:30 PM (Mon-Wed)',
    location: 'Koperasi PSAS Block B',
    description: 'Assist student shoppers with stationery, uniforms, digital print services, and managing stock inventory barcode scanning.',
    requirements: ['Commerce or Business background preferred', 'Basic cashier skills'],
    sdgBadge: 'SDG 8: Decent Work & Economic Growth',
    contactPerson: 'Encik Rosli (Koperasi Admin)',
    contactPhone: '013-5592011',
    postedDate: '1 day ago',
  },
  {
    id: 'job_3',
    title: 'Student Research & Faculty Assistant',
    employer: 'Commerce Dept Head Office',
    employerVerified: true,
    category: 'Academic/Assistant',
    hourlyWage: 10,
    payRate: 'RM 10.00 / hour',
    workingHours: '6 hours / week (Flexible according to timetable)',
    location: 'Jabatan Perdagangan Block A Level 2',
    description: 'Assist lecturers in organizing FYP digital submission archives, printing tutorial worksheets, and student attendance entry.',
    requirements: ['Semester 3-5 Commerce Student', 'Good Excel/Word skills', 'CGPA 3.2+'],
    sdgBadge: 'SDG 8: Decent Work & Economic Growth',
    contactPerson: 'Dr. Zulkifli (Senior Lecturer)',
    contactPhone: '012-4419088',
    postedDate: '2 days ago',
  },
  {
    id: 'job_4',
    title: 'Grand Campus Career Fair Event Crew',
    employer: 'PSAS Student Affairs & Alumni Dept',
    employerVerified: true,
    category: 'Event Crew',
    hourlyWage: 12,
    payRate: 'RM 80.00 / day (Meal provided)',
    workingHours: '8:00 AM - 5:00 PM (1-Day Event)',
    location: 'Dewan Mu\'adzam Shah PSAS',
    description: 'ushering company representatives, managing VIP registration booth, audio visual assistant, and crowd direction.',
    requirements: ['Active club/society member', 'High energy & polite', 'PSAS T-shirt provided'],
    sdgBadge: 'SDG 8: Decent Work & Economic Growth',
    contactPerson: 'Sir Hafiz (HEP Coordinator)',
    contactPhone: '017-6628100',
    postedDate: '3 days ago',
  },
  {
    id: 'job_5',
    title: 'Canteen Weekend Food Stall Assistant',
    employer: 'Selera Kampung Stall #4',
    employerVerified: true,
    category: 'Cafe/Food',
    hourlyWage: 8.5,
    payRate: 'RM 8.50 / hour',
    workingHours: '8:00 AM - 2:00 PM (Saturday & Sunday)',
    location: 'PSAS Residential College Canteen',
    description: 'Packing nasi lemak packets, serving student orders, and managing food display warmers.',
    requirements: ['Typhoid vaccination certificate (reimbursable)', 'Honest & fast learner'],
    sdgBadge: 'SDG 8: Decent Work & Economic Growth',
    contactPerson: 'Kak Rose (Stall Owner)',
    contactPhone: '011-2290119',
    postedDate: '4 days ago',
  }
];

export const INITIAL_STUDY_SERVICES: StudyServiceItem[] = [
  {
    id: 'srv_note_1',
    title: 'Complete DPM30023 Integrated Marketing Mindmaps & Notes',
    type: 'note',
    subject: 'Integrated Marketing Communication (IMC)',
    authorName: 'Siti Nurhaliza (Sem 5 Top Student)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    authorTrustScore: 99,
    authorVerified: true,
    price: 12,
    priceUnit: 'one-time download',
    rating: 4.9,
    reviewsCount: 38,
    description: '45-page colored PDF mindmaps covering all 6 chapters for Diploma in Marketing (DPM). Includes real exam formulas, past year question analysis, and lecturer tip highlights.',
    previewUrl: 'PDF Format • Instant Access',
    downloadsCount: 142,
    department: 'Commerce (Jabatan Perdagangan)',
  },
  {
    id: 'srv_tutor_1',
    title: '1-to-1 Financial Accounting (DKM40012) Peer Tutoring',
    type: 'tutor',
    subject: 'Financial Accounting & Balance Sheets',
    authorName: 'Farhan Hakim (Accounting CGPA 3.88)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorTrustScore: 98,
    authorVerified: true,
    price: 20,
    priceUnit: '/ hour',
    rating: 5.0,
    reviewsCount: 24,
    description: 'Struggling with Trial Balance, Ledger entries, or Depreciation methods? Interactive 1-on-1 tutoring session at PSAS Library study pod or Google Meet with practice worksheets.',
    availability: 'Available Mon-Thu (8 PM - 10 PM) & Weekends',
    department: 'Commerce (Jabatan Perdagangan)',
  },
  {
    id: 'srv_skill_1',
    title: 'Professional Canva Presentation & Poster Design Service',
    type: 'skill',
    subject: 'Graphic Design & Assignment Formatting',
    authorName: 'Kevashan Nair (Diploma Digital Media)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorTrustScore: 97,
    authorVerified: true,
    price: 15,
    priceUnit: '/ assignment poster',
    rating: 4.8,
    reviewsCount: 52,
    description: 'I turn messy Word drafts into aesthetic, high-scoring Canva presentation slides, infographics, BMC posters, and FYP exhibition banners within 24 hours.',
    availability: 'Fast 24-hour delivery on campus',
    department: 'Design & Media Dept',
  },
  {
    id: 'srv_tutor_2',
    title: 'Business Mathematics & Statistics Tutor (DPM10013)',
    type: 'tutor',
    subject: 'Business Math & Simple/Compound Interest',
    authorName: 'Nurul Aiman',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    authorTrustScore: 96,
    authorVerified: true,
    price: 18,
    priceUnit: '/ hour',
    rating: 4.9,
    reviewsCount: 19,
    description: 'Step-by-step breakdown of annuity formulas, trade discounts, and statistics. Guarantee clear understanding before your mid-term quiz!',
    availability: 'Tues & Thu evenings at Student Centre',
    department: 'Commerce (Jabatan Perdagangan)',
  },
  {
    id: 'srv_skill_2',
    title: 'TikTok & Reel Video Editing for Student Business FYP',
    type: 'skill',
    subject: 'Video Production & Social Media Ads',
    authorName: 'Amirul Syafiq',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorTrustScore: 98,
    authorVerified: true,
    price: 25,
    priceUnit: '/ video clip',
    rating: 5.0,
    reviewsCount: 31,
    description: 'CapCut Pro video editing with viral trending audio, subtitles, and smooth transitions tailored to boost sales for your Digital Entrepreneurship mini business.',
    availability: '1-2 days turnaround',
    department: 'Commerce (Jabatan Perdagangan)',
  }
];

export const INITIAL_UTILITIES: CampusUtilityPost[] = [
  {
    id: 'util_1',
    category: 'borrow',
    title: 'Casio Scientific Calculator FX-570EX (Daily Rental)',
    status: 'available',
    creatorName: 'Hafizudden (Sem 4 Commerce)',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    creatorPhone: '011-8820391',
    creatorVerified: true,
    location: 'PSAS Library Lobby',
    date: 'Available Now',
    price: 3,
    priceDetail: 'RM 3.00 / day (Deposit RM20 or Student Card hold)',
    description: 'Forgot your calculator for tomorrow\'s test? Rent my spare Casio ClassWiz in 100% working condition with fresh battery.',
    contactInfo: 'WhatsApp 011-8820391 for instant pickup',
    itemType: 'Scientific Calculator',
  },
  {
    id: 'util_2',
    category: 'borrow',
    title: 'White Lab Coat (Size L) & Safety Goggles for Lab Test',
    status: 'available',
    creatorName: 'Anis Najwa',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    creatorPhone: '012-9901182',
    creatorVerified: true,
    location: 'Block C Science Lab',
    date: 'Available Daily',
    price: 4,
    priceDetail: 'RM 4.00 / day',
    description: 'Clean, ironed white lab coat suitable for chemistry or workshop lab sessions. Save money instead of buying a brand new coat.',
    contactInfo: 'Chat or WhatsApp Anis',
    itemType: 'Lab Coat',
  },
  {
    id: 'util_3',
    category: 'lost_found',
    title: 'FOUND: Black Casio Calculator near Commerce Cafe Table 12',
    status: 'found',
    creatorName: 'Farah (Campus Security Student Representative)',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    creatorVerified: true,
    location: 'Commerce Cafeteria',
    date: 'Today at 10:15 AM',
    description: 'Found a Casio FX-570EX calculator with a yellow sticker on the back cover. Left with the Cafe Supervisor counter. Please claim with proof of name/sticker.',
    contactInfo: 'Visit Cafe Counter or call 019-2238110',
    itemType: 'Calculator',
  },
  {
    id: 'util_4',
    category: 'lost_found',
    title: 'LOST: PSAS Student ID Card (Name: Lim Wei Jun, Matrix 15DPM23F1042)',
    status: 'lost',
    creatorName: 'Lim Wei Jun',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    creatorVerified: true,
    location: 'Between Main Gate and Commerce Block A',
    date: 'Yesterday 4:00 PM',
    description: 'Lost my blue lanyard with student ID card. Urgently needed for upcoming exam hall entry! RM 10 token reward if returned.',
    contactInfo: 'WhatsApp Wei Jun 016-7781029',
    itemType: 'Student Card',
  },
  {
    id: 'util_5',
    category: 'carpool',
    title: 'PSAS Campus -> Tanjong Malim KTM Station (3 Seats Available)',
    status: 'open',
    creatorName: 'Danial Irfan (Commerce Sem 5)',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    creatorVerified: true,
    location: 'Pick up at Hostel Main Gate',
    date: 'Friday at 4:30 PM',
    price: 6,
    priceDetail: 'RM 6.00 / seat (Fuel & Toll share)',
    seatsAvailable: 3,
    destination: 'Tanjong Malim KTM / Bus Station',
    description: 'Driving Perodua Myvi to Tanjong Malim KTM station for weekend trip home. Air-conditioned, safe student driver.',
    contactInfo: 'WhatsApp Danial 017-8891002 to reserve seat',
  },
  {
    id: 'util_6',
    category: 'carpool',
    title: 'PSAS -> Ipoh / Tapah Weekend Ride Share',
    status: 'open',
    creatorName: 'Syahmi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    creatorVerified: true,
    location: 'PSAS Main Entrance',
    date: 'Saturday morning 9:00 AM',
    price: 15,
    priceDetail: 'RM 15.00 / seat',
    seatsAvailable: 2,
    destination: 'Ipoh Amanjaya Bus Terminal',
    description: 'Comfortable Proton Saga trip towards Ipoh via PLUS highway. Can drop off at Tapah or Gopeng toll.',
    contactInfo: 'Direct chat or WhatsApp Syahmi',
  }
];

// Super App Mock Data Exports

export const MOCK_FLASH_SALES: FlashSaleItem[] = [
  {
    id: 'fs_1',
    title: 'Casio Scientific Calculator FX-570EX (Mint Condition)',
    category: 'Calculator',
    originalPrice: 85,
    salePrice: 49,
    discountPercentage: 42,
    sellerName: 'Aiman Hafiz',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    endTime: '2h 14m',
    itemsLeft: 2,
    totalStock: 5,
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fs_2',
    title: 'Fresh Baked Tiramisu Cup Set (Pack of 3)',
    category: 'Student Businesses',
    originalPrice: 22,
    salePrice: 15,
    discountPercentage: 31,
    sellerName: 'Haziq Bakery',
    sellerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    endTime: '1h 05m',
    itemsLeft: 4,
    totalStock: 10,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fs_3',
    title: 'Principles of Marketing 14th Ed + Printed Notes',
    category: 'Books',
    originalPrice: 60,
    salePrice: 35,
    discountPercentage: 41,
    sellerName: 'Siti Nurhaliza Binti Ahmad',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    endTime: '3h 40m',
    itemsLeft: 1,
    totalStock: 3,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  }
];

export const MOCK_LIVE_STREAMS: LiveSellingStream[] = [
  {
    id: 'live_1',
    hostName: 'Nurul Huda (Commerce Sem 4)',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    hostDepartment: 'Department of Commerce',
    storeName: 'Huda Hijab & Campus Fashion',
    title: '🔥 Live Clearance! RM10 Campus Scarves & Tote Bags Live Demo',
    viewersCount: 48,
    isLive: true,
    featuredProduct: {
      id: 'p_fashion_1',
      title: 'Premium Chiffon Campus Scarf',
      price: 12,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'
    },
    comments: [
      { id: 'c1', user: 'Farah', text: 'Kak Huda, is the dusty pink color still in stock?', time: 'Just now' },
      { id: 'c2', user: 'Amir', text: 'Can pickup at Library counter today?', time: '1m ago' },
      { id: 'c3', user: 'Syaza', text: 'Ordered 2 units! Thanks Huda! 🔥', time: '2m ago' }
    ]
  }
];

export const MOCK_DEALS_PARTNERS: CampusDealPartner[] = [
  {
    id: 'deal_1',
    partnerName: 'Poly Kopitiam & Student Cafe',
    category: 'Cafe',
    discountText: '10% OFF All Nasi Lemak & Coffee Sets',
    qrCodeVoucher: 'CAMPUS-KOPITIAM-10OFF',
    location: 'Cafeteria Block B, Counter 4',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    terms: 'Show verified student QR code at counter before paying.',
    redeemedCount: 342
  },
  {
    id: 'deal_2',
    partnerName: 'SpeedyPrint Campus Solutions',
    category: 'Printing',
    discountText: '15% OFF High-Volume FYP Binding & Color Prints',
    qrCodeVoucher: 'SPEEDYPRINT-15OFF',
    location: 'Student Plaza, Ground Floor',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&auto=format&fit=crop&q=80',
    terms: 'Valid for orders above RM 10. Show badge on phone.',
    redeemedCount: 512
  },
  {
    id: 'deal_3',
    partnerName: 'Campus Fit Gym & Fitness Studio',
    category: 'Gym',
    discountText: '20% OFF Student Monthly Gym Membership',
    qrCodeVoucher: 'CAMPUSFIT-STUDENT20',
    location: 'Sports Complex Level 2',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    terms: 'Applicable to active polytechnic matriculation holders.',
    redeemedCount: 189
  }
];

export const MOCK_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew_1',
    title: 'RM 5.00 Printing Voucher Credit',
    pointsRequired: 150,
    category: 'Printing',
    voucherCode: 'PRINT-CREDIT-5RM',
    description: 'Redeemable at any on-campus printing shop or verified student freelancer printer.',
    icon: '🖨️'
  },
  {
    id: 'rew_2',
    title: 'Free Nasi Lemak + Teh Tarik Combo',
    pointsRequired: 250,
    category: 'Cafeteria',
    voucherCode: 'CAFE-NASILEMAK-FREE',
    description: 'Valid at Poly Kopitiam Counter 4 in Block B.',
    icon: '🍱'
  },
  {
    id: 'rew_3',
    title: 'Official PSAS Commerce Hoodie 15% Discount',
    pointsRequired: 400,
    category: 'Merchandise',
    voucherCode: 'HOODIE-15OFF-PSAS',
    description: 'Exclusive student entrepreneurship merch discount token.',
    icon: '🧥'
  },
  {
    id: 'rew_4',
    title: 'VIP Pass to Annual Campus Entrepreneurship Summit',
    pointsRequired: 500,
    category: 'Event Ticket',
    voucherCode: 'SUMMIT-VIP-TICKET',
    description: 'Includes certificate of attendance, lunch buffet & networking entry.',
    icon: '🎟️'
  }
];

export const MOCK_CHALLENGES: EntrepreneurChallenge[] = [
  {
    id: 'chal_1',
    title: '🏆 July Sales Sprint: Reach RM 300 in Sales',
    goalDescription: 'Sell RM 300 worth of textbooks, notes, services or products this month.',
    targetAmount: 300,
    currentAmount: 215,
    rewardPoints: 200,
    daysRemaining: 8,
    unlockedBadge: '🏅 Top Seller Badge'
  },
  {
    id: 'chal_2',
    title: '⭐ 5-Star Service Superstar: Get 5 Verified Reviews',
    goalDescription: 'Receive 5 positive 5-star transaction reviews from fellow students.',
    targetAmount: 5,
    currentAmount: 4,
    rewardPoints: 150,
    daysRemaining: 12,
    unlockedBadge: '⭐ Customer Delight Master'
  }
];

export const MOCK_COLLABORATIONS: BusinessCollaborationPost[] = [
  {
    id: 'collab_1',
    creatorName: 'Aiman Hafiz',
    creatorCourse: 'Diploma in Marketing (Sem 4)',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    roleLookingFor: 'Graphic Designer & Video Editor',
    projectTitle: 'Seeking Creative Teammate for FYP Commerce Brand Campaign',
    description: 'Building a student coffee brand for Commerce Dept FYP competition. Need someone to design Instagram carousels, logo lockups and 15s TikTok videos.',
    skillsNeeded: ['Canva / Photoshop', 'TikTok Reels Editing', 'Branding'],
    contactEmail: 'aiman.marketing@student.psas.edu.my',
    postedDate: '2 days ago'
  },
  {
    id: 'collab_2',
    creatorName: 'Farah Zulaikha',
    creatorCourse: 'Diploma in IT (Software)',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    roleLookingFor: 'Marketing & Business Co-Founder',
    projectTitle: 'Campus Laundry Pick-Up App Prototype Partner',
    description: 'Developing an automated laundry booking system for hostel students. Looking for a business student to handle pitch deck, pricing models & marketing.',
    skillsNeeded: ['Pitch Deck', 'Pricing Strategy', 'Market Survey'],
    contactEmail: 'farah.it@student.psas.edu.my',
    postedDate: 'Yesterday'
  }
];

export const MOCK_POLLS: StudentPoll[] = [
  {
    id: 'poll_1',
    question: 'Where is the BEST spot on campus for focused assignment printing & FYP binding?',
    category: 'Printing Services',
    totalVotes: 248,
    options: [
      { id: 'opt_1', text: 'SpeedyPrint Student Plaza (Fastest)', votes: 128 },
      { id: 'opt_2', text: 'Library Ground Floor Counter', votes: 72 },
      { id: 'opt_3', text: 'Hostel Block C Student Freelancer Room', votes: 48 }
    ],
    userVotedOptionId: 'opt_1'
  },
  {
    id: 'poll_2',
    question: 'Which cafeteria stall serves the best affordable student lunch under RM 6.00?',
    category: 'Food & Cafeteria',
    totalVotes: 312,
    options: [
      { id: 'opt_a', text: 'Nasi Kukus Kak Ita (Block B)', votes: 165 },
      { id: 'opt_b', text: 'Ayam Penyet Station (Block A)', votes: 98 },
      { id: 'opt_c', text: 'Vegetarian Rice Counter', votes: 49 }
    ]
  }
];

export const MOCK_NEWS_EVENTS: CampusNewsEvent[] = [
  {
    id: 'news_1',
    title: 'PSAS Annual Youth Entrepreneurship & FYP Marketplace Showcase 2026',
    organizer: 'Department of Commerce & Student Affairs',
    type: 'Competition',
    date: '15 August 2026 • 9:00 AM - 5:00 PM',
    location: 'Dewan Seri Muallim, Main Hall',
    description: 'Over 50 student booths showcasing innovative FYP products, food trucks, pitch battles with real industry seed capital judging panel!',
    ticketPrice: 0,
    ticketAvailable: true,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news_2',
    title: 'TikTok Shop & Shopee Live Masterclass for Student Sellers',
    organizer: 'Commerce Marketing Club',
    type: 'Workshop',
    date: '20 August 2026 • 2:30 PM',
    location: 'Commerce Lab 3 & Online Stream',
    description: 'Learn how to generate RM 1,000/month while studying using affiliate links, live selling hooks, and algorithm optimizations.',
    ticketPrice: 10,
    ticketAvailable: true,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80'
  }
];

export const MOCK_AI_FORECAST: AIForecastItem[] = [
  {
    id: 'fc_1',
    itemName: 'Casio Scientific Calculators (FX-570EX)',
    trendDemand: 'Surging Next Week 🚀',
    reason: 'Final exam week starting in 10 days for Engineering & Commerce departments.',
    recommendedPrice: 'RM 45 - RM 60',
    suggestedAction: 'List calculators now with "Exam Ready" tag for 2x faster sales.'
  },
  {
    id: 'fc_2',
    itemName: 'Business Formal Blazers & Leather Shoes',
    trendDemand: 'High Demand 📈',
    reason: 'Semester 5 & 6 Internship Interview week starting next Monday.',
    recommendedPrice: 'RM 35 - RM 70',
    suggestedAction: 'Add bundle option with tie/scarf to boost total revenue.'
  },
  {
    id: 'fc_3',
    itemName: 'Canva Presentation & Resume Templates',
    trendDemand: 'High Demand 📈',
    reason: 'Mid-semester FYP proposal submissions due this Friday.',
    recommendedPrice: 'RM 5 - RM 15',
    suggestedAction: 'Offer instant PDF/Link download delivery via chat.'
  }
];

export const MOCK_STUDENT_PORTFOLIO: StudentPortfolioData = {
  studentName: 'Siti Nurhaliza Binti Ahmad',
  studentId: '15DPM23F1002',
  department: 'Department of Commerce',
  course: 'Diploma in Marketing (Semester 4)',
  verifiedStudent: true,
  trustedSeller: true,
  campusAmbassador: true,
  totalSalesCount: 38,
  totalRevenueRM: 1420,
  ratingScore: 4.9,
  reusedItemsCount: 32,
  carbonSavedKg: 67,
  skillsAcquired: [
    'Digital Marketing & Social Media Selling',
    'Customer Relationship Management',
    'AI Pricing & Margin Calculation',
    'Sustainable Reusable Goods Commerce',
    'Peer-to-Peer Dispute Negotiation'
  ],
  sellerBadges: [
    '✅ Verified Student',
    '🏅 Trusted Seller (98% Rating)',
    '⭐ Campus Ambassador',
    '🥇 First Sale Unlocked',
    '🏆 Entrepreneur of the Month'
  ]
};


