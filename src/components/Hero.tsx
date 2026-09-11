import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Star
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, setViewMode } = useApp();

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setViewMode('marketing');
      setTimeout(() => {
        document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className="hero-fullbleed-section">
      <div className="hero-fullbleed-grid">
        
        {/* Left: Brand Headline, Value Proposition & CTAs (aligned with site container) */}
        <div className="hero-fullbleed-left">
          <div className="hero-left-content">
            
            <h1 style={{
              fontSize: 'clamp(2rem, 3.1vw, 2.85rem)',
              lineHeight: 1.18,
              margin: 0,
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              {language === 'ru' ? (
                <>
                  Ваш персональный проводник в{' '}
                  <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>
                    путешествиях и релокации
                  </span>{' '}
                  во Вьетнам
                </>
              ) : (
                <>
                  Your Personal Guide to{' '}
                  <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>
                    Travel & Relocation
                  </span>{' '}
                  in Vietnam
                </>
              )}
            </h1>

            <p style={{
              fontSize: '1.02rem',
              color: 'var(--text-muted)',
              lineHeight: 1.55,
              margin: 0
            }}>
              {language === 'ru'
                ? 'Авторские пошаговые маршруты, проверенные локальные риелторы, независимый аудит договоров аренды и персональное сопровождение — от первой e-Visa до комфортной жизни у моря.'
                : 'Bespoke daily itineraries, vetted local realtors, independent lease audit, and personal guidance — from your initial e-Visa to effortless living by the sea.'}
            </p>

            {/* Single High-Converting Primary CTA */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.2rem' }}>
              <button
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '0.85rem 2rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                onClick={scrollToPricing}
              >
                <span className="icon-3d-hover">
                  <Compass size={18} />
                </span>
                <span>{language === 'ru' ? 'Выбрать тариф и начать' : 'Choose Plan & Begin'}</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Social Proof Trust Strip */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '0.6rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.07)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 700 }}>
                <Star size={15} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                <span>4.9 / 5</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '2px' }}>
                  {language === 'ru' ? 'оценка клиентов' : 'client rating'}
                </span>
              </div>

              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E1' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
                <span>{language === 'ru' ? 'Аудит договора' : 'Lease Audit'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Full-Bleed Photograph (90vh-100vh, flush to right edge of screen, zero borders, pure photography) */}
        <div className="hero-fullbleed-right">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=85"
            alt="Vietnam Karst Landscape Trang An Ninh Binh"
            className="hero-fullbleed-img"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};
