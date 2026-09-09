export type Language = 'en' | 'ru';
export type ViewMode = 'marketing' | 'questionnaire' | 'express_booking' | 'dashboard' | 'admin';
export type ProjectStatus = 'new' | 'questionnaire_completed' | 'research_in_progress' | 'plan_ready' | 'in_progress' | 'completed';
export type TierId = 'tier1' | 'tier2' | 'tier3' | 'tier4';
export type ClientFolderCategory = 'new' | 'active' | 'completed';

export interface ExpressConsultationBooking {
  id: string;
  name: string;
  messenger: string;
  email: string;
  password?: string;
  topic: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // e.g. '14:00 - 15:00'
  meetingPlatform: 'Zoom' | 'Google Meet';
  bookedAt: string;
  priceUSD: number;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled';
  expiresAt?: number; // timestamp in ms when 15-minute slot reservation expires
  paymentMethod?: 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr';
  founderNotes?: string;
}

export interface BlockedSlotItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. '14:00 - 15:00'
  reason?: string;
}

export interface FounderScheduleConfig {
  workingDaysOfWeek: number[]; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  defaultSlots: string[]; // e.g. ['10:00 - 11:00', '12:00 - 13:00', '14:00 - 15:00', '16:00 - 17:00', '18:00 - 19:00', '20:00 - 21:00']
  blackoutDates: string[]; // YYYY-MM-DD
  blockedSlots: BlockedSlotItem[];
  telegramBotToken?: string;
  telegramChatId?: string;
  founderEmail?: string;
  emailWebhookUrl?: string;
}

export interface SlotAvailability {
  time: string;
  status: 'available' | 'booked' | 'blocked' | 'pending_payment';
  booking?: ExpressConsultationBooking;
}

export interface ClientAccount {
  email: string;
  name: string;
  password?: string;
  messenger?: string;
  tier: 'consultation_50' | 'travel_290' | 'relocation_490' | 'concierge_890';
  booking?: ExpressConsultationBooking;
  registeredAt: string;
}

export interface ClientQuestionnaire {
  name: string;
  email: string;
  password?: string;
  country: string;
  travelDates: string;
  duration: string;
  travelersCount: number;
  monthlyBudgetUSD: number;
  workSituation: string;
  preferredCities: string[];
  environmentPreference: 'beach' | 'city' | 'quiet' | 'social' | 'balanced';
  accommodationType: string;
  remoteWorkNeeds: string;
  coworkingNeeds: string;
  transportationPreference: string;
  climatePreference: string;
  longTermGoals: string;
  priorities: string;
  concerns: string;
  additionalInfo: string;
}

export interface CityData {
  id: string;
  name: { en: string; ru: string };
  tagline: { en: string; ru: string };
  lifestyle: { en: string; ru: string };
  budgetRange: { en: string; ru: string };
  remoteWorkSetup: { en: string; ru: string };
  beachAccess: { en: string; ru: string };
  socialLife: { en: string; ru: string };
  heroImage: string;
}

export interface Neighborhood {
  id: string;
  cityId: string;
  name: string;
  tagline: { en: string; ru: string };
  description: { en: string; ru: string };
  scores: {
    budget: number; // 1-5 scale (1 low cost, 5 premium)
    beach: number; // 1-5 scale
    quiet: number; // 1-5 scale
    social: number; // 1-5 scale
    remoteWork: number; // 1-5 scale
  };
  highlights: { en: string[]; ru: string[] };
  founderNote?: { en: string; ru: string };
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  coworking: number;
  transportation: number;
  entertainment: number;
}

export interface RoadmapTask {
  id: string;
  phase: 'before_arrival' | 'week_of_arrival' | 'first_month';
  title: { en: string; ru: string };
  description?: { en: string; ru: string };
  completed: boolean;
  founderComment?: { en: string; ru: string };
}

export interface ResourceItem {
  id: string;
  title: { en: string; ru: string };
  description: { en: string; ru: string };
  url: string;
  category: 'accommodation' | 'transport' | 'internet' | 'work' | 'daily_life' | 'food';
  founderNote?: { en: string; ru: string };
}

export type NoiseAuditStatus =
  | 'verified_quiet'
  | 'acceptable_minor_traffic'
  | 'minor_renovation_nearby'
  | 'high_construction_risk'
  | 'construction_alert'
  | 'unverified';

export interface VerifiedHousingItem {
  id: string;
  condoName: string;
  cityId: string;
  district: string;
  addressSnippet: string;
  monthlyPriceUSD: number;
  monthlyPriceVND: number;
  evnTariffVNDPerKwh: number; // e.g. 2800 (State tariff) or 4000 (markup)
  isDirectEvnMeter: boolean; // Direct meter from EVN
  depositTerms: {
    amountUSD: number;
    months: number;
    refundConditions: { en: string; ru: string };
  };
  realtorContact: {
    name: string;
    phoneOrZalo: string;
    verifiedPartner: boolean;
  };
  noiseAudit: {
    status: NoiseAuditStatus;
    inspectedAt: string; // Date of inspection
    notes: { en: string; ru: string };
  };
  fiberInternetSpeedMbps: {
    download: number;
    upload: number;
    provider: 'Viettel' | 'VNPT' | 'FPT' | 'FPT Telecom' | 'Other' | string;
  };
  childFriendlyFeatures: string[];
  photoUrls: string[];
  videoTourUrl?: string;
  founderReview: { en: string; ru: string };
  contractAudited: boolean;
  isTopPick: boolean;
  publishedToClient: boolean;
  createdAt: string;
}

export interface ClientProject {
  id: string;
  clientName: string;
  email: string;
  serviceName: { en: string; ru: string };
  status: ProjectStatus;
  progressPercent: number;
  questionnaire: ClientQuestionnaire;
  recommendedCityId: string;
  recommendedCityWhy: { en: string; ru: string };
  recommendedNeighborhoodIds: string[];
  recommendedStartingBudget: BudgetBreakdown;
  userCurrentBudget: BudgetBreakdown;
  roadmapTasks: RoadmapTask[];
  resources: ResourceItem[];
  verifiedHousing: VerifiedHousingItem[];
  overallFounderNote: { en: string; ru: string };
  consultationBooking?: ExpressConsultationBooking;
  tierId?: TierId;
  orderId?: string;
  slaDeadline?: string;
  paidAt?: string;
  paymentMethod?: 'prodamus_card' | 'intl_card' | 'crypto_usdt' | 'viet_qr' | string;
  hasUnpublishedChanges?: boolean;
  lastPublishedAt?: string;
  updatedAt: string;
}

export interface AdminClientRecord {
  id: string;
  clientName: string;
  email: string;
  password?: string;
  category: ClientFolderCategory;
  tierId: TierId;
  serviceName: { en: string; ru: string };
  priceUSD: number;
  status: ProjectStatus;
  questionnaire: ClientQuestionnaire;
  recommendedCityId: string;
  recommendedCityWhy: { en: string; ru: string };
  overallFounderNote: { en: string; ru: string };
  userCurrentBudget: BudgetBreakdown;
  verifiedHousing: VerifiedHousingItem[];
  roadmapTasks: RoadmapTask[];
  paidAt?: string;
  paymentMethod?: string;
  slaDeadline?: string;
  hasUnpublishedChanges?: boolean;
  lastPublishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
