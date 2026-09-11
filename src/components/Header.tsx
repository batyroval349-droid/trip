import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Settings, Menu, X, Sparkles, LogOut, LogIn } from 'lucide-react';

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
  const [activeSection, setActiveSection] = React.useState<'home' | 'why' | 'cabinet' | 'pricing' | 'reviews' | 'faq'>('home');

  const scrollTo = (id: string, sec: 'home' | 'why' | 'cabinet' | 'pricing' | 'reviews' | 'faq') => {
    setActiveSection(sec);
    if (viewMode !== 'marketing') {
      setViewMode('marketing');
      setTimeout(() => {
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    if (viewMode !== 'marketing') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const whyEl = document.getElementById('why-us-section');
      const cabinetEl = document.getElementById('cabinet-preview');
      const pricingEl = document.getElementById('pricing-section');
      const reviewsEl = document.getElementById('reviews-section');
      const faqEl = document.getElementById('faq-section');

      const whyTop = whyEl ? whyEl.offsetTop - 150 : 99999;
      const cabinetTop = cabinetEl ? cabinetEl.offsetTop - 150 : 99999;
      const pricingTop = pricingEl ? pricingEl.offsetTop - 150 : 99999;
      const reviewsTop = reviewsEl ? reviewsEl.offsetTop - 150 : 99999;
      const faqTop = faqEl ? faqEl.offsetTop - 150 : 99999;

      if (scrollY >= faqTop - 50) {
        setActiveSection('faq');
      } else if (scrollY >= reviewsTop - 50) {
        setActiveSection('reviews');
      } else if (scrollY >= pricingTop - 50) {
        setActiveSection('pricing');
      } else if (scrollY >= cabinetTop - 50) {
        setActiveSection('cabinet');
      } else if (scrollY >= whyTop - 50) {
        setActiveSection('why');
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
            scrollTo('top', 'home');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <img
            src="/logo-icon-transparent.png"
            alt="VietReloc"
            className="brand-logo-img"
          />
          <div>
            <div className="brand-logo-title">
              VIET<span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>RELOC</span>
            </div>
            <div className="brand-logo-subtitle">
              {language === 'ru' ? 'Консьерж по переезду и путешествиям' : 'Travel & Relocation Concierge'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <div className="pill-switcher">
            <button
              className={`pill-item ${viewMode === 'marketing' && activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollTo('top', 'home')}
            >
              {t('navHome')}
            </button>

            {/* Navigation anchors when in standard visitor mode */}
            {!isClientUnlocked && !isFounderLoggedIn && (
              <>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'why' ? 'active' : ''}`}
                  onClick={() => scrollTo('why-us-section', 'why')}
                >
                  {t('navWhyUs')}
                </button>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'cabinet' ? 'active' : ''}`}
                  onClick={() => scrollTo('cabinet-preview', 'cabinet')}
                >
                  {t('navPreview' as any) || (language === 'ru' ? 'Демо кабинета' : 'Demo')}
                </button>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'pricing' ? 'active' : ''}`}
                  onClick={() => scrollTo('pricing-section', 'pricing')}
                >
                  {t('navPricing')}
                </button>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'reviews' ? 'active' : ''}`}
                  onClick={() => scrollTo('reviews-section', 'reviews')}
                >
                  {t('navReviews' as any) || (language === 'ru' ? 'Отзывы' : 'Reviews')}
                </button>
                <button
                  className={`pill-item ${viewMode === 'marketing' && activeSection === 'faq' ? 'active' : ''}`}
                  onClick={() => scrollTo('faq-section', 'faq')}
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
            className={`btn ${viewMode === 'marketing' && activeSection === 'home' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { scrollTo('top', 'home'); setMobileMenuOpen(false); }}
          >
            {t('navHome')}
          </button>
          {!isClientUnlocked && !isFounderLoggedIn && (
            <>
              <button
                className={`btn ${viewMode === 'marketing' && activeSection === 'why' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { scrollTo('why-us-section', 'why'); setMobileMenuOpen(false); }}
              >
                {t('navWhyUs')}
              </button>
              <button
                className={`btn ${viewMode === 'marketing' && activeSection === 'cabinet' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { scrollTo('cabinet-preview', 'cabinet'); setMobileMenuOpen(false); }}
              >
                {t('navPreview' as any) || (language === 'ru' ? 'Демо кабинета' : 'Demo')}
              </button>
              <button
                className={`btn ${viewMode === 'marketing' && activeSection === 'pricing' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { scrollTo('pricing-section', 'pricing'); setMobileMenuOpen(false); }}
              >
                {t('navPricing')}
              </button>
              <button
                className={`btn ${viewMode === 'marketing' && activeSection === 'reviews' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { scrollTo('reviews-section', 'reviews'); setMobileMenuOpen(false); }}
              >
                {t('navReviews' as any) || (language === 'ru' ? 'Отзывы' : 'Reviews')}
              </button>
              <button
                className={`btn ${viewMode === 'marketing' && activeSection === 'faq' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => { scrollTo('faq-section', 'faq'); setMobileMenuOpen(false); }}
              >
                {t('navFAQ')}
              </button>
            </>
          )}
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
