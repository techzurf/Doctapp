import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Award, 
  Languages, 
  CheckCircle2, 
  Video, 
  Building, 
  Heart, 
  Share2 
} from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorProfileScreenProps {
  doctor: Doctor;
  onBack: () => void;
  onBook: (doctor: Doctor) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export const DoctorProfileScreen: React.FC<DoctorProfileScreenProps> = ({
  doctor,
  onBack,
  onBook,
  isSaved = false,
  onToggleSave,
  onShare
}) => {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

  return (
    <div id="doctor-profile-screen" className="pb-28 pt-2 px-4 max-w-lg mx-auto space-y-5">
      {/* Top Navigation */}
      <div className="flex items-center justify-between py-2">
        <button
          type="button"
          id="doctor-profile-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {onShare && (
            <button
              type="button"
              id="share-doctor-btn"
              onClick={onShare}
              className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
              aria-label="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
          {onToggleSave && (
            <button
              type="button"
              id="save-doctor-btn"
              onClick={onToggleSave}
              className={`p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-colors ${
                isSaved ? 'text-rose-500 fill-rose-500' : 'text-[#12302D] hover:bg-slate-50'
              }`}
              aria-label="Save doctor"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Doctor Hero Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#0F766E]/20"
            />
            {doctor.isVerified && (
              <span className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-[#0F766E] text-white ring-2 ring-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#0F766E] text-[10px] font-bold">
                ✓ Verified Muslim Practitioner
              </span>
            </div>
            <h1 className="text-base font-extrabold text-[#12302D] tracking-tight">
              {doctor.name}
            </h1>
            <p className="text-xs text-[#0F766E] font-medium">
              {doctor.degrees}
            </p>
            <p className="text-xs font-bold text-slate-700">
              {doctor.specialty}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
              {doctor.location}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
          <div className="p-2 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-500 font-semibold block">Rating</span>
            <span className="text-xs font-bold text-[#12302D] flex items-center justify-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {doctor.rating}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-500 font-semibold block">Experience</span>
            <span className="text-xs font-bold text-[#12302D] block mt-0.5">
              {doctor.experienceYears} Years
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50">
            <span className="text-[10px] text-slate-500 font-semibold block">Reviews</span>
            <span className="text-xs font-bold text-[#12302D] block mt-0.5">
              {doctor.reviewCount}
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          About Doctor
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          {doctor.about}
        </p>
        <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
          <Award className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Reg No: <strong className="text-slate-700">{doctor.registrationNo}</strong></span>
        </div>
      </div>

      {/* Consultation Options */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Available Consultation Types
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {doctor.consultationTypes.includes('online') && (
            <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200/70 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#12302D]">Online Video</p>
                <p className="text-[10px] text-slate-500">In-app teleconsult</p>
              </div>
            </div>
          )}

          {doctor.consultationTypes.includes('clinic') && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#12302D]">Clinic Visit</p>
                <p className="text-[10px] text-slate-500">In-person checkup</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Languages & Education */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#12302D]">
            <Languages className="w-4 h-4 text-[#0F766E]" />
            <span>Languages</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {doctor.languages.map((lang) => (
              <span key={lang} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#12302D]">
            <Award className="w-4 h-4 text-[#C9A227]" />
            <span>Credentials</span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-3">
            {doctor.education[0]}
          </p>
        </div>
      </div>

      {/* Clinic Details */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Clinic Details
          </h2>
          <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-full">
            Primary Practice
          </span>
        </div>
        <h3 className="text-xs font-bold text-[#12302D]">
          {doctor.clinic.name}
        </h3>
        <p className="text-xs text-slate-600 flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
          <span>{doctor.clinic.address}</span>
        </p>
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{doctor.clinic.timings}</span>
        </p>
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{doctor.clinic.phone}</span>
        </p>
      </div>

      {/* Available Slots Preview */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Upcoming Slot Preview
          </h2>
          <span className="text-[11px] font-semibold text-[#0F766E]">
            {doctor.timeSlots[0]?.date || 'Today'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {doctor.timeSlots[0]?.slots.slice(0, 6).map((slot, idx) => (
            <div
              key={idx}
              className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border ${
                slot.available
                  ? 'bg-teal-50/50 text-[#0F766E] border-teal-200/60'
                  : 'bg-slate-50 text-slate-300 border-slate-100 line-through'
              }`}
            >
              {slot.time}
            </div>
          ))}
        </div>
      </div>

      {/* Patient Reviews Section */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Patient Feedback ({doctor.reviews.length})
          </h2>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{doctor.rating} Rating</span>
          </div>
        </div>

        {doctor.reviews.map((rev) => (
          <div key={rev.id} className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#12302D]">{rev.patientName}</span>
              <span className="text-[10px] text-slate-400">{rev.date}</span>
            </div>
            <p className="text-xs text-slate-600 italic">
              “{rev.comment}”
            </p>
          </div>
        ))}
      </div>

      {/* STICKY BOTTOM BAR WITH FEE AND CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-4 pb-[env(safe-area-inset-bottom,16px)] shadow-lg">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              Consultation Fee
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#12302D]">
                ₹{doctor.fee}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">/ session</span>
            </div>
          </div>

          <button
            type="button"
            id="profile-sticky-book-btn"
            onClick={() => onBook(doctor)}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/15 active:scale-95 transition-all text-center"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
