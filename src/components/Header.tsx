import React, { useState } from 'react';
import { PhoneCall, MapPin, Globe, Calendar, Activity, Video, Menu, X, ShieldCheck, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_LOCATIONS } from '../data/mockData';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t, selectedLocation, setSelectedLocation, openBookingModal, openHomeSampleModal, openTrackerModal } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLocation = SERVICE_LOCATIONS.find((loc) => loc.id === selectedLocation) || SERVICE_LOCATIONS[0];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Bar */}
      <div className="bg-[#0B2545] text-slate-100 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Emergency Hotline */}
          <div className="flex items-center gap-3">
            <a
              href="tel:10688"
              className="inline-flex items-center gap-1.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-2.5 py-1 rounded-full font-semibold transition-transform active:scale-95 shadow-xs"
              title="Call 24/7 Emergency Ambulance & Doctor Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>{t('24/7 Emergency: 10688', '২৪/৭ জরুরি হটলাইন: ১০৬৮৮')}</span>
            </a>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#139A8C]" />
              {t('CAP & ISO 15189 Accredited Diagnostics', 'সিএপি ও আইএসও ১৫১৮৯ অনুমোদিত ল্যাব')}
            </span>
          </div>

          {/* Location Selector & Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Track Report */}
            <button
              onClick={() => openTrackerModal()}
              className="hidden sm:inline-flex items-center gap-1 text-teal-300 hover:text-white transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t('Track Lab Report', 'রিপোর্ট ট্র্যাকিং')}</span>
            </button>

            {/* Location Selector */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent text-white border-none focus:outline-hidden text-xs cursor-pointer"
              >
                {SERVICE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-[#0B2545] text-white">
                    {language === 'bn' ? loc.name.bn : loc.name.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer font-medium"
              title="Switch Language (বাংলা / English)"
            >
              <Globe className="w-3.5 h-3.5 text-teal-300" />
              <span className="font-semibold">{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2545] via-[#139A8C] to-[#0B2545] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0B2545] rounded-[10px] flex items-center justify-center text-white font-black text-sm tracking-tighter">
              <span className="text-[#139A8C]">D</span>
              <span className="text-white">N</span>
              <span className="text-[#FF6B6B] font-black text-base">+</span>
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B2545]">
              {language === 'bn' ? (
                <>ঢাকা নিউ <span className="text-[#139A8C]">হসপিটাল</span></>
              ) : (
                <>Dhaka New <span className="text-[#139A8C]">Hospital</span></>
              )}
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-500">
              {t('Multi-Specialty & Diagnostics', 'মাল্টি-স্পেশালিটি ও ডায়াগনস্টিকস')}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button
            onClick={() => scrollToSection('doctors-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer"
          >
            {t('Doctors', 'ডাক্তারগণ')}
          </button>
          <button
            onClick={() => scrollToSection('services-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer"
          >
            {t('Services', 'সেবাসমূহ')}
          </button>
          <button
            onClick={() => scrollToSection('body-explorer-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer flex items-center gap-1.5 text-[#0B2545]"
          >
            <span className="w-2 h-2 rounded-full bg-[#139A8C] animate-pulse"></span>
            {t('3D Body Explorer', 'বডি এক্সপ্লোরার')}
          </button>
          <button
            onClick={() => scrollToSection('diagnostics-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer"
          >
            {t('Diagnostics & Labs', 'ল্যাব টেস্ট')}
          </button>
          <button
            onClick={() => scrollToSection('packages-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer"
          >
            {t('Health Packages', 'হেলথ প্যাকেজ')}
          </button>
          <button
            onClick={() => scrollToSection('booking-engine-section')}
            className="hover:text-[#139A8C] transition-colors cursor-pointer flex items-center gap-1 text-[#139A8C]"
          >
            <Video className="w-4 h-4" />
            {t('Telehealth', 'টেলিমেডিসিন')}
          </button>
        </nav>

        {/* Primary Call to Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openHomeSampleModal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#139A8C]/30 text-[#139A8C] bg-teal-50/50 hover:bg-teal-50 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            {t('Home Collection', 'হোম স্যাম্পল')}
          </button>

          <button
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-2 bg-[#0B2545] hover:bg-[#139A8C] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-coral-400" />
            <span>{t('Book Appointment', 'অ্যাপয়েন্টমেন্ট নিন')}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-xl space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex items-center justify-center gap-2 bg-[#0B2545] text-white py-2.5 px-3 rounded-lg text-xs font-bold shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              {t('Book Doctor', 'ডাক্তার বুক করুন')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHomeSampleModal();
              }}
              className="flex items-center justify-center gap-2 bg-[#139A8C] text-white py-2.5 px-3 rounded-lg text-xs font-bold shadow-sm"
            >
              <Home className="w-4 h-4" />
              {t('Home Sample', 'হোম স্যাম্পল')}
            </button>
          </div>

          <nav className="flex flex-col space-y-3 font-semibold text-slate-800 text-sm">
            <button
              onClick={() => scrollToSection('doctors-section')}
              className="text-left py-2 hover:text-[#139A8C] transition-colors"
            >
              {t('Find Doctors & Specialists', 'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারগণ')}
            </button>
            <button
              onClick={() => scrollToSection('body-explorer-section')}
              className="text-left py-2 text-[#0B2545] flex items-center justify-between"
            >
              <span>{t('3D Interactive Body Explorer', '৩ডি বডি এক্সপ্লোরার')}</span>
              <span className="text-[10px] bg-teal-100 text-[#139A8C] px-2 py-0.5 rounded-full font-bold">New</span>
            </button>
            <button
              onClick={() => scrollToSection('booking-engine-section')}
              className="text-left py-2 hover:text-[#139A8C] transition-colors flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-[#139A8C]" />
              {t('Instant Video Consult (Telehealth)', 'ইন্সট্যান্ট ভিডিও কনসালটেশন')}
            </button>
            <button
              onClick={() => scrollToSection('diagnostics-section')}
              className="text-left py-2 hover:text-[#139A8C] transition-colors"
            >
              {t('Diagnostics & Lab Tests', 'ল্যাব টেস্ট ও রেডিওলজি')}
            </button>
            <button
              onClick={() => scrollToSection('packages-section')}
              className="text-left py-2 hover:text-[#139A8C] transition-colors"
            >
              {t('Health Checkup Packages', 'হেলথ স্ক্রিনিং প্যাকেজ')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTrackerModal();
              }}
              className="text-left py-2 text-teal-700 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              {t('Live Diagnostics Report Tracker', 'লাইভ ল্যাব রিপোর্ট ট্র্যাকার')}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
