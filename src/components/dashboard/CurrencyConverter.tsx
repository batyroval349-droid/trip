import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRightLeft } from 'lucide-react';

const RATES_TO_USD: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  RUB: 0.011,
  VND: 0.00004
};

export const CurrencyConverter: React.FC = () => {
  const { language } = useApp();
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurr, setFromCurr] = useState<string>('USD');
  const [toCurr, setToCurr] = useState<string>('VND');

  // Calculation logic: amount * (RATES_TO_USD[fromCurr] / RATES_TO_USD[toCurr])
  const convertedAmount = Math.round(
    amount * (RATES_TO_USD[fromCurr] / RATES_TO_USD[toCurr])
  );

  const formatResult = (val: number, curr: string) => {
    if (curr === 'VND') return val.toLocaleString() + ' ₫';
    if (curr === 'RUB') return val.toLocaleString() + ' ₽';
    if (curr === 'EUR') return '€' + val.toLocaleString();
    return '$' + val.toLocaleString();
  };

  return (
    <div style={{
      background: 'var(--bg-panel)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem 1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
          <ArrowRightLeft size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>{language === 'ru' ? 'Компактный конвертер валют' : 'Compact Currency Converter'}</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {language === 'ru' ? 'Ориентировочный курс' : 'Planning Reference Rates'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Amount Input */}
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: '#FFFFFF',
            fontSize: '0.92rem',
            fontWeight: 600,
            width: '120px',
            color: 'var(--text-main)'
          }}
        />

        {/* From Select */}
        <select
          value={fromCurr}
          onChange={(e) => setFromCurr(e.target.value)}
          style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: '#FFFFFF',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            cursor: 'pointer'
          }}
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="RUB">RUB (₽)</option>
          <option value="VND">VND (₫)</option>
        </select>

        <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>=</span>

        {/* Result Badge */}
        <div style={{
          background: 'var(--accent-emerald-light)',
          border: '1px solid var(--border-emerald)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.45rem 1rem',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--accent-emerald)',
          minWidth: '140px',
          textAlign: 'center'
        }}>
          {formatResult(convertedAmount, toCurr)}
        </div>

        {/* To Select */}
        <select
          value={toCurr}
          onChange={(e) => setToCurr(e.target.value)}
          style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: '#FFFFFF',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            cursor: 'pointer'
          }}
        >
          <option value="VND">VND (₫)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="RUB">RUB (₽)</option>
        </select>
      </div>
    </div>
  );
};
