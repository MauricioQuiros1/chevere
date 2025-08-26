
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { generalQuery, toursListQuery, translationsByLocale } from "@/lib/queries"
import { useLocale } from "@/components/locale-provider"

type GeneralData = {
  logoUrl?: string | null
  whatsappNumbers?: string[]
}

export function Header() {
  const { locale, setLocale } = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [general, setGeneral] = useState<GeneralData | null>(null)
  const [tours, setTours] = useState<Array<{ id: string; name: string }>>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileToursOpen, setMobileToursOpen] = useState(false)
  const [toursOpen, setToursOpen] = useState(false)
  const [t, setT] = useState<any | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    sanityClient.fetch(generalQuery).then((data) => setGeneral(data || null))
  }, [])

  useEffect(() => {
    sanityClient
      .fetch(toursListQuery)
      .then((data: any[]) => {
        const list = (data || []).map((t) => ({ id: t.id, name: t.name }))
        setTours(list)
      })
      .catch(() => setTours([]))
  }, [])

  // Traducciones con fallback a ES
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const data = await sanityClient.fetch(translationsByLocale, { locale })
        if (!cancelled && data) {
          setT(data)
          return
        }
        if (locale !== "es") {
          const esData = await sanityClient.fetch(translationsByLocale, { locale: "es" })
          if (!cancelled) setT(esData || null)
        } else if (!cancelled) {
          setT(null)
        }
      } catch {
        if (!cancelled) setT(null)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [locale])

  const handleWhatsAppClick = () => {
    const number = general?.whatsappNumbers?.[0] || "573184598635"
    const text = encodeURIComponent("Hola, me interesa información sobre sus servicios")
    window.open(`https://wa.me/${number}?text=${text}`, "_blank")
  }

  const isActivePage = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-100/50"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-3 group"
            >
              <Image
                src={general?.logoUrl || "/logo.png"}
                alt="Chevere Bogotá Travel"
                width={48}
                height={48}
                className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${
                  isActivePage("/") ? "text-amber-700" : ""
                }`}
                aria-current={isActivePage("/") ? "page" : undefined}
              >
                Inicio
              </Link>

              <Link
                href="/nosotros"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${
                  isActivePage("/nosotros") ? "text-amber-700" : ""
                }`}
                aria-current={isActivePage("/nosotros") ? "page" : undefined}
              >
                Nosotros
              </Link>

              {/* Tours (submenu controlado por estado) */}
              <div
                className="relative inline-flex flex-none"
                onMouseEnter={() => setToursOpen(true)}
                onMouseLeave={() => setToursOpen(false)}
              >
                <button
                  className="nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium"
                  onClick={() => setToursOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={toursOpen}
                >
                  Tours
                </button>

                <div
                  className={`absolute left-0 top-full mt-2 w-56 rounded-md shadow-lg z-50 transition ${
                    toursOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="bg-white rounded-md overflow-hidden">
                    {tours.length > 0 ? (
                      tours.map((t, idx) => (
                        <Link
                          key={t.id}
                          href={`/tours/${t.id}`}
                          className={`block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800 ${
                            idx === 0 ? "first:rounded-t-md" : ""
                          } ${idx === tours.length - 1 ? "last:rounded-b-md" : ""}`}
                        >
                          {t.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-4 py-2 text-sm text-gray-400 first:rounded-t-md last:rounded-b-md select-none">
                        No hay tour
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/#traslados"
                className="nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105 relative z-10"
              >
                Traslados
              </Link>

              <Link
                href="/contacto"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${
                  isActivePage("/contacto") ? "text-amber-700" : ""
                }`}
                aria-current={isActivePage("/contacto") ? "page" : undefined}
              >
                Contacto
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                <span className="hidden sm:inline">
                  Habla con nosotros
                </span>
              </Button>
              {/* <button
                onClick={() => setLocale(locale === "es" ? "en" : "es")}
                className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                aria-label="Toggle language"
                title={locale === "es" ? "English" : "Español"}
              >
                <span
                  className="text-2xl"
                  role="img"
                  aria-label={locale === "es" ? "Colombia flag" : "United States flag"}
                >
                  {locale === "es" ? "🇨🇴" : "🇺🇸"}
                </span>
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ${
              isMobileMenuOpen
                ? "max-h-[85vh] opacity-100 overflow-y-auto"
                : "max-h-0 opacity-0 overflow-y-hidden"
            }`}
          >
            <nav className="pt-4 pb-2 space-y-2">
              <Link
                href="/"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${
                  isActivePage("/") ? "bg-amber-50 text-amber-700" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${
                  isActivePage("/nosotros") ? "bg-amber-50 text-amber-700" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </Link>

              {/* Tours en mobile */}
              <div className="px-2">
                <button
                  className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                  onClick={() => setMobileToursOpen((v) => !v)}
                  aria-controls="mobile-tours-submenu"
                  aria-expanded={mobileToursOpen}
                >
                  <span>Tours</span>
                  <span className={`transition-transform ${mobileToursOpen ? "rotate-180" : ""}`}>▾</span>
                </button>

                <div
                  id="mobile-tours-submenu"
                  className={`transition-all ${
                    mobileToursOpen ? "max-h-40 mt-1 overflow-y-auto" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="ml-2 rounded-md">
                    {tours.length > 0 ? (
                      tours.map((t) => (
                        <Link
                          key={t.id}
                          href={`/tours/${t.id}`}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setMobileToursOpen(false)
                          }}
                        >
                          {t.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-4 py-2 text-sm text-gray-400 select-none">No hay tour</span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/#traslados"
                className="mobile-menu-item block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Traslados
              </Link>
              <Link
                href="/contacto"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${
                  isActivePage("/contacto") ? "bg-amber-50 text-amber-700" : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>

              <div className="flex items-center justify-between px-4 pt-2">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>
                   Habla con nosotros
                  </span>
                </Button>
                {/* <button
                  onClick={() => setLocale(locale === "es" ? "en" : "es")}
                  className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                  aria-label="Toggle language"
                  title={locale === "es" ? "English" : "Español"}
                >
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label={locale === "es" ? "Colombia flag" : "United States flag"}
                  >
                    {locale === "es" ? "🇨🇴" : "🇺🇸"}
                  </span>
                </button> */}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
