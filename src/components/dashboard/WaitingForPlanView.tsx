import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyConverter } from './CurrencyConverter';
import {
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  Sun,
  Wifi,
  Car,
  CreditCard,
  ShieldPlus,
  AlertCircle,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const WaitingForPlanView: React.FC = () => {
  const { project, language } = useApp();
  const [selectedGuideTab, setSelectedGuideTab] = useState<'climate' | 'sim' | 'transport' | 'money' | 'health'>('climate');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* 1. Главная статус-плашка: Ожидайте смены статуса */}
      <div className="glass-card glass-card-emerald" style={{
        padding: '2.25rem',
        border: '2px solid var(--accent-emerald)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--accent-emerald)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(15, 118, 110, 0.3)',
            flexShrink: 0
          }}>
            <Clock size={28} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.8rem' }}>
                <Sparkles size={13} /> {language === 'ru' ? 'Ожидайте смены статуса' : 'Awaiting Status Update'}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {language === 'ru' ? 'Анкета получена и принята в работу' : 'Questionnaire accepted and in review'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0 0.75rem 0' }}>
              {language === 'ru'
                ? 'Основатель проводит персональное исследование по вашей анкете'
                : 'The Founder is Conducting Bespoke Research on Your Intake'}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
              {language === 'ru'
                ? `Мы приняли вашу анкету (бюджет $${project.questionnaire.monthlyBudgetUSD}/мес, даты: ${project.questionnaire.travelDates || 'в планах'}). Основатель лично анализирует параметры, проверяет доступность проверенного жилья с надежным интернетом и просчитывает реалистичный бюджет. Как только всё будет готово, статус в кабинете изменится на «План опубликован и готов к просмотру», и откроются все персональные рекомендации.`
                : `We received your intake (budget $${project.questionnaire.monthlyBudgetUSD}/mo, target date: ${project.questionnaire.travelDates || 'upcoming'}). The founder is personally auditing living options, verified fiber Wi-Fi spaces, and realistic cost models. Once ready, the status will advance to "Plan Ready & Published".`}
            </p>
          </div>

        </div>

        {/* 2. Плашка: если статус не поменялся в течение недели */}
        <div style={{
          marginTop: '1.75rem',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <AlertCircle size={22} style={{ color: '#D97706', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#92400E', fontSize: '0.92rem' }}>
                {language === 'ru'
                  ? 'Если статус не поменялся в течение недели — напишите основателю'
                  : 'If status has not updated within a week — please message the founder'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#B45309' }}>
                {language === 'ru'
                  ? 'Обычно подготовка занимает 2–4 рабочих дня. Вы можете уточнить прогресс напрямую в мессенджере:'
                  : 'Research typically takes 2–4 business days. You can check on progress directly via messenger:'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href="https://t.me/indochine_concierge"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                fontSize: '0.85rem',
                padding: '0.55rem 1rem',
                background: '#FFFFFF',
                borderColor: '#FCD34D',
                color: '#92400E'
              }}
            >
              <Send size={15} /> Telegram
            </a>
            <a
              href="https://wa.me/84900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                fontSize: '0.85rem',
                padding: '0.55rem 1rem',
                background: '#FFFFFF',
                borderColor: '#FCD34D',
                color: '#92400E'
              }}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* 3. Ваша отправленная анкета в кратком виде */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'var(--accent-emerald)' }}>
          <FileCheck2 size={20} />
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: 0 }}>
            {language === 'ru' ? 'Параметры вашей принятой анкеты' : 'Summary of Your Submitted Intake'}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
          <div style={{ background: 'var(--bg-panel)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Клиент:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{project.clientName}</div>
          </div>
          <div style={{ background: 'var(--bg-panel)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Планируемый приезд:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{project.questionnaire.travelDates || 'Уточняется'} ({project.questionnaire.duration || '1 мес'})</div>
          </div>
          <div style={{ background: 'var(--bg-panel)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Бюджет в месяц:</span>
            <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>${project.questionnaire.monthlyBudgetUSD} USD</div>
          </div>
          <div style={{ background: 'var(--bg-panel)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Формат работы:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{project.questionnaire.workSituation || 'Удаленная работа'}</div>
          </div>
        </div>
      </div>

      {/* 4. Блок: Общая полезная информация по Вьетнаму (пока клиент ожидает исследование) */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <HelpCircle size={14} /> {language === 'ru' ? 'База знаний для подготовки' : 'Preparation Knowledge Base'}
          </div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0 0.4rem 0' }}>
            {language === 'ru' ? 'Общая информация по Вьетнаму пока вы ждете план' : 'Vietnam Country Guide While You Await Your Plan'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', margin: 0 }}>
            {language === 'ru'
              ? 'Собрали ключевые практические аспекты: сезоны и климат, связь и SIM-карты, такси Grab, банкоматы без комиссии и медицину.'
              : 'Essential practical guides: weather patterns, eSIM & mobile data, Grab transport, ATMs, and healthcare.'}
          </p>
        </div>

        {/* Guides Switcher Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.6rem',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'climate', label: language === 'ru' ? 'Климат и сезоны' : 'Climate & Seasons', icon: Sun },
            { id: 'sim', label: language === 'ru' ? 'Связь и SIM / eSIM' : 'SIM & Connectivity', icon: Wifi },
            { id: 'transport', label: language === 'ru' ? 'Транспорт и Grab' : 'Transport & Grab', icon: Car },
            { id: 'money', label: language === 'ru' ? 'Деньги и банкоматы' : 'Money & ATMs', icon: CreditCard },
            { id: 'health', label: language === 'ru' ? 'Медицина и аптеки' : 'Healthcare', icon: ShieldPlus }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedGuideTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedGuideTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--accent-emerald)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Climate */}
        {selectedGuideTab === 'climate' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Климатические зоны и когда лучше приезжать' : 'Climate Zones & Best Arrival Seasons'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  🌴 {language === 'ru' ? 'Центральный Вьетнам (Дананг, Хойан, Нячанг)' : 'Central Vietnam (Da Nang, Hoi An, Nha Trang)'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Сухой и идеальный сезон длится с февраля по август: температура +28...+32°C, спокойное прозрачное море. Осенью (октябрь–декабрь) возможны кратковременные дожди, при этом Нячанг защищен горами и остается комфортным.'
                    : 'The dry season runs from February to August with +28...+32°C and calm turquoise seas. Autumn (Oct-Dec) brings occasional rain, while Nha Trang remains protected by mountains.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  ☀️ {language === 'ru' ? 'Южный Вьетнам (Хошимин / Сайгон, Фукуок)' : 'Southern Vietnam (Saigon, Phu Quoc)'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Тепло круглый год: стабильно +30...+33°C. Сухой сезон с ноября по апрель. В сезон дождей (май–октябрь) ливни идут 1-2 часа во второй половине дня и быстро сменяются солнцем.'
                    : 'Warm all year: consistently +30...+33°C. Dry season is November to April. In the rainy season (May-Oct), brief afternoon showers last 1-2 hours and clear up quickly.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SIM & Connectivity */}
        {selectedGuideTab === 'sim' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Мобильная связь, интернет и выбор оператора' : 'Mobile Operators, eSIM & Wi-Fi Speed'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  📶 Viettel vs Vinaphone
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Viettel — крупнейший оператор с лучшим покрытием в стране (отличный 4G/5G даже в горах и на пляже). Туристический тариф на 30 дней с 4-6 ГБ в день стоит около $8–12. Пополняется через приложение My Viettel или карты предоплаты.'
                    : 'Viettel offers the premier nationwide coverage with lightning-fast 4G/5G. Tourist packages (4-6 GB/day for 30 days) cost roughly $8–12.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  ⚡ {language === 'ru' ? 'Оптоволоконный интернет для работы' : 'Home Fiber for Remote Work'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Во Вьетнаме один из самых быстрых и дешевых интернетов в Азии. В арендованных апартаментах стандартная скорость составляет 100–250 Мбит/с. Для подстраховки на созвонах всегда можно раздать 4G со смартфона.'
                    : 'Vietnam has fast, affordable fiber. Serviced apartments usually feature 100–250 Mbps connection. 4G smartphone hotspot serves as a solid backup.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Transport & Grab */}
        {selectedGuideTab === 'transport' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Транспорт: приложение Grab и аренда скутера' : 'Transport: Grab Super-app & Scooter Rentals'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  🚗 Приложение Grab
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Установите Grab заранее. Работает как Uber: вызов такси с кондиционером (GrabCar ~$2-4 по городу) или мототакси (GrabBike ~$1). Оплата наличными VND или привязанной зарубежной картой.'
                    : 'Download Grab in advance. Functions like Uber with GrabCar ($2-4 around town) and GrabBike ($1). Pay in cash VND or via linked international card.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  🛵 {language === 'ru' ? 'Аренда скутера' : 'Scooter Rentals'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Популярные модели: Honda Vision и Honda Air Blade 125. Месячная аренда стоит $50–80. Обязательно надевайте шлем (строгий закон) и берите скутер только у проверенных прокатов без залога паспорта.'
                    : 'Popular models: Honda Vision or Air Blade 125. Monthly lease is $50–80. Always wear a helmet (mandatory by law) and avoid leaving your passport as deposit.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Money & ATMs */}
        {selectedGuideTab === 'money' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Деньги, обмен валюты и банкоматы без комиссии' : 'Money Exchange, Best Rates & 0% ATM Withdrawals'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  🏧 {language === 'ru' ? 'Банкоматы без комиссии (TPBank & VPBank)' : 'No-Fee ATMs'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Большинство вьетнамских банков берут комиссию $2–3 за снятие. Банкоматы TPBank (LiveBank) и VPBank позволяют снимать до 5 000 000 VND (~$200) за транзакцию без локальной комиссии банкомата.'
                    : 'TPBank (LiveBank) and VPBank offer withdrawal limits up to 5,000,000 VND (~$200) without local ATM operator surcharges.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  💵 {language === 'ru' ? 'Обмен наличных долларов' : 'USD Cash Exchange Rule'}
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Берите с собой купюры по $100 нового образца («синяя полоса», чистые, без заломов и чернильных отметок). Самый выгодный курс традиционно дают в ювелирных магазинах (gold shops).'
                    : 'Bring crisp new-series $100 bills (blue ribbon, no ink marks or tears). Gold shops traditionally offer the most competitive market exchange rates.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Health & Hospitals */}
        {selectedGuideTab === 'health' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
              {language === 'ru' ? 'Медицина, международные госпитали и аптеки' : 'International Hospitals & Pharmacies'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  🏥 Vinmec & Family Medical Practice
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Современные медицинские центры с аккредитацией JCI. Врачи говорят на английском, принимают международные страховки (Genki, SafetyWing, Allianz). Скорая помощь и оперативные палаты европейского уровня.'
                    : 'JCI-accredited modern facilities with English-speaking staff. Direct billing with international nomad insurances (SafetyWing, Genki, Allianz).'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-panel)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  💊 Pharmacity & Long Chau
                </strong>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  {language === 'ru'
                    ? 'Федеральные сети современных аптек. Большинство базовых медикаментов, антигистаминных и витаминов доступны без рецепта по очень доступным ценам.'
                    : 'Major nationwide pharmacy chains. Most everyday medicines, allergy relief, and antibiotics are available over the counter at low prices.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. Компактный конвертер валют */}
      <CurrencyConverter />

    </div>
  );
};
