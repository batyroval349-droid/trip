import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, X, AlertCircle } from 'lucide-react';

export const FounderLoginModal: React.FC = () => {
  const { isFounderModalOpen, setIsFounderModalOpen, loginFounder, t } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isFounderModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginFounder(username, password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
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
        maxWidth: '440px',
        width: '100%',
        background: '#FAF8F5',
        border: '1px solid var(--border-emerald)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        padding: '2rem'
      }}>
        {/* Close Button */}
        <button
          onClick={() => { setIsFounderModalOpen(false); setError(false); }}
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
          <Shield size={22} />
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
            {t('founderLoginTitle')}
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {t('founderLoginDesc')}
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
            <span>{t('founderAuthError')}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {t('founderUsername')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              placeholder="admin"
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

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {t('founderPassword')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
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
            <Lock size={16} /> {t('founderLoginBtn')}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Логин: <code style={{ color: 'var(--accent-emerald)' }}>admin</code> &bull; Пароль: <code style={{ color: 'var(--accent-emerald)' }}>indochine2026</code>
        </div>
      </div>
    </div>
  );
};
