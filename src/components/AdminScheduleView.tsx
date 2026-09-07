import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  Trash2,
  Plus,
  Ban,
  CalendarX,
  MessageCircle,
  Bell,
  Check,
  AlertCircle,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export const AdminScheduleView: React.FC = () => {
  const {
    consultationBookings,
    scheduleConfig,
    updateScheduleConfig,
    toggleWorkingDay,
    addDefaultSlot,
    removeDefaultSlot,
    toggleBlackoutDate,
    blockSlot,
    unblockSlot,
    cancelConsultationBooking,
    completeConsultationBooking,
    sendTestTelegramNotification,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'blackouts' | 'telegram'>('bookings');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  // Form states
  const [newSlotInput, setNewSlotInput] = useState('');
  const [blackoutDateInput, setBlackoutDateInput] = useState('');
  const [blockSlotDate, setBlockSlotDate] = useState('');
  const [blockSlotTime, setBlockSlotTime] = useState(scheduleConfig.defaultSlots[0] || '14:00 - 15:00');
  const [blockSlotReason, setBlockSlotReason] = useState('');

  // Telegram settings local state
  const [botToken, setBotToken] = useState(scheduleConfig.telegramBotToken || '');
  const [chatId, setChatId] = useState(scheduleConfig.telegramChatId || '');
  const [tgFeedback, setTgFeedback] = useState<{ success?: boolean; message: string } | null>(null);
  const [isTestingTg, setIsTestingTg] = useState(false);

  // Day names mapping: 0=Sun, 1=Mon, ..., 6=Sat
  const daysOfWeek = [
    { index: 1, nameRu: 'Понедельник', shortRu: 'Пн', nameEn: 'Monday', shortEn: 'Mon' },
    { index: 2, nameRu: 'Вторник', shortRu: 'Вт', nameEn: 'Tuesday', shortEn: 'Tue' },
    { index: 3, nameRu: 'Среда', shortRu: 'Ср', nameEn: 'Wednesday', shortEn: 'Wed' },
    { index: 4, nameRu: 'Четверг', shortRu: 'Чт', nameEn: 'Thursday', shortEn: 'Thu' },
    { index: 5, nameRu: 'Пятница', shortRu: 'Пт', nameEn: 'Friday', shortEn: 'Fri' },
    { index: 6, nameRu: 'Суббота', shortRu: 'Сб', nameEn: 'Saturday', shortEn: 'Sat' },
    { index: 0, nameRu: 'Воскресенье', shortRu: 'Вс', nameEn: 'Sunday', shortEn: 'Sun' }
  ];

  // Filter bookings
  const filteredBookings = consultationBookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const confirmedCount = consultationBookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = consultationBookings.filter((b) => b.status === 'completed').length;
  const totalRevenueUSD = (confirmedCount + completedCount) * 50;

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    updateScheduleConfig({
      telegramBotToken: botToken.trim(),
      telegramChatId: chatId.trim()
    });
    setTgFeedback({ success: true, message: language === 'ru' ? 'Настройки Telegram сохранены!' : 'Telegram settings saved!' });
    setTimeout(() => setTgFeedback(null), 3500);
  };

  const handleTestTelegram = async () => {
    setIsTestingTg(true);
    setTgFeedback(null);
    updateScheduleConfig({
      telegramBotToken: botToken.trim(),
      telegramChatId: chatId.trim()
    });
    const result = await sendTestTelegramNotification();
    setIsTestingTg(false);
    setTgFeedback(result);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotInput.trim()) return;
    addDefaultSlot(newSlotInput.trim());
    setNewSlotInput('');
  };

  const handleAddBlackout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blackoutDateInput) return;
    toggleBlackoutDate(blackoutDateInput);
    setBlackoutDateInput('');
  };

  const handleAddBlockedSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockSlotDate || !blockSlotTime) return;
    blockSlot(blockSlotDate, blockSlotTime, blockSlotReason || (language === 'ru' ? 'Личные дела' : 'Personal'));
    setBlockSlotDate('');
    setBlockSlotReason('');
  };

  return (
    <div>
      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {language === 'ru' ? 'Предстоящие созвоны' : 'Upcoming Calls'}
            </span>
            <Calendar size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
            {confirmedCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {completedCount} {language === 'ru' ? 'проведено ранее' : 'completed earlier'}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {language === 'ru' ? 'Доход от консультаций' : 'Consultation Revenue'}
            </span>
            <DollarSign size={18} color="var(--accent-terracotta)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
            ${totalRevenueUSD}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {language === 'ru' ? 'По $50 за 60-мин созвон' : '$50 per 60-min call'}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {language === 'ru' ? 'График работы' : 'Working Days'}
            </span>
            <Clock size={18} color="#2563EB" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1E293B' }}>
            {scheduleConfig.workingDaysOfWeek.length} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ 7 дней</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {scheduleConfig.defaultSlots.length} {language === 'ru' ? 'слотов в рабочий день' : 'slots per day'}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {language === 'ru' ? 'Telegram Уведомления' : 'Telegram Alerts'}
            </span>
            <Bell size={18} color={scheduleConfig.telegramBotToken ? 'var(--accent-emerald)' : '#94A3B8'} />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: scheduleConfig.telegramBotToken ? 'var(--accent-emerald)' : '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
            {scheduleConfig.telegramBotToken ? (
              <><Check size={18} /> {language === 'ru' ? 'Подключен' : 'Active'}</>
            ) : (
              <>{language === 'ru' ? 'Не настроен' : 'Not setup'}</>
            )}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            {scheduleConfig.telegramBotToken ? (language === 'ru' ? 'Мгновенные пуши в Telegram' : 'Instant Telegram pushes') : (language === 'ru' ? 'Настройте во вкладке Telegram' : 'Configure in Telegram tab')}
          </div>
        </div>
      </div>

      {/* Sub-Tabs Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: activeTab === 'bookings' ? '2px solid var(--accent-emerald)' : '1px solid transparent',
            background: activeTab === 'bookings' ? 'var(--accent-emerald-light)' : 'transparent',
            color: activeTab === 'bookings' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Calendar size={16} />
          {language === 'ru' ? 'Записи на созвоны' : 'Consultation Bookings'}
          <span style={{ background: 'var(--accent-emerald)', color: '#FFFFFF', borderRadius: '10px', padding: '1px 6px', fontSize: '0.72rem' }}>
            {consultationBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: activeTab === 'schedule' ? '2px solid var(--accent-emerald)' : '1px solid transparent',
            background: activeTab === 'schedule' ? 'var(--accent-emerald-light)' : 'transparent',
            color: activeTab === 'schedule' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Clock size={16} />
          {language === 'ru' ? 'График и слоты' : 'Working Days & Slots'}
        </button>

        <button
          onClick={() => setActiveTab('blackouts')}
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: activeTab === 'blackouts' ? '2px solid var(--accent-emerald)' : '1px solid transparent',
            background: activeTab === 'blackouts' ? 'var(--accent-emerald-light)' : 'transparent',
            color: activeTab === 'blackouts' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <CalendarX size={16} />
          {language === 'ru' ? 'Блокировка дат и часов' : 'Blackout Dates & Hours'}
          {(scheduleConfig.blackoutDates.length > 0 || scheduleConfig.blockedSlots.length > 0) && (
            <span style={{ background: 'var(--accent-terracotta)', color: '#FFFFFF', borderRadius: '10px', padding: '1px 6px', fontSize: '0.72rem' }}>
              {scheduleConfig.blackoutDates.length + scheduleConfig.blockedSlots.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('telegram')}
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: activeTab === 'telegram' ? '2px solid var(--accent-emerald)' : '1px solid transparent',
            background: activeTab === 'telegram' ? 'var(--accent-emerald-light)' : 'transparent',
            color: activeTab === 'telegram' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Send size={16} />
          {language === 'ru' ? 'Telegram-уведомления' : 'Telegram Bot API'}
        </button>
      </div>

      {/* TAB 1: BOOKINGS LIST */}
      {activeTab === 'bookings' && (
        <div>
          {/* Filters Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '20px',
                    border: filterStatus === st ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    background: filterStatus === st ? 'var(--accent-emerald)' : '#FFFFFF',
                    color: filterStatus === st ? '#FFFFFF' : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {st === 'all' && (language === 'ru' ? 'Все' : 'All')}
                  {st === 'confirmed' && (language === 'ru' ? 'Предстоящие' : 'Upcoming')}
                  {st === 'completed' && (language === 'ru' ? 'Проведенные' : 'Completed')}
                  {st === 'cancelled' && (language === 'ru' ? 'Отмененные' : 'Cancelled')}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              {language === 'ru' ? `Показано записей: ${filteredBookings.length}` : `Showing: ${filteredBookings.length}`}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div style={{ background: '#FFFFFF', padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <Calendar size={36} color="#94A3B8" style={{ margin: '0 auto 0.75rem auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                {language === 'ru' ? 'Нет записей в этой категории' : 'No bookings in this category'}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                {language === 'ru' ? 'Когда клиент забронирует слот на сайте, он мгновенно появится здесь.' : 'New bookings will appear here instantly.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBookings.map((b) => {
                const isConfirmed = b.status === 'confirmed';
                const isCompleted = b.status === 'completed';
                const isCancelled = b.status === 'cancelled';
                const cleanTg = b.messenger.startsWith('@') ? b.messenger.replace('@', '') : null;

                return (
                  <div
                    key={b.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                            {b.name}
                          </h3>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: isConfirmed ? 'rgba(15, 118, 110, 0.12)' : isCompleted ? '#E0F2FE' : '#F1F5F9',
                            color: isConfirmed ? 'var(--accent-emerald)' : isCompleted ? '#0369A1' : '#64748B'
                          }}>
                            {isConfirmed && (language === 'ru' ? '● Предстоит' : '● Upcoming')}
                            {isCompleted && (language === 'ru' ? '✓ Проведено' : '✓ Completed')}
                            {isCancelled && (language === 'ru' ? '✕ Отменено' : '✕ Cancelled')}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                            $50
                          </span>
                        </div>

                        <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          <span>Email: <strong>{b.email}</strong></span>
                          <span>Контакт: <strong>{b.messenger}</strong></span>
                        </div>
                      </div>

                      {/* Date & Slot Badge */}
                      <div style={{
                        background: 'var(--accent-emerald-light)',
                        border: '1px solid var(--border-emerald)',
                        padding: '0.5rem 0.9rem',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'right'
                      }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                          {b.bookingDate}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Clock size={13} /> {b.bookingTime}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {b.meetingPlatform}
                        </div>
                      </div>
                    </div>

                    {/* Topic */}
                    {b.topic && (
                      <div style={{ background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                        <strong style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                          {language === 'ru' ? 'Тема созвона:' : 'Call Topic:'}
                        </strong>
                        <div style={{ marginTop: '2px' }}>{b.topic}</div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {cleanTg && (
                          <a
                            href={`https://t.me/${cleanTg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                          >
                            <Send size={14} /> Telegram (@{cleanTg})
                          </a>
                        )}

                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`Здравствуйте, ${b.name}! Я основатель VietReloc по поводу нашей консультации ${b.bookingDate} в ${b.bookingTime}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {isConfirmed && (
                          <>
                            <button
                              onClick={() => completeConsultationBooking(b.id)}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', color: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)' }}
                              title={language === 'ru' ? 'Отметить как проведенный' : 'Mark as completed'}
                            >
                              <CheckCircle2 size={14} /> {language === 'ru' ? 'Проведено' : 'Complete'}
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(language === 'ru' ? `Отменить запись клиента ${b.name}? Слот ${b.bookingDate} ${b.bookingTime} снова станет свободным для бронирования на сайте.` : `Cancel booking for ${b.name}? Slot will become available again.`)) {
                                  cancelConsultationBooking(b.id);
                                }
                              }}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', color: '#EF4444', borderColor: '#FCA5A5' }}
                              title={language === 'ru' ? 'Отменить запись и освободить слот' : 'Cancel and free slot'}
                            >
                              <Trash2 size={14} /> {language === 'ru' ? 'Отменить' : 'Cancel'}
                            </button>
                          </>
                        )}
                        {isCancelled && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {language === 'ru' ? 'Слот освобожден для других' : 'Slot freed up'}
                          </span>
                        )}
                        {isCompleted && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                            ✓ {language === 'ru' ? 'Консультация оказана' : 'Consultation delivered'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SCHEDULE & SLOTS */}
      {activeTab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Working Days Config */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="var(--accent-emerald)" />
              1. {language === 'ru' ? 'Рабочие дни недели' : 'Working Days of Week'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {language === 'ru'
                ? 'Нажмите на день недели, чтобы включить его или выключить. Выключенные дни будут отображаться у клиентов как «Выходной».'
                : 'Toggle days on/off. Disabled days will appear as "Closed" to visitors.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {daysOfWeek.map((d) => {
                const isActive = scheduleConfig.workingDaysOfWeek.includes(d.index);
                return (
                  <button
                    key={d.index}
                    onClick={() => toggleWorkingDay(d.index)}
                    style={{
                      padding: '0.85rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isActive ? '2px solid var(--accent-emerald)' : '1px solid #CBD5E1',
                      background: isActive ? 'var(--accent-emerald-light)' : '#F8FAFC',
                      color: isActive ? 'var(--accent-emerald)' : '#64748B',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{language === 'ru' ? d.shortRu : d.shortEn}</div>
                    <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>
                      {isActive ? (language === 'ru' ? 'Рабочий' : 'Active') : (language === 'ru' ? 'Выходной' : 'Off')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Config */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--accent-terracotta)" />
              2. {language === 'ru' ? 'Временные слоты по умолчанию' : 'Default Daily Time Slots'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {language === 'ru'
                ? 'Эти слоты предлагаются клиентам в каждый рабочий день. Вы можете удалить любой слот или добавить новый.'
                : 'These slots are available on every working day. You can remove or add custom slots.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {scheduleConfig.defaultSlots.map((slot) => (
                <div
                  key={slot}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-main)'
                  }}
                >
                  <Clock size={14} color="var(--accent-emerald)" />
                  <span>{slot}</span>
                  <button
                    onClick={() => removeDefaultSlot(slot)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px', display: 'flex' }}
                    title={language === 'ru' ? 'Удалить слот' : 'Delete slot'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Slot Form */}
            <form onSubmit={handleAddSlot} style={{ display: 'flex', gap: '0.75rem', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder={language === 'ru' ? 'Например: 11:00 - 12:00' : 'e.g. 11:00 - 12:00'}
                value={newSlotInput}
                onChange={(e) => setNewSlotInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.1rem' }}
              >
                <Plus size={15} /> {language === 'ru' ? 'Добавить' : 'Add'}
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 3: BLACKOUTS & BLOCKED HOURS */}
      {activeTab === 'blackouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Full Day Blackouts (Flights / Trips) */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarX size={20} color="#DC2626" />
              1. {language === 'ru' ? 'Полная блокировка дат (Дни перелета, отгулы, праздники)' : 'Full Day Blackouts (Flights, holidays)'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {language === 'ru'
                ? 'Выберите дату, в которую вы физически не можете принимать созвоны. На сайте эта дата станет полностью недоступной.'
                : 'Select dates you are completely unavailable. The entire date will be disabled on the booking form.'}
            </p>

            <form onSubmit={handleAddBlackout} style={{ display: 'flex', gap: '0.75rem', maxWidth: '420px', marginBottom: '1.5rem' }}>
              <input
                type="date"
                required
                value={blackoutDateInput}
                onChange={(e) => setBlackoutDateInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.1rem', background: '#DC2626', borderColor: '#DC2626' }}
              >
                <Ban size={15} /> {language === 'ru' ? 'Заблокировать день' : 'Block Date'}
              </button>
            </form>

            {scheduleConfig.blackoutDates.length === 0 ? (
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                {language === 'ru' ? 'Нет активных заблокированных дат.' : 'No active blackout dates.'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {scheduleConfig.blackoutDates.map((d) => (
                  <div
                    key={d}
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.88rem',
                      fontWeight: 700
                    }}
                  >
                    <Ban size={14} />
                    <span>{d}</span>
                    <button
                      onClick={() => toggleBlackoutDate(d)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '2px', display: 'flex' }}
                      title={language === 'ru' ? 'Разблокировать день' : 'Unblock date'}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block Specific Hour Slot */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--accent-terracotta)" />
              2. {language === 'ru' ? 'Блокировка конкретного часа' : 'Block Specific Time Slot'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {language === 'ru'
                ? 'Если у вас назначена встреча или личные дела в конкретный час, заблокируйте только этот слот. На сайте он станет «Недоступно».'
                : 'Block a specific hour for a specific date without closing the entire day.'}
            </p>

            <form onSubmit={handleAddBlockedSlot} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Дата' : 'Date'}
                </label>
                <input
                  type="date"
                  required
                  value={blockSlotDate}
                  onChange={(e) => setBlockSlotDate(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Временной слот' : 'Time Slot'}
                </label>
                <select
                  value={blockSlotTime}
                  onChange={(e) => setBlockSlotTime(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.88rem', background: '#FFFFFF' }}
                >
                  {scheduleConfig.defaultSlots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
                  {language === 'ru' ? 'Причина (для вас)' : 'Reason'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'ru' ? 'Личные дела / Встреча' : 'Personal meeting'}
                  value={blockSlotReason}
                  onChange={(e) => setBlockSlotReason(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.88rem', justifyContent: 'center' }}
                >
                  <Ban size={14} /> {language === 'ru' ? 'Заблокировать слот' : 'Block Slot'}
                </button>
              </div>
            </form>

            {scheduleConfig.blockedSlots.length === 0 ? (
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                {language === 'ru' ? 'Нет заблокированных отдельных часов.' : 'No blocked individual hours.'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {scheduleConfig.blockedSlots.map((bl) => (
                  <div
                    key={bl.id}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong>{bl.date}</strong> &bull; <span style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}>{bl.time}</span>
                      {bl.reason && <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}> — {bl.reason}</span>}
                    </div>
                    <button
                      onClick={() => unblockSlot(bl.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                    >
                      <Trash2 size={13} /> {language === 'ru' ? 'Снять' : 'Remove'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 4: TELEGRAM NOTIFICATIONS */}
      {activeTab === 'telegram' && (
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2rem', border: '1px solid var(--border-subtle)', maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Send size={20} color="var(--accent-emerald)" />
            {language === 'ru' ? 'Мгновенные уведомления о бронированиях в Telegram' : 'Instant Telegram Booking Alerts'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {language === 'ru'
              ? 'Когда клиент выбирает дату и бронирует созвон на сайте, вам на телефон моментально приходит сообщение от Telegram-бота с именем клиента, датой, временем и кнопкой перехода в диалог.'
              : 'Receive instant Telegram push notifications the moment a client books a call, with full contact and date details.'}
          </p>

          <form onSubmit={handleSaveTelegram} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Telegram Bot Token *
              </label>
              <input
                type="text"
                placeholder="Например: 7123456789:AAHqxxxxxxxxxxxxxxxxxxxx"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Telegram Chat ID (Ваш личный ID или ID закрытого канала) *
              </label>
              <input
                type="text"
                placeholder="Например: 582491204"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {tgFeedback && (
              <div style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: tgFeedback.success ? 'var(--accent-emerald-light)' : '#FEF2F2',
                border: tgFeedback.success ? '1px solid var(--border-emerald)' : '1px solid #FECACA',
                color: tgFeedback.success ? 'var(--accent-emerald)' : '#DC2626',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {tgFeedback.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {tgFeedback.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
              >
                <Check size={16} /> {language === 'ru' ? 'Сохранить настройки' : 'Save Settings'}
              </button>

              <button
                type="button"
                onClick={handleTestTelegram}
                disabled={isTestingTg}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
              >
                <Send size={16} /> {isTestingTg ? (language === 'ru' ? 'Отправка...' : 'Sending...') : (language === 'ru' ? 'Отправить тестовый пуш' : 'Send Test Alert')}
              </button>
            </div>
          </form>

          {/* Quick Setup Instructions */}
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" />
              {language === 'ru' ? 'Как получить токен и ID за 2 минуты (бесплатно):' : 'How to get Token & ID (Free, 2 mins):'}
            </h4>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>
                {language === 'ru' ? 'Откройте в Telegram официального бота ' : 'Open in Telegram '}
                <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>@BotFather</a>
                {language === 'ru' ? ', отправьте команду ' : ' and send '}
                <code>/newbot</code>
                {language === 'ru' ? ', задайте имя (например, ' : ', choose a name (e.g. '}
                <em>VietReloc Alerts</em>) и скопируйте выданный <strong>HTTP API Token</strong>.
              </li>
              <li>
                {language === 'ru' ? 'Откройте бота ' : 'Open '}
                <a href="https://t.me/userinfobot" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>@userinfobot</a>
                {language === 'ru' ? ', отправьте любое сообщение — бот пришлет ваш личный ' : ' to get your personal '}
                <strong>Id</strong> (цифры, например <code>582491204</code>).
              </li>
              <li>
                {language === 'ru' ? '⚠️ Важно: перед тестированием нажмите ' : '⚠️ Important: click '}
                <strong>Start / Запустить</strong>
                {language === 'ru' ? ' в вашем созданном боте, чтобы Telegram разрешил ему писать вам в ЛС.' : ' inside your new bot so it has permission to message you.'}
              </li>
            </ol>
          </div>

        </div>
      )}

    </div>
  );
};
