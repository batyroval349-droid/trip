import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { DashboardPreview } from './components/DashboardPreview';
import { PricingTiers } from './components/PricingTiers';
import { AdditionalServices } from './components/AdditionalServices';
import { HousingGuidanceHub } from './components/HousingGuidanceHub';
import { FAQSection } from './components/FAQSection';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { FounderLoginModal } from './components/FounderLoginModal';
import { ClientLoginModal } from './components/ClientLoginModal';
import { PaymentModal } from './components/PaymentModal';
import { ExpressBookingForm } from './components/ExpressBookingForm';

const MainContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <FounderLoginModal />
      <ClientLoginModal />
      <PaymentModal />
      
      <main style={{ flex: 1 }}>
        {viewMode === 'marketing' && (
          <div className="animate-fade-in">
            <Hero />
            <WhyUs />
            <DashboardPreview />
            <HousingGuidanceHub />
            <PricingTiers />
            <AdditionalServices />
            <FAQSection />
          </div>
        )}

        {viewMode === 'express_booking' && (
          <div className="animate-fade-in">
            <ExpressBookingForm />
          </div>
        )}

        {viewMode === 'questionnaire' && (
          <div className="animate-fade-in">
            <QuestionnaireForm />
          </div>
        )}

        {viewMode === 'dashboard' && (
          <div className="animate-fade-in">
            <ClientDashboard />
          </div>
        )}

        {viewMode === 'admin' && (
          <div className="animate-fade-in">
            <AdminDashboard />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
