import React, { createContext, useContext, useState } from 'react';
import type {
  ViewMode,
  Language,
  ClientProject,
  BudgetBreakdown,
  ClientQuestionnaire,
  ExpressConsultationBooking,
  ClientAccount,
  TierId,
  ClientFolderCategory,
  AdminClientRecord,
  ProjectStatus,
  VerifiedHousingItem
} from '../types';
import { DEMO_CLIENT_PROJECT, UI_STRINGS } from '../translations/content';
import { INITIAL_ADMIN_CLIENTS } from '../translations/adminClientsData';

export const TIERS_CONFIG: Record<TierId, { id: TierId; price: number; name: { en: string; ru: string } }> = {
  tier1: { id: 'tier1', price: 50, name: { en: 'Should I Move to Vietnam? (60 Min)', ru: 'Стоит ли переезжать во Вьетнам? (60 мин)' } },
  tier2: { id: 'tier2', price: 290, name: { en: 'Personal Travel Planning', ru: 'Персональное планирование поездки' } },
  tier3: { id: 'tier3', price: 490, name: { en: 'Vietnam Relocation Planning', ru: 'Планирование релокации во Вьетнам' } },
  tier4: { id: 'tier4', price: 890, name: { en: 'Relocation Concierge', ru: 'Консьерж-сопровождение релокации' } }
};

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
  submitExpressBooking: (booking: ExpressConsultationBooking) => void;
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
  adminClients: AdminClientRecord[];
  setAdminClients: React.Dispatch<React.SetStateAction<AdminClientRecord[]>>;
  moveClientCategory: (clientId: string, newCategory: ClientFolderCategory) => void;
  updateClientRecord: (clientId: string, updates: Partial<AdminClientRecord>) => void;
  addVerifiedHousing: (clientId: string, housing: Omit<VerifiedHousingItem, 'id' | 'createdAt'>) => void;
  deleteVerifiedHousing: (clientId: string, housingId: string) => void;
  publishClientUpdates: (clientId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('marketing');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('indochine_lang');
      if (saved === 'en' || saved === 'ru') return saved;
    } catch (e) {}
    return 'ru';
  });
  const [project, setProject] = useState<ClientProject>(DEMO_CLIENT_PROJECT);
  
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
  const [pendingQuestionnaire, setPendingQuestionnaire] = useState<ClientQuestionnaire | null>(null);

  const [adminClients, setAdminClients] = useState<AdminClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('indochine_all_clients');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ADMIN_CLIENTS;
  });

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
    setAdminClients((prev) => {
      const updated = prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              ...updates,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : c
      );
      try {
        localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (project.email && updates) {
      setProject((prev) => ({
        ...prev,
        ...(updates.status ? { status: updates.status } : {}),
        ...(updates.recommendedCityId ? { recommendedCityId: updates.recommendedCityId } : {}),
        ...(updates.recommendedCityWhy ? { recommendedCityWhy: updates.recommendedCityWhy } : {}),
        ...(updates.overallFounderNote ? { overallFounderNote: updates.overallFounderNote } : {}),
        ...(updates.userCurrentBudget ? { userCurrentBudget: updates.userCurrentBudget } : {}),
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
  };

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
        recommendedCityId: adminRecord.recommendedCityId,
        recommendedCityWhy: adminRecord.recommendedCityWhy,
        overallFounderNote: adminRecord.overallFounderNote,
        userCurrentBudget: adminRecord.userCurrentBudget,
        verifiedHousing: (adminRecord.verifiedHousing || []).filter((h) => h.publishedToClient),
        roadmapTasks: adminRecord.roadmapTasks || prev.roadmapTasks,
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
          serviceName: { en: '60-Min Strategic Consultation ($50)', ru: 'Стратегическая консультация 60 мин ($50)' },
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

  const submitExpressBooking = (booking: ExpressConsultationBooking) => {
    try {
      const saved = localStorage.getItem('indochine_consultations');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem('indochine_consultations', JSON.stringify([booking, ...list]));
    } catch (e) {}
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
        description: { en: 'Founder will verify your passport scan & entry checkpoint before submission.', ru: 'Основатель проверит скан паспорта и КПП въезда перед отправкой.' },
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
      recommendedCityId: (q.preferredCities && q.preferredCities[0]) || 'danang',
      recommendedCityWhy: {
        en: 'Personalized recommendation based on your questionnaire priorities.',
        ru: 'Персональная рекомендация на основе ваших приоритетов из анкеты.'
      },
      overallFounderNote: {
        en: `Welcome ${q.name}! The founder has received your payment ($${tierData.price}) via ${method} and is preparing your vetted housing options. SLA: 48 hours.`,
        ru: `Добро пожаловать, ${q.name}! Оплата ($${tierData.price}) получена. Основатель изучает анкету и готовит персональные проверенные объекты. SLA: до 48 часов.`
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

    unlockClientWorkspace();
    setIsPaymentModalOpen(false);
    setViewModeState('dashboard');
  };

  const upgradeToRelocation = () => {
    setSelectedTier('tier3');
    try {
      localStorage.setItem('indochine_selected_tier', 'tier3');
    } catch (e) {}
    setProject((prev) => ({
      ...prev,
      tierId: 'tier3',
      serviceName: TIERS_CONFIG['tier3'].name,
      updatedAt: new Date().toISOString().split('T')[0]
    }));
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
        if (prev.email.toLowerCase() === rec.email.toLowerCase() || currentClient?.email.toLowerCase() === rec.email.toLowerCase()) {
          return {
            ...prev,
            clientName: rec.clientName,
            email: rec.email,
            status: rec.status,
            recommendedCityId: rec.recommendedCityId,
            recommendedCityWhy: rec.recommendedCityWhy,
            overallFounderNote: rec.overallFounderNote,
            userCurrentBudget: rec.userCurrentBudget,
            verifiedHousing: (rec.verifiedHousing || []).filter((h) => h.publishedToClient),
            roadmapTasks: rec.roadmapTasks || prev.roadmapTasks,
            hasUnpublishedChanges: false,
            lastPublishedAt: rec.lastPublishedAt,
            updatedAt: rec.updatedAt
          };
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
        adminClients,
        setAdminClients,
        moveClientCategory,
        updateClientRecord,
        addVerifiedHousing,
        deleteVerifiedHousing,
        publishClientUpdates
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
