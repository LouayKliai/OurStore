'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  // Load and set language before rendering content
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get saved language or detect browser language
      const savedLang = localStorage.getItem('preferred-language');
      const supportedLangs = ['fr', 'en', 'ar'];
      let selectedLang = 'fr'; // default

      if (savedLang && supportedLangs.includes(savedLang)) {
        selectedLang = savedLang;
      } else {
        const browserLang = navigator.language.slice(0, 2);
        if (supportedLangs.includes(browserLang)) {
          selectedLang = browserLang;
        }
      }

      // Set document attributes immediately
      document.documentElement.lang = selectedLang;
      document.documentElement.dir = selectedLang === 'ar' ? 'rtl' : 'ltr';
      
      // Save the language
      localStorage.setItem('preferred-language', selectedLang);
      
      // Mark language as ready
      setIsLanguageReady(true);
    } else {
      // On server, just mark as ready
      setIsLanguageReady(true);
    }
  }, []);

  // Show loading until language is ready
  if (!isLanguageReady) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg animate-spin">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}