import React from 'react';
import { Home, Users, Calendar, HeartPulse, User } from 'lucide-react';
import { MainTab } from '../../types';

interface BottomNavigationProps {
  currentTab?: MainTab;
  activeTab?: MainTab;
  onTabChange: (tab: MainTab) => void;
  upcomingCount?: number;
  appointmentBadgeCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  activeTab,
  onTabChange,
  upcomingCount = 1,
  appointmentBadgeCount
}) => {
  const effectiveTab = activeTab || currentTab || 'home';
  const effectiveBadge = appointmentBadgeCount !== undefined ? appointmentBadgeCount : upcomingCount;

  const tabs = [
    { id: 'home' as MainTab, label: 'Home', icon: Home },
    { id: 'doctors' as MainTab, label: 'Doctors', icon: Users },
    { id: 'appointments' as MainTab, label: 'Appointments', icon: Calendar, badge: effectiveBadge },
    { id: 'health' as MainTab, label: 'Health', icon: HeartPulse },
    { id: 'profile' as MainTab, label: 'Profile', icon: User }
  ];

  return (
    <nav
      id="bottom-navigation"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#12302D]/10 pb-[env(safe-area-inset-bottom,12px)] pt-1.5 transition-all shadow-[0_-4px_20px_rgba(15,118,110,0.06)]"
    >
      <div className="flex items-center justify-around px-1 sm:px-2 max-w-lg mx-auto w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = effectiveTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 sm:px-3 min-w-[46px] sm:min-w-[56px] min-h-[48px] rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#0F766E]'
                  : 'text-[#64748B] hover:text-[#12302D]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.4] scale-110' : 'stroke-[1.75]'
                  }`}
                />
                {tab.badge && tab.badge > 0 && (
                  <span
                    id={`nav-badge-${tab.id}`}
                    className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#0F766E] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-medium transition-all ${
                  isActive ? 'font-bold text-[#0F766E]' : 'text-[#64748B]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-0.5 animate-in fade-in zoom-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
