import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_TRAVEL_SIM_GUIDE } from '../../translations/defaultTravelData';
import { Wifi, AlertTriangle, ExternalLink, MapPin } from 'lucide-react';

export const DashboardSimConnectivityView: React.FC = () => {
  const { project, language } = useApp();
  const simGuides = (project.travelSimGuide && project.travelSimGuide.length > 0)
    ? project.travelSimGuide
    : DEFAULT_TRAVEL_SIM_GUIDE;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Overview Card */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(15, 118, 110, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)'
          }}>
            <Wifi size={18} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: 700 }}>
              {language === 'ru' ? 'Мобильная связь и интернет во Вьетнаме' : 'Vietnam Mobile Connectivity & SIM / eSIM'}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'ru' ? 'Официальные операторы Viettel, Vinaphone и eSIM' : 'Viettel, Vinaphone & Travel eSIM Hub'}
            </div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {language === 'ru'
            ? 'Во Вьетнаме один из самых быстрых и дешевых 4G/5G интернетов в Азии (40–150 GB за $10–15/мес). Важно оформить SIM правильно в официальном салоне с загранпаспортом.'
            : 'Vietnam offers some of the fastest and most affordable 4G/5G mobile internet in Asia ($10–15 for 40–150 GB). Registration must be done at official retail stores with your original passport.'}
        </p>
      </div>

      {/* Critical Passport Law Alert */}
      <div style={{
        background: '#FEF3C7',
        border: '1px solid #FCD34D',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}>
        <AlertTriangle size={20} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.85rem', color: '#92400E', lineHeight: 1.5 }}>
          <strong>{language === 'ru' ? 'Важное правило безопасности:' : 'Strict Registration Warning:'}</strong>{' '}
          {language === 'ru'
            ? 'Никогда не покупайте SIM-карты у водителей такси или на уличных стойках без сканирования вашего паспорта. По закону Вьетнама неавторизованные туристические номера блокируются через 72 часа. Покупайте только в официальных салонах или онлайн через проверенные eSIM-сервисы.'
            : 'Never purchase prepaid SIMs from taxi drivers or street stalls without passport biometric registration. Unregistered SIM cards are blocked after 72 hours under Vietnamese telecommunications laws.'}
        </div>
      </div>

      {/* SIM Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {simGuides.map((sim, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: '1.5rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: sim.type === 'eSIM' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(15, 118, 110, 0.1)',
                  color: sim.type === 'eSIM' ? '#7C3AED' : 'var(--accent-emerald)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px'
                }}>
                  {sim.type === 'eSIM' ? 'eSIM (без пластика)' : 'Физическая SIM-карта'}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
                  ${sim.priceUSD}
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {sim.provider}
              </h3>

              <div style={{
                background: '#F9FAFB',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                marginBottom: '0.85rem'
              }}>
                <strong>{language === 'ru' ? 'Пакет интернета:' : 'Data Package:'}</strong> {sim.dataPackage}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <MapPin size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-emerald)' }} />
                <span>{sim.officialStoreAddress}</span>
              </div>

              {sim.warningNote && (
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6B7280',
                  borderTop: '1px dashed var(--border-subtle)',
                  paddingTop: '0.65rem',
                  marginBottom: '1rem',
                  fontStyle: 'italic'
                }}>
                  💡 {sim.warningNote}
                </div>
              )}
            </div>

            {sim.googleMapsUrl && (
              <a
                href={sim.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--accent-emerald)',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={14} />
                {language === 'ru' ? 'Показать адрес на Google Maps ↗' : 'Show Location on Google Maps ↗'}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
