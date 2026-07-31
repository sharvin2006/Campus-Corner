import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  HomeDashboard 
} from './components/HomeDashboard';
import { 
  SellItemModal 
} from './components/SellItemModal';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  ChatSystem 
} from './components/ChatSystem';
import { 
  StudentStoresView 
} from './components/StudentStoresView';
import { 
  AssignmentMarketplaceView 
} from './components/AssignmentMarketplaceView';
import { 
  CampaignAnalyticsView 
} from './components/CampaignAnalyticsView';
import { 
  MarketingLearningHub 
} from './components/MarketingLearningHub';
import { 
  PartTimeJobHubView 
} from './components/PartTimeJobHubView';
import { 
  StudyAndTutorHubView 
} from './components/StudyAndTutorHubView';
import { 
  CampusCommunityHubView 
} from './components/CampusCommunityHubView';
import { 
  UserProfileModal 
} from './components/UserProfileModal';
import { 
  StrategicRoadmapView 
} from './components/StrategicRoadmapView';
import { 
  NotificationInboxModal 
} from './components/NotificationInboxModal';
import { 
  SettingsModal 
} from './components/SettingsModal';
import { 
  SuperAppHubView 
} from './components/SuperAppHubView';

import { 
  DEFAULT_SETTINGS,
  CURRENT_USER, 
  INITIAL_PRODUCTS, 
  INITIAL_STORES, 
  INITIAL_CAMPAIGN, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS, 
  LEARNING_MODULES, 
  PICKUP_SPOTS,
  INITIAL_JOBS,
  INITIAL_STUDY_SERVICES,
  INITIAL_UTILITIES
} from './data/mockData';

import { 
  Product, 
  StudentStore, 
  ChatConversation, 
  ChatMessage, 
  NotificationItem, 
  User,
  JobListing,
  StudyServiceItem,
  CampusUtilityPost,
  AppSettings
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('super_app');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // App State with local persistence
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('psas_app_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback if parsing error
    }
    return DEFAULT_SETTINGS;
  });

  // Global Theme Mode Handler Effect
  useEffect(() => {
    try {
      localStorage.setItem('psas_app_settings', JSON.stringify(appSettings));
    } catch {
      // Ignore storage errors
    }

    const root = document.documentElement;
    const isDark =
      appSettings.themeMode === 'dark' ||
      (appSettings.themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [appSettings]);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [stores, setStores] = useState<StudentStore[]>(INITIAL_STORES);
  const [campaignAnalytics, setCampaignAnalytics] = useState(INITIAL_CAMPAIGN);
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(CURRENT_USER.wishlist);

  // Community & Service States
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [studyServices, setStudyServices] = useState<StudyServiceItem[]>(INITIAL_STUDY_SERVICES);
  const [utilities, setUtilities] = useState<CampusUtilityPost[]>(INITIAL_UTILITIES);

  // Job Hub Handlers
  const handleApplyJob = (jobId: string, pitch: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j))
    );

    const job = jobs.find((j) => j.id === jobId);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Application Sent! 💼',
        message: `Your application for "${job?.title || 'Campus Job'}" was submitted to ${job?.employer}.`,
        type: 'campaign',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const handlePostJob = (newJob: JobListing) => {
    setJobs((prev) => [newJob, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Job Vacancy Published! ⭐',
        message: `"${newJob.title}" is now active on Part-Time Job Hub.`,
        type: 'campaign',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Study & Tutor Handlers
  const handleBookOrContactStudyService = (item: StudyServiceItem) => {
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Peer Learning Connection Sent! 🎓',
        message: `You connected with ${item.authorName} for "${item.title}". Check your chat inbox!`,
        type: 'message',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Campus Community Handlers
  const handlePostUtility = (newUtil: CampusUtilityPost) => {
    setUtilities((prev) => [newUtil, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Community Post Live! 🔄',
        message: `Your post "${newUtil.title}" has been published to Campus Community Hub.`,
        type: 'campaign',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleContactUtility = (post: CampusUtilityPost) => {
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Campus Inquiry Sent! 📱',
        message: `Sent message regarding "${post.title}" to ${post.creatorName}.`,
        type: 'message',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Modals
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_1');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
      // Add notification
      const product = products.find((p) => p.id === productId);
      if (product) {
        setNotifications((prev) => [
          {
            id: `notif_${Date.now()}`,
            title: 'Saved to Wishlist',
            message: `You saved "${product.title}" to your favorites.`,
            type: 'like',
            timestamp: 'Just now',
            read: false,
          },
          ...prev,
        ]);
      }
    }
  };

  // Add new published product
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    // Add campaign view/stat update
    setCampaignAnalytics((prev) => ({
      ...prev,
      visitors: prev.visitors + 1,
      topProducts: [
        { id: newProd.id, title: newProd.title, views: 1, clicks: 1, sales: 0, conversion: '0%' },
        ...prev.topProducts,
      ],
    }));

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Listing Published Successfully!',
        message: `Your item "${newProd.title}" is now live on Campus Corner.`,
        type: 'campaign',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Start chat with seller of a product
  const handleStartChatWithSeller = (product: Product, initialOffer?: number) => {
    // Check if conversation already exists
    let existingConv = conversations.find(
      (c) => c.productId === product.id && c.buyerId === currentUser.id
    );

    if (!existingConv) {
      const convId = `conv_${Date.now()}`;
      const newConv: ChatConversation = {
        id: convId,
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.images[0],
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerAvatar: currentUser.avatarUrl,
        sellerId: product.sellerId,
        sellerName: product.sellerName,
        sellerAvatar: product.sellerAvatar,
        lastMessage: initialOffer ? `Sent offer of RM ${initialOffer}` : 'Hi, is this available?',
        lastTimestamp: 'Just now',
        unreadCount: 0,
        transactionStatus: 'chatting',
      };

      const initialMsgs: ChatMessage[] = [
        {
          id: `m_${Date.now()}`,
          conversationId: convId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: initialOffer
            ? `Hi! I would like to offer RM ${initialOffer} for this item.`
            : `Hi ${product.sellerName}! Is "${product.title}" still available on campus?`,
          timestamp: 'Just now',
          isOffer: !!initialOffer,
          offerPrice: initialOffer,
          offerStatus: initialOffer ? 'pending' : undefined,
        },
      ];

      setConversations((prev) => [newConv, ...prev]);
      setMessages((prev) => ({ ...prev, [convId]: initialMsgs }));
      setActiveConversationId(convId);
    } else {
      setActiveConversationId(existingConv.id);
    }

    setSelectedProduct(null);
    setIsChatOpen(true);
  };

  // Send message in chat
  const handleSendMessage = (
    conversationId: string, 
    text: string, 
    offerPrice?: number,
    qrData?: ChatMessage['qrData']
  ) => {
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
      isOffer: !!offerPrice,
      offerPrice,
      offerStatus: offerPrice ? 'pending' : undefined,
      isQrPayment: !!qrData,
      qrData,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: qrData ? `💳 Payment QR (${qrData.eWalletProvider} - RM${qrData.amount})` : text, lastTimestamp: 'Just now' }
          : c
      )
    );

    // Auto simulated response after 1.5 seconds if sent by current user
    setTimeout(() => {
      const currentConv = conversations.find((c) => c.id === conversationId);
      if (currentConv) {
        let replyText = `Yes, still available! I can meet you at the PSAS Library or Student Centre today.`;
        if (offerPrice) {
          replyText = `Deal! I accept your offer of RM ${offerPrice}. Where would you like to meet on campus?`;
        } else if (qrData) {
          replyText = `Received your ${qrData.eWalletProvider} QR code! Scanning now to transfer RM ${qrData.amount}. Will upload payment receipt shortly! 💳✨`;
        }

        const replyMsg: ChatMessage = {
          id: `m_reply_${Date.now()}`,
          conversationId,
          senderId: currentConv.sellerId === currentUser.id ? currentConv.buyerId : currentConv.sellerId,
          senderName: currentConv.sellerId === currentUser.id ? currentConv.buyerName : currentConv.sellerName,
          text: replyText,
          timestamp: 'Just now',
        };

        setMessages((prev) => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? { ...c, lastMessage: replyText, lastTimestamp: 'Just now', unreadCount: 1 }
              : c
          )
        );
      }
    }, 1500);
  };

  // Accept offer in chat
  const handleAcceptOffer = (conversationId: string, agreedPrice: number) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, agreedPrice, transactionStatus: 'offer_agreed' }
          : c
      )
    );

    handleSendMessage(conversationId, `Offer of RM ${agreedPrice} agreed! Let us pick a safe meetup spot.`);
  };

  // Set safe meetup location
  const handleSetMeetupPoint = (conversationId: string, locationName: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, agreedPickupPoint: locationName } : c
      )
    );
  };

  // Complete transaction & rate seller
  const handleCompleteTransaction = (conversationId: string, rating: number, comment: string) => {
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    // Mark completed
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, transactionStatus: 'completed', buyerReviewed: true }
          : c
      )
    );

    // Increase seller score & sales count
    setProducts((prev) =>
      prev.map((p) =>
        p.id === conv.productId ? { ...p, salesCount: p.salesCount + 1 } : p
      )
    );

    // Increase campaign metrics if my store
    setCampaignAnalytics((prev) => ({
      ...prev,
      sales: prev.sales + 1,
      revenue: prev.revenue + (conv.agreedPrice || conv.productPrice),
    }));

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Transaction Completed! ⭐',
        message: `You rated ${conv.sellerName} ${rating} stars. Thank you for trading safely!`,
        type: 'review',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Create new student business store
  const handleCreateStore = (storeName: string, category: string, description: string) => {
    const newStore: StudentStore = {
      id: `store_${Date.now()}`,
      storeName,
      logoUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      department: currentUser.department,
      category,
      rating: 5.0,
      followers: 1,
      description,
      productsCount: 0,
      featuredProductIds: [],
    };

    setStores((prev) => [newStore, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Student Business Store Created! 🍰',
        message: `Your mini business "${storeName}" is now active for Digital Entrepreneurship FYP!`,
        type: 'campaign',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleReportScam = (productId: string) => {
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Scam Report Received',
        message: 'Thank you for reporting. Campus Safety is reviewing this listing.',
        type: 'scam_alert',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const unreadChatCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col antialiased transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        user={currentUser}
        settings={appSettings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        unreadChatCount={unreadChatCount}
        wishlistCount={wishlistIds.length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'super_app' && (
          <SuperAppHubView
            currentUser={currentUser}
            products={products}
            pickupSpots={PICKUP_SPOTS}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onOpenSellModal={() => setIsSellModalOpen(true)}
          />
        )}

        {activeTab === 'marketplace' && (
          <HomeDashboard
            products={products}
            currentUser={currentUser}
            pickupSpots={PICKUP_SPOTS}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onStartChatWithSeller={handleStartChatWithSeller}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onOpenSellModal={() => setIsSellModalOpen(true)}
          />
        )}

        {activeTab === 'jobs' && (
          <PartTimeJobHubView
            jobs={jobs}
            currentUser={currentUser}
            onApplyJob={handleApplyJob}
            onPostJob={handlePostJob}
          />
        )}

        {activeTab === 'study_tutor' && (
          <StudyAndTutorHubView
            items={studyServices}
            currentUser={currentUser}
            onBookOrContact={handleBookOrContactStudyService}
          />
        )}

        {activeTab === 'community' && (
          <CampusCommunityHubView
            utilities={utilities}
            currentUser={currentUser}
            onPostUtility={handlePostUtility}
            onContactUser={handleContactUtility}
          />
        )}

        {activeTab === 'stores' && (
          <StudentStoresView
            stores={stores}
            products={products}
            currentUser={currentUser}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onStartChat={handleStartChatWithSeller}
            onCreateStore={handleCreateStore}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentMarketplaceView
            products={products}
            currentUser={currentUser}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onStartChat={handleStartChatWithSeller}
          />
        )}

        {activeTab === 'analytics' && (
          <CampaignAnalyticsView
            analytics={campaignAnalytics}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'learning' && (
          <MarketingLearningHub modules={LEARNING_MODULES} />
        )}

        {activeTab === 'roadmap' && (
          <StrategicRoadmapView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-800">
            Campus Corner • Politeknik Sultan Azlan Shah (PSAS) Commerce Dept FYP Project
          </p>
          <p className="text-slate-400">
            Empowering Commerce Student Entrepreneurship, AI Valuation & Safe Campus Marketplace Handovers.
          </p>
        </div>
      </footer>

      {/* Sell Item Modal */}
      <SellItemModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        currentUser={currentUser}
        pickupSpots={PICKUP_SPOTS}
        onAddProduct={handleAddProduct}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currentUser={currentUser}
        onStartChat={handleStartChatWithSeller}
        onToggleWishlist={handleToggleWishlist}
        isSaved={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onReportScam={handleReportScam}
      />

      {/* Real-time Interactive Chat System Modal */}
      {isChatOpen && (
        <ChatSystem
          currentUser={currentUser}
          conversations={conversations}
          messages={messages}
          activeConversationId={activeConversationId}
          setActiveConversationId={setActiveConversationId}
          pickupSpots={PICKUP_SPOTS}
          onSendMessage={handleSendMessage}
          onAcceptOffer={handleAcceptOffer}
          onSetMeetupPoint={handleSetMeetupPoint}
          onCompleteTransaction={handleCompleteTransaction}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Student Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        products={products}
        wishlistProducts={wishlistProducts}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onUpdateProfile={(updatedUser) => setCurrentUser(updatedUser)}
      />

      {/* Notification Inbox Modal */}
      <NotificationInboxModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onSelectNotification={(notif) => {
          if (notif.type === 'message') {
            setIsChatOpen(true);
          }
        }}
      />

      {/* App Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={appSettings}
        onSaveSettings={(newSettings) => setAppSettings(newSettings)}
        user={currentUser}
      />


    </div>
  );
}
