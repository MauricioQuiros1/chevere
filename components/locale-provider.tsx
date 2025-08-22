"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Locale = "es" | "en"

type LocaleContextValue = {
  locale: Locale
  setLocale: (loc: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")

  // Load persisted locale or infer once on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale | null) : null
    if (saved === "es" || saved === "en") {
      setLocale(saved)
      return
    }
    const nav = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "es"
    setLocale(nav.startsWith("es") ? "es" : "en")
  }, [])

  // Persist locale selection
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("locale", locale)
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
