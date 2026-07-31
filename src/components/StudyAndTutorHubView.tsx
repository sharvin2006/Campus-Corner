import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Star, 
  Download, 
  MessageSquare, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  X,
  FileText,
  Edit3,
  Eye
} from 'lucide-react';
import { StudyServiceItem, User } from '../types';

interface StudyAndTutorHubViewProps {
  items: StudyServiceItem[];
  currentUser: User;
  onBookOrContact: (item: StudyServiceItem) => void;
}

export const StudyAndTutorHubView: React.FC<StudyAndTutorHubViewProps> = ({
  items,
  currentUser,
  onBookOrContact,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'note' | 'tutor' | 'skill'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<StudyServiceItem | null>(null);
  const [reqAccessRole, setReqAccessRole] = useState<'viewer' | 'editor'>('viewer');
  const [actionSuccess, setActionSuccess] = useState<boolean>(false);

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleConfirmAction = () => {
    if (!selectedItem) return;
    onBookOrContact(selectedItem);
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setSelectedItem(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-md border border-indigo-900/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic Excellence & Peer Support Hub</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>Study Notes, Peer Tutors & Skill Exchange ⭐</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Boost your GPA with top-performing student mindmaps, book 1-on-1 tutoring sessions with senior polytechnic students, or hire campus freelancers for Canva posters and video editing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-indigo-200 font-medium">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>100% Peer Verified Materials</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safe Student Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Accounting, Marketing notes, Math tutors, Canva design..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', label: 'All Offerings' },
            { id: 'note', label: '📚 Notes & Mindmaps' },
            { id: 'tutor', label: '🎓 1-on-1 Tutors' },
            { id: 'skill', label: '🤝 Skill Exchange' },
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

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Type Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    item.type === 'note'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
                      : item.type === 'tutor'
                      ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                  }`}
                >
                  {item.type === 'note'
                    ? '📚 Study Notes'
                    : item.type === 'tutor'
                    ? '🎓 Peer Tutor'
                    : '🤝 Skill Service'}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-400 font-normal text-[11px]">
                    ({item.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Title & Subject */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold text-indigo-600 mt-1">
                  Subject: {item.subject}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              {/* Author Badge */}
              <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                <img
                  src={item.authorAvatar}
                  alt={item.authorName}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate flex items-center gap-1">
                    <span>{item.authorName}</span>
                    {item.authorVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block truncate">
                    {item.department}
                  </span>
                </div>
              </div>

            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 block text-[10px]">Price</span>
                <span className="text-sm font-extrabold text-indigo-700">
                  RM {item.price} <span className="text-[10px] font-normal text-slate-500">{item.priceUnit}</span>
                </span>
              </div>

              <button
                onClick={() => setSelectedItem(item)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {item.type === 'note' ? (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Get Notes</span>
                  </>
                ) : item.type === 'tutor' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Book Tutor</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hire Skill</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Action Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {selectedItem.type === 'note'
                  ? 'Download Study Materials'
                  : selectedItem.type === 'tutor'
                  ? 'Book Tutoring Session'
                  : 'Hire Peer Freelancer'}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 text-base">Connected Successfully!</h4>
                <p className="text-xs text-slate-600">
                  You are now connected with {selectedItem.authorName}. Notification sent to your inbox.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200/80 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">{selectedItem.title}</h4>
                  <p className="text-xs text-slate-600">{selectedItem.description}</p>
                  <div className="pt-2 text-xs font-bold text-indigo-800 flex items-center justify-between">
                    <span>Provider: {selectedItem.authorName}</span>
                    <span className="text-sm font-extrabold">RM {selectedItem.price} {selectedItem.priceUnit}</span>
                  </div>
                </div>

                {/* Access Permission Level Selector (Viewer vs Editor Option) */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="text-xs font-extrabold text-slate-800 block">
                    Access Permission Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setReqAccessRole('viewer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                        reqAccessRole === 'viewer'
                          ? 'bg-white border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Viewer Access</span>
                      </div>
                      <span className="text-[10px] font-normal text-slate-500 text-left">
                        Read & download material
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setReqAccessRole('editor')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                        reqAccessRole === 'editor'
                          ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs ring-1 ring-amber-500'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Editor Access ✏️</span>
                      </div>
                      <span className="text-[10px] font-normal text-slate-600 text-left">
                        Can edit & co-author after permission granted
                      </span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {reqAccessRole === 'editor'
                    ? '✏️ Requesting Editor permission allows you to collaborate and edit content once granted.'
                    : 'Clicking below will initiate direct contact with the provider on Campus Corner and unlock access.'}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Confirm & Proceed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
