import React, { useState, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Tag, 
  MapPin, 
  Image as ImageIcon, 
  DollarSign, 
  Check, 
  Loader2, 
  AlertCircle,
  HelpCircle,
  Upload,
  Ban,
  ShieldAlert,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Product, CategoryType, ConditionType, User, PickupSpot } from '../types';

interface SellItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  pickupSpots: PickupSpot[];
  onAddProduct: (product: Product) => void;
}

const PRESET_IMAGES = [
  { name: 'Calculator', url: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Dessert Cup', url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80' },
  { name: 'Canva Slide Template', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80' },
  { name: 'Notes & Paper', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80' },
  { name: 'Logo Design', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80' },
  { name: 'Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80' },
];

const PROHIBITED_KEYWORDS = [
  // Weapons & Firearms
  { word: 'weapon', reason: 'Weapons, firearms, and tactical items are strictly banned on campus.' },
  { word: 'weapons', reason: 'Weapons, firearms, and tactical items are strictly banned on campus.' },
  { word: 'firearm', reason: 'Firearms, guns, and dangerous weapons are strictly banned on campus.' },
  { word: 'firearms', reason: 'Firearms, guns, and dangerous weapons are strictly banned on campus.' },
  { word: 'gun', reason: 'Guns and firearms are strictly prohibited under campus safety regulations.' },
  { word: 'guns', reason: 'Guns and firearms are strictly prohibited under campus safety regulations.' },
  { word: 'knife', reason: 'Knives, combat blades, and dangerous cutting tools are prohibited.' },
  { word: 'knives', reason: 'Knives, combat blades, and dangerous cutting tools are prohibited.' },
  { word: 'blade', reason: 'Combat blades and dangerous weapons are prohibited on campus.' },
  { word: 'sword', reason: 'Swords and sharp blades are prohibited on campus.' },
  { word: 'explosive', reason: 'Explosive materials and fireworks are strictly prohibited.' },
  { word: 'explosives', reason: 'Explosive materials and fireworks are strictly prohibited.' },
  { word: 'fireworks', reason: 'Fireworks and pyrotechnics are prohibited on campus grounds.' },
  { word: 'mercun', reason: 'Firecrackers and fireworks are strictly prohibited on campus.' },
  { word: 'ammo', reason: 'Ammunition and explosives are strictly prohibited.' },

  // Illegal Substances & Controlled Drugs
  { word: 'illegal substance', reason: 'Illegal substances, narcotics, and unapproved drugs are strictly prohibited.' },
  { word: 'illegal substances', reason: 'Illegal substances, narcotics, and unapproved drugs are strictly prohibited.' },
  { word: 'drug', reason: 'Illegal drugs, narcotics, and unprescribed controlled substances are prohibited.' },
  { word: 'drugs', reason: 'Illegal drugs, narcotics, and unprescribed controlled substances are prohibited.' },
  { word: 'narcotics', reason: 'Illegal narcotics and controlled substances are strictly prohibited on campus.' },
  { word: 'weed', reason: 'Cannabis and illegal substances are strictly banned on campus.' },
  { word: 'ganja', reason: 'Illegal narcotics and cannabis are strictly prohibited under campus policy.' },
  { word: 'ketum', reason: 'Ketum leaf/extracts and controlled illegal substances are strictly prohibited.' },
  { word: 'cannabis', reason: 'Cannabis and narcotics are strictly prohibited on campus.' },
  { word: 'meth', reason: 'Illegal narcotics and controlled substances are strictly prohibited.' },
  { word: 'cocaine', reason: 'Illegal narcotics are strictly prohibited under university regulations.' },
  { word: 'steroids', reason: 'Unlicensed anabolic steroids and controlled performance drugs are prohibited.' },
  { word: 'prescription drug', reason: 'Unlicensed sale of prescription drugs or medicines is prohibited.' },

  // Unauthorized Commercial Products & Counterfeits
  { word: 'unauthorized commercial', reason: 'Unauthorized commercial goods, unapproved resale, or commercial bulk trading without permit are prohibited.' },
  { word: 'unauthorized product', reason: 'Unauthorized commercial products or unlicensed goods are prohibited on campus marketplace.' },
  { word: 'unauthorized products', reason: 'Unauthorized commercial products or unlicensed goods are prohibited on campus marketplace.' },
  { word: 'counterfeit', reason: 'Counterfeit branded goods and fake products are strictly prohibited.' },
  { word: 'fake', reason: 'Fake branded merchandise or counterfeit items are strictly prohibited.' },
  { word: 'replica', reason: 'Replica designer goods and counterfeit products are prohibited.' },
  { word: 'pirated', reason: 'Pirated software, media, or cracked digital keys are prohibited.' },
  { word: 'knockoff', reason: 'Knockoff or counterfeit commercial products are prohibited.' },
  { word: 'bootleg', reason: 'Bootleg merchandise or pirated media are prohibited.' },
  { word: 'pyramid scheme', reason: 'MLM and multi-level marketing pyramid commercial products are prohibited.' },
  { word: 'mlm', reason: 'Multi-level marketing (MLM) commercial products are prohibited on campus.' },

  // Vape, Tobacco & E-Cigarettes
  { word: 'vape', reason: 'Vape & E-Cigarette devices, pods, or liquids are strictly banned on PSAS campus.' },
  { word: 'vaping', reason: 'Vape & E-Cigarette products are strictly banned on PSAS campus.' },
  { word: 'ecig', reason: 'E-Cigarettes and vape accessories are prohibited under campus rules.' },
  { word: 'e-cigarette', reason: 'Electronic cigarettes and vape accessories are prohibited.' },
  { word: 'pod', reason: 'Vape pods or e-juice liquids are prohibited.' },
  { word: 'relx', reason: 'Vape devices (Relx) are prohibited.' },
  { word: 'rokok', reason: 'Cigarettes & Tobacco products are strictly prohibited on campus.' },
  { word: 'cigarette', reason: 'Cigarettes & Tobacco products are prohibited.' },
  { word: 'tobacco', reason: 'Tobacco products are prohibited under university regulations.' },

  // Alcohol & Liquor
  { word: 'arak', reason: 'Alcoholic beverages & liquor are strictly prohibited on campus grounds.' },
  { word: 'beer', reason: 'Alcoholic beverages are strictly prohibited on campus grounds.' },
  { word: 'alcohol', reason: 'Alcoholic beverages are strictly prohibited on campus grounds.' },
  { word: 'liquor', reason: 'Liquor and spirits are strictly prohibited on campus grounds.' },

  // Exam Leaks & Misconduct
  { word: 'soalan bocor', reason: 'Leaked examination papers or quiz answer keys are strictly prohibited.' },
  { word: 'exam leak', reason: 'Leaked exam papers or academic misconduct materials are prohibited.' },
  { word: 'bocor exam', reason: 'Leaked exam papers are prohibited.' },

  // Gambling & Stolen Items
  { word: 'judi', reason: 'Gambling activities, tickets, or betting tools are prohibited.' },
  { word: 'gambling', reason: 'Gambling products or services are prohibited.' },
  { word: 'stolen', reason: 'Stolen or illegally acquired goods are strictly prohibited.' },
  { word: 'cracked software', reason: 'Pirated software or unauthorized serial keys are prohibited.' },
];

export const SellItemModal: React.FC<SellItemModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  pickupSpots,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Books');
  const [condition, setCondition] = useState<ConditionType>('Used');
  const [price, setPrice] = useState<string>('');
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isDeviceUploaded, setIsDeviceUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [imageViolationReason, setImageViolationReason] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState(pickupSpots[0]?.name || 'PSAS Main Library Lobby');
  const [showPolicyGuide, setShowPolicyGuide] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // AI State
  const [isEvaluatingPrice, setIsEvaluatingPrice] = useState(false);
  const [aiPriceResult, setAiPriceResult] = useState<{
    recommendedPrice: number;
    marketAvg: number;
    confidence: string;
    sellingSpeed: string;
    reasoning: string;
  } | null>(null);

  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  // Helper to check text against prohibited keywords
  const checkProhibitedKeyword = (text: string) => {
    const lower = text.toLowerCase();
    for (const item of PROHIBITED_KEYWORDS) {
      if (lower.includes(item.word)) {
        return item.reason;
      }
    }
    return null;
  };

  // Check Text Prohibited Violation
  const textViolationReason = checkProhibitedKeyword(`${title} ${description} ${highlights}`);

  // Combined Active Violation
  const activeViolationReason = imageViolationReason || textViolationReason;

  // Handle Product Image Upload from Device
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please select a smaller image.');
      return;
    }

    const filename = file.name;
    setUploadedFileName(filename);

    // Scan filename and file context for prohibited items
    const detectedReason = checkProhibitedKeyword(filename);
    if (detectedReason) {
      setImageViolationReason(`Prohibited item filename "${filename}": ${detectedReason}`);
    } else {
      setImageViolationReason(null);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        setIsDeviceUploaded(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper to test uploading/selecting sample prohibited photos
  const handleTestProhibitedImage = (sampleName: string, sampleUrl: string) => {
    setUploadedFileName(sampleName);
    const reason = checkProhibitedKeyword(sampleName);
    setImageUrl(sampleUrl);
    setIsDeviceUploaded(true);
    if (reason) {
      setImageViolationReason(`Image "${sampleName}": ${reason}`);
    } else {
      setImageViolationReason(null);
    }
  };

  // Trigger AI Price Recommendation Endpoint
  const handleAiPriceRecommend = async () => {
    if (!title.trim()) {
      alert('Please enter product title first before evaluating price.');
      return;
    }

    setIsEvaluatingPrice(true);
    setAiPriceResult(null);

    try {
      const res = await fetch('/api/ai/price-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          description: highlights,
          course: currentUser.course,
        }),
      });

      const data = await res.json();
      setAiPriceResult(data);
    } catch (err) {
      console.error('Failed to fetch AI price valuation:', err);
    } finally {
      setIsEvaluatingPrice(false);
    }
  };

  // Trigger Smart Product Description Endpoint
  const handleAiGenerateDesc = async () => {
    if (!title.trim()) {
      alert('Please enter product title first before generating description.');
      return;
    }

    setIsGeneratingDesc(true);

    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          highlights,
          pickupLocation,
          course: currentUser.course,
        }),
      });

      const data = await res.json();
      if (data?.description) {
        setDescription(data.description);
      }
    } catch (err) {
      console.error('Failed to generate description:', err);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeViolationReason) {
      alert(`⚠️ BANNED ITEM DETECTED:\n${activeViolationReason}\n\nThis item or image is prohibited under campus regulations and cannot be published.`);
      return;
    }

    if (!title || !price) {
      alert('Please fill in title and price.');
      return;
    }

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      title,
      category,
      condition,
      price: Number(price),
      description: description || highlights || 'Good condition student item.',
      images: [imageUrl],
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerDepartment: currentUser.department,
      sellerTrustScore: currentUser.trustScore,
      sellerAvatar: currentUser.avatarUrl,
      sellerVerified: currentUser.verified,
      pickupLocation,
      availableUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: 'Just now',
      views: 1,
      clicks: 1,
      messagesCount: 0,
      salesCount: 0,
      isFeatured: category === 'Student Businesses',
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-800 via-slate-900 to-indigo-900 text-white p-5 flex items-center justify-between border-b border-indigo-900/50">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-400" />
              <span>Sell Item or Student Service</span>
            </h2>
            <p className="text-xs text-indigo-200">
              List textbooks, calculators, Canva templates, or your FYP mini business product!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Hidden File Input for Device Image Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* PROHIBITED ITEM BANNED ALERT BANNER */}
          {activeViolationReason && (
            <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-4 space-y-2 animate-in shake duration-300">
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs">
                <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                <span>🚫 PROHIBITED ITEM DETECTED — CANNOT BE SOLD ON PLATFORM</span>
              </div>
              <p className="text-xs text-rose-900 font-semibold leading-relaxed">
                {activeViolationReason}
              </p>
              <div className="text-[11px] text-rose-800 bg-rose-100/80 p-2 rounded-lg font-medium">
                ⚖️ <strong>PSAS Disciplinary Code (Section 5.1):</strong> Selling vape/e-cigarettes, weapons, illegal substances, alcohol, leaked exam papers, or unauthorized commercial products through campus channels is strictly prohibited and NOT allowed on this app.
              </div>
            </div>
          )}

          {/* Policy Guide Banner Toggle */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span className="font-semibold">PSAS Campus Safe Selling & Prohibited Goods Rules</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPolicyGuide(!showPolicyGuide)}
              className="text-indigo-600 font-bold hover:underline cursor-pointer text-[11px]"
            >
              {showPolicyGuide ? 'Hide Rules' : 'View Prohibited Items List'}
            </button>
          </div>

          {showPolicyGuide && (
            <div className="bg-rose-950/5 border border-rose-200 rounded-xl p-3 space-y-1.5 text-xs animate-in fade-in">
              <h5 className="font-bold text-rose-950 flex items-center gap-1 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Strictly Banned Items on Campus Marketplace:</span>
              </h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700 pt-1">
                <li className="flex items-center gap-1.5">🚫 Vape, E-Liquid & Disposables</li>
                <li className="flex items-center gap-1.5">🚫 Cigarettes & Tobacco Products</li>
                <li className="flex items-center gap-1.5">🚫 Alcohol & Liquor Beverages</li>
                <li className="flex items-center gap-1.5">🚫 Knives, Weapons & Sharp Blades</li>
                <li className="flex items-center gap-1.5">🚫 Leaked Exam Papers & Quiz Keys</li>
                <li className="flex items-center gap-1.5">🚫 Prescription Medicine & Narcotics</li>
                <li className="flex items-center gap-1.5">🚫 Gambling Tools & Lottery Tickets</li>
                <li className="flex items-center gap-1.5">🚫 Pirated / Cracked Software Keys</li>
              </ul>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Product / Service Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Casio FX570 Calculator / Marketing Textbook"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Books">Books</option>
                <option value="Notes">Notes</option>
                <option value="Stationery">Stationery</option>
                <option value="Calculator">Calculator</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Student Businesses">Student Businesses (FYP)</option>
                <option value="Assignment Templates">Assignment Templates</option>
                <option value="Services">Services</option>
                <option value="Food Voucher">Food Voucher</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
          </div>

          {/* Condition & Price Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Condition */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Condition</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                {(['New', 'Like New', 'Used'] as const).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond)}
                    className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                      condition === cond
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Price (RM) <span className="text-rose-500">*</span>
                </label>

                {/* AI Price Recommendation Button ⭐ */}
                <button
                  type="button"
                  onClick={handleAiPriceRecommend}
                  disabled={isEvaluatingPrice}
                  className="text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {isEvaluatingPrice ? (
                    <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                  )}
                  <span>AI Price Valuation ⭐</span>
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  RM
                </span>
                <input
                  type="number"
                  placeholder="25"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* AI Valuation Result Card */}
          {aiPriceResult && (
            <div className="bg-indigo-950/5 border border-indigo-200 rounded-xl p-4 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>AI Valuation Recommendation</span>
                </div>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                  {aiPriceResult.confidence}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
                  <span className="text-[10px] text-slate-500 block">Recommended Price</span>
                  <span className="text-base font-extrabold text-indigo-700">
                    RM {aiPriceResult.recommendedPrice}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
                  <span className="text-[10px] text-slate-500 block">Campus Market Avg</span>
                  <span className="text-base font-bold text-slate-800">
                    RM {aiPriceResult.marketAvg}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-snug">
                💡 <span className="font-semibold">Reasoning:</span> {aiPriceResult.reasoning}
              </p>

              <button
                type="button"
                onClick={() => setPrice(aiPriceResult.recommendedPrice.toString())}
                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer text-center"
              >
                Apply AI Recommended Price (RM {aiPriceResult.recommendedPrice})
              </button>
            </div>
          )}

          {/* Safe Campus Pickup Location Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Safe Campus Pickup Location</span>
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none cursor-pointer"
            >
              {pickupSpots.map((spot) => (
                <option key={spot.id} value={spot.name}>
                  {spot.name} ({spot.building})
                </option>
              ))}
            </select>
          </div>

          {/* Description & Smart Generator */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Description & Highlights
              </label>

              {/* AI Description Generator Button ⭐ */}
              <button
                type="button"
                onClick={handleAiGenerateDesc}
                disabled={isGeneratingDesc}
                className="text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isGeneratingDesc ? (
                  <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />
                ) : (
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                )}
                <span>Smart Description Generator ⭐</span>
              </button>
            </div>

            <textarea
              rows={3}
              placeholder="Provide key details, usage history, included items, or generate with AI..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* PRODUCT PHOTO UPLOAD FROM DEVICE */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Product Photo Upload</span>
              </span>
              <span className="text-[10px] font-bold text-indigo-600">
                Upload from Device or Select Preset
              </span>
            </label>

            {/* Prohibited Image Detected Notice */}
            {imageViolationReason && (
              <div className="bg-rose-50 border-2 border-rose-500 rounded-xl p-3.5 space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs">
                  <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>🚫 UPLOADED IMAGE BLOCKED — PROHIBITED ITEM DETECTED</span>
                </div>
                <p className="text-xs text-rose-900 font-semibold leading-relaxed">
                  {imageViolationReason}
                </p>
                <p className="text-[11px] text-rose-800">
                  This item photo cannot be sold or published into the platform under campus policy. Please remove or upload a permitted student item photo.
                </p>
              </div>
            )}

            {/* Upload Area */}
            <div className={`border-2 border-dashed p-4 rounded-xl text-center transition-all space-y-2 ${
              imageViolationReason
                ? 'border-rose-400 bg-rose-50/50'
                : 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50'
            }`}>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo from Device</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Drag & drop or select PNG, JPG, WEBP photo from your phone or computer (Max 5MB)
              </p>

              {/* Quick Simulation Trigger for Prohibited Image Test */}
              <div className="pt-2 border-t border-indigo-100 flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
                <span className="text-slate-500 font-bold">Simulate Image Scanning Test:</span>
                <button
                  type="button"
                  onClick={() => handleTestProhibitedImage('vape_pod_device.png', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=80')}
                  className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-md transition-colors cursor-pointer"
                >
                  🧪 Test Vape Image
                </button>
                <button
                  type="button"
                  onClick={() => handleTestProhibitedImage('tactical_knife_blade.jpg', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=80')}
                  className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-md transition-colors cursor-pointer"
                >
                  🧪 Test Knife Image
                </button>
                <button
                  type="button"
                  onClick={() => handleTestProhibitedImage('beer_bottle_liquor.png', 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&auto=format&fit=crop&q=80')}
                  className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-md transition-colors cursor-pointer"
                >
                  🧪 Test Alcohol Image
                </button>
              </div>
            </div>

            {/* Currently Selected / Device Uploaded Photo Preview */}
            <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${
              imageViolationReason
                ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <img
                src={imageUrl}
                alt="Selected"
                className={`w-14 h-14 rounded-lg object-cover ring-2 ${
                  imageViolationReason ? 'ring-rose-500' : 'ring-indigo-500/30'
                }`}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {isDeviceUploaded ? `📷 ${uploadedFileName || 'Custom Device Photo'}` : 'Preset Gallery Photo'}
                </span>
                <span className={`text-[10px] ${imageViolationReason ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                  {imageViolationReason ? '🚫 Image Flagged as Prohibited Item' : 'Ready to be displayed in Marketplace'}
                </span>
              </div>
              {isDeviceUploaded && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDeviceUploaded(false);
                    setImageUrl(PRESET_IMAGES[0].url);
                    setImageViolationReason(null);
                    setUploadedFileName('');
                  }}
                  className="text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg border border-rose-200 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Preset Options Gallery */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Or pick from Sample Presets:</span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setIsDeviceUploaded(false);
                      setImageViolationReason(null);
                      setUploadedFileName('');
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      imageUrl === preset.url && !isDeviceUploaded
                        ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    {imageUrl === preset.url && !isDeviceUploaded && (
                      <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!!activeViolationReason}
              className={`px-6 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                activeViolationReason
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{activeViolationReason ? 'Blocked (Prohibited Item)' : 'Publish Campus Listing'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

