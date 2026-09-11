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
        {/* Left: Free-flowing editorial typography without any container box */}
        <div className="hero-fullbleed-left">
          <div className="hero-left-content">
            
            <h1 className="editorial-hero-title">
              {language === 'ru' ? (
                <>
                  <span className="editorial-line editorial-line-1">
                    Ваш персональный проводник в
                  </span>
                  <span className="editorial-line editorial-line-2">
                    <span className="editorial-italic-highlight">путешествиях и</span>{' '}
                    <span className="editorial-italic-highlight">релокации</span>
                  </span>
                  <span className="editorial-line editorial-line-3">
                    во Вьетнам
                  </span>
                </>
              ) : (
                <>
                  <span className="editorial-line editorial-line-1">
                    Your Personal Guide to
                  </span>
                  <span className="editorial-line editorial-line-2">
                    <span className="editorial-italic-highlight">Travel &</span>{' '}
                    <span className="editorial-italic-highlight">Relocation</span>
                  </span>
                  <span className="editorial-line editorial-line-3">
                    in Vietnam
                  </span>
                </>
              )}
            </h1>

            <p className="editorial-desc">
              {language === 'ru'
                ? 'Авторские пошаговые маршруты, проверенные локальные риелторы, независимый аудит договоров аренды и персональное сопровождение — от первой e-Visa до комфортной жизни у моря.'
                : 'Bespoke daily itineraries, vetted local realtors, independent lease audit, and personal guidance — from your initial e-Visa to effortless living by the sea.'}
            </p>

            {/* Single High-Converting Primary CTA */}
            <div className="editorial-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.2rem' }}>
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

            {/* Social Proof Trust Strip (free-floating, no container border) */}
            <div className="editorial-proof" style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '0.4rem',
              paddingTop: '0.2rem'
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
