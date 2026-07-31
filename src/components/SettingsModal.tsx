import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Store, 
  Globe, 
  MapPin, 
  Check, 
  Lock, 
  Volume2, 
  VolumeX, 
  Phone, 
  MessageSquare, 
  QrCode, 
  Sparkles, 
  Trash2, 
  Download, 
  Smartphone, 
  Moon, 
  Sun, 
  Laptop,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Building,
  Edit3,
  Eye,
  Palette,
  Image as ImageIcon,
  ShoppingBag
} from 'lucide-react';
import { AppSettings, User } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (newSettings: AppSettings) => void;
  user: User;
}

const MALAYSIAN_CAMPUSES = [
  'Politeknik Sultan Azlan Shah (PSAS Behrang)',
  'Politeknik Ungku Omar (PUO Ipoh)',
  'Politeknik Tuanku Sultanah Bahiyah (PTSB Kulim)',
  'Politeknik Seberang Perai (PSP)',
  'Politeknik Sultan Abdul Halim Mu\'adzam Shah (POLIMAS)',
  'Universiti Teknologi MARA (UiTM Tapah Campus)',
  'Universiti Pendidikan Sultan Idris (UPSI Tanjong Malim)',
  'Universiti Kebangsaan Malaysia (UKM)',
  'Universiti Putra Malaysia (UPM)',
  'Universiti Malaya (UM)'
];

const PSAS_PICKUP_LOCATIONS = [
  'PSAS Main Library Lobby',
  'Student Centre Pavilion',
  'Cafeteria Block B (Jabatan Perdagangan)',
  'KAMSIS Student Hostel Gate',
  'Politeknik Sports Complex',
  'DKM Engineering Workshop',
  'Administration Hall Foyer'
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  user,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'branding' | 'campus' | 'notifications' | 'privacy' | 'payments' | 'store' | 'system'>('branding');
  
  // Local state initialized with current props
  const [formSettings, setFormSettings] = useState<AppSettings>({ ...settings });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggle = (key: keyof AppSettings) => {
    setFormSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: keyof AppSettings, value: any) => {
    setFormSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    triggerToast('✅ Settings updated and saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default campus settings?')) {
      const resetDefaults: AppSettings = {
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
      setFormSettings(resetDefaults);
      onSaveSettings(resetDefaults);
      triggerToast('🔄 Settings reset to factory defaults.');
    }
  };

  const handleClearHistory = () => {
    triggerToast('🧹 Local search history & image cache cleared!');
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `psas_campus_corner_${user.studentId}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('📥 Student account data exported to JSON!');
  };

  return (
    <div id="app-settings-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]">
        
        {/* Floating Success Toast */}
        {toastMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-2xl border border-indigo-500 flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-600/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">App Settings & Preferences</h2>
                <span className="bg-indigo-100 text-indigo-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  PSAS Student Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Configure notifications, e-wallet details, campus preferences & privacy controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Dark Mode Toggle Button in Modal Header */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80">
              <button
                type="button"
                onClick={() => handleChange('themeMode', 'light')}
                title="Light Theme"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  formSettings.themeMode === 'light'
                    ? 'bg-white text-amber-600 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleChange('themeMode', 'dark')}
                title="Dark Mode"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  formSettings.themeMode === 'dark'
                    ? 'bg-slate-900 text-indigo-400 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleChange('themeMode', 'system')}
                title="System Auto Mode"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  formSettings.themeMode === 'system'
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Laptop className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Sidebar Tabs */}
        <div className="flex-1 overflow-y-auto flex flex-col sm:flex-row min-h-0">
          
          {/* Tabs Navigation Sidebar */}
          <div className="w-full sm:w-56 bg-slate-50 border-r border-slate-100 p-3 flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-x-visible shrink-0 no-scrollbar">
            
            <button
              onClick={() => setActiveTab('branding')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'branding'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0 text-amber-300" />
              <span>App Branding & Logo</span>
            </button>

            <button
              onClick={() => setActiveTab('campus')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'campus'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Building className="w-4 h-4 shrink-0" />
              <span>Campus & Handover</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'notifications'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Notifications & Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'privacy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Privacy & Security</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'payments'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>E-Wallet & Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'store'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Store className="w-4 h-4 shrink-0" />
              <span>Student Store & Auto-Reply</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                activeTab === 'system'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>Display & Data</span>
            </button>

          </div>

          {/* Active Tab Content Area */}
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            
            {/* TAB 0: APP BRANDING, LOGO & DESCRIPTION */}
            {activeTab === 'branding' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>App Branding, Logo & Description</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize the app name, tagline, logo emblem, and description across the platform in real time.
                  </p>
                </div>

                {/* Live Header Preview Card */}
                <div className="p-4 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl border border-indigo-500/30 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-[11px] font-bold text-indigo-200 border-b border-white/10 pb-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>LIVE NAVBAR HEADER PREVIEW</span>
                    </span>
                    <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[10px]">
                      Real-Time Badge
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    {formSettings.appLogoType === 'image' && formSettings.appLogoUrl ? (
                      <img
                        src={formSettings.appLogoUrl}
                        alt="App Logo"
                        className="w-11 h-11 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
                      />
                    ) : formSettings.appLogoType === 'emoji' ? (
                      <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-md border border-indigo-400/40">
                        <span>{formSettings.appLogoEmoji || '🛍️'}</span>
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md border border-indigo-400/40">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}

                    <div>
                      <span className="text-lg font-black text-white tracking-tight block leading-tight">
                        {formSettings.appName || 'Campus Corner'}
                      </span>
                      <span className="text-xs text-indigo-200 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 inline shrink-0" />
                        <span>{formSettings.appTagline || 'Verified Student Marketplace'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preset Quick Branding Themes */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>1-Click Preset Branding Themes</span>
                    <span className="text-[10px] text-slate-500">Quick Config</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormSettings(prev => ({
                        ...prev,
                        appName: 'Campus Corner',
                        appTagline: 'Verified Student Marketplace',
                        appDescription: 'Polytechnic Campus Marketplace, Commerce Student Business Hub, AI Price Estimator, Campaign Analytics, and Marketing Learning Hub.',
                        appLogoType: 'icon',
                        appLogoEmoji: '🛍️'
                      }))}
                      className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🛍️</span>
                        <span>Campus Corner</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">Verified Student Marketplace</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormSettings(prev => ({
                        ...prev,
                        appName: 'PSAS Commerce Hub',
                        appTagline: 'FYP & Student Business Portal',
                        appDescription: 'Commerce Department Student FYP Micro-Store Marketplace and Campaign Management Portal.',
                        appLogoType: 'emoji',
                        appLogoEmoji: '💼'
                      }))}
                      className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>💼</span>
                        <span>PSAS Commerce Hub</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">FYP & Student Business Portal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormSettings(prev => ({
                        ...prev,
                        appName: 'PolyMarket Student',
                        appTagline: 'Safe Campus Trade & Tutor Hub',
                        appDescription: 'Peer-to-peer polytechnic marketplace for secondhand textbooks, calculators, assignment templates and tutoring.',
                        appLogoType: 'emoji',
                        appLogoEmoji: '🎓'
                      }))}
                      className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🎓</span>
                        <span>PolyMarket Student</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">Safe Campus Trade & Tutor Hub</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormSettings(prev => ({
                        ...prev,
                        appName: 'Student Express Biz',
                        appTagline: 'Fast Handover & Daily Deals',
                        appDescription: 'Instant student-to-student commerce, food delivery pre-orders and part-time jobs.',
                        appLogoType: 'emoji',
                        appLogoEmoji: '🚀'
                      }))}
                      className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🚀</span>
                        <span>Student Express Biz</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">Fast Handover & Daily Deals</span>
                    </button>
                  </div>
                </div>

                {/* Form Inputs: App Name, App Tagline, App Description */}
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      App Name
                    </label>
                    <input
                      type="text"
                      value={formSettings.appName}
                      onChange={(e) => handleChange('appName', e.target.value)}
                      placeholder="e.g. Campus Corner"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      App Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formSettings.appTagline}
                      onChange={(e) => handleChange('appTagline', e.target.value)}
                      placeholder="e.g. Verified Student Marketplace"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      App Description
                    </label>
                    <textarea
                      rows={3}
                      value={formSettings.appDescription}
                      onChange={(e) => handleChange('appDescription', e.target.value)}
                      placeholder="Describe what your campus platform offers..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                    />
                  </div>

                  {/* Logo Type Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      App Logo Style & Emblem
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleChange('appLogoType', 'icon')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formSettings.appLogoType === 'icon'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4 text-indigo-600" />
                        <span>Vector Icon</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChange('appLogoType', 'emoji')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formSettings.appLogoType === 'emoji'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-base">{formSettings.appLogoEmoji || '🛍️'}</span>
                        <span>Emoji Emblem</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChange('appLogoType', 'image')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formSettings.appLogoType === 'image'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 text-indigo-600" />
                        <span>Custom Image</span>
                      </button>
                    </div>
                  </div>

                  {/* If Emoji Logo Selected */}
                  {formSettings.appLogoType === 'emoji' && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Select Emoji Logo
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['🛍️', '💼', '🎓', '🚀', '📚', '🛒', '🏫', '🎒', '🏪', '💡', '⚡', '🌟', '🏆', '🔥'].map((emo) => (
                          <button
                            key={emo}
                            type="button"
                            onClick={() => handleChange('appLogoEmoji', emo)}
                            className={`w-9 h-9 rounded-xl border text-lg flex items-center justify-center transition-all cursor-pointer ${
                              formSettings.appLogoEmoji === emo
                                ? 'bg-indigo-600 text-white border-indigo-600 scale-110 shadow-md'
                                : 'bg-white border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {emo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* If Image Logo Selected */}
                  {formSettings.appLogoType === 'image' && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Custom Logo Image URL
                      </label>
                      <input
                        type="url"
                        value={formSettings.appLogoUrl}
                        onChange={(e) => handleChange('appLogoUrl', e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <p className="text-[10px] text-slate-500">
                        Enter a valid image URL for your app logo (PNG, JPG, SVG or WebP).
                      </p>
                    </div>
                  )}

                  {/* Appearance Theme Mode Selector */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">Global Appearance Theme</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'light', label: 'Light Theme', icon: <Sun className="w-4 h-4 text-amber-500" /> },
                        { id: 'dark', label: 'Dark Mode 🌙', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
                        { id: 'system', label: 'System Auto', icon: <Laptop className="w-4 h-4 text-slate-500" /> }
                      ].map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => handleChange('themeMode', t.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formSettings.themeMode === t.id
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-500 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {t.icon}
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: CAMPUS & HANDOVER */}
            {activeTab === 'campus' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Campus Location & Handover Defaults</h3>
                  <p className="text-xs text-slate-500">Set your primary polytechnic institution and preferred safe meet-up spots.</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Primary Institution / Campus</label>
                    <select
                      value={formSettings.primaryCampus}
                      onChange={(e) => handleChange('primaryCampus', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {MALAYSIAN_CAMPUSES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Default Safe Handover Spot</label>
                    <select
                      value={formSettings.defaultPickupSpot}
                      onChange={(e) => handleChange('defaultPickupSpot', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {PSAS_PICKUP_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500">
                      🛡️ All listed locations are covered by PSAS campus security surveillance.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-slate-700 block">Preferred Buyer Contact Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp', icon: <Phone className="w-3.5 h-3.5 text-emerald-600" /> },
                        { id: 'chat', label: 'In-App Chat', icon: <MessageSquare className="w-3.5 h-3.5 text-indigo-600" /> },
                        { id: 'email', label: 'Campus Email', icon: <Globe className="w-3.5 h-3.5 text-blue-600" /> }
                      ].map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => handleChange('preferredContactMethod', m.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formSettings.preferredContactMethod === m.id
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {m.icon}
                          <span>{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NOTIFICATIONS & ALERTS */}
            {activeTab === 'notifications' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Notification & Alert Preferences</h3>
                  <p className="text-xs text-slate-500">Control how and when you receive buyer offers, chat alerts, and job updates.</p>
                </div>

                <div className="space-y-3 divide-y divide-slate-100 pt-1">
                  
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">New Buyer Chat & Offer Messages</h4>
                      <p className="text-[11px] text-slate-500">Instant push notification when someone makes an offer or sends a message.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('notifyNewMessages')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.notifyNewMessages ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.notifyNewMessages ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Price Drop Alerts on Wishlist</h4>
                      <p className="text-[11px] text-slate-500">Notify me when a textbook or item in my saved wishlist drops in price.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('notifyPriceDrops')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.notifyPriceDrops ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.notifyPriceDrops ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Part-Time Jobs & Tutoring Alerts</h4>
                      <p className="text-[11px] text-slate-500">Get notified when new student gig opportunities match your department.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('notifyJobAlerts')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.notifyJobAlerts ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.notifyJobAlerts ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">In-App Chat Notification Sounds</h4>
                      <p className="text-[11px] text-slate-500">Play subtle chime audio when new buyer messages arrive.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('notifySoundEnabled')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.notifySoundEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.notifySoundEnabled ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">SMS / WhatsApp Order Updates</h4>
                      <p className="text-[11px] text-slate-500">Receive SMS order status receipts for verified e-wallet purchases.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('notifySmsStatus')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.notifySmsStatus ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.notifySmsStatus ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: PRIVACY & SECURITY */}
            {activeTab === 'privacy' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Privacy & Campus Safety Settings</h3>
                  <p className="text-xs text-slate-500">Manage data visibility, anti-scam AI filtering, and student verification locks.</p>
                </div>

                <div className="space-y-3 divide-y divide-slate-100 pt-1">
                  
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Display Phone Number on Listings</h4>
                      <p className="text-[11px] text-slate-500">Allow buyers to see your phone number on item cards for direct WhatsApp.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('showPhonePublicly')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.showPhonePublicly ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.showPhonePublicly ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Show Matric ID to Verified Students Only</h4>
                      <p className="text-[11px] text-slate-500">Hide your student matric number from unauthenticated guest users.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('showMatricToVerifiedOnly')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.showMatricToVerifiedOnly ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.showMatricToVerifiedOnly ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                        <span>Strict AI Scam & Prohibited Item Filter</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Enforce automatic AI image analysis against stock photos & banned items (Code 5.1).</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('strictScamFilter')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.strictScamFilter ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.strictScamFilter ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Two-Factor Auth (2FA via Polytechnic Portal)</h4>
                      <p className="text-[11px] text-slate-500">Require student portal SMS OTP verification before high-value transactions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('enable2FA')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.enable2FA ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.enable2FA ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  {/* Access Grant & Editor Option Preferences */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-amber-600 inline" />
                        <span>Shared Access Permission & Editor Options</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Configure default permissions when granting or sharing access to campus listings and templates.</p>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Allow Editor Permission Option</span>
                          <span className="text-[10px] text-slate-500">Enable Editor access mode so grantees can edit details after permission is granted.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggle('allowEditorPermissions')}
                          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                            formSettings.allowEditorPermissions ? 'bg-amber-500' : 'bg-slate-300'
                          }`}
                        >
                          <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                            formSettings.allowEditorPermissions ? 'right-1' : 'left-1'
                          }`} />
                        </button>
                      </div>

                      <div className="pt-2 space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 block">Default Shared Access Role</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleChange('defaultAccessRole', 'viewer')}
                            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              formSettings.defaultAccessRole === 'viewer'
                                ? 'bg-white border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Viewer Default</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleChange('defaultAccessRole', 'editor')}
                            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              formSettings.defaultAccessRole === 'editor'
                                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs ring-1 ring-amber-500'
                                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Editor Default ✏️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: E-WALLET & PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Digital Payment & E-Wallet Defaults</h3>
                  <p className="text-xs text-slate-500">Set up instant QR payment details for smooth peer-to-peer campus trades.</p>
                </div>

                <div className="space-y-3 pt-1">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Default Payment Provider</label>
                    <select
                      value={formSettings.defaultEWalletProvider}
                      onChange={(e) => handleChange('defaultEWalletProvider', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="DuitNow">DuitNow QR (All Banks & E-Wallets)</option>
                      <option value="Touch n Go">Touch 'n Go eWallet</option>
                      <option value="MAE Maybank">Maybank MAE QR</option>
                      <option value="GrabPay">GrabPay Wallet</option>
                      <option value="Cash on Pickup">Cash on Hand (Campus Handover)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">DuitNow / TNG Registered Phone</label>
                      <input
                        type="text"
                        value={formSettings.duitNowNumber}
                        onChange={(e) => handleChange('duitNowNumber', e.target.value)}
                        placeholder="e.g. 012-8849201"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Bank Name</label>
                      <input
                        type="text"
                        value={formSettings.bankName}
                        onChange={(e) => handleChange('bankName', e.target.value)}
                        placeholder="e.g. Maybank Islamic / CIMB"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Bank Account Recipient Name</label>
                      <input
                        type="text"
                        value={formSettings.bankAccountName}
                        onChange={(e) => handleChange('bankAccountName', e.target.value)}
                        placeholder="Full registered name"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Bank Account Number</label>
                      <input
                        type="text"
                        value={formSettings.bankAccountNumber}
                        onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                        placeholder="e.g. 158024910284"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2 text-xs text-amber-900 mt-2">
                    <QrCode className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block">Instant In-Chat QR Payments</strong>
                      <span>These details will automatically generate one-click QR payment cards inside the buyer chat system.</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: STUDENT STORE & AUTO-REPLY */}
            {activeTab === 'store' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Student Store & Auto-Responder Settings</h3>
                  <p className="text-xs text-slate-500">Configure your student business storefront, badge displays, and automated messages.</p>
                </div>

                <div className="space-y-3 pt-1">
                  
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Student Store Front Public Visibility</h4>
                      <p className="text-[11px] text-slate-500">Show your mini store in the Student Stores directory.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('storeVisibility')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.storeVisibility ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.storeVisibility ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Display FYP / Commerce Department Badge</h4>
                      <p className="text-[11px] text-slate-500">Show official Polytechnic Entrepreneurship badge on your store card.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('showCommerceBadge')}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        formSettings.showCommerceBadge ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        formSettings.showCommerceBadge ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 block">Automated Chat Welcome Responder</label>
                      <button
                        type="button"
                        onClick={() => handleToggle('autoReplyEnabled')}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                          formSettings.autoReplyEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                          formSettings.autoReplyEnabled ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    {formSettings.autoReplyEnabled && (
                      <textarea
                        rows={3}
                        value={formSettings.autoReplyMessage}
                        onChange={(e) => handleChange('autoReplyMessage', e.target.value)}
                        placeholder="Enter automated greeting for new buyers..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 6: DISPLAY, LANGUAGE & DATA */}
            {activeTab === 'system' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">App Display, Language & Data Management</h3>
                  <p className="text-xs text-slate-500">Language localization, theme modes, cache management, and data exports.</p>
                </div>

                <div className="space-y-4 pt-1">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">App Interface Language</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['English', 'Bahasa Melayu', 'Mandarin', 'Tamil'].map((lang) => (
                        <button
                          type="button"
                          key={lang}
                          onClick={() => handleChange('language', lang)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            formSettings.language === lang
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Appearance Theme Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'light', label: 'Light Theme', icon: <Sun className="w-4 h-4 text-amber-500" /> },
                        { id: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
                        { id: 'system', label: 'System Auto', icon: <Laptop className="w-4 h-4 text-slate-500" /> }
                      ].map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => handleChange('themeMode', t.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formSettings.themeMode === t.id
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-500'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {t.icon}
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">Local Storage & Account Data Tools</label>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleClearHistory}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Clear Cache & Search History</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleExportData}
                        className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Export My Student Profile (JSON)</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center gap-1.5 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all active:scale-98 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
