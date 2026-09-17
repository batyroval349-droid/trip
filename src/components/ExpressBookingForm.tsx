import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Lock,
  Ban,
  CalendarPlus,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
  Timer,
  AlertCircle,
  Globe
} from 'lucide-react';
import type { ExpressConsultationBooking } from '../types';

export interface TimezoneOption {
  value: string;
  labelRu: string;
  labelEn: string;
  cityRu: string;
  cityEn: string;
}

export const POPULAR_TIMEZONES: TimezoneOption[] = [
  { value: 'Europe/Moscow', labelRu: 'Москва, Санкт-Петербург (МСК, UTC+3)', labelEn: 'Moscow, St. Petersburg (MSK, UTC+3)', cityRu: 'Москва', cityEn: 'Moscow' },
  { value: 'Asia/Tbilisi', labelRu: 'Тбилиси, Грузия (GET, UTC+4)', labelEn: 'Tbilisi, Georgia (UTC+4)', cityRu: 'Тбилиси', cityEn: 'Tbilisi' },
  { value: 'Asia/Yerevan', labelRu: 'Ереван, Армения (AMT, UTC+4)', labelEn: 'Yerevan, Armenia (UTC+4)', cityRu: 'Ереван', cityEn: 'Yerevan' },
  { value: 'Asia/Dubai', labelRu: 'Дубай, ОАЭ (GST, UTC+4)', labelEn: 'Dubai, UAE (GST, UTC+4)', cityRu: 'Дубай', cityEn: 'Dubai' },
  { value: 'Asia/Almaty', labelRu: 'Алматы, Астана (KZT, UTC+5)', labelEn: 'Almaty, Astana (UTC+5)', cityRu: 'Алматы', cityEn: 'Almaty' },
  { value: 'Asia/Tashkent', labelRu: 'Ташкент, Узбекистан (UZT, UTC+5)', labelEn: 'Tashkent, Uzbekistan (UTC+5)', cityRu: 'Ташкент', cityEn: 'Tashkent' },
  { value: 'Asia/Yekaterinburg', labelRu: 'Екатеринбург (YEKT, UTC+5)', labelEn: 'Yekaterinburg (UTC+5)', cityRu: 'Екатеринбург', cityEn: 'Yekaterinburg' },
  { value: 'Asia/Novosibirsk', labelRu: 'Новосибирск (NOVT, UTC+7)', labelEn: 'Novosibirsk (UTC+7)', cityRu: 'Новосибирск', cityEn: 'Novosibirsk' },
  { value: 'Asia/Ho_Chi_Minh', labelRu: 'Вьетнам: Дананг, Нячанг (ICT, UTC+7)', labelEn: 'Vietnam: Da Nang, Nha Trang (ICT, UTC+7)', cityRu: 'Вьетнам', cityEn: 'Vietnam' },
  { value: 'Asia/Bangkok', labelRu: 'Таиланд: Бангкок, Пхукет (ICT, UTC+7)', labelEn: 'Thailand: Bangkok, Phuket (ICT, UTC+7)', cityRu: 'Таиланд', cityEn: 'Thailand' },
  { value: 'Asia/Makassar', labelRu: 'Бали, Индонезия (WITA, UTC+8)', labelEn: 'Bali, Indonesia (UTC+8)', cityRu: 'Бали', cityEn: 'Bali' },
  { value: 'Europe/Belgrade', labelRu: 'Белград, Сербия (CET, UTC+1)', labelEn: 'Belgrade, Serbia (CET, UTC+1)', cityRu: 'Белград', cityEn: 'Belgrade' },
  { value: 'Europe/Berlin', labelRu: 'Берлин, Париж (CET, UTC+1)', labelEn: 'Berlin, Paris (CET, UTC+1)', cityRu: 'Берлин', cityEn: 'Berlin' },
  { value: 'Europe/London', labelRu: 'Лондон (GMT/BST, UTC+0)', labelEn: 'London (GMT/BST, UTC+0)', cityRu: 'Лондон', cityEn: 'London' },
  { value: 'Europe/Kaliningrad', labelRu: 'Калининград (EET, UTC+2)', labelEn: 'Kaliningrad (UTC+2)', cityRu: 'Калининград', cityEn: 'Kaliningrad' },
  { value: 'Asia/Baku', labelRu: 'Баку, Азербайджан (AZT, UTC+4)', labelEn: 'Baku, Azerbaijan (UTC+4)', cityRu: 'Баку', cityEn: 'Baku' },
  { value: 'Asia/Bishkek', labelRu: 'Бишкек, Кыргызстан (KGT, UTC+6)', labelEn: 'Bishkek, Kyrgyzstan (UTC+6)', cityRu: 'Бишкек', cityEn: 'Bishkek' },
  { value: 'Asia/Vladivostok', labelRu: 'Владивосток (VLAT, UTC+10)', labelEn: 'Vladivostok (UTC+10)', cityRu: 'Владивосток', cityEn: 'Vladivostok' }
];

export const getDetectedTimezone = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch (e) {}
  return 'Europe/Moscow';
};

export const convertSlotTime = (dateStr: string, slotTime: string, clientTz: string): {
  clientTime: string;
  vietnamTime: string;
  isSameTime: boolean;
} => {
  try {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const [startPart, endPart] = slotTime.split('-');
    const [startH, startM] = (startPart || '14:00').trim().split(':').map(Number);
    const [endH, endM] = (endPart || '15:00').trim().split(':').map(Number);

    // Vietnam is fixed UTC+7
    const startDateUtc = new Date(Date.UTC(year, month, day, startH - 7, startM || 0, 0));
    const endDateUtc = new Date(Date.UTC(year, month, day, endH - 7, endM || 0, 0));

    const timeFmt = new Intl.DateTimeFormat('ru-RU', {
      timeZone: clientTz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const clientStart = timeFmt.format(startDateUtc);
    const clientEnd = timeFmt.format(endDateUtc);
    const clientTime = `${clientStart} - ${clientEnd}`;

    return {
      clientTime,
      vietnamTime: slotTime,
      isSameTime: clientTime === slotTime
    };
  } catch (e) {
    return {
      clientTime: slotTime,
      vietnamTime: slotTime,
      isSameTime: true
    };
  }
};

export const getTzDifferenceText = (clientTz: string, dateStr: string, language: 'ru' | 'en'): string => {
  try {
    const parts = dateStr.split('-');
    const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0);

    const getOffset = (tz: string) => {
      const str = date.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'longOffset' });
      const m = str.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
      if (!m) return 420;
      const sign = m[1] === '-' ? -1 : 1;
      return sign * ((parseInt(m[2], 10) || 0) * 60 + (parseInt(m[3], 10) || 0));
    };

    const vnOffset = 420; // UTC+7
    const clientOffset = getOffset(clientTz);
    const diffHours = Math.round((vnOffset - clientOffset) / 60);

    if (diffHours === 0) {
      return language === 'ru' ? ' (совпадает с вами)' : ' (same as your time)';
    }
    const signStr = diffHours > 0 ? `+${diffHours}` : `${diffHours}`;
    return language === 'ru' ? ` (${signStr} ч к вашему времени)` : ` (${signStr}h from your time)`;
  } catch (e) {
    return '';
  }
};

export const ExpressBookingForm: React.FC = () => {
  const {
    language,
    setViewMode,
    getDateSlotAvailability,
    reserveExpressBookingSlot,
    confirmExpressBookingPayment,
    setIsOfferModalOpen
  } = useApp();

  // Wizard steps: 'details' -> 'payment' -> 'success'
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [activeBooking, setActiveBooking] = useState<ExpressConsultationBooking | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr'>('card_ru');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(15 * 60);
  const [clientTimezone, setClientTimezone] = useState<string>(getDetectedTimezone());

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
    if (step !== 'details') return;
    const avail = getDateSlotAvailability(formData.bookingDate);
    const firstFreeSlot = avail.slots.find((s) => s.status === 'available');
    if (firstFreeSlot) {
      const currentSlotStatus = avail.slots.find((s) => s.time === formData.bookingTime)?.status;
      if (currentSlotStatus !== 'available') {
        setFormData((prev) => ({ ...prev, bookingTime: firstFreeSlot.time }));
      }
    } else {
      setFormData((prev) => ({ ...prev, bookingTime: '' }));
    }
  }, [formData.bookingDate, step]);

  // 15-Minute Countdown Timer for Smart Hold reservation
  useEffect(() => {
    if (step !== 'payment' || !activeBooking || !activeBooking.expiresAt) return;

    const calculateRemaining = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((activeBooking.expiresAt! - now) / 1000));
      setTimeRemainingSeconds(diff);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [step, activeBooking]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1 -> Step 2: Reserve slot with 15-min hold
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bookingTime) {
      alert(language === 'ru' ? 'Пожалуйста, выберите свободный временной слот.' : 'Please select an available time slot.');
      return;
    }

    const converted = convertSlotTime(formData.bookingDate, formData.bookingTime, clientTimezone);

    const reserved = reserveExpressBookingSlot({
      name: formData.name.trim(),
      messenger: formData.messenger.trim(),
      email: formData.email.trim(),
      topic: formData.topic.trim(),
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime, // Canonical Vietnam time
      meetingPlatform: formData.meetingPlatform,
      priceUSD: 50,
      clientTimezone,
      clientBookingTime: converted.clientTime,
      vietnamBookingTime: formData.bookingTime
    });

    setActiveBooking(reserved);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Step 3: Confirm payment
  const handleConfirmPayment = async () => {
    if (!activeBooking) return;
    if (!agreeToTerms) {
      alert(language === 'ru' ? 'Пожалуйста, подтвердите согласие с Публичной офертой.' : 'Please accept the Public Offer terms.');
      return;
    }

    setIsProcessingPayment(true);
    // Simulate payment gateway settlement
    setTimeout(async () => {
      const confirmed = await confirmExpressBookingPayment(activeBooking.id, selectedPaymentMethod);
      setIsProcessingPayment(false);
      if (confirmed) {
        setActiveBooking(confirmed);
      }
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // STEP 3: SUCCESS CONFIRMATION SCREEN
  if (step === 'success' && activeBooking) {
    const parts = activeBooking.bookingDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const [startPart, endPart] = (activeBooking.vietnamBookingTime || activeBooking.bookingTime).split('-');
    const [startH, startM] = (startPart || '14:00').trim().split(':').map(Number);
    const [endH, endM] = (endPart || '15:00').trim().split(':').map(Number);

    // Vietnam is fixed UTC+7
    const startDateUtc = new Date(Date.UTC(year, month, day, startH - 7, startM || 0, 0));
    const endDateUtc = new Date(Date.UTC(year, month, day, endH - 7, endM || 0, 0));

    const gCalDates = `${startDateUtc.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateUtc.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    const gCalTitle = encodeURIComponent(`VietReloc: Экспресс-консультация (${activeBooking.name})`);
    const gCalDetails = encodeURIComponent(
      `Экспресс-консультация по переезду во Вьетнам VietReloc.\nПлатформа: ${activeBooking.meetingPlatform}\nТема: ${activeBooking.topic}\nВремя (клиент): ${activeBooking.clientBookingTime || activeBooking.bookingTime} (${activeBooking.clientTimezone || 'местное'})\nВремя (Вьетнам): ${activeBooking.vietnamBookingTime || activeBooking.bookingTime} ICT\nОплачено: $50`
    );
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${gCalDates}&details=${gCalDetails}&location=${encodeURIComponent(activeBooking.meetingPlatform)}`;

    const paymentLabels = {
      card_ru: language === 'ru' ? 'Карта РФ / СБП' : 'Russian Card / SBP',
      card_intl: language === 'ru' ? 'Зарубежная карта (Visa/MC)' : 'International Card',
      crypto_usdt: 'USDT TRC-20',
      viet_qr: 'VietQR (VND)'
    };

    return (
      <div style={{ padding: '4rem 0', maxWidth: '720px', margin: '0 auto' }}>
        <div className="container">
          <div className="glass-card glass-card-emerald" style={{ padding: '3.5rem 2.5rem', textAlign: 'center' }}>
            
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 8px 24px rgba(15, 118, 110, 0.25)'
            }}>
              <CheckCircle2 size={42} />
            </div>

            <div className="badge badge-emerald" style={{ display: 'inline-flex', marginBottom: '0.75rem', gap: '0.4rem', padding: '0.4rem 0.9rem' }}>
              <ShieldCheck size={14} />
              {language === 'ru' ? 'Оплата $50 успешно подтверждена' : '$50 Payment Confirmed'}
            </div>

            <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {language === 'ru' ? 'Консультация успешно забронирована!' : 'Consultation Successfully Booked!'}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 1.75rem auto' }}>
              {language === 'ru'
                ? 'Слот зафиксирован. Уведомление о бронировании мгновенно отправлено основательнице, а вам на почту направлены детали созвона и персональная ссылка на встречу.'
                : 'Your slot is officially secured. Instant booking alerts have been dispatched to the founder, and meeting details were sent to your inbox.'}
            </p>

            {/* 100% Credit Guarantee Callout */}
            <div style={{
              background: 'rgba(15, 118, 110, 0.08)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.9rem 1.2rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.75rem',
              fontSize: '0.88rem'
            }}>
              <Sparkles size={20} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
              <div style={{ color: 'var(--text-main)' }}>
                <strong>{language === 'ru' ? 'Депозит зафиксирован:' : 'Deposit Credited:'}</strong>{' '}
                {language === 'ru'
                  ? 'Оплаченные $50 будут на 100% вычтены из стоимости любого пакета релокации (Light, Comfort, VIP), если вы решите продолжить работу с нами.'
                  : 'Your $50 payment will be 100% credited towards any relocation package should you choose to work with us.'}
              </div>
            </div>

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
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Дата и время встречи:' : 'Date & Time:'}</span>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.02rem' }}>
                    {activeBooking.bookingDate} &bull; {activeBooking.clientBookingTime || activeBooking.bookingTime}
                  </strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {language === 'ru'
                      ? `(${activeBooking.clientTimezone || 'По вашему времени'} · ${activeBooking.vietnamBookingTime || activeBooking.bookingTime} по Вьетнаму)`
                      : `(${activeBooking.clientTimezone || 'Your local time'} · ${activeBooking.vietnamBookingTime || activeBooking.bookingTime} Vietnam ICT)`}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Платформа' : 'Platform'}:</span>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Video size={16} color="var(--accent-emerald)" /> {activeBooking.meetingPlatform}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Способ оплаты' : 'Payment Method'}:</span>
                <span style={{ fontWeight: 600 }}>{paymentLabels[activeBooking.paymentMethod || selectedPaymentMethod]}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Клиент' : 'Client'}:</span>
                <strong>{activeBooking.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Контакты' : 'Contacts'}:</span>
                <span>{activeBooking.messenger} ({activeBooking.email})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Тема созвона' : 'Topic'}:</span>
                <span style={{ maxWidth: '350px', textAlign: 'right', fontWeight: 500 }}>{activeBooking.topic || '—'}</span>
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

  // STEP 2: SMART HOLD PAYMENT & CONFIRMATION
  if (step === 'payment' && activeBooking) {
    const isExpired = timeRemainingSeconds <= 0;

    return (
      <div style={{ padding: '3.5rem 0', maxWidth: '780px', margin: '0 auto' }}>
        <div className="container">
          
          {/* Back button */}
          <button
            onClick={() => setStep('details')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontSize: '0.88rem',
              marginBottom: '1.25rem'
            }}
          >
            <ArrowLeft size={16} /> {language === 'ru' ? 'Назад к выбору даты и времени' : 'Back to date & time selection'}
          </button>

          <div className="glass-card glass-card-emerald" style={{ padding: '2.5rem' }}>
            
            {/* Countdown Hold Timer Banner */}
            <div style={{
              background: isExpired ? '#FEF2F2' : '#FFFBEB',
              border: isExpired ? '1px solid #FECACA' : '1px solid #FDE68A',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Timer size={20} color={isExpired ? '#DC2626' : '#D97706'} />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: isExpired ? '#991B1B' : '#92400E' }}>
                  {isExpired
                    ? (language === 'ru' ? 'Время резерва истекло' : 'Reservation hold expired')
                    : (language === 'ru' ? 'Слот зарезервирован за вами на' : 'Slot reserved for you:')}
                </span>
              </div>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                fontFamily: 'monospace',
                color: isExpired ? '#DC2626' : '#B45309',
                background: isExpired ? '#FEE2E2' : '#FEF3C7',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px'
              }}>
                {isExpired ? '00:00' : formatTimer(timeRemainingSeconds)}
              </div>
            </div>

            {isExpired ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <AlertCircle size={44} color="#DC2626" style={{ margin: '0 auto 1rem auto' }} />
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {language === 'ru' ? 'Время бронирования слота истекло' : 'Reservation Timeout'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                  {language === 'ru'
                    ? 'Чтобы календарь не блокировался неактуальными заявками, 15-минутный холд был снят. Пожалуйста, выберите слот повторно.'
                    : 'The 15-minute slot hold has expired so other clients can book it. Please re-select your preferred slot.'}
                </p>
                <button
                  onClick={() => setStep('details')}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem 1.5rem', fontSize: '0.92rem' }}
                >
                  <ArrowLeft size={16} /> {language === 'ru' ? 'Выбрать время повторно' : 'Select Slot Again'}
                </button>
              </div>
            ) : (
              <>
                {/* Header info */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                    <ShieldCheck size={14} /> {language === 'ru' ? 'Шаг 2 из 2: Оплата и фиксация слота' : 'Step 2 of 2: Payment & Confirmation'}
                  </div>
                  <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    {language === 'ru' ? 'Подтверждение и оплата' : 'Confirmation & Payment'}
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.5 }}>
                    {language === 'ru'
                      ? 'После завершения оплаты вам мгновенно поступит персональная ссылка на Google Meet / Zoom и чек, а основательница сразу получит уведомление о вашей записи.'
                      : 'Upon payment completion, your personal meeting link and receipt will be issued immediately, and instant alerts are dispatched to the founder.'}
                  </p>
                </div>

                {/* 100% Deposit Guarantee Box */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)',
                  border: '1px solid var(--border-emerald)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.75rem'
                }}>
                  <Sparkles size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.98rem', marginBottom: '0.2rem' }}>
                      {language === 'ru' ? '💎 Гарантия 100% зачета в пакеты релокации' : '💎 100% Credit Guarantee'}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {language === 'ru'
                        ? 'Стоимость консультации ($50) в полном объеме засчитывается в качестве аванса за любой пакет полного сопровождения (Light $290, Comfort $490, VIP $890). Вы ничего не теряете.'
                        : 'Your $50 payment will be 100% deducted from the total fee of any relocation package (Light $290, Comfort $490, VIP $890). Zero financial risk.'}
                    </div>
                  </div>
                </div>

                {/* Booking Order Summary Card */}
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.92rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Забронированное время:' : 'Reserved Time:'}</span>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.98rem' }}>
                        {activeBooking.bookingDate} &bull; {activeBooking.clientBookingTime || activeBooking.bookingTime}
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {language === 'ru'
                          ? `(по вашему времени, ${activeBooking.clientTimezone || 'местное'} · ${activeBooking.vietnamBookingTime || activeBooking.bookingTime} по Вьетнаму)`
                          : `(your local time · ${activeBooking.vietnamBookingTime || activeBooking.bookingTime} Vietnam ICT)`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Клиент:' : 'Client:'}</span>
                    <strong>{activeBooking.name} ({activeBooking.messenger})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Платформа созвона:' : 'Platform:'}</span>
                    <span style={{ fontWeight: 600 }}>{activeBooking.meetingPlatform}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.3rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{language === 'ru' ? 'К оплате:' : 'Total due:'}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>$50</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                        (~4,850 ₽ / 1,280,000 ₫)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Payment Channel Tabs */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                    {language === 'ru' ? 'Выберите удобный способ оплаты:' : 'Select Payment Method:'}
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {[
                      { id: 'card_ru', labelRu: 'Карта РФ / СБП', labelEn: 'RU Card / SBP', icon: CreditCard, subRu: 'МИР, Т-Банк, Сбер', subEn: 'RUB' },
                      { id: 'card_intl', labelRu: 'Зарубежная карта', labelEn: 'Intl Card', icon: CreditCard, subRu: 'Visa, Mastercard', subEn: 'USD / EUR' },
                      { id: 'crypto_usdt', labelRu: 'USDT (TRC-20)', labelEn: 'USDT Crypto', icon: Sparkles, subRu: 'Криптовалюта', subEn: 'TRC-20' },
                      { id: 'viet_qr', labelRu: 'VietQR / VND', labelEn: 'VietQR / VND', icon: QrCode, subRu: 'Вьетнамский банк', subEn: '1,280,000 ₫' }
                    ].map((item) => {
                      const isSelected = selectedPaymentMethod === item.id;
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedPaymentMethod(item.id as any)}
                          style={{
                            padding: '0.85rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                            background: isSelected ? 'var(--accent-emerald-light)' : '#FFFFFF',
                            color: isSelected ? 'var(--accent-emerald)' : 'var(--text-main)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <IconComp size={20} />
                          <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                            {language === 'ru' ? item.labelRu : item.labelEn}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {language === 'ru' ? item.subRu : item.subEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Method Details / Instructions Box */}
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.5
                  }}>
                    {selectedPaymentMethod === 'card_ru' && (
                      <div>
                        <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.3rem' }}>
                          💳 {language === 'ru' ? 'Оплата картой любого банка РФ или через СБП' : 'Payment via Russian Card / SBP'}
                        </strong>
                        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>
                          {language === 'ru'
                            ? 'Сумма к списанию: 4,850 ₽. Чек поступит вам на почту.'
                            : 'Amount: 4,850 ₽. The receipt will be sent to your email.'}
                        </p>
                        <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>
                          ✓ {language === 'ru' ? 'Без комиссий. Мгновенное подтверждение в календаре.' : 'Zero fee. Instant confirmation.'}
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'card_intl' && (
                      <div>
                        <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.3rem' }}>
                          🌍 {language === 'ru' ? 'Зарубежные карты Visa / Mastercard' : 'International Visa / Mastercard'}
                        </strong>
                        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>
                          {language === 'ru'
                            ? 'Для держателей карт банков Европы, Казахстана, Грузии, Турции, США, ОАЭ. Списание в USD ($50).'
                            : 'For cardholders from Europe, Kazakhstan, Georgia, Turkey, US, UAE and others. Charged in USD ($50).'}
                        </p>
                        <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>
                          ✓ {language === 'ru' ? 'Безопасный международный шлюз с защитой 3D-Secure.' : 'Secure international processing with 3D-Secure.'}
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'crypto_usdt' && (
                      <div>
                        <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.3rem' }}>
                          💎 {language === 'ru' ? 'Оплата в USDT (Сеть TRC-20)' : 'USDT TRC-20 Crypto Payment'}
                        </strong>
                        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>
                          {language === 'ru'
                            ? 'Сумма: ровно 50 USDT. Мгновенная оплата без валютного контроля и банковских блокировок.'
                            : 'Amount: exactly 50 USDT. Fast, borderless transaction without bank controls.'}
                        </p>
                        <div style={{
                          background: '#FFFFFF',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          wordBreak: 'break-all'
                        }}>
                          TLsV9xR8P1Q4K9w2Z6m4D1aB8yK3Tz9UoP
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === 'viet_qr' && (
                      <div>
                        <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.3rem' }}>
                          🇻🇳 {language === 'ru' ? 'Вьетнамский VietQR (VND)' : 'Vietnam VietQR (VND)'}
                        </strong>
                        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>
                          {language === 'ru'
                            ? 'Сумма: 1,280,000 VND. Прямой межбанковский перевод через VietQR (MB Bank / Techcombank / VPBank).'
                            : 'Amount: 1,280,000 VND. Direct interbank transfer via VietQR.'}
                        </p>
                        <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>
                          ✓ {language === 'ru' ? 'Удобно для тех, кто уже во Вьетнаме или имеет карту местного банка.' : 'Convenient for clients already in Vietnam.'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Offer Agreement Checkbox */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    fontSize: '0.86rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    lineHeight: 1.45
                  }}>
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      style={{ marginTop: '2px', accentColor: 'var(--accent-emerald)', width: '16px', height: '16px' }}
                    />
                    <span>
                      {language === 'ru' ? (
                        <>
                          Я ознакомлен(а) и согласен(на) с условиями{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOfferModalOpen(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              color: 'var(--accent-emerald)',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontWeight: 600,
                              font: 'inherit'
                            }}
                          >
                            Публичной оферты
                          </button>{' '}
                          и регламентом бронирования и переноса времени консультации.
                        </>
                      ) : (
                        <>
                          I agree to the{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOfferModalOpen(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              color: 'var(--accent-emerald)',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontWeight: 600,
                              font: 'inherit'
                            }}
                          >
                            Public Offer
                          </button>{' '}
                          and consultation rescheduling policy.
                        </>
                      )}
                    </span>
                  </label>
                </div>

                {/* Payment Submit Button */}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessingPayment || !agreeToTerms}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '1.15rem',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    justifyContent: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 8px 20px rgba(15, 118, 110, 0.25)',
                    opacity: (!agreeToTerms || isProcessingPayment) ? 0.6 : 1,
                    cursor: (!agreeToTerms || isProcessingPayment) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isProcessingPayment ? (
                    <span>{language === 'ru' ? 'Обработка платежа...' : 'Processing payment...'}</span>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      {language === 'ru'
                        ? 'Подтвердить оплату ($50) и зафиксировать слот'
                        : 'Confirm Payment ($50) & Lock Slot'}
                    </>
                  )}
                </button>

                {/* Direct Telegram Support Link */}
                <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  {language === 'ru' ? 'Нужна помощь или другой способ оплаты?' : 'Need another payment method?'}
                  {' '}
                  <a
                    href="https://t.me/likqwerty"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-emerald)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {language === 'ru' ? 'Написать напрямую основателю в Telegram' : 'Chat with founder on Telegram'} &rarr;
                  </a>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    );
  }

  // STEP 1: INITIAL DETAILS & FREE SLOT SELECTION
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

        {/* Main Card */}
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
                  ? 'Выберите удобный день и время. При бронировании уведомление мгновенно поступает основателю (в Telegram и на email), а вам приходит подтверждение с деталями встречи.'
                  : 'Select your preferred date and time. Instant notifications are sent to the founder (Telegram & email) and confirmation is delivered to your inbox.'}
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

          {/* 100% Credit Notice */}
          <div style={{
            background: 'var(--accent-emerald-light)',
            border: '1px solid var(--border-emerald)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.75rem',
            fontSize: '0.88rem'
          }}>
            <Sparkles size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
            <span style={{ color: 'var(--text-main)' }}>
              <strong>{language === 'ru' ? 'Гарантия VietReloc:' : 'VietReloc Guarantee:'}</strong>{' '}
              {language === 'ru'
                ? '100% стоимости консультации ($50) засчитывается в любой пакет релокации и поиска жилья.'
                : '100% of the $50 fee is credited towards any relocation or housing package.'}
            </span>
          </div>

          <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
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
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} style={{ color: 'var(--accent-emerald)' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    1. {language === 'ru' ? 'Выберите дату' : 'Select Date'}
                  </span>
                </div>

                {/* Timezone Indicator & Selector Bar */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0.35rem 0.65rem'
                }}>
                  <Globe size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {language === 'ru' ? 'Ваш пояс:' : 'Timezone:'}
                  </span>
                  <select
                    value={clientTimezone}
                    onChange={(e) => setClientTimezone(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--accent-emerald)',
                      cursor: 'pointer',
                      outline: 'none',
                      padding: 0
                    }}
                  >
                    {POPULAR_TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {language === 'ru' ? tz.labelRu : tz.labelEn}
                      </option>
                    ))}
                    {!POPULAR_TIMEZONES.some((tz) => tz.value === clientTimezone) && (
                      <option value={clientTimezone}>
                        {clientTimezone} ({language === 'ru' ? 'Авто' : 'Auto'})
                      </option>
                    )}
                  </select>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} style={{ color: 'var(--accent-terracotta)' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    2. {language === 'ru' ? 'Выберите свободное время' : 'Select Free Time Slot'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    🇻🇳 {language === 'ru'
                      ? `Дананг / Нячанг: UTC+7${getTzDifferenceText(clientTimezone, formData.bookingDate, language)}`
                      : `Vietnam: UTC+7${getTzDifferenceText(clientTimezone, formData.bookingDate, language)}`}
                  </div>
                  {currentAvailability.availableCount > 0 && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                      {language === 'ru' ? `Доступно: ${currentAvailability.availableCount} слотов` : `${currentAvailability.availableCount} slots available`}
                    </span>
                  )}
                </div>
              </div>

              {currentAvailability.slots.length === 0 || !currentAvailability.isWorkingDay ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', background: '#F8FAFC', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Ban size={24} style={{ margin: '0 auto 0.5rem auto', color: '#94A3B8' }} />
                  <div>{language === 'ru' ? 'На этот день основательница не принимает записи. Пожалуйста, выберите другой день в календаре.' : 'No slots available on this date. Please select another date above.'}</div>
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
                    const isPending = slot.status === 'pending_payment';
                    const isBlocked = slot.status === 'blocked';
                    const isSelected = formData.bookingTime === slot.time && isAvailable;

                    // Convert canonical slot time (Vietnam ICT UTC+7) to client timezone
                    const converted = convertSlotTime(formData.bookingDate, slot.time, clientTimezone);

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
                            : isPending
                            ? '1px solid #FDE68A'
                            : isBlocked
                            ? '1px solid #E2E8F0'
                            : '1px solid var(--border-subtle)',
                          background: isSelected
                            ? 'var(--accent-emerald)'
                            : isBooked
                            ? '#F1F5F9'
                            : isPending
                            ? '#FFFBEB'
                            : isBlocked
                            ? '#F8FAFC'
                            : '#FFFFFF',
                          color: isSelected
                            ? '#FFFFFF'
                            : isBooked
                            ? '#94A3B8'
                            : isPending
                            ? '#B45309'
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
                          gap: '2px'
                        }}
                      >
                        {/* Client's Local Time */}
                        <span style={{ fontSize: '0.96rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
                          {converted.clientTime}
                        </span>

                        {/* Vietnam Reference Time (if different) */}
                        {!converted.isSameTime && (
                          <span style={{
                            fontSize: '0.71rem',
                            color: isSelected ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)',
                            fontWeight: 500
                          }}>
                            {language === 'ru' ? `${slot.time} Вьетнам` : `${slot.time} Vietnam`}
                          </span>
                        )}

                        {isBooked && (
                          <span style={{ fontSize: '0.7rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                            <Lock size={11} /> {language === 'ru' ? 'Занято' : 'Booked'}
                          </span>
                        )}
                        {isPending && (
                          <span style={{ fontSize: '0.7rem', color: '#D97706', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                            <Timer size={11} /> {language === 'ru' ? 'В оплате' : 'Holding'}
                          </span>
                        )}
                        {isBlocked && (
                          <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Ban size={11} /> {language === 'ru' ? 'Недоступно' : 'Unavailable'}
                          </span>
                        )}
                        {isAvailable && (
                          <span style={{ fontSize: '0.68rem', color: isSelected ? '#FFFFFF' : 'var(--accent-emerald)', fontWeight: 600 }}>
                            {isSelected
                              ? (language === 'ru' ? '✓ Выбран' : '✓ Selected')
                              : (language === 'ru' ? 'Свободно' : 'Available')}
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
                  ? 'Звонок проходит 1 на 1 лично с основательницей. Ссылка на видеовстречу придет вам в Telegram и на Email сразу после подтверждения бронирования.'
                  : 'The call is 1-on-1 with the founder. Meeting link is sent directly to your Telegram and Email upon booking.'}
              </div>
            </div>

            {/* Next Button: Proceed to Hold & Payment */}
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
              <CheckCircle2 size={20} />
              {language === 'ru' ? 'Перейти к подтверждению и оплате ($50) →' : 'Proceed to Confirmation & Payment ($50) →'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
