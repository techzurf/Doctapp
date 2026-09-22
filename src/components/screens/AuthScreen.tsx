import React, { useState } from 'react';
import { ShieldCheck, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: (userName: string) => void;
  onSkip?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onSkip }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState('9840123456');
  const [password, setPassword] = useState('shifacare2026');
  const [fullName, setFullName] = useState('Ahmed Mohammed');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(isSignUp ? fullName : 'Ahmed Mohammed');
    }, 400);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess('Ahmed Mohammed');
    }, 400);
  };

  return (
    <div
      id="auth-screen"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F7FAF9] text-[#12302D] px-6 py-8 safe-top safe-bottom select-none overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-[#0F766E] tracking-tight">ShifaCare</span>
        </div>
        {onSkip && (
          <button
            type="button"
            id="auth-guest-btn"
            onClick={onSkip}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F766E] px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors"
          >
            Guest Demo
          </button>
        )}
      </div>

      {/* Main Form Body */}
      <div className="w-full max-w-sm mx-auto my-auto py-6">
        <div className="mb-6 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
            {isSignUp ? 'New Patient Registration' : 'Secure Patient Sign In'}
          </span>
          <h1 className="text-2xl font-extrabold text-[#12302D] tracking-tight mt-1">
            {isSignUp ? 'Create your Account' : 'Welcome to ShifaCare'}
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Access verified Muslim doctors, appointments, and Islamic health resources.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#12302D] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="auth-fullname-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ahmed Mohammed"
                  required
                  className="w-full pl-3.5 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#12302D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#12302D] mb-1.5">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500 border-r border-slate-200 pr-2">
                <Phone className="w-3.5 h-3.5 text-[#0F766E]" />
                +91
              </span>
              <input
                type="tel"
                id="auth-phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                className="w-full pl-20 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#12302D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-[#12302D]">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  id="auth-forgot-password-btn"
                  onClick={() => alert('Demo: OTP will be sent to your registered mobile number')}
                  className="text-[11px] font-semibold text-[#0F766E] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4 text-[#0F766E]" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="auth-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#12302D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-semibold text-sm shadow-md shadow-teal-900/15 flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-75"
          >
            <span>{isLoading ? 'Verifying...' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Continue with Google button */}
        <button
          type="button"
          id="auth-google-btn"
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-[#12302D] shadow-sm flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle Sign In / Sign Up */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#64748B]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              id="auth-toggle-mode-btn"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-[#0F766E] hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <div className="w-full text-center">
        <p className="text-[10px] text-slate-400">
          By continuing, you agree to ShifaCare’s Medical Privacy & Terms of Service.
        </p>
      </div>
    </div>
  );
};
