import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  PhoneOff, 
  FileText, 
  FolderPlus, 
  NotebookPen, 
  X, 
  Send, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { Appointment } from '../../types';

interface OnlineConsultationScreenProps {
  appointment: Appointment;
  onEndConsultation: () => void;
  onViewPrescription: () => void;
  onViewRecords: () => void;
}

export const OnlineConsultationScreen: React.FC<OnlineConsultationScreenProps> = ({
  appointment,
  onEndConsultation,
  onViewPrescription,
  onViewRecords
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(384); // 06:24 in consultation

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { sender: 'doctor', text: 'Assalamu Alaikum Ahmed, how are your throat symptoms today?', time: '10:31 AM' },
    { sender: 'patient', text: 'Wa Alaikumas Salam Dr. Fever is down, but mild dry cough persists.', time: '10:32 AM' },
    { sender: 'doctor', text: 'Alhamdulillah fever is reduced. I am sending an updated saline steam & lozenge prescription.', time: '10:34 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'patient', text: inputMessage, time: 'Now' }
    ]);
    setInputMessage('');
  };

  return (
    <div id="online-consultation-screen" className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col justify-between select-none safe-top safe-bottom">
      {/* Top Header Overlay */}
      <div className="p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={appointment.doctorPhoto}
              alt={appointment.doctorName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-white">{appointment.doctorName}</h2>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <p className="text-[10px] text-slate-300 font-medium">{appointment.doctorSpecialty}</p>
          </div>
        </div>

        {/* Live Call Duration Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{formatTimer(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Main Video Stream Container */}
      <div className="relative flex-1 w-full bg-[#1E293B] overflow-hidden flex items-center justify-center">
        {/* Doctor Video Placeholder with subtle realistic animated simulation */}
        <img
          src={appointment.doctorPhoto}
          alt="Doctor stream"
          className="w-full h-full object-cover opacity-85 filter contrast-105"
        />

        {/* Gradient dark vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Doctor speaking indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Dr. Mohammed is speaking</span>
        </div>

        {/* Quick Access Top Bar in call */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onViewPrescription}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-md active:scale-95"
          >
            <FileText className="w-4 h-4 text-teal-300" />
            <span className="text-[10px] pr-1">Rx</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-md active:scale-95"
          >
            <NotebookPen className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] pr-1">Notes</span>
          </button>
        </div>

        {/* Self PIP (Picture-In-Picture) Camera Preview */}
        <div className="absolute bottom-4 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-slate-800 flex items-center justify-center">
          {isVideoOff ? (
            <div className="text-center p-2">
              <VideoOff className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-300">Camera Off</span>
            </div>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
              alt="You"
              className="w-full h-full object-cover"
            />
          )}
          <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
            You (Ahmed)
          </span>
        </div>
      </div>

      {/* DOCTOR NOTES SLIDEOUT */}
      {showNotes && (
        <div className="absolute inset-x-4 top-20 z-30 bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl space-y-2">
          <div className="flex justify-between items-center pb-1 border-b border-white/10">
            <h3 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <NotebookPen className="w-3.5 h-3.5" /> Doctor’s Realtime Notes
            </h3>
            <button onClick={() => setShowNotes(false)} className="text-slate-400 p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-200">
            • Patient reports fever subsided from 101°F to normal over 48 hours.
          </p>
          <p className="text-xs text-slate-200">
            • Residual productive cough with seasonal allergy pattern.
          </p>
          <p className="text-xs text-slate-200">
            • Prescribed saline steam & Levocetirizine 5mg at bedtime.
          </p>
        </div>
      )}

      {/* CHAT DRAWER */}
      {showChat && (
        <div className="absolute inset-x-0 bottom-24 top-20 z-30 bg-slate-900/95 backdrop-blur-md flex flex-col justify-between p-4 border-t border-white/20">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-teal-400" /> In-Call Consultation Chat
            </h3>
            <button onClick={() => setShowChat(false)} className="text-slate-400 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 py-3 no-scrollbar">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'patient' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[80%] text-xs ${
                    msg.sender === 'patient'
                      ? 'bg-[#0F766E] text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/10'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type message to doctor..."
              className="flex-1 bg-slate-800 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#0F766E] text-white hover:bg-[#14B8A6]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-3">
        <div className="flex items-center justify-center gap-4">
          {/* Mute Mic */}
          <button
            type="button"
            id="call-toggle-mic-btn"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-md active:scale-95 transition-all ${
              isMuted ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-white border-white/20 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video */}
          <button
            type="button"
            id="call-toggle-video-btn"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-md active:scale-95 transition-all ${
              isVideoOff ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-white border-white/20 hover:bg-slate-700'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Speaker */}
          <button
            type="button"
            id="call-toggle-speaker-btn"
            onClick={() => setIsSpeakerOff(!isSpeakerOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-md active:scale-95 transition-all ${
              isSpeakerOff ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-white border-white/20 hover:bg-slate-700'
            }`}
          >
            {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Chat Toggle */}
          <button
            type="button"
            id="call-toggle-chat-btn"
            onClick={() => setShowChat(!showChat)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-md active:scale-95 transition-all relative ${
              showChat ? 'bg-[#0F766E] text-white border-[#14B8A6]' : 'bg-slate-800 text-white border-white/20 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-400" />
          </button>

          {/* End Consultation */}
          <button
            type="button"
            id="call-end-btn"
            onClick={onEndConsultation}
            className="w-14 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-900/40 active:scale-95 transition-all"
            aria-label="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4 text-[11px] text-slate-400 pt-1">
          <button onClick={onViewRecords} className="hover:text-white underline">
            View Patient History
          </button>
          <span>•</span>
          <button onClick={onViewPrescription} className="hover:text-white underline">
            View Live Rx
          </button>
        </div>
      </div>
    </div>
  );
};
