import React from 'react';
import { useApp } from '../context/AppContext';
import Pricing from '@/components/ui/pricing';
import type { PricingColumnProps } from '@/components/ui/pricing-utils/pricing-column';
import { Sparkles, Compass, ShieldCheck, Zap, Video, Crown } from 'lucide-react';

export const PricingTiers: React.FC = () => {
  const { t, startBooking, language } = useApp();

  const plans: PricingColumnProps[] = [
    {
      name: t('tier1Title'),
      icon: <Video className="size-4" />,
      description: t('tier1Desc'),
      price: 50,
      priceNote: language === 'ru' ? '/ звонок' : '/ call',
      promotionText: t('tier1Badge'),
      features: [
        t('tier1Feat1'),
        t('tier1Feat2'),
        t('tier1Feat3'),
        t('tier1Feat4'),
        t('tier1Feat5' as any)
      ],
      cta: {
        label: t('pricingCTA'),
        variant: 'default',
        onClick: () => startBooking('tier1')
      },
      variant: 'default'
    },
    {
      name: t('tier2Title'),
      icon: <Compass className="size-4" />,
      description: t('tier2Desc'),
      price: 290,
      priceNote: language === 'ru' ? '/ проект' : '/ project',
      features: [
        t('tier2Feat1'),
        t('tier2Feat2'),
        t('tier2Feat3'),
        t('tier2Feat4'),
        t('tier2Feat5' as any),
        t('tier2Feat6' as any)
      ],
      cta: {
        label: t('pricingCTA'),
        variant: 'default',
        onClick: () => startBooking('tier2')
      },
      variant: 'default'
    },
    {
      name: t('tier3Title'),
      icon: <Sparkles className="size-4" />,
      description: t('tier3Desc'),
      price: 490,
      priceNote: language === 'ru' ? '/ проект' : '/ project',
      promotionText: t('tier3Badge'),
      features: [
        t('tier3Feat1'),
        t('tier3Feat2'),
        t('tier3Feat3'),
        t('tier3Feat4')
      ],
      cta: {
        label: t('pricingCTA'),
        variant: 'glow-brand',
        onClick: () => startBooking('tier3')
      },
      variant: 'glow-brand'
    },
    {
      name: t('tier4Title'),
      icon: <Crown className="size-4" />,
      description: t('tier4Desc'),
      price: 890,
      priceNote: language === 'ru' ? '/ проект' : '/ project',
      promotionText: t('tier4Badge'),
      features: [
        t('tier4Feat1'),
        t('tier4Feat2'),
        t('tier4Feat3'),
        t('tier4Feat4')
      ],
      cta: {
        label: t('pricingCTA'),
        variant: 'default',
        onClick: () => startBooking('tier4')
      },
      variant: 'glow'
    }
  ];

  return (
    <div id="pricing-section" className="bg-[var(--bg-main)]">
      <Pricing
        badge={
          <div className="badge badge-emerald">
            <Zap size={14} /> {language === 'ru' ? 'Прозрачные тарифы' : 'Transparent Pricing'}
          </div>
        }
        title={t('pricingTitle')}
        description={t('pricingSubhead')}
        plans={plans}
        className="py-16 md:py-20"
      >
        {/* Relocation Disclaimer stretching under packages 3 & 4 */}
        <div className="w-full mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="hidden xl:block col-span-2" />
            <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-[rgba(194,94,32,0.07)] border border-[var(--border-terracotta)] rounded-2xl p-4 flex items-start gap-3 text-sm text-[var(--text-muted)] leading-relaxed shadow-sm">
              <ShieldCheck className="size-5 text-[var(--accent-terracotta)] shrink-0 mt-0.5" />
              <span>{t('pricingRelocationDisclaimer' as any)}</span>
            </div>
          </div>
        </div>

        {/* General Remote Notice */}
        <div className="text-center mt-6 text-sm text-[var(--text-muted)] flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-[var(--accent-emerald)]" />
          <span>{t('pricingRemoteNotice')}</span>
        </div>
      </Pricing>
    </div>
  );
};
