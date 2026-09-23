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
  X,
  Calendar,
  Lock,
  Edit2
} from 'lucide-react';
import { FamilyMember } from '../../types';

interface ProfileScreenProps {
  onNavigateToFamily: () => void;
  onNavigateToRecords: () => void;
  onNavigateToAppointments?: () => void;
  onNavigateToSavedDoctors: () => void;
  onNavigateToIslamicWellness: () => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToFamily,
  onNavigateToRecords,
  onNavigateToAppointments,
  onNavigateToSavedDoctors,
  onNavigateToIslamicWellness,
  onOpenNotifications,
  onLogout
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Tamil (தமிழ்)' | 'Urdu (اردو)' | 'Hindi (हिंदी)'>('English');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Ahmed Farooq',
    phone: '+91 98765 43210',
    email: 'ahmed.farooq@example.com',
    bloodGroup: 'B+ Positive',
    city: 'Chennai, India'
  });

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editBloodGroup, setEditBloodGroup] = useState(userProfile.bloodGroup);
  const [editCity, setEditCity] = useState(userProfile.city);

  // Security Toggles
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

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
              alt={userProfile.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0F766E]/20"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0F766E] text-white ring-2 ring-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#12302D] truncate">
                {userProfile.name}
              </h2>
              <button
                type="button"
                id="edit-profile-btn"
                onClick={() => {
                  setEditName(userProfile.name);
                  setEditPhone(userProfile.phone);
                  setEditEmail(userProfile.email);
                  setEditBloodGroup(userProfile.bloodGroup);
                  setEditCity(userProfile.city);
                  setShowEditProfileModal(true);
                }}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                title="Edit Personal Information"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-[#0F766E]" />
              {userProfile.phone}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
              <Mail className="w-3 h-3 text-[#0F766E]" />
              {userProfile.email}
            </p>
          </div>
        </div>

        {/* Quick Vitals Row */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Blood Group</span>
            <span className="font-bold text-[#12302D] mt-0.5 block">{userProfile.bloodGroup}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">City</span>
            <span className="font-bold text-[#12302D] mt-0.5 block">{userProfile.city}</span>
          </div>
        </div>
      </div>

      {/* Menu Section 1: Health & Family */}
      <div className="bg-white rounded-3xl p-2 border border-slate-200/80 shadow-sm divide-y divide-slate-100">
        {onNavigateToAppointments && (
          <button
            type="button"
            id="profile-appointments-btn"
            onClick={onNavigateToAppointments}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#12302D]">My Appointments</p>
                <p className="text-[11px] text-slate-500">Upcoming visits & consultation history</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        )}

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
          id="profile-privacy-btn"
          onClick={() => setShowPrivacyModal(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#12302D]">Privacy & Security</p>
              <p className="text-[11px] text-slate-500">Biometrics, data encryption & terms</p>
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

      {/* EDIT PROFILE MODAL */}
      {showEditProfileModal && (
        <div 
          onClick={() => setShowEditProfileModal(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Edit Personal Information</h3>
              <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUserProfile({
                  name: editName.trim() || userProfile.name,
                  phone: editPhone.trim() || userProfile.phone,
                  email: editEmail.trim() || userProfile.email,
                  bloodGroup: editBloodGroup,
                  city: editCity.trim() || userProfile.city
                });
                setShowEditProfileModal(false);
                showToast('Personal information updated successfully!');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#12302D] mb-1">Blood Group</label>
                  <select
                    value={editBloodGroup}
                    onChange={(e) => setEditBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                  >
                    <option value="A+ Positive">A+ Positive</option>
                    <option value="B+ Positive">B+ Positive</option>
                    <option value="O+ Positive">O+ Positive</option>
                    <option value="AB+ Positive">AB+ Positive</option>
                    <option value="A- Negative">A- Negative</option>
                    <option value="B- Negative">B- Negative</option>
                    <option value="O- Negative">O- Negative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12302D] mb-1">City</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRIVACY & SECURITY MODAL */}
      {showPrivacyModal && (
        <div 
          onClick={() => setShowPrivacyModal(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0F766E]" />
                <h3 className="text-sm font-bold text-[#12302D]">Privacy & Data Security</h3>
              </div>
              <button onClick={() => setShowPrivacyModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-[#12302D] block">Biometric Authentication</span>
                  <span className="text-[10px] text-slate-500">Require Touch ID / Face ID to unlock</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBiometricEnabled(!biometricEnabled);
                    showToast(biometricEnabled ? 'Biometrics disabled' : 'Biometrics enabled');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${biometricEnabled ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${biometricEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-[#12302D] block">Two-Factor OTP Security</span>
                  <span className="text-[10px] text-slate-500">SMS OTP for new session sign-ins</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    showToast(twoFactorEnabled ? '2FA disabled' : '2FA enabled');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${twoFactorEnabled ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-[#12302D]">
                <span className="font-bold block flex items-center gap-1.5 text-[#0F766E]">
                  <ShieldCheck className="w-4 h-4" />
                  Islamic Medical Oath & HIPAA Compliance
                </span>
                <p className="text-[11px] text-slate-600 mt-1">
                  All medical consultations, diagnoses, and personal family records are end-to-end encrypted with zero third-party commercial tracking.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('Local offline cache cleared successfully');
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs"
              >
                Clear Local Cached Files
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Floating feedback toast */}
      {feedbackToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#12302D] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}
    </div>
  );
};
