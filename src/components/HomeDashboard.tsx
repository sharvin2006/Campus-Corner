import React, { useState, useMemo } from 'react';
import { 
  Product, 
  CategoryType, 
  ConditionType, 
  User, 
  PickupSpot 
} from '../types';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  Calculator as CalcIcon, 
  Coffee, 
  Laptop, 
  Tag, 
  Compass,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface HomeDashboardProps {
  products: Product[];
  currentUser: User;
  pickupSpots: PickupSpot[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: Product) => void;
  onStartChatWithSeller: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenSellModal: () => void;
}

const CATEGORIES: { name: CategoryType | 'All'; icon: string }[] = [
  { name: 'All', icon: '✨' },
  { name: 'Books', icon: '📚' },
  { name: 'Notes', icon: '📝' },
  { name: 'Stationery', icon: '✏️' },
  { name: 'Calculator', icon: '🧮' },
  { name: 'Laptop', icon: '💻' },
  { name: 'Student Businesses', icon: '🍰' },
  { name: 'Services', icon: '🎨' },
  { name: 'Food Voucher', icon: '🎟️' },
  { name: 'Phone', icon: '📱' },
  { name: 'Fashion', icon: '👕' },
];

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  products,
  currentUser,
  pickupSpots,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onStartChatWithSeller,
  onToggleWishlist,
  wishlistIds,
  onOpenSellModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedCondition, setSelectedCondition] = useState<ConditionType | 'All'>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);
  const [showOnlyVerifiedSellers, setShowOnlyVerifiedSellers] = useState<boolean>(false);
  const [selectedPickupSpot, setSelectedPickupSpot] = useState<string>('All');

  // Filtered listings
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sellerDepartment.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;

      // Condition
      const matchCondition = selectedCondition === 'All' || p.condition === selectedCondition;

      // Price
      const matchPrice = p.price <= maxPriceFilter;

      // Verified seller
      const matchVerified = !showOnlyVerifiedSellers || p.sellerVerified;

      // Pickup spot
      const matchPickup = selectedPickupSpot === 'All' || p.pickupLocation.includes(selectedPickupSpot);

      return matchSearch && matchCategory && matchCondition && matchPrice && matchVerified && matchPickup;
    });
  }, [products, searchQuery, selectedCategory, selectedCondition, maxPriceFilter, showOnlyVerifiedSellers, selectedPickupSpot]);

  // Recommended items based on Commerce student major
  const recommendedItems = useMemo(() => {
    return products.filter(p => 
      p.category === 'Books' || 
      p.category === 'Calculator' || 
      p.category === 'Notes' || 
      p.category === 'Student Businesses' ||
      p.isFeatured
    ).slice(0, 4);
  }, [products]);

  return (
    <div className="space-y-6">
      
      {/* 1. Shopee-Style Recommendation Banner for Student Major */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-md border border-indigo-900/50">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Smart Recommendation for {currentUser.department}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            Welcome back, {currentUser.name}! 👋
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Based on your <span className="text-indigo-300 font-semibold">{currentUser.course} (Semester {currentUser.semester})</span> curriculum, we recommend checking out Semester 2 Marketing Textbooks, Casio Calculators, and Fresh Student Business Specials.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('Marketing');
                setSelectedCategory('Books');
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Marketing Textbooks</span>
            </button>

            <button
              onClick={() => setSelectedCategory('Student Businesses')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-indigo-300" />
              <span>Explore Student FYP Businesses</span>
            </button>
          </div>
        </div>

        {/* Decorative background vectors */}
        <div className="absolute -right-8 -bottom-10 opacity-20 pointer-events-none hidden md:block">
          <CalcIcon className="w-64 h-64 text-indigo-400" />
        </div>
      </div>

      {/* 2. Category Pill Filter Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Browse Categories</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredProducts.length} items
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold scale-102'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filter Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            Filters:
          </span>

          {/* Condition Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['All', 'New', 'Like New', 'Used'] as const).map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  selectedCondition === cond
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <span className="text-slate-500">Max Price:</span>
            <span className="font-bold text-indigo-700">RM {maxPriceFilter}</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-24 accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Safe Pickup Spot Filter */}
          <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <select
              value={selectedPickupSpot}
              onChange={(e) => setSelectedPickupSpot(e.target.value)}
              className="bg-slate-100 text-slate-800 font-medium px-2 py-1 rounded-md focus:outline-none cursor-pointer"
            >
              <option value="All">All Pickup Points</option>
              {pickupSpots.map((spot) => (
                <option key={spot.id} value={spot.building}>
                  {spot.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Verified Sellers Toggle */}
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyVerifiedSellers}
            onChange={(e) => setShowOnlyVerifiedSellers(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Verified Students Only</span>
        </label>
      </div>

      {/* 4. Main Product Listings Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, price filter, or category selection. You can also publish your own listing!
          </p>
          <button
            onClick={onOpenSellModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            + Publish New Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isSaved = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Condition Badge */}
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs ${
                        product.condition === 'New'
                          ? 'bg-indigo-600 text-white'
                          : product.condition === 'Like New'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800/80 text-slate-100'
                      }`}
                    >
                      {product.condition}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-xs backdrop-blur-xs transition-transform active:scale-90 cursor-pointer"
                      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                        }`}
                      />
                    </button>

                    {/* Student Business Highlight */}
                    {product.category === 'Student Businesses' && (
                      <span className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                        🍰 FYP Mini Biz
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2.5">
                    
                    {/* Category & Department Tag */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <span className="truncate max-w-[120px]">{product.sellerDepartment.split('(')[0]}</span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
                    >
                      {product.title}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-extrabold text-slate-900">
                        RM {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          RM {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Safe Pickup Location Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate font-medium">{product.pickupLocation}</span>
                    </div>

                    {/* Seller Trust Profile Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.sellerAvatar}
                          alt={product.sellerName}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="text-[11px]">
                          <span className="font-bold text-slate-800 block leading-tight truncate max-w-[90px]">
                            {product.sellerName}
                          </span>
                          <span className="text-indigo-600 font-semibold text-[10px]">
                            {product.sellerTrustScore}% Trust Score
                          </span>
                        </div>
                      </div>

                      {product.sellerVerified && (
                        <span className="text-indigo-600" title="Verified Student">
                          <ShieldCheck className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0 gap-2 flex items-center">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onStartChatWithSeller(product)}
                    className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                    title="Chat with seller"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Safe Campus Meetup Points Banner */}
      <div className="bg-indigo-900/5 rounded-2xl p-6 border border-indigo-900/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Recommended Safe Campus Pickup Points</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Campus Corner recommends completing cash/item handovers strictly at designated CCTV-monitored campus spots.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pickupSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-2 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{spot.name}</span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  {spot.safetyScore}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{spot.description}</p>
              <div className="text-[10px] text-slate-400 font-medium">
                ⏱️ Busy hours: {spot.popularTimes}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
