import React from 'react';
import { useApp } from '../context/AppContext';
import { Send, Sparkles } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { language, setViewMode, viewMode } = useApp();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (viewMode !== 'marketing') {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Appear once the user scrolls past the top 280px of the page
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  if (viewMode !== 'marketing') return null;

  return (
    <div
      className="mobile-sticky-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        padding: '0.65rem 0.85rem calc(0.65rem + env(safe-area-inset-bottom, 0px)) 0.85rem',
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease'
      }}
    >
      {/* 1. Quick Question in Telegram */}
      <a
        href="https://t.me/Likqwerty"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem',
          padding: '0.65rem 0.6rem',
          borderRadius: '9999px',
          background: 'rgba(15, 118, 110, 0.08)',
          border: '1px solid rgba(15, 118, 110, 0.3)',
          color: 'var(--accent-emerald)',
          fontSize: '0.82rem',
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <Send size={14} />
        <span>{language === 'ru' ? 'Вопрос в Telegram' : 'Ask Telegram'}</span>
      </a>

      {/* 2. Express Consultation $50 */}
      <button
        onClick={() => setViewMode('express_booking')}
        style={{
          flex: 1.25,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.65rem 0.75rem',
          borderRadius: '9999px',
          background: 'var(--accent-emerald)',
          border: 'none',
          color: '#FFFFFF',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 3px 12px rgba(15, 118, 110, 0.28)',
          whiteSpace: 'nowrap'
        }}
      >
        <Sparkles size={14} style={{ color: '#FCD34D' }} />
        <span>{language === 'ru' ? 'Консультация ($50)' : 'Book Call ($50)'}</span>
      </button>
    </div>
  );
};
