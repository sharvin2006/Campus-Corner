import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  HelpCircle, 
  Repeat, 
  MapPin, 
  Phone, 
  Plus, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Clock, 
  Users,
  AlertCircle
} from 'lucide-react';
import { CampusUtilityPost, User } from '../types';

interface CampusCommunityHubViewProps {
  utilities: CampusUtilityPost[];
  currentUser: User;
  onPostUtility: (newUtil: CampusUtilityPost) => void;
  onContactUser: (post: CampusUtilityPost) => void;
}

export const CampusCommunityHubView: React.FC<CampusCommunityHubViewProps> = ({
  utilities,
  currentUser,
  onPostUtility,
  onContactUser,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'borrow' | 'lost_found' | 'carpool'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // New Post Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postCategory, setPostCategory] = useState<'borrow' | 'lost_found' | 'carpool'>('borrow');
  const [postTitle, setPostTitle] = useState('');
  const [postLocation, setPostLocation] = useState('PSAS Main Library');
  const [postPriceDetail, setPostPriceDetail] = useState('RM 3 / day');
  const [postDescription, setPostDescription] = useState('');
  const [postContactInfo, setPostContactInfo] = useState('');

  const [selectedPost, setSelectedPost] = useState<CampusUtilityPost | null>(null);
  const [contactedSuccess, setContactedSuccess] = useState<boolean>(false);

  const filteredPosts = utilities.filter((post) => {
    const matchesTab = activeTab === 'All' || post.category === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle) return;

    const newPost: CampusUtilityPost = {
      id: `util_${Date.now()}`,
      category: postCategory,
      title: postTitle,
      status: postCategory === 'lost_found' ? 'lost' : 'available',
      creatorName: currentUser.name,
      creatorAvatar: currentUser.avatarUrl,
      creatorPhone: currentUser.phone || '012-8849201',
      creatorVerified: true,
      location: postLocation,
      date: 'Just now',
      priceDetail: postPriceDetail,
      description: postDescription || 'Campus community post by PSAS student.',
      contactInfo: postContactInfo || `WhatsApp ${currentUser.phone || '012-8849201'}`,
    };

    onPostUtility(newPost);
    setIsModalOpen(false);
    setPostTitle('');
    setPostDescription('');
  };

  const handleContactConfirm = () => {
    if (!selectedPost) return;
    onContactUser(selectedPost);
    setContactedSuccess(true);
    setTimeout(() => {
      setContactedSuccess(false);
      setSelectedPost(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-md border border-indigo-900/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>One-Stop Campus Utility & Student Safety Hub</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Repeat className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>Borrow & Rent, Lost & Found, Carpool Share ⭐</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Solve everyday campus needs: Rent calculators/lab coats for exams, report or claim lost student ID cards, and organize safe carpool rides from PSAS to Tanjong Malim KTM or Ipoh.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Request / Ride / Lost Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search calculators, lab coats, lost student cards, Tanjong Malim carpool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', label: 'All Community Posts' },
            { id: 'borrow', label: '📦 Borrow & Rent' },
            { id: 'lost_found', label: '🔍 Lost & Found' },
            { id: 'carpool', label: '🚗 Carpool Share' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    post.category === 'borrow'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
                      : post.category === 'lost_found'
                      ? post.status === 'found'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                        : 'bg-rose-50 text-rose-800 border-rose-200/80'
                      : 'bg-amber-50 text-amber-800 border-amber-200/80'
                  }`}
                >
                  {post.category === 'borrow'
                    ? '📦 Rent & Borrow'
                    : post.category === 'lost_found'
                    ? post.status === 'found'
                      ? '🔍 FOUND ITEM'
                      : '⚠️ LOST ITEM'
                    : '🚗 CARPOOL RIDE'}
                </span>

                <span className="text-[10px] text-slate-400 font-medium">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {post.title}
              </h3>

              {/* Location & Details */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{post.location}</span>
                </div>
                {post.priceDetail && (
                  <div className="flex items-center gap-1.5 font-bold text-indigo-700">
                    <Repeat className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{post.priceDetail}</span>
                  </div>
                )}
                {post.seatsAvailable && (
                  <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                    <Car className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Seats Available: {post.seatsAvailable}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              {/* Creator Info */}
              <div className="flex items-center gap-2 pt-1">
                <img
                  src={post.creatorAvatar}
                  alt={post.creatorName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="text-xs font-semibold text-slate-800 truncate flex items-center gap-1">
                  <span>{post.creatorName}</span>
                  {post.creatorVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  )}
                </div>
              </div>

            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {post.contactInfo}
              </span>

              <button
                onClick={() => setSelectedPost(post)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact / Claim</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Contact/Claim */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Contact Student</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 text-base">Inquiry Sent!</h4>
                <p className="text-xs text-slate-600">
                  Notification and chat invite sent to {selectedPost.creatorName}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">{selectedPost.title}</div>
                  <div className="text-indigo-700 font-semibold">{selectedPost.contactInfo}</div>
                  <div className="text-slate-500 text-[11px]">Posted by {selectedPost.creatorName} at {selectedPost.location}</div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContactConfirm}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Send Campus Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Post */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Create Campus Community Post</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Post Type</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="borrow">📦 Rent / Borrow Item (Calculator, Lab coat)</option>
                  <option value="lost_found">🔍 Lost & Found Item</option>
                  <option value="carpool">🚗 Carpool / Ride Share</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Casio Calculator Rental / Lost Student ID / Ride to Tanjong Malim"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Location on Campus</label>
                  <input
                    type="text"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Price / Terms</label>
                  <input
                    type="text"
                    value={postPriceDetail}
                    onChange={(e) => setPostPriceDetail(e.target.value)}
                    placeholder="e.g. RM 3 / day or Free"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Provide details, dates, or reward info..."
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
