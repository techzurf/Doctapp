import React, { useState, useEffect, useMemo } from 'react';
import { 
  MainTab, 
  ScreenView, 
  Doctor, 
  Appointment, 
  FamilyMember, 
  HealthRecord, 
  Prescription, 
  DuaItem, 
  AppNotification 
} from './types';
import { 
  MOCK_DOCTORS, 
  MOCK_APPOINTMENTS, 
  MOCK_FAMILY_MEMBERS, 
  MOCK_PRESCRIPTIONS, 
  MOCK_HEALTH_RECORDS, 
  MOCK_DUAS, 
  MOCK_NOTIFICATIONS 
} from './data/mockData';

// UI and Layout Components
import { Toast, ToastMessage } from './components/ui/Toast';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { TopHeader } from './components/layout/TopHeader';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { DoctorsDirectoryScreen } from './components/screens/DoctorsDirectoryScreen';
import { DoctorProfileScreen } from './components/screens/DoctorProfileScreen';
import { BookAppointmentScreen } from './components/screens/BookAppointmentScreen';
import { BookingConfirmationScreen } from './components/screens/BookingConfirmationScreen';
import { AppointmentsScreen } from './components/screens/AppointmentsScreen';
import { OnlineConsultationScreen } from './components/screens/OnlineConsultationScreen';
import { FamilyHealthScreen } from './components/screens/FamilyHealthScreen';
import { HealthRecordsScreen } from './components/screens/HealthRecordsScreen';
import { PrescriptionDetailModal } from './components/screens/PrescriptionDetailModal';
import { IslamicWellnessScreen } from './components/screens/IslamicWellnessScreen';
import { DuasScreen } from './components/screens/DuasScreen';
import { RamadanHealthScreen } from './components/screens/RamadanHealthScreen';
import { HajjUmrahHealthScreen } from './components/screens/HajjUmrahHealthScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { NotificationsModal } from './components/screens/NotificationsModal';

// URL Route Helpers for Vercel SPA Routing & Deep Linking
const parseInitialRoute = (): { screen: ScreenView; tab: MainTab } => {
  if (typeof window === 'undefined') return { screen: 'splash', tab: 'home' };
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  switch (path) {
    case '/home':
      return { screen: 'main', tab: 'home' };
    case '/doctors':
      return { screen: 'main', tab: 'doctors' };
    case '/appointments':
      return { screen: 'main', tab: 'appointments' };
    case '/health':
      return { screen: 'main', tab: 'health' };
    case '/profile':
      return { screen: 'main', tab: 'profile' };
    case '/duas':
      return { screen: 'duas', tab: 'health' };
    case '/ramadan':
    case '/ramadan-health':
      return { screen: 'ramadan_health', tab: 'health' };
    case '/hajj':
    case '/hajj-health':
      return { screen: 'hajj_health', tab: 'health' };
    case '/records':
    case '/health-records':
      return { screen: 'health_records', tab: 'health' };
    case '/family':
    case '/family-health':
      return { screen: 'family_health', tab: 'home' };
    case '/notifications':
      return { screen: 'notifications', tab: 'home' };
    case '/onboarding':
      return { screen: 'onboarding', tab: 'home' };
    case '/auth':
    case '/login':
      return { screen: 'auth', tab: 'home' };
    default:
      return { screen: 'splash', tab: 'home' };
  }
};

const getPathForScreen = (screen: ScreenView, tab: MainTab): string => {
  if (screen === 'main') {
    return tab === 'home' ? '/home' : `/${tab}`;
  }
  switch (screen) {
    case 'splash':
      return '/';
    case 'onboarding':
      return '/onboarding';
    case 'auth':
      return '/auth';
    case 'doctor_detail':
      return '/doctor-detail';
    case 'book_appointment':
      return '/book-appointment';
    case 'booking_confirmation':
      return '/booking-confirmation';
    case 'online_consultation':
      return '/consultation';
    case 'family_health':
      return '/family';
    case 'health_records':
      return '/records';
    case 'prescription_detail':
      return '/prescription';
    case 'duas':
      return '/duas';
    case 'ramadan_health':
      return '/ramadan';
    case 'hajj_health':
      return '/hajj';
    case 'notifications':
      return '/notifications';
    default:
      return '/home';
  }
};

export default function App() {
  // Navigation State with deep-linking support
  const initialRoute = useMemo(() => parseInitialRoute(), []);
  const [currentScreen, setCurrentScreen] = useState<ScreenView>(initialRoute.screen);
  const [activeTab, setActiveTab] = useState<MainTab>(initialRoute.tab);
  const [previousScreen, setPreviousScreen] = useState<ScreenView>('main');

  // Sync browser URL bar with active screen/tab
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targetPath = getPathForScreen(currentScreen, activeTab);
    if (window.location.pathname !== targetPath) {
      if (currentScreen === 'splash' && window.location.pathname === '/') {
        // keep root on splash
      } else {
        window.history.pushState({ screen: currentScreen, tab: activeTab }, '', targetPath);
      }
    }
  }, [currentScreen, activeTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const parsed = parseInitialRoute();
      setCurrentScreen(parsed.screen);
      setActiveTab(parsed.tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Application Data States
  const [userName, setUserName] = useState<string>('Ahmed Mohammed');
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(MOCK_FAMILY_MEMBERS);
  const [prescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(MOCK_HEALTH_RECORDS);
  const [duas] = useState<DuaItem[]>(MOCK_DUAS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  // User Preferences
  const [currentCity, setCurrentCity] = useState('Chennai');
  const [savedDoctorIds, setSavedDoctorIds] = useState<string[]>(['doc-1', 'doc-2']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Selected Entities for Detail Views
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(MOCK_DOCTORS[0]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>(MOCK_APPOINTMENTS[0]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription>(MOCK_PRESCRIPTIONS[0]);
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string | null>(null);
  const [searchFilterKeyword, setSearchFilterKeyword] = useState<string>('');

  // Booking Flow Intermediate State
  const [pendingBooking, setPendingBooking] = useState<{
    doctor: Doctor;
    consultationType: 'Online Consultation' | 'Clinic Visit';
    date: string;
    time: string;
    patient: FamilyMember;
  } | null>(null);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helpers
  const navigateTo = (screen: ScreenView) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    if (['doctor_detail', 'book_appointment', 'family_health', 'health_records', 'duas', 'ramadan_health', 'hajj_health', 'notifications'].includes(currentScreen)) {
      setCurrentScreen('main');
    } else if (currentScreen === 'booking_confirmation') {
      setCurrentScreen('book_appointment');
    } else if (currentScreen === 'prescription_detail') {
      setCurrentScreen(previousScreen || 'main');
    } else {
      setCurrentScreen('main');
    }
  };

  // Actions
  const handleToggleSaveDoctor = (doctor: Doctor) => {
    setSavedDoctorIds(prev => {
      const exists = prev.includes(doctor.id);
      if (exists) {
        showToast(`Removed ${doctor.name} from saved doctors`, 'info');
        return prev.filter(id => id !== doctor.id);
      } else {
        showToast(`Saved ${doctor.name} to favorites`, 'success');
        return [...prev, doctor.id];
      }
    });
  };

  const handleStartBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    navigateTo('book_appointment');
  };

  const handleOpenDoctorDetail = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    navigateTo('doctor_detail');
  };

  const handleSelectSpecialtyFromHome = (specialty: string) => {
    setSelectedSpecialtyFilter(specialty);
    setActiveTab('doctors');
    setCurrentScreen('main');
  };

  const handleSearchFromHome = (query: string) => {
    setSearchFilterKeyword(query);
    setActiveTab('doctors');
    setCurrentScreen('main');
  };

  const handleJoinConsultation = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    navigateTo('online_consultation');
  };

  const handleViewPrescriptionById = (prescriptionId?: string) => {
    const rx = prescriptions.find(p => p.id === prescriptionId) || prescriptions[0];
    setSelectedPrescription(rx);
    navigateTo('prescription_detail');
  };

  const handleAddFamilyMember = (newMember: Omit<FamilyMember, 'id'>) => {
    const member: FamilyMember = {
      ...newMember,
      id: `fam-${Date.now()}`
    };
    setFamilyMembers(prev => [...prev, member]);
    showToast(`Added ${member.name} (${member.relation}) to family health profile`);
  };

  const handleUpdateFamilyMember = (updatedMember: FamilyMember) => {
    setFamilyMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    showToast(`Updated ${updatedMember.name}'s profile`);
  };

  const handleDeleteFamilyMember = (memberId: string) => {
    const member = familyMembers.find(m => m.id === memberId);
    setFamilyMembers(prev => prev.filter(m => m.id !== memberId));
    showToast(`Removed ${member?.name || 'profile'} from family circle`);
  };

  const handleUploadRecord = (newRecord: HealthRecord) => {
    setHealthRecords(prev => [newRecord, ...prev]);
    showToast(`Uploaded "${newRecord.title}" successfully`);
  };

  const handleReschedule = (appointmentId: string, newDate: string, newTime: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, date: newDate, time: newTime };
      }
      return a;
    }));
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}`);
  };

  const handleCancelAppointment = (appointmentId: string, reason: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, status: 'cancelled' };
      }
      return a;
    }));
    showToast('Appointment cancelled. Refund has been initiated.', 'info');
  };

  const handleBookingConfirmed = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
    showToast('Appointment confirmed! Notification reminder set.', 'success');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notif: AppNotification) => {
    if (notif.type === 'appointment') {
      setActiveTab('appointments');
      setCurrentScreen('main');
    } else if (notif.type === 'prescription') {
      handleViewPrescriptionById();
    } else if (notif.type === 'dua') {
      navigateTo('duas');
    } else if (notif.type === 'wellness') {
      navigateTo('ramadan_health');
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;
  const upcomingAppointmentCount = appointments.filter(a => a.status === 'upcoming').length;

  return (
    <div id="shifacare-mobile-viewport" className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7FAF9] text-[#12302D] flex flex-col font-sans selection:bg-[#0F766E]/20 selection:text-[#0F766E] antialiased">
      {/* Toast Notifications Overlay */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* VIEWPORT CONTROLLER */}
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          onComplete={() => setCurrentScreen('auth')}
          onSkip={() => setCurrentScreen('main')}
        />
      )}

      {currentScreen === 'auth' && (
        <AuthScreen
          onSuccess={(name) => {
            if (name) setUserName(name);
            showToast('Welcome to ShifaCare! Assalamu Alaikum');
            setCurrentScreen('main');
          }}
          onSkip={() => setCurrentScreen('main')}
        />
      )}

      {/* MAIN BOTTOM-TAB LAYOUT */}
      {currentScreen === 'main' && (
        <div className="flex-1 flex flex-col w-full max-w-full min-w-0">
          {/* Top Header shown on Main tabs */}
          <TopHeader
            currentCity={currentCity}
            onCityChange={(city) => {
              setCurrentCity(city);
              showToast(`Location set to ${city}`);
            }}
            unreadCount={unreadNotificationCount}
            onOpenNotifications={() => navigateTo('notifications')}
            onOpenFamily={() => navigateTo('family_health')}
          />

          <main className="flex-1 w-full max-w-full min-w-0">
            {activeTab === 'home' && (
              <HomeScreen
                doctors={doctors}
                appointments={appointments}
                familyMembers={familyMembers}
                onSelectSpecialty={handleSelectSpecialtyFromHome}
                onSelectDoctor={handleOpenDoctorDetail}
                onBookDoctor={handleStartBooking}
                onSearch={handleSearchFromHome}
                onNavigateToDuas={() => navigateTo('duas')}
                onNavigateToFamily={() => navigateTo('family_health')}
                onNavigateToRamadan={() => navigateTo('ramadan_health')}
                onNavigateToHajj={() => navigateTo('hajj_health')}
                onNavigateToHealthRecords={() => navigateTo('health_records')}
                onJoinConsultation={handleJoinConsultation}
                onViewAllDoctors={() => setActiveTab('doctors')}
              />
            )}

            {activeTab === 'doctors' && (
              <DoctorsDirectoryScreen
                doctors={doctors}
                selectedSpecialty={selectedSpecialtyFilter}
                searchQuery={searchFilterKeyword}
                onSelectDoctor={handleOpenDoctorDetail}
                onBookDoctor={handleStartBooking}
                onToggleSaveDoctor={handleToggleSaveDoctor}
                savedDoctorIds={savedDoctorIds}
              />
            )}

            {activeTab === 'appointments' && (
              <AppointmentsScreen
                appointments={appointments}
                onJoinConsultation={handleJoinConsultation}
                onViewPrescription={handleViewPrescriptionById}
                onReschedule={handleReschedule}
                onCancelAppointment={handleCancelAppointment}
                onBookNew={() => setActiveTab('doctors')}
              />
            )}

            {activeTab === 'health' && (
              <IslamicWellnessScreen
                onNavigateToDuas={() => navigateTo('duas')}
                onNavigateToRamadan={() => navigateTo('ramadan_health')}
                onNavigateToHajj={() => navigateTo('hajj_health')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                onNavigateToFamily={() => navigateTo('family_health')}
                onNavigateToRecords={() => navigateTo('health_records')}
                onNavigateToAppointments={() => {
                  setActiveTab('appointments');
                  setCurrentScreen('main');
                }}
                onNavigateToSavedDoctors={() => {
                  setSelectedSpecialtyFilter(null);
                  setActiveTab('doctors');
                }}
                onNavigateToIslamicWellness={() => setActiveTab('health')}
                onOpenNotifications={() => navigateTo('notifications')}
                onLogout={() => {
                  showToast('Logged out of demo profile', 'info');
                  setCurrentScreen('auth');
                }}
              />
            )}
          </main>

          {/* Sticky Mobile Bottom Navigation Bar */}
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              // Clear previous search filters on tab switch if switching to doctors directly
              if (tab !== 'doctors') {
                setSelectedSpecialtyFilter(null);
                setSearchFilterKeyword('');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            appointmentBadgeCount={upcomingAppointmentCount}
          />
        </div>
      )}

      {/* SECONDARY DETAIL VIEWS */}
      {currentScreen === 'doctor_detail' && selectedDoctor && (
        <DoctorProfileScreen
          doctor={selectedDoctor}
          onBack={navigateBack}
          onBook={handleStartBooking}
          isSaved={savedDoctorIds.includes(selectedDoctor.id)}
          onToggleSave={() => handleToggleSaveDoctor(selectedDoctor)}
          onShare={() => {
            if (navigator.share) {
              navigator.share({
                title: `${selectedDoctor.name} - ShifaCare`,
                text: `Book verified Muslim specialist ${selectedDoctor.name} on ShifaCare`,
                url: window.location.href
              }).catch(() => {});
            } else {
              showToast(`Profile link copied for ${selectedDoctor.name}`);
            }
          }}
        />
      )}

      {currentScreen === 'book_appointment' && selectedDoctor && (
        <BookAppointmentScreen
          doctor={selectedDoctor}
          familyMembers={familyMembers}
          onBack={navigateBack}
          onProceedToConfirm={(bookingData) => {
            setPendingBooking(bookingData);
            navigateTo('booking_confirmation');
          }}
        />
      )}

      {currentScreen === 'booking_confirmation' && pendingBooking && (
        <BookingConfirmationScreen
          bookingData={pendingBooking}
          onBack={navigateBack}
          onBookingConfirmed={handleBookingConfirmed}
          onViewAppointment={(apt) => {
            setActiveTab('appointments');
            setCurrentScreen('main');
          }}
          onGoHome={() => {
            setActiveTab('home');
            setCurrentScreen('main');
          }}
        />
      )}

      {currentScreen === 'online_consultation' && selectedAppointment && (
        <OnlineConsultationScreen
          appointment={selectedAppointment}
          onEndConsultation={() => {
            showToast('Consultation ended. Your e-prescription is ready!');
            setActiveTab('appointments');
            setCurrentScreen('main');
          }}
          onViewPrescription={() => handleViewPrescriptionById(selectedAppointment.prescriptionId)}
          onViewRecords={() => navigateTo('health_records')}
        />
      )}

      {currentScreen === 'family_health' && (
        <FamilyHealthScreen
          familyMembers={familyMembers}
          appointments={appointments}
          healthRecords={healthRecords}
          onBack={navigateBack}
          onAddMember={handleAddFamilyMember}
          onUpdateMember={handleUpdateFamilyMember}
          onDeleteMember={handleDeleteFamilyMember}
          onViewAppointment={(apt) => {
            setSelectedAppointment(apt);
            setActiveTab('appointments');
            setCurrentScreen('main');
          }}
          onViewPrescription={handleViewPrescriptionById}
        />
      )}

      {currentScreen === 'health_records' && (
        <HealthRecordsScreen
          healthRecords={healthRecords}
          familyMembers={familyMembers}
          onBack={navigateBack}
          onViewRecord={(rec) => {
            if (rec.prescriptionId) {
              handleViewPrescriptionById(rec.prescriptionId);
            } else {
              showToast(`Opening ${rec.title} preview...`);
            }
          }}
          onUploadRecord={handleUploadRecord}
        />
      )}

      {currentScreen === 'prescription_detail' && selectedPrescription && (
        <PrescriptionDetailModal
          prescription={selectedPrescription}
          onBack={navigateBack}
          onDownload={() => showToast('Prescription PDF saved to phone storage')}
          onShare={() => showToast('Prescription sent to pharmacy')}
        />
      )}

      {currentScreen === 'duas' && (
        <DuasScreen
          duas={duas}
          onBack={navigateBack}
          onBookmarkDua={(id) => showToast('Dua updated in bookmarks')}
        />
      )}

      {currentScreen === 'ramadan_health' && (
        <RamadanHealthScreen
          onBack={navigateBack}
          onBookSpecialist={(specialty) => {
            setSelectedSpecialtyFilter(specialty);
            setActiveTab('doctors');
            setCurrentScreen('main');
          }}
        />
      )}

      {currentScreen === 'hajj_health' && (
        <HajjUmrahHealthScreen
          onBack={navigateBack}
          onBookVaccineConsult={() => {
            setSelectedSpecialtyFilter('General Physician');
            setActiveTab('doctors');
            setCurrentScreen('main');
          }}
        />
      )}

      {currentScreen === 'notifications' && (
        <NotificationsModal
          notifications={notifications}
          onBack={navigateBack}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onDismissNotification={handleDismissNotification}
          onNotificationClick={handleNotificationClick}
        />
      )}
    </div>
  );
}
