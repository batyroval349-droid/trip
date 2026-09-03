import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t, language } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') }
  ];

  return (
    <section id="faq-section" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <HelpCircle size={14} /> {language === 'ru' ? 'Ответы на вопросы' : 'Clear Answers'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('faqTitle')}
          </h2>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card"
                style={{ padding: '1.25rem 1.75rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-main)' }}>
                    {faq.q}
                  </h3>
                  <div style={{
                    color: isOpen ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
