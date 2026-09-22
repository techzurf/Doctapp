import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Calendar, 
  FileText, 
  Heart, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  X,
  Droplet
} from 'lucide-react';
import { FamilyMember, Appointment, HealthRecord } from '../../types';

interface FamilyHealthScreenProps {
  familyMembers: FamilyMember[];
  appointments: Appointment[];
  healthRecords: HealthRecord[];
  onBack: () => void;
  onAddMember: (newMember: Omit<FamilyMember, 'id'>) => void;
  onViewAppointment: (apt: Appointment) => void;
  onViewPrescription: (rxId: string) => void;
}

export const FamilyHealthScreen: React.FC<FamilyHealthScreenProps> = ({
  familyMembers,
  appointments,
  healthRecords,
  onBack,
  onAddMember,
  onViewAppointment,
  onViewPrescription
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState(familyMembers[0]?.id || 'fam-1');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Add Member
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState<'Wife' | 'Son' | 'Daughter' | 'Mother' | 'Father'>('Son');
  const [newAge, setNewAge] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState('B+ Positive');
  const [newAllergies, setNewAllergies] = useState('');

  const currentMember = familyMembers.find(f => f.id === selectedMemberId) || familyMembers[0];

  // Appointments for this specific member
  const memberAppointments = appointments.filter(a => a.patientId === currentMember.id || a.patientName === currentMember.name);
  
  // Health records for this specific member
  const memberRecords = healthRecords.filter(r => r.familyMemberId === currentMember.id || r.patientName === currentMember.name);

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAge) return;

    onAddMember({
      name: newName.trim(),
      relation: newRelation,
      age: parseInt(newAge, 10) || 10,
      gender: ['Wife', 'Daughter', 'Mother'].includes(newRelation) ? 'Female' : 'Male',
      bloodGroup: newBloodGroup,
      allergies: newAllergies ? [newAllergies.trim()] : ['None reported'],
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    });

    setShowAddModal(false);
    setNewName('');
    setNewAge('');
    setNewAllergies('');
  };

  return (
    <div id="family-health-screen" className="pb-24 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="family-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#12302D]">My Family</h1>
            <p className="text-xs text-slate-500">Shared health records & profiles</p>
          </div>
        </div>

        <button
          type="button"
          id="open-add-member-modal-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F766E] text-white text-xs font-bold shadow-sm hover:bg-[#0D655E] active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Family Members Horizontal Selector */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
        {familyMembers.map((member) => {
          const isSelected = member.id === currentMember.id;
          return (
            <button
              key={member.id}
              type="button"
              id={`select-family-member-${member.id}`}
              onClick={() => setSelectedMemberId(member.id)}
              className={`p-3 rounded-2xl border flex flex-col items-center text-center shrink-0 min-w-[110px] transition-all ${
                isSelected
                  ? 'bg-teal-50/80 border-[#0F766E] ring-1 ring-[#0F766E] shadow-sm'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="relative mb-1.5">
                <img
                  src={member.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <span className="absolute -bottom-1 right-0 px-1 py-0.2 rounded-full bg-[#0F766E] text-white text-[8px] font-bold">
                  {member.bloodGroup.split(' ')[0]}
                </span>
              </div>
              <h2 className="text-xs font-bold text-[#12302D] truncate w-full">
                {member.name.split(' ')[0]}
              </h2>
              <span className="text-[10px] text-slate-500 font-medium">
                {member.relation}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="p-3 rounded-2xl border border-dashed border-teal-300 bg-teal-50/40 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px] hover:bg-teal-50"
        >
          <div className="w-9 h-9 rounded-full bg-white text-[#0F766E] flex items-center justify-center shadow-xs mb-1">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#0F766E]">Add Member</span>
        </button>
      </div>

      {/* Selected Member Health Overview Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-[#12302D]">
                {currentMember.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0F766E] text-[10px] font-bold">
                {currentMember.relation}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentMember.age} Years • {currentMember.gender}
            </p>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
            <Droplet className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{currentMember.bloodGroup}</span>
          </div>
        </div>

        {/* Vitals / Health Flags */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              Known Allergies
            </span>
            <span className="font-semibold text-slate-800 mt-0.5 block">
              {currentMember.allergies && currentMember.allergies.length > 0
                ? currentMember.allergies.join(', ')
                : 'None reported'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              Chronic Conditions
            </span>
            <span className="font-semibold text-slate-800 mt-0.5 block">
              {currentMember.chronicConditions && currentMember.chronicConditions.length > 0
                ? currentMember.chronicConditions.join(', ')
                : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Member's Upcoming Appointments */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Upcoming Appointments ({memberAppointments.filter(a => a.status === 'upcoming').length})
          </h2>
          <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
        </div>

        {memberAppointments.filter(a => a.status === 'upcoming').length > 0 ? (
          memberAppointments.filter(a => a.status === 'upcoming').map((apt) => (
            <div
              key={apt.id}
              onClick={() => onViewAppointment(apt)}
              className="p-3 rounded-xl bg-teal-50/50 border border-teal-200/60 flex items-center justify-between cursor-pointer hover:bg-teal-50 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-[#12302D]">{apt.doctorName}</p>
                <p className="text-[11px] text-[#0F766E] font-medium">{apt.doctorSpecialty} • {apt.consultationType}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{apt.date} at {apt.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-1">No upcoming appointments scheduled for {currentMember.name.split(' ')[0]}.</p>
        )}
      </div>

      {/* Member's Medical Records & Prescriptions */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Medical Records & Prescriptions ({memberRecords.length})
          </h2>
          <FileText className="w-3.5 h-3.5 text-[#0F766E]" />
        </div>

        {memberRecords.length > 0 ? (
          memberRecords.map((rec) => (
            <div
              key={rec.id}
              onClick={() => rec.prescriptionId && onViewPrescription(rec.prescriptionId)}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[9px] font-bold text-[#0F766E] uppercase tracking-wider">
                  {rec.category}
                </span>
                <h4 className="text-xs font-bold text-[#12302D] truncate mt-0.5">
                  {rec.title}
                </h4>
                <p className="text-[10px] text-slate-500">
                  {rec.doctorOrLab} • {rec.date}
                </p>
              </div>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-[#0F766E] shadow-2xs"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-1">No medical files uploaded yet for this profile.</p>
        )}
      </div>

      {/* ADD FAMILY MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#12302D]">Add Family Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Zaid Mohammed"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#12302D] mb-1">Relationship</label>
                  <select
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                  >
                    <option value="Wife">Wife</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12302D] mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    placeholder="e.g. 8"
                    required
                    min={1}
                    max={110}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-1">Blood Group</label>
                <select
                  value={newBloodGroup}
                  onChange={(e) => setNewBloodGroup(e.target.value)}
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
                <label className="block text-xs font-bold text-[#12302D] mb-1">Known Allergies (Optional)</label>
                <input
                  type="text"
                  value={newAllergies}
                  onChange={(e) => setNewAllergies(e.target.value)}
                  placeholder="e.g. Dust, Penicillin"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#12302D] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
