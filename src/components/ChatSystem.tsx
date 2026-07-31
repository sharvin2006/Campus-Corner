import React, { useState, useRef } from 'react';
import { 
  Send, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  DollarSign, 
  Star, 
  ArrowLeft,
  Check,
  Award,
  QrCode,
  Wallet,
  Copy,
  Download,
  Upload,
  Eye,
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ChatConversation, ChatMessage, User, PickupSpot } from '../types';

interface ChatSystemProps {
  currentUser: User;
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  pickupSpots: PickupSpot[];
  onSendMessage: (
    conversationId: string, 
    text: string, 
    offerPrice?: number,
    qrData?: ChatMessage['qrData']
  ) => void;
  onAcceptOffer: (conversationId: string, price: number) => void;
  onSetMeetupPoint: (conversationId: string, locationName: string) => void;
  onCompleteTransaction: (conversationId: string, rating: number, comment: string) => void;
  onClose: () => void;
}

type EWalletType = 'DuitNow' | 'Touch n Go' | 'MAE Maybank' | 'GrabPay' | 'Bank Transfer';

// Dynamic Clean Vector QR Code Generator Component
const GenerateQrSvg: React.FC<{ value: string; provider: EWalletType; size?: number }> = ({ 
  value, 
  provider, 
  size = 180 
}) => {
  const gridSize = 21;
  const modules: boolean[][] = Array(gridSize).fill(false).map(() => Array(gridSize).fill(false));

  const addFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          if (row + r < gridSize && col + c < gridSize) {
            modules[row + r][col + c] = true;
          }
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, 14);
  addFinder(14, 0);

  for (let i = 8; i < 13; i += 2) {
    modules[6][i] = true;
    modules[i][6] = true;
  }

  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8)) continue;
      if (r === 6 || c === 6) continue;
      if (r >= 8 && r <= 12 && c >= 8 && c <= 12) continue;

      const seed = Math.abs((r * 31 + c * 17 + hash) ^ (hash >> 3));
      modules[r][c] = seed % 2 === 0;
    }
  }

  const cellSize = size / gridSize;

  const getProviderColor = () => {
    switch (provider) {
      case 'DuitNow': return '#db2777';
      case 'Touch n Go': return '#2563eb';
      case 'MAE Maybank': return '#d97706';
      case 'GrabPay': return '#059669';
      case 'Bank Transfer': return '#4f46e5';
      default: return '#0d9488';
    }
  };

  return (
    <div className="relative inline-block bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="#ffffff" rx={8} />
        {modules.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.2}
                height={cellSize - 0.2}
                rx={cellSize > 8 ? 1.5 : 0.5}
                fill="#0f172a"
              />
            );
          })
        )}
      </svg>

      {/* Provider Emblem overlay in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="bg-white p-1.5 rounded-xl shadow-md border border-slate-200 font-extrabold text-[10px] tracking-tight px-2 py-0.5 uppercase"
          style={{ color: getProviderColor() }}
        >
          {provider === 'Touch n Go' ? 'TNG eWallet' : provider}
        </div>
      </div>
    </div>
  );
};

export const ChatSystem: React.FC<ChatSystemProps> = ({
  currentUser,
  conversations,
  messages,
  activeConversationId,
  setActiveConversationId,
  pickupSpots,
  onSendMessage,
  onAcceptOffer,
  onSetMeetupPoint,
  onCompleteTransaction,
  onClose,
}) => {
  const [inputText, setInputText] = useState('');
  const [customOfferText, setCustomOfferText] = useState('');
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showMeetupDialog, setShowMeetupDialog] = useState(false);
  
  // Rating Modal state
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('Fast seller! Item in excellent condition.');

  // E-Wallet QR Code Modal State
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrProvider, setQrProvider] = useState<EWalletType>('DuitNow');
  const [qrRecipientName, setQrRecipientName] = useState(currentUser.name);
  const [qrAccountNumber, setQrAccountNumber] = useState(currentUser.phone || '011-23456789');
  const [qrAmount, setQrAmount] = useState<number>(0);
  const [qrReference, setQrReference] = useState('');
  const [qrCustomImage, setQrCustomImage] = useState<string>('');
  
  // Local Paid Status State
  const [paidStatusState, setPaidStatusState] = useState<Record<string, 'unpaid' | 'paid'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedQrImage, setExpandedQrImage] = useState<string | null>(null);

  const qrFileInputRef = useRef<HTMLInputElement | null>(null);

  const currentConv = conversations.find((c) => c.id === activeConversationId);
  const currentMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  // Open QR modal initialized with conversation details
  const handleOpenQrModal = () => {
    if (currentConv) {
      setQrRecipientName(currentUser.name);
      setQrAccountNumber(currentUser.phone || '011-23456789');
      setQrAmount(currentConv.agreedPrice || currentConv.productPrice);
      setQrReference(`Payment for ${currentConv.productTitle}`);
    }
    setShowQrModal(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    onSendMessage(activeConversationId, inputText.trim());
    setInputText('');
  };

  const handleSendOffer = () => {
    const val = Number(customOfferText);
    if (!val || !activeConversationId) return;

    onSendMessage(activeConversationId, `I would like to offer RM ${val} for this item.`, val);
    setCustomOfferText('');
    setShowOfferDialog(false);
  };

  const handleSendQrCode = () => {
    if (!activeConversationId) return;

    const qrData = {
      eWalletProvider: qrProvider,
      recipientName: qrRecipientName || currentUser.name,
      accountNumber: qrAccountNumber || '011-23456789',
      amount: Number(qrAmount) || currentConv?.productPrice || 0,
      reference: qrReference || currentConv?.productTitle || 'PSAS Campus Purchase',
      qrImageUrl: qrCustomImage || undefined,
      paidStatus: 'unpaid' as const,
    };

    onSendMessage(
      activeConversationId,
      `💳 Preferred E-Wallet Payment QR Code (${qrProvider}) - RM ${qrData.amount}`,
      undefined,
      qrData
    );

    setShowQrModal(false);
    setQrCustomImage('');
  };

  const handleQrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('QR Image file size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setQrCustomImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectMeetupSpot = (spotName: string) => {
    if (!activeConversationId) return;
    onSetMeetupPoint(activeConversationId, spotName);
    onSendMessage(activeConversationId, `Let us meet up at the safe pickup spot: ${spotName}`, undefined);
    setShowMeetupDialog(false);
  };

  const handleSubmitReview = () => {
    if (!activeConversationId) return;
    onCompleteTransaction(activeConversationId, ratingStars, reviewComment);
    setShowRatingModal(false);
  };

  const handleCopyText = (text: string, idKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMarkPaid = (messageId: string) => {
    setPaidStatusState((prev) => ({ ...prev, [messageId]: 'paid' }));
    if (activeConversationId) {
      onSendMessage(
        activeConversationId,
        `✅ Payment marked as completed! Payment receipt transmitted to seller.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] shadow-2xl border border-slate-200 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar: Conversations List */}
        <div className={`w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col ${
          activeConversationId && 'hidden md:flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Campus Messages</span>
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-lg md:hidden"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No active messages yet. Click "Chat" on any listing!
              </div>
            ) : (
              conversations.map((conv) => {
                const isActive = conv.id === activeConversationId;
                const otherPartyName =
                  conv.buyerId === currentUser.id ? conv.sellerName : conv.buyerName;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'hover:bg-white'
                    }`}
                  >
                    <img
                      src={conv.productImage}
                      alt={conv.productTitle}
                      className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {otherPartyName}
                        </span>
                        <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
                      </div>

                      <div className="text-[11px] font-semibold text-emerald-700 truncate mt-0.5">
                        {conv.productTitle}
                      </div>

                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Area: Active Chat Conversation */}
        {currentConv ? (
          <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
            
            {/* Top Bar */}
            <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="p-1 hover:bg-slate-200 rounded-lg md:hidden"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>

                <img
                  src={currentConv.productImage}
                  alt={currentConv.productTitle}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                />

                <div>
                  <h3 className="font-bold text-xs text-slate-900 truncate max-w-[180px] sm:max-w-xs">
                    {currentConv.productTitle}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="font-bold text-emerald-700">
                      RM {currentConv.agreedPrice || currentConv.productPrice}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">
                      Chatting with{' '}
                      {currentConv.buyerId === currentUser.id
                        ? currentConv.sellerName
                        : currentConv.buyerName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                
                {/* Generate Payment QR Button */}
                <button
                  onClick={handleOpenQrModal}
                  className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Generate E-Wallet Payment QR Code"
                >
                  <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Payment QR</span>
                </button>

                {/* Safe Pickup Point Selector */}
                <button
                  onClick={() => setShowMeetupDialog(true)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  title="Recommend Safe Pickup Point"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Pickup Point</span>
                </button>

                {/* Complete & Rate Transaction */}
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Complete Deal</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Agreed Pickup Spot Banner if set */}
            {currentConv.agreedPickupPoint && (
              <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>
                    Agreed Meetup Point: <strong className="text-emerald-950">{currentConv.agreedPickupPoint}</strong>
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>
            )}

            {/* Messages Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {currentMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5 px-1">
                      {msg.senderName} • {msg.timestamp}
                    </span>

                    {/* Standard Message vs Payment QR Message */}
                    {msg.isQrPayment && msg.qrData ? (
                      <div className="bg-white rounded-2xl border-2 border-indigo-200 overflow-hidden shadow-sm max-w-sm w-full my-1">
                        {/* Header Banner */}
                        <div className={`px-3 py-2 flex items-center justify-between text-white font-extrabold text-xs ${
                          msg.qrData.eWalletProvider === 'DuitNow' ? 'bg-gradient-to-r from-pink-600 to-rose-600' :
                          msg.qrData.eWalletProvider === 'Touch n Go' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                          msg.qrData.eWalletProvider === 'MAE Maybank' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950' :
                          msg.qrData.eWalletProvider === 'GrabPay' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                          'bg-gradient-to-r from-indigo-600 to-purple-600'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <QrCode className="w-4 h-4" />
                            <span>{msg.qrData.eWalletProvider} Payment QR</span>
                          </div>
                          <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                            Preferred E-Wallet
                          </span>
                        </div>

                        {/* QR Body & Card */}
                        <div className="p-4 text-center space-y-3 bg-slate-50/50">
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Payable</span>
                            <div className="text-2xl font-black text-slate-900">
                              RM {Number(msg.qrData.amount).toFixed(2)}
                            </div>
                          </div>

                          {/* QR Code graphic */}
                          <div className="flex justify-center">
                            {msg.qrData.qrImageUrl ? (
                              <button 
                                onClick={() => setExpandedQrImage(msg.qrData?.qrImageUrl || null)}
                                className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer"
                              >
                                <img src={msg.qrData.qrImageUrl} alt="E-Wallet QR" className="w-44 h-44 object-contain bg-white" />
                                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1">
                                  <Eye className="w-4 h-4" /> Tap to Enlarge
                                </div>
                              </button>
                            ) : (
                              <button
                                onClick={() => setExpandedQrImage('GENERATE_SVG')}
                                className="cursor-pointer"
                              >
                                <GenerateQrSvg 
                                  value={`PAYMENT:${msg.qrData.eWalletProvider}:${msg.qrData.accountNumber}:${msg.qrData.amount}:${msg.qrData.reference}`}
                                  provider={msg.qrData.eWalletProvider}
                                  size={160}
                                />
                              </button>
                            )}
                          </div>

                          {/* Recipient Details */}
                          <div className="bg-white p-3 rounded-xl border border-slate-200 text-left space-y-1.5 text-xs shadow-2xs">
                            <div className="flex justify-between items-center text-slate-500 text-[11px]">
                              <span>Recipient Name:</span>
                              <strong className="text-slate-900 font-bold">{msg.qrData.recipientName}</strong>
                            </div>
                            
                            <div className="flex justify-between items-center text-slate-500 text-[11px]">
                              <span>DuitNow / Account No:</span>
                              <div className="flex items-center gap-1">
                                <code className="font-mono text-slate-900 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                                  {msg.qrData.accountNumber}
                                </code>
                                <button
                                  onClick={() => handleCopyText(msg.qrData?.accountNumber || '', msg.id)}
                                  className="p-1 hover:bg-slate-100 text-indigo-600 rounded cursor-pointer"
                                  title="Copy Account Number"
                                >
                                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>

                            {msg.qrData.reference && (
                              <div className="flex justify-between text-slate-500 text-[11px] border-t border-slate-100 pt-1">
                                <span>Reference:</span>
                                <span className="text-slate-700 font-medium truncate max-w-[160px]">{msg.qrData.reference}</span>
                              </div>
                            )}
                          </div>

                          {/* Payment Completion Action */}
                          <div className="pt-1 flex items-center justify-between gap-2">
                            <div className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                              (paidStatusState[msg.id] || msg.qrData.paidStatus) === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{(paidStatusState[msg.id] || msg.qrData.paidStatus) === 'paid' ? 'Payment Transferred' : 'Awaiting Payment'}</span>
                            </div>

                            {(paidStatusState[msg.id] || msg.qrData.paidStatus) !== 'paid' && (
                              <button
                                onClick={() => handleMarkPaid(msg.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark Paid</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-emerald-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Offer Badge inside message if offer */}
                        {msg.isOffer && (
                          <div className="mt-2 pt-2 border-t border-emerald-500/40 flex items-center justify-between gap-3">
                            <span className="font-extrabold text-sm">
                              Offer: RM {msg.offerPrice}
                            </span>

                            {!isMe && msg.offerStatus === 'pending' && (
                              <button
                                onClick={() =>
                                  onAcceptOffer(currentConv.id, msg.offerPrice || currentConv.productPrice)
                                }
                                className="px-2.5 py-1 bg-white text-emerald-800 font-bold text-[10px] rounded-lg shadow-xs hover:bg-emerald-50 cursor-pointer"
                              >
                                Accept RM {msg.offerPrice}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Bottom Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                
                {/* Generate Payment QR Shortcut */}
                <button
                  type="button"
                  onClick={handleOpenQrModal}
                  className="px-2.5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs rounded-xl border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  title="Generate E-Wallet QR Code"
                >
                  <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Payment QR</span>
                </button>

                {/* Make Offer Button */}
                <button
                  type="button"
                  onClick={() => setShowOfferDialog(!showOfferDialog)}
                  className="px-2.5 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs rounded-xl border border-emerald-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Offer Price</span>
                </button>

                <input
                  type="text"
                  placeholder="Type a message or request seller payment QR..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />

                <button
                  type="submit"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Preset Offer Dialog */}
              {showOfferDialog && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in duration-150">
                  <span className="text-xs font-bold text-emerald-900 shrink-0">
                    Negotiate RM:
                  </span>
                  <input
                    type="number"
                    placeholder="Enter price offer"
                    value={customOfferText}
                    onChange={(e) => setCustomOfferText(e.target.value)}
                    className="w-28 px-2 py-1 bg-white border border-emerald-300 rounded-lg text-xs font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleSendOffer}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg cursor-pointer"
                  >
                    Send Offer
                  </button>
                </div>
              )}
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
            Select a conversation on the left to view messages.
          </div>
        )}

      </div>

      {/* GENERATE E-WALLET PAYMENT QR CODE MODAL */}
      {showQrModal && currentConv && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-slate-900 text-white">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold">Generate Preferred E-Wallet Payment QR</h3>
                  <p className="text-[11px] text-indigo-200 font-medium">Display your preferred payment QR directly to the buyer in chat</p>
                </div>
              </div>
              <button onClick={() => setShowQrModal(false)} className="p-1 hover:bg-white/10 rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              
              {/* Select E-Wallet Provider */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Select E-Wallet / Bank Provider:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['DuitNow', 'Touch n Go', 'MAE Maybank', 'GrabPay', 'Bank Transfer'] as EWalletType[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setQrProvider(p)}
                      className={`p-2.5 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        qrProvider === p
                          ? p === 'DuitNow' ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300' :
                            p === 'Touch n Go' ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300' :
                            p === 'MAE Maybank' ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-200' :
                            p === 'GrabPay' ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300' :
                            'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Name & Account Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Account Recipient Name</label>
                  <input
                    type="text"
                    value={qrRecipientName}
                    onChange={(e) => setQrRecipientName(e.target.value)}
                    placeholder="e.g. Ahmad Syahmi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">DuitNow ID / Phone / Account No.</label>
                  <input
                    type="text"
                    value={qrAccountNumber}
                    onChange={(e) => setQrAccountNumber(e.target.value)}
                    placeholder="e.g. 011-23456789"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Amount & Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Payment Amount (RM)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">RM</span>
                    <input
                      type="number"
                      step="0.5"
                      value={qrAmount}
                      onChange={(e) => setQrAmount(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Payment Reference</label>
                  <input
                    type="text"
                    value={qrReference}
                    onChange={(e) => setQrReference(e.target.value)}
                    placeholder="e.g. PSAS Engineering Textbook"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Optional Custom E-Wallet QR Upload from Phone */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Upload Personal E-Wallet QR Screenshot (Optional)</span>
                  </label>
                  {qrCustomImage && (
                    <button
                      type="button"
                      onClick={() => setQrCustomImage('')}
                      className="text-[10px] text-rose-600 font-bold hover:underline"
                    >
                      Remove Custom QR
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={qrFileInputRef}
                  onChange={handleQrFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="bg-slate-50 border-2 border-dashed border-indigo-200 hover:border-indigo-400 p-3 rounded-xl text-center transition-colors">
                  <button
                    type="button"
                    onClick={() => qrFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{qrCustomImage ? 'Change Uploaded QR Screenshot' : 'Upload QR Screenshot from Phone'}</span>
                  </button>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">
                    Upload your saved Touch 'n Go, DuitNow, or MAE QR code image directly
                  </p>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="bg-slate-100 p-3.5 rounded-2xl space-y-2 border border-slate-200">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Live Chat QR Card Preview</span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
                  <div className="shrink-0">
                    {qrCustomImage ? (
                      <img src={qrCustomImage} alt="QR Preview" className="w-20 h-20 object-contain rounded-lg border" />
                    ) : (
                      <GenerateQrSvg 
                        value={`PAYMENT:${qrProvider}:${qrAccountNumber}:${qrAmount}:${qrReference}`}
                        provider={qrProvider}
                        size={80}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{qrProvider} QR</span>
                    <h4 className="font-extrabold text-slate-900 text-sm">RM {Number(qrAmount || 0).toFixed(2)}</h4>
                    <p className="text-[11px] text-slate-600 truncate">Payee: <strong>{qrRecipientName}</strong></p>
                    <p className="text-[10px] text-slate-400 font-mono">ID: {qrAccountNumber}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendQrCode}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Payment QR Code to Chat</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Enlarged QR Code Modal */}
      {expandedQrImage && (
        <div 
          onClick={() => setExpandedQrImage(null)}
          className="fixed inset-0 z-70 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
        >
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExpandedQrImage(null)}
              className="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <h3 className="font-extrabold text-slate-900 text-sm">E-Wallet Payment QR Code</h3>
            <p className="text-xs text-slate-500">Scan using your Malaysian banking or e-wallet mobile app</p>
            
            <div className="flex justify-center p-2 bg-slate-50 rounded-2xl border border-slate-200">
              {expandedQrImage === 'GENERATE_SVG' ? (
                <GenerateQrSvg provider="DuitNow" value="PSAS_PAYMENT" size={240} />
              ) : (
                <img src={expandedQrImage} alt="Enlarged QR" className="max-h-72 object-contain rounded-xl" />
              )}
            </div>

            <button
              onClick={() => setExpandedQrImage(null)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Safe Pickup Spot Selection Dialog Modal */}
      {showMeetupDialog && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Select Safe Campus Meetup Location</span>
              </h3>
              <button onClick={() => setShowMeetupDialog(false)}>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-snug">
              Choose a CCTV-monitored safe campus spot for your handover:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pickupSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => handleSelectMeetupSpot(spot.name)}
                  className="w-full p-3 text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{spot.name}</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                      {spot.safetyScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{spot.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rating & Review Modal */}
      {showRatingModal && currentConv && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Rate & Review Seller</span>
              </h3>
              <button onClick={() => setShowRatingModal(false)}>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-snug">
              Complete transaction for <strong className="text-slate-900">{currentConv.productTitle}</strong>. Your feedback increases student trust score!
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRatingStars(s)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      s <= ratingStars
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Your Review Comment</label>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Submit Rating & Complete Deal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
