import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, ArrowRight, Activity, ShieldCheck, Heart, Sparkles, Layers, Info, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BODY_REGIONS, HEALTH_PACKAGES } from '../data/mockData';
import { BodyRegion } from '../types';

export const BodyExplorer: React.FC = () => {
  const { language, t, openBookingModal, openPackageCompareModal } = useLanguage();
  const [selectedRegionId, setSelectedRegionId] = useState<string>('chest-heart-lungs');
  const [bodyView, setBodyView] = useState<'front' | 'back'>('front');

  const selectedRegion = BODY_REGIONS.find((r) => r.id === selectedRegionId) || BODY_REGIONS[0];
  const matchingPackage = HEALTH_PACKAGES.find((p) => p.id === selectedRegion.recommendedPackageId) || HEALTH_PACKAGES[0];

  return (
    <section id="body-explorer-section" className="py-16 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Interactive Visual Health Map', 'ইন্টারেক্টিভ ভিজ্যুয়াল বডি এক্সপ্লোরার')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Explore Your Body & Symptoms Visually', 'শরীরের যেকোনো অংশে ক্লিক করে জানুন লক্ষণ ও প্রতিকার')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Select any anatomical zone on the interactive model to discover underlying conditions, verified diagnostic tests, and top consultant doctors.',
              'শরীরের নির্দিষ্ট অঙ্গে ক্লিক করে সাধারণ স্বাস্থ্য সমস্যা, প্রয়োজনীয় ল্যাব পরীক্ষা ও বিশেষজ্ঞ চিকিৎসকের তথ্য জানুন।'
            )}
          </p>
        </div>

        {/* Main Body Explorer Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Human Body Canvas */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 to-teal-50/30 rounded-2xl border border-slate-200/80 relative">
              {/* Perspective Controls */}
              <div className="flex items-center gap-2 mb-6 bg-white p-1 rounded-xl shadow-xs border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setBodyView('front')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    bodyView === 'front' ? 'bg-[#0B2545] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('Anterior (Front)', 'সম্মুখ ভাগ (Front)')}
                </button>
                <button
                  onClick={() => setBodyView('back')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    bodyView === 'back' ? 'bg-[#0B2545] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('Posterior (Back & Spine)', 'পশ্চাৎ ভাগ (Back & Spine)')}
                </button>
              </div>

              {/* Visual Body Vector Representation with Hotspot Buttons */}
              <div className="relative w-64 h-96 flex items-center justify-center">
                {/* Stylized Human Anatomy SVG Model */}
                <svg
                  viewBox="0 0 200 380"
                  className="w-full h-full drop-shadow-md"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Grid Backdrop */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                  </pattern>
                  <rect width="200" height="380" fill="url(#grid)" opacity="0.4" rx="16" />

                  {/* Body Silhouette Geometry */}
                  {/* Head & Neck */}
                  <path
                    d="M 100 20 C 82 20, 72 35, 72 56 C 72 74, 82 86, 92 90 L 92 102 L 108 102 L 108 90 C 118 86, 128 74, 128 56 C 128 35, 118 20, 100 20 Z"
                    fill={selectedRegionId === 'head-brain' || selectedRegionId === 'ent-eyes' ? '#139A8C' : '#CBD5E1'}
                    opacity={selectedRegionId === 'head-brain' || selectedRegionId === 'ent-eyes' ? '0.85' : '0.4'}
                    className="transition-all duration-300"
                  />

                  {/* Shoulders & Torso */}
                  <path
                    d="M 60 115 C 70 106, 90 102, 100 102 C 110 102, 130 106, 140 115 C 152 125, 156 145, 148 185 L 140 240 C 140 250, 134 260, 120 264 L 80 264 C 66 260, 60 250, 60 240 L 52 185 C 44 145, 48 125, 60 115 Z"
                    fill={
                      selectedRegionId === 'chest-heart-lungs' ||
                      selectedRegionId === 'abdomen-stomach' ||
                      selectedRegionId === 'pelvis-urinary'
                        ? '#0B2545'
                        : '#94A3B8'
                    }
                    opacity={
                      selectedRegionId === 'chest-heart-lungs' ||
                      selectedRegionId === 'abdomen-stomach' ||
                      selectedRegionId === 'pelvis-urinary'
                        ? '0.7'
                        : '0.3'
                    }
                    className="transition-all duration-300"
                  />

                  {/* Arms */}
                  <path
                    d="M 48 120 L 32 180 L 26 250 C 24 260, 32 265, 36 255 L 48 195 L 56 140 Z"
                    fill="#94A3B8"
                    opacity="0.25"
                  />
                  <path
                    d="M 152 120 L 168 180 L 174 250 C 176 260, 168 265, 164 255 L 152 195 L 144 140 Z"
                    fill="#94A3B8"
                    opacity="0.25"
                  />

                  {/* Legs */}
                  <path
                    d="M 75 264 L 70 330 L 66 370 C 65 376, 75 378, 80 374 L 88 330 L 96 264 Z"
                    fill={selectedRegionId === 'spine-joints-limbs' ? '#139A8C' : '#94A3B8'}
                    opacity={selectedRegionId === 'spine-joints-limbs' ? '0.7' : '0.3'}
                    className="transition-all duration-300"
                  />
                  <path
                    d="M 125 264 L 130 330 L 134 370 C 135 376, 125 378, 120 374 L 112 330 L 104 264 Z"
                    fill={selectedRegionId === 'spine-joints-limbs' ? '#139A8C' : '#94A3B8'}
                    opacity={selectedRegionId === 'spine-joints-limbs' ? '0.7' : '0.3'}
                    className="transition-all duration-300"
                  />

                  {/* Spine line indicator if back view */}
                  {bodyView === 'back' && (
                    <line x1="100" y1="102" x2="100" y2="264" stroke="#0B2545" strokeWidth="3" strokeDasharray="4 4" />
                  )}
                </svg>

                {/* Clickable Interactive Pulsing Hotspots */}
                {BODY_REGIONS.map((region) => {
                  const isSelected = selectedRegionId === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegionId(region.id)}
                      style={{
                        top: `${region.coordinates.y}%`,
                        left: `${region.coordinates.x}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute z-20 flex items-center justify-center transition-all duration-200 cursor-pointer group ${
                        isSelected ? 'scale-125' : 'hover:scale-115'
                      }`}
                      aria-label={`Select ${region.name.en}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all ${
                          isSelected
                            ? 'bg-[#FF6B6B] text-white ring-4 ring-[#FF6B6B]/30'
                            : 'bg-white text-[#0B2545] border border-slate-300 group-hover:bg-[#139A8C] group-hover:text-white group-hover:border-[#139A8C]'
                        }`}
                      >
                        {isSelected ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instructions below model */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Info className="w-3.5 h-3.5 text-[#139A8C]" />
                <span>{t('Click on any pulsing point to inspect area', 'শরীরের যেকোনো পয়েন্টে ক্লিক করে তথ্য দেখুন')}</span>
              </div>
            </div>

            {/* Right: Detailed Area Breakdown & Specialty Matching */}
            <div className="lg:col-span-7 space-y-6">
              {/* Region Header */}
              <div className="border-b border-slate-200 pb-4 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#139A8C] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {language === 'bn' ? selectedRegion.system.bn : selectedRegion.system.en}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {t('Specialty Matched:', 'সংশ্লিষ্ট বিশেষজ্ঞ বিভাগ:')}{' '}
                    <strong className="text-[#0B2545]">
                      {language === 'bn' ? selectedRegion.specialty.bn : selectedRegion.specialty.en}
                    </strong>
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0B2545]">
                  {language === 'bn' ? selectedRegion.name.bn : selectedRegion.name.en}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === 'bn' ? selectedRegion.summary.bn : selectedRegion.summary.en}
                </p>
              </div>

              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Common Conditions */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <span>{t('Common Symptoms & Conditions', 'সাধারণ লক্ষণ ও উপসর্গ')}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedRegion.commonConditions.map((cond, idx) => (
                      <li key={idx} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#139A8C] mt-1.5 shrink-0" />
                        <span>{language === 'bn' ? cond.bn : cond.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Diagnostic Lab Tests */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#139A8C]" />
                    <span>{t('Recommended Lab & Imaging', 'প্রয়োজনীয় ল্যাব ও ইমেজিং টেস্ট')}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedRegion.recommendedTests.map((tst, idx) => (
                      <li key={idx} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />
                        <span>{language === 'bn' ? tst.bn : tst.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Health Screening Package Spotlight */}
              <div className="bg-gradient-to-r from-teal-50 via-white to-blue-50 p-4 sm:p-5 rounded-2xl border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#139A8C] uppercase tracking-wider">
                    {t('Tailored Health Package for this Region', 'এই অংশের সুরক্ষায় উপযোগী বিশেষায়িত প্যাকেজ')}
                  </div>
                  <h4 className="text-base font-bold text-[#0B2545]">
                    {language === 'bn' ? matchingPackage.name.bn : matchingPackage.name.en}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t(`Includes ${matchingPackage.testCount} comprehensive tests + doctor consultation`, `${matchingPackage.testCount}টি ল্যাব টেস্ট ও বিশেষজ্ঞ ডাক্তারের কনসালটেশন অন্তর্ভুক্ত`)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openPackageCompareModal(matchingPackage.id)}
                    className="text-xs font-bold px-3 py-2 rounded-xl border border-teal-300 text-teal-800 bg-white hover:bg-teal-50 transition-colors cursor-pointer"
                  >
                    {t('Compare Package', 'প্যাকেজ তুলনা')}
                  </button>
                  <button
                    onClick={() => openBookingModal(undefined, 'in-clinic')}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#0B2545] hover:bg-[#139A8C] text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('Book Doctor', 'ডাক্তার বুক করুন')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
