import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  X,
  CheckCircle2,
  Lock,
  Wallet,
  Zap,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { CardPaymentInputForm } from './CardPaymentInputForm';

type PaymentChannel = 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedTier,
    tiersConfig,
    completePaymentAndUnlock,
    setIsOfferModalOpen,
    language
  } = useApp();

  const [channel, setChannel] = useState<PaymentChannel>('card_ru');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToOffer, setAgreedToOffer] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isPaymentModalOpen) return null;

  const currentTierInfo = tiersConfig[selectedTier] || tiersConfig['tier3'];
  const priceUSD = currentTierInfo.price;
  const priceVND = (priceUSD * 25000).toLocaleString('ru-RU');
  const priceRUB = Math.round(priceUSD * 93).toLocaleString('ru-RU');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completePaymentAndUnlock(channel);
    }, 850);
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
      zIndex: 1000,
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div className="glass-card" style={{
        maxWidth: '580px',
        width: '100%',
        background: '#FAF8F5',
        border: '1px solid var(--border-emerald)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsPaymentModalOpen(false)}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', color: 'var(--accent-emerald)' }}>
          <ShieldCheck size={26} />
          <h2 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
            {language === 'ru' ? 'Оплата и активация кабинета' : 'Payment & Workspace Activation'}
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.45 }}>
          {language === 'ru'
            ? 'Выберите удобный способ оплаты для активации тарифа и доступа к личному кабинету.'
            : 'Select your preferred payment method to activate your relocation workspace.'}
        </p>

        {/* Order Summary Box */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.15rem 1.25rem',
          marginBottom: '1.35rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 600 }}>
              {language === 'ru' ? 'Выбранный тариф' : 'Selected Plan'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
              {currentTierInfo.name[language]}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
              &bull; {language === 'ru' ? 'SLA первого аудита: до 48 часов' : '48h First Delivery SLA'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: 'var(--accent-emerald)',
              fontFamily: 'var(--font-sans)',
              fontVariantNumeric: 'tabular-nums lining-nums',
              letterSpacing: '-0.02em'
            }}>
              ${priceUSD}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums lining-nums' }}>
              ≈ {priceRUB} ₽ / {priceVND} ₫
            </div>
          </div>
        </div>

        {/* Payment Channel Selector Tabs */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
            {language === 'ru' ? 'Выберите способ зачисления средств:' : 'Select Settlement Channel:'}
          </label>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem' }}>
            <button
              type="button"
              onClick={() => setChannel('card_ru')}
              style={{
                padding: '0.65rem 0.35rem',
                borderRadius: 'var(--radius-sm)',
                border: channel === 'card_ru' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: channel === 'card_ru' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: channel === 'card_ru' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              <Zap size={16} />
              <span>{language === 'ru' ? 'РФ / СБП' : 'RU / SBP'}</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel('card_intl')}
              style={{
                padding: '0.65rem 0.35rem',
                borderRadius: 'var(--radius-sm)',
                border: channel === 'card_intl' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: channel === 'card_intl' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: channel === 'card_intl' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              <CreditCard size={16} />
              <span>{language === 'ru' ? 'Зарубеж.' : 'Intl Card'}</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel('crypto_usdt')}
              style={{
                padding: '0.65rem 0.35rem',
                borderRadius: 'var(--radius-sm)',
                border: channel === 'crypto_usdt' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: channel === 'crypto_usdt' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: channel === 'crypto_usdt' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              <Wallet size={16} />
              <span>USDT</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel('viet_qr')}
              style={{
                padding: '0.65rem 0.35rem',
                borderRadius: 'var(--radius-sm)',
                border: channel === 'viet_qr' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: channel === 'viet_qr' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                color: channel === 'viet_qr' ? 'var(--accent-emerald)' : 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              <Building2 size={16} />
              <span>VietQR</span>
            </button>
          </div>
        </div>

        {/* Public Offer Checkbox */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.82rem',
          color: 'var(--text-main)',
          marginBottom: '1rem',
          cursor: 'pointer',
          lineHeight: 1.45,
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <input
            type="checkbox"
            checked={agreedToOffer}
            onChange={(e) => setAgreedToOffer(e.target.checked)}
            style={{ accentColor: 'var(--accent-emerald)', cursor: 'pointer', width: '16px', height: '16px' }}
          />
          <span>
            {language === 'ru' ? (
              <>
                Я принимаю условия{' '}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsOfferModalOpen(true); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent-emerald)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer', font: 'inherit' }}
                >
                  Публичной оферты
                </button>
              </>
            ) : (
              <>
                I accept the terms of the{' '}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsOfferModalOpen(true); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent-emerald)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer', font: 'inherit' }}
                >
                  Public Offer
                </button>
              </>
            )}
          </span>
        </label>

        {/* Dynamic Channel Breakdown & Instructions */}
        {(channel === 'card_ru' || channel === 'card_intl') && (
          <div style={{
            background: '#FFFFFF',
            padding: '1.15rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {channel === 'card_ru'
                  ? (language === 'ru' ? 'Карта любого банка РФ или СБП (МИР, Visa, MC)' : 'Russian Bank Card / SBP (MIR, Visa, MC)')
                  : (language === 'ru' ? 'Зарубежная карта (Visa / Mastercard)' : 'International Card (Visa / Mastercard)')}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                {channel === 'card_ru' ? '0% комиссия' : '3D-Secure'}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0', lineHeight: 1.4 }}>
              {channel === 'card_ru'
                ? (language === 'ru'
                  ? `Сумма к списанию: ${priceRUB} ₽ ($${priceUSD}). Чек поступит вам на почту.`
                  : `Amount: ${priceRUB} RUB ($${priceUSD}). The receipt will be sent to your email.`)
                : (language === 'ru'
                  ? `Сумма к списанию: $${priceUSD}. Чек поступит вам на почту.`
                  : `Amount: $${priceUSD} USD. The receipt will be sent to your email.`)}
            </p>

            <CardPaymentInputForm
              amountUSD={priceUSD}
              amountLocalStr={channel === 'card_ru' ? `${priceRUB} ₽` : `$${priceUSD}`}
              channel={channel}
              language={language}
              isProcessing={isProcessing}
              disabled={!agreedToOffer}
              onPay={handlePay}
            />
          </div>
        )}

        {channel === 'crypto_usdt' && (
          <div style={{
            background: '#FFFFFF',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                USDT (TRC-20)
              </span>
              <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                Мгновенное зачисление
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? `Сумма к переводу: ${priceUSD} USDT (TRC-20).`
                : `Amount to transfer: ${priceUSD} USDT (TRC-20).`}
            </p>
            
            <div style={{
              background: '#F8FAFC',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border-subtle)',
              marginBottom: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>USDT (TRC20) Адрес:</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.76rem', color: 'var(--accent-emerald)', fontWeight: 700, wordBreak: 'break-all' }}>
                  TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', 'usdt')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Copy Address"
              >
                {copiedText === 'usdt' ? <Check size={16} color="#0F766E" /> : <Copy size={16} />}
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                {language === 'ru' ? 'Хэш транзакции (TxID) или ваш кошелек отправки:' : 'Transaction Hash (TxID):'}
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x... или e4d5c..."
                style={{
                  width: '100%',
                  padding: '0.45rem 0.6rem',
                  fontSize: '0.78rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'monospace'
                }}
              />
            </div>
          </div>
        )}

        {channel === 'viet_qr' && (
          <div style={{
            background: '#FFFFFF',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                VietQR
              </span>
              <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                0% комиссия
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? `Сумма: ${priceVND} VND (~$${priceUSD}). Чек поступит вам на почту. Отсканируйте QR-код в приложении любого вьетнамского банка или переведите по реквизитам:`
                : `Amount: ${priceVND} VND (~$${priceUSD}). The receipt will be sent to your email. Scan the QR code or transfer using details below:`}
            </p>

            <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
              <div style={{
                display: 'inline-block',
                background: '#FFFFFF',
                padding: '0.65rem',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <img
                  src="/vietqr-batyrova.png"
                  alt="Vietcombank VietQR"
                  style={{
                    width: '180px',
                    height: '180px',
                    display: 'block',
                    borderRadius: '6px'
                  }}
                />
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              padding: '0.75rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Банк:' : 'Bank:'}</span>
                <strong>Vietcombank</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Получатель:' : 'Beneficiary:'}</span>
                <strong>BATYROVA LIANA</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Номер счёта:' : 'Account number:'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <strong style={{ fontFamily: 'monospace', color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>1064034371</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1064034371', 'vietqr')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
                    title="Скопировать"
                  >
                    {copiedText === 'vietqr' ? <Check size={14} color="#0F766E" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.35rem', marginTop: '0.2rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{language === 'ru' ? 'Сумма к оплате:' : 'Amount:'}</span>
                <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.88rem' }}>{priceVND} VND (~${priceUSD})</strong>
              </div>
            </div>
          </div>
        )}

        {/* Security badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <Lock size={13} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
          <span>
            {language === 'ru'
              ? 'Защищенный протокол передачи данных. Логин и пароль от кабинета генерируются автоматически.'
              : 'Secure encrypted session. Login credentials to your workspace are generated automatically.'}
          </span>
        </div>

        {/* Pay Button for crypto and vietqr */}
        {(channel === 'crypto_usdt' || channel === 'viet_qr') && (
          <button
            onClick={handlePay}
            disabled={isProcessing || !agreedToOffer}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.95rem',
              fontSize: '1.05rem',
              justifyContent: 'center',
              gap: '0.6rem',
              opacity: (!agreedToOffer || isProcessing) ? 0.6 : 1,
              cursor: (!agreedToOffer || isProcessing) ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? (
              <span>{language === 'ru' ? 'Обработка и активация...' : 'Processing & activating...'}</span>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>
                  {language === 'ru'
                    ? `Оплатить $${priceUSD} и активировать кабинет`
                    : `Pay $${priceUSD} & Activate Workspace`}
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
