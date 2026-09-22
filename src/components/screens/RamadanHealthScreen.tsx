import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Moon, 
  AlertCircle, 
  Droplet, 
  Clock, 
  Pill, 
  HeartPulse, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { RAMADAN_HEALTH_GUIDES } from '../../data/mockData';

interface RamadanHealthScreenProps {
  onBack: () => void;
  onBookSpecialist: (specialty: string) => void;
}

export const RamadanHealthScreen: React.FC<RamadanHealthScreenProps> = ({
  onBack,
  onBookSpecialist
}) => {
  const [expandedTopic, setExpandedTopic] = useState<string>('diabetes');

  const guides = RAMADAN_HEALTH_GUIDES;

  return (
    <div id="ramadan-health-screen" className="pb-24 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          id="ramadan-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#12302D]">Ramadan & Health Guide</h1>
          <p className="text-xs text-slate-500">Medical guidelines aligned with Shariah</p>
        </div>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-[#12302D] p-5 text-white shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-300" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
            Fasting & Chronic Health
          </span>
        </div>
        <h2 className="text-base font-extrabold">
          Safe Fasting Protocol
        </h2>
        <p className="text-xs text-amber-100 leading-relaxed">
          Islam permits individuals with acute illness or uncontrolled conditions to exempt themselves. Consult your doctor before adjusting prescription medication.
        </p>
      </div>

      {/* Accordion Topics */}
      <div className="space-y-3">
        {guides.map((item) => {
          const isExpanded = expandedTopic === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                id={`topic-toggle-${item.id}`}
                onClick={() => setExpandedTopic(isExpanded ? '' : item.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    {item.icon === 'diabetes' && <HeartPulse className="w-5 h-5" />}
                    {item.icon === 'meds' && <Pill className="w-5 h-5" />}
                    {item.icon === 'water' && <Droplet className="w-5 h-5" />}
                    {item.icon === 'pregnancy' && <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#12302D]">{item.title}</h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.summary}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] block">
                      Clinical Recommendations:
                    </span>
                    {item.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>

                  {item.dangerSigns && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/60 text-xs text-rose-800 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[11px] text-rose-900">
                        <AlertCircle className="w-3.5 h-3.5" />
                        When to immediately break your fast:
                      </span>
                      <p>{item.dangerSigns}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Water Distribution Plan Visual Guide */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#12302D] flex items-center gap-1.5">
            <Droplet className="w-4 h-4 text-[#0F766E]" />
            <span>Optimal 8-Glass Ramadan Hydration Plan</span>
          </h3>
          <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-full">
            2.5 Liters
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
            <span className="text-[10px] font-bold text-[#0F766E] block">Iftar</span>
            <span className="text-xs font-extrabold text-[#12302D]">2 Glasses</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">With dates</span>
          </div>

          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
            <span className="text-[10px] font-bold text-[#0F766E] block">Post-Taraweeh</span>
            <span className="text-xs font-extrabold text-[#12302D]">2 Glasses</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Sip slowly</span>
          </div>

          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
            <span className="text-[10px] font-bold text-[#0F766E] block">Night</span>
            <span className="text-xs font-extrabold text-[#12302D]">2 Glasses</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Before bed</span>
          </div>

          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
            <span className="text-[10px] font-bold text-[#0F766E] block">Suhoor</span>
            <span className="text-xs font-extrabold text-[#12302D]">2 Glasses</span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Pre-Fajr</span>
          </div>
        </div>
      </div>

      {/* Consult Specialist CTA */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#12302D]">Have chronic diabetes or hypertension?</h4>
          <p className="text-[11px] text-slate-500">Get personalized Ramadan dosage evaluation</p>
        </div>
        <button
          type="button"
          onClick={() => onBookSpecialist('Diabetology')}
          className="px-3.5 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-2xs hover:bg-[#0D655E] active:scale-95 transition-all"
        >
          Consult Doctor
        </button>
      </div>
    </div>
  );
};
