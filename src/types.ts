export type CategoryType = 
  | 'Books'
  | 'Notes'
  | 'Stationery'
  | 'Laptop'
  | 'Phone'
  | 'Calculator'
  | 'Fashion'
  | 'Food Voucher'
  | 'Services'
  | 'Assignment Templates'
  | 'Student Businesses';

export type ConditionType = 'New' | 'Like New' | 'Used';

export interface User {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  trustScore: number; // e.g. 98% or 4.9/5
  verified: boolean;
  avatarUrl: string;
  phone?: string;
  bio?: string;
  storeId?: string;
  wishlist: string[]; // product IDs
  reviewsReceived: Review[];
  totalSales: number;
  reportCount: number;
  scamWarning: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: CategoryType;
  condition: ConditionType;
  description: string;
  price: number; // in RM
  originalPrice?: number; // for vouchers/discounts
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerDepartment: string;
  sellerTrustScore: number;
  sellerAvatar: string;
  sellerVerified: boolean;
  pickupLocation: string;
  availableUntil: string;
  createdAt: string;
  views: number;
  clicks: number;
  messagesCount: number;
  salesCount: number;
  isFeatured?: boolean;
  storeId?: string;
  templateCategory?: 'Marketing' | 'Accounting' | 'Business' | 'Retailing' | 'Entrepreneurship' | 'Economics';
  fileType?: string; // e.g. "Canva Template", "PDF", "XLSX", "PPTX"
}

export interface StudentStore {
  id: string;
  storeName: string;
  logoUrl: string;
  bannerUrl: string;
  ownerId: string;
  ownerName: string;
  department: string;
  category: string;
  rating: number;
  followers: number;
  description: string;
  productsCount: number;
  featuredProductIds: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerPrice?: number;
  offerStatus?: 'pending' | 'accepted' | 'rejected';
  isMeetupPoint?: boolean;
  meetupLocation?: string;
  isQrPayment?: boolean;
  qrData?: {
    eWalletProvider: 'DuitNow' | 'Touch n Go' | 'MAE Maybank' | 'GrabPay' | 'Bank Transfer';
    recipientName: string;
    accountNumber: string;
    amount: number;
    reference: string;
    qrImageUrl?: string;
    paidStatus?: 'unpaid' | 'paid';
  };
}

export interface ChatConversation {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  transactionStatus: 'chatting' | 'offer_agreed' | 'completed' | 'cancelled';
  agreedPrice?: number;
  agreedPickupPoint?: string;
  buyerReviewed?: boolean;
  sellerReviewed?: boolean;
}

export interface Review {
  id: string;
  transactionId: string;
  targetUserId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  itemTitle: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'like' | 'price_drop' | 'campaign' | 'review' | 'scam_alert';
  timestamp: string;
  read: boolean;
  linkId?: string;
}

export interface CampaignAnalytics {
  storeId: string;
  storeName: string;
  visitors: number;
  clicks: number;
  messages: number;
  sales: number;
  revenue: number;
  conversionRate: number; // %
  dailyData: { day: string; visitors: number; clicks: number; sales: number; revenue: number }[];
  topProducts: { id: string; title: string; views: number; clicks: number; sales: number; conversion: string }[];
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  icon: string;
  description: string;
  lessons: {
    id: string;
    title: string;
    content: string;
    keyTakeaways: string[];
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface PickupSpot {
  id: string;
  name: string;
  building: string;
  description: string;
  safetyScore: string;
  popularTimes: string;
}

export interface JobListing {
  id: string;
  title: string;
  employer: string;
  employerVerified: boolean;
  category: 'Cafe/Food' | 'Retail/Promoter' | 'Academic/Assistant' | 'Event Crew' | 'General';
  hourlyWage: number;
  payRate: string;
  workingHours: string;
  location: string;
  description: string;
  requirements: string[];
  sdgBadge: string;
  contactPhone?: string;
  contactPerson?: string;
  postedDate: string;
  applied?: boolean;
}

export interface StudyServiceItem {
  id: string;
  title: string;
  type: 'note' | 'tutor' | 'skill';
  subject: string;
  authorName: string;
  authorAvatar: string;
  authorTrustScore: number;
  authorVerified: boolean;
  price: number;
  priceUnit: string;
  rating: number;
  reviewsCount: number;
  description: string;
  previewUrl?: string;
  downloadsCount?: number;
  availability?: string;
  department: string;
}

export interface CampusUtilityPost {
  id: string;
  category: 'borrow' | 'lost_found' | 'carpool';
  title: string;
  status: 'available' | 'rented' | 'lost' | 'found' | 'open' | 'completed';
  creatorName: string;
  creatorAvatar: string;
  creatorPhone?: string;
  creatorVerified: boolean;
  location: string;
  date: string;
  price?: number;
  priceDetail?: string;
  description: string;
  contactInfo: string;
  seatsAvailable?: number;
  destination?: string;
  itemType?: string;
  image?: string;
}

export interface AppSettings {
  // Account & Campus
  primaryCampus: string;
  defaultPickupSpot: string;
  preferredContactMethod: 'whatsapp' | 'chat' | 'email';
  
  // Notification Preferences
  notifyNewMessages: boolean;
  notifyPriceDrops: boolean;
  notifyJobAlerts: boolean;
  notifyDailyDeals: boolean;
  notifySoundEnabled: boolean;
  notifySmsStatus: boolean;

  // Privacy & Safety
  showPhonePublicly: boolean;
  showMatricToVerifiedOnly: boolean;
  strictScamFilter: boolean;
  showTrustScorePublicly: boolean;
  enable2FA: boolean;
  defaultAccessRole: 'viewer' | 'editor';
  allowEditorPermissions: boolean;

  // Payments & E-Wallet
  defaultEWalletProvider: 'DuitNow' | 'Touch n Go' | 'MAE Maybank' | 'GrabPay' | 'Cash on Pickup';
  duitNowNumber: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;

  // Student Business & Store
  storeVisibility: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
  showCommerceBadge: boolean;

  // App Display & System & Branding
  appName: string;
  appTagline: string;
  appDescription: string;
  appLogoType: 'icon' | 'emoji' | 'image';
  appLogoEmoji: string;
  appLogoUrl: string;
  language: 'English' | 'Bahasa Melayu' | 'Mandarin' | 'Tamil';
  themeMode: 'light' | 'dark' | 'system';
  dataSaverMode: boolean;
}

// Super App Modules Interfaces

export interface FlashSaleItem {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  sellerName: string;
  sellerAvatar: string;
  endTime: string; // ISO string or relative hours
  itemsLeft: number;
  totalStock: number;
  image: string;
}

export interface LiveSellingStream {
  id: string;
  hostName: string;
  hostAvatar: string;
  hostDepartment: string;
  storeName: string;
  title: string;
  viewersCount: number;
  featuredProduct: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  comments: { id: string; user: string; text: string; time: string }[];
  isLive: boolean;
}

export interface CampusDealPartner {
  id: string;
  partnerName: string;
  category: 'Cafe' | 'Restaurant' | 'Printing' | 'Bookstore' | 'Gym' | 'Convenience Store';
  discountText: string; // e.g. "10% OFF All Drinks & Meals"
  qrCodeVoucher: string;
  location: string;
  rating: number;
  imageUrl: string;
  terms: string;
  redeemedCount: number;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsRequired: number;
  category: 'Printing' | 'Cafeteria' | 'Merchandise' | 'Event Ticket';
  voucherCode: string;
  description: string;
  icon: string;
  claimed?: boolean;
}

export interface EntrepreneurChallenge {
  id: string;
  title: string;
  goalDescription: string;
  targetAmount: number;
  currentAmount: number;
  rewardPoints: number;
  daysRemaining: number;
  unlockedBadge: string;
  isCompleted?: boolean;
}

export interface BusinessCollaborationPost {
  id: string;
  creatorName: string;
  creatorCourse: string;
  creatorAvatar: string;
  roleLookingFor: string; // e.g. "Graphic Designer", "IT / Web Dev", "Content Creator"
  projectTitle: string;
  description: string;
  skillsNeeded: string[];
  contactEmail: string;
  postedDate: string;
}

export interface StudentPoll {
  id: string;
  question: string;
  category: 'Food & Cafeteria' | 'Study Spots' | 'Printing Services' | 'Campus Life';
  totalVotes: number;
  options: { id: string; text: string; votes: number }[];
  userVotedOptionId?: string;
}

export interface CampusNewsEvent {
  id: string;
  title: string;
  organizer: string;
  type: 'Club Event' | 'Workshop' | 'Career Fair' | 'Scholarship' | 'Competition';
  date: string;
  location: string;
  description: string;
  ticketPrice?: number; // 0 for free
  ticketAvailable: boolean;
  image: string;
}

export interface AIForecastItem {
  id: string;
  itemName: string;
  trendDemand: 'High Demand 📈' | 'Moderate Demand ➡️' | 'Surging Next Week 🚀';
  reason: string;
  recommendedPrice: string;
  suggestedAction: string;
}

export interface StudentPortfolioData {
  studentName: string;
  studentId: string;
  department: string;
  course: string;
  verifiedStudent: boolean;
  trustedSeller: boolean;
  campusAmbassador: boolean;
  totalSalesCount: number;
  totalRevenueRM: number;
  ratingScore: number;
  reusedItemsCount: number;
  carbonSavedKg: number;
  skillsAcquired: string[];
  sellerBadges: string[];
}


