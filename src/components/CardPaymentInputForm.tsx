import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Sparkles } from 'lucide-react';

interface CardPaymentInputFormProps {
  amountUSD: number;
  amountLocalStr: string;
  channel: 'card_ru' | 'card_intl';
  language: 'ru' | 'en';
  onPay: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export const CardPaymentInputForm: React.FC<CardPaymentInputFormProps> = ({
  amountUSD,
  amountLocalStr,
  channel,
  language,
  onPay,
  isProcessing,
  disabled = false
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [secureStep, setSecureStep] = useState<string | null>(null);

  // Detect card network
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (!clean) return null;
    if (clean.startsWith('2')) return 'МИР';
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5') || (clean.startsWith('2') && clean.length > 1 && parseInt(clean.slice(0, 4)) >= 2221)) return 'Mastercard';
    return null;
  };

  const cardBrand = getCardBrand(cardNumber);

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format expiry as MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setExpiry(val);
  };

  // CVV max 3-4 digits
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(val);
  };

  // Cardholder uppercase
  const handleHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    setCardHolder(val);
  };

  // Quick fill test card
  const handleFillTestCard = () => {
    if (channel === 'card_ru') {
      setCardNumber('2200 7845 9012 3456');
    } else {
      setCardNumber('4111 2222 3333 4444');
    }
    setExpiry('12/28');
    setCvv('777');
    setCardHolder('TEST CLIENT');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || isProcessing) return;

    // Simulate 3D-Secure auth step
    setSecureStep(language === 'ru' ? 'Верификация 3D-Secure...' : 'Verifying 3D-Secure...');
    setTimeout(() => {
      setSecureStep(null);
      onPay();
    }, 900);
  };

  const isFormValid =
    cardNumber.replace(/\s+/g, '').length >= 16 &&
    expiry.length === 5 &&
    cvv.length === 3 &&
    cardHolder.trim().length >= 3;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Test Fill & Info Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#FAF9F6',
        border: '1px dashed var(--border-emerald)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 0.75rem',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
          <Sparkles size={13} />
          <span>{language === 'ru' ? 'Тестовый шлюз эквайринга' : 'Acquiring Test Sandbox'}</span>
        </div>

        <button
          type="button"
          onClick={handleFillTestCard}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '0.2rem 0.6rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--accent-emerald)',
            cursor: 'pointer'
          }}
        >
          {language === 'ru' ? 'Тестовые реквизиты' : 'Fill Test Card'}
        </button>
      </div>

      {/* Card Number Input */}
      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          <span>{language === 'ru' ? 'Номер карты' : 'Card Number'}</span>
          {cardBrand && (
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
              {cardBrand}
            </span>
          )}
        </label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            required
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem 0.6rem 2.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.92rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              background: '#FFFFFF',
              color: 'var(--text-main)'
            }}
          />
          <CreditCard size={16} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Row: Expiry + CVV */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            {language === 'ru' ? 'Срок действия' : 'Expiry'}
          </label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.92rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              textAlign: 'center',
              background: '#FFFFFF',
              color: 'var(--text-main)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            CVC / CVV
          </label>
          <input
            type="password"
            required
            maxLength={3}
            placeholder="•••"
            value={cvv}
            onChange={handleCvvChange}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.92rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              textAlign: 'center',
              background: '#FFFFFF',
              color: 'var(--text-main)'
            }}
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          {language === 'ru' ? 'Имя держателя карты (латиницей)' : 'Cardholder Name'}
        </label>
        <input
          type="text"
          required
          placeholder="IVAN IVANOV"
          value={cardHolder}
          onChange={handleHolderChange}
          style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            background: '#FFFFFF',
            color: 'var(--text-main)'
          }}
        />
      </div>

      {/* Security Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        paddingTop: '0.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Lock size={12} color="var(--accent-emerald)" />
          <span>TLS 1.3 / AES-256</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={12} color="var(--accent-emerald)" />
          <span>PCI DSS Level 1</span>
        </div>
        <div>
          <span>3D-Secure 2.0</span>
        </div>
      </div>

      {/* Pay Submit Button */}
      <button
        type="submit"
        disabled={disabled || isProcessing || !isFormValid || Boolean(secureStep)}
        className="btn btn-promo"
        style={{
          width: '100%',
          padding: '0.85rem 1.25rem',
          fontSize: '0.95rem',
          fontWeight: 700,
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
          cursor: (!isFormValid || disabled || isProcessing || Boolean(secureStep)) ? 'not-allowed' : 'pointer',
          opacity: (!isFormValid || disabled) ? 0.65 : 1
        }}
      >
        {secureStep ? (
          <span>{secureStep}</span>
        ) : isProcessing ? (
          <span>{language === 'ru' ? 'Списание средств...' : 'Processing payment...'}</span>
        ) : (
          <>
            <Lock size={16} />
            <span>
              {language === 'ru'
                ? `Оплатить ${amountLocalStr} ($${amountUSD})`
                : `Pay ${amountLocalStr} ($${amountUSD})`}
            </span>
          </>
        )}
      </button>
    </form>
  );
};
