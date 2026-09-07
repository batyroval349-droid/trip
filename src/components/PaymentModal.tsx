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
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

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
            ? 'Деньги поступают напрямую на официальный расчетный счет или криптовалютный кошелек основателя сервиса.'
            : 'Payments are settled directly to the founder’s official business account or crypto wallet.'}
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
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-serif)' }}>
              ${priceUSD}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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

        {/* Dynamic Channel Breakdown & Instructions */}
        {channel === 'card_ru' && (
          <div style={{
            background: '#FFFFFF',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {language === 'ru' ? 'Шлюз Prodamus / СБП (Россия)' : 'Prodamus Gateway / SBP (Russia)'}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                Чек 54-ФЗ
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? 'Оплата картами МИР, Visa, Mastercard РФ или через СБП без комиссии. Фискальный кассовый чек высылается на вашу почту, а средства зачисляются на официальный расчетный счет основателя на следующий рабочий день.'
                : 'Payment via Russian Mir, Visa, Mastercard or SBP. Full official 54-FZ tax receipt, funds settled to founder bank account next business day.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <ArrowRight size={14} />
              <span>{language === 'ru' ? `Сумма к списанию: ${priceRUB} ₽ (фиксировано)` : `Charged: ${priceRUB} RUB (fixed)`}</span>
            </div>
          </div>
        )}

        {channel === 'card_intl' && (
          <div style={{
            background: '#FFFFFF',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {language === 'ru' ? 'Международные карты (Visa / Mastercard)' : 'International Credit Cards'}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                MoR Compliance
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? 'Принимаются любые карты банков СНГ, Европы, ОАЭ, США. Процессинг через Merchant of Record (Lava / Stripe / Tribute), который удерживает НДС покупателя и выводит сумму в USD основателю.'
                : 'Accepts all international cards. Processed via Merchant of Record (Lava / Stripe / Tribute) compliant with global VAT, settled directly to founder.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <ArrowRight size={14} />
              <span>{language === 'ru' ? `Сумма к списанию: $${priceUSD}.00 USD` : `Charged: $${priceUSD}.00 USD`}</span>
            </div>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                USDT (TRC-20 / TON / BSC)
              </span>
              <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                Мгновенное зачисление
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? 'Прямой перевод на кошелек основателя. Комиссия сети TRC-20 всего ~1-2 USDT.'
                : 'Direct transfer to founder wallet. Network fee ~1-2 USDT.'}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                VietQR / NAPAS 247 (Вьетнамский банк)
              </span>
              <span style={{ fontSize: '0.72rem', background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                0% Комиссия
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
              {language === 'ru'
                ? 'Прямой перевод по системе быстрых платежей NAPAS 247 на счет основателя в банке Techcombank / MBBank во Вьетнаме. Идеально для тех, у кого уже есть вьетнамский счет.'
                : 'Direct transfer via NAPAS 247 to founder account at Techcombank/MBBank in Vietnam in VND.'}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F8FAFC',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Techcombank (Vietnam) &bull; Назначение: INDOCHINE-{priceUSD}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  1903 8888 2470 19 &bull; {priceVND} VND
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('19038888247019', 'vietqr')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              >
                {copiedText === 'vietqr' ? <Check size={16} color="#0F766E" /> : <Copy size={16} />}
              </button>
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

        {/* Public Offer & Non-Refundable Terms Checkbox */}
        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          marginBottom: '1.35rem',
          cursor: 'pointer',
          lineHeight: 1.45,
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <input
            type="checkbox"
            checked={agreedToOffer}
            onChange={(e) => setAgreedToOffer(e.target.checked)}
            style={{ marginTop: '2px', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
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
                . Услуга является дистанционной информационно-консультационной. 1-й этап ($100) — глубокий аудит анкеты и районов (невозвратный после начала работы); 2-й этап — подбор проверенного жилья с аудитом договора и EVN; 3-й этап — сопровождение заселения и гарантийный консьерж.
              </>
            ) : (
              <>
                I accept the{' '}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsOfferModalOpen(true); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent-emerald)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer', font: 'inherit' }}
                >
                  Public Offer agreement
                </button>
                . The service is remote consulting: Stage 1 ($100) profile & district audit (non-refundable once started); Stage 2 vetted accommodation selection & contract review; Stage 3 arrival concierge.
              </>
            )}
          </span>
        </label>

        {/* Pay Button */}
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
      </div>
    </div>
  );
};
