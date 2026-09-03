import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, BookOpen } from 'lucide-react';

export const DashboardResourcesView: React.FC = () => {
  const { project, language, t } = useApp();

  const categories = [
    { id: 'accommodation', label: t('resourcesCatAcc') },
    { id: 'transport', label: t('resourcesCatTrans') },
    { id: 'internet', label: t('resourcesCatInternet') },
    { id: 'work', label: t('resourcesCatWork') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="glass-card glass-card-emerald">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <BookOpen size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>
            {t('resourcesTitle')}
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          {t('resourcesSubhead')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {categories.map((cat) => {
          const items = project.resources.filter((r) => r.category === cat.id);
          if (items.length === 0) return null;

          return (
            <div key={cat.id} className="glass-card">
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--accent-terracotta)' }}>
                {cat.label}
              </h3>

              <div className="grid-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                          {item.title[language]}
                        </h4>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--accent-emerald)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}
                        >
                          {t('resourcesVisit')} <ExternalLink size={14} />
                        </a>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {item.description[language]}
                      </p>
                    </div>

                    {item.founderNote && (
                      <div style={{
                        background: 'var(--accent-emerald-light)',
                        borderLeft: '3px solid var(--accent-emerald)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.82rem'
                      }}>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{t('resourcesFounderTip')}: </span>
                        <span style={{ color: 'var(--text-main)' }}>“{item.founderNote[language]}”</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
