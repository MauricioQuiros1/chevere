"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Shield, Car, Phone } from "lucide-react"

export function TrasladosHero() {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/573184598635?text=Hola, me interesa información sobre traslados", "_blank")
  }

  return (
    <section className="relative pt-20">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80"
          alt="Servicios de traslados Chevere Bogotá Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Servicios de Traslados</h1>
              <p className="text-xl text-white/90 mb-6">
                Transporte seguro, puntual y cómodo en Bogotá y toda Colombia
              </p>

              <Button
                onClick={handleWhatsAppContact}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                <Phone className="h-5 w-5 mr-2" />
                Solicitar Traslado
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-700 mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Servicio 24/7</h3>
            <p className="text-gray-600">Disponibles las 24 horas, todos los días del año</p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-green-100 text-green-700 mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seguridad Garantizada</h3>
            <p className="text-gray-600">Conductores certificados y vehículos asegurados</p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-700 mb-4">
              <Car className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Flota Moderna</h3>
            <p className="text-gray-600">Vehículos cómodos y en excelente estado</p>
          </div>
        </div>
      </div>
    </section>
  )
}
