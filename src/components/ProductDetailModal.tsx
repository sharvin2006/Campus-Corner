import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Heart, 
  Share2, 
  AlertTriangle, 
  Star, 
  Calendar, 
  Eye, 
  CheckCircle,
  Tag,
  DollarSign,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  MessageCircle,
  Send,
  Smartphone,
  Edit3,
  Lock,
  Unlock,
  CheckCircle2
} from 'lucide-react';
import { Product, User } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currentUser: User;
  onStartChat: (product: Product, initialOffer?: number) => void;
  onToggleWishlist: (productId: string) => void;
  isSaved: boolean;
  onReportScam: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currentUser,
  onStartChat,
  onToggleWishlist,
  isSaved,
  onReportScam,
}) => {
  if (!product) return null;

  const [customOffer, setCustomOffer] = useState<string>('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [reported, setReported] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [accessRole, setAccessRole] = useState<'viewer' | 'editor'>('viewer');
  const [copied, setCopied] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}/item/${product.id}${accessRole === 'editor' ? '?access=editor' : ''}`;
  const shareText = accessRole === 'editor'
    ? `✏️ [Editor Access Granted] Check out and edit "${product.title}" (RM ${product.price}) on PSAS Campus Corner!`
    : `🔥 Check out "${product.title}" for RM ${product.price} on PSAS Campus Corner! Pickup at ${product.pickupLocation}.`;

  const cardFormattedText = `🛍️ PSAS CAMPUS LISTING (${accessRole === 'editor' ? '✏️ EDITOR ACCESS' : '👁️ VIEWER ACCESS'})
📌 Item: ${product.title}
💰 Price: RM ${product.price}
✨ Condition: ${product.condition}
📁 Category: ${product.category}
🔑 Granted Access: ${accessRole === 'editor' ? 'Editor (Can Edit & Update)' : 'Viewer Only'}
📍 Handover Spot: ${product.pickupLocation}
👤 Seller: ${product.sellerName} (${product.sellerTrustScore}% Verified)
🔗 Link: ${shareUrl}`;

  const triggerToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    triggerToast('📋 Listing link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCardText = () => {
    navigator.clipboard.writeText(cardFormattedText);
    setCardCopied(true);
    triggerToast('✨ Social Card Summary copied to clipboard!');
    setTimeout(() => setCardCopied(false), 2000);
  };

  const handleSharePlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    let url = '';

    switch (platform) {
      case 'WhatsApp':
        url = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'Telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'Twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'Email':
        url = `mailto:?subject=${encodeURIComponent(`PSAS Campus Item: ${product.title}`)}&body=${encodedText}%20${encodedUrl}`;
        break;
      default:
        handleCopyLink();
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    triggerToast(`🚀 Shared via ${platform}!`);
  };

  const handleSendOffer = () => {
    const offerVal = Number(customOffer);
    if (!offerVal || offerVal <= 0) {
      alert('Please enter a valid offer price in RM.');
      return;
    }
    onStartChat(product, offerVal);
    onClose();
  };

  const handleReport = () => {
    onReportScam(product.id);
    setReported(true);
  };

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 relative">
        
        {/* Share Toast Banner */}
        {shareToast && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-60 bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <span>{shareToast}</span>
          </div>
        )}

        {/* Header bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-200/50">
              {product.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">Listed {product.createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button in Header */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 px-2.5 cursor-pointer"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Image & Badges */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 bg-slate-900/80 text-white backdrop-blur-xs rounded-full">
                Condition: {product.condition}
              </span>

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2.5 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer"
                  title="Share Item"
                >
                  <Share2 className="w-4 h-4 text-indigo-600" />
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2.5 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center justify-around bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{product.views} Views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>{product.messagesCount} Inquiries</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Valid to {product.availableUntil}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Price, Description, Seller & Actions */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              
              {/* Title */}
              <h1 className="text-xl font-bold text-slate-900 leading-snug">
                {product.title}
              </h1>

              {/* Price & Green Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    RM {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      Retail RM {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Green Marketplace Badge (🌱) */}
                {product.condition !== 'New' && (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                    🌱 Green Reused Item (SDG 12)
                  </span>
                )}
              </div>

              {/* Verified Badges Bar */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  ✅ Verified Student
                </span>
                <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  🏅 Trusted Seller ({product.sellerTrustScore}%)
                </span>
                <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  ⭐ Campus Ambassador
                </span>
              </div>

              {/* Safe Campus Pickup Spot */}
              <div className="bg-indigo-50/60 border border-indigo-200/80 p-3 rounded-xl flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Campus Pickup Point:
                  </span>
                  <span className="text-xs text-indigo-800 font-semibold">
                    {product.pickupLocation}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Safe CCTV-Monitored handover location
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Product Description
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* AI Smart Bundle Recommendation Box */}
              <div className="bg-gradient-to-r from-amber-50 to-indigo-50 border border-indigo-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span>AI Recommended Campus Bundle Deal (Save 15%)</span>
                  </div>
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                    -15% OFF
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Buy this item with <strong>{product.category === 'Books' ? 'Handwritten Exam Notes & Highlighters' : 'Casio Calculator & Printed Summary'}</strong> together for a total of <strong>RM {(product.price + 15).toFixed(2)}</strong>!
                </p>
                <button
                  onClick={() => alert(`🎉 Added bundle deal for ${product.title} to inquiry!`)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                >
                  Buy Bundle & Save 15%
                </button>
              </div>

              {/* Seller Trust Profile Box */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.sellerAvatar}
                    alt={product.sellerName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{product.sellerName}</span>
                      {product.sellerVerified && (
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {product.sellerDepartment.split('(')[0]}
                    </div>
                    <div className="text-[10px] text-indigo-700 font-bold flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.sellerTrustScore}% Trust Score</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
                    Verified Student
                  </span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              
              {/* Negotiation Input Toggle */}
              {showOfferInput ? (
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 block">
                    Make a Price Offer (RM)
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={`e.g. ${Math.round(product.price * 0.9)}`}
                      value={customOffer}
                      onChange={(e) => setCustomOffer(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-indigo-300 rounded-lg text-xs font-bold focus:outline-none"
                    />
                    <button
                      onClick={handleSendOffer}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Send Offer
                    </button>
                    <button
                      onClick={() => setShowOfferInput(false)}
                      className="px-3 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartChat(product)}
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat & Negotiate</span>
                </button>

                <button
                  onClick={() => setShowOfferInput(!showOfferInput)}
                  className="py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Make Offer</span>
                </button>

                {/* Main Share Action Button */}
                <button
                  onClick={() => setShowShareModal(true)}
                  className="py-3 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Share Listing with Friends"
                >
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              {/* Report Scam Action */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  onClick={handleReport}
                  disabled={reported}
                  className="text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{reported ? 'Report Submitted' : 'Report Suspected Scam'}</span>
                </button>

                <span className="text-slate-400 font-medium">Campus Corner Safe Trade</span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* SHARE MODAL DIALOG */}
      {showShareModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden space-y-4 p-5 animate-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Share & Grant Permission</h3>
                  <p className="text-[11px] text-slate-500">Choose access role and share with PSAS students</p>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Access Permission Level Selector (Viewer vs Editor) */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-xs font-extrabold text-slate-800 flex items-center justify-between">
                <span>Access Permission Role</span>
                {accessRole === 'editor' && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Edit3 className="w-3 h-3 text-amber-600" />
                    <span>Editor Option Active</span>
                  </span>
                )}
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccessRole('viewer')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                    accessRole === 'viewer'
                      ? 'bg-white border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Viewer Access</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500 text-left">
                    Read-only view & download access
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccessRole('editor')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                    accessRole === 'editor'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs ring-1 ring-amber-500'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Editor Access ✏️</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-600 text-left">
                    Can edit item, price & co-author after access granted
                  </span>
                </button>
              </div>

              {accessRole === 'editor' && (
                <div className="p-2 bg-amber-100/70 rounded-xl border border-amber-300 text-[11px] text-amber-900 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Granting Editor permission allows the link recipient to edit, update details, or collaborate on this listing after permission verification.
                  </span>
                </div>
              )}
            </div>

            {/* Visually Styled Social Copy Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-lg border border-indigo-500/30 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    PSAS Campus Deal
                  </span>
                  <span className="text-[10px] text-indigo-300 font-bold">• {product.category}</span>
                </div>
                <span className="text-[10px] text-slate-300 font-semibold">{product.condition}</span>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-16 h-16 rounded-xl object-cover border border-white/20 shrink-0 shadow-md"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-extrabold text-xs text-white leading-snug line-clamp-2">{product.title}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-amber-400">RM {product.price}</span>
                    <span className="text-[10px] text-indigo-200">📍 {product.pickupLocation}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 truncate">Seller: {product.sellerName} ({product.sellerTrustScore}% Trust)</p>
                </div>
              </div>

              {/* Copy Card Action Button */}
              <button
                onClick={handleCopyCardText}
                className={`w-full py-2 px-3 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  cardCopied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                {cardCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Card Text Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Social Post Card Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Copy Link Input Section */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Listing Link</label>
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-2 text-xs text-slate-700 font-mono focus:outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Social Media Platform Buttons */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700 block">Share to Social & Campus Apps</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                
                <button
                  onClick={() => handleSharePlatform('WhatsApp')}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => handleSharePlatform('Telegram')}
                  className="p-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-sky-600" />
                  <span>Telegram</span>
                </button>

                <button
                  onClick={() => handleSharePlatform('Twitter')}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-slate-600" />
                  <span>X / Twitter</span>
                </button>

                <button
                  onClick={() => handleSharePlatform('Email')}
                  className="p-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>Email Student</span>
                </button>

              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

