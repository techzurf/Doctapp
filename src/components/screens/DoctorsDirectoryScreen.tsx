import React from 'react';
import { Doctor } from '../../types';
import { FindDoctorScreen } from './FindDoctorScreen';

interface DoctorsDirectoryScreenProps {
  doctors: Doctor[];
  selectedSpecialty?: string | null;
  searchQuery?: string;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
  onToggleSaveDoctor?: (doctor: Doctor) => void;
  savedDoctorIds?: string[];
}

export const DoctorsDirectoryScreen: React.FC<DoctorsDirectoryScreenProps> = ({
  doctors,
  selectedSpecialty,
  searchQuery,
  onSelectDoctor,
  onBookDoctor,
  onToggleSaveDoctor,
  savedDoctorIds
}) => {
  const [city, setCity] = React.useState<'Chennai' | 'Bengaluru' | 'Hyderabad' | 'Coimbatore'>('Chennai');

  return (
    <div id="doctors-directory-wrapper" className="w-full max-w-full min-w-0">
      <FindDoctorScreen
        doctors={doctors}
        selectedCity={city}
        onCityChange={setCity}
        onSelectDoctor={onSelectDoctor}
        onBookDoctor={onBookDoctor}
        initialSpecialty={selectedSpecialty}
        initialSearchQuery={searchQuery}
        onToggleSaveDoctor={onToggleSaveDoctor}
        savedDoctorIds={savedDoctorIds}
      />
    </div>
  );
};
