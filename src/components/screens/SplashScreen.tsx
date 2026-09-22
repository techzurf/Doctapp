import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  return (
    <div
      id="splash-screen"
      onClick={onFinish}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#0F766E] via-[#0D655E] to-[#12302D] text-white px-6 py-12 cursor-pointer select-none"
    >
      {/* Top subtle geometric pattern */}
      <div className="w-full flex justify-between items-center opacity-30 text-xs tracking-widest uppercase font-mono">
        <span>Verified Medical Care</span>
        <span>•</span>
        <span>Halal Wellness</span>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center text-center my-auto animate-in fade-in zoom-in-95 duration-700">
        {/* Emblem with subtle Islamic 8-point geometric shield & medical heart */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.35)] rotate-45 transition-transform hover:rotate-90 duration-700">
            <div className="-rotate-45 flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-[#14B8A6]" />
            </div>
          </div>
          {/* Subtle gold accent dot */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A227] flex items-center justify-center shadow-md">
            <Sparkles className="w-3 h-3 text-[#12302D]" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
          SHIFACARE
        </h1>

        <div className="h-0.5 w-12 bg-[#C9A227] mb-3 rounded-full" />

        <p className="text-sm font-medium tracking-wide text-teal-100/90 max-w-xs">
          “Healthcare. Faith. Community.”
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-teal-200">
          <Heart className="w-3 h-3 text-[#14B8A6] fill-[#14B8A6]" />
          Verified Muslim Doctors & Wellness
        </span>
      </div>

      {/* Bottom CTA & Tap cue */}
      <div className="w-full flex flex-col items-center space-y-4">
        <button
          type="button"
          id="splash-get-started-btn"
          onClick={(e) => {
            e.stopPropagation();
            onFinish();
          }}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white font-semibold text-sm shadow-lg shadow-teal-950/40 active:scale-95 transition-all text-center"
        >
          Explore ShifaCare
        </button>
        <p className="text-[11px] text-teal-200/60 font-medium">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
};
