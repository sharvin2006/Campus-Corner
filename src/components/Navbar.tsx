import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Search, 
  Plus, 
  Bell, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  User as UserIcon,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Repeat,
  Compass,
  Settings
} from 'lucide-react';
import { User, NotificationItem, ChatConversation, AppSettings } from '../types';

interface NavbarProps {
  user: User;
  settings?: AppSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSellModal: () => void;
  unreadNotifsCount: number;
  unreadChatCount: number;
  wishlistCount: number;
  onOpenNotifications: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  settings,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenSellModal,
  unreadNotifsCount,
  unreadChatCount,
  wishlistCount,
  onOpenNotifications,
  onOpenChat,
  onOpenProfile,
  onOpenSettings,
}) => {
  const currentAppName = settings?.appName || 'Campus Corner';
  const currentTagline = settings?.appTagline || 'Verified Student Marketplace';

  const renderLogo = () => {
    if (settings?.appLogoType === 'image' && settings.appLogoUrl) {
      return (
        <img
          src={settings.appLogoUrl}
          alt={currentAppName}
          className="w-10 h-10 rounded-xl object-cover shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform border border-slate-200"
        />
      );
    }
    if (settings?.appLogoType === 'emoji') {
      return (
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
          <span>{settings.appLogoEmoji || '🛍️'}</span>
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
        <ShoppingBag className="w-5 h-5" />
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: Campus Announcement */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-indigo-900/50">
        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Polytechnic Verified
        </span>
        <span>Welcome to {currentAppName} • PSAS Commerce Dept FYP Marketplace & Entrepreneurship Hub</span>
        <span className="hidden sm:inline-block text-indigo-200 font-semibold">• Safe Campus Pickup Guarantee</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Campus Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('marketplace')} 
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              {renderLogo()}
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors block leading-none">
                  {currentAppName}
                </span>
                <span className="text-[11px] font-medium text-indigo-600 flex items-center gap-1 mt-0.5 truncate max-w-[190px] sm:max-w-xs">
                  <ShieldCheck className="w-3 h-3 text-indigo-600 inline shrink-0" />
                  <span className="truncate">{currentTagline}</span>
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search calculators, books, notes, tiramisu, Canva templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/90 border border-slate-200/80 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Navigation Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Sell Button */}
            <button
              onClick={onOpenSellModal}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:shadow-indigo-600/25 active:scale-98 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Sell Item / Service</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Chat Icon */}
            <button
              onClick={onOpenChat}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Campus Chat"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadChatCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* Notifications Icon */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('marketplace')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Profile Badge */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-colors cursor-pointer ml-1"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>{user.name.split(' ')[0]}</span>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/60 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                    {user.trustScore}% Trust
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate max-w-[100px]">
                  {user.studentId}
                </div>
              </div>
            </button>

            {/* App Settings Icon Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 rounded-xl transition-colors cursor-pointer"
              title="App Settings & Preferences"
            >
              <Settings className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculators, books, notes, tiramisu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          
          <button
            onClick={() => setActiveTab('super_app')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'super_app'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm font-black'
                : 'bg-indigo-50/80 text-indigo-900 border border-indigo-200/80 hover:bg-indigo-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Super App Hub ⭐</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded-full font-black">
              30 Features
            </span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'marketplace'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Part-Time Job Hub</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              SDG 8 ⭐
            </span>
          </button>

          <button
            onClick={() => setActiveTab('study_tutor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'study_tutor'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Notes & Tutor Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'community'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Repeat className="w-4 h-4 text-rose-500" />
            <span>Borrow, Lost & Carpool</span>
          </button>

          <button
            onClick={() => setActiveTab('stores')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'stores'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Store className="w-4 h-4 text-indigo-600" />
            <span>Student Stores</span>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              FYP Mini Biz
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Campaign Analytics ⭐</span>
          </button>

          <button
            onClick={() => setActiveTab('learning')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'learning'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Marketing Learning</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Strategic Vision 🚀</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              20 Recs
            </span>
          </button>

        </nav>
      </div>
    </header>
  );
};
