import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { TravelDayItem } from '../../types';
import { DEFAULT_TRAVEL_DAYS } from '../../translations/defaultTravelData';
import {
  Sun,
  Sunrise,
  Sunset,
  ExternalLink,
  MapPin,
  Lightbulb,
  Printer,
  MessageSquare,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { RevisionRequestModal } from './RevisionRequestModal';

export const DashboardItineraryView: React.FC = () => {
  const { project, language } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState<boolean>(false);

  const days: TravelDayItem[] = (project.travelDays && project.travelDays.length > 0)
    ? project.travelDays
    : DEFAULT_TRAVEL_DAYS;

  const currentDay = days[selectedDayIndex] || days[0];

  const getSlotIcon = (slot: 'morning' | 'afternoon' | 'evening') => {
    switch (slot) {
      case 'morning':
        return <Sunrise size={18} color="#D97706" />;
      case 'afternoon':
        return <Sun size={18} color="#C25E20" />;
      case 'evening':
        return <Sunset size={18} color="#7C3AED" />;
    }
  };

  const getSlotLabel = (slot: 'morning' | 'afternoon' | 'evening') => {
    if (language === 'ru') {
      switch (slot) {
        case 'morning': return 'Утро';
        case 'afternoon': return 'День';
        case 'evening': return 'Вечер';
      }
    }
    switch (slot) {
      case 'morning': return 'Morning';
      case 'afternoon': return 'Afternoon';
      case 'evening': return 'Evening';
    }
  };

  const getSlotBg = (slot: 'morning' | 'afternoon' | 'evening') => {
    switch (slot) {
      case 'morning': return 'rgba(217, 119, 6, 0.08)';
      case 'afternoon': return 'rgba(194, 94, 32, 0.08)';
      case 'evening': return 'rgba(124, 58, 237, 0.08)';
    }
  };

  const getSlotBorder = (slot: 'morning' | 'afternoon' | 'evening') => {
    switch (slot) {
      case 'morning': return 'rgba(217, 119, 6, 0.3)';
      case 'afternoon': return 'rgba(194, 94, 32, 0.3)';
      case 'evening': return 'rgba(124, 58, 237, 0.3)';
    }
  };

  const revState = project.travelRevision;
  const isRevisionUsed = revState && (revState.usedCount >= revState.maxCount || revState.status === 'applied');
  const isRevisionPending = revState && revState.requested && revState.status === 'pending';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner with Quick Actions */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{
              background: 'rgba(15, 118, 110, 0.1)',
              color: 'var(--accent-emerald)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {language === 'ru' ? 'Персональный маршрут 1–30 дней' : 'Custom Itinerary 1–30 Days'}
            </span>
            <span style={{
              background: isRevisionUsed ? '#F3F4F6' : isRevisionPending ? '#FEF3C7' : 'rgba(37, 211, 102, 0.12)',
              color: isRevisionUsed ? '#6B7280' : isRevisionPending ? '#D97706' : '#15803D',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px'
            }}>
              {isRevisionUsed
                ? (language === 'ru' ? 'Корректировка: 1/1 использована' : 'Revision: 1/1 used')
                : isRevisionPending
                ? (language === 'ru' ? 'Корректировка: в работе' : 'Revision: in progress')
                : (language === 'ru' ? 'Корректировка: 0/1 (доступна)' : 'Revision: 0/1 available')}
            </span>
          </div>
          <h2 style={{ margin: '0.25rem 0', fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: 700 }}>
            {language === 'ru' ? 'Ваш авторский план путешествия' : 'Your Curated Vietnam Itinerary'}
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {language === 'ru'
              ? 'Каждый день разделен на Утро, День и Вечер с точными локациями, бюджетом и советами инсайдера.'
              : 'Each day is organized by Morning, Afternoon and Evening with GPS spots, budgets and insider tips.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '0.6rem 1rem',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--text-main)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <Printer size={15} />
            {language === 'ru' ? 'Печать / PDF' : 'Print / PDF'}
          </button>

          <button
            onClick={() => setIsRevisionModalOpen(true)}
            style={{
              padding: '0.6rem 1rem',
              background: isRevisionUsed ? '#F3F4F6' : 'rgba(15, 118, 110, 0.08)',
              border: isRevisionUsed ? '1px solid #E5E7EB' : '1px solid rgba(15, 118, 110, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: isRevisionUsed ? '#6B7280' : 'var(--accent-emerald)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RefreshCw size={15} />
            {language === 'ru' ? '1 корректировка' : '1 Free Revision'}
          </button>

          <a
            href="https://wa.me/840394583217?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%AF%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B2%D0%BE%D0%B4%D1%83%20%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B0%20%D0%BF%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(14%20%D0%B4%D0%BD%D0%B5%D0%B9%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B8)"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.6rem 1.1rem',
              background: '#25D366',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
            }}
          >
            <MessageSquare size={15} />
            {language === 'ru' ? 'Поддержка WhatsApp (14 дней)' : 'WhatsApp Concierge (14 Days)'}
          </a>
        </div>
      </div>

      {/* Day Selector Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayIndex(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.75rem 1rem',
                minWidth: '130px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: isSelected ? '#FFFFFF' : '#FAF8F5',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 4px 12px rgba(15,118,110,0.12)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: isSelected ? 'var(--accent-emerald)' : 'var(--text-muted)'
              }}>
                {language === 'ru' ? `День ${day.dayNumber}` : `Day ${day.dayNumber}`}
              </div>
              <div style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginTop: '0.2rem'
              }}>
                {day.cityName[language] || day.cityName.ru}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      {currentDay && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Day Header Banner */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                background: 'var(--accent-emerald)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {language === 'ru' ? `День ${currentDay.dayNumber}` : `Day ${currentDay.dayNumber}`}
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.82rem',
                color: 'var(--accent-terracotta)',
                fontWeight: 600
              }}>
                <MapPin size={14} />
                {currentDay.cityName[language] || currentDay.cityName.ru}
              </span>
            </div>

            <h3 style={{ margin: '0.25rem 0 0.75rem 0', fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 700 }}>
              {currentDay.title[language] || currentDay.title.ru}
            </h3>

            {currentDay.logisticsTip && (
              <div style={{
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: '#92400E'
              }}>
                <Navigation size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
                <div>
                  <strong>{language === 'ru' ? 'Логистика дня:' : 'Logistics pro-tip:'}</strong> {currentDay.logisticsTip}
                </div>
              </div>
            )}
          </div>

          {/* Activities by Time Slots: Morning, Afternoon, Evening */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['morning', 'afternoon', 'evening'].map((slotKey) => {
              const slot = slotKey as 'morning' | 'afternoon' | 'evening';
              const acts = (currentDay.activities || []).filter((a) => a.timeSlot === slot);
              if (acts.length === 0) return null;

              return (
                <div key={slot} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.8rem',
                    background: getSlotBg(slot),
                    border: `1px solid ${getSlotBorder(slot)}`,
                    borderRadius: 'var(--radius-md)',
                    width: 'fit-content'
                  }}>
                    {getSlotIcon(slot)}
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {getSlotLabel(slot)}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                    {acts.map((act) => (
                      <div
                        key={act.id}
                        className="glass-card"
                        style={{
                          background: '#FFFFFF',
                          padding: '1.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>
                              {act.title}
                            </h4>
                            {act.estimatedCostVND && (
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: '#F3F4F6',
                                color: 'var(--accent-emerald)',
                                padding: '0.2rem 0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                whiteSpace: 'nowrap'
                              }}>
                                {act.estimatedCostVND}
                              </span>
                            )}
                          </div>

                          <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            {act.description}
                          </p>

                          {act.proTip && (
                            <div style={{
                              background: 'rgba(15, 118, 110, 0.06)',
                              borderLeft: '3px solid var(--accent-emerald)',
                              padding: '0.6rem 0.75rem',
                              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                              fontSize: '0.82rem',
                              color: 'var(--accent-emerald)',
                              marginBottom: '0.85rem',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.45rem'
                            }}>
                              <Lightbulb size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                              <div>
                                <strong>{language === 'ru' ? 'Лайфхак:' : 'Pro-tip:'}</strong> {act.proTip}
                              </div>
                            </div>
                          )}
                        </div>

                        {act.googleMapsUrl && (
                          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                            <a
                              href={act.googleMapsUrl}
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
                              {language === 'ru' ? 'Открыть точку в Google Maps ↗' : 'Open in Google Maps ↗'}
                            </a>
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
      )}

      {/* Revision Request Modal */}
      <RevisionRequestModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
      />
    </div>
  );
};
