import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ProjectStatus } from '../../types';
import { UserCheck, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const { project, t, language } = useApp();

  const statuses: { id: ProjectStatus; label: string }[] = [
    { id: 'new', label: t('statusNew') },
    { id: 'questionnaire_completed', label: t('statusQuestionnaireCompleted') },
    { id: 'research_in_progress', label: t('statusResearchInProgress') },
    { id: 'plan_ready', label: t('statusPlanReady') },
    { id: 'in_progress', label: t('statusInProgress') },
    { id: 'completed', label: t('statusCompleted') }
  ];

  const currentStatusIdx = Math.max(0, statuses.findIndex((s) => s.id === project.status));

  const getStatusProgress = (status: ProjectStatus): number => {
    switch (status) {
      case 'new': return 15;
      case 'questionnaire_completed': return 35;
      case 'research_in_progress': return 50;
      case 'plan_ready': return 75;
      case 'in_progress': return 90;
      case 'completed': return 100;
      default: return 35;
    }
  };

  const progressPercent = getStatusProgress(project.status);

  return (
    <div className="glass-card glass-card-emerald" style={{ marginBottom: '2rem', padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* Left Welcome Info */}
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.6rem' }}>
            <UserCheck size={14} /> {t('dashWorkspaceBadge')}
          </div>
          
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            {t('dashWelcome')}, {project.clientName}
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
            {project.serviceName[language]} &bull; {t('dashTargetArrival')}: <strong style={{ color: 'var(--text-main)' }}>{project.questionnaire.travelDates}</strong>
          </p>
        </div>

        {/* WhatsApp & Telegram Direct Founder CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/84900000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.1rem' }}
          >
            <MessageCircle size={16} /> {t('dashWhatsAppFounder')}
          </a>
          <a
            href="https://t.me/indochine_concierge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.1rem' }}
          >
            <Send size={16} /> {t('dashTelegramFounder')}
          </a>
        </div>

      </div>

      {/* Progress & Status Timeline Bar */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
            <Clock size={16} style={{ color: 'var(--accent-emerald)' }} />
            <span>{t('dashStatusLabel')}:</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
              {statuses[currentStatusIdx]?.label}
            </span>
          </div>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {t('dashProgressLabel')}: <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>{progressPercent}%</strong>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div style={{ height: '10px', background: '#EAE6DF', borderRadius: '5px', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'var(--accent-emerald)',
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Step Indicator Nodes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          {statuses.map((st, idx) => {
            const isDone = idx <= currentStatusIdx;
            return (
              <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: isDone ? 1 : 0.5, fontSize: '0.8rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: isDone ? 'var(--accent-emerald)' : '#E5E2DA',
                  color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.7rem'
                }}>
                  {isDone ? <CheckCircle2 size={13} /> : idx + 1}
                </div>
                <span className="desktop-nav" style={{ fontWeight: isDone ? 600 : 400, color: 'var(--text-main)' }}>{st.label}</span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
