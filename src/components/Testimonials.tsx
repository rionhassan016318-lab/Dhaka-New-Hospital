import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Heart, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const { language, t, openBookingModal } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentItem = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>{t('Patient Experiences & Stories', 'রোগীদের বাস্তব অভিজ্ঞতা ও প্রতিক্রিয়া')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Trusted by Over 100,000+ Happy Families', '১ লক্ষেরও বেশি সন্তুষ্ট পরিবারের বিশ্বস্ত ঠিকানা')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Read genuine stories of healing, empathy, and accurate diagnosis from real patients across Dhaka.',
              'সঠিক ডায়াগনসিস এবং যত্নশীল চিকিৎসা সেবায় আমাদের রোগীদের অভিজ্ঞতা।'
            )}
          </p>
        </div>

        {/* Testimonial Spotlight Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 via-white to-teal-50/30 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative">
          <Quote className="w-16 h-16 text-[#139A8C]/15 absolute top-6 right-8 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Patient Avatar & Tag */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
              <div className="relative">
                <img
                  src={currentItem.avatar}
                  alt={currentItem.patientName.en}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                />
                <span className="absolute -bottom-2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Patient
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#0B2545]">
                  {language === 'bn' ? currentItem.patientName.bn : currentItem.patientName.en}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'bn' ? currentItem.ageCity.bn : currentItem.ageCity.en}
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(currentItem.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Right: Testimonial Quote & Context */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#139A8C]">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200">
                  {language === 'bn' ? currentItem.treatmentType.bn : currentItem.treatmentType.en}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">
                  {language === 'bn' ? currentItem.condition.bn : currentItem.condition.en}
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed italic">
                "{language === 'bn' ? currentItem.comment.bn : currentItem.comment.en}"
              </blockquote>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-6 bg-[#139A8C]' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
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
