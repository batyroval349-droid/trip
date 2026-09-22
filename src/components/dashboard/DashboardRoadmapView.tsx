import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, MessageSquare, Calendar, Clock, Sparkles } from 'lucide-react';

export const DashboardRoadmapView: React.FC = () => {
  const { project, toggleTaskCompletion, language, t } = useApp();

  const isRelocationTier = project.tierId === 'tier3' || project.tierId === 'tier4';
  const isRoadmapPublished = isRelocationTier
    ? (project.isRelocationPlanPublished === true || (project.status === 'plan_ready' && !project.upgradedFromTier))
    : true;

  const phases = [
    { id: 'before_arrival', label: t('roadmapPhase1Title') },
    { id: 'week_of_arrival', label: t('roadmapPhase2Title') },
    { id: 'first_month', label: t('roadmapPhase3Title') }
  ];

  if (!isRoadmapPublished) {
    return (
      <div className="glass-card" style={{
        padding: '2.5rem 1.75rem',
        textAlign: 'center',
        background: '#FFFFFF',
        border: '1.5px dashed var(--accent-terracotta)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(194, 94, 32, 0.1)',
          color: 'var(--accent-terracotta)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <Clock size={26} />
        </div>
        <div className="badge badge-terracotta" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={13} /> {language === 'ru' ? 'Подождите, я провожу анализ и наполнение' : 'Analysis in Progress'}
        </div>
        <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
          {language === 'ru' ? 'Чек-лист документов и виз формируется' : 'Documents & Visas Roadmap in Preparation'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
          {language === 'ru'
            ? 'Основатель лично составляет персональный пошаговый чек-лист (визовые шаги, необходимые документы, регистрация tạm trú и этапы переезда) под ваш кейс.'
            : 'The founder is curating your personalized document, visa, and relocation milestone checklist.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Info */}
      <div className="glass-card glass-card-emerald">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
              <Calendar size={14} /> {language === 'ru' ? 'Документы и визы' : t('roadmapBadge')}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>
              {language === 'ru' ? 'Документы, визы и чек-лист переезда' : t('roadmapTitle')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {t('roadmapSubhead')}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-serif)' }}>
              {project.roadmapTasks.filter((t) => t.completed).length} / {project.roadmapTasks.length}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('roadmapCompletedCounter')}</div>
          </div>
        </div>
      </div>

      {/* Phases Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {phases.map((phase) => {
          const phaseTasks = project.roadmapTasks.filter((t) => t.phase === phase.id);
          const completedCount = phaseTasks.filter((t) => t.completed).length;

          return (
            <div key={phase.id} className="glass-card">
              
              {/* Phase Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  {phase.label}
                </h3>
                <span className="badge badge-subtle">
                  {completedCount} {t('roadmapTasksCompletedOf')} {phaseTasks.length} {t('roadmapTasksCompletedWord')}
                </span>
              </div>

              {/* Tasks List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: task.completed ? 'var(--accent-emerald-light)' : '#FFFFFF',
                      border: task.completed ? '1px solid var(--border-emerald)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.1rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                      
                      {/* Interactive Custom Checkbox */}
                      <button
                        type="button"
                        className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                        onClick={() => toggleTaskCompletion(task.id)}
                        style={{ marginTop: '2px' }}
                      >
                        {task.completed && <CheckCircle2 size={16} />}
                      </button>

                      {/* Task Info */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '1.05rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '0.3rem'
                        }}>
                          {task.title[language]}
                        </h4>

                        {task.description && (
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                            {task.description[language]}
                          </p>
                        )}

                        {/* Founder Contextual Note per Task */}
                        {task.founderComment && (
                          <div style={{
                            background: 'var(--accent-terracotta-light)',
                            borderLeft: '3px solid var(--accent-terracotta)',
                            padding: '0.75rem 0.9rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.84rem',
                            marginTop: '0.6rem'
                          }}>
                            <div style={{ color: 'var(--accent-terracotta)', fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <MessageSquare size={12} /> Founder Note
                            </div>
                            <div style={{ color: 'var(--text-main)' }}>
                              “{task.founderComment[language]}”
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
