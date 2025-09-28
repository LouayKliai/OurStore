'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export function CallToActionSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-primary-800 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
          {t('callToAction.title')}
        </h2>
        <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
          {t('callToAction.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="w-full sm:w-auto">
            <Button size="lg" className="bg-accent-600 text-white hover:bg-accent-700 transition-colors w-full sm:w-auto">
              {t('callToAction.browseProducts')}
            </Button>
          </Link>
          <Link href="/cart" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-800 transition-colors w-full sm:w-auto">
              {t('callToAction.viewOrders')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}