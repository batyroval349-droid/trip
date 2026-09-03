import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Calendar, Sliders, MapPin, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const { t, language, setViewMode } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'roadmap' | 'budget' | 'neighborhoods' | 'notes'>('roadmap');

  return (
    <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-terracotta" style={{ marginBottom: '1rem' }}>
            <LayoutDashboard size={14} /> {t('navPreview')}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>
            {t('previewTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {t('previewSubhead')}
          </p>
        </div>

        {/* Interactive Workspace Showcase Box */}
        <div className="glass-card glass-card-emerald" style={{ padding: '2rem' }}>
          
          {/* Top Demo Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginLeft: '0.5rem' }}>
                {t('previewBoxTitle')}
              </span>
            </div>

            <div className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
              {t('previewStatusText')}
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
            {[
              { id: 'roadmap', label: t('previewTab1'), icon: Calendar },
              { id: 'budget', label: t('previewTab2'), icon: Sliders },
              { id: 'neighborhoods', label: t('previewTab3'), icon: MapPin },
              { id: 'notes', label: t('previewTab4'), icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePreviewTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? 'var(--accent-emerald)' : 'var(--bg-panel)',
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Preview Tab Content */}
          <div style={{ background: '#FAF8F5', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
            
            {activePreviewTab === 'roadmap' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {t('previewRoadmapTitle')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {t('previewRoadmapSubhead')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-emerald)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', textDecoration: 'line-through' }}>
                        {language === 'ru' ? 'Изучить варианты жилья онлайн' : 'Research accommodation options online'}
                      </strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {language === 'ru' ? 'Заметка основателя: Обратите внимание на варианты в Ан Тхыонг. Не переводите задаток без проверки.' : 'Founder Note: Focus on An Thuong or Phuoc My. Avoid unverified deposits.'}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className="custom-checkbox" />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        {language === 'ru' ? 'Запланировать подключение SIM / eSIM' : 'Plan mobile SIM / eSIM connectivity setup'}
                      </strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {language === 'ru' ? 'Заметка основателя: Рекомендую оформить eSIM Viettel за 48 часов до вылета.' : 'Founder Note: Order Viettel eSIM 48h prior to departure.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'budget' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {language === 'ru' ? 'Интерактивный калькулятор бюджета' : 'Dynamic Cost & Budget Calculator'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {language === 'ru' ? 'Клиенты меняют слайдеры для расчета расходов на жилье и быт ($ USD & VND).' : 'Clients adjust sliders to model different housing and lifestyle scenarios ($ USD & VND).'}
                </p>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span>{language === 'ru' ? 'Аренда жилья: $500/мес' : 'Serviced Apartment Rent: $500/mo'}</span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{language === 'ru' ? 'Итого в месяц: $1,450/мес' : 'Total Modeled: $1,450/mo'}</span>
                  </div>
                  <input type="range" min={400} max={1200} value={500} readOnly />
                </div>
              </div>
            )}

            {activePreviewTab === 'neighborhoods' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {language === 'ru' ? 'Персональный подбор районов' : 'Personalized Neighborhood Matching'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {language === 'ru' ? 'Рекомендации основателя с учетом близости к пляжу, скорости интернета и тишины.' : 'Specific founder recommendations matched to beach proximity, Wi-Fi speeds, and quiet hours.'}
                </p>

                <div className="grid-2">
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-emerald)' }}>
                    <strong style={{ color: 'var(--accent-emerald)' }}>An Thuong (My An)</strong>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {language === 'ru' ? '3 минуты пешком до пляжа Ми Кхе и кофеен для работы.' : '3-min walk to My Khe Beach & remote work cafes.'}
                    </p>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Son Tra Peninsula</strong>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {language === 'ru' ? 'Более тихие апартаменты с видом на океан.' : 'Quieter high-rise apartments with ocean views.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'notes' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  {language === 'ru' ? 'Заметки основателя' : 'Bespoke Founder Advisory Notes'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {language === 'ru' ? 'Персональные комментарии основателя на каждом этапе переезда.' : 'Direct contextual commentary written by the founder for each stage of your move.'}
                </p>

                <div style={{ background: 'var(--accent-terracotta-light)', borderLeft: '4px solid var(--accent-terracotta)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {language === 'ru' 
                    ? '“На основе ваших анкетных приоритетов я советую начать с Дананга. Забронируйте 3-5 дней в отеле для тестирования кофеен в Ан Тхыонге.”'
                    : '“Based on your priorities for UX work and beach access, I recommend starting in Da Nang rather than Saigon. Start with 3-5 days in a hotel while testing cafes in An Thuong.”'}
                </div>
              </div>
            )}

          </div>

          {/* CTA to open full client dashboard preview */}
          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <button
              onClick={() => setViewMode('dashboard')}
              className="btn btn-primary"
              style={{ fontSize: '0.95rem' }}
            >
              {t('previewBtnOpen')} <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
