import React, { useState } from 'react';
import { MapPin, ChevronDown, Bell, Users, Check } from 'lucide-react';
import { CITIES } from '../../data/mockData';

interface TopHeaderProps {
  currentCity: string;
  onCityChange: (city: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenFamily: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentCity,
  onCityChange,
  unreadCount,
  onOpenNotifications,
  onOpenFamily
}) => {
  const [showCityPicker, setShowCityPicker] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#F7FAF9]/90 backdrop-blur-md border-b border-slate-200/60 px-4 py-2.5 safe-top w-full">
      <div className="max-w-lg mx-auto flex items-center justify-between w-full min-w-0">
        {/* City Location Selector */}
        <div className="relative">
          <button
            type="button"
            id="city-picker-btn"
            onClick={() => setShowCityPicker(!showCityPicker)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all text-left"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
            <span className="text-xs font-bold text-[#12302D]">{currentCity}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showCityPicker && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select City
              </div>
              {CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  id={`select-city-${city.toLowerCase()}`}
                  onClick={() => {
                    onCityChange(city);
                    setShowCityPicker(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    currentCity === city ? 'font-bold text-[#0F766E] bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{city}</span>
                  {currentCity === city && <Check className="w-3.5 h-3.5 text-[#0F766E]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions: Family Switcher & Notifications */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="header-family-btn"
            onClick={onOpenFamily}
            className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-[#12302D] hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            aria-label="Family profiles"
          >
            <Users className="w-3.5 h-3.5 text-[#0F766E]" />
            <span className="text-[11px] font-semibold hidden sm:inline">Family</span>
          </button>

          <button
            type="button"
            id="header-notifications-btn"
            onClick={onOpenNotifications}
            className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-[#12302D] hover:bg-slate-50 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
