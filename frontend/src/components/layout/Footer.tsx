import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-800 border-t border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-100 mb-4">OurStore</h3>
            <p className="text-primary-200 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary-100 mb-4">{t('footer.quickLinks.title')}</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-primary-200 hover:text-accent-200 text-sm transition-colors">
                {t('footer.quickLinks.products')}
              </Link>
              <Link href="/cart" className="block text-primary-200 hover:text-accent-200 text-sm transition-colors">
                {t('footer.quickLinks.cart')}
              </Link>
              <a href="#" className="block text-primary-200 hover:text-accent-200 text-sm transition-colors">
                {t('footer.quickLinks.about')}
              </a>
              <a href="#" className="block text-primary-200 hover:text-accent-200 text-sm transition-colors">
                {t('footer.quickLinks.contact')}
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-100 mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-2 text-sm text-primary-200">
              <p>{t('footer.contact.email')}: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}</p>
              <p>{t('footer.contact.phone')}: {process.env.NEXT_PUBLIC_CONTACT_PHONE}</p>
              <p>{t('footer.contact.address')}: {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-700">
          <p className="text-center text-primary-300 text-sm">
            © {new Date().getFullYear()} OurStore. {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}