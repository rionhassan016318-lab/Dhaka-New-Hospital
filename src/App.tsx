import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { BodyExplorer } from './components/BodyExplorer';
import { DualBookingEngine } from './components/DualBookingEngine';
import { DiagnosticsTracker } from './components/DiagnosticsTracker';
import { PackageComparator } from './components/PackageComparator';
import { DoctorDirectory } from './components/DoctorDirectory';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Modals
import { BookingModal } from './components/BookingModal';
import { HomeSampleBookingModal } from './components/HomeSampleBookingModal';
import { TelehealthRoomModal } from './components/TelehealthRoomModal';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col font-sans selection:bg-[#139A8C] selection:text-white">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with AI Symptom Finder & Quick Widget */}
          <Hero />

          {/* Integrated Healthcare Ecosystem Grid */}
          <CoreServices />

          {/* 3D Interactive Body Explorer */}
          <BodyExplorer />

          {/* Smart Dual Booking Engine */}
          <DualBookingEngine />

          {/* Live Diagnostics Step-by-Step Tracker */}
          <DiagnosticsTracker />

          {/* Dynamic Health Screening Package Comparator */}
          <PackageComparator />

          {/* Filterable Doctor Directory & Profiles */}
          <DoctorDirectory />

          {/* Patient Reviews & Verified Testimonials Carousel */}
          <Testimonials />
        </main>

        {/* Footer with Accreditations & Emergency Help */}
        <Footer />

        {/* Global Action Modals */}
        <BookingModal />
        <HomeSampleBookingModal />
        <TelehealthRoomModal />
      </div>
    </LanguageProvider>
  );
}
