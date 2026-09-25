import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardCityView } from './dashboard/DashboardCityView';
import { DashboardNeighborhoodsView } from './dashboard/DashboardNeighborhoodsView';
import { DashboardBudgetView } from './dashboard/DashboardBudgetView';
import { DashboardRoadmapView } from './dashboard/DashboardRoadmapView';
import { DashboardResourcesView } from './dashboard/DashboardResourcesView';
import { LockedFeatureCard } from './dashboard/LockedFeatureCard';
import { WaitingForPlanView } from './dashboard/WaitingForPlanView';
import { DashboardItineraryView } from './dashboard/DashboardItineraryView';
import { DashboardTravelTransitView } from './dashboard/DashboardTravelTransitView';
import { DashboardSimConnectivityView } from './dashboard/DashboardSimConnectivityView';
import { DashboardEmergencySosView } from './dashboard/DashboardEmergencySosView';
import { DashboardHousingView } from './dashboard/DashboardHousingView';
import { DashboardRealtorView } from './dashboard/DashboardRealtorView';
import { DashboardLeaseAuditView } from './dashboard/DashboardLeaseAuditView';
import { DashboardVipConciergeView } from './dashboard/DashboardVipConciergeView';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  DollarSign,
  Calendar,
  BookOpen,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  ShieldCheck,
  Crown,
  Send,
  Printer,
  Home,
  Users
} from 'lucide-react';

interface ClientDashboardProps {
  isPreviewMode?: boolean;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ isPreviewMode = false }) => {
  const { project, setProject, setAdminClients, t, language, upgradeToRelocation, setViewMode } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'city' | 'neighborhoods' | 'budget' | 'roadmap' | 'housing' | 'resources' | 'realtor' | 'lease_audit' | 'vip_concierge' | 'itinerary'>('overview');
  const [travelTab, setTravelTab] = useState<'itinerary' | 'transit' | 'sim' | 'emergency'>('itinerary');
  const isVipTier = project.tierId === 'tier4';
  const isRelocationTier = project.tierId === 'tier3' || project.tierId === 'tier4';
  const isTravelPlan = project.tierId === 'tier2';
  const hasTravelPlan = isRelocationTier || Boolean(project.hasTravelPlan || project.tierId === 'tier2' || (project.travelDays && project.travelDays.length > 0));
  
  const isRelocationPlanPublished = isRelocationTier
    ? (project.isRelocationPlanPublished === true || (project.status === 'plan_ready' && !project.upgradedFromTier))
    : true;

  // Bespoke plan recommendations are only available once founder publishes the plan
  const isPlanPublished = isRelocationTier
    ? isRelocationPlanPublished
    : (project.status === 'plan_ready' || project.status === 'in_progress' || project.status === 'completed');

  // Automatically transition status from 'plan_ready' to 'in_progress' ("План активен и изучается") upon client viewing
  useEffect(() => {
    if (isPreviewMode) return;
    if (project.status === 'plan_ready') {
      setProject((prev) => {
        const updated = {
          ...prev,
          status: 'in_progress' as const,
          progressPercent: 90
        };
        try {
          localStorage.setItem('indochine_client_project', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      setAdminClients((prev) => {
        const updated = prev.map((c) =>
          c.id === project.id || c.email.toLowerCase() === project.email.toLowerCase()
            ? { ...c, status: 'in_progress' as const }
            : c
        );
        try {
          localStorage.setItem('indochine_all_clients', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [project.status, project.id, project.email, setProject, setAdminClients]);

  return (
    <section className="client-dashboard-bg" style={{ padding: '2rem 0 5rem 0' }}>
      <div className="client-dashboard-content container">
        
        {/* Return to Home / Pricing for seamless UX navigation */}
        {!isPreviewMode && (
          <div className="no-print" style={{ marginBottom: '1.25rem' }}>
            <button
              onClick={() => setViewMode('marketing')}
              className="glass-button"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.84rem',
                color: 'var(--text-main)',
                gap: '0.35rem'
              }}
            >
              ← {language === 'ru' ? 'Назад на главную к тарифам' : 'Back to Home / Pricing'}
            </button>
          </div>
        )}

        {/* Workspace Top Header & Status Tracker */}
        <div className="no-print">
          <DashboardHeader />
        </div>

        {isTravelPlan ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Travel Navigation Bar (Frosted Floating Dock) */}
            <div className="dash-nav-bar no-print">
              {[
                {
                  id: 'itinerary',
                  label: language === 'ru' ? 'Маршрут (1–30 дней)' : 'Itinerary (1–30 Days)',
                  icon: Compass,
                  isPending: !isPlanPublished
                },
                { id: 'transit', label: language === 'ru' ? 'Города и Логистика' : 'Cities & Transit', icon: MapPin },
                { id: 'sim', label: language === 'ru' ? 'Связь и SIM / eSIM' : 'SIM & Connectivity', icon: Sparkles },
                { id: 'emergency', label: language === 'ru' ? 'SOS & Госпитали' : 'SOS & Hospitals', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = travelTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTravelTab(tab.id as any)}
                    className={`dash-nav-tab ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                    {(tab as any).isPending && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                          marginLeft: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.45rem',
                          borderRadius: '9999px',
                          background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(245, 158, 11, 0.15)',
                          color: isActive ? '#FFFFFF' : '#B45309'
                        }}
                      >
                        <Clock size={10} />
                        {language === 'ru' ? 'В подготовке' : 'In prep'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Travel Tab Content Panels */}
            {travelTab === 'itinerary' && (
              !isPlanPublished ? <WaitingForPlanView /> : <DashboardItineraryView />
            )}
            {travelTab === 'transit' && <DashboardTravelTransitView />}
            {travelTab === 'sim' && <DashboardSimConnectivityView />}
            {travelTab === 'emergency' && <DashboardEmergencySosView />}
          </div>
        ) : (
          <>
            {/* Relocation Dashboard Navigation Bar (Frosted Floating Dock) */}
            <div className="dash-nav-bar no-print">
          {[
            {
              id: 'overview',
              label: !isPlanPublished && language === 'ru' ? 'Статус исследования и Вьетнам' : t('dashTabOverview'),
              icon: LayoutDashboard
            },
            ...(hasTravelPlan ? [
              {
                id: 'itinerary',
                label: language === 'ru'
                  ? (isRelocationTier ? 'Маршрут (14 дней)' : 'Маршрут')
                  : (isRelocationTier ? 'Itinerary (14 Days)' : 'Itinerary'),
                icon: Compass,
                isPending: !isPlanPublished
              }
            ] : []),
            { id: 'budget', label: t('dashTabBudget'), icon: DollarSign, isPending: !isPlanPublished },
            { id: 'housing', label: language === 'ru' ? 'Жильё' : 'Housing', icon: Home, isPending: !isPlanPublished },
            { id: 'realtor', label: language === 'ru' ? 'Риелтор' : 'Realtor', icon: Users, isPending: !isPlanPublished },
            { id: 'lease_audit', label: language === 'ru' ? 'Аудит договора' : 'Lease Audit', icon: ShieldCheck, isPending: !isPlanPublished },
            { id: 'roadmap', label: language === 'ru' ? 'Документы и визы' : 'Documents & Visas', icon: Calendar, isPending: !isPlanPublished },
            { id: 'city', label: language === 'ru' ? 'Город и районы' : 'City & Districts', icon: MapPin, isPending: !isPlanPublished },
            { id: 'resources', label: t('dashTabResources'), icon: BookOpen },
            ...(isVipTier ? [
              {
                id: 'vip_concierge',
                label: language === 'ru' ? 'VIP-сопровождение' : 'VIP Concierge',
                icon: Crown,
                isPending: !isPlanPublished,
                isVipBadge: true
              }
            ] : [])
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`dash-nav-tab ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {(tab as any).isVipBadge && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                      marginLeft: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#FEF3C7',
                      color: isActive ? '#FFFFFF' : '#B45309',
                      padding: '2px 6px',
                      borderRadius: '9999px'
                    }}
                  >
                    VIP
                  </span>
                )}
                {(tab as any).isRestricted && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginLeft: '4px',
                      color: isActive ? '#FFFFFF' : 'var(--accent-terracotta)',
                      opacity: isActive ? 0.95 : 0.85
                    }}
                    title={language === 'ru' ? 'Начинается с тарифа Релокация ($490)' : 'Starts in Relocation plan ($490)'}
                  >
                    <Lock size={13} />
                  </span>
                )}
                {tab.isPending && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      marginLeft: '3px',
                      fontSize: '0.7rem',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(194,94,32,0.1)',
                      color: isActive ? '#FFFFFF' : 'var(--accent-terracotta)',
                      padding: '2px 6px',
                      borderRadius: '9999px'
                    }}
                    title={language === 'ru' ? 'Founder проводит исследование' : 'Under founder research'}
                  >
                    <Clock size={11} /> {language === 'ru' ? 'В процессе' : 'Pending'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        {activeTab === 'overview' && (
          !isPlanPublished ? (
            <WaitingForPlanView />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Scheduled Consultation Card (if booked via $50 express tier) */}
            {project.consultationBooking && (
              <div className="glass-card glass-card-emerald" style={{ border: '2px solid var(--accent-emerald)', background: '#F2FBF7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={14} /> {t('expressStatusConfirmed')}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      {t('expressConsultationBookedTitle')}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      {t('expressPlatformNote')}
                    </p>
                  </div>

                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-emerald)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1.25rem',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {t('expressScheduledFor')}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                      {project.consultationBooking.bookingDate} &bull; {project.consultationBooking.bookingTime}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <strong>{t('expressMeetingPlatformLabel')}:</strong> {project.consultationBooking.meetingPlatform}
                  </div>
                  <div>
                    <strong>{language === 'ru' ? 'Контакт:' : 'Contact:'}</strong> {project.consultationBooking.messenger}
                  </div>
                  <div>
                    <strong>{language === 'ru' ? 'Тема:' : 'Topic:'}</strong> {project.consultationBooking.topic}
                  </div>
                </div>
              </div>
            )}

            {/* Overall Founder Note or Travel Plan Note */}
            {isTravelPlan ? (
              <div className="glass-card glass-card-terracotta" style={{ border: '2px dashed var(--accent-terracotta)', background: '#FFFDFB' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-terracotta)', fontWeight: 700 }}>
                    <Lock size={18} /> {language === 'ru' ? 'Персональные заметки и сопровождение Founder' : 'Founder Notes & Relocation Advisory'}
                  </div>
                  <div className="badge badge-terracotta">
                    {language === 'ru' ? 'Тариф: Поездка ($290)' : 'Plan: Travel ($290)'}
                  </div>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                  {language === 'ru'
                    ? 'Индивидуальный подбор городов и районов, интерактивный калькулятор бюджета, пошаговая дорожная карта с чек-листом, база проверенных ресурсов и гайд по жилью, а также персональные заметки и сопровождение Founder начинаются с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                    : 'City & neighborhood selection, cost modeler, relocation roadmap checklist, verified resources, and founder notes start from Vietnam Relocation Planning ($490) and Concierge ($890).'}
                </p>
                <button
                  onClick={upgradeToRelocation}
                  className="glass-button active"
                  style={{
                    fontSize: '0.86rem',
                    padding: '0.55rem 1.15rem',
                    gap: '0.4rem',
                    background: 'var(--accent-terracotta)'
                  }}
                >
                  <Sparkles size={15} /> {language === 'ru' ? 'Улучшить тариф до Релокации (+ $200) →' : 'Upgrade to Relocation (+ $200) →'}
                </button>
              </div>
            ) : (
              <div className="glass-card glass-card-terracotta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-terracotta)', fontWeight: 700, marginBottom: '0.6rem' }}>
                  <MessageSquare size={18} /> {t('dashFounderNoteHeader')}
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  “{project.overallFounderNote[language]}”
                </p>
              </div>
            )}

            {/* Preserved Author Travel Itinerary Card on Upgrade */}
            {hasTravelPlan && isPlanPublished && (
              <div className="glass-card" style={{
                padding: '1.5rem 1.75rem',
                background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
                border: '1.5px solid var(--accent-emerald)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ maxWidth: '620px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    <Compass size={16} />
                    <span>{language === 'ru' ? 'Ваш авторский маршрут сохранен' : 'Your Itinerary is Preserved'}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                    {language === 'ru' ? 'Персональный авторский маршрут по Вьетнаму' : 'Curated Vietnam Travel Itinerary'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {language === 'ru'
                      ? 'Ваш 14-дневный маршрут с проверенными локациями, логистикой и рекомендациями по слотам Утро/День/Вечер сохранен после перехода на расширенный тариф. Доступен онлайн и для печати в PDF.'
                      : 'Your curated travel itinerary with vetted spots and pro-tips is preserved and ready for viewing and A4 PDF export.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('itinerary')}
                    className="glass-button active"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1.15rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Compass size={15} />
                    <span>{language === 'ru' ? 'Открыть маршрут' : 'Open Itinerary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="glass-button"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1.15rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}
                  >
                    <Printer size={15} />
                    <span>{language === 'ru' ? 'Печать A4 (PDF)' : 'Print A4 (PDF)'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Overview Quick Widgets Grid */}
            <div className="grid-3">
              
              {/* Recommended City Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--dash-bg-card-subtle)' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--accent-terracotta)' }}>
                        <Lock size={15} />
                        <span>{language === 'ru' ? 'Город и районы' : 'City Matching'}</span>
                      </div>
                      <button onClick={() => setActiveTab('city')} className="dash-action-pill">
                        {language === 'ru' ? 'Апгрейд' : 'Upgrade'} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                      {language === 'ru' ? 'Начинается с тарифа Релокация' : 'Starts in Relocation Plan'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--dash-text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Индивидуальный подбор города и микрорайонов под ваши цели входит в тариф от $490.' : 'Bespoke city and neighborhood matching is included in packages from $490.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--dash-accent-emerald)' }}>
                        <MapPin size={15} />
                        <span>{t('widgetDestTitle')}</span>
                      </div>
                      <button onClick={() => setActiveTab('city')} className="dash-action-pill">
                        {t('widgetDestBtn')} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--dash-text-main)' }}>
                      {language === 'ru' ? 'Дананг, Вьетнам' : 'Da Nang, Vietnam'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--dash-text-muted)' }}>
                      {t('widgetDestDesc')}
                    </p>
                  </div>
                </div>
              )}

              {/* Monthly Budget Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--dash-bg-card-subtle)' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--accent-terracotta)' }}>
                        <Lock size={15} />
                        <span>{t('widgetBudgetTitle')}</span>
                      </div>
                      <button onClick={() => setActiveTab('budget')} className="dash-action-pill">
                        {language === 'ru' ? 'Апгрейд' : 'Upgrade'} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                      {language === 'ru' ? 'Калькулятор бюджета' : 'Cost of Living Modeler'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--dash-text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Интерактивное моделирование расходов входит в тариф «Планирование релокации» ($490).' : 'Included in Vietnam Relocation Planning ($490).'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--dash-accent-emerald)' }}>
                        <DollarSign size={15} />
                        <span>{t('widgetBudgetTitle')}</span>
                      </div>
                      <button onClick={() => setActiveTab('budget')} className="dash-action-pill">
                        {t('widgetBudgetBtn')} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--dash-text-main)' }}>
                      ${project.userCurrentBudget.accommodation + project.userCurrentBudget.food + project.userCurrentBudget.coworking + project.userCurrentBudget.transportation + project.userCurrentBudget.entertainment} {language === 'ru' ? '/ мес' : '/ mo'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--dash-text-muted)' }}>
                      {t('widgetBudgetRent')}: ${project.userCurrentBudget.accommodation} &bull; {t('widgetBudgetFood')}: ${project.userCurrentBudget.food} &bull; {t('widgetBudgetWork')}: ${project.userCurrentBudget.coworking}
                    </p>
                  </div>
                </div>
              )}

              {/* Roadmap Progress Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--dash-bg-card-subtle)' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--accent-terracotta)' }}>
                        <Lock size={15} />
                        <span>{t('widgetRoadmapTitle')}</span>
                      </div>
                      <button onClick={() => setActiveTab('roadmap')} className="dash-action-pill">
                        {language === 'ru' ? 'Апгрейд' : 'Upgrade'} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--dash-text-main)' }}>
                      {language === 'ru' ? 'Дорожная карта релокации' : 'Relocation Roadmap'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--dash-text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Пошаговый чек-лист подготовки доступен в тарифе «Планирование релокации» ($490).' : 'Step-by-step checklist is included in Relocation package ($490).'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="dash-card-header">
                      <div className="dash-card-title" style={{ fontSize: '0.92rem', color: 'var(--dash-accent-emerald)' }}>
                        <Calendar size={15} />
                        <span>{t('widgetRoadmapTitle')}</span>
                      </div>
                      <button onClick={() => setActiveTab('roadmap')} className="dash-action-pill">
                        {t('widgetRoadmapBtn')} <ArrowRight size={12} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', fontFamily: 'var(--font-sans)', fontWeight: 800, color: 'var(--dash-text-main)' }}>
                      {project.roadmapTasks.filter(t => t.completed).length} / {project.roadmapTasks.length} {t('widgetRoadmapTasks')}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--dash-text-muted)' }}>
                      {t('widgetRoadmapPhase1')} {project.roadmapTasks.filter(t => t.phase === 'before_arrival' && t.completed).length}/5 {t('widgetRoadmapCompleted')}.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Navigation Links to Core Relocation Modules (Задача 4) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.85rem',
              marginTop: '1.5rem'
            }}>
              {/* Housing Link */}
              <button
                type="button"
                onClick={() => setActiveTab('housing')}
                className="dash-inner-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '0.9rem' }}>
                  <Home size={17} color="var(--dash-accent-emerald)" />
                  <span>{language === 'ru' ? 'Жильё и риелтор' : 'Housing & Realtor'}</span>
                </div>
                <ArrowRight size={15} color="var(--dash-text-muted)" />
              </button>

              {/* Lease Audit Link */}
              <button
                type="button"
                onClick={() => setActiveTab('lease_audit')}
                className="dash-inner-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--dash-text-main)', fontWeight: 600, fontSize: '0.9rem' }}>
                  <ShieldCheck size={17} color="var(--accent-terracotta)" />
                  <span>{language === 'ru' ? 'Аудит договора' : 'Lease Audit'}</span>
                </div>
                <ArrowRight size={15} color="var(--dash-text-muted)" />
              </button>

              {/* VIP Concierge Link (tier4 only) */}
              {isVipTier && (
                <button
                  type="button"
                  onClick={() => setActiveTab('vip_concierge')}
                  className="dash-inner-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: '#FFFDF0',
                    borderColor: 'rgba(252, 211, 77, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#B45309', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Crown size={17} color="#B45309" />
                    <span>{language === 'ru' ? 'VIP Консьерж & Психолог' : 'VIP Concierge & Psychologist'}</span>
                  </div>
                  <ArrowRight size={15} color="#B45309" />
                </button>
              )}

              {/* 30-Day Accompaniment Link (tier4 only) */}
              {isVipTier && (
                <a
                  href="https://t.me/Likqwerty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dash-inner-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    background: '#F0FDF4',
                    borderColor: 'rgba(15, 118, 110, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#0F766E', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Send size={17} color="#0F766E" />
                    <span>{language === 'ru' ? 'Личное сопровождение' : 'Personal Accompaniment'}</span>
                  </div>
                  <ArrowRight size={15} color="#0F766E" />
                </a>
              )}
            </div>

          </div>
          )
        )}

        {activeTab === 'city' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Индивидуальный подбор городов и районов' : 'Bespoke City & Neighborhood Selection'}
              desc={language === 'ru'
                ? 'Индивидуальный подбор города, районов и пляжей под ваш ритм жизни и формат работы начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Personalized city and neighborhood matching starts from the Vietnam Relocation Planning ($490) and Concierge ($890) packages.'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardCityView />
          )
        )}
        {activeTab === 'neighborhoods' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Индивидуальный подбор городов и районов' : 'Bespoke City & Neighborhood Selection'}
              desc={language === 'ru'
                ? 'Детальный разбор микрорайонов, сравнение уровня шума, оптоволокна и близости к пляжу начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Micro-neighborhood breakdown and beach suitability analysis starts from the Vietnam Relocation Planning ($490) and Concierge ($890) packages.'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardNeighborhoodsView />
          )
        )}
        {activeTab === 'budget' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Интерактивный калькулятор бюджета и сценариев' : 'Interactive Budget & Scenario Modeler'}
              desc={language === 'ru'
                ? 'Интерактивое моделирование расходов на жизнь (аренда жилья, байк, питание, коворкинги, страховка и сценарии Solo / Пара) начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Monthly cost modeling (housing, bike, food, coworking, insurance, and Solo / Couple scenarios) is included in "Vietnam Relocation Planning" ($490) and "Concierge" ($890).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardBudgetView />
          )
        )}
        {activeTab === 'roadmap' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Пошаговая дорожная карта с чек-листом' : 'Step-by-Step Roadmap & Checklist'}
              desc={language === 'ru'
                ? 'Пошаговый интерактивный чек-лист подготовки (до вылета, первые 7 дней, долгосрочное обустройство, визовые продления) начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Interactive relocation checklist (before departure, first 7 days, long-term setup, visa renewals) is included in "Vietnam Relocation Planning" ($490) and "Concierge" ($890).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardRoadmapView />
          )
        )}
        {activeTab === 'lease_audit' && (
          <DashboardLeaseAuditView />
        )}
        {activeTab === 'vip_concierge' && (
          isVipTier ? <DashboardVipConciergeView /> : null
        )}
        {activeTab === 'housing' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'База проверенных ресурсов и гайд по жилью' : 'Verified Resources & Housing Guide'}
              desc={language === 'ru'
                ? 'Детальный гайд по поиску жилья, проверка договоров аренды, стандарты депозитов и вопросы арендодателям начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Remote housing search guidance, lease contract red flags, and deposit standards start from the Relocation package ($490).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardHousingView />
          )
        )}
        {activeTab === 'realtor' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Проверенный партнер-риелтор во Вьетнаме' : 'Vetted Local Partner Realtor'}
              desc={language === 'ru'
                ? 'Прямой контакт с проверенным партнером-риелтором, видеообзоры квартир и сопровождение на показах доступны в тарифах релокации ($490 / $890).'
                : 'Direct connection with a vetted partner realtor is included in Relocation packages ($490 / $890).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardRealtorView />
          )
        )}
        {activeTab === 'resources' && (
          <DashboardResourcesView />
        )}
        {activeTab === 'itinerary' && (
          <DashboardItineraryView />
        )}
          </>
        )}

        {/* Persistent A4 Print Mount for Itinerary from any tab */}
        {hasTravelPlan && (
          <div className="itinerary-print-mount">
            <DashboardItineraryView printOnly={true} />
          </div>
        )}

      </div>
    </section>
  );
};
