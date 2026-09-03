import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, MessageCircle, Send, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  sectionName: string;
  onGoBack: () => void;
}

export const PendingRecommendationNotice: React.FC<Props> = ({ sectionName, onGoBack }) => {
  const { language } = useApp();

  return (
    <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
      
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(194, 94, 32, 0.1)',
        color: 'var(--accent-terracotta)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto'
      }}>
        <Clock size={32} />
      </div>

      <div className="badge badge-terracotta" style={{ marginBottom: '1rem' }}>
        <Sparkles size={14} /> {language === 'ru' ? 'Персональное исследование' : 'Bespoke Research in Progress'}
      </div>

      <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
        {language === 'ru'
          ? `Раздел «${sectionName}» еще формируется основателем`
          : `Section "${sectionName}" is currently being prepared`}
      </h2>

      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 1.75rem auto' }}>
        {language === 'ru'
          ? 'Основатель прямо сейчас детально анализирует вашу анкету и готовит персональные рекомендации. Эти данные появятся здесь сразу, как только статус проекта сменится на «План опубликован и готов к просмотру».'
          : 'The founder is currently analyzing your questionnaire and crafting your bespoke recommendations. This data will unlock automatically as soon as the project status changes to "Plan Ready & Published".'}
      </p>

      {/* Week Notice */}
      <div style={{
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        maxWidth: '560px',
        margin: '0 auto 2rem auto',
        fontSize: '0.88rem',
        color: '#92400E',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textAlign: 'left'
      }}>
        <Clock size={20} style={{ flexShrink: 0, color: '#D97706' }} />
        <div>
          <strong>{language === 'ru' ? 'Срок подготовки:' : 'Preparation Timeline:'}</strong>{' '}
          {language === 'ru'
            ? 'Обычно занимает 2–4 рабочих дня. Если статус не поменялся в течение недели — напишите основателю напрямую.'
            : 'Usually takes 2–4 business days. If the status has not changed within a week, please reach out to the founder directly.'}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={onGoBack}
          className="btn btn-primary"
          style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem' }}
        >
          <BookOpen size={16} /> {language === 'ru' ? 'Открыть общую информацию по Вьетнаму' : 'Open Vietnam General Guides'}
        </button>

        <a
          href="https://t.me/indochine_concierge"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
        >
          <Send size={16} /> Telegram
        </a>

        <a
          href="https://wa.me/84900000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>

    </div>
  );
};
