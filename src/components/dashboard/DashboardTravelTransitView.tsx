import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_TRAVEL_TRANSIT_LEGS } from '../../translations/defaultTravelData';
import { Plane, Car, Train, Bus, ExternalLink, ArrowRight } from 'lucide-react';

export const DashboardTravelTransitView: React.FC = () => {
  const { project, language } = useApp();
  const legs = (project.travelTransitLegs && project.travelTransitLegs.length > 0)
    ? project.travelTransitLegs
    : DEFAULT_TRAVEL_TRANSIT_LEGS;

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'flight': return <Plane size={20} color="#0284C7" />;
      case 'train': return <Train size={20} color="#16A34A" />;
      case 'sleeper_bus': return <Bus size={20} color="#D97706" />;
      case 'private_car': return <Car size={20} color="#C25E20" />;
      default: return <Car size={20} color="#0F766E" />;
    }
  };

  const getTransportName = (mode: string) => {
    if (language === 'ru') {
      switch (mode) {
        case 'flight': return 'Внутренний перелет';
        case 'train': return 'Поезд (Север-Юг Express)';
        case 'sleeper_bus': return 'Спальный автобус (Sleeper Bus)';
        case 'private_car': return 'VIP Лимузин / GrabCar';
        default: return 'Трансфер';
      }
    }
    switch (mode) {
      case 'flight': return 'Domestic Flight';
      case 'train': return 'Reunification Express Train';
      case 'sleeper_bus': return 'Sleeper Bus';
      case 'private_car': return 'VIP Limousine / Private Car';
      default: return 'Transfer';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Intro Header */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: 700 }}>
          {language === 'ru' ? 'Междугородняя логистика и бронирование' : 'Intercity Transit & Booking Guide'}
        </h2>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          {language === 'ru'
            ? 'Проверенные способы перемещения между городами с прямыми ссылками на официальные агрегаторы без переплат туристическим агентствам.'
            : 'Vetted intercity transit options with verified direct booking links to avoid inflated agency markups.'}
        </p>
      </div>

      {/* Transit Legs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {legs.map((leg) => (
          <div
            key={leg.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(15, 118, 110, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getTransportIcon(leg.transportMode)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    <span>{leg.fromCity}</span>
                    <ArrowRight size={18} color="var(--accent-emerald)" />
                    <span>{leg.toCity}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {getTransportName(leg.transportMode)} • {language === 'ru' ? 'Время в пути:' : 'Duration:'} <strong>{leg.duration}</strong>
                  </div>
                </div>
              </div>

              {leg.bookingUrl && (
                <a
                  href={leg.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.55rem 1.1rem',
                    background: 'var(--accent-emerald)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 3px 8px rgba(15, 118, 110, 0.2)'
                  }}
                >
                  <ExternalLink size={14} />
                  {language === 'ru' ? 'Купить билет онлайн' : 'Book Online'}
                </a>
              )}
            </div>

            <div style={{
              background: 'rgba(15, 118, 110, 0.04)',
              borderLeft: '3px solid var(--accent-emerald)',
              padding: '0.75rem 1rem',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              lineHeight: 1.5
            }}>
              <strong>{language === 'ru' ? 'Рекомендация основателя:' : 'Founder\'s Advice:'}</strong> {leg.bookingTip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
