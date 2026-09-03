import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NEIGHBORHOODS_DATA } from '../../translations/content';
import { Sparkles, Sliders, CheckCircle2, MessageSquare } from 'lucide-react';

export const DashboardNeighborhoodsView: React.FC = () => {
  const { project, language, t } = useApp();

  // Interactive filters
  const [beachMin, setBeachMin] = useState<number>(1);
  const [quietMin, setQuietMin] = useState<number>(1);
  const [socialMin, setSocialMin] = useState<number>(1);
  const [remoteWorkMin, setRemoteWorkMin] = useState<number>(1);

  const recommendedNeighborhoods = NEIGHBORHOODS_DATA.filter((n) =>
    project.recommendedNeighborhoodIds.includes(n.id)
  );

  const filteredNeighborhoods = NEIGHBORHOODS_DATA.filter(
    (n) =>
      n.scores.beach >= beachMin &&
      n.scores.quiet >= quietMin &&
      n.scores.social >= socialMin &&
      n.scores.remoteWork >= remoteWorkMin
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. Personalized Recommended for You Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Sparkles size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>
            {t('neighRecTitle')}
          </h2>
        </div>

        <div className="grid-2">
          {recommendedNeighborhoods.map((n) => (
            <div key={n.id} className="glass-card glass-card-emerald" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)' }}>
                    {n.name}
                  </h3>
                  <span className="badge badge-emerald">{t('badgeFounderMatched')}</span>
                </div>

                <p style={{ color: 'var(--accent-terracotta)', fontSize: '0.92rem', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 600 }}>
                  {n.tagline[language]}
                </p>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {n.description[language]}
                </p>

                {/* Score Indicators */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', background: 'var(--bg-panel)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div><strong>{t('lblBeach')}:</strong> {n.scores.beach}/5</div>
                  <div><strong>{t('lblQuiet')}:</strong> {n.scores.quiet}/5</div>
                  <div><strong>{t('lblRemoteWork')}:</strong> {n.scores.remoteWork}/5</div>
                </div>
              </div>

              {/* Founder Personal Note */}
              {n.founderNote && (
                <div style={{
                  background: 'var(--accent-terracotta-light)',
                  borderLeft: '3px solid var(--accent-terracotta)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.86rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-terracotta)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    <MessageSquare size={14} /> {t('lblFounderNote')}
                  </div>
                  <div style={{ color: 'var(--text-main)' }}>
                    “{n.founderNote[language]}”
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Neighborhood Explorer */}
      <div className="glass-card">
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)' }}>
              {t('explorerTitle')}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {t('explorerSubhead')}
            </p>
          </div>
          <div className="badge badge-subtle">
            <Sliders size={14} /> {t('badgeCurated')}
          </div>
        </div>

        {/* Sliders Control Panel */}
        <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
          <div className="grid-4" style={{ gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>{t('sliderBeach')}</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{beachMin}/5</strong>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={beachMin}
                onChange={(e) => setBeachMin(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>{t('sliderQuiet')}</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{quietMin}/5</strong>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={quietMin}
                onChange={(e) => setQuietMin(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>{t('sliderSocial')}</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{socialMin}/5</strong>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={socialMin}
                onChange={(e) => setSocialMin(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>{t('sliderWork')}</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{remoteWorkMin}/5</strong>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={remoteWorkMin}
                onChange={(e) => setRemoteWorkMin(parseInt(e.target.value))}
              />
            </div>

          </div>
        </div>

        {/* Filtered Neighborhood Results */}
        <div className="grid-3">
          {filteredNeighborhoods.map((nh) => (
            <div key={nh.id} className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {nh.name}
                </h4>
                <span className="badge badge-subtle" style={{ fontSize: '0.7rem' }}>
                  {nh.cityId.toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {nh.tagline[language]}
              </p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                {nh.highlights[language].map((hl, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filteredNeighborhoods.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No neighborhoods match these exact slider criteria. Try lowering beach or quiet thresholds.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
