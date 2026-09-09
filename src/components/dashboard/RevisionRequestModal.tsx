import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface RevisionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevisionRequestModal: React.FC<RevisionRequestModalProps> = ({ isOpen, onClose }) => {
  const { project, requestTravelRevision, language } = useApp();
  const [requestText, setRequestText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const revState = project.travelRevision;
  const isUsed = revState && (revState.usedCount >= revState.maxCount || revState.status === 'applied');
  const isPending = revState && revState.requested && revState.status === 'pending';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    requestTravelRevision(requestText.trim());
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(19, 37, 34, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1200,
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '560px',
        width: '100%',
        background: '#FAF8F5',
        boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
        border: '1px solid var(--border-emerald)',
        position: 'relative',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(15, 118, 110, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)'
            }}>
              <RefreshCw size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {language === 'ru' ? 'Корректировка маршрута' : 'Route Revision Request'}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {language === 'ru' ? '1 бесплатная корректировка включена в пакет $290' : '1 complimentary revision included in $290 package'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto' }} />
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                {language === 'ru' ? 'Запрос успешно отправлен!' : 'Revision request submitted!'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {language === 'ru'
                  ? 'Основатель получил ваши пожелания и обновит маршрут в течение 24–48 часов.'
                  : 'The founder has received your feedback and will update your route within 24–48 hours.'}
              </p>
            </div>
          ) : isPending ? (
            <div style={{
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <AlertCircle size={32} style={{ color: '#D97706', margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ margin: '0 0 0.4rem 0', color: '#92400E' }}>
                {language === 'ru' ? 'Корректировка уже в работе' : 'Revision currently in progress'}
              </h4>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#B45309' }}>
                {language === 'ru'
                  ? 'Вы уже отправили запрос на изменение маршрута. Основатель вносит правки.'
                  : 'You have already submitted a revision request. The founder is applying updates.'}
              </p>
              {revState?.requestText && (
                <div style={{
                  background: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  textAlign: 'left',
                  color: 'var(--text-main)',
                  border: '1px dashed #FCD34D'
                }}>
                  <strong>{language === 'ru' ? 'Ваш запрос:' : 'Your request:'}</strong> {revState.requestText}
                </div>
              )}
            </div>
          ) : isUsed ? (
            <div style={{
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={32} style={{ color: 'var(--accent-emerald)', margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>
                {language === 'ru' ? '1 бесплатная корректировка использована' : 'Complimentary revision already applied'}
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {language === 'ru'
                  ? 'Если вам требуются дополнительные изменения или помощь на маршруте, напишите основателю напрямую в WhatsApp поддержки (14 дней).'
                  : 'If you need additional changes or real-time assistance during your trip, contact the founder directly via your 14-day WhatsApp concierge support.'}
              </p>
              <a
                href="https://wa.me/840394583217?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%AF%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B2%D0%BE%D0%B4%D1%83%20%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B0%20%D0%BF%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D1%8F"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                {language === 'ru' ? 'Написать в WhatsApp (+84 039 458 3217)' : 'Chat on WhatsApp (+84 039 458 3217)'}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '0.4rem'
                }}>
                  {language === 'ru'
                    ? 'Какие изменения вы хотите внести в маршрут?'
                    : 'What changes would you like to make to your route?'}
                </label>
                <textarea
                  rows={5}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder={language === 'ru'
                    ? 'Например: хотим провести на 1 день больше в Ниньбине и убрать день в Ханое, а также добавить ресторан с вегетарианской кухней и аренду байка...'
                    : 'For example: we want 1 more day in Ninh Binh instead of Hanoi, plus vegetarian dining options and scooter rental spots...'}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{
                background: 'rgba(15, 118, 110, 0.05)',
                border: '1px solid rgba(15, 118, 110, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                color: 'var(--accent-emerald)',
                marginBottom: '1.25rem'
              }}>
                ✓ {language === 'ru'
                  ? '1 корректировка предоставляется бесплатно в рамках оплаченного пакета.'
                  : '1 route revision is included completely free of charge in your package.'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '0.65rem 1.2rem',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.65rem 1.25rem',
                    background: 'var(--accent-emerald)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 12px rgba(15,118,110,0.25)'
                  }}
                >
                  <Send size={15} />
                  {language === 'ru' ? 'Отправить на корректировку' : 'Submit Revision Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
