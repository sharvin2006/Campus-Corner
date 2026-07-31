import React, { useState } from 'react';
import { 
  User, 
  Product, 
  FlashSaleItem, 
  LiveSellingStream, 
  CampusDealPartner, 
  LoyaltyReward, 
  EntrepreneurChallenge, 
  BusinessCollaborationPost, 
  StudentPoll, 
  CampusNewsEvent, 
  AIForecastItem, 
  StudentPortfolioData,
  PickupSpot
} from '../types';
import { 
  MOCK_FLASH_SALES, 
  MOCK_LIVE_STREAMS, 
  MOCK_DEALS_PARTNERS, 
  MOCK_LOYALTY_REWARDS, 
  MOCK_CHALLENGES, 
  MOCK_COLLABORATIONS, 
  MOCK_POLLS, 
  MOCK_NEWS_EVENTS, 
  MOCK_AI_FORECAST, 
  MOCK_STUDENT_PORTFOLIO 
} from '../data/mockData';
import { 
  Sparkles, 
  Zap, 
  Tv, 
  Gift, 
  Award, 
  Bot, 
  HelpCircle, 
  TrendingUp, 
  Target, 
  Leaf, 
  Users, 
  Calendar, 
  Vote, 
  QrCode, 
  Share2, 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  Download, 
  MessageSquare, 
  Heart, 
  ShoppingBag, 
  ArrowRight,
  Flame,
  ShieldCheck,
  Building,
  GraduationCap,
  Briefcase,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Coins,
  Copy,
  Check
} from 'lucide-react';

interface SuperAppHubViewProps {
  currentUser: User;
  products: Product[];
  pickupSpots: PickupSpot[];
  onSelectProduct: (product: Product) => void;
  onOpenSellModal: () => void;
}

export const SuperAppHubView: React.FC<SuperAppHubViewProps> = ({
  currentUser,
  products,
  pickupSpots,
  onSelectProduct,
  onOpenSellModal,
}) => {
  // Navigation Sub-tab
  const [subTab, setSubTab] = useState<
    'smart_feed' | 'flash_live' | 'deals_rewards' | 'ai_coaches' | 'sustainability' | 'collaborate' | 'news_events' | 'portfolio'
  >('smart_feed');

  // Semester Calendar Season
  const [semesterSeason, setSemesterSeason] = useState<
    'start' | 'mid' | 'assignment' | 'internship' | 'exams' | 'end'
  >('assignment');

  // Selected Student Course Feed Filter
  const [selectedCourseFeed, setSelectedCourseFeed] = useState<string>('Marketing');

  // Loyalty Points State
  const [userPoints, setUserPoints] = useState<number>(420);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [copiedVoucher, setCopiedVoucher] = useState<string | null>(null);

  // Poll Votes State
  const [pollList, setPollList] = useState<StudentPoll[]>(MOCK_POLLS);

  // AI Business Coach Input State
  const [coachQuestion, setCoachQuestion] = useState<string>('');
  const [coachResponse, setCoachResponse] = useState<string | null>(null);

  // AI Campus Assistant Q&A State
  const [assistantQuery, setAssistantQuery] = useState<string>('');
  const [assistantAnswer, setAssistantAnswer] = useState<string | null>(null);

  // QR Code Pickup Handover Modal State
  const [showQrPickupModal, setShowQrPickupModal] = useState<boolean>(false);
  const [qrScannedSuccess, setQrScannedSuccess] = useState<boolean>(false);

  // Live Stream Engagement State
  const [liveStreamLikes, setLiveStreamLikes] = useState<number>(142);
  const [newComment, setNewComment] = useState<string>('');
  const [liveComments, setLiveComments] = useState(MOCK_LIVE_STREAMS[0].comments);

  // Referral Code Copied State
  const [referralCopied, setReferralCopied] = useState<boolean>(false);

  // Handle Poll Voting
  const handleVotePoll = (pollId: string, optionId: string) => {
    setPollList((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        if (p.userVotedOptionId) return p; // Already voted
        return {
          ...p,
          totalVotes: p.totalVotes + 1,
          userVotedOptionId: optionId,
          options: p.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );
  };

  // Handle Reward Claim
  const handleClaimReward = (reward: LoyaltyReward) => {
    if (userPoints < reward.pointsRequired) {
      alert(`You need ${reward.pointsRequired - userPoints} more points to redeem this reward!`);
      return;
    }
    setUserPoints((pts) => pts - reward.pointsRequired);
    setClaimedRewards((prev) => [...prev, reward.id]);
    alert(`🎉 Successfully redeemed "${reward.title}"! Voucher code: ${reward.voucherCode}`);
  };

  // Handle AI Coach Submit
  const handleAskCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuestion.trim()) return;

    const lower = coachQuestion.toLowerCase();
    let reply = "1. Upload 3+ bright, high-resolution photos in daylight.\n2. Add a clear title with course code (e.g., DPM3003).\n3. Lower price by RM 3–5 or offer free campus delivery.\n4. Post around 12:30 PM (lunchtime) when student traffic peaks!";
    
    if (lower.includes('price') || lower.includes('expensive')) {
      reply = "💡 AI Price Insight: Similar items sell 40% faster when priced between RM 25 - RM 35. Try adding a 'Free FYP printed notes' bonus!";
    } else if (lower.includes('photo') || lower.includes('image')) {
      reply = "📸 AI Visual Coach: Take photos on a neutral white desk with natural sunlight. First image should clearly show the cover & condition.";
    }

    setCoachResponse(reply);
  };

  // Handle AI Assistant Submit
  const handleAskAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;

    const lower = assistantQuery.toLowerCase();
    let reply = "📍 SpeedyPrint in Student Plaza (Ground Floor) handles express assignment printing & FYP spiral binding until 6:00 PM.";

    if (lower.includes('block c') || lower.includes('location')) {
      reply = "🏫 Block C is the Commerce & Management Department building. Safe pickup spot is at the ground floor foyer near the vending machines.";
    } else if (lower.includes('library') || lower.includes('close') || lower.includes('hour')) {
      reply = "📚 PSAS Main Library is open Monday–Friday from 8:15 AM to 5:00 PM. Examination week hours extend until 9:00 PM!";
    }

    setAssistantAnswer(reply);
  };

  // Handle Live Stream Comment
  const handleSendLiveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLiveComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: currentUser.name.split(' ')[0],
        text: newComment,
        time: 'Just now',
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* SUPER APP HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Polytechnic Student Life Super App</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              One Stop Campus Hub for Trading, Services & Student Business
            </h1>

            <p className="text-sm text-indigo-200/90 leading-relaxed">
              Your daily polytechnic companion — buy/sell textbooks, hire student freelancers, enjoy cafe discounts, complete sales challenges, and track your SDG 12 sustainability impact.
            </p>

            {/* Quick Stats Pill Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-300" />
                <span>{userPoints} Loyalty Points</span>
              </div>

              <div className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>✅ Verified Student</span>
              </div>

              <div className="bg-amber-500/20 border border-amber-400/30 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>🏅 Trusted Seller (98%)</span>
              </div>
            </div>
          </div>

          {/* Quick Action Button & QR Pickup */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setShowQrPickupModal(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <QrCode className="w-5 h-5" />
              <span>QR Pickup Handover</span>
            </button>

            <button
              onClick={onOpenSellModal}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-2xl border border-white/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-300" />
              <span>Create Product or Service</span>
            </button>
          </div>
        </div>

        {/* Academic Calendar Season Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-200 mb-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>SEMESTER ACADEMIC CALENDAR SEASON</span>
            </span>
            <span className="text-[11px] text-indigo-300">Recommendations dynamically adapt</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { id: 'start', label: 'Start of Semester', sub: 'Textbooks & Essentials' },
              { id: 'mid', label: 'Mid-Semester', sub: 'Presentation & Printing' },
              { id: 'assignment', label: 'Assignment Weeks 📑', sub: 'Design, Notes & Laptops' },
              { id: 'internship', label: 'Internship Period 💼', sub: 'Formal Wear & Resumes' },
              { id: 'exams', label: 'Final Exams 🧮', sub: 'Calculators & Flashcards' },
              { id: 'end', label: 'End of Semester 📦', sub: 'Moving & Luggage' },
            ].map((season) => (
              <button
                key={season.id}
                onClick={() => setSemesterSeason(season.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  semesterSeason === season.id
                    ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-md ring-2 ring-indigo-400/50'
                    : 'bg-white/5 border-white/10 text-indigo-100 hover:bg-white/10'
                }`}
              >
                <div className="text-xs leading-tight font-semibold">{season.label}</div>
                <div className="text-[10px] opacity-75 truncate">{season.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUPER APP NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
        {[
          { id: 'smart_feed', label: 'AI Smart Home Feed', icon: <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> },
          { id: 'flash_live', label: 'Flash Sales & Live Stream', icon: <Zap className="w-4 h-4 text-amber-500" /> },
          { id: 'deals_rewards', label: 'Campus Deals & Rewards', icon: <Gift className="w-4 h-4 text-rose-500" /> },
          { id: 'ai_coaches', label: 'AI Coach & Campus Q&A', icon: <Bot className="w-4 h-4 text-emerald-500" /> },
          { id: 'sustainability', label: 'Sustainability & SDG 12', icon: <Leaf className="w-4 h-4 text-emerald-600" /> },
          { id: 'collaborate', label: 'Co-Founder Collaboration', icon: <Users className="w-4 h-4 text-purple-500" /> },
          { id: 'news_events', label: 'News, Events & Tickets', icon: <Calendar className="w-4 h-4 text-sky-500" /> },
          { id: 'portfolio', label: 'Student Career Portfolio', icon: <Award className="w-4 h-4 text-amber-500" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              subTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-500'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: AI SMART HOME FEED */}
      {subTab === 'smart_feed' && (
        <div className="space-y-6">
          
          {/* Course Feed Personalization Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Personalized Smart Feed for: {currentUser.name}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Semester 4 • {selectedCourseFeed} Course • Recommendations adapt based on your academic path
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Course:</span>
              <select
                value={selectedCourseFeed}
                onChange={(e) => setSelectedCourseFeed(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Marketing">Marketing (DPM)</option>
                <option value="Accounting">Accounting (DAT)</option>
                <option value="Software">Software IT (DIT)</option>
                <option value="Mechanical">Mechanical Eng (DEM)</option>
                <option value="Electrical">Electrical Eng (DET)</option>
              </select>
            </div>
          </div>

          {/* AI Recommended Content Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Box 1: Relevant Textbooks & Notes */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Recommended Textbooks & Notes</span>
                </h3>
                <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                  Matched
                </span>
              </div>

              <div className="space-y-3">
                {products.filter(p => p.category === 'Books' || p.category === 'Notes' || p.category === 'Assignment Templates').slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition-all cursor-pointer group"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.sellerName} • {item.sellerDepartment}
                      </div>
                      <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        RM {item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Relevant Internship & Part-Time Vacancies */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Matching Internship & Jobs</span>
                </h3>
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  SDG 8
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Digital Marketing & Commerce Intern
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    SpeedyPrint Media • RM 900 / month
                  </div>
                  <span className="inline-block text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded font-bold">
                    Matches Semester 4 Marketing
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Cafe Barista & Social Media Crew
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Poly Kopitiam • RM 8.00 / hour
                  </div>
                  <span className="inline-block text-[10px] bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 px-2 py-0.5 rounded font-bold">
                    Flexible Campus Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Box 3: Student Businesses & Competitions */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span>Student Businesses & Workshops</span>
                </h3>
                <span className="text-[10px] bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
                  FYP Hub
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/60 space-y-1">
                  <div className="text-xs font-bold text-purple-950 dark:text-purple-200 flex items-center gap-1">
                    <span>🏆 PSAS Entrepreneurship Challenge</span>
                  </div>
                  <p className="text-[11px] text-purple-800 dark:text-purple-300">
                    Reach RM 300 in sales this month to unlock official certificate & 200 reward points.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    TikTok Live Selling Masterclass
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    15 August • Free for verified Commerce students
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* AI CAMPUS MARKETPLACE FORECAST CARD */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/30 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-extrabold tracking-tight">AI Campus Demand Forecast (Next 7 Days)</h3>
              </div>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-amber-400/30">
                Predictive Analytics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_AI_FORECAST.map((fc) => (
                <div key={fc.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-300">{fc.itemName}</span>
                    <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-200">{fc.trendDemand}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{fc.reason}</p>
                  <div className="text-[11px] text-slate-400 border-t border-white/10 pt-2 flex items-center justify-between">
                    <span>Target Price: <strong className="text-white">{fc.recommendedPrice}</strong></span>
                    <span className="text-emerald-400 font-semibold">{fc.suggestedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAMPUS TRENDS DASHBOARD */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>🔥 Trending Items on Campus Today</span>
              </h3>
              <span className="text-xs text-slate-500">Real-time student search interest</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { tag: 'Casio Calculators', count: '142 searches', icon: '🧮' },
                { tag: 'Accounting DAT Books', count: '98 searches', icon: '📚' },
                { tag: 'Fresh Tiramisu Cups', count: '87 orders', icon: '🍰' },
                { tag: 'FYP Proposal Templates', count: '76 downloads', icon: '📑' },
                { tag: 'Formal Blazers (Size M)', count: '65 searches', icon: '👔' },
                { tag: 'Anker Powerbanks', count: '54 searches', icon: '🔋' },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <span>{t.icon}</span>
                  <span>{t.tag}</span>
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded-full font-extrabold">
                    {t.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: FLASH SALES & LIVE STREAM */}
      {subTab === 'flash_live' && (
        <div className="space-y-6">
          
          {/* FLASH SALES SECTION */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white p-6 rounded-2xl space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-200 fill-amber-200 animate-bounce" />
                <div>
                  <h3 className="text-lg font-black tracking-tight">Campus Flash Sales</h3>
                  <p className="text-xs text-amber-100">Limited time urgent discounts from student sellers</p>
                </div>
              </div>

              <button
                onClick={onOpenSellModal}
                className="bg-white text-slate-900 font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                + Create Flash Sale
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_FLASH_SALES.map((fs) => (
                <div key={fs.id} className="bg-white text-slate-900 rounded-2xl p-4 space-y-3 shadow-md flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                      <img src={fs.image} alt={fs.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                        -{fs.discountPercentage}% OFF
                      </span>
                      <span className="absolute bottom-2 right-2 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                        <Clock className="w-3 h-3" />
                        <span>{fs.endTime} Left</span>
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 line-clamp-2">
                      {fs.title}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-rose-600">RM {fs.salePrice.toFixed(2)}</span>
                      <span className="text-xs text-slate-400 line-through">RM {fs.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                      <span>Stock Left: {fs.itemsLeft} units</span>
                      <span>Seller: {fs.sellerName.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={() => alert(`🎉 Claimed flash deal for ${fs.title}!`)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer shadow-xs"
                    >
                      Grab Flash Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAMPUS LIVE SELLING STREAM PLAYER */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-rose-600 animate-pulse" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>Campus Live Selling Stream</span>
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      LIVE NOW
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Interactive student live shopping • Watch demo, ask questions & buy in real-time
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>48 Watching</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Stream Video Player Box */}
              <div className="lg:col-span-2 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 text-white flex flex-col justify-between p-4 border border-slate-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
                  alt="Live Stream Host"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                
                {/* Top Stream Overlay Bar */}
                <div className="relative z-10 flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={MOCK_LIVE_STREAMS[0].hostAvatar}
                      alt={MOCK_LIVE_STREAMS[0].hostName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{MOCK_LIVE_STREAMS[0].hostName}</div>
                      <div className="text-[10px] text-slate-300">{MOCK_LIVE_STREAMS[0].storeName}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setLiveStreamLikes((l) => l + 1)}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{liveStreamLikes}</span>
                  </button>
                </div>

                {/* Bottom Featured Product Banner Overlay */}
                <div className="relative z-10 bg-slate-900/90 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={MOCK_LIVE_STREAMS[0].featuredProduct.image}
                      alt="Featured Item"
                      className="w-12 h-12 rounded-lg object-cover border border-white/20"
                    />
                    <div>
                      <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">LIVE FEATURED ITEM</div>
                      <div className="text-xs font-bold text-white">{MOCK_LIVE_STREAMS[0].featuredProduct.title}</div>
                      <div className="text-xs font-black text-emerald-400">RM {MOCK_LIVE_STREAMS[0].featuredProduct.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`🛒 Added "${MOCK_LIVE_STREAMS[0].featuredProduct.title}" to instant live checkout!`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Stream Live Chat Panel */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-80 sm:h-96">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Live Student Chat</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 py-2 no-scrollbar">
                  {liveComments.map((c) => (
                    <div key={c.id} className="text-xs space-y-0.5 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{c.user}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{c.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendLiveComment} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask host a question..."
                    className="flex-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: CAMPUS DEALS & LOYALTY REWARDS */}
      {subTab === 'deals_rewards' && (
        <div className="space-y-6">
          
          {/* LOYALTY POINTS STATUS BANNER */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] bg-white/20 text-indigo-100 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Campus Loyalty Programme
              </span>
              <h3 className="text-xl font-black">Your Reward Balance: {userPoints} Points</h3>
              <p className="text-xs text-indigo-200">Earn 10 points for buying, selling, reviewing & referring fellow polytechnic students.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
              <div className="text-xs text-indigo-200 font-medium">Referral Code</div>
              <div className="text-base font-black text-amber-300 tracking-wider">PSAS-STUDENT-2026</div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('PSAS-STUDENT-2026');
                  setReferralCopied(true);
                  setTimeout(() => setReferralCopied(false), 2000);
                }}
                className="mt-1.5 text-[10px] bg-white text-indigo-950 font-bold px-3 py-1 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
              >
                {referralCopied ? 'Copied! 🎉' : 'Copy Code & Earn 100 Pts'}
              </button>
            </div>
          </div>

          {/* REWARDS CATALOGUE */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Redeemable Loyalty Rewards Catalog</span>
              </h3>
              <span className="text-xs text-slate-500">Points deduct automatically</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_LOYALTY_REWARDS.map((rew) => {
                const isClaimed = claimedRewards.includes(rew.id);
                return (
                  <div key={rew.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{rew.icon}</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          {rew.pointsRequired} Pts
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{rew.title}</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{rew.description}</p>
                    </div>

                    <button
                      onClick={() => handleClaimReward(rew)}
                      disabled={isClaimed}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isClaimed
                          ? 'bg-emerald-600 text-white cursor-default'
                          : userPoints >= rew.pointsRequired
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isClaimed ? '✓ Claimed' : 'Redeem Reward'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CAMPUS PARTNER DEALS & DISCOUNTS */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <span>Campus Partner Merchant Discounts (10% OFF+)</span>
                </h3>
                <p className="text-xs text-slate-500">Show student QR code at partner cashier counters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_DEALS_PARTNERS.map((deal) => (
                <div key={deal.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                  <img src={deal.imageUrl} alt={deal.partnerName} className="w-full h-32 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-extrabold px-2 py-0.5 rounded-full">
                      {deal.category}
                    </span>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">{deal.partnerName}</div>
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">{deal.discountText}</div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{deal.location} • {deal.redeemedCount} Redeemed</p>
                  </div>

                  <button
                    onClick={() => alert(`🎟️ Voucher Code: ${deal.qrCodeVoucher}\nShow this code to cashier at ${deal.partnerName}`)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Get 10% Discount Code
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 4: AI BUSINESS COACH & CAMPUS ASSISTANT */}
      {subTab === 'ai_coaches' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AI BUSINESS COACH */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Bot className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">AI Student Business Coach</h3>
                <p className="text-xs text-slate-500">Ask why items aren't selling or how to grow sales</p>
              </div>
            </div>

            <form onSubmit={handleAskCoach} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Sales Question:</label>
                <input
                  type="text"
                  value={coachQuestion}
                  onChange={(e) => setCoachQuestion(e.target.value)}
                  placeholder="e.g. Why isn't my marketing textbook selling?"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                {['Why slow sales?', 'Best photo tips', 'Ideal pricing'].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setCoachQuestion(prompt)}
                    className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-indigo-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Get AI Business Advice 🚀
              </button>
            </form>

            {coachResponse && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs text-indigo-950 dark:text-indigo-200 space-y-2 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Business Coach Advice:</span>
                </div>
                <p className="whitespace-pre-line leading-relaxed">{coachResponse}</p>
              </div>
            )}
          </div>

          {/* AI CAMPUS ASSISTANT */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">AI Campus Assistant</h3>
                <p className="text-xs text-slate-500">Ask campus FAQs (printing, Block C, library hours)</p>
              </div>
            </div>

            <form onSubmit={handleAskAssistant} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Campus Question:</label>
                <input
                  type="text"
                  value={assistantQuery}
                  onChange={(e) => setAssistantQuery(e.target.value)}
                  placeholder="e.g. Where can I print assignments on campus?"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                {['Where to print?', 'Where is Block C?', 'Library hours'].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setAssistantQuery(prompt)}
                    className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-emerald-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Ask Campus AI 📍
              </button>
            </form>

            {assistantAnswer && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-950 dark:text-emerald-200 space-y-2 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Campus AI Answer:</span>
                </div>
                <p className="leading-relaxed">{assistantAnswer}</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUB-TAB 5: SUSTAINABILITY & SDG 12 TRACKER */}
      {subTab === 'sustainability' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                UN SDG 12: Responsible Consumption & Production
              </span>
              <span className="text-xs text-emerald-200">Campus Eco Champion</span>
            </div>

            <h3 className="text-2xl font-black">Your Sustainability & Circular Economy Impact</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                <div className="text-2xl font-black text-amber-300">32</div>
                <div className="text-xs text-slate-200">Items Reused</div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                <div className="text-2xl font-black text-emerald-300">RM 1,250</div>
                <div className="text-xs text-slate-200">Money Saved</div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                <div className="text-2xl font-black text-sky-300">45 kg</div>
                <div className="text-xs text-slate-200">Waste Prevented</div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
                <div className="text-2xl font-black text-purple-300">67 kg</div>
                <div className="text-xs text-slate-200">Carbon Avoided</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: CO-FOUNDER COLLABORATION HUB */}
      {subTab === 'collaborate' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Business Collaboration & Teammate Finder</h3>
              <p className="text-xs text-slate-500">Find co-founders, graphic designers, programmers & marketing partners for FYP startups</p>
            </div>
            <button
              onClick={() => alert('📝 Created collaboration request!')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer"
            >
              + Post Collaboration Request
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_COLLABORATIONS.map((collab) => (
              <div key={collab.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={collab.creatorAvatar} alt={collab.creatorName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{collab.creatorName}</div>
                      <div className="text-[10px] text-slate-500">{collab.creatorCourse}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">
                    Looking for: {collab.roleLookingFor}
                  </span>
                </div>

                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{collab.projectTitle}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{collab.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {collab.skillsNeeded.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => alert(`📧 Contact email: ${collab.contactEmail}`)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Connect with Creator →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NEWS, EVENTS & CLUB TICKETS */}
      {subTab === 'news_events' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>Campus News, Workshops & Event Ticket Marketplace</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_NEWS_EVENTS.map((news) => (
                <div key={news.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                  <img src={news.image} alt={news.title} className="w-full h-36 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 font-bold px-2 py-0.5 rounded">
                        {news.type}
                      </span>
                      <span className="text-slate-500 font-medium">{news.date}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">{news.title}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{news.description}</p>
                  </div>

                  <button
                    onClick={() => alert(`🎟️ Reserved ticket for ${news.title}!`)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs cursor-pointer"
                  >
                    {news.ticketPrice === 0 ? 'Register Free Ticket' : `Get Ticket (RM ${news.ticketPrice})`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: STUDENT CAREER & BUSINESS PORTFOLIO */}
      {subTab === 'portfolio' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Verified Student Career & Entrepreneurship Portfolio</span>
              </h3>
              <p className="text-xs text-slate-500">Includes verified campus sales, customer rating & business transferable skills for internship applications</p>
            </div>

            <button
              onClick={() => alert('📄 Generating official PDF Portfolio document for internship submission...')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Internship PDF</span>
            </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl space-y-5 border border-indigo-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-lg font-black">{MOCK_STUDENT_PORTFOLIO.studentName}</div>
                <div className="text-xs text-indigo-200">{MOCK_STUDENT_PORTFOLIO.studentId} • {MOCK_STUDENT_PORTFOLIO.course}</div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {MOCK_STUDENT_PORTFOLIO.sellerBadges.map((badge, idx) => (
                  <span key={idx} className="text-[10px] bg-white/10 border border-white/20 text-indigo-200 px-2 py-0.5 rounded-full font-bold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl font-black text-amber-300">{MOCK_STUDENT_PORTFOLIO.totalSalesCount}</div>
                <div className="text-[10px] text-slate-300">Total Transactions</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl font-black text-emerald-300">RM {MOCK_STUDENT_PORTFOLIO.totalRevenueRM}</div>
                <div className="text-[10px] text-slate-300">Revenue Generated</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl font-black text-purple-300">{MOCK_STUDENT_PORTFOLIO.ratingScore} / 5.0</div>
                <div className="text-[10px] text-slate-300">Customer Rating</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl font-black text-sky-300">{MOCK_STUDENT_PORTFOLIO.reusedItemsCount} Items</div>
                <div className="text-[10px] text-slate-300">Reused (SDG 12)</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-amber-300">Acquired Business & Career Competencies:</div>
              <div className="flex flex-wrap gap-2">
                {MOCK_STUDENT_PORTFOLIO.skillsAcquired.map((skill, idx) => (
                  <span key={idx} className="text-xs bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 px-3 py-1 rounded-xl">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR CODE PICKUP HANDOVER MODAL */}
      {showQrPickupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Safe Campus QR Pickup Handover
            </div>

            {!qrScannedSuccess ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <QrCode className="w-40 h-40 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-xs text-slate-500">Show this QR code to the seller during physical meetup at campus pickup spot to complete transaction & earn 20 points.</p>

                <button
                  onClick={() => setQrScannedSuccess(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Simulate Seller QR Scan ✓
                </button>
              </div>
            ) : (
              <div className="space-y-3 py-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-slate-100">Handover Verified Successfully!</div>
                <p className="text-xs text-slate-500">Transaction completed. 20 Loyalty Points added to your balance.</p>
              </div>
            )}

            <button
              onClick={() => {
                setShowQrPickupModal(false);
                setQrScannedSuccess(false);
              }}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-xl text-xs cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
