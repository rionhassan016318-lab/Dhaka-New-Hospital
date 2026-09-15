import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight, CheckCircle2, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t, openBookingModal, openHomeSampleModal, openTrackerModal } = useLanguage();
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setSubSuccess(true);
    setEmailSub('');
  };

  return (
    <footer className="bg-[#0B2545] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Top Highlight Banner: 24/7 Emergency & Home Sample Dispatch */}
        <div className="bg-gradient-to-r from-teal-950/60 via-[#0E355F] to-teal-950/60 p-6 sm:p-8 rounded-3xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              {t('24/7 Priority Patient Assistance', '২৪/৭ জরুরি স্বাস্থ্য হটলাইন ও সহায়তা')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t('Need urgent doctor consultation or home sample draw?', 'জরুরি ডাক্তার বা রক্তের স্যাম্পল কালেকশন প্রয়োজন?')}
            </h3>
            <p className="text-xs text-slate-300">
              {t('Call our direct helpline or schedule online in 30 seconds', 'আমাদের হটলাইনে সরাসরি কল করুন বা অনলাইন বুকিং করুন')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:10688"
              className="px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>{t('Hotline: 10688', 'হটলাইন: ১০৬৮৮')}</span>
            </a>
            <button
              onClick={() => openHomeSampleModal()}
              className="px-5 py-3.5 bg-[#139A8C] hover:bg-[#0f8276] text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>{t('Book Doorstep Sample', 'হোম স্যাম্পল বুকিং')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Links & Accreditations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 & 2: About Dhaka New Hospital */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#139A8C] to-teal-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md">
                DNH
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {language === 'bn' ? (
                  <>ঢাকা নিউ <span className="text-[#139A8C]">হসপিটাল</span></>
                ) : (
                  <>Dhaka New <span className="text-[#139A8C]">Hospital</span></>
                )}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {t(
                'A premier multi-specialty hospital and healthcare network. Providing 24/7 emergency care, state-of-the-art diagnostic laboratories, compassionate outpatient care, and seamless doorstep medical services across Dhaka.',
                'আধুনিক মাল্টি-স্পেশালিটি হাসপাতাল ও ডায়াগনস্টিকস নেটওয়ার্ক। ২৪/৭ জরুরি স্বাস্থ্যসেবা, বিশ্বমানের ডায়াগনস্টিকস ল্যাবরেটরি এবং বিশেষজ্ঞ চিকিৎসকদের সেবায় বিশ্বস্ত প্রতিষ্ঠান।'
              )}
            </p>

            {/* Accreditation Badges */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t('Accreditations & International Standards:', 'আন্তর্জাতিক স্বীকৃতি ও মানদণ্ড:')}
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-slate-800/90 text-teal-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  ISO 15189 Certified
                </span>
                <span className="px-2.5 py-1 bg-slate-800/90 text-teal-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  CAP-Standard Protocols
                </span>
                <span className="px-2.5 py-1 bg-slate-800/90 text-teal-300 border border-slate-700 rounded-lg text-xs font-semibold">
                  DGHS Approved
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('Our Services', 'আমাদের সেবাসমূহ')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => openBookingModal(undefined, 'in-clinic')} className="hover:text-teal-300 transition-colors">
                  {t('In-Clinic Consultations', 'ইন-ক্লিনিক ডাক্তার ভিজিট')}
                </button>
              </li>
              <li>
                <button onClick={() => openHomeSampleModal()} className="hover:text-teal-300 transition-colors">
                  {t('Home Sample Collection', 'বাসায় রক্তের স্যাম্পল কালেকশন')}
                </button>
              </li>
              <li>
                <button onClick={() => openTrackerModal()} className="hover:text-teal-300 transition-colors">
                  {t('Live Diagnostics Tracker', 'অনলাইন ল্যাব রিপোর্ট ট্র্যাকার')}
                </button>
              </li>
              <li>
                <a href="#packages-section" className="hover:text-teal-300 transition-colors">
                  {t('Health Screening Packages', 'বার্ষিক হেলথ চেকআপ প্যাকেজ')}
                </a>
              </li>
              <li>
                <a href="#body-explorer-section" className="hover:text-teal-300 transition-colors">
                  {t('3D Visual Body Explorer', 'ইন্টারেক্টিভ বডি এক্সপ্লোরার')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Clinic Hub Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('Clinic Hubs in Dhaka', 'আমাদের ক্লিনিক হাবসমূহ')}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-white block">{t('Banani Flagship Hub', 'বনানী ফ্ল্যাগশিপ হাব')}</strong>
                <p className="text-[11px] text-slate-400">Plot 9, Road 11, Block H, Banani, Dhaka</p>
              </div>
              <div>
                <strong className="text-white block">{t('Dhanmondi Care Center', 'ধানমন্ডি কেয়ার সেন্টার')}</strong>
                <p className="text-[11px] text-slate-400">House 42, Road 7, Dhanmondi, Dhaka</p>
              </div>
              <div>
                <strong className="text-white block">{t('Uttara Health Hub', 'উত্তরা হেলথ হাব')}</strong>
                <p className="text-[11px] text-slate-400">Sector 4, Main Avenue, Uttara, Dhaka</p>
              </div>
            </div>
          </div>

          {/* Column 5: Health Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('Health Digest', 'স্বাস্থ্য বুলেটিন')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('Subscribe to verified medical tips and preventive wellness articles by senior physicians.', 'বিশেষজ্ঞ চিকিৎসকদের পরামর্শ ও স্বাস্থ্য টিপস পেতে যুক্ত থাকুন।')}
            </p>

            {subSuccess ? (
              <div className="p-3 bg-teal-900/50 border border-teal-500 rounded-xl text-xs text-teal-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('Thank you for subscribing!', 'সাবস্ক্রিপশন সফল হয়েছে!')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  placeholder={t('Enter your email address...', 'আপনার ইমেইল লিখুন...')}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#139A8C] hover:bg-[#0f8276] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {t('Subscribe', 'সাবস্ক্রাইব')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Dhaka New Hospital Ltd. All rights reserved.</span>
            <span>•</span>
            <span>BMDC Registered Consultants</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Medical Service</a>
            <a href="#" className="hover:text-white transition-colors">Patient Bill of Rights</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
