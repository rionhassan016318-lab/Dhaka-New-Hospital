import React from 'react';
import { Stethoscope, Activity, Home, Video, HeartHandshake, Pill, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CoreServices: React.FC = () => {
  const { language, t, openBookingModal, openHomeSampleModal, openTelehealthModal, openTrackerModal } = useLanguage();

  const services = [
    {
      icon: Stethoscope,
      color: 'bg-blue-50 text-[#0B2545]',
      title: { en: 'In-Clinic Outpatient Care', bn: 'ইন-ক্লিনিক বিশেষজ্ঞ সেবা' },
      description: {
        en: 'World-class sanitized consultation suites with senior consultants across 30+ medical specialties. Enjoy scheduled zero-wait visits.',
        bn: '৩০টিরও বেশি বিভাগে অভিজ্ঞ বিশেষজ্ঞ কনসালট্যান্টদের সরাসরি অ্যাপয়েন্টমেন্ট। দীর্ঘ লাইনহীন আধুনিক পরিবেশ।'
      },
      actionText: { en: 'Book In-Clinic Visit', bn: 'ক্লিনিক অ্যাপয়েন্টমেন্ট নিন' },
      action: () => openBookingModal(undefined, 'in-clinic'),
      badge: { en: 'Zero Wait Guarantee', bn: 'জিরো ওয়েটিং টাইম' },
    },
    {
      icon: Activity,
      color: 'bg-teal-50 text-[#139A8C]',
      title: { en: 'CAP-Accredited Diagnostics', bn: 'আন্তর্জাতিক মানের ডায়াগনস্টিকস' },
      description: {
        en: 'High-precision automated pathology and imaging. Real-time online barcode tracking and QR code cryptographically verified digital reports.',
        bn: 'রোচে এবং বেকম্যান কুলটার যন্ত্রে সম্পূর্ণ অটোমেটেড ল্যাব পরীক্ষা। নির্ভুল রিপোর্ট ও লাইভ ট্র্যাকিং সুবিধা।'
      },
      actionText: { en: 'Track Test Status', bn: 'ল্যাব রিপোর্ট ট্র্যাক করুন' },
      action: () => openTrackerModal(),
      badge: { en: '99.8% Accuracy', bn: '৯৯.৮% নির্ভুল' },
    },
    {
      icon: Home,
      color: 'bg-amber-50 text-amber-700',
      title: { en: 'Doorstep Sample Collection', bn: 'বাসায় বসে স্যাম্পল কালেকশন' },
      description: {
        en: 'Certified phlebotomists arrive at your home or office with temperature-controlled cold-chain boxes for sterile blood and urine draws.',
        bn: 'আপনার সুবিধাজনক সময়ে অভিজ্ঞ স্যাম্পল কালেক্টর প্রয়োজনীয় জীবাণুমুক্ত কিটসহ বাসায় গিয়ে স্যাম্পল সংগ্রহ করবে।'
      },
      actionText: { en: 'Schedule Doorstep Collection', bn: 'হোম স্যাম্পল বুক করুন' },
      action: () => openHomeSampleModal(),
      badge: { en: 'Dhaka-wide Coverage', bn: 'ঢাকা জুড়ে সেবা' },
    },
    {
      icon: Video,
      color: 'bg-emerald-50 text-emerald-700',
      title: { en: '24/7 Telehealth Video Consult', bn: '২৪/৭ ইনস্ট্যান্ট ভিডিও কনসাল্ট' },
      description: {
        en: 'Connect within 6 minutes with experienced general physicians or schedule super-specialist tele-consults from any device anywhere.',
        bn: 'জরুরি প্রয়োজনে যেকোনো সময় ঘরে বসেই অভিজ্ঞ ডাক্তারের সাথে সরাসরি কথা বলুন এবং পান তাৎক্ষণিক ই-প্রেসক্রিপশন।'
      },
      actionText: { en: 'Start Video Consult', bn: 'ভিডিও কনসাল্ট শুরু করুন' },
      action: () => openTelehealthModal(),
      badge: { en: 'Immediate Slot', bn: 'তাৎক্ষণিক সংযোগ' },
    },
    {
      icon: HeartHandshake,
      color: 'bg-rose-50 text-rose-700',
      title: { en: 'Chronic Care & Family Plans', bn: 'দীর্ঘমেয়াদী রোগ ও ফ্যামিলি কেয়ার' },
      description: {
        en: 'Structured clinical care programs for Diabetes, Hypertension, and Senior care with dedicated care coordinators and regular screening.',
        bn: 'ডায়াবেটিস ও উচ্চ রক্তচাপের মতো দীর্ঘস্থায়ী রোগের জন্য বার্ষিক স্বাস্থ্য পরিকল্পনা ও সার্বক্ষণিক ফলো-আপ।'
      },
      actionText: { en: 'Explore Care Plans', bn: 'হেলথ প্ল্যান দেখুন' },
      action: () => {
        const el = document.getElementById('packages-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: { en: 'Family Coverage', bn: 'পুরো পরিবারের সুরক্ষা' },
    },
    {
      icon: Pill,
      color: 'bg-purple-50 text-purple-700',
      title: { en: 'Verified Pharmacy & Delivery', bn: 'ভেরিফায়েড ফার্মেসি ও হোম ডেলিভারি' },
      description: {
        en: '100% genuine, temperature-regulated medicines dispensed directly against digital prescriptions with express 3-hour doorstep delivery.',
        bn: 'ডিজিটাল প্রেসক্রিপশন অনুযায়ী ১০০% আসল ওষুধ সংগ্রহ করুন এবং ৩ ঘণ্টার মধ্যে ঘরে ডেলিভারি নিন।'
      },
      actionText: { en: 'Order Medicines', bn: 'ওষুধ অর্ডার করুন' },
      action: () => openHomeSampleModal(),
      badge: { en: '100% Authentic', bn: '১০০% আসল ওষুধ' },
    },
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Comprehensive Healthcare Ecosystem', 'সম্পূর্ণ স্বাস্থ্যসেবা ইকোসিস্টেম')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('All Your Health Needs, Seamlessly Connected', 'আপনার সব চিকিৎসার সমাধান এক জায়গায়')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'From outpatient clinics and accredited diagnostics to doorstep pathology and remote telehealth, experience healthcare designed entirely around you.',
              'ক্লিনিক ভিজিট, ল্যাব টেস্ট, হোম স্যাম্পল কিংবা টেলিমেডিসিন—আধুনিক প্রযুক্তির সমন্বয়ে রোগী-কেন্দ্রিক সেবা।'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-[#139A8C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${svc.color} group-hover:scale-110 transition-transform shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {language === 'bn' ? svc.badge.bn : svc.badge.en}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-[#139A8C] transition-colors">
                      {language === 'bn' ? svc.title.bn : svc.title.en}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {language === 'bn' ? svc.description.bn : svc.description.en}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={svc.action}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B2545] text-slate-700 hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer group-hover:bg-[#139A8C] group-hover:text-white shadow-2xs"
                  >
                    <span>{language === 'bn' ? svc.actionText.bn : svc.actionText.en}</span>
                    <ArrowRight className="w-4 h-4" />
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
