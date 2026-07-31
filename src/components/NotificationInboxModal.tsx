import React from 'react';
import { X, Bell, MessageSquare, Heart, TrendingUp, Star, ShieldAlert } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationInboxModal: React.FC<NotificationInboxModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Campus Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No new notifications.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onSelectNotification(notif);
                  onClose();
                }}
                className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                  notif.read ? 'bg-white opacity-80' : 'bg-emerald-50/60 font-semibold border border-emerald-100'
                }`}
              >
                <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-200 shrink-0">
                  {notif.type === 'message' ? (
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  ) : notif.type === 'like' ? (
                    <Heart className="w-4 h-4 text-rose-500" />
                  ) : notif.type === 'campaign' ? (
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Star className="w-4 h-4 text-amber-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{notif.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{notif.timestamp}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
