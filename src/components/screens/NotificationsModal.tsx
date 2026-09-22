import React from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Calendar, 
  FileText, 
  Moon, 
  Heart, 
  Check, 
  Trash2, 
  X,
  Clock
} from 'lucide-react';
import { AppNotification } from '../../types';

interface NotificationsModalProps {
  notifications: AppNotification[];
  onBack: () => void;
  onMarkAllAsRead: () => void;
  onDismissNotification: (id: string) => void;
  onNotificationClick: (notif: AppNotification) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onBack,
  onMarkAllAsRead,
  onDismissNotification,
  onNotificationClick
}) => {
  return (
    <div id="notifications-modal" className="pb-24 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="notifications-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#12302D]">Notifications</h1>
            <p className="text-xs text-slate-500">Alerts & health reminders</p>
          </div>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-[#0F766E] hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.isRead
                  ? 'bg-white border-slate-200/80'
                  : 'bg-teal-50/50 border-teal-200/80 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'appointment' ? 'bg-teal-100 text-[#0F766E]' :
                  item.type === 'prescription' ? 'bg-sky-100 text-sky-700' :
                  item.type === 'wellness' ? 'bg-amber-100 text-amber-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.type === 'appointment' && <Calendar className="w-4 h-4" />}
                  {item.type === 'prescription' && <FileText className="w-4 h-4" />}
                  {item.type === 'wellness' && <Moon className="w-4 h-4" />}
                  {item.type === 'dua' && <Heart className="w-4 h-4" />}
                </div>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => onNotificationClick(item)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#12302D] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onDismissNotification(item.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#12302D]">No notifications</h3>
            <p className="text-xs text-slate-500">
              You're all caught up with your appointments and reminders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
