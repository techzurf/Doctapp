import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium w-full max-w-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'success'
              ? 'bg-[#0F766E] text-white border-[#14B8A6]/40'
              : toast.type === 'error'
              ? 'bg-rose-700 text-white border-rose-500/40'
              : 'bg-[#12302D] text-white border-white/20'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#14B8A6]" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />}
          {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-[#C9A227]" />}
          <span className="flex-1 text-xs leading-snug">{toast.message}</span>
          <button
            type="button"
            id={`dismiss-toast-${toast.id}`}
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toast = ToastContainer;
