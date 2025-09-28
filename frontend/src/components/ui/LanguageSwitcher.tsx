'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { currentLang, setCurrentLang, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = {
    fr: 'Français',
    en: 'English',
    ar: 'العربية'
  };

  const languageFlags = {
    fr: '🇫🇷',
    en: '🇺🇸',
    ar: '🇸🇦'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        aria-label="Change language"
      >
        <span className="text-lg">{languageFlags[currentLang]}</span>
        <span className="hidden sm:inline">{languageNames[currentLang]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-200 ${
                    currentLang === lang.code ? 'bg-accent-50 text-accent-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{languageFlags[lang.code]}</span>
                  <span>{languageNames[lang.code]}</span>
                  {currentLang === lang.code && (
                    <svg className="w-4 h-4 ml-auto text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
