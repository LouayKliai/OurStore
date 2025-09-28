// src/hooks/useTranslation.ts

import { useCallback } from 'react' 
import { useLanguage } from '@/contexts/LanguageContext'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'
import arTranslations from '@/i18n/ar.json'

type TranslationKey = string
type TranslationParams = Record<string, string | number>

const translations = {
  fr: frTranslations,
  en: enTranslations,
  ar: arTranslations,
}

export function useTranslation() {
  const { currentLang } = useLanguage()

  const t = useCallback((key: TranslationKey, params?: TranslationParams): string => {
    try {
      // Naviguer dans l'objet de traduction en utilisant la clé
      const keys = key.split('.')
      let value: unknown = translations[currentLang]

      for (const k of keys) {
        if (value && typeof value === 'object' && value !== null && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          // Fallback vers le français si la clé n'existe pas
          value = translations.fr
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && value !== null && fallbackKey in value) {
              value = (value as Record<string, unknown>)[fallbackKey]
            } else {
              return key // Retourner la clé elle-même si aucune traduction n'est trouvée
            }
          }
          break
        }
      }

      if (typeof value !== 'string') {
        return key
      }

      // Remplacer les paramètres dans la chaîne de traduction
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match
        })
      }

      return value
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error)
      return key
    }
  }, [currentLang]) // 👈 3. Add currentLang as a dependency

  return { t, currentLang }
}