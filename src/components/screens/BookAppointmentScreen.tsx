import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Video, 
  Building, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Doctor, FamilyMember } from '../../types';

interface BookAppointmentScreenProps {
  doctor: Doctor;
  familyMembers: FamilyMember[];
  onBack: () => void;
  onProceedToConfirm: (bookingDetails: {
    doctor: Doctor;
    consultationType: 'Online Consultation' | 'Clinic Visit';
    date: string;
    time: string;
    patient: FamilyMember;
  }) => void;
}

export const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({
  doctor,
  familyMembers,
  onBack,
  onProceedToConfirm
}) => {
  // Available consultation types
  const defaultType = doctor.consultationTypes.includes('online') ? 'Online Consultation' : 'Clinic Visit';
  const [consultationType, setConsultationType] = useState<'Online Consultation' | 'Clinic Visit'>(defaultType);

  // Date selection
  const dates = [
    { label: 'Today', date: '22 Sep' },
    { label: 'Tomorrow', date: '23 Sep' },
    { label: 'Wed', date: '24 Sep' },
    { label: 'Thu', date: '25 Sep' },
    { label: 'Fri', date: '26 Sep' }
  ];
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 23 Sep');

  // Time slots
  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '04:30 PM', available: true },
    { time: '05:00 PM', available: true },
    { time: '05:30 PM', available: false },
    { time: '06:00 PM', available: true }
  ];
  const [selectedTime, setSelectedTime] = useState('10:30 AM');

  // Patient selector
  const [selectedPatientId, setSelectedPatientId] = useState(familyMembers[0]?.id || 'fam-1');
  const selectedPatient = familyMembers.find(f => f.id === selectedPatientId) || familyMembers[0];

  const handleContinue = () => {
    onProceedToConfirm({
      doctor,
      consultationType,
      date: selectedDate,
      time: selectedTime,
      patient: selectedPatient
    });
  };

  return (
    <div id="book-appointment-screen" className="pb-28 pt-2 px-4 max-w-lg mx-auto w-full min-w-0 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          id="book-apt-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-[#12302D] truncate">Book Appointment</h1>
          <p className="text-xs text-slate-500 truncate">Step 1 of 2: Select Date & Time</p>
        </div>
      </div>

      {/* Doctor Summary Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-center gap-3.5">
        <div className="relative shrink-0">
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-100"
          />
          {doctor.isVerified && (
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0F766E] text-white ring-2 ring-white">
              <ShieldCheck className="w-3 h-3" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
            {doctor.specialty}
          </span>
          <h2 className="text-sm font-bold text-[#12302D] truncate mt-0.5">
            {doctor.name}
          </h2>
          <p className="text-[11px] text-slate-500 truncate">
            {doctor.clinic.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-bold text-[#12302D] block">
            ₹{doctor.fee}
          </span>
          <span className="text-[10px] text-slate-400">per visit</span>
        </div>
      </div>

      {/* Consultation Type Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-[#12302D]">
          Select Consultation Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            id="type-online-btn"
            disabled={!doctor.consultationTypes.includes('online')}
            onClick={() => setConsultationType('Online Consultation')}
            className={`p-3 rounded-xl border flex flex-col items-start text-left transition-all ${
              consultationType === 'Online Consultation'
                ? 'bg-teal-50/70 border-[#0F766E] ring-1 ring-[#0F766E]'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            } ${!doctor.consultationTypes.includes('online') ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <Video className={`w-4 h-4 ${consultationType === 'Online Consultation' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
              {consultationType === 'Online Consultation' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
              )}
            </div>
            <span className="text-xs font-bold text-[#12302D]">Online Video</span>
            <span className="text-[10px] text-slate-500">In-app teleconsult</span>
          </button>

          <button
            type="button"
            id="type-clinic-btn"
            disabled={!doctor.consultationTypes.includes('clinic')}
            onClick={() => setConsultationType('Clinic Visit')}
            className={`p-3 rounded-xl border flex flex-col items-start text-left transition-all ${
              consultationType === 'Clinic Visit'
                ? 'bg-teal-50/70 border-[#0F766E] ring-1 ring-[#0F766E]'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            } ${!doctor.consultationTypes.includes('clinic') ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <Building className={`w-4 h-4 ${consultationType === 'Clinic Visit' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
              {consultationType === 'Clinic Visit' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
              )}
            </div>
            <span className="text-xs font-bold text-[#12302D]">Clinic Visit</span>
            <span className="text-[10px] text-slate-500">In-person at clinic</span>
          </button>
        </div>
      </div>

      {/* Select Patient Profile */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#12302D]">
            Appointment For (Patient)
          </label>
          <span className="text-[11px] font-semibold text-[#0F766E]">
            {selectedPatient.relation}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 no-scrollbar w-full max-w-full">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              type="button"
              id={`patient-btn-${member.id}`}
              onClick={() => setSelectedPatientId(member.id)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 shrink-0 transition-all ${
                selectedPatientId === member.id
                  ? 'bg-teal-50 border-[#0F766E] ring-1 ring-[#0F766E]'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <img
                src={member.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                alt={member.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-[#12302D] truncate max-w-[80px]">
                  {member.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-slate-500">{member.relation}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-[#12302D]">
          Select Date
        </label>
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
          {dates.map((d) => {
            const fullDateString = `${d.label}, ${d.date}`;
            const isSelected = selectedDate.includes(d.date);
            return (
              <button
                key={d.date}
                type="button"
                id={`date-btn-${d.date}`}
                onClick={() => setSelectedDate(fullDateString)}
                className={`py-2 px-0.5 sm:px-1 rounded-xl text-center flex flex-col items-center justify-center border transition-all min-w-0 ${
                  isSelected
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-medium truncate w-full ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                  {d.label}
                </span>
                <span className="text-[11px] sm:text-xs font-bold mt-0.5 truncate w-full">
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selection Grid */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#12302D]">
            Available Time Slots
          </label>
          <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> Booked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time && slot.available;
            return (
              <button
                key={slot.time}
                type="button"
                id={`slot-btn-${slot.time.replace(/[: ]/g, '-')}`}
                disabled={!slot.available}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                className={`py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                  isSelected
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                    : slot.available
                    ? 'bg-teal-50/50 text-[#0F766E] border-teal-200/70 hover:bg-teal-100/50'
                    : 'bg-slate-100 text-slate-400 border-slate-200/80 cursor-not-allowed opacity-50 line-through'
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-4 pb-[env(safe-area-inset-bottom,16px)] shadow-lg w-full">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3 w-full min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider truncate">
              Selected Time
            </span>
            <span className="text-xs font-extrabold text-[#12302D] block truncate">
              {selectedDate.split(',')[0]} • {selectedTime}
            </span>
          </div>

          <button
            type="button"
            id="book-continue-btn"
            onClick={handleContinue}
            className="flex-1 py-3.5 px-4 sm:px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/15 flex items-center justify-center gap-2 active:scale-95 transition-all text-center shrink-0"
          >
            <span>Review & Pay</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
