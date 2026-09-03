import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShieldCheck, MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setViewMode, isFounderLoggedIn, setIsFounderModalOpen, isClientUnlocked } = useApp();

  return (
    <footer style={{
      background: '#132522',
      borderTop: '1px solid var(--border-subtle)',
      padding: '4rem 0 2.5rem 0',
      color: '#A3B8B5',
      fontSize: '0.9rem'
    }}>
      <div className="container">
        
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          
          {/* Col 1: Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => setViewMode('marketing')}>
              <Compass size={24} style={{ color: 'var(--accent-emerald)' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF' }}>
                INDOCHINE <span style={{ color: 'var(--accent-emerald)' }}>REMOTE</span>
              </span>
            </div>
            
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '440px', marginBottom: '1.5rem', color: '#A3B8B5' }}>
              {t('footerBrandDesc')}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/84900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href="https://t.me/indochine_concierge"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
              >
                <Send size={14} /> Telegram
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {t('footerNavTitle')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><button onClick={() => setViewMode('marketing')} style={{ background: 'none', border: 'none', color: '#A3B8B5', cursor: 'pointer' }}>{t('navHome')}</button></li>
              <li><button onClick={() => setViewMode('questionnaire')} style={{ background: 'none', border: 'none', color: '#A3B8B5', cursor: 'pointer' }}>{t('navQuestionnaire')}</button></li>
              {isClientUnlocked && (
                <li><button onClick={() => setViewMode('dashboard')} style={{ background: 'none', border: 'none', color: '#A3B8B5', cursor: 'pointer' }}>{t('navDashboard')}</button></li>
              )}
              {isFounderLoggedIn ? (
                <li><button onClick={() => setViewMode('admin')} style={{ background: 'none', border: 'none', color: 'var(--accent-emerald)', cursor: 'pointer' }}>{t('navAdmin')}</button></li>
              ) : (
                <li><button onClick={() => setIsFounderModalOpen(true)} style={{ background: 'none', border: 'none', color: '#6A7D7B', cursor: 'pointer', fontSize: '0.82rem' }}>{t('founderFooterLink')}</button></li>
              )}
            </ul>
          </div>

          {/* Col 3: Rule 48 Disclaimer */}
          <div>
            <h4 style={{ color: 'var(--accent-terracotta)', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} /> {t('footerRuleTitle')}
            </h4>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
              {t('footerRuleText')}
            </p>
          </div>

        </div>

        {/* Bottom Line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
          <div>
            &copy; {new Date().getFullYear()} Indochine Remote. {t('footerRights')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>{t('footerAesthetics')}</span>
            {!isFounderLoggedIn && (
              <button
                onClick={() => setIsFounderModalOpen(true)}
                style={{ background: 'none', border: 'none', color: '#5A6E6C', cursor: 'pointer', fontSize: '0.78rem' }}
              >
                &bull; {t('founderFooterLink')}
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
