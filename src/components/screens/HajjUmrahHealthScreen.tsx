import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Compass, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Sun, 
  PhoneCall, 
  Footprints, 
  Pill, 
  Heart, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HAJJ_UMRAH_CHECKLIST } from '../../data/mockData';

interface HajjUmrahHealthScreenProps {
  onBack: () => void;
  onBookVaccineConsult?: () => void;
}

export const HajjUmrahHealthScreen: React.FC<HajjUmrahHealthScreenProps> = ({
  onBack,
  onBookVaccineConsult
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'hajj-1': true,
    'hajj-4': true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checklist = HAJJ_UMRAH_CHECKLIST;

  return (
    <div id="hajj-health-screen" className="pb-24 pt-2 px-4 max-w-lg mx-auto w-full min-w-0 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-2 w-full min-w-0">
        <button
          type="button"
          id="hajj-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-[#12302D] truncate">Hajj & Umrah Health</h1>
          <p className="text-xs text-slate-500 truncate">Pilgrim preparation & medical safety</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-[#12302D] p-5 text-white shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-300" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            Pilgrim Health & Safety
          </span>
        </div>
        <h2 className="text-base font-extrabold">
          Journey of a Lifetime
        </h2>
        <p className="text-xs text-emerald-100 leading-relaxed">
          Physical fitness and proactive preventative care ensure your worship remains unhindered by fatigue and preventable illness.
        </p>
      </div>

      {/* Emergency Saudi Numbers */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
          Saudi Arabia Emergency Numbers
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-rose-600 block">Red Crescent Ambulance</span>
              <strong className="text-rose-900 text-sm">997</strong>
            </div>
            <PhoneCall className="w-4 h-4 text-rose-500" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block">General Emergency</span>
              <strong className="text-slate-900 text-sm">911</strong>
            </div>
            <PhoneCall className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Interactive Preparation Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Preparation Checklist ({Object.values(checkedItems).filter(Boolean).length}/{checklist.length} Completed)
          </h3>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-teal-50/50 border-teal-200/80'
                    : 'bg-white border-slate-200/80 shadow-2xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className="mt-0.5 text-[#0F766E]"
                    aria-label="Toggle check"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 fill-[#0F766E] text-white" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider">
                        {item.category}
                      </span>
                      {item.mandatory && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 text-[9px] font-bold">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <h4 className={`text-xs font-bold mt-0.5 ${isChecked ? 'text-slate-500 line-through' : 'text-[#12302D]'}`}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Vaccines Highlight */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-[#12302D] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <span>Mandatory Vaccination Rules</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Ministry of Hajj & Umrah requires <strong>Quadrivalent Meningococcal Meningitis (ACYW135)</strong> vaccination certificate issued not more than 3 years and not less than 10 days before arrival.
        </p>

        {onBookVaccineConsult && (
          <button
            type="button"
            onClick={onBookVaccineConsult}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] text-xs font-bold border border-teal-200/80 transition-colors text-center"
          >
            Book Travel Vaccination Consultation
          </button>
        )}
      </div>

      {/* Heat & Foot Care Quick Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Heat Stroke</span>
          </div>
          <p className="text-[10px] text-amber-800 leading-normal">
            Carry an umbrella during Tawaf and Sa’i. Drink ORS electrolyte water every 2 hours, even if not feeling thirsty.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-sky-900 font-bold">
            <Footprints className="w-4 h-4 text-sky-600" />
            <span>Foot Blisters</span>
          </div>
          <p className="text-[10px] text-sky-800 leading-normal">
            Apply unscented petroleum jelly to inner thighs & toes before donning Ihram to prevent chafing during long walks.
          </p>
        </div>
      </div>
    </div>
  );
};
