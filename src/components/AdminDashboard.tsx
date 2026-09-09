import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type {
  ClientFolderCategory,
  ProjectStatus,
  VerifiedHousingItem,
  NoiseAuditStatus
} from '../types';
import {
  Settings,
  Save,
  CheckCircle2,
  FolderPlus,
  FolderCheck,
  Archive,
  Eye,
  Sparkles,
  RotateCcw,
  FileText,
  Home,
  Plus,
  Trash2,
  Send,
  AlertTriangle,
  Wifi,
  Volume2,
  Zap,
  ShieldCheck,
  Check,
  Calendar
} from 'lucide-react';
import { AdminScheduleView } from './AdminScheduleView';
import { AdminTravelItineraryBuilder } from './AdminTravelItineraryBuilder';

export const AdminDashboard: React.FC = () => {
  const {
    adminClients,
    moveClientCategory,
    updateClientRecord,
    addVerifiedHousing,
    deleteVerifiedHousing,
    publishClientUpdates,
    consultationBookings,
    language
  } = useApp();

  const [adminSection, setAdminSection] = useState<'relocation_clients' | 'schedule_calls'>('relocation_clients');
  const [activeFolder, setActiveFolder] = useState<ClientFolderCategory>('active');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'plan' | 'housing'>('housing');
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState<boolean>(false);
  const [isAddHousingModalOpen, setIsAddHousingModalOpen] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Filter clients by active folder
  const currentFolderClients = adminClients.filter((c) => c.category === activeFolder);

  // If a client is selected, get their record
  const selectedClient =
    adminClients.find((c) => c.id === selectedClientId) || currentFolderClients[0] || null;

  // Local editing state for active client plan
  const [editStatus, setEditStatus] = useState<ProjectStatus>(
    selectedClient?.status || 'research_in_progress'
  );
  const [editCity, setEditCity] = useState<string>(selectedClient?.recommendedCityId || 'danang');
  const [editWhyRu, setEditWhyRu] = useState<string>(selectedClient?.recommendedCityWhy.ru || '');
  const [editNoteRu, setEditNoteRu] = useState<string>(
    selectedClient?.overallFounderNote.ru || ''
  );
  const [editBudget, setEditBudget] = useState(
    selectedClient?.userCurrentBudget || {
      accommodation: 500,
      food: 400,
      coworking: 100,
      transportation: 80,
      entertainment: 150
    }
  );

  // Form state for adding new housing
  const [newCondoName, setNewCondoName] = useState('');
  const [newCityId, setNewCityId] = useState(selectedClient?.recommendedCityId || 'danang');
  const [newDistrict, setNewDistrict] = useState('Son Tra / My An');
  const [newAddress, setNewAddress] = useState('');
  const [newPriceUSD, setNewPriceUSD] = useState(500);
  const [newPriceVND, setNewPriceVND] = useState(12500000);
  const [newEvnTariff, setNewEvnTariff] = useState(2800);
  const [newIsDirectEvn, setNewIsDirectEvn] = useState(true);
  const [newDepositMonths, setNewDepositMonths] = useState(1);
  const [newDepositCondition, setNewDepositCondition] = useState(
    '1 месяц возвратного залога при выезде. Проверено свидетельство о собственности (sổ đỏ).'
  );
  const [newRealtorName, setNewRealtorName] = useState('Nguyen Van A');
  const [newRealtorZalo, setNewRealtorZalo] = useState('+84 905 000 000 (Zalo)');
  const [newNoiseStatus, setNewNoiseStatus] = useState<NoiseAuditStatus>('verified_quiet');
  const [newNoiseNotes, setNewNoiseNotes] = useState(
    'Окна во двор. Строек в радиусе 200 метров нет.'
  );
  const [newFiberDownload, setNewFiberDownload] = useState(150);
  const [newFiberUpload, setNewFiberUpload] = useState(130);
  const [newFiberProvider, setNewFiberProvider] = useState<'Viettel' | 'VNPT' | 'FPT' | 'Other'>('Viettel');
  const [newFounderReview, setNewFounderReview] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  );

  // Sync edit state when selected client changes
  React.useEffect(() => {
    if (selectedClient) {
      setEditStatus(selectedClient.status);
      setEditCity(selectedClient.recommendedCityId);
      setEditWhyRu(selectedClient.recommendedCityWhy.ru);
      setEditNoteRu(selectedClient.overallFounderNote.ru);
      setEditBudget(selectedClient.userCurrentBudget);
      setNewCityId(selectedClient.recommendedCityId);
    }
  }, [selectedClient?.id]);

  const handleSaveClientPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    updateClientRecord(selectedClient.id, {
      status: editStatus,
      recommendedCityId: editCity,
      recommendedCityWhy: {
        en: selectedClient.recommendedCityWhy.en,
        ru: editWhyRu
      },
      overallFounderNote: {
        en: selectedClient.overallFounderNote.en,
        ru: editNoteRu
      },
      userCurrentBudget: editBudget
    });

    setSavedNotice(
      language === 'ru'
        ? 'Черновик плана сохранен! Нажмите «Опубликовать клиенту», чтобы синхронизировать.'
        : 'Plan draft saved! Click "Publish to Client" to sync.'
    );
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleCreateHousing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newCondoName.trim()) return;

    const newItem: Omit<VerifiedHousingItem, 'id' | 'createdAt'> = {
      condoName: newCondoName.trim(),
      cityId: newCityId,
      district: newDistrict.trim(),
      addressSnippet: newAddress.trim() || newDistrict.trim(),
      monthlyPriceUSD: Number(newPriceUSD),
      monthlyPriceVND: Number(newPriceVND),
      evnTariffVNDPerKwh: Number(newEvnTariff),
      isDirectEvnMeter: newIsDirectEvn,
      depositTerms: {
        amountUSD: Number(newPriceUSD * newDepositMonths),
        months: Number(newDepositMonths),
        refundConditions: {
          en: 'Standard 1-month refundable security deposit.',
          ru: newDepositCondition
        }
      },
      realtorContact: {
        name: newRealtorName,
        phoneOrZalo: newRealtorZalo,
        verifiedPartner: true
      },
      noiseAudit: {
        status: newNoiseStatus,
        inspectedAt: new Date().toISOString().split('T')[0],
        notes: {
          en: 'Audit conducted on site.',
          ru: newNoiseNotes
        }
      },
      fiberInternetSpeedMbps: {
        download: Number(newFiberDownload),
        upload: Number(newFiberUpload),
        provider: newFiberProvider
      },
      childFriendlyFeatures: ['Elevator with keycard', 'Gated territory'],
      photoUrls: [newPhotoUrl],
      founderReview: {
        en: newFounderReview || 'Verified by founder.',
        ru: newFounderReview || 'Объект проверен основателем лично. Рекомендуется к аренде.'
      },
      contractAudited: true,
      isTopPick: (selectedClient.verifiedHousing || []).length === 0,
      publishedToClient: false
    };

    addVerifiedHousing(selectedClient.id, newItem);
    setIsAddHousingModalOpen(false);
    setNewCondoName('');
    setSavedNotice(
      language === 'ru'
        ? 'Объект добавлен в черновики! Нажмите «Опубликовать клиенту», чтобы показать его.'
        : 'Property added to drafts! Click "Publish to Client" to make visible.'
    );
    setTimeout(() => setSavedNotice(null), 3500);
  };

  // Counts for folder badges
  const newCount = adminClients.filter((c) => c.category === 'new').length;
  const activeCount = adminClients.filter((c) => c.category === 'active').length;
  const completedCount = adminClients.filter((c) => c.category === 'completed').length;

  // Quality Gate Validation Checks
  const housingList = selectedClient?.verifiedHousing || [];
  const qualityChecks = [
    {
      title: language === 'ru' ? 'Добавлен хотя бы 1 проверенный объект' : 'At least 1 verified property added',
      passed: housingList.length > 0,
      hint: housingList.length > 0 ? `${housingList.length} объектов` : 'Необходимо добавить'
    },
    {
      title: language === 'ru' ? 'Аудит тарифа EVN (<3500 ₫/кВт)' : 'EVN rate audited (<3500 VND/kWh)',
      passed: housingList.length > 0 && housingList.every((h) => h.evnTariffVNDPerKwh <= 3500),
      hint: housingList.length > 0 && housingList.every((h) => h.evnTariffVNDPerKwh <= 3500) ? 'Гос. тариф' : 'Проверьте тариф'
    },
    {
      title: language === 'ru' ? 'Аудит шума и строек зафиксирован' : 'Noise audit verified',
      passed: housingList.length > 0 && housingList.every((h) => h.noiseAudit.status !== 'high_construction_risk' && h.noiseAudit.status !== 'construction_alert'),
      hint: 'Без строек'
    },
    {
      title: language === 'ru' ? 'Скорость интернета (>=100 Мбит/с)' : 'Fiber speed verified (>=100 Mbps)',
      passed: housingList.length > 0 && housingList.every((h) => h.fiberInternetSpeedMbps.download >= 100),
      hint: 'Оптоволокно'
    },
    {
      title: language === 'ru' ? 'Условия возврата залога проверены' : 'Deposit refund terms vetted',
      passed: housingList.length > 0 && housingList.every((h) => Boolean(h.depositTerms.refundConditions.ru)),
      hint: 'Зафиксировано'
    }
  ];
  const allQualityChecksPassed = qualityChecks.every((c) => c.passed);

  return (
    <section style={{ padding: '3rem 0 5rem 0', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Top Header */}
        <div className="glass-card glass-card-terracotta" style={{ marginBottom: '2rem', padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge badge-terracotta" style={{ marginBottom: '0.4rem' }}>
                <Settings size={14} /> {language === 'ru' ? 'Кабинет основателя • VietReloc' : 'Founder Workspace • VietReloc'}
              </div>
              <h1 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {language === 'ru' ? 'Управление клиентами и объектами' : 'Client Projects & Housing CMS'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
                {language === 'ru'
                  ? 'Здесь вы наполняете кабинет каждого клиента реальными проверенными квартирами, тарифами EVN и заметками. Данные появляются у клиента только после нажатия «Опубликовать».'
                  : 'Manage client questionnaires, vetted housing, EVN rates, and notes. Client sees updates only after you click "Publish".'}
              </p>
            </div>

            {savedNotice && (
              <div className="badge badge-emerald" style={{ padding: '0.65rem 1.1rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} /> {savedNotice}
              </div>
            )}
          </div>

          {/* Top Section Nav Switcher */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setAdminSection('relocation_clients')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: adminSection === 'relocation_clients' ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                background: adminSection === 'relocation_clients' ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                color: adminSection === 'relocation_clients' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
                boxShadow: adminSection === 'relocation_clients' ? '0 4px 12px rgba(194,94,32,0.12)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={16} />
              <span>{language === 'ru' ? 'Клиенты и квартиры (CMS)' : 'Client Projects & CMS'}</span>
              <span style={{
                background: adminSection === 'relocation_clients' ? 'var(--accent-terracotta)' : '#9CA3AF',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '1px 7px',
                borderRadius: '9999px'
              }}>
                {adminClients.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSection('schedule_calls')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: adminSection === 'schedule_calls' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: adminSection === 'schedule_calls' ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                color: adminSection === 'schedule_calls' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                boxShadow: adminSection === 'schedule_calls' ? '0 4px 12px rgba(15,118,110,0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Calendar size={16} />
              <span>{language === 'ru' ? 'Расписание и звонки ($50)' : 'Schedule & Calls ($50)'}</span>
              {consultationBookings.filter(b => b.status === 'confirmed').length > 0 && (
                <span style={{
                  background: 'var(--accent-emerald)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '1px 7px',
                  borderRadius: '9999px'
                }}>
                  {consultationBookings.filter(b => b.status === 'confirmed').length}
                </span>
              )}
            </button>
          </div>
        </div>

        {adminSection === 'schedule_calls' ? (
          <AdminScheduleView />
        ) : (
          <>
            {/* Folders Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => { setActiveFolder('active'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'active' ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'active' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'active' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'active' ? '0 4px 12px rgba(194,94,32,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <FolderCheck size={18} />
            <span>{language === 'ru' ? 'Активные клиенты' : 'Active Clients'}</span>
            <span style={{
              background: activeFolder === 'active' ? 'var(--accent-terracotta)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {activeCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveFolder('new'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'new' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'new' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'new' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'new' ? '0 4px 12px rgba(15,118,110,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <FolderPlus size={18} />
            <span>{language === 'ru' ? 'Новые заявки' : 'New Inquiries'}</span>
            <span style={{
              background: activeFolder === 'new' ? 'var(--accent-emerald)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {newCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveFolder('completed'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'completed' ? '2px solid var(--text-main)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'completed' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'completed' ? 'var(--text-main)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'completed' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Archive size={18} />
            <span>{language === 'ru' ? 'Архив / Завершенные' : 'Archive'}</span>
            <span style={{
              background: activeFolder === 'completed' ? 'var(--text-main)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {completedCount}
            </span>
          </button>
        </div>

        {/* Empty Folder Notice */}
        {currentFolderClients.length === 0 && (
          <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {language === 'ru' ? 'В этой папке сейчас нет клиентов' : 'No clients in this folder right now'}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {language === 'ru'
                ? 'Новые клиенты появятся здесь сразу после заполнения анкеты и оплаты.'
                : 'New client submissions will appear here automatically upon questionnaire payment.'}
            </p>
          </div>
        )}

        {/* 1. FOLDER: АКТИВНЫЕ КЛИЕНТЫ (с Quality Gate и CMS жилья) */}
        {activeFolder === 'active' && currentFolderClients.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.75rem', alignItems: 'start' }}>
            
            {/* Left: Active Clients List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'Выберите клиента:' : 'Select Client:'}
              </div>

              {currentFolderClients.map((client) => {
                const isSelected = selectedClient?.id === client.id;
                const housingCount = (client.verifiedHousing || []).length;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className="glass-card"
                    style={{
                      padding: '1.15rem 1.25rem',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                      background: isSelected ? '#FFFFFF' : 'var(--bg-panel)',
                      boxShadow: isSelected ? '0 4px 14px rgba(194,94,32,0.12)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{client.clientName}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>${client.priceUSD}</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {client.email}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        {client.recommendedCityId === 'danang' ? 'Дананг' : client.recommendedCityId === 'nhatrang' ? 'Нячанг' : client.recommendedCityId}
                      </span>
                      <span style={{ color: housingCount > 0 ? '#0F766E' : '#B45309', fontWeight: 600 }}>
                        {housingCount} {language === 'ru' ? 'квартир' : 'units'}
                      </span>
                    </div>

                    {client.hasUnpublishedChanges && (
                      <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                        &bull; {language === 'ru' ? 'Есть неопубликованные правки' : 'Unpublished changes'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Client CMS Workspace */}
            {selectedClient && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Client Profile Header Bar */}
                <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {language === 'ru' ? 'Активный проект:' : 'Active Project:'}
                    </div>
                    <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                      {selectedClient.clientName} &bull; {selectedClient.serviceName[language]}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsQuestionnaireModalOpen(true)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
                    >
                      <FileText size={15} /> {language === 'ru' ? 'Анкета' : 'Intake'}
                    </button>

                    <button
                      type="button"
                      onClick={() => moveClientCategory(selectedClient.id, 'completed')}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem', color: 'var(--text-main)' }}
                    >
                      <Archive size={15} /> {language === 'ru' ? 'В архив' : 'Archive'}
                    </button>
                  </div>
                </div>

                {selectedClient.tierId === 'tier2' ? (
                  <AdminTravelItineraryBuilder
                    selectedClient={selectedClient}
                    onPublishSuccess={() => {
                      setSavedNotice(language === 'ru' ? 'Маршрут успешно опубликован в кабинете клиента!' : 'Itinerary published live to client!');
                      setTimeout(() => setSavedNotice(null), 3500);
                    }}
                  />
                ) : (
                  <>
                    {/* Quality Gate & Publish Banner */}
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
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {allQualityChecksPassed
                        ? (language === 'ru' ? '✓ Quality Gate пройден: все 5 стандартов Due Diligence соблюдены.' : '✓ Quality Gate passed: All 5 Due Diligence standards verified.')
                        : (language === 'ru' ? `⚠ Quality Gate: пройдено ${qualityChecks.filter(c => c.passed).length} из 5 критериев (добавьте жилье, тариф EVN и аудит шума).` : `⚠ Quality Gate: ${qualityChecks.filter(c => c.passed).length}/5 passed.`)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      publishClientUpdates(selectedClient.id);
                      setSavedNotice(language === 'ru' ? 'Обновления опубликованы в кабинете клиента!' : 'Published live to client workspace!');
                      setTimeout(() => setSavedNotice(null), 3500);
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

                {/* Subtabs: [Проверенное жилье (CMS)] vs [Параметры плана & Бюджет] */}
                <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('housing')}
                    style={{
                      padding: '0.55rem 1.2rem',
                      borderRadius: 'var(--radius-sm)',
                      background: activeSubTab === 'housing' ? 'var(--accent-emerald)' : 'transparent',
                      color: activeSubTab === 'housing' ? '#FFFFFF' : 'var(--text-main)',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Home size={15} />
                    <span>{language === 'ru' ? `Проверенное жилье (${housingList.length})` : `Vetted Housing (${housingList.length})`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('plan')}
                    style={{
                      padding: '0.55rem 1.2rem',
                      borderRadius: 'var(--radius-sm)',
                      background: activeSubTab === 'plan' ? 'var(--accent-emerald)' : 'transparent',
                      color: activeSubTab === 'plan' ? '#FFFFFF' : 'var(--text-main)',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Sparkles size={15} />
                    <span>{language === 'ru' ? 'Статус, город и бюджет' : 'Plan & Budget Settings'}</span>
                  </button>
                </div>

                {/* SUBTAB 1: HOUSING CMS */}
                {activeSubTab === 'housing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        {language === 'ru'
                          ? 'Квартиры с реальным аудитом EVN, шума и залогов, подготовленные для этого клиента:'
                          : 'Apartments with real EVN rate, noise audit and deposit verification for this client:'}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAddHousingModalOpen(true)}
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Plus size={15} />
                        <span>{language === 'ru' ? 'Добавить квартиру' : 'Add Property'}</span>
                      </button>
                    </div>

                    {/* Housing Cards Grid */}
                    {housingList.length === 0 ? (
                      <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                        <Home size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                          {language === 'ru' ? 'Для этого клиента еще не добавлено проверенное жилье' : 'No vetted housing added yet'}
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                          {language === 'ru'
                            ? 'Нажмите «Добавить квартиру», чтобы внести проверенный ЖК с тарифом EVN, результатами замера шума и условиями возврата залога.'
                            : 'Click "Add Property" to input an audited condo with EVN meter tariff, noise notes and deposit clauses.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsAddHousingModalOpen(true)}
                          className="btn btn-primary"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
                        >
                          <Plus size={16} /> {language === 'ru' ? 'Добавить первую квартиру' : 'Add First Property'}
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {housingList.map((house) => (
                          <div
                            key={house.id}
                            className="glass-card"
                            style={{
                              padding: '1.25rem',
                              border: house.publishedToClient ? '1px solid var(--border-emerald)' : '1px dashed #F59E0B',
                              background: '#FFFFFF',
                              display: 'grid',
                              gridTemplateColumns: '120px 1fr auto',
                              gap: '1.25rem',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={house.photoUrls[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80'}
                              alt={house.condoName}
                              style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                                <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{house.condoName}</strong>
                                {house.isTopPick && (
                                  <span className="badge badge-terracotta" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>Top Pick</span>
                                )}
                                <span style={{ fontSize: '0.75rem', color: house.publishedToClient ? '#0F766E' : '#B45309', fontWeight: 600 }}>
                                  {house.publishedToClient ? '• Опубликовано' : '• Черновик'}
                                </span>
                              </div>

                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                                {house.district} &bull; <strong>${house.monthlyPriceUSD}/мес</strong> ({house.monthlyPriceVND.toLocaleString('ru-RU')} ₫)
                              </div>

                              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.76rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#0F766E', fontWeight: 600, background: '#E6F4F1', padding: '2px 7px', borderRadius: '4px' }}>
                                  <Zap size={12} /> {house.evnTariffVNDPerKwh} ₫/кВт EVN
                                </span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#0369A1', fontWeight: 600, background: '#E0F2FE', padding: '2px 7px', borderRadius: '4px' }}>
                                  <Wifi size={12} /> {house.fiberInternetSpeedMbps.download} Мбит/с {house.fiberInternetSpeedMbps.provider}
                                </span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#15803D', fontWeight: 600, background: '#DCFCE7', padding: '2px 7px', borderRadius: '4px' }}>
                                  <Volume2 size={12} /> {house.noiseAudit.status === 'verified_quiet' ? 'Тихий двор' : 'Приемлемый шум'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <button
                                type="button"
                                onClick={() => deleteVerifiedHousing(selectedClient.id, house.id)}
                                className="btn btn-secondary"
                                style={{ color: '#DC2626', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                                title="Удалить"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 2: PLAN & BUDGET FORM */}
                {activeSubTab === 'plan' && (
                  <form onSubmit={handleSaveClientPlan} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-terracotta)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                      <Sparkles size={18} />
                      <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: 0 }}>
                        {language === 'ru' ? 'Параметры плана для личного кабинета клиента' : 'Workspace Plan Parameters for Client'}
                      </h3>
                    </div>

                    {/* Status & City Selection */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                          {language === 'ru' ? 'Статус готовности проекта:' : 'Project Status:'}
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                        >
                          <option value="questionnaire_completed">Анкета получена и оплачена (зал ожидания)</option>
                          <option value="research_in_progress">Исследование основателем в процессе</option>
                          <option value="plan_ready">План опубликован и готов к просмотру</option>
                          <option value="in_progress">Активное сопровождение переезда</option>
                          <option value="completed">Проект завершен</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                          {language === 'ru' ? 'Рекомендованный город:' : 'Recommended City:'}
                        </label>
                        <select
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                        >
                          <option value="danang">Дананг (Da Nang) — Пляж, серфинг, IT-комьюнити</option>
                          <option value="nhatrang">Нячанг (Nha Trang) — Теплое море круглый год, сервис</option>
                          <option value="hoian">Хойан (Hoi An) — Исторический шарм, зелень, тишина</option>
                          <option value="saigon">Хошимин (Saigon) — Мегаполис, бизнес, коворкинги</option>
                          <option value="hanoi">Ханой (Hanoi) — Культура, старый квартал, озера</option>
                        </select>
                      </div>
                    </div>

                    {/* Why this city for client */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {language === 'ru' ? 'Обоснование выбора города для клиента:' : 'Reason Why This City:'}
                      </label>
                      <textarea
                        rows={2}
                        value={editWhyRu}
                        onChange={(e) => setEditWhyRu(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'inherit' }}
                      />
                    </div>

                    {/* Overall Founder Note for Client */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {language === 'ru' ? 'Персональная заметка основателя (отображается в кабинете):' : 'Overall Founder Note for Client Workspace:'}
                      </label>
                      <textarea
                        rows={3}
                        value={editNoteRu}
                        onChange={(e) => setEditNoteRu(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'inherit' }}
                      />
                    </div>

                    {/* Budget Allocation Adjustment */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        {language === 'ru' ? 'Рекомендуемый бюджет ($ USD/мес):' : 'Adjust Monthly Budget Breakdown ($ USD):'}
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Жилье ($)</span>
                          <input
                            type="number"
                            value={editBudget.accommodation}
                            onChange={(e) => setEditBudget({ ...editBudget, accommodation: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Еда ($)</span>
                          <input
                            type="number"
                            value={editBudget.food}
                            onChange={(e) => setEditBudget({ ...editBudget, food: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Коворкинг ($)</span>
                          <input
                            type="number"
                            value={editBudget.coworking}
                            onChange={(e) => setEditBudget({ ...editBudget, coworking: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Байк / Grab ($)</span>
                          <input
                            type="number"
                            value={editBudget.transportation}
                            onChange={(e) => setEditBudget({ ...editBudget, transportation: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Досуг ($)</span>
                          <input
                            type="number"
                            value={editBudget.entertainment}
                            onChange={(e) => setEditBudget({ ...editBudget, entertainment: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
                      >
                        <Save size={18} /> {language === 'ru' ? 'Сохранить черновик параметров' : 'Save Draft Parameters'}
                      </button>
                    </div>

                  </form>
                )}
                  </>
                )}

              </div>
            )}

          </div>
        )}

        {/* 2. FOLDER: НОВЫЕ КЛИЕНТЫ */}
        {activeFolder === 'new' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Клиенты, которые только что оплатили тариф и ждут первый аудит жилья (SLA 48 часов):'
                : 'Clients who just paid and are in the waiting room for their vetted shortlist (48h SLA):'}
            </div>

            {currentFolderClients.map((client) => (
              <div
                key={client.id}
                className="glass-card glass-card-emerald"
                style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {client.clientName}
                    </h3>
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      ${client.priceUSD} &bull; {client.serviceName[language]}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                      Оплачено через {client.paymentMethod || 'шлюз'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span><strong>Email:</strong> {client.email}</span>
                    <span><strong>Страна:</strong> {client.questionnaire.country}</span>
                    <span><strong>Приезд:</strong> {client.questionnaire.travelDates} ({client.questionnaire.duration})</span>
                    <span><strong>Бюджет:</strong> ${client.questionnaire.monthlyBudgetUSD}/мес</span>
                  </div>

                  <div style={{ marginTop: '0.65rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                    <strong>Приоритеты:</strong> {client.questionnaire.priorities || 'Не указаны'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setSelectedClientId(client.id); setIsQuestionnaireModalOpen(true); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                  >
                    <Eye size={15} /> {language === 'ru' ? 'Смотреть анкету' : 'View Full Intake'}
                  </button>

                  <button
                    onClick={() => {
                      moveClientCategory(client.id, 'active');
                      setSelectedClientId(client.id);
                      setActiveFolder('active');
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1.25rem' }}
                  >
                    <FolderCheck size={16} /> {language === 'ru' ? 'Взять в работу → В активные' : 'Take to Active'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. FOLDER: ЗАВЕРШЕННЫЕ КЛИЕНТЫ */}
        {activeFolder === 'completed' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Архив клиентов, которые успешно завершили поездку или релокацию:'
                : 'Archive of clients who completed their journey:'}
            </div>

            {currentFolderClients.map((client) => (
              <div
                key={client.id}
                className="glass-card"
                style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', background: '#FAF9F6' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {client.clientName}
                    </h3>
                    <span className="badge badge-subtle" style={{ fontSize: '0.75rem' }}>
                      {language === 'ru' ? 'Проект завершен' : 'Completed'} &bull; {client.serviceName[language]}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span><strong>Email:</strong> {client.email}</span>
                    <span><strong>Город:</strong> {client.recommendedCityId === 'danang' ? 'Дананг' : client.recommendedCityId}</span>
                    <span><strong>Дата:</strong> {client.updatedAt}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setSelectedClientId(client.id); setIsQuestionnaireModalOpen(true); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                  >
                    <Eye size={15} /> {language === 'ru' ? 'Анкета' : 'Intake'}
                  </button>

                  <button
                    onClick={() => {
                      moveClientCategory(client.id, 'active');
                      setSelectedClientId(client.id);
                      setActiveFolder('active');
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem', color: 'var(--accent-terracotta)' }}
                  >
                    <RotateCcw size={15} /> {language === 'ru' ? 'Вернуть в активные' : 'Reactivate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
          </>
        )}

        {/* Modal: Add Verified Housing Form */}
        {isAddHousingModalOpen && selectedClient && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(19, 37, 34, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1150,
            padding: '1.5rem',
            overflowY: 'auto'
          }}>
            <div className="glass-card" style={{
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#FAF8F5',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              padding: '2rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
                  <Home size={22} />
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
                    {language === 'ru' ? 'Добавить проверенную квартиру для клиента' : 'Add Vetted Property'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddHousingModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  Закрыть
                </button>
              </div>

              <form onSubmit={handleCreateHousing} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Название жилого комплекса (ЖК / Кондоминиум):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например: Hiyori Garden Tower или Monarchy Block B"
                      value={newCondoName}
                      onChange={(e) => setNewCondoName(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Город:
                    </label>
                    <select
                      value={newCityId}
                      onChange={(e) => setNewCityId(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
                    >
                      <option value="danang">Дананг</option>
                      <option value="nhatrang">Нячанг</option>
                      <option value="hoian">Хойан</option>
                      <option value="saigon">Хошимин</option>
                      <option value="hanoi">Ханой</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Район:
                    </label>
                    <input
                      type="text"
                      placeholder="Например: My An / Son Tra"
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Адрес / ориентир до моря:
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Vo Van Kiet (450м до пляжа)"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Аренда в месяц ($ USD):
                    </label>
                    <input
                      type="number"
                      value={newPriceUSD}
                      onChange={(e) => {
                        const usd = Number(e.target.value);
                        setNewPriceUSD(usd);
                        setNewPriceVND(usd * 25000);
                      }}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                      Аренда в VND (донг):
                    </label>
                    <input
                      type="number"
                      value={newPriceVND}
                      onChange={(e) => setNewPriceVND(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    />
                  </div>
                </div>

                {/* Due Diligence Fields: EVN, Noise, Speed, Deposit */}
                <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-emerald)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={16} /> Стандарты проверки Due Diligence:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Тариф за свет EVN (₫/кВт·ч):
                      </label>
                      <input
                        type="number"
                        value={newEvnTariff}
                        onChange={(e) => setNewEvnTariff(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                      <span style={{ fontSize: '0.7rem', color: newEvnTariff <= 3500 ? '#15803D' : '#DC2626' }}>
                        {newEvnTariff <= 3500 ? '✓ Государственный тариф' : '⚠ Завышенный коммерческий тариф'}
                      </span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Прямой счетчик EVN:
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', marginTop: '4px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={newIsDirectEvn}
                          onChange={(e) => setNewIsDirectEvn(e.target.checked)}
                          style={{ accentColor: 'var(--accent-emerald)' }}
                        />
                        <span>Прямой гос. счетчик (без наценки)</span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Аудит шума и строек:
                      </label>
                      <select
                        value={newNoiseStatus}
                        onChange={(e) => setNewNoiseStatus(e.target.value as NoiseAuditStatus)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
                      >
                        <option value="verified_quiet">Проверено: тихий двор, без строек</option>
                        <option value="acceptable_minor_traffic">Умеренный шум улицы</option>
                        <option value="minor_renovation_nearby">Мелкий ремонт у соседей</option>
                        <option value="high_construction_risk">Высокий риск стройки</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Заметки по шуму:
                      </label>
                      <input
                        type="text"
                        value={newNoiseNotes}
                        onChange={(e) => setNewNoiseNotes(e.target.value)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Download (Мбит/с):
                      </label>
                      <input
                        type="number"
                        value={newFiberDownload}
                        onChange={(e) => setNewFiberDownload(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Upload (Мбит/с):
                      </label>
                      <input
                        type="number"
                        value={newFiberUpload}
                        onChange={(e) => setNewFiberUpload(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Провайдер:
                      </label>
                      <select
                        value={newFiberProvider}
                        onChange={(e) => setNewFiberProvider(e.target.value as any)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: '#FFFFFF' }}
                      >
                        <option value="Viettel">Viettel</option>
                        <option value="VNPT">VNPT</option>
                        <option value="FPT">FPT Telecom</option>
                        <option value="Other">Другой</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Залог (месяцев):
                      </label>
                      <input
                        type="number"
                        value={newDepositMonths}
                        onChange={(e) => setNewDepositMonths(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Условия возврата депозита:
                      </label>
                      <input
                        type="text"
                        value={newDepositCondition}
                        onChange={(e) => setNewDepositCondition(e.target.value)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Имя риелтора / управляющего:
                      </label>
                      <input
                        type="text"
                        value={newRealtorName}
                        onChange={(e) => setNewRealtorName(e.target.value)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                        Zalo / Телефон риелтора:
                      </label>
                      <input
                        type="text"
                        value={newRealtorZalo}
                        onChange={(e) => setNewRealtorZalo(e.target.value)}
                        style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                    Ссылка на фото апартаментов:
                  </label>
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                    Вердикт и комментарий основателя:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Личные впечатления: шумоизоляция, напор воды, вид из окна, кондиционер..."
                    value={newFounderReview}
                    onChange={(e) => setNewFounderReview(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsAddHousingModalOpen(false)}
                    className="btn btn-secondary"
                    style={{ padding: '0.65rem 1.2rem', fontSize: '0.88rem' }}
                  >
                    Отмена
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.88rem' }}
                  >
                    <Check size={16} /> Сохранить квартиру
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Modal: Full Questionnaire Details Review */}
        {isQuestionnaireModalOpen && selectedClient && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(19, 37, 34, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1.5rem'
          }}>
            <div className="glass-card" style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#FFFFFF',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              padding: '2.5rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div>
                  <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
                    {selectedClient.serviceName[language]} (${selectedClient.priceUSD})
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    {language === 'ru' ? 'Анкета клиента:' : 'Client Intake:'} {selectedClient.clientName}
                  </h2>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {selectedClient.email} &bull; {selectedClient.createdAt}
                  </div>
                </div>

                <button
                  onClick={() => setIsQuestionnaireModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                >
                  {language === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>

              {/* Detailed Questionnaire Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Страна проживания</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.country || 'Не указана'}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Даты и длительность</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.travelDates} ({selectedClient.questionnaire.duration})</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Бюджет в месяц</div>
                  <strong style={{ color: 'var(--accent-emerald)' }}>${selectedClient.questionnaire.monthlyBudgetUSD} USD</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Количество человек</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.travelersCount}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Формат работы и специализация</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.workSituation}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Пожелания по жилью</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.accommodationType}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Требования к интернету / коворкингам</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.remoteWorkNeeds}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Главные приоритеты</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.priorities}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Вопросы и беспокойства</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.concerns}</div>
                </div>
              </div>

              {/* Action in Modal */}
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setIsQuestionnaireModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
                >
                  {language === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
