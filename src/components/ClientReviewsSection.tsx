import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Send,
  FileText,
  Home,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Zap,
  Lock
} from 'lucide-react';

export const ClientReviewsSection: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'lease' | 'housing' | 'arrival' | 'forceMajeure'>('lease');

  const situations = {
    lease: {
      id: 'lease',
      tabLabel: language === 'ru' ? 'Договор аренды и залог' : 'Lease Contract & Deposit',
      icon: FileText,
      title: language === 'ru' ? 'Аренда жилья, коммуналка и защита залога' : 'Rental Lease, Utilities & Deposit Protection',
      problemPoints: language === 'ru' ? [
        'Тариф на свет не фиксируют в договоре или пытаются накрутить с потолка выше нормы.',
        'В квартире стоит старый неинверторный кондиционер, который сжигает электричества на сотни долларов в месяц.',
        'Пункт о возврате залога ($500–$1000) составлен размыто: хозяин может удержать депозит при выезде под предлогом "царапины на стене".',
        'Хозяин тянет или отказывается делать обязательную регистрацию в полиции (tạm trú), что грозит штрафами и визовыми проблемами.'
      ] : [
        'Electricity rate is omitted in the lease or inflated arbitrarily above the normal residential rate.',
        'Outdated non-inverter air conditioner consuming excessive power and racking up huge monthly electric bills.',
        'Vague deposit return clauses ($500–$1000), leaving the tenant vulnerable to unfair deductions upon checkout.',
        'Landlord delays or neglects local police tenant registration (tạm trú), risking fines and visa complications.'
      ],
      solutionPoints: language === 'ru' ? [
        'Лично вычитываю договор до внесения аванса и фиксирую нормальный стандартный тариф на свет (4 000 – 4 500 VND за кВт) без сюрпризов.',
        'Проверяю технику в квартире (наличие инвертора у кондиционера и его реальное состояние).',
        'Вношу жёсткий пункт о возврате депозита в день выезда и составляю акт приёмки с видеофиксацией каждого угла и мебели.',
        'Контролирую подтверждение подачи собственником на tạm trú в первые 24 часа после вашего заселения.'
      ] : [
        'I personally review the contract before any payment, fixing the standard rate (4,000–4,500 VND/kWh) with no surprises.',
        'I inspect home appliances, verifying the presence and condition of energy-efficient inverter air conditioning.',
        'I enforce a strict clause guaranteeing deposit return upon checkout, backed by a video inspection protocol of all furnishings.',
        'I monitor and confirm the landlord submits your mandatory tạm trú registration within the first 24 hours of arrival.'
      ],
      outcome: language === 'ru'
        ? 'Защищённый депозит ($500–$1000), предсказуемые счета за свет и легальное спокойное проживание без визовых рисков.'
        : 'Protected security deposit ($500–$1000), predictable utility bills, and 100% compliant temporary police registration.'
    },
    housing: {
      id: 'housing',
      tabLabel: language === 'ru' ? 'Поиск жилья и риелторы' : 'Housing Search & Realtors',
      icon: Home,
      title: language === 'ru' ? 'Подбор кондоминиума без фейковых объявлений' : 'Condo Selection Without Bait-and-Switch Listings',
      problemPoints: language === 'ru' ? [
        'В чатах Telegram и группах Facebook заманивают красивыми отретушированными фото апартаментов по $250–$300.',
        'По приезде оказывается, что «эту квартиру сдали полчаса назад», и предлагают тёмные сырые студии с плесенью и окнами в стену стройки.',
        'Недобросовестные посредники требуют комиссию с арендатора или скрывают, что рядом начинается забивка свай.'
      ] : [
        'Telegram groups and Facebook boards lure newcomers with staged photos of high-end condos for $250–$300.',
        'Upon arrival, agents claim "it was just rented 10 minutes ago" and pivot to damp studios with mold facing construction walls.',
        'Unscrupulous middlemen attempt to charge tenant finder fees or conceal nearby pile-driving construction.'
      ],
      solutionPoints: language === 'ru' ? [
        'Работаю только с проверенными локальными риелторами, которые показывают реальные варианты и не берут ни цента с клиента (их услуги оплачивает собственник).',
        'Фильтрую кондоминиумы по реальной звукоизоляции, отсутствию строек и состоянию здания ещё до вашего вылета.',
        'При необходимости организую живой видеопоказ или личный осмотр проверенным человеком на месте.'
      ] : [
        'I partner exclusively with vetted local agents showing genuine units with zero tenant-side fees (landlord pays the commission).',
        'I pre-screen properties for soundproofing, construction proximity, and building maintenance prior to your departure.',
        'I arrange live walkthroughs or on-the-ground inspections by verified local partners whenever needed.'
      ],
      outcome: language === 'ru'
        ? 'Заселение за 24–48 часов в чистое проверенное жильё без потери 2 недель в отеле и испорченного старта.'
        : 'Smooth check-in within 24–48 hours into a vetted condo, avoiding weeks stranded in overpriced hotels.'
    },
    arrival: {
      id: 'arrival',
      tabLabel: language === 'ru' ? 'Первые дни и логистика' : 'First 48 Hours & Logistics',
      icon: Compass,
      title: language === 'ru' ? 'Связь, валюта и адаптация без переплат' : 'SIM, Currency & First Days Without Overpaying',
      problemPoints: language === 'ru' ? [
        'В аэропорту продают «туристические» SIM-карты втрое дороже с урезанным пакетом трафика.',
        'Обменники в терминалах и сомнительные менялы предлагают заниженный курс валют со скрытой комиссией.',
        'Таксисты у выхода накручивают двойной тариф или везут кругами, пользуясь незнанием города.'
      ] : [
        'Airport kiosks push marked-up "tourist" SIM cards with throttled data limits at 3x standard pricing.',
        'Airport exchange counters and unofficial street changers apply unfavorable rates with hidden spreads.',
        'Cabs waiting outside international terminals overcharge heavily or take circuitous routes.'
      ],
      solutionPoints: language === 'ru' ? [
        'Выдаю авторский персональный маршрут: точные адреса официальных салонов Viettel с нормальным безлимитным пакетом.',
        'Проверенные ювелирные лавки с максимальным честным курсом обмена доллара на донги без комиссий.',
        'Пошаговая инструкция по вызову GrabCar по фиксированной цене и доставке еды в день прилёта.'
      ] : [
        'I provide an exact arrival itinerary: addresses of official carrier centers (Viettel) with legitimate unlimited plans.',
        'Vetted gold jewelry quarter locations offering the city’s highest bank-grade cash exchange rates with zero fees.',
        'Step-by-step onboarding for Grab ride-hailing and food delivery apps directly upon landing.'
      ],
      outcome: language === 'ru'
        ? 'Ноль переплат на старте, стабильный быстрый интернет в первый же час и спокойный первый день.'
        : 'Zero starting markups, high-speed mobile internet within hour one, and a seamless, stress-free arrival.'
    },
    forceMajeure: {
      id: 'forceMajeure',
      tabLabel: language === 'ru' ? 'Бытовой форс-мажор' : 'Everyday Troubleshooting',
      icon: HelpCircle,
      title: language === 'ru' ? 'Языковой барьер и бытовые вопросы' : 'Language Barrier & Rapid Household Support',
      problemPoints: language === 'ru' ? [
        'Потёк кондиционер, отключился интернет перед рабочим созвоном или сломался бойлер.',
        'Вьетнамский хозяин жилья не говорит по-английски, отвечает раз в сутки или просто разводит руками.',
        'Внезапная необходимость найти проверенную клинику, англоязычного врача или аптеку с нужными лекарствами.'
      ] : [
        'Air conditioner leaks, optical fiber drops before an important remote call, or water heater malfunctions.',
        'Vietnamese landlord speaks no English, replies once every 24 hours, or ignores maintenance requests.',
        'Emergency necessity to find an English-speaking clinic, trusted hospital, or pharmacy carrying specific medications.'
      ],
      solutionPoints: language === 'ru' ? [
        'Вы не остаётесь один на один с чужой страной: вы пишете мне напрямую в Telegram, и я помогаю решить вопрос с владельцем или управляющей компанией.',
        'При сбоях связи подключаем резервный мобильный интернет или оперативно вызываем местного провайдера.',
        'Предоставляю проверенный список англо- и русскоязычных клиник с круглосуточным приёмом и контакты экстренных служб.'
      ] : [
        'You are never left stranded: message me directly on Telegram, and I liaise directly with the landlord or management office.',
        'If home broadband drops, we deploy immediate backup tethering solutions or dispatch technician support.',
        'I supply an emergency directory of international clinics with 24/7 English-speaking practitioners and emergency services.'
      ],
      outcome: language === 'ru'
        ? 'Любая бытовая проблема решается за пару часов, а не превращается в недельный стресс.'
        : 'Any household issue is resolved promptly without turning into a week of frustration.'
    }
  };

  const activeSituation = situations[activeTab];

  return (
    <section id="reviews-section" style={{ padding: '4.5rem 0', background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F2EA 100%)', borderTop: '1px solid var(--border-subtle)', position: 'relative', scrollMarginTop: '90px' }}>
      <div className="container">

        {/* ============================================================ */}
        {/* PART 1: FOUNDER'S MANIFEST (FEMALE FIRST-PERSON DIRECT VOICE) */}
        {/* ============================================================ */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 16px 36px -10px rgba(28, 45, 42, 0.07)',
          overflow: 'hidden',
          marginBottom: '3.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.85fr)',
            alignItems: 'stretch'
          }} className="founder-manifest-grid">
            
            {/* Left: Text Manifesto */}
            <div style={{ padding: 'clamp(2rem, 4vw, 3.25rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'var(--accent-emerald-light)', border: '1px solid var(--border-emerald)', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600, width: 'fit-content', marginBottom: '1.1rem' }}>
                <Sparkles size={13} />
                <span>{language === 'ru' ? 'Личный подход и принципы работы' : 'Founder Manifesto & Direct Accountability'}</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 2.6vw, 2.35rem)',
                lineHeight: 1.22,
                color: 'var(--text-main)',
                margin: '0 0 1.15rem 0',
                letterSpacing: '-0.02em'
              }}>
                {language === 'ru'
                  ? '«Я прошла этот путь сама — и знаю, где во Вьетнаме теряют деньги и нервы»'
                  : '"I navigated this journey myself — and know exactly where newcomers lose money and peace of mind"'}
              </h2>

              <p style={{
                fontSize: '1.02rem',
                lineHeight: 1.62,
                color: 'var(--text-muted)',
                margin: '0 0 1.5rem 0'
              }}>
                {language === 'ru' ? (
                  <>
                    Когда я переехала во Вьетнам, я на собственном опыте столкнулась со всеми подводными камнями: от попыток удержать залог при выезде и завысить счета за свет до фейковых объявлений в чатах. Я создала VietReloc, чтобы вам не пришлось проходить через этот стресс. Я живу здесь, знаю реальные правила и лично отвечаю за каждый проверенный договор и маршрут — <strong>без наёмных операторов и без скрытых комиссий риелторов</strong>.
                  </>
                ) : (
                  <>
                    When I relocated to Vietnam, I experienced firsthand the full spectrum of local pitfalls: from deposit retention disputes to inflated utility bills and bait-and-switch listings. I built VietReloc so you don’t have to suffer through that stress. I live here, understand the real market mechanics, and personally guarantee every contract audit and daily itinerary — <strong>with zero call center operators and zero hidden broker commissions</strong>.
                  </>
                )}
              </p>

              {/* 3 Core Principles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
                
                <div style={{ background: '#FAF8F5', borderRadius: '14px', padding: '0.85rem 1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <ShieldCheck size={16} />
                    <span>{language === 'ru' ? 'Защищаю только вас' : 'Your Sole Advocate'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {language === 'ru' ? 'Никаких скрытых комиссий от риелторов или собственников.' : 'Zero hidden kickbacks from brokers or landlords.'}
                  </div>
                </div>

                <div style={{ background: '#FAF8F5', borderRadius: '14px', padding: '0.85rem 1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <Lock size={16} />
                    <span>{language === 'ru' ? 'Аудит как для себя' : 'Thorough Lease Audit'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {language === 'ru' ? 'Защита залога, фиксация тарифов и контроль регистрации tạm trú.' : 'Deposit recovery terms, utility caps, and mandatory police registration.'}
                  </div>
                </div>

                <div style={{ background: '#FAF8F5', borderRadius: '14px', padding: '0.85rem 1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <Send size={15} />
                    <span>{language === 'ru' ? 'Лично в Telegram' : 'Direct on Telegram'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {language === 'ru' ? 'Прямой диалог со мной без шаблонных скриптов и чат-ботов.' : 'Direct personal chat with me without bot filters or scripts.'}
                  </div>
                </div>

              </div>

              {/* Founder Telegram Direct Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://t.me/Likqwerty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.85rem 1.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.94rem',
                    textDecoration: 'none'
                  }}
                >
                  <Send size={16} />
                  <span>{language === 'ru' ? 'Написать лично основательнице' : 'Message Founder on Telegram'}</span>
                </a>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Telegram: <strong style={{ color: 'var(--accent-emerald)' }}>@Likqwerty</strong>
                </span>
              </div>

            </div>

            {/* Right: Founder Photo */}
            <div style={{
              position: 'relative',
              background: '#181A1B',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '380px'
            }} className="founder-photo-col">
              <img
                src="/founder-photo.jpg"
                alt="Основательница VietReloc"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem 1.25rem 1.25rem 1.25rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 65%, transparent 100%)',
                color: '#FFFFFF'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
                  {language === 'ru' ? 'Основательница VietReloc' : 'VietReloc Founder'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginTop: '2px' }}>
                  {language === 'ru' ? 'Дананг · Нячанг · Персональное сопровождение' : 'Da Nang · Nha Trang · Personal Concierge'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* PART 2: THE PRACTICAL PLAYBOOK (SITUATION -> HOW I SOLVE IT) */}
        {/* ============================================================ */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.25rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.75rem', fontSize: '0.8rem' }}>
            <Zap size={13} /> {language === 'ru' ? 'Практический протокол' : 'Operational Playbook'}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 3vw, 2.45rem)',
            marginBottom: '0.75rem',
            color: 'var(--text-main)',
            letterSpacing: '-0.02em'
          }}>
            {language === 'ru' ? 'Как я решаю реальные ситуации' : 'How I Solve Real Relocation Scenarios'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', margin: 0, lineHeight: 1.55 }}>
            {language === 'ru'
              ? 'Никаких шаблонных хвалебных отзывов. Вот с какими проблемами сталкивается каждый во Вьетнаме — и какой алгоритм действий я применяю для вашей защиты.'
              : 'Zero cookie-cutter testimonials. Here are the genuine challenges faced in Vietnam — and my concrete protocol to protect you.'}
          </p>
        </div>

        {/* 4 Interactive Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {Object.values(situations).map((sit) => {
            const Icon = sit.icon;
            const isActive = activeTab === sit.id;
            return (
              <button
                key={sit.id}
                onClick={() => setActiveTab(sit.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--accent-emerald)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  boxShadow: isActive ? '0 4px 14px rgba(15, 118, 110, 0.22)' : '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{sit.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Situation Teardown Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 12px 30px -8px rgba(28, 45, 42, 0.08)',
          overflow: 'hidden'
        }}>
          
          {/* Card Top Title */}
          <div style={{
            padding: '1.25rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <activeSituation.icon size={20} style={{ color: 'var(--accent-emerald)' }} />
              <h3 style={{ fontSize: '1.18rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                {activeSituation.title}
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, background: 'var(--accent-emerald-light)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
              {language === 'ru' ? 'Реальный сценарий' : 'Real-life Scenario'}
            </span>
          </div>

          {/* 2-Column Side-by-Side Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.05fr',
            gap: 0
          }} className="situation-split-grid">
            
            {/* Left Column: What people usually face (The Problem) */}
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              background: '#FFFBF7',
              borderRight: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#C25E20',
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}>
                <AlertTriangle size={16} />
                <span>{language === 'ru' ? 'С чем обычно сталкиваются:' : 'Common Local Traps & Risks:'}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeSituation.problemPoints.map((pt, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', lineHeight: 1.55, color: '#4B5563' }}>
                    <span style={{ color: '#EF4444', fontWeight: 700, lineHeight: 1, marginTop: '3px', flexShrink: 0 }}>✕</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: How I Solve It (The Founder Solution) */}
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              background: '#F9FCFB'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--accent-emerald)',
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}>
                <CheckCircle2 size={16} />
                <span>{language === 'ru' ? 'Как я это решаю:' : 'My Personal Protocol:'}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeSituation.solutionPoints.map((pt, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', lineHeight: 1.55, color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Outcome Bottom Summary Strip */}
          <div style={{
            padding: '1.15rem 2rem',
            background: 'linear-gradient(90deg, #F0FDF4 0%, #ECFDF5 100%)',
            borderTop: '1px solid var(--border-emerald)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--accent-emerald)',
              fontWeight: 700,
              fontSize: '0.86rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              <ShieldCheck size={16} />
              <span>{language === 'ru' ? 'Результат для вас:' : 'Your Concrete Result:'}</span>
            </div>
            <div style={{ fontSize: '0.95rem', color: '#064E3B', fontWeight: 600, lineHeight: 1.45 }}>
              {activeSituation.outcome}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-manifest-grid {
            grid-template-columns: 1fr !important;
          }
          .founder-photo-col {
            min-height: 320px !important;
            max-height: 400px !important;
            order: -1;
          }
          .situation-split-grid {
            grid-template-columns: 1fr !important;
          }
          .situation-split-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
          }
        }
      `}</style>
    </section>
  );
};
export { ClientReviewsSection as FounderManifestAndCases };
