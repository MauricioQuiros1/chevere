"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { generalQuery } from "@/lib/queries"

type GeneralData = {
  logoUrl?: string | null
  location?: string | null
  email?: string | null
  openingHours?: { days?: string | null; hours?: string | null }[]
  whatsappNumbers?: string[]
  whatsappChannel?: string | null
  social?: { facebook?: string | null; instagram?: string | null }
}

// Helpers para limpiar y formatear números de Colombia
const toE164Digits = (raw: string) => {
  const digits = raw.replace(/\D/g, "")
  if (digits.startsWith("57")) return digits
  // Si parece un móvil colombiano de 10 dígitos, anteponer 57
  if (digits.length === 10) return `57${digits}`
  // Fallback: devolver tal cual (sin signos) para no romper el enlace
  return digits
}

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "")
  let local = digits
  let cc = "57"

  if (digits.startsWith("57")) {
    local = digits.slice(2)
  } else if (digits.length === 10) {
    // asumimos móvil colombiano
    local = digits
  }

  if (local.length === 10) {
    return `+${cc} ${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`
  }
  if (local.length === 7) {
    return `+${cc} ${local.slice(0, 3)}-${local.slice(3)}`
  }
  return `+${cc} ${local}`
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [general, setGeneral] = useState<GeneralData | null>(null)

  useEffect(() => {
    sanityClient.fetch(generalQuery).then((data) => setGeneral(data || null))
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic would go here
    alert("¡Gracias por suscribirte! Te mantendremos informado sobre nuestros tours.")
    setEmail("")
  }

  const handleWhatsAppContact = () => {
    const raw = general?.whatsappNumbers?.[0] || "573184598635"
    const number = toE164Digits(raw)
    const text = encodeURIComponent("Hola, me interesa información sobre sus tours")
    window.open(`https://wa.me/${number}?text=${text}`, "_blank")
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Company Info */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={general?.logoUrl || "/logo.png"}
                alt="Chevere Bogotá Tours"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-serif font-bold">Chevere Bogotá Tours</span>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed">
              Descubre la magia de Colombia con nuestros tours personalizados.
              Experiencias auténticas, seguridad garantizada y momentos inolvidables.
            </p>

            <div className="flex space-x-4">
              <a
                href={general?.social?.facebook || "#"}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={general?.social?.instagram || "#"}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Side: Contact + Newsletter */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    {general?.location || "Bogotá, Colombia"}
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    {general?.whatsappNumbers?.length ? (
                      general.whatsappNumbers.map((n, i) => {
                        const hrefNumber = toE164Digits(n)
                        const label = formatPhone(n)
                        return (
                          <div key={i}>
                            <a
                              href={`https://wa.me/${hrefNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {label}
                            </a>
                          </div>
                        )
                      })
                    ) : (
                      (() => {
                        const fallback = "573184598635"
                        return (
                          <div>
                            <a
                              href={`https://wa.me/${fallback}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {formatPhone(fallback)}
                            </a>
                          </div>
                        )
                      })()
                    )}
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${general?.email || "reservas@cheverebogotatravel.com"}?subject=${encodeURIComponent("Consulta sobre tours")}&body=${encodeURIComponent("Hola, me gustaría obtener información sobre sus tours.")}`}
                    className="text-gray-300 text-sm hover:underline"
                  >
                    {general?.email || "reservas@cheverebogotatravel.com"}
                  </a>
                </li>

                <li className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    {general?.openingHours && general.openingHours.length > 0 ? (
                      general.openingHours.map((o, i) => (
                        <div key={i}>
                          {`${o?.days || ""} ${o?.hours ? `- ${o.hours}` : ""}`}
                        </div>
                      ))
                    ) : (
                      <>
                        <div>Lunes a Sábado</div>
                        <div>9am - 6pm</div>
                      </>
                    )}
                  </div>
                </li>
              </ul>

              <Button
                onClick={handleWhatsAppContact}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                ¡Únete a nuestro canal de WhatsApp!
              </h3>

              <p className="text-gray-300 text-sm mb-4">
                Recibe en tu celular nuestras promociones, novedades y tips de viaje
                en tiempo real. <br />
                Haz parte de nuestra comunidad exclusiva.
              </p>

              <div className="space-y-3">
                <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm">
                  <a
                    href={general?.whatsappChannel || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ingresar al canal
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Chevere Bogotá Travel. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}