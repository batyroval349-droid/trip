import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Star, Zap, ShieldCheck, Compass } from 'lucide-react';

export const PricingTiers: React.FC = () => {
  const { t, startBooking, language } = useApp();

  const tiers = [
    {
      id: 'tier1',
      title: t('tier1Title'),
      price: t('tier1Price'),
      badge: t('tier1Badge'),
      badgeColor: 'badge-emerald',
      badgeIcon: Sparkles,
      description: t('tier1Desc'),
      features: [
        { strong: language === 'ru' ? '60 минут' : '60 minutes', text: language === 'ru' ? 'личной видео-встречи с основателем' : '1-on-1 personal video call with founder' },
        { strong: language === 'ru' ? 'Оценка целесообразности' : 'Feasibility assessment', text: language === 'ru' ? 'переезда под ваши цели' : 'tailored to your personal goals' },
        { strong: language === 'ru' ? 'Обзор городов' : 'City & season overview', text: language === 'ru' ? 'и сезонов под ваши задачи' : 'matched to your profile' },
        { strong: language === 'ru' ? 'Резюме рекомендаций' : 'Written summary', text: language === 'ru' ? 'с выводами после созвона' : 'of key takeaways after the call' },
        { strong: language === 'ru' ? 'Скидка на пакет' : 'Package discount', text: language === 'ru' ? 'поездки/релокации при заказе за 7 дней' : 'on travel or relocation within 7 days' }
      ],
      ctaText: language === 'ru' ? 'Записаться на звонок' : 'Book a Call',
      isHero: false,
      btnClass: 'btn-secondary'
    },
    {
      id: 'tier2',
      title: t('tier2Title'),
      price: t('tier2Price'),
      badge: t('tier2Badge' as any) || (language === 'ru' ? 'Маршрут 1–30 дней' : '1–30 Day Route'),
      badgeColor: 'badge-subtle',
      badgeIcon: Compass,
      description: t('tier2Desc'),
      features: [
        { strong: language === 'ru' ? 'Маршрут 1–30 дней' : '1–30 day itinerary', text: language === 'ru' ? 'под ваши даты и бюджет' : 'tailored to dates and budget' },
        { strong: language === 'ru' ? 'Подбор городов' : 'City selection', text: language === 'ru' ? 'и локаций под ваши интересы' : 'matched to your interests' },
        { strong: language === 'ru' ? 'Связь и SIM/eSIM' : 'SIM / eSIM guidance', text: language === 'ru' ? 'рекомендации и адреса точек' : 'recommendations and store spots' },
        { strong: language === 'ru' ? 'Поддержка в WhatsApp' : 'WhatsApp support', text: language === 'ru' ? 'на всё время вашего путешествия' : 'throughout your trip duration' },
        { strong: language === 'ru' ? '1 корректировка' : '1 route revision', text: language === 'ru' ? 'маршрута + экстренные контакты' : '+ emergency contacts list' }
      ],
      ctaText: language === 'ru' ? 'Выбрать тариф' : 'Select Plan',
      isHero: false,
      btnClass: 'btn-secondary'
    },
    {
      id: 'tier3',
      title: t('tier3Title'),
      price: t('tier3Price'),
      badge: t('tier3Badge'),
      badgeColor: 'badge-terracotta',
      badgeIcon: Star,
      description: t('tier3Desc'),
      bonusPack: t('tier3BonusPack' as any),
      features: [
        { strong: language === 'ru' ? 'Интерактивный калькулятор' : 'Interactive calculator', text: language === 'ru' ? 'бюджета в личном кабинете' : 'in your client dashboard' },
        { strong: language === 'ru' ? 'Проверенный риелтор' : 'Verified partner-realtor', text: language === 'ru' ? 'реальные варианты жилья' : 'real vetted housing options' },
        { strong: language === 'ru' ? 'Персональный чек-лист' : 'Personalized checklist', text: language === 'ru' ? 'документы, визы, сроки' : 'documents, visas, timelines' },
        { strong: language === 'ru' ? 'Подбор районов' : 'Neighborhood matching', text: language === 'ru' ? 'и инфраструктуры под ваш стиль' : 'and lifestyle infrastructure' },
        { strong: language === 'ru' ? 'Санитарный & семейный фильтр' : 'Sanitary & family filter', text: language === 'ru' ? 'проверка на скрытую плесень, шум и безопасность балконов' : 'inspection for hidden mold, noise & balcony safety' },
        { strong: language === 'ru' ? 'Чат-сопровождение' : '1 month chat support', text: language === 'ru' ? 'и консультации — 1 месяц' : 'and founder advisory' }
      ],
      ctaText: language === 'ru' ? 'Зафиксировать сопровождение ($490) →' : 'Lock in Relocation ($490) →',
      isHero: true,
      btnClass: 'btn-terracotta'
    },
    {
      id: 'tier4',
      title: t('tier4Title'),
      price: t('tier4Price'),
      badge: t('tier4Badge'),
      badgeColor: 'badge-emerald',
      badgeIcon: Star,
      description: t('tier4Desc'),
      features: [
        { strong: language === 'ru' ? 'Всё из тарифа Релокация' : 'Everything in Relocation', text: language === 'ru' ? 'полный комплект материалов' : 'complete planning package' },
        { strong: language === 'ru' ? 'Приоритетная связь' : 'Priority communication', text: language === 'ru' ? 'в WhatsApp и Telegram' : 'in WhatsApp & Telegram' },
        { strong: language === 'ru' ? 'Сопровождение показов' : 'Viewing accompaniment', text: language === 'ru' ? 'жилья через риелтора-партнёра' : 'via our partner-realtor' },
        { strong: language === 'ru' ? '1 месяц поддержки' : '1 month adaptation', text: language === 'ru' ? 'по бюджету и адаптации' : 'budget & local settlement' },
        { strong: language === 'ru' ? 'Помощь по прилёту' : 'Arrival assistance', text: language === 'ru' ? 'решение срочных бытовых вопросов' : 'urgent practical setup help' }
      ],
      ctaText: language === 'ru' ? 'Выбрать VIP' : 'Select VIP',
      isHero: false,
      btnClass: 'btn-secondary'
    }
  ];

  return (
    <section id="pricing-section" style={{ padding: '5rem 0', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Zap size={14} /> {language === 'ru' ? 'Прозрачные тарифы' : 'Transparent Pricing'}
          </div>
          
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('pricingTitle')}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {t('pricingSubhead')}
          </p>
        </div>

        {/* Pricing Cards Grid with perfect horizontal baseline alignment */}
        <div className="grid-4" style={{ alignItems: 'stretch' }}>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card ${tier.isHero ? 'glass-card-terracotta' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                padding: '1.25rem 1.4rem',
                border: tier.isHero ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                boxShadow: tier.isHero ? '0 10px 30px rgba(194, 94, 32, 0.12)' : 'var(--shadow-card)',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                
                {/* 1. Uniform Badge Row */}
                <div style={{ minHeight: '28px', display: 'flex', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div className={`badge ${tier.badgeColor}`} style={{ fontSize: '0.78rem', padding: '0.28rem 0.75rem' }}>
                    <tier.badgeIcon size={12} /> {tier.badge}
                  </div>
                </div>

                {/* 2. Uniform Title Row (Ensures prices align across all cards) */}
                <div style={{ minHeight: '3.6rem', display: 'flex', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.22rem', fontFamily: 'var(--font-sans)', fontWeight: 700, lineHeight: 1.25, color: 'var(--text-main)' }}>
                    {tier.title}
                  </h3>
                </div>

                {/* 3. Uniform Price Row (Horizontal baseline across all cards) */}
                <div style={{ minHeight: '44px', display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.5rem 0 0.75rem 0' }}>
                  <span style={{
                    fontSize: '2.35rem',
                    fontWeight: 800,
                    color: tier.isHero ? 'var(--accent-terracotta)' : 'var(--text-main)',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1
                  }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    / {tier.id === 'tier1' ? (language === 'ru' ? 'звонок' : 'call') : (language === 'ru' ? 'проект' : 'project')}
                  </span>
                </div>

                {/* 4. Uniform Description Row */}
                <div style={{ minHeight: '4.8rem', display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                    {tier.description}
                  </p>
                </div>

                {/* Optional Bonus Pack Pill */}
                {tier.bonusPack && (
                  <div style={{
                    marginBottom: '1.1rem',
                    padding: '0.55rem 0.75rem',
                    background: 'rgba(194, 94, 32, 0.09)',
                    border: '1px solid rgba(194, 94, 32, 0.28)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--accent-terracotta)',
                    lineHeight: 1.35
                  }}>
                    {tier.bonusPack}
                  </div>
                )}

                {/* 5. Features List with bold scannable anchors */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', padding: 0 }}>
                  {tier.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.84rem', lineHeight: 1.35 }}>
                      <Check size={16} style={{ color: tier.isHero ? 'var(--accent-terracotta)' : 'var(--accent-emerald)', flexShrink: 0, marginTop: '1px' }} />
                      <span>
                        <strong style={{ fontWeight: 600, color: 'var(--text-main)' }}>{feat.strong}</strong> {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* 6. Action Button */}
              <button
                onClick={() => startBooking(tier.id)}
                className={`btn ${tier.btnClass}`}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.92rem',
                  fontWeight: tier.isHero ? 700 : 600,
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {tier.ctaText}
              </button>

            </div>
          ))}
        </div>

        {/* Disclaimer under Card 3 stretching to Card 4 */}
        <div style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          <div className="desktop-placeholder" style={{ gridColumn: 'span 2' }} />
          <div
            className="relocation-disclaimer-box"
            style={{
              gridColumn: '3 / span 2',
              background: 'rgba(194, 94, 32, 0.07)',
              border: '1px solid var(--border-terracotta)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5
            }}
          >
            <ShieldCheck size={18} style={{ color: 'var(--accent-terracotta)', flexShrink: 0, marginTop: '2px' }} />
            <span>{t('pricingRelocationDisclaimer' as any)}</span>
          </div>
        </div>

        {/* General Remote Notice */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>{t('pricingRemoteNotice')}</span>
        </div>

      </div>
    </section>
  );
};
