"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { generalQuery } from "@/lib/queries"

type GeneralData = {
  logoUrl?: string | null
  callNumber?: string | null
  whatsappNumbers?: string[]
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [general, setGeneral] = useState<GeneralData | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileToursOpen, setMobileToursOpen] = useState(false) // mobile submenu
  const [toursOpen, setToursOpen] = useState(false)
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

  const handleWhatsAppClick = () => {
    const number = general?.whatsappNumbers?.[0] || "573184598635"
    const text = encodeURIComponent("Hola, me interesa información sobre sus servicios")
    window.open(`https://wa.me/${number}?text=${text}`, "_blank")
  }

  const handleTrasladosClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const trasladosSection = document.getElementById("traslados")
    if (trasladosSection) trasladosSection.scrollIntoView({ behavior: "smooth" })
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
        className={`
          sticky top-0 w-full z-50 transition-all duration-500 ease-out
          ${isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-100/50"
            : "bg-white/80 backdrop-blur-sm"}
        `}
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
                alt="Chevere Bogotá Tours"
                width={48}
                height={48}
                className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
              />
            </Link>

            {/* Desktop Navigation (sin shadcn, submenu propio) */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${isActivePage("/") ? "text-amber-700" : ""
                  }`}
                aria-current={isActivePage("/") ? "page" : undefined}
              >
                Inicio
              </Link>

              <Link
                href="/nosotros"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${isActivePage("/nosotros") ? "text-amber-700" : ""
                  }`}
                aria-current={isActivePage("/nosotros") ? "page" : undefined}
              >
                Nosotros
              </Link>

              {/* Tours (submenu controlado por estado: robusto) */}
              <div
                className="relative inline-flex flex-none"
                onMouseEnter={() => setToursOpen(true)}
                onMouseLeave={() => setToursOpen(false)}
              >
                <button
                  className="nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium"
                  onClick={() => setToursOpen((v) => !v)} // permite abrir/cerrar por click (útil en touch)
                  aria-haspopup="menu"
                  aria-expanded={toursOpen}
                >
                  Tours
                </button>

                <div
                  className={`absolute left-0 top-full mt-2 w-56 rounded-md shadow-lg z-50 transition
                  ${toursOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                >
                  <div className="bg-white rounded-md overflow-hidden">
                    <Link
                      href="/tours/hacienda-cafetera-coloma"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800 first:rounded-t-md last:rounded-b-md"
                    >
                      Tour Hacienda Cafetera Coloma
                    </Link>
                    <Link
                      href="/tours/otro-tour"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800 first:rounded-t-md last:rounded-b-md"
                    >
                      Otro Tour
                    </Link>
                    <Link
                      href="/tours/un-tour-mas"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800 first:rounded-t-md last:rounded-b-md"
                    >
                      Un tour más
                    </Link>
                  </div>
                </div>
              </div>

              <button
                onClick={handleTrasladosClick}
                className="nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium transition-all duration-300 hover:scale-105 relative z-10"
              >
                Traslados
              </button>

              <Link
                href="/contacto"
                className={`nav-link-enhanced text-gray-700 hover:text-amber-700 font-medium ${isActivePage("/contacto") ? "text-amber-700" : ""
                  }`}
                aria-current={isActivePage("/contacto") ? "page" : undefined}
              >
                Contacto
              </Link>
            </nav>

            {/* CTA Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              <Phone className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
              <span className="hidden sm:inline">Habla con nosotros</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <nav className="pt-4 pb-2 space-y-2">
              <Link
                href="/"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${isActivePage("/") ? "bg-amber-50 text-amber-700" : "text-gray-700"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${isActivePage("/nosotros")
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              {/* Tours listado simple en mobile */}
              <div className="px-2">
                <button
                  className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                  onClick={() => setMobileToursOpen(v => !v)}
                  aria-controls="mobile-tours-submenu"
                  aria-expanded={mobileToursOpen}
                >
                  <span>Tours</span>
                  <span className={`transition-transform ${mobileToursOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                <div
                  id="mobile-tours-submenu"
                  className={`overflow-hidden transition-all ${mobileToursOpen ? "max-h-64 mt-1" : "max-h-0"
                    }`}
                >
                  <div className="ml-2 rounded-md ">
                    <Link
                      href="/tours/hacienda-cafetera-coloma"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setMobileToursOpen(false)
                      }}
                    >
                      Tour Hacienda Cafetera Coloma
                    </Link>
                    <Link
                      href="/tours/otro-tour"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setMobileToursOpen(false)
                      }}
                    >
                      Otro Tour
                    </Link>
                    <Link
                      href="/tours/un-tour-mas"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setMobileToursOpen(false)
                      }}
                    >
                      Un tour más
                    </Link>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  handleTrasladosClick(e)
                  setIsMobileMenuOpen(false)
                }}
                className="mobile-menu-item block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 text-gray-700"
              >
                Traslados
              </button>
              <Link
                href="/contacto"
                className={`mobile-menu-item block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-amber-50 hover:text-amber-700 hover:translate-x-2 ${isActivePage("/contacto")
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
