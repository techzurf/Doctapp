import React from 'react';
import { 
  Bell, 
  Search, 
  UserCheck, 
  CalendarPlus, 
  CalendarCheck, 
  FileText, 
  Star, 
  ChevronRight, 
  MapPin, 
  Plus, 
  Sparkles, 
  Moon, 
  HeartHandshake, 
  Video, 
  Clock, 
  ShieldCheck,
  Heart 
} from 'lucide-react';
import { Doctor, FamilyMember, Appointment } from '../../types';

export interface HomeScreenProps {
  userName?: string;
  doctors: Doctor[];
  familyMembers: FamilyMember[];
  appointments?: Appointment[];
  upcomingAppointment?: Appointment;
  onNavigateDoctors?: () => void;
  onNavigateAppointments?: () => void;
  onNavigateRecords?: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onQuickBookDoctor?: (doctor: Doctor) => void;
  onBookDoctor?: (doctor: Doctor) => void;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  onSearch?: (query: string) => void;
  onOpenWellness?: (topic?: string) => void;
  onNavigateToDuas?: () => void;
  onNavigateToFamily?: () => void;
  onNavigateToRamadan?: () => void;
  onNavigateToHajj?: () => void;
  onNavigateToHealthRecords?: () => void;
  onNavigateToIslamicWellness?: () => void;
  onJoinConsultation?: (appointment: Appointment) => void;
  onViewAllDoctors?: () => void;
  onSelectSpecialty?: (specialty: string) => void;
  onOpenFamilyMember?: (member: FamilyMember) => void;
  onAddFamilyMember?: () => void;
  onViewAppointment?: (appointment: Appointment) => void;
  onToggleSaveDoctor?: (doctor: Doctor) => void;
  savedDoctorIds?: string[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Ahmed Farooq',
  doctors,
  familyMembers,
  appointments,
  upcomingAppointment,
  onNavigateDoctors,
  onNavigateAppointments,
  onNavigateRecords,
  onSelectDoctor,
  onQuickBookDoctor,
  onBookDoctor,
  onOpenNotifications,
  onOpenSearch,
  onSearch,
  onOpenWellness,
  onNavigateToDuas,
  onNavigateToFamily,
  onNavigateToRamadan,
  onNavigateToHajj,
  onNavigateToHealthRecords,
  onNavigateToIslamicWellness,
  onJoinConsultation,
  onViewAllDoctors,
  onSelectSpecialty,
  onOpenFamilyMember = () => {},
  onAddFamilyMember = () => {},
  onViewAppointment = () => {},
  onToggleSaveDoctor,
  savedDoctorIds = []
}) => {
  const resolvedUpcoming = upcomingAppointment || appointments?.find(a => a.status === 'upcoming');
  const handleDoctorsNav = onNavigateDoctors || onViewAllDoctors || (() => {});
  const handleAptsNav = onNavigateAppointments || (() => {});
  const handleRecordsNav = onNavigateRecords || onNavigateToHealthRecords || (() => {});
  const handleSearchNav = onOpenSearch || (() => onSearch?.(''));
  const handleBook = onQuickBookDoctor || onBookDoctor || onSelectDoctor;

  const handleWellnessClick = (topic?: string) => {
    if (topic === 'duas' && onNavigateToDuas) {
      onNavigateToDuas();
    } else if (topic === 'ramadan' && onNavigateToRamadan) {
      onNavigateToRamadan();
    } else if (topic === 'hajj' && onNavigateToHajj) {
      onNavigateToHajj();
    } else if (onNavigateToIslamicWellness) {
      onNavigateToIslamicWellness();
    } else if (onOpenWellness) {
      onOpenWellness(topic);
    } else if (onNavigateToDuas) {
      onNavigateToDuas();
    }
  };
  return (
    <div id="home-screen" className="pb-24 pt-3 px-4 space-y-6 max-w-lg mx-auto w-full min-w-0">
      {/* Top Bar: Assalamu Alaikum & Notifications */}
      <div className="flex items-center justify-between pt-2 gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F766E]">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse shrink-0" />
            <span className="tracking-wide truncate">ShifaCare Healthcare</span>
          </div>
          <h1 className="text-xl font-bold text-[#12302D] tracking-tight mt-0.5 truncate">
            Assalamu Alaikum, {userName.split(' ')[0]}
          </h1>
          <p className="text-xs text-[#64748B] truncate">How can we help you today?</p>
        </div>

        <button
          type="button"
          id="home-notifications-btn"
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 active:scale-95 transition-all shrink-0"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-[#0F766E]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
      </div>

      {/* Global Search Bar */}
      <div
        id="home-search-trigger"
        onClick={handleSearchNav}
        className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-sm text-slate-400 hover:border-[#0F766E]/40 cursor-pointer active:scale-[0.99] transition-all w-full"
      >
        <Search className="w-4 h-4 text-[#0F766E] shrink-0" />
        <span className="text-xs font-medium text-slate-500 truncate">
          Search doctors, specialties or clinics
        </span>
      </div>

      {/* Upcoming Appointment Banner (if present) */}
      {resolvedUpcoming && (
        <div
          id="home-upcoming-banner"
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#0D655E] text-white p-4 shadow-md border border-[#14B8A6]/30"
        >
          {/* Subtle gold accent pill */}
          <div className="flex items-center justify-between mb-2.5 gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-semibold text-teal-100 shrink-0">
              <Clock className="w-3 h-3 text-[#C9A227]" />
              Upcoming Appointment
            </span>
            <span className="text-[11px] font-medium text-teal-200 flex items-center gap-1 shrink-0">
              {resolvedUpcoming.consultationType === 'Online Consultation' ? (
                <>
                  <Video className="w-3 h-3 text-[#14B8A6]" />
                  Online
                </>
              ) : (
                <>
                  <MapPin className="w-3 h-3 text-[#14B8A6]" />
                  Clinic
                </>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={resolvedUpcoming.doctorPhoto}
                alt={resolvedUpcoming.doctorName}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#C9A227] tracking-wide truncate">
                  {resolvedUpcoming.date} • {resolvedUpcoming.time}
                </p>
                <h2 className="text-sm font-bold text-white truncate">
                  {resolvedUpcoming.doctorName}
                </h2>
                <p className="text-[11px] text-teal-100 truncate">
                  {resolvedUpcoming.doctorSpecialty} • For {resolvedUpcoming.patientName}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="home-view-appointment-btn"
              onClick={() => onViewAppointment(resolvedUpcoming)}
              className="px-3 py-2 rounded-xl bg-white text-[#0F766E] hover:bg-teal-50 text-xs font-bold shadow-sm shrink-0 active:scale-95 transition-all"
            >
              View
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Cards */}
      <div className="w-full">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
          <button
            type="button"
            id="quick-find-doctor"
            onClick={handleDoctorsNav}
            className="flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 active:scale-95 transition-all text-center min-w-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E] mb-1.5 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#12302D] leading-tight truncate w-full">
              Find Doctor
            </span>
          </button>

          <button
            type="button"
            id="quick-book-apt"
            onClick={handleDoctorsNav}
            className="flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 active:scale-95 transition-all text-center min-w-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227] mb-1.5 shrink-0">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#12302D] leading-tight truncate w-full">
              Book Visit
            </span>
          </button>

          <button
            type="button"
            id="quick-my-apts"
            onClick={handleAptsNav}
            className="flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 active:scale-95 transition-all text-center min-w-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5 shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#12302D] leading-tight truncate w-full">
              Bookings
            </span>
          </button>

          <button
            type="button"
            id="quick-records"
            onClick={handleRecordsNav}
            className="flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 active:scale-95 transition-all text-center min-w-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-1.5 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#12302D] leading-tight truncate w-full">
              Medical Rx
            </span>
          </button>
        </div>
      </div>

      {/* Recommended / Nearby Doctors Carousel */}
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#12302D] tracking-tight">
              Recommended Doctors
            </h2>
            <p className="text-[11px] text-[#64748B]">Verified Muslim medical specialists</p>
          </div>
          <button
            type="button"
            id="home-view-all-doctors-btn"
            onClick={handleDoctorsNav}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar w-full max-w-full">
          {doctors.slice(0, 4).map((doctor) => (
            <div
              key={doctor.id}
              id={`doctor-card-${doctor.id}`}
              onClick={() => onSelectDoctor(doctor)}
              className="w-[230px] sm:w-[240px] max-w-[80vw] bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 flex flex-col justify-between shrink-0 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-100"
                    />
                    {doctor.isVerified && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0F766E] text-white">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#12302D] truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-[11px] text-[#0F766E] font-medium truncate">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                      <span className="font-semibold text-slate-700">{doctor.rating}</span>
                      <span>({doctor.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{doctor.experienceYears} yrs exp</span>
                  <span className="flex items-center gap-0.5 truncate max-w-[110px]">
                    <MapPin className="w-3 h-3 text-[#0F766E] shrink-0" />
                    <span className="truncate">{doctor.city}</span>
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                <span className="text-xs font-bold text-[#12302D] shrink-0">
                  ₹{doctor.fee}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleSaveDoctor && (
                    <button
                      type="button"
                      id={`home-save-doctor-btn-${doctor.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveDoctor(doctor);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                      aria-label="Save doctor"
                    >
                      <Heart className={`w-3.5 h-3.5 ${savedDoctorIds.includes(doctor.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  )}
                  <button
                    type="button"
                    id={`quick-book-btn-${doctor.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(doctor);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health for Your Family Section */}
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#12302D] tracking-tight">
              Health for Your Family
            </h2>
            <p className="text-[11px] text-[#64748B]">Manage records & appointments</p>
          </div>
          <button
            type="button"
            id="home-add-family-btn"
            onClick={onAddFamilyMember}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar w-full max-w-full">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              id={`family-card-${member.id}`}
              onClick={() => onOpenFamilyMember(member)}
              className="w-[120px] sm:w-[125px] bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm flex flex-col items-center text-center shrink-0 cursor-pointer hover:border-[#0F766E]/40 active:scale-95 transition-all"
            >
              <div className="relative mb-2 shrink-0">
                <img
                  src={member.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                />
                <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded-full bg-[#0F766E] text-white text-[9px] font-bold">
                  {member.bloodGroup.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#12302D] truncate w-full">
                {member.name.split(' ')[0]}
              </h3>
              <span className="text-[10px] text-slate-500 font-medium truncate w-full">
                {member.relation} • {member.age}y
              </span>
            </div>
          ))}

          {/* Add member card */}
          <button
            type="button"
            id="home-add-member-card"
            onClick={onAddFamilyMember}
            className="w-[100px] bg-teal-50/70 border border-dashed border-[#14B8A6] rounded-2xl p-3 flex flex-col items-center justify-center text-center shrink-0 hover:bg-teal-50 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-white text-[#0F766E] flex items-center justify-center shadow-sm mb-1.5">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#0F766E]">Add Member</span>
          </button>
        </div>
      </div>

      {/* Islamic Wellness Section */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#12302D] tracking-tight">
              Islamic Wellness
            </h2>
            <p className="text-[11px] text-[#64748B]">Authentic health traditions & faith guidance</p>
          </div>
          <button
            type="button"
            id="home-wellness-hub-btn"
            onClick={() => handleWellnessClick()}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center"
          >
            <span>Explore</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
          <button
            type="button"
            id="wellness-card-duas"
            onClick={() => handleWellnessClick('duas')}
            className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/60 shadow-sm flex flex-col items-start text-left active:scale-95 transition-all min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0F766E] text-white flex items-center justify-center mb-2 shadow-sm shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227]" />
            </div>
            <h3 className="text-[11px] sm:text-xs font-bold text-[#12302D] truncate w-full">Duas for Shifa</h3>
            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 line-clamp-2">
              Sunnah prayers for healing
            </p>
          </button>

          <button
            type="button"
            id="wellness-card-ramadan"
            onClick={() => handleWellnessClick('ramadan')}
            className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/60 shadow-sm flex flex-col items-start text-left active:scale-95 transition-all min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#C9A227] text-white flex items-center justify-center mb-2 shadow-sm shrink-0">
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <h3 className="text-[11px] sm:text-xs font-bold text-[#12302D] truncate w-full">Ramadan Care</h3>
            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 line-clamp-2">
              Hydration & fasting meds
            </p>
          </button>

          <button
            type="button"
            id="wellness-card-daily"
            onClick={() => handleWellnessClick('hajj')}
            className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50/40 border border-teal-200/60 shadow-sm flex flex-col items-start text-left active:scale-95 transition-all min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#14B8A6] text-white flex items-center justify-center mb-2 shadow-sm shrink-0">
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <h3 className="text-[11px] sm:text-xs font-bold text-[#12302D] truncate w-full">Hajj & Umrah</h3>
            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 line-clamp-2">
              Vaccines & health prep
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
