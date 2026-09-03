import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, setViewMode } = useApp();

  return (
    <section style={{ padding: '4.5rem 0 3rem 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Subtle Badge */}
          <div className="badge badge-emerald" style={{ marginBottom: '1.5rem', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} /> {t('badgeRemote')}
          </div>

          {/* Clean Headline requested by user */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            color: 'var(--text-main)'
          }}>
            {t('heroHeadline')}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto'
          }}>
            {t('heroSubhead')}
          </p>

          {/* Call to Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ fontSize: '1.05rem', padding: '1.1rem 2.5rem' }}
              onClick={() => setViewMode('express_booking')}
            >
              {t('heroCtaPrimary')} <ArrowRight size={18} />
            </button>
          </div>

          {/* Free Promo Banner Badge under CTAs */}
          <div style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-emerald-light)', border: '1px solid var(--border-emerald)', borderRadius: '9999px', padding: '0.4rem 1.25rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            <Sparkles size={16} /> {t('promoOfferBanner')}
          </div>

        </div>
      </div>
    </section>
  );
};
