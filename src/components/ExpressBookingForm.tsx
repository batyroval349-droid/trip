import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, Video, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import type { ExpressConsultationBooking } from '../types';

export const ExpressBookingForm: React.FC = () => {
  const { t, language, submitExpressBooking, setViewMode } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Next 10 available days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekdayRu = d.toLocaleDateString('ru-RU', { weekday: 'short' });
      const weekdayEn = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthRu = d.toLocaleDateString('ru-RU', { month: 'short' });
      const monthEn = d.toLocaleDateString('en-US', { month: 'short' });
      dates.push({
        iso,
        label: language === 'ru' ? `${weekdayRu}, ${dayNum} ${monthRu}` : `${weekdayEn}, ${monthEn} ${dayNum}`,
        dayNum,
        weekday: language === 'ru' ? weekdayRu : weekdayEn
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const timeSlots = [
    '10:00 - 10:40',
    '12:00 - 12:40',
    '14:00 - 14:40',
    '16:00 - 16:40',
    '18:00 - 18:40',
    '20:00 - 20:40'
  ];

  const [formData, setFormData] = useState({
    name: '',
    messenger: '',
    email: '',
    topic: '',
    bookingDate: availableDates[0].iso,
    bookingTime: timeSlots[1],
    meetingPlatform: 'Zoom' as 'Zoom' | 'Google Meet'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: ExpressConsultationBooking = {
      name: formData.name,
      messenger: formData.messenger,
      email: formData.email,
      topic: formData.topic,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      meetingPlatform: formData.meetingPlatform,
      bookedAt: new Date().toISOString(),
      priceUSD: 50
    };
    submitExpressBooking(booking);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '4rem 0', maxWidth: '680px', margin: '0 auto' }}>
        <div className="container">
          <div className="glass-card glass-card-emerald" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {language === 'ru' ? 'Консультация успешно забронирована!' : 'Consultation Successfully Booked!'}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem auto' }}>
              {language === 'ru'
                ? 'Ссылка на видеовстречу (Zoom / Google Meet) и подтверждение отправлены на ваш Email и в мессенджер. Основатель свяжется с вами в назначенное время.'
                : 'Your video call link and details have been sent to your email and messenger. The founder will connect with you at the scheduled time.'}
            </p>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'left',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.92rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Дата и время' : 'Date & Time'}:</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{formData.bookingDate} &bull; {formData.bookingTime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Платформа' : 'Platform'}:</span>
                <strong>{formData.meetingPlatform}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Клиент' : 'Client'}:</span>
                <strong>{formData.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Контакты' : 'Contacts'}:</span>
                <span>{formData.messenger} ({formData.email})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Тариф' : 'Tier'}:</span>
                <strong>{language === 'ru' ? 'Экспресс-консультация (60 мин • $50)' : 'Express Consultation (60 min • $50)'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/84900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
              >
                <MessageCircle size={16} /> {t('navWhatsApp')}
              </a>
              <a
                href="https://t.me/indochine_concierge"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
              >
                <Send size={16} /> {t('navTelegram')}
              </a>
              <button
                onClick={() => setViewMode('marketing')}
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
              >
                {language === 'ru' ? 'На главную' : 'Back to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 0', maxWidth: '780px', margin: '0 auto' }}>
      <div className="container">
        
        {/* Back Link */}
        <button
          onClick={() => setViewMode('marketing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            fontSize: '0.88rem',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} /> {language === 'ru' ? 'Назад на главную' : 'Back to Home'}
        </button>

        {/* Card */}
        <div className="glass-card glass-card-emerald" style={{ padding: '2.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                <Clock size={14} /> {language === 'ru' ? '60 минут • $50' : '60 Min • $50'}
              </div>
              <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                {t('expressFormTitle')}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.5 }}>
                {t('expressFormSubhead')}
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '2px solid var(--accent-emerald)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1.25rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {language === 'ru' ? 'Стоимость' : 'Price'}
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                $50
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* 1. Contact Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  {t('expressNameLabel')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ru' ? 'Алексей Иванов' : 'Alex Ivanov'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: '#FFFFFF',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  {t('expressMessengerLabel')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ru' ? '@username или +7 999 123-45-67' : '@telegram_user or WhatsApp'}
                  value={formData.messenger}
                  onChange={(e) => setFormData({ ...formData, messenger: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: '#FFFFFF',
                    fontSize: '0.92rem'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                {t('expressEmailLabel')} *
              </label>
              <input
                type="email"
                required
                placeholder="alex@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: '#FFFFFF',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            {/* 2. Topic & Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                {t('expressTopicLabel')} *
              </label>
              <textarea
                rows={3}
                required
                placeholder={t('expressTopicPlaceholder')}
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: '#FFFFFF',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* 3. Date & Time Selection (Mini Calendar) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Calendar size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {t('expressDateLabel')}
                </span>
              </div>

              {/* Horizontal Days Scroll / Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '0.6rem',
                marginBottom: '1.5rem'
              }}>
                {availableDates.map((item) => {
                  const isSelected = formData.bookingDate === item.iso;
                  return (
                    <button
                      type="button"
                      key={item.iso}
                      onClick={() => setFormData({ ...formData, bookingDate: item.iso })}
                      style={{
                        padding: '0.6rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--accent-emerald-light)' : '#FFFFFF',
                        color: isSelected ? 'var(--accent-emerald)' : 'var(--text-main)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.75 }}>
                        {item.weekday}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                        {item.dayNum}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Clock size={18} style={{ color: 'var(--accent-terracotta)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {t('expressTimeLabel')}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.6rem',
                marginBottom: '1.25rem'
              }}>
                {timeSlots.map((slot) => {
                  const isSelected = formData.bookingTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, bookingTime: slot })}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--accent-emerald)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {/* Platform Choice */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {t('expressMeetingPlatformLabel')}:
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="radio"
                    name="platform"
                    checked={formData.meetingPlatform === 'Zoom'}
                    onChange={() => setFormData({ ...formData, meetingPlatform: 'Zoom' })}
                  />
                  <span>Zoom</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="radio"
                    name="platform"
                    checked={formData.meetingPlatform === 'Google Meet'}
                    onChange={() => setFormData({ ...formData, meetingPlatform: 'Google Meet' })}
                  />
                  <span>Google Meet</span>
                </label>
              </div>

            </div>

            {/* Platform & Link Note */}
            <div style={{
              background: 'var(--accent-emerald-light)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1.1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <Video size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {t('expressPlatformNote')}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '1.05rem',
                justifyContent: 'center',
                gap: '0.6rem'
              }}
            >
              <CheckCircle2 size={20} /> {language === 'ru' ? 'Записаться на консультацию ($50)' : 'Book Consultation ($50)'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
