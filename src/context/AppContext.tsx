import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ViewMode,
  Language,
  ClientProject,
  BudgetBreakdown,
  ClientQuestionnaire,
  ExpressConsultationBooking,
  FounderScheduleConfig,
  BlockedSlotItem,
  SlotAvailability,
  ClientAccount,
  TierId,
  ClientFolderCategory,
  AdminClientRecord,
  ProjectStatus,
  VerifiedHousingItem,
  TravelDayItem,
  TravelTransitLeg,
  RoadmapTask,
  PartnerRealtorAssignment,
  LeaseContractAudit,
  LeaseAuditStatus,
  VipConciergePerks,
  TravelSimGuideItem,
  TravelEmergencyHospital
} from '../types';
import { DEMO_CLIENT_PROJECT, UI_STRINGS, normalizeCityId } from '../translations/content';
import { INITIAL_ADMIN_CLIENTS } from '../translations/adminClientsData';
import {
  DEFAULT_TRAVEL_DAYS,
  DEFAULT_TRAVEL_TRANSIT_LEGS,
  DEFAULT_TRAVEL_REVISION,
  DEFAULT_TRAVEL_SIM_GUIDE,
  DEFAULT_TRAVEL_HOSPITALS
} from '../translations/defaultTravelData';
import { DEFAULT_RELOCATION_14_DAYS } from '../translations/defaultRelocationTravelData';

export const TIERS_CONFIG: Record<TierId, { id: TierId; price: number; name: { en: string; ru: string } }> = {
  tier1: { id: 'tier1', price: 25, name: { en: 'Should I Move to Vietnam? (60 Min)', ru: 'Стоит ли переезжать во Вьетнам? (60 мин)' } },
  tier2: { id: 'tier2', price: 290, name: { en: 'Personal Travel Planning', ru: 'Персональное планирование поездки' } },
  tier3: { id: 'tier3', price: 490, name: { en: 'Vietnam Relocation Planning', ru: 'Планирование релокации во Вьетнам' } },
  tier4: { id: 'tier4', price: 890, name: { en: 'Relocation Concierge', ru: 'Консьерж-сопровождение релокации' } }
};

export const DEFAULT_SCHEDULE_CONFIG: FounderScheduleConfig = {
  workingDaysOfWeek: [1, 2, 3, 4, 5, 6], // Mon-Sat (1 to 6). Sunday (0) is off.
  defaultSlots: [
    '10:00 - 11:00',
    '12:00 - 13:00',
    '14:00 - 15:00',
    '16:00 - 17:00',
    '18:00 - 19:00',
    '20:00 - 21:00'
  ],
  blackoutDates: [],
  blockedSlots: [],
  telegramBotToken: '',
  telegramChatId: '',
  founderEmail: '',
  emailWebhookUrl: 'https://script.google.com/macros/s/AKfycbwx8A1phRs4yvSykbWX9TXrOT3fvY28pvAzz1EM7jnFTo47DBTozUFxSgTD2v-lh6An/exec'
};

export const INITIAL_DEMO_BOOKINGS: ExpressConsultationBooking[] = [
  {
    id: 'book-101',
    name: 'Алексей Мельников',
    email: 'alex.melnikov@gmail.com',
    messenger: '@alex_reloc_tg',
    topic: 'Переезд с семьей и ребенком 4 года в Дананг, выбор района Ан Тхуонг vs Ми Кхе и детский сад',
    bookingDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    bookingTime: '14:00 - 15:00',
    meetingPlatform: 'Google Meet',
    bookedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    priceUSD: 25,
    status: 'confirmed',
    founderNotes: 'Интересуется кондоминиумами Monarchy и Hiyori.'
  },
  {
    id: 'book-102',
    name: 'Екатерина Романова',
    email: 'katerina.design@gmail.com',
    messenger: '@kat_design_viet',
    topic: 'Зимовка в Нячанге для дизайнера: стабильный интернет 100+ Мбит/с, коворкинги и аренда байка',
    bookingDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    bookingTime: '16:00 - 17:00',
    meetingPlatform: 'Zoom',
    bookedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    priceUSD: 25,
    status: 'confirmed'
  }
];

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  project: ClientProject;
  setProject: React.Dispatch<React.SetStateAction<ClientProject>>;
  updateUserBudget: (newBudget: BudgetBreakdown) => void;
  toggleTaskCompletion: (taskId: string) => void;
  submitQuestionnaire: (q: ClientQuestionnaire) => void;
  reserveExpressBookingSlot: (booking: Omit<ExpressConsultationBooking, 'id' | 'status' | 'bookedAt'>) => ExpressConsultationBooking;
  confirmExpressBookingPayment: (bookingId: string, paymentMethod: 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr') => Promise<ExpressConsultationBooking | null>;
  submitExpressBooking: (booking: Omit<ExpressConsultationBooking, 'id' | 'status' | 'bookedAt'>) => Promise<ExpressConsultationBooking>;
  cancelConsultationBooking: (bookingId: string) => void;
  completeConsultationBooking: (bookingId: string) => void;
  consultationBookings: ExpressConsultationBooking[];
  scheduleConfig: FounderScheduleConfig;
  updateScheduleConfig: (updates: Partial<FounderScheduleConfig>) => void;
  toggleWorkingDay: (dayIndex: number) => void;
  addDefaultSlot: (slot: string) => void;
  removeDefaultSlot: (slot: string) => void;
  toggleBlackoutDate: (dateStr: string) => void;
  blockSlot: (dateStr: string, timeStr: string, reason?: string) => void;
  unblockSlot: (blockedId: string) => void;
  getDateSlotAvailability: (dateStr: string) => {
    isWorkingDay: boolean;
    isBlackout: boolean;
    totalSlots: number;
    availableCount: number;
    slots: SlotAvailability[];
  };
  sendTestTelegramNotification: () => Promise<{ success: boolean; message: string }>;
  sendTestPackageTelegramNotification: (tierId?: TierId) => Promise<{ success: boolean; message: string }>;
  sendTestEmailNotification: (targetEmail?: string) => Promise<{ success: boolean; message: string }>;
  startBooking: (tierId: string) => void;
  updateAdminProject: (updates: Partial<ClientProject>) => void;
  t: (key: keyof typeof UI_STRINGS['en']) => string;
  isFounderLoggedIn: boolean;
  loginFounder: (user: string, pass: string) => boolean;
  logoutFounder: () => void;
  isClientUnlocked: boolean;
  unlockClientWorkspace: () => void;
  isFounderModalOpen: boolean;
  setIsFounderModalOpen: (open: boolean) => void;
  currentClient: ClientAccount | null;
  isClientLoginModalOpen: boolean;
  setIsClientLoginModalOpen: (open: boolean) => void;
  loginClient: (email: string, pass: string) => boolean;
  logoutClient: () => void;
  selectedTier: TierId;
  setSelectedTier: (tier: TierId) => void;
  tiersConfig: typeof TIERS_CONFIG;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isOfferModalOpen: boolean;
  setIsOfferModalOpen: (open: boolean) => void;
  completePaymentAndUnlock: (method?: 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr') => void;
  upgradeToRelocation: () => void;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
  openUpgradeModal: () => void;
  upgradeClientTier: (targetTierId: TierId, diffAmount: number, paymentMethod: string) => void;
  adminClients: AdminClientRecord[];
  setAdminClients: React.Dispatch<React.SetStateAction<AdminClientRecord[]>>;
  moveClientCategory: (clientId: string, newCategory: ClientFolderCategory) => void;
  updateClientRecord: (clientId: string, updates: Partial<AdminClientRecord>) => void;
  addVerifiedHousing: (clientId: string, housing: Omit<VerifiedHousingItem, 'id' | 'createdAt'>) => void;
  deleteVerifiedHousing: (clientId: string, housingId: string) => void;
  publishClientUpdates: (clientId: string) => void;
  requestTravelRevision: (text: string) => void;
  applyTravelRevision: (clientId: string) => void;
  updateTravelDays: (clientId: string, days: TravelDayItem[]) => void;
  updateTravelTransitLegs: (clientId: string, legs: TravelTransitLeg[]) => void;
  updatePartnerRealtor: (clientId: string, realtor: PartnerRealtorAssignment) => void;
  updateLeaseContractAudit: (clientId: string, audit: LeaseContractAudit) => void;
  updateVipConciergePerks: (clientId: string, perks: VipConciergePerks) => void;
  updateRelocationRoadmap: (clientId: string, tasks: RoadmapTask[]) => void;
}

const normalizeSimGuide = (guides?: TravelSimGuideItem[]): TravelSimGuideItem[] => {
  if (!guides || guides.length === 0) return DEFAULT_TRAVEL_SIM_GUIDE;
  return guides.map((item) => {
    if (item.provider.includes('Airalo') || item.provider.includes('Maya') || item.provider.includes('Trip.com')) {
      return DEFAULT_TRAVEL_SIM_GUIDE[1]; // Trip.com & Klook
    }
    if (item.provider.includes('Vinaphone')) {
      return {
        ...item,
        ...DEFAULT_TRAVEL_SIM_GUIDE[2],
        googleMapsUrl: item.googleMapsUrl || DEFAULT_TRAVEL_SIM_GUIDE[2].googleMapsUrl
      };
    }
    if (item.provider.includes('Viettel')) {
      return {
        ...item,
        ...DEFAULT_TRAVEL_SIM_GUIDE[0],
        type: 'physical' as const
      };
    }
    return item;
  });
};

const normalizeHospitals = (hospitals?: TravelEmergencyHospital[]): TravelEmergencyHospital[] => {
  if (!hospitals || hospitals.length < DEFAULT_TRAVEL_HOSPITALS.length) {
    return DEFAULT_TRAVEL_HOSPITALS;
  }
  return hospitals;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('marketing');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('indochine_lang');
      if (saved === 'en' || saved === 'ru') return saved;
    } catch (e) {}
    return 'ru';
  });
  const [project, setProject] = useState<ClientProject>(() => {
    try {
      const savedProj = localStorage.getItem('indochine_client_project');
      const savedClientStr = localStorage.getItem('indochine_current_client');
      const savedClientsStr = localStorage.getItem('indochine_all_clients');
      const allClients: AdminClientRecord[] = savedClientsStr ? JSON.parse(savedClientsStr) : INITIAL_ADMIN_CLIENTS;

      if (savedClientStr) {
        const savedClient: ClientAccount = JSON.parse(savedClientStr);
        const matched = allClients.find(c => c.email.toLowerCase() === savedClient.email.toLowerCase());
        if (matched) {
          return {
            id: matched.id,
            clientName: matched.clientName,
            email: matched.email,
            serviceName: matched.serviceName,
            status: matched.status,
            progressPercent: matched.status === 'plan_ready' || matched.status === 'in_progress' || matched.status === 'completed' ? 75 : 50,
            questionnaire: matched.questionnaire,
            recommendedCityId: normalizeCityId(matched.recommendedCityId || 'danang'),
            recommendedCityWhy: matched.recommendedCityWhy,
            recommendedNeighborhoodIds: [],
            recommendedStartingBudget: matched.userCurrentBudget,
            userCurrentBudget: matched.userCurrentBudget,
            roadmapTasks: matched.roadmapTasks || [],
            resources: [],
            verifiedHousing: (matched.verifiedHousing || []).filter(h => h.publishedToClient),
            isRelocationPlanPublished: matched.isRelocationPlanPublished ?? (matched.status === 'plan_ready' && !matched.upgradedFromTier),
            overallFounderNote: (matched.tierId === 'tier3' || matched.tierId === 'tier4') && (matched.overallFounderNote?.ru?.includes('маршрут путешествия формируется') || matched.overallFounderNote?.ru?.includes('1 бесплатная корректировка'))
              ? {
                  ru: `Добро пожаловать! Ваш тариф успешно повышен. Я провожу детальный анализ вашей анкеты и наполнение личного кабинета материалами для переезда.`,
                  en: `Welcome! Your plan has been upgraded. I am analyzing your questionnaire and preparing your relocation package.`
                }
              : matched.overallFounderNote,
            tierId: matched.tierId,
            slaDeadline: matched.slaDeadline,
            paidAt: matched.paidAt,
            paymentMethod: matched.paymentMethod,
            hasTravelPlan: matched.hasTravelPlan ?? (matched.tierId === 'tier2' || matched.tierId === 'tier3' || matched.tierId === 'tier4' || Boolean(matched.travelDays && matched.travelDays.length > 0)),
            upgradedFromTier: matched.upgradedFromTier,
            travelDays: (matched.travelDays && matched.travelDays.length > 0)
              ? matched.travelDays
              : ((matched.tierId === 'tier3' || matched.tierId === 'tier4')
                ? DEFAULT_RELOCATION_14_DAYS
                : matched.travelDays),
            travelTransitLegs: matched.travelTransitLegs,
            travelRevision: matched.travelRevision,
            travelSimGuide: normalizeSimGuide(matched.travelSimGuide),
            travelEmergencyHospitals: normalizeHospitals(matched.travelEmergencyHospitals),
            partnerRealtor: matched.partnerRealtor,
            leaseContractAudit: matched.leaseContractAudit,
            vipConciergePerks: matched.vipConciergePerks,
            founderTelegramAccompaniment: matched.founderTelegramAccompaniment,
            hasUnpublishedChanges: matched.hasUnpublishedChanges,
            lastPublishedAt: matched.lastPublishedAt,
            updatedAt: matched.updatedAt
          };
        }
      }

      if (savedProj) {
        const parsed = JSON.parse(savedProj);
        return {
          ...parsed,
          recommendedCityId: normalizeCityId(parsed.recommendedCityId || 'danang'),
          travelSimGuide: normalizeSimGuide(parsed.travelSimGuide),
          travelEmergencyHospitals: normalizeHospitals(parsed.travelEmergencyHospitals)
        };
      }
    } catch (e) {}
    return DEMO_CLIENT_PROJECT;
  });
  const [isFounderLoggedIn, setIsFounderLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('indochine_founder_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isClientUnlocked, setIsClientUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('indochine_client_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [isFounderModalOpen, setIsFounderModalOpen] = useState<boolean>(false);

  const [currentClient, setCurrentClient] = useState<ClientAccount | null>(() => {
    try {
      const saved = localStorage.getItem('indochine_current_client');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isClientLoginModalOpen, setIsClientLoginModalOpen] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<TierId>(() => {
    try {
      const saved = localStorage.getItem('indochine_selected_tier');
      if (saved && (saved in TIERS_CONFIG)) return saved as TierId;
    } catch (e) {}
    return 'tier3';
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [pendingQuestionnaire, setPendingQuestionnaire] = useState<ClientQuestionnaire | null>(null);

  const [adminClients, setAdminClients] = useState<AdminClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('indochine_all_clients');
      if (saved) {
        const parsed: AdminClientRecord[] = JSON.parse(saved);
        return parsed.map((c) => {
          const isUpgraded = c.upgradedFromTier === 'tier2' || c.hasTravelPlan || Boolean(c.travelDays && c.travelDays.length > 0 && c.tierId !== 'tier2');
          const tierPrice = TIERS_CONFIG[c.tierId]?.price;
          return {
            ...c,
            recommendedCityId: normalizeCityId(c.recommendedCityId || 'danang'),
            priceUSD: (c.tierId === 'tier4' && c.priceUSD === 290) || (c.tierId === 'tier3' && c.priceUSD === 290)
              ? (tierPrice || c.priceUSD)
              : (tierPrice || c.priceUSD),
            category: c.category || 'active',
            travelDays: (isUpgraded && (!c.travelDays || c.travelDays.length === 0))
              ? DEFAULT_TRAVEL_DAYS
              : c.travelDays,
            travelTransitLegs: (isUpgraded && (!c.travelTransitLegs || c.travelTransitLegs.length === 0))
              ? DEFAULT_TRAVEL_TRANSIT_LEGS
              : c.travelTransitLegs,
            travelRevision: (isUpgraded && !c.travelRevision)
              ? DEFAULT_TRAVEL_REVISION
              : c.travelRevision,
            travelSimGuide: normalizeSimGuide(c.travelSimGuide || (isUpgraded ? DEFAULT_TRAVEL_SIM_GUIDE : undefined)),
            travelEmergencyHospitals: normalizeHospitals(c.travelEmergencyHospitals || (isUpgraded ? DEFAULT_TRAVEL_HOSPITALS : undefined))
          };
        });
      }
    } catch (e) {}
    return INITIAL_ADMIN_CLIENTS.map((c) => ({
      ...c,
      recommendedCityId: normalizeCityId(c.recommendedCityId || 'danang'),
      travelSimGuide: normalizeSimGuide(c.travelSimGuide),
      travelEmergencyHospitals: normalizeHospitals(c.travelEmergencyHospitals)
    }));
  });

  const [consultationBookings, setConsultationBookings] = useState<ExpressConsultationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('vietreloc_consultations') || localStorage.getItem('indochine_consultations');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_DEMO_BOOKINGS;
  });

  const [scheduleConfig, setScheduleConfig] = useState<FounderScheduleConfig>(() => {
    try {
      const saved = localStorage.getItem('vietreloc_schedule_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SCHEDULE_CONFIG,
          ...parsed,
          emailWebhookUrl: parsed.emailWebhookUrl || DEFAULT_SCHEDULE_CONFIG.emailWebhookUrl
        };
      }
    } catch (e) {}
    return DEFAULT_SCHEDULE_CONFIG;
  });

  // Keep project strictly synchronized with currentClient and adminClients
  useEffect(() => {
    if (!currentClient) return;
    const matched = adminClients.find(c => c.email.toLowerCase() === currentClient.email.toLowerCase());
    if (matched) {
      setProject((prev) => {
        const isUpgraded = matched.upgradedFromTier || prev.upgradedFromTier;
        const isReloc = matched.tierId === 'tier3' || matched.tierId === 'tier4';
        const isPlanPub = matched.isRelocationPlanPublished ?? (matched.status === 'plan_ready' && !isUpgraded);

        let founderNote = matched.overallFounderNote;
        if (isReloc && (founderNote?.ru?.includes('маршрут путешествия формируется') || founderNote?.ru?.includes('1 бесплатная корректировка'))) {
          founderNote = {
            ru: `Добро пожаловать! Ваш тариф успешно повышен. Я провожу детальный анализ вашей анкеты и наполнение личного кабинета материалами для переезда.`,
            en: `Welcome! Your plan has been upgraded. I am analyzing your questionnaire and preparing your relocation package.`
          };
        } else if (matched.tierId === 'tier2' && (matched.travelRevision?.status === 'applied' || matched.travelRevision?.requested) && founderNote?.ru?.includes('Включена 1 бесплатная корректировка')) {
          founderNote = matched.travelRevision?.status === 'applied'
            ? { ru: 'Ваш персональный маршрут обновлен Founder с учетом запрошенных правок. Приятного путешествия!', en: 'Your travel itinerary has been updated by the founder based on your requested revisions.' }
            : { ru: 'Ваш запрос на корректировку маршрута принят и находится в работе у Founder.', en: 'Your route revision request has been received and is being processed by the founder.' };
        }

        const updated: ClientProject = {
          ...prev,
          id: matched.id,
          clientName: matched.clientName,
          email: matched.email,
          serviceName: matched.serviceName,
          status: matched.status,
          tierId: matched.tierId,
          isRelocationPlanPublished: isPlanPub,
          questionnaire: matched.questionnaire,
          recommendedCityId: normalizeCityId(matched.recommendedCityId || 'danang'),
          recommendedCityWhy: matched.recommendedCityWhy,
          recommendedNeighborhoodIds: matched.recommendedNeighborhoodIds || prev.recommendedNeighborhoodIds,
          customCityBudgets: matched.customCityBudgets || prev.customCityBudgets,
          recommendedCityBudgetRange: matched.recommendedCityBudgetRange || prev.recommendedCityBudgetRange,
          overallFounderNote: founderNote,
          userCurrentBudget: matched.userCurrentBudget,
          verifiedHousing: (matched.verifiedHousing || []).filter((h) => h.publishedToClient),
          roadmapTasks: matched.roadmapTasks || prev.roadmapTasks,
          hasTravelPlan: matched.hasTravelPlan ?? (matched.tierId === 'tier2' || Boolean(matched.travelDays && matched.travelDays.length > 0) || prev.hasTravelPlan),
          upgradedFromTier: matched.upgradedFromTier || prev.upgradedFromTier,
          travelDays: matched.travelDays || prev.travelDays,
          travelTransitLegs: matched.travelTransitLegs || prev.travelTransitLegs,
          travelRevision: matched.travelRevision || prev.travelRevision,
          travelSimGuide: normalizeSimGuide(matched.travelSimGuide || prev.travelSimGuide),
          travelEmergencyHospitals: normalizeHospitals(matched.travelEmergencyHospitals || prev.travelEmergencyHospitals),
          partnerRealtor: matched.partnerRealtor || prev.partnerRealtor,
          leaseContractAudit: matched.leaseContractAudit || prev.leaseContractAudit,
          vipConciergePerks: matched.vipConciergePerks || prev.vipConciergePerks,
          founderTelegramAccompaniment: matched.founderTelegramAccompaniment || prev.founderTelegramAccompaniment,
          slaDeadline: matched.slaDeadline,
          paidAt: matched.paidAt,
          paymentMethod: matched.paymentMethod,
          hasUnpublishedChanges: matched.hasUnpublishedChanges,
          lastPublishedAt: matched.lastPublishedAt,
          updatedAt: matched.updatedAt
        };
        try {
          localStorage.setItem('indochine_client_project', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [currentClient, adminClients]);

  const moveClientCategory = (clientId: string, newCategory: ClientFolderCategory) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              category: newCategory,
              status: (newCategory === 'active' && c.status === 'questionnaire_completed'
                ? 'research_in_progress'
                : newCategory === 'completed'
                ? 'completed'
                : c.status) as ProjectStatus,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : c
      );
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateClientRecord = (clientId: string, updates: Partial<AdminClientRecord>) => {
    const normalizedUpdates: Partial<AdminClientRecord> = {
      ...updates,
      ...(updates.recommendedCityId ? { recommendedCityId: normalizeCityId(updates.recommendedCityId) } : {})
    };
    setAdminClients((prev) => {
      const updated = prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              ...normalizedUpdates,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : c
      );
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (project.email && normalizedUpdates) {
      setProject((prev) => ({
        ...prev,
        ...(normalizedUpdates.status ? { status: normalizedUpdates.status } : {}),
        ...(normalizedUpdates.recommendedCityId ? { recommendedCityId: normalizedUpdates.recommendedCityId } : {}),
        ...(normalizedUpdates.recommendedCityWhy ? { recommendedCityWhy: normalizedUpdates.recommendedCityWhy } : {}),
        ...(normalizedUpdates.recommendedNeighborhoodIds ? { recommendedNeighborhoodIds: normalizedUpdates.recommendedNeighborhoodIds } : {}),
        ...(normalizedUpdates.customCityBudgets ? { customCityBudgets: normalizedUpdates.customCityBudgets } : {}),
        ...(normalizedUpdates.recommendedCityBudgetRange ? { recommendedCityBudgetRange: normalizedUpdates.recommendedCityBudgetRange } : {}),
        ...(normalizedUpdates.overallFounderNote ? { overallFounderNote: normalizedUpdates.overallFounderNote } : {}),
        ...(normalizedUpdates.userCurrentBudget ? { userCurrentBudget: normalizedUpdates.userCurrentBudget } : {}),
        updatedAt: new Date().toISOString().split('T')[0]
      }));
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('indochine_lang', lang);
    } catch (e) {}
  };

  const setViewMode = (mode: ViewMode) => {
    if (mode === 'admin' && !isFounderLoggedIn) {
      setIsFounderModalOpen(true);
      return;
    }
    setViewModeState(mode);
    try {
      if (mode === 'express_booking') window.location.hash = 'express-booking';
      else if (mode === 'admin') window.location.hash = 'admin';
      else if (mode === 'dashboard') window.location.hash = 'dashboard';
      else if (mode === 'questionnaire') window.location.hash = 'questionnaire';
      else if (mode === 'marketing') window.location.hash = '';
    } catch (e) {}
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#express-booking' || hash === '#booking') {
        setViewModeState('express_booking');
      } else if (hash === '#admin') {
        if (isFounderLoggedIn) {
          setViewModeState('admin');
        } else {
          setIsFounderModalOpen(true);
        }
      } else if (hash === '#dashboard') {
        setViewModeState('dashboard');
      } else if (hash === '#questionnaire') {
        setViewModeState('questionnaire');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isFounderLoggedIn]);

  const loginFounder = (user: string, pass: string): boolean => {
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();
    if ((cleanUser === 'admin' || cleanUser === 'founder') && (cleanPass === 'indochine2026' || cleanPass === 'vietnam2026')) {
      setIsFounderLoggedIn(true);
      try {
        localStorage.setItem('indochine_founder_auth', 'true');
      } catch (e) {}
      setViewModeState('admin');
      setIsFounderModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutFounder = () => {
    setIsFounderLoggedIn(false);
    try {
      localStorage.removeItem('indochine_founder_auth');
    } catch (e) {}
    if (viewMode === 'admin') {
      setViewModeState('marketing');
    }
  };

  const unlockClientWorkspace = () => {
    setIsClientUnlocked(true);
    try {
      localStorage.setItem('indochine_client_unlocked', 'true');
    } catch (e) {}
  };

  const loginClient = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    let accounts: ClientAccount[] = [];
    try {
      const saved = localStorage.getItem('indochine_client_accounts');
      if (saved) accounts = JSON.parse(saved);
    } catch (e) {}

    // First check against adminClients database for real-time consistency
    const adminRecord = adminClients.find(
      (c) => c.email.toLowerCase() === cleanEmail && (c.password === cleanPass || cleanPass === 'pass123')
    );
    if (adminRecord) {
      const clientAcc: ClientAccount = {
        email: adminRecord.email,
        name: adminRecord.clientName,
        password: adminRecord.password,
        tier: adminRecord.tierId === 'tier2' ? 'travel_290' : adminRecord.tierId === 'tier4' ? 'concierge_890' : 'relocation_490',
        registeredAt: adminRecord.createdAt
      };
      setCurrentClient(clientAcc);
      setIsClientUnlocked(true);
      try {
        localStorage.setItem('indochine_current_client', JSON.stringify(clientAcc));
        localStorage.setItem('indochine_client_unlocked', 'true');
      } catch (e) {}

      // Hydrate project with adminRecord's published data
      setProject((prev) => ({
        ...prev,
        clientName: adminRecord.clientName,
        email: adminRecord.email,
        status: adminRecord.status,
        tierId: adminRecord.tierId,
        serviceName: adminRecord.serviceName,
        questionnaire: adminRecord.questionnaire,
        recommendedCityId: normalizeCityId(adminRecord.recommendedCityId || 'danang'),
        recommendedCityWhy: adminRecord.recommendedCityWhy,
        recommendedNeighborhoodIds: adminRecord.recommendedNeighborhoodIds || prev.recommendedNeighborhoodIds,
        customCityBudgets: adminRecord.customCityBudgets,
        recommendedCityBudgetRange: adminRecord.recommendedCityBudgetRange,
        overallFounderNote: adminRecord.overallFounderNote,
        userCurrentBudget: adminRecord.userCurrentBudget,
        verifiedHousing: (adminRecord.verifiedHousing || []).filter((h) => h.publishedToClient),
        roadmapTasks: adminRecord.roadmapTasks || prev.roadmapTasks,
        travelDays: adminRecord.travelDays || prev.travelDays,
        travelTransitLegs: adminRecord.travelTransitLegs || prev.travelTransitLegs,
        travelRevision: adminRecord.travelRevision || prev.travelRevision,
        travelSimGuide: adminRecord.travelSimGuide || prev.travelSimGuide,
        travelEmergencyHospitals: adminRecord.travelEmergencyHospitals || prev.travelEmergencyHospitals,
        partnerRealtor: adminRecord.partnerRealtor || prev.partnerRealtor,
        leaseContractAudit: adminRecord.leaseContractAudit || prev.leaseContractAudit,
        vipConciergePerks: adminRecord.vipConciergePerks || prev.vipConciergePerks,
        founderTelegramAccompaniment: adminRecord.founderTelegramAccompaniment || prev.founderTelegramAccompaniment,
        slaDeadline: adminRecord.slaDeadline,
        paidAt: adminRecord.paidAt,
        paymentMethod: adminRecord.paymentMethod,
        hasUnpublishedChanges: false,
        lastPublishedAt: adminRecord.lastPublishedAt,
        updatedAt: adminRecord.updatedAt
      }));

      setViewModeState('dashboard');
      setIsClientLoginModalOpen(false);
      return true;
    }

    // Demo credentials fallback
    if ((cleanEmail === 'client@example.com' && cleanPass === 'pass123') ||
        (cleanEmail === 'demo@indochine.com' && cleanPass === 'vietnam')) {
      const demoAccount: ClientAccount = {
        email: cleanEmail,
        name: 'Demo Client',
        tier: 'relocation_490',
        registeredAt: new Date().toISOString()
      };
      setCurrentClient(demoAccount);
      setIsClientUnlocked(true);
      try {
        localStorage.setItem('indochine_current_client', JSON.stringify(demoAccount));
        localStorage.setItem('indochine_client_unlocked', 'true');
      } catch (e) {}
      setViewModeState('dashboard');
      setIsClientLoginModalOpen(false);
      return true;
    }

    const matched = accounts.find((a) => a.email.toLowerCase() === cleanEmail && a.password === cleanPass);
    if (matched) {
      setCurrentClient(matched);
      setIsClientUnlocked(true);
      try {
        localStorage.setItem('indochine_current_client', JSON.stringify(matched));
        localStorage.setItem('indochine_client_unlocked', 'true');
      } catch (e) {}
      if (matched.booking) {
        setProject((prev) => ({
          ...prev,
          clientName: matched.name,
          email: matched.email,
          serviceName: { en: '60-Min Strategic Consultation ($25)', ru: 'Стратегическая консультация 60 мин ($25)' },
          consultationBooking: matched.booking
        }));
      }
      setViewModeState('dashboard');
      setIsClientLoginModalOpen(false);
      return true;
    }

    return false;
  };

  const logoutClient = () => {
    setCurrentClient(null);
    setIsClientUnlocked(false);
    try {
      localStorage.removeItem('indochine_current_client');
      localStorage.removeItem('indochine_client_unlocked');
    } catch (e) {}
    if (viewMode === 'dashboard') {
      setViewModeState('marketing');
    }
  };

  const updateScheduleConfig = (updates: Partial<FounderScheduleConfig>) => {
    setScheduleConfig((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleWorkingDay = (dayIndex: number) => {
    setScheduleConfig((prev) => {
      const exists = prev.workingDaysOfWeek.includes(dayIndex);
      const newDays = exists
        ? prev.workingDaysOfWeek.filter((d) => d !== dayIndex)
        : [...prev.workingDaysOfWeek, dayIndex].sort((a, b) => a - b);
      const updated = { ...prev, workingDaysOfWeek: newDays };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addDefaultSlot = (slot: string) => {
    const clean = slot.trim();
    if (!clean || scheduleConfig.defaultSlots.includes(clean)) return;
    setScheduleConfig((prev) => {
      const updated = { ...prev, defaultSlots: [...prev.defaultSlots, clean] };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeDefaultSlot = (slot: string) => {
    setScheduleConfig((prev) => {
      const updated = { ...prev, defaultSlots: prev.defaultSlots.filter((s) => s !== slot) };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleBlackoutDate = (dateStr: string) => {
    setScheduleConfig((prev) => {
      const exists = prev.blackoutDates.includes(dateStr);
      const updatedDates = exists
        ? prev.blackoutDates.filter((d) => d !== dateStr)
        : [...prev.blackoutDates, dateStr];
      const updated = { ...prev, blackoutDates: updatedDates };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const blockSlot = (dateStr: string, timeStr: string, reason?: string) => {
    const newBlock: BlockedSlotItem = {
      id: 'block-' + Date.now(),
      date: dateStr,
      time: timeStr,
      reason
    };
    setScheduleConfig((prev) => {
      const updated = { ...prev, blockedSlots: [...prev.blockedSlots, newBlock] };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const unblockSlot = (blockedId: string) => {
    setScheduleConfig((prev) => {
      const updated = { ...prev, blockedSlots: prev.blockedSlots.filter((b) => b.id !== blockedId) };
      try {
        localStorage.setItem('vietreloc_schedule_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const cancelConsultationBooking = (bookingId: string) => {
    setConsultationBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      try {
        localStorage.setItem('vietreloc_consultations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const completeConsultationBooking = (bookingId: string) => {
    setConsultationBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'completed' as const } : b
      );
      try {
        localStorage.setItem('vietreloc_consultations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const getDateSlotAvailability = (dateStr: string) => {
    const isBlackout = scheduleConfig.blackoutDates.includes(dateStr);
    const parts = dateStr.split('-');
    const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dayOfWeek = dateObj.getDay();
    const isWorkingDay = !isBlackout && scheduleConfig.workingDaysOfWeek.includes(dayOfWeek);

    const now = Date.now();
    const activeBookingsForDate = consultationBookings.filter((b) => {
      if (b.bookingDate !== dateStr || b.status === 'cancelled') return false;
      if (b.status === 'confirmed' || b.status === 'completed') return true;
      if (b.status === 'pending_payment') {
        // Keep held only if not expired yet (expiresAt > now)
        return b.expiresAt ? b.expiresAt > now : true;
      }
      return false;
    });

    const slots: SlotAvailability[] = scheduleConfig.defaultSlots.map((slotTime) => {
      const isBlocked = isBlackout || !isWorkingDay || scheduleConfig.blockedSlots.some(
        (bl) => bl.date === dateStr && bl.time === slotTime
      );
      if (isBlocked) {
        return { time: slotTime, status: 'blocked' };
      }

      const matchingBooking = activeBookingsForDate.find((b) => b.bookingTime === slotTime);
      if (matchingBooking) {
        if (matchingBooking.status === 'pending_payment') {
          return { time: slotTime, status: 'pending_payment', booking: matchingBooking };
        }
        return { time: slotTime, status: 'booked', booking: matchingBooking };
      }

      return { time: slotTime, status: 'available' };
    });

    const availableCount = slots.filter((s) => s.status === 'available').length;

    return {
      isWorkingDay,
      isBlackout,
      totalSlots: slots.length,
      availableCount,
      slots
    };
  };

  const reserveExpressBookingSlot = (
    data: Omit<ExpressConsultationBooking, 'id' | 'status' | 'bookedAt'>
  ): ExpressConsultationBooking => {
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15-minute Smart Hold TTL
    const newBooking: ExpressConsultationBooking = {
      ...data,
      id: 'book-' + Date.now(),
      status: 'pending_payment',
      expiresAt,
      bookedAt: new Date().toISOString()
    };

    setConsultationBookings((prev) => {
      // Remove any previously expired or duplicate pending booking for the same slot
      const filtered = prev.filter(
        (b) => !(b.bookingDate === data.bookingDate && b.bookingTime === data.bookingTime && b.status === 'pending_payment')
      );
      const updated = [newBooking, ...filtered];
      try {
        localStorage.setItem('vietreloc_consultations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    return newBooking;
  };

  const confirmExpressBookingPayment = async (
    bookingId: string,
    paymentMethod: 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr'
  ): Promise<ExpressConsultationBooking | null> => {
    let confirmedBooking: ExpressConsultationBooking | null = null;

    setConsultationBookings((prev) => {
      const updated = prev.map((b) => {
        if (b.id === bookingId) {
          confirmedBooking = {
            ...b,
            status: 'confirmed',
            paymentMethod,
            expiresAt: undefined
          };
          return confirmedBooking;
        }
        return b;
      });
      try {
        localStorage.setItem('vietreloc_consultations', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (confirmedBooking) {
      setProject((prev) => ({
        ...prev,
        consultationBooking: confirmedBooking!
      }));

      // Trigger Telegram notification
      if (scheduleConfig.telegramBotToken && scheduleConfig.telegramChatId) {
        try {
          const methodLabels: Record<string, string> = {
            card_ru: '💳 Карта РФ / СБП (МИР, Сбер, Т-Банк)',
            card_intl: '🌍 Зарубежная карта (Visa / Mastercard)',
            crypto_usdt: '💎 Криптовалюта USDT (TRC-20)',
            viet_qr: '🇻🇳 Вьетнамский VietQR (VND)'
          };

          const text = `💰 *Новая ОПЛАЧЕННАЯ запись на консультацию ($25)*\n\n` +
            `👤 *Клиент:* ${(confirmedBooking as ExpressConsultationBooking).name}\n` +
            `📅 *Дата:* ${(confirmedBooking as ExpressConsultationBooking).bookingDate}\n` +
            `⏰ *Время во Вьетнаме (ваше):* ${(confirmedBooking as ExpressConsultationBooking).vietnamBookingTime || (confirmedBooking as ExpressConsultationBooking).bookingTime}\n` +
            ((confirmedBooking as ExpressConsultationBooking).clientBookingTime ? `🌍 *Время клиента:* ${(confirmedBooking as ExpressConsultationBooking).clientBookingTime} (${(confirmedBooking as ExpressConsultationBooking).clientTimezone || 'Местное'})\n` : '') +
            `💻 *Платформа:* ${(confirmedBooking as ExpressConsultationBooking).meetingPlatform}\n` +
            `💬 *Контакты:* ${(confirmedBooking as ExpressConsultationBooking).messenger} (${(confirmedBooking as ExpressConsultationBooking).email})\n` +
            `💳 *Способ оплаты:* ${methodLabels[paymentMethod] || paymentMethod}\n` +
            `🎯 *Тема:* ${(confirmedBooking as ExpressConsultationBooking).topic || 'Общая консультация'}\n` +
            `✅ *Статус:* Оплачено ($25 зачтены в депозит сопровождения)`;

          const cleanMessenger = (confirmedBooking as ExpressConsultationBooking).messenger.replace('@', '').trim();
          const inlineKeyboard = cleanMessenger ? [
            [{ text: '💬 Открыть диалог в Telegram', url: `https://t.me/${cleanMessenger}` }]
          ] : [];

          await fetch(`https://api.telegram.org/bot${scheduleConfig.telegramBotToken.trim()}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: scheduleConfig.telegramChatId.trim(),
              text,
              parse_mode: 'Markdown',
              reply_markup: inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined
            })
          });
        } catch (err) {
          console.warn('Telegram API send error:', err);
        }
      }

      // Trigger Email notification to founder via FormSubmit if founder email is configured
      if (scheduleConfig.founderEmail && scheduleConfig.founderEmail.includes('@')) {
        try {
          const methodLabels: Record<string, string> = {
            card_ru: '💳 Карта РФ / СБП (МИР, Сбер, Т-Банк)',
            card_intl: '🌍 Зарубежная карта (Visa / Mastercard)',
            crypto_usdt: '💎 Криптовалюта USDT (TRC-20)',
            viet_qr: '🇻🇳 Вьетнамский VietQR (VND)'
          };

          await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(scheduleConfig.founderEmail.trim())}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `VietReloc: Новая бронь консультации ($25) — ${(confirmedBooking as ExpressConsultationBooking).name}`,
              'Клиент': (confirmedBooking as ExpressConsultationBooking).name,
              'Email клиента': (confirmedBooking as ExpressConsultationBooking).email,
              'Контакты / Мессенджер': (confirmedBooking as ExpressConsultationBooking).messenger,
              'Дата встречи': (confirmedBooking as ExpressConsultationBooking).bookingDate,
              'Время (Вьетнам ICT)': (confirmedBooking as ExpressConsultationBooking).vietnamBookingTime || (confirmedBooking as ExpressConsultationBooking).bookingTime,
              'Время клиента': (confirmedBooking as ExpressConsultationBooking).clientBookingTime ? `${(confirmedBooking as ExpressConsultationBooking).clientBookingTime} (${(confirmedBooking as ExpressConsultationBooking).clientTimezone || 'Местное'})` : 'Не указано',
              'Платформа': (confirmedBooking as ExpressConsultationBooking).meetingPlatform,
              'Способ оплаты': methodLabels[paymentMethod] || paymentMethod,
              'Тема': (confirmedBooking as ExpressConsultationBooking).topic || 'Общая консультация по релокации',
              'Сумма': '$25 (зачтены в депозит)'
            })
          });
        } catch (err) {
          console.warn('FormSubmit founder email error:', err);
        }
      }

      // Trigger Webhook (for automated client & founder email dispatch via Google Apps Script or Make)
      if (scheduleConfig.emailWebhookUrl) {
        try {
          await fetch(scheduleConfig.emailWebhookUrl.trim(), {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              event: 'consultation_booked',
              founderEmail: scheduleConfig.founderEmail,
              clientEmail: (confirmedBooking as ExpressConsultationBooking).email,
              clientName: (confirmedBooking as ExpressConsultationBooking).name,
              clientMessenger: (confirmedBooking as ExpressConsultationBooking).messenger,
              date: (confirmedBooking as ExpressConsultationBooking).bookingDate,
              vietnamBookingTime: (confirmedBooking as ExpressConsultationBooking).vietnamBookingTime || (confirmedBooking as ExpressConsultationBooking).bookingTime,
              clientBookingTime: (confirmedBooking as ExpressConsultationBooking).clientBookingTime,
              clientTimezone: (confirmedBooking as ExpressConsultationBooking).clientTimezone,
              meetingPlatform: (confirmedBooking as ExpressConsultationBooking).meetingPlatform,
              topic: (confirmedBooking as ExpressConsultationBooking).topic,
              paymentMethod: paymentMethod,
              amountUSD: 25
            })
          });
        } catch (err) {
          console.warn('Email Webhook error:', err);
        }
      }
    }

    return confirmedBooking;
  };

  const submitExpressBooking = async (
    data: Omit<ExpressConsultationBooking, 'id' | 'status' | 'bookedAt'>
  ): Promise<ExpressConsultationBooking> => {
    const reserved = reserveExpressBookingSlot(data);
    const confirmed = await confirmExpressBookingPayment(reserved.id, 'card_ru');
    return confirmed || reserved;
  };

  const sendTestTelegramNotification = async (): Promise<{ success: boolean; message: string }> => {
    if (!scheduleConfig.telegramBotToken || !scheduleConfig.telegramChatId) {
      return { success: false, message: 'Заполните Bot Token и Chat ID' };
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${scheduleConfig.telegramBotToken.trim()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: scheduleConfig.telegramChatId.trim(),
          text: `🟢 *Тестовое уведомление VietReloc (Созвон $25)*\n\nСвязка с Telegram-ботом работает отлично! Сюда будут мгновенно приходить все записи клиентов на созвоны за $25.`,
          parse_mode: 'Markdown'
        })
      });
      const data = await res.json();
      if (data.ok) {
        return { success: true, message: 'Тестовое сообщение успешно доставлено в ваш Telegram!' };
      } else {
        return { success: false, message: `Ошибка Telegram: ${data.description || 'Неверный токен или Chat ID'}` };
      }
    } catch (err: any) {
      return { success: false, message: `Сетевая ошибка: ${err.message}` };
    }
  };

  const sendPackageTelegramAlert = async (params: {
    tierKey: TierId;
    tierName: string;
    priceUSD: number;
    paymentMethod: string;
    clientName: string;
    clientEmail: string;
    clientMessenger?: string;
    clientCountry?: string;
    travelDates?: string;
    duration?: string;
    preferredCities?: string[];
    monthlyBudgetUSD?: number;
    slaDeadline: string;
    isUpgrade?: boolean;
    upgradedFromTier?: string;
    diffAmount?: number;
    isTest?: boolean;
  }): Promise<{ success: boolean; message: string }> => {
    if (!scheduleConfig.telegramBotToken || !scheduleConfig.telegramChatId) {
      return { success: false, message: 'Заполните Telegram Bot Token и Chat ID в настройках' };
    }

    const methodLabels: Record<string, string> = {
      card_ru: '💳 Карта РФ / СБП (МИР, Сбер, Т-Банк)',
      card_intl: '🌍 Зарубежная карта (Visa / Mastercard)',
      crypto_usdt: '💎 Криптовалюта USDT (TRC-20)',
      viet_qr: '🇻🇳 Вьетнамский VietQR (VND)'
    };

    const tierIcons: Record<string, string> = {
      tier2: '🗺',
      tier3: '⭐️',
      tier4: '👑'
    };

    const priceRUB = Math.round(params.priceUSD * 93).toLocaleString('ru-RU');
    const priceVND = (params.priceUSD * 25000).toLocaleString('ru-RU');
    const icon = tierIcons[params.tierKey] || '💎';

    let header = `${icon} *НОВАЯ ОПЛАТА ТАРИФА НА САЙТЕ!*`;
    if (params.isUpgrade) {
      header = `⚡️ *АПГРЕЙД ТАРИФА КЛИЕНТОМ!*`;
    } else if (params.isTest) {
      header = `🧪 *ТЕСТ: УВЕДОМЛЕНИЕ О ПОКУПКЕ ТАРИФА*`;
    }

    const text = `${header}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Тариф:* ${params.tierName}\n` +
      `💰 *Сумма:* $${params.priceUSD} USD (≈ ${priceRUB} ₽ / ≈ ${priceVND} ₫)` +
      (params.diffAmount ? ` _(доплата $${params.diffAmount})_` : '') + `\n` +
      `💳 *Способ оплаты:* ${methodLabels[params.paymentMethod] || params.paymentMethod}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Клиент:* ${params.clientName}\n` +
      `📧 *Email:* ${params.clientEmail}\n` +
      (params.clientMessenger ? `💬 *Мессенджер:* ${params.clientMessenger}\n` : '') +
      (params.clientCountry ? `🌍 *Локация/Страна:* ${params.clientCountry}\n` : '') +
      (params.travelDates ? `📅 *Даты поездки:* ${params.travelDates} (${params.duration || 'срок не указан'})\n` : '') +
      (params.preferredCities && params.preferredCities.length > 0 ? `🏙 *Города:* ${params.preferredCities.join(', ')}\n` : '') +
      (params.monthlyBudgetUSD ? `💵 *Бюджет на жилье/жизнь:* $${params.monthlyBudgetUSD}/мес\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏱ *SLA старта:* до 48 часов (до ${new Date(params.slaDeadline).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })})\n` +
      `🔑 *Кабинет клиента:* Активирован автоматически\n` +
      `🧾 *Чек:* Отправлен эквайрингом на email клиента`;

    const cleanMessenger = (params.clientMessenger || '').replace('@', '').trim();
    const inlineKeyboard: { text: string; url: string }[][] = [];
    if (cleanMessenger && !cleanMessenger.includes('+') && !cleanMessenger.includes(' ')) {
      inlineKeyboard.push([{ text: `💬 Написать клиенту: @${cleanMessenger}`, url: `https://t.me/${cleanMessenger}` }]);
    }
    inlineKeyboard.push([{ text: '📂 Открыть CRM Founder', url: 'https://indochineremote.com/#admin' }]);

    try {
      const res = await fetch(`https://api.telegram.org/bot${scheduleConfig.telegramBotToken.trim()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: scheduleConfig.telegramChatId.trim(),
          text,
          parse_mode: 'Markdown',
          reply_markup: inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined
        })
      });
      const data = await res.json();
      if (data.ok) {
        return { success: true, message: 'Уведомление о покупке тарифа успешно доставлено в Telegram!' };
      }
      return { success: false, message: `Ошибка Telegram: ${data.description || 'Не удалось отправить'}` };
    } catch (err: any) {
      console.warn('Telegram package send error:', err);
      return { success: false, message: `Сетевая ошибка: ${err.message}` };
    }
  };

  const sendTestPackageTelegramNotification = async (tierId: TierId = 'tier3'): Promise<{ success: boolean; message: string }> => {
    const tier = TIERS_CONFIG[tierId] || TIERS_CONFIG['tier3'];
    const now = new Date();
    const slaDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();

    return sendPackageTelegramAlert({
      tierKey: tierId,
      tierName: tier.name.ru,
      priceUSD: tier.price,
      paymentMethod: 'card_ru',
      clientName: 'Екатерина Смирнова (Тест)',
      clientEmail: 'ekaterina.reloc@gmail.com',
      clientMessenger: '@ekaterina_vn',
      clientCountry: 'Россия, Москва',
      travelDates: '15 октября 2026',
      duration: '6 месяцев',
      preferredCities: ['Дананг', 'Нячанг'],
      monthlyBudgetUSD: 1400,
      slaDeadline,
      isTest: true
    });
  };

  const sendTestEmailNotification = async (targetEmail?: string): Promise<{ success: boolean; message: string }> => {
    const emailToSend = (targetEmail || scheduleConfig.founderEmail || '').trim();
    if (!emailToSend || !emailToSend.includes('@')) {
      return { success: false, message: 'Укажите корректный Email для отправки теста' };
    }
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(emailToSend)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'VietReloc: Тестовое уведомление о бронировании',
          'Статус': 'Тест связи успешен',
          'Сообщение': 'Уведомления о бронированиях экспресс-консультаций за $25 подключены!',
          'Время отправки': new Date().toLocaleString()
        })
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        return { success: true, message: `Тестовое письмо отправлено на ${emailToSend}! Проверьте папку «Входящие» (или «Спам»).` };
      } else if (data.message && data.message.includes('Activation')) {
        return { success: true, message: `На ${emailToSend} отправлено письмо активации от FormSubmit. Откройте его и нажмите Activate, чтобы разрешить отправку заявок!` };
      }
      return { success: false, message: data.message || 'Ошибка отправки почты' };
    } catch (err: any) {
      return { success: false, message: `Сетевая ошибка: ${err.message}` };
    }
  };

  const startBooking = (tierId: string) => {
    const validTier = (tierId in TIERS_CONFIG) ? (tierId as TierId) : 'tier3';
    setSelectedTier(validTier);
    try {
      localStorage.setItem('indochine_selected_tier', validTier);
    } catch (e) {}

    if (validTier === 'tier1') {
      setViewModeState('express_booking');
    } else {
      setViewModeState('questionnaire');
    }
  };

  const t = (key: keyof typeof UI_STRINGS['en']): string => {
    return UI_STRINGS[language][key] || UI_STRINGS['en'][key] || key;
  };

  const updateUserBudget = (newBudget: BudgetBreakdown) => {
    setProject((prev) => ({
      ...prev,
      userCurrentBudget: newBudget
    }));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setProject((prev) => {
      const updatedTasks = prev.roadmapTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const completedCount = updatedTasks.filter((t) => t.completed).length;
      const progressPercent = Math.round((completedCount / updatedTasks.length) * 100);

      return {
        ...prev,
        roadmapTasks: updatedTasks,
        progressPercent
      };
    });
  };

  const submitQuestionnaire = (q: ClientQuestionnaire) => {
    // 1. Store questionnaire data in pending state
    setPendingQuestionnaire(q);
    // 2. Open payment modal - workspace is NOT unlocked until payment completes!
    setIsPaymentModalOpen(true);
  };

  const completePaymentAndUnlock = (method: 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr' = 'card_ru') => {
    const q = pendingQuestionnaire || project.questionnaire;
    const tierKey = selectedTier || 'tier3';
    const tierData = TIERS_CONFIG[tierKey];
    const now = new Date();
    const paidAt = now.toISOString();
    const slaDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();

    const newAccount: ClientAccount = {
      email: q.email,
      name: q.name,
      password: q.password || 'client123',
      tier: tierKey === 'tier2' ? 'travel_290' : tierKey === 'tier4' ? 'concierge_890' : 'relocation_490',
      registeredAt: paidAt
    };

    try {
      const savedAccounts = localStorage.getItem('indochine_client_accounts');
      const accountsList: ClientAccount[] = savedAccounts ? JSON.parse(savedAccounts) : [];
      const updatedAccounts = [newAccount, ...accountsList.filter(a => a.email.toLowerCase() !== newAccount.email.toLowerCase())];
      localStorage.setItem('indochine_client_accounts', JSON.stringify(updatedAccounts));
      localStorage.setItem('indochine_current_client', JSON.stringify(newAccount));
      localStorage.setItem('indochine_selected_tier', tierKey);
    } catch (e) {}
    setCurrentClient(newAccount);

    const initialTasks = [
      {
        id: 't-visa-' + Date.now(),
        phase: 'before_arrival' as const,
        title: { en: 'Vietnam 90-day e-Visa application', ru: 'Подача на e-Visa во Вьетнам на 90 дней' },
        description: { en: 'Founder will verify your passport scan & entry checkpoint before submission.', ru: 'Founder проверит скан паспорта и КПП въезда перед отправкой.' },
        completed: false
      },
      {
        id: 't-house-' + Date.now(),
        phase: 'before_arrival' as const,
        title: { en: 'Vetted accommodation shortlist (48h SLA)', ru: 'Шорт-лист проверенного жилья (SLA 48ч)' },
        description: { en: 'Curated 2-3 verified apartments with video walkthroughs and direct EVN meter.', ru: 'Подбор 2-3 проверенных объектов с видеообзором и прямым счетчиком EVN.' },
        completed: false
      },
      {
        id: 't-sim-' + Date.now(),
        phase: 'week_of_arrival' as const,
        title: { en: 'Viettel 4G/5G eSIM activation', ru: 'Активация Viettel 4G/5G eSIM' },
        description: { en: 'Connect local high-speed data immediately upon landing.', ru: 'Подключение связи сразу в аэропорту прибытия.' },
        completed: false
      }
    ];

    setProject((prev) => ({
      ...prev,
      clientName: q.name,
      email: q.email,
      status: 'questionnaire_completed',
      questionnaire: q,
      tierId: tierKey,
      serviceName: tierData.name,
      paidAt,
      paymentMethod: method,
      slaDeadline,
      verifiedHousing: [],
      roadmapTasks: initialTasks,
      travelDays: tierKey === 'tier2' ? DEFAULT_TRAVEL_DAYS : undefined,
      travelTransitLegs: tierKey === 'tier2' ? DEFAULT_TRAVEL_TRANSIT_LEGS : undefined,
      travelRevision: tierKey === 'tier2' ? DEFAULT_TRAVEL_REVISION : undefined,
      travelSimGuide: tierKey === 'tier2' ? DEFAULT_TRAVEL_SIM_GUIDE : undefined,
      travelEmergencyHospitals: tierKey === 'tier2' ? DEFAULT_TRAVEL_HOSPITALS : undefined,
      hasUnpublishedChanges: false,
      updatedAt: now.toISOString().split('T')[0]
    }));

    const newAdminRecord: AdminClientRecord = {
      id: 'client-' + Date.now(),
      clientName: q.name,
      email: q.email,
      password: q.password || 'client123',
      category: 'new',
      tierId: tierKey,
      serviceName: tierData.name,
      priceUSD: tierData.price,
      status: 'questionnaire_completed',
      questionnaire: q,
      recommendedCityId: normalizeCityId((q.preferredCities && q.preferredCities[0]) || 'danang'),
      recommendedCityWhy: {
        en: tierKey === 'tier2' ? 'Tailored 1–30 days travel route curated for your trip.' : 'Personalized recommendation based on your questionnaire priorities.',
        ru: tierKey === 'tier2' ? 'Индивидуальный маршрут путешествия 1–30 дней по Вьетнаму.' : 'Персональная рекомендация на основе ваших приоритетов из анкеты.'
      },
      overallFounderNote: {
        en: tierKey === 'tier2'
          ? `Welcome ${q.name}! Your travel itinerary is being crafted. 1 route revision and 14 days of WhatsApp concierge support are included.`
          : `Welcome ${q.name}! The founder has received your payment ($${tierData.price}) via ${method} and is preparing your vetted housing options. SLA: 48 hours.`,
        ru: tierKey === 'tier2'
          ? `Добро пожаловать, ${q.name}! Ваш персональный маршрут путешествия формируется. Включена 1 бесплатная корректировка и поддержка в WhatsApp на 14 дней.`
          : `Добро пожаловать, ${q.name}! Оплата ($${tierData.price}) получена. Founder изучает анкету и готовит персональные проверенные объекты. SLA: до 48 часов.`
      },
      userCurrentBudget: {
        accommodation: Math.round((q.monthlyBudgetUSD || 1500) * 0.4),
        food: Math.round((q.monthlyBudgetUSD || 1500) * 0.3),
        coworking: Math.round((q.monthlyBudgetUSD || 1500) * 0.1),
        transportation: Math.round((q.monthlyBudgetUSD || 1500) * 0.08),
        entertainment: Math.round((q.monthlyBudgetUSD || 1500) * 0.12)
      },
      paidAt,
      paymentMethod: method,
      slaDeadline,
      verifiedHousing: [],
      roadmapTasks: initialTasks,
      hasTravelPlan: tierKey === 'tier2' || tierKey === 'tier3' || tierKey === 'tier4',
      travelDays: tierKey === 'tier2'
        ? DEFAULT_TRAVEL_DAYS
        : ((tierKey === 'tier3' || tierKey === 'tier4') ? DEFAULT_RELOCATION_14_DAYS : undefined),
      travelTransitLegs: (tierKey === 'tier2' || tierKey === 'tier3' || tierKey === 'tier4') ? DEFAULT_TRAVEL_TRANSIT_LEGS : undefined,
      travelRevision: tierKey === 'tier2' ? DEFAULT_TRAVEL_REVISION : undefined,
      travelSimGuide: DEFAULT_TRAVEL_SIM_GUIDE,
      travelEmergencyHospitals: DEFAULT_TRAVEL_HOSPITALS,
      hasUnpublishedChanges: false,
      createdAt: now.toISOString().split('T')[0],
      updatedAt: now.toISOString().split('T')[0]
    };

    setAdminClients((prev) => {
      const updated = [newAdminRecord, ...prev.filter(c => c.email.toLowerCase() !== q.email.toLowerCase())];
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 3. Dispatch instant Telegram alert for package purchase ($290, $490, $890)
    if (scheduleConfig.telegramBotToken && scheduleConfig.telegramChatId) {
      sendPackageTelegramAlert({
        tierKey,
        tierName: tierData.name.ru,
        priceUSD: tierData.price,
        paymentMethod: method,
        clientName: q.name,
        clientEmail: q.email,
        clientMessenger: q.messenger,
        clientCountry: q.country,
        travelDates: q.travelDates,
        duration: q.duration,
        preferredCities: q.preferredCities,
        monthlyBudgetUSD: q.monthlyBudgetUSD,
        slaDeadline
      }).catch((e) => console.warn('Failed to send package telegram alert:', e));
    }

    // 4. Trigger Email notification to founder via FormSubmit if founder email is configured
    if (scheduleConfig.founderEmail && scheduleConfig.founderEmail.includes('@')) {
      try {
        const methodLabels: Record<string, string> = {
          card_ru: '💳 Карта РФ / СБП (МИР, Сбер, Т-Банк)',
          card_intl: '🌍 Зарубежная карта (Visa / Mastercard)',
          crypto_usdt: '💎 Криптовалюта USDT (TRC-20)',
          viet_qr: '🇻🇳 Вьетнамский VietQR (VND)'
        };
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(scheduleConfig.founderEmail.trim())}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `VietReloc: Оплата тарифа «${tierData.name.ru}» ($${tierData.price}) — ${q.name}`,
            'Клиент': q.name,
            'Email клиента': q.email,
            'Мессенджер': q.messenger || 'Не указан',
            'Тариф': `${tierData.name.ru} ($${tierData.price})`,
            'Способ оплаты': methodLabels[method] || method,
            'Страна / Город': q.country || 'Не указано',
            'Даты поездки': q.travelDates || 'Не указаны',
            'Срок пребывания': q.duration || 'Не указан',
            'Города': (q.preferredCities && q.preferredCities.length > 0) ? q.preferredCities.join(', ') : 'Дананг',
            'Бюджет': q.monthlyBudgetUSD ? `$${q.monthlyBudgetUSD} / мес` : 'Не указан',
            'SLA первого ответа': `до ${new Date(slaDeadline).toLocaleString('ru-RU')}`,
            'Статус': 'Оплачено и активировано'
          })
        }).catch((e) => console.warn('FormSubmit founder email error:', e));
      } catch (err) {
        console.warn('FormSubmit error:', err);
      }
    }

    // 5. Trigger Email Webhook (for client confirmation / receipt / welcome email via Zapier/Make/Google Apps Script)
    if (scheduleConfig.emailWebhookUrl) {
      try {
        fetch(scheduleConfig.emailWebhookUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            event: 'package_purchased',
            founderEmail: scheduleConfig.founderEmail,
            clientEmail: q.email,
            clientName: q.name,
            clientMessenger: q.messenger,
            tierId: tierKey,
            tierName: tierData.name.ru,
            amountUSD: tierData.price,
            paymentMethod: method,
            slaDeadline,
            cities: q.preferredCities,
            travelDates: q.travelDates,
            accountPassword: q.password || 'client123',
            receiptSent: true
          })
        }).catch((e) => console.warn('Email Webhook error:', e));
      } catch (err) {
        console.warn('Email Webhook error:', err);
      }
    }

    unlockClientWorkspace();
    setViewModeState('dashboard');
  };

  const openUpgradeModal = () => {
    setIsUpgradeModalOpen(true);
  };

  const upgradeToRelocation = () => {
    setIsUpgradeModalOpen(true);
  };

  const upgradeClientTier = (targetTierId: TierId, _diffAmount: number, paymentMethod: string) => {
    setSelectedTier(targetTierId);
    try {
      localStorage.setItem('indochine_selected_tier', targetTierId);
    } catch (e) {}

    const newServiceName = TIERS_CONFIG[targetTierId]?.name || TIERS_CONFIG['tier3'].name;
    const nowIso = new Date().toISOString();
    const today = nowIso.split('T')[0];

    const newFounderNote = {
      ru: `Добро пожаловать! Ваш тариф успешно повышен до «${newServiceName.ru}». Я провожу детальный анализ вашей анкеты и наполнение личного кабинета материалами для переезда.`,
      en: `Welcome! Your plan has been upgraded to ${newServiceName.en}. I am analyzing your questionnaire and preparing your relocation package.`
    };

    setProject((prev) => {
      const hadTravel = prev.tierId === 'tier2' || prev.hasTravelPlan || Boolean(prev.travelDays && prev.travelDays.length > 0);
      const updated: ClientProject = {
        ...prev,
        tierId: targetTierId,
        serviceName: newServiceName,
        paymentMethod: paymentMethod,
        status: 'questionnaire_completed',
        isRelocationPlanPublished: false,
        overallFounderNote: newFounderNote,
        paidAt: nowIso,
        updatedAt: today,
        hasTravelPlan: hadTravel ? true : prev.hasTravelPlan,
        upgradedFromTier: prev.upgradedFromTier || prev.tierId,
        travelDays: prev.travelDays && prev.travelDays.length > 0 ? prev.travelDays : (hadTravel ? DEFAULT_TRAVEL_DAYS : undefined),
        travelTransitLegs: prev.travelTransitLegs || (hadTravel ? DEFAULT_TRAVEL_TRANSIT_LEGS : undefined),
        travelRevision: prev.travelRevision || (hadTravel ? DEFAULT_TRAVEL_REVISION : undefined),
        travelSimGuide: prev.travelSimGuide || (hadTravel ? DEFAULT_TRAVEL_SIM_GUIDE : undefined),
        travelEmergencyHospitals: prev.travelEmergencyHospitals || (hadTravel ? DEFAULT_TRAVEL_HOSPITALS : undefined),
        leaseContractAudit: {
          status: 'waiting_for_client_draft' as LeaseAuditStatus,
          contractDraftTitle: '',
          flawsAndRisks: [],
          revisionHistory: []
        }
      };
      try {
        localStorage.setItem('indochine_client_project', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === project.id || c.email.toLowerCase() === project.email.toLowerCase()) {
          return {
            ...c,
            tierId: targetTierId,
            serviceName: newServiceName,
            priceUSD: TIERS_CONFIG[targetTierId]?.price || c.priceUSD,
            category: c.category,
            paymentMethod: paymentMethod,
            status: 'questionnaire_completed' as ProjectStatus,
            isRelocationPlanPublished: false,
            overallFounderNote: newFounderNote,
            paidAt: nowIso,
            updatedAt: today,
            hasTravelPlan: true,
            upgradedFromTier: c.upgradedFromTier || c.tierId,
            travelDays: (c.travelDays && c.travelDays.length > 0)
              ? c.travelDays
              : ((targetTierId === 'tier3' || targetTierId === 'tier4')
                ? DEFAULT_RELOCATION_14_DAYS
                : DEFAULT_TRAVEL_DAYS),
            travelTransitLegs: c.travelTransitLegs || DEFAULT_TRAVEL_TRANSIT_LEGS,
            travelRevision: c.travelRevision || DEFAULT_TRAVEL_REVISION,
            travelSimGuide: c.travelSimGuide || DEFAULT_TRAVEL_SIM_GUIDE,
            travelEmergencyHospitals: c.travelEmergencyHospitals || DEFAULT_TRAVEL_HOSPITALS,
            leaseContractAudit: {
              status: 'waiting_for_client_draft' as LeaseAuditStatus,
              contractDraftTitle: '',
              flawsAndRisks: [],
              revisionHistory: []
            }
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Dispatch Telegram alert for upgrade
    if (scheduleConfig.telegramBotToken && scheduleConfig.telegramChatId) {
      sendPackageTelegramAlert({
        tierKey: targetTierId,
        tierName: newServiceName.ru,
        priceUSD: TIERS_CONFIG[targetTierId]?.price || 490,
        diffAmount: _diffAmount,
        paymentMethod: paymentMethod,
        clientName: project.clientName,
        clientEmail: project.email,
        clientMessenger: project.questionnaire?.messenger,
        clientCountry: project.questionnaire?.country,
        slaDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        isUpgrade: true,
        upgradedFromTier: project.tierId
      }).catch((e) => console.warn('Upgrade telegram send error:', e));
    }

    setIsUpgradeModalOpen(false);
  };

  const updateAdminProject = (updates: Partial<ClientProject>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    }));
  };

  const publishClientUpdates = (clientId: string) => {
    let publishedRecord: AdminClientRecord | undefined;
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          const publishedHousing = (c.verifiedHousing || []).map((h) => ({
            ...h,
            publishedToClient: true
          }));
          const rec: AdminClientRecord = {
            ...c,
            verifiedHousing: publishedHousing,
            status: 'plan_ready',
            isRelocationPlanPublished: true,
            category: 'active',
            hasUnpublishedChanges: false,
            lastPublishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString().split('T')[0]
          };
          publishedRecord = rec;
          return rec;
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (publishedRecord) {
      const rec = publishedRecord as AdminClientRecord;
      setProject((prev) => {
        if (
          prev.id === rec.id ||
          prev.email.toLowerCase() === rec.email.toLowerCase() ||
          currentClient?.email.toLowerCase() === rec.email.toLowerCase()
        ) {
          const updatedProj: ClientProject = {
            ...prev,
            id: rec.id,
            clientName: rec.clientName,
            email: rec.email,
            status: 'plan_ready',
            isRelocationPlanPublished: true,
            tierId: rec.tierId,
            serviceName: rec.serviceName,
            questionnaire: rec.questionnaire,
            recommendedCityId: normalizeCityId(rec.recommendedCityId || 'danang'),
            recommendedCityWhy: rec.recommendedCityWhy,
            recommendedNeighborhoodIds: rec.recommendedNeighborhoodIds || prev.recommendedNeighborhoodIds,
            customCityBudgets: rec.customCityBudgets,
            recommendedCityBudgetRange: rec.recommendedCityBudgetRange,
            overallFounderNote: rec.overallFounderNote,
            userCurrentBudget: rec.userCurrentBudget,
            verifiedHousing: (rec.verifiedHousing || []).filter((h) => h.publishedToClient),
            roadmapTasks: rec.roadmapTasks || prev.roadmapTasks,
            travelDays: rec.travelDays || prev.travelDays,
            travelTransitLegs: rec.travelTransitLegs || prev.travelTransitLegs,
            travelRevision: rec.travelRevision || prev.travelRevision,
            travelSimGuide: rec.travelSimGuide || prev.travelSimGuide,
            travelEmergencyHospitals: rec.travelEmergencyHospitals || prev.travelEmergencyHospitals,
            partnerRealtor: rec.partnerRealtor || prev.partnerRealtor,
            leaseContractAudit: rec.leaseContractAudit || prev.leaseContractAudit,
            vipConciergePerks: rec.vipConciergePerks || prev.vipConciergePerks,
            founderTelegramAccompaniment: rec.founderTelegramAccompaniment || prev.founderTelegramAccompaniment,
            hasUnpublishedChanges: false,
            lastPublishedAt: rec.lastPublishedAt,
            updatedAt: rec.updatedAt
          };
          try {
            localStorage.setItem('indochine_client_project', JSON.stringify(updatedProj));
          } catch (e) {}
          return updatedProj;
        }
        return prev;
      });
    }
  };

  const addVerifiedHousing = (clientId: string, housing: Omit<VerifiedHousingItem, 'id' | 'createdAt'>) => {
    const newItem: VerifiedHousingItem = {
      ...housing,
      id: 'house-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            verifiedHousing: [newItem, ...(c.verifiedHousing || [])],
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteVerifiedHousing = (clientId: string, housingId: string) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            verifiedHousing: (c.verifiedHousing || []).filter((h) => h.id !== housingId),
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const requestTravelRevision = (text: string) => {
    const nowStr = new Date().toISOString();
    const targetEmail = (project.email || currentClient?.email || '').toLowerCase();
    const revNote = {
      ru: 'Ваш запрос на корректировку маршрута принят и находится в работе у Founder.',
      en: 'Your route revision request has been received and is being processed by the founder.'
    };

    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.email.toLowerCase() === targetEmail) {
          const currentRev = c.travelRevision || DEFAULT_TRAVEL_REVISION;
          return {
            ...c,
            travelRevision: {
              ...currentRev,
              requested: true,
              requestText: text,
              requestedAt: nowStr,
              usedCount: (currentRev.usedCount || 0) + 1,
              maxCount: 1,
              status: 'pending' as const
            },
            overallFounderNote: revNote,
            hasUnpublishedChanges: true,
            updatedAt: nowStr.split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setProject((prev) => {
      const currentRev = prev.travelRevision || DEFAULT_TRAVEL_REVISION;
      return {
        ...prev,
        travelRevision: {
          ...currentRev,
          requested: true,
          requestText: text,
          requestedAt: nowStr,
          usedCount: (currentRev.usedCount || 0) + 1,
          maxCount: 1,
          status: 'pending' as const
        },
        overallFounderNote: revNote,
        updatedAt: nowStr.split('T')[0]
      };
    });
  };

  const applyTravelRevision = (clientId: string) => {
    const nowStr = new Date().toISOString();
    const appliedNote = {
      ru: 'Ваш персональный маршрут обновлен Founder с учетом запрошенных правок. Приятного путешествия!',
      en: 'Your travel itinerary has been updated by the founder based on your requested revisions.'
    };

    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          const currentRev = c.travelRevision || DEFAULT_TRAVEL_REVISION;
          return {
            ...c,
            travelRevision: {
              ...currentRev,
              requested: false,
              status: 'applied' as const
            },
            overallFounderNote: appliedNote,
            hasUnpublishedChanges: true,
            updatedAt: nowStr.split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateTravelDays = (clientId: string, days: TravelDayItem[]) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            travelDays: days,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateTravelTransitLegs = (clientId: string, legs: TravelTransitLeg[]) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            travelTransitLegs: legs,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updatePartnerRealtor = (clientId: string, realtor: PartnerRealtorAssignment) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            partnerRealtor: realtor,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateLeaseContractAudit = (clientId: string, audit: LeaseContractAudit) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            leaseContractAudit: audit,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateVipConciergePerks = (clientId: string, perks: VipConciergePerks) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            vipConciergePerks: perks,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateRelocationRoadmap = (clientId: string, tasks: RoadmapTask[]) => {
    setAdminClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            roadmapTasks: tasks,
            hasUnpublishedChanges: true,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      });
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        language,
        setLanguage,
        project,
        setProject,
        updateUserBudget,
        toggleTaskCompletion,
        submitQuestionnaire,
        submitExpressBooking,
        reserveExpressBookingSlot,
        confirmExpressBookingPayment,
        startBooking,
        updateAdminProject,
        t,
        isFounderLoggedIn,
        loginFounder,
        logoutFounder,
        isClientUnlocked,
        unlockClientWorkspace,
        isFounderModalOpen,
        setIsFounderModalOpen,
        currentClient,
        isClientLoginModalOpen,
        setIsClientLoginModalOpen,
        loginClient,
        logoutClient,
        selectedTier,
        setSelectedTier,
        tiersConfig: TIERS_CONFIG,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isOfferModalOpen,
        setIsOfferModalOpen,
        completePaymentAndUnlock,
        upgradeToRelocation,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        openUpgradeModal,
        upgradeClientTier,
        adminClients,
        setAdminClients,
        moveClientCategory,
        updateClientRecord,
        addVerifiedHousing,
        deleteVerifiedHousing,
        publishClientUpdates,
        requestTravelRevision,
        applyTravelRevision,
        updateTravelDays,
        updateTravelTransitLegs,
        updatePartnerRealtor,
        updateLeaseContractAudit,
        updateVipConciergePerks,
        updateRelocationRoadmap,
        consultationBookings,
        scheduleConfig,
        updateScheduleConfig,
        toggleWorkingDay,
        addDefaultSlot,
        removeDefaultSlot,
        toggleBlackoutDate,
        blockSlot,
        unblockSlot,
        cancelConsultationBooking,
        completeConsultationBooking,
        getDateSlotAvailability,
        sendTestTelegramNotification,
        sendTestPackageTelegramNotification,
        sendTestEmailNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
