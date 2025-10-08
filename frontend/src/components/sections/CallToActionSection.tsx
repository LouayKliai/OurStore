'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export function CallToActionSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-primary-800 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-5 md:mb-6 px-4">
          {t('callToAction.title')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          {t('callToAction.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link href="/products" className="w-full sm:w-auto">
            <Button size="lg" className="bg-accent-600 text-white hover:bg-accent-700 transition-colors w-full sm:w-auto text-sm sm:text-base">
              {t('callToAction.browseProducts')}
            </Button>
          </Link>
          <Link href="/cart" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-800 transition-colors w-full sm:w-auto text-sm sm:text-base">
              {t('callToAction.viewOrders')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
