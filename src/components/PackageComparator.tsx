import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, ArrowRight, X, Layers, Plus, HelpCircle, Heart, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HEALTH_PACKAGES } from '../data/mockData';
import { HealthPackage } from '../types';

export const PackageComparator: React.FC = () => {
  const { language, t, openBookingModal, isPackageCompareOpen, compareInitialPackageId, closeAllModals } = useLanguage();

  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([
    'pkg-executive',
    'pkg-cardiac',
  ]);
  const [activeTabPackage, setActiveTabPackage] = useState<string>('pkg-executive');
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const togglePackageSelection = (id: string) => {
    if (selectedPackageIds.includes(id)) {
      if (selectedPackageIds.length > 1) {
        setSelectedPackageIds(selectedPackageIds.filter((pId) => pId !== id));
      }
    } else {
      if (selectedPackageIds.length < 3) {
        setSelectedPackageIds([...selectedPackageIds, id]);
      }
    }
  };

  const comparedPackages = HEALTH_PACKAGES.filter((p) => selectedPackageIds.includes(p.id));

  return (
    <section id="packages-section" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Preventive Health Screening', 'প্রতিরোধমূলক হেলথ প্যাকেজ')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Comprehensive Health Packages & Comparison', 'প্যাকেজ তুলনা করুন ও বেছে নিন আপনার উপযুক্ত সেবা')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Designed by senior clinicians to detect silent diseases early. Compare test parameters across packages and enjoy up to 35% savings with complimentary doctor consultation.',
              'নীরব রোগ প্রতিরোধে বিশেষজ্ঞ চিকিৎসকদের দ্বারা ডিজাইনকৃত। প্যাকেজসমূহের টেস্ট তুলনা করে বেছে নিন আপনার ও পরিবারের উপযোগী প্যাকেজ।'
            )}
          </p>
        </div>

        {/* Action Button: Compare selected side by side */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span className="font-bold text-[#0B2545]">{t('Select to compare (Up to 3):', 'তুলনার জন্য নির্বাচন করুন (সর্বোচ্চ ৩টি):')}</span>
            <div className="flex flex-wrap gap-1.5">
              {HEALTH_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageIds.includes(pkg.id);
                return (
                  <button
                    key={pkg.id}
                    onClick={() => togglePackageSelection(pkg.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#139A8C] text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#139A8C]'
                    }`}
                  >
                    {language === 'bn' ? pkg.name.bn.split(' ')[0] : pkg.name.en.split(' ')[0]} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-2 bg-[#0B2545] hover:bg-[#139A8C] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('View Side-by-Side Matrix', 'পাশাপাশি তুলনা দেখুন')} ({selectedPackageIds.length})</span>
          </button>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_PACKAGES.map((pkg) => {
            const discountPercent = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  pkg.isPopular
                    ? 'border-[#139A8C] shadow-xl ring-2 ring-[#139A8C]/20'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {pkg.badge && (
                  <div className="bg-[#139A8C] text-white text-[11px] font-bold py-1 px-3.5 text-center uppercase tracking-wider">
                    {language === 'bn' ? pkg.badge.bn : pkg.badge.en}
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2545]">
                      {language === 'bn' ? pkg.name.bn : pkg.name.en}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'bn' ? pkg.tagline.bn : pkg.tagline.en}
                    </p>
                  </div>

                  {/* Price & Savings Pill */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#0B2545]">৳{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">৳{pkg.originalPrice}</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      {discountPercent}% {t('OFF', 'ছাড়')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                    <strong className="text-slate-800">{t('Target Demographic:', 'যাদের জন্য উপযুক্ত:')}</strong>{' '}
                    {language === 'bn' ? pkg.idealFor.bn : pkg.idealFor.en}
                  </div>

                  {/* Test Counts & Category Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>{t('Included Investigations:', 'অন্তর্ভুক্ত পরীক্ষা সমূহ:')}</span>
                      <span className="text-[#139A8C]">{pkg.testCount} {t('Tests', 'টি টেস্ট')}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {pkg.includedCategories.slice(0, 3).map((cat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#139A8C] shrink-0" />
                          <span className="truncate">{language === 'bn' ? cat.categoryName.bn : cat.categoryName.en}</span>
                        </li>
                      ))}
                      {pkg.includedCategories.length > 3 && (
                        <li className="text-[11px] text-slate-400 pl-5">
                          + {pkg.includedCategories.length - 3} {t('more diagnostic categories', 'টি আরও বিভাগ')}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Included Doctor Consultation */}
                  <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 text-xs text-teal-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#139A8C]" />
                      <span>{t('Free Doctor Review Included', 'বিনামূল্যে ডাক্তার কনসালটেশন')}</span>
                    </div>
                    <p className="text-[11px] text-teal-800">
                      {language === 'bn' ? pkg.consultations[0]?.bn : pkg.consultations[0]?.en}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => openBookingModal(undefined, 'in-clinic')}
                    className="w-full py-3 bg-[#0B2545] hover:bg-[#139A8C] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t('Book This Package', 'এই প্যাকেজটি বুক করুন')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedPackageIds.includes(pkg.id)) {
                        setSelectedPackageIds([pkg.id, 'pkg-executive']);
                      }
                      setShowComparisonModal(true);
                    }}
                    className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-[#139A8C] transition-colors cursor-pointer"
                  >
                    {t('View Detailed Test Breakdown', 'সম্পূর্ণ টেস্ট তালিকা দেখুন')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Side-by-Side Comparison Matrix */}
        {(showComparisonModal || isPackageCompareOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0B2545]">
                    {t('Health Package Comparison Matrix', 'হেলথ প্যাকেজ তুলনামূলক বিশ্লেষণ')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('Compare diagnostic coverage and savings across your selected packages', 'নির্বাচিত প্যাকেজসমূহের টেস্ট ও সুবিধার তুলনা')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowComparisonModal(false);
                    closeAllModals();
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-3 text-slate-500 font-bold w-1/4">Feature / Metric</th>
                      {comparedPackages.map((pkg) => (
                        <th key={pkg.id} className="py-3 px-3 font-bold text-[#0B2545] text-center">
                          <div>{language === 'bn' ? pkg.name.bn : pkg.name.en}</div>
                          <div className="text-base font-black text-[#139A8C] mt-1">৳{pkg.price}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Total Diagnostic Tests</td>
                      {comparedPackages.map((pkg) => (
                        <td key={pkg.id} className="py-3 px-3 text-center font-bold text-slate-800">
                          {pkg.testCount} Tests Included
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Cardiovascular (ECG / Lipids)</td>
                      {comparedPackages.map((pkg) => {
                        const hasCardio = pkg.includedCategories.some((c) => c.categoryName.en.includes('Cardio') || c.categoryName.en.includes('Lipid'));
                        return (
                          <td key={pkg.id} className="py-3 px-3 text-center">
                            {hasCardio ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <span className="text-slate-300">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Ultrasound / Imaging</td>
                      {comparedPackages.map((pkg) => {
                        const hasUSG = pkg.includedCategories.some((c) => c.categoryName.en.includes('Radiology') || c.categoryName.en.includes('Ultrasound') || c.categoryName.en.includes('Pelvic'));
                        return (
                          <td key={pkg.id} className="py-3 px-3 text-center">
                            {hasUSG ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <span className="text-slate-300">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Diabetes / HbA1c</td>
                      {comparedPackages.map((pkg) => {
                        const hasDiabetes = pkg.includedCategories.some((c) => c.categoryName.en.includes('Diabetes') || c.categoryName.en.includes('Glycemic') || c.categoryName.en.includes('Metabolic'));
                        return (
                          <td key={pkg.id} className="py-3 px-3 text-center">
                            {hasDiabetes ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <span className="text-slate-300">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Kidney & Liver Function</td>
                      {comparedPackages.map((pkg) => (
                        <td key={pkg.id} className="py-3 px-3 text-center">
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Doctor Consultation</td>
                      {comparedPackages.map((pkg) => (
                        <td key={pkg.id} className="py-3 px-3 text-center font-medium text-[#139A8C]">
                          1-on-1 Specialist Review
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-700">Action</td>
                      {comparedPackages.map((pkg) => (
                        <td key={pkg.id} className="py-3 px-3 text-center">
                          <button
                            onClick={() => {
                              setShowComparisonModal(false);
                              closeAllModals();
                              openBookingModal(undefined, 'in-clinic');
                            }}
                            className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#139A8C] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            Book ৳{pkg.price}
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
