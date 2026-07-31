import React, { useState, useRef } from 'react';
import { 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  Award, 
  Star, 
  ShoppingBag, 
  Heart, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  Edit3,
  Camera,
  Save,
  Phone,
  Mail,
  GraduationCap,
  Building,
  Upload,
  Check
} from 'lucide-react';
import { User, Product, Review } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  products: Product[];
  wishlistProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onUpdateProfile?: (updatedUser: User) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  products,
  wishlistProducts,
  onSelectProduct,
  onUpdateProfile,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'sold' | 'wishlist' | 'reviews'>('sold');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editStudentId, setEditStudentId] = useState(user.studentId);
  const [editDepartment, setEditDepartment] = useState(user.department);
  const [editCourse, setEditCourse] = useState(user.course);
  const [editSemester, setEditSemester] = useState(user.semester);
  const [editPhone, setEditPhone] = useState(user.phone || '012-8849201');
  const [editBio, setEditBio] = useState(user.bio || 'Commerce student passionate about campus marketplace & digital marketing.');
  const [editAvatarUrl, setEditAvatarUrl] = useState(user.avatarUrl);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const myListedProducts = products.filter((p) => p.sellerId === user.id);

  // Handle Profile Picture Device Upload
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      ...user,
      name: editName,
      email: editEmail,
      studentId: editStudentId,
      department: editDepartment,
      course: editCourse,
      semester: Number(editSemester),
      phone: editPhone,
      bio: editBio,
      avatarUrl: editAvatarUrl,
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedUser);
    }

    setSaveSuccessMsg('Profile information updated successfully!');
    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsEditing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-800 via-slate-900 to-indigo-950 text-white p-6 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 text-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative group">
              <img
                src={isEditing ? editAvatarUrl : user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white/30 shadow-md"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 rounded-full flex flex-col items-center justify-center text-white text-[10px] font-bold opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer p-1 text-center"
                >
                  <Camera className="w-5 h-5 text-indigo-300 mb-0.5" />
                  <span>Upload Photo</span>
                </button>
              )}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <span className="bg-indigo-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Verified Student
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">{user.email}</p>
              <div className="text-[11px] text-indigo-200/90 flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                <span>Student ID: <strong>{user.studentId}</strong></span>
                <span>•</span>
                <span>{user.course} (Sem {user.semester})</span>
              </div>
              {user.bio && !isEditing && (
                <p className="text-xs text-slate-300 italic pt-1 max-w-md">
                  "{user.bio}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hidden File Input for Avatar Upload */}
        <input
          type="file"
          ref={avatarInputRef}
          onChange={handleAvatarFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-3 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* EDIT PROFILE FORM MODE */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            
            <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-indigo-600" />
                  <span>Profile Picture Upload from Device</span>
                </span>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Browse Device Photos</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <img
                  src={editAvatarUrl}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div className="text-xs text-slate-600">
                  <span className="font-bold block text-slate-800">Current Preview</span>
                  <span className="text-[11px] text-slate-500">Supports PNG, JPG, WEBP formats up to 5MB</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Student Name *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student ID / Matrix No. *</label>
                <input
                  type="text"
                  value={editStudentId}
                  onChange={(e) => setEditStudentId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Course / Diploma Program</label>
                <input
                  type="text"
                  value={editCourse}
                  onChange={(e) => setEditCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
                <select
                  value={editSemester}
                  onChange={(e) => setEditSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  {[1, 2, 3, 4, 5, 6].map((sem) => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Department</label>
              <input
                type="text"
                value={editDepartment}
                onChange={(e) => setEditDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Student Bio / Intro</label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Share a short bio with campus buyers and sellers..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>
        ) : (
          <>
            {/* Stats Summary Bar */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Trust Score</span>
                <span className="text-lg font-extrabold text-indigo-700 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 inline" />
                  {user.trustScore}%
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Total Sales</span>
                <span className="text-lg font-extrabold text-slate-900">{user.totalSales} Items</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Scam Status</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                  0 Reports (Safe)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-bold bg-white">
              <button
                onClick={() => setActiveTab('sold')}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'sold'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                My Listings ({myListedProducts.length})
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'wishlist'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Saved Wishlist ({wishlistProducts.length})
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Reviews ({user.reviewsReceived.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 max-h-[45vh] overflow-y-auto">
              {activeTab === 'sold' && (
                <div className="space-y-3">
                  {myListedProducts.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No items listed yet.</p>
                  ) : (
                    myListedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white transition-all cursor-pointer"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{p.title}</h4>
                          <span className="text-[10px] text-slate-500">
                            {p.category} • Listed {p.createdAt}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">RM {p.price}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-3">
                  {wishlistProducts.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">Your wishlist is empty.</p>
                  ) : (
                    wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white transition-all cursor-pointer"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{p.title}</h4>
                          <span className="text-[10px] text-indigo-700 font-semibold">{p.sellerName}</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">RM {p.price}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {user.reviewsReceived.map((rev) => (
                    <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-5 h-5 rounded-full object-cover" />
                          <span className="font-bold text-slate-900">{rev.reviewerName}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {'★'.repeat(rev.rating)}
                        </div>
                      </div>
                      <p className="text-slate-700 italic">"{rev.comment}"</p>
                      <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

