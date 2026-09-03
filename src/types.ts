export type Language = 'en' | 'ru';
export type ViewMode = 'marketing' | 'questionnaire' | 'express_booking' | 'dashboard' | 'admin';
export type ProjectStatus = 'new' | 'questionnaire_completed' | 'research_in_progress' | 'plan_ready' | 'in_progress' | 'completed';
export type TierId = 'tier1' | 'tier2' | 'tier3' | 'tier4';
export type ClientFolderCategory = 'new' | 'active' | 'completed';

export interface ExpressConsultationBooking {
  name: string;
  messenger: string;
  email: string;
  password?: string;
  topic: string;
  bookingDate: string;
  bookingTime: string;
  meetingPlatform: 'Zoom' | 'Google Meet';
  bookedAt: string;
  priceUSD: number;
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
  overallFounderNote: { en: string; ru: string };
  consultationBooking?: ExpressConsultationBooking;
  tierId?: TierId;
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
  createdAt: string;
  updatedAt: string;
}
