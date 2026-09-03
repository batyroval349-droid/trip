import React from 'react';
import { Lock, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface LockedFeatureCardProps {
  title: string;
  desc: string;
  upgradeAction: () => void;
  language: 'en' | 'ru';
}

export const LockedFeatureCard: React.FC<LockedFeatureCardProps> = ({
  title,
  desc,
  upgradeAction,
  language
}) => {
  return (
    <div className="glass-card" style={{
      maxWidth: '820px',
      margin: '0 auto',
      padding: '3rem 2.5rem',
      textAlign: 'center',
      border: '2px dashed var(--accent-terracotta)',
      background: '#FAF8F5'
    }}>
      {/* Icon */}
      <div style={{
        width: '68px',
        height: '68px',
        borderRadius: '50%',
        background: 'rgba(194, 91, 61, 0.12)',
        color: 'var(--accent-terracotta)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem auto'
      }}>
        <Lock size={32} />
      </div>

      {/* Plan Badge */}
      <div className="badge badge-terracotta" style={{ marginBottom: '1rem' }}>
        {language === 'ru' ? 'Текущий тариф: Персональное планирование поездки ($290)' : 'Current Plan: Personal Travel Planning ($290)'}
      </div>

      <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
        {title}
      </h2>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 2rem auto' }}>
        {desc}
      </p>

      {/* Comparison Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        textAlign: 'left',
        marginBottom: '2.5rem'
      }}>
        
        {/* Current Plan */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.4rem'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.85rem' }}>
            {language === 'ru' ? 'Входит в ваш тариф ($290):' : 'Included in your plan ($290):'}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Интерактивный личный кабинет клиента' : 'Interactive Client Workspace'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Персональный маршрут поездки (1-30 дней)' : 'Custom 1-30 day travel itinerary'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Базовые гайды по Вьетнаму (климат, Grab, SIM, деньги)' : 'Country guides (climate, Grab, SIM, ATMs)'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Компактный конвертер валют' : 'Compact currency converter'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Прямая связь в WhatsApp с основателем' : 'Direct WhatsApp founder support'}
            </li>
          </ul>
        </div>

        {/* Relocation Plan Upgrade */}
        <div style={{
          background: 'var(--accent-emerald-light)',
          border: '2px solid var(--accent-emerald)',
          borderRadius: 'var(--radius-md)',
          padding: '1.4rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Начинается с тарифа «Релокация» ($490):' : 'Starts in Relocation Plan ($490):'}
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
              + $200
            </span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontWeight: 600 }}>
              <Sparkles size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Индивидуальный подбор городов и районов' : 'Bespoke City & Neighborhood Selection'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontWeight: 600 }}>
              <Sparkles size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Интерактивный калькулятор бюджета и сценариев' : 'Interactive Budget & Cost Modeler'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontWeight: 600 }}>
              <Sparkles size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Пошаговая дорожная карта с чек-листом' : 'Step-by-step Relocation Roadmap'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontWeight: 600 }}>
              <Sparkles size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'База проверенных ресурсов и гайд по жилью' : 'Verified Resources & Housing Guide'}
            </li>
            <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontWeight: 600 }}>
              <Sparkles size={14} style={{ color: 'var(--accent-emerald)' }} /> {language === 'ru' ? 'Персональные заметки и сопровождение основателя' : 'Founder Notes & Continuous Advisory'}
            </li>
          </ul>
        </div>

      </div>

      {/* Upgrade CTA */}
      <button
        onClick={upgradeAction}
        className="btn btn-primary"
        style={{
          fontSize: '1.05rem',
          padding: '1rem 2.2rem',
          margin: '0 auto',
          display: 'inline-flex',
          gap: '0.6rem'
        }}
      >
        <Sparkles size={18} />
        <span>{language === 'ru' ? 'Улучшить тариф до Релокации (+ $200)' : 'Upgrade to Relocation (+ $200)'}</span>
        <ArrowRight size={18} />
      </button>

      <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
        <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
        <span>{language === 'ru' ? 'Мгновенная активация модулей бюджета и дорожной карты' : 'Instant activation of budget and roadmap modules'}</span>
      </div>
    </div>
  );
};
