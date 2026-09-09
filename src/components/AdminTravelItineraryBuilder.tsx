import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type {
  AdminClientRecord,
  TravelDayItem,
  TravelActivityItem,
  TravelTransitLeg
} from '../types';
import { DEFAULT_TRAVEL_DAYS, DEFAULT_TRAVEL_TRANSIT_LEGS } from '../translations/defaultTravelData';
import {
  Plus,
  Trash2,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Send,
  RefreshCw,
  Plane
} from 'lucide-react';

interface AdminTravelItineraryBuilderProps {
  selectedClient: AdminClientRecord;
  onPublishSuccess?: () => void;
}

const SUPPORTED_CITIES = [
  { id: 'danang', nameRu: 'Дананг', nameEn: 'Da Nang' },
  { id: 'hoian', nameRu: 'Хойан', nameEn: 'Hoi An' },
  { id: 'hanoi', nameRu: 'Ханой', nameEn: 'Hanoi' },
  { id: 'ninhbinh', nameRu: 'Ниньбинь', nameEn: 'Ninh Binh' },
  { id: 'sapa', nameRu: 'Сапа', nameEn: 'Sapa' },
  { id: 'nhatrang', nameRu: 'Нячанг', nameEn: 'Nha Trang' },
  { id: 'hcmc', nameRu: 'Хошимин (Сайгон)', nameEn: 'Ho Chi Minh City' },
  { id: 'phuquoc', nameRu: 'Фукуок', nameEn: 'Phu Quoc' }
];

export const AdminTravelItineraryBuilder: React.FC<AdminTravelItineraryBuilderProps> = ({
  selectedClient,
  onPublishSuccess
}) => {
  const {
    updateTravelDays,
    updateTravelTransitLegs,
    applyTravelRevision,
    publishClientUpdates,
    language
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'itinerary' | 'transit'>('itinerary');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Modals for adding
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddLegOpen, setIsAddLegOpen] = useState(false);

  // New Activity form state
  const [newSlot, setNewSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [newActTitle, setNewActTitle] = useState('');
  const [newActDesc, setNewActDesc] = useState('');
  const [newActCost, setNewActCost] = useState('');
  const [newActTip, setNewActTip] = useState('');
  const [newActMaps, setNewActMaps] = useState('');

  // New Transit Leg form state
  const [newLegFrom, setNewLegFrom] = useState('Ханой');
  const [newLegTo, setNewLegTo] = useState('Дананг');
  const [newLegMode, setNewLegMode] = useState<'flight' | 'train' | 'sleeper_bus' | 'private_car'>('flight');
  const [newLegDuration, setNewLegDuration] = useState('1 ч 20 мин');
  const [newLegTip, setNewLegTip] = useState('Рекомендуем Vietnam Airlines с включенным багажом.');
  const [newLegUrl, setNewLegUrl] = useState('https://www.vietnamairlines.com');

  const days: TravelDayItem[] = (selectedClient.travelDays && selectedClient.travelDays.length > 0)
    ? selectedClient.travelDays
    : DEFAULT_TRAVEL_DAYS;

  const transitLegs: TravelTransitLeg[] = (selectedClient.travelTransitLegs && selectedClient.travelTransitLegs.length > 0)
    ? selectedClient.travelTransitLegs
    : DEFAULT_TRAVEL_TRANSIT_LEGS;

  const currentDay = days[selectedDayIndex] || days[0];

  // Travel Quality Gate validation checks
  const qualityChecks = [
    {
      id: 'days_count',
      label: language === 'ru' ? `Дней в маршруте: ${days.length} (от 1 до 30 дней)` : `Days in route: ${days.length} (1 to 30 days)`,
      passed: days.length >= 1
    },
    {
      id: 'activities_exist',
      label: language === 'ru' ? 'Активности заполнены для каждого дня' : 'Activities created for each day',
      passed: days.length > 0 && days.every(d => d.activities && d.activities.length > 0)
    },
    {
      id: 'slots_covered',
      label: language === 'ru' ? 'Соблюден баланс Утро / День / Вечер' : 'Morning / Afternoon / Evening slots balanced',
      passed: days.some(d => (d.activities || []).some(a => a.timeSlot === 'morning')) &&
              days.some(d => (d.activities || []).some(a => a.timeSlot === 'afternoon')) &&
              days.some(d => (d.activities || []).some(a => a.timeSlot === 'evening'))
    },
    {
      id: 'maps_provided',
      label: language === 'ru' ? 'Указаны прямые ссылки на Google Maps' : 'Google Maps links provided',
      passed: days.some(d => (d.activities || []).some(a => !!a.googleMapsUrl))
    },
    {
      id: 'transit_legs',
      label: language === 'ru' ? `Междугородняя логистика (${transitLegs.length} этапов)` : `Intercity transit legs (${transitLegs.length})`,
      passed: transitLegs.length >= 1
    }
  ];

  const allChecksPassed = qualityChecks.every(c => c.passed);
  const revState = selectedClient.travelRevision;
  const isRevPending = revState && revState.requested && revState.status === 'pending';

  // Day Handlers
  const handleAddDay = () => {
    const nextDayNum = days.length + 1;
    const newDay: TravelDayItem = {
      dayNumber: nextDayNum,
      date: `День ${nextDayNum}`,
      cityId: 'danang',
      cityName: { ru: 'Дананг', en: 'Da Nang' },
      title: {
        ru: `День ${nextDayNum} • Исследование локаций и отдых`,
        en: `Day ${nextDayNum} • City exploration and leisure`
      },
      logisticsTip: 'Рекомендуем передвигаться на такси Grab.',
      activities: [
        {
          id: `act-${nextDayNum}-1`,
          timeSlot: 'morning',
          title: 'Утренняя прогулка и завтрак',
          description: 'Локальное кафе со свежим кофе и традиционным завтраком фо бо.',
          googleMapsUrl: 'https://maps.google.com',
          estimatedCostVND: '80 000 ₫',
          proTip: 'Приходите до 08:30, пока нет очередей.'
        }
      ]
    };
    const updated = [...days, newDay];
    updateTravelDays(selectedClient.id, updated);
    setSelectedDayIndex(updated.length - 1);
  };

  const handleDeleteDay = (indexToDelete: number) => {
    if (days.length <= 1) {
      alert(language === 'ru' ? 'Маршрут должен содержать хотя бы 1 день.' : 'Route must contain at least 1 day.');
      return;
    }
    const updated = days.filter((_, idx) => idx !== indexToDelete).map((d, i) => ({
      ...d,
      dayNumber: i + 1,
      date: `День ${i + 1}`
    }));
    updateTravelDays(selectedClient.id, updated);
    setSelectedDayIndex(Math.max(0, indexToDelete - 1));
  };

  const handleUpdateDayField = (index: number, field: string, value: any) => {
    const updated = days.map((d, idx) => {
      if (idx === index) {
        if (field === 'cityId') {
          const matched = SUPPORTED_CITIES.find(c => c.id === value);
          return {
            ...d,
            cityId: value,
            cityName: {
              ru: matched?.nameRu || value,
              en: matched?.nameEn || value
            }
          };
        }
        if (field === 'titleRu') {
          return { ...d, title: { ...d.title, ru: value } };
        }
        if (field === 'logisticsTip') {
          return { ...d, logisticsTip: value };
        }
      }
      return d;
    });
    updateTravelDays(selectedClient.id, updated);
  };

  // Activity Handlers
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const newAct: TravelActivityItem = {
      id: 'act-' + Date.now(),
      timeSlot: newSlot,
      title: newActTitle.trim(),
      description: newActDesc.trim(),
      estimatedCostVND: newActCost.trim() || undefined,
      proTip: newActTip.trim() || undefined,
      googleMapsUrl: newActMaps.trim() || undefined
    };

    const updated = days.map((d, idx) => {
      if (idx === selectedDayIndex) {
        return {
          ...d,
          activities: [...(d.activities || []), newAct]
        };
      }
      return d;
    });

    updateTravelDays(selectedClient.id, updated);
    setNewActTitle('');
    setNewActDesc('');
    setNewActCost('');
    setNewActTip('');
    setNewActMaps('');
    setIsAddActivityOpen(false);
  };

  const handleDeleteActivity = (actId: string) => {
    const updated = days.map((d, idx) => {
      if (idx === selectedDayIndex) {
        return {
          ...d,
          activities: (d.activities || []).filter(a => a.id !== actId)
        };
      }
      return d;
    });
    updateTravelDays(selectedClient.id, updated);
  };

  // Transit Leg Handlers
  const handleAddLeg = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeg: TravelTransitLeg = {
      id: 'leg-' + Date.now(),
      fromCity: newLegFrom,
      toCity: newLegTo,
      transportMode: newLegMode,
      duration: newLegDuration,
      bookingTip: newLegTip,
      bookingUrl: newLegUrl || undefined
    };

    const updated = [...transitLegs, newLeg];
    updateTravelTransitLegs(selectedClient.id, updated);
    setIsAddLegOpen(false);
  };

  const handleDeleteLeg = (legId: string) => {
    const updated = transitLegs.filter(l => l.id !== legId);
    updateTravelTransitLegs(selectedClient.id, updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Travel Quality Gate & Publish Header */}
      <div className="glass-card" style={{
        padding: '1.25rem 1.5rem',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span style={{
              background: 'rgba(15, 118, 110, 0.1)',
              color: 'var(--accent-emerald)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px'
            }}>
              ТАРИФ: ПОЕЗДКА ($290)
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Поддержка WhatsApp: <strong>14 дней</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: allChecksPassed ? '#15803D' : '#D97706'
            }}>
              {allChecksPassed ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              {allChecksPassed ? 'Travel Quality Gate пройден' : 'Quality Gate: требуется заполнение'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ({qualityChecks.filter(c => c.passed).length} / {qualityChecks.length} стандартов)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            publishClientUpdates(selectedClient.id);
            if (onPublishSuccess) onPublishSuccess();
          }}
          className="btn btn-primary"
          style={{
            padding: '0.65rem 1.4rem',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(15,118,110,0.25)'
          }}
        >
          <Send size={15} />
          <span>{language === 'ru' ? 'Опубликовать клиенту' : 'Publish to Client'}</span>
        </button>
      </div>

      {/* Revision Request Alert for Founder */}
      {isRevPending && (
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400E', fontWeight: 700, marginBottom: '0.3rem' }}>
              <RefreshCw size={18} />
              <span>Клиент запросил бесплатную корректировку маршрута (1/1)</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#78350F' }}>
              <strong>Пожелания клиента:</strong> “{revState?.requestText}”
            </div>
          </div>

          <button
            type="button"
            onClick={() => applyTravelRevision(selectedClient.id)}
            style={{
              padding: '0.6rem 1.1rem',
              background: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <CheckCircle2 size={15} />
            <span>Пометить корректировку как примененную</span>
          </button>
        </div>
      )}

      {/* Quality Gate Checklist Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.6rem',
        background: '#FAF8F5',
        padding: '0.85rem 1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.78rem'
      }}>
        {qualityChecks.map(check => (
          <div key={check.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: check.passed ? '#15803D' : '#9CA3AF' }}>
            <CheckCircle2 size={14} color={check.passed ? '#15803D' : '#D1D5DB'} />
            <span style={{ fontWeight: check.passed ? 600 : 400 }}>{check.label}</span>
          </div>
        ))}
      </div>

      {/* Builder Subtabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveSubTab('itinerary')}
          style={{
            padding: '0.55rem 1.2rem',
            borderRadius: 'var(--radius-sm)',
            background: activeSubTab === 'itinerary' ? 'var(--accent-emerald)' : 'transparent',
            color: activeSubTab === 'itinerary' ? '#FFFFFF' : 'var(--text-main)',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Calendar size={15} />
          <span>Конструктор дней маршрута ({days.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('transit')}
          style={{
            padding: '0.55rem 1.2rem',
            borderRadius: 'var(--radius-sm)',
            background: activeSubTab === 'transit' ? 'var(--accent-emerald)' : 'transparent',
            color: activeSubTab === 'transit' ? '#FFFFFF' : 'var(--text-main)',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Plane size={15} />
          <span>Междугородний транспорт ({transitLegs.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: ITINERARY BUILDER */}
      {activeSubTab === 'itinerary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Days Selector & Add Day Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {days.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    background: isSelected ? '#FFFFFF' : '#FAF8F5',
                    color: isSelected ? 'var(--accent-emerald)' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  День {day.dayNumber} ({day.cityName.ru})
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleAddDay}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--accent-emerald)',
                background: 'rgba(15, 118, 110, 0.05)',
                color: 'var(--accent-emerald)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Plus size={14} />
              <span>Добавить день</span>
            </button>
          </div>

          {/* Current Day Editor Panel */}
          {currentDay && (
            <div className="glass-card" style={{
              padding: '1.5rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'var(--accent-emerald)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 800
                  }}>
                    ДЕНЬ {currentDay.dayNumber}
                  </span>

                  {/* City Selector */}
                  <select
                    value={currentDay.cityId}
                    onChange={(e) => handleUpdateDayField(selectedDayIndex, 'cityId', e.target.value)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: '#FAF8F5'
                    }}
                  >
                    {SUPPORTED_CITIES.map(c => (
                      <option key={c.id} value={c.id}>{c.nameRu} ({c.nameEn})</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteDay(selectedDayIndex)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#DC2626',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Удалить день</span>
                </button>
              </div>

              {/* Day Title and Logistics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                    Название / Тема дня (рус):
                  </label>
                  <input
                    type="text"
                    value={currentDay.title.ru}
                    onChange={(e) => handleUpdateDayField(selectedDayIndex, 'titleRu', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      boxSizing: 'border-box'
                    }}
                    placeholder="Например: Старый Квартал, озеро Хоан Кием и яичный кофе"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                    Логистический совет / Трансфер дня:
                  </label>
                  <input
                    type="text"
                    value={currentDay.logisticsTip || ''}
                    onChange={(e) => handleUpdateDayField(selectedDayIndex, 'logisticsTip', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Из аэропорта возьмите GrabCar (~280 000 ₫). Не садитесь к частным зазывалам."
                  />
                </div>
              </div>

              {/* Day Activities List */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Активности дня (Утро / День / Вечер):
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddActivityOpen(true)}
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Plus size={14} />
                    <span>Добавить активность</span>
                  </button>
                </div>

                {(!currentDay.activities || currentDay.activities.length === 0) ? (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    В этот день еще нет активностей. Добавьте утренний, дневной или вечерний пункт маршрута.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {currentDay.activities.map((act) => (
                      <div
                        key={act.id}
                        style={{
                          padding: '0.9rem 1.1rem',
                          background: '#FAF8F5',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              background: act.timeSlot === 'morning' ? 'rgba(217, 119, 6, 0.15)' : act.timeSlot === 'afternoon' ? 'rgba(194, 94, 32, 0.15)' : 'rgba(124, 58, 237, 0.15)',
                              color: act.timeSlot === 'morning' ? '#D97706' : act.timeSlot === 'afternoon' ? '#C25E20' : '#7C3AED'
                            }}>
                              {act.timeSlot === 'morning' ? 'Утро' : act.timeSlot === 'afternoon' ? 'День' : 'Вечер'}
                            </span>
                            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{act.title}</strong>
                            {act.estimatedCostVND && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                                • {act.estimatedCostVND}
                              </span>
                            )}
                          </div>

                          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.35rem' }}>
                            {act.description}
                          </div>

                          {act.proTip && (
                            <div style={{ fontSize: '0.78rem', color: '#92400E' }}>
                              💡 <strong>Совет:</strong> {act.proTip}
                            </div>
                          )}

                          {act.googleMapsUrl && (
                            <div style={{ marginTop: '0.35rem' }}>
                              <a
                                href={act.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '0.76rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', fontWeight: 600 }}
                              >
                                <ExternalLink size={12} /> Google Maps
                              </a>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(act.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9CA3AF',
                            padding: '0.3rem'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: TRANSIT LEGS */}
      {activeSubTab === 'transit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Маршруты перемещений между городами (поезда, самолеты, лимузины):
            </div>
            <button
              type="button"
              onClick={() => setIsAddLegOpen(true)}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Plus size={14} />
              <span>Добавить междугородний этап</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {transitLegs.map(leg => (
              <div
                key={leg.id}
                className="glass-card"
                style={{
                  padding: '1.1rem 1.25rem',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    <span>{leg.fromCity}</span>
                    <span>→</span>
                    <span>{leg.toCity}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      ({leg.duration})
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {leg.bookingTip}
                  </div>
                  {leg.bookingUrl && (
                    <a
                      href={leg.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}
                    >
                      <ExternalLink size={12} /> {leg.bookingUrl}
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteLeg(leg.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    padding: '0.3rem'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Activity */}
      {isAddActivityOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '520px',
            width: '100%',
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>
              Добавить активность в День {currentDay.dayNumber}
            </h3>

            <form onSubmit={handleAddActivity}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Время суток:
                  </label>
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value as any)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="morning">Утро (Morning)</option>
                    <option value="afternoon">День (Afternoon)</option>
                    <option value="evening">Вечер (Evening)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Название активности:
                  </label>
                  <input
                    type="text"
                    required
                    value={newActTitle}
                    onChange={(e) => setNewActTitle(e.target.value)}
                    placeholder="Храм Литературы и сад"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Описание:
                  </label>
                  <textarea
                    rows={3}
                    value={newActDesc}
                    onChange={(e) => setNewActDesc(e.target.value)}
                    placeholder="Старейший университет Вьетнама, основанный в 1070 году..."
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Ориентир по цене:
                    </label>
                    <input
                      type="text"
                      value={newActCost}
                      onChange={(e) => setNewActCost(e.target.value)}
                      placeholder="70 000 ₫ (билет)"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Ссылка Google Maps:
                    </label>
                    <input
                      type="url"
                      value={newActMaps}
                      onChange={(e) => setNewActMaps(e.target.value)}
                      placeholder="https://maps.google.com/?q=..."
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Инсайдерский лайфхак (Pro-tip):
                  </label>
                  <input
                    type="text"
                    value={newActTip}
                    onChange={(e) => setNewActTip(e.target.value)}
                    placeholder="Приходите к 8:00 утра до туристических автобусов..."
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddActivityOpen(false)}
                  style={{ padding: '0.5rem 1rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
                >
                  Сохранить активность
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Transit Leg */}
      {isAddLegOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '480px',
            width: '100%',
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>
              Добавить междугородний этап
            </h3>

            <form onSubmit={handleAddLeg}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Откуда:</label>
                    <input
                      type="text"
                      required
                      value={newLegFrom}
                      onChange={(e) => setNewLegFrom(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Куда:</label>
                    <input
                      type="text"
                      required
                      value={newLegTo}
                      onChange={(e) => setNewLegTo(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Вид транспорта:</label>
                  <select
                    value={newLegMode}
                    onChange={(e) => setNewLegMode(e.target.value as any)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="flight">Самолет (Flight)</option>
                    <option value="private_car">Лимузин / GrabCar</option>
                    <option value="train">Поезд</option>
                    <option value="sleeper_bus">Спальный автобус</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Время в пути:</label>
                  <input
                    type="text"
                    value={newLegDuration}
                    onChange={(e) => setNewLegDuration(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Совет по бронированию:</label>
                  <textarea
                    rows={2}
                    value={newLegTip}
                    onChange={(e) => setNewLegTip(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>Ссылка для покупки:</label>
                  <input
                    type="url"
                    value={newLegUrl}
                    onChange={(e) => setNewLegUrl(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddLegOpen(false)}
                  style={{ padding: '0.5rem 1rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
                >
                  Добавить этап
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
