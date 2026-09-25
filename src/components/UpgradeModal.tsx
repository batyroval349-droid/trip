import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TierId } from '../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  CreditCard,
  Building2,
  Wallet,
  Zap,
  Copy,
  Check,
  Crown
} from 'lucide-react';
import { CardPaymentInputForm } from './CardPaymentInputForm';

type PaymentChannel = 'card_ru' | 'card_intl' | 'crypto_usdt' | 'viet_qr';

export const UpgradeModal: React.FC = () => {
  const {
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
    project,
    tiersConfig,
    upgradeClientTier,
    language
  } = useApp();

  const currentTierId = project.tierId || 'tier2';
  const currentPaid = tiersConfig[currentTierId]?.price || 290;

  // Available upgrades: higher price tiers than current
  const availableUpgrades: { id: TierId; price: number; name: { ru: string; en: string }; perks: { ru: string[]; en: string[] } }[] = [
    {
      id: 'tier3' as TierId,
      price: 490,
      name: {
        ru: 'Планирование релокации во Вьетнам',
        en: 'Vietnam Relocation Planning'
      },
      perks: {
        ru: [
          'Подбор проверенного жилья без наценок и риелторских комиссий',
          'Аудит договора аренды юристом и проверка тарифов EVN',
          'Персональный роадмап переезда (визы, банки, медицина)',
          'Проверенные контакты партнеров и экспатские комьюнити'
        ],
        en: [
          'Direct verified housing search without broker markups',
          'Lease contract legal audit & official EVN rates check',
          'Step-by-step relocation roadmap (visas, banking, health)',
          'Vetted partner contacts & local expat communities'
        ]
      }
    },
    {
      id: 'tier4' as TierId,
      price: 890,
      name: {
        ru: 'Консьерж-сопровождение релокации «Под ключ»',
        en: 'All-Inclusive Relocation Concierge'
      },
      perks: {
        ru: [
          'Всё из тарифа за $490 + неограниченный аудит квартир и договоров',
          'Личное VIP-сопровождение от Founder 24/7 в Telegram',
          'Сессия с психологом (1-я бесплатно, 20% скидка на следующую)',
          'Приоритетное решение любых бытовых и юридических вопросов'
        ],
        en: [
          'Everything in $490 + unlimited housing & contract audits',
          '24/7 personal VIP founder accompaniment via Telegram',
          'Psychology session (1st free, 20% discount on next)',
          'Priority resolution for any daily or legal relocation questions'
        ]
      }
    }
  ].filter((t) => t.price > currentPaid);

  const [selectedTargetTier, setSelectedTargetTier] = useState<TierId>(
    availableUpgrades.length > 0 ? availableUpgrades[0].id : 'tier4'
  );
  const [channel, setChannel] = useState<PaymentChannel>('card_ru');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const targetTierInfo = tiersConfig[selectedTargetTier] || tiersConfig['tier4'];
  const targetPrice = targetTierInfo.price;
  const diffUSD = Math.max(0, targetPrice - currentPaid);
  const priceVND = (diffUSD * 25000).toLocaleString('ru-RU');
  const priceRUB = Math.round(diffUSD * 93).toLocaleString('ru-RU');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePayUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradeClientTier(selectedTargetTier, diffUSD, channel);
      setUpgradeSuccess(true);
      setTimeout(() => {
        setUpgradeSuccess(false);
        setIsUpgradeModalOpen(false);
      }, 1500);
    }, 850);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(19, 37, 34, 0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div className="glass-card" style={{
        maxWidth: '620px',
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
          onClick={() => setIsUpgradeModalOpen(false)}
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

        {upgradeSuccess ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(15, 118, 110, 0.12)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>
              {language === 'ru' ? 'Тариф успешно повышен!' : 'Plan Successfully Upgraded!'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {language === 'ru'
                ? `Добро пожаловать в тариф «${targetTierInfo.name.ru}». Все новые функции разблокированы.`
                : `Welcome to "${targetTierInfo.name.en}". All premium features are unlocked.`}
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                <Sparkles size={15} />
                {language === 'ru' ? 'Апгрейд тарифа' : 'Plan Upgrade'}
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0', fontWeight: 700 }}>
                {language === 'ru' ? 'Повышение вашего тарифа' : 'Upgrade Your Package'}
              </h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {language === 'ru'
                  ? '100% уже оплаченной вами суммы засчитывается. Вы оплачиваете только разницу между тарифами.'
                  : '100% of what you already paid is credited. You only pay the exact difference.'}
              </p>
            </div>

            {/* Current Plan Pill */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                  {language === 'ru' ? 'Текущий тариф' : 'Current Plan'}
                </span>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  {tiersConfig[currentTierId]?.name[language] || project.serviceName[language]}
                </strong>
              </div>
              <div style={{
                background: 'rgba(15, 118, 110, 0.08)',
                color: 'var(--accent-emerald)',
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                {language === 'ru' ? `Оплачено $${currentPaid}` : `Paid $${currentPaid}`}
              </div>
            </div>

            {/* Target Tier Selection */}
            {availableUpgrades.length === 0 ? (
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <Crown size={32} color="var(--accent-gold)" style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>
                  {language === 'ru' ? 'У вас максимальный тариф' : 'You are on the Highest Plan'}
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {language === 'ru'
                    ? 'Вам уже доступны все возможности VIP-консьержа и полного сопровождения.'
                    : 'You already have access to all VIP concierge and relocation features.'}
                </p>
              </div>
            ) : (
              <>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  {language === 'ru' ? '1. Выберите тариф для перехода:' : '1. Select Target Tier:'}
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {availableUpgrades.map((tier) => {
                    const isSelected = selectedTargetTier === tier.id;
                    const tierDiff = tier.price - currentPaid;

                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTargetTier(tier.id)}
                        style={{
                          border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                          background: isSelected ? '#FFFFFF' : '#FAF8F5',
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 12px rgba(15,118,110,0.08)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid var(--accent-emerald)' : '2px solid #CBD5E1',
                              background: '#FFFFFF',
                              flexShrink: 0
                            }} />
                            <div>
                              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                {tier.name[language]}
                              </strong>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                {language === 'ru' ? `Полная стоимость: $${tier.price}` : `Full price: $${tier.price}`}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {language === 'ru' ? 'К доплате:' : 'Difference:'}
                            </div>
                            <strong style={{ fontSize: '1.05rem', color: 'var(--accent-emerald)' }}>
                              +${tierDiff}
                            </strong>
                          </div>
                        </div>

                        {/* Perks */}
                        <ul style={{ margin: '0.5rem 0 0 1.6rem', padding: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          {tier.perks[language].map((perk, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '2px' }}>{perk}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Calculation Summary Box */}
                <div style={{
                  background: 'rgba(15, 118, 110, 0.05)',
                  border: '1px solid rgba(15, 118, 110, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <span>{language === 'ru' ? `Стоимость тарифа «${targetTierInfo.name[language]}»:` : `Target plan (${targetTierInfo.name[language]}):`}</span>
                    <span>${targetPrice}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span>{language === 'ru' ? 'Уже зачтено из текущего тарифа:' : 'Credited from current plan:'}</span>
                    <span style={{ color: '#16A34A', fontWeight: 600 }}>-${currentPaid}</span>
                  </div>
                  <div style={{
                    borderTop: '1px dashed rgba(15, 118, 110, 0.25)',
                    paddingTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {language === 'ru' ? 'Итого к оплате (разница):' : 'Total to pay (difference):'}
                    </strong>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                        ${diffUSD}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                        (~{priceRUB} ₽ / {priceVND} ₫)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Channel Selector */}
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  {language === 'ru' ? '2. Способ оплаты разницы:' : '2. Payment Method for Difference:'}
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  {/* Card RU */}
                  <button
                    type="button"
                    onClick={() => setChannel('card_ru')}
                    style={{
                      padding: '0.65rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      border: channel === 'card_ru' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      background: channel === 'card_ru' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                      color: channel === 'card_ru' ? 'var(--accent-emerald)' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textAlign: 'left'
                    }}
                  >
                    <CreditCard size={15} />
                    <span>{language === 'ru' ? 'Карта РФ / СБП' : 'Russian Cards / SBP'}</span>
                  </button>

                  {/* Card Intl */}
                  <button
                    type="button"
                    onClick={() => setChannel('card_intl')}
                    style={{
                      padding: '0.65rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      border: channel === 'card_intl' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      background: channel === 'card_intl' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                      color: channel === 'card_intl' ? 'var(--accent-emerald)' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textAlign: 'left'
                    }}
                  >
                    <Building2 size={15} />
                    <span>{language === 'ru' ? 'Карта других стран' : 'International Card'}</span>
                  </button>

                  {/* Crypto */}
                  <button
                    type="button"
                    onClick={() => setChannel('crypto_usdt')}
                    style={{
                      padding: '0.65rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      border: channel === 'crypto_usdt' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      background: channel === 'crypto_usdt' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                      color: channel === 'crypto_usdt' ? 'var(--accent-emerald)' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textAlign: 'left'
                    }}
                  >
                    <Wallet size={15} />
                    <span>USDT (TRC-20)</span>
                  </button>

                  {/* VietQR */}
                  <button
                    type="button"
                    onClick={() => setChannel('viet_qr')}
                    style={{
                      padding: '0.65rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      border: channel === 'viet_qr' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      background: channel === 'viet_qr' ? 'var(--accent-emerald-light)' : '#FFFFFF',
                      color: channel === 'viet_qr' ? 'var(--accent-emerald)' : 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textAlign: 'left'
                    }}
                  >
                    <Zap size={15} />
                    <span>VietQR (Napas 247)</span>
                  </button>
                </div>

                {/* Channel Details */}
                {(channel === 'card_ru' || channel === 'card_intl') && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.15rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                        {channel === 'card_ru'
                          ? (language === 'ru' ? 'Карта любого банка РФ или СБП (МИР, Visa, MC)' : 'Russian Bank Card / SBP (MIR, Visa, MC)')
                          : (language === 'ru' ? 'Зарубежная карта (Visa / Mastercard)' : 'International Card (Visa / Mastercard)')}
                      </strong>
                      <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                        {channel === 'card_ru' ? '0% комиссия' : '3D-Secure'}
                      </span>
                    </div>

                    <CardPaymentInputForm
                      amountUSD={diffUSD}
                      amountLocalStr={channel === 'card_ru' ? `${priceRUB} ₽` : `$${diffUSD}`}
                      channel={channel}
                      language={language}
                      isProcessing={isProcessing}
                      onPay={handlePayUpgrade}
                    />
                  </div>
                )}

                {channel === 'crypto_usdt' && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.82rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <strong style={{ color: 'var(--text-main)' }}>USDT (TRC-20):</strong>
                      <strong style={{ color: 'var(--accent-emerald)' }}>{diffUSD} USDT</strong>
                    </div>
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <code style={{ fontSize: '0.72rem', wordBreak: 'break-all' }}>
                        TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
                      </code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', 'usdt')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-emerald)', padding: '2px 4px' }}
                      >
                        {copiedText === 'usdt' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder={language === 'ru' ? 'Хеш транзакции (TxHash) после перевода' : 'Transaction hash (TxHash)'}
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.8rem',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    />
                  </div>
                )}

                {channel === 'viet_qr' && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1rem',
                    marginBottom: '1.25rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {language === 'ru'
                        ? `Сумма: ${priceVND} VND (~$${diffUSD}). Чек поступит вам на почту. Отсканируйте QR-код:`
                        : `Amount: ${priceVND} VND (~$${diffUSD}). The receipt will be sent to your email. Scan QR code:`}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px',
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '0.6rem'
                    }}>
                      <img
                        src="/vietqr-batyrova.png"
                        alt="Vietcombank VietQR"
                        style={{ width: '130px', height: '130px', objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                    <div style={{
                      background: '#F8FAFC',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>Vietcombank: <strong>1064034371</strong> (BATYROVA ALINA)</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('1064034371', 'vietqr')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-emerald)' }}
                      >
                        {copiedText === 'vietqr' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Pay Button for crypto and vietqr */}
                {(channel === 'crypto_usdt' || channel === 'viet_qr') && (
                  <button
                    type="button"
                    onClick={handlePayUpgrade}
                    disabled={isProcessing}
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
                      gap: '0.5rem'
                    }}
                  >
                    {isProcessing ? (
                      <span>{language === 'ru' ? 'Обработка доплаты...' : 'Processing upgrade...'}</span>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>
                          {language === 'ru'
                            ? `Оплатить разницу $${diffUSD} и активировать тариф`
                            : `Pay difference of $${diffUSD} & Upgrade`}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
