import React, { useState } from 'react';
import { 
  User, 
  Users, 
  FileText, 
  Heart, 
  Bell, 
  Globe, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  Moon, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { FamilyMember } from '../../types';

interface ProfileScreenProps {
  onNavigateToFamily: () => void;
  onNavigateToRecords: () => void;
  onNavigateToSavedDoctors: () => void;
  onNavigateToIslamicWellness: () => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToFamily,
  onNavigateToRecords,
  onNavigateToSavedDoctors,
  onNavigateToIslamicWellness,
  onOpenNotifications,
  onLogout
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Tamil (தமிழ்)' | 'Urdu (اردو)' | 'Hindi (हिंदी)'>('English');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const languages: Array<'English' | 'Tamil (தமிழ்)' | 'Urdu (اردو)' | 'Hindi (हिंदी)'> = [
    'English',
    'Tamil (தமிழ்)',
    'Urdu (اردو)',
    'Hindi (हिंदी)'
  ];

  return (
    <div id="profile-screen" className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#12302D] tracking-tight">Account & Profile</h1>
          <p className="text-xs text-[#64748B]">Personal health settings</p>
        </div>

        <button
          type="button"
          id="profile-notifications-btn"
          onClick={onOpenNotifications}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
              alt="Ahmed Farooq"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0F766E]/20"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0F766E] text-white ring-2 ring-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-[#12302D] truncate">
                Ahmed Farooq
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] text-[10px] font-bold">
                Primary Account
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-[#0F766E]" />
              +91 98765 43210
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
              <Mail className="w-3 h-3 text-[#0F766E]" />
              ahmed.farooq@example.com
            </p>
          </div>
        </div>

        {/* Quick Vitals Row */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Blood Group</span>
            <span className="font-bold text-[#12302D] mt-0.5 block">B+ Positive</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">City</span>
            <span className="font-bold text-[#12302D] mt-0.5 block">Chennai, India</span>
          </div>
        </div>
      </div>

      {/* Menu Section 1: Health & Family */}
      <div className="bg-white rounded-3xl p-2 border border-slate-200/80 shadow-sm divide-y divide-slate-100">
        <button
          type="button"
          id="profile-family-btn"
          onClick={onNavigateToFamily}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">My Family Profiles</p>
              <p className="text-[11px] text-slate-500">Fatima, Ayaan, Maryam (4 members)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          id="profile-records-btn"
          onClick={onNavigateToRecords}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Medical Records & E-Rx</p>
              <p className="text-[11px] text-slate-500">View lab reports & prescriptions</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          id="profile-saved-doctors-btn"
          onClick={onNavigateToSavedDoctors}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Saved Doctors (Favorites)</p>
              <p className="text-[11px] text-slate-500">Quickly re-book favorite doctors</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          id="profile-islamic-wellness-btn"
          onClick={onNavigateToIslamicWellness}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#C9A227] flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Islamic Wellness Hub</p>
              <p className="text-[11px] text-slate-500">Duas, Ramadan fasting, Hajj guidelines</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Menu Section 2: Preferences & Info */}
      <div className="bg-white rounded-3xl p-2 border border-slate-200/80 shadow-sm divide-y divide-slate-100">
        <button
          type="button"
          id="profile-language-btn"
          onClick={() => setShowLanguageModal(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Language Preference</p>
              <p className="text-[11px] text-[#0F766E] font-medium">{selectedLanguage}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          id="profile-support-btn"
          onClick={() => setShowSupportModal(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Help & Support</p>
              <p className="text-[11px] text-slate-500">24/7 patient helpline & FAQs</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          id="profile-about-btn"
          onClick={() => setShowAboutModal(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">About ShifaCare</p>
              <p className="text-[11px] text-slate-500">Healthcare. Faith. Community.</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        type="button"
        id="profile-logout-btn"
        onClick={onLogout}
        className="w-full p-3.5 rounded-2xl bg-white border border-rose-200/80 text-rose-700 hover:bg-rose-50 flex items-center justify-center gap-2 text-xs font-bold shadow-2xs active:scale-95 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out (Demo Session)</span>
      </button>

      {/* App Version Info */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-slate-400">
          ShifaCare Mobile Prototype v1.0.4 • Built with Modern React & Tailwind
        </p>
        <p className="text-[9px] text-slate-400 mt-0.5">
          Dedicated to Muslim Community Healthcare & Ethical Practice
        </p>
      </div>

      {/* LANGUAGE SELECTOR MODAL */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Choose Language</h3>
              <button onClick={() => setShowLanguageModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                    selectedLanguage === lang
                      ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLanguage === lang && <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT SHIFACARE MODAL */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">About ShifaCare</h3>
              <button onClick={() => setShowAboutModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A227] block">
                  Core Mission
                </span>
                <p className="font-bold text-[#12302D] text-sm mt-0.5">
                  Healthcare. Faith. Community.
                </p>
              </div>
              <p>
                <strong>ShifaCare</strong> is a purpose-built Muslim healthcare mobile ecosystem designed to connect patients and families with verified Muslim doctors and healthcare specialists across Indian metropolitan hubs.
              </p>
              <p>
                From female Muslim gynecologists offering modest, culturally empathetic care, to faith-aligned clinical advice for chronic conditions during Ramadan and Hajj, ShifaCare bridges modern clinical excellence with Islamic ethics.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SUPPORT MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Help & Patient Support</h3>
              <button onClick={() => setShowSupportModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Toll-Free Patient Helpline</span>
                <p className="font-bold text-[#12302D] mt-0.5">1800-889-SHIFA (74432)</p>
                <span className="text-[10px] text-[#0F766E]">Available 24x7</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Email Inquiries</span>
                <p className="font-bold text-[#12302D] mt-0.5">support@shifacare.org</p>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-teal-900">
                <span className="font-bold block">Need doctor onboarding?</span>
                <p className="text-[11px] mt-0.5">Doctors wishing to verify credentials can write to credentials@shifacare.org.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
