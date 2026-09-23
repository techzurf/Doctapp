import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Calendar, 
  X, 
  Check, 
  Clock, 
  Video, 
  Sparkles,
  ChevronDown,
  Heart
} from 'lucide-react';
import { Doctor, FilterState } from '../../types';
import { SPECIALTIES, CITIES } from '../../data/mockData';

interface FindDoctorScreenProps {
  doctors: Doctor[];
  selectedCity: 'Chennai' | 'Bengaluru' | 'Hyderabad' | 'Coimbatore';
  onCityChange: (city: 'Chennai' | 'Bengaluru' | 'Hyderabad' | 'Coimbatore') => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
  initialSpecialty?: string | null;
  initialSearchQuery?: string;
  onToggleSaveDoctor?: (doctor: Doctor) => void;
  savedDoctorIds?: string[];
}

export const FindDoctorScreen: React.FC<FindDoctorScreenProps> = ({
  doctors,
  selectedCity,
  onCityChange,
  onSelectDoctor,
  onBookDoctor,
  initialSpecialty,
  initialSearchQuery,
  onToggleSaveDoctor,
  savedDoctorIds
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty || 'All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);

  React.useEffect(() => {
    if (initialSpecialty !== undefined) {
      setSelectedSpecialty(initialSpecialty || 'All');
    }
  }, [initialSpecialty]);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery || '');
    }
  }, [initialSearchQuery]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    specialty: 'All',
    gender: 'Any',
    consultationType: 'Both',
    availability: 'Any',
    experience: 'Any',
    feeRange: 'Any',
    language: 'Any'
  });

  // Filtered doctor list
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // City check
      if (doc.city !== selectedCity) return false;

      // Search query (doctor name, specialty, degree, location)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(q);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(q);
        const matchesLocation = doc.location.toLowerCase().includes(q);
        const matchesDegrees = doc.degrees.toLowerCase().includes(q);
        if (!matchesName && !matchesSpecialty && !matchesLocation && !matchesDegrees) {
          return false;
        }
      }

      // Specialty chip
      if (selectedSpecialty !== 'All') {
        if (!doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender !== 'Any' && doc.gender !== filters.gender) {
        return false;
      }

      // Consultation type
      if (filters.consultationType === 'Online' && !doc.consultationTypes.includes('online')) {
        return false;
      }
      if (filters.consultationType === 'Clinic' && !doc.consultationTypes.includes('clinic')) {
        return false;
      }

      // Availability
      if (filters.availability === 'Today' && !doc.isAvailableToday) {
        return false;
      }

      // Experience
      if (filters.experience === '5+ Years' && doc.experienceYears < 5) return false;
      if (filters.experience === '10+ Years' && doc.experienceYears < 10) return false;

      // Fee Range
      if (filters.feeRange === '₹0–₹500' && doc.fee > 500) return false;
      if (filters.feeRange === '₹500–₹1,000' && (doc.fee < 500 || doc.fee > 1000)) return false;
      if (filters.feeRange === '₹1,000+' && doc.fee < 1000) return false;

      // Language
      if (filters.language !== 'Any' && !doc.languages.includes(filters.language)) {
        return false;
      }

      return true;
    });
  }, [doctors, selectedCity, searchQuery, selectedSpecialty, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.gender !== 'Any') count++;
    if (filters.consultationType !== 'Both') count++;
    if (filters.availability !== 'Any') count++;
    if (filters.experience !== 'Any') count++;
    if (filters.feeRange !== 'Any') count++;
    if (filters.language !== 'Any') count++;
    return count;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      specialty: 'All',
      gender: 'Any',
      consultationType: 'Both',
      availability: 'Any',
      experience: 'Any',
      feeRange: 'Any',
      language: 'Any'
    });
  };

  return (
    <div id="find-doctor-screen" className="pb-24 pt-3 px-4 space-y-4 max-w-lg mx-auto w-full min-w-0">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#12302D] tracking-tight">
            Find a Doctor
          </h1>
          <p className="text-xs text-[#64748B]">Verified Muslim practitioners</p>
        </div>

        {/* Location selector dropdown button */}
        <div className="relative">
          <button
            type="button"
            id="location-picker-btn"
            onClick={() => setShowCityPicker(!showCityPicker)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0F766E] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showCityPicker && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30">
              <span className="block px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select City
              </span>
              {CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  id={`select-city-${city}`}
                  onClick={() => {
                    onCityChange(city);
                    setShowCityPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between ${
                    selectedCity === city
                      ? 'bg-teal-50 text-[#0F766E]'
                      : 'text-[#12302D] hover:bg-slate-50'
                  }`}
                >
                  <span>{city}</span>
                  {selectedCity === city && <Check className="w-3.5 h-3.5 text-[#0F766E]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Input & Filter Button */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            id="doctor-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor or specialty..."
            className="w-full bg-transparent text-xs text-[#12302D] placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          id="open-filters-btn"
          onClick={() => setIsFilterOpen(true)}
          className={`p-3 rounded-2xl border shadow-sm flex items-center justify-center shrink-0 relative transition-all active:scale-95 ${
            activeFiltersCount > 0
              ? 'bg-[#0F766E] text-white border-[#0F766E]'
              : 'bg-white text-[#12302D] border-slate-200 hover:bg-slate-50'
          }`}
          aria-label="Open doctor filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A227] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Specialty Horizontal Chips Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar w-full max-w-full">
        {SPECIALTIES.map((spec) => {
          const isSelected = selectedSpecialty === spec;
          return (
            <button
              key={spec}
              type="button"
              id={`specialty-chip-${spec}`}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-[#0F766E] text-white shadow-sm shadow-teal-900/20'
                  : 'bg-white text-[#64748B] border border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-0.5">
        <span>
          Showing <strong className="text-[#12302D]">{filteredDoctors.length}</strong> verified doctors in {selectedCity}
        </span>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            id="clear-all-filters-btn"
            onClick={resetFilters}
            className="text-[#0F766E] font-semibold hover:underline text-[11px]"
          >
            Clear Filters ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Doctor Cards List */}
      <div className="space-y-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              id={`doctor-list-card-${doc.id}`}
              onClick={() => onSelectDoctor(doc)}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:border-[#0F766E]/40 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={doc.photoUrl}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
                  />
                  {doc.isVerified && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0F766E] text-white ring-2 ring-white">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h2 className="text-sm font-bold text-[#12302D] truncate">
                      {doc.name}
                    </h2>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {onToggleSaveDoctor && (
                        <button
                          type="button"
                          id={`save-doctor-${doc.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveDoctor(doc);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            savedDoctorIds?.includes(doc.id)
                              ? 'bg-rose-50 border-rose-200 text-rose-500'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                          aria-label="Save doctor"
                        >
                          <Heart className={`w-3 h-3 ${savedDoctorIds?.includes(doc.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {doc.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#0F766E] font-medium mt-0.5">
                    {doc.degrees}
                  </p>
                  <p className="text-xs font-semibold text-[#12302D]">
                    {doc.specialty}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#64748B]">
                    <span>{doc.experienceYears} yrs exp</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#0F766E]" />
                      {doc.distance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Details Bar */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-[#12302D]">
                      ₹{doc.fee}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">Consultation Fee</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
                    {doc.isAvailableToday ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Available Today
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        Next: Tomorrow
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      ✓ Verified
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id={`book-apt-btn-${doc.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookDoctor(doc);
                  }}
                  className="shrink-0 px-3.5 sm:px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-sm shadow-teal-900/10 active:scale-95 transition-all whitespace-nowrap"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty state for doctors */
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#12302D]">No Doctors Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We couldn't find any doctors matching your search or filters in {selectedCity}. Try resetting filters.
            </p>
            <button
              type="button"
              id="empty-reset-filters-btn"
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* SCREEN 6: DOCTOR FILTERS BOTTOM SHEET */}
      {isFilterOpen && (
        <div
          id="doctor-filters-backdrop"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            id="doctor-filters-bottom-sheet"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-auto bg-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
          >
            {/* Sheet Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#12302D]">Doctor Filters</h3>
                <p className="text-[11px] text-slate-500">Refine by consultation, gender, or fee</p>
              </div>
              <button
                type="button"
                id="close-filters-sheet-btn"
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-4 space-y-5 overflow-y-auto no-scrollbar">
              {/* Gender Preference */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Doctor Gender Preference
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(['Any', 'Male', 'Female'] as const).map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      id={`filter-gender-${gender}`}
                      onClick={() => setFilters({ ...filters, gender })}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                        filters.gender === gender
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(['Both', 'Online', 'Clinic'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      id={`filter-consult-${type}`}
                      onClick={() => setFilters({ ...filters, consultationType: type })}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                        filters.consultationType === type
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type === 'Both' ? 'All Types' : type === 'Online' ? 'Online Call' : 'Clinic Visit'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(['Any', 'Today', 'Tomorrow'] as const).map((avail) => (
                    <button
                      key={avail}
                      type="button"
                      id={`filter-avail-${avail}`}
                      onClick={() => setFilters({ ...filters, availability: avail })}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                        filters.availability === avail
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Experience
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(['Any', '5+ Years', '10+ Years'] as const).map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      id={`filter-exp-${exp}`}
                      onClick={() => setFilters({ ...filters, experience: exp })}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                        filters.experience === exp
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Fee */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Consultation Fee
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(['Any', '₹0–₹500', '₹500–₹1,000'] as const).map((fee) => (
                    <button
                      key={fee}
                      type="button"
                      id={`filter-fee-${fee}`}
                      onClick={() => setFilters({ ...filters, feeRange: fee })}
                      className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all truncate text-center ${
                        filters.feeRange === fee
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {fee}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-xs font-bold text-[#12302D] mb-2">
                  Doctor Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Any', 'English', 'Tamil', 'Urdu', 'Hindi', 'Malayalam'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      id={`filter-lang-${lang}`}
                      onClick={() => setFilters({ ...filters, language: lang })}
                      className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        filters.language === lang
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white">
              <button
                type="button"
                id="reset-filters-btn"
                onClick={resetFilters}
                className="py-3 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Reset All
              </button>
              <button
                type="button"
                id="apply-filters-btn"
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-md shadow-teal-900/10 transition-all text-center"
              >
                Apply Filters ({filteredDoctors.length} Doctors)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
