// src/contexts/LanguageContext.tsx

'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Import translation files
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'
import arTranslations from '@/i18n/ar.json'

// Types
export type SupportedLanguage = 'fr' | 'en' | 'ar'

export interface LanguageInfo {
  code: SupportedLanguage
  name: string
  nativeName: string
  flag: string
  direction: 'ltr' | 'rtl'
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' }
]

// Translation data
const translations = {
  fr: frTranslations,
  en: enTranslations,
  ar: arTranslations
} as const

export interface LanguageContextType {
  currentLang: SupportedLanguage
  setCurrentLang: (lang: SupportedLanguage) => void
  supportedLanguages: LanguageInfo[]
  t: (key: string, params?: Record<string, string | number>) => string
  isRTL: boolean
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider props
interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: SupportedLanguage
}

// Provider component
export function LanguageProvider({ children, defaultLanguage = 'fr' }: LanguageProviderProps) {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    // On server, use default
    if (typeof window === 'undefined') {
      return defaultLanguage
    }
    
    // On client, get from localStorage or document (already set by LayoutWrapper)
    const savedLang = localStorage.getItem('preferred-language') as SupportedLanguage
    if (savedLang && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLang)) {
      return savedLang
    }
    
    // Get from document if set by LayoutWrapper
    const docLang = document.documentElement.lang as SupportedLanguage
    if (docLang && SUPPORTED_LANGUAGES.some(lang => lang.code === docLang)) {
      return docLang
    }
    
    return defaultLanguage
  })

  // Update document attributes when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = currentLang
      document.documentElement.dir = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang)?.direction || 'ltr'
      localStorage.setItem('preferred-language', currentLang)
    }
  }, [currentLang])

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[currentLang]
    
    // Handle nested keys like 'navigation.home'
    const keys = key.split('.')
    let text: unknown = translation
    
    for (const k of keys) {
      if (text && typeof text === 'object' && text !== null && k in text) {
        text = (text as Record<string, unknown>)[k]
      } else {
        return key // Return the key if translation not found
      }
    }
    
    // Ensure we have a string
    if (typeof text !== 'string') {
      return key
    }
    
    // Replace parameters
    let result = text
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{${paramKey}}`, String(paramValue))
      })
    }
    
    return result
  }  // Check if current language is RTL
  const isRTL = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang)?.direction === 'rtl'

  const value: LanguageContextType = {
    currentLang,
    setCurrentLang,
    supportedLanguages: SUPPORTED_LANGUAGES,
    t,
    isRTL
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
