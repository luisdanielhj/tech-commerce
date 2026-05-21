import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { SITE_NAME, SITE_URL } from '../site'
import { en } from './translations/en'
import { es } from './translations/es'
import type { Locale, Translations } from './types'

const STORAGE_KEY = 'tech-commerce-locale'
export const DEFAULT_LOCALE: Locale = 'es'

const translations: Record<Locale, Translations> = { es, en }

type LocaleContextValue = {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const t = translations[locale]

  useEffect(() => {
    const { title, description, lang } = t.meta
    const ogImage = `${SITE_URL}/logo-mark.jpeg`

    document.documentElement.lang = lang
    document.title = title

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'author', SITE_NAME)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', SITE_NAME)
    setMetaTag('property', 'og:url', SITE_URL)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:image', ogImage)
    setMetaTag('property', 'og:locale', lang === 'es' ? 'es_ES' : 'en_US')
    setMetaTag('name', 'twitter:card', 'summary')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', ogImage)
  }, [t])

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
