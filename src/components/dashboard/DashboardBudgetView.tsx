import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

const USD_TO_VND_RATE = 25000;

export const DashboardBudgetView: React.FC = () => {
  const { project, updateUserBudget, t } = useApp();

  const current = project.userCurrentBudget;
  const initial = project.recommendedStartingBudget;

  const totalUSD =
    current.accommodation +
    current.food +
    current.coworking +
    current.transportation +
    current.entertainment;

  const initialTotalUSD =
    initial.accommodation +
    initial.food +
    initial.coworking +
    initial.transportation +
    initial.entertainment;

  const totalVND = (totalUSD * USD_TO_VND_RATE).toLocaleString();

  const handleSlider = (field: keyof typeof current, val: number) => {
    updateUserBudget({
      ...current,
      [field]: val
    });
  };

  const handleReset = () => {
    updateUserBudget(initial);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Founder Recommended Starting Budget Card */}
      <div className="glass-card glass-card-emerald">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={14} /> {t('budgetBaselineBadge')}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>
              {t('budgetBaselineTitle')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {t('budgetBaselineSubhead')}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-serif)' }}>
              ${initialTotalUSD} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {t('budgetPerMonth')}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-terracotta)', fontWeight: 600 }}>
              ~ {(initialTotalUSD * USD_TO_VND_RATE).toLocaleString()} VND
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Explorer */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)' }}>
              {t('budgetExploreTitle')}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {t('budgetExploreSubhead')}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
          >
            <RefreshCw size={14} /> {t('budgetResetBtn')}
          </button>
        </div>

        {/* Total Summary Banner */}
        <div style={{
          background: 'var(--accent-emerald-light)',
          border: '1px solid var(--border-emerald)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.05em' }}>
              {t('budgetCurrentTotal')}:
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>
              ${totalUSD} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {t('budgetPerMonth')}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('budgetVndEquivalent')}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
              ≈ {totalVND} VND
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Slider 1: Accommodation */}
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{t('budgetSliderAccTitle')}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('budgetSliderAccDesc')}</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                ${current.accommodation}
              </div>
            </div>
            <input
              type="range"
              min={400}
              max={1200}
              step={25}
              value={current.accommodation}
              onChange={(e) => handleSlider('accommodation', parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
              <span>{t('budgetSliderAccLow')}</span>
              <span>{t('budgetSliderAccMid')}</span>
              <span>{t('budgetSliderAccHigh')}</span>
            </div>
          </div>

          {/* Slider 2: Food & Dining */}
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{t('budgetSliderFoodTitle')}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('budgetSliderFoodDesc')}</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                ${current.food}
              </div>
            </div>
            <input
              type="range"
              min={200}
              max={600}
              step={25}
              value={current.food}
              onChange={(e) => handleSlider('food', parseInt(e.target.value))}
            />
          </div>

          {/* Slider 3: Coworking */}
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{t('budgetSliderWorkTitle')}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('budgetSliderWorkDesc')}</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                ${current.coworking}
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={250}
              step={10}
              value={current.coworking}
              onChange={(e) => handleSlider('coworking', parseInt(e.target.value))}
            />
          </div>

          {/* Slider 4: Transportation */}
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{t('budgetSliderTransTitle')}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('budgetSliderTransDesc')}</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                ${current.transportation}
              </div>
            </div>
            <input
              type="range"
              min={50}
              max={200}
              step={10}
              value={current.transportation}
              onChange={(e) => handleSlider('transportation', parseInt(e.target.value))}
            />
          </div>

          {/* Slider 5: Entertainment & Misc */}
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{t('budgetSliderEntTitle')}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('budgetSliderEntDesc')}</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                ${current.entertainment}
              </div>
            </div>
            <input
              type="range"
              min={50}
              max={400}
              step={25}
              value={current.entertainment}
              onChange={(e) => handleSlider('entertainment', parseInt(e.target.value))}
            />
          </div>

        </div>

        {/* Mandatory Rule 12 Disclaimer */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--accent-terracotta-light)',
          border: '1px solid var(--border-terracotta)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <AlertCircle size={20} style={{ color: 'var(--accent-terracotta)', flexShrink: 0 }} />
          <span>{t('disclaimerBudget')}</span>
        </div>

      </div>

    </div>
  );
};
