import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle, ArrowRight, CheckCircle2, Shield, Star, Users, Calendar, Stethoscope, Video, Clock, Loader2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCTORS } from '../data/mockData';
import { SymptomTriageResult } from '../types';

export const Hero: React.FC = () => {
  const { language, t, openBookingModal, openPackageCompareModal } = useLanguage();

  // AI Symptom Finder State
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triageResult, setTriageResult] = useState<SymptomTriageResult | null>(null);
  const [triageError, setTriageError] = useState<string | null>(null);

  // Quick Booking Widget State
  const [selectedSpecialty, setSelectedSpecialty] = useState('family-medicine');
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [consultType, setConsultType] = useState<'in-clinic' | 'video'>('in-clinic');

  const filteredDoctors = DOCTORS.filter((d) => !selectedSpecialty || d.specialtyId === selectedSpecialty);

  const quickSymptoms = [
    { en: 'High Fever & Severe Headache', bn: 'তীব্র জ্বর ও অসহ্য মাথাব্যথা' },
    { en: 'Chest Tightness & Shortness of Breath', bn: 'বুকে চাপ ও শ্বাসকষ্ট' },
    { en: 'Stomach Cramps & Acid Reflux', bn: 'পেটে তীব্র ব্যথা ও এসিডিটি' },
    { en: 'Excessive Thirst & Frequent Urination', bn: 'ঘন ঘন প্রস্রাব ও পিপাসা' },
    { en: 'Persistent Dry Cough & Sore Throat', bn: 'শুকনো কাশি ও গলা ব্যথা' },
    { en: 'Knee & Joint Swelling', bn: 'হাঁটু ও জয়েন্টে তীব্র ব্যথা' },
  ];

  const handleSymptomAnalyze = async (queryText?: string) => {
    const query = queryText || symptomInput;
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setTriageError(null);
    setTriageResult(null);

    try {
      const response = await fetch('/api/symptom-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomText: query, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const data = await response.json();
      setTriageResult(data);
    } catch (err: any) {
      console.error('Triage error:', err);
      setTriageError(
        language === 'bn'
          ? 'লক্ষণ বিশ্লেষণে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা হটলাইন ১০৬৮৮ নম্বরে কল করুন।'
          : 'Could not complete clinical analysis at this moment. Please try again or call our 10688 hotline.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F9FA] via-white to-[#F8F9FA] pt-6 sm:pt-10 pb-16">
      {/* Decorative medical background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-0 -ml-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Trust pill badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#139A8C] animate-pulse" />
            <span>
              {t(
                'Praava-Inspired Ecosystem • In-Clinic & Telehealth • CAP-Accredited Lab',
                'ইন-ক্লিনিক ও টেলিহেলথ • আন্তর্জাতিক মানের ডায়াগনস্টিকস'
              )}
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Headlines & AI Symptom Finder */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#0B2545] leading-[1.18]">
                {language === 'bn' ? (
                  <>
                    আপনার সুস্থতায় নিবেদিত{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#139A8C]">
                      আধুনিক স্বাস্থ্যসেবা।
                    </span>
                    <br />
                    <span className="text-[#139A8C]">বিশ্বস্ত ডাক্তার</span> ও উন্নত ডায়াগনস্টিকস।
                  </>
                ) : (
                  <>
                    Healthcare Built Around You.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2545] to-[#139A8C]">
                      Trusted Doctors,
                    </span>{' '}
                    Cutting-Edge Diagnostics.
                  </>
                )}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                {t(
                  'Seamlessly book in-clinic visits, instant video consultations, and doorstep sample collections backed by automated CAP-standard pathology and 24/7 care support.',
                  'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট, মুহূর্তেই ভিডিও কনসালটেশন কিংবা বাসায় বসে ল্যাব টেস্টের স্যাম্পল দিন নির্ভুল ও ডিজিটালভাবে।'
                )}
              </p>
            </div>

            {/* FEATURE: AI Smart Symptom Finder (Hero Bar) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#139A8C]">
                  <Sparkles className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>{t('AI Smart Symptom Finder', 'এআই স্মার্ট লক্ষণ ও চিকিৎসা নির্দেশক')}</span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium hidden sm:inline">
                  {t('Natural Language Triage Engine', 'বাংলা ও ইংরেজিতে স্বয়ংক্রিয় ক্লিনিক্যাল ট্রায়াজ')}
                </span>
              </div>

              {/* Input Bar */}
              <div className="relative flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSymptomAnalyze()}
                    placeholder={t(
                      'Describe how you feel (e.g. "I have high fever and severe headache")...',
                      'কী সমস্যা হচ্ছে লিখুন (যেমন: "আমার প্রচণ্ড জ্বর এবং মাথা ব্যথা")...'
                    )}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#139A8C] rounded-xl text-sm text-slate-800 focus:outline-hidden transition-all shadow-inner"
                  />
                </div>
                <button
                  onClick={() => handleSymptomAnalyze()}
                  disabled={isAnalyzing || !symptomInput.trim()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#139A8C] hover:bg-[#0f8276] disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('Analyzing...', 'বিশ্লেষণ হচ্ছে...')}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t('Find Care', 'পরামর্শ নিন')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Symptom Suggestion Chips */}
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500 font-medium">
                  {t('Popular quick queries:', 'দ্রুত সার্চ করুন:')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickSymptoms.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const txt = language === 'bn' ? chip.bn : chip.en;
                        setSymptomInput(txt);
                        handleSymptomAnalyze(txt);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-[#139A8C] text-slate-700 transition-colors border border-slate-200/60 cursor-pointer"
                    >
                      {language === 'bn' ? chip.bn : chip.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Box */}
              {triageError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{triageError}</span>
                </div>
              )}

              {/* Live Triage Results Display */}
              {triageResult && (
                <div className="mt-4 p-4 sm:p-5 bg-gradient-to-br from-teal-50/70 via-white to-blue-50/50 rounded-xl border border-teal-200/90 space-y-3.5 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          triageResult.triageLevel === 'Emergency'
                            ? 'bg-red-500 text-white animate-pulse'
                            : triageResult.triageLevel === 'Urgent'
                            ? 'bg-amber-500 text-white'
                            : 'bg-[#139A8C] text-white'
                        }`}
                      >
                        {triageResult.triageLevel} {t('Priority Care', 'অগ্রাধিকার')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {t('Clinical Analysis Matched', 'ক্লিনিক্যাল নির্দেশনা')}
                      </span>
                    </div>

                    <button
                      onClick={() => setTriageResult(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      {t('Close', 'বন্ধ করুন')}
                    </button>
                  </div>

                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {triageResult.analysis}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Recommended Specialties */}
                    <div className="bg-white/80 p-3 rounded-lg border border-slate-200/80">
                      <span className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5 mb-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-[#139A8C]" />
                        {t('Consult Specialists', 'পরামর্শের জন্য উপযুক্ত ডাক্তার')}:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {triageResult.recommendedSpecialties.map((spec, i) => (
                          <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Diagnostic Tests */}
                    <div className="bg-white/80 p-3 rounded-lg border border-slate-200/80">
                      <span className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        {t('Recommended Lab Tests', 'প্রয়োজনীয় ল্যাব টেস্ট')}:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {triageResult.recommendedTests.map((tst, i) => (
                          <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                            {tst}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Immediate Advice & Warning Signs */}
                  <div className="p-3 bg-amber-50/90 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('Immediate Supportive Care Advice', 'জরুরি প্রাথমিক পরামর্শ')}:</span>
                    </div>
                    <p>{triageResult.immediateAdvice}</p>
                  </div>

                  {/* Quick Action Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className="text-xs text-slate-500 italic">
                      {t('Verified with Dhaka New Hospital Clinical Guidelines', 'ঢাকা নিউ হসপিটালের অভিজ্ঞ চিকিৎসকদের গাইডলাইন অনুযায়ী')}
                    </span>
                    <button
                      onClick={() => openBookingModal(undefined, 'in-clinic')}
                      className="inline-flex items-center gap-1.5 bg-[#0B2545] hover:bg-[#139A8C] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{t('Book Matching Doctor Now', 'সরাসরি ডাক্তার বুক করুন')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Signals & Real-time Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-[#0B2545]">100k+</div>
                <div className="text-xs text-slate-500 font-medium">{t('Patients Treated', 'রোগীর আস্থা')}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-[#139A8C] flex items-center gap-1">
                  4.9
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <div className="text-xs text-slate-500 font-medium">{t('Verified Reviews', 'রেটিং ও রিভিউ')}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-[#0B2545]">50+</div>
                <div className="text-xs text-slate-500 font-medium">{t('Super Specialists', 'অভিজ্ঞ কনসালট্যান্ট')}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xl sm:text-2xl font-black text-[#FF6B6B]">99.8%</div>
                <div className="text-xs text-slate-500 font-medium">{t('Lab Accuracy', 'ল্যাব নির্ভুলতা')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 relative">
              {/* Header inside widget */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-[#0B2545] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#139A8C]" />
                    <span>{t('Quick Doctor Booking', 'দ্রুত ডাক্তার অ্যাপয়েন্টমেন্ট')}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t('Select specialty & book in seconds', 'সহজ ৩ ধাপে বিশেষজ্ঞ নির্বাচন করুন')}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  {t('Live Slots', 'স্লট সক্রিয়')}
                </span>
              </div>

              {/* In-Clinic vs Video Consultation Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setConsultType('in-clinic')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    consultType === 'in-clinic'
                      ? 'bg-white text-[#0B2545] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#139A8C]" />
                  <span>{t('In-Clinic Visit', 'ইন-ক্লিনিক ভিজিট')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultType('video')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    consultType === 'video'
                      ? 'bg-[#139A8C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{t('Instant Video', 'ভিডিও কনসাল্ট')}</span>
                </button>
              </div>

              {/* Step 1: Specialty Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('1. Select Medical Specialty', '১. বিশেষজ্ঞ বিভাগ নির্বাচন করুন')}
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => {
                      setSelectedSpecialty(e.target.value);
                      const matchingDoc = DOCTORS.find((d) => d.specialtyId === e.target.value);
                      if (matchingDoc) setSelectedDoctorId(matchingDoc.id);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-hidden focus:border-[#139A8C] focus:bg-white cursor-pointer"
                  >
                    <option value="family-medicine">{t('Internal & Family Medicine', 'ইন্টারনাল ও ফ্যামিলি মেডিসিন')}</option>
                    <option value="cardiology">{t('Cardiology (Heart & Blood Pressure)', 'কার্ডিওলজি (হৃদরোগ ও রক্তচাপ)')}</option>
                    <option value="endocrinology">{t('Endocrinology & Diabetology', 'এন্ডোক্রাইনোলজি ও ডায়াবেটিস')}</option>
                    <option value="gynecology">{t('Gynecology & Women’s Health', 'গাইনোকোলজি ও নারী স্বাস্থ্য')}</option>
                    <option value="pediatrics">{t('Pediatrics (Child Health)', 'শিশু ও নবজাতক রোগ')}</option>
                    <option value="gastroenterology">{t('Gastroenterology & Liver', 'গ্যাস্ট্রোএন্টারোলজি ও লিভার')}</option>
                  </select>
                </div>

                {/* Step 2: Choose Doctor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('2. Choose Consultant Doctor', '২. চিকিৎসক নির্বাচন করুন')}
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-hidden focus:border-[#139A8C] focus:bg-white cursor-pointer"
                  >
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {language === 'bn' ? doc.name.bn : doc.name.en} ({language === 'bn' ? doc.specialty.bn : doc.specialty.en})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Preview Card inside widget */}
                {(() => {
                  const currentDoc = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];
                  return (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-center gap-3">
                      <img
                        src={currentDoc.avatar}
                        alt={currentDoc.name.en}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-[#139A8C]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0B2545] truncate">
                            {language === 'bn' ? currentDoc.name.bn : currentDoc.name.en}
                          </h4>
                          <span className="text-xs font-black text-[#139A8C]">
                            ৳{consultType === 'in-clinic' ? currentDoc.feeInClinic : currentDoc.feeVideo}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{currentDoc.degrees}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-teal-700 font-semibold">
                          <Clock className="w-3 h-3 text-[#139A8C]" />
                          <span>
                            {t('Next Available:', 'পরবর্তী সময়:')}{' '}
                            {language === 'bn' ? currentDoc.nextAvailableSlot.bn : currentDoc.nextAvailableSlot.en}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Step 3: Action Button */}
                <button
                  type="button"
                  onClick={() => openBookingModal(selectedDoctorId, consultType)}
                  className="w-full py-3.5 bg-[#0B2545] hover:bg-[#139A8C] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-coral-400" />
                  <span>
                    {consultType === 'in-clinic'
                      ? t('Confirm In-Clinic Slot', 'ক্লিনিক অ্যাপয়েন্টমেন্ট নিশ্চিত করুন')
                      : t('Start Instant Tele-Consult', 'ভিডিও কনসালটেশন শুরু করুন')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Safety notes */}
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    {t('Zero Wait-Time Guarantee', 'সময়নিষ্ঠ সেবা')}
                  </span>
                  <span>•</span>
                  <span>{t('Direct Digital Prescription', 'ডিজিটাল প্রেসক্রিপশন')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
