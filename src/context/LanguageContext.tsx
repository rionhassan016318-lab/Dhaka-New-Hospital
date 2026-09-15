import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (en: string, bn: string) => string;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  openBookingModal: (doctorId?: string, consultationType?: 'in-clinic' | 'video') => void;
  openHomeSampleModal: () => void;
  openTelehealthModal: (doctorId?: string) => void;
  openTrackerModal: (sampleId?: string) => void;
  openPackageCompareModal: (packageId?: string) => void;
  bookingDoctorId: string | null;
  bookingConsultType: 'in-clinic' | 'video';
  isBookingOpen: boolean;
  isHomeSampleOpen: boolean;
  isTelehealthOpen: boolean;
  isTrackerOpen: boolean;
  isPackageCompareOpen: boolean;
  trackerInitialId: string;
  compareInitialPackageId: string;
  closeAllModals: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [selectedLocation, setSelectedLocation] = useState<string>('banani');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
  const [bookingConsultType, setBookingConsultType] = useState<'in-clinic' | 'video'>('in-clinic');

  const [isHomeSampleOpen, setIsHomeSampleOpen] = useState(false);
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(false);
  const [telehealthDoctorId, setTelehealthDoctorId] = useState<string | null>(null);

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerInitialId, setTrackerInitialId] = useState('');

  const [isPackageCompareOpen, setIsPackageCompareOpen] = useState(false);
  const [compareInitialPackageId, setCompareInitialPackageId] = useState('pkg-executive');

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (en: string, bn: string) => {
    return language === 'bn' ? bn : en;
  };

  const openBookingModal = (doctorId?: string, consultationType: 'in-clinic' | 'video' = 'in-clinic') => {
    setBookingDoctorId(doctorId || null);
    setBookingConsultType(consultationType);
    setIsBookingOpen(true);
  };

  const openHomeSampleModal = () => {
    setIsHomeSampleOpen(true);
  };

  const openTelehealthModal = (doctorId?: string) => {
    setTelehealthDoctorId(doctorId || null);
    setIsTelehealthOpen(true);
  };

  const openTrackerModal = (sampleId?: string) => {
    setTrackerInitialId(sampleId || 'PRV-88219');
    setIsTrackerOpen(true);
  };

  const openPackageCompareModal = (packageId?: string) => {
    if (packageId) setCompareInitialPackageId(packageId);
    setIsPackageCompareOpen(true);
  };

  const closeAllModals = () => {
    setIsBookingOpen(false);
    setIsHomeSampleOpen(false);
    setIsTelehealthOpen(false);
    setIsTrackerOpen(false);
    setIsPackageCompareOpen(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        selectedLocation,
        setSelectedLocation,
        openBookingModal,
        openHomeSampleModal,
        openTelehealthModal,
        openTrackerModal,
        openPackageCompareModal,
        bookingDoctorId,
        bookingConsultType,
        isBookingOpen,
        isHomeSampleOpen,
        isTelehealthOpen,
        isTrackerOpen,
        isPackageCompareOpen,
        trackerInitialId,
        compareInitialPackageId,
        closeAllModals,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
