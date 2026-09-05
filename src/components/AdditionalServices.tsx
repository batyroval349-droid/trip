import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, GraduationCap, Laptop, CreditCard, BookOpen, Send, Sparkles } from 'lucide-react';

export const AdditionalServices: React.FC = () => {
  const { t, language } = useApp();

  const services = [
    {
      id: 'review-housing',
      title: t('service1Title' as any),
      price: t('service1Price' as any),
      desc: t('service1Desc' as any),
      icon: FileText,
      badge: language === 'ru' ? 'Экспресс-проверка' : 'Express Review',
      badgeColor: 'badge-emerald'
    },
    {
      id: 'schools',
      title: t('service2Title' as any),
      price: t('service2Price' as any),
      desc: t('service2Desc' as any),
      icon: GraduationCap,
      badge: language === 'ru' ? 'Для семей' : 'For Families',
      badgeColor: 'badge-sand'
    },
    {
      id: 'coworking',
      title: t('service3Title' as any),
      price: t('service3Price' as any),
      desc: t('service3Desc' as any),
      icon: Laptop,
      badge: language === 'ru' ? 'Удаленная работа' : 'Remote Work',
      badgeColor: 'badge-emerald'
    },
    {
      id: 'banking',
      title: t('service4Title' as any),
      price: t('service4Price' as any),
      desc: t('service4Desc' as any),
      icon: CreditCard,
      badge: language === 'ru' ? 'Личный опыт' : 'Personal Guide',
      badgeColor: 'badge-terracotta'
    },
    {
      id: 'vietnamese',
      title: t('service5Title' as any),
      price: t('service5Price' as any),
      desc: t('service5Desc' as any),
      icon: BookOpen,
      badge: language === 'ru' ? 'PDF-гайд' : 'PDF Guide',
      badgeColor: 'badge-sand'
    }
  ];

  const handleOrder = (serviceTitle: string, price: string) => {
    const text = encodeURIComponent(
      language === 'ru'
        ? `Здравствуйте! Хочу заказать услугу: "${serviceTitle}" (${price}). Подскажите, как оплатить и получить консультацию?`
        : `Hello! I would like to order the service: "${serviceTitle}" (${price}). How can I proceed?`
    );
    window.open(`https://wa.me/84900000000?text=${text}`, '_blank');
  };

  return (
    <section id="additional-services-section" style={{ padding: '4.5rem 0', background: 'var(--bg-panel)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} /> {language === 'ru' ? 'Отдельные модули' : 'Standalone Add-ons'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.85rem' }}>
            {t('servicesTitle' as any)}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.55 }}>
            {t('servicesSubhead' as any)}
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}>
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(15, 118, 110, 0.1)',
                      color: 'var(--accent-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span className={`badge ${svc.badgeColor}`} style={{ fontSize: '0.76rem' }}>
                      {svc.badge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35 }}>
                      {svc.title}
                    </h3>
                    <span style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--accent-emerald)',
                      fontFamily: 'var(--font-serif)',
                      whiteSpace: 'nowrap'
                    }}>
                      {svc.price}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleOrder(svc.title, svc.price)}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    padding: '0.75rem 1rem'
                  }}
                >
                  <Send size={15} />
                  <span>{t('serviceOrderBtn' as any)}</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
