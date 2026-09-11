import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  ShieldCheck,
  Crown,
  Compass,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const { language, setViewMode } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'roadmap' | 'realtor' | 'lease_audit' | 'vip' | 'travel'>('roadmap');
  const [copiedPromo, setCopiedPromo] = useState(false);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('VIETRELOC-VIP20');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  return (
    <section id="cabinet-preview" style={{ padding: '5rem 0', background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <LayoutDashboard size={14} /> {language === 'ru' ? 'Как устроен личный кабинет' : 'Your Personal Workspace'}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            {language === 'ru'
              ? 'Интерактивный кабинет вместо хаотичных заметок'
              : 'Interactive Personal Workspace Instead of Chaotic Chats'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            {language === 'ru'
              ? 'После оформления заказа для вас создается персональный кабинет. Здесь хранятся все чек-листы, контакты проверенного риелтора, аудит договора аренды и прямой чат поддержки.'
              : 'Immediately upon order, your private workspace is activated with step-by-step roadmaps, vetted realtor contacts, lease contract audit, and direct chat.'}
          </p>
        </div>

        {/* Interactive Workspace Showcase Box */}
        <div className="glass-card glass-card-emerald" style={{ padding: '2rem', border: '1px solid rgba(15, 118, 110, 0.2)' }}>
          
          {/* Top Demo Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginLeft: '0.5rem' }}>
                {language === 'ru' ? 'Личный кабинет клиента: Дмитрий и Елена (Консьерж $890)' : 'Client Workspace Preview: Dmitry & Elena (VIP Concierge $890)'}
              </span>
            </div>

            <div className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
              <CheckCircle2 size={13} /> {language === 'ru' ? 'Персональный план опубликован' : 'Live Client Workspace'}
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
            {[
              { id: 'roadmap', label: language === 'ru' ? 'Маршрут переезда (3 фазы)' : 'Roadmap (3 Phases)', icon: Calendar },
              { id: 'realtor', label: language === 'ru' ? 'Партнер-риелтор' : 'Vetted Realtor', icon: Users },
              { id: 'lease_audit', label: language === 'ru' ? 'Аудит договора аренды' : 'Lease Contract Audit', icon: ShieldCheck },
              { id: 'vip', label: language === 'ru' ? 'Психолог & 30 дней в TG' : 'Psychologist & 30d TG', icon: Crown },
              { id: 'travel', label: language === 'ru' ? 'Маршрут путешествия ($290)' : 'Travel Itinerary ($290)', icon: Compass }
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
                    padding: '0.75rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
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

          {/* Preview Tab Content */}
          <div style={{ background: '#FAF8F5', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            
            {/* 1. ROADMAP TAB */}
            {activePreviewTab === 'roadmap' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Пошаговый авторский маршрут релокации' : 'Step-by-Step Relocation Roadmap'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru' ? '13 структурированных шагов с инструкциями и подсказками основателя' : '13 milestone steps with instructions and founder guidance'}
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>3 из 13 выполнено</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-emerald)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                        {language === 'ru' ? 'Оформление 90-дневной электронной визы (e-Visa)' : '90-day e-Visa application on official portal'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {language === 'ru' ? 'Подача на официальном госпортале иммиграции Вьетнама. Выбор КПП въезда.' : 'Official immigration portal filing. Border checkpoint selection.'}
                      </div>
                      <div style={{ background: '#FFFBEB', padding: '0.45rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#92400E', marginTop: '0.5rem' }}>
                        💡 <strong>{language === 'ru' ? 'Совет основателя:' : 'Founder Tip:'}</strong> {language === 'ru' ? 'Госпошлина составляет строго $25 за однократную или $50 за мульти-визу. Не пользуйтесь сайтами-посредниками.' : 'Government fee is strictly $25/$50. Avoid scam mediator sites.'}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-subtle)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                        {language === 'ru' ? 'Живые показы квартир с проверенным партнером-риелтором' : 'Condo inspections with vetted partner realtor'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {language === 'ru' ? 'Выезд на отобранные объекты. Оценка шумоизоляции, проверка роутера и напора горячей воды.' : 'In-person visits to filtered condos. Noise assessment, router checks, water pressure.'}
                      </div>
                    </div>
                  </div>

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

            {/* 2. REALTOR TAB */}
            {activePreviewTab === 'realtor' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                        alt="Realtor"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-emerald)' }}
                      />
                      <div>
                        <div className="badge badge-emerald" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>Проверенный партнер</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Trần Minh (Тран Минь)</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nha Trang Bay Homes &bull; Опыт 6 лет</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {language === 'ru'
                        ? 'Специализируется на подборе апартаментов для экспатов. Общается на русском и английском, присылает живые видео с открытыми окнами до выезда на просмотр.'
                        : 'Specializes in expat apartments. Speaks fluent English, provides live video tours with open windows prior to on-site visits.'}
                    </p>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} color="var(--accent-emerald)" />
                      <span>{language === 'ru' ? '4 правила осмотра жилья:' : '4 Inspection Golden Rules:'}</span>
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li><strong>Живые видео с окнами</strong> — проверка звука строек и караоке до выезда</li>
                      <li><strong>Понятный тариф EVN</strong> — фиксация рыночной нормы до 4500 ₫/кВт</li>
                      <li><strong>Регистрация tạm trú</strong> — обязательство лендлорда подать данные за 24ч</li>
                      <li><strong>Аудит договора</strong> — проверка основателем перед внесением залога</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 3. LEASE AUDIT TAB */}
            {activePreviewTab === 'lease_audit' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Дистанционный юридический аудит договора аренды' : 'Remote Lease Agreement Audit'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      Hiyori Garden Tower &bull; Договор на 12 месяцев
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                    <ShieldCheck size={14} /> {language === 'ru' ? 'Одобрено с правками' : 'Approved with Notes'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.85rem' }}>1. Возврат залога (Deposit)</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Безопасно</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Зафиксирован возврат в течение 3 рабочих дней после акта сдачи.
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-emerald)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.85rem' }}>2. Тариф электричества EVN</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>4 200 ₫/кВт</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Ставка зафиксирована в договоре (норма кондоминиумов до 4500 ₫) без сезонных накруток.
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.85rem' }}>3. Регистрация tạm trú</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>24 часа</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Обязательство собственника зарегистрировать жильцов в миграционной полиции.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. VIP TAB */}
            {activePreviewTab === 'vip' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  
                  {/* Maria Egorova */}
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '2px solid #FCD34D' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
                        alt="Egorova Maria"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D97706' }}
                      />
                      <div>
                        <div className="badge badge-emerald" style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                          1 сессия бесплатно в VIP
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>Егорова Мария</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Дипломированный психолог, клинический специалист, сексолог (4 года практики)</div>
                      </div>
                    </div>
                    
                    <div style={{ background: '#FAF8F5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px dashed #D97706', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Промокод на 2-ю сессию:</div>
                        <div style={{ fontWeight: 800, color: '#B45309', fontFamily: 'monospace', fontSize: '1rem' }}>VIETRELOC-VIP20</div>
                      </div>
                      <button
                        onClick={handleCopyPromo}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        {copiedPromo ? <Check size={12} color="#0F766E" /> : <Copy size={12} />}
                        <span>{copiedPromo ? 'Скопировано' : 'Копировать'}</span>
                      </button>
                    </div>

                    <a
                      href="https://t.me/mur_mur_mari"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', fontSize: '0.86rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}
                    >
                      <MessageCircle size={15} />
                      <span>{language === 'ru' ? 'Записаться в Telegram (@mur_mur_mari)' : 'Book via Telegram'}</span>
                    </a>
                  </div>

                  {/* 30-Day Accompaniment */}
                  <div className="cloud-support-bubble" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          <Send size={14} /> {language === 'ru' ? 'Личное сопровождение (1 месяц)' : '1-Month Accompaniment'}
                        </div>
                        <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>28 из 30 дней</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', margin: '0 0 0.4rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                        {language === 'ru' ? '30 дней прямого сопровождения в Telegram' : '30-Day Founder Telegram Support'}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                        {language === 'ru'
                          ? 'Прямой закрытый чат 1-на-1 с основателем. Быстрое решение любых бытовых, визовых и локационных вопросов в первый месяц жизни во Вьетнаме.'
                          : 'Direct 1-on-1 private chat for prompt answers on visas, banking, bike rentals, and living throughout your first month.'}
                      </p>
                    </div>

                    <div style={{ marginTop: '1.25rem' }}>
                      <a
                        href="https://t.me/Likqwerty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: '0.86rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none', borderRadius: '9999px' }}
                      >
                        <Send size={14} />
                        <span>{language === 'ru' ? 'Прямой чат в Telegram' : 'Open Telegram Chat'}</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 5. TRAVEL ITINERARY TAB ($290) */}
            {activePreviewTab === 'travel' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Персональный маршрут путешествия (1–30 дней)' : 'Bespoke Travel Itinerary (1–30 Days)'}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                      {language === 'ru' ? 'Дананг &bull; Хойан &bull; Хюэ под ваши даты и бюджет' : 'Da Nang &bull; Hoi An &bull; Hue tailored to your dates'}
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>Поддержка в WhatsApp 14 дней</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div className="badge badge-emerald" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>День 1 • Утро</div>
                    <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.25rem' }}>Кофе в 43 Factory Roasters & пляж</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Лучший спешелти-кофе в Ан Тхыонг, покупка SIM-карты Viettel в официальном салоне.
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div className="badge badge-terracotta" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>День 1 • День</div>
                    <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.25rem' }}>Мраморные горы и панорама</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Подъем на лифте в гроты Хуен Кхонг, GrabCar ~110 000 ₫ в одну сторону.
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div className="badge badge-emerald" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>День 1 • Вечер</div>
                    <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.25rem' }}>Мост Дракона и морепродукты</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Проверенный ресторан Hải Sản Năm Đảnh без туристической наценки.
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* CTA to open full client dashboard preview */}
          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <button
              onClick={() => setViewMode('dashboard')}
              className="btn btn-primary"
              style={{ fontSize: '0.95rem', padding: '0.85rem 1.8rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>{language === 'ru' ? 'Открыть демо-кабинет клиента' : 'Open Live Workspace Demo'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
