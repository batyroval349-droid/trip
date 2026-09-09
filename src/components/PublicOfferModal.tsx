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
                  1.1. <strong>Исполнитель</strong> (сервис <strong>VietReloc</strong>) обязуется оказать Заказчику <strong>дистанционные информационно-консультационные услуги</strong> по персональному планированию поездок, подготовке рекомендаций по релокации, анализу инфраструктуры, моделированию бюджета, предоставлению контактов проверенных партнеров-риелторов и дистанционному аудиту условий договоров аренды жилья во Вьетнаме на условиях выбранного тарифа.
                </p>
                <p>
                  1.2. <strong>Статус Исполнителя и 100% дистанционный формат:</strong> Исполнитель оказывает <strong>исключительно дистанционные консультационные и информационно-аналитические услуги</strong>. Исполнитель <strong>НЕ осуществляет физических выездов и очных осмотров помещений</strong>, <strong>НЕ проводит инструментальных замеров параметров сети или уровня шума на объектах</strong>, НЕ является агентством недвижимости, НЕ является туроператором/турагентом, НЕ является стороной договора найма жилья и НЕ выступает поручителем или гарантом третьих лиц.
                </p>
                <p>
                  1.3. Все варианты жилья формируются на основе предложений от независимых местных партнеров-риелторов, а очные показы в Дананге (в рамках тарифа VIP) организуются и проводятся непосредственно местными партнерами-риелторами.
                </p>
                <p>
                  1.4. <strong>Заказчик:</strong> дееспособное физическое лицо, осуществившее акцепт оферты путем оплаты услуг на сайте.
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
                  <li>Оплата выбранного пакета услуг или дополнительной опции (картой РФ, СБП, зарубежной картой, криптовалютой USDT или VietQR);</li>
                  <li>Направление заполненной анкеты на проведение персонального исследования.</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}>
                  2.2. С момента акцепта договор считается заключенным в простой письменной форме в электронном виде и имеет равную юридическую силу с подписанным бумажным документом.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  3. Тарифы, порядок оказания услуг и политика возвратов (Refund Policy)
                </h3>
                <p>
                  Стоимость и объем услуг определяются выбранным Заказчиком тарифом:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', margin: '0.85rem 0' }}>
                  
                  {/* Tariff 1: Consultation */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.1. Тариф «Стратегическая консультация 60 минут» ($50 USD)
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Включает: 60-минутную персональную видеовстречу (Zoom / Google Meet) с основателем, анализ целесообразности поездки или переезда под задачи Заказчика, обзор подходящих городов и сезонов, а также письменное резюме рекомендаций после звонка.
                    </p>
                    <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem' }}>
                      &bull; Сдача-приемка: Услуга считается оказанной в полном объеме с момента фактического завершения видеовстречи. В случае неявки Заказчика без предупреждения минимум за 12 часов услуга считается оказанной. Перенос возможен при обращении не позднее чем за 12 часов.
                    </div>
                  </div>

                  {/* Tariff 2: Trip Planning */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.2. Тариф «Персональное планирование поездки» ($290 USD)
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Включает: составление авторского маршрута путешествия на 1–30 дней под даты и бюджет Заказчика; подбор городов и локаций; рекомендации по покупке SIM/eSIM и адреса официальных точек; список экстренных служб; 1 бесплатную корректировку маршрута; дистанционную чат-поддержку в WhatsApp на весь период путешествия.
                    </p>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div><strong>Этап 1 ($80 USD — невозвратный сбор):</strong> Персональный аудит анкеты Заказчика, расчет логистики и составление базового каркаса маршрута. Сумма $80 признается фактически понесенными расходами Исполнителя с момента взятия анкеты в работу и возврату не подлежит.</div>
                      <div><strong>Этап 2:</strong> Передача Заказчику готового электронного маршрута и памяток. Этап считается выполненным с момента отправки материалов.</div>
                      <div><strong>Этап 3:</strong> Дистанционная чат-поддержка в WhatsApp на согласованный срок путешествия.</div>
                    </div>
                  </div>

                  {/* Tariff 3: Relocation Planning */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.3. Тариф «Планирование релокации во Вьетнам» ($490 USD)
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Комплексный дистанционный пакет подготовки к длительному проживанию или зимовке. Услуги являются сложными составными и оказываются в 3 последовательных этапа:
                    </p>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div>
                        <strong>Этап 1 (Стоимость: $100 USD):</strong> Персональный аудит анкеты Заказчика, анализ целей, подбор оптимального города и районов, расчет модели бюджета в личном кабинете.
                        <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem', marginTop: '2px' }}>
                          &bull; Признается фактически понесенными расходами Исполнителя с момента взятия анкеты в работу и возврату не подлежит.
                        </div>
                      </div>
                      <div>
                        <strong>Этап 2:</strong> Предоставление Заказчику шорт-листа вариантов жилья из базы проверенных партнеров-риелторов; дистанционный аудит предложенного договора аренды (проверка условий возврата депозита, фиксация тарифов ЖКХ, выявление скрытых платежей); предоставление чек-листа и памятки для самостоятельной проверки жилья при заселении (инструкция по фотофиксации счетчиков и мебели).
                      </div>
                      <div>
                        <strong>Этап 3:</strong> Предоставление персональной дорожной карты переезда, чек-листов адаптации, шаблона обращения к владельцу для регистрации в полиции (tạm trú) и дистанционная консультационная поддержка в чате сроком до 30 календарных дней.
                      </div>
                    </div>
                  </div>

                  {/* Tariff 4: VIP Concierge */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.4. Тариф «VIP-сопровождение релокации» ($890 USD)
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Включает полный объем тарифа «Планирование релокации», а также: приоритетную связь в WhatsApp/Telegram; организацию очных показов выбранного жилья через проверенного местного партнёра-риелтора; расширенную дистанционную поддержку и помощь в решении срочных бытовых вопросов первого месяца; 1 ознакомительную онлайн-сессию с дипломированным психологом и сексологом (бесплатно) + скидку на 2-ю сессию напрямую у специалиста.
                    </p>
                    <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem' }}>
                      &bull; При отказе Заказчика до начала показов сумма невозвратных фактически понесенных расходов составляет $150 USD (анализ анкеты и первичное бронирование партнеров).
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.5. Дополнительные разовые услуги (Add-ons)
                    </div>
                    <p style={{ margin: '0.35rem 0 0.35rem 0', fontSize: '0.85rem' }}>
                      Аудит договора аренды ($10), Консультация по школам и детсадам ($15), Подбор коворкинга/района под удаленку ($15), Гид по банковскому счёту/карте и криптокошельку ($20), Мини-гайд по базовому вьетнамскому ($5).
                    </p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Оказываются дистанционно в виде передачи аналитических материалов или онлайн-консультаций и считаются оказанными в полном объеме с момента передачи материалов Заказчику.
                    </div>
                  </div>

                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  3.6. <strong>Порядок возврата средств:</strong> Заказчик вправе отказаться от исполнения договора в любое время при условии оплаты Исполнителю фактически понесенных им расходов (ст. 32 Закона РФ «О защите прав потребителей», ст. 782 ГК РФ). Суммы фактически понесенных расходов по этапам указаны выше и удерживаются при расчете возврата.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  4. Разграничение ответственности и гарантии
                </h3>
                <p>
                  4.1. Исполнитель гарантирует добросовестное проведение дистанционного анализа и предоставление объективной информации по инфраструктуре и районам на дату проверки.
                </p>
                <p>
                  4.2. <strong>Самостоятельное решение Заказчика:</strong> Заказчик подтверждает понимание того, что Исполнитель не осуществляет выездных физических осмотров квартир и не проводит инструментальных замеров. Окончательное решение о заключении договора найма конкретного жилья, переводе гарантийного депозита арендодателю и подписании документов Заказчик принимает самостоятельно. Исполнитель не выступает финансовым гарантом третьих лиц.
                </p>
                <p>
                  4.3. <strong>Действия третьих лиц и форс-мажор:</strong> Исполнитель не несет ответственности за:
                </p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>Возникновение строительного шума третьих лиц на соседних земельных участках после заселения Заказчика;</li>
                  <li>Аварии на магистральных оптоволоконных кабелях (AAG, APG), сбои в работе провайдеров связи или отключения энергии компанией EVN;</li>
                  <li>Изменение миграционного и визового законодательства Социалистической Республики Вьетнам государственными органами;</li>
                  <li>Действия арендодателей по удержанию депозита при нарушении Заказчиком условий договора найма или правил проживания;</li>
                  <li>Качество консультаций сторонних профильных специалистов (психолога, партнерских риелторов), действующими как самостоятельные лица.</li>
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
                  1. Subject Matter & 100% Remote Advisory Status
                </h3>
                <p>
                  1.1. The Provider (<strong>VietReloc</strong>) provides remote advisory, personalized travel itineraries, infrastructure intelligence, relocation roadmaps, and remote lease agreement due diligence for Vietnam under the terms of the selected tier.
                </p>
                <p>
                  1.2. <strong>Regulatory Clarity & 100% Remote Format:</strong> The Provider acts solely as an independent remote information and lifestyle consultant. The Provider <strong>does NOT conduct physical on-site apartment inspections, does NOT measure technical internet speeds or acoustic decibels on location</strong>, is NOT a real estate brokerage, NOT a licensed travel agency or tour operator, and NOT a party to any lease agreement.
                </p>
                <p>
                  1.3. Housing options are curated from vetted independent local partner-realtors, and on-site viewings in Da Nang (under the VIP plan) are scheduled and conducted directly by independent partner-realtors.
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
                  3. Service Packages & Refund Policy
                </h3>
                <p>
                  Scope of services and fee schedule are defined by the selected plan:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', margin: '0.85rem 0' }}>
                  
                  {/* Tier 1 EN */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.1. Strategic Video Call (60 Min) — $50 USD
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Includes: 60-minute 1-on-1 personal video call (Zoom / Google Meet), feasibility assessment tailored to your personal goals, city and season overview, and post-call written recommendations summary.
                    </p>
                    <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem' }}>
                      &bull; Deemed fully completed upon call conclusion. In the event of a client no-show without at least 12 hours advance notice, service is deemed fully delivered.
                    </div>
                  </div>

                  {/* Tier 2 EN */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.2. Personal Trip Planning — $290 USD
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Includes: bespoke 1-30 day travel itinerary tailored to your dates and budget; city selection; SIM/eSIM recommendations; emergency contacts list; 1 complimentary route revision; and direct WhatsApp support during your trip.
                    </p>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div><strong>Stage 1 ($80 USD non-refundable allocation):</strong> Intake research, route architecture, and destination mapping. Deemed fully consumed once research begins.</div>
                      <div><strong>Stage 2:</strong> Delivery of digital itinerary and guide materials.</div>
                      <div><strong>Stage 3:</strong> Remote WhatsApp chat guidance throughout your trip.</div>
                    </div>
                  </div>

                  {/* Tier 3 EN */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.3. Vietnam Relocation Planning — $490 USD
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Comprehensive remote relocation planning delivered in three sequential phases:
                    </p>
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div>
                        <strong>Stage 1 ($100 USD non-refundable allocation):</strong> Intake questionnaire audit, neighborhood matching, and baseline cost calculation in your private client dashboard.
                        <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem', marginTop: '2px' }}>
                          &bull; Deemed fully completed and non-refundable once intake audit commences.
                        </div>
                      </div>
                      <div>
                        <strong>Stage 2:</strong> Shortlist of vetted accommodation options from local partner-realtors; remote lease agreement audit (deposit terms, utility rate locks, hidden fee removal); move-in self-inspection guide for meter & furniture photo-documentation.
                      </div>
                      <div>
                        <strong>Stage 3:</strong> Interactive relocation roadmap, adaptation checklists, police registration (tạm trú) message template, and 30 days of remote chat support.
                      </div>
                    </div>
                  </div>

                  {/* Tier 4 EN */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.4. VIP Relocation Concierge — $890 USD
                    </div>
                    <p style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '0.85rem' }}>
                      Includes everything in Relocation Planning, plus: priority WhatsApp/Telegram communication; on-site housing viewing accompaniment via our partner-realtor; 1 month of urgent arrival settling assistance; and 1 free orientation session with a certified psychologist & sexologist for relocation adaptation (+ discount on 2nd session).
                    </p>
                    <div style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.82rem' }}>
                      &bull; In case of cancellation prior to viewings and roadmap delivery, the non-refundable intake allocation is $150 USD.
                    </div>
                  </div>

                  {/* Add-ons EN */}
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                      3.5. Standalone Add-on Services
                    </div>
                    <p style={{ margin: '0.35rem 0 0.35rem 0', fontSize: '0.85rem' }}>
                      Lease Agreement Audit ($10), Schools & Kindergartens Consultation ($15), Coworking & District Matching ($15), Banking & Crypto Guide ($20), Basic Vietnamese Mini-Guide ($5).
                    </p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Delivered digitally as informational materials or remote consultation. Deemed fully delivered upon material dispatch.
                    </div>
                  </div>

                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  3.6. <strong>Refund Policy:</strong> The Client may cancel services at any time subject to deduction of actual costs incurred by the Provider as detailed in the non-refundable stage allocations above.
                </p>
              </section>

              <section>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  4. Limitation of Liability & Third-Party Actions
                </h3>
                <p>
                  4.1. The Client acknowledges that the Provider conducts remote advisory and does NOT perform on-site technical testing or field inspections.
                </p>
                <p>
                  4.2. The Client exercises sole independent discretion in entering into rental agreements, signing contracts, and transferring security deposits. The Provider does not act as escrow agent or guarantor for third-party landlords.
                </p>
                <p>
                  4.3. The Provider shall not be held liable for sudden third-party construction noise, regional power disruptions, undersea fiber cable incidents, landlord security deposit disputes, or sovereign legislative changes by the government of Vietnam.
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
