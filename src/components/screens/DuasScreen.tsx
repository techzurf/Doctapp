import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  Search, 
  Sparkles,
  Share2,
  RefreshCw
} from 'lucide-react';
import { DuaItem } from '../../types';

interface DuasScreenProps {
  duas: DuaItem[];
  onBack: () => void;
  onBookmarkDua?: (duaId: string) => void;
}

export const DuasScreen: React.FC<DuasScreenProps> = ({
  duas,
  onBack,
  onBookmarkDua
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['dua-1', 'dua-2']);

  const categories = ['All', 'Illness', 'Visiting the Sick', 'Pain in Body', 'Anxiety & Distress', 'Before Surgery'];

  const filteredDuas = duas.filter(d => {
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const meaning = d.englishMeaning || d.meaningEn || '';
    const translit = d.transliteration || '';
    const matchesSearch = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (dua: DuaItem) => {
    const arText = dua.arabicText || dua.arabic || '';
    const enText = dua.englishMeaning || dua.meaningEn || '';
    const tmText = dua.tamilMeaning || dua.meaningTamil || '';
    const textToCopy = `${dua.title}\n\n${arText}\n\n${dua.transliteration}\n\nEnglish: ${enText}\n\nTamil: ${tmText}\n\nSource: ${dua.source}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTogglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Auto pause after 6s in demo prototype
      setTimeout(() => {
        setPlayingId(prev => (prev === id ? null : prev));
      }, 6000);
    }
  };

  const handleIncrementCounter = (duaId: string, maxCount: number = 7) => {
    setCounters(prev => {
      const current = prev[duaId] || 0;
      const next = current >= maxCount ? 0 : current + 1;
      return { ...prev, [duaId]: next };
    });
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    if (onBookmarkDua) onBookmarkDua(id);
  };

  return (
    <div id="duas-screen" className="pb-24 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          id="duas-back-btn"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-[#12302D] hover:bg-slate-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#12302D]">Duas for Healing (Shifa)</h1>
          <p className="text-xs text-slate-500">Authentic prophetic supplications</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search healing duas, symptoms, anxiety..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs text-[#12302D] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F766E] shadow-2xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-4 pt-1">
        {filteredDuas.map((dua) => {
          const isCopied = copiedId === dua.id;
          const isPlaying = playingId === dua.id;
          const isBookmarked = bookmarkedIds.includes(dua.id);
          const count = counters[dua.id] || 0;

          return (
            <div
              key={dua.id}
              id={`dua-card-${dua.id}`}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4 relative overflow-hidden"
            >
              {/* Category & Verified Hadith Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F766E] text-[10px] font-bold">
                  {dua.category}
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Recitation Counter button if recommended count exists */}
                  {dua.recommendedCount && (
                    <button
                      type="button"
                      onClick={() => handleIncrementCounter(dua.id, dua.recommendedCount)}
                      className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <RefreshCw className="w-2.5 h-2.5 text-amber-700" />
                      <span>{count}/{dua.recommendedCount} Times</span>
                    </button>
                  )}

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(dua.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F766E]"
                    aria-label="Bookmark dua"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#0F766E] fill-[#0F766E]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-sm font-bold text-[#12302D]">
                {dua.title}
              </h2>

              {/* Arabic Text Display */}
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100/80 text-right">
                <p 
                  dir="rtl" 
                  className="font-arabic text-xl leading-loose font-medium text-[#12302D]"
                  style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
                >
                  {dua.arabicText}
                </p>
              </div>

              {/* Transliteration */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Transliteration
                </span>
                <p className="text-xs font-medium text-slate-700 italic leading-relaxed">
                  {dua.transliteration}
                </p>
              </div>

              {/* English Meaning */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] block">
                  English Meaning
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “{dua.englishMeaning}”
                </p>
              </div>

              {/* Tamil Meaning (Authentic Regional Translation) */}
              <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  தமிழ் பொருள் (Tamil Translation)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  “{dua.tamilMeaning}”
                </p>
              </div>

              {/* Verified Source & Interactive Audio / Copy Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[10px] font-semibold text-slate-400 truncate max-w-[180px]">
                  📖 {dua.source}
                </div>

                <div className="flex items-center gap-2">
                  {/* Audio Play simulation */}
                  <button
                    type="button"
                    onClick={() => handleTogglePlay(dua.id)}
                    className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all ${
                      isPlaying
                        ? 'bg-[#0F766E] text-white border-[#0F766E]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />}
                    <span className="text-[10px]">{isPlaying ? 'Playing...' : 'Audio'}</span>
                  </button>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(dua)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1 text-[10px] font-semibold"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
