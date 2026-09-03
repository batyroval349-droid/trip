import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ClientQuestionnaire } from '../types';
import { FileText, ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';

export const QuestionnaireForm: React.FC = () => {
  const { t, submitQuestionnaire, project, language, setViewMode, selectedTier, tiersConfig } = useApp();
  const currentTierInfo = tiersConfig[selectedTier] || tiersConfig['tier3'];

  const [formData, setFormData] = useState<ClientQuestionnaire>(project.questionnaire);

  const handleChange = (field: keyof ClientQuestionnaire, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCityToggle = (city: string) => {
    setFormData((prev) => {
      const exists = prev.preferredCities.includes(city);
      const updated = exists
        ? prev.preferredCities.filter((c) => c !== city)
        : [...prev.preferredCities, city];
      return { ...prev, preferredCities: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestionnaire(formData);
  };

  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        
        {/* Back Link */}
        <button
          onClick={() => setViewMode('marketing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            fontSize: '0.88rem',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} /> {language === 'ru' ? 'Назад на главную' : 'Back to Home'}
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <FileText size={14} /> {language === 'ru' ? 'Анкета клиента' : 'Intake Questionnaire'}
          </div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('qTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            {t('qSubhead')}
          </p>
        </div>

        {/* Selected Tier Banner */}
        <div style={{
          background: '#FFFFFF',
          border: '2px solid var(--accent-emerald)',
          borderRadius: 'var(--radius-md)',
          padding: '1.1rem 1.6rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 4px 12px rgba(19, 78, 74, 0.06)'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', fontWeight: 600 }}>
              {language === 'ru' ? 'Выбранный тариф' : 'Selected Plan'}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
              {currentTierInfo.name[language]}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-serif)' }}>
              ${currentTierInfo.price}
            </span>
            <button
              type="button"
              onClick={() => setViewMode('marketing')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              {language === 'ru' ? 'Выбрать другой' : 'Change plan'}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Section 1: Basic Profile */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                {language === 'ru' ? '1. Личные данные и даты поездки' : '1. Personal Profile & Dates'}
              </h3>
              
              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qName')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qEmail')} *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qPassword')} *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qCountry')}</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qDates')}</label>
                  <input
                    type="text"
                    placeholder={language === 'ru' ? 'Например: 15 октября 2026' : 'e.g. October 15, 2026'}
                    value={formData.travelDates}
                    onChange={(e) => handleChange('travelDates', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qDuration')}</label>
                  <input
                    type="text"
                    placeholder={language === 'ru' ? 'Например: 1 месяц / 6 месяцев' : 'e.g. 1 month / 6 months'}
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qTravelers')}</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.travelersCount}
                    onChange={(e) => handleChange('travelersCount', parseInt(e.target.value) || 1)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Relocation & Lifestyle Preferences */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--accent-terracotta)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                {language === 'ru' ? '2. Бюджет, формат работы и атмосфера' : '2. Budget, Work & Environment'}
              </h3>

              <div className="grid-2" style={{ gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qBudget')}</label>
                  <input
                    type="number"
                    step={100}
                    value={formData.monthlyBudgetUSD}
                    onChange={(e) => handleChange('monthlyBudgetUSD', parseInt(e.target.value) || 1200)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qEnvironment')}</label>
                  <select
                    value={formData.environmentPreference}
                    onChange={(e) => handleChange('environmentPreference', e.target.value as any)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  >
                    <option value="beach">{language === 'ru' ? 'Побережье и пляж' : 'Beach Coastal Vibe'}</option>
                    <option value="city">{language === 'ru' ? 'Динамичный мегаполис' : 'Vibrant City & Nightlife'}</option>
                    <option value="quiet">{language === 'ru' ? 'Тишина и природа' : 'Quiet & Peaceful Nature'}</option>
                    <option value="social">{language === 'ru' ? 'Активное комьюнити кочевников' : 'Active Nomad Community'}</option>
                    <option value="balanced">{language === 'ru' ? 'Сбалансированный ритм' : 'Balanced Lifestyle'}</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('qCities')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'Da Nang', label: language === 'ru' ? 'Дананг' : 'Da Nang' },
                    { id: 'Nha Trang', label: language === 'ru' ? 'Нячанг' : 'Nha Trang' },
                    { id: 'Hoi An', label: language === 'ru' ? 'Хойан' : 'Hoi An' },
                    { id: 'Ho Chi Minh City', label: language === 'ru' ? 'Хошимин (Сайгон)' : 'Ho Chi Minh City' },
                    { id: 'Hanoi', label: language === 'ru' ? 'Ханой' : 'Hanoi' }
                  ].map((city) => {
                    const isSelected = formData.preferredCities.includes(city.id);
                    return (
                      <button
                        type="button"
                        key={city.id}
                        onClick={() => handleCityToggle(city.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '9999px',
                          border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--accent-emerald-light)' : '#FFFFFF',
                          color: isSelected ? 'var(--accent-emerald)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                      >
                        {city.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qWork')}</label>
                <input
                  type="text"
                  placeholder={language === 'ru' ? 'Например: UX-дизайнер на удалёнке, звонки по США' : 'e.g. Remote UX Designer with US team calls'}
                  value={formData.workSituation}
                  onChange={(e) => handleChange('workSituation', e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            {/* Section 3: Detailed Notes */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                {language === 'ru' ? '3. Пожелания по жилью и приоритеты' : '3. Specific Housing & Goals'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qAccommodation')}</label>
                  <textarea
                    rows={2}
                    placeholder={language === 'ru' ? 'Например: 1BR апартаменты с балконом или видом на море, рабочим столом' : 'e.g. 1BR serviced apartment with ocean view, gym, desk'}
                    value={formData.accommodationType}
                    onChange={(e) => handleChange('accommodationType', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qPriorities')}</label>
                  <textarea
                    rows={2}
                    placeholder={language === 'ru' ? 'Например: Пляж пешком, стабильный оптоволоконный Wi-Fi, тихие ночи' : 'e.g. Walkability to beach, fast fiber Wi-Fi, quiet nights'}
                    value={formData.priorities}
                    onChange={(e) => handleChange('priorities', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{t('qConcerns')}</label>
                  <textarea
                    rows={2}
                    placeholder={language === 'ru' ? 'Например: Безопасность депозита, интернет в сезон дождей' : 'e.g. Deposit safety, internet reliability during storm season'}
                    value={formData.concerns}
                    onChange={(e) => handleChange('concerns', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>

            {/* Rule 48 Disclaimer Pill inside form */}
            <div style={{ background: 'var(--accent-emerald-light)', border: '1px solid var(--border-emerald)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <span>
                {language === 'ru'
                  ? 'Ваша анкета направляется напрямую основателю для персонального удаленного исследования. Никаких автоматических ИИ-ботов.'
                  : 'By submitting, your preferences are routed directly to the founder for bespoke remote research. No automated AI templates or chatbots used.'}
              </span>
            </div>

            {/* Submit Button with Pay action */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.15rem',
                fontSize: '1.05rem',
                justifyContent: 'center',
                gap: '0.65rem'
              }}
            >
              <CreditCard size={18} />
              <span>
                {language === 'ru'
                  ? `Отправить анкету и оплатить ($${currentTierInfo.price}) →`
                  : `Submit Questionnaire & Pay ($${currentTierInfo.price}) →`}
              </span>
            </button>

          </div>
        </form>

      </div>
    </section>
  );
};
