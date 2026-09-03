import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Sliders, ShieldCheck, MessageCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const { t } = useApp();

  const advantages = [
    {
      icon: UserCheck,
      title: t('why1Title'),
      desc: t('why1Desc'),
      color: 'var(--accent-emerald)',
      bg: 'var(--accent-emerald-light)',
      border: 'var(--border-emerald)'
    },
    {
      icon: Sliders,
      title: t('why2Title'),
      desc: t('why2Desc'),
      color: 'var(--accent-terracotta)',
      bg: 'var(--accent-terracotta-light)',
      border: 'var(--border-terracotta)'
    },
    {
      icon: ShieldCheck,
      title: t('why3Title'),
      desc: t('why3Desc'),
      color: 'var(--accent-emerald)',
      bg: 'var(--accent-emerald-light)',
      border: 'var(--border-emerald)'
    },
    {
      icon: MessageCircle,
      title: t('why4Title'),
      desc: t('why4Desc'),
      color: 'var(--accent-terracotta)',
      bg: 'var(--accent-terracotta-light)',
      border: 'var(--border-terracotta)'
    }
  ];

  return (
    <section style={{ padding: '4rem 0', background: '#F2EFE9' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            {t('navWhyUs')}
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>
            {t('whyTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {t('whySubhead')}
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid-2">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: adv.bg,
                  border: `1px solid ${adv.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: adv.color,
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                    {adv.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
