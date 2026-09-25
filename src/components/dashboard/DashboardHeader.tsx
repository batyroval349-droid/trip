import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { ProjectStatus } from '../../types';
import { MessageCircle, Send, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { CITIES_DATA, normalizeCityId } from '../../translations/content';

type WeatherType = 'sun' | 'clouds' | 'rain' | 'storm';

const VIETNAM_CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  danang: { lat: 16.06778, lon: 108.22083 },
  'da nang': { lat: 16.06778, lon: 108.22083 },
  hoian: { lat: 15.88006, lon: 108.33805 },
  'hoi an': { lat: 15.88006, lon: 108.33805 },
  saigon: { lat: 10.82302, lon: 106.62965 },
  'ho chi minh': { lat: 10.82302, lon: 106.62965 },
  'ho chi minh city': { lat: 10.82302, lon: 106.62965 },
  nhatrang: { lat: 12.24507, lon: 109.19432 },
  'nha trang': { lat: 12.24507, lon: 109.19432 },
  hanoi: { lat: 21.02851, lon: 105.85417 },
  phuquoc: { lat: 10.22889, lon: 103.95722 },
  'phu quoc': { lat: 10.22889, lon: 103.95722 },
  dalat: { lat: 11.94041, lon: 108.45831 },
  'da lat': { lat: 11.94041, lon: 108.45831 }
};

const classifyWmoWeather = (code: number): WeatherType => {
  if (code === 0 || code === 1) return 'sun';
  if ([2, 3, 45, 48].includes(code)) return 'clouds';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'clouds';
};

const getWeatherConditionLabel = (type: WeatherType, lang: 'ru' | 'en'): string => {
  const labels: Record<WeatherType, { ru: string; en: string }> = {
    sun: { ru: 'Ясно, солнечно', en: 'Sunny & Clear' },
    clouds: { ru: 'Облачно', en: 'Partly Cloudy' },
    rain: { ru: 'Тропический дождь', en: 'Tropical Rain' },
    storm: { ru: 'Гроза', en: 'Thunderstorm' }
  };
  return labels[type][lang];
};

export const DashboardHeader: React.FC = () => {
  const { project, t, language, upgradeToRelocation } = useApp();

  const formatArrivalDate = (raw?: string): string => {
    if (!raw) return '—';
    const trimmed = raw.trim();
    const monthDayMatch = trimmed.match(/^([a-zа-яё]+)\s+(\d{1,2})(.*)$/i);
    if (monthDayMatch) {
      const month = monthDayMatch[1];
      const day = monthDayMatch[2];
      const rest = monthDayMatch[3];
      if (language === 'ru') {
        const genitiveMonths: Record<string, string> = {
          'январь': 'января', 'февраль': 'февраля', 'март': 'марта', 'апрель': 'апреля',
          'май': 'мая', 'июнь': 'июня', 'июль': 'июля', 'август': 'августа',
          'сентябрь': 'сентября', 'октябрь': 'октября', 'ноябрь': 'ноября', 'декабрь': 'декабря'
        };
        const gen = genitiveMonths[month.toLowerCase()] || month;
        return `${day} ${gen}${rest ? ' ' + rest.trim() : ''}`;
      }
      const capMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
      return `${capMonth} ${day}${rest ? ' ' + rest.trim() : ''}`;
    }
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const statuses: { id: ProjectStatus; label: string }[] = [
    { id: 'new', label: t('statusNew') },
    { id: 'questionnaire_completed', label: t('statusQuestionnaireCompleted') },
    { id: 'research_in_progress', label: t('statusResearchInProgress') },
    { id: 'plan_ready', label: t('statusPlanReady') },
    { id: 'in_progress', label: t('statusInProgress') },
    { id: 'completed', label: t('statusCompleted') }
  ];

  const currentStatusIdx = Math.max(0, statuses.findIndex((s) => s.id === project.status));

  const getStatusProgress = (status: ProjectStatus): number => {
    switch (status) {
      case 'new': return 15;
      case 'questionnaire_completed': return 35;
      case 'research_in_progress': return 50;
      case 'plan_ready': return 75;
      case 'in_progress': return 90;
      case 'completed': return 100;
      default: return 35;
    }
  };

  const isRelocationTier = project.tierId === 'tier3' || project.tierId === 'tier4';
  const isRelocationPlanPublished = isRelocationTier
    ? (project.isRelocationPlanPublished === true || (project.status === 'plan_ready' && !project.upgradedFromTier))
    : true;
  const isPlanPublished = isRelocationTier
    ? isRelocationPlanPublished
    : (project.status === 'plan_ready' || project.status === 'in_progress' || project.status === 'completed');

  // Honest completed milestones ratio
  const totalRoadmap = project.roadmapTasks?.length || 0;
  const completedRoadmap = project.roadmapTasks?.filter((r) => r.completed).length || 0;
  const honestProgressPercent = totalRoadmap > 0
    ? Math.round((completedRoadmap / totalRoadmap) * 100)
    : (project.progressPercent || getStatusProgress(project.status));

  // Recommended city resolution (support project.recommendedCity.name, project.recommendedCityId, etc.)
  const recommendedCityObj = CITIES_DATA.find((c) => c.id === normalizeCityId(project.recommendedCityId));
  const cityNameEn = (project as any).recommendedCity?.name?.en
    || (project as any).recommendedCity?.name
    || (recommendedCityObj ? recommendedCityObj.name.en : null)
    || (project.travelDays?.[0]?.cityName?.en)
    || (typeof project.recommendedCityId === 'string' && project.recommendedCityId ? project.recommendedCityId : 'Da Nang');

  const displayCityName = (project as any).recommendedCity?.name?.[language]
    || (project as any).recommendedCity?.name
    || (recommendedCityObj ? recommendedCityObj.name[language] : null)
    || (project.travelDays?.[0]?.cityName?.[language])
    || cityNameEn;

  // Weather state & live fetch with sessionStorage cache
  const [weather, setWeather] = useState<{
    temp: number;
    code: number;
    type: WeatherType;
    loading: boolean;
  }>({
    temp: 28,
    code: 0,
    type: 'sun',
    loading: true
  });

  useEffect(() => {
    // Only fetch weather if plan is published and city is known
    if (!isPlanPublished || !cityNameEn) {
      return;
    }

    let isMounted = true;
    const cacheKey = `indochine_weather_${cityNameEn.trim().toLowerCase()}`;

    // 1. Check client session cache
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        // Valid for 30 minutes
        if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
          setWeather({ ...parsed.data, loading: false });
          return;
        }
      }
    } catch (e) {
      // sessionStorage unavailable
    }

    async function fetchWeather() {
      try {
        let lat = 16.06778;
        let lon = 108.22083;
        const normalized = cityNameEn.trim().toLowerCase();

        // 2. Fast-path: use pre-mapped Vietnam city coordinates to avoid geocoding API overhead
        if (VIETNAM_CITY_COORDS[normalized]) {
          lat = VIETNAM_CITY_COORDS[normalized].lat;
          lon = VIETNAM_CITY_COORDS[normalized].lon;
        } else {
          // Geocode via Open-Meteo
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityNameEn)}&count=1`
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results.length > 0) {
              lat = geoData.results[0].latitude;
              lon = geoData.results[0].longitude;
            }
          }
        }

        // 3. Current Weather Forecast
        const forecastRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        if (!forecastRes.ok) throw new Error('Forecast fetch failed');
        const forecastData = await forecastRes.json();

        if (forecastData?.current && isMounted) {
          const temp = Math.round(forecastData.current.temperature_2m);
          const code = Number(forecastData.current.weather_code);
          const type = classifyWmoWeather(code);

          const data = { temp, code, type };
          setWeather({ ...data, loading: false });

          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data, timestamp: Date.now() })
            );
          } catch (e) {}
        }
      } catch (err) {
        // Silent graceful fallback
        if (isMounted) {
          setWeather((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [isPlanPublished, cityNameEn]);

  // Time-of-day greeting matching reference: "Good evening, Reza 👋"
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return language === 'ru' ? 'Доброе утро' : 'Good morning';
    }
    if (hour >= 12 && hour < 18) {
      return language === 'ru' ? 'Добрый день' : 'Good afternoon';
    }
    return language === 'ru' ? 'Добрый вечер' : 'Good evening';
  };

  const renderWeatherVisual = (type: WeatherType) => {
    switch (type) {
      case 'sun':
        return (
          <div className="weather-sun-box">
            <svg className="weather-sun-rays-svg" viewBox="0 0 48 48" fill="none">
              <line x1="24" y1="2" x2="24" y2="7" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="41" x2="24" y2="46" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="2" y1="24" x2="7" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="41" y1="24" x2="46" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8.4" y1="8.4" x2="11.9" y2="11.9" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="36.1" y1="36.1" x2="39.6" y2="39.6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8.4" y1="39.6" x2="11.9" y2="36.1" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="36.1" y1="11.9" x2="39.6" y2="8.4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="weather-sun-core" />
          </div>
        );
      case 'rain':
        return (
          <div className="weather-rain-box">
            <svg className="weather-rain-cloud" width="34" height="22" viewBox="0 0 24 16" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <div className="weather-rain-drop weather-rain-drop-1" />
            <div className="weather-rain-drop weather-rain-drop-2" />
            <div className="weather-rain-drop weather-rain-drop-3" />
            <div className="weather-rain-drop weather-rain-drop-4" />
          </div>
        );
      case 'storm':
        return (
          <div className="weather-storm-box">
            <svg className="weather-storm-cloud" width="34" height="22" viewBox="0 0 24 16" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <div className="weather-rain-drop weather-rain-drop-1" />
            <div className="weather-rain-drop weather-rain-drop-2" />
            <div className="weather-rain-drop weather-rain-drop-3" />
            <svg className="weather-lightning-bolt" width="13" height="17" viewBox="0 0 16 20" fill="#FACC15">
              <path d="M9 0L1 11h6l-2 9 10-12h-6l2-8z" />
            </svg>
          </div>
        );
      case 'clouds':
      default:
        return (
          <div className="weather-clouds-box">
            <svg className="weather-cloud-back" width="30" height="20" viewBox="0 0 24 16" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <svg className="weather-cloud-front" width="32" height="21" viewBox="0 0 24 16" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <div className="weather-mist-overlay" />
          </div>
        );
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', background: 'var(--dash-bg-card)' }}>
      
      {/* Top Controls Row: Greeting Pill & Utility Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        
        {/* Left: Personalized Greeting Pill (like "Good evening, Reza 👋") */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="dash-greeting-pill">
            <span>{getGreeting()}, {project.clientName} 👋</span>
          </div>

          {/* Minimal Plan Chip */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid var(--dash-border-subtle)',
            borderRadius: 'var(--dash-radius-pill)',
            padding: '0.3rem 0.85rem',
            fontSize: '0.78rem',
            color: 'var(--dash-text-muted)'
          }}>
            <span>
              {language === 'ru' ? 'Тариф:' : 'Plan:'}{' '}
              <strong style={{ color: 'var(--dash-text-main)', fontWeight: 700 }}>
                {project.serviceName[language]}
              </strong>
            </span>
            {project.tierId !== 'tier4' && (
              <button
                type="button"
                onClick={upgradeToRelocation}
                className="dash-action-pill"
                style={{
                  background: 'var(--dash-accent-emerald)',
                  color: '#FFFFFF',
                  borderColor: 'var(--dash-accent-emerald)',
                  padding: '0.15rem 0.55rem',
                  fontSize: '0.7rem'
                }}
                title={language === 'ru' ? 'Перейти на расширенный тариф сопровождения' : 'Upgrade your plan'}
              >
                <Sparkles size={11} />
                <span>{language === 'ru' ? 'Апгрейд' : 'Upgrade'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Sleek Outline Messenger Buttons & Date */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.65)',
            border: '1px solid var(--dash-border-subtle)',
            borderRadius: 'var(--dash-radius-pill)',
            padding: '0.35rem 0.85rem',
            fontSize: '0.8rem',
            color: 'var(--dash-text-muted)'
          }}>
            <Calendar size={13} style={{ color: 'var(--dash-text-muted)' }} />
            <span>
              {project.tierId === 'tier2'
                ? (language === 'ru' ? 'Поездка:' : 'Trip:')
                : (language === 'ru' ? 'Приезд:' : 'Arrival:')}
            </span>
            <strong style={{ color: 'var(--dash-text-main)', fontWeight: 600 }}>
              {formatArrivalDate(project.questionnaire.travelDates)}
            </strong>
          </div>

          <a
            href="https://wa.me/840394583217?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%AF%20%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%20VietReloc"
            target="_blank"
            rel="noopener noreferrer"
            className="dash-action-pill"
            style={{ color: '#16A34A', borderColor: 'rgba(34, 197, 94, 0.4)' }}
            title={language === 'ru' ? 'Связаться в WhatsApp' : 'WhatsApp'}
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://t.me/Likqwerty"
            target="_blank"
            rel="noopener noreferrer"
            className="dash-action-pill"
            style={{ color: '#0284C7', borderColor: 'rgba(2, 132, 199, 0.4)' }}
            title={language === 'ru' ? 'Связаться в Telegram' : 'Telegram'}
          >
            <Send size={14} />
            <span>Telegram</span>
          </a>
        </div>

      </div>

      {/* Centerpiece Hero Focal Area */}
      <div className="dash-hero-metric-wrap">
        
        {/* Focal Row: Dynamic Weather Widget + Compact Progress */}
        <div className="dash-hero-focal-row">
          
          {/* Dynamic Weather Widget */}
          {isPlanPublished ? (
            <div className="dash-weather-widget">
              <div className="dash-weather-visual-wrap">
                {renderWeatherVisual(weather.type)}
              </div>
              <div className="dash-weather-info">
                <div className="dash-weather-temp-row">
                  <span className="dash-weather-temp">
                    {weather.loading ? '…' : `${weather.temp > 0 ? '+' : ''}${weather.temp}°C`}
                  </span>
                  <span className="dash-weather-badge">
                    {weather.loading
                      ? (language === 'ru' ? 'Синхронизация…' : 'Syncing…')
                      : getWeatherConditionLabel(weather.type, language)}
                  </span>
                </div>
                <div className="dash-weather-city">
                  <span>{displayCityName}</span>
                  <span className="dash-weather-country">, {language === 'ru' ? 'Вьетнам' : 'Vietnam'}</span>
                  <span className="dash-weather-live-dot" title="Live Open-Meteo" />
                </div>
              </div>
            </div>
          ) : (
            <div className="dash-weather-widget dash-weather-widget-pending">
              <div className="dash-weather-visual-wrap">
                <div className="weather-pending-pulse">
                  <Sparkles size={22} />
                </div>
              </div>
              <div className="dash-weather-info">
                <div className="dash-weather-pending-title">
                  {language === 'ru' ? 'Формирование персонального плана' : 'Personalized Plan Preparation'}
                </div>
                <div className="dash-weather-pending-sub">
                  {language === 'ru' ? 'Founder изучает анкету и подбирает город' : 'Founder analyzing questionnaire & selecting city'}
                </div>
              </div>
            </div>
          )}

          {/* Compact Honest Progress Widget (Side Element) */}
          <div className="dash-compact-progress-widget">
            <div className="dash-compact-progress-header">
              <span className="dash-compact-progress-title">
                {language === 'ru' ? 'Прогресс' : 'Progress'}
              </span>
              <span className="dash-compact-progress-percent">
                {honestProgressPercent}%
              </span>
            </div>
            <div className="dash-compact-progress-meta">
              <div className="dash-compact-progress-step-name" title={statuses[currentStatusIdx]?.label}>
                {statuses[currentStatusIdx]?.label}
              </div>
              {totalRoadmap > 0 && (
                <div className="dash-compact-progress-counts">
                  {completedRoadmap} {language === 'ru' ? `из ${totalRoadmap} шагов` : `of ${totalRoadmap} steps`}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Minimal Sleek Progress Bar (Reference "To Do" style) */}
        <div className="dash-progress-track" style={{ maxWidth: '680px', margin: '1.25rem auto 1rem auto' }}>
          <div className="dash-progress-fill" style={{ width: `${honestProgressPercent}%` }} />
        </div>

        {/* Step Indicator Nodes */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem', marginTop: '1rem' }}>
          {statuses.map((st, idx) => {
            const isDone = idx <= currentStatusIdx;
            return (
              <div
                key={st.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  opacity: isDone ? 1 : 0.4,
                  fontSize: '0.78rem'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: isDone ? 'var(--dash-accent-dark)' : 'rgba(203, 213, 225, 0.8)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.65rem'
                }}>
                  {isDone ? <CheckCircle2 size={11} /> : idx + 1}
                </div>
                <span style={{ fontWeight: isDone ? 600 : 400, color: isDone ? 'var(--dash-text-main)' : 'var(--dash-text-muted)' }}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
