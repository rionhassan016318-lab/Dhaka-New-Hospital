import React, { useState } from 'react';
import { Home, CheckCircle2, Clock, MapPin, Calendar, User, Phone, ShieldCheck, X, ArrowRight, ArrowLeft, Upload, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { POPULAR_TESTS, SERVICE_AREAS_DHAKA } from '../data/mockData';

export const HomeSampleBookingModal: React.FC = () => {
  const { language, t, isHomeSampleOpen, closeAllModals } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>(['test-cbc', 'test-lipid']);
  const [customTestInput, setCustomTestInput] = useState('');
  const [prescriptionName, setPrescriptionName] = useState<string | null>(null);

  // Address info
  const [area, setArea] = useState(SERVICE_AREAS_DHAKA[0]);
  const [addressLine, setAddressLine] = useState('');
  const [collectionDate, setCollectionDate] = useState('Tomorrow Morning');
  const [timeSlot, setTimeSlot] = useState('07:00 AM - 08:30 AM (Fasting)');

  // Patient info
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Completed Confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  if (!isHomeSampleOpen) return null;

  const toggleTest = (id: string) => {
    if (selectedTestIds.includes(id)) {
      if (selectedTestIds.length > 1) {
        setSelectedTestIds(selectedTestIds.filter((tId) => tId !== id));
      }
    } else {
      setSelectedTestIds([...selectedTestIds, id]);
    }
  };

  const selectedTests = POPULAR_TESTS.filter((tst) => selectedTestIds.includes(tst.id));
  const subtotal = selectedTests.reduce((sum, item) => sum + item.price, 0);
  const homeServiceFee = subtotal >= 2000 ? 0 : 250; // Free home collection for 2000+ BDT
  const total = subtotal + homeServiceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockId = `AC-HOME-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedBookingId(mockId);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    closeAllModals();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeAllModals}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#139A8C] mb-1">
                <Home className="w-4 h-4" />
                <span>{t('At-Home Sample Collection', 'বাসায় বসে ল্যাব টেস্ট কালেকশন')}</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0B2545]">
                {t('Book Doorstep Phlebotomy in 3 Steps', 'সহজ ৩ ধাপে বুক করুন ডোরস্টেপ ব্লাড টেস্ট')}
              </h3>
            </div>

            {/* Stepper indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-[#139A8C]' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#139A8C] text-white' : 'bg-slate-200'}`}>1</span>
                <span>{t('Select Tests', 'টেস্ট নির্বাচন')}</span>
              </div>
              <span className="w-8 h-0.5 bg-slate-200" />
              <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-[#139A8C]' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#139A8C] text-white' : 'bg-slate-200'}`}>2</span>
                <span>{t('Address & Slot', 'ঠিকানা ও সময়')}</span>
              </div>
              <span className="w-8 h-0.5 bg-slate-200" />
              <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-[#139A8C]' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#139A8C] text-white' : 'bg-slate-200'}`}>3</span>
                <span>{t('Patient Details', 'রোগীর তথ্য')}</span>
              </div>
            </div>

            {/* Step 1: Select Tests */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 font-medium">
                  {t('Choose one or more accredited diagnostic tests for doorstep sample draw:', 'ডোরস্টেপ স্যাম্পল সংগ্রহের জন্য প্রয়োজনীয় টেস্ট নির্বাচন করুন:')}
                </p>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {POPULAR_TESTS.map((test) => {
                    const isSelected = selectedTestIds.includes(test.id);
                    return (
                      <div
                        key={test.id}
                        onClick={() => toggleTest(test.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected ? 'bg-teal-50/80 border-[#139A8C] shadow-2xs' : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 text-[#139A8C] rounded-sm focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-[#0B2545]">
                              {language === 'bn' ? test.name.bn : test.name.en}
                            </h5>
                            <span className="text-[11px] text-slate-500">
                              {test.fastingRequired ? t('Fasting Required', 'খালি পেটে প্রযোজ্য') : t('No Fasting Needed', 'খালি পেটের প্রয়োজন নেই')} • {language === 'bn' ? test.reportTurnaround.bn : test.reportTurnaround.en}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#0B2545]">৳{test.price}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Prescription upload simulation */}
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Upload className="w-4 h-4 text-[#139A8C]" />
                    <span>{prescriptionName || t('Have a Doctor’s Prescription? Upload photo', 'প্রেসক্রিপশন আছে? ছবি আপলোড করুন')}</span>
                  </div>
                  <label className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-100 cursor-pointer">
                    {t('Browse', 'ব্রাউজ')}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setPrescriptionName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Subtotal preview */}
                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-slate-500">{selectedTestIds.length} {t('tests selected', 'টি টেস্ট নির্বাচিত')}</span>
                  <span className="font-bold text-[#0B2545]">{t('Subtotal:', 'মোট টেস্ট মূল্য:')} ৳{subtotal}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#0B2545] hover:bg-[#139A8C] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('Continue to Address & Schedule', 'ঠিকানা ও সময় নির্বাচনে যান')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Address & Time Slot */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Select Dhaka Area (Zone Validation)', 'ঢাকা সার্ভিস এলাকা নির্বাচন করুন')}
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                  >
                    {SERVICE_AREAS_DHAKA.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Detailed Street Address & Flat/House No.', 'বিস্তারিত বাসার ঠিকানা ও ফ্ল্যাট নম্বর')}
                  </label>
                  <textarea
                    rows={2}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder={t('e.g. House 24, Road 7, Block D, Banani...', 'যেমন: বাসা ২৪, রোড ৭, ব্লক ডি, বনানী...')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Collection Date', 'স্যাম্পল নেওয়ার দিন')}
                    </label>
                    <select
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
                    >
                      <option value="Tomorrow Morning">{t('Tomorrow Morning', 'আগামীকাল সকাল')}</option>
                      <option value="Today (Urgent STAT)">{t('Today (Urgent STAT)', 'আজকেই (জরুরি ভিত্তিতে)')}</option>
                      <option value="Day After Tomorrow">{t('Day After Tomorrow', 'পরশু দিন')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Preferred Phlebotomy Slot', 'পছন্দের সময়সূচি')}
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
                    >
                      <option value="07:00 AM - 08:30 AM (Fasting)">07:00 AM - 08:30 AM ({t('Fasting', 'খালি পেটে')})</option>
                      <option value="08:30 AM - 10:00 AM">08:30 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('Back', 'পেছনে')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!addressLine.trim()}
                    className="flex-1 py-3 bg-[#0B2545] hover:bg-[#139A8C] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('Continue to Patient Details', 'রোগীর তথ্যে যান')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Information & Final Bill */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Patient Full Name', 'রোগীর পুরো নাম')}
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Shafin Ahmed"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Phone Number', 'মোবাইল নম্বর')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#139A8C]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Age (Years)', 'বয়স (বছর)')}
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 35"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Gender', 'লিঙ্গ')}
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                    >
                      <option value="male">{t('Male', 'পুরুষ')}</option>
                      <option value="female">{t('Female', 'নারী')}</option>
                    </select>
                  </div>
                </div>

                {/* Final Order Summary Card */}
                <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>{t('Selected Lab Tests Total:', 'ল্যাব টেস্ট মোট মূল্য:')}</span>
                    <span className="font-semibold">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t('Sterile Doorstep Phlebotomy Fee:', 'হোম স্যাম্পল কালেকশন চার্জ:')}</span>
                    <span className="font-semibold">
                      {homeServiceFee === 0 ? (
                        <span className="text-green-600 font-bold">{t('FREE (Offer)', 'ফ্রি (অফার)')}</span>
                      ) : (
                        `৳${homeServiceFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#0B2545] pt-1 border-t border-teal-200">
                    <span>{t('Total Payable:', 'সর্বমোট প্রদেয়:')}</span>
                    <span>৳{total}</span>
                  </div>
                  <p className="text-[11px] text-teal-800 italic pt-1">
                    {t('Pay via Cash, bKash, or Card after sample collection', 'স্যাম্পল সংগ্রহের পর ক্যাশ, বিকাশ বা কার্ডে পরিশোধ করুন')}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('Back', 'পেছনে')}</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#139A8C] hover:bg-[#0f8276] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('Confirm Doorstep Booking', 'হোম স্যাম্পল বুকিং নিশ্চিত করুন')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100 text-[#139A8C] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#0B2545]">
              {t('Doorstep Phlebotomist Dispatched!', 'স্যাম্পল কালেকশন বুকিং সফল হয়েছে!')}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {t(
                `Your booking ID is ${generatedBookingId}. Our certified phlebotomist with temperature-controlled cold-chain box will arrive on ${collectionDate} at ${timeSlot}.`,
                `আপনার বুকিং আইডি: ${generatedBookingId}। নির্ধারিত সময়ে আমাদের অভিজ্ঞ স্যাম্পল কালেক্টর প্রয়োজনীয় জীবাণুমুক্ত কিটসহ উপস্থিত হবেন।`
              )}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1">
              <div><strong>{t('Patient:', 'রোগী:')}</strong> {patientName} ({phone})</div>
              <div><strong>{t('Address:', 'ঠিকানা:')}</strong> {addressLine}, {area}</div>
              <div><strong>{t('Total Bill:', 'বিল:')}</strong> ৳{total} (Pay on Visit)</div>
            </div>

            <button
              onClick={resetForm}
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
