import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Stethoscope, Video, CheckCircle2, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCTORS } from '../data/mockData';

export const BookingModal: React.FC = () => {
  const { language, t, isBookingOpen, bookingDoctorId, bookingConsultType, closeAllModals } = useLanguage();

  const [selectedDoctorId, setSelectedDoctorId] = useState(bookingDoctorId || DOCTORS[0].id);
  const [consultType, setConsultType] = useState<'in-clinic' | 'video'>(bookingConsultType || 'in-clinic');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('04:30 PM - 05:00 PM');

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [notes, setNotes] = useState('');

  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (bookingDoctorId) setSelectedDoctorId(bookingDoctorId);
    if (bookingConsultType) setConsultType(bookingConsultType);
    setIsBooked(false);
  }, [bookingDoctorId, bookingConsultType, isBookingOpen]);

  if (!isBookingOpen) return null;

  const currentDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];
  const fee = consultType === 'in-clinic' ? currentDoctor.feeInClinic : currentDoctor.feeVideo;

  const availableSlots = [
    '10:30 AM - 11:00 AM',
    '11:30 AM - 12:00 PM',
    '04:30 PM - 05:00 PM',
    '05:30 PM - 06:00 PM',
    '07:00 PM - 07:30 PM',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AC-DOC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={closeAllModals}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#139A8C] mb-1">
                {consultType === 'in-clinic' ? <Stethoscope className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                <span>{consultType === 'in-clinic' ? t('In-Clinic Appointment', 'ইন-ক্লিনিক অ্যাপয়েন্টমেন্ট') : t('Video Telehealth Booking', 'ভিডিও কনসালটেশন বুকিং')}</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0B2545]">
                {t('Confirm Doctor & Appointment Time', 'ডাক্তার ও অ্যাপয়েন্টমেন্ট সময় নির্ধারণ করুন')}
              </h3>
            </div>

            {/* Doctor summary bar */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-center gap-3">
              <img
                src={currentDoctor.avatar}
                alt={currentDoctor.name.en}
                className="w-14 h-14 rounded-xl object-cover border border-[#139A8C]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#0B2545] truncate">
                    {language === 'bn' ? currentDoctor.name.bn : currentDoctor.name.en}
                  </h4>
                  <span className="text-sm font-black text-[#139A8C]">৳{fee}</span>
                </div>
                <p className="text-xs text-[#139A8C] font-semibold">
                  {language === 'bn' ? currentDoctor.specialty.bn : currentDoctor.specialty.en}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{currentDoctor.degrees}</p>
              </div>
            </div>

            {/* Mode switch */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setConsultType('in-clinic')}
                className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  consultType === 'in-clinic' ? 'bg-white text-[#0B2545] shadow-xs' : 'text-slate-600'
                }`}
              >
                {t('In-Clinic Visit', 'ক্লিনিক সরাসরি ভিজিট')}
              </button>
              <button
                type="button"
                onClick={() => setConsultType('video')}
                className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  consultType === 'video' ? 'bg-[#139A8C] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                {t('Instant Video Consult', 'ভিডিও কনসালটেশন')}
              </button>
            </div>

            {/* Date and Slots */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('Select Date', 'তারিখ নির্বাচন')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Day After'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#0B2545] text-white border-[#0B2545]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t(d, d === 'Today' ? 'আজকে' : d === 'Tomorrow' ? 'আগামীকাল' : 'পরশু দিন')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('Select Available Slot', 'উপলব্ধ সময়সূচি')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2.5 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-[#139A8C] text-white border-[#139A8C]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Info Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Patient Full Name', 'রোগীর পুরো নাম')}
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Mobile Number for SMS Pass', 'মোবাইল নম্বর (এসএমএস এর জন্য)')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="018xxxxxxxx"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('Brief Medical Reason / Symptoms (Optional)', 'সমস্যা বা লক্ষণ সংক্ষেপে লিখুন (ঐচ্ছিক)')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('e.g. Follow-up for blood pressure and routine review', 'যেমন: প্রেসার চেক ও রুটিন চেকআপ...')}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0B2545] hover:bg-[#139A8C] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t(`Confirm Slot & Pay ৳${fee} at Clinic`, `অ্যাপয়েন্টমেন্ট নিশ্চিত করুন (৳${fee})`)}</span>
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100 text-[#139A8C] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#0B2545]">
              {t('Appointment Confirmed!', 'অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!')}
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              {t(
                `Your booking token is ${bookingRef}. An SMS confirmation with clinic room directions and doctor token has been sent to ${phone}.`,
                `বুকিং টোকেন: ${bookingRef}। আপনার মোবাইল নম্বরে নিশ্চিতকরণ এসএমএস এবং ক্লিনিক নির্দেশিকা পাঠানো হয়েছে।`
              )}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1">
              <div><strong>{t('Doctor:', 'ডাক্তার:')}</strong> {language === 'bn' ? currentDoctor.name.bn : currentDoctor.name.en}</div>
              <div><strong>{t('Date & Slot:', 'সময়:')}</strong> {selectedDate}, {selectedSlot}</div>
              <div><strong>{t('Mode:', 'মাধ্যম:')}</strong> {consultType === 'in-clinic' ? 'In-Clinic Visit' : 'Video Consult'}</div>
              <div><strong>{t('Consultation Fee:', 'ভিজিট ফি:')}</strong> ৳{fee}</div>
            </div>

            <button
              onClick={closeAllModals}
              className="px-6 py-2.5 bg-[#0B2545] text-white font-bold text-xs rounded-xl hover:bg-[#139A8C] transition-colors cursor-pointer"
            >
              {t('Done', 'সম্পন্ন')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
