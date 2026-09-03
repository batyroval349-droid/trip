import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardCityView } from './dashboard/DashboardCityView';
import { DashboardNeighborhoodsView } from './dashboard/DashboardNeighborhoodsView';
import { DashboardBudgetView } from './dashboard/DashboardBudgetView';
import { DashboardRoadmapView } from './dashboard/DashboardRoadmapView';
import { DashboardHousingView } from './dashboard/DashboardHousingView';
import { DashboardResourcesView } from './dashboard/DashboardResourcesView';
import { CurrencyConverter } from './dashboard/CurrencyConverter';
import { LockedFeatureCard } from './dashboard/LockedFeatureCard';
import { WaitingForPlanView } from './dashboard/WaitingForPlanView';
import { PendingRecommendationNotice } from './dashboard/PendingRecommendationNotice';
import { LayoutDashboard, MapPin, Compass, DollarSign, Calendar, Home, BookOpen, MessageSquare, ArrowRight, CheckCircle2, Lock, Clock, Sparkles } from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { project, t, language, upgradeToRelocation } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'city' | 'neighborhoods' | 'budget' | 'roadmap' | 'housing' | 'resources'>('overview');
  const isTravelPlan = project.tierId === 'tier2';
  
  // Bespoke plan recommendations are only available once founder publishes the plan
  const isPlanPublished = project.status === 'plan_ready' || project.status === 'in_progress' || project.status === 'completed';

  return (
    <section style={{ padding: '2.5rem 0 5rem 0', background: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Workspace Top Header & Status Tracker */}
        <DashboardHeader />

        {/* Dashboard Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.6rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {[
            {
              id: 'overview',
              label: isTravelPlan
                ? (language === 'ru' ? 'Маршрут поездки и Вьетнам' : 'Trip Itinerary & Guides')
                : (!isPlanPublished && language === 'ru' ? 'Статус исследования и Вьетнам' : t('dashTabOverview')),
              icon: LayoutDashboard
            },
            { id: 'city', label: t('dashTabCity'), icon: MapPin, isRestricted: isTravelPlan, isPending: !isTravelPlan && !isPlanPublished },
            { id: 'neighborhoods', label: t('dashTabNeighborhoods'), icon: Compass, isRestricted: isTravelPlan, isPending: !isTravelPlan && !isPlanPublished },
            { id: 'budget', label: t('dashTabBudget'), icon: DollarSign, isRestricted: isTravelPlan, isPending: !isTravelPlan && !isPlanPublished },
            { id: 'roadmap', label: t('dashTabRoadmap'), icon: Calendar, isRestricted: isTravelPlan, isPending: !isTravelPlan && !isPlanPublished },
            { id: 'housing', label: t('dashTabHousing'), icon: Home, isRestricted: isTravelPlan },
            { id: 'resources', label: t('dashTabResources'), icon: BookOpen, isRestricted: isTravelPlan }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent-emerald)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 4px 12px rgba(15,118,110,0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.isRestricted && (
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
                      fontSize: '0.72rem',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(194,94,32,0.1)',
                      color: isActive ? '#FFFFFF' : 'var(--accent-terracotta)',
                      padding: '2px 6px',
                      borderRadius: '9999px'
                    }}
                    title={language === 'ru' ? 'Основатель проводит исследование' : 'Under founder research'}
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
                    <Lock size={18} /> {language === 'ru' ? 'Персональные заметки и сопровождение основателя' : 'Founder Notes & Relocation Advisory'}
                  </div>
                  <div className="badge badge-terracotta">
                    {language === 'ru' ? 'Тариф: Поездка ($290)' : 'Plan: Travel ($290)'}
                  </div>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                  {language === 'ru'
                    ? 'Индивидуальный подбор городов и районов, интерактивный калькулятор бюджета, пошаговая дорожная карта с чек-листом, база проверенных ресурсов и гайд по жилью, а также персональные заметки и сопровождение основателя начинаются с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                    : 'City & neighborhood selection, cost modeler, relocation roadmap checklist, verified resources, and founder notes start from Vietnam Relocation Planning ($490) and Concierge ($890).'}
                </p>
                <button
                  onClick={upgradeToRelocation}
                  className="btn btn-primary"
                  style={{ fontSize: '0.86rem', padding: '0.55rem 1.15rem' }}
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

            {/* Compact Currency Converter in Client Dashboard */}
            <CurrencyConverter />

            {/* Overview Quick Widgets Grid */}
            <div className="grid-3">
              
              {/* Recommended City Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FAF9F6', border: '1px dashed var(--accent-terracotta)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-terracotta)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <Lock size={14} /> {language === 'ru' ? 'Индивидуальный подбор городов и районов' : 'City & Neighborhood Matching'}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Начинается с тарифа Релокация' : 'Starts in Relocation Plan'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Индивидуальный подбор города и микрорайонов под ваши цели входит в тариф от $490.' : 'Bespoke city and neighborhood matching is included in packages from $490.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('city')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    <Lock size={14} /> {language === 'ru' ? 'Подробнее / Апгрейд' : 'View / Upgrade'}
                  </button>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <MapPin size={14} /> {t('widgetDestTitle')}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                      {language === 'ru' ? 'Дананг, Вьетнам' : 'Da Nang, Vietnam'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {t('widgetDestDesc')}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('city')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    {t('widgetDestBtn')} <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Monthly Budget Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FAF9F6', border: '1px dashed var(--border-subtle)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-terracotta)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <Lock size={14} /> {t('widgetBudgetTitle')}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Калькулятор бюджета' : 'Cost of Living Modeler'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Интерактивное моделирование расходов входит в тариф «Планирование релокации» ($490).' : 'Included in Vietnam Relocation Planning ($490).'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('budget')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    <Lock size={14} /> {language === 'ru' ? 'Подробнее / Апгрейд' : 'View / Upgrade'}
                  </button>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-terracotta)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <DollarSign size={14} /> {t('widgetBudgetTitle')}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-emerald)' }}>
                      ${project.userCurrentBudget.accommodation + project.userCurrentBudget.food + project.userCurrentBudget.coworking + project.userCurrentBudget.transportation + project.userCurrentBudget.entertainment} {language === 'ru' ? '/ мес' : '/ mo'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {t('widgetBudgetRent')}: ${project.userCurrentBudget.accommodation} &bull; {t('widgetBudgetFood')}: ${project.userCurrentBudget.food} &bull; {t('widgetBudgetWork')}: ${project.userCurrentBudget.coworking}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('budget')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    {t('widgetBudgetBtn')} <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Roadmap Progress Widget */}
              {isTravelPlan ? (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FAF9F6', border: '1px dashed var(--border-subtle)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <Lock size={14} /> {t('widgetRoadmapTitle')}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Дорожная карта релокации' : 'Relocation Roadmap'}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Пошаговый чек-лист подготовки доступен в тарифе «Планирование релокации» ($490).' : 'Step-by-step checklist is included in Relocation package ($490).'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    <Lock size={14} /> {language === 'ru' ? 'Подробнее / Апгрейд' : 'View / Upgrade'}
                  </button>
                </div>
              ) : (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      <Calendar size={14} /> {t('widgetRoadmapTitle')}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                      {project.roadmapTasks.filter(t => t.completed).length} / {project.roadmapTasks.length} {t('widgetRoadmapTasks')}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {t('widgetRoadmapPhase1')} {project.roadmapTasks.filter(t => t.phase === 'before_arrival' && t.completed).length}/5 {t('widgetRoadmapCompleted')}.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
                  >
                    {t('widgetRoadmapBtn')} <ArrowRight size={14} />
                  </button>
                </div>
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
          ) : !isPlanPublished ? (
            <PendingRecommendationNotice sectionName={t('dashTabCity')} onGoBack={() => setActiveTab('overview')} />
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
          ) : !isPlanPublished ? (
            <PendingRecommendationNotice sectionName={t('dashTabNeighborhoods')} onGoBack={() => setActiveTab('overview')} />
          ) : (
            <DashboardNeighborhoodsView />
          )
        )}
        {activeTab === 'budget' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'Интерактивный калькулятор бюджета и сценариев' : 'Interactive Budget & Scenario Modeler'}
              desc={language === 'ru'
                ? 'Интерактивное моделирование расходов на жизнь (аренда жилья, байк, питание, коворкинги, страховка и сценарии Solo / Пара) начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Monthly cost modeling (housing, bike, food, coworking, insurance, and Solo / Couple scenarios) is included in "Vietnam Relocation Planning" ($490) and "Concierge" ($890).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : !isPlanPublished ? (
            <PendingRecommendationNotice sectionName={t('dashTabBudget')} onGoBack={() => setActiveTab('overview')} />
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
          ) : !isPlanPublished ? (
            <PendingRecommendationNotice sectionName={t('dashTabRoadmap')} onGoBack={() => setActiveTab('overview')} />
          ) : (
            <DashboardRoadmapView />
          )
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
        {activeTab === 'resources' && (
          isTravelPlan ? (
            <LockedFeatureCard
              title={language === 'ru' ? 'База проверенных ресурсов и гайд по жилью' : 'Verified Resources & Housing Guide'}
              desc={language === 'ru'
                ? 'Закрытая база проверенных контактов, риелторов, локальных сервисов, доставок и комьюнити начинается с тарифа «Планирование релокации во Вьетнам» ($490) и «Консьерж» ($890).'
                : 'Curated expat resources and verified vendor contacts start from the Relocation package ($490).'}
              upgradeAction={upgradeToRelocation}
              language={language}
            />
          ) : (
            <DashboardResourcesView />
          )
        )}

      </div>
    </section>
  );
};
