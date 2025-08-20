"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic would go here
    alert("¡Gracias por suscribirte! Te mantendremos informado sobre nuestros tours.")
    setEmail("")
  }

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/573184598635?text=Hola, me interesa información sobre sus tours", "_blank")
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Company Info */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Chevere Bogotá Tours" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-serif font-bold">Chevere Bogotá Tours</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Descubre la magia de Colombia con nuestros tours personalizados. Experiencias auténticas, seguridad
              garantizada y momentos inolvidables.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
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
                  <span className="text-gray-300 text-sm">Bogotá, Colombia</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <div>+57 305 479 8365</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">reservas@cheverebogotatravel.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <div>Lunes a Sábado</div>
                    <div>9am - 6pm</div>
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
              <h3 className="text-lg font-semibold mb-4">¡Únete a nuestro canal de WhatsApp!</h3>
              <p className="text-gray-300 text-sm mb-4">
                Recibe en tu celular nuestras promociones, novedades y tips de viaje en tiempo real. <br />
                Haz parte de nuestra comunidad exclusiva.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm">
                  Ingresar al canal
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Chevere Bogotá Travel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
