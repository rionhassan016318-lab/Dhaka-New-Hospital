export type Language = 'en' | 'bn';

export type ConsultationType = 'in-clinic' | 'video';

export interface Doctor {
  id: string;
  name: { en: string; bn: string };
  specialty: { en: string; bn: string };
  specialtyId: string;
  degrees: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  gender: 'male' | 'female';
  location: { en: string; bn: string };
  locationId: string;
  avatar: string;
  feeInClinic: number;
  feeVideo: number;
  nextAvailableSlot: { en: string; bn: string };
  isAvailableToday: boolean;
  isAvailableNowVideo: boolean;
  videoIntroUrl?: string;
  languages: string[];
  about: { en: string; bn: string };
}

export interface HealthPackage {
  id: string;
  name: { en: string; bn: string };
  tagline: { en: string; bn: string };
  price: number;
  originalPrice: number;
  testCount: number;
  idealFor: { en: string; bn: string };
  badge?: { en: string; bn: string };
  isPopular?: boolean;
  includedCategories: {
    categoryName: { en: string; bn: string };
    tests: { en: string; bn: string }[];
  }[];
  consultations: { en: string; bn: string }[];
}

export interface DiagnosticTest {
  id: string;
  name: { en: string; bn: string };
  code: string;
  department: { en: string; bn: string };
  price: number;
  fastingRequired: boolean;
  reportTurnaround: { en: string; bn: string };
  description: { en: string; bn: string };
  homeSampleEligible: boolean;
}

export interface BodyRegion {
  id: string;
  name: { en: string; bn: string };
  coordinates: { x: number; y: number; width?: number; height?: number };
  system: { en: string; bn: string };
  specialty: { en: string; bn: string };
  specialtyId: string;
  commonConditions: { en: string; bn: string }[];
  recommendedTests: { en: string; bn: string }[];
  recommendedPackageId: string;
  summary: { en: string; bn: string };
}

export interface Testimonial {
  id: string;
  patientName: { en: string; bn: string };
  ageCity: { en: string; bn: string };
  condition: { en: string; bn: string };
  treatmentType: { en: string; bn: string };
  rating: number;
  comment: { en: string; bn: string };
  avatar: string;
  hasVideoStory?: boolean;
  videoDuration?: string;
}

export interface LabSampleStatus {
  sampleId: string;
  patientName: string;
  ageGender: string;
  collectionDate: string;
  collectionMode: string;
  tests: {
    name: string;
    department: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    normal?: boolean | null;
  }[];
  currentStep: number; // 1 to 4
  timeline: {
    step: number;
    title: string;
    time: string;
    detail: string;
  }[];
  doctorNote?: string;
  downloadAvailable: boolean;
}

export interface SymptomTriageResult {
  analysis: string;
  triageLevel: 'Routine' | 'Urgent' | 'Emergency';
  recommendedSpecialties: string[];
  recommendedTests: string[];
  suggestedPackageId?: string;
  immediateAdvice: string;
  warningSigns: string[];
  source?: string;
}
