import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, ShieldCheck, X, CheckCircle2, Lock, Wallet, Zap } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedTier,
    tiersConfig,
    completePaymentAndUnlock,
    language
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'sbp'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isPaymentModalOpen) return null;

  const currentTierInfo = tiersConfig[selectedTier] || tiersConfig['tier3'];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completePaymentAndUnlock();
    }, 700);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(19, 37, 34, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px',
        width: '100%',
        background: '#FAF8F5',
        border: '1px solid var(--border-emerald)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        padding: '2.2rem'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsPaymentModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', color: 'var(--accent-emerald)' }}>
          <ShieldCheck size={24} />
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Оформление и оплата тарифа' : 'Checkout & Payment'}
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          {language === 'ru' ? 'Завершите оплату, чтобы активировать персональный рабочий кабинет.' : 'Complete payment to activate your client workspace.'}
        </p>

        {/* Order Summary Box */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              {language === 'ru' ? 'Выбранный пакет' : 'Selected Plan'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
              {currentTierInfo.name[language]}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
              &bull; {language === 'ru' ? '100% удалённый консалтинг' : '100% remote consulting'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-serif)' }}>
              ${currentTierInfo.price}
            </div>
          </div>
        </div>

        {/* Payment Methods Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
            {language === 'ru' ? 'Способ оплаты' : 'Payment Method'}
          </label>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: paymentMethod === 'card' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: paymentMethod === 'card' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: paymentMethod === 'card' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <CreditCard size={18} />
              <span>{language === 'ru' ? 'Карта' : 'Bank Card'}</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('crypto')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: paymentMethod === 'crypto' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: paymentMethod === 'crypto' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: paymentMethod === 'crypto' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <Wallet size={18} />
              <span>USDT / TON</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('sbp')}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: paymentMethod === 'sbp' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: paymentMethod === 'sbp' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: paymentMethod === 'sbp' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <Zap size={18} />
              <span>{language === 'ru' ? 'Перевод' : 'Fast Transfer'}</span>
            </button>
          </div>
        </div>

        {/* Selected Method Details Preview */}
        {paymentMethod === 'card' && (
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              {language === 'ru' ? 'Поддерживаются карты Visa, Mastercard, МИР, UnionPay' : 'Visa, Mastercard, Mir, UnionPay supported'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-main)' }}>
              <span>4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</span>
              <span>12/28</span>
            </div>
          </div>
        )}

        {paymentMethod === 'crypto' && (
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              USDT TRC20 / TON / BTC Network
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent-emerald)', wordBreak: 'break-all' }}>
              TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
            </div>
          </div>
        )}

        {paymentMethod === 'sbp' && (
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              {language === 'ru' ? 'Быстрый перевод по номеру телефона / реквизитам' : 'Instant transfer by phone / card'}
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              +84 90 000 0000 &bull; Indochine Concierge
            </div>
          </div>
        )}

        {/* Security badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          <Lock size={13} style={{ color: 'var(--accent-emerald)' }} />
          <span>{language === 'ru' ? 'Безопасное соединение. Чек и доступ придут на указанный Email.' : 'Secure payment. Receipt and access will be sent to your Email.'}</span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.05rem',
            justifyContent: 'center',
            gap: '0.6rem'
          }}
        >
          {isProcessing ? (
            <span>{language === 'ru' ? 'Обработка платежа...' : 'Processing payment...'}</span>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>{language === 'ru' ? `Оплатить $${currentTierInfo.price} и открыть кабинет` : `Pay $${currentTierInfo.price} & Open Workspace`}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
