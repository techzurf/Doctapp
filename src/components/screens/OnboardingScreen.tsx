import React, { useState } from 'react';
import { Stethoscope, Users, Moon, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Find Trusted Muslim Doctors',
      description: 'Connect with verified doctors across multiple specialties who understand your health and values.',
      badge: 'Certified Medical Specialists',
      icon: Stethoscope,
      accent: 'from-[#0F766E] to-[#14B8A6]',
      details: ['Over 100+ verified specialists', 'Instant clinic & online booking', 'Culturally sensitive consultations']
    },
    {
      title: 'Healthcare for Your Family',
      description: 'Manage appointments, prescriptions, and medical records for your spouse, children, and parents in one place.',
      badge: 'Unified Family Health',
      icon: Users,
      accent: 'from-[#14B8A6] to-[#0D655E]',
      details: ['Multi-profile records for elders & kids', 'Upcoming vaccine schedules', 'Safe prescription repository']
    },
    {
      title: 'Health & Faith Together',
      description: 'Access authentic duas for healing, evidence-based Ramadan fasting protocols, and Islamic wellness guidance.',
      badge: 'Faith-Aligned Wellness',
      icon: Moon,
      accent: 'from-[#0F766E] to-[#C9A227]',
      details: ['Authentic Hadith & Quranic healing duas', 'Ramadan hydration & medication timing', 'Hajj & Umrah health prep checklists']
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div
      id="onboarding-screen"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F7FAF9] text-[#12302D] px-6 py-10 safe-top safe-bottom select-none overflow-y-auto"
    >
      {/* Top Header: Skip */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F766E] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
          <span>ShifaCare</span>
        </div>
        <button
          type="button"
          id="onboarding-skip-btn"
          onClick={onComplete}
          className="text-xs font-semibold text-[#64748B] hover:text-[#0F766E] px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 text-center max-w-sm mx-auto">
        {/* Visual Graphic with soft teal aura */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-teal-50 via-teal-100 to-white flex items-center justify-center shadow-md border border-teal-200/60">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${slide.accent} flex items-center justify-center shadow-lg text-white`}>
              <IconComponent className="w-10 h-10" />
            </div>
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-[#12302D] text-white text-[10px] font-semibold tracking-wide shadow-sm">
            {slide.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-[#12302D] tracking-tight mb-3">
          {slide.title}
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          {slide.description}
        </p>

        {/* Key Highlights list */}
        <div className="w-full bg-white rounded-2xl p-4 border border-[#12302D]/5 shadow-sm space-y-2 text-left mb-4">
          {slide.details.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-[#12302D]/90 font-medium">
              <div className="w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-200">
                <Check className="w-2.5 h-2.5 text-[#0F766E]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-sm mx-auto space-y-4">
        {/* Step dots indicator */}
        <div className="flex justify-center items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 bg-[#0F766E]'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          type="button"
          id="onboarding-next-btn"
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-semibold text-sm shadow-md shadow-teal-900/10 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
