import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  FileText,
  Copy,
  Check,
  Sparkles,
  Send
} from 'lucide-react';
import { DEFAULT_LEASE_AUDIT } from '../../translations/defaultRelocationData';
import type { LeaseContractAudit, LeaseAuditStatus } from '../../types';

export const DashboardLeaseAuditView: React.FC = () => {
  const { project, language } = useApp();
  const [copiedClauseIndex, setCopiedClauseIndex] = useState<number | null>(null);

  const audit: LeaseContractAudit = project.leaseContractAudit || DEFAULT_LEASE_AUDIT;

  const statusConfig: Record<LeaseAuditStatus, { labelRu: string; labelEn: string; color: string; bg: string; icon: any }> = {
    waiting_for_client_draft: { labelRu: 'Ожидание проекта договора от клиента', labelEn: 'Waiting for Draft Contract', color: '#B45309', bg: '#FEF3C7', icon: Clock },
    under_review: { labelRu: 'Основатель проводит экспертизу договора', labelEn: 'Under Review by Founder', color: '#0369A1', bg: '#E0F2FE', icon: Clock },
    approved_with_notes: { labelRu: 'Договор проверен и рекомендован к подписанию', labelEn: 'Audited & Approved for Signing', color: '#0F766E', bg: '#E6F4F1', icon: CheckCircle2 },
    revisions_required: { labelRu: 'Требуются обязательные правки перед залогом', labelEn: 'Revisions Required before Deposit', color: '#C25E20', bg: '#FFF7ED', icon: AlertTriangle },
    high_risk: { labelRu: 'Высокий риск • Подписание не рекомендуется', labelEn: 'High Risk • Do Not Sign as is', color: '#DC2626', bg: '#FEF2F2', icon: XCircle }
  };

  const currentStatus = statusConfig[audit.status] || statusConfig.approved_with_notes;
  const StatusIcon = currentStatus.icon;

  const handleCopyClause = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedClauseIndex(index);
    setTimeout(() => setCopiedClauseIndex(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <ShieldCheck size={14} /> {language === 'ru' ? 'Аудит и безопасность аренды' : 'Lease Safety & Audit'}
          </div>
          <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {language === 'ru' ? 'Дистанционный аудит договора аренды' : 'Remote Lease Agreement Audit'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '680px' }}>
            {language === 'ru'
              ? 'Основатель VietReloc лично проводит детальный аудит условий найма: фиксирует прозрачный тариф за свет (до 4500 ₫/кВт), закрепляет возврат залога и обязывает собственника зарегистрировать вас в полиции (tạm trú).'
              : 'The founder audits your rental agreement to verify standard electric rates (up to 4500 ₫/kWh), protect security deposit return, and secure temporary police registration.'}
          </p>
        </div>

        {/* Status Badge */}
        <div style={{
          background: currentStatus.bg,
          color: currentStatus.color,
          padding: '0.65rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.88rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: `1px solid ${currentStatus.color}40`
        }}>
          <StatusIcon size={16} />
          <span>{language === 'ru' ? currentStatus.labelRu : currentStatus.labelEn}</span>
        </div>
      </div>

      {/* Contract Title & Founder Verdict Card */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: '#FFFFFF',
        border: '2px solid var(--accent-emerald)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 24px rgba(15, 118, 110, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              {language === 'ru' ? 'Проверяемый объект / договор:' : 'Audited Property / Contract:'}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {audit.contractDraftTitle || 'Hợp Đồng Thuê Căn Hộ (Hiyori Garden Tower)'}
            </div>
          </div>

          <a
            href="https://t.me/Likqwerty"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.84rem', padding: '0.5rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Send size={14} />
            <span>{language === 'ru' ? 'Прислать новый драфт в Telegram' : 'Send new draft in Telegram'}</span>
          </a>
        </div>

        {/* Founder Verdict */}
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0F766E', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
            <Sparkles size={16} />
            <span>{language === 'ru' ? 'Официальное заключение основателя VietReloc:' : 'Founder Official Verdict:'}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            «{audit.overallVerdict[language] || audit.overallVerdict.ru}»
          </p>
        </div>

        {/* 5 Due Diligence Check Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {language === 'ru' ? 'Результаты проверки по 5 стандартам безопасности:' : '5 Due Diligence Safety Check Results:'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            
            {/* 1. Deposit */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.1rem', background: '#FAF9F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>1. Возврат залога (Депозит)</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Безопасно</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {audit.checks.depositRefundSafety.comment}
              </p>
            </div>

            {/* 2. EVN Electricity */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.1rem', background: '#FAF9F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>2. Тариф электроэнергии (до 4500 ₫)</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  {audit.checks.evnElectricityTariff.tariffVND || 4200} ₫/кВт
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {audit.checks.evnElectricityTariff.comment}
              </p>
            </div>

            {/* 3. Police Registration tam tru */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.1rem', background: '#FAF9F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>3. Регистрация в полиции (tạm trú)</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Закреплено</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {audit.checks.policeRegistrationTamTru.comment}
              </p>
            </div>

            {/* 4. Internet & Water */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.1rem', background: '#FAF9F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>4. Оптоволокно и вода</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Выделенное</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {audit.checks.waterAndInternetSpeed.comment}
              </p>
            </div>

            {/* 5. Early Termination */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.1rem', background: '#FAF9F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>5. Форс-мажор и расторжение</strong>
                <span className="badge badge-terracotta" style={{ fontSize: '0.7rem' }}>Правка</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {audit.checks.earlyTerminationClause.comment}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Recommended Amendment Clauses in Vietnamese */}
      {audit.recommendedAmendments && audit.recommendedAmendments.length > 0 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-terracotta)' }}>
            <FileText size={20} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
              {language === 'ru' ? 'Готовые формулировки правок для владельца жилья' : 'Recommended Clauses for Landlord'}
            </h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0 0 1.25rem 0' }}>
            {language === 'ru'
              ? 'Скопируйте эти пункты на вьетнамском языке и перешлите риелтору или собственнику для внесения в итоговый договор перед подписанием.'
              : 'Copy these clauses in Vietnamese and send them to the landlord or realtor to amend the contract.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {audit.recommendedAmendments.map((clause, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ fontSize: '0.88rem', fontFamily: 'monospace', color: 'var(--text-main)', lineHeight: 1.5, flex: 1 }}>
                  «{clause}»
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyClause(clause, idx)}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexShrink: 0
                  }}
                >
                  {copiedClauseIndex === idx ? <Check size={14} color="#0F766E" /> : <Copy size={14} />}
                  <span>{copiedClauseIndex === idx ? (language === 'ru' ? 'Скопировано!' : 'Copied!') : (language === 'ru' ? 'Скопировать' : 'Copy')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
