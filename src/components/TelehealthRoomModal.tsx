import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, ShieldCheck, UserCheck, CheckCircle2, FileText, Download, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCTORS } from '../data/mockData';

export const TelehealthRoomModal: React.FC = () => {
  const { language, t, isTelehealthOpen, closeAllModals } = useLanguage();

  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'doc' | 'me'; text: string; time: string }>>([
    { sender: 'doc', text: 'Hello! I can hear you clearly. Could you tell me about the symptoms you are having?', time: 'Just now' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);

  const activeDoc = DOCTORS.find((d) => d.isAvailableNowVideo) || DOCTORS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTelehealthOpen) {
      setCallStatus('connecting');
      setElapsedSeconds(0);
      setShowPrescription(false);

      const connectTimer = setTimeout(() => {
        setCallStatus('active');
      }, 2500);

      return () => clearTimeout(connectTimer);
    }
  }, [isTelehealthOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'active') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isTelehealthOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newMsg = { sender: 'me' as const, text: messageInput, time: 'Just now' };
    setChatMessages((prev) => [...prev, newMsg]);
    setMessageInput('');

    // Simulated doctor auto-reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doc',
          text: language === 'bn' 
            ? 'ধন্যবাদ। আমি আপনার লক্ষণ অনুযায়ী ওষুধ এবং প্রয়োজনীয় ডায়াগনস্টিক পরীক্ষার ডিজিটাল প্রেসক্রিপশন প্রস্তুত করেছি।'
            : 'Thank you for explaining. I have updated your digital clinical notes and prepared your verified e-prescription.',
          time: 'Just now',
        },
      ]);
      setShowPrescription(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0B2545] text-white rounded-3xl max-w-5xl w-full h-[92vh] max-h-[800px] shadow-2xl border border-slate-700 flex flex-col overflow-hidden relative">
        {/* Call Header */}
        <div className="p-4 bg-[#081B33] border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeDoc.avatar}
                alt={activeDoc.name.en}
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-400"
              />
              <span className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-[#0B2545]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? activeDoc.name.bn : activeDoc.name.en}
              </h4>
              <p className="text-[11px] text-teal-300">
                {language === 'bn' ? activeDoc.specialty.bn : activeDoc.specialty.en} • {activeDoc.degrees}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {callStatus === 'active' && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>
            )}
            <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{t('256-bit HIPAA-Compliant Video', 'সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত')}</span>
            </div>
          </div>
        </div>

        {/* Video Stage & Chat Split */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
          {/* Main Video Screen */}
          <div className="lg:col-span-8 bg-slate-950 relative flex items-center justify-center p-4">
            {callStatus === 'connecting' ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full border-4 border-teal-400 border-t-transparent animate-spin mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t('Establishing Secure Encrypted Video Stream...', 'নিরাপদ ভিডিও কনসাল্টেশনে যুক্ত হচ্ছে...')}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {t('Connecting with consultant on call', 'ডাক্তারের সাথে সংযোগ স্থাপন করা হচ্ছে')}
                  </p>
                </div>
              </div>
            ) : callStatus === 'active' ? (
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {cameraActive ? (
                  <img
                    src={activeDoc.avatar}
                    alt={activeDoc.name.en}
                    className="w-full h-full object-cover opacity-90 filter contrast-105"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <VideoOff className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-xs">Camera Feed Paused</p>
                  </div>
                )}

                {/* Self View (Picture in Picture) */}
                <div className="absolute top-4 right-4 w-32 h-24 sm:w-40 sm:h-28 rounded-xl bg-slate-800 border-2 border-teal-400/80 overflow-hidden shadow-2xl flex items-center justify-center text-center p-2">
                  <span className="text-[10px] text-teal-200 font-semibold">
                    {t('Patient Video Feed (You)', 'আপনার ক্যামেরা ফিড')}
                  </span>
                </div>

                {/* Live doctor speech banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-teal-200 font-bold">{language === 'bn' ? activeDoc.name.bn : activeDoc.name.en}:</span>
                    <span className="text-white truncate">"Reviewing vitals and symptom duration..."</span>
                  </div>
                  {showPrescription && (
                    <button
                      onClick={() => setShowPrescription(true)}
                      className="px-2.5 py-1 rounded-lg bg-[#139A8C] text-white text-[11px] font-bold shrink-0 cursor-pointer"
                    >
                      {t('View Prescription', 'প্রেসক্রিপশন দেখুন')}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  {t('Consultation Completed Successfully', 'ভিডিও পরামর্শ সম্পন্ন হয়েছে')}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  {t('Your digital prescription has been sent via SMS and is available for instant download below.', 'আপনার ডিজিটাল প্রেসক্রিপশন তৈরি হয়ে গেছে।')}
                </p>
              </div>
            )}
          </div>

          {/* Right: Live Chat & Digital Prescription Panel */}
          <div className="lg:col-span-4 bg-[#081B33] border-l border-slate-700 flex flex-col justify-between">
            {/* Tab switch inside sidebar */}
            <div className="p-3 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                {t('Clinical Notes & Chat', 'ক্লিনিক্যাল চ্যাট ও নোট')}
              </span>
              {showPrescription && (
                <span className="text-[10px] font-bold text-green-400 bg-green-950 px-2 py-0.5 rounded-full border border-green-700">
                  {t('Prescription Ready', 'প্রেসক্রিপশন প্রস্তুত')}
                </span>
              )}
            </div>

            {/* Chat message list */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                    msg.sender === 'me'
                      ? 'ml-auto bg-[#139A8C] text-white rounded-br-none'
                      : 'mr-auto bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-70 block text-right mt-1">{msg.time}</span>
                </div>
              ))}

              {showPrescription && (
                <div className="p-3 bg-teal-900/40 border border-teal-500/50 rounded-2xl text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {t('E-Prescription #RX-77402', 'ই-প্রেসক্রিপশন #RX-77402')}
                    </span>
                    <span className="text-[10px] text-slate-400">QR-Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    1. Tab. Paracetamol 500mg (1+1+1 for 3 days)<br />
                    2. Cap. Omeprazole 20mg (1+0+1 before meals)<br />
                    3. CBC with Differential (Accredited lab)
                  </p>
                  <button
                    onClick={() => alert('Digital E-Prescription downloaded as PDF.')}
                    className="w-full py-1.5 bg-[#139A8C] text-white font-bold text-[11px] rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>{t('Download PDF Prescription', 'পিডিএফ ডাউনলোড করুন')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-700 flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={t('Type symptom or ask question...', 'প্রশ্ন বা লক্ষণ লিখুন...')}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-400"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="px-3 py-2 bg-[#139A8C] hover:bg-[#0f8276] disabled:bg-slate-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {t('Send', 'পাঠান')}
              </button>
            </form>
          </div>
        </div>

        {/* Call Controls Footer */}
        <div className="p-4 bg-[#081B33] border-t border-slate-700 flex items-center justify-center gap-4">
          <button
            onClick={() => setMicActive(!micActive)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              micActive ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 text-white'
            }`}
            title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setCameraActive(!cameraActive)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              cameraActive ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 text-white'
            }`}
            title={cameraActive ? 'Turn Off Video' : 'Turn On Video'}
          >
            {cameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setCallStatus('ended');
              setTimeout(() => {
                closeAllModals();
              }, 1200);
            }}
            className="w-14 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
