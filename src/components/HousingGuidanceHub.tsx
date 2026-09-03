import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, HelpCircle, AlertTriangle, FileText, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HousingGuidanceHub: React.FC = () => {
  const { t, language } = useApp();

  return (
    <section style={{ padding: '5rem 0', background: '#F2EFE9' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Home size={14} /> {language === 'ru' ? 'Гайд по удалённому жилью' : 'Accommodation Guidance & Research Framework'}
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
            {t('housingTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {t('housingSubhead')}
          </p>

          {/* Rule 48 Mandatory Housing Disclaimer */}
          <div className="glass-card glass-card-terracotta" style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', textAlign: 'left', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-terracotta)', flexShrink: 0, marginTop: '2px' }}>
              <ShieldCheck size={20} />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--accent-terracotta)' }}>{language === 'ru' ? '100% Удаленный консалтинг:' : '100% Remote Advisory Notice:'}</strong> {t('disclaimerHousing')}
            </div>
          </div>
        </div>

        {/* 6 Key Guidance Cards */}
        <div className="grid-3">
          
          {/* 1. Where to Look */}
          <div className="glass-card">
            <div style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
              <Search size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '1. Где искать онлайн' : '1. Where to Look Online'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Используйте локальные каналы: чаты Zalo с менеджерами объектов, портал Batdongsan.com.vn для ориентира цен и проверенные группы экспатов в Дананге/Сайгоне.'
                : 'Utilize official local channels: Zalo direct manager chats, Batdongsan.com.vn for pricing benchmarks, and vetted digital nomad housing groups in Da Nang / Saigon.'}
            </p>
          </div>

          {/* 2. Questions to Ask */}
          <div className="glass-card">
            <div style={{ color: 'var(--accent-terracotta)', marginBottom: '1rem' }}>
              <HelpCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '2. Вопросы перед бронированием' : '2. Questions Before Booking'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Запрашивайте скриншот Speedtest Wi-Fi (от 100 Мбит/с), уточняйте стоимость 1 кВт электроэнергии (норма 3,500–4,000 VND) и коммунальные платежи.'
                : 'Request a live Speedtest screenshot of Wi-Fi (100+ Mbps), clarify per-kWh electricity rates (standard is 3,500-4,000 VND), and verify water/management fees.'}
            </p>
          </div>

          {/* 3. Red Flags */}
          <div className="glass-card">
            <div style={{ color: '#EF4444', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '3. Красные флаги' : '3. Red Flags to Avoid'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Не переводите задаток на личные счета без письменных условий. Избегайте объектов, отказывающихся показать онлайн-видео или скрывающих наценки на электричество.'
                : 'Never wire deposits to unverified personal bank accounts without written lease terms. Avoid listings refusing online video walkthroughs or hidden electricity markups.'}
            </p>
          </div>

          {/* 4. Contract Checklist */}
          <div className="glass-card">
            <div style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '4. Чек-лист договора' : '4. Contract Checklist'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Проверяйте двуязычную версию договора (англ/вьетн), пункт об уведомлении при досрочном выезде (за 30 дней) и акт приема имущества.'
                : 'Ensure bilingual contract clause (English/Vietnamese), notice period for early termination (usually 30 days), and clear inventory condition list before signing.'}
            </p>
          </div>

          {/* 5. Deposit Standards */}
          <div className="glass-card">
            <div style={{ color: 'var(--accent-terracotta)', marginBottom: '1rem' }}>
              <Lock size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '5. Стандарты депозитов' : '5. Deposit Considerations'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Стандартный залог во Вьетнаме — 1 месяц при аренде от 3-6 месяцев. Для 1 месяца ищите апарт-отели с депозитом 0-0.5 месяца.'
                : 'Standard deposit in Vietnam is 1 month for rentals under 6 months. For initial 1-month stays, aim for flex agreements or serviced apartments with 0-0.5 month deposit.'}
            </p>
          </div>

          {/* 6. Remote Verification Tips */}
          <div className="glass-card">
            <div style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
              <CheckCircle2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {language === 'ru' ? '6. Советы по проверке' : '6. Remote Verification Tips'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {language === 'ru'
                ? 'Проверяйте стройки рядом через Google Street View, смотрите отзывы о доме в картах Google и бронируйте 3-5 дней отеля перед длинным контрактом.'
                : 'Cross-reference Google Street View for construction noise around the building, verify building management reputation online, and book 3-5 initial days before committing long-term.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
