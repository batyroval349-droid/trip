import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  HeartHandshake,
  Car,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  Phone,
  Copy,
  Check,
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_VIP_PERKS } from '../../translations/defaultRelocationData';
import type { VipConciergePerks } from '../../types';

export const DashboardVipConciergeView: React.FC = () => {
  const { project, language } = useApp();
  const [copiedPromo, setCopiedPromo] = useState(false);

  const vipPerks: VipConciergePerks = project.vipConciergePerks || DEFAULT_VIP_PERKS;
  const psy = vipPerks.psychologistSession;
  const arrival = vipPerks.onArrivalAssistance;

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(psy.secondSessionPromoCode || 'VIETRELOC-VIP20');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 3000);
  };

  const psyStatusText = {
    included_not_booked: { label: language === 'ru' ? '1 бесплатная сессия доступна • Запишитесь онлайн' : '1 Free Session Available • Book now', color: '#0F766E', bg: '#E6F4F1' },
    contact_shared: { label: language === 'ru' ? 'Контакт передан • Ожидание согласования времени' : 'Contact Shared • Scheduling in progress', color: '#0369A1', bg: '#E0F2FE' },
    session_scheduled: { label: language === 'ru' ? `Сессия назначена: ${psy.sessionDate || 'в процессе'}` : `Session Scheduled: ${psy.sessionDate || 'TBD'}`, color: '#7C3AED', bg: '#F3E8FF' },
    completed: { label: language === 'ru' ? 'Бесплатная сессия проведена • Доступна скидка на 2-ю' : 'Free Session Completed • 2nd session discount active', color: '#15803D', bg: '#DCFCE7' }
  }[psy.status] || { label: '1 бесплатная сессия доступна', color: '#0F766E', bg: '#E6F4F1' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-emerald" style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', marginBottom: '0.4rem' }}>
            <Crown size={14} /> {language === 'ru' ? 'Тариф VIP Консьерж ($890)' : 'VIP Concierge Package ($890)'}
          </div>
          <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {language === 'ru' ? 'VIP-сопровождение и психологическая поддержка' : 'VIP Concierge & Wellness Support'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '680px' }}>
            {language === 'ru'
              ? 'Ваш премиальный пакет включает персональную психологическую помощь во время переезда, встречу в аэропорту, решение срочных бытовых вопросов и приоритетную линию связи с основателем.'
              : 'Your premium package includes certified psychological adaptation support, airport welcome, urgent arrival tasks, and founder priority line.'}
          </p>
        </div>

        <div style={{
          background: psyStatusText.bg,
          color: psyStatusText.color,
          padding: '0.65rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.86rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Clock size={16} />
          <span>{psyStatusText.label}</span>
        </div>
      </div>

      {/* Module 1: Psychologist / Sexologist Support */}
      <div className="glass-card" style={{
        padding: '2.25rem',
        background: '#FFFFFF',
        border: '2px solid #FCD34D',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <img
              src={psy.specialistPhotoUrl}
              alt={psy.specialistName}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #D97706',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
              }}
            />
            <div>
              <div className="badge badge-emerald" style={{ background: '#FEF3C7', color: '#B45309', marginBottom: '0.3rem' }}>
                <HeartHandshake size={13} /> {language === 'ru' ? '1 сессия бесплатно • Онлайн' : '1 Free Session • Online'}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                {psy.specialistName}
              </h3>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {psy.specialistTitle}
              </div>
            </div>
          </div>

          {/* Promo Code Card for 2nd Session */}
          <div style={{
            background: '#FAF9F6',
            border: '1px dashed #D97706',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem' }}>
              {language === 'ru' ? 'Скидка на 2-ю сессию напрямую:' : '2nd Session Discount Code:'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#B45309', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {psy.secondSessionPromoCode}
            </div>
            <button
              type="button"
              onClick={handleCopyPromo}
              className="btn btn-secondary"
              style={{ marginTop: '0.5rem', padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              {copiedPromo ? <Check size={13} color="#0F766E" /> : <Copy size={13} />}
              <span>{copiedPromo ? (language === 'ru' ? 'Скопировано!' : 'Copied!') : (language === 'ru' ? 'Скопировать' : 'Copy code')}</span>
            </button>
          </div>

        </div>

        {/* Description & Topics */}
        <div style={{ background: '#FFFBEB', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', border: '1px solid #FDE68A' }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#92400E', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} />
            <span>{language === 'ru' ? 'С чем помогает дипломированный специалист при переезде:' : 'How this session supports your transition:'}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {psy.notes[language] || psy.notes.ru}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={`https://t.me/${psy.telegramContact.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <MessageCircle size={18} />
            <span>{language === 'ru' ? `Записаться к психологу в Telegram (${psy.telegramContact})` : `Book session via Telegram (${psy.telegramContact})`}</span>
            <ExternalLink size={14} style={{ opacity: 0.8 }} />
          </a>

          {psy.whatsappContact && (
            <a
              href={`https://wa.me/${psy.whatsappContact.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.8rem 1.3rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              <Phone size={16} />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Module 2: On-Arrival Assistance & Airport Welcome */}
      <div className="glass-card" style={{ padding: '2rem', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <Car size={20} color="var(--accent-emerald)" />
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Консьерж по прилёту и обустройство первой недели' : 'On-Arrival Concierge & First Week Setup'}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Номер рейса:</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {arrival.flightNumber || 'VN 128 (SGN → DAD)'}
            </div>
          </div>

          <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Дата и время прилёта:</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {arrival.arrivalDate || '15 октября 2026, 14:20'}
            </div>
          </div>

          <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Трансфер из аэропорта:</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={16} />
              <span>{arrival.airportPickupStatus === 'driver_assigned' ? 'Водитель с табличкой' : 'Grab-сопровождение'}</span>
            </div>
          </div>
        </div>

        {/* Urgent Tasks Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Задачи консьержа в первые 48 часов:' : 'Concierge arrival tasks:'}
          </div>

          {arrival.urgentTasks && arrival.urgentTasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: task.completed ? '#F0FDF4' : '#FFFFFF',
                border: task.completed ? '1px solid #BBF7D0' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <CheckCircle2 size={18} color={task.completed ? '#0F766E' : '#9CA3AF'} />
              <span style={{ fontSize: '0.88rem', color: task.completed ? '#0F766E' : 'var(--text-main)', fontWeight: task.completed ? 600 : 400 }}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Module 3: Priority Direct Founder Line */}
      <div className="glass-card glass-card-terracotta" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <ShieldCheck size={18} color="var(--accent-terracotta)" />
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
              {language === 'ru' ? 'Приоритетная выделенная линия с основателем' : 'Priority Direct Line with Founder'}
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {language === 'ru'
              ? 'Ваши вопросы обрабатываются в приоритетном порядке в течение 30 календарных дней. Прямая связь в WhatsApp и Telegram.'
              : '30 days of priority advisory via WhatsApp & Telegram directly with the founder.'}
          </p>
        </div>

        <a
          href="https://t.me/Likqwerty"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Send size={15} />
          <span>{language === 'ru' ? 'VIP-чат в Telegram' : 'VIP Telegram Chat'}</span>
        </a>
      </div>

    </div>
  );
};
