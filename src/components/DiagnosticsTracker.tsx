import React, { useState, useEffect } from 'react';
import { Activity, Search, CheckCircle2, Clock, FileText, Download, ShieldCheck, UserCheck, AlertCircle, RefreshCw, Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LabSampleStatus } from '../types';

export const DiagnosticsTracker: React.FC = () => {
  const { language, t, trackerInitialId } = useLanguage();
  const [sampleQuery, setSampleQuery] = useState('PRV-88219');
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<LabSampleStatus | null>(null);
  const [showReportPreview, setShowReportPreview] = useState(false);

  const fetchSample = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/track-sample/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      setSampleData(data);
    } catch (err) {
      console.error('Tracker error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSample(trackerInitialId || 'PRV-88219');
  }, [trackerInitialId]);

  return (
    <section id="diagnostics-section" className="py-16 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#139A8C] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>{t('Live Diagnostics Tracker', 'লাইভ ডায়াগনস্টিকস ট্র্যাকার')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            {t('Real-Time Lab Test Status & Reports', 'রিয়েল-টাইমে দেখুন আপনার ল্যাব রিপোর্টের অগ্রগতি')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t(
              'Track your diagnostic sample step-by-step from doorstep collection through high-precision laboratory analyzers to consultant pathologist sign-off.',
              'স্যাম্পল কালেকশন থেকে শুরু করে ল্যাবে পরীক্ষা ও সিনিয়র প্যাথলজিস্টের ভেরিফিকেশন পর্যন্ত প্রতিটি ধাপ স্বচ্ছভাবে ট্র্যাক করুন।'
            )}
          </p>
        </div>

        {/* Tracker Search Bar Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 mb-10">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sampleQuery}
                onChange={(e) => setSampleQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchSample(sampleQuery)}
                placeholder={t('Enter Sample Barcode or Patient ID (e.g. PRV-88219)...', 'স্যাম্পল বারকোড বা আইডি লিখুন (যেমন: PRV-88219)...')}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-[#139A8C] focus:bg-white"
              />
            </div>
            <button
              onClick={() => fetchSample(sampleQuery)}
              disabled={loading || !sampleQuery.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B2545] hover:bg-[#139A8C] disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('Tracking...', 'ট্র্যাক হচ্ছে...')}</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 text-[#139A8C]" />
                  <span>{t('Track Status', 'ট্র্যাক করুন')}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Sample ID Chips */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>{t('Demo Sample IDs:', 'ডেমো আইডি ট্রাই করুন:')}</span>
            <button
              onClick={() => {
                setSampleQuery('PRV-88219');
                fetchSample('PRV-88219');
              }}
              className="px-2 py-0.5 rounded-md bg-teal-50 text-[#139A8C] font-semibold border border-teal-200 hover:bg-teal-100 cursor-pointer"
            >
              PRV-88219 ({t('Report Ready', 'রিপোর্ট প্রস্তুত')})
            </button>
            <button
              onClick={() => {
                setSampleQuery('PRV-99402');
                fetchSample('PRV-99402');
              }}
              className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200 hover:bg-blue-100 cursor-pointer"
            >
              PRV-99402 ({t('Lab Processing', 'ল্যাবে পরীক্ষা চলছে')})
            </button>
          </div>
        </div>

        {/* Live Tracking Result View */}
        {sampleData && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-8">
            {/* Top Patient & Specimen Info Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#139A8C] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {t('Barcode ID:', 'বারকোড আইডি:')} {sampleData.sampleId}
                  </span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {sampleData.collectionMode}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0B2545]">{sampleData.patientName}</h3>
                <p className="text-xs text-slate-500">
                  {sampleData.ageGender} • {t('Collected:', 'সংগ্রহের সময়:')} {sampleData.collectionDate}
                </p>
              </div>

              {/* Action Button: Download if ready */}
              {sampleData.downloadAvailable ? (
                <button
                  onClick={() => setShowReportPreview(true)}
                  className="inline-flex items-center gap-2 bg-[#139A8C] hover:bg-[#0f8276] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('Download Official Report (PDF)', 'অফিসিয়াল রিপোর্ট ডাউনলোড (পিডিএফ)')}</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>{t('Processing in Lab • SMS alert upon completion', 'ল্যাবে পরীক্ষা চলছে • সম্পন্ন হলে এসএমএস যাবে')}</span>
                </div>
              )}
            </div>

            {/* Step-by-Step Interactive Timeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('Diagnostic Lifecycle Timeline', 'ডায়াগনস্টিক প্রক্রিয়ার প্রতিটি ধাপ')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {sampleData.timeline.map((stepItem) => {
                  const isCompleted = sampleData.currentStep >= stepItem.step;
                  const isCurrent = sampleData.currentStep === stepItem.step;

                  return (
                    <div
                      key={stepItem.step}
                      className={`relative p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-teal-50/70 border-[#139A8C] shadow-sm ring-2 ring-[#139A8C]/20'
                          : isCompleted
                          ? 'bg-white border-teal-200'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted ? 'bg-[#139A8C] text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isCompleted ? '✓' : stepItem.step}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{stepItem.time}</span>
                      </div>
                      <h5 className="text-sm font-bold text-[#0B2545]">{stepItem.title}</h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{stepItem.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test Breakdown Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('Tests Ordered in this Panel', 'এই প্যানেলে অন্তর্ভুক্ত পরীক্ষা সমূহ')}
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">{t('Test Name', 'টেস্টের নাম')}</th>
                      <th className="py-3 px-4">{t('Laboratory Department', 'ল্যাব বিভাগ')}</th>
                      <th className="py-3 px-4 text-right">{t('Status', 'বর্তমান অবস্থা')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sampleData.tests.map((tst, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-[#0B2545]">{tst.name}</td>
                        <td className="py-3 px-4 text-slate-500">{tst.department}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              tst.status === 'Completed'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {tst.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {tst.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pathologist Doctor Note */}
            {sampleData.doctorNote && (
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545]">
                  <UserCheck className="w-4 h-4 text-[#139A8C]" />
                  <span>{t('Consultant Pathologist Verification Note', 'কনসালট্যান্ট প্যাথলজিস্টের পর্যবেক্ষণ মন্তব্য')}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "{sampleData.doctorNote}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal: Official Digital Report Preview Modal */}
        {showReportPreview && sampleData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center font-black text-xs">
                    DNH
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545]">
                      Dhaka New Hospital Central Reference Laboratory
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      ISO 15189 Accredited • Plot 9, Road 11, Banani, Dhaka
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportPreview(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Patient details in slip */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block">{t('Patient Name:', 'রোগীর নাম:')}</span>
                  <strong className="text-slate-800">{sampleData.patientName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('Sample Barcode:', 'স্যাম্পল বারকোড:')}</span>
                  <strong className="text-slate-800">{sampleData.sampleId}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('Age / Gender:', 'বয়স / লিঙ্গ:')}</span>
                  <strong className="text-slate-800">{sampleData.ageGender}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('Reporting Date:', 'রিপোর্টের তারিখ:')}</span>
                  <strong className="text-slate-800">{sampleData.collectionDate}</strong>
                </div>
              </div>

              {/* Simulated Clinical Values */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t('Quantitative Test Findings', 'পরীক্ষার ফলাফল ও রেফারেন্স রেঞ্জ')}
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Investigation</th>
                        <th className="py-2.5 px-3">Observed Value</th>
                        <th className="py-2.5 px-3">Biological Reference</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Hemoglobin (Hb)</td>
                        <td className="py-2.5 px-3">13.8 g/dL</td>
                        <td className="py-2.5 px-3 text-slate-500">12.0 - 16.0 g/dL</td>
                        <td className="py-2.5 px-3 text-right text-green-600 font-bold">Normal</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Total Cholesterol</td>
                        <td className="py-2.5 px-3">218 mg/dL</td>
                        <td className="py-2.5 px-3 text-slate-500">&lt; 200 mg/dL</td>
                        <td className="py-2.5 px-3 text-right text-amber-600 font-bold">Borderline High</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">HbA1c (Glycated)</td>
                        <td className="py-2.5 px-3">5.4 %</td>
                        <td className="py-2.5 px-3 text-slate-500">&lt; 5.7 % (Normal)</td>
                        <td className="py-2.5 px-3 text-right text-green-600 font-bold">Optimal</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Serum Creatinine</td>
                        <td className="py-2.5 px-3">0.9 mg/dL</td>
                        <td className="py-2.5 px-3 text-slate-500">0.7 - 1.2 mg/dL</td>
                        <td className="py-2.5 px-3 text-right text-green-600 font-bold">Normal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Digital Signature */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Digitally Signed & QR Code Cryptographically Verified</span>
                </div>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 bg-[#0B2545] hover:bg-[#139A8C] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
