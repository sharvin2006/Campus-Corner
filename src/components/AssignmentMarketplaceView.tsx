import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  Star,
  Search,
  Filter,
  Wrench
} from 'lucide-react';
import { Product, User } from '../types';

interface AssignmentMarketplaceViewProps {
  products: Product[];
  currentUser: User;
  onSelectProduct: (product: Product) => void;
  onStartChat: (product: Product) => void;
}

const ACADEMIC_CATEGORIES = [
  'All',
  'Marketing',
  'Accounting',
  'Business',
  'Retailing',
  'Entrepreneurship',
  'Economics',
] as const;

export const AssignmentMarketplaceView: React.FC<AssignmentMarketplaceViewProps> = ({
  products,
  currentUser,
  onSelectProduct,
  onStartChat,
}) => {
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'templates' | 'services'>('templates');

  const assignmentTemplates = products.filter(
    (p) => p.category === 'Assignment Templates' || p.category === 'Notes'
  );

  const studentServices = products.filter((p) => p.category === 'Services');

  const displayedItems = activeTab === 'templates' ? assignmentTemplates : studentServices;

  const filteredItems = displayedItems.filter((item) => {
    if (selectedSubCat === 'All') return true;
    return item.templateCategory === selectedSubCat || item.description.includes(selectedSubCat);
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-800 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
          <FileText className="w-3.5 h-3.5" />
          <span>Commerce Academic & Design Marketplace</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Assignment Templates & Student Services
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Legal original student work! Download Canva presentation decks, Business Model Canvas (BMC) slides, Accounting Excel templates, and hire student freelancers for logo design, printing, and resume formatting.
        </p>

        {/* Tab Switcher */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            📂 Canva & Slide Templates ({assignmentTemplates.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            🛠️ Freelance Services ({studentServices.length})
          </button>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {ACADEMIC_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedSubCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubCat === cat
                ? 'bg-cyan-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-cyan-950/80 text-cyan-200 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                  {item.fileType || item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded flex items-center gap-1">
                    {item.templateCategory || 'General Academic'}
                  </span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px] flex items-center gap-1">
                    ✏️ Editor Access
                  </span>
                </div>

                <h3
                  onClick={() => onSelectProduct(item)}
                  className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-cyan-600 cursor-pointer"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900">
                    RM {item.price}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    By <strong className="text-slate-800">{item.sellerName}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex gap-2">
              <button
                onClick={() => onSelectProduct(item)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer text-center"
              >
                Preview & Details
              </button>
              <button
                onClick={() => onStartChat(item)}
                className="py-2 px-3 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
