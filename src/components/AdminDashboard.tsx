import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ClientFolderCategory, ProjectStatus } from '../types';
import {
  Settings,
  Save,
  CheckCircle2,
  FolderPlus,
  FolderCheck,
  Archive,
  Eye,
  Sparkles,
  RotateCcw,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminClients,
    moveClientCategory,
    updateClientRecord,
    language
  } = useApp();

  const [activeFolder, setActiveFolder] = useState<ClientFolderCategory>('new');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Filter clients by active folder
  const currentFolderClients = adminClients.filter(c => c.category === activeFolder);

  // If a client is selected, get their record
  const selectedClient = adminClients.find(c => c.id === selectedClientId) || currentFolderClients[0] || null;

  // Local editing state for active client plan
  const [editStatus, setEditStatus] = useState<ProjectStatus>(selectedClient?.status || 'research_in_progress');
  const [editCity, setEditCity] = useState<string>(selectedClient?.recommendedCityId || 'danang');
  const [editWhyRu, setEditWhyRu] = useState<string>(selectedClient?.recommendedCityWhy.ru || '');
  const [editNoteRu, setEditNoteRu] = useState<string>(selectedClient?.overallFounderNote.ru || '');
  const [editBudget, setEditBudget] = useState(selectedClient?.userCurrentBudget || { accommodation: 500, food: 400, coworking: 100, transportation: 80, entertainment: 150 });

  // Sync edit state when selected client changes
  React.useEffect(() => {
    if (selectedClient) {
      setEditStatus(selectedClient.status);
      setEditCity(selectedClient.recommendedCityId);
      setEditWhyRu(selectedClient.recommendedCityWhy.ru);
      setEditNoteRu(selectedClient.overallFounderNote.ru);
      setEditBudget(selectedClient.userCurrentBudget);
    }
  }, [selectedClient?.id]);

  const handleSaveClientPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    updateClientRecord(selectedClient.id, {
      status: editStatus,
      recommendedCityId: editCity,
      recommendedCityWhy: {
        en: selectedClient.recommendedCityWhy.en,
        ru: editWhyRu
      },
      overallFounderNote: {
        en: selectedClient.overallFounderNote.en,
        ru: editNoteRu
      },
      userCurrentBudget: editBudget
    });

    setSavedNotice(language === 'ru' ? 'План клиента успешно сохранен и обновлен в его кабинете!' : 'Client plan successfully saved and updated in their workspace!');
    setTimeout(() => setSavedNotice(null), 3500);
  };

  // Counts for folder badges
  const newCount = adminClients.filter(c => c.category === 'new').length;
  const activeCount = adminClients.filter(c => c.category === 'active').length;
  const completedCount = adminClients.filter(c => c.category === 'completed').length;

  return (
    <section style={{ padding: '3rem 0 5rem 0', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* Top Header */}
        <div className="glass-card glass-card-terracotta" style={{ marginBottom: '2rem', padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge badge-terracotta" style={{ marginBottom: '0.4rem' }}>
                <Settings size={14} /> {language === 'ru' ? 'Кабинет основателя • Indochine Remote' : 'Founder Workspace • Indochine Remote'}
              </div>
              <h1 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {language === 'ru' ? 'Управление клиентами и проектами' : 'Client Projects & Workflow Management'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
                {language === 'ru'
                  ? 'Все анкеты клиентов отсортированы по статусу работы: новые заявки, активные в процессе и завершенные.'
                  : 'All client questionnaires and plans sorted by stage: new inquiries, active in progress, and completed.'}
              </p>
            </div>

            {savedNotice && (
              <div className="badge badge-emerald" style={{ padding: '0.65rem 1.1rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} /> {savedNotice}
              </div>
            )}
          </div>
        </div>

        {/* Folders Navigation Bar (Папочки клиентов) */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
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
            <span>{language === 'ru' ? 'Новые клиенты' : 'New Inquiries'}</span>
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
            <span>{language === 'ru' ? 'Завершенные клиенты' : 'Completed / Archived'}</span>
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

        {/* 1. FOLDER: НОВЫЕ КЛИЕНТЫ */}
        {activeFolder === 'new' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Клиенты, которые только что заполнили анкету и оплатили тариф. Ознакомьтесь с анкетой и переведите проект в работу:'
                : 'Clients who just submitted their questionnaire and paid. Review their intake and take into active work:'}
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
                    <Eye size={15} /> {language === 'ru' ? 'Смотреть всю анкету' : 'View Full Intake'}
                  </button>

                  <button
                    onClick={() => moveClientCategory(client.id, 'active')}
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

        {/* 2. FOLDER: АКТИВНЫЕ КЛИЕНТЫ (с панелью корректировки плана) */}
        {activeFolder === 'active' && currentFolderClients.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '1.75rem', alignItems: 'start' }}>
            
            {/* Left: Active Clients List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'Выберите клиента для настройки плана:' : 'Select Client to Edit Plan:'}
              </div>

              {currentFolderClients.map((client) => {
                const isSelected = selectedClient?.id === client.id;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className="glass-card"
                    style={{
                      padding: '1.25rem',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-subtle)',
                      background: isSelected ? '#FFFFFF' : 'var(--bg-panel)',
                      boxShadow: isSelected ? '0 4px 14px rgba(194,94,32,0.12)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{client.clientName}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>${client.priceUSD}</span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {client.email}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        {client.recommendedCityId === 'danang' ? 'Дананг' : client.recommendedCityId === 'nhatrang' ? 'Нячанг' : client.recommendedCityId}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {client.status === 'plan_ready' ? 'План готов' : client.status === 'research_in_progress' ? 'Исследование' : 'В процессе'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Client Plan Editor & Questionnaire Viewer */}
            {selectedClient && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Client Profile Header Bar */}
                <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {language === 'ru' ? 'Редактирование активного плана:' : 'Editing Active Plan:'}
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                      {selectedClient.clientName} &bull; {selectedClient.serviceName[language]}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsQuestionnaireModalOpen(true)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem' }}
                    >
                      <FileText size={15} /> {language === 'ru' ? 'Анкета клиента' : 'View Intake'}
                    </button>

                    <button
                      type="button"
                      onClick={() => moveClientCategory(selectedClient.id, 'completed')}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', color: 'var(--text-main)' }}
                    >
                      <Archive size={15} /> {language === 'ru' ? 'Завершить проект → В архив' : 'Complete Project'}
                    </button>
                  </div>
                </div>

                {/* Founder Plan Editor Form */}
                <form onSubmit={handleSaveClientPlan} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-terracotta)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                    <Sparkles size={18} />
                    <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: 0 }}>
                      {language === 'ru' ? 'Параметры плана для личного кабинета клиента' : 'Workspace Plan Parameters for Client'}
                    </h3>
                  </div>

                  {/* Status & City Selection */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {language === 'ru' ? 'Статус готовности проекта:' : 'Project Status:'}
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                      >
                        <option value="questionnaire_completed">Анкета получена и оплачена</option>
                        <option value="research_in_progress">Исследование основателем в процессе</option>
                        <option value="plan_ready">План опубликован и готов к просмотру</option>
                        <option value="in_progress">Активное онлайн-сопровождение</option>
                        <option value="completed">Проект завершен</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {language === 'ru' ? 'Рекомендованный город:' : 'Recommended City:'}
                      </label>
                      <select
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}
                      >
                        <option value="danang">Дананг (Da Nang) — Пляж, серфинг, IT-комьюнити</option>
                        <option value="nhatrang">Нячанг (Nha Trang) — Теплое море круглый год, развитый сервис</option>
                        <option value="hoian">Хойан (Hoi An) — Исторический шарм, зелень, тишина</option>
                        <option value="saigon">Хошимин (Saigon) — Мегаполис, бизнес, коворкинги</option>
                        <option value="hanoi">Ханой (Hanoi) — Культура, старый квартал, озера</option>
                      </select>
                    </div>
                  </div>

                  {/* Why this city for client */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      {language === 'ru' ? 'Обоснование выбора города для клиента:' : 'Reason Why This City:'}
                    </label>
                    <textarea
                      rows={2}
                      value={editWhyRu}
                      onChange={(e) => setEditWhyRu(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Overall Founder Note for Client */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      {language === 'ru' ? 'Персональная заметка основателя (клиент видит ее в личном кабинете):' : 'Overall Founder Note for Client Workspace:'}
                    </label>
                    <textarea
                      rows={3}
                      value={editNoteRu}
                      onChange={(e) => setEditNoteRu(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Budget Allocation Adjustment */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      {language === 'ru' ? 'Корректировка рекомендуемого бюджета ($ USD/мес):' : 'Adjust Recommended Monthly Budget Breakdown ($ USD):'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Жилье ($)</span>
                        <input
                          type="number"
                          value={editBudget.accommodation}
                          onChange={(e) => setEditBudget({ ...editBudget, accommodation: Number(e.target.value) })}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Еда ($)</span>
                        <input
                          type="number"
                          value={editBudget.food}
                          onChange={(e) => setEditBudget({ ...editBudget, food: Number(e.target.value) })}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Коворкинг ($)</span>
                        <input
                          type="number"
                          value={editBudget.coworking}
                          onChange={(e) => setEditBudget({ ...editBudget, coworking: Number(e.target.value) })}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Байк / Grab ($)</span>
                        <input
                          type="number"
                          value={editBudget.transportation}
                          onChange={(e) => setEditBudget({ ...editBudget, transportation: Number(e.target.value) })}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Досуг ($)</span>
                        <input
                          type="number"
                          value={editBudget.entertainment}
                          onChange={(e) => setEditBudget({ ...editBudget, entertainment: Number(e.target.value) })}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
                    >
                      <Save size={18} /> {language === 'ru' ? 'Сохранить изменения в плане клиента' : 'Save Plan Updates'}
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>
        )}

        {/* 3. FOLDER: ЗАВЕРШЕННЫЕ КЛИЕНТЫ */}
        {activeFolder === 'completed' && currentFolderClients.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {language === 'ru'
                ? 'Архив клиентов, которые успешно завершили поездку или релокацию. Все анкеты и история планов сохранены:'
                : 'Archive of clients who completed their journey. Full intakes and plan history are preserved:'}
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
                    <span><strong>Дата завершения:</strong> {client.updatedAt}</span>
                  </div>

                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic' }}>
                    «{client.overallFounderNote[language] || client.overallFounderNote.ru}»
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setSelectedClientId(client.id); setIsQuestionnaireModalOpen(true); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                  >
                    <Eye size={15} /> {language === 'ru' ? 'Архивная анкета' : 'Archived Intake'}
                  </button>

                  <button
                    onClick={() => moveClientCategory(client.id, 'active')}
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

        {/* Modal: Full Questionnaire Details Review */}
        {isQuestionnaireModalOpen && selectedClient && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(19, 37, 34, 0.7)',
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
                {selectedClient.category === 'new' && (
                  <button
                    onClick={() => {
                      moveClientCategory(selectedClient.id, 'active');
                      setIsQuestionnaireModalOpen(false);
                      setActiveFolder('active');
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
                  >
                    <FolderCheck size={16} /> {language === 'ru' ? 'Взять в работу → В активные' : 'Take to Active'}
                  </button>
                )}
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
