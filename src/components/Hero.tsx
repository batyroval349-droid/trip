import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Sparkles,
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
    <section style={{ padding: '3.5rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid-layout">
          
          {/* Left: Brand Headline & Value Proposition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 2 }}>
            
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              lineHeight: 1.14,
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
              fontSize: '1.08rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '560px'
            }}>
              {language === 'ru'
                ? 'Авторские пошаговые маршруты, проверенные локальные риелторы, независимый аудит договоров аренды и персональное сопровождение — от первой e-Visa до комфортной жизни у моря.'
                : 'Bespoke daily itineraries, vetted local realtors, independent lease audit, and personal guidance — from your initial e-Visa to effortless living by the sea.'}
            </p>

            {/* CTAs with 3D Icons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
              <button
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.85rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
                onClick={scrollToPricing}
              >
                <span className="icon-3d-hover">
                  <Compass size={18} />
                </span>
                <span>{language === 'ru' ? 'Выбрать тариф и начать' : 'Choose Plan & Begin'}</span>
                <ArrowRight size={17} />
              </button>

              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.96rem', padding: '0.85rem 1.6rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setViewMode('express_booking')}
              >
                <span className="icon-3d-hover">
                  <Sparkles size={16} style={{ color: 'var(--accent-terracotta)' }} />
                </span>
                <span>{language === 'ru' ? 'Консультация ($50)' : 'Book 1-on-1 Call ($50)'}</span>
              </button>
            </div>

            {/* Social Proof Trust Strip (No fake promises, just honest rating & contract audit) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '0.75rem',
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

          {/* Right: Large Organic Borderless Vietnam Landscape (без рамок, широкая, чистая, без лишних плашек) */}
          <div className="hero-organic-landscape-wrapper">
            <div className="hero-organic-landscape">
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85"
                alt="Vietnam Karst Landscape Trang An Ninh Binh"
                loading="eager"
              />
              
              {/* Subtle ambient gradient overlay to seamlessly merge into the warm background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(250, 248, 245, 0.35) 0%, transparent 20%, transparent 80%, rgba(250, 248, 245, 0.4) 100%), linear-gradient(to bottom, transparent 65%, rgba(250, 248, 245, 0.85) 100%)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
