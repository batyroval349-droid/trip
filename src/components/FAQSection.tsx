import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t, language } = useApp();
  
  // Desktop state
  const [openIndexLeft, setOpenIndexLeft] = useState<number | null>(0);
  const [openIndexRight, setOpenIndexRight] = useState<number | null>(null);
  
  // Mobile state
  const [openIndexMobile, setOpenIndexMobile] = useState<number | null>(0);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q' as any), a: t('faq5A' as any) },
    { q: t('faq6Q' as any), a: t('faq6A' as any) },
    { q: t('faq7Q' as any), a: t('faq7A' as any) }
  ];

  const midPoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  const visibleMobileFaqs = showAllMobile ? faqs : faqs.slice(0, 3);

  const renderFaqItem = (
    faq: { q: string, a: string }, 
    isOpen: boolean, 
    onClick: () => void, 
    isLast: boolean
  ) => (
    <div
      style={{
        padding: '1.25rem 1.5rem',
        cursor: 'pointer',
        borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)',
        background: isOpen ? 'rgba(15, 118, 110, 0.02)' : 'transparent',
        transition: 'background 0.2s ease',
      }}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <h3 style={{ 
          fontSize: '1.05rem', 
          fontFamily: 'var(--font-sans)', 
          fontWeight: 600, 
          color: isOpen ? 'var(--accent-emerald)' : 'var(--text-main)',
          transition: 'color 0.2s ease',
          margin: 0,
          lineHeight: 1.4
        }}>
          {faq.q}
        </h3>
        <div style={{
          color: isOpen ? 'var(--accent-emerald)' : 'var(--text-muted)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isOpen ? 'rgba(15, 118, 110, 0.1)' : 'transparent',
        }}>
          <ChevronDown size={20} />
        </div>
      </div>

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s ease-out, opacity 0.3s ease-out',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ 
            paddingTop: '1rem', 
            color: 'var(--text-muted)', 
            fontSize: '0.95rem', 
            lineHeight: 1.6 
          }}>
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="faq-section" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <HelpCircle size={14} /> {language === 'ru' ? 'Ответы на вопросы' : 'Clear Answers'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('faqTitle')}
          </h2>
        </div>

        {/* 1. DESKTOP VIEW (2 Columns) */}
        <div className="desktop-faq-view" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Left Column */}
            <div style={{ 
              background: 'var(--surface-color, #fff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              overflow: 'hidden',
              alignSelf: 'start'
            }}>
              {leftFaqs.map((faq, index) => 
                <React.Fragment key={index}>
                  {renderFaqItem(
                    faq, 
                    openIndexLeft === index, 
                    () => setOpenIndexLeft(openIndexLeft === index ? null : index),
                    index === leftFaqs.length - 1
                  )}
                </React.Fragment>
              )}
            </div>

            {/* Right Column */}
            <div style={{ 
              background: 'var(--surface-color, #fff)',
              borderRadius: 'var(--radius-lg, 16px)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              overflow: 'hidden',
              alignSelf: 'start'
            }}>
              {rightFaqs.map((faq, index) => 
                <React.Fragment key={index}>
                  {renderFaqItem(
                    faq, 
                    openIndexRight === index, 
                    () => setOpenIndexRight(openIndexRight === index ? null : index),
                    index === rightFaqs.length - 1
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>

        {/* 2. MOBILE VIEW (1 Column with "Show More") */}
        <div className="mobile-faq-view" style={{ maxWidth: '100%', margin: '0 auto' }}>
          <div style={{ 
            background: 'var(--surface-color, #fff)',
            borderRadius: 'var(--radius-lg, 16px)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            overflow: 'hidden'
          }}>
            {visibleMobileFaqs.map((faq, index) => 
              <React.Fragment key={index}>
                {renderFaqItem(
                  faq, 
                  openIndexMobile === index, 
                  () => setOpenIndexMobile(openIndexMobile === index ? null : index),
                  index === visibleMobileFaqs.length - 1
                )}
              </React.Fragment>
            )}
          </div>
          
          {!showAllMobile && faqs.length > 3 && (
            <button 
              onClick={() => setShowAllMobile(true)}
              style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(15, 118, 110, 0.05)',
                color: 'var(--accent-emerald)',
                border: '1px solid rgba(15, 118, 110, 0.1)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <ChevronDown size={18} />
              {language === 'ru' ? `Показать еще ${faqs.length - 3} вопроса` : `Show ${faqs.length - 3} more questions`}
            </button>
          )}
        </div>

        {/* General Disclaimer under FAQ */}
        <div style={{
          maxWidth: '1000px',
          margin: '2.5rem auto 0 auto',
          padding: '1rem 1.4rem',
          background: 'rgba(15, 118, 110, 0.05)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          lineHeight: 1.55
        }}>
          <ShieldAlert size={18} style={{ color: 'var(--accent-terracotta)', flexShrink: 0 }} />
          <span>{t('faqDisclaimer' as any)}</span>
        </div>

      </div>
    </section>
  );
};
