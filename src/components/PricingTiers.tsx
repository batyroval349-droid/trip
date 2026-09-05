import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Star, Zap, ShieldCheck } from 'lucide-react';

export const PricingTiers: React.FC = () => {
  const { t, startBooking, language } = useApp();

  const tiers = [
    {
      id: 'tier1',
      title: t('tier1Title'),
      price: t('tier1Price'),
      badge: t('tier1Badge'),
      badgeColor: 'badge-emerald',
      description: t('tier1Desc'),
      features: [
        t('tier1Feat1'),
        t('tier1Feat2'),
        t('tier1Feat3'),
        t('tier1Feat4'),
        t('tier1Feat5' as any)
      ],
      ctaText: t('pricingCTA'),
      isPromo: true,
      btnClass: 'btn-primary'
    },
    {
      id: 'tier2',
      title: t('tier2Title'),
      price: t('tier2Price'),
      badge: null,
      badgeColor: '',
      description: t('tier2Desc'),
      features: [
        t('tier2Feat1'),
        t('tier2Feat2'),
        t('tier2Feat3'),
        t('tier2Feat4'),
        t('tier2Feat5' as any),
        t('tier2Feat6' as any)
      ],
      ctaText: t('pricingCTA'),
      isPromo: false,
      btnClass: 'btn-primary'
    },
    {
      id: 'tier3',
      title: t('tier3Title'),
      price: t('tier3Price'),
      badge: t('tier3Badge'),
      badgeColor: 'badge-terracotta',
      description: t('tier3Desc'),
      features: [
        t('tier3Feat1'),
        t('tier3Feat2'),
        t('tier3Feat3'),
        t('tier3Feat4')
      ],
      ctaText: t('pricingCTA'),
      isPromo: false,
      isPopular: true,
      btnClass: 'btn-primary'
    },
    {
      id: 'tier4',
      title: t('tier4Title'),
      price: t('tier4Price'),
      badge: t('tier4Badge'),
      badgeColor: 'badge-emerald',
      description: t('tier4Desc'),
      features: [
        t('tier4Feat1'),
        t('tier4Feat2'),
        t('tier4Feat3'),
        t('tier4Feat4')
      ],
      ctaText: t('pricingCTA'),
      isPromo: false,
      btnClass: 'btn-primary'
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
          
          {/* Sentence Case Title requested by user! */}
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('pricingTitle')}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {t('pricingSubhead')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-4" style={{ alignItems: 'stretch' }}>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card ${tier.isPopular ? 'glass-card-terracotta' : ''} ${tier.isPromo ? 'glass-card-emerald' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                padding: '1.25rem 1.5rem',
                border: tier.isPopular ? '2px solid var(--accent-terracotta)' : tier.isPromo ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)'
              }}
            >
              <div>
                
                {/* Badge if present */}
                {tier.badge && (
                  <div className={`badge ${tier.badgeColor}`} style={{ marginBottom: '0.75rem' }}>
                    {tier.isPromo ? <Sparkles size={12} /> : <Star size={12} />} {tier.badge}
                  </div>
                )}

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {tier.title}
                </h3>

                <div style={{ margin: '0.75rem 0', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '2.35rem', fontWeight: 800, color: tier.isPromo ? 'var(--accent-emerald)' : 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    / {tier.id === 'tier1' ? (language === 'ru' ? 'звонок' : 'call') : (language === 'ru' ? 'проект' : 'project')}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', minHeight: '38px' }}>
                  {tier.description}
                </p>

                {/* Features List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {tier.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.86rem' }}>
                      <Check size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button - Simply 'Выбрать' as requested by user! */}
              <button
                onClick={() => startBooking(tier.id)}
                className={`btn ${tier.btnClass}`}
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem' }}
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
