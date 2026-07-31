import React, { useState } from 'react';
import { 
  Store, 
  Plus, 
  Star, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Heart,
  MessageSquare
} from 'lucide-react';
import { StudentStore, Product, User } from '../types';

interface StudentStoresViewProps {
  stores: StudentStore[];
  products: Product[];
  currentUser: User;
  onSelectProduct: (product: Product) => void;
  onStartChat: (product: Product) => void;
  onCreateStore: (storeName: string, category: string, description: string) => void;
}

export const StudentStoresView: React.FC<StudentStoresViewProps> = ({
  stores,
  products,
  currentUser,
  onSelectProduct,
  onStartChat,
  onCreateStore,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCategory, setNewStoreCategory] = useState('Food & Desserts');
  const [newStoreDesc, setNewStoreDesc] = useState('');
  const [followedStoreIds, setFollowedStoreIds] = useState<string[]>(['store_fresco']);

  const handleToggleFollow = (storeId: string) => {
    if (followedStoreIds.includes(storeId)) {
      setFollowedStoreIds(followedStoreIds.filter((id) => id !== storeId));
    } else {
      setFollowedStoreIds([...followedStoreIds, storeId]);
    }
  };

  const handleCreateStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName) return;
    onCreateStore(newStoreName, newStoreCategory, newStoreDesc);
    setShowCreateModal(false);
    setNewStoreName('');
    setNewStoreDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Store className="w-3.5 h-3.5" />
            <span>Commerce Digital Entrepreneurship Hub</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Business Mini Stores
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Polytechnic students run real mini enterprises for their Digital Entrepreneurship FYP assignments! Support handmade desserts, photography, printing, and design services.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all hover:scale-102 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Your Student Business</span>
        </button>
      </div>

      {/* Stores List Showcase */}
      <div className="space-y-6">
        {stores.map((store) => {
          const storeProducts = products.filter((p) => p.storeId === store.id || p.sellerId === store.ownerId);
          const isFollowing = followedStoreIds.includes(store.id);

          return (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
            >
              {/* Store Banner & Header */}
              <div className="relative h-36 bg-slate-800 overflow-hidden">
                <img
                  src={store.bannerUrl}
                  alt={store.storeName}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={store.logoUrl}
                      alt={store.storeName}
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
                    />
                    <div className="text-white">
                      <h2 className="text-lg font-bold leading-tight flex items-center gap-2">
                        <span>{store.storeName}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </h2>
                      <div className="text-xs text-slate-300 font-medium flex items-center gap-2 mt-0.5">
                        <span>{store.department.split('(')[0]}</span>
                        <span>•</span>
                        <span className="text-amber-300 font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {store.rating} Rating
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleFollow(store.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isFollowing
                        ? 'bg-white/20 text-white backdrop-blur-xs border border-white/30'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                    }`}
                  >
                    {isFollowing ? '✓ Following Store' : '+ Follow Store'}
                  </button>
                </div>
              </div>

              {/* Store Description & Stats Bar */}
              <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <p className="max-w-xl text-slate-700 font-medium">{store.description}</p>
                <div className="flex items-center gap-4 text-slate-500 font-semibold shrink-0">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {store.followers + (isFollowing ? 1 : 0)} Followers
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                    {storeProducts.length} Active Items
                  </span>
                </div>
              </div>

              {/* Store Products Grid */}
              <div className="p-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Store Product Catalog ({storeProducts.length})
                </h3>

                {storeProducts.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4">No products listed in this store yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {storeProducts.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct(item)}
                        className="bg-white p-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex gap-3 group"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-600">
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-0.5">
                              {item.condition}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-extrabold text-slate-900">
                              RM {item.price}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onStartChat(item);
                              }}
                              className="px-2 py-1 bg-emerald-600 text-white rounded-md text-[10px] font-bold hover:bg-emerald-700 cursor-pointer"
                            >
                              Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Store Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3 border-slate-100">
              <Store className="w-5 h-5 text-emerald-600" />
              <span>Open Digital Entrepreneurship Store</span>
            </h2>

            <form onSubmit={handleCreateStoreSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Store Name</label>
                <input
                  type="text"
                  placeholder="e.g. Fresco Tiramisu / PixeLab Canva Studio"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Store Category</label>
                <select
                  value={newStoreCategory}
                  onChange={(e) => setNewStoreCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  <option value="Food & Desserts">Food & Desserts</option>
                  <option value="Digital Templates & Design">Digital Templates & Design</option>
                  <option value="Printing & Services">Printing & Services</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Short Store Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your mini business..."
                  value={newStoreDesc}
                  onChange={(e) => setNewStoreDesc(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Launch Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
