import React from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ShieldAlert } from 'lucide-react';
import { FaqAccordion, type FAQItem } from './ui/faq-chat-accordion';

export const FAQSection: React.FC = () => {
  const { t, language } = useApp();

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: t('faq1Q'),
      answer: t('faq1A')
    },
    {
      id: 2,
      question: t('faq2Q'),
      answer: t('faq2A')
    },
    {
      id: 3,
      question: t('faq3Q'),
      answer: t('faq3A')
    },
    {
      id: 4,
      question: t('faq4Q'),
      answer: t('faq4A')
    },
    {
      id: 5,
      question: t('faq5Q' as any),
      answer: t('faq5A' as any)
    },
    {
      id: 6,
      question: t('faq6Q' as any),
      answer: t('faq6A' as any)
    },
    {
      id: 7,
      question: t('faq7Q' as any),
      answer: t('faq7A' as any)
    }
  ];

  return (
    <section id="faq-section" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <HelpCircle size={14} /> {language === 'ru' ? 'Ответы на вопросы' : 'Clear Answers'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('faqTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
            {language === 'ru'
              ? 'Ответы основателя на самые частые вопросы о переезде и путешествии во Вьетнам.'
              : 'Direct founder answers to the most common questions about traveling and moving to Vietnam.'}
          </p>
        </div>

        {/* Message Bubble FAQ */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <FaqAccordion
            data={faqData}
          />

          {/* General Disclaimer under FAQ */}
          <div style={{
            marginTop: '2.5rem',
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
