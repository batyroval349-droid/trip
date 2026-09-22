import React from 'react';
import { useApp } from '../../context/AppContext';
import { CITIES_DATA } from '../../translations/content';
import { Sparkles, Check, Info, Clock } from 'lucide-react';

export const DashboardCityView: React.FC = () => {
  const { project, language, t } = useApp();

  const isRelocationTier = project.tierId === 'tier3' || project.tierId === 'tier4';
  const isCityPublished = isRelocationTier
    ? (project.isRelocationPlanPublished === true || (project.status === 'plan_ready' && !project.upgradedFromTier))
    : true;

  const recommendedCity = CITIES_DATA.find((c) => c.id === project.recommendedCityId) || CITIES_DATA[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Recommended City Block */}
      {!isCityPublished ? (
        <div className="glass-card" style={{
          padding: '2.5rem 1.75rem',
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1.5px dashed var(--accent-terracotta)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(194, 94, 32, 0.1)',
            color: 'var(--accent-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Clock size={26} />
          </div>
          <div className="badge badge-terracotta" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={13} /> {language === 'ru' ? 'Подождите, я провожу анализ и наполнение' : 'Analysis in Progress'}
          </div>
          <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
            {language === 'ru' ? 'Подбор рекомендованного города формируется' : 'City recommendation is being prepared'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            {language === 'ru'
              ? 'Основатель изучает вашу анкету, формат работы и приоритеты по инфраструктуре и климату. Скоро здесь появится ваш персональный рекомендованный город с подробным обоснованием. А пока вы можете изучить сравнительную матрицу городов Вьетнама ниже.'
              : 'The founder is analyzing your questionnaire and lifestyle preferences to recommend the best city. In the meantime, explore the comparative city matrix below.'}
          </p>
        </div>
      ) : (
        <div className="glass-card glass-card-emerald" style={{ overflow: 'hidden', padding: 0 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            {/* Text Content */}
            <div style={{ padding: '2rem' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
                <Sparkles size={14} /> {t('cityTopMatchBadge')}
              </div>
              
              <h2 style={{ fontSize: '2.4rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                {recommendedCity.name[language]}
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--accent-terracotta)', marginBottom: '1.25rem', fontStyle: 'italic', fontWeight: 600 }}>
                {recommendedCity.tagline[language]}
              </p>

              {/* Founder Note Block */}
              <div style={{
                background: 'var(--accent-emerald-light)',
                borderLeft: '3px solid var(--accent-emerald)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  {t('cityWhyLabel')}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {project.recommendedCityWhy[language]}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.88rem' }}>
                <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong>{t('cityBudgetLabel')}:</strong> {recommendedCity.budgetRange[language]}
                </div>
                <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong>{t('cityBeachLabel')}:</strong> {recommendedCity.beachAccess[language]}
                </div>
              </div>
            </div>

            {/* Image Banner */}
            <div style={{ height: '100%', minHeight: '300px', position: 'relative' }}>
              <img
                src={recommendedCity.heroImage}
                alt={recommendedCity.name.en}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 100%)'
              }} />
            </div>

          </div>
        </div>
      )}

      {/* Controlled City Comparison Table */}
      <div className="glass-card">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)' }}>
              {t('cityMatrixTitle')}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {t('cityMatrixSubhead')}
            </p>
          </div>
          <div className="badge badge-subtle">
            <Info size={14} /> {t('cityBadgeFounder')}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', width: '180px' }}>{t('colDestination')}</th>
                <th style={{ padding: '1rem' }}>{t('colLifestyle')}</th>
                <th style={{ padding: '1rem' }}>{t('colBudget')}</th>
                <th style={{ padding: '1rem' }}>{t('colRemoteWork')}</th>
                <th style={{ padding: '1rem' }}>{t('colBeach')}</th>
                <th style={{ padding: '1rem' }}>{t('colSocial')}</th>
              </tr>
            </thead>
            <tbody>
              {CITIES_DATA.map((city) => {
                const isSelected = city.id === project.recommendedCityId;
                return (
                  <tr
                    key={city.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--accent-emerald-light)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '1rem', fontWeight: 700, color: isSelected ? 'var(--accent-emerald)' : 'var(--text-main)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {isSelected && <Check size={16} />}
                        {city.name[language]}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{city.lifestyle[language]}</td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent-terracotta)' }}>{city.budgetRange[language]}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{city.remoteWorkSetup[language]}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{city.beachAccess[language]}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{city.socialLife[language]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
