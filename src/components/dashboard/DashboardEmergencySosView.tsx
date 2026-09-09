import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_TRAVEL_HOSPITALS } from '../../translations/defaultTravelData';
import { PhoneCall, ShieldAlert, MapPin, Globe } from 'lucide-react';

export const DashboardEmergencySosView: React.FC = () => {
  const { project, language } = useApp();
  const hospitals = (project.travelEmergencyHospitals && project.travelEmergencyHospitals.length > 0)
    ? project.travelEmergencyHospitals
    : DEFAULT_TRAVEL_HOSPITALS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Warning & Hotlines */}
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
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#DC2626'
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: 700 }}>
              {language === 'ru' ? 'Экстренные службы и госпитали Вьетнама' : 'Emergency Services & International Hospitals'}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'ru' ? 'Контакты 24/7 для экстренных ситуаций во время путешествия' : '24/7 emergency contacts & English-speaking medical facilities'}
            </div>
          </div>
        </div>

        {/* 3 Hotlines Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
          <a
            href="tel:115"
            style={{
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <PhoneCall size={24} color="#DC2626" />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626' }}>115</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {language === 'ru' ? 'Скорая помощь (Cấp cứu)' : 'Medical Ambulance'}
              </div>
            </div>
          </a>

          <a
            href="tel:113"
            style={{
              padding: '1rem',
              background: 'rgba(15, 118, 110, 0.05)',
              border: '1px solid rgba(15, 118, 110, 0.25)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <PhoneCall size={24} color="var(--accent-emerald)" />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>113</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {language === 'ru' ? 'Полиция (Công an)' : 'Police Hotline'}
              </div>
            </div>
          </a>

          <a
            href="tel:114"
            style={{
              padding: '1rem',
              background: 'rgba(217, 119, 6, 0.05)',
              border: '1px solid rgba(217, 119, 6, 0.25)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <PhoneCall size={24} color="#D97706" />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D97706' }}>114</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {language === 'ru' ? 'Пожарная охрана (Cứu hỏa)' : 'Fire Department'}
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Hospitals List */}
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700 }}>
          {language === 'ru' ? 'Международные госпитали (англоговорящий персонал)' : 'International Hospitals (English-Speaking)'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {hospitals.map((hosp, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '1.25rem',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'rgba(15, 118, 110, 0.1)',
                    color: 'var(--accent-emerald)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {hosp.city}
                  </span>
                  {hosp.hasEnglish && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      background: '#ECFDF5',
                      color: '#059669',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Globe size={11} /> English Speaking
                    </span>
                  )}
                </div>

                <h4 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  {hosp.name}
                </h4>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', lineHeight: 1.4 }}>
                  <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-terracotta)' }} />
                  <span>{hosp.address}</span>
                </div>
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <a
                  href={`tel:${hosp.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#DC2626',
                    textDecoration: 'none'
                  }}
                >
                  <PhoneCall size={15} />
                  {hosp.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
