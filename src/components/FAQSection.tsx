import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, ShieldAlert } from 'lucide-react';
import { FaqAccordion, type FAQItem } from './ui/faq-chat-accordion';

export const FAQSection: React.FC = () => {
  const { t, language } = useApp();

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: t('faq1Q'),
      answer: t('faq1A'),
      timeClient: '11:02',
      timeFounder: '11:03'
    },
    {
      id: 2,
      question: t('faq2Q'),
      answer: t('faq2A'),
      timeClient: '11:15',
      timeFounder: '11:16'
    },
    {
      id: 3,
      question: t('faq3Q'),
      answer: t('faq3A'),
      timeClient: '11:28',
      timeFounder: '11:30'
    },
    {
      id: 4,
      question: t('faq4Q'),
      answer: t('faq4A'),
      timeClient: '11:42',
      timeFounder: '11:43'
    },
    {
      id: 5,
      question: t('faq5Q' as any),
      answer: t('faq5A' as any),
      timeClient: '12:05',
      timeFounder: '12:07'
    },
    {
      id: 6,
      question: t('faq6Q' as any),
      answer: t('faq6A' as any),
      timeClient: '12:20',
      timeFounder: '12:22'
    },
    {
      id: 7,
      question: t('faq7Q' as any),
      answer: t('faq7A' as any),
      timeClient: '12:35',
      timeFounder: '12:37'
    }
  ];

  return (
    <section id="faq-section" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <MessageSquare size={14} /> {language === 'ru' ? 'Диалог с основателем' : 'Chat with the Founder'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('faqTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
            {language === 'ru'
              ? 'Ответы на частые вопросы клиентов в формате живого диалога с основателем.'
              : 'Direct founder answers to our clients’ most frequent questions in a chat format.'}
          </p>
        </div>

        {/* Chat-Style FAQ Feed */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <FaqAccordion
            data={faqData}
            headerTitle={language === 'ru' ? 'Основатель Indochine Remote' : 'Founder Indochine Remote'}
            headerSubtitle={language === 'ru' ? 'В сети • Отвечает лично' : 'Online • Direct answers'}
            dateBadge={language === 'ru' ? 'Сегодня' : 'Today'}
            expandAllText={language === 'ru' ? 'Показать все ответы' : 'Show all answers'}
            collapseAllText={language === 'ru' ? 'Свернуть ответы' : 'Collapse answers'}
          />

          {/* General Disclaimer under FAQ */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem 1.4rem',
            background: 'rgba(15, 118, 110, 0.06)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.88rem',
            color: 'var(--text-main)',
            lineHeight: 1.55,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <ShieldAlert size={20} style={{ color: 'var(--accent-terracotta)', flexShrink: 0 }} />
            <span>{t('faqDisclaimer' as any)}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
