import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  QrCode, 
  Truck, 
  ShieldAlert, 
  Rocket, 
  BarChart3, 
  Bot, 
  Leaf, 
  Users, 
  Briefcase, 
  Network, 
  Award, 
  Glasses, 
  TrendingUp, 
  UserCheck, 
  Building2, 
  Languages, 
  School, 
  Compass,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Search,
  Star,
  Target,
  Zap,
  Lightbulb,
  Cpu
} from 'lucide-react';

interface RecommendationItem {
  id: number;
  title: string;
  rating: number;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4' | 'Phase 5';
  category: 'AI & Smart Features' | 'Ecosystem & Campus' | 'Commerce & Business' | 'Sustainability & SDG' | 'Institutional & Tech';
  icon: React.ReactNode;
  summary: string;
  keyBenefits: string[];
  exampleOrWorkflow: string;
  sdgTag?: string;
  badgeText?: string;
}

const STRATEGIC_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 1,
    title: 'Expand Beyond One Campus',
    rating: 5,
    phase: 'Phase 5',
    category: 'Ecosystem & Campus',
    icon: <Globe className="w-5 h-5 text-indigo-600" />,
    summary: 'Scale Campus Corner beyond PSAS to cover all Malaysian Polytechnics, public & private universities, and ultimately ASEAN regional student marketplaces.',
    keyBenefits: ['Larger active buyer/seller base', 'Higher listing density & variety', 'Stronger cross-campus network effects', 'Higher institutional valuation'],
    exampleOrWorkflow: 'Phase 1 (PSAS) → Phase 2 (All Polytechnics) → Phase 3 (Public Universities: UiTM, UPM, USM) → Phase 4 (Private Varsities) → Phase 5 (ASEAN Student Marketplace).',
    badgeText: 'Multi-Campus Scale'
  },
  {
    id: 2,
    title: 'AI Personal Shopping Assistant',
    rating: 5,
    phase: 'Phase 2',
    category: 'AI & Smart Features',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    summary: 'Personalized AI engine that recommends textbooks, notes, apparel, and tools tailored to student course, semester level, previous purchases, and wishlist.',
    keyBenefits: ['Saves time finding relevant course materials', 'Higher conversion for student sellers', 'Tailored semester recommendations'],
    exampleOrWorkflow: 'Semester 4 Marketing student logs in → AI immediately recommends Consumer Behaviour textbook, Marketing lecture slides, financial calculator & internship blazer.',
    badgeText: 'Smart Personalization'
  },
  {
    id: 3,
    title: 'Integrated Digital Payment',
    rating: 5,
    phase: 'Phase 3',
    category: 'Commerce & Business',
    icon: <QrCode className="w-5 h-5 text-pink-600" />,
    summary: 'Seamless in-app e-wallet payment integration with DuitNow QR, Touch \'n Go eWallet, Boost, GrabPay, and Maybank MAE.',
    keyBenefits: ['Faster cashless transactions', 'Eliminates exact change hassles', 'Automated digital receipt history for seller portfolio'],
    exampleOrWorkflow: 'Seller presents dynamic or uploaded DuitNow/TNG QR code directly inside chat; buyer scans & pays with instant automated transaction receipt.',
    badgeText: 'Cashless Campus'
  },
  {
    id: 4,
    title: 'Campus Delivery Runner Service',
    rating: 5,
    phase: 'Phase 3',
    category: 'Ecosystem & Campus',
    icon: <Truck className="w-5 h-5 text-emerald-600" />,
    summary: 'Introduce peer-to-peer "Campus Runners" where student couriers earn pocket money delivering marketplace orders directly between hostels and faculty halls.',
    keyBenefits: ['On-demand convenience for busy students', 'Micro-gig earnings for student runners', 'Faster campus-wide order fulfillment'],
    exampleOrWorkflow: 'Student A sells a textbook → Campus Runner accepts dispatch job → Picked up at Library → Delivered straight to Hostel Block B room door.',
    badgeText: 'Gig Economy'
  },
  {
    id: 5,
    title: 'AI Scam & Prohibited Item Detection',
    rating: 5,
    phase: 'Phase 1',
    category: 'AI & Smart Features',
    icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
    summary: 'Automated AI vision & NLP filter that detects fake stock photos, duplicate spam listings, suspicious messaging patterns, and banned vape/alcohol/weapons.',
    keyBenefits: ['100% compliant with PSAS Disciplinary Code 5.1', 'Protects students from scam listings', 'Instantly blocks prohibited item uploads'],
    exampleOrWorkflow: 'Seller uploads a vape photo or duplicate exam paper → AI Vision flags image in real-time → User receives immediate policy warning banner and publishing block.',
    badgeText: 'Safety First'
  },
  {
    id: 6,
    title: 'Student Entrepreneur Incubator',
    rating: 5,
    phase: 'Phase 4',
    category: 'Commerce & Business',
    icon: <Rocket className="w-5 h-5 text-amber-600" />,
    summary: 'Transforms the marketplace into a digital incubator where commerce students launch micro-brands, receive faculty mentorship, and pitch for campus seed grants.',
    keyBenefits: ['Bridge between academic FYP and real business', 'Mentorship & seed funding access', 'Formal business registration support'],
    exampleOrWorkflow: 'Student launches "Kopi Studio PSAS" → Receives Commerce Department mentorship → Achieves RM2,000 monthly sales → Qualifies for campus startup grant.',
    badgeText: 'Incubator Program'
  },
  {
    id: 7,
    title: 'Marketing Analytics Dashboard',
    rating: 5,
    phase: 'Phase 2',
    category: 'Commerce & Business',
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
    summary: 'Empowers commerce students with real-time business data analytics including views, conversion rates, customer demographics, and peak sales hours.',
    keyBenefits: ['Practical application of marketing theories', 'Data-driven pricing & promo decisions', 'Live revenue tracking for FYP modules'],
    exampleOrWorkflow: 'Student store dashboard displays 320 impressions with 12.5% conversion rate, revealing peak buying activity occurs during 12:00 PM - 2:00 PM lunch breaks.',
    sdgTag: 'SDG 8 & 9'
  },
  {
    id: 8,
    title: 'AI Business Coach',
    rating: 5,
    phase: 'Phase 4',
    category: 'AI & Smart Features',
    icon: <Bot className="w-5 h-5 text-cyan-600" />,
    summary: 'An embedded AI co-pilot that acts like a 24/7 marketing lecturer, diagnosing slow-moving inventory and offering actionable optimization advice.',
    keyBenefits: ['Personalized marketing guidance', 'Optimizes listing titles & pricing', 'Increases sales velocity for student vendors'],
    exampleOrWorkflow: 'Student asks: "Why isn\'t my textbook selling?" → AI Coach answers: "Photos are dim. Reduce price by RM 5 and add keywords: DKM Semester 3."',
    badgeText: 'AI Co-Pilot'
  },
  {
    id: 9,
    title: 'Sustainability & Circular Economy Dashboard',
    rating: 5,
    phase: 'Phase 3',
    category: 'Sustainability & SDG',
    icon: <Leaf className="w-5 h-5 text-emerald-600" />,
    summary: 'Quantifies each student\'s circular economy impact by calculating items reused, money saved, waste diverted from landfills, and CO₂ emissions avoided.',
    keyBenefits: ['Promotes sustainable campus culture', 'Quantifies SDG 12 Responsible Consumption', 'Shareable green badges for student profiles'],
    exampleOrWorkflow: 'Dashboard highlights: "By purchasing 4 pre-loved textbooks, you saved RM180 and reduced 12.4kg of paper carbon footprint!"',
    sdgTag: 'SDG 12'
  },
  {
    id: 10,
    title: 'Campus Community Ecosystem Hub',
    rating: 5,
    phase: 'Phase 1',
    category: 'Ecosystem & Campus',
    icon: <Users className="w-5 h-5 text-indigo-600" />,
    summary: 'Expands marketplace interaction into campus life: club event promotion, lost & found boards, committee member recruitment, and carpooling.',
    keyBenefits: ['Centralizes campus communications', 'Higher daily app retention & engagement', 'Fosters collaborative student community'],
    exampleOrWorkflow: 'PSAS Robotics Club posts recruitment drive → 15 students sign up → Club borrows 3D printer tools through the Borrow & Swap board.',
    badgeText: 'Community Hub'
  },
  {
    id: 11,
    title: 'Student Service Marketplace',
    rating: 5,
    phase: 'Phase 2',
    category: 'Commerce & Business',
    icon: <Briefcase className="w-5 h-5 text-purple-600" />,
    summary: 'Allows students to monetize skills by offering freelance services: tutoring, graphic design, photography, resume writing, slide design, and translation.',
    keyBenefits: ['Monetizes student talents', 'Affordable services for peers', 'Builds real-world freelance portfolio'],
    exampleOrWorkflow: 'Graphic design student lists "Custom Canva Presentation Design for RM15" → 8 classmates order for FYP presentation slides.',
    sdgTag: 'SDG 8'
  },
  {
    id: 12,
    title: 'Internship & Part-Time Job Portal',
    rating: 5,
    phase: 'Phase 5',
    category: 'Commerce & Business',
    icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
    summary: 'Direct job board connecting commerce students with local industry partners, weekend retail gigs, and semester industrial training placements.',
    keyBenefits: ['Direct bridge to industrial training', 'Verified campus employers', 'Supports SDG 8 Decent Work & Economic Growth'],
    exampleOrWorkflow: 'Local logistics firm advertises 3 weekend inventory assistant jobs → 12 PSAS students apply with 1-click verified student profiles.',
    sdgTag: 'SDG 8'
  },
  {
    id: 13,
    title: 'Cross-Disciplinary Business Collaboration Network',
    rating: 5,
    phase: 'Phase 4',
    category: 'Ecosystem & Campus',
    icon: <Network className="w-5 h-5 text-amber-600" />,
    summary: 'A co-founder matchmaking tool where marketing students connect with IT programmers and graphic designers to build multi-talented campus startups.',
    keyBenefits: ['Combines complementary skillsets', 'Encourages cross-department FYP projects', 'Turns student ideas into real ventures'],
    exampleOrWorkflow: 'Commerce student (Marketing) posts "Need React Developer for Food Tech Startup" → IT student joins → Team launches successful campus app.',
    badgeText: 'Co-Founder Match'
  },
  {
    id: 14,
    title: 'Campus Loyalty & Rewards Program',
    rating: 4,
    phase: 'Phase 3',
    category: 'Ecosystem & Campus',
    icon: <Award className="w-5 h-5 text-rose-600" />,
    summary: 'Gamified reward points earned whenever students complete purchases, list items, write reviews, or refer friends, redeemable for campus perks.',
    keyBenefits: ['Drives long-term user retention', 'Incentivizes positive review behavior', 'Redeemable for cafeteria & printing discounts'],
    exampleOrWorkflow: 'Student earns 250 "CornerPoints" from 5 verified sales → Redeems points for RM5 free printing at PSAS Library printing center.',
    badgeText: 'Loyalty Points'
  },
  {
    id: 15,
    title: 'AR Product 3D Room Preview',
    rating: 4,
    phase: 'Phase 5',
    category: 'AI & Smart Features',
    icon: <Glasses className="w-5 h-5 text-indigo-600" />,
    summary: 'Augmented Reality feature letting buyers project furniture, study desks, or electronic gear into 3D scale inside their hostel room before buying.',
    keyBenefits: ['Reduces return disputes over size', 'High-tech interactive experience', 'Differentiates platform from standard classifieds'],
    exampleOrWorkflow: 'Buyer views a pre-loved study desk → Taps "View in My Room AR" → Phone camera renders desk model onto hostel floor to test fit.',
    badgeText: 'AR Vision'
  },
  {
    id: 16,
    title: 'AI Academic Demand Forecasting',
    rating: 5,
    phase: 'Phase 4',
    category: 'AI & Smart Features',
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    summary: 'Predicts surge demand for specific items based on the polytechnic academic calendar (e.g. revision notes & scientific calculators 2 weeks before exams).',
    keyBenefits: ['Proactive inventory notifications', 'Prevents last-minute study supply shortages', 'Higher sales velocity during peak weeks'],
    exampleOrWorkflow: 'Two weeks before PSAS final exams → AI detects historical demand spike → Sends push alert: "Demand for Casio fx-570EX calculators up 300%! List yours now."',
    badgeText: 'Demand Predictor'
  },
  {
    id: 17,
    title: 'Student Entrepreneur Portfolio Builder',
    rating: 5,
    phase: 'Phase 2',
    category: 'Commerce & Business',
    icon: <Building2 className="w-5 h-5 text-purple-600" />,
    summary: 'Automatically compiles a student\'s verified sales record, customer trust score, and total revenue into a shareable digital entrepreneurship certificate.',
    keyBenefits: ['Empirical proof of business acumen for job interviews', 'Verifiable track record backed by platform data', 'Enhances graduate employability'],
    exampleOrWorkflow: 'Graduating student exports "PSAS Verified Entrepreneurship Portfolio" showing RM4,500 total sales & 98% trust score to attach with resume for interview.',
    badgeText: 'CV Booster'
  },
  {
    id: 18,
    title: 'Polytechnic System Single Sign-On (SSO)',
    rating: 5,
    phase: 'Phase 1',
    category: 'Institutional & Tech',
    icon: <School className="w-5 h-5 text-indigo-600" />,
    summary: 'Seamless integration with official Polytechnic Student Portal, official email verification (@psas.edu.my), and academic timetable synchronisation.',
    keyBenefits: ['Zero fake accounts or unauthorized outsiders', 'Automated student identity verification', 'Single login credentials for all campus apps'],
    exampleOrWorkflow: 'Student logs in with official PSAS Matric ID → System verifies active student status automatically → Unlocks full campus marketplace features.',
    badgeText: 'SSO Integration'
  },
  {
    id: 19,
    title: 'Multi-Language Global Support',
    rating: 4,
    phase: 'Phase 1',
    category: 'Institutional & Tech',
    icon: <Languages className="w-5 h-5 text-blue-600" />,
    summary: 'Full multi-lingual support in English, Bahasa Melayu, Mandarin, and Tamil to ensure maximum accessibility for all Malaysian & international students.',
    keyBenefits: ['Inclusivity across diverse student body', 'Higher adoption among international exchange students', 'Seamless localization'],
    exampleOrWorkflow: 'User toggles language setting to Bahasa Melayu → Entire interface, listing categories, and AI Valuation tool instantly render in fluent Bahasa.',
    badgeText: 'Multi-Lingual'
  },
  {
    id: 20,
    title: 'Institutional BI Dashboard for Polytechnic Admin',
    rating: 5,
    phase: 'Phase 5',
    category: 'Institutional & Tech',
    icon: <Compass className="w-5 h-5 text-slate-800" />,
    summary: 'An administrative analytics portal providing polytechnic leadership with aggregated, anonymized insights on student entrepreneurship & sustainability metrics.',
    keyBenefits: ['Institutional reporting for MOHE / TVET audits', 'Measures campus economic activity', 'Informs campus resource & grant planning'],
    exampleOrWorkflow: 'PSAS Commerce Department Head accesses BI dashboard: Sees 450 active student sellers, RM35,000 semester trade volume, and 1.2 tonnes of textbook paper recycled.',
    badgeText: 'Polytechnic BI'
  }
];

export const StrategicRoadmapView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePhase, setActivePhase] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(STRATEGIC_RECOMMENDATIONS[0]);

  const categories = ['All', 'AI & Smart Features', 'Ecosystem & Campus', 'Commerce & Business', 'Sustainability & SDG', 'Institutional & Tech'];
  const phases = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

  const filteredRecs = STRATEGIC_RECOMMENDATIONS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesPhase = activePhase === 'All' || item.phase === activePhase;
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleOrWorkflow.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPhase && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-12">
      
      {/* Strategic Vision Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>20 Strategic Recommendations & Innovation Roadmap</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Scaling Campus Corner into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-300 to-emerald-300">ASEAN Student Ecosystem</span>
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium">
            Long-term architectural strategy, AI capabilities, circular economy sustainability, and multi-campus scaling roadmap designed for Politeknik Sultan Azlan Shah (PSAS) and national TVET institutions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 font-bold block uppercase">Total Recommendations</span>
              <strong className="text-lg font-black text-white">20 Modules</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 font-bold block uppercase">SDG Alignment</span>
              <strong className="text-lg font-black text-emerald-400">SDG 8, 9 & 12</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 font-bold block uppercase">AI Integration</span>
              <strong className="text-lg font-black text-amber-300">5 Smart Models</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 font-bold block uppercase">Roadmap Horizon</span>
              <strong className="text-lg font-black text-indigo-300">Phase 1 to 5</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Development Roadmap Timeline Pipeline */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <span>Future Development Roadmap (5-Phase Master Plan)</span>
          </h2>
          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full">
            Strategic Roadmap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[
            { phase: 'Phase 1', title: 'Core Marketplace', desc: 'Verified student accounts, chat system & safe pickup spots' },
            { phase: 'Phase 2', title: 'Student Biz & AI', desc: 'Mini stores, service marketplace, AI pricing & analytics' },
            { phase: 'Phase 3', title: 'Payments & Delivery', desc: 'Digital QR payments, campus runner delivery, sustainability' },
            { phase: 'Phase 4', title: 'AI Coach & Incubator', desc: 'AI business coach, demand forecasting, founder network' },
            { phase: 'Phase 5', title: 'Multi-Campus Scale', desc: 'ASEAN expansion, job portal, AR preview & polytechnic BI' }
          ].map((p, idx) => (
            <div key={p.phase} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 relative hover:border-indigo-400 hover:shadow-xs transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  {p.phase}
                </span>
                <span className="text-[10px] font-bold text-slate-400">Step {idx + 1}</span>
              </div>
              <h3 className="font-extrabold text-xs text-slate-900">{p.title}</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search recommendations, AI, payments, runner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">Phase:</span>
            {phases.map((ph) => (
              <button
                key={ph}
                onClick={() => setActivePhase(ph)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activePhase === ph
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ph}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-500'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List vs Selected Detail Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 20 Cards List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredRecs.length} of 20 Strategic Recommendations
            </span>
            <span className="text-[11px] text-indigo-600 font-semibold">Click card to inspect details</span>
          </div>

          <div className="space-y-2.5 max-h-[800px] overflow-y-auto pr-1">
            {filteredRecs.map((item) => {
              const isSelected = selectedRec?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRec(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-indigo-50/90 border-2 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-slate-200 shrink-0">
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.2 rounded-md">
                            #{item.id}
                          </span>
                          <h3 className="font-extrabold text-xs text-slate-900 truncate">
                            {item.title}
                          </h3>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center text-amber-400 text-xs shrink-0">
                          {Array(item.rating).fill(0).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          {item.phase}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.category}
                        </span>
                        {item.sdgTag && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {item.sdgTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Inspection Panel */}
        <div className="lg:col-span-5">
          {selectedRec ? (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-5 sticky top-24">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-600">
                    {selectedRec.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-md">
                        Module #{selectedRec.id}
                      </span>
                      <span className="text-[10px] font-extrabold text-indigo-600 uppercase">
                        {selectedRec.phase}
                      </span>
                    </div>
                    <h2 className="font-extrabold text-base text-slate-900 mt-0.5">{selectedRec.title}</h2>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Strategic Overview</span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {selectedRec.summary}
                </p>
              </div>

              {/* Practical Example & Workflow */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Real Campus Workflow Example</span>
                </span>
                <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs text-indigo-950 font-semibold leading-relaxed">
                  {selectedRec.exampleOrWorkflow}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Key Business & Student Benefits</span>
                <div className="space-y-1.5">
                  {selectedRec.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                  Category: {selectedRec.category}
                </span>
                {selectedRec.badgeText && (
                  <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg">
                    ✨ {selectedRec.badgeText}
                  </span>
                )}
                {selectedRec.sdgTag && (
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg">
                    🌱 {selectedRec.sdgTag}
                  </span>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-8 text-center text-slate-400 text-xs border border-dashed border-slate-300">
              Select a recommendation card on the left to inspect detailed strategic workflows.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
