import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  HeartHandshake,
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
  const tgAcc = vipPerks.founderTelegramAccompaniment || {
    status: 'active',
    daysTotal: 30,
    daysRemaining: 28,
    telegramUsername: 'Likqwerty'
  };

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
              ? 'Ваш премиальный пакет включает персональную психологическую сессию во время переезда, 30 дней прямого сопровождения с основателем в Telegram и приоритетное решение любых вопросов.'
              : 'Your premium package includes a dedicated psychological adaptation session, 30 days of direct founder Telegram accompaniment, and priority support.'}
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

      {/* Module 1: Psychologist & Sexologist Support (Егорова Мария) */}
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
              src={psy.specialistPhotoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
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
                {psy.specialistName || 'Егорова Мария'}
              </h3>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {psy.specialistTitle || 'Дипломированный психолог, клинический специалист, сексолог (4 года практики)'}
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
              {psy.secondSessionPromoCode || 'VIETRELOC-VIP20'}
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

        {/* Description & Support Note */}
        <div style={{ background: '#FFFBEB', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', border: '1px solid #FDE68A' }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#92400E', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} />
            <span>{language === 'ru' ? 'Психологическая поддержка при релокации:' : 'Psychological support during relocation:'}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {psy.notes?.[language] || (language === 'ru'
              ? 'Индивидуальная онлайн-сессия (50 минут): бережная психологическая поддержка во время переезда, преодоление кризиса адаптации, работа со стрессом и сохранение гармонии в паре. 1-я сессия бесплатно по вашему VIP-тарифу, на 2-ю сессию действует скидка 20% по промокоду.'
              : 'Individual online session (50 min): emotional support during relocation, cultural adaptation, stress management, and couple harmony. First session is included free with VIP package; 20% off on 2nd session.')}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="https://t.me/mur_mur_mari"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <span className="icon-3d-hover">
              <MessageCircle size={18} />
            </span>
            <span>{language === 'ru' ? 'Записаться к Марии в Telegram (@mur_mur_mari)' : 'Book with Maria via Telegram (@mur_mur_mari)'}</span>
            <ExternalLink size={14} style={{ opacity: 0.8 }} />
          </a>

          <a
            href="https://wa.me/840394583217"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.8rem 1.3rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <Phone size={16} />
            <span>WhatsApp (+84 039 458 3217)</span>
          </a>
        </div>
      </div>

      {/* Module 2: 30-Day Personal Accompaniment with Founder in Telegram */}
      <div className="cloud-support-bubble" style={{ padding: '2rem 2.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <ShieldCheck size={16} />
              <span>{language === 'ru' ? 'Персональное сопровождение (1 месяц)' : 'Personal Accompaniment (1 Month)'}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
              {language === 'ru' ? '30 дней прямого сопровождения с основателем в Telegram' : '30-Day Direct Accompaniment with Founder in Telegram'}
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '640px' }}>
              {language === 'ru'
                ? 'Прямой закрытый чат 1-на-1 с основателем VietReloc. Оперативная поддержка и решение любых вопросов на протяжении первого месяца жизни во Вьетнаме.'
                : 'Direct 1-on-1 private chat with the VietReloc founder. Prompt assistance throughout your first month in Vietnam.'}
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-emerald)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.08)'
          }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              {language === 'ru' ? 'Статус поддержки:' : 'Support status:'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.15rem' }}>
              {language === 'ru' ? `${tgAcc.daysRemaining || 28} из ${tgAcc.daysTotal || 30} дней` : `${tgAcc.daysRemaining || 28} of ${tgAcc.daysTotal || 30} days`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem' }}>
          <a
            href="https://t.me/Likqwerty"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', borderRadius: '9999px' }}
          >
            <span className="icon-3d-hover">
              <Send size={18} />
            </span>
            <span>{language === 'ru' ? 'Написать основателю в Telegram (@Likqwerty)' : 'Message Founder on Telegram (@Likqwerty)'}</span>
            <ExternalLink size={14} style={{ opacity: 0.8 }} />
          </a>

          <a
            href="https://wa.me/840394583217"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.5rem', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', borderRadius: '9999px' }}
          >
            <Phone size={16} />
            <span>WhatsApp (+84 039 458 3217)</span>
          </a>
        </div>
      </div>

    </div>
  );
};
