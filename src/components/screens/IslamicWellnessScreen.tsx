import React from 'react';
import { 
  Heart, 
  Moon, 
  Compass, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  Sun,
  Flame,
  Droplet
} from 'lucide-react';

interface IslamicWellnessScreenProps {
  onNavigateToDuas: () => void;
  onNavigateToRamadan: () => void;
  onNavigateToHajj: () => void;
}

export const IslamicWellnessScreen: React.FC<IslamicWellnessScreenProps> = ({
  onNavigateToDuas,
  onNavigateToRamadan,
  onNavigateToHajj
}) => {
  return (
    <div id="islamic-wellness-screen" className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-5">
      {/* Header with Islamic Pattern Accent */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F766E] to-[#12302D] p-5 text-white shadow-md">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#C9A227] text-[10px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3 h-3 text-[#C9A227]" />
            <span>Islamic Healing & Wellness</span>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight">
            Faith-Aligned Health
          </h1>
          <p className="text-xs text-teal-100 max-w-xs leading-relaxed">
            Integrating authentic Sunnah practices, prophetic wellness traditions, and medical guidance for mind, body and soul.
          </p>
        </div>

        {/* Subtle Decorative Circle */}
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
      </div>

      {/* Featured Wellness Cards Grid */}
      <div className="space-y-3">
        {/* 1. Duas for Healing Card */}
        <div
          id="wellness-card-duas"
          onClick={onNavigateToDuas}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-[#0F766E]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-[#0F766E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#12302D]">Duas for Healing</h3>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0F766E] text-[10px] font-bold">
                    Sahih Hadith
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authentic supplications for illness, visiting the sick & anxiety
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#0F766E] transition-all" />
          </div>
        </div>

        {/* 2. Ramadan & Health Guide */}
        <div
          id="wellness-card-ramadan"
          onClick={onNavigateToRamadan}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-[#0F766E]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C9A227] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Moon className="w-6 h-6 text-[#C9A227]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#12302D]">Ramadan & Health</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[#92400E] text-[10px] font-bold">
                    Doctor Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fasting with diabetes, medicine timings, hydration & nutrition
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#0F766E] transition-all" />
          </div>
        </div>

        {/* 3. Hajj & Umrah Health Guide */}
        <div
          id="wellness-card-hajj"
          onClick={onNavigateToHajj}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-[#0F766E]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#12302D]">Hajj & Umrah Guide</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Pilgrim Guide
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vaccinations, heat stroke, foot care & endurance checklist
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#0F766E] transition-all" />
          </div>
        </div>
      </div>

      {/* Prophetic Medicine & Lifestyle (Tibb al-Nabawi) Snippet */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tibb al-Nabawi
            </h2>
            <h3 className="text-sm font-extrabold text-[#12302D] mt-0.5">
              Prophetic Nutrition & Medicine
            </h3>
          </div>
          <BookOpen className="w-4 h-4 text-[#0F766E]" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60">
            <span className="text-lg mb-1 block">🍯</span>
            <h4 className="text-xs font-bold text-amber-950">Natural Honey</h4>
            <p className="text-[10px] text-amber-800/80 mt-1 leading-normal">
              “There is a healing in honey for humankind.” (Surah An-Nahl 16:69)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-lg mb-1 block">🌱</span>
            <h4 className="text-xs font-bold text-slate-900">Black Seed (Habbat al-Barakah)</h4>
            <p className="text-[10px] text-slate-600 mt-1 leading-normal">
              “Use black seed, for indeed in it is a cure for every disease except death.” (Bukhari)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/60">
            <span className="text-lg mb-1 block">🫒</span>
            <h4 className="text-xs font-bold text-[#0F766E]">Olive Oil (Zayt)</h4>
            <p className="text-[10px] text-teal-800/80 mt-1 leading-normal">
              Rich in antioxidants and cardioprotective monounsaturated fats.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60">
            <span className="text-lg mb-1 block">💧</span>
            <h4 className="text-xs font-bold text-rose-950">Zamzam Water</h4>
            <p className="text-[10px] text-rose-800/80 mt-1 leading-normal">
              “Zamzam water is for whatever purpose it is drunk for.” (Ibn Majah)
            </p>
          </div>
        </div>
      </div>

      {/* Mental Peace & Faith Guidance */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-200/70 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white text-[#0F766E] shadow-2xs shrink-0">
          <Sparkles className="w-5 h-5 text-[#C9A227]" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#12302D]">
            Spiritual Coping with Illness
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            In Islam, sickness is an expiation of sins and an elevation in rank. Combine sincere prayer (Du’a) with professional medical treatment (Tadawi).
          </p>
        </div>
      </div>
    </div>
  );
};
