import React, { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin, Video, Stethoscope, Play, ShieldCheck, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCTORS, SERVICE_LOCATIONS } from '../data/mockData';
import { Doctor } from '../types';

export const DoctorDirectory: React.FC = () => {
  const { language, t, openBookingModal, openTelehealthModal } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [consultationFilter, setConsultationFilter] = useState<'all' | 'in-clinic' | 'video'>('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [maxFee, setMaxFee] = useState<number>(2000);

  // Video intro modal
  const [activeVideoDoc, setActiveVideoDoc] = useState<Doctor | null>(null);

  const filteredDoctors = DOCTORS.filter((doc) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      doc.name.en.toLowerCase().includes(q) ||
      doc.name.bn.includes(q) ||
      doc.specialty.en.toLowerCase().includes(q) ||
      doc.specialty.bn.includes(q) ||
      doc.degrees.toLowerCase().includes(q);

    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialtyId === selectedSpecialty;
    const matchesGender = selectedGender === 'all' || doc.gender === selectedGender;
    const matchesLocation = selectedLocation === 'all' || doc.locationId === selectedLocation;
    const matchesFee = doc.feeInClinic <= maxFee || doc.feeVideo <= maxFee;

    const matchesConsultType =
      consultationFilter === 'all' ||
      (consultationFilter === 'video' && doc.isAvailableNowVideo) ||
      (consultationFilter === 'in-clinic');

    return matchesSearch && matchesSpecialty && matchesGender && matchesLocation && matchesFee && matchesConsultType;
  });

  return (
    <section id="doctors-section" className="py-16 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t('Verified Medical Specialists', 'ভেরিফায়েড বিশেষজ্ঞ চিকিৎসকগণ')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Consult Top Doctors Across 30+ Specialties', 'আপনার প্রয়োজন অনুযায়ী সেরা বিশেষজ্ঞ নির্বাচন করুন')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Our multidisciplinary consultants are graduates of top global institutes, prioritizing empathetic listening, clear communication, and personalized recovery plans.',
              'সহানুভূতিশীল সেবা ও নির্ভুল চিকিৎসার প্রতিশ্রুতি নিয়ে আমাদের অভিজ্ঞ ডাক্তারগণ প্রস্তুত আপনার পাশে থাকতে।'
            )}
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg border border-slate-200/90 mb-10 space-y-4">
          {/* Row 1: Search & Quick Type */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search doctors by name, specialty, condition...', 'ডাক্তারের নাম বা বিশেষত্ব লিখে খুঁজুন...')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-[#139A8C]"
              >
                <option value="all">{t('All Specialties', 'সকল বিভাগ')}</option>
                <option value="family-medicine">{t('Family Medicine', 'ফ্যামিলি মেডিসিন')}</option>
                <option value="cardiology">{t('Cardiology', 'কার্ডিওলজি (হৃদরোগ)')}</option>
                <option value="endocrinology">{t('Endocrinology & Diabetes', 'এন্ডোক্রাইনোলজি ও ডায়াবেটিস')}</option>
                <option value="gynecology">{t('Gynecology & Obstetrics', 'গাইনোকোলজি ও প্রসূতি')}</option>
                <option value="pediatrics">{t('Pediatrics (Child Health)', 'শিশু ও নবজাতক')}</option>
                <option value="gastroenterology">{t('Gastroenterology', 'গ্যাস্ট্রোএন্টারোলজি')}</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-[#139A8C]"
              >
                <option value="all">{t('All Locations', 'সকল লোকেশন')}</option>
                {SERVICE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {language === 'bn' ? loc.name.bn : loc.name.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Secondary Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            {/* Gender Filters */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{t('Gender:', 'লিঙ্গ:')}</span>
              <button
                onClick={() => setSelectedGender('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedGender === 'all' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('All', 'সবাই')}
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedGender === 'female' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('Female Doctors', 'নারী চিকিৎসক')}
              </button>
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedGender === 'male' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('Male Doctors', 'পুরুষ চিকিৎসক')}
              </button>
            </div>

            {/* Consultation Mode */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{t('Consultation:', 'কনসালটেশন:')}</span>
              <button
                onClick={() => setConsultationFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  consultationFilter === 'all' ? 'bg-[#139A8C] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('Both Modes', 'উভয় মাধ্যম')}
              </button>
              <button
                onClick={() => setConsultationFilter('video')}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer flex items-center gap-1 ${
                  consultationFilter === 'video' ? 'bg-[#139A8C] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Video className="w-3 h-3" />
                <span>{t('Instant Video Available', 'লাইভ ভিডিও প্রস্তুত')}</span>
              </button>
            </div>

            {/* Clear filters */}
            {(searchQuery || selectedSpecialty !== 'all' || selectedGender !== 'all' || selectedLocation !== 'all' || consultationFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                  setSelectedGender('all');
                  setSelectedLocation('all');
                  setConsultationFilter('all');
                }}
                className="text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
              >
                {t('Reset Filters', 'ফিল্টার মুছুন')}
              </button>
            )}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#139A8C] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Avatar & Video Intro Tag */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name.en}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#139A8C] transition-colors shadow-sm"
                    />
                    {doc.isAvailableNowVideo && (
                      <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Live
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewCount} {t('reviews', 'রিভিউ')})</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B2545] truncate group-hover:text-[#139A8C] transition-colors">
                      {language === 'bn' ? doc.name.bn : doc.name.en}
                    </h3>
                    <p className="text-xs text-[#139A8C] font-semibold truncate">
                      {language === 'bn' ? doc.specialty.bn : doc.specialty.en}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.degrees}</p>
                  </div>
                </div>

                {/* About Snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {language === 'bn' ? doc.about.bn : doc.about.en}
                </p>

                {/* Quick Credentials Chips */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                    {doc.experienceYears}+ {t('Years Experience', 'বছরের অভিজ্ঞতা')}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                    {doc.languages.join(', ')}
                  </span>
                </div>

                {/* Video Intro preview button */}
                <button
                  type="button"
                  onClick={() => setActiveVideoDoc(doc)}
                  className="w-full py-1.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#139A8C] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t('Watch Doctor Video Introduction', 'ডাক্তারের ভিডিও পরিচিতি দেখুন')}</span>
                </button>

                {/* Slot preview */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#139A8C]" />
                      <span className="font-semibold">{t('Next Available:', 'পরবর্তী সময়:')}</span>
                    </span>
                    <span className="font-bold text-[#0B2545]">
                      {language === 'bn' ? doc.nextAvailableSlot.bn : doc.nextAvailableSlot.en}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>{t('In-Clinic:', 'ক্লিনিক:')} <strong>৳{doc.feeInClinic}</strong></span>
                    <span>{t('Video Consult:', 'ভিডিও কল:')} <strong>৳{doc.feeVideo}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openBookingModal(doc.id, 'in-clinic')}
                  className="py-2.5 px-3 bg-[#0B2545] hover:bg-[#139A8C] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{t('In-Clinic', 'ক্লিনিক বুক')}</span>
                </button>

                <button
                  onClick={() => openBookingModal(doc.id, 'video')}
                  className="py-2.5 px-3 bg-[#139A8C] hover:bg-[#0f8276] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{t('Instant Video', 'ভিডিও কল')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Video Introduction Preview */}
        {activeVideoDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#139A8C]" />
                  <h4 className="text-sm font-bold text-[#0B2545]">
                    {language === 'bn' ? activeVideoDoc.name.bn : activeVideoDoc.name.en} - {t('Video Introduction', 'ভিডিও পরিচিতি')}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideoDoc(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Video Player Mock */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-inner">
                <img
                  src={activeVideoDoc.avatar}
                  alt={activeVideoDoc.name.en}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="text-xs font-bold text-teal-300">
                    {language === 'bn' ? activeVideoDoc.specialty.bn : activeVideoDoc.specialty.en}
                  </div>
                  <div className="text-sm font-black">
                    "{t('My clinical philosophy is listening before prescribing.', 'প্রেসক্রিপশনের পূর্বে রোগীর প্রতিটি কথা মনোযোগ দিয়ে শোনাই আমার মূল নীতি।')}"
                  </div>
                </div>
                <div className="absolute w-12 h-12 rounded-full bg-[#139A8C]/90 text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'bn' ? activeVideoDoc.about.bn : activeVideoDoc.about.en}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const docId = activeVideoDoc.id;
                    setActiveVideoDoc(null);
                    openBookingModal(docId, 'video');
                  }}
                  className="flex-1 py-3 bg-[#139A8C] hover:bg-[#0f8276] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>{t('Book Video Consultation with Doctor', 'এই ডাক্তারের সাথে ভিডিও কনসাল্ট বুক করুন')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
