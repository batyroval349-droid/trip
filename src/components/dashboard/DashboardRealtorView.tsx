import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';
import { DEFAULT_PARTNER_REALTOR_DANANG, DEFAULT_PARTNER_REALTOR_NHATRANG } from '../../translations/defaultRelocationData';
import type { PartnerRealtorAssignment } from '../../types';

export const DashboardRealtorView: React.FC = () => {
  const { project, language } = useApp();

  const realtor: PartnerRealtorAssignment = project.partnerRealtor || (
    project.recommendedCityId === 'nhatrang'
      ? DEFAULT_PARTNER_REALTOR_NHATRANG
      : DEFAULT_PARTNER_REALTOR_DANANG
  );

  const statusLabels: Record<string, { labelRu: string; labelEn: string; color: string; bg: string }> = {
    assigned: { labelRu: 'Риелтор назначен • Напишите для старта подбора', labelEn: 'Realtor Assigned • Start your search in chat', color: '#0F766E', bg: '#E6F4F1' },
    chat_created: { labelRu: 'Подбор в Telegram • Риелтор отправляет видеотуры', labelEn: 'Active Search in Telegram • Realtor sending video tours', color: '#0369A1', bg: '#E0F2FE' },
    viewings_scheduled: { labelRu: 'Показы согласованы • Выезд на объекты на месте', labelEn: 'Viewings Scheduled • On-site condo inspections', color: '#B45309', bg: '#FEF3C7' },
    contract_negotiation: { labelRu: 'Квартира выбрана • Договор передан на аудит', labelEn: 'Condo Selected • Draft under legal audit', color: '#7C3AED', bg: '#F3E8FF' },
    leased: { labelRu: 'Договор подписан • Поздравляем с заселением!', labelEn: 'Lease Signed • Welcome to your new home!', color: '#15803D', bg: '#DCFCE7' }
  };

  const currentStatus = statusLabels[realtor.status] || statusLabels.assigned;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <Users size={14} /> {language === 'ru' ? 'Персональный риелтор-партнер' : 'Personal Partner Realtor'}
          </div>
          <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {language === 'ru' ? 'Ваш проверенный риелтор во Вьетнаме' : 'Your Vetted Realtor in Vietnam'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '680px' }}>
            {language === 'ru'
              ? 'Основатель сервиса лично подобрал риелтора под ваши даты, город и бюджет. Риелтор подбирает реальные квартиры, отправляет живые видеообзоры в Telegram/WhatsApp и сопровождает на показах.'
              : 'Our vetted local partner finds available apartments, sends video walkthroughs in Telegram/WhatsApp, and conducts on-site viewings.'}
          </p>
        </div>

        {/* Live Status Badge */}
        <div style={{
          background: currentStatus.bg,
          color: currentStatus.color,
          padding: '0.6rem 1.1rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: `1px solid ${currentStatus.color}40`
        }}>
          <Clock size={15} />
          <span>{language === 'ru' ? currentStatus.labelRu : currentStatus.labelEn}</span>
        </div>
      </div>

      {/* Main Profile Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        
        {/* Left: Realtor Identity Card */}
        <div className="glass-card" style={{
          padding: '2rem',
          background: '#FFFFFF',
          border: '2px solid var(--border-emerald)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 8px 24px rgba(15, 118, 110, 0.08)'
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img
              src={realtor.photoUrl}
              alt={realtor.realtorName}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-emerald)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                  {realtor.realtorName}
                </h3>
                <span title="Проверенный партнер VietReloc">
                  <ShieldCheck size={18} color="var(--accent-emerald)" />
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {realtor.agencyOrTitle}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {realtor.languages.map(lang => (
                  <span key={lang} style={{ background: '#E6F4F1', color: '#0F766E', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                    {lang === 'RU' ? 'Русский' : lang === 'EN' ? 'English' : 'Tiếng Việt'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.3rem' }}>
              {language === 'ru' ? 'Специализация и районы' : 'Specialization & Area'}
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {realtor.specialization}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={`https://t.me/${realtor.telegramUsername.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.4rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} />
              <span>Написать в Telegram (@{realtor.telegramUsername.replace('@', '')})</span>
              <ExternalLink size={14} style={{ opacity: 0.8 }} />
            </a>

            {realtor.whatsappNumber && (
              <a
                href={`https://wa.me/${realtor.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: '0.75rem 1.4rem',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} />
                <span>Написать в WhatsApp ({realtor.whatsappNumber})</span>
              </a>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {language === 'ru'
              ? 'Напишите с кодовым словом «VietReloc» — риелтор уже предупрежден о ваших датах и бюджете.'
              : 'Mention "VietReloc" in chat — your realtor is pre-briefed.'}
          </div>
        </div>

        {/* Right: Founder's Note & Expat Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Founder's Personal Guidance */}
          <div className="glass-card" style={{ padding: '1.75rem', background: '#FFFDF9', border: '1px solid #FCD34D' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#92400E' }}>
              <Sparkles size={18} />
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                {language === 'ru' ? 'Персональная рекомендация основателя' : 'Founder Advisory'}
              </h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
              {realtor.founderNoteToClient[language] || realtor.founderNoteToClient.ru}
            </p>
          </div>

          {/* 4 Rules for Condo Viewings */}
          <div className="glass-card" style={{ padding: '1.75rem', background: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} color="var(--accent-emerald)" />
              <span>{language === 'ru' ? '4 правила при выборе квартиры через риелтора' : '4 Golden Rules for Inspections'}</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>1. Запрашивайте живые видео с открытыми окнами:</strong>
                <div>Это позволяет сразу услышать караоке, шум стройки или шум оживленной трассы до выезда.</div>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>2. Фиксируйте понятный тариф EVN за свет:</strong>
                <div>На практике стандартная норма в кондоминиумах — до 4000–4500 ₫/кВт. Главное — зафиксировать точную ставку в договоре без скрытых сезонных наценок.</div>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>3. Требуйте регистрацию tạm trú в полиции:</strong>
                <div>Хозяин обязан подать ваши данные онлайн в течение 24 часов. Без этого не продлить визу.</div>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>4. Обязательно отправьте договор основателю перед залогом:</strong>
                <div>Во вкладке «Аудит договора» основатель лично проверит проект перед подписанием.</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
