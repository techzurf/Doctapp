import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Doctor, FamilyMember, Appointment } from '../../types';

interface BookingConfirmationScreenProps {
  bookingData: {
    doctor: Doctor;
    consultationType: 'Online Consultation' | 'Clinic Visit';
    date: string;
    time: string;
    patient: FamilyMember;
  };
  onBack: () => void;
  onBookingConfirmed: (newAppointment: Appointment) => void;
  onViewAppointment: (appointment: Appointment) => void;
  onGoHome: () => void;
}

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  bookingData,
  onBack,
  onBookingConfirmed,
  onViewAppointment,
  onGoHome
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'clinic'>('upi');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  const handleConfirm = () => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: bookingData.doctor.id,
      doctorName: bookingData.doctor.name,
      doctorSpecialty: bookingData.doctor.specialty,
      doctorPhoto: bookingData.doctor.photoUrl,
      doctorDegrees: bookingData.doctor.degrees,
      doctorClinic: bookingData.doctor.clinic.name,
      patientId: bookingData.patient.id,
      patientName: bookingData.patient.name,
      relation: bookingData.patient.relation,
      date: bookingData.date,
      time: bookingData.time,
      consultationType: bookingData.consultationType,
      status: 'upcoming',
      fee: bookingData.doctor.fee,
      paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Pay at Clinic Counter',
      meetingLink: bookingData.consultationType === 'Online Consultation' ? `https://telehealth.shifacare.com/room/${Date.now()}` : undefined
    };

    setCreatedAppointment(newApt);
    onBookingConfirmed(newApt);
    setIsConfirmed(true);
  };

  // SUCCESS SCREEN
  if (isConfirmed && createdAppointment) {
    return (
      <div id="booking-success-screen" className="fixed inset-0 z-50 bg-[#F7FAF9] flex flex-col justify-between p-5 sm:p-6 max-w-lg mx-auto w-full min-w-0 safe-top safe-bottom overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto w-full min-w-0">
          {/* Animated Green Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-5 shadow-lg shadow-emerald-500/10 animate-in zoom-in duration-500 shrink-0">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider mb-1">
            Alhamdulillah • Booking Confirmed
          </span>
          <h1 className="text-2xl font-extrabold text-[#12302D] tracking-tight mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-xs text-[#64748B] max-w-xs mb-6">
            Your appointment has been successfully booked. You will receive an SMS and in-app reminder.
          </p>

          {/* Details Card */}
          <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-left space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img
                src={createdAppointment.doctorPhoto}
                alt={createdAppointment.doctorName}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-[#12302D] truncate">{createdAppointment.doctorName}</h3>
                <p className="text-[11px] text-[#0F766E] font-medium truncate">{createdAppointment.doctorSpecialty}</p>
                <p className="text-[10px] text-slate-500 truncate">{createdAppointment.consultationType}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 min-w-0">
                <span className="text-[10px] text-slate-400 block font-medium truncate">Date & Time</span>
                <span className="font-bold text-[#12302D] mt-0.5 block truncate">{createdAppointment.date}</span>
                <span className="text-[11px] text-[#0F766E] font-semibold truncate block">{createdAppointment.time}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 min-w-0">
                <span className="text-[10px] text-slate-400 block font-medium truncate">Patient</span>
                <span className="font-bold text-[#12302D] mt-0.5 block truncate">{createdAppointment.patientName}</span>
                <span className="text-[11px] text-slate-500 font-medium truncate block">({createdAppointment.relation})</span>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-slate-500 flex justify-between items-center">
              <span>Amount Paid</span>
              <strong className="text-xs font-extrabold text-[#12302D]">₹{createdAppointment.fee}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-4 shrink-0">
          <button
            type="button"
            id="view-booked-appointment-btn"
            onClick={() => onViewAppointment(createdAppointment)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/15 flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
          >
            <span>View Appointment</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            id="back-home-after-booking-btn"
            onClick={onGoHome}
            className="w-full py-3 px-6 rounded-2xl bg-white border border-slate-200 text-[#12302D] text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all text-center"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // REVIEW & PAYMENT CONFIRMATION SCREEN
  return (
    <div id="booking-confirmation-screen" className="pb-28 pt-2 px-4 max-w-lg mx-auto w-full min-w-0 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          id="confirm-apt-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-[#12302D] truncate">Confirm Appointment</h1>
          <p className="text-xs text-slate-500 truncate">Step 2 of 2: Review & Payment</p>
        </div>
      </div>

      {/* Appointment Summary Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Booking Details
        </h2>

        <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
          <img
            src={bookingData.doctor.photoUrl}
            alt={bookingData.doctor.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
                {bookingData.doctor.specialty}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#12302D] mt-1 truncate">
              {bookingData.doctor.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              {bookingData.doctor.clinic.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Date</span>
              <strong className="text-[#12302D]">{bookingData.date}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Time Slot</span>
              <strong className="text-[#12302D]">{bookingData.time}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            {bookingData.consultationType === 'Online Consultation' ? (
              <Video className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            ) : (
              <Building className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            )}
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Mode</span>
              <strong className="text-[#12302D]">{bookingData.consultationType}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <User className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Patient</span>
              <strong className="text-[#12302D] truncate block">{bookingData.patient.name}</strong>
              <span className="text-[10px] text-slate-400">({bookingData.patient.relation})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Payment Method
        </h2>

        <div className="space-y-2">
          <label
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === 'upi'
                ? 'bg-teal-50/70 border-[#0F766E] ring-1 ring-[#0F766E]'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                UPI
              </div>
              <div>
                <p className="text-xs font-bold text-[#12302D]">Instant UPI Payment</p>
                <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentMethod === 'upi' ? 'border-[#0F766E] bg-[#0F766E]' : 'border-slate-300'
            }`}>
              {paymentMethod === 'upi' && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </label>

          <label
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === 'card'
                ? 'bg-teal-50/70 border-[#0F766E] ring-1 ring-[#0F766E]'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#12302D]">Debit / Credit Card</p>
                <p className="text-[10px] text-slate-500">Visa, MasterCard, RuPay</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentMethod === 'card' ? 'border-[#0F766E] bg-[#0F766E]' : 'border-slate-300'
            }`}>
              {paymentMethod === 'card' && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </label>

          {bookingData.consultationType === 'Clinic Visit' && (
            <label
              onClick={() => setPaymentMethod('clinic')}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'clinic'
                  ? 'bg-teal-50/70 border-[#0F766E] ring-1 ring-[#0F766E]'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12302D]">Pay at Clinic</p>
                  <p className="text-[10px] text-slate-500">Pay cash or card on arrival</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                paymentMethod === 'clinic' ? 'border-[#0F766E] bg-[#0F766E]' : 'border-slate-300'
              }`}>
                {paymentMethod === 'clinic' && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
            </label>
          )}
        </div>
      </div>

      {/* Bill Breakdown Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Payment Breakdown
        </h2>
        <div className="flex justify-between text-slate-600">
          <span>Doctor Consultation Fee</span>
          <span>₹{bookingData.doctor.fee}</span>
        </div>
        <div className="flex justify-between text-slate-600 gap-2">
          <span className="truncate">ShifaCare Platform Fee</span>
          <span className="text-emerald-600 font-semibold shrink-0">FREE</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Taxes & GST</span>
          <span>₹0</span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-[#12302D]">
          <span>Total Payable</span>
          <span className="text-[#0F766E] text-base">₹{bookingData.doctor.fee}</span>
        </div>
      </div>

      {/* Sticky Bottom Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-4 pb-[env(safe-area-inset-bottom,16px)] shadow-lg w-full">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3 w-full min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider truncate">
              Total Fee
            </span>
            <span className="text-base font-extrabold text-[#12302D] block truncate">
              ₹{bookingData.doctor.fee}
            </span>
          </div>

          <button
            type="button"
            id="confirm-appointment-submit-btn"
            onClick={handleConfirm}
            className="flex-1 py-3.5 px-4 sm:px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/15 active:scale-95 transition-all text-center shrink-0"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
