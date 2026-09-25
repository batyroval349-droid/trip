import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ExternalLink,
  BookOpen,
  Phone,
  Hospital,
  Smartphone,
  MapPin,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_TRAVEL_HOSPITALS, DEFAULT_TRAVEL_SIM_GUIDE } from '../../translations/defaultTravelData';

export const DashboardResourcesView: React.FC = () => {
  const { project, language, t } = useApp();
  const [selectedHospitalCity, setSelectedHospitalCity] = useState<string>('Все');

  const hospitalCities = ['Все', ...Array.from(new Set(DEFAULT_TRAVEL_HOSPITALS.map((h) => h.city)))];
  const filteredHospitals = selectedHospitalCity === 'Все'
    ? DEFAULT_TRAVEL_HOSPITALS
    : DEFAULT_TRAVEL_HOSPITALS.filter((h) => h.city === selectedHospitalCity);

  const categories = [
    { id: 'accommodation', label: t('resourcesCatAcc') },
    { id: 'transport', label: t('resourcesCatTrans') },
    { id: 'internet', label: t('resourcesCatInternet') },
    { id: 'work', label: t('resourcesCatWork') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* 1. Header */}
      <div className="glass-card glass-card-emerald">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <BookOpen size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
            {t('resourcesTitle')}
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
          {language === 'ru'
            ? 'Экстренные службы, проверенные больницы с англоязычным персоналом, покупка связи и проверенные сервисы для комфортной жизни во Вьетнаме.'
            : 'Emergency hotlines, vetted hospitals with English-speaking staff, mobile connectivity, and curated expat services.'}
        </p>
      </div>

      {/* 2. Emergency Hotlines */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <ShieldAlert size={20} color="var(--accent-terracotta)" />
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Экстренные службы Вьетнама' : 'Emergency Hotlines'}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="dash-inner-item" style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(220, 38, 38, 0.1)',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#991B1B', fontWeight: 600, textTransform: 'uppercase' }}>
                {language === 'ru' ? 'Скорая помощь' : 'Ambulance / Emergency'}
              </div>
              <a href="tel:115" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DC2626', textDecoration: 'none', display: 'block' }}>
                115
              </a>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cấp cứu (24/7)</div>
            </div>
          </div>

          <div className="dash-inner-item" style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(37, 99, 235, 0.1)',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#1E40AF', fontWeight: 600, textTransform: 'uppercase' }}>
                {language === 'ru' ? 'Полиция' : 'Police'}
              </div>
              <a href="tel:113" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563EB', textDecoration: 'none', display: 'block' }}>
                113
              </a>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Công an (24/7)</div>
            </div>
          </div>

          <div className="dash-inner-item" style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(234, 88, 12, 0.1)',
              color: '#EA580C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#9A3412', fontWeight: 600, textTransform: 'uppercase' }}>
                {language === 'ru' ? 'Пожарная охрана' : 'Fire Department'}
              </div>
              <a href="tel:114" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EA580C', textDecoration: 'none', display: 'block' }}>
                114
              </a>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cứu hỏa (24/7)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIM / eSIM Connectivity Guide */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Smartphone size={20} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Связь и мобильный интернет (SIM и eSIM)' : 'Mobile Connectivity (SIM & eSIM)'}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {DEFAULT_TRAVEL_SIM_GUIDE.map((sim, index) => (
            <div
              key={index}
              className="dash-inner-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {sim.provider}
                  </h4>
                  <span
                    className={`badge ${sim.type === 'eSIM' ? 'badge-emerald' : 'badge-terracotta'}`}
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    {sim.type === 'eSIM' ? 'eSIM онлайн' : 'Физическая SIM'}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong>Пакет:</strong> <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{sim.dataPackage}</span>
                </div>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <strong>Стоимость:</strong> {sim.priceUSD <= 0.5 ? 'от $0.5' : `~$${sim.priceUSD}`}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {sim.officialStoreAddress}
                </p>

                {sim.warningNote && (
                  <div style={{
                    background: '#FEF3C7',
                    borderLeft: '3px solid #F59E0B',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: '#92400E',
                    marginBottom: '1rem',
                    lineHeight: 1.45
                  }}>
                    {sim.warningNote}
                  </div>
                )}
              </div>

              <div>
                {sim.googleMapsUrl && (
                  <a
                    href={sim.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--accent-emerald)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <MapPin size={14} /> Показать адрес на Google Maps ↗
                  </a>
                )}

                {sim.externalLinks && sim.externalLinks.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {sim.externalLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: 'var(--accent-emerald)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={14} /> {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Verified Hospitals by City */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Hospital size={20} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
              {language === 'ru' ? 'Проверенные международные и городские больницы' : 'Verified Hospitals'}
            </h3>
          </div>

          {/* City Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {hospitalCities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSelectedHospitalCity(cityName)}
                className={`glass-button ${selectedHospitalCity === cityName ? 'active' : ''}`}
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.78rem'
                }}
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredHospitals.map((hospital, index) => (
            <div
              key={index}
              className="dash-inner-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {hospital.name}
                  </h4>
                  <span
                    className={`badge ${hospital.type === 'international' ? 'badge-emerald' : 'badge-terracotta'}`}
                    style={{ fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}
                  >
                    {hospital.type === 'international' ? 'Международная' : 'Городская'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-terracotta)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <MapPin size={13} />
                  <span>{hospital.city}</span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                  {hospital.address}
                </p>

                {hospital.hasEnglish && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#15803D', fontWeight: 600, background: '#F0FDF4', padding: '0.25rem 0.6rem', borderRadius: '4px', marginBottom: '0.85rem' }}>
                    <CheckCircle2 size={12} /> Англоязычный персонал
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <a
                  href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
                  style={{
                    color: 'var(--accent-emerald)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Phone size={13} /> {hospital.phone}
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. General Expat Resources by Category */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
          {language === 'ru' ? 'Каталог проверенных сервисов для жизни' : 'Curated Expat Directory'}
        </h3>

        {categories.map((cat) => {
          const items = project.resources.filter((r) => r.category === cat.id);
          if (items.length === 0) return null;

          return (
            <div key={cat.id} className="glass-card">
              <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--accent-terracotta)' }}>
                {cat.label}
              </h4>

              <div className="grid-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="dash-inner-item"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <h5 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 600, margin: 0 }}>
                          {item.title[language]}
                        </h5>
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

