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
  VipPsychologistStatus
} from '../types';
import {
  DEFAULT_RELOCATION_ROADMAP_TASKS,
  DEFAULT_PARTNER_REALTOR_DANANG,
  DEFAULT_PARTNER_REALTOR_NHATRANG,
  DEFAULT_LEASE_AUDIT,
  DEFAULT_VIP_PERKS
} from '../translations/defaultRelocationData';
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
  HeartHandshake
} from 'lucide-react';

interface AdminRelocationManagerProps {
  selectedClient: AdminClientRecord;
  onPublishSuccess?: () => void;
}

export const AdminRelocationManager: React.FC<AdminRelocationManagerProps> = ({
  selectedClient,
  onPublishSuccess
}) => {
  const {
    updatePartnerRealtor,
    updateLeaseContractAudit,
    updateVipConciergePerks,
    updateRelocationRoadmap,
    publishClientUpdates,
    language
  } = useApp();

  const isVip = selectedClient.tierId === 'tier4';
  const [activeTab, setActiveTab] = useState<'roadmap' | 'realtor' | 'lease_audit' | 'vip_concierge'>('roadmap');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Active roadmap tasks
  const roadmapTasks: RoadmapTask[] = (selectedClient.roadmapTasks && selectedClient.roadmapTasks.length > 0)
    ? selectedClient.roadmapTasks
    : DEFAULT_RELOCATION_ROADMAP_TASKS;

  // Active partner realtor
  const realtor: PartnerRealtorAssignment = selectedClient.partnerRealtor || (
    selectedClient.recommendedCityId === 'nhatrang'
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

  // Form states for editing realtor
  const [editRealtorName, setEditRealtorName] = useState(realtor.realtorName);
  const [editRealtorAgency, setEditRealtorAgency] = useState(realtor.agencyOrTitle);
  const [editRealtorTg, setEditRealtorTg] = useState(realtor.telegramUsername);
  const [editRealtorWa, setEditRealtorWa] = useState(realtor.whatsappNumber);
  const [editRealtorPhone, setEditRealtorPhone] = useState(realtor.phoneOrZalo);
  const [editRealtorSpec, setEditRealtorSpec] = useState(realtor.specialization);
  const [editRealtorStatus, setEditRealtorStatus] = useState<RealtorWorkStatus>(realtor.status);
  const [editRealtorNoteRu, setEditRealtorNoteRu] = useState(realtor.founderNoteToClient.ru);

  // Form states for editing lease audit
  const [editAuditStatus, setEditAuditStatus] = useState<LeaseAuditStatus>(leaseAudit.status);
  const [editContractTitle, setEditContractTitle] = useState(leaseAudit.contractDraftTitle || '');
  const [editEvnTariff, setEditEvnTariff] = useState(leaseAudit.checks.evnElectricityTariff.tariffVND || 4200);
  const [editDepositComment, setEditDepositComment] = useState(leaseAudit.checks.depositRefundSafety.comment);
  const [editEvnComment, setEditEvnComment] = useState(leaseAudit.checks.evnElectricityTariff.comment);
  const [editTamTruComment, setEditTamTruComment] = useState(leaseAudit.checks.policeRegistrationTamTru.comment);
  const [editEarlyTermComment, setEditEarlyTermComment] = useState(leaseAudit.checks.earlyTerminationClause.comment);
  const [editOverallVerdictRu, setEditOverallVerdictRu] = useState(leaseAudit.overallVerdict.ru);

  // Form states for editing VIP perks
  const [editPsyStatus, setEditPsyStatus] = useState(vipPerks.psychologistSession.status);
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
    setEditRealtorPhone(realtor.phoneOrZalo);
    setEditRealtorSpec(realtor.specialization);
    setEditRealtorStatus(realtor.status);
    setEditRealtorNoteRu(realtor.founderNoteToClient.ru);

    setEditAuditStatus(leaseAudit.status);
    setEditContractTitle(leaseAudit.contractDraftTitle || '');
    setEditEvnTariff(leaseAudit.checks.evnElectricityTariff.tariffVND || 4200);
    setEditDepositComment(leaseAudit.checks.depositRefundSafety.comment);
    setEditEvnComment(leaseAudit.checks.evnElectricityTariff.comment);
    setEditTamTruComment(leaseAudit.checks.policeRegistrationTamTru.comment);
    setEditEarlyTermComment(leaseAudit.checks.earlyTerminationClause.comment);
    setEditOverallVerdictRu(leaseAudit.overallVerdict.ru);

    setEditPsyStatus(vipPerks.psychologistSession.status);
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
  }, [selectedClient.id]);

  // Quality Gate Validation Checks for Relocation Concierge
  const phasesCovered = {
    before: roadmapTasks.some(t => t.phase === 'before_arrival'),
    week: roadmapTasks.some(t => t.phase === 'week_of_arrival'),
    month: roadmapTasks.some(t => t.phase === 'first_month')
  };
  const allPhasesPresent = phasesCovered.before && phasesCovered.week && phasesCovered.month;

  const qualityChecks = [
    {
      id: 'intake_done',
      title: language === 'ru' ? 'Анкета и цели переезда проанализированы' : 'Client questionnaire & goals analyzed',
      passed: Boolean(selectedClient.recommendedCityId && selectedClient.userCurrentBudget),
      hint: selectedClient.recommendedCityId === 'danang' ? 'Дананг' : selectedClient.recommendedCityId === 'nhatrang' ? 'Нячанг' : 'Город выбран'
    },
    {
      id: 'roadmap_ready',
      title: language === 'ru' ? 'Пошаговый маршрут переезда сформирован (3 фазы)' : 'Step-by-step roadmap ready (3 phases)',
      passed: roadmapTasks.length >= 6 && allPhasesPresent,
      hint: `${roadmapTasks.length} шагов`
    },
    {
      id: 'realtor_assigned',
      title: language === 'ru' ? 'Назначен проверенный риелтор с прямым Telegram' : 'Verified realtor assigned with Telegram',
      passed: Boolean(realtor.realtorName && realtor.telegramUsername),
      hint: realtor.realtorName
    },
    {
      id: 'lease_audit_active',
      title: language === 'ru' ? 'Модуль аудита договора аренды настроен' : 'Lease contract audit module active',
      passed: Boolean(leaseAudit.checks && leaseAudit.overallVerdict.ru),
      hint: leaseAudit.status === 'approved_with_notes' ? 'Одобрено с правками' : 'Аудит активен'
    },
    ...(isVip ? [{
      id: 'vip_concierge_active',
      title: language === 'ru' ? 'Сессия с психологом-сексологом и консьерж активированы' : 'Psychologist session & VIP concierge configured',
      passed: Boolean(vipPerks.psychologistSession.specialistName && vipPerks.psychologistSession.secondSessionPromoCode),
      hint: 'Сессия + Промокод'
    }] : [])
  ];

  const allQualityChecksPassed = qualityChecks.every(c => c.passed);

  // Handlers
  const handleSaveRealtor = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRealtor: PartnerRealtorAssignment = {
      ...realtor,
      realtorName: editRealtorName.trim(),
      agencyOrTitle: editRealtorAgency.trim(),
      telegramUsername: editRealtorTg.replace('@', '').trim(),
      whatsappNumber: editRealtorWa.trim(),
      phoneOrZalo: editRealtorPhone.trim(),
      specialization: editRealtorSpec.trim(),
      status: editRealtorStatus,
      founderNoteToClient: {
        en: realtor.founderNoteToClient.en,
        ru: editRealtorNoteRu.trim()
      },
      directChatUrl: `https://t.me/${editRealtorTg.replace('@', '').trim()}`
    };
    updatePartnerRealtor(selectedClient.id, updatedRealtor);
    setSavedNotice(language === 'ru' ? 'Карточка риелтора сохранена в черновик!' : 'Realtor details saved!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleSaveLeaseAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAudit: LeaseContractAudit = {
      ...leaseAudit,
      status: editAuditStatus,
      contractDraftTitle: editContractTitle.trim(),
      checks: {
        ...leaseAudit.checks,
        depositRefundSafety: { ...leaseAudit.checks.depositRefundSafety, comment: editDepositComment.trim() },
        evnElectricityTariff: { ...leaseAudit.checks.evnElectricityTariff, tariffVND: Number(editEvnTariff), comment: editEvnComment.trim() },
        policeRegistrationTamTru: { ...leaseAudit.checks.policeRegistrationTamTru, comment: editTamTruComment.trim() },
        earlyTerminationClause: { ...leaseAudit.checks.earlyTerminationClause, comment: editEarlyTermComment.trim() }
      },
      overallVerdict: {
        en: leaseAudit.overallVerdict.en,
        ru: editOverallVerdictRu.trim()
      }
    };
    updateLeaseContractAudit(selectedClient.id, updatedAudit);
    setSavedNotice(language === 'ru' ? 'Аудит договора сохранен в черновик!' : 'Lease audit saved!');
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
      completed: false
    };

    updateRelocationRoadmap(selectedClient.id, [...roadmapTasks, newTask]);
    setIsAddTaskModalOpen(false);
    setNewTaskTitleRu('');
    setNewTaskDescRu('');
    setNewTaskCommentRu('');
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
    const brief = `Здравствуйте! Бриф на подбор жилья от VietReloc:
Клиент: ${selectedClient.clientName}
Тариф: ${selectedClient.serviceName[language]}
Город: ${selectedClient.recommendedCityId === 'danang' ? 'Дананг' : 'Нячанг'}
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
          <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
            {allQualityChecksPassed
              ? (language === 'ru' ? '✓ Relocation Quality Gate пройден: все стандарты сопровождения соблюдены.' : '✓ Relocation Quality Gate passed: All milestones ready.')
              : (language === 'ru' ? `⚠ Relocation Quality Gate: пройдено ${qualityChecks.filter(c => c.passed).length} из ${qualityChecks.length} критериев.` : `⚠ Quality Gate: ${qualityChecks.filter(c => c.passed).length}/${qualityChecks.length} passed.`)}
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
            onClick={() => {
              publishClientUpdates(selectedClient.id);
              if (onPublishSuccess) onPublishSuccess();
            }}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Send size={15} />
            <span>{language === 'ru' ? 'Опубликовать клиенту' : 'Publish to Client'}</span>
          </button>
        </div>
      </div>

      {/* Quality Gate Detailed Checklist Badge Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.6rem'
      }}>
        {qualityChecks.map((chk) => (
          <div
            key={chk.id}
            style={{
              background: chk.passed ? '#FFFFFF' : '#FEF2F2',
              border: chk.passed ? '1px solid #E5E7EB' : '1px solid #FECACA',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: chk.passed ? 'var(--text-main)' : '#991B1B' }}>
              {chk.passed ? <CheckCircle2 size={14} color="#0F766E" /> : <AlertTriangle size={14} color="#DC2626" />}
              <span style={{ fontWeight: 600 }}>{chk.title}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{chk.hint}</span>
          </div>
        ))}
      </div>

      {/* 4 Purposeful Relocation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'roadmap', label: language === 'ru' ? `Маршрут переезда (${roadmapTasks.length})` : `Roadmap (${roadmapTasks.length})`, icon: Compass },
          { id: 'realtor', label: language === 'ru' ? `Партнер-риелтор (${realtor.realtorName})` : `Realtor (${realtor.realtorName})`, icon: Users },
          { id: 'lease_audit', label: language === 'ru' ? 'Аудит договора аренды' : 'Lease Due Diligence', icon: ShieldCheck },
          ...(isVip ? [{ id: 'vip_concierge', label: language === 'ru' ? 'VIP-Консьерж & Психолог' : 'VIP Concierge & Psy', icon: Crown, highlight: true }] : [])
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--accent-emerald)' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : 'var(--text-main)',
                border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: isActive ? '0 4px 12px rgba(15,118,110,0.18)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.highlight && !isActive && (
                <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '9999px', fontWeight: 800 }}>VIP</span>
              )}
            </button>
          );
        })}
      </div>

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
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
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
                            <strong>{language === 'ru' ? '💡 Совет основателя:' : '💡 Founder Tip:'}</strong> {task.founderComment[language] || task.founderComment.ru}
                          </div>
                        )}
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
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>
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
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Инструкция и заметка основателя для клиента:</label>
              <textarea
                rows={3}
                value={editRealtorNoteRu}
                onChange={(e) => setEditRealtorNoteRu(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'inherit', fontSize: '0.85rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
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
                <a
                  href={`https://t.me/${editRealtorTg.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <MessageCircle size={15} />
                  <span>Написать в Telegram (@{editRealtorTg.replace('@', '')})</span>
                </a>
                {editRealtorWa && (
                  <a
                    href={`https://wa.me/${editRealtorWa.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
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
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
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
                Город: {selectedClient.recommendedCityId === 'danang' ? 'Дананг' : 'Нячанг'}<br/>
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
                <option value="under_review">Основатель проводит экспертизу</option>
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
              Официальное заключение основателя (вердикт для клиента):
            </label>
            <textarea
              rows={3}
              value={editOverallVerdictRu}
              onChange={(e) => setEditOverallVerdictRu(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'inherit', fontSize: '0.88rem', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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
                {language === 'ru' ? 'Сессия с психологом-сексологом (Мария Егорова) и 30 дней сопровождения с основателем в Telegram (@Likqwerty)' : 'Psychologist session (Maria Egorova) and 30-day founder Telegram accompaniment (@Likqwerty)'}
              </div>
            </div>
          </div>

          {/* Section 1: Psychologist / Sexologist Session */}
          <div style={{ background: '#FFFFFF', border: '2px solid #FDE68A', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={vipPerks.psychologistSession.specialistPhotoUrl}
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
                {language === 'ru' ? 'Персональное сопровождение с основателем (30 дней)' : 'Founder 30-Day Telegram Accompaniment'}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Telegram основателя:</label>
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
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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
          padding: '1rem'
        }}>
          <form onSubmit={handleAddTask} className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '1.75rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
              {language === 'ru' ? 'Добавить шаг в маршрут переезда' : 'Add Milestone'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Фаза маршрута:</label>
                <select
                  value={newTaskPhase}
                  onChange={(e) => setNewTaskPhase(e.target.value as any)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                >
                  <option value="before_arrival">Фаза 1: До прилёта (визы, билеты, отель)</option>
                  <option value="week_of_arrival">Фаза 2: Первые 7 дней (связь, показы, договор)</option>
                  <option value="first_month">Фаза 3: Обустройство (tạm trú, байк, банки)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Название шага:</label>
                <input
                  type="text"
                  required
                  value={newTaskTitleRu}
                  onChange={(e) => setNewTaskTitleRu(e.target.value)}
                  placeholder="Например: Проверка договора и получение ключей"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Описание (инструкция для клиента):</label>
                <textarea
                  rows={2}
                  value={newTaskDescRu}
                  onChange={(e) => setNewTaskDescRu(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>💡 Совет основателя (лайфхак):</label>
                <input
                  type="text"
                  value={newTaskCommentRu}
                  onChange={(e) => setNewTaskCommentRu(e.target.value)}
                  placeholder="Например: Не садитесь к частникам у выхода"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 1rem' }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1.25rem' }}
                >
                  Добавить шаг
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
