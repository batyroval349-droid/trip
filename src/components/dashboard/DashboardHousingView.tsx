import React from 'react';
import { useApp } from '../../context/AppContext';
import { HousingGuidanceHub } from '../HousingGuidanceHub';
import {
  ShieldCheck,
  Zap,
  Wifi,
  Volume2,
  Clock,
  Send,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export const DashboardHousingView: React.FC = () => {
  const { project, language } = useApp();
  const verifiedList = project.verifiedHousing || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* 1. Curated Vetted Shortlist from Founder */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
              <ShieldCheck size={14} /> {language === 'ru' ? 'Персональный шорт-лист жилья' : 'Bespoke Vetted Shortlist'}
            </div>
            <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
              {language === 'ru' ? 'Проверенные варианты жилья от основателя' : 'Audited Accommodation Options'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              {language === 'ru'
                ? 'Каждый объект прошел проверку по 5 стандартам Due Diligence: прямой счетчик EVN, отсутствие строек за окном, замер скорости оптоволокна и безопасный залог.'
                : 'Every property is vetted against 5 Due Diligence standards: direct EVN meter, quiet perimeter, verified fiber speed, and safe deposit.'}
            </p>
          </div>

          {verifiedList.length > 0 && (
            <div className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}>
              <CheckCircle2 size={16} /> {verifiedList.length} {language === 'ru' ? 'объектов проверено' : 'units verified'}
            </div>
          )}
        </div>

        {/* Empty State / Active Waiting Room for Housing */}
        {verifiedList.length === 0 ? (
          <div className="glass-card" style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%)',
            border: '2px solid var(--accent-emerald)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--accent-emerald)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 20px rgba(15, 118, 110, 0.25)'
            }}>
              <Clock size={28} />
            </div>

            <h3 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Основатель готовит и проверяет первые варианты жилья'
                : 'The Founder is Auditing Your Accommodation Options'}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '620px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              {language === 'ru'
                ? `По вашей анкете (бюджет $${project.questionnaire.monthlyBudgetUSD}/мес, формат: ${project.questionnaire.accommodationType || 'апартаменты'}) основатель сейчас проводит выездную проверку уровня шума, замеряет скорость Wi-Fi и проверяет свидетельства собственности (sổ đỏ). Первые 2–3 проверенных варианта появятся здесь в течение 48 часов.`
                : `Based on your preferences (budget $${project.questionnaire.monthlyBudgetUSD}/mo), the founder is inspecting noise levels, speedtesting fiber Wi-Fi, and auditing ownership deeds. 2–3 vetted options will appear here within 48h.`}
            </p>

            <a
              href="https://t.me/indochine_concierge"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Send size={16} />
              <span>{language === 'ru' ? 'Написать основателю в Telegram' : 'Message Founder on Telegram'}</span>
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
            {verifiedList.map((house) => (
              <div
                key={house.id}
                className="glass-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: house.isTopPick ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
                }}
              >
                {/* Photo & Badge */}
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={house.photoUrls[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'}
                    alt={house.condoName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', gap: '0.4rem' }}>
                    {house.isTopPick && (
                      <span className="badge badge-terracotta" style={{ fontSize: '0.72rem', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                        ★ Выбор основателя (Top Pick)
                      </span>
                    )}
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                      ✓ Договор проверен
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    right: '0.85rem',
                    background: 'rgba(28, 45, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-serif)'
                  }}>
                    ${house.monthlyPriceUSD} <span style={{ fontSize: '0.72rem', fontWeight: 400 }}>/ мес</span>
                  </div>
                </div>

                {/* Body Details */}
                <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      {house.condoName}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      <MapPin size={14} style={{ color: 'var(--accent-terracotta)' }} />
                      <span>{house.addressSnippet}</span>
                    </div>

                    {/* Due Diligence Verified Metric Badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#15803D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Zap size={12} /> Тариф EVN:
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#14532D', marginTop: '2px' }}>
                          {house.evnTariffVNDPerKwh.toLocaleString('ru-RU')} ₫/кВт·ч
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#15803D' }}>Прямой счетчик</div>
                      </div>

                      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#1D4ED8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Wifi size={12} /> Wi-Fi Оптоволокно:
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1E3A8A', marginTop: '2px' }}>
                          {house.fiberInternetSpeedMbps.download} Мбит/с
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#1D4ED8' }}>Провайдер {house.fiberInternetSpeedMbps.provider}</div>
                      </div>

                      <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7E22CE', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Volume2 size={12} /> Аудит шума и строек:
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#581C87', marginTop: '2px', lineHeight: 1.35 }}>
                          {house.noiseAudit.notes.ru || house.noiseAudit.notes.en}
                        </div>
                      </div>
                    </div>

                    {/* Deposit clause */}
                    <div style={{ background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                      <strong>Условия депозита:</strong> {house.depositTerms.refundConditions.ru || house.depositTerms.refundConditions.en}
                    </div>

                    {/* Founder Review Note */}
                    <div style={{ background: '#FFFDFB', borderLeft: '3px solid var(--accent-terracotta)', padding: '0.65rem 0.85rem', fontSize: '0.84rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: 1.45 }}>
                      «{house.founderReview.ru || house.founderReview.en}»
                    </div>
                  </div>

                  {/* Booking Contact */}
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <a
                      href="https://t.me/indochine_concierge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.65rem', fontSize: '0.86rem', justifyContent: 'center' }}
                    >
                      <Send size={14} /> Назначить просмотр с основателем
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Educational Due Diligence & Financial Shield Section */}
      <div style={{ borderTop: '2px solid var(--border-subtle)', paddingTop: '2rem' }}>
        <HousingGuidanceHub />
      </div>

    </div>
  );
};
