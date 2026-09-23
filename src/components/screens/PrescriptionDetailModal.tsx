import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  ShieldCheck, 
  Calendar, 
  User, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Printer 
} from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionDetailModalProps {
  prescription: Prescription;
  onBack: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onOrderMedicines?: () => void;
}

export const PrescriptionDetailModal: React.FC<PrescriptionDetailModalProps> = ({
  prescription,
  onBack,
  onDownload,
  onShare,
  onOrderMedicines
}) => {
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      showToast('Downloading verified PDF with doctor seal...');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      navigator.clipboard?.writeText(`ShifaCare E-Prescription #${prescription.id} from ${prescription.doctorName}`);
      showToast('Prescription link copied for pharmacy!');
    }
  };

  const handleOrder = () => {
    if (onOrderMedicines) {
      onOrderMedicines();
    } else {
      showToast('Order sent to partner halal pharmacy network! Dispatching shortly.');
    }
  };
  return (
    <div id="prescription-detail-modal" className="pb-24 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="rx-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#12302D]">Medical Prescription</h1>
            <p className="text-xs text-slate-500">Official verified e-prescription</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="rx-download-btn"
            onClick={handleDownload}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
            aria-label="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            id="rx-share-btn"
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
            aria-label="Share prescription"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Official Prescription Paper Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-5 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F766E] via-teal-600 to-[#C9A227]" />

        {/* Doctor Header Block */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-[#12302D]">
                {prescription.doctorName}
              </h2>
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            </div>
            <p className="text-xs font-semibold text-[#0F766E]">
              {prescription.doctorDegrees}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {prescription.doctorClinic}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              MCI Reg No: <span className="font-semibold text-slate-600">{prescription.registrationNo}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-serif font-black text-[#0F766E] italic tracking-tight">
              ℞
            </span>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              E-Rx #{prescription.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Patient Details Row */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
              Patient Name
            </span>
            <span className="font-bold text-[#12302D] mt-0.5 block">
              {prescription.patientName}
            </span>
            <span className="text-[11px] text-slate-500">
              {prescription.patientAge} Years • {prescription.patientGender}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
              Date Prescribed
            </span>
            <span className="font-bold text-[#12302D] mt-0.5 block">
              {prescription.date}
            </span>
            <span className="text-[11px] text-[#0F766E] font-medium">
              Valid for 30 Days
            </span>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-200/60">
          <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider block">
            Clinical Diagnosis
          </span>
          <p className="text-xs font-bold text-[#12302D] mt-0.5">
            {prescription.diagnosis}
          </p>
        </div>

        {/* Medicines List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Prescribed Medications ({prescription.medicines.length})
          </h3>

          <div className="space-y-2.5">
            {prescription.medicines.map((med, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-slate-200/80 bg-white space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-[#0F766E] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-[#12302D]">
                      {med.name}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md">
                    {med.dosage}
                  </span>
                </div>

                {/* Timing Pills: Morning, Afternoon, Night */}
                <div className="flex items-center gap-2 text-[11px] pt-1">
                  <span className="text-slate-400 font-medium">Schedule:</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      med.timing.morning ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      Morn {med.timing.morning ? '✓' : '—'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      med.timing.afternoon ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      Noon {med.timing.afternoon ? '✓' : '—'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      med.timing.night ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      Night {med.timing.night ? '✓' : '—'}
                    </span>
                  </div>
                </div>

                {/* Instruction & Duration */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <span>🍽 {med.instructions}</span>
                  <span className="font-semibold text-slate-700">⏳ {med.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Advice / Notes */}
        {prescription.notes && (
          <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 space-y-1">
            <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-700">
              Lifestyle & Dietary Advice
            </span>
            <p>{prescription.notes}</p>
          </div>
        )}

        {/* Official Doctor Signature & Stamp */}
        <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
          <div className="text-[10px] text-slate-400 space-y-0.5">
            <p>Generated electronically via ShifaCare E-Health</p>
            <p className="text-teal-700 font-semibold">Digitally Signed & Validated</p>
          </div>

          <div className="text-right">
            <div className="inline-block border-b-2 border-slate-800 pb-1 px-4 mb-1">
              <span className="font-serif italic text-sm text-slate-800 font-bold block">
                {prescription.doctorName}
              </span>
            </div>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Registered Medical Seal
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/15 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Save PDF to Phone</span>
        </button>

        <button
          type="button"
          onClick={handleOrder}
          className="flex-1 py-3 px-4 rounded-2xl bg-white border border-[#0F766E] text-[#0F766E] text-xs font-bold hover:bg-teal-50 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Order Medicines</span>
        </button>
      </div>

      {/* Floating feedback toast */}
      {feedback && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#12302D] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
};
