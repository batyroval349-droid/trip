import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Compass, MapPin } from 'lucide-react';

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
    <section style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          
          {/* Left: Brand Headline & Value Proposition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
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
                ? 'Авторские пошаговые маршруты, проверенные локальные риелторы, независимый юридический аудит договоров аренды и персональное сопровождение основателя — от первой e-Visa до комфортной жизни у моря.'
                : 'Bespoke daily itineraries, vetted local realtors, independent lease due diligence, and personal founder guidance — from your initial e-Visa to effortless living by the sea.'}
            </p>

            {/* CTAs with 3D Icons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.75rem' }}>
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

            {/* Reassurance Micro-banner */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              marginTop: '0.5rem'
            }}>
              <span className="badge badge-emerald" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                Telegram & WhatsApp
              </span>
              <span>
                {language === 'ru'
                  ? 'Прямой контакт с основателем и риелтором без ботов'
                  : 'Direct human guidance with founder & vetted realtors'}
              </span>
            </div>

          </div>

          {/* Right: Animated Scenic Vietnam Banner */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
            <div className="vietnam-scenic-banner" style={{ aspectRatio: '16/10', maxHeight: '380px' }}>
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85"
                alt="Vietnam Karst Landscape Trang An Ninh Binh"
                loading="eager"
              />
              
              {/* Subtle gradient vignette at bottom */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(19, 37, 34, 0.65) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Floating City Pill Badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(12px)',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
                <span className="icon-3d-hover" style={{ color: 'var(--accent-emerald)' }}>
                  <MapPin size={15} />
                </span>
                <span>{language === 'ru' ? 'Дананг · Нячанг · Ханой · Хойан' : 'Da Nang · Nha Trang · Hanoi · Hoi An'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
