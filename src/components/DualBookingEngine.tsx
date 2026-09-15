import React, { useState } from 'react';
import { Stethoscope, Video, Calendar, Clock, MapPin, CheckCircle, ArrowRight, ShieldCheck, Zap, UserCheck, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCTORS, SERVICE_LOCATIONS } from '../data/mockData';
import { Doctor } from '../types';

export const DualBookingEngine: React.FC = () => {
  const { language, t, openBookingModal, openTelehealthModal } = useLanguage();
  const [bookingMode, setBookingMode] = useState<'in-clinic' | 'video'>('video');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialtyId === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || doc.locationId === selectedLocation;
    return matchesSpecialty && (bookingMode === 'video' ? true : matchesLocation);
  });

  return (
    <section id="booking-engine-section" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0B2545] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>{t('Smart Dual Booking Engine', 'স্মার্ট ডুয়াল বুকিং ইঞ্জিন')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Choose How You Want to Consult', 'পছন্দ অনুযায়ী নিন ইন-ক্লিনিক বা ভিডিও পরামর্শ')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Switch seamlessly between In-Clinic specialist visits at our premium hubs or connect instantly with a doctor via encrypted video consultation.',
              'আমাদের বিশ্বমানের ক্লিনিকে সরাসরি অ্যাপয়েন্টমেন্ট নিন অথবা ঘরে বসেই কয়েক মিনিটে ভিডিও কলে বিশেষজ্ঞ চিকিৎসকের পরামর্শ গ্রহণ করুন।'
            )}
          </p>
        </div>

        {/* Dual Mode Switcher Bar */}
        <div className="max-w-xl mx-auto mb-8 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setBookingMode('in-clinic')}
            className={`py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              bookingMode === 'in-clinic'
                ? 'bg-[#0B2545] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#139A8C]" />
            <span>{t('In-Clinic Visit', 'ইন-ক্লিনিক সরাসরি ভিজিট')}</span>
          </button>
          <button
            type="button"
            onClick={() => setBookingMode('video')}
            className={`py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              bookingMode === 'video'
                ? 'bg-[#139A8C] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="flex items-center gap-1.5">
              {t('Instant Video Consult', 'ইন্সট্যান্ট ভিডিও কনসাল্ট')}
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            </span>
          </button>
        </div>

        {/* Mode Information & Guarantee Banner */}
        {bookingMode === 'video' ? (
          <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent rounded-2xl border border-[#139A8C]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#139A8C] text-white flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B2545]">
                  {t('Telehealth Video Consultations Live', 'লাইভ ভিডিও কনসালটেশন প্রস্তুত')}
                </h4>
                <p className="text-xs text-slate-500">
                  {t('Average wait time right now: ~6 minutes • Verified Digital E-Prescription issued', 'বর্তমান গড় অপেক্ষা সময়: ~৬ মিনিট • সাথে সাথে ডিজিটাল প্রেসক্রিপশন')}
                </p>
              </div>
            </div>
            <button
              onClick={() => openTelehealthModal()}
              className="px-4 py-2 bg-[#139A8C] hover:bg-[#0f8276] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('Launch Telehealth Room', 'টেলিমেডিসিন রুম খুলুন')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B2545]">
                  {t('Premium In-Clinic Consultation Centers', 'প্রিমিয়াম আধুনিক ক্লিনিক্যাল হাব')}
                </h4>
                <p className="text-xs text-slate-500">
                  {t('Sanitized private consultation suites, zero wait-time booking, full diagnostic support', 'স্বাস্থ্যকর ব্যক্তিগত কনসালটেশন রুম, দীর্ঘ লাইন ছাড়া সেবা')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-xs bg-white border border-slate-300 px-3 py-2 rounded-xl font-semibold text-slate-700 focus:outline-hidden focus:border-[#139A8C] cursor-pointer"
              >
                <option value="all">{t('All Clinic Hubs', 'সকল ক্লিনিক হাব')}</option>
                {SERVICE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {language === 'bn' ? loc.name.bn : loc.name.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Doctor Availability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => {
            const fee = bookingMode === 'in-clinic' ? doctor.feeInClinic : doctor.feeVideo;
            return (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#139A8C] hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
              >
                {/* Doctor Head */}
                <div>
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name.en}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 group-hover:border-[#139A8C] transition-colors"
                      />
                      {bookingMode === 'video' && doctor.isAvailableNowVideo && (
                        <span
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"
                          title="Online & Ready for Video Consult"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-[#0B2545] truncate group-hover:text-[#139A8C] transition-colors">
                          {language === 'bn' ? doctor.name.bn : doctor.name.en}
                        </h3>
                      </div>
                      <p className="text-xs text-[#139A8C] font-semibold truncate">
                        {language === 'bn' ? doctor.specialty.bn : doctor.specialty.en}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{doctor.degrees}</p>
                    </div>
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3.5">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{doctor.rating}</span>
                      <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
                    </div>
                    <div className="text-slate-500">
                      {doctor.experienceYears} {t('Years Exp.', 'বছরের অভিজ্ঞতা')}
                    </div>
                  </div>

                  {/* Next Slot Display */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-[#139A8C]" />
                      <span>
                        <strong className="text-slate-900">{t('Next Available:', 'পরবর্তী সময়:')}</strong>{' '}
                        {language === 'bn' ? doctor.nextAvailableSlot.bn : doctor.nextAvailableSlot.en}
                      </span>
                    </div>
                    {bookingMode === 'in-clinic' && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{language === 'bn' ? doctor.location.bn : doctor.location.en}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Fee & Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">
                      {bookingMode === 'in-clinic' ? t('In-Clinic Fee', 'ক্লিনিক ফি') : t('Video Consult Fee', 'ভিডিও ফি')}
                    </span>
                    <span className="text-lg font-black text-[#0B2545]">৳{fee}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (bookingMode === 'video') {
                        openBookingModal(doctor.id, 'video');
                      } else {
                        openBookingModal(doctor.id, 'in-clinic');
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                      bookingMode === 'video'
                        ? 'bg-[#139A8C] hover:bg-[#0f8276]'
                        : 'bg-[#0B2545] hover:bg-[#139A8C]'
                    }`}
                  >
                    <span>{bookingMode === 'video' ? t('Book Video Slot', 'ভিডিও বুক করুন') : t('Book Clinic Slot', 'ক্লিনিক স্লট নিন')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
