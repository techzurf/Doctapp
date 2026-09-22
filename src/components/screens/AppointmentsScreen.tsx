import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  ChevronRight, 
  RotateCcw, 
  X, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall
} from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentsScreenProps {
  appointments: Appointment[];
  onJoinConsultation: (appointment: Appointment) => void;
  onViewPrescription: (prescriptionId?: string) => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
  onCancelAppointment: (appointmentId: string, reason: string) => void;
  onBookNew: () => void;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  appointments,
  onJoinConsultation,
  onViewPrescription,
  onReschedule,
  onCancelAppointment,
  onBookNew
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  // Reschedule Modal State
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('25 Sep');
  const [rescheduleTime, setRescheduleTime] = useState('11:00 AM');

  // Cancel Modal State
  const [cancellingApt, setCancellingApt] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const filteredAppointments = appointments.filter(a => a.status === activeTab);

  const handleConfirmReschedule = () => {
    if (reschedulingApt) {
      onReschedule(reschedulingApt.id, rescheduleDate, rescheduleTime);
      setReschedulingApt(null);
    }
  };

  const handleConfirmCancel = () => {
    if (cancellingApt) {
      onCancelAppointment(cancellingApt.id, cancelReason);
      setCancellingApt(null);
    }
  };

  return (
    <div id="appointments-screen" className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#12302D] tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs text-[#64748B]">Manage doctor consultations</p>
        </div>

        <button
          type="button"
          id="apts-book-new-btn"
          onClick={onBookNew}
          className="px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-bold text-[#0F766E] hover:bg-teal-100 transition-colors"
        >
          + Book New
        </button>
      </div>

      {/* Tabs: Upcoming / Completed / Cancelled */}
      <div className="flex p-1 bg-slate-200/70 rounded-2xl">
        {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            id={`tab-${tab}-appointments`}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'bg-white text-[#0F766E] shadow-sm'
                : 'text-slate-600 hover:text-[#12302D]'
            }`}
          >
            {tab}
            {tab === 'upcoming' && appointments.filter(a => a.status === 'upcoming').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#0F766E] text-white text-[10px]">
                {appointments.filter(a => a.status === 'upcoming').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3 pt-1">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              id={`appointment-card-${apt.id}`}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3.5 transition-all"
            >
              {/* Doctor Details */}
              <div className="flex items-start gap-3">
                <img
                  src={apt.doctorPhoto}
                  alt={apt.doctorName}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
                      {apt.doctorSpecialty}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      ₹{apt.fee}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#12302D] truncate mt-1">
                    {apt.doctorName}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {apt.doctorClinic}
                  </p>
                </div>
              </div>

              {/* Timing & Patient Tag */}
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span className="font-bold">{apt.date}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#0F766E]">{apt.time}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span>For: <strong className="text-slate-700">{apt.patientName.split(' ')[0]}</strong></span>
                </div>
              </div>

              {/* Status / Mode tag */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  {apt.consultationType === 'Online Consultation' ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-[#0F766E]" />
                      Online Teleconsult
                    </>
                  ) : (
                    <>
                      <Building className="w-3.5 h-3.5 text-slate-600" />
                      Clinic Visit
                    </>
                  )}
                </span>

                {apt.status === 'upcoming' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Confirmed
                  </span>
                )}
                {apt.status === 'completed' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    Completed
                  </span>
                )}
                {apt.status === 'cancelled' && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold">
                    Cancelled
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                {apt.status === 'upcoming' && (
                  <>
                    {apt.consultationType === 'Online Consultation' ? (
                      <button
                        type="button"
                        id={`join-consultation-btn-${apt.id}`}
                        onClick={() => onJoinConsultation(apt)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Consultation</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        id={`clinic-directions-btn-${apt.id}`}
                        onClick={() => alert(`Directions to ${apt.doctorClinic}: Anna Nagar West, Chennai`)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Clinic Directions</span>
                      </button>
                    )}

                    <button
                      type="button"
                      id={`reschedule-btn-${apt.id}`}
                      onClick={() => setReschedulingApt(apt)}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold active:scale-95 transition-all"
                    >
                      Reschedule
                    </button>

                    <button
                      type="button"
                      id={`cancel-btn-${apt.id}`}
                      onClick={() => setCancellingApt(apt)}
                      className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-700 text-xs font-semibold active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === 'completed' && (
                  <>
                    <button
                      type="button"
                      id={`view-prescription-btn-${apt.id}`}
                      onClick={() => onViewPrescription(apt.prescriptionId || 'rx-1')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Prescription</span>
                    </button>

                    <button
                      type="button"
                      id={`book-again-btn-${apt.id}`}
                      onClick={onBookNew}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold active:scale-95 transition-all"
                    >
                      Book Again
                    </button>
                  </>
                )}

                {apt.status === 'cancelled' && (
                  <button
                    type="button"
                    id={`rebook-cancelled-btn-${apt.id}`}
                    onClick={onBookNew}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] text-xs font-bold border border-teal-200/80 active:scale-95 transition-all text-center"
                  >
                    Rebook Consultation
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty state for appointments */
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#12302D]">
              No {activeTab} appointments
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {activeTab === 'upcoming'
                ? "You don't have any scheduled appointments. Connect with our verified doctors today."
                : `No ${activeTab} consultations to show.`}
            </p>
            {activeTab === 'upcoming' && (
              <button
                type="button"
                id="empty-book-apt-btn"
                onClick={onBookNew}
                className="px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                Find & Book Doctor
              </button>
            )}
          </div>
        )}
      </div>

      {/* RESCHEDULE MODAL */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Reschedule Appointment</h3>
              <button onClick={() => setReschedulingApt(null)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Select a new date and time for consultation with {reschedulingApt.doctorName}.
            </p>

            <div>
              <label className="block text-xs font-bold text-[#12302D] mb-1.5">New Date</label>
              <div className="grid grid-cols-3 gap-2">
                {['24 Sep', '25 Sep', '26 Sep'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setRescheduleDate(d)}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      rescheduleDate === d ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12302D] mb-1.5">New Time</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:00 AM', '05:30 PM'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setRescheduleTime(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      rescheduleTime === t ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReschedulingApt(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="flex-1 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-sm"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancellingApt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-rose-700">Cancel Appointment</h3>
              <button onClick={() => setCancellingApt(null)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to cancel your appointment with <strong>{cancellingApt.doctorName}</strong> on {cancellingApt.date}?
            </p>

            <div>
              <label className="block text-xs font-bold text-[#12302D] mb-1.5">Reason for cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#12302D] focus:outline-none"
              >
                <option value="Schedule conflict">Schedule conflict</option>
                <option value="Recovered already">Feeling better already</option>
                <option value="Booked another doctor">Booked another doctor</option>
                <option value="Other emergency">Personal emergency</option>
              </select>
            </div>

            <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
              ✓ Full refund of ₹{cancellingApt.fee} will be credited back to your original payment method.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancellingApt(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
