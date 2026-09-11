import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquareQuote, CheckCircle2, Crown, Compass } from 'lucide-react';

export const ClientReviewsSection: React.FC = () => {
  const { language } = useApp();

  const reviews = [
    {
      id: 'review-1',
      name: language === 'ru' ? 'Артём' : 'Artem',
      role: language === 'ru' ? 'Разработчик на удаленке' : 'Remote Software Engineer',
      city: language === 'ru' ? 'Дананг' : 'Da Nang',
      tier: language === 'ru' ? 'Планирование релокации ($490)' : 'Relocation Planning ($490)',
      tierIcon: Compass,
      tierColor: 'var(--accent-emerald)',
      tierBg: '#E6F4F1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      text: language === 'ru'
        ? '«Главный страх был — шум строек под окнами и запутаться в первых шагах в незнакомой стране. Пошаговый авторский маршрут сэкономил кучу времени: симка Viettel, обмен, проверенный кондоминиум через риелтора. Договор проверили за пару часов, зафиксировали нормальный тариф на свет. Плюс личная поддержка в течение первых 14 дней помогла быстро решить любые бытовые вопросы без стресса».'
        : '"My main concern was continuous construction noise and getting lost in local bureaucracy. The step-by-step roadmap saved huge time: Viettel SIM, currency exchange, vetted condo via realtor. Lease was audited in 2 hours with fixed electricity rate. Plus 14-day personal chat support resolved all initial questions effortlessly."',
      highlight: language === 'ru' ? 'Заехал и начал работать без простоя' : 'Moved in and resumed remote work smoothly'
    },
    {
      id: 'review-2',
      name: language === 'ru' ? 'Михаил и Елена' : 'Mikhail & Elena',
      role: language === 'ru' ? 'Семья с дочерью (4 года)' : 'Family with 4yo daughter',
      city: language === 'ru' ? 'Нячанг' : 'Nha Trang',
      tier: language === 'ru' ? 'VIP Консьерж ($890)' : 'VIP Concierge ($890)',
      tierIcon: Crown,
      tierColor: '#B45309',
      tierBg: '#FEF3C7',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      text: language === 'ru'
        ? '«Очень переживали за быт и адаптацию ребёнка. Нам подобрали тихий кондоминиум рядом с парком, помогли с контактами англоязычного детского сада. Отдельное спасибо за сессию с Марией Егоровой — помогла снять тревогу перед переездом и сохранить спокойствие в семье. 30 дней в Telegram с основателем дали полную уверенность».'
        : '"We were anxious about family relocation and our daughter adapting. We were matched with a peaceful condo near a green park and got vetted international kindergarten contacts. A special thanks for the psychological session with Maria Egorova — relieved relocation anxiety and preserved family peace. 30-day founder Telegram support gave complete peace of mind."',
      highlight: language === 'ru' ? 'Бережная адаптация семьи и сессия с психологом' : 'Gentle family adaptation & psychologist session'
    },
    {
      id: 'review-3',
      name: language === 'ru' ? 'Дмитрий и Ольга' : 'Dmitry & Olga',
      role: language === 'ru' ? 'Путешественники / Зимовщики' : 'Travelers / Winter Vacationers',
      city: language === 'ru' ? 'Дананг · Хойан · Ниньбинь' : 'Da Nang · Hoi An · Ninh Binh',
      tier: language === 'ru' ? 'Планирование поездки ($290)' : 'Trip Planning ($290)',
      tierIcon: Compass,
      tierColor: 'var(--accent-terracotta)',
      tierBg: 'var(--accent-terracotta-light)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: language === 'ru'
        ? '«Маршрут на 21 день был расписан до мелочей: проверенные кофейни, адреса официальных салонов для eSIM, подсказки по вызову GrabCar и рестораны морепродуктов без туристической наценки. Никакой спешки и суеты: поддержка в WhatsApp отвечала быстро, когда нужно было сдвинуть время экскурсии».'
        : '"Our 21-day itinerary was thought through to the smallest details: vetted specialty roasteries, official eSIM store addresses, GrabCar tips, and authentic seafood spots without tourist traps. WhatsApp support was always prompt whenever we needed a minor adjustment."',
      highlight: language === 'ru' ? '21 день идеального маршрута без шаблонных туров' : '21 days of tailored journey without cookie-cutter tours'
    }
  ];

  return (
    <section id="reviews" style={{ padding: '5rem 0', background: '#F8F6F0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <MessageSquareQuote size={14} /> {language === 'ru' ? 'Опыт наших клиентов' : 'Client Stories & Feedback'}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            {language === 'ru'
              ? 'Честные истории переезда и путешествий'
              : 'Real Relocation & Travel Experiences'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            {language === 'ru'
              ? 'Реальные задачи, с которыми к нам приходят, и то, как мы помогаем их решить — без прикрас и нереалистичных обещаний.'
              : 'Real situations our clients come to us with, and exactly how we solve them — honestly and without exaggerated claims.'}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}>
          {reviews.map((rev) => {
            const TierIcon = rev.tierIcon;
            return (
              <div
                key={rev.id}
                className="glass-card"
                style={{
                  padding: '2rem',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div>
                  
                  {/* Top Bar: Tier Badge & 5 Stars */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: rev.tierBg,
                      color: rev.tierColor,
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.76rem',
                      fontWeight: 700
                    }}>
                      <TierIcon size={13} />
                      <span>{rev.tier}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.65,
                    margin: '0 0 1.25rem 0',
                    fontStyle: 'italic'
                  }}>
                    {rev.text}
                  </p>

                  {/* Highlight pill */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: '#15803D',
                    fontWeight: 600,
                    marginBottom: '1.5rem'
                  }}>
                    <CheckCircle2 size={13} />
                    <span>{rev.highlight}</span>
                  </div>

                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-emerald)'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {rev.role} &bull; <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{rev.city}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
