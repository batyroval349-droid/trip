import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, X, AlertCircle, ArrowRight } from 'lucide-react';

export const ClientLoginModal: React.FC = () => {
  const {
    isClientLoginModalOpen,
    setIsClientLoginModalOpen,
    loginClient,
    setViewMode,
    t,
    language
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isClientLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginClient(email, password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(19, 37, 34, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '450px',
        width: '100%',
        background: '#FAF8F5',
        border: '1px solid var(--border-emerald)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        padding: '2.2rem'
      }}>
        {/* Close Button */}
        <button
          onClick={() => { setIsClientLoginModalOpen(false); setError(false); }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
          <User size={22} />
          <h2 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
            {t('clientLoginTitle')}
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {t('clientLoginDesc')}
        </p>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#FEE2E2',
            border: '1px solid #F87171',
            borderRadius: 'var(--radius-sm)',
            padding: '0.6rem 0.85rem',
            color: '#B91C1C',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={16} />
            <span>{t('clientAuthError')}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {t('clientEmail')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false); }}
              placeholder="alex@gmail.com"
              required
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: '#FFFFFF',
                fontSize: '0.92rem',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {t('clientPassword')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: '#FFFFFF',
                fontSize: '0.92rem',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Lock size={16} /> {t('clientLoginBtn')}
          </button>
        </form>

        {/* Register suggestion */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            {t('clientNoAccount')}
          </p>
          <button
            onClick={() => {
              setIsClientLoginModalOpen(false);
              setViewMode('express_booking');
            }}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.5rem 1rem', display: 'inline-flex', gap: '0.4rem' }}
          >
            {language === 'ru' ? 'Записаться на 60-мин консультацию ($50)' : 'Book 60-Min Consultation ($50)'} <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ marginTop: '0.85rem', fontSize: '0.73rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Демо-вход: <code style={{ color: 'var(--accent-emerald)' }}>client@example.com</code> / <code style={{ color: 'var(--accent-emerald)' }}>pass123</code>
        </div>
      </div>
    </div>
  );
};
