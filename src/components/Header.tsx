import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, UserCheck, Settings, Menu, X, Sparkles, LogOut, LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    language,
    setLanguage,
    t,
    isFounderLoggedIn,
    logoutFounder,
    isClientUnlocked,
    currentClient,
    logoutClient,
    setIsClientLoginModalOpen
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<'home' | 'pricing' | 'faq'>('home');

  React.useEffect(() => {
    if (viewMode !== 'marketing') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pricingEl = document.getElementById('pricing-section');
      const faqEl = document.getElementById('faq-section');

      const pricingTop = pricingEl ? pricingEl.offsetTop - 200 : 99999;
      const faqTop = faqEl ? faqEl.offsetTop - 200 : 99999;

      if (scrollY >= faqTop - 50) {
        setActiveSection('faq');
      } else if (scrollY >= pricingTop - 50) {
        setActiveSection('pricing');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(250, 248, 245, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
        
        {/* Brand Logo with Compass */}
        <div
          onClick={() => {
            setActiveSection('home');
            setViewMode('marketing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #115E59 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF8F5',
            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)'
          }}>
            <Compass size={22} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.22rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--text-main)', lineHeight: 1.1 }}>
              INDOCHINE <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>REMOTE</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {language === 'ru' ? 'Консьерж по переезду и путешествиям' : 'Travel & Relocation Concierge'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <div className="pill-switcher">
            <button
              className={`pill-item ${viewMode === 'marketing' && activeSection === 'home' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('home');
                setViewMode('marketing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {t('navHome')}
            </button>

            {/* Navigation anchors when in standard visitor mode */}
            {!isClientUnlocked && !isFounderLoggedIn && (
              <>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'pricing' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('pricing');
                    setViewMode('marketing');
                    setTimeout(() => {
                      document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  {t('navPricing')}
                </button>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'faq' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('faq');
                    setViewMode('marketing');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  {t('navFAQ')}
                </button>
              </>
            )}

            {/* Client Workspace tab only visible after unlocking / purchasing */}
            {isClientUnlocked && (
              <button
                className={`pill-item pill-item-emerald ${viewMode === 'dashboard' ? 'active' : ''}`}
                onClick={() => setViewMode('dashboard')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <UserCheck size={14} /> {t('navDashboard')}
              </button>
            )}

            {/* Founder Admin tab only visible when founder is logged in */}
            {isFounderLoggedIn && (
              <button
                className={`pill-item ${viewMode === 'admin' ? 'active' : ''}`}
                onClick={() => setViewMode('admin')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Settings size={14} /> {t('navAdmin')}
              </button>
            )}
          </div>

          {/* Founder Logout button */}
          {isFounderLoggedIn && (
            <button
              onClick={logoutFounder}
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#DC2626',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '4px'
              }}
              title={t('founderLogoutBtn')}
            >
              <LogOut size={13} /> {t('founderLogoutBtn')}
            </button>
          )}
        </div>

        {/* Right Controls: Consultation CTA + Client Login + Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          
          <button
            onClick={() => setViewMode('express_booking')}
            className="btn btn-promo desktop-nav"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', borderRadius: '9999px' }}
          >
            <Sparkles size={14} /> {t('navConsultation')}
          </button>

          {/* Client Login or Client Profile */}
          {!currentClient ? (
            <button
              onClick={() => setIsClientLoginModalOpen(true)}
              className="btn btn-secondary desktop-nav"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <LogIn size={14} /> {t('navLogin')}
            </button>
          ) : (
            <div className="desktop-nav" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={() => setViewMode('dashboard')}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem', borderRadius: '9999px' }}
              >
                <UserCheck size={14} /> {currentClient.name}
              </button>
              <button
                onClick={logoutClient}
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '9999px',
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  color: '#DC2626',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
                title={t('clientLogoutBtn')}
              >
                <LogOut size={12} />
              </button>
            </div>
          )}

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#EAE6DF', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
            <button
              style={{
                border: 'none',
                background: language === 'en' ? 'var(--accent-emerald)' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '4px 10px',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              style={{
                border: 'none',
                background: language === 'ru' ? 'var(--accent-emerald)' : 'transparent',
                color: language === 'ru' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '4px 10px',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '4px' }}
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem'
        }}>
          <button
            className={`btn ${viewMode === 'marketing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { setViewMode('marketing'); setMobileMenuOpen(false); }}
          >
            {t('navHome')}
          </button>
          {isClientUnlocked && (
            <button
              className={`btn ${viewMode === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => { setViewMode('dashboard'); setMobileMenuOpen(false); }}
            >
              <UserCheck size={16} /> {t('navDashboard')}
            </button>
          )}
          {!currentClient ? (
            <button
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => { setIsClientLoginModalOpen(true); setMobileMenuOpen(false); }}
            >
              <LogIn size={16} /> {t('navLogin')}
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', color: '#DC2626' }}
              onClick={() => { logoutClient(); setMobileMenuOpen(false); }}
            >
              <LogOut size={16} /> {t('clientLogoutBtn')}
            </button>
          )}
          {isFounderLoggedIn && (
            <>
              <button
                className={`btn ${viewMode === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { setViewMode('admin'); setMobileMenuOpen(false); }}
              >
                <Settings size={16} /> {t('navAdmin')}
              </button>
              <button
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start', color: '#DC2626' }}
                onClick={() => { logoutFounder(); setMobileMenuOpen(false); }}
              >
                <LogOut size={16} /> {t('founderLogoutBtn')}
              </button>
            </>
          )}
          <button
            className="btn btn-promo"
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { setViewMode('express_booking'); setMobileMenuOpen(false); }}
          >
            <Sparkles size={16} /> {t('navConsultation')}
          </button>
        </div>
      )}
    </header>
  );
};
