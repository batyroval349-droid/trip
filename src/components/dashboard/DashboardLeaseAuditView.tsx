import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Send,
  Sparkles,
  FileSearch,
  History,
  Check
} from 'lucide-react';
import { DEFAULT_LEASE_AUDIT } from '../../translations/defaultRelocationData';
import type { LeaseContractAudit, LeaseAuditStatus } from '../../types';

export const DashboardLeaseAuditView: React.FC = () => {
  const { project, language } = useApp();

  const audit: LeaseContractAudit = project.leaseContractAudit || DEFAULT_LEASE_AUDIT;

  const statusConfig: Record<LeaseAuditStatus, { labelRu: string; labelEn: string; color: string; bg: string; icon: any }> = {
    waiting_for_client_draft: {
      labelRu: 'Ожидание проекта договора от клиента',
      labelEn: 'Waiting for Draft Contract',
      color: '#B45309',
      bg: '#FEF3C7',
      icon: Clock
    },
    under_review: {
      labelRu: 'Основатель проводит экспертизу договора',
      labelEn: 'Under Review by Founder',
      color: '#0369A1',
      bg: '#E0F2FE',
      icon: Clock
    },
    approved_with_notes: {
      labelRu: 'Договор проверен и согласован к подписанию',
      labelEn: 'Audited & Approved for Signing',
      color: '#0F766E',
      bg: '#E6F4F1',
      icon: CheckCircle2
    },
    revisions_required: {
      labelRu: 'Требуются обязательные правки перед залогом',
      labelEn: 'Revisions Required before Deposit',
      color: '#C25E20',
      bg: '#FFF7ED',
      icon: AlertTriangle
    },
    high_risk: {
      labelRu: 'Высокий риск • Подписание не рекомендуется',
      labelEn: 'High Risk • Do Not Sign as is',
      color: '#DC2626',
      bg: '#FEF2F2',
      icon: XCircle
    }
  };

  const currentStatus = statusConfig[audit.status] || statusConfig.waiting_for_client_draft;
  const StatusIcon = currentStatus.icon;

  const isWaiting = audit.status === 'waiting_for_client_draft';

  // Flaws & risks list (combines explicit flawsAndRisks or extracts from checks)
  const flawsList: string[] = audit.flawsAndRisks && audit.flawsAndRisks.length > 0
    ? audit.flawsAndRisks
    : audit.checks
    ? [
        audit.checks.earlyTerminationClause?.comment,
        audit.checks.evnElectricityTariff?.comment,
        audit.checks.depositRefundSafety?.comment
      ].filter(Boolean) as string[]
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <ShieldCheck size={14} /> {language === 'ru' ? 'Аудит и безопасность аренды' : 'Lease Safety & Audit'}
          </div>
          <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {language === 'ru' ? 'Персональный аудит договора аренды' : 'Personal Lease Agreement Audit'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '680px' }}>
            {language === 'ru'
              ? 'Отправьте проект договора основателю в Telegram. Основатель лично проверит условия на скрытые риски, зафиксирует честный тариф EVN за свет, защитит возврат залога и вернет понятный разбор на русском языке.'
              : 'Send your draft lease agreement to the founder on Telegram. The founder personally reviews all clauses for hidden risks, protects your deposit, and provides clear recommendations.'}
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

      {/* Case 1: Waiting for Client Draft */}
      {isWaiting ? (
        <div className="glass-card" style={{
          padding: '2.5rem',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <FileSearch size={16} />
              <span>{language === 'ru' ? 'Как проходит проверка договора:' : 'How Lease Audit Works:'}</span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0 0 1rem 0' }}>
              {language === 'ru'
                ? 'Отправьте черновик договора основателю перед внесением залога'
                : 'Send your contract draft before paying the security deposit'}
            </h3>

            {/* 3 Step Workflow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    {language === 'ru' ? 'Получите черновик от риелтора или владельца' : 'Receive the draft from realtor or landlord'}
                  </strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
                    {language === 'ru'
                      ? 'Подойдет любой формат: PDF-файл, документ Word, ссылка на Google Docs или четкие фотографии страниц.'
                      : 'Any format works: PDF, Word document, Google Docs link, or clear photos of pages.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    {language === 'ru' ? 'Перешлите документ в Telegram' : 'Send document to founder in Telegram'}
                  </strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
                    {language === 'ru'
                      ? 'Основатель лично изучает вьетнамский и английский текст договора, выявляя скрытые штрафы и невыгодные пункты.'
                      : 'The founder reviews Vietnamese & English terms, uncovering hidden penalties and unfavorable conditions.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    {language === 'ru' ? 'Получите разбор на русском и историю правок' : 'Get analysis in Russian & revision history'}
                  </strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
                    {language === 'ru'
                      ? 'Все недочеты фиксируются в личном кабинете и дублируются вам в Telegram. Вы получите готовые формулировки на понятном языке для согласования с арендодателем.'
                      : 'All findings appear in your dashboard and Telegram with clear instructions for the landlord.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist of What Is Audited */}
            <div style={{
              background: '#FAF9F6',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                {language === 'ru' ? 'Что проверяется в договоре в первую очередь:' : 'Key checklist points audited:'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>{language === 'ru' ? 'Сроки и условия возврата залога (депозита)' : 'Deposit return terms & timing'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>{language === 'ru' ? 'Тариф за электроэнергию EVN (до 4500 ₫/кВт)' : 'EVN electricity rates (up to 4500 ₫/kWh)'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>{language === 'ru' ? 'Обязанность регистрации tạm trú в полиции' : 'Mandatory police registration (tạm trú)'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span>{language === 'ru' ? 'Условия досрочного расторжения и форс-мажор' : 'Early termination & force majeure'}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://t.me/Likqwerty"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.75rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '9999px',
                textDecoration: 'none'
              }}
            >
              <Send size={16} />
              <span>{language === 'ru' ? 'Отправить договор на проверку в Telegram' : 'Send draft via Telegram'}</span>
            </a>
          </div>
        </div>
      ) : (
        /* Case 2: Audited Contract Review */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Main Verdict Card */}
          <div className="glass-card" style={{
            padding: '2rem',
            background: '#FFFFFF',
            border: '2px solid var(--accent-emerald)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 24px rgba(15, 118, 110, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  {language === 'ru' ? 'Проверяемый объект / договор:' : 'Audited Property / Contract:'}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>
                  {audit.contractDraftTitle || 'Договор аренды квартиры'}
                </div>
                {audit.auditedAt && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    {language === 'ru' ? `Проверено: ${audit.auditedAt}` : `Audited: ${audit.auditedAt}`}
                  </div>
                )}
              </div>

              <a
                href="https://t.me/Likqwerty"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.84rem', padding: '0.55rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '9999px' }}
              >
                <Send size={14} />
                <span>{language === 'ru' ? 'Обсудить с основателем в Telegram' : 'Discuss in Telegram'}</span>
              </a>
            </div>

            {/* Founder Verdict Banner */}
            {audit.overallVerdict && (
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0F766E', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                  <Sparkles size={16} />
                  <span>{language === 'ru' ? 'Заключение основателя VietReloc:' : 'Founder Verdict:'}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  «{audit.overallVerdict[language] || audit.overallVerdict.ru}»
                </p>
              </div>
            )}

            {/* Flaws & Risks Found (in Russian) */}
            {flawsList.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={16} color="var(--accent-terracotta)" />
                  <span>{language === 'ru' ? 'Выявленные недочеты и обязательные правки:' : 'Identified Issues & Required Changes:'}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {flawsList.map((flaw, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#FAF9F6',
                        border: '1px solid #FED7AA',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem 1.1rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#F97316',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '1px'
                      }}>
                        {idx + 1}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                        {flaw}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5 Standards Quick Summary */}
            {audit.checks && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                  <strong style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>1. Возврат залога</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{audit.checks.depositRefundSafety?.comment || 'Проверено'}</div>
                </div>
                <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                  <strong style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>2. Тариф EVN</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{audit.checks.evnElectricityTariff?.comment || 'До 4200 ₫/кВт'}</div>
                </div>
                <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                  <strong style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>3. Регистрация tạm trú</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{audit.checks.policeRegistrationTamTru?.comment || 'Закреплено'}</div>
                </div>
                <div style={{ background: '#FAF9F6', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                  <strong style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>4. Расторжение</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{audit.checks.earlyTerminationClause?.comment || 'Требует правки'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Revision History Log */}
          {audit.revisionHistory && audit.revisionHistory.length > 0 && (
            <div className="glass-card" style={{ padding: '1.75rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                <History size={18} style={{ color: 'var(--accent-emerald)' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
                  {language === 'ru' ? 'История согласования и изменений договора' : 'Contract Audit History'}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {audit.revisionHistory.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      borderLeft: '3px solid var(--accent-emerald)',
                      paddingLeft: '1rem',
                      paddingTop: '0.2rem',
                      paddingBottom: '0.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      <strong>{rev.date}</strong>
                      <span>•</span>
                      <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>
                        {statusConfig[rev.status]?.labelRu || rev.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {rev.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Send Updated Version Button */}
          <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
            <a
              href="https://t.me/Likqwerty"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                borderRadius: '9999px'
              }}
            >
              <Send size={15} />
              <span>{language === 'ru' ? 'Отправить исправленный драфт в Telegram' : 'Send revised draft in Telegram'}</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
