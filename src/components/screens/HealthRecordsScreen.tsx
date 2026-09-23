import React, { useState } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Plus, 
  Filter, 
  CheckCircle2, 
  X,
  FileCheck2,
  Calendar,
  User
} from 'lucide-react';
import { HealthRecord, FamilyMember } from '../../types';

interface HealthRecordsScreenProps {
  healthRecords: HealthRecord[];
  familyMembers: FamilyMember[];
  onBack: () => void;
  onViewRecord: (record: HealthRecord) => void;
  onUploadRecord: (newRecord: HealthRecord) => void;
  onDownloadRecord?: (record: HealthRecord) => void;
  onShareRecord?: (record: HealthRecord) => void;
}

export const HealthRecordsScreen: React.FC<HealthRecordsScreenProps> = ({
  healthRecords,
  familyMembers,
  onBack,
  onViewRecord,
  onUploadRecord,
  onDownloadRecord,
  onShareRecord
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewingRecord, setPreviewingRecord] = useState<HealthRecord | null>(null);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'Prescriptions' | 'Lab Reports' | 'Scans' | 'Vaccines'>('Lab Reports');
  const [uploadDoctorOrLab, setUploadDoctorOrLab] = useState('');
  const [uploadPatientId, setUploadPatientId] = useState(familyMembers[0]?.id || 'fam-1');

  const showLocalFeedback = (msg: string) => {
    setFeedbackBanner(msg);
    setTimeout(() => setFeedbackBanner(null), 3000);
  };

  const categories = ['All', 'Prescriptions', 'Lab Reports', 'Scans', 'Vaccines'];

  const filteredRecords = healthRecords.filter(rec => {
    const matchesCat = selectedCategory === 'All' || rec.category === selectedCategory;
    const matchesFamily = selectedFamilyFilter === 'All' || rec.familyMemberId === selectedFamilyFilter;
    return matchesCat && matchesFamily;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadDoctorOrLab.trim()) return;

    const patient = familyMembers.find(f => f.id === uploadPatientId) || familyMembers[0];

    const newRec: HealthRecord = {
      id: `rec-${Date.now()}`,
      title: uploadTitle.trim(),
      category: uploadCategory,
      doctorOrLab: uploadDoctorOrLab.trim(),
      date: 'Today, 22 Sep 2026',
      fileSize: '1.2 MB',
      fileType: 'PDF Document',
      patientName: patient.name,
      familyMemberId: patient.id
    };

    onUploadRecord(newRec);
    setShowUploadModal(false);
    setUploadTitle('');
    setUploadDoctorOrLab('');
  };

  return (
    <div id="health-records-screen" className="pb-24 pt-2 px-4 max-w-lg mx-auto w-full min-w-0 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 w-full min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            id="records-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-[#12302D] truncate">Health Records</h1>
            <p className="text-xs text-slate-500 truncate">Secure digital medical files</p>
          </div>
        </div>

        <button
          type="button"
          id="open-upload-record-btn"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F766E] text-white text-xs font-bold shadow-sm hover:bg-[#0D655E] active:scale-95 transition-all shrink-0"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
      </div>

      {/* Family Member Quick Pill Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full max-w-full">
        <span className="text-[11px] font-bold text-slate-400 pl-1 shrink-0">Member:</span>
        <button
          type="button"
          onClick={() => setSelectedFamilyFilter('All')}
          className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
            selectedFamilyFilter === 'All'
              ? 'bg-[#12302D] text-white'
              : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          All Members
        </button>
        {familyMembers.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedFamilyFilter(m.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              selectedFamilyFilter === m.id
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {m.name.split(' ')[0]} ({m.relation})
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar w-full max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            id={`record-cat-${cat.toLowerCase().replace(/ /g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Record List */}
      <div className="space-y-3 pt-1">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((rec) => (
            <div
              key={rec.id}
              id={`record-card-${rec.id}`}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 border border-teal-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded">
                      {rec.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {rec.fileSize}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#12302D] truncate mt-1">
                    {rec.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {rec.doctorOrLab}
                  </p>
                </div>
              </div>

              {/* Tag Row: Date & Patient */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {rec.date}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <User className="w-3 h-3 text-[#0F766E]" />
                  {rec.patientName}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  id={`view-rec-${rec.id}`}
                  onClick={() => {
                    if (rec.prescriptionId) {
                      onViewRecord(rec);
                    } else {
                      setPreviewingRecord(rec);
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </button>

                <button
                  type="button"
                  id={`download-rec-${rec.id}`}
                  onClick={() => {
                    if (onDownloadRecord) {
                      onDownloadRecord(rec);
                    } else {
                      showLocalFeedback(`Downloading ${rec.title} (PDF)... Saved to device`);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 active:scale-95 transition-all"
                  aria-label="Download document"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id={`share-rec-${rec.id}`}
                  onClick={() => {
                    if (onShareRecord) {
                      onShareRecord(rec);
                    } else {
                      navigator.clipboard?.writeText(`ShifaCare Medical Record: ${rec.title} - ${rec.doctorOrLab}`);
                      showLocalFeedback(`Secure record link copied to clipboard`);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 active:scale-95 transition-all"
                  aria-label="Share document"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#12302D]">No records found</h3>
            <p className="text-xs text-slate-500">
              There are no documents matching category “{selectedCategory}”.
            </p>
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold"
            >
              Upload New Record
            </button>
          </div>
        )}
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Upload Medical Record</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Document Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Complete Blood Count (CBC)"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                >
                  <option value="Prescriptions">Prescriptions</option>
                  <option value="Lab Reports">Lab Reports</option>
                  <option value="Scans">Scans & X-Rays</option>
                  <option value="Vaccines">Vaccination Record</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Doctor or Diagnostic Lab</label>
                <input
                  type="text"
                  value={uploadDoctorOrLab}
                  onChange={(e) => setUploadDoctorOrLab(e.target.value)}
                  placeholder="e.g. Apollo Diagnostics / Dr. Ayesha"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Patient Family Member</label>
                <select
                  value={uploadPatientId}
                  onChange={(e) => setUploadPatientId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Dropzone simulation */}
              <div className="border-2 border-dashed border-teal-300 rounded-2xl p-4 text-center bg-teal-50/40">
                <UploadCloud className="w-7 h-7 text-[#0F766E] mx-auto mb-1" />
                <p className="text-xs font-bold text-[#12302D]">Tap to choose file</p>
                <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 15MB</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating feedback toast */}
      {feedbackBanner && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#12302D] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackBanner}</span>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewingRecord && (
        <div 
          onClick={() => setPreviewingRecord(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#12302D] truncate">{previewingRecord.title}</h3>
                  <span className="text-[10px] text-slate-400">{previewingRecord.date} • {previewingRecord.category}</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setPreviewingRecord(null)} 
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document details sheet */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
              <div className="flex justify-between items-start pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Patient</span>
                  <span className="font-bold text-[#12302D]">{previewingRecord.patientName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Lab / Provider</span>
                  <span className="font-bold text-[#0F766E]">{previewingRecord.doctorOrLab}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase mb-1">Clinical Findings</span>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                  {previewingRecord.summary || 'All tested clinical parameters are within normal physiological reference ranges. No acute pathological abnormalities identified.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Verification</span>
                  <span className="text-emerald-700 font-bold">✓ Certified Valid</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">File Size</span>
                  <span className="font-semibold text-slate-700">{previewingRecord.fileSize} (PDF)</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  showLocalFeedback(`Downloading ${previewingRecord.title}...`);
                  setPreviewingRecord(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-sm hover:bg-[#0D655E] flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to Phone</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showLocalFeedback(`Document link copied`);
                  setPreviewingRecord(null);
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center"
                aria-label="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
