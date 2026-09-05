import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Calculator,
  FileCheck,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Banknote,
  Zap,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const HousingGuidanceHub: React.FC = () => {
  const { t, language, startBooking, setViewMode } = useApp();

  const steps = [
    {
      num: '01',
      badge: t('processStep1Badge' as any),
      title: t('processStep1Title' as any),
      icon: Compass,
      desc: t('processStep1Desc' as any),
      result: t('processStep1Result' as any),
      risk: t('processStep1Risk' as any)
    },
    {
      num: '02',
      badge: t('processStep2Badge' as any),
      title: t('processStep2Title' as any),
      icon: Calculator,
      desc: t('processStep2Desc' as any),
      result: t('processStep2Result' as any),
      risk: t('processStep2Risk' as any)
    },
    {
      num: '03',
      badge: t('processStep3Badge' as any),
      title: t('processStep3Title' as any),
      icon: FileCheck,
      desc: t('processStep3Desc' as any),
      result: t('processStep3Result' as any),
      risk: t('processStep3Risk' as any)
    },
    {
      num: '04',
      badge: t('processStep4Badge' as any),
      title: t('processStep4Title' as any),
      icon: KeyRound,
      desc: t('processStep4Desc' as any),
      result: t('processStep4Result' as any),
      risk: t('processStep4Risk' as any)
    }
  ];

  const risks = [
    {
      icon: Banknote,
      title: t('shieldRisk1Title' as any),
      cost: t('shieldRisk1Cost' as any),
      desc: t('shieldRisk1Desc' as any),
      shield: t('shieldRisk1Shield' as any)
    },
    {
      icon: Zap,
      title: t('shieldRisk2Title' as any),
      cost: t('shieldRisk2Cost' as any),
      desc: t('shieldRisk2Desc' as any),
      shield: t('shieldRisk2Shield' as any)
    },
    {
      icon: Building2,
      title: t('shieldRisk3Title' as any),
      cost: t('shieldRisk3Cost' as any),
      desc: t('shieldRisk3Desc' as any),
      shield: t('shieldRisk3Shield' as any)
    },
    {
      icon: ShieldAlert,
      title: t('shieldRisk4Title' as any),
      cost: t('shieldRisk4Cost' as any),
      desc: t('shieldRisk4Desc' as any),
      shield: t('shieldRisk4Shield' as any)
    }
  ];

  return (
    <section id="process-shield-section" style={{ padding: '5.5rem 0', background: '#FAF8F5' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={14} /> {t('processBadge' as any)}
          </div>
          <h2 style={{ fontSize: '2.35rem', marginBottom: '1rem' }}>
            {t('processTitle' as any)}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t('processSubhead' as any)}
          </p>
        </div>

        {/* Tier 1: 4 Steps Roadmap (Grid-4) */}
        <div className="grid-4" style={{ alignItems: 'stretch', marginBottom: '3.5rem' }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.35rem 1.4rem',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Step Top Bar: Num & Timeline */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--accent-emerald)',
                      lineHeight: 1
                    }}>
                      {step.num}
                    </span>
                    <span className="badge badge-subtle" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--accent-emerald-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-emerald)',
                      flexShrink: 0
                    }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.08rem', fontFamily: 'var(--font-sans)', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-main)' }}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Badges / Result & Shield */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-main)',
                    background: 'rgba(15, 118, 110, 0.05)',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    lineHeight: 1.4
                  }}>
                    <strong style={{ color: 'var(--accent-emerald)' }}>{language === 'ru' ? 'Результат:' : 'Result:'}</strong> {step.result}
                  </div>
                  <div style={{
                    fontSize: '0.76rem',
                    color: 'var(--accent-terracotta)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.35rem',
                    lineHeight: 1.35
                  }}>
                    <ShieldCheck size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{step.risk}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Tier 2: The Monumental Financial Shield Container */}
        <div
          className="glass-card shield-outer-card"
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
            border: '1.5px solid rgba(194, 94, 32, 0.25)',
            boxShadow: '0 16px 40px -8px rgba(28, 45, 42, 0.07)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          {/* Shield Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.25rem auto' }}>
            <div className="badge badge-terracotta" style={{ marginBottom: '0.75rem' }}>
              <TrendingUp size={13} /> {t('shieldBadge' as any)}
            </div>
            <h3 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-main)' }}>
              {t('shieldTitle' as any)}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.55 }}>
              {t('shieldIntro' as any)}
            </p>
          </div>

          {/* 4 Risk Cards Grid */}
          <div className="grid-4" style={{ alignItems: 'stretch', marginBottom: '2.5rem' }}>
            {risks.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    {/* Cost Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(194, 94, 32, 0.09)',
                        color: 'var(--accent-terracotta)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ItemIcon size={17} />
                      </div>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#9C4611',
                        background: 'rgba(194, 94, 32, 0.09)',
                        border: '1px solid rgba(194, 94, 32, 0.2)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px'
                      }}>
                        {item.cost}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--text-main)' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '1rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Our Solution Tag */}
                  <div style={{
                    padding: '0.6rem 0.75rem',
                    background: 'rgba(15, 118, 110, 0.06)',
                    border: '1px solid rgba(15, 118, 110, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem',
                    lineHeight: 1.35
                  }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '1px' }} />
                    <span><strong style={{ color: 'var(--accent-emerald)' }}>{language === 'ru' ? 'Защита:' : 'Shield:'}</strong> {item.shield}</span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Summary Banner (Emerald Container) */}
          <div
            className="shield-summary-banner"
            style={{
              background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #115E59 100%)',
              padding: '1.6rem 2rem',
              borderRadius: 'var(--radius-lg)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              boxShadow: '0 8px 24px rgba(15, 118, 110, 0.25)'
            }}
          >
            <div style={{ flex: '1 1 360px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)', fontWeight: 700, marginBottom: '0.35rem' }}>
                {t('shieldSummaryLabel' as any)}
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.25, marginBottom: '0.35rem' }}>
                {t('shieldNetSavings' as any)}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                {t('shieldTotalRisk' as any)} • {t('shieldPackageCost' as any)}
              </div>
            </div>

            <div className="shield-summary-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0.6rem', minWidth: '280px' }}>
              <button
                onClick={() => startBooking('tier3')}
                className="btn btn-terracotta"
                style={{
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
              >
                {t('shieldCTA' as any)} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setViewMode('express_booking')}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '0.5rem 0.85rem',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  transition: 'background 0.2s ease'
                }}
              >
                {t('shieldCallPrompt' as any)}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export const ProcessAndSafetyShield = HousingGuidanceHub;
