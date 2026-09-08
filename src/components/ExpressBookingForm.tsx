import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, Video, CheckCircle2, Lock, Ban, CalendarPlus } from 'lucide-react';
import type { ExpressConsultationBooking } from '../types';

export const ExpressBookingForm: React.FC = () => {
  const { language, submitExpressBooking, setViewMode, getDateSlotAvailability } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<ExpressConsultationBooking | null>(null);

  // Next 14 calendar days
  const getNextDays = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
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

  const nextDays = getNextDays();

  // Find first available day
  const findFirstAvailableDate = () => {
    for (const d of nextDays) {
      const avail = getDateSlotAvailability(d.iso);
      if (avail.isWorkingDay && !avail.isBlackout && avail.availableCount > 0) {
        return d.iso;
      }
    }
    return nextDays[0].iso;
  };

  const [formData, setFormData] = useState({
    name: '',
    messenger: '',
    email: '',
    topic: '',
    bookingDate: findFirstAvailableDate(),
    bookingTime: '',
    meetingPlatform: 'Google Meet' as 'Zoom' | 'Google Meet'
  });

  // Calculate availability for current date
  const currentAvailability = getDateSlotAvailability(formData.bookingDate);

  // Auto-select first available slot when date changes or on mount
  useEffect(() => {
    const avail = getDateSlotAvailability(formData.bookingDate);
    const firstFreeSlot = avail.slots.find((s) => s.status === 'available');
    if (firstFreeSlot) {
      // If current bookingTime is not valid on this date, update to first free
      const currentSlotStatus = avail.slots.find((s) => s.time === formData.bookingTime)?.status;
      if (currentSlotStatus !== 'available') {
        setFormData((prev) => ({ ...prev, bookingTime: firstFreeSlot.time }));
      }
    } else {
      setFormData((prev) => ({ ...prev, bookingTime: '' }));
    }
  }, [formData.bookingDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bookingTime) {
      alert(language === 'ru' ? 'Пожалуйста, выберите свободный временной слот.' : 'Please select an available time slot.');
      return;
    }

    const booking = await submitExpressBooking({
      name: formData.name,
      messenger: formData.messenger,
      email: formData.email,
      topic: formData.topic,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      meetingPlatform: formData.meetingPlatform,
      priceUSD: 50
    });

    setSubmittedBooking(booking);
    setIsSubmitted(true);
  };

  if (isSubmitted && submittedBooking) {
    // Google Calendar Event URL
    const dateClean = submittedBooking.bookingDate.replace(/-/g, '');
    const [startHourStr] = submittedBooking.bookingTime.split(':')[0].trim().split(' ');
    const startHourNum = parseInt(startHourStr, 10) || 14;
    const endHourNum = startHourNum + 1;
    const startIsoHour = startHourNum.toString().padStart(2, '0');
    const endIsoHour = endHourNum.toString().padStart(2, '0');
    const gCalDates = `${dateClean}T${startIsoHour}0000Z/${dateClean}T${endIsoHour}0000Z`;
    const gCalTitle = encodeURIComponent(`VietReloc: Экспресс-консультация (${submittedBooking.name})`);
    const gCalDetails = encodeURIComponent(
      `Экспресс-консультация по переезду во Вьетнам VietReloc.\nПлатформа: ${submittedBooking.meetingPlatform}\nТема: ${submittedBooking.topic}`
    );
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${gCalDates}&details=${gCalDetails}&location=${encodeURIComponent(submittedBooking.meetingPlatform)}`;

    return (
      <div style={{ padding: '4rem 0', maxWidth: '720px', margin: '0 auto' }}>
        <div className="container">
          <div className="glass-card glass-card-emerald" style={{ padding: '3.5rem 2.5rem', textAlign: 'center' }}>
            
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 8px 24px rgba(15, 118, 110, 0.25)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {language === 'ru' ? 'Консультация успешно забронирована!' : 'Consultation Successfully Booked!'}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 2rem auto' }}>
              {language === 'ru'
                ? 'Слот зафиксирован за вами в системе. Ссылка на видеосозвон (Google Meet / Zoom) поступит на ваш Email и в указанный мессенджер перед началом встречи.'
                : 'Your slot is secured. The video meeting link (Google Meet / Zoom) will be sent to your Email and messenger prior to the scheduled call.'}
            </p>

            {/* Booking Summary Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              textAlign: 'left',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              fontSize: '0.94rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Дата и время' : 'Date & Time'}:</span>
                <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.02rem' }}>
                  {submittedBooking.bookingDate} &bull; {submittedBooking.bookingTime}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Платформа' : 'Platform'}:</span>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Video size={16} color="var(--accent-emerald)" /> {submittedBooking.meetingPlatform}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Клиент' : 'Client'}:</span>
                <strong>{submittedBooking.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Контакты' : 'Contacts'}:</span>
                <span>{submittedBooking.messenger} ({submittedBooking.email})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Тема созвона' : 'Topic'}:</span>
                <span style={{ maxWidth: '350px', textAlign: 'right', fontWeight: 500 }}>{submittedBooking.topic || '—'}</span>
              </div>
            </div>

            {/* Actions: Google Calendar + Home */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href={gCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.95rem', padding: '0.85rem 1.6rem', boxShadow: '0 6px 16px rgba(15, 118, 110, 0.22)' }}
              >
                <CalendarPlus size={18} /> {language === 'ru' ? 'Добавить в Google Календарь' : 'Add to Google Calendar'}
              </a>

              <button
                onClick={() => setViewMode('marketing')}
                className="btn btn-secondary"
                style={{ fontSize: '0.95rem', padding: '0.85rem 1.45rem', background: '#FFFFFF' }}
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
    <div style={{ padding: '3.5rem 0', maxWidth: '820px', margin: '0 auto' }}>
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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                <Clock size={14} /> {language === 'ru' ? '60 минут • $50' : '60 Min • $50'}
              </div>
              <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                {language === 'ru' ? 'Запись на экспресс-консультацию' : 'Book Express Strategy Call'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.5 }}>
                {language === 'ru'
                  ? 'Выберите удобный свободный день и временной слот. Расписание обновляется в реальном времени.'
                  : 'Select your preferred available date and time slot. Schedule updates in real-time.'}
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '2px solid var(--accent-emerald)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1.25rem',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(15, 118, 110, 0.1)'
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
                  {language === 'ru' ? 'Ваше имя' : 'Your Name'} *
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
                  {language === 'ru' ? 'Telegram или WhatsApp' : 'Telegram or WhatsApp'} *
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
                Email *
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
                {language === 'ru' ? 'Тема консультации и главные вопросы' : 'Call Topic & Key Questions'} *
              </label>
              <textarea
                rows={3}
                required
                placeholder={language === 'ru' ? 'Например: Переезд с семьей в Дананг, выбор района, стоимость жизни, аренда жилья и открытие визы' : 'e.g. Moving with family to Da Nang, neighborhood choice, cost of living and visa'}
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

            {/* 3. Dynamic Date & Time Selection (Smart Slot Engine) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} style={{ color: 'var(--accent-emerald)' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    1. {language === 'ru' ? 'Выберите дату' : 'Select Date'}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {language === 'ru' ? 'Часовой пояс: Вьетнам / МСК' : 'Timezone: Vietnam (ICT) / MSK'}
                </div>
              </div>

              {/* Horizontal Days Scroll / Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
                gap: '0.6rem',
                marginBottom: '1.75rem',
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '4px'
              }}>
                {nextDays.map((item) => {
                  const isSelected = formData.bookingDate === item.iso;
                  const avail = getDateSlotAvailability(item.iso);
                  const isUnavailable = !avail.isWorkingDay || avail.isBlackout || avail.availableCount === 0;

                  return (
                    <button
                      type="button"
                      key={item.iso}
                      disabled={isUnavailable}
                      onClick={() => setFormData({ ...formData, bookingDate: item.iso })}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected
                          ? '2px solid var(--accent-emerald)'
                          : isUnavailable
                          ? '1px solid #E2E8F0'
                          : '1px solid var(--border-subtle)',
                        background: isSelected
                          ? 'var(--accent-emerald-light)'
                          : isUnavailable
                          ? '#F8FAFC'
                          : '#FFFFFF',
                        color: isSelected
                          ? 'var(--accent-emerald)'
                          : isUnavailable
                          ? '#94A3B8'
                          : 'var(--text-main)',
                        cursor: isUnavailable ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                        opacity: isUnavailable ? 0.6 : 1,
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 600 }}>
                        {item.weekday}
                      </div>
                      <div style={{ fontSize: '1.18rem', fontWeight: 700, margin: '2px 0' }}>
                        {item.dayNum}
                      </div>
                      <div style={{
                        fontSize: '0.68rem',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        background: isSelected
                          ? 'var(--accent-emerald)'
                          : isUnavailable
                          ? '#CBD5E1'
                          : 'rgba(15, 118, 110, 0.12)',
                        color: isSelected ? '#FFFFFF' : isUnavailable ? '#475569' : 'var(--accent-emerald)'
                      }}>
                        {isUnavailable
                          ? (language === 'ru' ? 'Выходной' : 'Closed')
                          : `${avail.availableCount} ${language === 'ru' ? 'своб.' : 'free'}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} style={{ color: 'var(--accent-terracotta)' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    2. {language === 'ru' ? 'Выберите свободное время' : 'Select Free Time Slot'}
                  </span>
                </div>
                {currentAvailability.availableCount > 0 && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {language === 'ru' ? `Доступно: ${currentAvailability.availableCount} слотов` : `${currentAvailability.availableCount} slots available`}
                  </span>
                )}
              </div>

              {currentAvailability.slots.length === 0 || !currentAvailability.isWorkingDay ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Ban size={24} style={{ margin: '0 auto 0.5rem auto', color: '#94A3B8' }} />
                  <div>{language === 'ru' ? 'На этот день основатель не принимает записи. Пожалуйста, выберите другой день в календаре.' : 'No slots available on this date. Please select another date above.'}</div>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '0.65rem',
                  marginBottom: '1.25rem'
                }}>
                  {currentAvailability.slots.map((slot) => {
                    const isAvailable = slot.status === 'available';
                    const isBooked = slot.status === 'booked';
                    const isBlocked = slot.status === 'blocked';
                    const isSelected = formData.bookingTime === slot.time && isAvailable;

                    return (
                      <button
                        type="button"
                        key={slot.time}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            setFormData({ ...formData, bookingTime: slot.time });
                          }
                        }}
                        style={{
                          padding: '0.75rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected
                            ? '2px solid var(--accent-emerald)'
                            : isBooked
                            ? '1px solid #E2E8F0'
                            : isBlocked
                            ? '1px solid #E2E8F0'
                            : '1px solid var(--border-subtle)',
                          background: isSelected
                            ? 'var(--accent-emerald)'
                            : isBooked
                            ? '#F1F5F9'
                            : isBlocked
                            ? '#F8FAFC'
                            : '#FFFFFF',
                          color: isSelected
                            ? '#FFFFFF'
                            : isBooked
                            ? '#94A3B8'
                            : isBlocked
                            ? '#CBD5E1'
                            : 'var(--text-main)',
                          fontWeight: 600,
                          fontSize: '0.86rem',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          textAlign: 'center',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <span>{slot.time}</span>
                        {isBooked && (
                          <span style={{ fontSize: '0.7rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                            <Lock size={11} /> {language === 'ru' ? 'Занято' : 'Booked'}
                          </span>
                        )}
                        {isBlocked && (
                          <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Ban size={11} /> {language === 'ru' ? 'Недоступно' : 'Unavailable'}
                          </span>
                        )}
                        {isAvailable && (
                          <span style={{ fontSize: '0.68rem', color: isSelected ? 'rgba(255,255,255,0.9)' : 'var(--accent-emerald)' }}>
                            {language === 'ru' ? 'Свободно' : 'Available'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Platform Choice */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  3. {language === 'ru' ? 'Где провести встречу' : 'Meeting Platform'}:
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="radio"
                    name="platform"
                    checked={formData.meetingPlatform === 'Google Meet'}
                    onChange={() => setFormData({ ...formData, meetingPlatform: 'Google Meet' })}
                  />
                  <span>Google Meet</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="radio"
                    name="platform"
                    checked={formData.meetingPlatform === 'Zoom'}
                    onChange={() => setFormData({ ...formData, meetingPlatform: 'Zoom' })}
                  />
                  <span>Zoom</span>
                </label>
              </div>

            </div>

            {/* Platform & Link Note */}
            <div style={{
              background: 'var(--accent-emerald-light)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.9rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <Video size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {language === 'ru'
                  ? 'Звонок проходит 1 на 1 лично с основателем. Ссылка на видеовстречу придет вам в Telegram и на Email сразу после бронирования.'
                  : 'The call is 1-on-1 with the founder. Meeting link is sent directly to your Telegram and Email upon booking.'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.15rem',
                fontSize: '1.08rem',
                fontWeight: 700,
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 20px rgba(15, 118, 110, 0.25)'
              }}
            >
              <CheckCircle2 size={20} /> {language === 'ru' ? 'Забронировать консультацию ($50)' : 'Book Strategy Call ($50)'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
