import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useApp, AppContext } from '../context/AppContext';
import type { AdminClientRecord, ClientProject, BudgetBreakdown } from '../types';
import { ClientDashboard } from './ClientDashboard';
import { CITIES_DATA, normalizeCityId } from '../translations/content';
import { DEFAULT_RELOCATION_14_DAYS } from '../translations/defaultRelocationTravelData';
import { DEFAULT_TRAVEL_DAYS } from '../translations/defaultTravelData';
import { Eye, X, Send, CheckCircle2, AlertTriangle, Crown } from 'lucide-react';

interface ClientDashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: AdminClientRecord;
  onPublishSuccess?: () => void;
}

export const ClientDashboardPreviewModal: React.FC<ClientDashboardPreviewModalProps> = ({
  isOpen,
  onClose,
  client,
  onPublishSuccess
}) => {
  const appContext = useApp();
  const { language, publishClientUpdates, tiersConfig } = appContext;
  const [publishedJustNow, setPublishedJustNow] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Build the ClientProject representation for the preview
  const defaultBudget: BudgetBreakdown = {
    accommodation: 600,
    food: 400,
    coworking: 100,
    transportation: 70,
    entertainment: 150
  };

  const initialPreviewProject = useMemo<ClientProject>(() => {
    const normCity = normalizeCityId(client.recommendedCityId || 'danang');
    const userBudget = client.userCurrentBudget || defaultBudget;

    return {
      id: client.id,
      clientName: client.clientName,
      email: client.email,
      serviceName: client.serviceName,
      status: client.status || 'in_progress',
      progressPercent: client.status === 'plan_ready' || client.status === 'in_progress' || client.status === 'completed' ? 85 : 50,
      questionnaire: client.questionnaire,
      recommendedCityId: normCity,
      recommendedCityWhy: client.recommendedCityWhy || {
        ru: 'Город выбран основателем индивидуально на основе вашей анкеты.',
        en: 'City curated by founder based on your profile.'
      },
      recommendedNeighborhoodIds: client.recommendedNeighborhoodIds || [],
      recommendedStartingBudget: userBudget,
      userCurrentBudget: userBudget,
      roadmapTasks: client.roadmapTasks || [],
      resources: [],
      verifiedHousing: client.verifiedHousing || [],
      isRelocationPlanPublished: true, // Always show complete bespoke view in preview
      overallFounderNote: client.overallFounderNote || {
        ru: 'Личный кабинет сформирован и проверен основателем.',
        en: 'Client workspace curated and verified by founder.'
      },
      tierId: client.tierId,
      slaDeadline: client.slaDeadline,
      paidAt: client.paidAt,
      paymentMethod: client.paymentMethod,
      hasTravelPlan: client.tierId === 'tier3' || client.tierId === 'tier4' || Boolean(client.hasTravelPlan || client.tierId === 'tier2' || (client.travelDays && client.travelDays.length > 0)),
      upgradedFromTier: client.upgradedFromTier,
      travelDays: (client.travelDays && client.travelDays.length > 0)
        ? client.travelDays
        : ((client.tierId === 'tier3' || client.tierId === 'tier4') ? DEFAULT_RELOCATION_14_DAYS : (client.tierId === 'tier2' ? DEFAULT_TRAVEL_DAYS : undefined)),
      travelTransitLegs: client.travelTransitLegs,
      travelRevision: client.travelRevision,
      travelSimGuide: client.travelSimGuide,
      travelEmergencyHospitals: client.travelEmergencyHospitals,
      partnerRealtor: client.partnerRealtor,
      leaseContractAudit: client.leaseContractAudit,
      vipConciergePerks: client.vipConciergePerks,
      founderTelegramAccompaniment: client.founderTelegramAccompaniment,
      customCityBudgets: client.customCityBudgets,
      recommendedCityBudgetRange: client.recommendedCityBudgetRange,
      hasUnpublishedChanges: client.hasUnpublishedChanges,
      lastPublishedAt: client.lastPublishedAt,
      updatedAt: client.updatedAt || new Date().toISOString()
    };
  }, [client]);

  const [previewProject, setPreviewProject] = useState<ClientProject>(initialPreviewProject);

  // Sync when client prop changes
  useEffect(() => {
    setPreviewProject(initialPreviewProject);
  }, [initialPreviewProject]);

  const handlePublishNow = () => {
    publishClientUpdates(client.id);
    setPublishedJustNow(true);
    if (onPublishSuccess) onPublishSuccess();
    setTimeout(() => setPublishedJustNow(false), 3000);
  };

  // Safe overridden AppContext for preview sandbox
  const previewContextValue = useMemo(() => ({
    ...appContext,
    project: previewProject,
    isClientUnlocked: true,
    updateUserBudget: (newBudget: BudgetBreakdown) => {
      setPreviewProject(prev => ({
        ...prev,
        userCurrentBudget: newBudget
      }));
    },
    toggleTaskCompletion: (taskId: string) => {
      setPreviewProject(prev => ({
        ...prev,
        roadmapTasks: prev.roadmapTasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      }));
    }
  }), [appContext, previewProject]);

  if (!isOpen) return null;

  const cityName = CITIES_DATA.find(c => c.id === normalizeCityId(previewProject.recommendedCityId))?.name[language] || previewProject.recommendedCityId;
  const isVip = client.tierId === 'tier4';
  const effectivePrice = tiersConfig?.[client.tierId]?.price || client.priceUSD;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: '#FAF9F6',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Professional Control Bar for Founder */}
      <header
        style={{
          flexShrink: 0,
          background: '#132522',
          color: '#FFFFFF',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '2px solid rgba(194, 94, 32, 0.45)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          zIndex: 10
        }}
      >
        {/* Left: Badge & Client Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(194, 94, 32, 0.25)',
              border: '1px solid var(--accent-terracotta)',
              color: '#FDBA74',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            <Eye size={14} />
            <span>{language === 'ru' ? 'Режим предпросмотра ЛК' : 'Client Portal Preview'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
              {client.clientName}
            </span>
            <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
              &bull; {client.email}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                background: isVip ? '#FEF3C7' : 'rgba(255, 255, 255, 0.12)',
                color: isVip ? '#92400E' : '#E5E7EB',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              {isVip && <Crown size={11} />}
              {client.serviceName[language]} ($${effectivePrice})
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                background: 'rgba(15, 118, 110, 0.25)',
                color: '#5EEAD4',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 600
              }}
            >
              {cityName}
            </span>
          </div>
        </div>

        {/* Center: Live vs Draft Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {client.hasUnpublishedChanges ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                color: '#FCD34D',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                fontWeight: 600
              }}
            >
              <AlertTriangle size={13} />
              <span>{language === 'ru' ? 'Есть неопубликованные правки в админке' : 'Unpublished changes exist'}</span>
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                color: '#6EE7B7',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                fontWeight: 600
              }}
            >
              <CheckCircle2 size={13} />
              <span>{language === 'ru' ? 'Клиент видит именно эту версию' : 'Live in client workspace'}</span>
            </span>
          )}
        </div>

        {/* Right: Actions (Publish & Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {client.hasUnpublishedChanges && (
            <button
              type="button"
              onClick={handlePublishNow}
              className="glass-button active"
              style={{
                padding: '0.5rem 1.15rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: publishedJustNow ? '#059669' : 'var(--accent-emerald)',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {publishedJustNow ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>{language === 'ru' ? 'Опубликовано!' : 'Published!'}</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>{language === 'ru' ? 'Опубликовать клиенту' : 'Publish to Client'}</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            title={language === 'ru' ? 'Закрыть предпросмотр (Esc)' : 'Close preview (Esc)'}
          >
            <X size={16} />
            <span>{language === 'ru' ? 'Закрыть предпросмотр' : 'Close Preview'}</span>
            <kbd style={{ fontSize: '0.7rem', opacity: 0.6, background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: '4px' }}>Esc</kbd>
          </button>
        </div>
      </header>

      {/* Main Preview Sandbox: Renders the Client Dashboard with Overridden Context */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--bg-cream, #FDFBF7)',
          position: 'relative'
        }}
      >
        <AppContext.Provider value={previewContextValue}>
          <ClientDashboard isPreviewMode={true} />
        </AppContext.Provider>
      </main>
    </div>,
    document.body
  );
};
