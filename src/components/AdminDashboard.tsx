import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type {
  ClientFolderCategory
} from '../types';
import {
  Settings,
  CheckCircle2,
  FolderPlus,
  FolderCheck,
  Archive,
  Eye,
  RotateCcw,
  FileText,
  Calendar
} from 'lucide-react';
import { AdminScheduleView } from './AdminScheduleView';
import { AdminTravelItineraryBuilder } from './AdminTravelItineraryBuilder';
import { AdminRelocationManager } from './AdminRelocationManager';

export const AdminDashboard: React.FC = () => {
  const {
    adminClients,
    moveClientCategory,
    consultationBookings,
    language
  } = useApp();

  const [adminSection, setAdminSection] = useState<'relocation_clients' | 'schedule_calls'>('relocation_clients');
  const [activeFolder, setActiveFolder] = useState<ClientFolderCategory>('active');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Filter clients by active folder
  const currentFolderClients = adminClients.filter((c) => c.category === activeFolder);

  // If a client is selected, get their record
  const selectedClient =
    adminClients.find((c) => c.id === selectedClientId) || currentFolderClients[0] || null;

  // Counts for folder badges
  const newCount = adminClients.filter((c) => c.category === 'new').length;
  const activeCount = adminClients.filter((c) => c.category === 'active').length;
  const completedCount = adminClients.filter((c) => c.category === 'completed').length;

  return (
    <section style={{ padding: '3rem 0 5rem 0', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Top Header */}
        <div className="glass-card glass-card-terracotta" style={{ marginBottom: '2rem', padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge badge-terracotta" style={{ marginBottom: '0.4rem' }}>
                <Settings size={14} /> {language === 'ru' ? 'Кабинет основателя • VietReloc' : 'Founder Workspace • VietReloc'}
              </div>
              <h1 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {language === 'ru' ? 'Управление клиентами и объектами' : 'Client Projects & Housing CMS'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
                {language === 'ru'
                  ? 'Здесь вы наполняете кабинет каждого клиента реальными проверенными квартирами, тарифами EVN и заметками. Данные появляются у клиента только после нажатия «Опубликовать».'
                  : 'Manage client questionnaires, vetted housing, EVN rates, and notes. Client sees updates only after you click "Publish".'}
              </p>
            </div>

            {savedNotice && (
              <div className="badge badge-emerald" style={{ padding: '0.65rem 1.1rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} /> {savedNotice}
              </div>
            )}
          </div>

          {/* Top Section Nav Switcher */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setAdminSection('relocation_clients')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: adminSection === 'relocation_clients' ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                background: adminSection === 'relocation_clients' ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                color: adminSection === 'relocation_clients' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
                boxShadow: adminSection === 'relocation_clients' ? '0 4px 12px rgba(194,94,32,0.12)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={16} />
              <span>{language === 'ru' ? 'Клиенты и квартиры (CMS)' : 'Client Projects & CMS'}</span>
              <span style={{
                background: adminSection === 'relocation_clients' ? 'var(--accent-terracotta)' : '#9CA3AF',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '1px 7px',
                borderRadius: '9999px'
              }}>
                {adminClients.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSection('schedule_calls')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: adminSection === 'schedule_calls' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                background: adminSection === 'schedule_calls' ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                color: adminSection === 'schedule_calls' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                boxShadow: adminSection === 'schedule_calls' ? '0 4px 12px rgba(15,118,110,0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Calendar size={16} />
              <span>{language === 'ru' ? 'Расписание и звонки ($50)' : 'Schedule & Calls ($50)'}</span>
              {consultationBookings.filter(b => b.status === 'confirmed').length > 0 && (
                <span style={{
                  background: 'var(--accent-emerald)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '1px 7px',
                  borderRadius: '9999px'
                }}>
                  {consultationBookings.filter(b => b.status === 'confirmed').length}
                </span>
              )}
            </button>
          </div>
        </div>

        {adminSection === 'schedule_calls' ? (
          <AdminScheduleView />
        ) : (
          <>
            {/* Folders Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => { setActiveFolder('active'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'active' ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'active' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'active' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'active' ? '0 4px 12px rgba(194,94,32,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <FolderCheck size={18} />
            <span>{language === 'ru' ? 'Активные клиенты' : 'Active Clients'}</span>
            <span style={{
              background: activeFolder === 'active' ? 'var(--accent-terracotta)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {activeCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveFolder('new'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'new' ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'new' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'new' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'new' ? '0 4px 12px rgba(15,118,110,0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <FolderPlus size={18} />
            <span>{language === 'ru' ? 'Новые заявки' : 'New Inquiries'}</span>
            <span style={{
              background: activeFolder === 'new' ? 'var(--accent-emerald)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {newCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveFolder('completed'); setSelectedClientId(null); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFolder === 'completed' ? '2px solid var(--text-main)' : '1px solid var(--border-subtle)',
              background: activeFolder === 'completed' ? '#FFFFFF' : 'var(--bg-panel)',
              color: activeFolder === 'completed' ? 'var(--text-main)' : 'var(--text-muted)',
              boxShadow: activeFolder === 'completed' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Archive size={18} />
            <span>{language === 'ru' ? 'Архив / Завершенные' : 'Archive'}</span>
            <span style={{
              background: activeFolder === 'completed' ? 'var(--text-main)' : '#D1D5DB',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {completedCount}
            </span>
          </button>
        </div>

        {/* Empty Folder Notice */}
        {currentFolderClients.length === 0 && (
          <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {language === 'ru' ? 'В этой папке сейчас нет клиентов' : 'No clients in this folder right now'}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {language === 'ru'
                ? 'Новые клиенты появятся здесь сразу после заполнения анкеты и оплаты.'
                : 'New client submissions will appear here automatically upon questionnaire payment.'}
            </p>
          </div>
        )}

        {/* 1. FOLDER: АКТИВНЫЕ КЛИЕНТЫ (с Quality Gate и CMS жилья) */}
        {activeFolder === 'active' && currentFolderClients.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.75rem', alignItems: 'start' }}>
            
            {/* Left: Active Clients List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'Выберите клиента:' : 'Select Client:'}
              </div>

              {currentFolderClients.map((client) => {
                const isSelected = selectedClient?.id === client.id;
                const isTravel = client.tierId === 'tier2';
                const countBadge = isTravel
                  ? `${client.travelDays?.length || 0} ${language === 'ru' ? 'дней' : 'days'}`
                  : `${client.roadmapTasks?.length || 12} ${language === 'ru' ? 'шагов' : 'steps'}`;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className="glass-card"
                    style={{
                      padding: '1.15rem 1.25rem',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                      background: isSelected ? '#FFFFFF' : 'var(--bg-panel)',
                      boxShadow: isSelected ? '0 4px 14px rgba(194,94,32,0.12)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{client.clientName}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>${client.priceUSD}</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {client.email}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        {client.recommendedCityId === 'danang' ? 'Дананг' : client.recommendedCityId === 'nhatrang' ? 'Нячанг' : client.recommendedCityId || (language === 'ru' ? 'Маршрут' : 'Itinerary')}
                      </span>
                      <span style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                        {countBadge}
                      </span>
                    </div>

                    {client.hasUnpublishedChanges && (
                      <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                        &bull; {language === 'ru' ? 'Есть неопубликованные правки' : 'Unpublished changes'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Client CMS Workspace */}
            {selectedClient && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Client Profile Header Bar */}
                <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {language === 'ru' ? 'Активный проект:' : 'Active Project:'}
                    </div>
                    <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                      {selectedClient.clientName} &bull; {selectedClient.serviceName[language]}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsQuestionnaireModalOpen(true)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
                    >
                      <FileText size={15} /> {language === 'ru' ? 'Анкета' : 'Intake'}
                    </button>

                    <button
                      type="button"
                      onClick={() => moveClientCategory(selectedClient.id, 'completed')}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem', color: 'var(--text-main)' }}
                    >
                      <Archive size={15} /> {language === 'ru' ? 'В архив' : 'Archive'}
                    </button>
                  </div>
                </div>

                {selectedClient.tierId === 'tier2' ? (
                  <AdminTravelItineraryBuilder
                    selectedClient={selectedClient}
                    onPublishSuccess={() => {
                      setSavedNotice(language === 'ru' ? 'Маршрут успешно опубликован в кабинете клиента!' : 'Itinerary published live to client!');
                      setTimeout(() => setSavedNotice(null), 3500);
                    }}
                  />
                ) : (
                  <AdminRelocationManager
                    selectedClient={selectedClient}
                    onPublishSuccess={() => {
                      setSavedNotice(language === 'ru' ? 'Обновления успешно опубликованы в кабинете клиента!' : 'Updates published live to client!');
                      setTimeout(() => setSavedNotice(null), 3500);
                    }}
                  />
                )}

              </div>
            )}

          </div>
        )}

        {/* 2. FOLDER: НОВЫЕ КЛИЕНТЫ */}
        {activeFolder === 'new' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Клиенты, которые только что оплатили тариф и ждут подготовку маршрута и сопровождение (SLA 48 часов):'
                : 'Clients who just paid and are awaiting roadmap preparation and concierge onboarding (48h SLA):'}
            </div>

            {currentFolderClients.map((client) => (
              <div
                key={client.id}
                className="glass-card glass-card-emerald"
                style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {client.clientName}
                    </h3>
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      ${client.priceUSD} &bull; {client.serviceName[language]}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                      Оплачено через {client.paymentMethod || 'шлюз'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span><strong>Email:</strong> {client.email}</span>
                    <span><strong>Страна:</strong> {client.questionnaire.country}</span>
                    <span><strong>Приезд:</strong> {client.questionnaire.travelDates} ({client.questionnaire.duration})</span>
                    <span><strong>Бюджет:</strong> ${client.questionnaire.monthlyBudgetUSD}/мес</span>
                  </div>

                  <div style={{ marginTop: '0.65rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                    <strong>Приоритеты:</strong> {client.questionnaire.priorities || 'Не указаны'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setSelectedClientId(client.id); setIsQuestionnaireModalOpen(true); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                  >
                    <Eye size={15} /> {language === 'ru' ? 'Смотреть анкету' : 'View Full Intake'}
                  </button>

                  <button
                    onClick={() => {
                      moveClientCategory(client.id, 'active');
                      setSelectedClientId(client.id);
                      setActiveFolder('active');
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1.25rem' }}
                  >
                    <FolderCheck size={16} /> {language === 'ru' ? 'Взять в работу → В активные' : 'Take to Active'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. FOLDER: ЗАВЕРШЕННЫЕ КЛИЕНТЫ */}
        {activeFolder === 'completed' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Архив клиентов, которые успешно завершили поездку или релокацию:'
                : 'Archive of clients who completed their journey:'}
            </div>

            {currentFolderClients.map((client) => (
              <div
                key={client.id}
                className="glass-card"
                style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', background: '#FAF9F6' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                      {client.clientName}
                    </h3>
                    <span className="badge badge-subtle" style={{ fontSize: '0.75rem' }}>
                      {language === 'ru' ? 'Проект завершен' : 'Completed'} &bull; {client.serviceName[language]}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span><strong>Email:</strong> {client.email}</span>
                    <span><strong>Город:</strong> {client.recommendedCityId === 'danang' ? 'Дананг' : client.recommendedCityId}</span>
                    <span><strong>Дата:</strong> {client.updatedAt}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setSelectedClientId(client.id); setIsQuestionnaireModalOpen(true); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                  >
                    <Eye size={15} /> {language === 'ru' ? 'Анкета' : 'Intake'}
                  </button>

                  <button
                    onClick={() => {
                      moveClientCategory(client.id, 'active');
                      setSelectedClientId(client.id);
                      setActiveFolder('active');
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem', color: 'var(--accent-terracotta)' }}
                  >
                    <RotateCcw size={15} /> {language === 'ru' ? 'Вернуть в активные' : 'Reactivate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
          </>
        )}

        {/* Modal: Full Questionnaire Details Review */}
        {isQuestionnaireModalOpen && selectedClient && (
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
            zIndex: 1100,
            padding: '1.5rem'
          }}>
            <div className="glass-card" style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#FFFFFF',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              padding: '2.5rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div>
                  <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
                    {selectedClient.serviceName[language]} (${selectedClient.priceUSD})
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    {language === 'ru' ? 'Анкета клиента:' : 'Client Intake:'} {selectedClient.clientName}
                  </h2>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {selectedClient.email} &bull; {selectedClient.createdAt}
                  </div>
                </div>

                <button
                  onClick={() => setIsQuestionnaireModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                >
                  {language === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>

              {/* Detailed Questionnaire Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Страна проживания</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.country || 'Не указана'}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Даты и длительность</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.travelDates} ({selectedClient.questionnaire.duration})</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Бюджет в месяц</div>
                  <strong style={{ color: 'var(--accent-emerald)' }}>${selectedClient.questionnaire.monthlyBudgetUSD} USD</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Количество человек</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.travelersCount}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Формат работы и специализация</div>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedClient.questionnaire.workSituation}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Пожелания по жилью</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.accommodationType}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Требования к интернету / коворкингам</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.remoteWorkNeeds}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Главные приоритеты</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.priorities}</div>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Вопросы и беспокойства</div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{selectedClient.questionnaire.concerns}</div>
                </div>
              </div>

              {/* Action in Modal */}
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setIsQuestionnaireModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
                >
                  {language === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
