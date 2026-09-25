import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  X,
  Calendar,
  Users,
  ShieldCheck,
  Crown,
  Compass,
  CheckCircle2,
  Send,
  MessageCircle,
  Copy,
  ExternalLink,
  DollarSign,
  Printer,
  Sunrise,
  Sun,
  Sunset
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const { language } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'roadmap' | 'budget' | 'itinerary' | 'lease_audit' | 'realtor' | 'vip'>('roadmap');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenDemo = () => setIsMobileModalOpen(true);
    window.addEventListener('open-mobile-demo', handleOpenDemo);
    return () => window.removeEventListener('open-mobile-demo', handleOpenDemo);
  }, []);

  return (
    <section id="cabinet-preview" className="dashboard-preview-section" style={{ background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem', padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
            <LayoutDashboard size={15} /> {language === 'ru' ? 'Как устроен личный кабинет клиента' : 'Inside Your Personal Client Portal'}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '0.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {language === 'ru'
              ? 'Ваш цифровой штаб переезда: от визы до обустройства'
              : 'Your Relocation Command Center: From Visa to Settling In'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.65, margin: '0 auto', maxWidth: '760px' }}>
            {language === 'ru'
              ? 'После оформления заказа для вас создается защищенный персональный кабинет. Внутри — живая погода и время во Вьетнаме, интерактивный гид по визе, калькулятор ежемесячного бюджета, 14-дневный маршрут адаптации, аудит договора аренды и чат с Founder.'
              : 'Immediately upon order, your private workspace is activated with real-time city weather, interactive visa guide, monthly living budget modeler, 14-day immersion roadmap, lease contract shield, and direct support.'}
          </p>

          {/* Mobile "Open Demo" Trigger Button */}
          <div className="mobile-demo-trigger" style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            {!isMobileModalOpen ? (
              <button 
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 1.8rem',
                  width: '100%',
                  maxWidth: '360px',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 24px rgba(15, 118, 110, 0.25)',
                  margin: '0 auto'
                }}
                onClick={() => {
                  setIsMobileModalOpen(true);
                  setTimeout(() => {
                    const el = document.getElementById('cabinet-preview-content');
                    if (el) {
                      const headerOffset = 80;
                      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                <LayoutDashboard size={18} />
                {language === 'ru' ? 'Показать демо интерактивного кабинета' : 'Open Interactive Demo Portal'}
              </button>
            ) : (
              <button 
                className="btn btn-secondary"
                style={{
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  margin: '0 auto',
                  borderRadius: '9999px'
                }}
                onClick={() => setIsMobileModalOpen(false)}
              >
                <X size={16} />
                {language === 'ru' ? 'Свернуть демо-кабинет' : 'Collapse Demo Portal'}
              </button>
            )}
          </div>

        </div>

        {/* Workspace Showcase Box */}
        <div id="cabinet-preview-content" className={`dashboard-preview-wrapper ${isMobileModalOpen ? 'mobile-modal-open' : ''}`}>
          {isMobileModalOpen && (
            <div className="mobile-only" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.5rem 0.85rem', background: '#F0FDF4', borderRadius: '12px', border: '1px solid var(--border-emerald)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <LayoutDashboard size={15} /> {language === 'ru' ? 'Демо-кабинет открыт' : 'Demo Portal Active'}
              </span>
              <button
                onClick={() => {
                  setIsMobileModalOpen(false);
                  const el = document.getElementById('cabinet-preview');
                  if (el) {
                    const headerOffset = 80;
                    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
                  }
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <X size={13} /> {language === 'ru' ? 'Свернуть' : 'Close'}
              </button>
            </div>
          )}
        <div className="glass-card glass-card-emerald" style={{ padding: '2rem', border: '1px solid rgba(15, 118, 110, 0.25)', boxShadow: '0 20px 50px rgba(15, 118, 110, 0.08)' }}>
          
          {/* Top Browser Chrome Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginLeft: '0.35rem' }}>
                {language === 'ru'
                  ? 'Кабинет клиента: Дмитрий и Елена • Тариф «Релокация под ключ ($490)»'
                  : 'Client Workspace: Dmitry & Elena • Plan "Turnkey Relocation ($490)"'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>{language === 'ru' ? 'Сессия активна • Данные синхронизированы' : 'Live Session • Synced'}</span>
            </div>
          </div>

          {/* Interactive Workspace Header Mockup (Visual only, buttons not clickable) */}
          <div style={{
            background: 'var(--dash-bg-card)',
            border: '1px solid var(--dash-border-subtle)',
            borderRadius: 'var(--dash-radius-card)',
            padding: '1.5rem',
            marginBottom: '1.75rem'
          }}>
            {/* Top row: Greeting + Plan chip + Messengers (Visual badges, non-clickable) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div className="dash-greeting-pill" style={{ cursor: 'default', userSelect: 'none' }}>
                  <span>{language === 'ru' ? 'Добрый день, Дмитрий и Елена 👋' : 'Good day, Dmitry & Elena 👋'}</span>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid var(--dash-border-subtle)',
                  borderRadius: 'var(--dash-radius-pill)',
                  padding: '0.3rem 0.85rem',
                  fontSize: '0.78rem',
                  color: 'var(--dash-text-muted)',
                  cursor: 'default',
                  userSelect: 'none'
                }}>
                  <span>{language === 'ru' ? 'Тариф:' : 'Plan:'} <strong style={{ color: 'var(--dash-text-main)' }}>{language === 'ru' ? 'Релокация под ключ' : 'Turnkey Relocation'}</strong></span>
                  <span style={{ background: 'var(--dash-accent-emerald)', color: '#FFFFFF', padding: '0.12rem 0.5rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700 }}>$490</span>
                </div>
              </div>

              {/* Visual-only messenger pills: non-clickable */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid var(--dash-border-subtle)',
                  borderRadius: 'var(--dash-radius-pill)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  color: 'var(--dash-text-muted)',
                  cursor: 'default',
                  userSelect: 'none'
                }}>
                  <Calendar size={13} style={{ color: 'var(--dash-text-muted)' }} />
                  <span>{language === 'ru' ? 'Приезд:' : 'Arrival:'} <strong>{language === 'ru' ? '15 октября 2026' : 'October 15, 2026'}</strong></span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'rgba(34, 197, 94, 0.08)',
                    color: '#16A34A',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                    borderRadius: 'var(--dash-radius-pill)',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'default',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'rgba(2, 132, 199, 0.08)',
                    color: '#0284C7',
                    border: '1px solid rgba(2, 132, 199, 0.35)',
                    borderRadius: 'var(--dash-radius-pill)',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'default',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                >
                  <Send size={13} />
                  <span>Telegram</span>
                </div>
              </div>
            </div>

            {/* Focal Row: Dynamic Weather Widget + Compact Progress */}
            <div className="dash-hero-focal-row" style={{ margin: '0 auto 0.5rem auto' }}>
              {/* Dynamic Live Weather Widget */}
              <div className="dash-weather-widget" style={{ cursor: 'default' }}>
                <div className="dash-weather-visual-wrap">
                  <div className="weather-sun-box">
                    <svg className="weather-sun-rays-svg" viewBox="0 0 48 48" fill="none">
                      <line x1="24" y1="2" x2="24" y2="7" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="24" y1="41" x2="24" y2="46" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="2" y1="24" x2="7" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="41" y1="24" x2="46" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="8.4" y1="8.4" x2="11.9" y2="11.9" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="36.1" y1="36.1" x2="39.6" y2="39.6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="8.4" y1="39.6" x2="11.9" y2="36.1" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="36.1" y1="11.9" x2="39.6" y2="8.4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <div className="weather-sun-core" />
                  </div>
                </div>
                <div className="dash-weather-info">
                  <div className="dash-weather-temp-row">
                    <span className="dash-weather-temp">+29°C</span>
                    <span className="dash-weather-badge">
                      {language === 'ru' ? 'Ясно, солнечно' : 'Sunny & Clear'}
                    </span>
                  </div>
                  <div className="dash-weather-city">
                    <span>{language === 'ru' ? 'Дананг' : 'Da Nang'}</span>
                    <span className="dash-weather-country">, {language === 'ru' ? 'Вьетнам' : 'Vietnam'}</span>
                    <span className="dash-weather-live-dot" title="Live Open-Meteo" />
                    <span style={{ fontSize: '0.72rem', color: 'var(--dash-text-muted)', marginLeft: '0.35rem' }}>• 14:35 ICT (UTC+7)</span>
                  </div>
                </div>
              </div>

              {/* Compact Honest Progress Widget */}
              <div className="dash-compact-progress-widget" style={{ cursor: 'default' }}>
                <div className="dash-compact-progress-header">
                  <span className="dash-compact-progress-title">
                    {language === 'ru' ? 'Прогресс подготовки' : 'Preparation Progress'}
                  </span>
                  <span className="dash-compact-progress-percent">23%</span>
                </div>
                <div className="dash-compact-progress-meta">
                  <div className="dash-compact-progress-step-name">
                    {language === 'ru' ? 'Чек-лист визы & бюджет жизни' : 'Visa Checklist & Budget Modeler'}
                  </div>
                  <div className="dash-compact-progress-counts">
                    {language === 'ru' ? '3 из 13 шагов выполнено' : '3 of 13 steps completed'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sleek Progress Bar */}
            <div className="dash-progress-track" style={{ maxWidth: '680px', margin: '1rem auto 0.75rem auto' }}>
              <div className="dash-progress-fill" style={{ width: '23%' }} />
            </div>

            {/* Step Nodes */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem', cursor: 'default', userSelect: 'none' }}>
              {[
                { label: language === 'ru' ? 'Анкета' : 'Questionnaire', done: true },
                { label: language === 'ru' ? 'Анализ города' : 'City Analysis', done: true },
                { label: language === 'ru' ? 'План & виза' : 'Plan & Visa', done: true },
                { label: language === 'ru' ? 'Показы жилья' : 'Viewings', done: false },
                { label: language === 'ru' ? 'Заезд & Tạm trú' : 'Arrival & Tam Tru', done: false },
                { label: language === 'ru' ? 'Полная адаптация' : 'Full Immersion', done: false }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: step.done ? 1 : 0.45, fontSize: '0.78rem' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: step.done ? 'var(--dash-accent-dark)' : 'rgba(203, 213, 225, 0.8)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.65rem'
                  }}>
                    {step.done ? <CheckCircle2 size={11} /> : idx + 1}
                  </div>
                  <span style={{ fontWeight: step.done ? 600 : 400, color: step.done ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Showcase Tabs (These allow the visitor to explore different screens) */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
            {[
              { id: 'roadmap', label: language === 'ru' ? 'Маршрут переезда (3 фазы)' : 'Relocation Roadmap', icon: Calendar },
              { id: 'budget', label: language === 'ru' ? 'Бюджет жизни (Калькулятор)' : 'Living Budget Calculator', icon: DollarSign },
              { id: 'itinerary', label: language === 'ru' ? '14 дней адаптации & Маршрут' : '14-Day Settling Plan', icon: Compass },
              { id: 'lease_audit', label: language === 'ru' ? 'Аудит договора аренды' : 'Lease Audit Shield', icon: ShieldCheck },
              { id: 'realtor', label: language === 'ru' ? 'Партнер-риелтор Эмили' : 'Vetted Realtor Emily', icon: Users },
              { id: 'vip', label: language === 'ru' ? 'VIP & Психолог Мария' : 'VIP & Psychologist Maria', icon: Crown }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePreviewTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.2rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? 'var(--accent-emerald)' : '#FAF8F5',
                    color: isActive ? '#FFFFFF' : 'var(--text-main)',
                    boxShadow: isActive ? '0 4px 14px rgba(15, 118, 110, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Preview Tab Content Area */}
          <div style={{ background: '#FAF8F5', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            
            {/* 1. ROADMAP TAB WITH VISA GUIDE (Non-clickable mockup badges) */}
            {activePreviewTab === 'roadmap' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Пошаговый авторский маршрут релокации' : 'Step-by-Step Relocation Roadmap'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru' ? '13 структурированных шагов с инструкциями, чек-листом визы и подсказками Founder' : '13 milestone steps with instructions, visa checklists, and founder guidance'}
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>{language === "ru" ? "3 из 13 выполнено" : "3 of 13 completed"}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Step 1: E-Visa */}
                  <div style={{ background: '#FFFFFF', padding: '1.2rem 1.35rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-emerald)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-main)' }}>
                          {language === 'ru' ? 'Оформление 90-дневной электронной визы (e-Visa)' : '90-day e-Visa application on official portal'}
                        </div>
                        {/* Visual mockup badge: non-clickable */}
                        <div
                          style={{
                            padding: '0.35rem 0.85rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            border: '1px solid var(--accent-emerald)',
                            background: 'rgba(15, 118, 110, 0.08)',
                            color: 'var(--accent-emerald)',
                            borderRadius: '6px',
                            cursor: 'default',
                            userSelect: 'none',
                            pointerEvents: 'none'
                          }}
                        >
                          <ExternalLink size={13} />
                          <span>{language === 'ru' ? 'Интерактивный чек-лист по визе' : 'Interactive Visa Guide'}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
                        {language === 'ru' ? 'Пошаговый гайд по заполнению формы на официальном госпортале иммиграции Вьетнама. Выбор КПП въезда, требования к фото и оплата картой.' : 'Step-by-step guidance on official Vietnam immigration portal. Checkpoint selection, photo guidelines and card payment.'}
                      </div>
                      <div style={{ background: '#FFFBEB', padding: '0.5rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', color: '#92400E', marginTop: '0.6rem', border: '1px solid #FDE68A' }}>
                        💡 <strong>{language === 'ru' ? 'Совет Founder:' : 'Founder Tip:'}</strong> {language === 'ru' ? 'Госпошлина составляет строго $25 за однократную или $50 за мульти-визу. В кабинете прикреплен полный интерактивный чек-лист, чтобы избежать отказов из-за опечаток.' : 'Government fee is strictly $25/$50. The interactive guide in your dashboard prevents costly rejection typos.'}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: In-person viewings */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-subtle)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                        {language === 'ru' ? 'Живые показы квартир с проверенным партнером-риелтором' : 'Condo inspections with vetted partner realtor'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {language === 'ru' ? 'Выезд на отобранные объекты. Осмотр планировки, проверка напора горячей воды, кондиционеров и фиксация состояния мебели.' : 'In-person visits to selected condos. Layout check, AC and water pressure test, inventory condition check.'}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Registration */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-subtle)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                        {language === 'ru' ? 'Официальная регистрация по месту пребывания (Tạm trú)' : 'Official Police Residence Registration (Tam Tru)'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {language === 'ru' ? 'Внесение данных собственником в миграционную базу в первые 24 часа. Без этого не продлить визу и не открыть счет в банке.' : 'Landlord filing into the police immigration system within 24 hours.'}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: 30 days support */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #BBF7D0', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-subtle)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Send size={15} />
                        <span>{language === 'ru' ? 'Персональное сопровождение на 30 дней в Telegram' : '30-Day Personal Accompaniment in Telegram'}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {language === 'ru' ? 'Прямой закрытый чат для решения любых бытовых, визовых и локационных вопросов в первый месяц.' : 'Direct 1-on-1 private chat for prompt guidance throughout your first month in Vietnam.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. LIVING BUDGET CALCULATOR TAB (Replaces unwanted noise/fiber cards) */}
            {activePreviewTab === 'budget' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Калькулятор ежемесячного бюджета жизни во Вьетнаме' : 'Monthly Living Cost & Budget Calculator'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru'
                        ? 'Реалистичная модель расходов для комфортной жизни экспата или семьи в Дананге и Нячанге без туристических переплат'
                        : 'Realistic monthly expense model for expat living in Da Nang & Nha Trang without tourist markups'}
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.82rem' }}>
                    <DollarSign size={14} /> $1 150 / {language === 'ru' ? 'мес' : 'mo'}
                  </span>
                </div>

                {/* Expense Categories Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  
                  {/* Category 1 */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>🏡 {language === "ru" ? "Аренда апартаментов" : "Apartment Rent"}</strong>
                      <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>$500 <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {language === "ru" ? "мес" : "mo"}</span></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? '1–2 спальни в современном кондоминиуме с бассейном и охраной (5–10 мин до пляжа).' : '1-2 bedroom condo with pool & security near the beach.'}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>🍲 {language === "ru" ? "Питание и кафе" : "Dining & Cafes"}</strong>
                      <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>$350 <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {language === "ru" ? "мес" : "mo"}</span></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Европейские завтраки, свежие морепродукты, фруктовые рынки и супермаркеты.' : 'Cafes, fresh seafood, local fruit markets and groceries.'}
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>💻 {language === "ru" ? "Коворкинг и связь" : "Coworking & Network"}</strong>
                      <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>$80 <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {language === "ru" ? "мес" : "mo"}</span></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Безлимитный 4G/5G от Viettel + абонемент в коворкинг с резервным генератором.' : 'Unlimited 4G/5G Viettel SIM + coworking pass with backup power.'}
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>🛵 {language === "ru" ? "Байк и транспорт" : "Scooter & Transport"}</strong>
                      <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>$70 <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {language === "ru" ? "мес" : "mo"}</span></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Аренда обслуженного скутера Honda Airblade, шлемы + бензин + такси Grab в дождь.' : 'Scooter rental (Honda Airblade) + fuel + GrabCar on rainy days.'}
                    </div>
                  </div>

                  {/* Category 5 */}
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>⚡ {language === 'ru' ? 'Коммунальные услуги EVN & отдых' : 'EVN Utilities & Leisure'}</strong>
                      <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>$150 <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {language === "ru" ? "мес" : "mo"}</span></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Электричество по официальному тарифу EVN (до 4 000 ₫/кВт без накруток), спортзал, массажи и выезды на выходные.' : 'Official EVN electricity rates, gym access, wellness, and weekend getaways.'}
                    </div>
                  </div>

                </div>

                {/* Total Summary Footer */}
                <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)', border: '1.5px solid #BBF7D0', padding: '1.1rem 1.35rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#15803D', fontWeight: 700 }}>
                      {language === 'ru' ? 'Ориентировочный итог на месяц:' : 'Estimated Monthly Total:'}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>
                      $1 150 <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)' }}>≈ 28 750 000 ₫</span>
                    </div>
                  </div>
                  <div style={{ maxWidth: '420px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    💡 <strong>{language === 'ru' ? 'В вашем кабинете:' : 'In your portal:'}</strong> {language === 'ru' ? 'Интерактивные ползунки под ваш бюджет с автоматической конвертацией в VND по актуальному курсу.' : 'Interactive sliders tailored to your budget with live VND currency conversion.'}
                  </div>
                </div>
              </div>
            )}

            {/* 3. 14-DAY ITINERARY TAB (Interactive day switch, non-clickable actions) */}
            {activePreviewTab === 'itinerary' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? '14-дневный авторский маршрут адаптации и переезда' : '14-Day Relocation & Settling-in Itinerary'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru' ? 'От прилёта до полного обустройства: осмотр районов, связь, коворкинги, быт и комьюнити' : 'From touchdown to settling in: neighborhoods, Wi-Fi, viewings, and expat lifestyle'}
                    </p>
                  </div>
                  
                  {/* Visual badges: non-clickable */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', cursor: 'default', userSelect: 'none' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
                      <Printer size={13} /> {language === 'ru' ? 'Формат A4 / PDF' : 'A4 / PDF Format'}
                    </span>
                    <span className="badge badge-terracotta" style={{ fontSize: '0.78rem' }}>
                      14 {language === 'ru' ? 'дней поддержки' : 'days support'}
                    </span>
                  </div>
                </div>

                {/* Day Selector Pills (Allows client to switch preview days) */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      style={{
                        padding: '0.45rem 0.95rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: '1px solid var(--border-subtle)',
                        background: selectedDay === d ? 'var(--accent-emerald)' : '#FFFFFF',
                        color: selectedDay === d ? '#FFFFFF' : 'var(--text-main)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {language === 'ru' ? `День ${d}` : `Day ${d}`}
                    </button>
                  ))}
                  <span style={{ alignSelf: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '0.25rem', userSelect: 'none' }}>{language === 'ru' ? '...до 14 дней' : '...up to 14 days'}</span>
                </div>

                {/* Day Detail Card */}
                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{language === 'ru' ? 'День' : 'Day'} {selectedDay}</span>
                      <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)' }}>
                        {selectedDay === 1
                          ? (language === 'ru' ? 'Прилёт, связь Viettel и первые шаги в Дананге' : 'Touchdown, Viettel SIM & First Steps')
                          : (language === 'ru' ? 'Осмотр районов My Khe и Son Tra, просмотры квартир' : 'Neighborhood Tours & Condo Viewings')}
                      </strong>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#92400E', marginBottom: '1rem' }}>
                    🧭 <strong>{language === 'ru' ? 'Логистика дня:' : 'Logistics:'}</strong> {language === 'ru' ? 'Официальное такси Mai Linh в аэропорту или GrabCar по карте (~120 000 ₫). Оформление SIM Viettel только с загранпаспортом.' : 'Official airport taxi or GrabCar (~120k VND). Viettel registration requires physical passport.'}
                  </div>

                  {/* 3 Activities: Morning, Day, Evening */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                    <div style={{ background: '#FAF8F5', padding: '0.85rem', borderRadius: '6px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem', color: '#D97706', fontSize: '0.78rem', fontWeight: 700 }}>
                        <Sunrise size={15} /> {language === 'ru' ? 'УТРО' : 'MORNING'}
                      </div>
                      <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem' }}>{language === "ru" ? "Заселение и SIM Viettel" : "Check-in & Viettel SIM"}</strong>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {language === "ru" ? "Салон Viettel в ТЦ Vincom. Тариф 150 000 ₫/мес (5 ГБ/день)." : "Viettel store at Vincom Mall. Plan 150,000 ₫/mo (5 GB/day)."}
                      </p>
                    </div>

                    <div style={{ background: '#FAF8F5', padding: '0.85rem', borderRadius: '6px', border: '1px solid rgba(194, 94, 32, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem', color: '#C25E20', fontSize: '0.78rem', fontWeight: 700 }}>
                        <Sun size={15} /> {language === 'ru' ? 'ДЕНЬ' : 'AFTERNOON'}
                      </div>
                      <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem' }}>{language === "ru" ? "Осмотр кондоминиумов" : "Condo Inspections"}</strong>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {language === "ru" ? "Встреча с риелтором Trần Minh. Просмотр отобранных вариантов жилья." : "Meeting with realtor Trần Minh. Viewing shortlisted properties."}
                      </p>
                    </div>

                    <div style={{ background: '#FAF8F5', padding: '0.85rem', borderRadius: '6px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem', color: '#7C3AED', fontSize: '0.78rem', fontWeight: 700 }}>
                        <Sunset size={15} /> {language === 'ru' ? 'ВЕЧЕР' : 'EVENING'}
                      </div>
                      <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem' }}>{language === 'ru' ? 'Пляж My Khe и закат' : 'My Khe Beach & Sunset'}</strong>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {language === "ru" ? "Прогулка по набережной, ужин со свежими морепродуктами." : "Promenade walk, fresh seafood dinner."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. LEASE AUDIT TAB */}
            {activePreviewTab === 'lease_audit' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Дистанционный аудит договора аренды (Lease Shield)' : 'Remote Lease Agreement Audit (Lease Shield)'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru' ? 'Проверка договора аренды Founder до внесения залога' : 'Lease agreement review by founder prior to deposit payment'}
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                    <ShieldCheck size={14} /> {language === 'ru' ? 'Одобрено с правками' : 'Approved with Notes'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.86rem' }}>1. {language === "ru" ? "Возврат залога (Deposit)" : "Deposit Return"}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{language === 'ru' ? 'Безопасно' : 'Secured'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Зафиксирован возврат в течение 3 рабочих дней после акта сдачи. Защита от необоснованных удержаний.' : 'Guaranteed refund within 3 business days post hand-over. Protection against unjustified deductions.'}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-emerald)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.86rem' }}>2. {language === "ru" ? "Тариф электричества EVN" : "EVN Electricity Rate"}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{language === 'ru' ? 'до 4 000 ₫/кВт' : 'up to 4,000 ₫/kWh'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Ставка зафиксирована в договоре без скрытых наценок владельца (норма до 4500 ₫), экономия до $60/мес.' : 'Rate locked in contract without hidden landlord markups (norm ≤4500 ₫), saving up to $60/mo.'}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.86rem' }}>3. {language === "ru" ? "Регистрация tạm trú" : "Tạm trú Registration"}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{language === 'ru' ? '24 часа' : '24 hours'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {language === 'ru' ? 'Обязательство собственника зарегистрировать жильцов в миграционной полиции в течение суток.' : 'Landlord obligation to register residents with immigration police within 24 hours.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. REALTOR TAB */}
            {activePreviewTab === 'realtor' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <img
                        src="/realtor-emily.jpg"
                        alt={language === "ru" ? "Эмили" : "Emily"}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-emerald)' }}
                      />
                      <div>
                        <div className="badge badge-emerald" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>{language === "ru" ? "Проверенный партнер" : "Vetted Partner"}</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{language === "ru" ? "Эмили" : "Emily"}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{language === "ru" ? "Партнер-риелтор VietReloc • Дананг и побережье" : "VietReloc Partner Realtor • Da Nang Coast"}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                      {language === 'ru'
                        ? 'Специализируется на подборе апартаментов для экспатов у моря. Присылает живые видео с открытыми окнами, проверяет шумоизоляцию до выезда на просмотр.'
                        : 'Specializes in expat apartments near the coast. Provides live video tours and checks soundproofing prior to on-site visits.'}
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#FFFFFF', fontSize: '0.78rem', fontWeight: 700, padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)' }}><MessageCircle size={15} /><span>WhatsApp</span></div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} color="var(--accent-emerald)" />
                      <span>{language === 'ru' ? '4 правила осмотра жилья:' : '4 Inspection Golden Rules:'}</span>
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li><strong>{language === "ru" ? "Живые видео с окнами" : "Live videos with windows"}</strong> — {language === "ru" ? "предварительная оценка района до выезда" : "preliminary neighborhood assessment"}</li>
                      <li><strong>{language === "ru" ? "Понятный тариф EVN" : "Transparent EVN rate"}</strong> — {language === "ru" ? "фиксация рыночной нормы до 4500 ₫/кВт" : "fixing market norm under 4500 ₫/kWh"}</li>
                      <li><strong>{language === "ru" ? "Регистрация tạm trú" : "Tạm trú Registration"}</strong> — {language === "ru" ? "обязательство лендлорда подать данные за 24ч" : "landlord obligation to register within 24h"}</li>
                      <li><strong>{language === "ru" ? "Аудит договора" : "Contract Audit"}</strong> — {language === "ru" ? "проверка Founder перед внесением залога" : "Founder review prior to deposit"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 6. VIP TAB (Visual badges, non-clickable) */}
            {activePreviewTab === 'vip' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  
                  {/* Maria Egorova */}
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '2px solid #FCD34D' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <img
                        src="/psychologist-photo.png"
                        alt={language === "ru" ? "Егорова Мария" : "Maria Egorova"}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D97706' }}
                      />
                      <div>
                        <div className="badge badge-emerald" style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                          {language === "ru" ? "1 сессия включена в VIP" : "1 session included in VIP"}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{language === "ru" ? "Егорова Мария" : "Maria Egorova"}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{language === "ru" ? "Дипломированный психолог, специалист по эмиграции и адаптации" : "Certified psychologist, emigration and adaptation specialist"}</div>
                      </div>
                    </div>
                    
                    {/* Visual promo box: non-clickable */}
                    <div style={{ background: '#FAF8F5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px dashed #D97706', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', userSelect: 'none' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{language === "ru" ? "Промокод на 2-ю сессию:" : "Promo code for 2nd session:"}</div>
                        <div style={{ fontWeight: 800, color: '#B45309', fontFamily: 'monospace', fontSize: '1rem' }}><span style={{ filter: "blur(4px)", userSelect: "none" }}>••••••••••••</span></div>
                      </div>
                      <div
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '4px',
                          color: 'var(--text-main)',
                          fontWeight: 600,
                          cursor: 'default'
                        }}
                      >
                        <Copy size={12} />
                        <span>{language === "ru" ? "Код активен" : "Code Active"}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        fontSize: '0.86rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(15, 118, 110, 0.08)',
                        color: 'var(--accent-emerald)',
                        border: '1px dashed var(--accent-emerald)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                        cursor: 'default',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>{language === 'ru' ? 'Прямая связь с Марией в Telegram' : 'Direct Telegram with Maria'}</span>
                    </div>
                  </div>

                  {/* 30-Day Accompaniment */}
                  <div className="cloud-support-bubble" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          <Send size={14} /> {language === 'ru' ? 'Личное сопровождение (1 месяц)' : '1-Month Accompaniment'}
                        </div>
                        <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{language === "ru" ? "28 из 30 дней" : "28 of 30 days"}</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', margin: '0 0 0.4rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                        {language === 'ru' ? '30 дней прямого сопровождения в Telegram' : '30-Day Founder Telegram Support'}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                        {language === 'ru'
                          ? 'Прямой закрытый чат 1-на-1 с Founder. Быстрое решение любых бытовых, визовых и локационных вопросов в первый месяц жизни во Вьетнаме.'
                          : 'Direct 1-on-1 private chat for prompt answers on visas, banking, bike rentals, and living throughout your first month.'}
                      </p>
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                      <div
                        style={{
                          width: '100%',
                          fontSize: '0.86rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          padding: '0.75rem 1rem',
                          background: 'rgba(15, 118, 110, 0.08)',
                          color: 'var(--accent-emerald)',
                          border: '1px dashed var(--accent-emerald)',
                          borderRadius: '9999px',
                          fontWeight: 600,
                          cursor: 'default',
                          userSelect: 'none',
                          pointerEvents: 'none'
                        }}
                      >
                        <Send size={14} />
                        <span>{language === 'ru' ? 'Чат с Founder в Telegram (в личном кабинете)' : 'Founder Telegram Chat (in client portal)'}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Bottom collapse button for mobile */}
          {isMobileModalOpen && (
            <div className="mobile-only" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                className="btn btn-secondary"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.88rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => {
                  setIsMobileModalOpen(false);
                  const el = document.getElementById('cabinet-preview');
                  if (el) {
                    const headerOffset = 80;
                    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
                  }
                }}
              >
                <X size={15} /> {language === 'ru' ? 'Свернуть демо-кабинет' : 'Collapse Demo Portal'}
              </button>
            </div>
          )}

        </div>
        </div>

      </div>
    </section>
  );
};

