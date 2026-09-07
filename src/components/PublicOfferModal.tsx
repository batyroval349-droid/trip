import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X, FileText, Send } from 'lucide-react';

export const PublicOfferModal: React.FC = () => {
  const { isOfferModalOpen, setIsOfferModalOpen, language } = useApp();
  const [activeTab, setActiveTab] = useState<'ru' | 'en'>(language === 'en' ? 'en' : 'ru');

  if (!isOfferModalOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(19, 37, 34, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1200,
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAF8F5',
        boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
        border: '1px solid var(--border-emerald)',
        position: 'relative',
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--accent-emerald-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)'
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>
                {activeTab === 'ru' ? 'Публичная оферта на оказание услуг' : 'Public Offer & Terms of Service'}
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                VietReloc &bull; {activeTab === 'ru' ? 'Редакция от 01 сентября 2026 г.' : 'Effective September 1, 2026'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language Switcher inside modal */}
            <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: '9999px', padding: '2px', border: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={() => setActiveTab('ru')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === 'ru' ? 'var(--accent-emerald)' : 'transparent',
                  color: activeTab === 'ru' ? '#FFFFFF' : 'var(--text-muted)'
                }}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === 'en' ? 'var(--accent-emerald)' : 'transparent',
                  color: activeTab === 'en' ? '#FFFFFF' : 'var(--text-muted)'
                }}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOfferModalOpen(false)}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: 'var(--text-main)'
        }}>

          {activeTab === 'ru' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Important Highlight Banner */}
              <div style={{
                background: 'rgba(15, 118, 110, 0.08)',
                border: '1px solid var(--border-emerald)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                  <strong>Юридический статус:</strong> Настоящий документ является официальной публичной офертой сервиса <strong>VietReloc</strong> (в соответствии со ст. 435 и 437 Гражданского кодекса РФ, а также нормами международного права об электронной коммерции). Оплата любого тарифа или выставление отметки о согласии является полным и безоговорочным акцептом условий настоящего Договора.
                </div>
              </div>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  1. Термины, предмет договора и статус Исполнителя
                </h3>
                <p>
                  1.1. <strong>Исполнитель</strong> (сервис <strong>VietReloc</strong>) обязуется оказать Заказчику дистанционные информационно-консультационные услуги по анализу инфраструктуры, подготовке персональных рекомендаций, расчету бюджета и аудиту вариантов жилья во Вьетнаме на условиях выбранного тарифа.
                </p>
                <p>
                  1.2. <strong>Статус Исполнителя:</strong> Исполнитель оказывает <strong>исключительно консультационные и информационно-аналитические услуги</strong>. Исполнитель НЕ является агентством недвижимости, НЕ является лицензированным туроператором или турагентом, НЕ является стороной договора найма жилья и НЕ осуществляет иммиграционное юридическое представительство.
                </p>
                <p>
                  1.3. <strong>Заказчик:</strong> дееспособное физическое лицо, осуществившее акцепт оферты путем оплаты услуг на сайте.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  2. Порядок акцепта и заключение договора
                </h3>
                <p>
                  2.1. Акцептом настоящей оферты признается совершение Заказчиком любого из следующих конклюдентных действий:
                </p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>Проставление отметки «Я принимаю условия Публичной оферты» в веб-интерфейсе чекаута;</li>
                  <li>Оплата выбранного пакета услуг (картой РФ, СБП, зарубежной картой, криптовалютой USDT или VietQR);</li>
                  <li>Направление заполненной анкеты на проведение персонального исследования.</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}>
                  2.2. С момента акцепта договор считается заключенным в простой письменной форме в электронном виде и имеет равную юридическую силу с подписанным бумажным документом.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  3. Этапы оказания услуг и политика возвратов (Refund Policy)
                </h3>
                <p>
                  3.1. Услуги по тарифам «Планирование релокации» ($490) и «VIP Консьерж» ($890) являются сложными составными и оказываются в три последовательных этапа:
                </p>
                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '0.75rem 0' }}>
                  <div>
                    <strong>Этап 1 (Стоимость: $100 USD):</strong> Персональный аудит анкеты Заказчика, анализ целей, подбор оптимального города и районов, расчет стартового бюджета.
                    <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem', marginTop: '2px' }}>
                      &bull; Данный этап считается выполненным в полном объеме с момента взятия анкеты в работу и начала исследования. Сумма $100 признается фактически понесенными расходами Исполнителя и возврату не подлежит.
                    </div>
                  </div>
                  <div>
                    <strong>Этап 2:</strong> Полевой аудит предложений на рынке жилья по 5 стандартам Due Diligence (проверка тарифа EVN, аудит шума и строек, замер скорости оптоволокна, юридическая проверка условий залога) и публикация вариантов в кабинете Заказчика.
                  </div>
                  <div>
                    <strong>Этап 3:</strong> Предоставление регламентов заселения, чек-листов адаптации и дистанционная чат-поддержка Заказчика сроком до 30 календарных дней.
                  </div>
                </div>
                <p>
                  3.2. По тарифу «Стратегическая консультация 60 минут» ($50) услуга считается оказанной в полном объеме с момента проведения онлайн-встречи. В случае неявки Заказчика без предупреждения минимум за 12 часов услуга считается оказанной.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  4. Разграничение ответственности и гарантии
                </h3>
                <p>
                  4.1. Исполнитель гарантирует добросовестное проведение аудита и предоставление объективной информации по объектам и районам на дату проверки.
                </p>
                <p>
                  4.2. <strong>Самостоятельное решение Заказчика:</strong> Окончательное решение о заключении договора найма конкретного жилья, переводе гарантийного депозита арендодателю и подписании документов Заказчик принимает самостоятельно. Исполнитель не выступает финансовым гарантом третьих лиц.
                </p>
                <p>
                  4.3. <strong>Действия третьих лиц и форс-мажор:</strong> Исполнитель не несет ответственности за:
                </p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>Внезапное появление строительного шума третьих лиц на соседних земельных участках после заселения;</li>
                  <li>Аварии на магистральных оптоволоконных кабелях (AAG, APG) или плановые отключения энергии компанией EVN;</li>
                  <li>Изменение миграционного и визового законодательства Социалистической Республики Вьетнам государственными органами;</li>
                  <li>Действия арендодателей по удержанию депозита при нарушении Заказчиком условий договора найма или правил проживания.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  5. Конфиденциальность и персональные данные
                </h3>
                <p>
                  5.1. Персональные данные Заказчика (ФИО, контакты, даты поездки) используются исключительно в целях формирования рекомендаций и не передаются третьим лицам без согласия, за исключением согласованной передачи контактов проверенным партнерам-риелторам для организации просмотров.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  6. Досудебный порядок и контакты Исполнителя
                </h3>
                <p>
                  6.1. Все возникающие разногласия Стороны обязуются разрешать путем переговоров. Претензии направляются официальному представителю сервиса в мессенджер Telegram: <strong>@Likqwerty</strong> или на email.
                </p>
                <p>
                  6.2. Срок рассмотрения письменной претензии Исполнителем составляет до 10 (десяти) рабочих дней.
                </p>
              </section>

            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{
                background: 'rgba(15, 118, 110, 0.08)',
                border: '1px solid var(--border-emerald)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                  <strong>Legal Notice:</strong> This document constitutes the legally binding Public Offer and Terms of Service of <strong>VietReloc</strong> under international electronic commerce conventions. Ordering any package or checking the agreement box constitutes full and unconditional acceptance.
                </div>
              </div>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  1. Subject Matter & Independent Contractor Status
                </h3>
                <p>
                  1.1. The Provider (<strong>VietReloc</strong>) provides remote advisory, infrastructure intelligence, relocation roadmaps, and accommodation due diligence auditing for Vietnam.
                </p>
                <p>
                  1.2. <strong>Regulatory Clarity:</strong> The Provider acts solely as an independent information and lifestyle consultant. The Provider is NOT a real estate brokerage, NOT a licensed travel agency or tour operator, NOT an immigration law firm, and NOT a party to any lease agreement.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  2. Acceptance & Electronic Execution
                </h3>
                <p>
                  2.1. Electronic consent given via payment completion or checking "I accept the Public Offer" constitutes legally enforceable mutual agreement with the same legal effect as a physically signed agreement.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  3. Service Delivery Stages & Refund Policy
                </h3>
                <p>
                  3.1. Relocation Planning ($490) and VIP Concierge ($890) services are delivered in three separate phases:
                </p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>Stage 1 ($100 USD non-refundable allocation):</strong> Intake profile analysis, neighborhood matching, and baseline cost calculation. This stage begins immediately upon order placement and is deemed fully delivered once research commences.</li>
                  <li><strong>Stage 2:</strong> Due diligence vetting of housing candidates (EVN state rates, noise audit, fiber speed tests, deposit verification).</li>
                  <li><strong>Stage 3:</strong> Arrival checklists, move-in protocols, and 30 days of direct chat support.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  4. Limitation of Liability & Third-Party Actions
                </h3>
                <p>
                  4.1. The Client exercises sole independent discretion in entering into rental agreements, signing contracts, and transferring security deposits. The Provider does not act as escrow agent or guarantor for third-party landlords.
                </p>
                <p>
                  4.2. The Provider shall not be held liable for sudden third-party construction noise, regional power disruptions, undersea fiber cable incidents, or sovereign legislative changes by the government of Vietnam.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  5. Dispute Resolution & Contact
                </h3>
                <p>
                  5.1. All inquiries or disputes shall be submitted directly to the founder via Telegram: <strong>@Likqwerty</strong>. The response period is up to 10 business days.
                </p>
              </section>

            </div>
          )}

        </div>

        {/* Footer actions */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border-subtle)',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Send size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>{activeTab === 'ru' ? 'Связь с основателем по юридическим вопросам:' : 'Founder legal contact:'} <strong>@Likqwerty</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setIsOfferModalOpen(false)}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.88rem' }}
          >
            {activeTab === 'ru' ? 'Понятно, закрыть оферту' : 'Close Agreement'}
          </button>
        </div>

      </div>
    </div>
  );
};
