import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type {
  AdminClientRecord,
  RoadmapTask,
  PartnerRealtorAssignment,
  LeaseContractAudit,
  VipConciergePerks,
  RealtorWorkStatus,
  LeaseAuditStatus,
  VipPsychologistStatus,
  LeaseAuditRevisionItem
} from '../types';
import {
  DEFAULT_RELOCATION_ROADMAP_TASKS,
  DEFAULT_PARTNER_REALTOR_DANANG,
  DEFAULT_PARTNER_REALTOR_NHATRANG,
  DEFAULT_LEASE_AUDIT,
  DEFAULT_VIP_PERKS
} from '../translations/defaultRelocationData';
import { CITIES_DATA, NEIGHBORHOODS_DATA, normalizeCityId } from '../translations/content';
import { DEFAULT_RELOCATION_14_DAYS } from '../translations/defaultRelocationTravelData';
import { AdminTravelItineraryBuilder } from './AdminTravelItineraryBuilder';
import { ClientDashboardPreviewModal } from './ClientDashboardPreviewModal';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Users,
  ShieldCheck,
  Crown,
  Plus,
  Trash2,
  Save,
  Copy,
  Check,
  Sparkles,
  Phone,
  MessageCircle,
  HeartHandshake,
  MapPin,
  Route,
  Eye,
  ExternalLink
} from 'lucide-react';

interface AdminRelocationManagerProps {
  selectedClient: AdminClientRecord;
  onPublishSuccess?: () => void;
}

export const CITY_WHY_TEMPLATES: Record<string, { ru: string; en: string; labelRu: string; labelEn: string }> = {
  danang: {
    labelRu: 'Дананг IT',
    labelEn: 'Da Nang IT',
    ru: 'Дананг — идеальный выбор: чистые пляжи для серфинга и утренних пробежек, развитая кофейная культура, быстрый оптоволоконный интернет без сбоев (100–300 Мбит/с) и активное международное сообщество удаленщиков.',
    en: 'Da Nang is ideal: surf beaches, vibrant coffee scene, 100-300 Mbps fiber internet, and active nomad community.'
  },
  nhatrang: {
    labelRu: 'Нячанг Пляж',
    labelEn: 'Nha Trang Beach',
    ru: 'Нячанг идеально подходит под ваш профиль: круглогодичное теплое море, комфортные жилые комплексы на первой линии с панорамным видом, развитая русскоязычная медицина и сервис, а также очень доступные цены на долгосрочную аренду.',
    en: 'Nha Trang is ideal: warm sea year-round, modern beachfront condos, and expat-friendly infrastructure.'
  },
  hoian: {
    labelRu: 'Хойан Релакс',
    labelEn: 'Hoi An Relax',
    ru: 'Хойан предлагает спокойный, размеренный темп жизни в окружении рисовых полей и пляжа Ан Банг, экологичную атмосферу и уютные европейские кафе для сосредоточенной творческой работы.',
    en: 'Hoi An offers tranquil living amidst rice fields and An Bang beach, with cozy cafes for creative remote work.'
  },
  saigon: {
    labelRu: 'Хошимин Бизнес',
    labelEn: 'HCMC Business',
    ru: 'Хошимин (Сайгон) — центр деловой и экономической жизни Вьетнама: лучшие международные коворкинги, высококлассная медицина, динамичная гастрономия и максимум возможностей для бизнеса и нетворкинга.',
    en: 'Ho Chi Minh City is Vietnam\'s dynamic business hub: top international coworking spaces, premier healthcare, and boundless networking opportunities.'
  },
  hanoi: {
    labelRu: 'Ханой Столица',
    labelEn: 'Hanoi Capital',
    ru: 'Ханой — культурная столица Вьетнама с уникальной атмосферой вокруг Западного озера (Тай Хо), зелеными бульварами, богатой историей и сложившимся экспатским сообществом.',
    en: 'Hanoi is the historic capital: charming atmosphere around West Lake (Tay Ho), rich culture, and established expat community.'
  }
};

export const AdminRelocationManager: React.FC<AdminRelocationManagerProps> = ({
  selectedClient,
  onPublishSuccess
}) => {
  const {
    updatePartnerRealtor,
    updateLeaseContractAudit,
    updateVipConciergePerks,
    updateRelocationRoadmap,
    updateClientRecord,
    publishClientUpdates,
    language
  } = useApp();

  const isVip = selectedClient.tierId === 'tier4';

  type AdminReloTab = 'city' | 'roadmap' | 'travel_itinerary' | 'realtor' | 'lease_audit' | 'vip_concierge';
  const [activeTab, setActiveTab] = useState<AdminReloTab>('city');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Form states for City Selection
  const normInitCity = normalizeCityId(selectedClient.recommendedCityId || 'danang');
  const [selectedCityId, setSelectedCityId] = useState<string>(normInitCity);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    (selectedClient as any).recommendedNeighborhoodIds && (selectedClient as any).recommendedNeighborhoodIds.length > 0
      ? (selectedClient as any).recommendedNeighborhoodIds
      : normInitCity === 'nhatrang'
      ? ['nhatrang_north', 'nhatrang_an_vien']
      : normInitCity === 'hoian'
      ? ['hoian_cam_an', 'hoian_cam_chau']
      : normInitCity === 'saigon'
      ? ['thao_dien', 'hcm_binh_thanh']
      : normInitCity === 'hanoi'
      ? ['tay_ho', 'hanoi_cau_giay']
      : ['an_thuong', 'hai_chau']
  );
  const [cityBudgets, setCityBudgets] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    CITIES_DATA.forEach(c => {
      initial[c.id] = (selectedClient as any).customCityBudgets?.[c.id] || c.budgetRange[language] || c.budgetRange.ru;
    });
    return initial;
  });
  const [cityWhyRu, setCityWhyRu] = useState<string>(() => {
    const clientWhyRu = selectedClient.recommendedCityWhy?.ru;
    const isGenericWhy = !clientWhyRu || clientWhyRu.includes('Персональная рекомендация на основе ваших приоритетов') || clientWhyRu.includes('Индивидуальный маршрут путешествия');
    if (!isGenericWhy) return clientWhyRu;
    return (CITY_WHY_TEMPLATES[normInitCity] || CITY_WHY_TEMPLATES.danang).ru;
  });
  const [cityWhyEn, setCityWhyEn] = useState<string>(() => {
    const clientWhyEn = selectedClient.recommendedCityWhy?.en;
    const isGenericWhy = !clientWhyEn || clientWhyEn.includes('Personalized recommendation based on your questionnaire priorities') || clientWhyEn.includes('Tailored 1–30 days travel route');
    if (!isGenericWhy) return clientWhyEn;
    return (CITY_WHY_TEMPLATES[normInitCity] || CITY_WHY_TEMPLATES.danang).en;
  });
  const [autoAssignRealtor, setAutoAssignRealtor] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Active roadmap tasks
  const roadmapTasks: RoadmapTask[] = (selectedClient.roadmapTasks && selectedClient.roadmapTasks.length > 0)
    ? selectedClient.roadmapTasks
    : DEFAULT_RELOCATION_ROADMAP_TASKS;

  // Active partner realtor
  const realtor: PartnerRealtorAssignment = selectedClient.partnerRealtor || (
    normInitCity === 'nhatrang'
      ? DEFAULT_PARTNER_REALTOR_NHATRANG
      : DEFAULT_PARTNER_REALTOR_DANANG
  );

  // Active lease audit
  const leaseAudit: LeaseContractAudit = selectedClient.leaseContractAudit || DEFAULT_LEASE_AUDIT;

  // Active VIP perks
  const vipPerks: VipConciergePerks = selectedClient.vipConciergePerks || DEFAULT_VIP_PERKS;

  // Form states for adding roadmap task
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskPhase, setNewTaskPhase] = useState<'before_arrival' | 'week_of_arrival' | 'first_month'>('before_arrival');
  const [newTaskTitleRu, setNewTaskTitleRu] = useState('');
  const [newTaskDescRu, setNewTaskDescRu] = useState('');
  const [newTaskCommentRu, setNewTaskCommentRu] = useState('');
  const [newTaskLinkUrl, setNewTaskLinkUrl] = useState('');
  const [newTaskLinkLabelRu, setNewTaskLinkLabelRu] = useState('');

  // Form states for editing realtor
  const [editRealtorName, setEditRealtorName] = useState(realtor.realtorName);
  const [editRealtorAgency, setEditRealtorAgency] = useState(realtor.agencyOrTitle);
  const [editRealtorTg, setEditRealtorTg] = useState(realtor.telegramUsername);
  const [editRealtorWa, setEditRealtorWa] = useState(realtor.whatsappNumber);
  const [editRealtorInstagram, setEditRealtorInstagram] = useState(realtor.instagramUrl || '');
  const [editRealtorPhone, setEditRealtorPhone] = useState(realtor.phoneOrZalo);
  const [editRealtorSpec, setEditRealtorSpec] = useState(realtor.specialization);
  const [editRealtorStatus, setEditRealtorStatus] = useState<RealtorWorkStatus>(realtor.status);
  const [editRealtorNoteRu, setEditRealtorNoteRu] = useState(realtor.founderNoteToClient.ru);

  // Form states for editing lease audit
  const defaultAuditChecks = {
    depositRefundSafety: { status: 'pass' as const, comment: 'Депозит защищен условиями возврата.' },
    evnElectricityTariff: { status: 'pass' as const, tariffVND: 4200, comment: 'Прямой тариф EVN зафиксирован в договоре.' },
    waterAndInternetSpeed: { status: 'pass' as const, comment: 'Оптоволоконный интернет включен.' },
    policeRegistrationTamTru: { status: 'pass' as const, comment: 'Собственник подает регистрацию tạm trú онлайн.' },
    earlyTerminationClause: { status: 'warning' as const, comment: 'Требуется фиксация уведомления за 30 дней.' }
  };
  const auditChecks = leaseAudit.checks || defaultAuditChecks;
  const auditVerdict = leaseAudit.overallVerdict || { en: 'Audit completed.', ru: 'Аудит завершен.' };

  const [editAuditStatus, setEditAuditStatus] = useState<LeaseAuditStatus>(leaseAudit.status);
  const [editContractTitle, setEditContractTitle] = useState(leaseAudit.contractDraftTitle || '');
  const [editEvnTariff, setEditEvnTariff] = useState(auditChecks.evnElectricityTariff?.tariffVND || 4200);
  const [editDepositComment, setEditDepositComment] = useState(auditChecks.depositRefundSafety?.comment || '');
  const [editEvnComment, setEditEvnComment] = useState(auditChecks.evnElectricityTariff?.comment || '');
  const [editTamTruComment, setEditTamTruComment] = useState(auditChecks.policeRegistrationTamTru?.comment || '');
  const [editEarlyTermComment, setEditEarlyTermComment] = useState(auditChecks.earlyTerminationClause?.comment || '');
  const [editOverallVerdictRu, setEditOverallVerdictRu] = useState(auditVerdict.ru || '');

  // Form states for editing VIP perks
  const [editPsyStatus, setEditPsyStatus] = useState(vipPerks.psychologistSession.status || 'included_not_booked');
  const [editPsyDate, setEditPsyDate] = useState(vipPerks.psychologistSession.sessionDate || '');
  const [editPsyPromo, setEditPsyPromo] = useState(vipPerks.psychologistSession.secondSessionPromoCode || 'VIETRELOC-VIP20');
  const [editTgAccStatus, setEditTgAccStatus] = useState(vipPerks.founderTelegramAccompaniment?.status || 'active');
  const [editTgAccTotal, setEditTgAccTotal] = useState(vipPerks.founderTelegramAccompaniment?.daysTotal || 30);
  const [editTgAccRemaining, setEditTgAccRemaining] = useState(vipPerks.founderTelegramAccompaniment?.daysRemaining || 28);
  const [editTgAccUsername, setEditTgAccUsername] = useState(vipPerks.founderTelegramAccompaniment?.telegramUsername || 'Likqwerty');

  // Sync edit states when selectedClient changes
  React.useEffect(() => {
    setEditRealtorName(realtor.realtorName);
    setEditRealtorAgency(realtor.agencyOrTitle);
    setEditRealtorTg(realtor.telegramUsername);
    setEditRealtorWa(realtor.whatsappNumber);
    setEditRealtorInstagram(realtor.instagramUrl || '');
    setEditRealtorPhone(realtor.phoneOrZalo);
    setEditRealtorSpec(realtor.specialization);
    setEditRealtorStatus(realtor.status);
    setEditRealtorNoteRu(realtor.founderNoteToClient.ru);

    const safeChecks = leaseAudit.checks || defaultAuditChecks;
    const safeVerdict = leaseAudit.overallVerdict || { en: 'Audit completed.', ru: 'Аудит завершен.' };

    setEditAuditStatus(leaseAudit.status);
    setEditContractTitle(leaseAudit.contractDraftTitle || '');
    setEditEvnTariff(safeChecks.evnElectricityTariff?.tariffVND || 4200);
    setEditDepositComment(safeChecks.depositRefundSafety?.comment || '');
    setEditEvnComment(safeChecks.evnElectricityTariff?.comment || '');
    setEditTamTruComment(safeChecks.policeRegistrationTamTru?.comment || '');
    setEditEarlyTermComment(safeChecks.earlyTerminationClause?.comment || '');
    setEditOverallVerdictRu(safeVerdict.ru || '');

    setEditPsyStatus(vipPerks.psychologistSession.status || 'included_not_booked');
    setEditPsyDate(vipPerks.psychologistSession.sessionDate || '');
    setEditPsyPromo(vipPerks.psychologistSession.secondSessionPromoCode || 'VIETRELOC-VIP20');
    const tgAcc = vipPerks.founderTelegramAccompaniment || {
      status: 'active',
      daysTotal: 30,
      daysRemaining: 28,
      telegramUsername: 'Likqwerty'
    };
    setEditTgAccStatus(tgAcc.status);
    setEditTgAccTotal(tgAcc.daysTotal);
    setEditTgAccRemaining(tgAcc.daysRemaining);
    setEditTgAccUsername(tgAcc.telegramUsername || 'Likqwerty');

    const normClientCity = normalizeCityId(selectedClient.recommendedCityId || 'danang');
    setSelectedCityId(normClientCity);
    if ((selectedClient as any).recommendedNeighborhoodIds && (selectedClient as any).recommendedNeighborhoodIds.length > 0) {
      setSelectedNeighborhoods((selectedClient as any).recommendedNeighborhoodIds);
    } else {
      setSelectedNeighborhoods(
        normClientCity === 'nhatrang'
          ? ['nhatrang_north', 'nhatrang_an_vien']
          : normClientCity === 'hoian'
          ? ['hoian_cam_an', 'hoian_cam_chau']
          : normClientCity === 'saigon'
          ? ['thao_dien', 'hcm_binh_thanh']
          : normClientCity === 'hanoi'
          ? ['tay_ho', 'hanoi_cau_giay']
          : ['an_thuong', 'hai_chau']
      );
    }
    const nextBudgets: Record<string, string> = {};
    CITIES_DATA.forEach(c => {
      nextBudgets[c.id] = (selectedClient as any).customCityBudgets?.[c.id] || c.budgetRange[language] || c.budgetRange.ru;
    });
    setCityBudgets(nextBudgets);

    const defaultWhy = CITY_WHY_TEMPLATES[normClientCity] || CITY_WHY_TEMPLATES.danang;
    const clientWhyRu = selectedClient.recommendedCityWhy?.ru;
    const isGenericWhyRu = !clientWhyRu || clientWhyRu.includes('Персональная рекомендация на основе ваших приоритетов') || clientWhyRu.includes('Индивидуальный маршрут путешествия');
    setCityWhyRu(isGenericWhyRu ? defaultWhy.ru : clientWhyRu);

    const clientWhyEn = selectedClient.recommendedCityWhy?.en;
    const isGenericWhyEn = !clientWhyEn || clientWhyEn.includes('Personalized recommendation based on your questionnaire priorities') || clientWhyEn.includes('Tailored 1–30 days travel route');
    setCityWhyEn(isGenericWhyEn ? defaultWhy.en : clientWhyEn);
  }, [selectedClient.id]);


  // Handlers for City Selection
  const handleSelectCityCard = (rawCityId: string) => {
    const cityId = normalizeCityId(rawCityId);
    setSelectedCityId(cityId);
    const tpl = CITY_WHY_TEMPLATES[cityId];
    if (tpl) {
      setCityWhyRu(tpl.ru);
      setCityWhyEn(tpl.en);
    }
    if (cityId === 'nhatrang') {
      setSelectedNeighborhoods(['nhatrang_north', 'nhatrang_an_vien']);
    } else if (cityId === 'danang') {
      setSelectedNeighborhoods(['an_thuong', 'hai_chau']);
    } else if (cityId === 'hoian') {
      setSelectedNeighborhoods(['hoian_cam_an', 'hoian_cam_chau']);
    } else if (cityId === 'saigon') {
      setSelectedNeighborhoods(['thao_dien', 'hcm_binh_thanh']);
    } else if (cityId === 'hanoi') {
      setSelectedNeighborhoods(['tay_ho', 'hanoi_cau_giay']);
    }
  };

  const handleSaveCity = (e: React.FormEvent) => {
    e.preventDefault();
    const normCity = normalizeCityId(selectedCityId);
    const updates: Partial<AdminClientRecord> = {
      recommendedCityId: normCity,
      recommendedCityWhy: {
        ru: cityWhyRu.trim(),
        en: cityWhyEn.trim() || cityWhyRu.trim()
      },
      recommendedNeighborhoodIds: selectedNeighborhoods,
      customCityBudgets: cityBudgets,
      recommendedCityBudgetRange: cityBudgets[normCity] || CITIES_DATA.find(c => c.id === normCity)?.budgetRange[language],
      hasUnpublishedChanges: true,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (autoAssignRealtor) {
      if (normCity === 'nhatrang') {
        updates.partnerRealtor = DEFAULT_PARTNER_REALTOR_NHATRANG;
      } else if (normCity === 'danang' || normCity === 'hoian') {
        updates.partnerRealtor = DEFAULT_PARTNER_REALTOR_DANANG;
      }
    }

    updateClientRecord(selectedClient.id, updates);
    setSavedNotice(language === 'ru' ? 'Рекомендованный город, районы и бюджеты успешно сохранены!' : 'City, districts & budgets saved!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  // Handlers
  const handleSaveRealtor = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRealtor: PartnerRealtorAssignment = {
      ...realtor,
      realtorName: editRealtorName.trim(),
      agencyOrTitle: editRealtorAgency.trim(),
      telegramUsername: editRealtorTg.replace('@', '').trim(),
      whatsappNumber: editRealtorWa.trim(),
      instagramUrl: editRealtorInstagram.trim(),
      phoneOrZalo: editRealtorPhone.trim(),
      specialization: editRealtorSpec.trim(),
      status: editRealtorStatus,
      founderNoteToClient: {
        en: realtor.founderNoteToClient.en,
        ru: editRealtorNoteRu.trim()
      },
      directChatUrl: editRealtorInstagram.trim() || (editRealtorTg ? `https://t.me/${editRealtorTg.replace('@', '').trim()}` : realtor.directChatUrl)
    };
    updatePartnerRealtor(selectedClient.id, updatedRealtor);
    setSavedNotice(language === 'ru' ? 'Карточка риелтора сохранена в черновик!' : 'Realtor details saved!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleSaveLeaseAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentChecks = leaseAudit.checks || defaultAuditChecks;
    const currentVerdict = leaseAudit.overallVerdict || { en: 'Audit completed.', ru: 'Аудит завершен.' };
    const dateStr = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

    const newHistoryEntry: LeaseAuditRevisionItem = {
      id: `lease-rev-${Date.now()}`,
      date: dateStr,
      status: editAuditStatus,
      notes: editOverallVerdictRu.trim(),
      flawsAndRisks: [editDepositComment, editEvnComment, editTamTruComment, editEarlyTermComment].filter(Boolean)
    };

    const updatedAudit: LeaseContractAudit = {
      ...leaseAudit,
      status: editAuditStatus,
      contractDraftTitle: editContractTitle.trim(),
      checks: {
        depositRefundSafety: { ...currentChecks.depositRefundSafety, comment: editDepositComment.trim() },
        evnElectricityTariff: { ...currentChecks.evnElectricityTariff, tariffVND: Number(editEvnTariff), comment: editEvnComment.trim() },
        waterAndInternetSpeed: currentChecks.waterAndInternetSpeed,
        policeRegistrationTamTru: { ...currentChecks.policeRegistrationTamTru, comment: editTamTruComment.trim() },
        earlyTerminationClause: { ...currentChecks.earlyTerminationClause, comment: editEarlyTermComment.trim() }
      },
      overallVerdict: {
        en: currentVerdict.en,
        ru: editOverallVerdictRu.trim()
      },
      flawsAndRisks: [editDepositComment, editEvnComment, editTamTruComment, editEarlyTermComment].filter(Boolean),
      revisionHistory: [...(leaseAudit.revisionHistory || []), newHistoryEntry]
    };
    updateLeaseContractAudit(selectedClient.id, updatedAudit);
    setSavedNotice(language === 'ru' ? 'Аудит договора сохранен и добавлен в историю!' : 'Lease audit saved!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleSaveVipPerks = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPerks: VipConciergePerks = {
      ...vipPerks,
      psychologistSession: {
        ...vipPerks.psychologistSession,
        status: editPsyStatus,
        sessionDate: editPsyDate.trim(),
        secondSessionPromoCode: editPsyPromo.trim()
      },
      founderTelegramAccompaniment: {
        status: editTgAccStatus,
        daysTotal: Number(editTgAccTotal) || 30,
        daysRemaining: Number(editTgAccRemaining) || 28,
        telegramUsername: editTgAccUsername.trim() || 'Likqwerty'
      },
      priorityDirectLine: {
        status: 'active',
        channel: 'telegram',
        contact: `@${(editTgAccUsername.trim() || 'Likqwerty').replace(/^@/, '')}`
      }
    };
    updateVipConciergePerks(selectedClient.id, updatedPerks);
    setSavedNotice(language === 'ru' ? 'Параметры VIP-сопровождения сохранены!' : 'VIP perks saved!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitleRu.trim()) return;

    const newTask: RoadmapTask = {
      id: 'task-' + Date.now(),
      phase: newTaskPhase,
      title: {
        ru: newTaskTitleRu.trim(),
        en: newTaskTitleRu.trim()
      },
      description: {
        ru: newTaskDescRu.trim(),
        en: newTaskDescRu.trim()
      },
      founderComment: newTaskCommentRu.trim() ? {
        ru: newTaskCommentRu.trim(),
        en: newTaskCommentRu.trim()
      } : undefined,
      linkUrl: newTaskLinkUrl.trim() || undefined,
      linkLabel: newTaskLinkLabelRu.trim() ? {
        ru: newTaskLinkLabelRu.trim(),
        en: newTaskLinkLabelRu.trim()
      } : undefined,
      completed: false
    };

    updateRelocationRoadmap(selectedClient.id, [...roadmapTasks, newTask]);
    setIsAddTaskModalOpen(false);
    setNewTaskTitleRu('');
    setNewTaskDescRu('');
    setNewTaskCommentRu('');
    setNewTaskLinkUrl('');
    setNewTaskLinkLabelRu('');
    setSavedNotice(language === 'ru' ? 'Новый шаг добавлен в маршрут!' : 'Milestone added to roadmap!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = roadmapTasks.filter(t => t.id !== taskId);
    updateRelocationRoadmap(selectedClient.id, updated);
  };

  const handleToggleTask = (taskId: string) => {
    const updated = roadmapTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    updateRelocationRoadmap(selectedClient.id, updated);
  };

  const handleCopyRealtorBrief = () => {
    const cityName = CITIES_DATA.find(c => c.id === normalizeCityId(selectedClient.recommendedCityId))?.name[language] || selectedClient.recommendedCityId;
    const brief = `Здравствуйте! Бриф на подбор жилья от VietReloc:
Клиент: ${selectedClient.clientName}
Тариф: ${selectedClient.serviceName[language]}
Город: ${cityName}
Бюджет на жилье: $${selectedClient.userCurrentBudget.accommodation}/мес
Даты заезда: ${selectedClient.questionnaire.travelDates || 'в течение 2-3 недель'}
Срок аренды: ${selectedClient.questionnaire.duration || '6-12 месяцев'}
Пожелания: ${selectedClient.questionnaire.accommodationType || '1BR/2BR у моря, балкон, тихий двор'}
Особые требования: прямой тариф EVN, без шумных строек за окном, договор с регистрацией tạm trú.
Клиент напишет вам в Telegram с кодовым словом «VietReloc».`;

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Relocation Quality Gate Banner */}
      <div style={{
        background: selectedClient.hasUnpublishedChanges ? '#FFFBEB' : '#F0FDF4',
        border: selectedClient.hasUnpublishedChanges ? '1px solid #FCD34D' : '1px solid #BBF7D0',
        padding: '1.15rem 1.4rem',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            {selectedClient.hasUnpublishedChanges ? (
              <span className="badge badge-terracotta" style={{ fontSize: '0.75rem' }}>
                <AlertTriangle size={13} /> {language === 'ru' ? 'Черновик (клиент не видит последних правок)' : 'Draft (Unpublished)'}
              </span>
            ) : (
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                <CheckCircle2 size={13} /> {language === 'ru' ? 'Опубликовано в кабинете клиента' : 'Live in Client Workspace'}
              </span>
            )}
            {selectedClient.lastPublishedAt && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                &bull; {new Date(selectedClient.lastPublishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            {isVip && (
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' }}>
                <Crown size={12} /> VIP $890
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <strong>{language === 'ru' ? 'Клиент:' : 'Client:'}</strong> {selectedClient.clientName} &bull; {selectedClient.email}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {savedNotice && (
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              {savedNotice}
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="glass-button"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Eye size={16} color="var(--accent-terracotta)" />
            <span>{language === 'ru' ? 'Предпросмотр ЛК' : 'Client Portal Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              publishClientUpdates(selectedClient.id);
              if (onPublishSuccess) onPublishSuccess();
            }}
            className="glass-button active"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-emerald)'
            }}
          >
            <Send size={15} />
            <span>{language === 'ru' ? 'Опубликовать клиенту' : 'Publish to Client'}</span>
          </button>
        </div>
      </div>

      {/* Relocation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          {
            id: 'city',
            label: language === 'ru' ? 'Выбор города и районов' : 'City & Districts',
            icon: MapPin,
            badge: CITIES_DATA.find(c => c.id === normalizeCityId(selectedClient.recommendedCityId))?.name[language] || (language === 'ru' ? 'Выбрать' : 'Select')
          },
          {
            id: 'roadmap',
            label: language === 'ru' ? `Дорожная карта (${roadmapTasks.length} шагов)` : `Roadmap (${roadmapTasks.length} steps)`,
            icon: Compass
          },
          {
            id: 'travel_itinerary',
            label: language === 'ru'
              ? `Маршрут путешествия (${selectedClient.travelDays?.length || 14} дней)`
              : `Travel Itinerary (${selectedClient.travelDays?.length || 14} Days)`,
            icon: Route,
            badge: language === 'ru' ? '14 дней' : '14 Days'
          },
          {
            id: 'realtor',
            label: language === 'ru' ? `Партнер-риелтор (${realtor.realtorName})` : `Realtor (${realtor.realtorName})`,
            icon: Users
          },
          {
            id: 'lease_audit',
            label: language === 'ru' ? 'Аудит договора аренды' : 'Lease Due Diligence',
            icon: ShieldCheck
          },
          ...(isVip ? [{
            id: 'vip_concierge',
            label: language === 'ru' ? 'VIP-Консьерж & Психолог' : 'VIP Concierge & Psy',
            icon: Crown,
            highlight: true
          }] : [])
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`glass-button ${isActive ? 'active' : ''}`}
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: isActive ? '#FFFFFF' : 'var(--text-main)'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {(tab as any).badge && !isActive && (
                <span style={{
                  background: (tab as any).highlight ? '#FEF3C7' : 'rgba(15, 118, 110, 0.1)',
                  color: (tab as any).highlight ? '#92400E' : '#0F766E',
                  fontSize: '0.68rem',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  fontWeight: 700
                }}>
                  {(tab as any).badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: RECOMMENDED CITY & NEIGHBORHOODS (ВЫБОР ГОРОДА И РАЙОНОВ) */}
      {/* ========================================================================= */}
      {activeTab === 'city' && (
        <form onSubmit={handleSaveCity} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} color="var(--accent-terracotta)" />
                <span>{language === 'ru' ? 'Выбор рекомендуемого города и районов' : 'Curate Recommended City & Districts'}</span>
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '720px' }}>
                {language === 'ru'
                  ? 'Вы вручную выбираете город для клиента на основе его анкеты. Выбранный город автоматически передаётся в клиентский кабинет, определяет погодный виджет, подбор подходящих районов и проверенного риелтора.'
                  : 'Manually select the best city based on the client questionnaire. Dictates live weather, neighborhoods, and partner realtor.'}
              </p>
            </div>

            <button
              type="submit"
              className="glass-button active"
              style={{
                padding: '0.6rem 1.3rem',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--accent-emerald)'
              }}
            >
              <Save size={15} />
              <span>{language === 'ru' ? 'Сохранить город и районы' : 'Save City & Districts'}</span>
            </button>
          </div>

          {/* Client Questionnaire Signals Sheet */}
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-main)' }}>
                  {language === 'ru' ? '📋 ДАННЫЕ ИЗ АНКЕТЫ КЛИЕНТА ДЛЯ ВЫБОРА ГОРОДА И ЖИЛЬЯ:' : '📋 CLIENT QUESTIONNAIRE SIGNALS:'}
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(15, 118, 110, 0.1)', color: 'var(--accent-emerald)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                  {selectedClient.clientName}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.85rem' }}>
              {/* 1. Локация & Состав */}
              <div style={{ background: '#FFFFFF', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Страна, состав и даты:' : 'Origin, party & dates:'}
                </div>
                <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                  {selectedClient.questionnaire.country || 'РФ / СНГ'} • {selectedClient.questionnaire.travelersCount || 1} чел.
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {selectedClient.questionnaire.travelDates || 'Даты уточняются'} {selectedClient.questionnaire.duration ? `(${selectedClient.questionnaire.duration})` : ''}
                </div>
              </div>

              {/* 2. Бюджет */}
              <div style={{ background: '#FFFFFF', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Бюджет в месяц:' : 'Monthly budget:'}
                </div>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '1.05rem' }}>
                  ${selectedClient.questionnaire.monthlyBudgetUSD || (selectedClient.userCurrentBudget ? Object.values(selectedClient.userCurrentBudget).reduce((a, b) => a + b, 0) : 1500)} / мес
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {language === 'ru' ? 'Заявленный бюджет на жизнь и жилье' : 'Total monthly living budget'}
                </div>
              </div>

              {/* 3. Города в анкете */}
              <div style={{ background: '#FFFFFF', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Города в анкете:' : 'Preferred cities:'}
                </div>
                <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                  {selectedClient.questionnaire.preferredCities && selectedClient.questionnaire.preferredCities.length > 0
                    ? selectedClient.questionnaire.preferredCities.map(c => {
                        const cityObj = CITIES_DATA.find(cd => cd.id === c);
                        return cityObj ? cityObj.name[language] : (c === 'danang' ? 'Дананг' : c === 'nhatrang' ? 'Нячанг' : c === 'hoian' ? 'Хойан' : c === 'saigon' ? 'Хошимин' : c === 'hanoi' ? 'Ханой' : c);
                      }).join(', ')
                    : (language === 'ru' ? 'На усмотрение Founder' : 'Founder discretion')}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {selectedClient.questionnaire.environmentPreference === 'beach' ? 'Побережье и пляж' :
                   selectedClient.questionnaire.environmentPreference === 'city' ? 'Большой мегаполис' :
                   selectedClient.questionnaire.environmentPreference === 'quiet' ? 'Тишина и природа' :
                   selectedClient.questionnaire.environmentPreference === 'social' ? 'Активное сообщество' :
                   'Сбалансированная среда'}
                </div>
              </div>

              {/* 4. Работа & Формат */}
              <div style={{ background: '#FFFFFF', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Профессия и удаленка:' : 'Work & Profession:'}
                </div>
                <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                  {selectedClient.questionnaire.workSituation || (language === 'ru' ? 'Удаленная работа' : 'Remote')}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {selectedClient.questionnaire.remoteWorkNeeds || 'Wi-Fi 100+ Мбит/с'}
                </div>
              </div>
            </div>

            {/* Вторая строка: Пожелания к жилью, Приоритеты и Опасения */}
            <div style={{ marginTop: '0.85rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', fontSize: '0.83rem' }}>
              {/* Пожелания к жилью */}
              <div style={{ background: '#FEF3C7', padding: '0.75rem 0.95rem', borderRadius: '8px', border: '1px solid #FCD34D' }}>
                <div style={{ color: '#92400E', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3px' }}>
                  🏠 {language === 'ru' ? 'Пожелания к жилью (из анкеты):' : 'Housing preferences:'}
                </div>
                <div style={{ color: '#78350F', fontWeight: 600, lineHeight: 1.45 }}>
                  {selectedClient.questionnaire.accommodationType || (language === 'ru' ? 'Современное жилье с быстрым интернетом' : 'Modern accommodation')}
                </div>
              </div>

              {/* Приоритеты */}
              <div style={{ background: '#EFF6FF', padding: '0.75rem 0.95rem', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                <div style={{ color: '#1E40AF', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3px' }}>
                  🎯 {language === 'ru' ? 'Главные приоритеты:' : 'Main priorities:'}
                </div>
                <div style={{ color: '#1E3A8A', fontWeight: 600, lineHeight: 1.45 }}>
                  {selectedClient.questionnaire.priorities || (language === 'ru' ? 'Безопасность, море, стабильный интернет' : 'Safety, sea, stable internet')}
                </div>
              </div>

              {/* Опасения и стоп-факторы */}
              <div style={{ background: '#FFF1F2', padding: '0.75rem 0.95rem', borderRadius: '8px', border: '1px solid #FECDD3' }}>
                <div style={{ color: '#9F1239', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3px' }}>
                  ⚠️ {language === 'ru' ? 'Опасения и стоп-факторы:' : 'Concerns & red flags:'}
                </div>
                <div style={{ color: '#881337', fontWeight: 600, lineHeight: 1.45 }}>
                  {selectedClient.questionnaire.concerns || (language === 'ru' ? 'Шум строек, перебои с интернетом, невозврат депозита' : 'Noise, internet dropouts')}
                </div>
              </div>
            </div>
          </div>

          {/* Visual City Selector Grid */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              {language === 'ru' ? 'Выберите рекомендованный город для этого клиента:' : 'Select Recommended City for this Client:'}
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {CITIES_DATA.map((city) => {
                const isSelected = normalizeCityId(selectedCityId) === city.id;
                return (
                  <div
                    key={city.id}
                    onClick={() => handleSelectCityCard(city.id)}
                    className="glass-card"
                    style={{
                      padding: '1.25rem',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'linear-gradient(180deg, #FFFFFF 0%, rgba(240, 253, 244, 0.7) 100%)' : '#FFFFFF',
                      boxShadow: isSelected ? '0 6px 20px rgba(15, 118, 110, 0.15)' : 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'var(--accent-emerald)',
                        color: '#FFFFFF',
                        borderRadius: '9999px',
                        padding: '2px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <Check size={12} /> {language === 'ru' ? 'Выбран' : 'Selected'}
                      </div>
                    )}

                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                        {city.name[language]} ({city.name.en})
                      </div>
                      <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                        {city.tagline[language]}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.76rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.65rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{language === 'ru' ? 'Бюджет:' : 'Budget:'}</span>
                        <input
                          type="text"
                          value={cityBudgets[city.id] ?? (city.budgetRange[language] || city.budgetRange.ru)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCityBudgets(prev => ({ ...prev, [city.id]: val }));
                          }}
                          placeholder="$1,000 – $1,800 / мес"
                          title={language === 'ru' ? 'Кликните для редактирования бюджета этого города' : 'Click to edit budget'}
                          style={{
                            flex: 1,
                            maxWidth: '175px',
                            padding: '3px 8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--accent-terracotta)',
                            background: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            textAlign: 'right'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Пляж:' : 'Beach:'}</span>
                        <span style={{ color: city.beachAccess ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 600 }}>
                          {city.beachAccess ? city.beachAccess[language] : (language === 'ru' ? 'Нет прямого пляжа' : 'No direct beach')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Neighborhoods of Selected City */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              {language === 'ru' ? 'Рекомендованные районы в этом городе:' : 'Recommended Districts in Selected City:'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {NEIGHBORHOODS_DATA.filter(n => normalizeCityId(n.cityId) === normalizeCityId(selectedCityId)).map((neigh) => {
                const isChecked = selectedNeighborhoods.includes(neigh.id);
                return (
                  <button
                    key={neigh.id}
                    type="button"
                    onClick={() => {
                      if (isChecked) {
                        setSelectedNeighborhoods(prev => prev.filter(id => id !== neigh.id));
                      } else {
                        setSelectedNeighborhoods(prev => [...prev, neigh.id]);
                      }
                    }}
                    className="glass-button"
                    style={{
                      padding: '0.45rem 0.95rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      borderRadius: 'var(--dash-radius-pill)',
                      background: isChecked ? 'var(--accent-emerald)' : '#FFFFFF',
                      color: isChecked ? '#FFFFFF' : 'var(--text-main)',
                      borderColor: isChecked ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {isChecked ? <Check size={13} /> : <Plus size={13} />}
                    <span>{neigh.name}</span>
                  </button>
                );
              })}
              {NEIGHBORHOODS_DATA.filter(n => normalizeCityId(n.cityId) === normalizeCityId(selectedCityId)).length === 0 && (
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {language === 'ru' ? 'Для этого города доступны все центральные районы.' : 'All central districts available.'}
                </span>
              )}
            </div>
          </div>

          {/* Rationale / Founder's Why Textarea */}
          <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {language === 'ru' ? 'Персональное обоснование выбора для клиента:' : 'Personalized Rationale for Client:'}
                </label>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {language === 'ru'
                    ? 'Этот текст отображается в кабинете клиента во вкладке «Рекомендованный город» с вашей аватаркой и подписью.'
                    : 'Shown to client in "Recommended City" view with your signature.'}
                </div>
              </div>

              {/* Quick Template Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {Object.entries(CITY_WHY_TEMPLATES).map(([cid, tpl]) => {
                  const isCurrent = normalizeCityId(selectedCityId) === cid;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => {
                        setCityWhyRu(tpl.ru);
                        setCityWhyEn(tpl.en);
                      }}
                      className="dash-action-pill"
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: isCurrent ? 700 : 500,
                        border: isCurrent ? '1.5px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                        background: isCurrent ? 'rgba(15, 118, 110, 0.08)' : '#FFFFFF',
                        color: isCurrent ? 'var(--accent-emerald)' : 'var(--text-main)'
                      }}
                    >
                      ⚡ {language === 'ru' ? tpl.labelRu : tpl.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              rows={4}
              value={cityWhyRu}
              onChange={(e) => setCityWhyRu(e.target.value)}
              placeholder="Напишите, почему именно этот город идеально подходит клиенту..."
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ marginTop: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                {language === 'ru' ? 'Версия на английском (English version):' : 'English translation:'}
              </label>
              <textarea
                rows={2}
                value={cityWhyEn}
                onChange={(e) => setCityWhyEn(e.target.value)}
                placeholder="English rationale for international clients..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.84rem',
                  lineHeight: 1.4,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Auto Assign Realtor Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <input
              type="checkbox"
              id="autoAssignRealtor"
              checked={autoAssignRealtor}
              onChange={(e) => setAutoAssignRealtor(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="autoAssignRealtor" style={{ fontSize: '0.85rem', color: 'var(--text-main)', cursor: 'pointer' }}>
              {language === 'ru'
                ? `Автоматически закрепить риелтора по этому городу (${selectedCityId === 'nhatrang' ? 'Trần Minh — Нячанг' : 'Linh Nguyen — Дананг / Хойан'})`
                : `Auto-assign matching local partner realtor (${selectedCityId === 'nhatrang' ? 'Trần Minh — Nha Trang' : 'Linh Nguyen — Da Nang / Hoi An'})`}
            </label>
          </div>

          {/* Bottom Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button
              type="submit"
              className="glass-button active"
              style={{
                padding: '0.75rem 1.6rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent-emerald)'
              }}
            >
              <Save size={16} />
              <span>{language === 'ru' ? 'Сохранить выбор города и обоснование' : 'Save City & Rationale'}</span>
            </button>
          </div>

        </form>
      )}


      {/* ========================================================================= */}
      {/* TAB 1: RELOCATION MASTER ROADMAP (МАРШРУТ ПЕРЕЕЗДА) */}
      {/* ========================================================================= */}
      {activeTab === 'roadmap' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                {language === 'ru' ? 'Пошаговый авторский маршрут релокации' : 'Master Relocation Roadmap'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {language === 'ru'
                  ? 'Структурированный план по 3 фазам: до вылета, первые 7 дней и первый месяц. Клиент отмечает выполнение в своем кабинете.'
                  : 'Structured 3-phase journey: pre-departure, arrival week, and first month settlement.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(true)}
              className="glass-button active"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-emerald)' }}
            >
              <Plus size={15} />
              <span>{language === 'ru' ? 'Добавить шаг в маршрут' : 'Add Milestone'}</span>
            </button>
          </div>

          {/* 3 Phases Accordion / Sections */}
          {[
            { id: 'before_arrival', titleRu: 'Фаза 1: До прилёта (визы, КПП, временное жилье, финансы)', titleEn: 'Phase 1: Before Arrival (Visas, temporary hotel, money)', color: 'var(--accent-terracotta)' },
            { id: 'week_of_arrival', titleRu: 'Фаза 2: Первые 7 дней (связь, показы с риелтором в TG, аудит договора)', titleEn: 'Phase 2: Week of Arrival (SIM, realtor tours in TG, lease audit)', color: 'var(--accent-emerald)' },
            { id: 'first_month', titleRu: 'Фаза 3: Обустройство и быт (tạm trú в полиции, байк, VietQR, визаран)', titleEn: 'Phase 3: Settlement (tạm trú, scooter, banking, visa runs)', color: '#0369A1' }
          ].map((phase) => {
            const phaseTasks = roadmapTasks.filter(t => t.phase === phase.id);
            return (
              <div key={phase.id} className="glass-card" style={{ padding: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: phase.color }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    {language === 'ru' ? phase.titleRu : phase.titleEn}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {phaseTasks.filter(t => t.completed).length} / {phaseTasks.length} выполнено
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {phaseTasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        background: task.completed ? '#F0FDF4' : '#FFFFFF',
                        border: task.completed ? '1px solid #BBF7D0' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '1rem 1.25rem',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '1rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        style={{ marginTop: '3px', cursor: 'pointer', width: '17px', height: '17px' }}
                      />

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: task.completed ? '#0F766E' : 'var(--text-main)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                          {task.title[language] || task.title.ru}
                        </div>
                        {task.description && (
                          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.45 }}>
                            {task.description[language] || task.description.ru}
                          </div>
                        )}
                        {task.founderComment && (
                          <div style={{
                            marginTop: '0.5rem',
                            background: '#FFFBEB',
                            border: '1px solid #FDE68A',
                            borderRadius: '4px',
                            padding: '0.45rem 0.75rem',
                            fontSize: '0.8rem',
                            color: '#92400E'
                          }}>
                            <strong>{language === 'ru' ? '💡 Совет Founder:' : '💡 Founder Tip:'}</strong> {task.founderComment[language] || task.founderComment.ru}
                          </div>
                        )}

                        {/* External Guide / Action Link (e.g. Visa Guide & Checklist) */}
                        {(() => {
                          const isVisaTask = task.id === 'reloc-task-1' || 
                            task.id === 't-mikhail-1' || 
                            task.title.ru?.toLowerCase().includes('виз') || 
                            task.title.en?.toLowerCase().includes('visa');
                          const link = task.linkUrl || (isVisaTask ? 'https://incomparable-tulumba-32318f.netlify.app' : undefined);
                          const label = task.linkLabel?.[language] || task.linkLabel?.ru || (isVisaTask
                            ? (language === 'ru' ? 'Гид-чеклист по визе (открыть сайт)' : 'e-Visa Guide & Checklist')
                            : undefined);
                          if (!link) return null;
                          return (
                            <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.45rem',
                                  padding: '0.45rem 0.9rem',
                                  fontSize: '0.82rem',
                                  fontWeight: 600,
                                  color: '#0F766E',
                                  background: '#F0FDF4',
                                  border: '1px solid #86EFAC',
                                  borderRadius: '6px',
                                  textDecoration: 'none',
                                  boxShadow: '0 1px 3px rgba(15, 118, 110, 0.1)',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <ExternalLink size={13} />
                                <span>{label}</span>
                              </a>
                              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                                {language === 'ru' ? '✓ Ссылка доступна и вам, и клиенту в его личном кабинете' : '✓ Visible to founder & client in dashboard'}
                              </span>
                            </div>
                          );
                        })()}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.6rem', color: '#DC2626' }}
                        title="Удалить шаг"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: TRAVEL ITINERARY FOR RELOCATION (МАРШРУТ ПЕРЕЕЗДА НА 14 ДНЕЙ) */}
      {/* ========================================================================= */}
      {activeTab === 'travel_itinerary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Route size={18} color="var(--accent-emerald)" />
              <span>{language === 'ru' ? 'Персональный ознакомительный маршрут переезда (14 дней)' : '14-Day Relocation Immersion & Settling-in Route'}</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {language === 'ru'
                ? 'Этот 14-дневный маршрут помогает клиенту комфортно адаптироваться в первые две недели. Вы можете редактировать любые дни, менять таймслоты, ссылки на Google Карты или добавлять новые.'
                : 'This 14-day itinerary guides the client through their first two weeks. You can edit any day, adjust slots, Google Maps links, or add new ones.'}
            </p>
          </div>
          <AdminTravelItineraryBuilder
            selectedClient={{
              ...selectedClient,
              hasTravelPlan: true,
              travelDays: (selectedClient.travelDays && selectedClient.travelDays.length > 0)
                ? selectedClient.travelDays
                : DEFAULT_RELOCATION_14_DAYS
            }}
            onPublishSuccess={() => {
              publishClientUpdates(selectedClient.id);
              if (onPublishSuccess) onPublishSuccess();
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PARTNER REALTOR HANDOVER (ПАРТНЕР-РИЕЛТОР) */}
      {/* ========================================================================= */}
      {activeTab === 'realtor' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left: Realtor Profile & Status */}
          <form onSubmit={handleSaveRealtor} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
              <Users size={20} color="var(--accent-emerald)" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
                {language === 'ru' ? 'Назначение проверенного риелтора' : 'Partner Realtor Assignment'}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Имя риелтора:</label>
                <input
                  type="text"
                  value={editRealtorName}
                  onChange={(e) => setEditRealtorName(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Агентство / Статус:</label>
                <input
                  type="text"
                  value={editRealtorAgency}
                  onChange={(e) => setEditRealtorAgency(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Telegram Username (без @):</label>
                <input
                  type="text"
                  value={editRealtorTg}
                  onChange={(e) => setEditRealtorTg(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>WhatsApp / Телефон:</label>
                <input
                  type="text"
                  value={editRealtorWa}
                  onChange={(e) => setEditRealtorWa(e.target.value)}
                  placeholder="+84..."
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Ссылка на Instagram:</label>
              <input
                type="text"
                value={editRealtorInstagram}
                onChange={(e) => setEditRealtorInstagram(e.target.value)}
                placeholder="https://www.instagram.com/chaulovely101?..."
                style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Статус работы с клиентом:</label>
              <select
                value={editRealtorStatus}
                onChange={(e) => setEditRealtorStatus(e.target.value as RealtorWorkStatus)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
              >
                <option value="assigned">Назначен клиенту (ожидает первого контакта)</option>
                <option value="chat_created">Чат создан, подбор вариантов в Telegram идет</option>
                <option value="viewings_scheduled">Очные показы квартир согласованы</option>
                <option value="contract_negotiation">Квартира выбрана, проект договора на аудите</option>
                <option value="leased">Договор подписан, клиент заселен</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Специализация риелтора (районы, бюджет):</label>
              <input
                type="text"
                value={editRealtorSpec}
                onChange={(e) => setEditRealtorSpec(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Инструкция и заметка Founder для клиента:</label>
              <textarea
                rows={3}
                value={editRealtorNoteRu}
                onChange={(e) => setEditRealtorNoteRu(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'inherit', fontSize: '0.85rem' }}
              />
            </div>

            <button type="submit" className="glass-button active" style={{ marginTop: '0.5rem', padding: '0.65rem 1.4rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-terracotta)' }}>
              <Save size={16} />
              <span>{language === 'ru' ? 'Сохранить карточку риелтора' : 'Save Realtor Card'}</span>
            </button>
          </form>

          {/* Right: Client Card Preview & Brief Generator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Live Client Preview Card */}
            <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF', border: '2px solid var(--border-emerald)' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.5rem' }}>
                {language === 'ru' ? 'Как эту карточку видит клиент в своем кабинете:' : 'Client View Preview:'}
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img
                  src={realtor.photoUrl}
                  alt={realtor.realtorName}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-emerald)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{realtor.realtorName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{realtor.agencyOrTitle}</div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                    {realtor.languages.map(lang => (
                      <span key={lang} style={{ background: '#E6F4F1', color: '#0F766E', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                {realtor.specialization}
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {editRealtorInstagram && (
                  <a
                    href={editRealtorInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button active"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: '#FFFFFF' }}
                  >
                    <span>Instagram (@chaulovely101)</span>
                  </a>
                )}
                {editRealtorTg && (
                  <a
                    href={`https://t.me/${editRealtorTg.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button active"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0284C7' }}
                  >
                    <MessageCircle size={15} />
                    <span>Telegram (@{editRealtorTg.replace('@', '')})</span>
                  </a>
                )}
                {editRealtorWa && (
                  <a
                    href={`https://wa.me/${editRealtorWa.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}
                  >
                    <Phone size={15} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Realtor Brief Fast Generator */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="var(--accent-terracotta)" />
                  <span>{language === 'ru' ? 'Быстрый бриф для пересылки риелтору' : 'Quick Realtor Brief'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyRealtorBrief}
                  className="glass-button"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}
                >
                  {copiedBrief ? <Check size={14} color="#0F766E" /> : <Copy size={14} />}
                  <span>{copiedBrief ? (language === 'ru' ? 'Скопировано!' : 'Copied!') : (language === 'ru' ? 'Скопировать' : 'Copy')}</span>
                </button>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.75rem 0' }}>
                {language === 'ru'
                  ? 'Нажмите кнопку, чтобы скопировать готовый текст с бюджетом и требованиями клиента для отправки риелтору в Telegram.'
                  : 'Click copy to grab client requirements pre-formatted for Telegram.'}
              </p>

              <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '0.75rem', fontSize: '0.78rem', fontFamily: 'monospace', lineHeight: 1.5, maxHeight: '160px', overflowY: 'auto' }}>
                Клиент: {selectedClient.clientName}<br/>
                Город: {CITIES_DATA.find(c => c.id === normalizeCityId(selectedClient.recommendedCityId))?.name[language] || selectedClient.recommendedCityId}<br/>
                Бюджет на жилье: ${selectedClient.userCurrentBudget.accommodation}/мес<br/>
                Даты: {selectedClient.questionnaire.travelDates || 'в ближайшее время'}<br/>
                Формат: {selectedClient.questionnaire.accommodationType || '1BR/2BR у моря'}<br/>
                Требования: прямой тариф EVN, без шумных строек за окном, договор с регистрацией tạm trú.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LEASE CONTRACT AUDIT (АУДИТ ДОГОВОРА АРЕНДЫ) */}
      {/* ========================================================================= */}
      {activeTab === 'lease_audit' && (
        <form onSubmit={handleSaveLeaseAudit} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>
                <ShieldCheck size={14} /> {language === 'ru' ? 'Юридический Due Diligence аренды' : 'Remote Lease Due Diligence'}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', fontFamily: 'var(--font-serif)' }}>
                {language === 'ru' ? 'Дистанционный аудит договора аренды' : 'Rental Agreement Audit'}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Статус аудита:</span>
              <select
                value={editAuditStatus}
                onChange={(e) => setEditAuditStatus(e.target.value as LeaseAuditStatus)}
                style={{ padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
              >
                <option value="waiting_for_client_draft">Ожидание драфта от клиента/риелтора</option>
                <option value="under_review">Founder проводит экспертизу</option>
                <option value="approved_with_notes">Одобрено с точечными комментариями</option>
                <option value="revisions_required">Требуются обязательные правки</option>
                <option value="high_risk">Высокий риск потери залога / завышения</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Название объекта / ЖК по договору:
            </label>
            <input
              type="text"
              value={editContractTitle}
              onChange={(e) => setEditContractTitle(e.target.value)}
              placeholder="Hợp Đồng Thuê Căn Hộ (Hiyori Garden Tower / Gold Coast)"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
            />
          </div>

          {/* 5 Due Diligence Risk Checks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              5 ключевых параметров проверки договора:
            </div>

            {/* 1. Deposit Safety */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>1. Условия возврата залога (Security Deposit)</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Безопасно</span>
              </div>
              <textarea
                rows={2}
                value={editDepositComment}
                onChange={(e) => setEditDepositComment(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* 2. EVN Rate */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>2. Тариф электроэнергии EVN (₫/кВт)</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Зафиксированный тариф:</span>
                  <input
                    type="number"
                    value={editEvnTariff}
                    onChange={(e) => setEditEvnTariff(Number(e.target.value))}
                    style={{ width: '90px', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                  />
                  <span style={{ fontSize: '0.78rem' }}>₫/кВт</span>
                </div>
              </div>
              <textarea
                rows={2}
                value={editEvnComment}
                onChange={(e) => setEditEvnComment(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* 3. Police Registration tam tru */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>3. Обязательство регистрации в полиции (tạm trú в течение 24ч)</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Проверено</span>
              </div>
              <textarea
                rows={2}
                value={editTamTruComment}
                onChange={(e) => setEditTamTruComment(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* 4. Early Termination & Force Majeure */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>4. Досрочное расторжение при форс-мажоре или отказе в визе</strong>
                <span className="badge badge-terracotta" style={{ fontSize: '0.72rem' }}>Точечная правка</span>
              </div>
              <textarea
                rows={2}
                value={editEarlyTermComment}
                onChange={(e) => setEditEarlyTermComment(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Overall Verdict */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Официальное заключение Founder (вердикт для клиента):
            </label>
            <textarea
              rows={3}
              value={editOverallVerdictRu}
              onChange={(e) => setEditOverallVerdictRu(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'inherit', fontSize: '0.88rem', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="glass-button active" style={{ padding: '0.65rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-emerald)' }}>
              <Save size={16} />
              <span>{language === 'ru' ? 'Сохранить аудит договора' : 'Save Lease Audit'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: VIP CONCIERGE & PSYCHOLOGIST ($890 ONLY) */}
      {/* ========================================================================= */}
      {activeTab === 'vip_concierge' && isVip && (
        <form onSubmit={handleSaveVipPerks} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <Crown size={22} color="#D97706" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', fontFamily: 'var(--font-serif)' }}>
                {language === 'ru' ? 'Управление VIP-услугами ($890)' : 'VIP Concierge & Wellness Management'}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {language === 'ru' ? 'Сессия с психологом-сексологом (Мария Егорова) и 30 дней сопровождения с Founder в Telegram (@Likqwerty)' : 'Psychologist session (Maria Egorova) and 30-day founder Telegram accompaniment (@Likqwerty)'}
              </div>
            </div>
          </div>

          {/* Section 1: Psychologist / Sexologist Session */}
          <div style={{ background: '#FFFFFF', border: '2px solid #FDE68A', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={vipPerks.psychologistSession.specialistPhotoUrl || '/psychologist-photo.png'}
                  alt={vipPerks.psychologistSession.specialistName}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D97706' }}
                />
                <div>
                  <div className="badge badge-emerald" style={{ background: '#FEF3C7', color: '#B45309', marginBottom: '0.2rem' }}>
                    <HeartHandshake size={13} /> 1 сессия бесплатно + скидка на 2-ю
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{vipPerks.psychologistSession.specialistName}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{vipPerks.psychologistSession.specialistTitle}</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Статус сессии:</label>
                <select
                  value={editPsyStatus}
                  onChange={(e) => setEditPsyStatus(e.target.value as VipPsychologistStatus)}
                  style={{ padding: '0.45rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.82rem' }}
                >
                  <option value="included_not_booked">1-я сессия включена, ожидает записи</option>
                  <option value="contact_shared">Контакт передан клиенту в Telegram</option>
                  <option value="session_scheduled">Сессия назначена (согласована дата)</option>
                  <option value="completed">Бесплатная сессия проведена</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Дата и время онлайн-сессии:
                </label>
                <input
                  type="text"
                  value={editPsyDate}
                  onChange={(e) => setEditPsyDate(e.target.value)}
                  placeholder="20 октября 2026, 16:00 (МСК / Zoom)"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Промокод на скидку для 2-й сессии:
                </label>
                <input
                  type="text"
                  value={editPsyPromo}
                  onChange={(e) => setEditPsyPromo(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                />
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Прямой контакт специалиста: <strong>{vipPerks.psychologistSession.telegramContact}</strong> &bull; WhatsApp: <strong>{vipPerks.psychologistSession.whatsappContact}</strong>
            </div>
          </div>

          {/* Section 2: Founder 30-Day Accompaniment in Telegram */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Send size={18} color="var(--accent-emerald)" />
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
                {language === 'ru' ? 'Персональное сопровождение с Founder (30 дней)' : 'Founder 30-Day Telegram Accompaniment'}
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Статус сопровождения:</label>
                <select
                  value={editTgAccStatus}
                  onChange={(e) => setEditTgAccStatus(e.target.value as any)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
                >
                  <option value="active">Активно (сопровождение идет)</option>
                  <option value="scheduled">Запланировано (со дня прилёта)</option>
                  <option value="completed">Завершено (30 дней истекли)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Telegram Founder:</label>
                <input
                  type="text"
                  value={editTgAccUsername}
                  onChange={(e) => setEditTgAccUsername(e.target.value)}
                  placeholder="Likqwerty"
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Осталось дней / Всего дней:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    value={editTgAccRemaining}
                    onChange={(e) => setEditTgAccRemaining(Number(e.target.value))}
                    style={{ width: '80px', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                  />
                  <span>из</span>
                  <input
                    type="number"
                    value={editTgAccTotal}
                    onChange={(e) => setEditTgAccTotal(Number(e.target.value))}
                    style={{ width: '80px', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>дней</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Ссылка для клиента: <a href={`https://t.me/${editTgAccUsername.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>https://t.me/{editTgAccUsername.replace(/^@/, '')}</a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="glass-button active" style={{ padding: '0.65rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-emerald)' }}>
              <Save size={16} />
              <span>{language === 'ru' ? 'Сохранить VIP-параметры' : 'Save VIP Settings'}</span>
            </button>
          </div>

        </form>
      )}

      {/* Modal: Add Task to Roadmap */}
      {isAddTaskModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <form
            onSubmit={handleAddTask}
            className="glass-card"
            style={{
              background: '#FFFFFF',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
              {language === 'ru' ? 'Добавить шаг в маршрут релокации' : 'Add Roadmap Milestone'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Фаза переезда:</label>
                <select
                  value={newTaskPhase}
                  onChange={(e) => setNewTaskPhase(e.target.value as any)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
                >
                  <option value="before_arrival">Фаза 1: До прилёта (визы, КПП, билеты)</option>
                  <option value="week_of_arrival">Фаза 2: Первые 7 дней (жилье, показы, договор)</option>
                  <option value="first_month">Фаза 3: Первый месяц (регистрация tạm trú, байк, быт)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Название шага (RU):</label>
                <input
                  type="text"
                  required
                  value={newTaskTitleRu}
                  onChange={(e) => setNewTaskTitleRu(e.target.value)}
                  placeholder="Например: Проверить показания счетчика электроэнергии"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Описание (инструкция для клиента):</label>
                <textarea
                  rows={2}
                  value={newTaskDescRu}
                  onChange={(e) => setNewTaskDescRu(e.target.value)}
                  placeholder="Сфотографируйте счетчик вместе с собственником при передаче ключей..."
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Совет Founder (опционально):</label>
                <input
                  type="text"
                  value={newTaskCommentRu}
                  onChange={(e) => setNewTaskCommentRu(e.target.value)}
                  placeholder="Например: Не садитесь к частникам у выхода"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Ссылка на сайт / чек-лист (опционально):</label>
                <input
                  type="url"
                  value={newTaskLinkUrl}
                  onChange={(e) => setNewTaskLinkUrl(e.target.value)}
                  placeholder="https://incomparable-tulumba-32318f.netlify.app"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Текст ссылки (опционально):</label>
                <input
                  type="text"
                  value={newTaskLinkLabelRu}
                  onChange={(e) => setNewTaskLinkLabelRu(e.target.value)}
                  placeholder="Открыть гид-чеклист по визе"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="glass-button"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-main)' }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="glass-button active"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', background: 'var(--accent-emerald)' }}
                >
                  Добавить шаг
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Client Dashboard Live Preview Modal */}
      <ClientDashboardPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        client={selectedClient}
        onPublishSuccess={onPublishSuccess}
      />

    </div>
  );
};
